# Ivy English · Study Journal Design Tokens v1.1

Status: **FROZEN visual implementation tokens**  
Parent spec: `docs/ivy-english-study-journal-design-spec-v1.md` (v1.2)  
Copywriting: **DEFERRED**

---

## 1. Typography

### Sans / product voice

- Family: `Manrope`, `Noto Sans SC`, system sans fallback
- Body: 14–16 px
- Helper / meta: 11–13 px desktop; normally ≥12 px mobile
- Weight: 400 normal, 500 emphasis, 600 UI emphasis

### Serif / editorial voice

- Family: `Fraunces`, `Songti SC`, Georgia fallback
- Brand hero: 48–56 px desktop / 36–42 px mobile
- Page title: 36–44 px desktop / 30–36 px mobile
- Section title: 22–28 px desktop / 20–24 px mobile

### Handwritten / annotation voice

- Family: `Caveat`, `Kaiti SC`, `STKaiti`, cursive fallback
- Typical size: 20–28 px
- Decorative / annotative only; never essential UI text

---

## 2. Core color tokens

```css
--journal-canvas: #FFF9F0;
--journal-paper: #FFFCF7;
--journal-ink: #17306D;
--journal-blue: #3F63F2;
--journal-pink: #FF5DB1;
--journal-turquoise: #009B9F;
--journal-mint: #E8FFD8;
--journal-yellow: #FFF3A6;
--journal-peach: #FFD4B5;
--journal-lavender: #E9D8FF;
--journal-aqua: #D6FFF7;
--journal-green: #AEEB8C;
--journal-turquoise-green: #7FEFD4;
--journal-line: #BFD5FF;
--journal-line-strong: #92B7FF;
--journal-body: #1F2340;
--journal-danger: #D34D4D;
```

No gray-toned decorative palette is allowed.

`#AEEB8C` is support stationery green; it is **not** the primary Reading accent.

---

## 3. Frozen subject tokens

```css
--subject-listening: #009B9F;
--subject-listening-soft: #D6FFF7;

--subject-speaking: #FF5DB1;
--subject-speaking-soft: color-mix(in srgb, #FF5DB1 18%, #FFF9F0);

--subject-reading: #63C94A;
--subject-reading-soft: #E8FFD8;

--subject-writing: #3F63F2;
--subject-writing-soft: #E9D8FF;
```

### Subject mapping

- Listening → Turquoise `#009B9F`
- Speaking → Marker Pink `#FF5DB1`
- Reading → Reading Green `#63C94A`
- Writing → Writing Blue `#3F63F2`

Use these persistently for subject-specific primary actions, tabs, progress, labels, selected state, semantic edges and icon strokes.

Do not automatically color cross-subject surfaces by the most recent subject.

---

## 4. Subject icon rule

Standard Listening / Speaking / Reading / Writing icons:

- use linework only;
- icon stroke = subject color;
- no filled square / rectangular icon tile;
- no decorative colored plate behind the icon;
- filled backgrounds are reserved for real control states, not subject decoration.

---

## 5. Spacing

Base rhythm: **4 px**.

- 4 px: micro gap
- 8 px: compact inline gap
- 12 px: control grouping
- 16 px: compact paper internal spacing
- 20 px: standard mobile paper padding
- 24 px: standard desktop paper padding
- 28–32 px: feature paper padding
- 36–44 px: section separation
- 56–72 px: major editorial separation only

---

## 6. Geometry

- clean paper: 6–10 px radius
- receipt / checklist: 0–3 px
- sticky note: 0–3 px
- index card: 0–3 px
- stamp / ticket: 0–4 px
- controls: 8–12 px
- compact semantic tags: pill allowed

Do not default to 20–24 px SaaS card radii.

---

## 7. Paper materials

### Clean Paper

- background: `--journal-paper`
- 1 px blue / turquoise-derived border
- subtle offset paper shadow
- long-form readability first

### Grid Paper

Typical desktop grid:

```css
background-size: 24px 24px;
```

Use for boards, hero areas and collected fragments, not long essays.

### Receipt / Checklist

Frozen treatment:

- flat straight bottom edge
- full rectangular 1 px outline
- near-square corners
- dashed / ruled separators allowed
- **no torn / zigzag edge**

### Sticky Note

Material cues:

- near-square corners
- small directional offset shadow
- slight desktop rotation, normally ≤ ±0.75°
- tape only when content is genuinely pinned / collected
- optional subtle ruled lines
- subject-colored edge / shadow when subject-specific

