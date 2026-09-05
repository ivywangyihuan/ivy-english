import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, CheckCircle2, ExternalLink, FileText, Headphones, Mic2, RotateCcw, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { DailyAudioPlayer } from "@/components/DailyAudioPlayer";
import { useAppState } from "@/state/app-state";
import { demoWritingTasks } from "@/data/writing-demo";
import { getSessionDetail, type SessionQuestionDetail } from "@/lib/session-detail-store";
import { keyFromLabel, moduleMeta, type LearningModuleKey } from "@/lib/learning-navigation";
import { listRecordings, type SavedRecording } from "@/lib/media-store";
import { cn } from "@/lib/utils";

export type SessionFrom="history"|"progress"|"practice"|"library"|"home";
type QuestionFilter="all"|"wrong"|"blank";

export const Route=createFileRoute("/session")({
  validateSearch:(search:Record<string,unknown>):{id:string;from:SessionFrom;module:LearningModuleKey}=>{
    const modules:LearningModuleKey[]=["listening","speaking","reading","writing"];
    const froms:SessionFrom[]=["history","progress","practice","library","home"];
    return {
      id:typeof search.id==="string"?search.id:"",
      from:froms.includes(search.from as SessionFrom)?search.from as SessionFrom:"history",
      module:modules.includes(search.module as LearningModuleKey)?search.module as LearningModuleKey:"listening",
    };
  },
  head:()=>({meta:[{title:"学习记录 · Ivy English"}]}),
  component:SessionPage,
});

function BackLink({from,module}:{from:SessionFrom;module:LearningModuleKey}){
  const label=moduleMeta(module).label;
  if(from==="home")return <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/>返回首页</Link>;
  if(from==="progress")return <Link to="/progress-detail" search={{module}} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/>返回{label}进度</Link>;
  if(from==="practice")return <Link to="/practice" search={{module}} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/>返回{label}学习</Link>;
  if(from==="library")return <Link to="/library" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/>返回资料库</Link>;
  return <Link to="/history" search={{module}} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5"/>返回{label}历史</Link>;
}

