import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "@/components/link";
import { dsaCurriculum, getInterviewLists, slugify, type Difficulty } from "@/content/library";

const difficultyStyle: Record<Difficulty, string> = {
  Easy: "bg-emerald-400/10 text-emerald-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Hard: "bg-rose-400/10 text-rose-300",
};
type FilterTag = Difficulty | "Blind 75" | "LeetCode Top 150" | "Top 100 Must-Do";
const difficultyTags: Difficulty[] = ["Easy", "Medium", "Hard"];
const interviewTags: FilterTag[] = ["Blind 75", "LeetCode Top 150", "Top 100 Must-Do"];
const topicOptions = dsaCurriculum.map((topic) => topic.title);

export function ProblemExplorer() {
  const [query, setQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<FilterTag[]>([]);
  const [filterPickerOpen, setFilterPickerOpen] = useState(false);
  const totalProblems = dsaCurriculum.reduce((count, item) => count + item.questions.length, 0);
  const selectedCount = selectedTopics.length + selectedTags.length;

  const toggleTopic = (topic: string) => setSelectedTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  const toggleTag = (tag: FilterTag) => setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  const clearFilters = () => { setSelectedTopics([]); setSelectedTags([]); };
  const selectedDifficulties = selectedTags.filter((tag): tag is Difficulty => difficultyTags.includes(tag as Difficulty));
  const selectedLists = selectedTags.filter((tag) => interviewTags.includes(tag));

  const problems = useMemo(() => dsaCurriculum
    .flatMap((item) => item.questions.map((question) => ({ ...question, topic: item.title, lists: getInterviewLists(question.title, item.title) })))
    .filter((item) => {
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(item.topic);
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(item.difficulty);
      const matchesList = selectedLists.length === 0 || selectedLists.some((list) => item.lists.includes(list));
      const matchesSearch = `${item.title} ${item.topic} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      return matchesTopic && matchesDifficulty && matchesList && matchesSearch;
    }), [query, selectedTopics, selectedDifficulties, selectedLists]);

  return (
    <section className="mt-14 rounded-3xl border border-white/[.09] bg-white/[.02] p-5 md:p-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-indigo-300">Interview 300</p><h2 className="mt-2 text-2xl font-semibold">Find the next right problem.</h2><p className="mt-2 text-sm text-zinc-400">A finite, high-return set: core patterns first, then the variations that recur across broad interview lists and company preparation sources.</p></div><p className="text-sm text-zinc-500">Showing {problems.length} of {totalProblems} problems</p></div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <label className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-black/15 px-3"><Search size={17} className="text-zinc-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a problem or pattern" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600" /></label>
        <button onClick={() => setFilterPickerOpen((open) => !open)} aria-expanded={filterPickerOpen} className={`flex items-center justify-between gap-3 rounded-xl border px-3 text-left text-sm transition ${selectedCount ? "border-indigo-400/40 bg-indigo-500/10 text-indigo-100" : "border-white/[.08] bg-black/15 text-zinc-300 hover:bg-white/[.05]"}`}><span className="flex items-center gap-2"><SlidersHorizontal size={16} />{selectedCount ? `${selectedCount} filters selected` : "Topics, difficulty & lists"}</span><ChevronDown size={15} className={`transition ${filterPickerOpen ? "rotate-180" : ""}`} /></button>
      </div>
      <div className="relative mt-4">
        <div className="flex flex-wrap items-center gap-2">
          {selectedTopics.map((topic) => <button key={topic} onClick={() => toggleTopic(topic)} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-100">{topic}<X size={13} /></button>)}
          {selectedTags.map((tag) => <button key={tag} onClick={() => toggleTag(tag)} className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-100">{tag}<X size={13} /></button>)}
          {selectedCount > 0 && <button onClick={clearFilters} className="px-2 text-xs text-zinc-500 underline-offset-4 hover:text-white hover:underline">Clear all</button>}
        </div>
        {filterPickerOpen && (
          <div className="absolute left-0 top-3 z-20 w-full max-w-2xl rounded-2xl border border-white/[.12] bg-[#151518] p-4 shadow-2xl shadow-black/40">
            <div><p className="mb-2 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-500">Topics</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{topicOptions.map((topic) => <label key={topic} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${selectedTopics.includes(topic) ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100" : "border-white/[.08] text-zinc-400 hover:bg-white/[.06]"}`}><input type="checkbox" checked={selectedTopics.includes(topic)} onChange={() => toggleTopic(topic)} className="accent-cyan-500" /><span>{topic}</span>{selectedTopics.includes(topic) && <Check size={13} className="ml-auto" />}</label>)}</div></div>
            <div className="mt-4 border-t border-white/[.08] pt-4"><p className="mb-2 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-500">Difficulty</p><div className="grid grid-cols-3 gap-2">{difficultyTags.map((tag) => <label key={tag} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${selectedTags.includes(tag) ? "border-indigo-300/40 bg-indigo-400/15 text-indigo-100" : "border-white/[.08] text-zinc-400 hover:bg-white/[.06]"}`}><input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} className="accent-indigo-500" /><span>{tag}</span>{selectedTags.includes(tag) && <Check size={13} className="ml-auto" />}</label>)}</div></div>
            <div className="mt-4 border-t border-white/[.08] pt-4"><p className="mb-2 text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-500">Interview lists</p><div className="grid gap-2">{interviewTags.map((tag) => <label key={tag} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${selectedTags.includes(tag) ? "border-violet-300/40 bg-violet-400/15 text-violet-100" : "border-white/[.08] text-zinc-400 hover:bg-white/[.06]"}`}><input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} className="accent-violet-500" /><span>{tag}</span>{selectedTags.includes(tag) && <Check size={13} className="ml-auto" />}</label>)}</div></div>
            <p className="mt-4 text-[11px] leading-5 text-zinc-600">Multiple topics, difficulty levels, and interview lists use OR logic. Search applies to all active filters.</p>
          </div>
        )}
      </div>
      <div className="mt-6 divide-y divide-white/[.07] overflow-hidden rounded-2xl border border-white/[.08]">{problems.map((problem) => <Link key={`${problem.topic}-${problem.title}`} href={`/dsa/problems/${slugify(problem.title)}`} className="flex flex-wrap items-center gap-3 px-4 py-4 transition hover:bg-white/[.035]"><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{problem.title}</span><span className="mt-1 block text-xs text-zinc-500">{[problem.topic, ...problem.tags.filter((tag) => tag !== problem.topic)].filter((tag, index, values) => values.indexOf(tag) === index).join(" · ")}</span></span><span className={`rounded-full px-2.5 py-1 text-[11px] ${difficultyStyle[problem.difficulty]}`}>{problem.difficulty}</span>{problem.lists.map((item) => <span key={item} className="rounded-full border border-violet-300/25 bg-violet-400/10 px-2.5 py-1 text-[11px] text-violet-200">{item}</span>)}</Link>)}{!problems.length && <p className="p-8 text-center text-sm text-zinc-500">No problems match these filters.</p>}</div>
    </section>
  );
}
