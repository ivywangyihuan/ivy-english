# Ivy English · Study Journal Design Specification v1.3

Status: **FROZEN visual-system baseline**  
Branch: `feature/learning-flow-v2`  
Implementation tokens: `docs/ivy-english-study-journal-tokens-v1.md` (v1.2)  
Copywriting status: **DEFERRED until visual / functional acceptance is complete.**  
Exception: active IELTS CBT answering surfaces remain formal exam-system UI.

---

## 1. Product visual idea

Ivy English is a **personal English study journal that accumulates real learning traces over time**, not a generic learning SaaS dashboard.

The visual language combines:

- personal study journal
- editorial scrapbook
- bright stationery
- grid / ruled paper
- index cards
- sticky notes
- receipts / checklists
- filed folders / voice-memo slips
- sparse handwritten annotation
- clear product hierarchy underneath the expressive surface

### Core principle

**Material first, decoration second.**

A surface should feel like a specific piece of stationery because of structure, proportion, lines, edges and placement — not merely because a pastel color was applied to a rounded card.

Every decorative gesture must communicate hierarchy, state, action, material meaning or a real personal annotation. Otherwise remove it.

---

## 2. Brightness rule

The palette is **clear, high-brightness and free of gray cast**.

Do not introduce:

- dusty sage
- gray-green
- smoky blue
- muted mauve
- dirty beige
- desaturated “premium neutral” palettes
- antique paper overlays
- gray decorative shadows

Neutral space should feel like clean warm paper.

---

## 3. Global color hierarchy

### Global product colors

| Name | Hex | Role |
|---|---:|---|
| Paper Cream | `#FFF9F0` | app canvas |
| Clean Paper | `#FFFCF7` | primary paper surface |
| Deep Ink | `#17306D` | **global product accent**, headings, navigation, neutral CTA |
| Grid Line | `#BFD5FF` | structural paper line |
| Strong Grid Line | `#92B7FF` | stronger outline / focus line |
| Body Ink | `#1F2340` | long-form body text |

### Stationery accents

| Name | Hex |
|---|---:|
| Marker Pink | `#FF5DB1` |
| Butter Yellow | `#FFF3A6` |
| Peach Tape | `#FFD4B5` |
| Lavender Note | `#E9D8FF` |
| Note Mint | `#E8FFD8` |
| Fresh Aqua | `#D6FFF7` |
| Apple Green | `#AEEB8C` |
| Turquoise Green | `#7FEFD4` |

### Frozen global-accent rule

**Deep Ink `#17306D` is the default global accent.**

It owns:

- global navigation active state
- bottom navigation active state
- generic filter selection
- generic tabs
- generic CTA
- Quick Capture
- neutral links
- neutral Progress controls
- Bank controls that are not tied to a subject

### Turquoise rule

Turquoise `#009B9F` is **Listening identity**.

It must not act as the default product theme for Bank, Progress, generic tabs, generic filters, generic floating buttons or cross-subject navigation.

Explicit exceptions are allowed only when already frozen for a specific composition, e.g. the small Today Plan duration figures on Home.

---

## 4. Frozen subject identities

### Listening

- strong: Turquoise `#009B9F`
- soft paper: Fresh Aqua `#D6FFF7`

### Speaking

- strong: Marker Pink `#FF5DB1`
- soft paper: high-lightness Marker Pink / Paper Cream mix

### Reading

- strong: Reading Green `#63C94A`
- soft paper: Note Mint `#E8FFD8`
- do not revert to the pale `#AEEB8C` as primary Reading color

### Writing

- strong: Writing Blue `#3F63F2`
- soft paper: Lavender Note `#E9D8FF`

### Subject color appears on

- subject-specific primary actions
- subject exam-entry / simulation CTA
- subject focus-timer primary action
- subject workspace controls
- selected subject tabs
- progress series
- subject labels / edges
- subject icon strokes
- meaningful selected state inside the subject context

### Subject color does not automatically appear on

- global navigation
- generic History / Continue / All Subjects
- cross-subject Progress / Bank filters
- generic floating capture controls
- Today Plan checklist rows

Subject colors are semantic identity, not decoration.

---

## 5. Filled-button contrast rule

Whenever a **high-saturation semantic color fills the whole button**, the button label and icon are **white**.

This rule applies to all four subject colors:

- Listening Turquoise → white text / icon
- Speaking Pink → white text / icon
- Reading Green → white text / icon
- Writing Blue → white text / icon

Secondary actions may use bright paper + subject outline + dark Deep Ink text.

Global solid CTA uses Deep Ink + white.

---

## 6. Icon system

Listening / Speaking / Reading / Writing standard icons use **linework only** in the subject color.

