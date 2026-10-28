---
name: "talking-video-vfx"
description: "Edit a talking-head reel (Hindi/English/Hinglish) into a premium editorial motion-graphics style with word-synced cutaway cards, storyboard first, then final MP4."
---

# Talking Video VFX (editorial cutaway style)

Turn a raw talking-head video plus optional images into a premium 9:16 reel. The look: hard cuts between the speaker and full-screen, minimal motion-graphic "explainer cards" that build up in sync with the spoken words, plus finance-creator extras (logos behind the speaker, screenshot highlights, graphs, flip calendars). Always storyboard first, then render only when the user approves.

## Inputs
- One talking video (required). Any images, logos, screenshots (optional).
- Optional user instructions, e.g.:
  - [image] behind me when I say "[word]"
  - [image] as the background when I say "[word]"
  - [image] pop up when I say "[word]"
  - Captions: yes (key words in yellow) / no (default: no)
  - Export: final / green screen / both (default: final)
- A script, if provided (use it to correct the transcript).

User instructions always beat your own choices. "Use X when I say Y" means X every time Y is said.

## The house style (match this exactly)
Reference: a Hinglish creator reel where roughly 55 to 65 percent of the runtime is full-screen graphic cards and the rest is the speaker on camera. The speaker's voice runs continuously underneath everything.

### Structure and rhythm
- Open on the speaker for 0.5 to 1 s (the hook face), then hard cut to the first card.
- Alternate: speaker shot (1 to 5 s) -> card scene (2 to 10 s) -> speaker -> card. Never two speaker shots back to back without a reason; never let one card scene sit static for more than about 1.5 s; something must build, tick, count or fill.
- Transitions are HARD CUTS (no wipes, no slides between scenes). Inside a card scene, elements animate in.
- One idea per card scene. A scene keeps its headline while its cards build underneath, word by word, as the speaker says them.
- Speaker shots: light punch-in (1.00 -> 1.08 scale) on each new point, alternate framing between cuts so jump cuts feel intentional. Remove dead air and retakes (cut silences > 0.35 s).
- End on a CTA card (e.g. "Comment mein likho "skill"" with a comment box that types the word and a green send button), or the speaker's final line if there is no CTA.

### Palette
- Background: warm off-white #EDEDE8 with a very soft radial lighter centre (#F4F4F0) and subtle film grain (2 to 3 percent).
- Ink: near-black #1C1C1A. Secondary text: #6B6B66.
- Accent: deep green #2E5E45 (italic headline words, toggles, progress bars, badges, check marks, buttons).
- Card: #FAFAF7, 1 px border #E4E4DE, radius 18 to 22 px, soft shadow 0 12px 30px rgba(0,0,0,0.06).
- Pastel tiles for grids, thumbnails and chips: mint #D7E8DC, peach #F0DCD3, cream #EFE4C8, blush #F2D9D4, light grey #ECECE7.
- Positive tag: green pill with white text. Negative or "before" state: soft red tint #F3DAD6 with a red x.

### Typography (install via npm @fontsource/* if Google Fonts is unreachable)
- Headline: condensed elegant serif, Instrument Serif (fallback: Playfair Display or DM Serif Display). Two lines: first line upright ink at about 64 px, second line large at 110 to 130 px where the KEY WORD is italic green and the rest upright ink. Example: "Agar aap" / "YouTuber ho", "Sabse viral video", "Poore week ka plan".
- Eyebrow label above the headline: monospace (JetBrains Mono or IBM Plex Mono), 22 to 26 px, uppercase, letter-spacing 0.25em, grey. Examples: FOR YOUTUBERS, DIRECT CONNECTION, INDUSTRY RESEARCH, CONTENT CALENDAR, SKILL CHAHIYE?.
- UI text inside cards: Inter or Plus Jakarta Sans, 30 to 36 px medium. Tiny meta text in mono 16 to 18 px uppercase (AGENT 01, HOOK, CTA, 248 MB · 0:58, STATUS · ON).
- Big numbers: the headline serif at 260 to 340 px (e.g. "11+" with the "+" in green).
- Keep the speaker's exact wording and language in Roman script. No em dashes in any on-screen text.

### Layout
1080x1920, 30 fps. Eyebrow at about y=160, headline y=200 to 360, cards start at about y=430, 90 px side margins. Lower half stays mostly empty breathing space unless the scene needs a stack of cards.

