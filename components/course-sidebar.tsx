import { Link } from "@/components/link";
import {
  Binary,
  BookOpen,
  Braces,
  ChevronDown,
  ChevronRight,
  Code2,
  Database,
  GitBranch,
  Layers3,
  ListTree,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sigma,
  Sparkles,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { dsaCurriculum, getPatternGroups, slugify } from "@/content/library";
import { systemDesignCurriculum } from "@/content/system-design";
import { useState } from "react";

const topicIcons: Record<string, LucideIcon> = {
  Bitwise: Binary,
  Math: Sigma,
  "Two Pointers": Waypoints,
  "Sliding Window": Search,
  "Intervals & Greedy": GitBranch,
  "Binary Search": Search,
  Heaps: Layers3,
  Arrays: Braces,
  Strings: BookOpen,
  "Linked Lists": ListTree,
  Stack: Layers3,
  Queue: ListTree,
  Recursion: GitBranch,
  Backtracking: Waypoints,
  "Dynamic Programming": Database,
  Trees: ListTree,
  Graphs: Network,
};

export function CourseSidebar({ activeCourse = "dsa" }: { activeCourse?: "dsa" | "system-design" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const courseLabel = activeCourse === "dsa" ? "DSA course" : "System Design course";

  return (
    <aside className={`hidden shrink-0 border-r border-white/[.09] bg-[#09090b] transition-[width] duration-300 lg:block ${collapsed ? "w-20" : "w-[18.75rem]"}`}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto px-3 py-4">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between gap-3 px-2"}`}>
          {!collapsed && (
            <Link href="/" className="min-w-0">
              <span className="block truncate text-xl font-semibold tracking-[-.035em] text-white">AlgoCraft</span>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[.16em] text-zinc-500">{courseLabel}</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand course sidebar" : "Collapse course sidebar"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/[.10] bg-white/[.035] text-zinc-400 transition hover:border-white/[.18] hover:bg-white/[.07] hover:text-white"
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {collapsed ? (
          <nav className="mt-8 space-y-3" aria-label="Courses">
            <Link href="/dsa" title="DSA course" className={`grid h-11 place-items-center rounded-xl transition ${activeCourse === "dsa" ? "bg-indigo-500/15 text-indigo-200" : "text-zinc-500 hover:bg-white/[.06] hover:text-white"}`}><Code2 size={19} /></Link>
            <Link href="/system-design" title="System Design course" className={`grid h-11 place-items-center rounded-xl transition ${activeCourse === "system-design" ? "bg-cyan-400/10 text-cyan-200" : "text-zinc-500 hover:bg-white/[.06] hover:text-white"}`}><Layers3 size={19} /></Link>
          </nav>
        ) : activeCourse === "dsa" ? (
          <nav className="mt-8" aria-label="DSA topics">
            <p className="px-2 text-xs font-semibold uppercase tracking-[.14em] text-zinc-400">Learn</p>
            <div className="mt-3 space-y-1">
              {dsaCurriculum.map((topic) => {
                const TopicIcon = topicIcons[topic.title] || BookOpen;
                const isExpanded = expandedTopic === topic.title;
                const topicSlug = slugify(topic.title);
                const groups = getPatternGroups(topic);
                return (
                  <div key={topic.title}>
                    <div className={`flex items-center rounded-xl transition ${isExpanded ? "bg-white/[.055] text-white" : "text-zinc-300 hover:bg-white/[.055] hover:text-white"}`}>
                      <Link href={`/dsa/${topicSlug}?tab=concepts`} className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-[15px] font-medium tracking-[-.01em]">
                        <TopicIcon size={19} strokeWidth={1.8} className="shrink-0 text-zinc-400" />
                        <span className="truncate">{topic.title}</span>
                      </Link>
                      <button
                        onClick={() => setExpandedTopic(isExpanded ? null : topic.title)}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${topic.title}`}
                        className="mr-1 grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[.06] hover:text-white"
                      >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="ml-8 mb-2 mt-1 border-l border-white/[.08] pl-4 text-sm">
                        <Link href={`/dsa/${topicSlug}?tab=concepts`} className="block py-2 text-zinc-400 transition hover:text-indigo-200">Concepts</Link>
                        <div className="py-1">
                          <p className="py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-600">Patterns</p>
                          <div className="mt-1 space-y-0.5">
                            {groups.map((group) => {
                              const patternKey = `${topic.title}::${group.pattern}`;
                              const isPatternExpanded = expandedPattern === patternKey;
                              return (
                                <div key={patternKey}>
                                  <button
                                    onClick={() => setExpandedPattern(isPatternExpanded ? null : patternKey)}
                                    aria-label={`${isPatternExpanded ? "Collapse" : "Expand"} ${group.pattern} pattern`}
                                    className="flex w-full items-center gap-1.5 rounded-md py-1.5 text-left text-[13px] text-zinc-500 transition hover:bg-white/[.045] hover:text-zinc-200"
                                  >
                                    {isPatternExpanded ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />}
                                    <span className="truncate">{group.pattern}</span>
                                    <span className="ml-auto pr-2 text-[10px] text-zinc-600">{group.questions.length}</span>
                                  </button>
                                  {isPatternExpanded && (
                                    <div className="ml-4 border-l border-white/[.07] pl-3">
                                      {group.questions.map((question) => (
                                        <Link key={question.title} href={`/dsa/problems/${slugify(question.title)}`} className="block py-1.5 text-xs leading-5 text-zinc-500 transition hover:text-indigo-200">
                                          {question.title}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        ) : (
          <nav className="mt-8" aria-label="System design learning path">
            <p className="px-2 text-xs font-semibold uppercase tracking-[.14em] text-zinc-400">Learn</p>
            <div className="mt-3 space-y-1">
              {systemDesignCurriculum.map((module, index) => {
                const Icon = [BookOpen, Sigma, Layers3, Sparkles][index];
                const isExpanded = expandedTopic === module.title;
                return (
                  <div key={module.slug}>
                    <div className={`flex items-center rounded-xl transition ${isExpanded ? "bg-white/[.055] text-white" : "text-zinc-300 hover:bg-white/[.055] hover:text-white"}`}>
                      <Link href={`/system-design/${module.slug}`} className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-[15px] font-medium tracking-[-.01em]">
                        <Icon size={19} strokeWidth={1.8} className="shrink-0 text-zinc-400" />
                        <span className="truncate">{module.title}</span>
                      </Link>
                      <button
                        onClick={() => setExpandedTopic(isExpanded ? null : module.title)}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${module.title}`}
                        className="mr-1 grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[.06] hover:text-white"
                      >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="ml-10 mb-2 mt-1 border-l border-white/[.08] pl-4 text-sm">
                        {module.sections.map((section) => <Link key={section.title} href={`/system-design/${module.slug}#${slugify(section.title)}`} className="block py-1.5 text-zinc-500 transition hover:text-cyan-200">{section.title}</Link>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}

        {!collapsed && (
          <div className="mt-auto border-t border-white/[.08] px-2 pt-5">
            <Link href={activeCourse === "dsa" ? "/system-design" : "/dsa"} className="flex items-center gap-3 text-sm font-medium text-zinc-500 transition hover:text-white">
              {activeCourse === "dsa" ? <Layers3 size={17} /> : <Code2 size={17} />}
              Explore {activeCourse === "dsa" ? "System Design" : "DSA"}
              <ChevronRight size={16} className="ml-auto" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