Frozen:

- no standard filled square behind the four subject icons
- no colored plate used merely to hold an icon
- icon stroke = subject color
- filled icon backgrounds only when the fill communicates a real control state

---

## 7. Semantic decoration

### Arrows
Only for real action, destination, flow or next step.

### `!`
Only for genuine emphasis / attention.

### Hearts
Decorative hearts are not part of the current visual system.

### Tape
Tape means pinned / attached / collected. Do not tape every card.

### Clips
Use for attachments, PDFs, images, saved files or materially attached fragments.

### Handwritten notes
Use for real annotation, encouragement or emphasis; never essential navigation or filler.

---

## 8. Paper material system

The app should contain visibly different stationery types rather than one universal card.

### Canvas

- Paper Cream `#FFF9F0`
- extremely subtle clean texture only

### Clean Paper

For essays, reading content, dense records, forms and long details.

- Clean Paper `#FFFCF7`
- 1 px bright structural border
- restrained directional paper shadow
- readability first

### Grid Paper

For hero boards, collected fragments, planning areas and Progress trend sheets.

Do not put long essays on grid paper.

### Receipt / Checklist

For structured compact totals and plans.

- flat straight bottom edge
- full outline
- near-square corners
- ruled / dashed separators allowed
- no torn or zigzag edge

### Sticky Note

For short collected / remembered items.

- near-square corners
- tiny desktop rotation when useful
- directional paper offset
- optional ruled line
- tape only when the note is genuinely “pinned / collected”

### Index Card

For practice options, vocabulary entries, subject analysis and structured study objects.

- Clean Paper first
- subject color as rule / edge / small text
- minimal radius
- ruled structure allowed

### Neutral Note

Cross-subject items use non-subject stationery such as Butter Yellow, Peach, Lavender or Clean Paper.

A neutral note must not inherit Listening Turquoise.

---

## 9. Home frozen rules

Home remains the strongest Study Journal expression.

### Hero

- Grid Paper
- Deep Ink title
- handwritten annotation only when meaningful

### Today Plan

- Receipt / Checklist paper
- flat straight edge
- left task titles = Deep Ink
- supporting text = blue-family secondary ink
- right duration figures = Turquoise as a frozen Home-only composition choice
- task titles are not colored separately by subject

### Continue

- neutral stationery, currently Butter Yellow
- never fill the whole surface with the latest subject color

### Quick Start

- 2 × 2 on desktop and mobile
- line-only subject icons
- subject identity from stroke / edge / soft paper

---

## 10. Practice / workspace rules

Practice is a medium-expression journal surface.

- four subject tabs preserve the four frozen colors
- top subject workspace actions use that subject color
- simulation / exam-entry CTA uses the current subject color + white text
- History / Progress secondary actions use bright paper + subject outline
- the focus timer inherits the selected subject color

### Immersive Daily Workspaces

Daily Speaking / Listening / Reading / Writing keep the journal canvas but no sidebar.

The current subject owns:

- top simulation CTA
- primary buttons
- selected control states
- focus timer accent
- subject links

No Speaking / Reading / Writing immersive screen may fall back to Listening Turquoise.

---

## 11. Mobile focus timer

The focus timer selector is a **bottom sheet on mobile**.

Frozen requirements:

- fixed inside phone viewport
- horizontally inset from screen edges
- sits above app bottom navigation + safe area
- max height about `68–70dvh`
- internal scrolling when needed
- Untimed / elapsed / countdown / custom duration all remain reachable
- reset / start-or-continue / stop remain reachable
- desktop stays as a compact anchored popover
- outline and primary action follow current subject color

---

## 12. Progress = analysis journal

Progress must be analytical but not visually collapse into one white SaaS panel.

### Global Progress

Use multiple material types:

- metric scraps: separate small papers
- allowed stationery mix: Butter Yellow / Lavender / Peach / ruled Clean Paper
- global top rule = Deep Ink
- trend = Grid Paper
- subject analysis = subject Index Cards
- review / accumulation = folders / filed paper

### Subject Progress Detail

- same metric-paper variation
- top rule / chart series = current subject color
- data remains primary
- never add decoration that implies measurements that do not exist

### Mobile

- remove decorative rotations
- keep separate paper identities
- avoid giant single panels

This material variety is inspired by note dashboards / sticky-note workspaces / filed-paper systems, but Ivy English keeps brighter stationery and stricter data hierarchy.

---

## 13. History / Session

History is filed learning evidence.

The recorded content is the hero:

- prompt / question
- answer
- transcript
- recording
- essay
- source material
- annotations

Use low-to-medium decoration only.

---

