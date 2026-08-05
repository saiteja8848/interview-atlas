import { useEffect, useState } from "react";
import HomePage from "@/app/page";
import DsaPage from "@/app/dsa/page";
import TopicPage from "@/app/dsa/[topic]/page";
import ProblemPage from "@/app/dsa/problems/[slug]/page";
import SystemDesignPage from "@/app/system-design/page";
import SystemDesignTopicPage from "@/app/system-design/[topic]/page";
import { NotFound } from "@/app/not-found";
import { ConceptGuide } from "@/components/concept-guide";

function currentLocation() { return { pathname: window.location.pathname, search: window.location.search }; }

export function App() {
  const [location, setLocation] = useState(currentLocation);
  useEffect(() => { const update = () => setLocation(currentLocation()); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const { pathname, search } = location;
  if (pathname === "/") return <HomePage />;
  if (pathname === "/dsa") return <DsaPage />;
  if (pathname === "/system-design") return <SystemDesignPage />;
  const systemDesignTopic = pathname.match(/^\/system-design\/([^/]+)$/);
  if (systemDesignTopic) return <SystemDesignTopicPage topicSlug={decodeURIComponent(systemDesignTopic[1])} />;
  const problem = pathname.match(/^\/dsa\/problems\/([^/]+)$/);
  if (problem) return <ProblemPage slug={decodeURIComponent(problem[1])} />;
  const question = pathname.match(/^\/dsa\/questions\/([^/]+)$/);
  if (question) return <ProblemPage slug={decodeURIComponent(question[1])} />;
  const topic = pathname.match(/^\/dsa\/([^/]+)$/);
  if (topic) {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab === "patterns" || tab === "problems") return <TopicPage topicSlug={decodeURIComponent(topic[1])} tab="patterns" selectedPattern={params.get("pattern")} />;
    return <ConceptGuide topicSlug={decodeURIComponent(topic[1])} />;
  }
  return <NotFound />;
}