### Card scene library (pick the one that matches what is said)
- **Checklist card**: rows with a small icon tile left, label, and a round status on the right that pops from empty to a green check (or red x). Rows appear one by one on the matching words.
- **Connection diagram**: two cards (e.g. "AI / Claude" and "YOUTUBE / Aapka channel") with a line that draws between them, then a green CONNECTED pill pops on the line. Optional chips row below (Videos, Comments, Schedule) that light up in sequence.
- **Toggle card**: label + iOS style toggle that slides to green, with mono STATUS · ON under it.
- **Big counter**: number counts up (e.g. 3+ -> 11+) with a word under it in green italic, then a grid of pastel tiles with tiny "face" dots and numbers (01, 02, ...) that pop in with a stagger, last tile a green "+".
- **Agent / step stack**: stacked cards labelled AGENT 01, AGENT 02... each with an upright word + green italic verb ("Script nikalega", "Thumbnail banayega", "Video edit karega"). Content types in (typing cursor), scores fill as progress bars, READY pill pops.
- **Editor / timeline card**: a mini video editor with a gradient preview, play button, and VIDEO / CAPTIONS / MUSIC tracks filling in with an AUTO EDIT tag.
- **Upload progress**: file row (final_video.mp4, mono meta) with a green bar filling 0 -> 100 percent and the percentage counting, then PUBLISHED and PUBLIC pills.
- **A-to-Z pipeline**: big serif "A" and italic green "Z" with a dotted line between them; dots light up with mono labels (IDEA, SCRIPT, VOICE, EDIT, THUMB, UPLOAD), then a caption line "A se Z tak, sab manage".
- **Chip cloud**: category chips (Fitness, Finance, Cooking...) appear, then one highlights in green.
- **Search + results**: a search bar types the query, a MOST VIRAL black pill appears, result rows with pastel thumbnails and counting view numbers, then the winner row highlights in cream with a green VIRAL tag and a line under it ("Usko nikalega").
- **Three-step tiles**: three small cards (01 Script, 02 Voice, 03 Edit) that tick green in order; a waveform animates on Voice; an arrow then reveals the output video card.
- **Week calendar**: THIS WEEK list (MON to SUN, title, time) with SCHEDULED pills ticking in row by row, a cursor clicking a green SET UP button.
- **CTA comment box**: headline "Comment mein likho" + giant italic green quote word, then a comment input that types the word with a blinking cursor and a green round send button.

Invent new cards in the same visual language when nothing fits. Keep them flat, airy and UI-like, never cartoonish.

### Finance-creator extras (use when relevant, restyled to the palette)
- Brand / app / company mentioned and a logo image is provided: logo rises BEHIND the speaker on a speaker shot. Cut the speaker out with a person mask (MediaPipe selfie segmentation or rembg) so the head overlaps the logo; dim and slightly blur the room while it is up. Never draw a fake version of a real logo; if missing, say so and use a neutral card instead.
- Money / profit / paisa: money photo fills the background behind the speaker, or a counter card with a green number; cash register sound.
- Prompt or search typed: white chat pop-up that types the text, taps send, then highlights the key phrase in a yellow marker sweep when spoken.
- Screenshots: white rounded card slides up, zooms into the exact line being read, spotlight box (rest dimmed, green / red / gold outline) or yellow marker sweep.
- Date or year: flip calendar card whose page flips to that date.
- Number / percentage / growth: white graph card with big counting number, small outlined badge, and a green line (red only for loss) drawing itself with a glowing end dot.
- Objects / reactions: small 3D style icon pops with a bounce, only if no card idea fits.
- Closing question: CTA card style ("Aap kya sochte ho? Comments mein batao").

### Motion rules
- Ease: cubic-bezier(0.22, 1, 0.36, 1) (soft ease-out). Elements fade + rise 24 px over 0.35 to 0.5 s. Pops: scale 0.85 -> 1.0 with slight overshoot. Stagger 0.08 to 0.15 s.
- Every element appears on the exact word it represents (word-level timestamps). Lead by 2 to 4 frames so it lands with the word.
- Typing: 18 to 28 chars per second with a blinking caret.
- Numbers count with ease-out over 0.6 to 1.0 s.
- Hold the finished card 0.3 to 0.8 s before the cut back to the speaker.

