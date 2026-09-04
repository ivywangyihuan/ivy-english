export type ListeningQuestionType = "text" | "choice";

export interface ListeningDemoQuestion {
  id: string;
  number: number;
  type: ListeningQuestionType;
  instruction: string;
  stem: string;
  options?: { value: string; label: string }[];
  correctAnswers: string[];
}

export const listeningDemo = {
  id: "ivy-listening-demo-001",
  title: "IELTS Listening · Section 1",
  sectionLabel: "SECTION 1",
  estimatedSeconds: 145,
  script: [
    "Good morning, Riverside Community Centre. How can I help?",
    "Hi. I would like to book a place on the weekend photography workshop.",
    "Certainly. The next workshop starts at eight thirty on Saturday morning and finishes just before twelve.",
    "That is fine. Where do we meet?",
    "Please come to the small library on the first floor. The main hall is being repaired this month.",
    "Okay. Is there a limit on numbers?",
    "Yes. We take a maximum of twelve people, because everyone needs space to use the equipment.",
    "Do I need to bring my own camera?",
    "A camera is useful, but it is not essential. The tutor actually recommends bringing a bicycle lock if you cycle here, because there is no indoor bike storage.",
    "Right. And when do I need to pay?",
    "Payment must reach us by Friday. You can pay online or at reception.",
    "What will we do first on Saturday?",
    "The tutor will begin with a short talk about light. After that, you will practise taking portraits near the windows.",
    "Will we go outside?",
    "Yes, after the break. The group will walk to the market square. The park was used last year, but there is construction there now.",
    "And what should I bring for the outdoor part?",
    "Comfortable shoes are the most important thing. You can bring an umbrella if the forecast looks uncertain, but the centre supplies water.",
    "Great. Could you remind me of the price?",
    "It is thirty-six pounds for the full morning, including printed notes.",
    "Perfect. I will book online today. Thank you.",
  ],
  questions: [
    { id: "lq1", number: 1, type: "text" as const, instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.", stem: "Workshop start time: ________", correctAnswers: ["8:30", "8.30", "eight thirty"] },
    { id: "lq2", number: 2, type: "text" as const, instruction: "Complete the notes below.", stem: "Meeting place: small ________", correctAnswers: ["library"] },
    { id: "lq3", number: 3, type: "text" as const, instruction: "Complete the notes below.", stem: "Maximum number of participants: ________", correctAnswers: ["12", "twelve"] },
    { id: "lq4", number: 4, type: "text" as const, instruction: "Complete the notes below.", stem: "Cyclists are advised to bring a ________ lock.", correctAnswers: ["bicycle", "bike"] },
    { id: "lq5", number: 5, type: "text" as const, instruction: "Complete the notes below.", stem: "Payment deadline: ________", correctAnswers: ["friday"] },
    { id: "lq6", number: 6, type: "choice" as const, instruction: "Choose the correct letter, A, B or C.", stem: "What will the tutor do first?", options: [{ value: "A", label: "Demonstrate camera equipment" }, { value: "B", label: "Give a short talk about light" }, { value: "C", label: "Take the group outside" }], correctAnswers: ["B"] },
    { id: "lq7", number: 7, type: "choice" as const, instruction: "Choose the correct letter, A, B or C.", stem: "Where will participants practise portraits?", options: [{ value: "A", label: "In the main hall" }, { value: "B", label: "In the market square" }, { value: "C", label: "Near the windows" }], correctAnswers: ["C"] },
    { id: "lq8", number: 8, type: "choice" as const, instruction: "Choose the correct letter, A, B or C.", stem: "Where will the group go after the break?", options: [{ value: "A", label: "The market square" }, { value: "B", label: "The park" }, { value: "C", label: "The library" }], correctAnswers: ["A"] },
    { id: "lq9", number: 9, type: "text" as const, instruction: "Complete the notes below. Write ONE WORD ONLY.", stem: "Most important item for the outdoor part: comfortable ________", correctAnswers: ["shoes"] },
    { id: "lq10", number: 10, type: "text" as const, instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.", stem: "Workshop price: £________", correctAnswers: ["36", "thirty-six", "thirty six"] },
  ],
};
