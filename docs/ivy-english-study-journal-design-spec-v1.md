# Ivy English · Study Journal Design Specification v1

Status: **Frozen visual direction for the Study Journal redesign**  
Branch: `feature/learning-flow-v2`  
Scope: Home, Practice, History / Session, Progress, Mistakes, Vocabulary, Library, Settings, Bank, Daily Speaking / Listening / Reading / Writing.  
Exception: IELTS CBT exam surfaces keep a formal exam-system visual language.

---

## 1. Product visual idea

Ivy English should feel like a **personal English study journal that keeps growing over time** rather than a generic learning SaaS dashboard.

The visual language is:

- personal study journal
- editorial scrapbook
- bright stationery
- clipped paper / receipt / note / index-card logic
- handwritten annotations used sparingly
- clear information hierarchy underneath the playful surface

The product should feel handmade, bright, optimistic and personal, while still being fast to scan and comfortable for long study sessions.

### Key principle

**Organised scrapbook, not random collage.**

Decorative elements must either:

1. create hierarchy,
2. communicate state,
3. reinforce the learning-journal metaphor,
4. or add a small amount of personality.

If an ornament does none of these, remove it.

---

## 2. Non-negotiable color direction

### 2.1 Brightness rule

The user explicitly prefers **high-lightness, clear colors with no gray cast**.

Do not use:

- dusty sage
- muted beige-gray
- blue-gray
- gray-green
- desaturated mauve
- smoky pastel colors
- "premium neutral" palettes with visible gray undertones

Neutral areas should be warm, clean paper colors rather than gray.

### 2.2 Final palette

| Token | Name | Hex | Primary use |
|---|---|---:|---|
| `--paper-cream` | Paper Cream | `#FFF9F0` | main canvas, paper surfaces, large quiet areas |
| `--ink-blue` | Ink Blue | `#3F63F2` | major headings, printed marks, selected navigation, strong graphic accents |
| `--marker-pink` | Marker Pink | `#FF5DB1` | handwritten emphasis, marker strokes, circles, underlines, key moments |
| `--note-mint` | Note Mint | `#E8FFD8` | soft note cards, completion summaries, gentle supportive information |
| `--butter-yellow` | Butter Yellow | `#FFF3A6` | review notes, reminders, highlights, small information layers |
| `--peach-tape` | Peach Tape | `#FFD4B5` | tape, paper overlap, soft secondary stationery pieces |
| `--lavender-note` | Lavender Note | `#E9D8FF` | secondary notes, vocabulary / idea cards, occasional category support |
| `--fresh-aqua` | Fresh Aqua | `#D6FFF7` | light audio / speaking / freshness accents, subtle background note blocks |
| `--apple-green` | Apple Green | `#AEEB8C` | positive progress, completion details, check marks, small lively accents |
| `--turquoise-green` | Turquoise Green | `#7FEFD4` | light turquoise stationery, tags, supporting accents |
| `--turquoise` | Turquoise | `#009B9F` | strong secondary identity accent, charts, section marks, active states |

### 2.3 Core identity colors

The primary brand identity is built from:

- Paper Cream `#FFF9F0`
- Ink Blue `#3F63F2`
- Marker Pink `#FF5DB1`
- Turquoise `#009B9F` as the strongest supporting accent

Mint, yellow, peach, lavender, aqua and apple green are supporting stationery colors.

### 2.4 Color balance

Recommended visual balance on normal pages:

- 55–70% Paper Cream / clean paper surfaces
- 12–18% Ink Blue / primary ink structure
- 5–10% Turquoise and Turquoise Green
- 5–10% pale stationery colors combined
- Marker Pink usually under 5%

Marker Pink should feel like a real marker stroke: rare enough that it remains meaningful.

### 2.5 Semantic color guidance

Do not force each subject into a permanent separate brand color.

Listening / Speaking / Reading / Writing should stay within the same journal system and be distinguished primarily through iconography, material treatment and content patterns.

Suggested semantic roles:

