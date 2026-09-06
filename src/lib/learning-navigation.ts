export type LearningModuleKey = "listening" | "speaking" | "reading" | "writing";
export type LearningModuleLabel = "听力" | "口语" | "阅读" | "写作";

export interface LearningModuleMeta {
  key: LearningModuleKey;
  label: LearningModuleLabel;
  english: string;
  practiceSearch: { module: LearningModuleKey };
  progressSearch: { module: LearningModuleKey };
  historySearch: { module: LearningModuleKey | "all" };
  examHref: string;
  examLabel: string;
}

export const learningModules: LearningModuleMeta[] = [
  { key: "listening", label: "听力", english: "Listening", practiceSearch: { module: "listening" }, progressSearch: { module: "listening" }, historySearch: { module: "listening" }, examHref: "/listening-exam-v3?mode=familiarisation&scope=full", examLabel: "Listening 模拟机考" },
  { key: "speaking", label: "口语", english: "Speaking", practiceSearch: { module: "speaking" }, progressSearch: { module: "speaking" }, historySearch: { module: "speaking" }, examHref: "/speaking-workspace?mode=full", examLabel: "Speaking 模拟考试" },
  { key: "reading", label: "阅读", english: "Reading", practiceSearch: { module: "reading" }, progressSearch: { module: "reading" }, historySearch: { module: "reading" }, examHref: "/exam-v3?mode=familiarisation&scope=full", examLabel: "Reading 模拟机考" },
  { key: "writing", label: "写作", english: "Writing", practiceSearch: { module: "writing" }, progressSearch: { module: "writing" }, historySearch: { module: "writing" }, examHref: "/writing-exam-v2?mode=familiarisation&scope=full", examLabel: "Writing 模拟机考" },
];

export function moduleMeta(key: LearningModuleKey) {
  return learningModules.find((item) => item.key === key) ?? learningModules[0]!;
}

export function keyFromLabel(label: string): LearningModuleKey {
  if (label === "口语") return "speaking";
  if (label === "阅读") return "reading";
  if (label === "写作") return "writing";
  return "listening";
}

export function labelFromKey(key: LearningModuleKey): LearningModuleLabel {
  return moduleMeta(key).label;
}

export function defaultPracticeHref(key: LearningModuleKey) {
  return `/practice?module=${key}`;
}
