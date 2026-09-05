import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function JournalPaper({children,className,tone="paper",tilt=0}:{children:ReactNode;className?:string;tone?:"paper"|"mint"|"yellow"|"peach"|"lavender"|"aqua"|"green";tilt?:-1|0|1}){
  const tones={paper:"bg-[var(--journal-paper)]",mint:"bg-[var(--journal-mint)]",yellow:"bg-[var(--journal-yellow)]",peach:"bg-[var(--journal-peach)]",lavender:"bg-[var(--journal-lavender)]",aqua:"bg-[var(--journal-aqua)]",green:"bg-[var(--journal-green)]"};
  const rotations={[-1]:"md:-rotate-[0.45deg]",0:"",1:"md:rotate-[0.45deg]"};
  return <div className={cn("journal-paper relative border border-[color:var(--journal-line)]",tones[tone],rotations[tilt],className)}>{children}</div>;
}

export function GridPaper({children,className}:{children:ReactNode;className?:string}){
  return <div className={cn("journal-grid relative",className)}>{children}</div>;
}

export function ReceiptCard({children,className}:{children:ReactNode;className?:string}){
  return <div className={cn("journal-receipt relative bg-[var(--journal-paper)]",className)}>{children}</div>;
}

export function TapeLabel({children,className,tone="peach"}:{children:ReactNode;className?:string;tone?:"peach"|"pink"|"aqua"|"yellow"}){
  const tones={peach:"bg-[var(--journal-peach)]",pink:"bg-[color:color-mix(in_srgb,var(--journal-pink)_26%,white)]",aqua:"bg-[var(--journal-aqua)]",yellow:"bg-[var(--journal-yellow)]"};
  return <span className={cn("inline-flex -rotate-1 items-center px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[var(--journal-ink)]",tones[tone],className)}>{children}</span>;
}

export function MarkerNote({children,className}:{children:ReactNode;className?:string}){
  return <span className={cn("font-handwritten text-[1.35rem] leading-none text-[var(--journal-pink)]",className)}>{children}</span>;
}

export function Stamp({children,className,tone="turquoise"}:{children:ReactNode;className?:string;tone?:"turquoise"|"blue"|"green"}){
  const tones={turquoise:"border-[var(--journal-turquoise)] text-[var(--journal-turquoise)]",blue:"border-[var(--journal-blue)] text-[var(--journal-blue)]",green:"border-[#58A83C] text-[#58A83C]"};
  return <span className={cn("inline-flex rotate-[-2deg] items-center border-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",tones[tone],className)}>{children}</span>;
}

export function JournalHeading({eyebrow,title,note,action}:{eyebrow?:string;title:string;note?:ReactNode;action?:ReactNode}){
  return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div>{eyebrow?<p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--journal-turquoise)]">{eyebrow}</p>:null}<h2 className="display text-xl text-[var(--journal-ink)] sm:text-2xl">{title}</h2>{note?<div className="mt-1">{note}</div>:null}</div>{action}</div>;
}
