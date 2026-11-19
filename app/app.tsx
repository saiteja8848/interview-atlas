import { useEffect, useState } from "react";
import { index, readerNodes, mapUrl } from "@/content/atlas";
import { Atlas } from "@/components/atlas";
import DsaDashboardPage from "@/app/dsa/dashboard/page";
import TopicPage from "@/app/dsa/[topic]/page";
import ProblemPage from "@/app/dsa/problems/[slug]/page";
import { systemDesignCurriculum } from "@/content/system-design";
import { NotFound } from "@/app/not-found";
import { ConceptGuide } from "@/components/concept-guide";

function currentLocation() { return { pathname: window.location.pathname, search: window.location.search }; }

export function App() {
  const [location, setLocation] = useState(currentLocation);
  useEffect(() => { const update = () => setLocation(currentLocation()); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const { pathname, search } = location;
  if (["/", "/dsa", "/dsa/handbook", "/dsa/topics", "/system-design", "/library", "/practice"].includes(pathname)) return <Atlas pathname={pathname} search={search} />;
  if (pathname === "/dsa/dashboard") return <Atlas pathname={pathname} search={search}><DsaDashboardPage /></Atlas>;
  const systemDesignTopic = pathname.match(/^\/system-design\/([^/]+)$/);
  if (systemDesignTopic) {
    const module=systemDesignCurriculum.find(m=>m.slug===decodeURIComponent(systemDesignTopic[1]));
    return module ? <Atlas pathname="/system-design" search={new URLSearchParams({node:module.title}).toString()}/> : <NotFound/>;
  }
  const problem = pathname.match(/^\/dsa\/(?:problems|questions)\/([^/]+)$/);
  if (problem) {
    const slug = decodeURIComponent(problem[1]);
    const item = readerNodes.get(slug);
    const entry = item && index.find(e => e.item === item);
    if (entry && new URLSearchParams(search).get("view") !== "solution") {
      const target = new URL(mapUrl(entry.subject,entry.path),window.location.origin);
      return <Atlas pathname={target.pathname} search={target.search}/>;
    }
    return <Atlas pathname={pathname} search={search}><ProblemPage slug={slug} /></Atlas>;
  }
  const topic = pathname.match(/^\/dsa\/([^/]+)$/);
  if (topic) {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab === "patterns" || tab === "problems") return <Atlas pathname={pathname} search={search}><TopicPage topicSlug={decodeURIComponent(topic[1])} tab="patterns" selectedPattern={params.get("pattern")} /></Atlas>;
    return <Atlas pathname={pathname} search={search}><ConceptGuide topicSlug={decodeURIComponent(topic[1])} /></Atlas>;
  }
  return <Atlas pathname={pathname} search={search}><NotFound /></Atlas>;
}





