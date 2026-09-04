import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookMarked, Check, ChevronDown, ChevronUp, FileText, Info, Plus, Search, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Callout, Chip, PageHeader, SectionTitle, StatusPill } from "@/components/ui-kit";
import { useAppState } from "@/state/app-state";
import { cambridgeBooks, myLibrary } from "@/data/mock";
import type { Question } from "@/data/mock";
import { cn } from "@/lib/utils";

type TabKey="recent"|"cambridge"|"official"|"personal";

export const Route=createFileRoute("/bank")({
  validateSearch:(search:Record<string,unknown>):{tab:TabKey;subject:string}=>{
    const tabs:TabKey[]=["recent","cambridge","official","personal"];
    const subjects=["全部","口语","写作","阅读","听力"];
    const t=search["tab"];
    const s=search["subject"];
    return {tab:tabs.includes(t as TabKey)?t as TabKey:"recent",subject:subjects.includes(s as string)?s as string:"全部"};
  },
  head:()=>({meta:[
    {title:"题库 · Ivy English"},
    {name:"description",content:"近期考场回忆题、剑雅 Cambridge 17–20、官方样题以及自己的材料，集中在一个安静的题库里。"},
    {property:"og:title",content:"题库 · Ivy English"},
    {property:"og:description",content:"近期考场回忆、剑雅、官方样题和我的材料，都在这里。"}
  ]}),
  component:BankPage
});

const tabLabels:{key:TabKey;label:string}[]=[
  {key:"recent",label:"近期考场题"},
  {key:"cambridge",label:"剑雅"},
  {key:"official",label:"官方"},
  {key:"personal",label:"我的题库"}
];

function QuestionCard({q,onPractice}:{q:Question;onPractice:()=>void}){
  const practiced=q.practiceCount>0;
  const [noteOpen,setNoteOpen]=useState(false);
  return <div className="surface hover-lift flex h-full flex-col p-5">
    <div className="flex items-start justify-between gap-3">
      <p className="text-sm leading-relaxed">{q.title}</p>
      <StatusPill status={q.status}/>
    </div>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {q.topic.map(t=><span key={t} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>)}
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
      {q.recentDate?<div><p>最近出现</p><p className="mt-0.5 tabular-nums text-foreground">{q.recentDate}</p></div>:null}
      {q.reportCount?<div><p>报告</p><p className="mt-0.5 tabular-nums text-foreground">{q.reportCount} 次</p></div>:null}
    </div>
    {q.note?<div className="mt-5 border-t border-border pt-4">
      <button
        type="button"
        onClick={()=>setNoteOpen((open)=>!open)}
        className="flex w-full items-center gap-2 text-left text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="shrink-0 text-foreground">思路备忘</span>
        {!noteOpen?<span className="min-w-0 flex-1 truncate">{q.note}</span>:<span className="flex-1"/>}
        {noteOpen?<ChevronUp className="size-3.5 shrink-0"/>:<ChevronDown className="size-3.5 shrink-0"/>}
      </button>
      {noteOpen?<p className="mt-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">{q.note}</p>:null}
    </div>:null}
    <div className="mt-6 flex items-center gap-3">
      <Button size="sm" variant="outline" className="rounded-full">开始{q.module==="写作"?"写作":"练习"}</Button>
      <button type="button" onClick={onPractice} className={cn("inline-flex items-center gap-1 text-[11px] transition-colors",practiced?"text-sage-foreground":"text-muted-foreground hover:text-foreground")}>
        <Check className="size-3"/>标记已练习
      </button>
    </div>
  </div>;
}

