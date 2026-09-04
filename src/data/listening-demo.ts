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

export interface ListeningDemoSection {
  id: string;
  title: string;
  sectionLabel: string;
  topic: string;
  estimatedSeconds: number;
  script: string[];
  questions: ListeningDemoQuestion[];
}

const choice = (values: Array<[string, string]>) => values.map(([value, label]) => ({ value, label }));

export const listeningSections: ListeningDemoSection[] = [
  {
    id: "section-1",
    title: "IELTS Listening · Section 1",
    sectionLabel: "SECTION 1",
    topic: "Photography workshop booking",
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
      { id: "lq1", number: 1, type: "text", instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.", stem: "Workshop start time: ________", correctAnswers: ["8:30", "8.30", "eight thirty"] },
      { id: "lq2", number: 2, type: "text", instruction: "Complete the notes below.", stem: "Meeting place: small ________", correctAnswers: ["library"] },
      { id: "lq3", number: 3, type: "text", instruction: "Complete the notes below.", stem: "Maximum number of participants: ________", correctAnswers: ["12", "twelve"] },
      { id: "lq4", number: 4, type: "text", instruction: "Complete the notes below.", stem: "Cyclists are advised to bring a ________ lock.", correctAnswers: ["bicycle", "bike"] },
      { id: "lq5", number: 5, type: "text", instruction: "Complete the notes below.", stem: "Payment deadline: ________", correctAnswers: ["friday"] },
      { id: "lq6", number: 6, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What will the tutor do first?", options: choice([["A", "Demonstrate camera equipment"], ["B", "Give a short talk about light"], ["C", "Take the group outside"]]), correctAnswers: ["B"] },
      { id: "lq7", number: 7, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Where will participants practise portraits?", options: choice([["A", "In the main hall"], ["B", "In the market square"], ["C", "Near the windows"]]), correctAnswers: ["C"] },
      { id: "lq8", number: 8, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Where will the group go after the break?", options: choice([["A", "The market square"], ["B", "The park"], ["C", "The library"]]), correctAnswers: ["A"] },
      { id: "lq9", number: 9, type: "text", instruction: "Complete the notes below. Write ONE WORD ONLY.", stem: "Most important item for the outdoor part: comfortable ________", correctAnswers: ["shoes"] },
      { id: "lq10", number: 10, type: "text", instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.", stem: "Workshop price: £________", correctAnswers: ["36", "thirty-six", "thirty six"] },
    ],
  },
  {
    id: "section-2",
    title: "IELTS Listening · Section 2",
    sectionLabel: "SECTION 2",
    topic: "Harbour walking trail information",
    estimatedSeconds: 155,
    script: [
      "Welcome to the Harbour Discovery Trail. Before you begin, I will explain the route and the facilities available today.",
      "The walk starts beside the old clock tower, not at the visitor centre as shown on last year's leaflet.",
      "From the clock tower, follow the blue signs towards the sea wall. The first viewpoint is beside a small cafe called Salt House.",
      "The cafe opens at ten, but public toilets behind the building are available from nine o'clock.",
      "After the viewpoint, continue north until you reach a wooden bridge. Please do not cross it because repairs are taking place this week.",
      "Instead, turn left before the bridge and follow the temporary gravel path around the boat yard.",
      "Families may want to stop at the discovery garden. Children can borrow activity sheets from the green box near the entrance.",
      "A little further on is the marine centre. Entry is free today because the main exhibition gallery is being updated.",
      "The centre's most popular talk, about seals, begins at eleven fifteen in the lecture room.",
      "For lunch, there are picnic tables behind the marine centre. Please use those rather than the benches beside the rescue station, which need to remain clear.",
      "The final part of the route climbs gently to Beacon Hill. The path is suitable for most walkers, but wheelchairs should use the alternative road route marked in orange.",
      "At the top, look for the stone shelter. On clear days you can see three islands from there.",
      "The full trail takes about two hours without long stops. If you are short of time, the harbour loop takes around seventy minutes.",
      "Please return borrowed activity sheets to the visitor centre before four thirty. Enjoy your walk.",
    ],
    questions: [
      { id: "lq11", number: 11, type: "text", instruction: "Complete the notes. Write ONE WORD AND/OR A NUMBER.", stem: "The walk now begins beside the old ________ tower.", correctAnswers: ["clock"] },
      { id: "lq12", number: 12, type: "text", instruction: "Complete the notes.", stem: "Public toilets are available from ________ o'clock.", correctAnswers: ["9", "nine"] },
      { id: "lq13", number: 13, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What should walkers do at the wooden bridge?", options: choice([["A", "Cross it carefully"], ["B", "Turn left before it"], ["C", "Wait for a guide"]]), correctAnswers: ["B"] },
      { id: "lq14", number: 14, type: "text", instruction: "Complete the notes.", stem: "Children can collect activity sheets from a ________ box.", correctAnswers: ["green"] },
      { id: "lq15", number: 15, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Why is entry to the marine centre free today?", options: choice([["A", "It is a public holiday"], ["B", "A gallery is being updated"], ["C", "The seal talk is cancelled"]]), correctAnswers: ["B"] },
      { id: "lq16", number: 16, type: "text", instruction: "Complete the notes.", stem: "The seal talk starts at ________.", correctAnswers: ["11:15", "11.15", "eleven fifteen"] },
      { id: "lq17", number: 17, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Where should visitors eat lunch?", options: choice([["A", "Behind the marine centre"], ["B", "Beside the rescue station"], ["C", "At the clock tower"]]), correctAnswers: ["A"] },
      { id: "lq18", number: 18, type: "text", instruction: "Complete the notes.", stem: "Wheelchair users should follow the route marked in ________.", correctAnswers: ["orange"] },
      { id: "lq19", number: 19, type: "text", instruction: "Complete the notes.", stem: "The full trail takes about ________ hours.", correctAnswers: ["2", "two"] },
      { id: "lq20", number: 20, type: "text", instruction: "Complete the notes.", stem: "Borrowed activity sheets must be returned before ________.", correctAnswers: ["4:30", "4.30", "four thirty"] },
    ],
  },
  {
    id: "section-3",
    title: "IELTS Listening · Section 3",
    sectionLabel: "SECTION 3",
    topic: "Student research project meeting",
    estimatedSeconds: 175,
    script: [
      "Thanks for meeting me, Dr Patel. Maya and I have narrowed our project down to how students use quiet study spaces.",
      "Good. Your original idea about general library satisfaction was too broad. What evidence will you collect?",
      "We thought of an online survey first, because it is easy to distribute.",
      "Use one, but do not rely on it alone. Students often report what they think they do rather than what they actually do.",
      "So we also plan short observations in three buildings: the main library, the engineering hub and the arts centre.",
      "Why those three?",
      "They have different layouts and opening hours. We dropped the sports centre because its study area is too small.",
      "That sounds sensible. How will you record noise?",
      "Leo suggested using a phone app that gives a decibel reading every five minutes.",
      "The app is fine for comparison, but calibrate the phones against the same meter before you begin.",
      "We had not thought of that. Should we interview students too?",
      "Yes, but keep the interviews brief. Ask what task they are doing and why they chose that location. Avoid asking them to rate the whole building.",
      "For the observation timetable, we planned mornings only so we can finish quickly.",
      "That would bias the results. Include at least one evening period, especially in the main library, which changes character after six.",
      "Okay. We can collect data over two weeks instead of one.",
      "Good. And before collecting anything, submit the ethics form. Your participants are adults, but you are still gathering identifiable comments.",
      "We will do that this afternoon. For the final presentation, should we show every table?",
      "No. Use one clear map of the spaces, two or three findings, and explain one limitation honestly. That will be stronger than ten crowded slides.",
    ],
    questions: [
      { id: "lq21", number: 21, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Why was the students' original research idea unsuitable?", options: choice([["A", "It was too broad"], ["B", "It had been studied before"], ["C", "It required expensive equipment"]]), correctAnswers: ["A"] },
      { id: "lq22", number: 22, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What concern does Dr Patel have about surveys?", options: choice([["A", "Students may not complete them"], ["B", "Reported behaviour may be inaccurate"], ["C", "They take too long to analyse"]]), correctAnswers: ["B"] },
      { id: "lq23", number: 23, type: "text", instruction: "Complete the notes. Write NO MORE THAN TWO WORDS.", stem: "The students will observe three buildings, including the ________ hub.", correctAnswers: ["engineering"] },
      { id: "lq24", number: 24, type: "text", instruction: "Complete the notes.", stem: "They rejected the sports centre because the study area was too ________.", correctAnswers: ["small"] },
      { id: "lq25", number: 25, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What should they do before using phone apps to compare noise?", options: choice([["A", "Buy identical phones"], ["B", "Calibrate them against one meter"], ["C", "Record continuously"]]), correctAnswers: ["B"] },
      { id: "lq26", number: 26, type: "text", instruction: "Complete the notes.", stem: "Interviewees should be asked what ________ they are doing.", correctAnswers: ["task"] },
      { id: "lq27", number: 27, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Why does Dr Patel reject morning-only observations?", options: choice([["A", "They would bias the results"], ["B", "The buildings open late"], ["C", "Students are less cooperative"]]), correctAnswers: ["A"] },
      { id: "lq28", number: 28, type: "text", instruction: "Complete the notes.", stem: "Data collection will now last ________ weeks.", correctAnswers: ["2", "two"] },
      { id: "lq29", number: 29, type: "text", instruction: "Complete the notes.", stem: "Before collecting data, the students must submit an ________ form.", correctAnswers: ["ethics"] },
      { id: "lq30", number: 30, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What does Dr Patel recommend for the final presentation?", options: choice([["A", "Show every data table"], ["B", "Use ten detailed slides"], ["C", "Explain one limitation clearly"]]), correctAnswers: ["C"] },
    ],
  },
  {
    id: "section-4",
    title: "IELTS Listening · Section 4",
    sectionLabel: "SECTION 4",
    topic: "Lecture on urban night lighting",
    estimatedSeconds: 185,
    script: [
      "Today we are looking at urban night lighting and the surprising ways in which small changes to light can affect both people and wildlife.",
      "For decades, city lighting policy focused mainly on visibility and crime prevention. More recently, researchers have asked whether brighter always means safer.",
      "One difficulty is glare. A very bright lamp can reduce a pedestrian's ability to see into darker areas nearby because the eye adapts to the brightest source.",
      "Shielded fixtures address this by directing light downwards instead of allowing it to spread horizontally or into the sky.",
      "Colour also matters. Lamps with a high proportion of blue light can make details appear sharp, but blue wavelengths scatter strongly in the atmosphere.",
      "They can also disrupt insects and some migrating birds, especially near rivers and parks.",
      "Several towns have therefore tested warmer lamps in ecologically sensitive areas. These are not simply dimmer lamps; their spectrum is different.",
      "Human sleep is another concern. Light entering bedroom windows late at night may delay the body's release of melatonin, although individual responses vary considerably.",
      "This does not mean streets should be dark. The most successful projects tend to use targeted lighting: brighter at crossings and transport stops, lower where activity is limited.",
      "Timing offers another tool. Sensors can reduce output after midnight and raise it temporarily when movement is detected.",
      "A pilot scheme in a small coastal town cut electricity use by twenty-eight percent without increasing reported night-time accidents.",
      "Residents initially worried that the streets would feel unsafe, but surveys six months later showed that most people preferred the reduced glare.",
      "Designers now increasingly talk about contrast rather than absolute brightness. A route is easier to understand when important features are visible without every surface being equally illuminated.",
      "For planners, the challenge is to combine energy, ecology, accessibility and public confidence rather than optimise a single measure.",
      "In your seminar next week, compare two lighting strategies and identify which groups might benefit or lose from each approach.",
    ],
    questions: [
      { id: "lq31", number: 31, type: "text", instruction: "Complete the notes. Write ONE WORD ONLY.", stem: "Early lighting policy concentrated on visibility and crime ________.", correctAnswers: ["prevention"] },
      { id: "lq32", number: 32, type: "text", instruction: "Complete the notes.", stem: "Very bright lamps can create ________, making darker areas harder to see.", correctAnswers: ["glare"] },
      { id: "lq33", number: 33, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What is the purpose of a shielded light fixture?", options: choice([["A", "To direct light downwards"], ["B", "To increase blue wavelengths"], ["C", "To make every surface equally bright"]]), correctAnswers: ["A"] },
      { id: "lq34", number: 34, type: "text", instruction: "Complete the notes.", stem: "Blue wavelengths scatter strongly in the ________.", correctAnswers: ["atmosphere"] },
      { id: "lq35", number: 35, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Why are warmer lamps used near some rivers and parks?", options: choice([["A", "They are always cheaper"], ["B", "They may reduce disturbance to wildlife"], ["C", "They remove the need for sensors"]]), correctAnswers: ["B"] },
      { id: "lq36", number: 36, type: "text", instruction: "Complete the notes.", stem: "Late-night light may delay the release of ________.", correctAnswers: ["melatonin"] },
      { id: "lq37", number: 37, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "Where does the lecturer suggest brighter targeted lighting?", options: choice([["A", "Every residential window"], ["B", "Crossings and transport stops"], ["C", "All parks after midnight"]]), correctAnswers: ["B"] },
      { id: "lq38", number: 38, type: "text", instruction: "Complete the notes.", stem: "Sensors can increase light temporarily when ________ is detected.", correctAnswers: ["movement"] },
      { id: "lq39", number: 39, type: "text", instruction: "Complete the notes.", stem: "The coastal pilot reduced electricity use by ________ percent.", correctAnswers: ["28", "twenty-eight", "twenty eight"] },
      { id: "lq40", number: 40, type: "choice", instruction: "Choose the correct letter, A, B or C.", stem: "What concept are lighting designers increasingly emphasising?", options: choice([["A", "Contrast"], ["B", "Maximum brightness"], ["C", "Decorative colour"]]), correctAnswers: ["A"] },
    ],
  },
];

export const listeningDemo = listeningSections[0]!;

export const listeningFullDemo = {
  id: "ivy-listening-full-demo-001",
  title: "IELTS Listening · Four-section structural sample",
  estimatedSeconds: listeningSections.reduce((sum, section) => sum + section.estimatedSeconds, 0),
  sections: listeningSections,
  questions: listeningSections.flatMap((section) => section.questions),
};
