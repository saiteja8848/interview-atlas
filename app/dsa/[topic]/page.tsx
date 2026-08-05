import { Link } from "@/components/link";
import { NotFound } from "@/app/not-found";
import { ArrowLeft, ArrowRight, BookOpen, Code2, Layers3 } from "lucide-react";
import { dsaCurriculum, getPatternGroups, slugify } from "@/content/library";
import { SiteHeader } from "@/components/site-header";
import { CourseSidebar } from "@/components/course-sidebar";

const difficultyClass = {
  Easy: "bg-emerald-400/10 text-emerald-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Hard: "bg-rose-400/10 text-rose-300",
};

export default function TopicPage({ topicSlug, tab = "patterns", selectedPattern }: { topicSlug: string; tab?: string; selectedPattern?: string | null }) {
  const topic = dsaCurriculum.find((item) => slugify(item.title) === topicSlug);
  if (!topic) return <NotFound />;

  const groups = getPatternGroups(topic);
  const chosenGroup = selectedPattern ? groups.find((group) => slugify(group.pattern) === selectedPattern) : undefined;
  const visibleGroups = chosenGroup ? [chosenGroup] : groups;
  const concepts = tab === "concepts";

  return (
    <main className="min-h-screen course-page">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar />
        <div className="min-w-0 flex-1 px-5 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <Link href="/dsa" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"><ArrowLeft size={16} /> Back to DSA</Link>
            <p className="section-kicker mt-8">DSA · {topic.title}</p>
            <h1 className="display-heading mt-3 text-4xl font-semibold md:text-5xl">{topic.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">Learn the underlying concept first, then open a pattern to see the questions that use it.</p>

            <div className="mt-8 flex gap-2 border-b border-white/[.08]">
              <Link href={`/dsa/${topicSlug}?tab=concepts`} className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition ${concepts ? "border-indigo-400 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}><BookOpen size={16} /> Concepts</Link>
              <Link href={`/dsa/${topicSlug}?tab=patterns`} className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition ${!concepts ? "border-indigo-400 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}><Layers3 size={16} /> Patterns ({topic.patterns.length})</Link>
            </div>

            {concepts ? (
              <section className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
                <div className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6"><p className="section-kicker">Core ideas</p><h2 className="mt-2 text-xl font-semibold">What to understand first</h2><ul className="mt-5 space-y-3">{topic.concepts.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}</ul></div>
                <div className="rounded-3xl border border-indigo-300/15 bg-indigo-400/[.045] p-6"><p className="section-kicker">Next step</p><h2 className="mt-2 text-xl font-semibold">Turn the idea into a pattern.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">Each pattern groups the problems that share the same decision-making technique. Open one when you are ready to practise.</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{groups.map((group) => <Link key={group.pattern} href={`/dsa/${topicSlug}?tab=patterns&pattern=${slugify(group.pattern)}`} className="group rounded-xl border border-white/[.08] bg-black/10 px-4 py-3 transition hover:border-indigo-300/35 hover:bg-white/[.045]"><span className="block text-sm font-medium text-indigo-100">{group.pattern}</span><span className="mt-1 block text-xs text-zinc-500">{group.questions.length} problems <ArrowRight size={12} className="ml-1 inline transition group-hover:translate-x-1" /></span></Link>)}</div></div>
              </section>
            ) : (
              <section className="mt-8 space-y-5">
                <div className="pattern-banner"><div><p className="section-kicker">Pattern practice</p><h2 className="mt-2 text-xl font-semibold text-zinc-100">{chosenGroup ? chosenGroup.pattern : `All ${topic.title} patterns`}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{chosenGroup ? `These questions use the ${chosenGroup.pattern} technique. Read the pattern once, then solve the problems in order.` : "Choose a pattern from the left panel or browse the complete map below."}</p></div>{chosenGroup && <Link href={`/dsa/${topicSlug}?tab=patterns`} className="shrink-0 rounded-xl border border-white/[.1] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/[.06]">Show all patterns</Link>}</div>
                {visibleGroups.map((group) => (
                  <section id={slugify(group.pattern)} key={group.pattern} className="scroll-mt-24 rounded-3xl border border-white/[.08] bg-white/[.02] p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-300">Pattern</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{group.pattern}</h2></div><span className="rounded-full bg-indigo-400/10 px-3 py-1.5 text-xs font-medium text-indigo-200">{group.questions.length} problems</span></div>
                    <div className="mt-5 space-y-2">{group.questions.map((question, index) => <Link key={question.title} href={`/dsa/problems/${slugify(question.title)}`} className="pattern-problem-link group"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[.06] text-xs font-semibold text-zinc-400">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-zinc-100 transition group-hover:text-indigo-200">{question.title}</span><span className="mt-1 block truncate text-xs text-zinc-500">{question.tags.join(" · ")}</span></span><span className={`rounded-full px-2.5 py-1 text-[11px] ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span><ArrowRight size={16} className="shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" /></Link>)}</div>
                  </section>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
