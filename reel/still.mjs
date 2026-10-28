import {createRequire} from 'node:module';const {chromium}=createRequire(import.meta.url)(process.env.PW||'playwright');
import path from 'node:path';
const times=process.argv.slice(2).map(Number);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.resolve('index.html'));await p.evaluate(()=>document.fonts.ready);
for(const t of times){await p.evaluate(t=>setTime(t),t);await p.screenshot({path:`/tmp/claude-0/still_${t}.png`})}
await b.close();
