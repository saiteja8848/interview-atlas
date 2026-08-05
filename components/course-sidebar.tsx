"use client";
import Link from "next/link";
import { BookOpen, ChevronDown, Code2, Layers3 } from "lucide-react";
import { dsaCurriculum, slugify } from "@/content/library";
import { useState } from "react";

export function CourseSidebar({ activeCourse = "dsa" }: { activeCourse?: "dsa" | "system-design" }) {
  const [expanded, setExpanded] = useState(true);
  return <aside className="hidden w-64 shrink-0 border-r border-white/[.07] bg-[#0c0c0f] lg:block">
    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-3 py-7">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-600">Courses</p>
      <div className="mt-3 space-y-1">
        <Link href="/dsa" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${activeCourse === "dsa" ? "bg-indigo-500/12 text-indigo-100" : "text-zinc-400 hover:bg-white/[.045] hover:text-white"}`}><Code2 size={16}/>Data Structures & Algorithms</Link>
        <Link href="/system-design" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${activeCourse === "system-design" ? "bg-cyan-400/10 text-cyan-100" : "text-zinc-400 hover:bg-white/[.045] hover:text-white"}`}><Layers3 size={16}/>System Design</Link>
      </div>
      {activeCourse === "dsa" && <div className="mt-8"><button onClick={() => setExpanded(!expanded)} className="flex w-full items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-600"><span>DSA topics</span><ChevronDown size={14} className={`transition ${expanded ? "" : "-rotate-90"}`}/></button>{expanded && <nav className="mt-3 space-y-0.5">{dsaCurriculum.map(section => <div key={section.title} className="py-1"><Link href={`/dsa/${slugify(section.title)}?tab=concepts`} className="block px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-300">{section.title}</Link><div className="flex gap-3 pl-6 text-[11px]"><Link href={`/dsa/${slugify(section.title)}?tab=concepts`} className="text-zinc-600 hover:text-indigo-200">Concepts</Link><Link href={`/dsa/${slugify(section.title)}?tab=problems`} className="text-zinc-600 hover:text-indigo-200">Problems</Link></div></div>)}</nav>}</div>}
      {activeCourse === "system-design" && <div className="mt-8"><p className="px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-600">Curriculum</p><div className="mt-3 space-y-1">{["Qualities", "Estimation", "Architecture", "Case Studies"].map(x => <p key={x} className="px-3 py-1.5 text-sm text-zinc-500">{x}</p>)}</div></div>}
      <div className="mt-10 border-t border-white/[.07] px-3 pt-5 text-xs leading-5 text-zinc-600"><BookOpen size={14} className="mb-2"/>Read first. Practice later.</div>
    </div>
  </aside>;
}
