"use client";
import Link from "next/link";
import { Command, Sparkles } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  return <><header className="sticky top-0 z-40 border-b border-white/[.07] bg-[#09090b]/80 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
    <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-500 text-white"><Sparkles size={15}/></span>Interview Atlas</Link>
    <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex"><Link href="/dsa" className="hover:text-white">DSA</Link><Link href="/system-design" className="hover:text-white">System Design</Link><a href="#roadmap" className="hover:text-white">Roadmap</a></nav>
    <div className="flex items-center gap-2"><ThemeToggle/><button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/[.08]"><Command size={14}/><span className="hidden sm:block">Search the library</span><kbd className="hidden rounded border border-white/10 px-1 text-[10px] md:block">⌘ K</kbd></button></div>
  </div></header><SearchDialog open={searchOpen} onOpenChange={setSearchOpen}/></>;
}
