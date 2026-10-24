import type { Register } from 'claude-code'

const COMMAND = 'divtovid'
const LENGTHS = ['15 seconds', '30 seconds', '60 seconds'] as const

// Accepts "example.com" or "https://example.com/page"; returns undefined for anything else.
function normalizeUrl(raw: string): string | undefined {
  const text = raw.trim().split(/\s+/)[0] ?? ''
  if (text === '') return undefined
  const url = /^https?:\/\//i.test(text) ? text : `https://${text}`
  return /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]+$/i.test(url) ? url : undefined
}

function slugFor(url: string): string {
  return url
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 40)
}

function brief(url: string, seconds: number): string {
  const slug = slugFor(url)
  const dir = `divtovid-videos/${slug}`
  return [
    `Make a short ${seconds}-second promo video for the website ${url}.`,
    '',
    '1. Scrape the site. Fetch the page (WebFetch, or the built-in browser if the page needs JavaScript) and pull out:',
    '   the brand/site name, tagline or main headline, 3-5 key features or selling points, a call to action,',
    '   the main brand colours (from CSS/theme), and the logo or hero image URLs if they are easy to get.',
    `   Save what you found as ${dir}/content.json.`,
    '',
    `2. Write a scene script: 4-6 scenes that add up to exactly ${seconds}s at 30 fps, 1920x1080`,
    '   (intro with the name and tagline, one scene per feature, outro with the call to action and the URL).',
    `   Save it in ${dir}/content.json too.`,
    '',
    `3. Build the video with Remotion in ${dir}/ (set package.json up by hand, no interactive scaffolder):`,
    '   remotion, @remotion/cli, react, react-dom; src/index.ts calls registerRoot; src/Root.tsx registers one',
    '   <Composition id="Promo"> that reads content.json. Use the brand colours, animated text',
    '   (spring/interpolate fades and slides) and the downloaded images where they help.',
    '',
    `4. Render it: npx remotion render src/index.ts Promo out/${slug}.mp4 (run it in the background, it can take minutes).`,
    '',
    `5. When it is done, tell me the full path of the MP4, its length, and a one-line summary of each scene.`,
    'If the site cannot be fetched, stop and tell me why instead of inventing content.',
  ].join('\n')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: COMMAND,
      description: 'Scrape a website and turn it into a short promo video',
      argumentHint: '[website URL]',
    })

    return next(e)
  })

  on('command.run', { command: COMMAND }, async ($, e) => {
    const url = normalizeUrl(e.args)

    // No usable URL yet: put the command back in the prompt box so the person only types the URL.
    if (url === undefined) {
      await $.prompt.fill({ text: `/${COMMAND} https://` })
      const why = e.args.trim() === '' ? 'Which website should I turn into a video?' : `"${e.args.trim()}" is not a website URL.`
      return { text: `${why} Type the URL after /${COMMAND} and press Enter.` }
    }

    // Asking fails where nobody can answer (a -p run) or when dismissed; fall back to the shortest video.
    const length = await $.ui
      .ask(`How long should the video for ${url} be?`, { header: 'Length', options: LENGTHS })
      .catch(() => LENGTHS[0])
    const seconds = Math.min(120, Math.max(5, Number.parseInt(length, 10) || 15))

    const job = brief(url, seconds)
    // If the engine refuses or drops the hand-off, say why and leave the job in the prompt box for Enter.
    const fallback = (reason: string) => {
      $.ui.log(`divtovid: could not start the video job (${reason}). It is in the prompt box: press Enter.`)
      void $.prompt.fill({ text: job })
    }
    void $.prompt.submit({ text: job }).then(
      result => {
        if (result.drop !== undefined) fallback(result.drop)
      },
      (error: unknown) => fallback(error instanceof Error ? error.message : String(error)),
    )

    return { text: `Making a ${seconds}s video for ${url} in divtovid-videos/${slugFor(url)}/` }
  }).catch(() => ({ text: `/${COMMAND} failed to start. Try again, or check the debug log.` }))
}