function BankPage(){
  const {tab,subject}=Route.useSearch();
  const navigate=useNavigate({from:Route.fullPath});
  const {questions,markPracticed}=useAppState();
  const [period,setPeriod]=useState("本季");
  const [sort,setSort]=useState("最近出现");
  const [query,setQuery]=useState("");
  const [addOpen,setAddOpen]=useState(false);
  const [openBook,setOpenBook]=useState<string|null>("c18");

  const recent=useMemo(()=>{
    let list=questions.filter(q=>q.sourceType==="recent");
    if(subject!=="全部")list=list.filter(q=>q.module===subject);
    const normalized=query.trim().toLowerCase();
    if(normalized){
      list=list.filter(q=>[
        q.title,
        q.part??"",
        q.module,
        ...q.topic,
        q.note??""
      ].some(value=>value.toLowerCase().includes(normalized)));
    }
    if(sort==="报告次数")list=[...list].sort((a,b)=>(b.reportCount??0)-(a.reportCount??0));
    else if(sort==="我还没练")list=list.filter(q=>q.practiceCount===0);
    else list=[...list].sort((a,b)=>(b.recentDate??"").localeCompare(a.recentDate??""));
    return list;
  },[questions,subject,sort,query]);

  const speakingByPart=(part:string)=>recent.filter(q=>q.module==="口语"&&q.part===part);
  const writing=recent.filter(q=>q.module==="写作");
  const others=recent.filter(q=>q.module==="阅读"||q.module==="听力");

  return <div className="space-y-9">
    <PageHeader title="题库" subtitle="官方题目、剑雅、近期考场回忆和你自己的材料，都在这里。"/>

    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <div className="flex gap-2 border-b border-border pb-0">
        {tabLabels.map(t=><button
          key={t.key}
          type="button"
          onClick={()=>navigate({search:{tab:t.key,subject}})}
          className={cn("-mb-px shrink-0 border-b-2 px-3 pb-3 text-sm transition-colors",tab===t.key?"border-sage text-foreground":"border-transparent text-muted-foreground hover:text-foreground")}
        >{t.label}</button>)}
      </div>
    </div>

    {tab==="recent"?<div className="space-y-9">
      <Callout><span className="flex gap-2"><Info className="mt-0.5 size-3.5 shrink-0"/>这些题目来自考生考后回忆整理，不代表 IELTS 官方题目，也不用于预测押题。</span></Callout>

      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"/>
          <input
            type="search"
            value={query}
            onChange={(event)=>setQuery(event.target.value)}
            placeholder="搜索题目、话题或标签..."
            className="h-9 w-full rounded-full border border-border bg-card pl-9 pr-4 text-xs outline-none transition-colors placeholder:text-muted-foreground focus:border-sage"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1"><span className="shrink-0 text-[11px] text-muted-foreground">科目</span>{["全部","口语","写作","阅读","听力"].map(s=><Chip key={s} active={subject===s} onClick={()=>navigate({search:{tab:"recent",subject:s}})}>{s}</Chip>)}</div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1"><span className="shrink-0 text-[11px] text-muted-foreground">时间</span>{["本月","近 3 个月","本季"].map(p=><Chip key={p} active={period===p} onClick={()=>setPeriod(p)}>{p}</Chip>)}</div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1"><span className="shrink-0 text-[11px] text-muted-foreground">排序</span>{["最近出现","报告次数","我还没练"].map(s=><Chip key={s} active={sort===s} onClick={()=>setSort(s)}>{s}</Chip>)}</div>
      </div>

      {(subject==="全部"||subject==="口语")?<section className="space-y-8">
        <SectionTitle title="Speaking · Sep–Dec 2026" subtitle={`时间范围：${period}`}/>
        {["Part 1","Part 2","Part 3"].map(part=>{
          const list=speakingByPart(part);
          if(!list.length)return null;
          return <div key={part}>
            <p className="mb-3 text-xs tracking-wide text-muted-foreground">{part}</p>
            <div className="grid gap-3 md:grid-cols-2">{list.map(q=><QuestionCard key={q.id} q={q} onPractice={()=>markPracticed(q.id)}/>)}</div>
          </div>;
        })}
        <div className="surface p-6">
          <div className="flex items-baseline justify-between"><p className="text-sm">本季 Part 2 覆盖</p><p className="text-sm tabular-nums text-muted-foreground">31 / 100 · 31%</p></div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[31%] rounded-full bg-sage"/></div>
          <p className="mt-3 text-[11px] text-muted-foreground">重点是练习迁移表达，不需要背完所有题。</p>
        </div>
      </section>:null}

      {(subject==="全部"||subject==="写作")&&writing.length>0?<section>
        <SectionTitle title="Writing · 近期考题"/>
        <div className="grid gap-3 md:grid-cols-2">{writing.map(q=><QuestionCard key={q.id} q={q} onPractice={()=>markPracticed(q.id)}/>)}</div>
      </section>:null}

      {(subject==="全部"||subject==="阅读"||subject==="听力")&&others.length>0?<section>
        <SectionTitle title="Reading & Listening · 近期题型"/>
        <div className="grid gap-3 md:grid-cols-2">{others.map(q=><QuestionCard key={q.id} q={q} onPractice={()=>markPracticed(q.id)}/>)}</div>
      </section>:null}

      {recent.length===0?<p className="py-10 text-center text-sm text-muted-foreground">这个筛选下暂时没有题目。</p>:null}
    </div>:null}

    {tab==="cambridge"?<div className="space-y-3">{cambridgeBooks.map(b=><div key={b.id} className="surface overflow-hidden"><button type="button" onClick={()=>setOpenBook(openBook===b.id?null:b.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left"><div className="flex items-center gap-3"><BookMarked className="size-4 text-sage" strokeWidth={1.6}/><div><p className="text-sm">{b.name}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{b.year} · 已完成 {b.done} / 4 Test</p></div></div><span className="text-xs text-muted-foreground">{openBook===b.id?"收起":"展开"}</span></button>{openBook===b.id?<div className="border-t border-border bg-secondary/40 px-5 py-4"><div className="grid gap-2 sm:grid-cols-2">{b.tests.map(t=><div key={t} className="rounded-lg border border-border bg-card px-4 py-3"><p className="text-sm">{t}</p><div className="mt-2 flex flex-wrap gap-1.5">{b.modules.map(m=><span key={m} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{m}</span>)}</div></div>)}</div></div>:null}</div>)}</div>:null}

    {tab==="official"?<div className="grid gap-3 md:grid-cols-2">{questions.filter(q=>q.sourceType==="official").map(q=><div key={q.id} className="surface hover-lift p-5"><div className="flex items-start justify-between"><FileText className="size-5 text-sage" strokeWidth={1.6}/><span className="inline-flex items-center gap-1 rounded-full bg-sage-soft px-2 py-0.5 text-[10px] text-sage-foreground"><ShieldCheck className="size-3"/>官方</span></div><p className="mt-6 text-sm">{q.title}</p><p className="mt-1 text-[11px] text-muted-foreground">{q.module}</p></div>)}</div>:null}

    {tab==="personal"?<div className="space-y-6"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{myLibrary.map(m=><div key={m.id} className="surface hover-lift p-5"><p className="text-sm">{m.title}</p><p className="mt-1 text-[11px] text-muted-foreground">{m.hint}</p><p className="display mt-5 text-xl tabular-nums">{m.count}</p></div>)}</div><Button variant="outline" className="rounded-full" onClick={()=>setAddOpen(true)}><Plus className="mr-1 size-3.5"/>添加材料</Button></div>:null}

    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader><DialogTitle className="display text-xl">添加材料</DialogTitle><DialogDescription className="text-xs">选择添加方式</DialogDescription></DialogHeader>
        <div className="space-y-2">{[{label:"上传 PDF",icon:Upload},{label:"添加链接",icon:FileText},{label:"手动添加题目",icon:Plus}].map(o=><button key={o.label} type="button" onClick={()=>setAddOpen(false)} className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:border-sage"><o.icon className="size-4 text-sage" strokeWidth={1.6}/>{o.label}</button>)}</div>
      </DialogContent>
    </Dialog>
  </div>;
}
