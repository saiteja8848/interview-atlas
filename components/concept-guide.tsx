import { ArrowLeft, Lightbulb, Target, Wrench } from "lucide-react";
import { Link } from "@/components/link";
import { CourseSidebar } from "@/components/course-sidebar";
import { SiteHeader } from "@/components/site-header";
import { dsaCurriculum, slugify } from "@/content/library";
import { NotFound } from "@/app/not-found";

const topicTheory: Record<string, string> = {
  "Bitwise": "Bit operations work directly on binary digits. They are useful when a compact integer representation lets you replace extra storage, counting, or comparisons.",
  "Heaps": "A heap is a partially ordered tree: the most important value is always at the top. Use it when you repeatedly need the smallest, largest, or next-best item.",
  "Arrays": "Arrays give constant-time indexed access. Most interview solutions combine a scan with a small amount of state: a set, map, prefix value, or pair of pointers.",
  "Linked Lists": "A linked list trades random access for inexpensive pointer changes. The important skill is protecting the next link before you redirect the current one.",
  "Stack": "A stack keeps the newest unresolved item on top. It turns nested structure, next-greater relationships, and undo-like work into a single linear scan.",
  "Queue": "A queue processes work in arrival order. It is the natural tool for breadth-first search, level-by-level processing, and scheduling.",
  "Recursion": "Recursion expresses a problem in terms of a smaller version of itself. Backtracking adds a disciplined choose, explore, undo cycle to search valid possibilities.",
  "Backtracking": "Backtracking uses a disciplined choose, explore, undo cycle. Prune a branch as soon as it cannot lead to a valid answer.",
  "Dynamic Programming": "Dynamic programming saves answers to overlapping subproblems. Define exactly what one state means before writing a transition or loop.",
  "Graphs": "Graphs model relationships between states. Choose DFS for deep exploration, BFS for minimum unweighted distance, and a priority queue for weighted shortest paths.",
  "Trees": "Trees are hierarchical graphs with a single path between nodes. Nearly every tree problem becomes clearer when a recursive call states what it returns to its parent.",
};

export function ConceptGuide({ topicSlug }: { topicSlug: string }) {
  const topic = dsaCurriculum.find((item) => slugify(item.title) === topicSlug);
  if (!topic) return <NotFound />;

  const operations = topic.concepts;
  const tricks = topic.patterns.map((pattern) => `Ask: “What invariant does ${pattern} preserve?” Then update only the state required to keep it true.`);

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
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">This page is intentionally theory-first: learn the idea, operations, and interview tricks here. Practice problems live on the separate Problems tab.</p>

            <section className="glass mt-10 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300"><Lightbulb size={19} /></span>
                <h2 className="text-xl font-semibold">Core theory</h2>
              </div>
              <p className="prose-copy mt-5 text-sm">{topicTheory[topic.title] || "Build a mental model of the data structure, then use its invariant to decide what information must be retained."}</p>
            </section>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <section className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6">
                <div className="flex items-center gap-3"><Wrench size={18} className="text-cyan-300" /><h2 className="font-semibold">Operations to know</h2></div>
                <ul className="mt-5 space-y-3">{operations.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}</ul>
              </section>
              <section className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6">
                <div className="flex items-center gap-3"><Target size={18} className="text-amber-300" /><h2 className="font-semibold">Interview tricks</h2></div>
                <ul className="mt-5 space-y-3">{tricks.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />{item}</li>)}</ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