- important / handwritten emphasis → Marker Pink
- active / strong secondary navigation → Turquoise
- correct / complete → Apple Green or Note Mint
- reminder / review → Butter Yellow
- soft secondary content → Lavender Note / Fresh Aqua
- structure / major heading → Ink Blue

For errors and destructive actions, use a clear accessible red that does not become part of the decorative palette. It should remain a functional system color.

---

## 3. Surface and paper system

The page should not look like one flat app background with identical rounded cards.

Create a small material vocabulary:

### 3.1 Canvas

Base: Paper Cream `#FFF9F0`.

The canvas may use an extremely subtle paper texture. The texture must never become dirty, antique or gray.

### 3.2 Clean paper

Use for long reading, writing and dense information.

Characteristics:

- bright warm white / cream
- near-flat surface
- very light border
- minimal shadow
- highest readability

### 3.3 Grid paper

Use selectively for:

- Home hero fragments
- vocabulary cards
- planning / checklist areas
- handwritten annotations
- small background fragments

Do not use grid paper behind long reading passages or long essays.

### 3.4 Receipt / guest-check paper

Use for compact structured data such as:

- Today's Plan
- session summary
- weekly totals
- exam result summary
- quick progress breakdown

### 3.5 Sticky note

Use for one short idea only.

Good examples:

- reminder
- one learning insight
- one weak point
- one vocabulary note
- one daily message

Do not place paragraphs inside decorative sticky notes.

### 3.6 Clipped / taped paper

Tape and clips are accents, not containers for every section.

Maximum guideline: usually 1–3 obvious collage details in one viewport.

---

## 4. Typography

Typography must support three distinct voices.

### 4.1 Product / body voice

Use a highly readable sans-serif for:

- body copy
- controls
- navigation
- form labels
- long study content
- tables
- progress data

Chinese text must remain clean and highly legible.

### 4.2 Editorial / journal title voice

Use a serif or editorial display face for:

- Ivy English
- page titles
- section hero headings
- session titles
- selected large numbers

The serif should feel literary and editorial rather than luxury-fashion.

### 4.3 Handwritten voice

Use handwritten typography only for:

- short annotations
- encouragement
- marker labels
- arrows
- underlines
- very short emphasis

Do not use handwriting for body copy, navigation, long instructions or important form labels.

### 4.4 Language rule

Navigation and normal interaction text should primarily be Chinese.

Keep official IELTS concepts in English where natural:

- IELTS Listening
- Part 1 / Part 2 / Part 3
- Task 1 / Task 2
- Familiarisation
- Review

Avoid random Chinese-English mixing where the English term adds no value.

---

## 5. Borders, corners and shadows

### 5.1 Corners

The current product relies too heavily on uniform SaaS-style rounded rectangles.

Study Journal should use mixed geometry:

- paper sheets: subtle radius or nearly square
- sticky notes: small radius
- buttons: can still use compact rounded / pill controls
- receipts: small radius or paper edge treatment
- tape: square / irregular edge

Do not make every container a large 20–24 px rounded card.

### 5.2 Borders

Use light ink / paper-edge borders.

Grid, ruled and receipt lines may use Ink Blue or Turquoise at low opacity.

### 5.3 Shadows

Use shadows to suggest stacked paper, not floating SaaS cards.

Preferred:

- small directional offset
- low blur
- very low opacity

Avoid large soft gray drop shadows.

---

## 6. Component vocabulary

The redesign should create reusable components before full-page migration.

Planned primitives:

- `PaperCard`
- `GridPaper`
- `ReceiptCard`
- `StickyNote`
- `TapeLabel`
- `MarkerText`
- `HandwrittenNote`
- `PaperButton`
- `PaperTabs`
- `PaperInput`
- `NotebookSection`
- `StampBadge`
- `IndexTab`
- `VoiceMemoCard`
- `AnswerSheet`

The components must support responsive layouts and should not encode one page's content directly.

---

## 7. Buttons and controls

Controls must remain immediately understandable even when styled as stationery.

### Primary action

