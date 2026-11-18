import {useState} from "react";
import {ArrowLeft,ArrowRight,Braces,Footprints,GitFork,Lightbulb} from "lucide-react";
import {lessonFor} from "@/content/visual-lessons";
import type {AtlasNode} from "@/content/atlas";

function Values({value}:{value:string}){
  let parsed:unknown;
  try{parsed=JSON.parse(value)}catch{/* Named inputs and operation sequences remain in their original notation. */}
  if(Array.isArray(parsed)&&parsed.length<=24&&parsed.every(x=>typeof x!=="object"||x===null))return <div className="value-cells">{parsed.map((v,i)=><code key={i}>{String(v)}</code>)}</div>;
  if(Array.isArray(parsed)&&parsed.length>0&&parsed.length<=7&&parsed.every(r=>Array.isArray(r)&&r.length<=8&&r.every(x=>typeof x!=="object")))return <div className="matrix-cells">{parsed.map((r,i)=><div key={i} className="value-cells">{r.map((v:unknown,j:number)=><code key={j}>{String(v)}</code>)}</div>)}</div>;
  return <code className="literal-value">{value}</code>
}
const traces:Record<string,string[][]>={
 "Palindrome Number":[["121 | 0","Start with the original digits and an empty reversed half."],["12 | 1","Move the last digit, 1, to the reversed half."],["1 | 12","Move the next digit, 2. The reversed half now includes the middle digit."],["1 = ⌊12 / 10⌋","Drop the middle digit. The remaining halves match, so return true."]],
 "Plus One":[["9 · 9   +1","Start at the units digit of 99."],["9 · 0   carry 1","9 + 1 is 10. Write zero and carry left."],["0 · 0   carry 1","The tens digit overflows too."],["1 · 0 · 0","Insert the final carry at the front."]],
 "Two Sum":[["[2, 7, 11, 15]   target 9","Start with an empty value-to-index map."],["2 → need 7","7 is absent. Store value 2 at index 0."],["7 → need 2","Find 2 in the map at index 0."],["[0, 1]","The stored index and the current index identify the pair."]],
 "Binary Search":[["[1, 3, 5, 7, 9]   target 7","The candidate interval spans indices 0 through 4."],["mid 2 → 5","5 is smaller than 7. Discard indices 0 through 2."],["mid 3 → 7","The midpoint value equals the target. Return index 3."]],
 "Number of 1 Bits":[["1011   count 0","Start with binary 1011."],["1010   count 1","Clear the rightmost one using n & (n−1)."],["1000   count 2","Clear the next set bit."],["0000   count 3","No bits remain. The original number had three ones."]]
};
function Example({text}:{text:string}){
 const examples=text.replace(/^Example:\s*/i,"").split(/\s+(?=Input:)/i);
 return <>{examples.map((example,i)=>{
  const [input,output]=example.replace(/^Input:\s*/i,"").split(/\s+Output(?: prefix| spans)?:\s*/i);
  return <div className="io-flow" key={i}><div><small>{output?"Input":"Example"}</small><Values value={input}/></div>{output&&<><ArrowRight size={18} className="io-arrow"/><div><small>Output</small><Values value={output}/></div></>}</div>
 })}</>
}
function methodSteps(text:string){return text.split(/(?<=[.!?])\s+(?=[A-Z])|;\s+(?=[a-zA-Z])/).filter(Boolean)}
export function VisualLesson({item}:{item:AtlasNode}){
 const data=lessonFor(item),trace=traces[item.title];
 const [frame,setFrame]=useState(0);
 return <article className="visual-lesson">
  <section className="lesson-stage"><span className="stage-pin"><Braces size={17}/></span><h2>Problem statement</h2><p>{data.statement}</p><Example text={data.example}/></section>
  {([["Brute force",data.brute,data.bruteCost],["Optimized approach",data.optimized,data.optimizedCost]] as const).map(([title,body,cost],i)=>{
    const steps=i&&data.steps?.length?data.steps:methodSteps(body);
    return <section className={"lesson-stage method-"+i} key={title}><span className="stage-pin">{i?<Lightbulb size={18}/>:<GitFork size={18}/>}</span><h2>{title}</h2>{i===1&&data.steps?.length?<p>{body}</p>:null}
      <ol className="step-chain">{steps.map((s,n)=><li key={n}><span>{String(n+1).padStart(2,"0")}</span>{s}</li>)}</ol>
      <div className="cost-row">{cost.split(/\s*\|\s*|\s+·\s+/).map((s,j)=><code key={j}>{s}</code>)}</div>
    </section>
  })}
  {trace&&<section className="trace-card"><h2><Footprints size={18}/>Step through an example</h2><div aria-live="polite"><code>{trace[frame][0]}</code><p>{trace[frame][1]}</p></div><footer><button aria-label="Previous trace step" disabled={!frame} onClick={()=>setFrame(frame-1)}><ArrowLeft size={16}/></button><small>{frame+1} / {trace.length}</small><button aria-label="Next trace step" disabled={frame===trace.length-1} onClick={()=>setFrame(frame+1)}><ArrowRight size={16}/></button></footer></section>}
 </article>
}

