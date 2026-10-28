<p align="center"><img src="logo.png" alt="DivtoVid" width="240"></p>

# divtovid

A Claude Code plugin that adds the `/divtovid` slash command: give it a website URL and Claude scrapes the site
(name, tagline, features, call to action, brand colours, images) and turns it into a short promo video, which it
sends to you in the chat when it is ready.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install divtovid --marketplace divyanshugour/divtovid
```

Answer `y` to add the marketplace, then pick a scope (user is first; press Enter).

From a shell:

```bash
claude plugin install divtovid --marketplace divyanshugour/divtovid
```

In the Claude desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins,
Add marketplace with `divyanshugour/divtovid`, then Add plugin.

To update an older install, run `claude plugin update divtovid@divtovid` and restart Claude Code.

## Usage

```
/divtovid https://example.com
```

Leave the URL out and Claude asks for it. Claude then asks how long the video should be (15, 30 or 60 seconds, or
type your own), and does the rest:

1. scrapes the site and saves what it found to `divtovid-videos/<site>/content.json`;
2. writes a 4-6 scene script that adds up to the chosen length (30 fps, 1920x1080);
3. builds a Remotion project in the same folder that animates the scenes;
4. checks a few frames, renders `out/<site>.mp4`, and **sends the video into the chat**
   (if your session cannot send files, Claude gives you the file's path instead).

## Talking-video VFX skill

The plugin also ships the `talking-video-vfx` skill ([`skills/talking-video-vfx/SKILL.md`](skills/talking-video-vfx/SKILL.md)).
Give Claude a raw talking-head video (Hindi, English or Hinglish) and it edits it into a 9:16 reel in an editorial
motion-graphics style: hard cuts between you and full-screen explainer cards that build up word by word, logos behind
the speaker, screenshot highlights, graphs, flip calendars and a CTA card. It storyboards first and renders the final
MP4 only after you approve. Just ask, for example: "edit this reel in the talking-video-vfx style".

[`reel/`](reel) holds a launch reel for DivtoVid itself, built in the same card style (`cd reel && npm install && node render.mjs`).

## What the plugin contains

[`commands/divtovid.md`](commands/divtovid.md) holds the instructions Claude follows when you run `/divtovid`, and
[`skills/talking-video-vfx/SKILL.md`](skills/talking-video-vfx/SKILL.md) holds the reel-editing skill.
There is no hook and no MCP server. The plugin does not read your conversation or files on its own;
it only gives Claude a task when you type the command or ask for the skill. Claude works through Claude Code's normal permission
rules, so you approve the commands it runs (such as `npm install` and the render) as usual.

## Requirements

Node.js with `npx`. Remotion downloads its own headless Chrome and video encoder on first render, so no
separate ffmpeg install is needed. Check Remotion's license terms if you use it for a company.