### Sound
- Subtle UI sounds kept 12 to 18 dB under the voice: soft click on checks and toggles, light pop on tiles and pills, typing ticks on typing, short whoosh on scene cuts into cards (quiet), page flip on calendars, cash register on money.
- Optional soft lo-fi or ambient bed at about -28 LUFS, ducked under speech. No music if the user says no.
- Voice loudness-normalised to -14 LUFS integrated, true peak -1 dB.

### Speaker grade
Slight sharpen, gentle warm grade, soft vignette, mild contrast. Never cover the face with front graphics during speaker shots (front elements only in the lower third, and only logos/backgrounds behind the speaker).

### Captions (only if asked)
Bold white with black outline, key words in yellow, max 3 words at a time, each word on its exact timestamp, lower third, never on the face. Do not caption over card scenes (the card headline already carries the words).

## Workflow

### Step 1: Understand
- Probe the video (ffprobe). If landscape, crop 9:16 from centre (or letterbox if asked).
- Transcribe with word-level timestamps (faster-whisper or whisper, word_timestamps=True; Hindi/English/Hinglish, output in Roman script). If a script is provided, align and correct words to it. If model downloads are blocked, say so and ask for the script or an SRT.
- Look at every attached image and classify it (logo, money photo, product, screenshot, graph reference).
- Sample frames to find face position and framing.
- Detect silences and retakes; build a cut list.

### Step 2: Plan
Write an edit plan (JSON) of segments: {start, end, type: speaker|card|speaker+behind, scene: library id, headline, eyebrow, italic_word, elements:[{text, appear_at_word_time}], sfx:[...]}. Aim for 55 to 65 percent card time, a card for every distinct idea, and the speaker on camera for the hook, emotional or personal lines, and transitions between ideas. Group words into headline phrases; pick ONE italic green key word per headline.

### Step 3: Storyboard, then STOP
- Render one real frame per segment (card scenes at their fully built state, speaker shots with grade/zoom/overlays) using the actual pipeline below.
- Build a contact sheet or simple HTML storyboard: frame, timestamp, exact spoken words, what appears on screen.
- List anything guessed: unclear words, missing logos/images, assumed spellings.
- Send it and wait. Apply change requests (swap image, move, retime to a word, remove, add, fix word, change text, captions on/off, colour change, green screen) and re-show the storyboard.

### Step 4: Final render (only when the user says "make the video" / "looks good")
- State the rough render time first.
- Render card scenes as HTML/CSS (one page per scene, Web Animations API or CSS keyframes, fonts bundled locally). Make the timeline seekable: pause all document.getAnimations() and set currentTime per frame, then capture each frame with Playwright at 1080x1920 (deviceScaleFactor 1) to PNG. This is deterministic and frame-accurate.
- Speaker shots: ffmpeg trim + crop/scale + zoompan punch-ins + grade (unsharp, eq, colorbalance, vignette). For logos behind the speaker, composite background -> logo -> masked speaker per frame.
- Concatenate segments with hard cuts over the ORIGINAL continuous voice track (after silence/retake cuts), mix SFX with amix/adelay, loudnorm the voice.
- Encode H.264 yuv420p, CRF 18, -preset veryfast, AAC 192k, +faststart.
- Verify: audio and video durations match (within 1 frame), sample frames from the final file at several timestamps and look at them, check no em dashes in text, check no graphic covers the face on speaker shots.
- Green-screen version (if asked): only the graphics on pure #00FF00 at full frame, speaker silhouette cut out of logos behind the speaker, no zoom, same timing, so it can be keyed over the raw clip at 0:00.
- Send the MP4 (and green screen) with a one-line summary.

## Change requests the user may send
- "Use money-rain.jpg instead of the cash icon at 0:03"
- "Put the Zomato logo on the left side of my head"
- "Show the calendar when I say 'next Monday', not earlier"
- "Remove the trophy icon" / "Add a graph when I say 'double my money'"
- "I said 'Swiggy', not 'Siggy'"
- "Write 'Listing day' inside the calendar"
- "Add captions, key words in yellow" / "No captions"
- "Make the accent blue" (swap the accent colour everywhere)
- "More of me on screen" / "More cards" (shift the card-time ratio)
- "Also give me the green screen version"

## Never
- Never cover the speaker's face with front graphics.
- Never invent a real brand's logo.
- Never change the speaker's words or language.
- Never use em dashes in on-screen text.
- Never render the final video before the storyboard is approved.