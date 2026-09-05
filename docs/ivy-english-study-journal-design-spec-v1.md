# Ivy English · Study Journal Design Specification v1.2

Status: **FROZEN visual-system baseline**  
Branch: `feature/learning-flow-v2`  
Companion tokens: `docs/ivy-english-study-journal-tokens-v1.md`  
Copywriting status: **DEFERRED until the visual migration and functional cleanup are substantially complete.**  
Scope: Home, Practice, History / Session, Progress, Mistakes, Vocabulary, Library, Settings, Bank, Daily Speaking / Listening / Reading / Writing.  
Exception: active IELTS CBT exam surfaces keep a formal exam-system visual language.

---

## 1. Product visual idea

Ivy English is a **personal English study journal that accumulates real learning traces over time**, not a generic learning SaaS dashboard.

The visual language combines:

- personal study journal
- editorial scrapbook
- bright stationery
- grid paper / ruled paper / index cards / sticky notes / receipts
- real material cues such as tape, filing lines and paper offset
- handwritten annotation used sparingly
- clear product hierarchy underneath the expressive surface

### Core principle

**Material first, decoration second.**

A surface should feel like a specific kind of paper because of its structure, proportions, lines, edge treatment and placement — not merely because a pastel background was applied to a rounded card.

### Design test

Every visual gesture must do at least one of these:

1. communicate hierarchy;
2. communicate state or action;
3. reinforce the study-journal material metaphor;
4. preserve a meaningful learning trace;
5. add a small amount of personality without reducing clarity.

If it does none of these, remove it.

---

## 2. Color system

### 2.1 Non-negotiable brightness rule

The palette is **clear, high-brightness and free of gray cast**.

Do not introduce dusty sage, gray-green, smoky blue, muted mauve, beige-gray, desaturated “premium neutral” palettes, dirty vintage overlays or gray decorative shadows.

Neutral space should feel like clean warm paper.

### 2.2 Structural colors

| Token / name | Hex | Use |
|---|---:|---|
| Paper Cream | `#FFF9F0` | main canvas |
| Clean Paper | `#FFFCF7` | primary paper surface |
| Deep Ink | `#17306D` | primary headings, structural text, dark printed marks |
| Marker Pink | `#FF5DB1` | Speaking identity and handwritten emphasis |
| Turquoise | `#009B9F` | Listening identity and cross-product secondary accent |
| Writing Blue | `#3F63F2` | Writing identity and bright blue print accent |
| Reading Green | `#63C94A` | Reading identity |

### 2.3 Stationery colors

| Name | Hex | Use |
|---|---:|---|
| Note Mint | `#E8FFD8` | Reading light paper, completion notes |
| Butter Yellow | `#FFF3A6` | neutral reminder / continuation paper |
| Peach Tape | `#FFD4B5` | tape and clipped-paper accents |
| Lavender Note | `#E9D8FF` | Writing light paper |
| Fresh Aqua | `#D6FFF7` | Listening light paper |
| Apple Green | `#AEEB8C` | support green / stationery, not Reading primary |
| Turquoise Green | `#7FEFD4` | secondary turquoise stationery |
| Grid Line | `#BFD5FF` | light grid / ruled structure |
| Strong Grid Line | `#92B7FF` | stronger paper edge / grid accent |

### 2.4 Core identity

The recurring product identity is:

**Paper Cream + Deep Ink + Marker Pink + Turquoise**

Subject colors are semantic identities layered onto that shared system.

---

## 3. Frozen subject identities

Subject identity is persistent across the product.

### Listening

- strong: Turquoise `#009B9F`
- light paper: Fresh Aqua `#D6FFF7`

### Speaking

- strong: Marker Pink `#FF5DB1`
- light paper: high-lightness Marker Pink / Paper Cream mix

### Reading

- strong: Reading Green `#63C94A`
- light paper: Note Mint `#E8FFD8`
- do not revert the primary Reading accent to pale `#AEEB8C`

### Writing

- strong: Writing Blue `#3F63F2`
- light paper: Lavender Note `#E9D8FF`

### Subject color appears on

- subject-specific primary actions
- selected subject tabs / chips
- progress series
- history subject labels
- subject-specific paper edges / filing lines
- active subject navigation
- small semantic indicators
- standard subject icon strokes

### Subject color does not automatically appear on

- generic History / Continue / All Subjects surfaces
- cross-subject summary cards
- Today Plan checklist rows
- generic navigation controls

