import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  LayoutDashboard,
  ListChecks,
  Target,
  Trophy,
} from "lucide-react";
import { Link } from "@/components/link";
import { CourseSidebar } from "@/components/course-sidebar";
import { SiteHeader } from "@/components/site-header";
import { dsaCurriculum, slugify } from "@/content/library";
import { dsaProgressEvent, getCompletedQuestionKeys, getQuestionProgressKey } from "@/content/dsa-progress";

type TopicProgress = {
  title: string;
  total: number;
  completed: number;
  percentage: number;
  nextQuestion?: string;
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/[.07]" aria-label={`${value}% complete`}>
      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400 transition-[width] duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export function DsaDashboard() {
  const [completedKeys, setCompletedKeys] = useState<Set<string>>(() => getCompletedQuestionKeys());

  useEffect(() => {
    const syncProgress = () => setCompletedKeys(getCompletedQuestionKeys());
    window.addEventListener(dsaProgressEvent, syncProgress);
    window.addEventListener("storage", syncProgress);
    return () => {
      window.removeEventListener(dsaProgressEvent, syncProgress);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  const topicProgress = useMemo<TopicProgress[]>(() => dsaCurriculum.map((topic) => {
    const completed = topic.questions.filter((question) => completedKeys.has(getQuestionProgressKey(topic.title, question.title))).length;
    const total = topic.questions.length;
    return {
      title: topic.title,
      total,
      completed,
      percentage: total ? Math.round((completed / total) * 100) : 0,
      nextQuestion: topic.questions.find((question) => !completedKeys.has(getQuestionProgressKey(topic.title, question.title)))?.title,
    };
  }), [completedKeys]);

  const totalProblems = topicProgress.reduce((sum, topic) => sum + topic.total, 0);
  const completedProblems = topicProgress.reduce((sum, topic) => sum + topic.completed, 0);
  const startedTopics = topicProgress.filter((topic) => topic.completed > 0).length;
  const completionRate = totalProblems ? Math.round((completedProblems / totalProblems) * 100) : 0;
  const nextTopic = topicProgress.find((topic) => topic.nextQuestion);

  return (
    <main className="min-h-screen course-page">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar />
        <div className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <Link href="/dsa" className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white">
              <ArrowLeft size={16} /> Back to DSA
            </Link>

            <section className="relative mt-6 overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[.13] via-[#111329] to-cyan-500/[.07] px-6 py-8 md:px-9 md:py-10">
              <div className="relative z-10 max-w-2xl">
                <p className="section-kicker text-violet-200">Learning dashboard</p>
                <h1 className="display-heading mt-3 text-4xl font-semibold md:text-5xl">Your DSA progress, in one clear view.</h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">Mark a problem complete when you finish it. Your progress is saved privately on this device and broken down by topic below.</p>
              </div>
              <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-white/[.09] bg-black/20 p-4 backdrop-blur-sm"><ListChecks size={18} className="text-indigo-200" /><strong className="mt-4 block text-3xl font-semibold text-white">{completedProblems}</strong><span className="mt-1 block text-xs text-zinc-400">of {totalProblems} completed</span></article>
                <article className="rounded-2xl border border-white/[.09] bg-black/20 p-4 backdrop-blur-sm"><Target size={18} className="text-cyan-200" /><strong className="mt-4 block text-3xl font-semibold text-white">{totalProblems - completedProblems}</strong><span className="mt-1 block text-xs text-zinc-400">questions remaining</span></article>
                <article className="rounded-2xl border border-white/[.09] bg-black/20 p-4 backdrop-blur-sm"><BookOpen size={18} className="text-violet-200" /><strong className="mt-4 block text-3xl font-semibold text-white">{startedTopics}</strong><span className="mt-1 block text-xs text-zinc-400">of {topicProgress.length} topics started</span></article>
                <article className="rounded-2xl border border-white/[.09] bg-black/20 p-4 backdrop-blur-sm"><Trophy size={18} className="text-amber-200" /><strong className="mt-4 block text-3xl font-semibold text-white">{completionRate}%</strong><span className="mt-1 block text-xs text-zinc-400">course completion</span></article>
              </div>
              <LayoutDashboard size={220} className="pointer-events-none absolute -right-8 -top-8 text-violet-300/[.06]" aria-hidden="true" />
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <article className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5 md:p-6">
                <p className="section-kicker">Overall completion</p>
                <div className="mt-4 flex items-end justify-between gap-4"><h2 className="text-2xl font-semibold">Keep the streak moving.</h2><span className="text-lg font-semibold text-indigo-200">{completionRate}%</span></div>
                <div className="mt-5"><ProgressBar value={completionRate} /></div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">Every completed question makes the next revision pass easier. Focus on one topic at a time, then return here to see the course fill up.</p>
              </article>

              <article className="rounded-2xl border border-cyan-300/15 bg-cyan-400/[.035] p-5 md:p-6">
                <p className="section-kicker text-cyan-200">Next up</p>
                {nextTopic?.nextQuestion ? (
                  <>
                    <h2 className="mt-4 text-xl font-semibold text-white">{nextTopic.nextQuestion}</h2>
                    <p className="mt-2 text-sm text-zinc-400">{nextTopic.title} · your next unfinished question</p>
                    <Link href={`/dsa/problems/${slugify(nextTopic.nextQuestion)}`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Continue practice <ArrowRight size={16} /></Link>
                  </>
                ) : (
                  <><h2 className="mt-4 text-xl font-semibold text-white">Everything is complete.</h2><p className="mt-2 text-sm leading-6 text-zinc-400">Excellent work. Revisit a topic to reinforce the patterns that matter most in interviews.</p></>
                )}
              </article>
            </section>

            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="section-kicker">Topic progress</p><h2 className="mt-2 text-2xl font-semibold">See exactly where to continue.</h2></div><p className="text-sm text-zinc-500">Question completion is stored only in this browser.</p></div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {topicProgress.map((topic, index) => (
                  <article key={topic.title} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:border-white/[.15] hover:bg-white/[.04]">
                    <div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[.06] text-xs font-semibold text-zinc-300">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="text-base font-semibold text-zinc-100">{topic.title}</h3><span className="shrink-0 text-sm font-medium text-indigo-200">{topic.percentage}%</span></div><p className="mt-1 text-xs text-zinc-500">{topic.completed} of {topic.total} questions completed</p></div></div>
                    <div className="mt-5"><ProgressBar value={topic.percentage} /></div>
                    <div className="mt-5 flex items-center justify-between gap-3"><span className="flex min-w-0 items-center gap-2 text-xs text-zinc-500">{topic.completed === topic.total ? <CheckCircle2 size={15} className="shrink-0 text-emerald-300" /> : <Circle size={15} className="shrink-0 text-zinc-600" />}<span className="truncate">{topic.nextQuestion ? `Next: ${topic.nextQuestion}` : "Topic complete"}</span></span><Link href={topic.nextQuestion ? `/dsa/problems/${slugify(topic.nextQuestion)}` : `/dsa/${slugify(topic.title)}?tab=patterns`} className="shrink-0 text-xs font-semibold text-indigo-200 transition hover:text-white">{topic.nextQuestion ? "Continue" : "Review"}</Link></div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
