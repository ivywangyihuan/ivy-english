import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, RotateCcw, Trash2 } from "lucide-react";
import { PageHeader, SectionTitle, Chip } from "@/components/ui-kit";
import { useAppState, type MistakeStatus } from "@/state/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mistakes")({ head:()=>({meta:[{title:"错题本 · Ivy English"}]}), component:MistakesPage });
const modules=["全部","听力","阅读","写作","口语"] as const;
const statuses:[MistakeStatus,...MistakeStatus[]]=["待复习","已复习","已掌握"];

function retryHref(module:string){
  if(module==="阅读")return "/exam-v3?mode=familiarisation&scope=passage";
  if(module==="听力")return "/listening-exam-v3?mode=familiarisation&scope=section";
  if(module==="写作")return "/writing-exam-v2?mode=familiarisation&scope=task2";
  return "/speaking-workspace?mode=part3";
}

function MistakesPage(){
  const {mistakes,updateMistakeStatus,removeMistake}=useAppState();
  const [module,setModule]=useState<(typeof modules)[number]>("全部");
  const visible=useMemo(()=>module==="全部"?mistakes:mistakes.filter(item=>item.module===module),[mistakes,module]);
  return <div className="space-y-9">
    <PageHeader title="错题本" subtitle="完成 Reading / Listening CBT 后，错题会自动来到这里。"/>
    <div className="flex gap-2 overflow-x-auto pb-1">{modules.map(item=><Chip key={item} active={module===item} onClick={()=>setModule(item)}>{item}</Chip>)}</div>
    <section>
      <SectionTitle title="需要重新看一眼" subtitle={`${visible.length} 条`}/>
      <div className="space-y-3">
        {visible.map(item=><article key={item.id} className="surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><span className="rounded-full bg-sage-soft px-2 py-0.5 text-sage-foreground">{item.module}</span><span>{item.source}</span>{item.questionNumber?<span>Q{item.questionNumber}</span>:null}</div><p className="mt-3 text-sm leading-6">{item.question}</p></div><span className={cn("rounded-full px-2.5 py-1 text-[10px]",item.status==="已掌握"?"bg-sage-soft text-sage-foreground":"bg-secondary text-muted-foreground")}>{item.status}</span></div>
          <div className="mt-4 grid gap-3 rounded-xl bg-secondary/45 p-4 text-xs sm:grid-cols-2"><div><p className="text-muted-foreground">你的答案</p><p className="mt-1">{item.answer}</p></div><div><p className="text-muted-foreground">正确答案</p><p className="mt-1">{item.correctAnswer}</p></div></div>
          <div className="mt-4 flex flex-wrap items-center gap-2">{statuses.map(status=><button key={status} type="button" onClick={()=>updateMistakeStatus(item.id,status)} className={cn("rounded-full border px-3 py-1.5 text-[11px]",item.status===status?"border-transparent bg-primary text-primary-foreground":"border-border text-muted-foreground")}>{status}</button>)}<a href={retryHref(item.module)} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] hover:border-sage"><RotateCcw className="size-3"/>再练一次</a><button type="button" onClick={()=>removeMistake(item.id)} className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"><Trash2 className="size-3.5"/></button></div>
        </article>)}
        {!visible.length?<div className="surface py-14 text-center"><CheckCircle2 className="mx-auto size-7 text-sage"/><p className="mt-4 text-sm">这里现在是空的。</p><p className="mt-1 text-xs text-muted-foreground">做完一套 Reading / Listening 后，没答对的题会自动出现。</p></div>:null}
      </div>
    </section>
    <p className="text-xs text-muted-foreground"><Link to="/library" className="text-sage-foreground hover:underline">返回资料库</Link></p>
  </div>;
}
