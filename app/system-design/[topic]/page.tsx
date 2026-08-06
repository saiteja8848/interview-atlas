import { ArrowLeft, ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import { Link } from "@/components/link";
import { NotFound } from "@/app/not-found";
import { CourseSidebar } from "@/components/course-sidebar";
import { SiteHeader } from "@/components/site-header";
import { systemDesignCurriculum } from "@/content/system-design";
import { slugify } from "@/content/library";

export default function SystemDesignTopicPage({ topicSlug }: { topicSlug: string }) {
  const module = systemDesignCurriculum.find((item) => item.slug === topicSlug);
  if (!module) return <NotFound />;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[1800px]">
        <CourseSidebar activeCourse="system-design" />
        <article className="min-w-0 flex-1 px-5 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <Link href="/system-design" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"><ArrowLeft size={16} /> Back to System Design</Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[.16em] text-cyan-300">{module.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{module.title}</h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400">{module.intro}</p>

            <nav className="mt-8 flex flex-wrap gap-2 border-y border-white/[.08] py-4" aria-label={`${module.title} sections`}>
              {module.sections.map((section) => <a key={section.title} href={`#${slugify(section.title)}`} className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 transition hover:bg-white/[.05] hover:text-cyan-200">{section.title}</a>)}
            </nav>

            <div className="mt-8 space-y-5">
              {module.sections.map((section, index) => (
                <section id={slugify(section.title)} key={section.title} className="scroll-mt-24 rounded-3xl border border-white/[.08] bg-white/[.02] p-5 md:p-6">
                  <div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-xs font-semibold text-cyan-200">{index + 1}</span><div><h2 className="text-xl font-semibold">{section.title}</h2><p className="mt-1 text-sm leading-6 text-zinc-400">{section.description}</p></div></div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {section.items.map((item) => (
                      <article key={item.title} className="rounded-2xl border border-white/[.08] bg-black/15 p-5">
                        <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">{item.meaning}</p>
                        <div className="mt-4"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-cyan-200"><Wrench size={14} /> Techniques</p><div className="mt-2 flex flex-wrap gap-2">{item.techniques.map((technique) => <span key={technique} className="rounded-full border border-cyan-300/15 bg-cyan-400/[.05] px-2.5 py-1 text-xs text-zinc-300">{technique}</span>)}</div></div>
                        {item.components && <div className="mt-4 border-t border-white/[.07] pt-4"><p className="text-xs font-semibold uppercase tracking-[.12em] text-zinc-500">Components and tools</p><ul className="mt-2 space-y-1.5">{item.components.map((component) => <li key={component} className="flex gap-2 text-xs leading-5 text-zinc-400"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-cyan-300" />{component}</li>)}</ul></div>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <Link href="/system-design" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">Return to all modules <ArrowRight size={16} /></Link>
          </div>
        </article>
      </div>
    </main>
  );
}
