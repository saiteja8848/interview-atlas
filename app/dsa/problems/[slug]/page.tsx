import { useState } from "react";
import { Link } from "@/components/link";
import { NotFound } from "@/app/not-found";
import {
  ArrowLeft,
  BookOpen,
  Braces,
  CheckCircle2,
  CircleAlert,
  Code2,
  ExternalLink,
  PlayCircle,
  Timer,
  Zap,
} from "lucide-react";
import {
  dsaCurriculum,
  getEditorialGuide,
  getInterviewLists,
  getStudyContent,
  getVideoResource,
  slugify,
  type CurriculumQuestion,
} from "@/content/library";
import { SiteHeader } from "@/components/site-header";
import { CourseSidebar } from "@/components/course-sidebar";
import { CodeTabs } from "@/components/code-tabs";

const colors = {
  Easy: "bg-emerald-400/10 text-emerald-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Hard: "bg-rose-400/10 text-rose-300",
};

function TestCases({ title }: { title: string }) {
  const cases = title === "Two Sum"
    ? [["[2, 7, 11, 15]", "9", "[0, 1]"], ["[3, 2, 4]", "6", "[1, 2]"], ["[3, 3]", "6", "[0, 1]"]]
    : [];

  return (
    <section className="mt-7">
      <h2 className="flex items-center gap-2 text-base font-semibold">
        <Braces size={17} className="text-cyan-300" /> Test cases
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {cases.length ? cases.map(([input, target, output], index) => (
          <div key={`${input}-${target}`} className="rounded-xl border border-white/[.08] bg-black/20 p-4 font-mono text-xs leading-6">
            <p className="mb-2 font-sans text-xs font-medium text-zinc-500">Example {index + 1}</p>
            <p>input = {input}</p>
            <p>target = {target}</p>
            <p className="mt-2 text-emerald-300">output = {output}</p>
          </div>
        )) : (
          <p className="rounded-xl border border-white/[.08] bg-black/20 p-4 text-sm text-zinc-400">
            Trace a smallest valid input, one boundary case, and one repeated-value case against the Java method signature.
          </p>
        )}
      </div>
    </section>
  );
}

function VideoPanel({ question }: { question: CurriculumQuestion }) {
  const video = getVideoResource(question);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-rose-300">Video explanation</p>
        <h2 className="mt-2 text-2xl font-semibold">Watch the pattern in action.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          Read the statement first, watch the explanation, then return to the editorial and trace the Java method yourself.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/[.09] bg-black">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
          title={`${question.title} video explanation`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="rounded-xl border border-rose-300/15 bg-rose-400/[.045] px-4 py-3 text-sm">
        <p className="font-medium text-rose-100">{video.isProblemMatch ? `Direct ${question.title} explanation` : `Related ${video.title} refresher`}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-400">Channel: {video.channel}{video.isProblemMatch ? "." : ". Use the exact-problem search below if you want a different explanation."}</p>
      </div>
      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-rose-300/25 bg-rose-400/10 px-4 py-2.5 text-sm font-medium text-rose-100 transition hover:bg-rose-400/20"
      >
        <ExternalLink size={16} /> Open on YouTube
      </a>
      {!video.isProblemMatch && (
        <a href={video.searchUrl} target="_blank" rel="noreferrer" className="ml-3 inline-flex items-center gap-2 rounded-xl border border-white/[.13] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[.06]">
          <PlayCircle size={16} /> Search exact problem
        </a>
      )}
    </section>
  );
}

