import { ArrowRight, BookOpen, Calculator, Layers3, MessageSquareText, Sparkles } from "lucide-react";
import { Link } from "@/components/link";
import { CourseSidebar } from "@/components/course-sidebar";
import { SiteHeader } from "@/components/site-header";
import { systemDesignCurriculum } from "@/content/system-design";

const moduleIcons = [BookOpen, Calculator, Layers3, MessageSquareText];
const moduleColors = ["text-cyan-200 bg-cyan-400/15", "text-amber-200 bg-amber-400/15", "text-violet-200 bg-violet-400/15", "text-rose-200 bg-rose-400/15"];

export default function SystemDesignPage() {
  const lessonCount = systemDesignCurriculum.reduce((total, module) => total + module.sections.length, 0);
  return (
    <main className="min-h-screen course-page">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <CourseSidebar activeCourse="system-design" />
        <article className="min-w-0 flex-1 px-5 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <section className="course-intro course-intro-system"><div className="relative z-10 max-w-3xl"><p className="section-kicker text-cyan-200">Course · System Design</p><h1 className="display-heading mt-3 text-4xl font-semibold md:text-5xl">Start with constraints. Then choose the shape.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">A deliberate path from quality attributes and calculations to repeatable design patterns and interview practice. Learn the reason behind each architectural choice.</p></div><div className="course-intro-stats relative z-10 mt-7 grid gap-3 sm:grid-cols-3"><div><strong>04</strong><span>core modules</span></div><div><strong>{lessonCount}</strong><span>focused sections</span></div><div><strong>1</strong><span>interview framework</span></div></div><Sparkles className="course-intro-mark text-cyan-300" size={185} aria-hidden="true" /></section>
            <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-kicker text-cyan-200">Learning path</p><h2 className="display-heading mt-2 text-2xl font-semibold">Build the foundation before the diagram.</h2></div><p className="max-w-sm text-sm leading-6 text-zinc-500">Work through these modules in order, then revisit the section that matches your design problem.</p></div><div className="mt-7 grid gap-4 md:grid-cols-2">{systemDesignCurriculum.map((module, index) => { const Icon = moduleIcons[index]; return <Link key={module.slug} href={`/system-design/${module.slug}`} className="system-module-card group"><div className="flex items-start gap-4"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${moduleColors[index]}`}><Icon size={20} /></span><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-[.13em] text-zinc-600">Module {String(index + 1).padStart(2, "0")}</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">{module.title}</h2></div><ArrowRight size={18} className="mt-2 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-cyan-200" /></div><p className="mt-5 text-sm leading-7 text-zinc-400">{module.intro}</p><div className="mt-5 flex flex-wrap gap-2">{module.sections.map((section) => <span key={section.title} className="rounded-full border border-white/[.08] bg-white/[.025] px-2.5 py-1 text-xs text-zinc-500">{section.title}</span>)}</div></Link>; })}</div></section>
          </div>
        </article>
      </div>
    </main>
  );
}
