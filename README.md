# divtovid

A Claude Code mod that adds the `/divtovid` slash command: give it a website URL and Claude scrapes the site
(name, tagline, features, call to action, brand colours, images) and turns it into a short promo video.

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

## Usage

```
/divtovid https://example.com
```

Run `/divtovid` with no URL and it puts `/divtovid https://` in the prompt box for you to finish. It then asks
how long the video should be (15, 30 or 60 seconds, or type your own) and hands Claude the job.

Claude works in `divtovid-videos/<site>/` in the current folder: `content.json` holds the scraped content and
scene script, a Remotion project builds the animation, and the finished video lands in `out/<site>.mp4`.

## Requirements

Node.js with `npx`. Remotion downloads its own headless Chrome and video encoder on first render, so no
separate ffmpeg install is needed. Check Remotion's license terms if you use it for a company.