function Editorial({ question }: { question: CurriculumQuestion }) {
  const editorial = getEditorialGuide(question);

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-indigo-300">Editorial</p>
      <h2 className="mt-2 text-2xl font-semibold">{question.title}, explained step by step</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
        Start with the simple idea. Then see exactly what is repeated, and how the optimized Java code removes that repeated work.
      </p>

      <section className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-cyan-300" />
          <h3 className="font-semibold">1. What is the problem asking?</h3>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">{editorial.plainEnglish}</p>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-amber-300/20 bg-amber-400/[.035] p-5">
          <div className="flex items-center gap-2">
            <Timer size={18} className="text-amber-300" />
            <h3 className="font-semibold">2. Start with brute force</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-300">{editorial.brute}</p>
          <p className="mt-4 rounded-lg bg-black/15 px-3 py-2 text-xs font-medium text-amber-100">
            Brute-force cost: {editorial.bruteComplexity}
          </p>
          <div className="mt-5 border-t border-amber-300/15 pt-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
              <CircleAlert size={16} /> Why this is not enough
            </div>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{editorial.drawback}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-400/25 bg-indigo-400/[.055] p-5">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-indigo-300" />
            <h3 className="font-semibold">3. Improve it with the optimized approach</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-200">{editorial.optimized}</p>
          <p className="mt-4 rounded-lg bg-indigo-400/[.09] px-3 py-2 text-xs font-medium text-indigo-100">
            Optimized cost: {editorial.optimizedComplexity}
          </p>
          <div className="mt-5 border-t border-indigo-300/15 pt-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-100">
              <Zap size={16} /> What the Java code eliminates
            </div>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{editorial.improvement}</p>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-indigo-300" />
          <h3 className="font-semibold">4. Read the optimized Java code in this order</h3>
        </div>
        <ol className="mt-4 space-y-3">
          {editorial.codeSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-300">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-400/10 text-xs text-indigo-200">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}

function Workspace({ question, study, lists }: { question: CurriculumQuestion; study: ReturnType<typeof getStudyContent>; lists: string[] }) {
  const [tab, setTab] = useState<"problem" | "editorial" | "video" | "code">("problem");
  const tabs = [["problem", "Problem"], ["editorial", "Editorial"], ["video", "Video"], ["code", "Code"]] as const;

  return (
    <div className="rounded-3xl border border-white/[.09] bg-white/[.02]">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/[.08] px-3 pt-3">
        {tabs.map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`rounded-t-xl px-4 py-3 text-sm font-medium transition ${tab === value ? "bg-white/[.07] text-white" : "text-zinc-500 hover:bg-white/[.04] hover:text-zinc-300"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-7">
        {tab === "problem" && (
          <>
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs ${colors[question.difficulty]}`}>{question.difficulty}</span>
              {question.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs text-zinc-400">{tag}</span>)}
              {lists.map((list) => <span key={list} className="rounded-full border border-violet-300/30 bg-violet-400/10 px-2.5 py-1 text-xs text-violet-200">{list}</span>)}
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight">{question.title}</h1>
            <section className="mt-7">
              <h2 className="text-base font-semibold">Problem statement</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{study.statement}</p>
            </section>
            <section className="mt-7">
              <h2 className="text-base font-semibold">Constraints</h2>
              <ul className="mt-3 space-y-2">
                {["Use each input element at most once where the problem permits.", "Check empty, repeated, negative, and boundary inputs.", "Return the result in the required output format."].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-zinc-400"><CheckCircle2 size={16} className="shrink-0 text-indigo-300" />{item}</li>
                ))}
              </ul>
            </section>
            <TestCases title={question.title} />
          </>
        )}
        {tab === "editorial" && <Editorial question={question} />}
        {tab === "video" && <VideoPanel question={question} />}
        {tab === "code" && (
          <div className="space-y-6">
            {"sourcePath" in study && (
              <p className="rounded-xl border border-indigo-400/20 bg-indigo-400/[.06] px-4 py-3 text-xs leading-5 text-indigo-100">
                Canonical Java source imported from <span className="font-mono text-indigo-200">{study.sourcePath}</span>.
              </p>
            )}
            <div>
              <div className="flex items-center gap-2"><Code2 size={18} className="text-amber-300" /><h2 className="text-lg font-semibold">Brute-force solution</h2></div>
              <p className="mt-2 text-sm text-zinc-400">Use the editorial baseline above to understand what this approach checks.</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]"><CodeTabs code={study.bruteCode} /></div>
            </div>
            <div>
              <div className="flex items-center gap-2"><Zap size={18} className="text-indigo-300" /><h2 className="text-lg font-semibold">Optimized solution</h2></div>
              <p className="mt-2 text-sm text-zinc-400">{study.complexity}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]"><CodeTabs code={study.optimizedCode} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProblemPage({ slug }: { slug: string }) {
  const topic = dsaCurriculum.find((item) => item.questions.some((question) => slugify(question.title) === slug));
  const question = topic?.questions.find((item) => slugify(item.title) === slug);
  if (!topic || !question) return <NotFound />;

  const study = getStudyContent(question);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1800px]">
        <CourseSidebar />
        <article className="min-w-0 flex-1 px-4 py-7 md:px-8">
          <Link href={`/dsa/${slugify(topic.title)}?tab=problems`} className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft size={16} /> Back to {topic.title} problems
          </Link>
          <div className="mx-auto mt-5 max-w-6xl">
            <Workspace question={question} study={study} lists={getInterviewLists(question.title, topic.title)} />
          </div>
        </article>
      </div>
    </main>
  );
}
