import { GalaxyFocus } from "./galaxy";
import "@/app/galaxy.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Network, Waypoints, Database, Code2, Search, ChevronRight, BookOpen, ArrowUpRight, ListTree, Map, CircleCheck, Menu, X, PanelLeft, Library, CornerDownRight } from "lucide-react";
import { Link } from "./link";
import { design, dsa, handbook, topics, practice, index, mapUrl, questionsIndex, type AtlasNode } from "@/content/atlas";
import { getCompletedQuestionKeys, getQuestionProgressKey, toggleQuestionCompletion } from "@/content/dsa-progress";
import "@/app/atlas.css";
import "@/app/study-map.css";
import { ResponsiveMap } from "./responsive-map";
import { VisualLesson } from "./visual-lesson";
import { hasCodeReader } from "@/content/visual-lessons";

export function Atlas({pathname,search,children}:{pathname:string;search:string;children?:ReactNode}){
  const names = new URLSearchParams(search).getAll("node").filter((name,i)=>i!==0||!["Foundations","Data structures","Algorithmic patterns","Trees & graphs"].includes(name));
  const legacyChapter = pathname==="/dsa" && handbook.children.some(c=>c.title===names[0]);
  const subject = pathname==="/dsa/topics"?"dsa/topics":pathname==="/dsa/handbook" || legacyChapter ? "dsa/handbook" : pathname==="/system-design" ? "system-design" : pathname==="/practice" ? "practice" : "dsa";
  const system=subject==="system-design", inBook=subject==="dsa/handbook", inTopics=subject==="dsa/topics", library=pathname==="/library";
  const root=system?design:inTopics?topics:inBook?handbook:subject==="practice"?practice:dsa;
  const path:string[]=[];
  let item=root;
  for(const name of names){const next=item.children.find(x=>x.title===name);if(!next)break;item=next;path.push(name)}
  const [outline,setOutline]=useState(false),[mobile,setMobile]=useState(false),[term,setTerm]=useState(""),[find,setFind]=useState(false),[done,setDone]=useState(getCompletedQuestionKeys);
  const galaxy=!library&&item.children.length>0;
  const [focused,setFocused]=useState(false);
  useEffect(()=>{
    if(!galaxy){setFocused(false);return}
    const escape=(e:KeyboardEvent)=>{if(e.key==="Escape")setFocused(false)};
    window.addEventListener("keydown",escape);return ()=>window.removeEventListener("keydown",escape);
  },[galaxy]);
  const searchRef=useRef<HTMLInputElement>(null);
  useEffect(()=>{setMobile(false);setFind(false);setTerm("");setDone(getCompletedQuestionKeys());},[pathname,search]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();setFind(true)}if(e.key==="Escape"){setFind(false);setMobile(false)}};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[]);
  useEffect(()=>{if(find)searchRef.current?.focus()},[find]);
  const topicNumber=inTopics&&path.length===1?topics.children.indexOf(item):-1;
  const results=(library&&!find?questionsIndex:index).filter(e=>e.item.title.toLowerCase().includes(term.trim().toLowerCase()));
  const total=new Set(questionsIndex.map(e=>getQuestionProgressKey(...e.item.progress!)));
  const finished=[...done].filter(k=>total.has(k)).length;
  const short=inTopics?"Topics":inBook?"Handbook":system?"System Design":subject==="practice"?"Additional practice":"DSA", title=library?"Question library":path.length?item.title:inTopics?"Topic by topic":inBook?"DSA handbook":system?"System Design":subject==="practice"?"Additional practice":"DSA galaxy";
  const toggle=()=>{if(item.progress){toggleQuestionCompletion(...item.progress);setDone(getCompletedQuestionKeys())}};
  const resultLinks=(limit:number)=>results.slice(0,limit).map(e=><Link key={mapUrl(e.subject,e.path)} href={mapUrl(e.subject,e.path)}><div><b>{e.item.title}</b><small>{[e.subject.startsWith("dsa")?"DSA":e.subject==="practice"?"Practice":"System Design",...e.path.slice(0,-1)].join(" / ")}</small></div><ChevronRight size={16}/></Link>);
  return <div className={"atlas atlas-galaxy"+(galaxy&&focused?" galaxy-focused":"")}>
  {mobile&&<button className="side-overlay" aria-label="Close navigation" onClick={()=>setMobile(false)}/>}
  <aside id="atlas-nav" className={mobile?"atlas-side shown":"atlas-side"}><Link className="brand" href="/"><span><Waypoints size={24}/></span>AlgoCraft<span className="brand-dot">.</span></Link>
  <div className="side-label">Workspace</div>
  <Link className={"side-link "+(!library?"selected":"")} href={inBook?"/dsa":mapUrl(subject,[])}><Network/>Mind maps</Link>
  <Link className={"side-link "+(library?"selected":"")} href="/library"><Library/>Question library</Link>
  <div className="side-label subjects">Subjects</div>
  <Link className={"side-link "+(!library&&subject==="dsa"?"active-sub":"")} href="/dsa"><span className="subject-mark teal"><Code2/></span>DSA</Link>
  <Link className={"side-link "+(!library&&system?"active-sub":"")} href="/system-design"><span className="subject-mark blue"><Database/></span>System Design</Link>
  <Link className={"side-link "+(subject==="practice"?"selected":"")} href="/practice"><span className="subject-mark teal"><BookOpen/></span>Additional practice</Link><div className="side-label subjects">Reference</div><Link className={"side-link "+(inTopics?"selected":"")} href="/dsa/topics"><Network/>Topic by topic</Link><Link className={"side-link "+(inBook?"selected":"")} href="/dsa/handbook"><BookOpen/>Handbook order</Link><div className="side-bottom"><Link href="/dsa/dashboard"><CircleCheck size={16}/><b>Study progress</b></Link><p>{finished} of {total.size} questions</p><progress value={finished} max={total.size}/></div>
  </aside><main className="atlas-main"><header className="atlas-top"><button className="menu-toggle" aria-expanded={mobile} aria-controls="atlas-nav" aria-label="Open navigation" onClick={()=>setMobile(true)}><Menu/></button><PanelLeft size={16} className="desk-icon"/><span>Workspace</span><ChevronRight size={13}/><b>{library?"Question library":"Mind maps"}</b><button className="search-trigger" onClick={()=>setFind(true)}><Search size={15}/> Search atlas <kbd>Ctrl K</kbd></button></header>
  {children?<div className="atlas-legacy">{children}</div>:<div className="atlas-content"><div className="eyebrow"><span/> {library?"PRACTICE LIBRARY":"KNOWLEDGE ATLAS"}</div>
  <div className="title-row"><h1>{title}</h1>{!library&&item.children.length>0&&<div className="map-actions">{galaxy&&<GalaxyFocus active={focused} toggle={()=>setFocused(v=>!v)}/>}<div className="view-switch"><button className={!outline?"on":""} onClick={()=>setOutline(false)}><Map size={15}/>Map</button><button className={outline?"on":""} onClick={()=>setOutline(true)}><ListTree size={15}/>Outline</button></div></div>}</div>
  {item.kind!=="Question"&&<p className="atlas-intro">{library?"Browse the questions in your DSA study map.":path.length?item.description||"Follow a branch to explore its "+(item.children[0]?.kind.toLowerCase()||"study note")+"s.":system?"Explore architecture concepts, techniques, and components by module.":subject==="practice"?"Explore additional questions from the course library.":inTopics?"Explore the revision patterns in the PDF and follow each question to its worked example.":inBook?"Browse all 24 chapters in the original PDF order.":"Choose a structure to follow its patterns and worked examples."}</p>}
  {subject==="dsa"&&!library&&!path.length&&<div className="topic-entry"><Link href="/dsa/topics"><BookOpen size={15}/>Explore PDF topics<ChevronRight size={15}/></Link></div>}{library?<section className="library-card"><label><Search size={17}/><input aria-label="Filter questions" placeholder="Filter questions by title…" value={term} onChange={e=>setTerm(e.target.value)}/></label><small>{results.length} question entries</small><div className="result-list">{resultLinks(results.length)}</div></section>:<>
  <nav className="map-trail"><Link href={mapUrl(subject,[])}><Network size={14}/>{short}</Link>{path.map((p,i)=><span key={i}><ChevronRight size={12}/><Link href={mapUrl(subject,path.slice(0,i+1))}>{p}</Link></span>)}{!path.length&&<><ChevronRight size={12}/><span>Overview</span></>}</nav>
  {item.children.length>0?<><ResponsiveMap key={mapUrl(subject,path)} {...{item,subject,path,outline}}/><div className="map-hint"><CornerDownRight size={14}/>Select a node to explore its branch.</div></>:<div>{item.kind==="Question"&&<VisualLesson key={item.title} item={item}/>}<section className="detail">{item.kind==="Study note"&&item.outlinePage&&item.outlinePage<=8&&<a className="source-figure" href={"/dsa-handbook.pdf#page="+item.outlinePage} target="_blank" rel="noreferrer"><img src={"/handbook-figures/page-"+item.outlinePage+".webp"} alt={item.title+" diagram from the DSA handbook"}/></a>}{item.outlinePage&&<a href={"/dsa-handbook.pdf#page="+item.outlinePage} target="_blank" rel="noreferrer"><BookOpen size={17}/>Topic notes · p. {item.outlinePage}<ArrowUpRight size={15}/></a>}{item.page&&<a href={"/dsa-handbook.pdf#page="+item.page} target="_blank" rel="noreferrer"><BookOpen size={17}/> Read handbook page {item.page}<ArrowUpRight size={15}/></a>}{item.href&&hasCodeReader(item)&&<Link href={item.href+"?view=solution"}><Code2 size={17}/>Open solution reader<ChevronRight size={15}/></Link>}{item.notes&&<ul>{item.notes.map((n,i)=><li key={i}>{n}</li>)}</ul>}{item.progress&&<button onClick={toggle}><CircleCheck size={17}/>{done.has(getQuestionProgressKey(...item.progress))?"Completed":"Mark complete"}</button>}</section></div>}
  </>}{topicNumber>=0&&<nav className="topic-sequence" aria-label="Topic sequence">{topicNumber>0&&<Link href={mapUrl(subject,[topics.children[topicNumber-1].title])}>← {topics.children[topicNumber-1].title}</Link>}<small>{topicNumber+1} / {topics.children.length}</small>{topicNumber+1<topics.children.length&&<Link href={mapUrl(subject,[topics.children[topicNumber+1].title])}>{topics.children[topicNumber+1].title} →</Link>}</nav>}</div>}</main>
  {find&&<div className="search-shade" onClick={()=>setFind(false)}><section role="dialog" aria-label="Search atlas" aria-modal="true" className="search-box" onClick={e=>e.stopPropagation()}><label><Search size={17}/><input ref={searchRef} value={term} placeholder="Search subjects, topics, and questions…" onChange={e=>setTerm(e.target.value)}/><button aria-label="Close search" onClick={()=>setFind(false)}><X size={17}/></button></label><div className="result-list" onClick={()=>setFind(false)}>{resultLinks(50)}{!results.length&&<p>No matches for “{term}”.</p>}</div></section></div>}
  </div>
}