Use Ink Blue or Turquoise.

Examples:

- start practice
- save session
- continue
- enter exam

### Secondary action

Use clean paper with Ink Blue / Turquoise outline or text.

### Marker action

Marker Pink is allowed for rare expressive actions or short visual emphasis, not for every primary CTA.

### Destructive action

Use a functional red treatment, not Marker Pink.

### Interaction rule

Never sacrifice hit area, focus visibility or affordance to preserve the collage illusion.

---

## 8. Inputs and writing surfaces

Long-form input should feel like real writing paper while keeping native usability.

Use:

- clean paper
- optional ruled lines
- generous padding
- highly legible body font
- clear focus state

Avoid decorative backgrounds behind long essays.

Writing, notes and transcript fields may use subtle paper cues rather than heavy borders.

---

## 9. Charts and progress visualization

Progress is an **analysis journal**, not a decorative scrapbook page.

Charts must remain accurate and easy to read.

Use:

- Ink Blue for primary series
- Turquoise for secondary / comparison series
- Marker Pink only to point out one exceptional point
- Apple Green for completion / success
- Butter Yellow for highlighted ranges / review areas

Avoid using all palette colors in one chart.

Decorative handwritten notes may annotate a chart outside the plotting area.

---

## 10. Page-specific visual strength

Different pages should use different collage intensity.

### High visual expression

**Home**

- strongest scrapbook identity
- Today Plan as receipt / guest check
- one handwritten daily note
- layered quick-start paper pieces
- weekly summary as compact stationery object

### Medium visual expression

**Practice**

- clear subject hierarchy
- practice cards may use different paper materials
- History / Progress / Exam are index-like navigation controls
- Focus Timer may look like a timer ticket / receipt control

### Low-to-medium visual expression

**Session Detail / History**

- content first
- question / answer sheets
- writing manuscript
- listening material ticket
- voice memo blocks
- highlights and notes feel like actual annotations

### Low visual expression

**Progress**

- data-first
- restrained stationery framing
- clear charts and metrics

### Medium visual expression

**Mistakes / Vocabulary / Library**

- Mistakes → correction notebook
- Vocabulary → index card / encounter slips
- Library → clipped paper / folder-tab system

---

## 11. IELTS CBT exception

IELTS Reading, Listening and Writing exam pages should **not** inherit the full scrapbook visual style.

When entering Exam Mode, the product intentionally switches from:

**Ivy Study Journal** → **Formal IELTS Computer Test Environment**

CBT pages should remain:

- neutral
- structured
- dense where appropriate
- formal
- focused on exam familiarity

Allowed journal identity:

- exam entry page
- exam exit / saved result page
- a minimal Ivy brand mark

Not allowed inside the active exam surface:

- decorative tape
- stickers
- handwritten encouragement
- collage overlap
- playful cards

---

## 12. Speaking visual rule

Daily Speaking may use the full Study Journal language.

Examples:

- voice memo card
- prompt slip
- image card
- handwritten status note

IELTS Speaking Simulation should reduce decoration and prioritize:

- question navigation
- recording state
- preparation timer
- answer timer
- microphone state

It may retain Paper Cream and small journal cues, but should feel more formal than Daily Speaking.

---

## 13. Motion

Animation should behave like stationery, not a game UI.

Allowed:

- note unfolding
- subtle paper lift
- tiny tape / sticker shift
- stamp appearing after completion
- section sheet sliding open
- marker underline drawing in

Avoid:

- bouncing cards
- constant floating stickers
- large rotations
- confetti everywhere
- decorative motion during focused reading / writing

Motion must not interfere with learning or accessibility.

---

## 14. Mobile rules

Mobile is not a scaled-down desktop collage.

The mobile metaphor is a **small personal notebook**.

### Required behavior

- reduce overlaps
- mostly single-column paper flow
- keep primary controls large
- avoid horizontal scrolling for core subject navigation
- Listening / Speaking / Reading / Writing should preferably be visible as a `2 × 2` grid
- respect iPhone safe areas
- keep audio and recording controls thumb-friendly
- preserve text readability when the software keyboard opens