### Index Card

- clean paper first
- subject color as top rule / edge / small type, not necessarily full-card fill
- minimal radius
- optional ruled structure
- directional paper offset

### Neutral Note

Use Paper Cream / Butter Yellow / other non-subject stationery for cross-subject items such as Continue or generic History.

---

## 8. Border and rule tokens

- paper edge: 1 px
- stamp: 2 px
- grid / ruled line: 1 px low opacity
- structural lines derive from `--journal-line`, `--journal-line-strong`, Turquoise or Writing Blue
- do not introduce neutral-gray framing in Study Journal mode

---

## 9. Shadow tokens

```css
--journal-paper-shadow: 5px 6px 0 rgba(63, 99, 242, 0.10);
--journal-paper-shadow-small: 3px 4px 0 rgba(0, 155, 159, 0.09);
```

Rules:

- directional rather than blurred
- low opacity
- bright tint
- subject-colored offset allowed for subject notes
- mobile shadows reduced
- no large soft gray floating-card shadow

---

## 10. Semantic decoration rules

### Arrows

Only for real action, destination, flow or next step.

### `!`

Only for real emphasis / attention.

### Hearts

Decorative hearts are not part of the frozen visual system.

### Tape

Only when the paper is semantically pinned / attached / collected.

### Clips

Only for attachments, files, saved documents or materially attached fragments.

### Handwritten notes

Real annotation / encouragement / emphasis only; never essential navigation or filler.

---

## 11. Buttons

### Global CTA

Cross-product actions may use Deep Ink or Turquoise.

Minimum height: 40–44 px.

### Subject CTA

- Listening → `#009B9F`
- Speaking → `#FF5DB1`
- Reading → `#63C94A` with dark Ink text when required for contrast
- Writing → `#3F63F2`

### Secondary

Bright paper + relevant subject outline / text when subject-specific; otherwise Deep Ink / Turquoise.

### Destructive

Functional red only; never Marker Pink.

---

## 12. Home frozen implementation rules

### Hero

- Grid Paper
- Deep Ink title
- handwritten annotation allowed only when semantically meaningful

### Today Plan

- Receipt / Checklist paper
- flat straight bottom edge
- left task titles = Deep Ink `#17306D`
- right durations = Turquoise `#009B9F`
- row separators = light blue dashed / ruled lines
- do not color each task title by subject

### Continue

- neutral stationery surface, currently Butter Yellow
- not a subject-colored surface
- tape only if treated as a pinned saved note

### Quick Start

- 2 × 2 layout
- subject soft papers allowed
- subject icon = line-only
- no square icon tile
- paper material cues must be stronger than generic card cues

### Weekly progress

- restrained paper framing
- four subject progress lines use frozen subject colors

### Recent Question Bank

- Sticky Note treatment allowed
- tape is justified because these are collected question memories

---

## 13. Motion

- press feedback: 100–140 ms
- hover / paper lift: 160–220 ms
- sheet reveal: 220–320 ms

No continuous floating, bouncing stickers, confetti or decorative motion during focused study.

---

## 14. Responsive rules

- phone: mostly single-column notebook flow
- four core subjects: 2 × 2, never horizontal-scroll-only
- reduce paper rotation and overlap on mobile
- preserve large touch targets
- preserve subject identity
- formal CBT remains desktop / tablet-landscape focused when necessary

---

## 15. Accessibility

- strong body contrast
- dark readable text on pastel papers
- never communicate correct / wrong / complete with color alone
- keyboard focus visible
- handwritten text non-essential
- Marker Pink is not long-form body text

---

## 16. Copywriting status

Visual tokens are frozen; **copy is not**.

Do not optimize slogans, handwritten phrases, section titles or microcopy during the visual migration unless wording blocks functionality.

A dedicated copywriting pass comes after visual / functional migration.

---

## 17. Acceptance checklist

A Study Journal page passes only if:

1. paper type is identifiable from structure, not color alone;
2. no gray / dusty cast is introduced;
3. subject mapping is consistent;
4. subject icons are line-only by default;
5. cross-subject surfaces remain neutral;
6. arrows / `!` / tape / clips have real semantic meaning;
7. receipt / checklist paper uses a flat straight edge;
8. sticky notes do not read as rounded SaaS cards;
9. long-form content remains comfortable;
10. mobile simplifies the collage language;
11. active IELTS CBT remains formal and undecorated.
