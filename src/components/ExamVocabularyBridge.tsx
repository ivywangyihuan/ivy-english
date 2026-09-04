import { useEffect, useState } from "react";
import { BookPlus, X } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { useAppState } from "@/state/app-state";

export function ExamVocabularyBridge(){
  const pathname=useRouterState({select:s=>s.location.pathname});
  const {addVocabulary}=useAppState();
  const [selection,setSelection]=useState("");
  const enabled=pathname==="/exam-v3"&&typeof window!=="undefined"&&new URLSearchParams(window.location.search).get("mode")!=="exam";
  useEffect(()=>{if(!enabled){setSelection("");return}function capture(){const value=window.getSelection()?.toString().trim()??"";setSelection(value.length>1&&value.length<80?value:"")}document.addEventListener("mouseup",capture);return()=>document.removeEventListener("mouseup",capture)},[enabled]);
  if(!enabled||!selection)return null;
  function save(){addVocabulary({word:selection,module:"阅读",source:"IELTS Reading Familiarisation",context:"机考阅读中划词收藏"});setSelection("");window.getSelection()?.removeAllRanges()}
  return <div className="fixed bottom-20 right-5 z-[120] flex max-w-xs items-center gap-2 rounded-full border border-[#aeb8b0] bg-white px-3 py-2 text-xs text-[#344a3b] shadow-xl"><button type="button" onClick={save} className="inline-flex min-w-0 items-center gap-2"><BookPlus className="size-4 shrink-0"/><span className="max-w-40 truncate">存为生词：{selection}</span></button><button type="button" onClick={()=>setSelection("")} className="flex size-5 items-center justify-center"><X className="size-3"/></button></div>
}