function QuestionHistory({questions,retryHref}:{questions:SessionQuestionDetail[];retryHref:string}){
  const [filter,setFilter]=useState<QuestionFilter>("all");
  const answered=questions.filter(q=>Boolean(q.answer?.trim())).length;
  const correct=questions.filter(q=>q.isCorrect===true).length;
  const wrong=questions.filter(q=>Boolean(q.answer?.trim())&&q.isCorrect===false).length;
  const blank=questions.length-answered;
  const visible=questions.filter(q=>filter==="all"?true:filter==="wrong"?Boolean(q.answer?.trim())&&q.isCorrect===false:!q.answer?.trim());
  const filters:[QuestionFilter,string,number][]=[["all","全部",questions.length],["wrong","错题",wrong],["blank","未作答",blank]];
  return <section className="mt-8 border-t border-border pt-8">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Review</p><h2 className="display mt-1 text-xl">题目与回答</h2><p className="mt-1 text-xs text-muted-foreground">保留本次题目、你的答案和正确答案。</p></div><div className="flex gap-5 text-xs text-muted-foreground"><span><b className="mr-1 font-medium text-foreground">{correct}</b>正确</span><span><b className="mr-1 font-medium text-foreground">{answered}</b>已答</span><span><b className="mr-1 font-medium text-foreground">{questions.length}</b>总题数</span></div></div>
    <div className="mt-5 flex flex-wrap gap-2">{filters.map(([key,label,count])=><button key={key} type="button" onClick={()=>setFilter(key)} className={cn("rounded-full border px-3 py-1.5 text-[11px] transition-colors",filter===key?"border-transparent bg-primary text-primary-foreground":"border-border bg-background text-muted-foreground hover:text-foreground")}>{label}<span className="ml-1 tabular-nums opacity-70">{count}</span></button>)}</div>
    <div className="mt-4 space-y-3">{visible.map((q,index)=>{const hasAnswer=Boolean(q.answer?.trim());const ok=q.isCorrect===true;const bad=hasAnswer&&q.isCorrect===false;return <article key={`${q.number??index}-${q.question}`} className={cn("rounded-2xl border p-4 sm:p-5",ok?"border-[#cfdecf] bg-[#f7faf7]":bad?"border-[#ead7c5] bg-[#fffaf4]":"border-border bg-background")}><div className="flex items-start gap-3"><span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",ok?"bg-[#dfeadf] text-[#41604a]":bad?"bg-[#f4e4d5] text-[#805b38]":"bg-secondary text-muted-foreground")}>{q.number??index+1}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><p className="max-w-3xl text-sm leading-6">{q.question}</p>{typeof q.isCorrect==="boolean"?<span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px]",ok?"bg-[#dfeadf] text-[#41604a]":bad?"bg-[#f4e4d5] text-[#805b38]":"bg-secondary text-muted-foreground")}>{ok?<CheckCircle2 className="size-3"/>:bad?<XCircle className="size-3"/>:<AlertCircle className="size-3"/>}{ok?"正确":bad?"错误":"未作答"}</span>:null}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-white/70 p-3.5"><p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">你的答案</p><p className={cn("mt-1.5 text-sm",hasAnswer?"text-foreground":"italic text-muted-foreground")}>{q.answer?.trim()||"未作答"}</p></div><div className="rounded-xl bg-white/70 p-3.5"><p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">正确答案</p><p className="mt-1.5 text-sm">{q.correctAnswer??"—"}</p></div></div></div></div></article>})}{!visible.length?<div className="rounded-2xl border border-dashed border-border py-10 text-center text-xs text-muted-foreground">这个筛选下没有题目。</div>:null}</div>
    {wrong||blank?<div className="mt-5 flex justify-end"><a href={retryHref} className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs hover:border-sage"><RotateCcw className="size-3.5"/>重新练这一类</a></div>:null}
  </section>;
}

function MissingHistory({title,description,retryHref,action}:{title:string;description:string;retryHref:string;action:string}){
  return <section className="mt-8 border-t border-border pt-8"><p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Review</p><h2 className="display mt-1 text-xl">{title}</h2><div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/25 p-5 sm:p-6"><div className="flex gap-3"><AlertCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground"/><div><p className="text-sm">这条记录没有保存可回看的详细内容。</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p><a href={retryHref} className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs hover:border-sage"><RotateCcw className="size-3.5"/>{action}</a></div></div></div></section>;
}

function SessionPage(){
  const {id,from,module:searchModule}=Route.useSearch();
  const {sessions}=useAppState();
  const session=sessions.find(s=>s.id===id);
  const module=session?keyFromLabel(session.module):searchModule;
  const detail=useMemo(()=>getSessionDetail(id),[id]);
  const [recordings,setRecordings]=useState<(SavedRecording&{url:string})[]>([]);

  useEffect(()=>{
    let mounted=true;
    void listRecordings()
      .then(items=>{
        if(!mounted)return;
        const ids=new Set(detail?.recordingIds??[]);
        setRecordings(items.filter(item=>ids.has(item.id)).map(item=>({...item,url:URL.createObjectURL(item.blob)})));
      })
      .catch(()=>setRecordings([]));
    return()=>{
      mounted=false;
      setRecordings(current=>{
        current.forEach(item=>URL.revokeObjectURL(item.url));
        return [];
      });
    };
  },[detail?.recordingIds]);

  if(!session)return <div className="space-y-6"><PageHeader title="学习记录" subtitle="没有找到这条记录。"/><BackLink from={from} module={module}/></div>;

  const meta=moduleMeta(module);
  const isIelts=/IELTS|CBT|Task\s*[12]|Exam Engine/i.test(`${session.activity} ${session.tool??""}`);
  const retryHref=isIelts?meta.examHref:`/practice?module=${module}`;
  const questionBased=(module==="reading"||module==="listening")&&isIelts;
  const mediaIsUrl=Boolean(detail?.mediaLabel&&/^https?:\/\//i.test(detail.mediaLabel));
  const legacyWriting=module==="writing"&&isIelts&&!detail?.userResponse&&!session.notes;
  const missingSpeaking=module==="speaking"&&(!detail?.recordingIds?.length||recordings.length===0)&&!detail?.prompt;
  const missingDailyListening=module==="listening"&&!isIelts&&!detail?.sourceText&&!detail?.mediaLabel&&!detail?.userResponse;
  const writingPrompt=module==="writing"&&detail?.kind==="ielts"
    ? detail.subtype==="writing-task1"?demoWritingTasks["1"].prompt
      :detail.subtype==="writing-task2"?demoWritingTasks["2"].prompt
      :detail.subtype==="writing-full"?`Task 1\n${demoWritingTasks["1"].prompt}\n\nTask 2\n${demoWritingTasks["2"].prompt}`
      :detail.prompt
    :detail?.prompt;
  const responseLabel=module==="writing"?"你的作文":module==="listening"?"你的听写 / 复盘":module==="reading"?"你的笔记":"你的回答";

  return <div className="space-y-8">
    <div className="flex flex-wrap items-center justify-between gap-3"><BackLink from={from} module={module}/><div className="flex gap-3"><Link to="/history" search={{module}} className="text-xs text-sage-foreground hover:underline">{session.module}历史</Link><Link to="/progress-detail" search={{module}} className="text-xs text-sage-foreground hover:underline">{session.module}进度</Link></div></div>
    <div className="surface p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><span className="rounded-full bg-sage-soft px-2.5 py-1 text-[10px] text-sage-foreground">{session.module}</span><h1 className="display mt-4 text-2xl sm:text-3xl">{session.activity}</h1><p className="mt-2 text-xs text-muted-foreground">{session.date}{session.tool?` · ${session.tool}`:""}</p></div>{session.score?<p className="display text-2xl tabular-nums">{session.score}</p>:null}</div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-secondary/50 p-4"><p className="text-[11px] text-muted-foreground">学习时间</p><p className="mt-1 text-lg tabular-nums">{session.durationMinutes} min</p></div><div className="rounded-xl bg-secondary/50 p-4"><p className="text-[11px] text-muted-foreground">类型</p><p className="mt-1 text-lg">{detail?.kind==="ielts"||isIelts?"IELTS / CBT":"Daily English"}</p></div><div className="rounded-xl bg-secondary/50 p-4"><p className="text-[11px] text-muted-foreground">结果</p><p className="mt-1 text-lg">{session.score??"已完成"}</p></div></div>

      {questionBased&&detail?.questions?.length?<QuestionHistory questions={detail.questions} retryHref={retryHref}/>:questionBased?<MissingHistory title="题目与回答" description="这是一条旧版 CBT 记录，当时只保存了成绩和学习时间。新的 Reading / Listening CBT 会保存每一道题、你的答案、正确答案和对错状态。" retryHref={retryHref} action="重新练一次并完整记录"/>:null}
      {legacyWriting?<MissingHistory title="题目与作文" description="这是一条旧版写作记录，当时只保存了字数和学习时间；正文和原题无法恢复。新的 Writing 练习会保存实际题目、完整作文正文、字数和用时。" retryHref={retryHref} action="重新写一篇并完整记录"/>:null}
      {missingSpeaking?<MissingHistory title="题目与录音" description="这条旧记录没有关联录音文件。现在的 Speaking Workspace 会把每一道已完成题目的录音保存在当前设备，并在这里逐条回放。" retryHref={retryHref} action="重新录一次"/>:null}
      {missingDailyListening?<MissingHistory title="材料与学习记录" description="这次练习只留下了时长，没有素材链接、内置音频文本或听写复盘。新的真实视频听力请先保存素材链接；内置听力会同时保存材料和你的听写/复盘。" retryHref={retryHref} action="重新练一次"/>:null}

      {writingPrompt&&!legacyWriting?<section className="mt-7"><p className="text-xs text-muted-foreground">题目 / Prompt</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-secondary/45 p-4 text-sm leading-6">{writingPrompt}</p></section>:detail?.prompt&&module!=="speaking"?<section className="mt-7"><p className="text-xs text-muted-foreground">题目 / Prompt</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-secondary/45 p-4 text-sm leading-6">{detail.prompt}</p></section>:null}

      {detail?.sourceTitle||detail?.sourceText||detail?.mediaLabel?<section className="mt-7"><p className="text-xs text-muted-foreground">学习材料</p><div className="mt-2 rounded-xl border border-border p-4"><div className="flex items-center gap-2 text-sm">{module==="listening"?<Headphones className="size-4 text-sage"/>:<FileText className="size-4 text-sage"/>}<span>{detail.sourceTitle??"本次材料"}</span></div>{module==="listening"&&detail.kind==="daily"&&detail.sourceText?<div className="mt-4"><DailyAudioPlayer text={detail.sourceText} storageKey={`ivy-history-audio-${id}`}/></div>:detail.sourceText?<p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{detail.sourceText}</p>:null}{detail.mediaLabel?<div className="mt-3 text-xs text-muted-foreground">{mediaIsUrl?<a href={detail.mediaLabel} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sage-foreground hover:underline"><ExternalLink className="size-3"/>打开原始素材</a>:detail.mediaLabel}</div>:null}</div></section>:null}

      {!questionBased&&!legacyWriting&&detail?.userResponse?<section className="mt-7"><p className="text-xs text-muted-foreground">{responseLabel}</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-[#f7f6f1] p-4 text-sm leading-7">{detail.userResponse}</p></section>:!questionBased&&!legacyWriting&&session.notes&&module!=="speaking"?<section className="mt-7"><p className="text-xs text-muted-foreground">{responseLabel}</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-[#f7f6f1] p-4 text-sm leading-7">{session.notes}</p></section>:null}

      {module==="speaking"&&detail?.prompt&&!missingSpeaking?<section className="mt-7"><p className="text-xs text-muted-foreground">本次题目</p><p className="mt-2 whitespace-pre-wrap rounded-xl bg-secondary/45 p-4 text-sm leading-7">{detail.prompt}</p></section>:null}
      {recordings.length?<section className="mt-7"><div className="flex items-end justify-between gap-3"><div><p className="text-xs text-muted-foreground">本次录音</p><p className="mt-1 text-[11px] text-muted-foreground">每条录音都保留当时回答的题目。</p></div><span className="text-xs tabular-nums text-muted-foreground">{recordings.length} 条</span></div><div className="mt-3 space-y-3">{recordings.map((recording,index)=><div key={recording.id} className="rounded-xl border border-border p-4"><div className="flex items-center gap-2"><Mic2 className="size-4 text-sage"/><p className="text-sm">回答 {index+1}</p></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{recording.prompt}</p><audio controls src={recording.url} className="mt-3 w-full"/></div>)}</div></section>:detail?.recordingIds?.length&&!missingSpeaking?<p className="mt-6 rounded-xl bg-secondary/40 p-4 text-xs leading-5 text-muted-foreground">本次录音已经登记，但当前浏览器没有找到对应音频。录音目前保存在创建它的设备浏览器中。</p>:null}

      {detail?.highlights?.length||detail?.vocabulary?.length?<section className="mt-7 grid gap-4 md:grid-cols-2">{detail.highlights?.length?<div><p className="text-xs text-muted-foreground">Highlights</p><div className="mt-2 space-y-2">{detail.highlights.map((item,index)=><p key={`${item}-${index}`} className="rounded-lg bg-[#fff8bf] px-3 py-2 text-xs">{item}</p>)}</div></div>:null}{detail.vocabulary?.length?<div><p className="text-xs text-muted-foreground">Vocabulary</p><div className="mt-2 flex flex-wrap gap-2">{detail.vocabulary.map((word,index)=><span key={`${word}-${index}`} className="rounded-full bg-sage-soft px-2.5 py-1 text-xs text-sage-foreground">{word}</span>)}</div></div>:null}</section>:null}

      <div className="mt-8 flex flex-wrap gap-3"><a href={retryHref} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground"><RotateCcw className="size-3.5"/>再练一次</a><Button asChild variant="outline" className="rounded-full"><Link to="/history" search={{module}}>查看{session.module}历史</Link></Button>{module==="speaking"?<Button asChild variant="outline" className="rounded-full"><Link to="/recordings">全部录音</Link></Button>:null}</div>
    </div>
  </div>;
}
