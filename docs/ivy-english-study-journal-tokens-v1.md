# Ivy English · Study Journal Design Tokens v1

Status: **Frozen pilot tokens**  
Parent spec: `docs/ivy-english-study-journal-design-spec-v1.md`  
Applies first to: Home → Practice → Session Detail pilots.

## 1. Typography

### Sans / product voice

- Family: `Manrope`, `Noto Sans SC`, system sans fallback.
- Use for navigation, controls, body text, forms, metadata, long study content.
- Body default: 14–16 px depending on density.
- Mobile helper text should normally not drop below 12 px.
- Weight range: 400 normal, 500 emphasis, 600 UI emphasis only.

### Serif / editorial voice

- Family: `Fraunces`, `Songti SC`, Georgia fallback.
- Use for brand name, page titles, section titles, session titles and selected large numbers.
- Do not use for dense tables, instructions or long answer text.

### Handwritten / annotation voice

- Family: `Caveat`, `Kaiti SC`, `STKaiti`, cursive fallback.
- Use only for short marker-style annotations, arrows, encouragement and decorative notes.
- Never use for essential controls, navigation, instructions or long text.

## 2. Type scale

Desktop recommended:

- brand hero: 48–56 px serif
- page title: 36–44 px serif
- section title: 22–28 px serif
- card title: 16–20 px serif or sans depending on content
- body: 14–16 px sans
- helper/meta: 11–13 px sans
- handwritten annotation: 20–28 px

Mobile recommended:

- brand hero: 36–42 px
- page title: 30–36 px
- section title: 20–24 px
- body: 14–16 px
- helper/meta: 12 px minimum for normal reading

## 3. Color tokens

Core:

- `--journal-canvas: #FFF9F0`
- `--journal-paper: #FFFCF7`
- `--journal-ink: #17306D`
- `--journal-blue: #3F63F2`
- `--journal-pink: #FF5DB1`
- `--journal-turquoise: #009B9F`

Stationery:

- `--journal-mint: #E8FFD8`
- `--journal-yellow: #FFF3A6`
- `--journal-peach: #FFD4B5`
- `--journal-lavender: #E9D8FF`
- `--journal-aqua: #D6FFF7`
- `--journal-green: #AEEB8C`
- `--journal-turquoise-green: #7FEFD4`

Structure:

- `--journal-line: #BFD5FF`
- `--journal-line-strong: #92B7FF`
- `--journal-body: #1F2340`
- functional danger: `#D34D4D`

No gray-toned decorative palette is allowed.

## 4. Frozen subject identity colors

Listening / Speaking / Reading / Writing have persistent semantic colors across the product.

These colors should appear consistently on:

- module entry buttons
- module action buttons
- module tabs / chips
- progress series
- history labels
- subject-specific note edges
- active states and selected module navigation

### Listening

- strong: `Turquoise #009B9F`
- light paper: `Fresh Aqua #D6FFF7`
- CSS: `--subject-listening`, `--subject-listening-soft`

### Speaking

- strong: `Marker Pink #FF5DB1`
- light paper: high-lightness Paper Cream / Marker Pink mix
- CSS: `--subject-speaking`, `--subject-speaking-soft`

### Reading

- strong: `Fresh Reading Green #63C94A`
- light paper: `Note Mint #E8FFD8`
- CSS: `--subject-reading`, `--subject-reading-soft`
- Reading green must remain clearly visible against Paper Cream and Note Mint. Do not revert it to the very pale `#AEEB8C` as the primary accent; that color remains available as a stationery/support green.

### Writing

- strong: `Ink Blue #3F63F2`
- light paper: `Lavender Note #E9D8FF`
- CSS: `--subject-writing`, `--subject-writing-soft`

### Subject-color rule

Subject colors are persistent identities, not random decoration.

Do not swap the four subject colors from page to page.

A page may still use Paper Cream, Butter Yellow, Peach Tape and other stationery colors for non-subject information, but whenever an action clearly belongs to one of the four subjects, its primary accent should use that subject's semantic color.

### Subject icon rule

Subject icons use **linework only** in the subject color by default.

- no filled square or rectangular icon background in standard module cards
- no colored tile behind Listening / Speaking / Reading / Writing icons unless a later component has a specific functional reason
- the icon stroke itself is the semantic color
- keep the icon visually light so the paper/card remains the dominant material

### Neutral continuation/history rule

Cross-subject surfaces such as `继续上次`, generic history summaries, all-subject recents, and other neutral navigation must **not inherit the color of the most recent subject**.

Use a non-subject stationery surface such as:

- Paper Cream / clean paper
- Butter Yellow
- Peach Tape accents

The actual subject can still appear as a small label or accent inside the surface when useful.

### Neutral planning color rule

Mixed-subject planning areas such as `Today's Plan` must read as one coherent form rather than four competing subject-colored rows.

For the current Home pilot:

- left-side task titles use `Journal Ink #17306D`
- right-side duration values use `Turquoise #009B9F`
- row helper copy stays in the standard readable ink hierarchy
- subject colors are reserved for actual subject-specific entry points, progress series, labels, or controls

### Marker / guidance semantics

Visual marks that imply **direction, action, pointing, annotation target, or alert** must have a real semantic reason.

Examples that require meaning:

- arrows
- pointer marks
- callout circles / dots
- highlighted target boxes
- exclamation marks used as alerts
- underlines that visually point to a specific action

Rules:

