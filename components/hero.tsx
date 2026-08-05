import { Link } from "@/components/link";
import { ArrowRight, BookOpen, Code2, Layers3, Sparkles } from "lucide-react";
import { useState } from "react";

const signals = [
  { label: "Patterns", value: "Learn the reusable idea", color: "bg-violet-400" },
  { label: "Practice", value: "Apply it to real questions", color: "bg-cyan-400" },
  { label: "Explain", value: "Understand every Java line", color: "bg-emerald-400" },
];

export function Hero() {
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <section className="hero-aurora relative isolate overflow-hidden">
      <div className="grid-glow absolute inset-0 -z-10 opacity-70" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.04fr_.96fr] lg:pb-28 lg:pt-24">
        <div className="hero-enter">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[.11] bg-white/[.045] px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-xl shadow-black/10">
            <span className="live-dot" />
            A calmer way to prepare
          </div>
          <h1 className="display-heading mt-7 max-w-3xl text-5xl font-semibold text-white md:text-6xl lg:text-7xl">
            Learn the thinking<br />
            <span className="hero-gradient bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">behind great solutions.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
            AlgoCraft turns interview preparation into a clear path: understand the concept, recognize the pattern, then trace a clean Java solution.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => setCoursesOpen((value) => !value)} className="theme-button inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110">
              Explore courses <ArrowRight size={16} className={`transition ${coursesOpen ? "rotate-90" : ""}`} />
            </button>
            <Link href="/dsa" className="inline-flex items-center gap-2 rounded-xl border border-white/[.12] bg-white/[.035] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:-translate-y-0.5 hover:bg-white/[.08] hover:text-white">
              Start with DSA <Code2 size={16} />
            </Link>
          </div>
          {coursesOpen && (
            <div className="hero-course-menu mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
              <Link href="/dsa" className="group rounded-2xl border border-violet-300/20 bg-violet-400/[.07] p-5 transition hover:-translate-y-1 hover:border-violet-300/45 hover:bg-violet-400/[.12]">
                <BookOpen size={20} className="text-violet-200" />
                <h2 className="mt-5 font-semibold text-white">DSA course</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Concepts, patterns, curated problems, and readable Java editorials.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-200">Open course <ArrowRight size={14} /></span>
              </Link>
              <Link href="/system-design" className="group rounded-2xl border border-cyan-300/20 bg-cyan-400/[.055] p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/[.10]">
                <Layers3 size={20} className="text-cyan-200" />
                <h2 className="mt-5 font-semibold text-white">System Design</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Principles, calculations, patterns, and interview frameworks.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-200">Open course <ArrowRight size={14} /></span>
              </Link>
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-zinc-500">
            <span>Java-first solutions</span><span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" /><span>Pattern-led learning</span><span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" /><span>Built for revision</span>
          </div>
        </div>

        <div className="hero-studio hero-enter-delay rounded-[1.75rem] border border-white/[.12] bg-[#101014]/80 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl md:p-5">
          <div className="flex items-center justify-between border-b border-white/[.08] pb-4">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400/25 to-cyan-400/20 text-violet-100"><Sparkles size={18} /></span><div><p className="text-sm font-semibold text-white">Your learning loop</p><p className="mt-0.5 text-xs text-zinc-500">Small wins, connected together</p></div></div>
            <span className="rounded-full border border-emerald-300/15 bg-emerald-400/[.07] px-2.5 py-1 text-[11px] font-medium text-emerald-200">Ready</span>
          </div>
          <div className="mt-5 space-y-3">
            {signals.map((signal, index) => <div key={signal.label} className="hero-signal-card flex items-center gap-4 rounded-2xl border border-white/[.075] bg-white/[.025] px-4 py-3.5"><span className={`grid h-8 w-8 place-items-center rounded-lg ${signal.color}/15 text-xs font-semibold text-zinc-100`}>0{index + 1}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-zinc-200">{signal.label}</p><p className="mt-0.5 truncate text-xs text-zinc-500">{signal.value}</p></div><span className={`h-2 w-2 rounded-full ${signal.color} shadow-[0_0_14px_currentColor]`} /></div>)}
          </div>
          <div className="mt-5 rounded-2xl border border-white/[.08] bg-black/20 p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[.14em] text-zinc-500">Today’s focus</span><span className="text-xs font-medium text-cyan-200">Sliding Window</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[.06]"><div className="hero-progress h-full w-[68%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]"><span className="rounded-lg bg-white/[.045] py-2 text-zinc-400">Concept</span><span className="rounded-lg bg-violet-400/15 py-2 font-semibold text-violet-100">Pattern</span><span className="rounded-lg bg-white/[.045] py-2 text-zinc-500">Problem</span></div>
          </div>
          <div className="code-preview mt-5 rounded-2xl border border-white/[.08] px-4 py-3.5 font-mono text-[11px] leading-6"><span className="text-zinc-600">01</span> <span className="text-pink-400">for</span> <span className="text-zinc-300">(int right = 0; right &lt; n; right++)</span><br /><span className="text-zinc-600">02</span> &nbsp; <span className="text-cyan-300">window</span><span className="text-zinc-300">.add(nums[right]);</span><br /><span className="text-zinc-600">03</span> &nbsp; <span className="text-pink-400">while</span> <span className="text-zinc-300">(!valid()) left++;</span></div>
        </div>
      </div>
    </section>
  );
}
