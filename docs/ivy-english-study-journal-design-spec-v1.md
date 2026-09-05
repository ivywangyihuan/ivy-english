# Ivy English · Study Journal Design Specification v1.1

Status: **Frozen visual direction for the Study Journal redesign**  
Branch: `feature/learning-flow-v2`  
Companion tokens: `docs/ivy-english-study-journal-tokens-v1.md`  
Scope: Home, Practice, History / Session, Progress, Mistakes, Vocabulary, Library, Settings, Bank, Daily Speaking / Listening / Reading / Writing.  
Exception: IELTS CBT exam surfaces keep a formal exam-system visual language.

---

## 1. Product visual idea

Ivy English should feel like a **personal English study journal that keeps growing over time**, not a generic learning SaaS dashboard.

The visual language combines:

- personal study journal
- editorial scrapbook
- bright stationery
- clipped paper / receipt / sticky-note / index-card logic
- handwritten annotations used sparingly
- clear information hierarchy underneath the playful surface

### Core rule

**Organised scrapbook, not random collage.**

Every decorative element should create hierarchy, communicate state, reinforce the learning-journal metaphor, or add a small amount of personality. If it does none of these, remove it.

---

## 2. Non-negotiable color direction

### 2.1 Brightness

The user explicitly prefers **clear, high-lightness colors with no gray cast**.

Do not use dusty sage, gray-green, smoky blue, muted mauve, beige-gray, desaturated “premium neutral” palettes, or visible gray overlays.

Neutral areas should feel like clean warm paper.

### 2.2 Final palette

| Name | Hex | Primary use |
|---|---:|---|
| Paper Cream | `#FFF9F0` | main canvas, quiet paper areas |
| Ink Blue | `#3F63F2` | strong blue identity, Writing identity, printed marks |
| Marker Pink | `#FF5DB1` | Speaking identity, marker strokes, handwritten emphasis |
| Note Mint | `#E8FFD8` | Reading light paper, completion notes |
| Butter Yellow | `#FFF3A6` | review notes, reminders |
| Peach Tape | `#FFD4B5` | tape, clipped-paper accents |
| Lavender Note | `#E9D8FF` | Writing light paper, secondary notes |
| Fresh Aqua | `#D6FFF7` | Listening light paper |
| Apple Green | `#AEEB8C` | Reading identity, positive progress |
| Turquoise Green | `#7FEFD4` | secondary turquoise stationery |
| Turquoise | `#009B9F` | Listening identity, strong secondary brand accent |

Core product identity remains Paper Cream + Ink Blue + Marker Pink + Turquoise.

---

## 3. Frozen subject identities

Listening / Speaking / Reading / Writing now have **persistent semantic colors**. This supersedes the earlier pilot idea of treating all stationery colors as interchangeable.

### Listening

- strong: Turquoise `#009B9F`
- light paper: Fresh Aqua `#D6FFF7`

### Speaking

- strong: Marker Pink `#FF5DB1`
- light paper: a high-lightness Marker Pink / Paper Cream mix

### Reading

- strong: Apple Green `#AEEB8C`
- light paper: Note Mint `#E8FFD8`

### Writing

- strong: Ink Blue `#3F63F2`
- light paper: Lavender Note `#E9D8FF`

### Where subject identity must persist

Use the corresponding subject color for:

- module entry buttons
- subject-specific primary buttons
- selected tabs / chips
- progress series
- history labels
- subject note borders or shadows
- active subject navigation
- small subject-specific states and indicators

Do not swap these identities from page to page.

Non-subject information may still use Paper Cream, yellow, peach, lavender, aqua and other stationery colors according to material meaning.

---

## 4. Surface and paper system

The page should not look like one flat app background with identical rounded cards.

### Canvas

Base: Paper Cream `#FFF9F0`.

An extremely subtle paper texture is allowed. Never make the page dirty, antique or gray.

### Clean paper

For long reading, writing and dense information:

- bright warm paper
- near-flat surface
- light blue / turquoise-derived border
- minimal directional shadow
- highest readability

### Grid paper

Use selectively for planning, saved fragments, vocabulary, Home hero details, and small collected areas. Do not put long essays or reading passages on a grid background.

### Receipt / guest-check paper

Use for structured compact data:

