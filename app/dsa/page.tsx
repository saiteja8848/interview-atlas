import { Link } from "@/components/link";
import { ArrowRight, BookOpen, LayoutDashboard, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { CourseSidebar } from "@/components/course-sidebar";
import { ProblemExplorer } from "@/components/problem-explorer";
import { dsaCurriculum, slugify } from "@/content/library";

const accentStyles = ["text-violet-200 bg-violet-400/15", "text-cyan-200 bg-cyan-400/15", "text-emerald-200 bg-emerald-400/15", "text-amber-200 bg-amber-400/15"];

export default function DsaPage() {
  const problemCount = dsaCurriculum.reduce((total, topic) => total + topic.questions.length, 0);
  return (
    <main className="min-h-screen course-page">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar />
        <div className="min-w-0 flex-1 px-5 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <section className="course-intro course-intro-dsa">
              <div className="relative z-10 max-w-3xl"><p className="section-kicker">Course · DSA</p><h1 className="display-heading mt-3 text-4xl font-semibold md:text-5xl">Build pattern recognition, one clear idea at a time.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">Start with the fundamentals, learn the reusable pattern, then practise the exact questions that reinforce it. Every problem keeps the explanation and Java solution close together.</p></div>
              <div className="course-intro-stats relative z-10 mt-7 grid gap-3 sm:grid-cols-3"><div><strong>{dsaCurriculum.length}</strong><span>topics</span></div><div><strong>{problemCount}+</strong><span>practice problems</span></div><div><strong>Java</strong><span>focused solutions</span></div></div>
              <Link href="/dsa/dashboard" className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-300/25 bg-violet-400/10 px-4 py-2.5 text-sm font-semibold text-violet-100 transition hover:border-violet-300/40 hover:bg-violet-400/20"><LayoutDashboard size={16} /> Open progress dashboard <ArrowRight size={15} /></Link>
              <Sparkles className="course-intro-mark" size={185} aria-hidden="true" />
            </section>
            <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-kicker">Course map</p><h2 className="display-heading mt-2 text-2xl font-semibold">Choose a topic, then follow its patterns.</h2></div><p className="max-w-sm text-sm leading-6 text-zinc-500">The sidebar keeps the same order: topic → pattern → problem.</p></div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{dsaCurriculum.map((topic, index) => <article key={topic.title} className="topic-card"><div className="flex items-start justify-between gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-semibold ${accentStyles[index % accentStyles.length]}`}>{String(index + 1).padStart(2, "0")}</span><span className="text-xs text-zinc-600">{topic.questions.length} problems</span></div><h2 className="mt-7 text-xl font-semibold tracking-tight text-zinc-100">{topic.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{topic.concepts.slice(0, 2).join(" · ")}</p><div className="mt-5 flex flex-wrap gap-1.5">{topic.patterns.slice(0, 3).map((pattern) => <span key={pattern} className="rounded-full border border-white/[.07] bg-white/[.025] px-2.5 py-1 text-[11px] text-zinc-400">{pattern}</span>)}</div><div className="mt-6 flex gap-2"><Link href={`/dsa/${slugify(topic.title)}?tab=concepts`} className="inline-flex items-center gap-1.5 rounded-lg border border-white/[.1] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/[.06] hover:text-white"><BookOpen size={14} /> Concepts</Link><Link href={`/dsa/${slugify(topic.title)}?tab=problems`} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/15 px-3 py-2 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/25">Patterns <ArrowRight size={13} /></Link></div></article>)}</div>
            </section>
            <ProblemExplorer />
          </div>
        </div>
      </div>
    </main>
  );
}
