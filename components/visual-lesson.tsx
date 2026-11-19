import {ExampleDiagram} from "./example-diagram";
import {useState} from "react";
import {ArrowLeft,ArrowRight,Braces,Footprints,GitFork,Lightbulb} from "lucide-react";
import {lessonFor} from "@/content/visual-lessons";
import {GalaxySky} from "./galaxy";
import type {AtlasNode} from "@/content/atlas";

function Values({value}:{value:string}){
  let parsed:unknown;
  try{parsed=JSON.parse(value)}catch{/* Named inputs and operation sequences remain in their original notation. */}
  if(Array.isArray(parsed)&&parsed.length<=24&&parsed.every(x=>typeof x!=="object"||x===null))return <div className="value-cells">{parsed.map((v,i)=><code key={i}>{String(v)}</code>)}</div>;
  if(Array.isArray(parsed)&&parsed.length>0&&parsed.length<=7&&parsed.every(r=>Array.isArray(r)&&r.length<=8&&r.every(x=>typeof x!=="object")))return <div className="matrix-cells">{parsed.map((r,i)=><div key={i} className="value-cells">{r.map((v:unknown,j:number)=><code key={j}>{String(v)}</code>)}</div>)}</div>;
  return <code className="literal-value">{value}</code>
}
const traces:Record<string,string[][]>={
 "Reverse Linked List":[["∅ ←   1 → 2 → 3","Save node 2 before changing the first link."],["1 → ∅     2 → 3","Node 1 now heads the reversed prefix. Advance to 2."],["2 → 1 → ∅     3","Point 2 back to 1 and advance to 3."],["3 → 2 → 1 → ∅","Point 3 to 2. There is no next node, so return 3."]],
 "Valid Parentheses":[["([])   stack ∅","Read the brackets from left to right."],["( [   stack: ( [","Push each opening bracket."],["]   stack: (","The top is [. Pop that matching opening bracket."],[")   stack ∅","Pop (. The input and stack are both exhausted."]],
 "Merge Intervals":[["[1,3]  [2,6]  [8,10]","Sort intervals by start position."],["[1,6]  [8,10]","2 ≤ 3. Extend the active end from 3 to 6."],["[1,6]   →   [8,10]","8 > 6. Close the first interval and start the next."]],
 "Jump Game":[["[2,3,1,1,4]  reach 0","Start at index 0."],["index 0 + 2 → reach 2","Every position through index 2 is reachable."],["index 1 + 3 → reach 4","Index 1 was reachable. Its jump reaches the last index."]],
 "Longest Common Prefix":[["flower · flow · flight","Compare characters at matching positions."],["f → fl","The first two columns agree in all three strings."],["o · o · i","The third column differs. Return fl."]],
 "Sliding Window Maximum":[["[1,3,-1]  k=3","Store candidate indices in decreasing order of value."],["1 → removed by 3","The later, larger 3 dominates 1 in every future window containing both."],["3 · -1  → max 3","The front holds the maximum. Expire indices when they leave the window."]],
 "Last Stone Weight":[["8  7  4  2  1  1","Extract the two largest weights."],["8 − 7 = 1","Return 1 to the heap. The next largest pair is 4 and 2."],["4 − 2 = 2   →   2 − 1 = 1","Smash the largest pair after every insertion."],["1 − 1 = 0    final: 1","Discard the equal pair. One stone of weight 1 survives."]],
 "Subsets":[["[]","Start with an empty choice for input [1,2]."],["[]   [1]","Skip or take 1."],["[]  [2]  [1]  [1,2]","For each partial choice, skip or take 2. Every leaf is a subset."]],
 "Binary Tree Level Order Traversal":[["queue [3]","Use tree [3,9,20,null,null,15,7]."],["[3] → queue [9,20]","Process the one node in the first layer, then enqueue its children."],["[9,20] → queue [15,7]","Process exactly the second layer's original queue length."],["[[3],[9,20],[15,7]]","Drain the last layer. Each emitted group is one level."]],
 "Floor in BST":[["target 6   root 8","8 exceeds the target, so move left."],["node 4   best 4","4 is eligible. Move right to look for something closer."],["right child ∅   return 4","No larger eligible key exists on the search path."]],
 "Trie — Insert, Update, Search, Delete":[["root → c → a → r*","Insert car and mark r as a word ending."],["root → c → a → r* → t*","Insert cart by extending the shared prefix."],["root → c → a → r → t*","Deleting car clears its terminal mark. The t edge still serves cart."]],
 "Dijkstra's Algorithm":[["A:0   B:∞   C:∞","Start at A. Edges are A→B=5, A→C=1, C→B=2."],["A:0   B:5   C:1","Relax both outgoing edges of A."],["A:0   B:3   C:1","Settle C first. Going through C improves B from 5 to 1+2."],["A → C → B   cost 3","Settle B. Its earlier heap entry at cost 5 is stale."]],
 "Climbing Stairs":[["0 steps: 1   1 step: 1","Count the empty path as one way to climb zero stairs."],["2 steps: 1 + 1 = 2","Arrive at stair 2 from stair 0 or stair 1."],["3 steps: 2 + 1 = 3","At stair 3 the two preceding states are sufficient."]],
 "Spiral Matrix":[["1 2 3 / 4 5 6 / 7 8 9","Start with all four boundaries around the matrix."],["1 2 3  →  6 9","Traverse the top row, then the right column."],["8 7  →  4","Traverse the bottom and left edges and shrink the boundaries."],["5","The last unvisited cell is the center."]],
 "Merge Sort":[["[4,1,3,2]","Split into two halves."],["[4] [1]   [3] [2]","Single-element runs are sorted."],["[1,4]   [2,3]","Merge each pair, taking the smaller front value."],["[1,2,3,4]","Merge the two sorted runs."]],
 "Car Pooling":[["[2,1,5], [3,3,7]   capacity 4","Each trip adds passengers at pickup and removes them at drop-off."],["stop 1: +2 → aboard 2","Apply events in stop order."],["stop 3: +3 → aboard 5","Five passengers exceed capacity four. Return false."]],
 "LRU Cache":[["capacity 2   put A, put B","Order from least to most recently used: A, B."],["get A   →   B, A","Move A to the recent end."],["put C   →   A, C","Evict B at the least-recent end before inserting C."]],
 "Range Sum Query Mutable":[["[1,3,5]   sum 9","The root of the segment tree stores the full interval sum."],["update index 1: 3 → 2","Change one leaf. Its interval loses one."],["[1,2,5]   sum 8","Recompute only ancestors of the changed leaf."]],
 "Count Inversions":[["[2,4]   [1,3,5]","Count cross-inversions while merging these sorted halves."],["1 < 2   add 2","Both 2 and 4 precede and exceed 1."],["2 < 3   add 0","Emit 2. Only 4 remains on the left."],["3 < 4   add 1","The pair (4,3) brings the cross-inversion count to three."]],
 "Next Greater Element I":[["stream 1,3,4,2","Keep unresolved values on a decreasing stack."],["3 arrives   1 → 3","3 resolves the next-greater query for 1."],["4 arrives   3 → 4","4 resolves 3. Push 4, then push 2."],["4 → −1   2 → −1","No greater value appears to the right of either remaining entry."]],
 "Valid Palindrome":[["a b b a","Place one pointer at each end."],["a = a   → move inward","Both outer characters agree."],["b = b   → pointers cross","Every mirrored pair matched. Return true."]],
 "Palindrome Number":[["121 | 0","Start with the original digits and an empty reversed half."],["12 | 1","Move the last digit, 1, to the reversed half."],["1 | 12","Move the next digit, 2. The reversed half now includes the middle digit."],["1 = ⌊12 / 10⌋","Drop the middle digit. The remaining halves match, so return true."]],
 "Plus One":[["9 · 9   +1","Start at the units digit of 99."],["9 · 0   carry 1","9 + 1 is 10. Write zero and carry left."],["0 · 0   carry 1","The tens digit overflows too."],["1 · 0 · 0","Insert the final carry at the front."]],
 "Two Sum":[["[2, 7, 11, 15]   target 9","Start with an empty value-to-index map."],["2 → need 7","7 is absent. Store value 2 at index 0."],["7 → need 2","Find 2 in the map at index 0."],["[0, 1]","The stored index and the current index identify the pair."]],
 "Binary Search":[["[1, 3, 5, 7, 9]   target 7","The candidate interval spans indices 0 through 4."],["mid 2 → 5","5 is smaller than 7. Discard indices 0 through 2."],["mid 3 → 7","The midpoint value equals the target. Return index 3."]],
 "Number of 1 Bits":[["1011   count 0","Start with binary 1011."],["1010   count 1","Clear the rightmost one using n & (n−1)."],["1000   count 2","Clear the next set bit."],["0000   count 3","No bits remain. The original number had three ones."]]
};
function Example({text,topic}:{text:string;topic:string}){
 const examples=text.replace(/^Example:\s*/i,"").split(/\s+(?=Input:)/i);
 return <>{examples.map((example,i)=>{
  const [input,output]=example.replace(/^Input:\s*/i,"").split(/\s+Output(?: prefix| spans)?:\s*/i);
  return <div className="io-flow" key={i}><div><small>{output?"Input":"Example"}</small><Values value={input}/><ExampleDiagram value={input} topic={topic}/></div>{output&&<><ArrowRight size={18} className="io-arrow"/><div><small>Output</small><Values value={output}/></div></>}</div>
 })}</>
}
function methodSteps(text:string){return text.split(/(?<=[.!?])\s+(?=[A-Z])|;\s+(?=[a-zA-Z])/).filter(Boolean)}
export function VisualLesson({item}:{item:AtlasNode}){
 const data=lessonFor(item),trace=traces[item.title];
 const [frame,setFrame]=useState(0);
 const [stage,setStage]=useState(0);
 const stages=[{title:"Problem statement",icon:Braces},{title:"Brute force",icon:GitFork},{title:"Optimized approach",icon:Lightbulb}];
 const method=stage===1?data.brute:data.optimized;
 const steps=stage===2&&data.steps?.length?data.steps:methodSteps(method);
 const cost=stage===1?data.bruteCost:data.optimizedCost;
 return <article className="visual-lesson">
  <div className="question-constellation" aria-label="Question branches">
    <GalaxySky/><div className="question-origin"><i/>{item.title}</div>
    <div className="question-fork">{stages.map(({title,icon:Icon},i)=><button key={title} aria-pressed={stage===i} onClick={()=>setStage(i)}><Icon size={17}/><span>{title}</span></button>)}</div>
  </div>
  <section className={"lesson-stage method-"+(stage-1)} aria-live="polite"><h2>{stages[stage].title}</h2>
   {stage===0?<><p>{data.statement}</p><Example text={data.example} topic={item.lesson?.topic||item.progress?.[0]||""}/></>:<>
     {stage===2&&data.steps?.length?<p>{method}</p>:null}
     <ol className="step-chain">{steps.map((s,n)=><li key={n}><span>{String(n+1).padStart(2,"0")}</span>{s}</li>)}</ol>
     <div className="cost-row">{cost.split(/\s*\|\s*|\s+·\s+/).map((s,j)=><code key={j}>{s}</code>)}</div>
   </>}
   <div className="stage-nav">{stage>0&&<button onClick={()=>setStage(stage-1)}><ArrowLeft size={15}/>{stages[stage-1].title}</button>}{stage<2&&<button onClick={()=>setStage(stage+1)}>{stages[stage+1].title}<ArrowRight size={15}/></button>}</div>
  </section>
  {trace&&<section className="trace-card"><h2><Footprints size={18}/>Step through an example</h2><div aria-live="polite"><code>{trace[frame][0]}</code><p>{trace[frame][1]}</p></div><footer><button aria-label="Previous trace step" disabled={!frame} onClick={()=>setFrame(frame-1)}><ArrowLeft size={16}/></button><small>{frame+1} / {trace.length}</small><button aria-label="Next trace step" disabled={frame===trace.length-1} onClick={()=>setFrame(frame+1)}><ArrowRight size={16}/></button></footer></section>}
 </article>
}



