import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AudioLines,BookMarked,BookOpenText,ClipboardList,FileText,FolderOpen,Headphones,History,Image,Layers,Link2,ListMusic,Mic,NotebookPen,Pause,PenLine,Play,Repeat,RotateCcw,Timer,Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, PageHeader, SectionTitle } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

type ModuleKey="listening"|"speaking"|"reading"|"writing";

export const Route=createFileRoute("/practice")({
  validateSearch:(search:Record<string,unknown>):{module:ModuleKey}=>{
    const m=search["module"];
    const valid:ModuleKey[]=["listening","speaking","reading","writing"];
    return {module:valid.includes(m as ModuleKey)?m as ModuleKey:"listening"};
  },
  head:()=>({meta:[
    {title:"学习 · Ivy English"},
    {name:"description",content:"听力、口语、阅读、写作四项练习入口：日常真实英语输入与 IELTS 专项练习。"},
    {property:"og:title",content:"学习 · Ivy English"},
    {property:"og:description",content:"今天想练什么？日常英语与 IELTS 练习入口。"}
  ]}),
  component:PracticePage
});

const tabs:{key:ModuleKey;label:string;icon:LucideIcon}[]=[
  {key:"listening",label:"听力",icon:Headphones},
  {key:"speaking",label:"口语",icon:Mic},
  {key:"reading",label:"阅读",icon:BookOpenText},
  {key:"writing",label:"写作",icon:PenLine}
];

interface Item{title:string;hint?:string;icon:LucideIcon;badge?:string;to?:{tab:"recent";subject:string}}

function ItemCard({item}:{item:Item}){
  const inner=<>
    <div className="flex items-start justify-between">
      <item.icon className="size-5 text-sage" strokeWidth={1.6}/>
      {item.badge?<span className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] text-sage-foreground">{item.badge}</span>:null}
    </div>
    <div className="mt-6">
      <p className="text-sm">{item.title}</p>
      {item.hint?<p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{item.hint}</p>:null}
    </div>
  </>;
  const cls="surface hover-lift flex flex-col p-5 text-left";
  return item.to?<Link to="/bank" search={item.to} className={cls}>{inner}</Link>:<button type="button" className={cls}>{inner}</button>;
}

function Group({title,items}:{title:string;items:Item[]}){
  return <section>
    <SectionTitle title={title}/>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{items.map(i=><ItemCard key={i.title} item={i}/>)}</div>
  </section>;
}

function formatFocus(seconds:number){
  const minutes=Math.floor(seconds/60).toString().padStart(2,"0");
  const rest=(seconds%60).toString().padStart(2,"0");
  return `${minutes}:${rest}`;
}

