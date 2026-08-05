import { ArrowLeft, BookOpenCheck, Braces, Lightbulb, Target, Wrench } from "lucide-react";
import { Link } from "@/components/link";
import { CodeTabs } from "@/components/code-tabs";
import { CourseSidebar } from "@/components/course-sidebar";
import { SiteHeader } from "@/components/site-header";
import { dsaConcepts, type ConceptLesson } from "@/content/dsa-concepts";
import { dsaCurriculum, slugify, type CodeLanguage } from "@/content/library";
import { NotFound } from "@/app/not-found";

function fallbackLesson(title: string, operations: string[]): ConceptLesson {
  return {
    summary: `Build a clear mental model of ${title}, then use its invariant to decide what information needs to be retained while solving.`,
    foundations: operations.slice(0, 3).map((item) => ({ title: item, description: "Understand what this operation preserves, when it is efficient, and how it changes the current state." })),
    operations,
    interviewNotes: ["State the invariant before coding.", "Trace a tiny example by hand.", "Check the time and space cost of every retained value."],
    snippetTitle: "Java reference template",
    snippetDescription: "Use this structure as a starting point, then adapt the state and transition to the problem.",
    java: `class Solution {
  public void solve() {
  }
}`,
  };
}

function javaOnly(java: string): Record<CodeLanguage, string> {
  return { Java: java, Python: "", JavaScript: "", "C++": "" };
}

export function ConceptGuide({ topicSlug }: { topicSlug: string }) {
  const topic = dsaCurriculum.find((item) => slugify(item.title) === topicSlug);
  if (!topic) return <NotFound />;

  const lesson = dsaConcepts[topic.title] ?? fallbackLesson(topic.title, topic.concepts);
  const code = javaOnly(lesson.java);

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar />
        <article className="min-w-0 flex-1 px-5 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <Link href="/dsa" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white">
              <ArrowLeft size={16} /> Back to DSA
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[.16em] text-indigo-300">Concept library · {topic.title}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Understand {topic.title} before solving.</h1>
            <p className="prose-copy mt-4 max-w-3xl text-base leading-8">{lesson.summary}</p>

            <section className="glass mt-10 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300"><Lightbulb size={19} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-300">Theory first</p>
                  <h2 className="mt-1 text-xl font-semibold">Core ideas to understand</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {lesson.foundations.map((foundation) => (
                  <div key={foundation.title} className="rounded-2xl border border-white/[.08] bg-black/10 p-4">
                    <h3 className="font-medium text-zinc-100">{foundation.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{foundation.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <section className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6">
                <div className="flex items-center gap-3"><Wrench size={18} className="text-cyan-300" /><h2 className="font-semibold">Operations to know</h2></div>
                <ul className="mt-5 space-y-3">
                  {lesson.operations.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}
                </ul>
              </section>
              <section className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6">
                <div className="flex items-center gap-3"><Target size={18} className="text-amber-300" /><h2 className="font-semibold">Interview instinct</h2></div>
                <ul className="mt-5 space-y-3">
                  {lesson.interviewNotes.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />{item}</li>)}
                </ul>
              </section>
            </div>

            {lesson.deepDives ? (
              <section className="mt-8">
                <div className="mb-6 flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300"><BookOpenCheck size={19} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-300">Complete prerequisite guide</p>
                    <h2 className="mt-1 text-2xl font-semibold">{topic.title}, step by step</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Study these sections in order. Each one gives you the recognition signal, a small dry run, and a Java reference before you solve questions.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {lesson.deepDives.map((detail) => (
                    <section key={detail.title} className="overflow-hidden rounded-3xl border border-white/[.08] bg-white/[.02]">
                      <div className="border-b border-white/[.08] bg-white/[.025] p-5 md:p-7">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="text-xl font-semibold text-zinc-100">{detail.title}</h3>
                          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-3 py-1.5 text-xs font-medium text-cyan-200">{detail.complexity}</span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-zinc-300">{detail.description}</p>
                        <ul className="mt-5 space-y-2.5">
                          {detail.keyPoints.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />{point}</li>)}
                        </ul>
                      </div>
                      <div className="grid gap-5 p-5 md:p-7 xl:grid-cols-[.85fr_1.15fr]">
                        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[.035] p-5">
                          <p className="text-xs font-semibold uppercase tracking-[.14em] text-amber-200">Dry run</p>
                          <p className="mt-3 whitespace-pre-wrap font-mono text-sm font-medium leading-6 text-zinc-200">{detail.dryRun.input}</p>
                          <ol className="mt-4 space-y-3">
                            {detail.dryRun.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-300/10 text-xs font-semibold text-amber-200">{index + 1}</span>{step}</li>)}
                          </ol>
                          <p className="mt-5 rounded-xl border border-emerald-300/15 bg-emerald-300/[.05] p-3 text-sm leading-6 text-emerald-100">{detail.dryRun.result}</p>
                        </div>
                        {detail.java && <div className="overflow-hidden rounded-2xl border border-white/[.09]"><CodeTabs code={javaOnly(detail.java)} /></div>}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ) : <section className="mt-8 rounded-3xl border border-indigo-400/20 bg-indigo-400/[.035] p-5 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300"><Braces size={19} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-300">Java reference</p>
                    <h2 className="mt-1 text-xl font-semibold">{lesson.snippetTitle}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{lesson.snippetDescription}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[.09] bg-black/15 px-3 py-1.5 text-xs font-medium text-zinc-300"><BookOpenCheck size={14} /> Study the idea, then trace it</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/[.09]">
                <CodeTabs code={code} />
              </div>
            </section>}
          </div>
        </article>
      </div>
    </main>
  );
}
