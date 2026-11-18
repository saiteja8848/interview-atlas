import book from "./book-questions.json";
import { dsaCurriculum, slugify } from "./library";
import { systemDesignCurriculum } from "./system-design";

export type BookLesson = (typeof book)[number];
export type AtlasNode = {
  title: string;
  kind: string;
  children: AtlasNode[];
  description?: string;
  page?: number;
  href?: string;
  readerTitle?: string;
  lesson?: BookLesson;
  progress?: [string, string];
  notes?: string[];
};
const node = (title: string, kind: string, children: AtlasNode[] = []): AtlasNode => ({ title, kind, children });
const normalize = (s:string) => slugify(s.replace(/\s*\((?:LeetCode \d+|GFG)\)$/i,"")).replace(/-/g,"");
const aliases: Record<string,string> = {
  "BFS - I (Top-down Level order traversal)":"Binary Tree Level Order Traversal", "BFS - II (Bottom-up Level order traversal)":"Binary Tree Level Order Traversal II",
  "Average of Levels in a Binary Tree":"Average of Levels in Binary Tree","Cousins in a Binary Tree":"Cousins in Binary Tree",
  "Pre-Order Traversal":"Binary Tree Preorder Traversal","N-ary Tree Pre-order":"N-ary Tree Preorder Traversal",
  "Post-Order Traversal":"Binary Tree Postorder Traversal","N-ary Tree Post-order":"N-ary Tree Postorder Traversal","In-Order Traversal":"Binary Tree Inorder Traversal",
  "Left View of a Tree":"Left View of Binary Tree","Right View of a Tree":"Binary Tree Right Side View","Top View of a Tree":"Top View of Binary Tree",
  "Bottom View of a Tree":"Bottom View of Binary Tree","Bottom Left View of a Tree":"Find Bottom Left Tree Value","Zigzag Traversal":"Binary Tree Zigzag Level Order Traversal",
  "Convert Binary Search Tree to Sorted Doubly Linked List":"Convert BST to Sorted Doubly Linked List","Maximum Path Sum":"Binary Tree Maximum Path Sum",
  "Trim a Binary Search Tree":"Trim a BST","Serialize and Deserialize a Binary Tree":"Serialize and Deserialize Binary Tree",
  "Lowest Common Ancestor in BST":"Lowest Common Ancestor of BST","Lowest Common Ancestor in Binary Tree":"Lowest Common Ancestor of Binary Tree",
  "Implement Prefix Tree":"Implement Trie - Prefix Tree","Meeting Rooms I (LeetCode 252)":"Meeting Rooms",
  "Search X in sorted array":"Binary Search","First and last occurrence":"Find First and Last Position in Sorted Array",
  "Count Occurrences in a Sorted Array":"Count Occurrences in Sorted Array","Search in rotated sorted array-I":"Search in Rotated Sorted Array",
  "Find square root of a number":"Sqrt(x)","Find Nth root of a number":"Nth Root of an Integer","Find the smallest divisor":"Smallest Divisor Given a Threshold",
  "Book Allocation Problem":"Allocate Books","Median of 2 sorted arrays":"Median of Two Sorted Arrays","Kth element of 2 sorted arrays":"Kth Element of Two Sorted Arrays",
  "Search in a 2D matrix":"Search a 2D Matrix","Search in 2D matrix - II":"Search a 2D Matrix II","Find Peak Element - II":"Find a Peak Element II",
  "Check if Number Is Odd or Even":"Odd or Even Using Bits",
  "Check if Number Is Power of Two":"Power of Two",
  "Number of 1 Bits (Hamming Weight)":"Number of 1 Bits",
  "Subsets (Power Set)":"Subsets", "Power Set Using Bit Masks":"Power Set Using Bits",
  "Swap Two Numbers Using XOR":"Swap Two Numbers Without Third Variable", "Maximum XOR Subset":"Maximum Subset XOR",
  "XOR of Numbers in a Given Range":"XOR of 1 to N / XOR Range","Divide Two Integers Without Multiplication":"Divide Two Integers",
  "Power (x, n) Fast Exponentiation":"Pow(x, n)","Square Without Multiplication":"Square Without *, /, pow()"
};
export const handbook=node("DSA handbook","Subject");
export const practice=node("Additional practice","Collection");
function branch(parent:AtlasNode,title:string,kind:string) {
  const found=parent.children.find(c=>c.title===title);
  if(found)return found;
  const child=node(title,kind);
  parent.children.push(child);
  return child;
}
const bookNodes=new Map<string,AtlasNode[]>();
for(const lesson of book){
  const chapter=branch(handbook,lesson.topic,"Chapter");
  const pattern=branch(chapter,lesson.pattern,"Pattern");
  const question:AtlasNode={...node(lesson.title,"Question"),description:lesson.description,page:lesson.page,lesson,progress:[lesson.topic,lesson.title]};
  pattern.children.push(question);
  const key=normalize(lesson.title);
  bookNodes.set(key,[...(bookNodes.get(key)||[]),question]);
}
export const readerNodes=new Map<string,AtlasNode>();
for(const topic of dsaCurriculum)for(const q of topic.questions){
  const href="/dsa/problems/"+slugify(q.title);
  const matches=bookNodes.get(normalize(aliases[q.title]||q.title));
  if(matches){
    for(const match of matches){
      if(!match.href||match.title===q.title){
        match.href=href;match.readerTitle=q.title;match.progress=[topic.title,q.title];
      }
    }
    readerNodes.set(slugify(q.title),matches[0]);
  }else{
    const group=branch(practice,topic.title,"Topic");
    const pattern=branch(group,q.tags.find(tag=>topic.patterns.includes(tag))||"Practice","Pattern");
    const item:AtlasNode={...node(q.title,"Question"),description:q.description,readerTitle:q.title,href,progress:[topic.title,q.title]};
    pattern.children.push(item);readerNodes.set(slugify(q.title),item);
  }
}
const chapters = new Map(handbook.children.map(c => [c.title, c]));
function chapter(title: string) {
  const result = chapters.get(title);
  if (!result) throw new Error("Missing handbook chapter " + title);
  return result;
}
function structure(title: string, description: string, children: AtlasNode[]): AtlasNode {
  return {...node(title, "Structure", children), description};
}
function selectedPatterns(title: string, names: string[]) {
  return chapter(title).children.filter(p => names.includes(p.title));
}
// A handbook question can appear in more than one structure. Reuse its lesson and progress key.
function chapterSelection(title:string, keep:(pattern:AtlasNode)=>AtlasNode[]) {
  const source=chapter(title);
  const patterns=source.children.map(p=>({...p,children:keep(p)})).filter(p=>p.children.length);
  return {...source,children:patterns};
}
const arrayMath = chapterSelection("Math", p=>p.children.filter(q=>["Plus One","Pascal's Triangle","Max Points on a Line"].includes(q.title)));
const arrayBits = chapterSelection("Bit Manipulation", p=>p.children.filter(q=>["Counting Bits","Single Number","Single Number II","Single Number III","Missing Number","Maximum Subset XOR","Power Set Using Bits"].includes(q.title)));
const arrayRecursion = chapterSelection("Recursion / Backtracking", p=>["Take / Skip","Multiple Choices Per Level","Grid Backtracking","Partition Backtracking"].includes(p.title)?p.children:[]);
const arrays = structure("Arrays", "Indexed sequences, strings, matrices, and the patterns that operate on them.", [arrayMath,arrayBits,...handbook.children.filter(c => [
  "Arrays / Hashing", "Binary Search", "Two Pointers", "Sliding Window", "Intervals", "Greedy", "Strings",
  "Dynamic Programming", "Matrix / Grid", "Divide and Conquer", "Sweep Line / Difference Array"
].includes(c.title)),arrayRecursion,chapterSelection("Design Data Structures",p=>p.title==="HashMap + Array"?p.children:[])].sort((a,b)=>handbook.children.findIndex(c=>c.title===a.title)-handbook.children.findIndex(c=>c.title===b.title)));
const lists = structure("Linked Lists", "Follow links between nodes, then explore reversal, merging, and pointer patterns.", [...chapter("Linked Lists").children,...selectedPatterns("Design Data Structures",["HashMap + Doubly Linked List","HashMap + Frequency Lists"])]);
const stacks = structure("Stacks", "Work from the top of the stack through matching, evaluation, and monotonic boundaries.", [
  ...chapter("Stack").children, chapter("Monotonic Stack"),
]);
const queues = structure("Queues", "Follow arrival order through queues, deques, windows, and breadth-first traversal.", [
  ...selectedPatterns("Stack", ["Stack / Queue Conversion","Stack / Queue"]),
  ...selectedPatterns("Sliding Window", ["Monotonic Window"]),
  ...selectedPatterns("Trees", ["BFS / Level Order"]),
  ...selectedPatterns("Graphs", ["BFS / Unweighted Shortest Path","Multi-source BFS"]),
  ...practice.children.filter(c=>c.title==="Queue").map(c=>node("Queue practice","Collection",c.children)),
].sort((a,b)=>(a.children[0]?.page??Infinity)-(b.children[0]?.page??Infinity)));
const heaps = structure("Heaps", "Explore a tree ordered by priority, from top-k selection to scheduling.", chapter("Heap / Priority Queue").children);
const trees = structure("Trees", "Trace parent–child links, ordered searches, and range queries.", [
  ...chapter("Trees").children, chapter("Binary Search Tree"), chapter("Segment Tree / Fenwick Tree"),
]);
const tries = structure("Tries", "Walk a shared prefix one character at a time.", chapter("Trie").children);
const graphs = structure("Graphs", "Follow edges between vertices to explore connectivity, dependencies, and paths.", chapter("Graphs").children);
export const dsa=node("DSA","Subject",[
  {...node("Linear","Family",[arrays,lists,stacks,queues]),description:"Explore structures that arrange elements in a sequence."},
  {...node("Non-linear","Family",[heaps,trees,tries,graphs]),description:"Explore hierarchical structures and networks of connected nodes."},
]);
export const design = node("System Design","Subject",systemDesignCurriculum.map(m=>({
  ...node(m.title,"Module",m.sections.map(s=>({
    ...node(s.title,"Section",s.items.map(i=>({...node(i.title,"Concept"),description:i.meaning,notes:[...i.techniques,...(i.components||[])]}))),description:s.description
  }))),description:m.intro
})));
export type Entry = {item:AtlasNode; path:string[]; subject:string};
function entries(item:AtlasNode,subject:string,path:string[]=[]): Entry[] {
  return [{item,subject,path},...item.children.flatMap(c=>entries(c,subject,[...path,c.title]))];
}
const catalog = [...entries(handbook,"dsa/handbook"),...entries(practice,"practice"),...entries(design,"system-design")];
export const index = [...catalog,...entries(dsa,"dsa").filter(e=>e.item.kind==="Family"||e.item.kind==="Structure")];
export const questionsIndex = catalog.filter(e=>e.item.kind==="Question");
export const mapUrl = (subject:string,path:string[]) => "/"+subject+(path.length?"?"+new URLSearchParams(path.map(p=>["node",p])).toString():"");