- Today Plan
- weekly totals
- session summary
- result summary

A torn or zigzag edge must remain **visibly outlined** against the Paper Cream canvas. The edge may never disappear because the paper and page are too similar.

### Sticky note

A sticky note is materially different from a generic app card.

Required cues:

- nearly square corners
- slight paper rotation on desktop
- short tape strip when the content feels pinned / collected
- small directional subject-colored shadow when subject-specific
- no large soft blur shadow

Use sticky notes for saved / remembered fragments such as recent question-bank memories, short reminders, vocabulary encounters, and small review notes.

Do not put long paragraphs inside decorative sticky notes.

### Tape / clips

Tape and clips are accents, not default containers. Usually 1–3 obvious collage gestures per viewport is enough.

---

## 5. Typography

### Product / body voice

Use Manrope + Noto Sans SC / system sans for body copy, controls, navigation, forms, tables and study content.

### Editorial / journal voice

Use Fraunces + Songti SC / serif fallback for Ivy English, page titles, section headings, session titles and selected large numbers.

### Handwritten voice

Use Caveat + Kaiti / cursive fallback only for short annotations, marker notes, arrows, tiny encouragement and decorative emphasis.

Never use handwriting for essential controls, instructions, long copy or navigation.

### Language rule

Normal interaction text is primarily Chinese. Keep official IELTS concepts in English where natural: IELTS Listening, Part 1 / 2 / 3, Task 1 / 2, Familiarisation, Review.

---

## 6. Borders, corners and shadows

### Corners

Avoid one universal SaaS radius.

- clean paper: 6–10 px
- receipt: 0–6 px plus torn edge
- sticky note: 0–3 px
- stamp / index: nearly square
- controls: 8–12 px
- pills only for compact tags

Large 20–24 px rounded cards are not the default journal container.

### Borders

Use Ink Blue / Turquoise-derived paper edges, grid lines and ruled lines at low opacity. Avoid neutral gray framing when journal styling is active.

### Shadows

Shadows suggest stacked paper rather than floating product cards:

- directional offset
- low opacity
- little or no blur
- subject-colored tint is allowed for subject sticky notes

No large soft gray shadows.

---

## 7. Component vocabulary

Reusable Study Journal primitives include or may include:

- `JournalPaper`
- `GridPaper`
- `ReceiptCard`
- `StickyNote`
- `TapeLabel`
- `MarkerNote`
- `Stamp`
- subject button / subject chip utilities
- `PaperTabs`
- `PaperInput`
- `VoiceMemoCard`
- `AnswerSheet`
- `IndexTab`

Components must be responsive and must not encode one page’s content directly.

---

## 8. Buttons and controls

### Global actions

Cross-product actions that do not belong to one subject may use Ink or Turquoise.

### Subject actions

Primary actions that clearly belong to one subject use the frozen subject identity:

- Listening → Turquoise
- Speaking → Marker Pink
- Reading → Apple Green with dark Ink text
- Writing → Ink Blue

The same rule applies to subject-specific tabs and module entry controls.

### Secondary actions

Use bright paper with the relevant subject outline / text when subject-specific; otherwise Ink / Turquoise.

### Destructive actions

Use functional red, never Marker Pink.

Never sacrifice hit area, focus visibility or obvious affordance for the collage illusion.

---

## 9. Inputs and writing surfaces

Long-form input should feel like real writing paper while keeping native usability:

- clean paper
- optional ruled lines
- generous padding
- highly legible body font
- clear focus state

Avoid decorative backgrounds behind long essays.

---

## 10. Progress and data visualization

Progress is an **analysis journal**, not a decorative scrapbook page.

Charts must remain accurate and easy to read.

For subject charts, use the frozen subject identity color. When several subjects appear together, use the four subject colors consistently.

Marker Pink may only function as a generic annotation color when the context is clearly not Speaking.

Decorative handwritten notes may annotate charts outside the plotting area.

---

## 11. Page-specific visual strength

### Home — high expression

- strongest scrapbook identity
- Today Plan as receipt / guest check
- one handwritten daily note
- subject-coded quick-start papers
- weekly summary as stationery object
- recent question-bank items as real sticky notes rather than rounded cards

### Practice — medium expression