### Decorative density

Use fewer stickers, tapes and handwritten notes on mobile.

The visual identity should survive through color, typography and paper materials rather than layered collage density.

### CBT on mobile

Do not force the desktop IELTS dual-column CBT into narrow phone layouts.

Daily learning, History, Progress and Speaking should be mobile-friendly.

Formal CBT may explicitly require desktop / tablet landscape where that preserves authentic practice.

---

## 15. Accessibility and usability rules

The bright palette must not reduce accessibility.

- body copy needs strong contrast
- light pastel surfaces require dark readable text
- never rely on color alone for correct / wrong / completed state
- interactive targets must remain large enough
- keyboard focus must remain visible
- handwritten text is decorative, never essential information
- paper texture must not reduce reading clarity
- Marker Pink must not be used as body text on light backgrounds where contrast is weak

---

## 16. Pilot implementation order

Do not migrate the whole product at once.

### Pilot 1 — Home

Purpose: validate identity, color balance and collage density.

Test:

- brand feeling
- Today Plan receipt
- quick-start pieces
- weekly summary
- mobile simplification

### Pilot 2 — Practice

Purpose: validate interactive density and reusable components.

Test:

- four-subject navigation
- Daily vs IELTS hierarchy
- Focus Timer
- History / Progress / Exam index controls
- responsive behavior

### Pilot 3 — Session Detail

Purpose: validate long-form content readability.

Test:

- Listening material + response + audio
- Speaking prompt + recording
- Reading questions / answers / annotations
- Writing prompt + full essay
- mobile long-history behavior

Only after these three pages are accepted should the full-site migration begin.

---

## 17. Full migration order

After Pilot approval:

1. Home
2. Practice
3. History / Session
4. Progress / Progress Detail
5. Mistakes
6. Vocabulary
7. Library
8. Settings
9. Bank / Question Detail
10. Daily Speaking
11. Daily Listening / Reading / Writing
12. Entry / exit surfaces around CBT

Active CBT exam surfaces remain formally styled.

---

## 18. Design review checklist

Before accepting any redesigned page, ask:

1. Is the main action obvious in under three seconds?
2. Can the page still be understood with all decorative elements mentally removed?
3. Does every tape / sticker / handwritten note serve a purpose?
4. Is Marker Pink rare enough to remain meaningful?
5. Are all colors bright and free of a gray cast?
6. Is long-form text still comfortable to read?
7. Does the page feel like the same Ivy English system as the rest of the product?
8. Does mobile simplify rather than merely shrink the desktop layout?
9. Would this visual treatment still feel pleasant after using the product every day for six months?
10. Is the active IELTS exam surface protected from unnecessary decoration?

If several answers are no, simplify the page before adding more decoration.

---

## 19. Frozen decisions as of v1

The following decisions are considered frozen unless Ivy explicitly changes them:

- overall direction: Personal Study Journal + Editorial Scrapbook
- no gray-toned / dusty palette
- high-lightness bright color system
- Paper Cream `#FFF9F0`
- Ink Blue `#3F63F2`
- Marker Pink `#FF5DB1`
- Note Mint `#E8FFD8`
- Butter Yellow `#FFF3A6`
- Peach Tape `#FFD4B5`
- Lavender Note `#E9D8FF`
- Fresh Aqua `#D6FFF7`
- Apple Green `#AEEB8C`
- Turquoise Green `#7FEFD4`
- Turquoise `#009B9F`
- formal CBT pages remain visually separate from the scrapbook system
- Home / Practice / Session Detail are the first visual pilots
- mobile uses reduced collage density and prioritizes usability

---

## 20. Next design work

Next step after this specification:

1. define typography candidates
2. define spacing, radius, border and paper-shadow tokens
3. implement reusable journal primitives
4. redesign Home as Pilot 1
5. inspect on desktop and mobile before moving to Practice

This specification is the source of truth for the visual redesign until superseded by a newer version.
