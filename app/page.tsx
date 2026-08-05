import { Link } from "@/components/link";
import { ArrowRight, CheckCircle2, Code2, Layers3, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";

const steps = ["Choose a topic", "Recognize the pattern", "Trace the solution"];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <SiteHeader />
      <Hero />
      <section className="home-section border-y border-white/[.07]">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="max-w-2xl">
            <p className="section-kicker">A focused library</p>
            <h2 className="display-heading mt-3 text-3xl font-semibold md:text-4xl">Choose the course that moves you forward.</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">Clear enough for a first pass. Structured enough to return to before an interview.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Link href="/dsa" className="home-course-card home-course-dsa group">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-400/15 text-violet-200"><Code2 size={23} /></span><ArrowRight size={20} className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-violet-200" /></div>
              <p className="mt-12 text-xs font-semibold uppercase tracking-[.14em] text-violet-200">Build intuition</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">Data Structures & Algorithms</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">Move from core concepts into reusable patterns, then solve questions with an explanation that maps directly to the Java code.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100">Explore DSA <ArrowRight size={16} /></span>
            </Link>
            <Link href="/system-design" className="home-course-card home-course-system group">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-100"><Layers3 size={23} /></span><ArrowRight size={20} className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" /></div>
              <p className="mt-12 text-xs font-semibold uppercase tracking-[.14em] text-cyan-200">Think in trade-offs</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">System Design</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">Learn the qualities, calculations, patterns, and interview framework behind thoughtful system design decisions.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">Explore System Design <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="section-kicker">How AlgoCraft works</p><h2 className="display-heading mt-3 text-3xl font-semibold md:text-4xl">Made for understanding, not rushing.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">Build confidence from the smallest useful step instead of collecting disconnected solutions.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => <div key={step} className="learning-step"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.07] text-xs font-semibold text-white">0{index + 1}</span><p className="mt-10 text-base font-semibold text-zinc-100">{step}</p><p className="mt-2 text-sm leading-6 text-zinc-500">{index === 0 ? "Start with exactly the topic you need." : index === 1 ? "See the idea shared by many problems." : "Read code that explains the decision."}</p><CheckCircle2 size={17} className="mt-5 text-zinc-600" /></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="home-callout"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-400/15 text-violet-200"><Sparkles size={22} /></span><h2 className="display-heading mt-6 text-3xl font-semibold">A study space that stays out of your way.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">No noise, no pressure, and no random lists. Just the reasoning, patterns, and Java code you need to make your next answer feel natural.</p><Link href="/dsa" className="theme-button mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white">Start learning <ArrowRight size={16} /></Link></div>
      </section>
      <footer className="border-t border-white/[.07] px-5 py-7 text-center text-xs text-zinc-600">AlgoCraft · Learn with structure.</footer>
    </main>
  );
}