Subject colors are identity, not decoration.

---

## 4. Icon system

Listening / Speaking / Reading / Writing icons use **linework only** in their subject color by default.

Frozen rule:

- no filled square icon tile behind the standard four subject icons;
- no colored rectangular badge used merely to hold an icon;
- icon stroke = subject color;
- paper remains the dominant material;
- functional controls may use filled backgrounds only when the filled state communicates an actual control state.

---

## 5. Semantic decoration rule

Decorative elements with an implied meaning must only appear when that meaning is real.

### Arrows

Use arrows when they point to or accompany a real action, destination, flow or next step.

Do not use an arrow as random scrapbook decoration.

### Exclamation marks / alert marks

Use `!` for genuine emphasis, attention or a deliberately emphatic handwritten statement.

Do not scatter alert-like marks merely to fill empty space.

### Hearts

Decorative hearts are **not part of the current frozen visual system**. Copy may be reconsidered later, but visual filler hearts should not be added during migration.

### Tape

Tape implies a paper item is pinned, attached, collected or temporarily fixed.

Do not place tape on every card.

### Clips

Clips are appropriate for attachments, saved documents, image / PDF material and filed fragments. They should not be generic ornaments.

### Handwritten notes

Handwritten text should express a real annotation, encouragement, emphasis or personal note. It must not replace essential UI text.

---

## 6. Paper material system

The app should visibly contain several distinct paper types rather than one universal card component.

### 6.1 Canvas

- Paper Cream `#FFF9F0`
- extremely subtle clean-paper texture allowed
- never dirty, antique or gray

### 6.2 Clean Paper

Use for dense, long or high-readability content:

- essays
- reading passages
- long session details
- forms
- data panels

Treatment:

- Clean Paper `#FFFCF7`
- 1 px blue / turquoise-derived edge
- restrained directional offset shadow
- 6–10 px radius maximum

### 6.3 Grid Paper

Use selectively for:

- Home hero
- saved fragments
- question-bank boards
- vocabulary / planning contexts
- small collected-paper areas

Do not place long essays or full reading passages on grid paper.

### 6.4 Receipt / Checklist / Guest Check

Use for structured compact information:

- Today Plan
- session summary
- result summary
- short structured totals

Frozen treatment:

- **flat, straight bottom edge**
- full rectangular outline
- near-square corners (`0–3 px`)
- dashed / ruled separators allowed
- no torn / zigzag edge in the current system

### 6.5 Sticky Note

Use when the content metaphor is “pinned / remembered / collected”.

Typical content:

- short reminders
- recent question memories
- learning problems
- vocabulary encounters
- compact historical fragments

Required material cues:

- near-square corners (`0–3 px`)
- slight desktop rotation only when useful
- directional low-opacity paper shadow
- short tape strip when the note is actually treated as pinned / collected
- optional subtle ruled lines
- subject-colored edge / shadow only when subject-specific

Do not put long paragraphs inside decorative sticky notes.

### 6.6 Index Card

Use for structured entries and selectable study objects:

- practice options
- vocabulary words
- filed history fragments
- categorized learning items

Treatment:

- bright clean paper rather than a full saturated fill
- subject color may appear as top rule, edge, small label or type
- minimal radius
- directional paper offset
- ruled structure allowed

### 6.7 Neutral Note

Cross-subject surfaces such as `Continue` use a non-subject stationery paper such as Butter Yellow or Clean Paper.

A neutral note must not inherit the most recent subject’s full background color.

---

## 7. Home-specific frozen rules

Home is the strongest Study Journal expression and is the current visual baseline.

### Hero

- Grid Paper
- Ivy English title in Deep Ink
- bright marker annotation allowed
- annotation symbols must obey the semantic-decoration rule

### Today Plan

This is a **cross-subject checklist**, so it intentionally does not color every row by subject.

Frozen treatment:

- paper = Receipt / Checklist
- flat straight bottom edge
- left task titles = Deep Ink `#17306D`
- supporting copy = blue-family secondary text
- right durations = Turquoise `#009B9F`
- row dividers = light blue dashed / ruled line
- the main CTA is cross-product, so Turquoise / Deep Ink is appropriate

### Continue / Resume

- neutral paper, currently Butter Yellow
- not Listening / Speaking / Reading / Writing colored as a whole
- tape only if the item is visually treated as a saved / pinned note
- subject identity may appear as a small label if needed

### Quick Start

