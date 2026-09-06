import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText, Check, Headphones, Mic, PenLine } from "lucide-react";
import { GridPaper, JournalHeading, JournalPaper, MarkerNote, ReceiptCard, Stamp, StickyNote, TapeLabel } from "@/components/journal-ui";
import { learningStages, useAppState } from "@/state/app-state";
import { keyFromLabel } from "@/lib/learning-navigation";
import type { Module } from "@/data/mock";

export const Route=createFileRoute("/")({head:()=>({meta:[{title:"Ivy English · 个人英语与 IELTS 学习空间"},{name:"description",content:"Ivy 的个人英语学习空间。"}]}),component:HomePage});

const quickStart=[
  {title:"听力",hint:"真实英语 · 听写 · Shadowing",icon:Headphones,module:"listening" as const,theme:"subject-listening",label:"LISTEN"},
  {title:"口语",hint:"自由表达 · IELTS Speaking",icon:Mic,module:"speaking" as const,theme:"subject-speaking",label:"SPEAK"},
  {title:"阅读",hint:"文章阅读 · IELTS CBT",icon:BookOpenText,module:"reading" as const,theme:"subject-reading",label:"READ"},
  {title:"写作",hint:"自由写作 · IELTS Writing",icon:PenLine,module:"writing" as const,theme:"subject-writing",label:"WRITE"},
];

const themeByModule:Record<string,{className:string;subject:"listening"|"speaking"|"reading"|"writing"}>={
  听力:{className:"subject-listening",subject:"listening"},
  口语:{className:"subject-speaking",subject:"speaking"},
  阅读:{className:"subject-reading",subject:"reading"},
  写作:{className:"subject-writing",subject:"writing"},
};

function formatMinutes(total:number){const h=Math.floor(total/60);const m=total%60;return h?`${h}小时${m?`${m}分钟`:""}`:`${m}分钟`}

