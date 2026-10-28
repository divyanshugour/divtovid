// Renders index.html frame by frame (deterministic seek via setTime) and muxes with the SFX track.
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const {chromium}=createRequire(import.meta.url)(process.env.PW||'playwright');
const url='file://'+path.resolve('index.html');
fs.rmSync('frames',{recursive:true,force:true});fs.mkdirSync('frames');fs.mkdirSync('out',{recursive:true});
const b=await chromium.launch();
const probe=await b.newPage({viewport:{width:1080,height:1920}});
await probe.goto(url);await probe.evaluate(()=>document.fonts.ready);
const {total,fps,cues}=await probe.evaluate(()=>({total:TOTAL,fps:FPS,cues:CUES}));
fs.writeFileSync('out/cues.json',JSON.stringify({total,cues}));
const n=Math.round(total*fps),workers=4;
console.log(`frames: ${n}, duration: ${total}s`);
await Promise.all(Array.from({length:workers},async(_,w)=>{
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto(url);await p.evaluate(()=>document.fonts.ready);
  for(let f=w;f<n;f+=workers){
    await p.evaluate(t=>setTime(t),f/fps);
    await p.screenshot({path:`frames/${String(f).padStart(5,'0')}.png`});
  }
}));
await b.close();
execFileSync('python3',['sfx.py'],{stdio:'inherit'});
execFileSync('ffmpeg',['-y','-framerate',String(fps),'-i','frames/%05d.png','-i','out/sfx.wav',
  '-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart','out/divtovid-reel.mp4'],{stdio:'inherit'});
console.log('done: out/divtovid-reel.mp4');
