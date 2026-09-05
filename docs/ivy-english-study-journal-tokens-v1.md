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
- `--journal-body: #1F2340`
- functional danger: `#D34D4D`

No gray-toned decorative palette is allowed.

## 4. Spacing

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

## 5. Geometry

The redesign intentionally avoids one universal SaaS radius.

- clean paper: 6–10 px
- receipt: 0–6 px plus torn-edge treatment
- sticky note: 2–6 px
- index / stamp: near-square or 0–4 px
- controls: 8–12 px
- compact pill tags: fully rounded allowed
- active exam controls: preserve formal CBT geometry

Large 20–24 px rounded cards should not become the default journal container.

## 6. Borders

- standard paper edge: 1 px
- stamp: 2 px
- grid / ruled line: 1 px at low opacity
- primary structural line: Ink Blue / Turquoise-derived, never neutral gray when journal styling is active
- use dashed borders for receipt separators and temporary / review states sparingly

## 7. Shadows

Paper shadows are directional, bright and low-opacity.

Primary paper shadow:

`5px 6px 0 rgba(63, 99, 242, 0.10)`

Small paper shadow:

`3px 4px 0 rgba(0, 155, 159, 0.09)`

Rules:

- no large blurred gray floating-card shadow
- paper may feel stacked, not elevated like a modal
- mobile shadows are reduced

## 8. Texture

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

## 9. Rotation and collage density

Desktop:

- ordinary paper tilt: max about ±0.5°
- accent tape / stamp can exceed this slightly
- generally no more than 1–3 obvious collage gestures per viewport

Mobile:

- remove most paper rotation
- prioritize vertical flow
- decorative overlap should be rare

## 10. Buttons

Primary journal CTA:

- dark Ink surface
- white label
- small Turquoise Green offset shadow
- 40–44 px minimum height

Secondary:

- bright paper
- Ink / Turquoise border or text

Marker Pink:

- annotation or rare expressive action only
- not a general CTA color

## 11. Motion

Standard timing:

- press feedback: 100–140 ms
- hover / paper lift: 160–220 ms
- sheet unfold / reveal: 220–320 ms

Use ease-out style motion.

No continuous floating or bouncing decoration.

## 12. Responsive breakpoints

Follow Tailwind defaults currently used by the app, with product rules:

- phone: single-column journal flow
- four core study subjects: `2 × 2`, never horizontal-scroll-only
- tablet: allow two-column papers if content remains readable
- desktop: mild layering and paired paper layouts allowed
- formal IELTS CBT remains desktop / tablet-landscape focused

## 13. Pilot acceptance

Home Pilot is accepted only if:

1. first screen immediately feels brighter and more personal than the old SaaS UI;
2. main actions remain obvious;
3. Paper Cream + Ink Blue + Marker Pink + Turquoise read as one identity;
4. supporting colors feel like stationery rather than subject coding;
5. mobile keeps the identity without desktop collage density;
6. no visible gray cast is introduced by backgrounds, borders or shadows;
7. the page still feels usable for daily long-term use rather than like a one-off poster.
