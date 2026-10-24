---
description: Scrape a website and turn it into a short promo video
argument-hint: [website URL]
---

Make a short promo video for a website, then send the finished video to me in this chat.

The website and options I typed after the command: `$ARGUMENTS`

## 1. Get the URL and length

- The first word of the text above is the website URL. Accept `example.com` as well as `https://example.com/page`
  (add `https://` if it is missing). If there is no usable URL, ask me for it with the AskUserQuestion tool
  and wait for the answer.
- Ask me how long the video should be with the AskUserQuestion tool: 15 seconds, 30 seconds or 60 seconds
  (I can type another length under "Other"). If I already gave a length in the text above, do not ask.
  Keep the length between 5 and 120 seconds.

## 2. Scrape the site

Fetch the page (WebFetch, or the built-in browser if the page needs JavaScript to show its content) and pull out:
the brand or site name, its tagline or main headline, 3-5 key features or selling points, the call to action,
the main brand colours and fonts (from the CSS), and the logo and a few good product or hero images (download them
into the project's `public/` folder). Use only what the site really says; never invent content.
If the site cannot be fetched, stop and tell me why.

Work in `divtovid-videos/<site>/` in the current folder, where `<site>` is the host name with dots and
slashes turned into dashes (for example `codesingers-in`). Save what you found as `content.json` there.

## 3. Write the scene script

4-6 scenes that add up to exactly the chosen length at 30 fps and 1920x1080: an intro with the name and tagline,
one or two scenes for the products, features or numbers, and an outro with the call to action and the URL.
Add the script to `content.json`.

## 4. Build the video with Remotion

Set the project up by hand, with no interactive scaffolder: `package.json` with `remotion`, `@remotion/cli`,
`react`, `react-dom` (all the same Remotion version, pinned) and `typescript`; `src/index.ts` calling `registerRoot`;
`src/Root.tsx` registering one `<Composition id="Promo">` that reads `content.json`. Use the site's colours and fonts
(`@remotion/google-fonts` for Google fonts), animated text with `spring` and `interpolate`, and the downloaded images.
Run `npm install` and `npx tsc` and fix any errors.

## 5. Check it, render it, send it

Render a few still frames (`npx remotion still src/index.ts Promo out/frame.png --frame=N`) and look at them: nothing
may be cut off, overlapping or unreadable. Fix what is wrong, delete the stills, then render the video
(`npx remotion render src/index.ts Promo out/<site>.mp4`; it can take a few minutes, so run it in the background).

When it is done, send the MP4 to me in this chat with the SendUserFile tool (load it with ToolSearch first if it is
only listed as a deferred tool), with a one-line caption that says its length. After that, give me a one-line summary
of each scene. Only if SendUserFile is not available in this session, give me the full path of the MP4 instead.
