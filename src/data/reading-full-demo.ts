import { demoReadingExam, type ExamDefinition, type ExamOption, type ExamQuestion } from "@/data/exam-demo";

const p1 = demoReadingExam.sections[0]!;

const p1Extra: ExamQuestion[] = [
  {
    id: "q11",
    number: 11,
    type: "matching-information",
    instruction: "Which paragraph contains the following information? Choose A–F.",
    stem: "a reference to combining temperature information with data about who uses a place",
    options: ["A", "B", "C", "D", "E", "F"].map((value) => ({ value, label: value })),
    correctAnswers: ["E"],
  },
  {
    id: "q12",
    number: 12,
    type: "short-answer",
    instruction: "Answer the question below. Choose NO MORE THAN TWO WORDS from the passage.",
    stem: "What type of shelter was redesigned as part of some shade strategies?",
    maxWords: 2,
    correctAnswers: ["bus shelters", "bus shelter"],
  },
  {
    id: "q13",
    number: 13,
    type: "true-false-not-given",
    instruction: "Do the following statements agree with the information given in Reading Passage 1?",
    stem: "The shaded plaza described in Paragraph E is proven to provide the greatest health benefit.",
    options: ["TRUE", "FALSE", "NOT GIVEN"].map((value) => ({ value, label: value })),
    correctAnswers: ["FALSE"],
  },
];

const museumHeadings: ExamOption[] = [
  { value: "i", label: "A problem created by an apparently helpful solution" },
  { value: "ii", label: "Why a single lighting rule cannot suit every object" },
  { value: "iii", label: "A change in how exhibition success is measured" },
  { value: "iv", label: "Technology that makes invisible damage easier to predict" },
  { value: "v", label: "The special difficulty of temporary exhibitions" },
  { value: "vi", label: "A compromise between access and preservation" },
];

const mapHeadings: ExamOption[] = [
  { value: "i", label: "Why visual simplicity can sometimes mislead" },
  { value: "ii", label: "The value of landmarks that are easy to describe" },
  { value: "iii", label: "A difference between expert and novice map users" },
  { value: "iv", label: "How digital tools altered route planning" },
  { value: "v", label: "Evidence that orientation is partly learned" },
  { value: "vi", label: "Why distance is not always represented literally" },
];