- do not add arrows or pointer-like marks as empty decoration
- arrows are appropriate on real links / navigation / continuation actions
- decorative handwritten copy should prefer plain punctuation instead of fake directional marks
- decorative hearts are not part of the current Home visual language; use `!` where a short energetic handwritten ending is desired
- system / Vercel Preview comment markers are not product UI and should not influence the production design

## 5. Spacing

Base rhythm: **4 px**.

Preferred tokens:

- 4 px: micro gap
- 8 px: compact inline gap
- 12 px: control grouping
- 16 px: card internal small spacing
- 20 px: mobile paper padding
- 24 px: standard card/paper padding
- 28–32 px: desktop feature paper padding
- 36–44 px: section separation
- 56–72 px: major desktop editorial separation only

Do not introduce arbitrary spacing when an existing rhythm value works.

## 6. Geometry

The redesign intentionally avoids one universal SaaS radius.

- clean paper: 6–10 px
- receipt / checklist paper: 0–3 px with a **flat, straight bottom edge**
- sticky note: 0–3 px
- index / stamp: near-square or 0–4 px
- controls: 8–12 px
- compact pill tags: fully rounded allowed
- active exam controls: preserve formal CBT geometry

Large 20–24 px rounded cards should not become the default journal container.

Decorative torn / zigzag edges are not part of the current frozen receipt treatment. Prefer a clean flat paper edge with a visible border.

## 7. Borders

- standard paper edge: 1 px
- receipt / checklist paper: full rectangular 1 px outline, including a straight bottom border
- stamp: 2 px
- grid / ruled line: 1 px at low opacity
- primary structural line: Ink Blue / Turquoise-derived, never neutral gray when journal styling is active
- use dashed borders for receipt separators and temporary / review states sparingly

## 8. Shadows

Paper shadows are directional, bright and low-opacity.

Primary paper shadow:

`5px 6px 0 rgba(63, 99, 242, 0.10)`

Small paper shadow:

`3px 4px 0 rgba(0, 155, 159, 0.09)`

Rules:

- no large blurred gray floating-card shadow
- paper may feel stacked, not elevated like a modal
- mobile shadows are reduced
- sticky notes may use the relevant subject color at low opacity for their offset shadow

## 9. Sticky-note treatment

A sticky note must look materially different from a SaaS card.

Required cues:

- near-square corners
- small directional paper shadow
- slight desktop rotation, normally under ±0.75°
- a short tape strip at the top edge when the note is used as a pinned / collected item
- subject-colored edge or shadow when the note belongs to Listening / Speaking / Reading / Writing
- no large soft blur shadow

A note should still be easy to scan and click.

Question-bank memory cards, quick reminders and small historical fragments should prefer `StickyNote` over generic rounded cards when the content metaphor is “something saved / pinned / remembered”.

## 10. Texture

Texture must remain nearly invisible.

Allowed:

- tiny ink speckles at very low opacity
- grid paper
- ruled paper
- receipt lines

Not allowed:

- dirty vintage textures
- beige-gray overlays
- heavy noise
- obvious paper-photo backgrounds behind reading content

## 11. Rotation and collage density

Desktop:

- ordinary paper tilt: max about ±0.5°
- sticky notes: max about ±0.75°
- accent tape / stamp can exceed this slightly
- generally no more than 1–3 obvious collage gestures per viewport

Mobile:

- remove most paper rotation
- prioritize vertical flow
- decorative overlap should be rare

## 12. Buttons

### Global journal CTA

- Ink / Turquoise may be used for cross-product actions that do not belong to one subject.
- white or high-contrast label
- small bright offset shadow
- 40–44 px minimum height

### Subject CTA

Use the persistent subject identity color:

- Listening button → Turquoise
- Speaking button → Marker Pink
- Reading button → Fresh Reading Green `#63C94A` with dark Ink text
- Writing button → Ink Blue

The `subject-button` utility should be preferred for these controls.

### Secondary

- bright paper
- relevant subject outline / text where the action belongs to a subject
- otherwise Ink / Turquoise

### Marker Pink

Marker Pink is both the Speaking identity and the general handwritten marker color. Context must distinguish these uses. Do not turn all generic CTAs pink.

## 13. Motion

Standard timing:

- press feedback: 100–140 ms
- hover / paper lift: 160–220 ms
- sheet unfold / reveal: 220–320 ms

Use ease-out style motion.

No continuous floating or bouncing decoration.

## 14. Responsive breakpoints

Follow Tailwind defaults currently used by the app, with product rules:

- phone: single-column journal flow
- four core study subjects: `2 × 2`, never horizontal-scroll-only
- tablet: allow two-column papers if content remains readable
- desktop: mild layering and paired paper layouts allowed
- formal IELTS CBT remains desktop / tablet-landscape focused

## 15. Pilot acceptance

Home Pilot is accepted only if:

1. first screen immediately feels brighter and more personal than the old SaaS UI;
2. main actions remain obvious;
3. Paper Cream + Ink Blue + Marker Pink + Turquoise read as one identity;
4. Listening / Speaking / Reading / Writing retain their frozen semantic colors consistently;
5. subject icons are line-only by default and do not sit on colored square tiles;
6. neutral continuation/history surfaces do not masquerade as a subject module through their background color;
7. mixed-subject plan rows use one coherent text hierarchy instead of four subject colors;
8. arrows, target marks and alert-like symbols appear only when they carry real meaning;
9. sticky-note content looks physically pinned or collected rather than like another rounded product card;
10. receipt / checklist paper uses a clean flat bottom edge with a visible straight border;
11. mobile keeps the identity without desktop collage density;
12. no visible gray cast is introduced by backgrounds, borders or shadows;
13. the page still feels usable for daily long-term use rather than like a one-off poster.