## 14. Mistakes / Vocabulary / Library / Bank

### Mistakes
Correction notebook.

### Vocabulary
Index cards / encounter slips.

### Library
Folder tabs / clipped documents / attached-file language.

### Bank
Pinned question memories / index cards.

Generic Bank filters and tabs use **Deep Ink**, not Listening Turquoise. Individual question cards keep their subject identity.

---

## 15. IELTS CBT exception

Active Reading / Listening / Writing CBT answering surfaces do **not** inherit scrapbook styling.

Transition deliberately:

**Ivy Study Journal → Formal IELTS Computer Test Environment**

Inside active CBT:

- no tape
- no stickers
- no playful overlap
- no handwritten encouragement
- formal, focused layout

Journal styling may return before entry and after completion.

---

## 16. Typography

### Product / body

`Manrope`, `Noto Sans SC`, system sans.

### Editorial

`Fraunces`, `Songti SC`, Georgia.

### Handwritten

`Caveat`, `Kaiti SC`, `STKaiti`, cursive.

Handwritten text is always non-essential.

Exact copy is not frozen.

---

## 17. Geometry and shadows

Do not use one universal SaaS radius.

- clean paper: 6–10 px
- receipt / sticky / index card: 0–3 px
- controls: 8–12 px
- pills only for compact tags / states

Paper shadows:

- directional
- low opacity
- bright blue or current subject tint
- little or no blur
- reduced on mobile
- never large soft gray floating-card shadows

---

## 18. Motion

Allowed:

- subtle paper lift
- small sheet reveal
- purposeful stamp appearance
- marker underline drawing
- tiny paper shift on direct interaction

Avoid:

- continuous floating
- bouncing stickers
- confetti
- large rotations
- decorative motion during focused study

---

## 19. Mobile rules

Mobile is a **small personal notebook**, not a scaled desktop collage.

Required:

- mostly single-column flow
- four core subjects visible as 2 × 2
- fewer rotations / overlaps
- thumb-friendly controls
- safe-area support
- keyboard-safe writing / transcript screens
- bottom sheets remain fully inside viewport
- same subject identities as desktop

Formal CBT may remain desktop / tablet-landscape focused when authenticity requires it.

---

## 20. Accessibility

- body text requires strong contrast
- pastel papers use dark readable text
- saturated CTA fills use white text / icons
- correct / wrong / complete never rely on color alone
- keyboard focus remains visible
- handwritten text is non-essential
- Marker Pink is not long-form body text

---

## 21. Copywriting status

**Copywriting remains deferred.**

Do not spend visual-migration time polishing slogans, helper text, section titles or empty states unless wording blocks functionality.

After visual and function acceptance, perform one dedicated full-site copy pass.

---

## 22. Review checklist

Before accepting a page:

1. Is the main action obvious within three seconds?
2. Does the page work without decoration?
3. Is each paper material identifiable from structure, not just color?
4. Are colors bright and free of gray cast?
5. Does global UI use Deep Ink rather than Listening Turquoise?
6. Are the four subject colors consistent?
7. Do saturated subject buttons use white text / icons?
8. Are subject icons line-only by default?
9. Do neutral surfaces remain neutral?
10. Does every arrow / tape / clip / alert mark have semantic justification?
11. Does Progress use varied paper materials without hurting analysis clarity?
12. Is the mobile focus-timer sheet fully visible and reachable?
13. Is long-form text comfortable?
14. Does mobile simplify rather than shrink desktop?
15. Is active IELTS CBT protected from scrapbook decoration?
16. Would this remain pleasant after daily use for six months?

---

## 23. Frozen decisions summary

Unless Ivy explicitly changes them:

- direction = Personal Study Journal + Editorial Scrapbook
- material first, decoration second
- high-brightness palette; no gray / dusty cast
- **global accent = Deep Ink `#17306D`**
- Turquoise `#009B9F` = Listening semantic color, not global theme
- Listening = Turquoise / Fresh Aqua
- Speaking = Marker Pink / bright pink paper
- Reading = Reading Green `#63C94A` / Note Mint
- Writing = Writing Blue / Lavender Note
- saturated subject CTA = white text / white icon
- subject icons = line-only
- generic navigation / filters / quick capture = Deep Ink system
- subject simulation CTA and subject focus timer = current subject color
- Progress = varied stationery scraps + grid trend + subject Index Cards
- Receipt / Checklist = flat straight edge
- Continue / generic History / cross-subject surfaces = neutral stationery
- arrows / `!` / tape / clips = semantic, never filler
- decorative hearts remain outside the system
- Study Journal mode and formal IELTS CBT mode remain visually distinct
- exact copywriting remains deferred