- 2 × 2 subject layout on desktop and mobile
- subject soft paper may be used
- subject icon = line-only, no square icon background
- material cues must make the item read as paper / note rather than a rounded SaaS card

### Weekly progress

- restrained analysis-paper treatment
- each subject progress series uses its frozen subject color
- data remains more important than decoration

### Recent Question Bank

- real Sticky Note language is appropriate
- subject identity through edge / small label / shadow
- tape is allowed because these are collected question memories

---

## 8. Typography

### Product / body voice

- `Manrope`, `Noto Sans SC`, system sans fallback
- controls, body, forms, navigation, dense learning content

### Editorial / journal voice

- `Fraunces`, `Songti SC`, Georgia fallback
- brand title, page titles, section headings, session titles, selected large numbers

### Handwritten voice

- `Caveat`, `Kaiti SC`, `STKaiti`, cursive fallback
- short annotations only
- never use for navigation, instructions, long content or essential controls

### Language

Interaction text is primarily Chinese. Keep official IELTS concepts in English when natural: IELTS Listening, Part 1 / 2 / 3, Task 1 / 2, Familiarisation, Review.

**Exact product copy is intentionally deferred.** Current text is provisional and must not be treated as frozen brand voice.

---

## 9. Geometry

Do not use one universal SaaS radius.

- clean paper: `6–10 px`
- receipt / checklist: `0–3 px`
- sticky note: `0–3 px`
- index card: `0–3 px`
- stamp / ticket: `0–4 px`
- controls: `8–12 px`
- pills: only for truly compact tags / states

Large `20–24 px` rounded cards are not the Study Journal default.

---

## 10. Borders, rules and shadows

### Borders

- standard paper edge: `1 px`
- stamp: `2 px`
- grid / ruled line: `1 px` low opacity
- structural lines derive from blue / turquoise rather than neutral gray

### Shadows

Paper shadows communicate stacking, not floating software cards.

Preferred characteristics:

- directional offset
- low opacity
- little or no blur
- bright blue / turquoise / subject tint

Do not use large soft gray shadows.

---

## 11. Buttons and controls

### Global actions

Cross-product actions may use Turquoise or Deep Ink.

### Subject actions

- Listening → `#009B9F`
- Speaking → `#FF5DB1`
- Reading → `#63C94A` with dark readable Ink text
- Writing → `#3F63F2`

### Secondary actions

Use bright paper with subject outline / text when subject-specific; otherwise use Deep Ink / Turquoise.

### Destructive actions

Use functional red. Marker Pink must never stand in for destructive red.

### Usability

Do not sacrifice hit target, focus state, contrast or obvious clickability for collage aesthetics.

---

## 12. Inputs and long-form study surfaces

Long-form content prioritizes reading / writing comfort.

Allowed:

- clean paper
- ruled lines when they help
- generous padding
- strong focus state
- highly legible sans body copy

Avoid decorative collage backgrounds behind essays and full reading passages.

---

## 13. Progress and data visualization

Progress is an **analysis journal**, not a decorative scrapbook page.

Rules:

- data accuracy first
- subject charts use frozen subject colors
- four-subject charts use the same four mappings everywhere
- annotations remain outside plotting areas where possible
- do not use decoration to imply data that is not actually measured

---

## 14. Page expression levels

### Home — high expression

Strongest journal identity.

### Practice — medium expression

Practice options may use Index Cards / paper tabs; controls remain clear.

### History / Session — low-to-medium expression

The recorded content is the hero: prompt, answer, transcript, recording, essay, annotations.

### Progress — low expression

Analysis first.

### Mistakes / Vocabulary / Library — medium expression

- Mistakes → correction notebook
- Vocabulary → index cards / encounter slips
- Library → folder tabs / clipped paper / attached-file language

---

## 15. IELTS CBT exception

Active Reading / Listening / Writing CBT surfaces do **not** inherit full scrapbook styling.

Transition deliberately from:

**Ivy Study Journal → Formal IELTS Computer Test Environment**

Inside the live exam:

- no tape
- no stickers
- no handwritten encouragement
- no playful paper overlap
- formal and focused layout

Journal styling may return on exam entry, completion, result and saved-history surfaces.

---

## 16. Speaking rule

Daily Speaking may use full Study Journal language: prompt slips, voice-memo cards, bright pink subject controls and meaningful handwritten status notes.

IELTS Speaking Simulation is more restrained and prioritizes:

- question navigation
- completed-question state
- microphone state
- preparation timer
- answer timer
- recording state

---

