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

## What the mod does inside Claude Code

The mod is one hooks module, [`hooks/register.ts`](hooks/register.ts). It does exactly this and nothing else:

- **Registers one slash command, `/divtovid`**, when a session starts (`session.start`).
- **Answers that command** (`command.run`, only for `/divtovid`). It does not see or change any other command.
  It reads only the text typed after `/divtovid`; it does not read the conversation, your files or any other data.
- **Asks one question** in Claude Code's own question dialog: how long the video should be.
- **Fills the prompt box** with `/divtovid https://` when no valid URL was given, so you only type the URL.

### The prompt it submits

After you answer the length question, the mod submits **one prompt** to Claude, built only from the URL you typed
and the length you picked. Nothing from the conversation or your machine goes into it. The prompt asks Claude to:

1. fetch the website and pull out its name, tagline, 3-5 features, call to action, brand colours and logo/hero images,
   saving them to `divtovid-videos/<site>/content.json`;
2. write a 4-6 scene script that adds up to the chosen length (30 fps, 1920x1080) into the same file;
3. build a Remotion project in `divtovid-videos/<site>/` that animates those scenes;
4. render it with `npx remotion render` to `divtovid-videos/<site>/out/<site>.mp4`;
5. report the MP4's path, its length and a one-line summary of each scene, or stop and say why if the site
   cannot be fetched.

The prompt goes through Claude Code's normal permission rules, so you approve the commands Claude runs
(such as `npm install` and the render) as usual. If Claude Code refuses or drops the prompt, the mod writes one line
saying why and puts the same prompt in your prompt box instead, so nothing is sent until you press Enter.

## Requirements

Node.js with `npx`. Remotion downloads its own headless Chrome and video encoder on first render, so no
separate ffmpeg install is needed. Check Remotion's license terms if you use it for a company.
