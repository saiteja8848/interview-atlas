import { Link } from "@/components/link";
import { NotFound } from "@/app/not-found";
import { ArrowLeft, ArrowRight, BookOpen, Code2 } from "lucide-react";
import { dsaCurriculum, getPatternGroups, slugify } from "@/content/library";
import { SiteHeader } from "@/components/site-header";
import { CourseSidebar } from "@/components/course-sidebar";

const difficultyClass = {
  Easy: "bg-emerald-400/10 text-emerald-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Hard: "bg-rose-400/10 text-rose-300",
};

export default function TopicPage({ topicSlug, tab = "concepts" }: { topicSlug: string; tab?: string }) {
  const topic = dsaCurriculum.find((item) => slugify(item.title) === topicSlug);
  if (!topic) return <NotFound />;

  const groups = getPatternGroups(topic);
  const concepts = tab !== "problems";

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar />
        <div className="min-w-0 flex-1 px-5 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <Link href="/dsa" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"><ArrowLeft size={16} /> Back to DSA</Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[.15em] text-indigo-300">DSA · {topic.title}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{topic.title}</h1>

            <div className="mt-8 flex gap-2 border-b border-white/[.08]">
              <Link href={`/dsa/${topicSlug}?tab=concepts`} className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm ${concepts ? "border-indigo-400 text-white" : "border-transparent text-zinc-500"}`}><BookOpen size={16} /> Concepts</Link>
              <Link href={`/dsa/${topicSlug}?tab=problems`} className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm ${!concepts ? "border-indigo-400 text-white" : "border-transparent text-zinc-500"}`}><Code2 size={16} /> Problems ({topic.questions.length})</Link>
            </div>

            {concepts ? (
              <section className="mt-8">
                <p className="text-sm leading-6 text-zinc-400">Learn the concepts, then open a pattern to practice the problems it contains.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/[.08] bg-white/[.02] p-5">
                    <h2 className="font-semibold">Core concepts</h2>
                    <ul className="mt-4 space-y-3">{topic.concepts.map((item) => <li key={item} className="text-sm text-zinc-400">{item}</li>)}</ul>
                  </div>
                  <div className="rounded-2xl border border-white/[.08] bg-white/[.02] p-5">
                    <h2 className="font-semibold">Patterns and problems</h2>
                    <div className="mt-4 space-y-3">
                      {groups.map((group) => (
                        <div key={group.pattern} className="rounded-xl border border-white/[.08] p-4">
                          <div className="flex items-center justify-between"><h3 className="text-sm font-medium text-indigo-200">{group.pattern}</h3><span className="text-xs text-zinc-500">{group.questions.length} problems</span></div>
                          <div className="mt-3 grid gap-2">{group.questions.map((question) => <Link key={question.title} href={`/dsa/problems/${slugify(question.title)}`} className="flex items-center justify-between rounded-lg bg-white/[.03] px-3 py-2 text-xs text-zinc-300 hover:bg-white/[.07]"><span>{question.title}</span><ArrowRight size={13} className="text-zinc-600" /></Link>)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={`/dsa/${topicSlug}?tab=problems`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-200">Continue to problems <ArrowRight size={16} /></Link>
              </section>
            ) : (
              <section className="mt-8 space-y-5">
                {groups.map((group) => (
                  <div key={group.pattern} className="rounded-2xl border border-white/[.08] bg-white/[.02] p-4">
                    <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold">{group.pattern}</h2><span className="text-xs text-zinc-500">{group.questions.length} problems</span></div>
                    <div className="space-y-2">
                      {group.questions.map((question) => (
                        <Link key={question.title} href={`/dsa/problems/${slugify(question.title)}`} className="group flex items-center gap-4 rounded-xl border border-white/[.08] px-4 py-4 transition hover:border-indigo-400/40">
                          <span className="flex-1"><span className="block text-sm font-medium">{question.title}</span><span className="mt-1 block text-xs text-zinc-500">{question.tags.join(" · ")}</span></span>
                          <span className={`rounded-full px-2 py-1 text-[11px] ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span>
                          <ArrowRight size={16} className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
