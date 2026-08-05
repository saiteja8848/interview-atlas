import fs from "node:fs";
import path from "node:path";

const sourceRoot = process.env.DSA_REFERENCE_ROOT || "C:/Users/saite/AppData/Local/Temp/interview-atlas-dsa-reference/src/main/java";
const output = path.resolve("content/repository-solutions.ts");

const topicFor = (folder, base = "") => {
  const key = folder.toLowerCase();
  if (key.includes("bitwise")) return "Bitwise";
  if (key === "math") return "Math";
  if (key === "arrays" || key === "cyclicsort" || key === "prefix") return "Arrays";
  if (key === "binarysearch") return "Binary Search";
  if (key.includes("slidingwindow")) return "Sliding Window";
  if (key === "twopointers" || key === "fastandslowpointers") return "Two Pointers";
  if (key === "heaps") return "Heaps";
  if (key === "dynamicprogramming") return "Dynamic Programming";
  if (key === "trees" || key === "segmenttrees") return "Trees";
  if (key === "graphs") return "Graphs";
  if (key === "linkedlist") return "Linked Lists";
  if (key === "stack") return "Stack";
  if (key === "backtracking") return "Backtracking";
  if (key === "recursion") return "Recursion";
  if (key === "mergeintervals" || key === "greedy") return "Intervals & Greedy";
  if (key === "strings") return "Strings";
  return null;
};

const titleOverrides = {
  PascalsTriangle: "Pascal's Triangle",
  PascalsTriangle_I: "Pascal's Triangle II",
  SetMatrixToZeros: "Set Matrix Zeroes",
  FindTheIndexOfTheFirstOccurrenceInAString: "Find the Index of the First Occurrence in a String",
  LongestPalindromeLength: "Longest Palindrome Length",
  NQueens: "N-Queens",
  SudukoSolver: "Sudoku Solver",
  ValidSuduko: "Valid Sudoku",
  AddBinary: "Add Binary",
  NumberOfSetBits: "Number of 1 Bits",
  BitwiseANDRange: "Bitwise AND of Numbers Range",
  MissingNumberXor: "Missing Number XOR",
  SingleNumber_I: "Single Number",
  TwoSum_I: "Two Sum I",
  TwoSum_II: "Two Sum II",
  ThreeSum: "3Sum",
  CourseSchedule_I: "Course Schedule",
  MaximumDepthOfATree_BFS: "Maximum Depth of Binary Tree",
  WordBreak_I: "Word Break",
  MergeKSortedLists: "Merge k Sorted Lists",
  ValidParenthesis: "Valid Parentheses",
  LargestRectangleInAHistogram: "Largest Rectangle in Histogram",
  FindIndexOfFirstOccurenceOfString: "Find the Index of the First Occurrence in a String",
  FindAllAnagaramsInAString: "Find All Anagrams in a String",
};

const humanize = (base) => titleOverrides[base] || base
  .replace(/_II$/, " II")
  .replace(/_I$/, " I")
  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
  .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
  .replace(/_/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const easyNames = /^(Add Binary|Binary Search|Contains Duplicate|Find the Index|Implement Queue|Merge Two Sorted Lists|Palindrome Number|Plus One|Reverse Linked List|Single Number|Two Sum|Valid Anagram|Valid Parentheses|Valid Palindrome|Number of 1 Bits|Missing Number)$/i;
const hardNames = /(N-Queens|Regular Expression|Sudoku|Median of Two Sorted Arrays|Trapping Rain Water|Word Ladder|Alien Dictionary|Largest Rectangle|Serialize|Max Points|Minimum Window|Merge k|Count of Smaller)/i;
const difficultyFor = (title) => hardNames.test(title) ? "Hard" : easyNames.test(title) ? "Easy" : "Medium";
const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const files = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".java")) files.push(full);
  }
};
walk(sourceRoot);

const items = files.map((file) => {
  const relative = path.relative(sourceRoot, file).replaceAll("\\", "/");
  const folder = relative.split("/")[0];
  const base = path.basename(file, ".java");
  const topic = topicFor(folder, base);
  if (!topic) return null;
  const title = humanize(base);
  const key = `${topic}:${relative}`;
  const code = fs.readFileSync(file, "utf8").replace(/^package .*?;\s*/s, "").trim();
  return {
    key,
    title,
    slug: slugify(title),
    topic,
    difficulty: difficultyFor(title),
    tags: [topic, folder === "backtracking" || folder === "recursion" ? "Backtracking" : folder],
    description: `Practice ${title} using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.`,
    sourcePath: `src/main/java/${relative}`,
    sourceCode: code,
  };
}).filter((item) => item && /\w+\s+\w+\s*\([^;]*\)\s*\{/.test(item.sourceCode));

const content = `// Generated from the linked DSA repository. Keep this file data-only so the UI can load every Java reference solution.\nexport type RepositoryProblem = ${JSON.stringify({ key: "", title: "", slug: "", topic: "", difficulty: "Medium", tags: [""], description: "", sourcePath: "", sourceCode: "" }, null, 2).replace(/"/g, "")}\n`;

const json = JSON.stringify(items, null, 2);
const moduleText = `// Generated from the linked DSA repository. Do not hand-edit this data file.\nexport type RepositoryDifficulty = "Easy" | "Medium" | "Hard";\nexport type RepositoryProblem = { key: string; title: string; slug: string; topic: string; difficulty: RepositoryDifficulty; tags: string[]; description: string; sourcePath: string; sourceCode: string };\nexport const repositoryProblems: RepositoryProblem[] = ${json};\nexport const repositorySolutions: Record<string, string> = Object.fromEntries(repositoryProblems.map((problem) => [problem.key, problem.sourceCode]));\n`;
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, moduleText, "utf8");
console.log(`Generated ${items.length} repository-backed Java problems in ${output}`);
