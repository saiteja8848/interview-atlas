import { useEffect, useState } from "react";
import { index, readerNodes, mapUrl } from "@/content/atlas";
import { Atlas } from "@/components/atlas";
import DsaDashboardPage from "@/app/dsa/dashboard/page";
import TopicPage from "@/app/dsa/[topic]/page";
import ProblemPage from "@/app/dsa/problems/[slug]/page";
import SystemDesignTopicPage from "@/app/system-design/[topic]/page";
import { NotFound } from "@/app/not-found";
import { ConceptGuide } from "@/components/concept-guide";

function currentLocation() { return { pathname: window.location.pathname, search: window.location.search }; }

export function App() {
  const [location, setLocation] = useState(currentLocation);
  useEffect(() => { const update = () => setLocation(currentLocation()); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const { pathname, search } = location;
  if (["/", "/dsa", "/dsa/handbook", "/system-design", "/library", "/practice"].includes(pathname)) return <Atlas pathname={pathname} search={search} />;
  if (pathname === "/dsa/dashboard") return <DsaDashboardPage />;
  const systemDesignTopic = pathname.match(/^\/system-design\/([^/]+)$/);
  if (systemDesignTopic) return <SystemDesignTopicPage topicSlug={decodeURIComponent(systemDesignTopic[1])} />;
  const problem = pathname.match(/^\/dsa\/(?:problems|questions)\/([^/]+)$/);
  if (problem) {
    const slug = decodeURIComponent(problem[1]);
    const item = readerNodes.get(slug);
    const entry = item && index.find(e => e.item === item);
    if (entry && new URLSearchParams(search).get("view") !== "solution") {
      const target = new URL(mapUrl(entry.subject,entry.path),window.location.origin);
      return <Atlas pathname={target.pathname} search={target.search}/>;
    }
    return <ProblemPage slug={slug} />;
  }
  const topic = pathname.match(/^\/dsa\/([^/]+)$/);
  if (topic) {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab === "patterns" || tab === "problems") return <TopicPage topicSlug={decodeURIComponent(topic[1])} tab="patterns" selectedPattern={params.get("pattern")} />;
    return <ConceptGuide topicSlug={decodeURIComponent(topic[1])} />;
  }
  return <NotFound />;
}



