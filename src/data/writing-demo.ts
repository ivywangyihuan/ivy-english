export type WritingTaskKey = "1" | "2";

export interface WritingTaskDefinition {
  key: WritingTaskKey;
  label: string;
  recommendedMinutes: number;
  minimumWords: number;
  eyebrow: string;
  instruction: string;
  prompt: string;
  visual?: "commute-chart";
}

export const demoWritingTasks: Record<WritingTaskKey, WritingTaskDefinition> = {
  "1": {
    key: "1",
    label: "Task 1",
    recommendedMinutes: 20,
    minimumWords: 150,
    eyebrow: "IELTS Academic Writing · Task 1",
    instruction: "You should spend about 20 minutes on this task.",
    prompt:
      "The chart below shows the average number of minutes commuters in a fictional city spent travelling to work by four forms of transport in 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    visual: "commute-chart",
  },
  "2": {
    key: "2",
    label: "Task 2",
    recommendedMinutes: 40,
    minimumWords: 250,
    eyebrow: "IELTS Academic Writing · Task 2",
    instruction: "You should spend about 40 minutes on this task.",
    prompt:
      "Some people think that city centres should contain more spaces where people can sit, walk and meet, even if this reduces the space available for cars. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
  },
};
