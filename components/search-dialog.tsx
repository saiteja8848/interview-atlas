"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { questions, systemDesignTopics } from "@/content/library";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (value: boolean) => void }) {
  const [term, setTerm] = useState("");
  useEffect(() => { const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onOpenChange(!open); } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [open, onOpenChange]);
  const results = [...questions.map(q => ({ title: q.title, subtitle: `${q.difficulty} · ${q.pattern}`, href: `/dsa/questions/${q.slug}` })), ...systemDesignTopics.map(x => ({ title: x.title, subtitle: "System Design", href: "/system-design" }))].filter(x => x.title.toLowerCase().includes(term.toLowerCase()));
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"/><Dialog.Content className="fixed left-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#151518] shadow-2xl"><div className="flex items-center gap-3 border-b border-white/10 px-4"><Search size={18} className="text-zinc-500"/><input autoFocus value={term} onChange={e => setTerm(e.target.value)} placeholder="Search concepts, patterns and questions…" className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"/><Dialog.Close><X size={18} className="text-zinc-500"/></Dialog.Close></div><div className="p-2">{results.map(result => <Link onClick={() => onOpenChange(false)} href={result.href} key={result.title} className="flex rounded-xl px-3 py-3 hover:bg-white/[.06]"><span className="flex-1 text-sm">{result.title}</span><span className="text-xs text-zinc-500">{result.subtitle}</span></Link>)}{!results.length && <p className="p-5 text-center text-sm text-zinc-500">No results yet.</p>}</div><p className="border-t border-white/10 px-4 py-3 text-[11px] text-zinc-500">Press Esc to close · Built for focused reading</p></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