- four frozen subject identities
- Daily vs IELTS hierarchy
- History / Progress / Exam as clear index controls
- Focus Timer may use receipt / ticket language

### Session Detail / History — low-to-medium expression

Content first:

- question / answer sheets
- writing manuscript
- listening material ticket
- voice memo blocks
- real annotations

### Progress — low expression

Data first; restrained stationery framing.

### Mistakes / Vocabulary / Library — medium expression

- Mistakes → correction notebook
- Vocabulary → index cards / encounter slips
- Library → clipped-paper / folder-tab system

---

## 12. IELTS CBT exception

Active Reading / Listening / Writing CBT surfaces do **not** inherit the full scrapbook style.

Transition deliberately from:

**Ivy Study Journal → Formal IELTS Computer Test Environment**

Active CBT pages remain formal, structured and focused.

Journal identity is allowed around the exam entry and saved-result / exit surfaces, but not inside active answering areas.

No decorative tape, stickers, handwritten encouragement or playful overlap inside the live exam surface.

---

## 13. Speaking rule

Daily Speaking may use full Study Journal language: prompt slips, voice memo cards, handwritten status notes and bright subject-pink controls.

IELTS Speaking Simulation is more restrained and prioritizes question navigation, recording state, prep timer, answer timer and microphone state.

---

## 14. Motion

Animation should behave like stationery:

Allowed:

- subtle paper lift
- tiny tape / sticker shift
- stamp appearing after completion
- sheet reveal
- marker underline drawing in

Avoid bouncing cards, constant floating stickers, large rotations, confetti and decorative motion during focused study.

---

## 15. Mobile rules

Mobile is a **small personal notebook**, not a scaled-down desktop collage.

Required:

- mostly single-column paper flow
- fewer overlaps / rotations
- large thumb-friendly controls
- four core subjects visible as a `2 × 2` grid rather than horizontal-scroll-only
- safe-area support
- keyboard-safe writing / transcript screens
- mobile subject identities remain the same as desktop

Formal CBT may explicitly require desktop / tablet landscape when necessary for authentic practice.

---

## 16. Accessibility

- body copy requires strong contrast
- pastel surfaces require dark readable text
- never communicate correct / wrong / complete using color alone
- keyboard focus remains visible
- handwritten text is decorative only
- Marker Pink cannot become low-contrast body text
- Reading’s Apple Green primary buttons use dark Ink text rather than white

---

## 17. Pilot sequence

1. Home
2. Practice
3. Session Detail

Only after these three pilots are accepted should the full-site migration proceed.

### Home acceptance

Home should confirm:

- high-brightness identity
- visible receipt torn edge
- strong sticky-note material language
- consistent four-subject color identities
- mobile `2 × 2` subject layout
- no gray cast

### Practice acceptance

Confirm subject-color controls, Daily / IELTS hierarchy, Focus Timer and responsive behavior.

### Session acceptance

Confirm long-form readability for listening material, speaking recordings, reading answers and writing essays.

---

## 18. Full migration order

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
12. CBT entry / exit surfaces

Active CBT exam surfaces remain formal.

---

## 19. Design review checklist

Before accepting a redesigned page, ask:

1. Is the main action obvious within three seconds?
2. Can the page still be understood without decoration?
3. Does each paper / tape / handwritten detail serve a purpose?
4. Are all colors bright and free of gray cast?
5. Are the four subject colors consistent with the frozen mapping?
6. Do saved fragments actually feel like paper / sticky notes instead of SaaS cards?
7. Are torn receipt edges visibly outlined?
8. Is long-form text comfortable to read?
9. Does mobile simplify rather than merely shrink desktop?
10. Would the page remain pleasant after daily use for six months?
11. Is the active IELTS exam surface protected from unnecessary decoration?

If several answers are no, simplify before adding more decoration.

---

## 20. Frozen decisions

Unless Ivy explicitly changes them:

- direction: Personal Study Journal + Editorial Scrapbook
- no gray-toned / dusty palette
- high-lightness color system
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
- Listening = Turquoise / Fresh Aqua
- Speaking = Marker Pink / bright pink-paper mix
- Reading = Apple Green / Note Mint
- Writing = Ink Blue / Lavender Note
- Study Journal and formal IELTS CBT remain visually distinct modes