function HomePage(){
  const {plan,isShortPlan,setShortPlan,signals,questions,learningStage,sessions,mistakes,vocabulary}=useAppState();
  const totalMinutes=plan.reduce((a,b)=>a+b.minutes,0);
  const currentStage=learningStages.find(s=>s.key===learningStage)??learningStages[0]!;
  const recentQuestions=(["听力","口语","阅读","写作"] as const).flatMap(module=>{const latest=questions.filter(q=>q.sourceType==="recent"&&q.module===module).sort((a,b)=>(b.recentDate??"").localeCompare(a.recentDate??""))[0];return latest?[latest]:[]});
  const latestSession=sessions[0];
  const cutoff=Date.now()-7*86400000;
  const week=sessions.filter(s=>new Date(`${s.date}T00:00:00`).getTime()>=cutoff);
  const weekMinutes=week.reduce((sum,s)=>sum+s.durationMinutes,0);
  const moduleOrder:Module[]=["听力","口语","阅读","写作"];
  const weekBreakdown=moduleOrder.map(module=>({label:module,minutes:week.filter(s=>s.module===module).reduce((sum,s)=>sum+s.durationMinutes,0)}));
  const maxMinutes=Math.max(1,...weekBreakdown.map(item=>item.minutes));
  const now=new Date();
  const dateLabel=`${now.getMonth()+1}月${now.getDate()}日`;

  return <div className="journal-canvas -mx-5 -mt-8 min-h-screen px-5 pb-8 pt-8 sm:-mx-8 sm:px-8 md:-mt-10 md:pt-10">
    <div className="mx-auto max-w-5xl space-y-9 sm:space-y-11">
      <GridPaper className="overflow-hidden border border-[color:var(--journal-line)] px-5 py-6 shadow-[5px_6px_0_rgba(63,99,242,.08)] sm:px-8 sm:py-8">
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <TapeLabel tone="peach">{dateLabel} · {currentStage.label}</TapeLabel>
            <h1 className="display mt-5 text-4xl leading-none text-[var(--journal-ink)] sm:text-5xl">Ivy English</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#38436F]">一本会随着练习慢慢长大的个人英语学习手帐。</p>
          </div>
          <div className="hidden rotate-2 sm:block"><MarkerNote>small steps, bright days !</MarkerNote></div>
        </div>
        <div className="relative z-10 mt-6 text-xs text-[#38436F]">今天也只做真正有用的练习。</div>
      </GridPaper>

      <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <ReceiptCard className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4 border-b border-dashed border-[color:var(--journal-line)] pb-4">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--journal-turquoise)]">Today&apos;s plan</p><h2 className="display mt-1 text-2xl text-[var(--journal-ink)]">今天</h2></div>
            <Stamp tone="turquoise">{totalMinutes} MIN</Stamp>
          </div>
          <div className="divide-y divide-dashed divide-[color:var(--journal-line)]">{plan.map((item,index)=><div key={item.module} className="flex items-center gap-3 py-4"><span className="font-handwritten text-xl text-[var(--journal-pink)]">{String(index+1).padStart(2,"0")}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-[var(--journal-ink)]">{item.module}</p><p className="mt-0.5 text-xs leading-5 text-[#52608C]">{item.hint}</p></div><span className="shrink-0 text-xs font-semibold tabular-nums text-[var(--journal-turquoise)]">{item.minutes} min</span></div>)}</div>
          <div className="mt-5 flex flex-wrap items-center gap-4 pb-2"><Link to="/practice" search={{module:"listening"}} className="journal-button inline-flex h-11 items-center px-5 text-xs font-semibold">开始今天的学习 <ArrowRight className="ml-2 size-3.5"/></Link><button type="button" onClick={()=>setShortPlan(!isShortPlan)} className="text-xs font-medium text-[var(--journal-turquoise)] underline decoration-[var(--journal-turquoise-green)] underline-offset-4">{isShortPlan?"恢复完整计划":"我今天只有 20 分钟"}</button></div>
        </ReceiptCard>

        <JournalPaper tone="yellow" tilt={1} className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--journal-turquoise)]">Continue</p><h2 className="display mt-1 text-xl text-[var(--journal-ink)]">继续上次</h2></div><MarkerNote className="rotate-[-4deg]">pick it up here !</MarkerNote></div>
          {latestSession?<div className="mt-6"><p className="text-base font-medium leading-6 text-[var(--journal-ink)]">{latestSession.activity}</p><p className="mt-1 text-xs text-[#53618B]">{latestSession.date}{latestSession.tool?` · ${latestSession.tool}`:""}</p><div className="mt-5 flex flex-wrap gap-2"><span className="bg-white/70 px-3 py-1.5 text-xs text-[var(--journal-ink)]">{latestSession.durationMinutes} min</span>{latestSession.score?<span className="bg-white/75 px-3 py-1.5 text-xs font-semibold text-[var(--journal-ink)]">{latestSession.score}</span>:null}</div><Link to="/session" search={{id:latestSession.id,from:"home",module:keyFromLabel(latestSession.module)}} className="mt-6 inline-flex items-center text-xs font-semibold text-[var(--journal-turquoise)] underline decoration-[var(--journal-turquoise-green)] underline-offset-4">查看这次学习 <ArrowRight className="ml-1 size-3"/></Link></div>:<div className="mt-6"><p className="text-sm leading-6 text-[#53618B]">这里还没有留下学习痕迹。</p><Link to="/practice" search={{module:"listening"}} className="mt-5 inline-flex items-center text-xs font-semibold text-[var(--journal-turquoise)] underline underline-offset-4">开始第一次练习 <ArrowRight className="ml-1 size-3"/></Link></div>}
        </JournalPaper>
      </div>

      <section>
        <JournalHeading eyebrow="Quick start" title="今天想练什么？" note={<MarkerNote className="text-[1.1rem]">choose one and go !</MarkerNote>}/>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">{quickStart.map((card,index)=><JournalPaper key={card.title} tone="paper" tilt={index%2===0?-1:1} className={`${card.theme} subject-surface min-h-40 overflow-hidden p-5 sm:min-h-44 sm:p-6`}><Link to="/practice" search={{module:card.module}} className="relative z-10 flex h-full min-h-28 flex-col justify-between"><div className="flex items-start justify-between gap-3"><card.icon className="subject-text size-6" strokeWidth={1.9}/><span className="subject-text text-[9px] font-semibold tracking-[0.18em]">{card.label}</span></div><div className="mt-7"><p className="display text-xl text-[var(--journal-ink)]">{card.title}</p><p className="mt-1 text-[11px] leading-5 text-[#4E5980]">{card.hint}</p><span className="subject-text mt-3 inline-flex items-center text-[10px] font-semibold">进入{card.title} <ArrowRight className="ml-1 size-3"/></span></div></Link></JournalPaper>)}</div>
      </section>

      <section>
        <JournalHeading eyebrow="This week" title="这一周留下了什么" action={<Link to="/progress" className="journal-link inline-flex items-center text-xs">查看进度 <ArrowRight className="ml-1 size-3"/></Link>}/>
        <JournalPaper tone="paper" className="p-5 sm:p-7">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><div><p className="text-[10px] uppercase tracking-[0.12em] text-[#63709A]">学习时间</p><p className="display mt-1 text-2xl text-[var(--journal-ink)]">{formatMinutes(weekMinutes)}</p></div><div><p className="text-[10px] uppercase tracking-[0.12em] text-[#63709A]">练习次数</p><p className="display mt-1 text-2xl text-[var(--journal-ink)]">{week.length}</p></div><div><p className="text-[10px] uppercase tracking-[0.12em] text-[#63709A]">待复习错题</p><p className="display mt-1 text-2xl text-[var(--journal-ink)]">{mistakes.filter(m=>m.status!=="已掌握").length}</p></div><div><p className="text-[10px] uppercase tracking-[0.12em] text-[#63709A]">生词</p><p className="display mt-1 text-2xl text-[var(--journal-ink)]">{vocabulary.length}</p></div></div>
          <div className="mt-7 space-y-3">{weekBreakdown.map(item=>{const theme=themeByModule[item.label]?.className??"";return <div key={item.label} className={`${theme} grid grid-cols-[42px_1fr_42px] items-center gap-3 text-xs`}><span className="font-medium text-[var(--journal-ink)]">{item.label}</span><div className="h-2 overflow-hidden bg-[#EEF4FF]"><div className="h-full bg-[var(--subject-color)]" style={{width:`${Math.max(item.minutes?8:0,item.minutes/maxMinutes*100)}%`}}/></div><span className="subject-text text-right tabular-nums">{item.minutes}m</span></div>})}</div>
        </JournalPaper>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <JournalHeading eyebrow="Notice" title="最近需要注意" note={<span className="text-xs text-[#63709A]">真正反复出现的问题才值得留在这里。</span>} action={<Link to="/progress" className="journal-link text-xs">全部</Link>}/>
          <JournalPaper tone="yellow" tilt={-1} className="overflow-hidden">{signals.length?<div className="divide-y divide-[rgba(63,99,242,.17)]">{signals.slice(0,3).map(signal=><Link key={signal.id} to="/progress-detail" search={{module:keyFromLabel(signal.module)}} className="flex items-center gap-3 px-5 py-4 hover:bg-white/35"><span className="flex size-6 shrink-0 items-center justify-center border border-[var(--journal-ink)] text-[10px] text-[var(--journal-ink)]">!</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-[var(--journal-ink)]">{signal.title}</p><p className="mt-0.5 text-[11px] text-[#63709A]">{signal.module} · 已出现 {signal.occurrenceCount} 次</p></div></Link>)}</div>:<div className="p-6"><Check className="size-5 text-[var(--journal-turquoise)]"/><p className="mt-3 text-sm text-[var(--journal-ink)]">暂时没有反复出现的学习问题。</p><p className="mt-1 text-xs leading-5 text-[#63709A]">继续练习后，这里只会留下真实数据形成的提醒。</p></div>}</JournalPaper>
        </section>

        <section className="hidden sm:block">
          <JournalHeading eyebrow="Question bank" title="最近考场题" note={<span className="text-xs text-[#63709A]">考生回忆整理 · 非官方真题</span>} action={<Link to="/bank" search={{tab:"recent",subject:"全部"}} className="journal-link inline-flex items-center text-xs">进入题库 <ArrowRight className="ml-1 size-3"/></Link>}/>
          <GridPaper className="border border-[color:var(--journal-line)] p-5"><div className="grid grid-cols-2 gap-x-5 gap-y-7">{recentQuestions.map((question,index)=>{const theme=themeByModule[question.module]??themeByModule.听力;return <StickyNote key={question.id} subject={theme.subject} tilt={index%2===0?-1:1} className="p-5 pt-6"><Link to="/question" search={{id:question.id}} className="relative z-10 block"><div className="flex items-center justify-between gap-2"><span className="subject-text text-[10px] font-semibold tracking-[0.14em]">{question.module}{question.part?` · ${question.part}`:""}</span><span className="text-[10px] tabular-nums text-[#63709A]">{question.recentDate??"近期"}</span></div><p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--journal-ink)]">{question.title}</p><span className="subject-text mt-4 inline-flex items-center text-[10px] font-semibold">打开题目 <ArrowRight className="ml-1 size-3"/></span></Link></StickyNote>})}</div></GridPaper>
        </section>
      </div>
    </div>
  </div>;
}
