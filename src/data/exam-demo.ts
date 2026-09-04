export type ExamMode = "familiarisation" | "exam";

export type ExamQuestionType =
  | "multiple-choice"
  | "true-false-not-given"
  | "yes-no-not-given"
  | "text-input"
  | "matching-headings"
  | "matching-information"
  | "summary-completion"
  | "short-answer";

export interface ExamOption {
  value: string;
  label: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  type: ExamQuestionType;
  instruction?: string;
  stem: string;
  options?: ExamOption[];
  prefix?: string;
  suffix?: string;
  maxWords?: number;
  correctAnswers?: string[];
}

export interface ExamSection {
  id: string;
  title: string;
  passageTitle: string;
  instruction: string;
  paragraphs: { label?: string; text: string }[];
  questions: ExamQuestion[];
}

export interface ExamDefinition {
  id: string;
  title: string;
  module: "Reading" | "Listening" | "Writing";
  durationMinutes: number;
  sections: ExamSection[];
}

const headings: ExamOption[] = [
  { value: "i", label: "A design problem hidden in plain sight" },
  { value: "ii", label: "Why mature trees cannot solve everything" },
  { value: "iii", label: "Small changes with measurable effects" },
  { value: "iv", label: "A return to an older planning idea" },
  { value: "v", label: "When shade becomes public infrastructure" },
];

export const demoReadingExam: ExamDefinition = {
  id: "ivy-reading-demo-001",
  title: "IELTS Academic Reading · Familiarisation Sample",
  module: "Reading",
  durationMinutes: 20,
  sections: [
    {
      id: "passage-1",
      title: "READING PASSAGE 1",
      passageTitle: "The Return of Urban Shade",
      instruction: "You should spend about 20 minutes on Questions 1–10, which are based on Reading Passage 1 below.",
      paragraphs: [
        {
          label: "A",
          text: "For much of the twentieth century, city planners treated shade as a side effect of streets, buildings and parks rather than as infrastructure in its own right. That assumption is changing. As summer temperatures rise, researchers are mapping where pedestrians are exposed to direct sun and asking whether shade should be planned with the same care as crossings, drainage and street lighting.",
        },
        {
          label: "B",
          text: "The idea is not entirely new. Older streets in many warm regions were deliberately narrow, lined with arcades or planted with trees whose canopies met above the road. Air conditioning and car-centred planning reduced the importance of these features. Today, however, heat-health studies have revived interest in the practical value of keeping walking routes cooler.",
        },
        {
          label: "C",
          text: "Trees remain one of the most effective sources of urban shade, but they are not a quick universal solution. A young tree may take years to develop a useful canopy, roots compete with underground services, and some species struggle in compacted soil. For this reason, several cities are combining planting with temporary structures, awnings and redesigned bus shelters.",
        },
        {
          label: "D",
          text: "Even modest interventions can matter. In one pilot project, a sequence of lightweight shade sails was installed along a route between a railway station and a hospital. Sensors recorded lower surface temperatures beneath the structures, while pedestrian counts suggested that more people chose the shaded side of the street during the hottest hours.",
        },
        {
          label: "E",
          text: "The next challenge is deciding where limited funding should go. A shaded plaza may look impressive, yet a less visible route used daily by older residents could have a greater health benefit. New mapping tools therefore combine temperature data with information about foot traffic, age, access to public transport and the location of essential services.",
        },
        {
          label: "F",
          text: "This approach changes the language of urban design. Shade is no longer discussed only as an aesthetic quality or an amenity. Increasingly, planners describe it as a form of public protection: something that can determine whether a person is able to walk safely to a clinic, wait for a bus, or remain outdoors during periods of extreme heat.",
        },
      ],
      questions: [
        {
          id: "q1",
          number: 1,
          type: "matching-headings",
          instruction: "Choose the correct heading for Paragraph B from the list of headings below.",
          stem: "Paragraph B",
          options: headings,
          correctAnswers: ["iv"],
        },
        {
          id: "q2",
          number: 2,
          type: "matching-headings",
          instruction: "Choose the correct heading for Paragraph C from the list of headings below.",
          stem: "Paragraph C",
          options: headings,
          correctAnswers: ["ii"],
        },
        {
          id: "q3",
          number: 3,
          type: "matching-information",
          instruction: "Which paragraph contains the following information? Choose A–F.",
          stem: "an example in which pedestrian behaviour changed after shade was added",
          options: ["A", "B", "C", "D", "E", "F"].map((value) => ({ value, label: value })),
          correctAnswers: ["D"],
        },
        {
          id: "q4",
          number: 4,
          type: "true-false-not-given",
          instruction: "Do the following statements agree with the information given in Reading Passage 1?",
          stem: "Twentieth-century planners generally regarded shade as a separate category of public infrastructure.",
          options: ["TRUE", "FALSE", "NOT GIVEN"].map((value) => ({ value, label: value })),
          correctAnswers: ["FALSE"],
        },
        {
          id: "q5",
          number: 5,
          type: "yes-no-not-given",
          instruction: "Do the following statements agree with the views expressed by the writer?",
          stem: "The writer believes planting trees should be the only response to urban heat.",
          options: ["YES", "NO", "NOT GIVEN"].map((value) => ({ value, label: value })),
          correctAnswers: ["NO"],
        },
        {
          id: "q6",
          number: 6,
          type: "multiple-choice",
          instruction: "Choose the correct letter, A, B, C or D.",
          stem: "Why are cities using mapping tools when planning shade?",
          options: [
            { value: "A", label: "To replace temperature measurements with demographic data" },
            { value: "B", label: "To identify locations where shade may have the greatest practical benefit" },
            { value: "C", label: "To make public spaces look more visually consistent" },
            { value: "D", label: "To calculate how quickly newly planted trees will grow" },
          ],
          correctAnswers: ["B"],
        },
        {
          id: "q7",
          number: 7,
          type: "text-input",
          instruction: "Complete the sentence below. Choose NO MORE THAN TWO WORDS from the passage.",
          stem: "Young trees may need several years before they develop a useful ________.",
          maxWords: 2,
          correctAnswers: ["canopy", "a useful canopy"],
        },
        {
          id: "q8",
          number: 8,
          type: "summary-completion",
          instruction: "Complete the summary. Choose ONE WORD ONLY from the passage.",
          stem: "A pilot route used shade sails between a station and a hospital. Measurements showed lower surface temperatures, and ________ counts indicated that people preferred the shaded side in the hottest period.",
          maxWords: 1,
          correctAnswers: ["pedestrian"],
        },
        {
          id: "q9",
          number: 9,
          type: "short-answer",
          instruction: "Answer the question below. Choose NO MORE THAN THREE WORDS from the passage.",
          stem: "What type of underground infrastructure can compete with tree roots?",
          maxWords: 3,
          correctAnswers: ["underground services", "services"],
        },
        {
          id: "q10",
          number: 10,
          type: "multiple-choice",
          instruction: "Choose the correct letter, A, B, C or D.",
          stem: "What is the main point of the final paragraph?",
          options: [
            { value: "A", label: "Shade is increasingly being treated as a form of public protection." },
            { value: "B", label: "People should avoid walking outdoors during hot weather." },
            { value: "C", label: "Public transport is the main cause of heat exposure." },
            { value: "D", label: "Aesthetic design should take priority over health data." },
          ],
          correctAnswers: ["A"],
        },
      ],
    },
  ],
};
