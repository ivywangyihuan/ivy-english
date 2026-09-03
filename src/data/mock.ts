export type Module = "听力" | "口语" | "阅读" | "写作" | "词汇";
export type SignalStatus = "训练中" | "正在进步" | "已稳定";
export interface StudySession { id: string; date: string; module: Module; activity: string; tool?: string; durationMinutes: number; score?: string; notes?: string; }
export interface LearningSignal { id: string; title: string; module: Module; status: SignalStatus; firstSeen: string; lastSeen: string; occurrenceCount: number; evidence: string; nextAction: string; relatedSessionIds: string[]; }
export type SourceType = "recent" | "cambridge" | "official" | "personal";
export interface Question { id: string; sourceType: SourceType; module: Module; part?: string; title: string; topic: string[]; recentDate?: string; reportCount?: number; practiceCount: number; status: "未练习" | "练过 1 次" | "练过多次"; note?: string; }
export const studySessions: StudySession[] = [
{id:"s1",date:"2026-09-03",module:"听力",activity:"English Trainer · 访谈盲听",tool:"English Trainer",durationMinutes:24,notes:"弱读部分需要重听两遍"},
{id:"s2",date:"2026-09-02",module:"阅读",activity:"IELTS Reading · Cambridge 18 Test 2 Passage 3",tool:"IELTS CBT",durationMinutes:38,score:"31 / 40"},
{id:"s3",date:"2026-09-01",module:"口语",activity:"Speaking Part 3 · 自由表达",durationMinutes:18},
{id:"s4",date:"2026-08-31",module:"写作",activity:"Task 2 · Education",durationMinutes:42,score:"328 words"},
{id:"s5",date:"2026-08-30",module:"听力",activity:"盲听与听写 · YouTube 访谈",durationMinutes:26}];
export const learningSignals: LearningSignal[] = [
{id:"g1",title:"弱读 / 连读容易漏听",module:"听力",status:"训练中",firstSeen:"2026-07-22",lastSeen:"2026-09-03",occurrenceCount:11,evidence:"语速正常的对话里，功能词被吞掉时会丢失整句结构。",nextAction:"选 3 段 30 秒素材做逐句听写，重点标出弱读位置。",relatedSessionIds:["s1","s5"]},
{id:"g2",title:"Matching Headings · 主旨判断",module:"阅读",status:"训练中",firstSeen:"2026-08-12",lastSeen:"2026-09-02",occurrenceCount:7,evidence:"经常被 supporting detail 吸引，而没有先判断段落主旨。",nextAction:"练习一组 Matching Headings，并先用一句话总结每段主旨。",relatedSessionIds:["s2"]},
{id:"g3",title:"Part 3 回答展开",module:"口语",status:"正在进步",firstSeen:"2026-07-30",lastSeen:"2026-09-01",occurrenceCount:6,evidence:"观点清楚，但常常两句就结束，缺少例子或对比。",nextAction:"用「观点 — 原因 — 例子」三步说满 40 秒。",relatedSessionIds:["s3"]},
{id:"g4",title:"冠词使用",module:"写作",status:"训练中",firstSeen:"2026-08-05",lastSeen:"2026-08-31",occurrenceCount:9,evidence:"泛指复数与不可数名词前多加了 the。",nextAction:"重读上一篇 Task 2，逐句检查每个 the 是否必要。",relatedSessionIds:["s4"]}];
export const questions: Question[] = [
{id:"q1",sourceType:"recent",module:"口语",part:"Part 2",title:"一次你改变计划的经历",topic:["经历","近期出现"],recentDate:"2026-08-28",reportCount:4,practiceCount:0,status:"未练习"},
{id:"q2",sourceType:"recent",module:"口语",part:"Part 2",title:"一个你喜欢再次去的地方",topic:["地点","旅行"],recentDate:"2026-08-24",reportCount:3,practiceCount:1,status:"练过 1 次"},
{id:"q3",sourceType:"recent",module:"口语",part:"Part 2",title:"一位帮助过你学习的人",topic:["人物"],recentDate:"2026-08-19",reportCount:5,practiceCount:0,status:"未练习"},
{id:"q4",sourceType:"recent",module:"口语",part:"Part 1",title:"Hometown · 你住的地方",topic:["日常"],recentDate:"2026-08-30",reportCount:6,practiceCount:1,status:"练过 1 次"},
{id:"q5",sourceType:"recent",module:"口语",part:"Part 1",title:"Weekends · 周末怎么安排",topic:["日常"],recentDate:"2026-08-27",reportCount:4,practiceCount:0,status:"未练习"},
{id:"q6",sourceType:"recent",module:"口语",part:"Part 3",title:"计划改变对生活的影响",topic:["社会","抽象"],recentDate:"2026-08-28",reportCount:2,practiceCount:0,status:"未练习"},
{id:"q7",sourceType:"recent",module:"口语",part:"Part 3",title:"旅行是否让人更了解自己",topic:["旅行"],recentDate:"2026-08-21",reportCount:3,practiceCount:2,status:"练过多次"},
{id:"q8",sourceType:"recent",module:"写作",part:"Task 2",title:"Some people think... · Education",topic:["Education","Opinion"],recentDate:"2026-08-29",reportCount:3,practiceCount:1,status:"练过 1 次"},
{id:"q9",sourceType:"recent",module:"写作",part:"Task 2",title:"Technology · Discussion essay",topic:["Technology","Discussion"],recentDate:"2026-08-22",reportCount:2,practiceCount:0,status:"未练习"},
{id:"q10",sourceType:"recent",module:"阅读",title:"近期常见题型 · Matching Headings",topic:["题型"],recentDate:"2026-08-26",reportCount:5,practiceCount:1,status:"练过 1 次"},
{id:"q11",sourceType:"recent",module:"听力",title:"Section 3 · 学术讨论多人对话",topic:["题型"],recentDate:"2026-08-25",reportCount:4,practiceCount:0,status:"未练习"},
{id:"q12",sourceType:"official",module:"阅读",title:"IELTS Academic Reading Sample",topic:["官方"],practiceCount:0,status:"未练习"},
{id:"q13",sourceType:"official",module:"听力",title:"IELTS Listening Sample",topic:["官方"],practiceCount:0,status:"未练习"},
{id:"q14",sourceType:"official",module:"写作",title:"IELTS Writing Sample Tasks",topic:["官方"],practiceCount:1,status:"练过 1 次"},
{id:"q15",sourceType:"official",module:"口语",title:"IELTS Speaking Sample",topic:["官方"],practiceCount:0,status:"未练习"}];
export const cambridgeBooks = [
{id:"c20",name:"Cambridge IELTS 20",year:"2025",tests:["Test 1","Test 2","Test 3","Test 4"],modules:["Listening","Reading","Writing","Speaking"],done:0},
{id:"c19",name:"Cambridge IELTS 19",year:"2024",tests:["Test 1","Test 2","Test 3","Test 4"],modules:["Listening","Reading","Writing","Speaking"],done:1},
{id:"c18",name:"Cambridge IELTS 18",year:"2023",tests:["Test 1","Test 2","Test 3","Test 4"],modules:["Listening","Reading","Writing","Speaking"],done:3},
{id:"c17",name:"Cambridge IELTS 17",year:"2022",tests:["Test 1","Test 2","Test 3","Test 4"],modules:["Listening","Reading","Writing","Speaking"],done:2}];
export const myLibrary = [{id:"m1",title:"我的 PDF",count:12,hint:"学术文章 · 课堂讲义"},{id:"m2",title:"老师给的材料",count:7,hint:"口语话题卡 · 写作批注"},{id:"m3",title:"收藏题目",count:23,hint:"想再练一次"},{id:"m4",title:"错题",count:15,hint:"阅读 · 听力"},{id:"m5",title:"待复习",count:9,hint:"本周内"}];
export const weekBreakdown = [{module:"听力" as Module,minutes:82},{module:"阅读" as Module,minutes:74},{module:"口语" as Module,minutes:41},{module:"写作" as Module,minutes:25}];
export const trendByRange: Record<string,{label:string;minutes:number}[]> = {"7天":[{label:"8/28",minutes:32},{label:"8/29",minutes:0},{label:"8/30",minutes:26},{label:"8/31",minutes:42},{label:"9/1",minutes:18},{label:"9/2",minutes:38},{label:"9/3",minutes:24}],"30天":[{label:"第1周",minutes:168},{label:"第2周",minutes:204},{label:"第3周",minutes:152},{label:"第4周",minutes:222}],"3个月":[{label:"6月",minutes:512},{label:"7月",minutes:634},{label:"8月",minutes:738}],全部:[{label:"4月",minutes:210},{label:"5月",minutes:388},{label:"6月",minutes:512},{label:"7月",minutes:634},{label:"8月",minutes:738}]};
export const overviewByRange: Record<string,{time:string;count:number;caption:string}> = {"7天":{time:"3h 00m",count:6,caption:"近 7 天"},"30天":{time:"12h 18m",count:23,caption:"本月"},"3个月":{time:"31h 04m",count:58,caption:"近 3 个月"},全部:{time:"40h 32m",count:74,caption:"全部"}};
export const skillCardsByRange: Record<string,{module:Module;time:string;trend:"↑"|"→"|"↓"}[]> = {"7天":[{module:"听力",time:"1h 22m",trend:"↑"},{module:"口语",time:"0h 41m",trend:"↑"},{module:"阅读",time:"1h 14m",trend:"→"},{module:"写作",time:"0h 25m",trend:"→"}],"30天":[{module:"听力",time:"4h 12m",trend:"↑"},{module:"口语",time:"2h 48m",trend:"↑"},{module:"阅读",time:"3h 37m",trend:"→"},{module:"写作",time:"1h 41m",trend:"→"}],"3个月":[{module:"听力",time:"10h 26m",trend:"↑"},{module:"口语",time:"6h 12m",trend:"↑"},{module:"阅读",time:"9h 48m",trend:"↑"},{module:"写作",time:"4h 38m",trend:"→"}],全部:[{module:"听力",time:"13h 40m",trend:"↑"},{module:"口语",time:"8h 02m",trend:"↑"},{module:"阅读",time:"12h 26m",trend:"↑"},{module:"写作",time:"6h 24m",trend:"→"}]};