function PracticePage(){
  const {module}=Route.useSearch();
  const navigate=useNavigate({from:Route.fullPath});
  const [focusSeconds,setFocusSeconds]=useState(20*60);
  const [focusRunning,setFocusRunning]=useState(false);

  useEffect(()=>{
    if(!focusRunning||focusSeconds<=0)return;
    const timer=window.setInterval(()=>setFocusSeconds((seconds)=>{
      if(seconds<=1){setFocusRunning(false);return 0;}
      return seconds-1;
    }),1000);
    return ()=>window.clearInterval(timer);
  },[focusRunning,focusSeconds]);

  const resetFocus=()=>{setFocusRunning(false);setFocusSeconds(20*60);};

  return <div className="space-y-10">
    <PageHeader title="学习" subtitle="今天想练什么？"/>

    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <div className="grid min-w-[520px] grid-cols-4 gap-3 sm:min-w-0 sm:gap-4">
        {tabs.map(t=><button
          key={t.key}
          type="button"
          onClick={()=>navigate({search:{module:t.key}})}
          className={cn(
            "flex flex-col items-start gap-6 rounded-xl border p-5 transition-all duration-200",
            module===t.key?"border-transparent bg-primary text-primary-foreground shadow-soft":"border-border bg-card text-foreground hover:border-sage"
          )}
        >
          <t.icon className="size-5" strokeWidth={1.6}/>
          <span className="text-sm">{t.label}</span>
        </button>)}
      </div>
    </div>

    <section className="surface flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-sage-soft text-sage-foreground">
          <Timer className="size-4" strokeWidth={1.6}/>
        </div>
        <div>
          <p className="text-sm">沉浸专注</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">给这一段练习留 20 分钟，不切到别的事情。</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="display min-w-20 text-right text-2xl tabular-nums">{formatFocus(focusSeconds)}</span>
        <Button
          type="button"
          size="sm"
          className="rounded-full"
          onClick={()=>setFocusRunning((running)=>!running)}
          disabled={focusSeconds===0}
        >
          {focusRunning?<><Pause className="mr-1 size-3.5"/>暂停</>:<><Play className="mr-1 size-3.5"/>开始</>}
        </Button>
        <button type="button" onClick={resetFocus} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="重置专注计时器">
          <RotateCcw className="size-4"/>
        </button>
      </div>
    </section>

    {module==="listening"?<div className="space-y-10">
      <Group title="日常英语" items={[
        {title:"真实视频听力",hint:"YouTube / B站 / 访谈",icon:Video},
        {title:"盲听与听写",hint:"逐句播放 · 自己输入 · 对照",icon:AudioLines},
        {title:"Shadowing",hint:"跟读 · 重复 · 录音",icon:Repeat},
        {title:"分级听力",hint:"ELLLO 等",icon:ListMusic}
      ]}/>
      <Group title="IELTS Listening" items={[
        {title:"Section 练习",hint:"Section 1–4",icon:Layers},
        {title:"完整模拟",hint:"40 题 · 计时",icon:Timer},
        {title:"历史记录",hint:"过去的成绩与复盘",icon:History}
      ]}/>
      <Callout>现在以真实英语输入为主，IELTS 练习保持低频接触。</Callout>
    </div>:null}

    {module==="speaking"?<div className="space-y-10">
      <Group title="日常口语" items={[
        {title:"自由表达",hint:"想说什么就说",icon:Mic},
        {title:"一分钟话题",hint:"计时 60 秒",icon:Timer},
        {title:"复述练习",hint:"听完再讲一遍",icon:Repeat},
        {title:"图片描述",hint:"看图说话",icon:Image},
        {title:"今日话题",hint:"每天一个",icon:NotebookPen}
      ]}/>
      <Group title="IELTS Speaking" items={[
        {title:"Part 1",hint:"日常问答",icon:Mic},
        {title:"Part 2",hint:"话题卡 · 2 分钟",icon:ClipboardList},
        {title:"Part 3",hint:"深入讨论",icon:Layers},
        {title:"完整模拟",hint:"Part 1–3 连续",icon:Timer},
        {title:"当季口语题库",hint:"Sep–Dec 2026 · 考生回忆整理",icon:BookMarked,badge:"近期",to:{tab:"recent",subject:"口语"}}
      ]}/>
    </div>:null}

    {module==="reading"?<div className="space-y-10">
      <Group title="日常阅读" items={[
        {title:"文章阅读",hint:"新闻 · 长文",icon:BookOpenText},
        {title:"学术文章",hint:"偏 IELTS 语域",icon:FileText},
        {title:"保存的网页",hint:"稍后读",icon:Link2},
        {title:"我的材料",hint:"PDF · 老师的材料",icon:FolderOpen}
      ]}/>
      <Group title="IELTS Reading" items={[
        {title:"Cambridge / 官方",hint:"Cambridge 17–20",icon:BookMarked},
        {title:"近期题型",hint:"考生回忆整理",icon:ClipboardList,to:{tab:"recent",subject:"阅读"}},
        {title:"我的题库",hint:"收藏 · 错题",icon:FolderOpen},
        {title:"完整 CBT",hint:"60 分钟 · 3 篇",icon:Timer}
      ]}/>
      <section>
        <SectionTitle title="最近一次"/>
        <div className="surface flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-sm">Cambridge 18</p>
            <p className="mt-1 text-xs text-muted-foreground">Test 2 · Passage 3</p>
            <p className="mt-3 text-sm tabular-nums">31 / 40</p>
          </div>
          <Button variant="outline" className="rounded-full">查看复盘</Button>
        </div>
      </section>
    </div>:null}

    {module==="writing"?<div className="space-y-10">
      <Group title="日常写作" items={[
        {title:"自由写作",hint:"不限题目",icon:PenLine},
        {title:"日记",hint:"每天几句话",icon:NotebookPen},
        {title:"观点表达",hint:"一段话讲清立场",icon:FileText}
      ]}/>
      <Group title="IELTS Writing" items={[
        {title:"Task 1",hint:"图表描述",icon:FileText},
        {title:"Task 2",hint:"议论文",icon:PenLine},
        {title:"近期考题",hint:"考生回忆整理",icon:ClipboardList,to:{tab:"recent",subject:"写作"}},
        {title:"历史作文",hint:"过去写过的",icon:History}
      ]}/>
      <section>
        <SectionTitle title="最近一篇"/>
        <div className="surface flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-sm">Task 2 · Education</p>
            <p className="mt-1 text-xs text-muted-foreground">328 words · 已完成</p>
          </div>
          <Button variant="outline" className="rounded-full">查看作文</Button>
        </div>
      </section>
    </div>:null}
  </div>;
}