export const readingFullDemo: ExamDefinition = {
  id: "ivy-reading-full-demo-001",
  title: "IELTS Academic Reading · Three-passage structural sample",
  module: "Reading",
  durationMinutes: 60,
  sections: [
    {
      ...p1,
      instruction: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      questions: [...p1.questions, ...p1Extra],
    },
    {
      id: "passage-2",
      title: "READING PASSAGE 2",
      passageTitle: "The Quiet Work of Museum Light",
      instruction: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      paragraphs: [
        {
          label: "A",
          text: "Museum lighting has always involved a contradiction. Visitors need enough light to see surface texture, colour and fine detail, yet light itself can slowly alter the objects on display. Fading is especially serious for watercolours, dyed textiles and old paper. The effect is cumulative: a low level of light for a long period can cause as much change as a brighter level for a shorter one.",
        },
        {
          label: "B",
          text: "For years, museums responded by setting broad maximum light levels for categories of material. Those rules were useful, but they encouraged the mistaken idea that every object within a category behaves in the same way. Two fabrics of the same age may contain different dyes, while two photographs may have been processed by different chemical methods. Conservators increasingly prefer object-specific decisions where evidence allows them.",
        },
        {
          label: "C",
          text: "New monitoring tools make those decisions easier. Small sensors can log exactly how much light reaches a display over weeks or months. Imaging techniques can also reveal early colour changes that are difficult for the human eye to notice. Instead of waiting for obvious fading, staff can estimate how quickly a vulnerable area is changing and reduce future exposure.",
        },
        {
          label: "D",
          text: "This does not mean fragile objects should simply disappear into dark storage. Museums exist to make collections accessible, and public value matters alongside preservation. Many institutions therefore rotate sensitive works. A drawing might be shown for three months and then rest for several years, allowing visitors to see the original while limiting its lifetime dose of light.",
        },
        {
          label: "E",
          text: "Temporary exhibitions create another challenge because borrowed objects arrive with different histories. A museum may know the condition of its own collection in detail but receive only partial exposure records for a loan. Exhibition designers must then negotiate with lenders, sometimes adjusting case position, lamp angle or opening hours so that a single vulnerable work can be shown safely beside more robust material.",
        },
        {
          label: "F",
          text: "Lighting design is also changing aesthetically. Curators once tended to judge success by whether galleries looked evenly bright. Today, many prefer controlled contrast: enough illumination for orientation, but focused light where the visitor's attention should fall. This can reduce unnecessary exposure while producing a clearer visual hierarchy. In that sense, conservation and design are becoming less like competing goals and more like parts of the same plan.",
        },
      ],
      questions: [
        { id: "q14", number: 14, type: "matching-headings", instruction: "Choose the correct heading for Paragraph B.", stem: "Paragraph B", options: museumHeadings, correctAnswers: ["ii"] },
        { id: "q15", number: 15, type: "matching-headings", instruction: "Choose the correct heading for Paragraph C.", stem: "Paragraph C", options: museumHeadings, correctAnswers: ["iv"] },
        { id: "q16", number: 16, type: "matching-headings", instruction: "Choose the correct heading for Paragraph D.", stem: "Paragraph D", options: museumHeadings, correctAnswers: ["vi"] },
        { id: "q17", number: 17, type: "matching-information", instruction: "Which paragraph contains the following information? Choose A–F.", stem: "a reason why two apparently similar objects may react differently to light", options: ["A", "B", "C", "D", "E", "F"].map((value) => ({ value, label: value })), correctAnswers: ["B"] },
        { id: "q18", number: 18, type: "matching-information", instruction: "Which paragraph contains the following information? Choose A–F.", stem: "a situation in which the museum may not know an object's full exposure history", options: ["A", "B", "C", "D", "E", "F"].map((value) => ({ value, label: value })), correctAnswers: ["E"] },
        { id: "q19", number: 19, type: "true-false-not-given", instruction: "Do the following statements agree with the information given in Reading Passage 2?", stem: "Damage caused by light depends only on how bright the light is.", options: ["TRUE", "FALSE", "NOT GIVEN"].map((value) => ({ value, label: value })), correctAnswers: ["FALSE"] },
        { id: "q20", number: 20, type: "true-false-not-given", instruction: "Do the following statements agree with the information given in Reading Passage 2?", stem: "Some museums remove sensitive works from display for long periods after showing them.", options: ["TRUE", "FALSE", "NOT GIVEN"].map((value) => ({ value, label: value })), correctAnswers: ["TRUE"] },
        { id: "q21", number: 21, type: "text-input", instruction: "Complete the sentence below. Choose ONE WORD ONLY from the passage.", stem: "Watercolours, dyed textiles and old ________ can be especially vulnerable to fading.", maxWords: 1, correctAnswers: ["paper"] },
        { id: "q22", number: 22, type: "summary-completion", instruction: "Complete the summary. Choose ONE WORD ONLY from the passage.", stem: "Modern sensors record the amount of light reaching a display, while imaging can reveal early colour ________.", maxWords: 1, correctAnswers: ["changes"] },
        { id: "q23", number: 23, type: "summary-completion", instruction: "Complete the summary. Choose ONE WORD ONLY from the passage.", stem: "For loans, designers may change lamp angle or even exhibition opening ________.", maxWords: 1, correctAnswers: ["hours"] },
        { id: "q24", number: 24, type: "multiple-choice", instruction: "Choose the correct letter, A, B, C or D.", stem: "What is the main purpose of rotating sensitive works?", options: [
          { value: "A", label: "To make temporary exhibitions cheaper" },
          { value: "B", label: "To balance public access with limited light exposure" },
          { value: "C", label: "To test whether visitors notice fading" },
          { value: "D", label: "To avoid using imaging equipment" },
        ], correctAnswers: ["B"] },
        { id: "q25", number: 25, type: "multiple-choice", instruction: "Choose the correct letter, A, B, C or D.", stem: "How has the idea of successful gallery lighting changed?", options: [
          { value: "A", label: "Uniform brightness is now considered essential" },
          { value: "B", label: "Natural daylight is preferred in every gallery" },
          { value: "C", label: "Controlled contrast is increasingly valued" },
          { value: "D", label: "Visitors are expected to carry personal lights" },
        ], correctAnswers: ["C"] },
        { id: "q26", number: 26, type: "short-answer", instruction: "Answer the question below. Choose NO MORE THAN TWO WORDS from the passage.", stem: "What do small sensors measure over time?", maxWords: 2, correctAnswers: ["light", "light exposure"] },
      ],
    },
    {
      id: "passage-3",
      title: "READING PASSAGE 3",
      passageTitle: "Why Some Maps Feel Easy to Use",
      instruction: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      paragraphs: [
        {
          label: "A",
          text: "A map can be geographically accurate and still be difficult to use. People rarely consult maps simply to admire correct scale. They use them to answer questions: Which exit should I take? How many turns remain? Will I recognise the place where I need to change direction? A useful map therefore selects information rather than reproducing the world evenly.",
        },
        {
          label: "B",
          text: "Research on pedestrian navigation shows that landmarks become especially valuable when they are distinctive and easy to name. Telling someone to turn after 'the red brick clock tower' is often more memorable than giving an exact distance. The best landmark is not necessarily the largest object; it is the one that can be recognised quickly from the traveller's likely viewpoint.",
        },
        {
          label: "C",
          text: "Experienced map users and beginners do not always look for the same clues. Experts are more comfortable inferring direction from street geometry and orientation symbols, while novices often depend on familiar buildings or written labels. This means a map designed by specialists can accidentally omit the very cues that less confident users need most.",
        },
        {
          label: "D",
          text: "Digital navigation changed route planning by allowing maps to respond to the traveller's position. A phone can rotate the display, announce the next instruction and recalculate after a wrong turn. Yet automation created a new problem: users may follow a sequence of commands without forming an overall picture of the area. When the device fails, they can be surprisingly unsure where they are.",
        },
        {
          label: "E",
          text: "Some of the most successful transport maps abandon literal geography. Railway lines may be straightened, distances compressed and station spacing made more regular. These distortions help users understand connections. The price is that walking distance above ground may be misjudged, especially where two stations look far apart on the diagram but are close together in the city.",
        },
        {
          label: "F",
          text: "Orientation skill is not fixed. Studies in unfamiliar campuses have found that people improve when they are asked to predict the direction of a destination before checking a map. The act of making a prediction appears to encourage attention to spatial relationships. Repeated passive instruction, by contrast, can produce fast journeys without equally strong mental maps.",
        },
        {
          label: "G",
          text: "Designers therefore face a choice between immediate efficiency and long-term understanding. A map for an emergency evacuation should minimise hesitation, while a map for a university campus may also aim to teach newcomers how places relate. The clearest design depends on what the user needs to achieve, not on a single universal definition of accuracy.",
        },
      ],
      questions: [
        { id: "q27", number: 27, type: "matching-headings", instruction: "Choose the correct heading for Paragraph B.", stem: "Paragraph B", options: mapHeadings, correctAnswers: ["ii"] },
        { id: "q28", number: 28, type: "matching-headings", instruction: "Choose the correct heading for Paragraph C.", stem: "Paragraph C", options: mapHeadings, correctAnswers: ["iii"] },
        { id: "q29", number: 29, type: "matching-headings", instruction: "Choose the correct heading for Paragraph D.", stem: "Paragraph D", options: mapHeadings, correctAnswers: ["iv"] },
        { id: "q30", number: 30, type: "matching-headings", instruction: "Choose the correct heading for Paragraph F.", stem: "Paragraph F", options: mapHeadings, correctAnswers: ["v"] },
        { id: "q31", number: 31, type: "yes-no-not-given", instruction: "Do the following statements agree with the views expressed by the writer?", stem: "The writer believes a map should reproduce every geographic detail equally.", options: ["YES", "NO", "NOT GIVEN"].map((value) => ({ value, label: value })), correctAnswers: ["NO"] },
        { id: "q32", number: 32, type: "yes-no-not-given", instruction: "Do the following statements agree with the views expressed by the writer?", stem: "The largest object in an area is always the most useful landmark.", options: ["YES", "NO", "NOT GIVEN"].map((value) => ({ value, label: value })), correctAnswers: ["NO"] },
        { id: "q33", number: 33, type: "true-false-not-given", instruction: "Do the following statements agree with the information given in Reading Passage 3?", stem: "Experts tend to rely more on street geometry than beginners do.", options: ["TRUE", "FALSE", "NOT GIVEN"].map((value) => ({ value, label: value })), correctAnswers: ["TRUE"] },
        { id: "q34", number: 34, type: "matching-information", instruction: "Which paragraph contains the following information? Choose A–G.", stem: "a disadvantage of following turn-by-turn instructions without building a wider understanding", options: ["A", "B", "C", "D", "E", "F", "G"].map((value) => ({ value, label: value })), correctAnswers: ["D"] },
        { id: "q35", number: 35, type: "matching-information", instruction: "Which paragraph contains the following information? Choose A–G.", stem: "an example of maps deliberately changing real distances", options: ["A", "B", "C", "D", "E", "F", "G"].map((value) => ({ value, label: value })), correctAnswers: ["E"] },
        { id: "q36", number: 36, type: "text-input", instruction: "Complete the sentence below. Choose ONE WORD ONLY from the passage.", stem: "A useful pedestrian landmark should be distinctive and easy to ________.", maxWords: 1, correctAnswers: ["name"] },
        { id: "q37", number: 37, type: "summary-completion", instruction: "Complete the summary. Choose ONE WORD ONLY from the passage.", stem: "Digital navigation can recalculate after a wrong turn, but users may fail to form an overall ________ of the area.", maxWords: 1, correctAnswers: ["picture"] },
        { id: "q38", number: 38, type: "summary-completion", instruction: "Complete the summary. Choose ONE WORD ONLY from the passage.", stem: "On transport diagrams, railway lines may be straightened and station ________ made more regular.", maxWords: 1, correctAnswers: ["spacing"] },
        { id: "q39", number: 39, type: "multiple-choice", instruction: "Choose the correct letter, A, B, C or D.", stem: "What did the campus studies suggest improves orientation skill?", options: [
          { value: "A", label: "Following spoken instructions repeatedly" },
          { value: "B", label: "Predicting direction before checking a map" },
          { value: "C", label: "Using only geographically literal maps" },
          { value: "D", label: "Avoiding unfamiliar landmarks" },
        ], correctAnswers: ["B"] },
        { id: "q40", number: 40, type: "multiple-choice", instruction: "Choose the correct letter, A, B, C or D.", stem: "What is the writer's main conclusion?", options: [
          { value: "A", label: "All maps should maximise geographic accuracy" },
          { value: "B", label: "Digital maps are always easier than paper maps" },
          { value: "C", label: "Map design should reflect the user's purpose" },
          { value: "D", label: "Beginners should learn specialist map symbols first" },
        ], correctAnswers: ["C"] },
      ],
    },
  ],
};
