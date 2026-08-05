"use client";

import { Link } from "@/components/link";
import { ChevronDown, ExternalLink, FolderOpen } from "lucide-react";
import { useState } from "react";
import { dsaCurriculum } from "@/content/library";

const difficultyColor = { Easy: "text-emerald-300 bg-emerald-400/10", Medium: "text-amber-300 bg-amber-400/10", Hard: "text-rose-300 bg-rose-400/10" };

export function TopicQuestionList() {
  const [open, setOpen] = useState<string | null>(null);
  return <div className="mt-5 space-y-3">{dsaCurriculum.map(topic => <section key={topic.title} className="overflow-hidden rounded-xl border border-white/[.08] bg-white/[.018]"><div className="flex items-center gap-3 px-4 py-3.5"><FolderOpen size={16} className="text-zinc-600"/><span className="flex-1 text-sm font-medium text-zinc-300">{topic.title}</span><span className="text-xs text-zinc-600">{topic.questions.length} questions</span></div>{topic.questions.map(question => <div key={question.title} className="border-t border-white/[.07]"><button onClick={() => setOpen(open === question.title ? null : question.title)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/[.035]"><ChevronDown size={16} className={`text-zinc-600 transition ${open === question.title ? "rotate-180" : ""}`}/><span className="flex-1 text-sm text-zinc-200">{question.title}</span><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span><span className="hidden text-xs text-zinc-600 sm:block">{question.tags.join(" · ")}</span></button>{open === question.title && <div className="border-t border-white/[.07] bg-black/10 px-10 py-4"><p className="max-w-2xl text-sm leading-6 text-zinc-400">{question.description}</p><div className="mt-3 flex flex-wrap gap-2">{question.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-zinc-500">{tag}</span>)}</div>{question.slug && <Link href={`/dsa/questions/${question.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200 hover:text-white">Open explanation <ExternalLink size={13}/></Link>}</div>}</div>)}</section>)}</div>;
}