## 17. Motion

Allowed:

- subtle paper lift
- small sheet reveal
- purposeful stamp appearance
- marker underline drawing
- tiny tape / paper shift on direct interaction

Avoid:

- continuous floating
- bouncing stickers
- confetti
- large rotations
- decorative motion during focused study

---

## 18. Mobile rules

Mobile is a **small personal notebook**, not a scaled desktop collage.

Required:

- mostly single-column flow
- four core subjects visible as `2 × 2`
- fewer rotations / overlaps
- larger thumb-friendly controls
- safe-area support
- keyboard-safe writing / transcript screens
- same subject identities as desktop
- material metaphor preserved with fewer decorative gestures

Formal CBT may require desktop / tablet landscape when authentic practice needs it.

---

## 19. Accessibility

- body text requires strong contrast
- pastel surfaces use dark readable text
- correct / wrong / complete must never rely on color alone
- keyboard focus remains visible
- handwritten text is non-essential
- Marker Pink is not long-form body text
- Reading Green buttons use dark Ink text where white contrast is insufficient

---

## 20. Copywriting status

**Copywriting is not frozen in v1.2.**

Do not spend migration time polishing slogans, microcopy, encouragement lines or section titles unless wording blocks functionality.

After the visual system and major function / flow work are complete, perform a dedicated copywriting pass for:

- Home messaging
- section headings
- handwritten annotations
- empty states
- completion feedback
- navigation labels
- Daily English prompts / helper text

The later copy pass must also re-evaluate whether each punctuation mark, arrow or emphasis symbol is semantically justified.

---

## 21. Migration order

After Home baseline:

1. Practice
2. History / Session
3. Progress / Progress Detail
4. Mistakes
5. Vocabulary
6. Library
7. Settings
8. Bank / Question Detail
9. Daily Speaking
10. Daily Listening / Reading / Writing
11. CBT entry / exit surfaces
12. dedicated copywriting pass
13. final full-site visual consistency pass

Active CBT exam surfaces remain formal.

---

## 22. Design review checklist

Before accepting a redesigned page, ask:

1. Is the main action obvious within three seconds?
2. Can the page still be understood without decoration?
3. Does every paper type have a real material / information role?
4. Does every arrow / tape / clip / alert mark have semantic justification?
5. Are colors bright and free of gray cast?
6. Are the four subject colors consistent with the frozen mapping?
7. Are standard subject icons line-only without colored square tiles?
8. Do neutral surfaces remain neutral rather than borrowing a subject background?
9. Does a Sticky Note actually look pinned / collected rather than like a SaaS card?
10. Does a Receipt / Checklist use the flat straight-edge rule?
11. Is long-form text comfortable to read?
12. Does mobile simplify rather than shrink desktop?
13. Is the active IELTS exam surface protected from unnecessary decoration?
14. Would this remain pleasant after daily use for six months?

If several answers are no, simplify before adding more decoration.

---

## 23. Frozen decisions summary

Unless Ivy explicitly changes them:

- direction = Personal Study Journal + Editorial Scrapbook
- material first, decoration second
- high-brightness palette; no gray / dusty cast
- Paper Cream `#FFF9F0`
- Clean Paper `#FFFCF7`
- Deep Ink `#17306D`
- Marker Pink `#FF5DB1`
- Turquoise `#009B9F`
- Writing Blue `#3F63F2`
- Reading Green `#63C94A`
- Note Mint `#E8FFD8`
- Butter Yellow `#FFF3A6`
- Peach Tape `#FFD4B5`
- Lavender Note `#E9D8FF`
- Fresh Aqua `#D6FFF7`
- Apple Green `#AEEB8C` = support green only
- Turquoise Green `#7FEFD4`
- Listening = Turquoise / Fresh Aqua
- Speaking = Marker Pink / bright pink paper
- Reading = Reading Green / Note Mint
- Writing = Writing Blue / Lavender Note
- subject icons = line-only, no standard filled square backgrounds
- Continue / generic History / cross-subject surfaces = neutral stationery, not subject-colored surfaces
- Today Plan task titles = Deep Ink; durations = Turquoise
- Receipt / checklist paper = flat straight edge, full outline
- Sticky Notes use tape only when “pinned / collected” is real
- arrows / alert symbols / clips are semantic, never filler
- decorative hearts are not part of the current frozen visual system
- Study Journal mode and formal IELTS CBT mode remain visually distinct
- exact copywriting remains deferred until after the main visual / functional migration
