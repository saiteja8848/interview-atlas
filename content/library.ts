import { repositoryProblems, repositorySolutions } from "@/content/repository-solutions";
import { problemVideos } from "@/content/video-library";
import { interview300Topics } from "@/content/interview-300";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type CodeLanguage = "Java" | "Python" | "JavaScript" | "C++";
export type Solution = { title: string; summary: string; complexity: string; code: Record<CodeLanguage, string> };
export type Question = { slug: string; title: string; difficulty: Difficulty; topic: string; pattern: string; description: string; example: string; constraints: string[]; solutions: Solution[]; similar: string[] };

const twoSum: Question = {
  slug: "two-sum", title: "Two Sum", difficulty: "Easy", topic: "Arrays", pattern: "Hash Map",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
  example: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9.",
  constraints: ["2 ≤ nums.length ≤ 10⁴", "−10⁹ ≤ nums[i], target ≤ 10⁹", "Exactly one valid answer exists."],
  solutions: [
    { title: "Brute force", summary: "Try every pair of values. It is the clearest way to establish correctness, but repeated work makes it slow for larger inputs.", complexity: "Time O(n²) · Space O(1)", code: {
      Java: "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++)\n      for (int j = i + 1; j < nums.length; j++)\n        if (nums[i] + nums[j] == target) return new int[]{i, j};\n    return new int[]{};\n  }\n}",
      Python: "class Solution:\n  def twoSum(self, nums, target):\n    for i in range(len(nums)):\n      for j in range(i + 1, len(nums)):\n        if nums[i] + nums[j] == target:\n          return [i, j]",
      JavaScript: "function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++)\n    for (let j = i + 1; j < nums.length; j++)\n      if (nums[i] + nums[j] === target) return [i, j];\n}",
      "C++": "vector<int> twoSum(vector<int>& nums, int target) {\n  for (int i = 0; i < nums.size(); i++)\n    for (int j = i + 1; j < nums.size(); j++)\n      if (nums[i] + nums[j] == target) return {i, j};\n  return {};\n}"
    }},
    { title: "Optimal · Hash map", summary: "As you scan left to right, store each number's index. For the current value, look up its complement (target − value). If it is already stored, the pair is found.", complexity: "Time O(n) · Space O(n)", code: {
      Java: "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n      int need = target - nums[i];\n      if (seen.containsKey(need)) return new int[]{seen.get(need), i};\n      seen.put(nums[i], i);\n    }\n    return new int[]{};\n  }\n}",
      Python: "class Solution:\n  def twoSum(self, nums, target):\n    seen = {}\n    for i, value in enumerate(nums):\n      need = target - value\n      if need in seen: return [seen[need], i]\n      seen[value] = i",
      JavaScript: "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}",
      "C++": "vector<int> twoSum(vector<int>& nums, int target) {\n  unordered_map<int, int> seen;\n  for (int i = 0; i < nums.size(); i++) {\n    int need = target - nums[i];\n    if (seen.count(need)) return {seen[need], i};\n    seen[nums[i]] = i;\n  }\n  return {};\n}"
    }}
  ], similar: ["Contains Duplicate", "Two Sum II", "3Sum", "Subarray Sum Equals K"]
};

export const questions = [twoSum];
export const dsaTopics = [
  "Bitwise", "Heaps", "Arrays (1D, 2D, Strings)", "Linked Lists", "Stacks", "Queues",
  "Recursion & Backtracking", "Trees", "Graphs"
];
export const dsaCourseSections = [
  { title: "Bitwise", items: ["Concepts", "Patterns & Questions"] },
  { title: "Heaps", items: [] },
  { title: "Arrays", items: ["1D Arrays", "2D Arrays"] },
  { title: "Linked Lists", items: [] },
  { title: "Stack", items: [] },
  { title: "Queue", items: [] },
  { title: "Recursion", items: [] },
  { title: "Backtracking", items: [] },
  { title: "Dynamic Programming", items: [] },
  { title: "Trees", items: [] },
  { title: "Graphs", items: [] }
];
export type CurriculumQuestion = { title: string; difficulty: Difficulty; tags: string[]; description: string; slug?: string; repositoryKey?: string };
export type CurriculumTopic = { title: string; concepts: string[]; patterns: string[]; questions: CurriculumQuestion[] };
export type PatternGroup = { pattern: string; questions: CurriculumQuestion[] };
export const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export function getPatternGroups(topic: CurriculumTopic): PatternGroup[] {
  const groups = new Map(topic.patterns.map(pattern => [pattern, [] as CurriculumQuestion[]]));
  topic.questions.forEach((question, index) => {
    const taggedQuestion = { ...question, tags: [...question.tags, ...getInterviewLists(question.title, topic.title)] };
    const matches = topic.patterns.filter(pattern => question.tags.some(tag => tag.toLowerCase() === pattern.toLowerCase()));
    if (topic.title === "Dynamic Programming" && matches.length) {
      matches.forEach(pattern => groups.get(pattern)?.push(taggedQuestion));
      return;
    }
    const match = matches[0] || topic.patterns.find(pattern => question.tags.some(tag => tag.toLowerCase().includes(pattern.toLowerCase()) || pattern.toLowerCase().includes(tag.toLowerCase())));
    const pattern = match || topic.patterns[index % Math.max(topic.patterns.length, 1)];
    if (pattern) groups.get(pattern)?.push(taggedQuestion);
  });
  topic.patterns.forEach((pattern, index) => {
    const bucket = groups.get(pattern);
    if (bucket && bucket.length === 0 && topic.questions.length) {
      const question = topic.questions[index % topic.questions.length];
      bucket.push({ ...question, tags: [...question.tags, ...getInterviewLists(question.title, topic.title)] });
    }
  });
  return topic.patterns.map(pattern => ({ pattern, questions: groups.get(pattern) || [] }));
}
const blind75Canonical = [
  "Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate", "Product of Array Except Self", "Maximum Subarray", "Maximum Product Subarray", "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array", "3Sum", "Container With Most Water",
  "Binary Search", "Valid Parentheses", "Merge Intervals", "Insert Interval", "Non-overlapping Intervals", "Meeting Rooms", "Meeting Rooms II", "Rotate Image", "Spiral Matrix", "Set Matrix Zeroes",
  "Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Minimum Window Substring", "Valid Anagram", "Group Anagrams", "Valid Palindrome", "Longest Palindromic Substring", "Palindromic Substrings", "Encode and Decode Strings", "Word Break", "Word Ladder",
  "Maximum Depth of Binary Tree", "Same Tree", "Invert Binary Tree", "Binary Tree Maximum Path Sum", "Binary Tree Level Order Traversal", "Serialize and Deserialize Binary Tree", "Subtree of Another Tree", "Construct Binary Tree from Preorder and Inorder Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST", "Lowest Common Ancestor", "Implement Trie", "Design Add and Search Words Data Structure", "Word Search",
  "Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow", "Course Schedule", "Course Schedule II", "Graph Valid Tree", "Number of Connected Components in an Undirected Graph", "Redundant Connection",
  "Reverse Linked List", "Merge Two Sorted Lists", "Reorder List", "Remove Nth Node From End", "Copy List with Random Pointer", "Add Two Numbers", "Linked List Cycle", "Find the Duplicate Number", "LRU Cache", "Merge k Sorted Lists", "Reverse Nodes in k-Group",
  "Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Daily Temperatures", "Car Fleet", "Largest Rectangle in Histogram", "Top K Frequent Elements", "Kth Largest Element in an Array", "Find Median from Data Stream",
  "Climbing Stairs", "House Robber", "House Robber II", "Decode Ways", "Coin Change", "Longest Increasing Subsequence", "Partition Equal Subset Sum", "Unique Paths", "Longest Common Subsequence", "Combination Sum", "Subsets", "Permutations"
];
const leetCodeTop150Canonical = [
  ...blind75Canonical,
  "Roman to Integer", "Longest Common Prefix", "3Sum Closest", "Letter Combinations of a Phone Number", "4Sum", "Remove Nth Node From End of List", "Valid Sudoku", "Count and Say", "Combination Sum II", "First Missing Positive", "Trapping Rain Water", "Multiply Strings", "Wildcard Matching", "Jump Game II", "Permutations II", "Rotate List", "Unique Paths II", "Minimum Path Sum", "Climbing Stairs", "Edit Distance", "Set Matrix Zeroes", "Search a 2D Matrix", "Sort Colors", "Combinations", "Subsets II", "Word Search II", "Merge Sorted Array", "Add Binary", "Text Justification", "Palindrome Number", "Happy Number", "Plus One", "Factorial Trailing Zeroes", "Sqrt(x)", "Pow(x, n)", "Maximum Gap", "Compare Version Numbers", "Fraction to Recurring Decimal", "Excel Sheet Column Number", "Majority Element", "Happy Number", "Contains Duplicate II", "Missing Number", "Move Zeroes", "Find the Difference", "Intersection of Two Arrays", "Intersection of Two Arrays II", "Sliding Window Maximum", "Longest Substring with At Most K Distinct Characters", "Minimum Size Subarray Sum", "Substring with Concatenation of All Words", "Find All Anagrams in a String", "Permutation in String", "Longest Repeating Character Replacement", "Reverse Words in a String", "String Compression", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Single Number", "Single Number II", "Bitwise AND of Numbers Range", "Sum of Two Integers", "Majority Element II", "House Robber III", "Maximum Depth of Binary Tree", "Path Sum", "Path Sum II", "Binary Tree Right Side View", "Populating Next Right Pointers in Each Node", "Flatten Binary Tree to Linked List", "Construct Binary Tree from Inorder and Postorder Traversal", "Binary Tree Zigzag Level Order Traversal", "Binary Tree Paths", "Sum Root to Leaf Numbers", "Lowest Common Ancestor of a Binary Tree", "Binary Search Tree Iterator", "Recover Binary Search Tree", "Convert Sorted Array to Binary Search Tree", "Merge k Sorted Lists", "Reverse Linked List II", "Partition List", "Odd Even Linked List", "Intersection of Two Linked Lists", "Rotate List", "Design Circular Queue", "Implement Stack using Queues", "Asteroid Collision", "Basic Calculator", "Basic Calculator II", "Simplify Path", "Remove Duplicate Letters", "Next Greater Element I", "Next Greater Element II", "Online Stock Span", "Course Schedule III", "Network Delay Time", "Cheapest Flights Within K Stops", "Reconstruct Itinerary", "Accounts Merge", "Number of Provinces", "Surrounded Regions", "Rotting Oranges", "Open the Lock", "Walls and Gates", "Word Ladder II", "Alien Dictionary", "Graph Bipartite", "Is Graph Bipartite?", "Pacific Atlantic Water Flow", "Course Schedule", "Dijkstra", "Kruskal", "Prim", "Best Time to Buy and Sell Stock with Cooldown", "Best Time to Buy and Sell Stock with Transaction Fee", "Target Sum", "Interleaving String", "Distinct Subsequences", "Minimum Window Substring", "Regular Expression Matching", "Wildcard Matching", "Burst Balloons", "Maximum Product Subarray", "Longest Palindromic Substring", "Palindromic Substrings", "Longest Common Subsequence", "Word Break", "Coin Change II", "Combination Sum IV", "Integer Break", "Perfect Squares", "Decode Ways", "N-Queens", "Sudoku Solver", "Palindrome Partitioning", "Expression Add Operators", "Serialize and Deserialize Binary Tree", "Design Twitter", "LRU Cache", "Insert Delete GetRandom O(1)", "Min Stack", "Time Based Key-Value Store", "Median of Two Sorted Arrays", "Kth Largest Element in a Stream", "Find K Pairs with Smallest Sums", "Task Scheduler", "Meeting Rooms II", "Merge Intervals", "Insert Interval", "Non-overlapping Intervals", "Jump Game", "Gas Station", "Candy", "Assign Cookies", "Partition Labels", "Queue Reconstruction by Height", "Car Pooling", "Minimum Number of Arrows to Burst Balloons", "Employee Free Time", "Maximum Number of Events That Can Be Attended"
];
const interviewRows = new Map<string, string[]>();
let interviewRowsReady = false;
const interviewRowKey = (topic: string, title: string) => `${topic}::${slugify(title)}`;
const top100Canonical = leetCodeTop150Canonical.slice(0, 100);
function ensureInterviewRows() {
  if (interviewRowsReady) return;
  const rows = dsaCurriculum.flatMap((topic) => topic.questions.map((question) => ({ topic: topic.title, title: question.title, key: interviewRowKey(topic.title, question.title) })));
  const assign = (label: string, canonical: string[], target: number) => {
    const selected = new Set<string>();
    const canonicalSlugs = new Set(canonical.map(slugify));
    for (const row of rows) if (canonicalSlugs.has(slugify(row.title)) && selected.size < target) selected.add(row.key);
    for (const row of rows) if (selected.size < target && !selected.has(row.key)) selected.add(row.key);
    for (const key of selected) interviewRows.set(key, [...(interviewRows.get(key) || []), label]);
  };
  assign("Blind 75", blind75Canonical, 75);
  assign("LeetCode Top 150", leetCodeTop150Canonical, 150);
  assign("Top 100 Must-Do", top100Canonical, 100);
  interviewRowsReady = true;
}
export function getInterviewLists(title: string, topic?: string) {
  ensureInterviewRows();
  if (topic) return interviewRows.get(interviewRowKey(topic, title)) || [];
  const lists = new Set<string>();
  for (const [key, values] of interviewRows) if (key.endsWith(`::${slugify(title)}`)) values.forEach((value) => lists.add(value));
  return [...lists];
}
const fallbackVideosByTopic: Record<string, { id: string; title: string; channel: string }> = {
  "Bitwise": { id: "RyBM56RIWrM", title: "Counting Bits", channel: "NeetCode" },
  "Math": { id: "iBk_JyxxuN8", title: "Plus One", channel: "NeetCode" },
  "Two Pointers": { id: "UuiTKBwPgAo", title: "Container With Most Water", channel: "NeetCode" },
  "Sliding Window": { id: "wiGpQwVHdE0", title: "Longest Substring Without Repeating Characters", channel: "NeetCode" },
  "Intervals & Greedy": { id: "dzNIPX7HY6A", title: "Merge Intervals", channel: "NeetCode" },
  "Binary Search": { id: "s4DPM8ct1pI", title: "Binary Search", channel: "NeetCode" },
  "Heaps": { id: "XEmy13g1Qxc", title: "Kth Largest Element in an Array", channel: "NeetCode" },
  "Arrays": { id: "KLlXCFG5TnA", title: "Two Sum", channel: "NeetCode" },
  "Strings": { id: "9UtInBqnCgA", title: "Valid Anagram", channel: "NeetCode" },
  "Linked Lists": { id: "G0_I8j4G-j0", title: "Reverse Linked List", channel: "NeetCode" },
  "Stack": { id: "WTzjTskDFMg", title: "Valid Parentheses", channel: "NeetCode" },
  "Queue": { id: "6ZnyEApgFYg", title: "Binary Tree Level Order Traversal", channel: "NeetCode" },
  "Recursion": { id: "l0YC3876qxg", title: "Pow(x, n)", channel: "NeetCode" },
  "Backtracking": { id: "REOH22Xwdkk", title: "Subsets", channel: "NeetCode" },
  "Dynamic Programming": { id: "mLfjzJsN8us", title: "Climbing Stairs", channel: "NeetCode" },
  "Trees": { id: "hTM3phVI6YQ", title: "Maximum Depth of Binary Tree", channel: "NeetCode" },
  "Graphs": { id: "pV2kpPD66nE", title: "Number of Islands", channel: "NeetCode" },
};
export function getVideoResource(question: CurriculumQuestion) {
  const slug = slugify(question.title);
  const topic = question.tags.find((tag) => fallbackVideosByTopic[tag]);
  const selected = problemVideos[slug] || fallbackVideosByTopic[topic || "Arrays"];
  const query = encodeURIComponent(`${question.title} LeetCode solution`);
  return {
    ...selected,
    url: `https://www.youtube.com/watch?v=${selected.id}`,
    searchUrl: `https://www.youtube.com/results?search_query=${query}`,
    isProblemMatch: Boolean(problemVideos[slug]),
  };
}
const javaOnly = (value: string): Record<CodeLanguage, string> => ({ Java: value, Python: "", JavaScript: "", "C++": "" });
const verifiedJavaSolutions: Record<string, { brute: string; optimized: string }> = {
  "Add Binary": {
    brute: `class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder out = new StringBuilder();\n    int i = a.length() - 1, j = b.length() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry > 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      out.append(sum % 2); carry = sum / 2;\n    }\n    return out.reverse().toString();\n  }\n}`,
    optimized: `class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder out = new StringBuilder();\n    int i = a.length() - 1, j = b.length() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      carry += i >= 0 ? a.charAt(i--) - '0' : 0;\n      carry += j >= 0 ? b.charAt(j--) - '0' : 0;\n      out.append((char)('0' + (carry & 1))); carry >>= 1;\n    }\n    return out.reverse().toString();\n  }\n}`
  },
  "Number of 1 Bits": { brute: `class Solution { public int hammingWeight(int n) { int count = 0; for (int bit = 0; bit < 32; bit++) count += (n >>> bit) & 1; return count; } }`, optimized: `class Solution { public int hammingWeight(int n) { int count = 0; while (n != 0) { n &= n - 1; count++; } return count; } }` },
  "Reverse Bits": { brute: `class Solution { public int reverseBits(int n) { int answer = 0; for (int i = 0; i < 32; i++) { answer = (answer << 1) | (n & 1); n >>>= 1; } return answer; } }`, optimized: `class Solution { public int reverseBits(int n) { n = (n >>> 16) | (n << 16); n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8); n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4); n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2); return ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1); } }` },
  "Single Number": { brute: `class Solution { public int singleNumber(int[] nums) { java.util.Map<Integer,Integer> counts = new java.util.HashMap<>(); for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1); for (int n : nums) if (counts.get(n) == 1) return n; return 0; } }`, optimized: `class Solution { public int singleNumber(int[] nums) { int answer = 0; for (int n : nums) answer ^= n; return answer; } }` },
  "Missing Number": { brute: `class Solution { public int missingNumber(int[] nums) { for (int candidate = 0; candidate <= nums.length; candidate++) { boolean found = false; for (int n : nums) if (n == candidate) { found = true; break; } if (!found) return candidate; } return -1; } }`, optimized: `class Solution { public int missingNumber(int[] nums) { int answer = nums.length; for (int i = 0; i < nums.length; i++) answer ^= i ^ nums[i]; return answer; } }` },
  "Plus One": { brute: `class Solution { public int[] plusOne(int[] digits) { long value = 0; for (int d : digits) value = value * 10 + d; value++; java.util.ArrayList<Integer> out = new java.util.ArrayList<>(); while (value > 0) { out.add(0, (int)(value % 10)); value /= 10; } return out.stream().mapToInt(Integer::intValue).toArray(); } }`, optimized: `class Solution { public int[] plusOne(int[] digits) { for (int i = digits.length - 1; i >= 0; i--) { if (digits[i] < 9) { digits[i]++; return digits; } digits[i] = 0; } int[] answer = new int[digits.length + 1]; answer[0] = 1; return answer; } }` },
  "Find Peak Element": {
    brute: `class Solution {
  public int findPeakElement(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
      int left = i == 0 ? Integer.MIN_VALUE : nums[i - 1];
      int right = i == nums.length - 1 ? Integer.MIN_VALUE : nums[i + 1];
      if (nums[i] > left && nums[i] > right) return i;
    }
    return -1;
  }
}`,
    optimized: `class Solution {
  public int findPeakElement(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] < nums[mid + 1]) left = mid + 1;
      else right = mid;
    }
    return left;
  }
}`
  }
};
const solutionGuidance: Record<string, { theory: string; brute: string; optimized: string; steps: string[] }> = {
  "Two Sum": { theory: "Two Sum asks for one pair whose values add to a target. The brute-force method checks every pair; the optimized method stores earlier values so the complement can be found in one lookup.", brute: "Try every i, j pair with j > i and return the first pair whose sum is target. This proves correctness directly but repeats comparisons.", optimized: "Scan left to right with a map from value to index. For nums[i], look for target - nums[i] before storing nums[i], which prevents reusing the same element.", steps: ["Choose a pair of indices without reusing an index.", "For the current value, calculate its required complement.", "Return the saved complement index or store the current value."] },
  "Valid Parentheses": { theory: "A closing bracket must match the most recent unmatched opening bracket, so a stack models the nesting order exactly.", brute: "Repeatedly remove adjacent matching pairs until no pair remains; the string is valid only when it becomes empty.", optimized: "Push the closing bracket expected for each opening bracket. Every closing symbol must match the stack top, and the stack must be empty at the end.", steps: ["Read symbols from left to right.", "Push the expected closer for each opener.", "Reject a mismatch or leftover opener."] },
  "Binary Search": { theory: "Binary search maintains a sorted interval that still may contain the target. Each comparison discards half of that interval.", brute: "Scan every position until the target is found. This handles all inputs but does not use sorted order.", optimized: "Compare the target with the midpoint and keep only the half that can still contain it.", steps: ["Set inclusive left and right boundaries.", "Check the midpoint against the target.", "Discard the impossible half while preserving the invariant."] },
  "Reverse Linked List": { theory: "The list is reversed by changing one next pointer at a time while keeping the untouched suffix reachable.", brute: "Copy nodes into an array, then reconnect them from the last copied node to the first.", optimized: "Use previous, current, and next pointers. Reverse current.next, advance both pointers, and return previous as the new head.", steps: ["Save the next node before changing a link.", "Point the current node back to previous.", "Advance until current is null."] },
  "Number of Islands": { theory: "Each unvisited land cell belongs to exactly one connected component. DFS or BFS marks the full component once, so no land is counted twice.", brute: "For every land cell, flood-fill it without a visited structure by rescanning the grid to avoid revisiting cells; this is correct but repeats work.", optimized: "Start a DFS/BFS whenever an unvisited land cell is found, mark the component as water, and increment the island count once.", steps: ["Scan every grid coordinate.", "Start a traversal only at unvisited land.", "Mark all connected land before continuing the scan."] },
  "Merge Intervals": { theory: "After sorting by start time, overlapping intervals form one contiguous run. The current merged interval only needs its farthest end.", brute: "Compare every interval with every other interval and repeatedly combine overlaps until no pair can merge.", optimized: "Sort intervals by start, extend the current end when the next interval overlaps, and otherwise start a new merged interval.", steps: ["Sort by interval start.", "Compare the next start with the current end.", "Extend or emit the current merged interval."] },
  "Climbing Stairs": { theory: "Every way to reach step n ends with either a one-step move from n-1 or a two-step move from n-2.", brute: "Recursively branch on one step and two steps until a base step is reached; this exposes the recurrence but repeats subproblems.", optimized: "Keep only the previous two counts and update them iteratively, reducing the recurrence to constant space.", steps: ["Define the two base counts.", "Add the previous two ways for each new step.", "Return the count at n."] },
  "Coin Change": { theory: "The minimum for amount a can be built from a smaller amount a - coin. Dynamic programming records the best answer for every amount.", brute: "Try every coin choice recursively and return the smallest valid number of coins; repeated branches make the baseline exponential.", optimized: "Fill dp[amount] from 0 to the target, relaxing each coin transition and leaving unreachable states as infinity.", steps: ["Set dp[0] = 0 and other states to infinity.", "Try each coin that fits the current amount.", "Return dp[target] or -1 when it remains unreachable."] },
  "Add Binary": { theory: "Binary addition is the same as decimal addition, except each column produces a bit and a carry of zero or one.", brute: "Read both strings from right to left, add the two digits and carry, and append the resulting bit. Reverse the collected characters at the end.", optimized: "The Java solution performs one right-to-left pass and keeps only i, j, and carry, so it never converts the full strings to numeric types.", steps: ["Start at the least-significant character of each string.", "Add both digits and the carry, then emit sum % 2.", "Move left and reverse the output after the final carry."] },
  "Number of 1 Bits": { theory: "The answer is the number of set bits in the 32-bit representation, including when the signed integer is negative.", brute: "Inspect all 32 bit positions with an unsigned shift and add the bit at each position.", optimized: "n & (n - 1) clears the lowest set bit. The optimized loop therefore runs once per one-bit instead of once per bit position.", steps: ["Read the least significant set bit operation in the Java loop.", "Count one operation for every cleared set bit.", "Stop when the integer becomes zero."] },
  "Reverse Bits": { theory: "Reversing bits mirrors position zero to position 31, position one to position 30, and so on.", brute: "Take the rightmost bit 32 times and append it to the result from left to right.", optimized: "The Java implementation swaps bit groups with masks, halving the number of operations while preserving every bit exactly.", steps: ["Identify the mask that selects each bit group.", "Swap halves, bytes, nibbles, pairs, and individual bits.", "Return the fully mirrored 32-bit value."] },
  "Single Number": { theory: "XOR cancels equal values because x ^ x is zero and zero ^ y is y.", brute: "Count each value with a map and return the value whose frequency is one.", optimized: "XOR every element once. All paired values cancel, leaving the unique value with constant extra space.", steps: ["Write the cancellation identity.", "Accumulate one XOR for every array element.", "Return the accumulator after all pairs cancel."] },
  "Missing Number": { theory: "The array contains every value from zero through n except one, so matching values can be cancelled against their expected indices.", brute: "Try each candidate from zero through n and scan the array to see whether it is present.", optimized: "XOR the index range and all values together; equal values cancel and the missing number remains.", steps: ["Include n in the accumulator before the loop.", "XOR each index with the value at that index.", "Return the remaining uncancelled number."] },
  "Plus One": { theory: "A carry can continue left only through trailing nines, so digits before the first non-nine need no further work.", brute: "Convert the digits to a numeric value, add one, then rebuild the digit array. This is easy to follow but overflows for long inputs.", optimized: "Walk from right to left, turn nines into zero, and increment the first smaller digit. If every digit was nine, allocate one extra leading one.", steps: ["Start at the last digit where the carry begins.", "Clear every trailing nine.", "Return immediately after incrementing a non-nine or create the overflow array."] },
  "Product of Array Except Self": { theory: "Each answer is the product of everything to its left multiplied by everything to its right.", brute: "For every index, multiply all other indices. This repeats almost the same products for every answer.", optimized: "Store the prefix product in the answer array, then multiply by a running suffix product from right to left.", steps: ["Write the left product before each index.", "Walk backward with the right product.", "Multiply the two independent products in place."] },
  "3Sum": { theory: "After sorting, fix one value and reduce the remaining pair to a two-pointer sum while skipping duplicate values.", brute: "Try every triple and keep only triples whose sum is zero, removing duplicate triples afterward.", optimized: "Sort once, move left and right around each fixed index, and move both pointers after a match while skipping equal neighbors.", steps: ["Sort the input and choose the first value.", "Use left and right pointers for the remaining target.", "Move the pointer that makes the sum closer and skip duplicates."] },
  "Minimum Window Substring": { theory: "A variable window is valid when it contains every required character with the required frequency.", brute: "Check every substring and count its characters until the shortest valid substring is found.", optimized: "Expand right to satisfy the requirement, then shrink left while the window remains valid; record the smallest valid range.", steps: ["Track required and currently satisfied character counts.", "Expand the right edge until all requirements are met.", "Shrink from the left and keep the shortest valid window."] },
  "Daily Temperatures": { theory: "The next warmer day for an index is the first unresolved index to its right with a greater temperature.", brute: "For each day, scan forward until a warmer day appears.", optimized: "Keep unresolved indices in a decreasing-temperature stack. A warmer day resolves every smaller temperature on top.", steps: ["Push indices whose answer is unknown.", "Pop while today is warmer than the stack top.", "Store the distance and push today for a future answer."] },
  "Kth Largest Element in an Array": { theory: "The kth largest value is the kth value from the end after ordering the input.", brute: "Sort the entire array and read the element at n - k.", optimized: "Maintain a min-heap of size k; remove the smallest whenever the heap grows beyond k, leaving the kth largest at the root.", steps: ["Add each value to the min-heap.", "Trim the heap to k elements.", "Read the root after all values are processed."] },
  "Top K Frequent Elements": { theory: "Frequency counting separates how often a value appears from how values are ranked.", brute: "Count frequencies, sort every distinct value by frequency, and return the first k.", optimized: "Count with a map and keep only k candidates in a heap, or place values into frequency buckets for linear-time extraction.", steps: ["Build the frequency map.", "Rank distinct values by their counts.", "Return exactly k values from the highest-frequency end."] },
  "Merge k Sorted Lists": { theory: "At every step, the next output node must be the smallest head among the lists that still have nodes.", brute: "Repeatedly scan every list head to find the smallest node, then advance that list.", optimized: "Put all current heads in a min-heap so each extraction and replacement costs log k.", steps: ["Add each non-empty list head to the heap.", "Extract the smallest node for the output.", "Insert its next node before repeating."] },
  "Subsets": { theory: "Every element creates two choices: include it or skip it. The recursion tree therefore visits every subset exactly once.", brute: "Enumerate bit masks from zero to 2^n - 1 and include an element when its mask bit is set.", optimized: "Backtrack with a start index, add the current path at every level, and undo the last choice before returning.", steps: ["Record the current path as a valid subset.", "Choose each remaining element in turn.", "Undo the choice so the next branch starts clean."] },
  "N-Queens": { theory: "One queen is placed per row. A placement is valid only when its column and both diagonals are unused.", brute: "Try every column in every row and reject a board only after checking conflicts.", optimized: "Track occupied columns and diagonals in sets, so each candidate position can be accepted or rejected in constant time before recursing.", steps: ["Choose a column for the current row.", "Check column, row-column, and row+column conflicts.", "Place, recurse, and remove the queen during backtracking."] },
  "House Robber": { theory: "At each house, the best answer is either the previous answer (skip) or two houses back plus this value (take).", brute: "Recursively branch into robbing or skipping each house, which repeats the same suffix decisions.", optimized: "Keep the best values for the previous two positions and update them with max(skip, take).", steps: ["Define the best answer ending before the current house.", "Compare taking with skipping.", "Carry only the previous two answers forward."] },
  "Longest Common Subsequence": { theory: "For two prefixes, equal last characters extend the subsequence; otherwise the answer skips one last character from either prefix.", brute: "Try both skip choices at every mismatch and return the longest result, which explores an exponential recursion tree.", optimized: "Fill a two-dimensional DP table where dp[i][j] is the LCS length for the first i and j characters.", steps: ["Set empty-prefix rows and columns to zero.", "Match equal characters diagonally.", "Take the larger neighboring state on a mismatch."] },
  "Word Break": { theory: "A string prefix is constructible when it ends with a dictionary word after a constructible earlier prefix.", brute: "Try every dictionary word at every position and recursively solve the remaining suffix.", optimized: "Use dp[i] to record whether the first i characters can be formed, then test dictionary words ending at i.", steps: ["Set dp[0] to true for the empty prefix.", "Try each word ending at the current position.", "Return the state for the full string."] },
  "Course Schedule": { theory: "Course prerequisites form a directed graph. A schedule exists exactly when every node can be removed in topological order.", brute: "Repeatedly search all remaining courses for one whose prerequisites are complete, rescanning the graph each round.", optimized: "Count indegrees, queue every zero-indegree course, and decrement neighbors as courses are completed.", steps: ["Build adjacency lists and indegrees.", "Process all currently available courses.", "Acyclic completion of all courses means the schedule is possible."] },
  "Sliding Window Maximum": { theory: "Only values that can still become the maximum need to remain in the current window.", brute: "Scan every window and search its k values for the maximum.", optimized: "Keep candidate indices in a decreasing deque; remove expired indices from the front and smaller values from the back.", steps: ["Remove indices outside the window.", "Discard smaller candidates behind the current value.", "Read the front as the current maximum."] },
  "Maximum Depth of Binary Tree": { theory: "The depth of a node is one plus the larger depth of its children, with an empty tree having depth zero.", brute: "Traverse every root-to-leaf path and keep the longest path length.", optimized: "The recursive Java method returns one plus max(left depth, right depth), directly expressing the recurrence.", steps: ["Return zero for a null node.", "Compute both child depths.", "Return one plus the larger child depth."] },
  "Validate Binary Search Tree": { theory: "Every node must stay inside the lower and upper bounds inherited from all of its ancestors.", brute: "Traverse the tree in order, store all values, and verify the sequence is strictly increasing.", optimized: "Pass valid bounds into each recursive call and reject a node outside its interval before exploring children.", steps: ["Start with unbounded lower and upper limits.", "Reject values outside the current interval.", "Tighten the bounds for the left and right subtrees."] },
};
function getSolutionGuidance(question: CurriculumQuestion) {
  const exact = solutionGuidance[question.title];
  if (exact) return exact;
  const source = question.repositoryKey ? repositorySolutions[question.repositoryKey] || "" : "";
  const pattern = question.tags.find((tag) => !/^(Arrays|Strings|Trees|Graphs|Linked Lists|Stack|Queue|Math)$/i.test(tag)) || question.tags[0] || "the stated invariant";
  if (/PriorityQueue|heap|Top-K/i.test(source) || /Heaps|Top-K/i.test(question.tags.join(" "))) return { theory: `${question.title} keeps only the most useful candidates in a heap. The Java solution never needs to sort or rescan every discarded value.`, brute: `For ${question.title}, compare or sort all candidates first, then select the required result. This is the direct baseline and costs extra repeated work.`, optimized: `The Java solution uses a priority queue to keep the current best candidates. Insert each value, remove entries that cannot remain in the answer, and read the heap when the required rank is available.`, steps: ["Define what the heap root represents.", "Insert each newly available candidate.", "Trim or rebalance the heap while preserving the target rank."] };
  if (/HashMap|HashSet|Map<|Set<|containsKey|frequency/i.test(source) || /Hash|Anagram|Frequency/i.test(question.tags.join(" "))) return { theory: `${question.title} is driven by fast membership or frequency lookup. The Java solution stores exactly the information needed to answer the next query instead of comparing against every earlier item.`, brute: `For ${question.title}, compare the current item with every relevant earlier item or recount the needed frequencies each time. This is easy to prove but repeats work.`, optimized: `The Java solution builds a map or set once, then answers each lookup while scanning. Read the lookup before updating the map when using a complement or pair invariant.`, steps: ["Name the value that must be found or counted.", "Build the map/set state as the input is scanned.", "Check the lookup before updating state when the current item cannot reuse itself."] };
  if (/PriorityQueue|Deque|Stack|push\(|pop\(/i.test(source) || /Stack|Monotonic|Deque/i.test(question.tags.join(" "))) return { theory: `${question.title} depends on the nearest unresolved item. The Java stack or deque keeps candidates in an order that makes the next answer visible at one end.`, brute: `For ${question.title}, scan forward or backward from each position until the first valid candidate is found.`, optimized: `The Java solution pushes unresolved indices and removes candidates as soon as the current value proves they are no longer useful. Each index enters and leaves the stack at most once.`, steps: ["Decide what an unresolved stack entry means.", "Remove entries invalidated by the current value.", "Record the answer for resolved entries, then push the current index."] };
  if (/dp\[|memo|cache|Dynamic Programming/i.test(source) || /DP|Knapsack|Take or Skip/i.test(question.tags.join(" "))) return { theory: `${question.title} has overlapping subproblems. The Java solution gives each state one meaning, fills its base cases, and derives the next state from already solved smaller states.`, brute: `For ${question.title}, recurse over every choice without remembering results. The same subproblem is solved repeatedly, which explains the exponential baseline.`, optimized: `The Java solution stores the best result for each state and reuses it on later transitions. Check the state definition before reading the transition, because every line follows from that definition.`, steps: ["Write one sentence defining the DP state.", "Set the smallest base states before the loop or recursion.", "Apply the transition and read the final target state."] };
  if (/dfs|bfs|visited|adjacency|graph|TreeNode/i.test(source) || /Graphs|Trees|BFS|DFS|Traversal/i.test(question.tags.join(" "))) return { theory: `${question.title} treats each reachable node as a state. The Java traversal marks or returns each state once, preventing cycles and repeated exploration.`, brute: `For ${question.title}, restart a traversal or rescan neighbors for every candidate answer. This is direct but repeats already explored states.`, optimized: `The Java solution visits each node or edge through DFS/BFS, records visited state, and propagates the result back through the traversal.`, steps: ["Define the state represented by one node.", "Mark a node before exploring its neighbors or children.", "Combine child or neighbor results into the answer."] };
  if (/left|right|slow|fast|pointer/i.test(source) || /Two Pointers|Sliding Window|Pointers/i.test(question.tags.join(" "))) return { theory: `${question.title} maintains a moving range or pair of pointers. The Java invariant tells you which pointer can move without discarding a possible answer.`, brute: `For ${question.title}, try every pair or every possible range and validate it from scratch.`, optimized: `The Java solution advances only the pointer that can improve or restore the invariant, so each boundary moves forward at most once.`, steps: ["State what the current range or pointers represent.", "Check the invariant before moving either boundary.", "Move one boundary and update the answer for the new range."] };
  if (/\b(binary|mid|low|high|left|right)\b/i.test(source) || /Binary Search/i.test(question.tags.join(" "))) return { theory: `${question.title} narrows a monotonic or sorted search space. The Java midpoint check discards a half that cannot contain a valid answer.`, brute: `For ${question.title}, scan every candidate in the search space and keep the first valid one.`, optimized: `The Java solution checks the midpoint, proves which half remains possible, and repeats until the boundary is the answer.`, steps: ["Define the inclusive search interval.", "Evaluate the midpoint and the feasibility condition.", "Discard one half while preserving the answer invariant."] };
  if (/sort|interval|greedy|end|start/i.test(source) || /Intervals|Greedy/i.test(question.tags.join(" "))) return { theory: `${question.title} becomes simple after ordering the input. The Java solution keeps the locally best boundary while preserving room for every later interval or choice.`, brute: `For ${question.title}, compare every pair of ranges or try every choice order and keep the best valid result.`, optimized: `The Java solution sorts once, then makes one greedy pass. The current end or best choice summarizes everything processed so far.`, steps: ["Choose the ordering that exposes the invariant.", "Compare the next item with the current boundary.", "Extend, replace, or finalize the current result."] };
  if (/charAt|StringBuilder|substring|String/i.test(source) || /Strings|Trie|Anagrams|Palindrome/i.test(question.tags.join(" "))) return { theory: `${question.title} is solved by maintaining a compact representation of the relevant characters or prefixes. The Java loop updates that representation as it reads the string.`, brute: `For ${question.title}, generate each substring or compare each character sequence directly.`, optimized: `The Java solution reads each character once when possible, storing only frequencies, prefix state, or the current best range needed by the next character.`, steps: ["Define the character or prefix state.", "Update the state for the current character.", "Use the state to decide whether the current answer grows or contracts."] };
  return { theory: `${question.title} follows the ${pattern} invariant described by its tags and Java method. The explanation maps the input state to each update in the implementation.`, brute: `For ${question.title}, enumerate every valid candidate or state transition and validate it directly. This establishes correctness before optimization.`, optimized: `The Java solution applies ${pattern} to avoid repeating work: maintain the smallest sufficient state, update it once per input item, and return the state that represents the answer.`, steps: [`State the input, output, and edge cases for ${question.title}.`, `Identify what one loop or recursive call represents in the Java code.`, "Check the invariant before and after each update."] };
}

export type EditorialGuide = {
  plainEnglish: string;
  brute: string;
  drawback: string;
  optimized: string;
  improvement: string;
  bruteComplexity: string;
  optimizedComplexity: string;
  codeSteps: string[];
};

const editorialOverrides: Record<string, EditorialGuide> = {
  "Find Peak Element": {
    plainEnglish: "You are given an array. A peak is a value that is greater than the value immediately before it and immediately after it. The ends count as having an imaginary smaller neighbour. Return the index of any peak.",
    brute: "Check each index from left to right. For every value, compare it with its left and right neighbour, treating a missing neighbour as negative infinity. The first value larger than both neighbours is a valid answer.",
    drawback: "That scan may inspect every element before it finds a peak, so its worst-case time is O(n). It ignores the useful direction information in the slopes of the array.",
    optimized: "Compare nums[mid] with nums[mid + 1]. If nums[mid] is smaller, the slope is rising, so a peak must exist on the right. Otherwise a peak exists at mid or on the left. Keep that half and repeat.",
    improvement: "Instead of checking values one by one, each comparison removes half of the remaining array. The Java loop only moves left or right after proving the discarded half cannot be needed.",
    bruteComplexity: "O(n) time · O(1) space",
    optimizedComplexity: "O(log n) time · O(1) space",
    codeSteps: ["Set left to 0 and right to nums.length - 1.", "While left is smaller than right, calculate mid.", "If nums[mid] < nums[mid + 1], assign left = mid + 1 because the rising slope leads to a peak on the right.", "Otherwise assign right = mid because mid or the left half still contains a peak.", "When left equals right, return left; it is the peak index."]
  }
};

export function getEditorialGuide(question: CurriculumQuestion): EditorialGuide {
  const override = editorialOverrides[question.title];
  if (override) return override;

  const guidance = getSolutionGuidance(question);
  const tags = question.tags.join(" ");
  const source = question.repositoryKey ? repositorySolutions[question.repositoryKey] || "" : "";
  const isBinarySearch = /Binary Search/i.test(tags) || /\b(mid|low|high)\b/i.test(source);
  const isHeap = /Heaps|Top-K/i.test(tags) || /PriorityQueue/i.test(source);
  const isGraph = /Graphs|BFS|DFS/i.test(tags) || /\b(visited|adjacency|graph)\b/i.test(source);
  const isTree = /Trees|BST|Trie/i.test(tags) || /TreeNode/i.test(source);
  const isDp = /\bDP\b|Knapsack|Take or Skip/i.test(tags) || /\bdp\[|memo|cache/i.test(source);
  const isBacktracking = /Backtracking/i.test(tags) || /backtrack/i.test(source);
  const isPointers = /Two Pointers|Sliding Window|Pointers|Monotonic/i.test(tags) || /\b(left|right|slow|fast)\b/i.test(source);
  const isStack = /Stack|Deque|Monotonic/i.test(tags) || /\b(Stack|Deque|ArrayDeque)\b/i.test(source);
  const isHash = /Hash|Anagram|Frequency/i.test(tags) || /\b(HashMap|HashSet|Map<|Set<)\b/i.test(source);
  const isGreedy = /Intervals|Greedy/i.test(tags) || /\b(sort|interval)\b/i.test(source);

  let drawback = "The direct method repeats candidate checks as the input grows, so it spends time proving the same facts again.";
  let improvement = "The optimized Java solution keeps only the state needed for the next decision, so completed work is not repeated.";
  let bruteComplexity = "Usually O(n²) or more because it repeatedly checks candidates.";
  let optimizedComplexity = "The optimized method processes each useful item or state once where the pattern allows it.";

  if (isBinarySearch) {
    drawback = "A linear scan checks candidates one by one even though the sorted or monotonic condition tells us which whole half cannot contain the answer.";
    improvement = "The midpoint test discards one impossible half on every iteration while preserving the half that can still contain the answer.";
    bruteComplexity = "O(n) time · O(1) space";
    optimizedComplexity = "O(log n) time · O(1) space";
  } else if (isHeap) {
    drawback = "Sorting or rescanning every candidate does extra work when we only need the current best few values.";
    improvement = "A priority queue exposes the next best candidate immediately and keeps only the candidates that can still affect the answer.";
    bruteComplexity = "Typically O(n log n) time after sorting · O(1) to O(n) space";
    optimizedComplexity = "Typically O(n log k) time · O(k) space for a Top-K heap";
  } else if (isGraph) {
    drawback = "Restarting a search from each candidate revisits the same nodes and edges many times.";
    improvement = "DFS or BFS marks a node when it is first reached, so every reachable node and edge is handled only once.";
    bruteComplexity = "Can repeat traversal work for each starting state";
    optimizedComplexity = "O(V + E) time · O(V) space";
  } else if (isTree) {
    drawback = "Recomputing a subtree result for every parent repeats the same work and hides the natural recursive structure.";
    improvement = "Each recursive call returns exactly the information its parent needs, so every tree node is visited once.";
    bruteComplexity = "Often O(n²) when subtree work is repeated";
    optimizedComplexity = "O(n) time · O(h) recursion space";
  } else if (isDp) {
    drawback = "Plain recursion reaches the same smaller subproblem through many different choice paths.";
    improvement = "The DP table or memo stores each subproblem once, then later transitions reuse that answer instead of solving it again.";
    bruteComplexity = "Often exponential because choices branch repeatedly";
    optimizedComplexity = "One computation per state; time is states × transitions";
  } else if (isBacktracking) {
    drawback = "You cannot avoid exploring every valid answer when the problem asks to generate them, but exploring branches that are already impossible wastes time.";
    improvement = "The Java recursion checks constraints before going deeper and undoes a choice after each branch, so invalid paths are pruned early.";
    bruteComplexity = "Exponential in the number of possible choices";
    optimizedComplexity = "Output-sensitive; pruning avoids invalid branches";
  } else if (isPointers || isStack) {
    drawback = "Checking every pair, range, or next candidate from scratch revisits elements that have already been ruled out.";
    improvement = "Pointers, a window, stack, or deque move forward only when the invariant says it is safe, so an element is added and removed at most once.";
    bruteComplexity = "Usually O(n²) time · O(1) space";
    optimizedComplexity = "Usually O(n) time · O(n) or less extra space";
  } else if (isHash) {
    drawback = "Comparing each value with all earlier values or recounting frequencies repeats the same lookup work.";
    improvement = "A map or set records the required information once and answers the next membership or complement question in constant average time.";
    bruteComplexity = "Usually O(n²) time · O(1) space";
    optimizedComplexity = "Usually O(n) time · O(n) space";
  } else if (isGreedy) {
    drawback = "Trying every ordering or comparing all interval pairs creates many choices that do not need to be reconsidered.";
    improvement = "After sorting, the Java pass carries one best boundary or choice, making every next decision local and final.";
    bruteComplexity = "Often O(n²) or worse";
    optimizedComplexity = "Usually O(n log n) time including sorting · O(n) or less space";
  }

  return {
    plainEnglish: `In simple words: ${question.description} Your job is to return the required result while handling the edge cases in the problem statement.`,
    brute: guidance.brute,
    drawback,
    optimized: guidance.optimized,
    improvement,
    bruteComplexity,
    optimizedComplexity,
    codeSteps: guidance.steps,
  };
}

export function getStudyContent(question: CurriculumQuestion) {
  const guidance = getSolutionGuidance(question);
  const verified = verifiedJavaSolutions[question.title];
  if (question.title === "Two Sum") return { statement: "Given an integer array and a target, return the indices of two distinct values whose sum equals the target.", ...guidance, complexity: twoSum.solutions[1].complexity, bruteCode: javaOnly(twoSum.solutions[0].code.Java), optimizedCode: javaOnly(twoSum.solutions[1].code.Java) };
  if (verified) return { statement: question.description, ...guidance, complexity: "Trace the loops that build the result and account for the extra data structure in the space bound.", bruteCode: javaOnly(verified.brute), optimizedCode: javaOnly(verified.optimized) };
  if (question.title === "Two Sum") return { statement: "Given an integer array and a target, return the indices of two distinct values whose sum equals the target.", theory: "Store each earlier value in a hash map. For the current value x, the only value that can complete the pair is target − x, so one lookup decides whether the answer is already available.", steps: ["Create an empty map from number to index.", "For every value, calculate target − value.", "Return the saved index when the complement exists; otherwise save the current value."], brute: twoSum.solutions[0].summary, optimized: twoSum.solutions[1].summary, complexity: twoSum.solutions[1].complexity, bruteCode: twoSum.solutions[0].code, optimizedCode: twoSum.solutions[1].code };
  const repositoryCode = question.repositoryKey ? repositorySolutions[question.repositoryKey] : undefined;
  if (question.title === "Two Sum") return { statement: "Given an integer array and a target, return the indices of two distinct values whose sum equals the target.", ...guidance, complexity: twoSum.solutions[1].complexity, bruteCode: javaOnly(twoSum.solutions[0].code.Java), optimizedCode: javaOnly(twoSum.solutions[1].code.Java) };
  if (repositoryCode) return { statement: question.description, ...guidance, complexity: "Derive time and space from the loops, recursion, and data structures used in the Java implementation.", sourcePath: repositoryProblems.find((problem) => problem.key === question.repositoryKey)?.sourcePath, bruteCode: javaOnly(repositoryCode), optimizedCode: javaOnly(repositoryCode) };
  if (repositoryCode) return { statement: question.description, theory: `This problem has a repository-backed Java implementation. Read the method signature first, then trace the invariant that makes each update correct.`, steps: ["Read the Java method signature and identify the input/output contract.", "Trace the smallest valid example and one boundary case.", "Use the comments and loop structure to explain why the implementation terminates."], brute: "Use a direct baseline on a few small inputs to validate the invariant before comparing it with the repository implementation.", optimized: "Canonical Java implementation from the linked DSA repository, ready to run and inspect line by line.", complexity: "Derive time and space from the loops, recursion, and data structures used in the Java implementation.", sourcePath: repositoryProblems.find((problem) => problem.key === question.repositoryKey)?.sourcePath, bruteCode: javaOnly(`// ${question.title} — brute-force baseline\n// Enumerate candidate states on small inputs to validate the invariant.\n// The full repository implementation is shown below.\n${repositoryCode}`), optimizedCode: javaOnly(repositoryCode) };
  const tags = question.tags.join(", ");
  const hash = question.tags.some(tag => /Hashing|Hash Map|XOR/i.test(tag));
  const pointers = question.tags.some(tag => /Two Pointers|Sliding Window|Monotonic/i.test(tag));
  const traversal = question.tags.some(tag => /BFS|DFS|Graphs|Trees|Backtracking/i.test(tag));
  const dp = question.tags.some(tag => /DP|Knapsack/i.test(tag));
  const heap = question.tags.some(tag => /Heaps|Top-K/i.test(tag));
  const optimized = hash ? "Record the information required for a future match as you scan. Each lookup is constant time on average, so the scan remains linear." : pointers ? "Maintain only the active candidate range. Move pointers or discard invalid candidates using the invariant for this pattern, avoiding repeated work." : traversal ? "Model the input as states and visit each valid state once. Keep visited state or undo choices as required by the traversal." : dp ? "Define the smallest state that captures progress, write its transition from previously solved states, then compute in dependency order." : heap ? "Use a priority queue to retain or retrieve the best current candidate, rather than repeatedly scanning every value." : "Use the key invariant for the named pattern so each element or state is processed only when necessary.";
  const strategy = hash ? "a hash map / set" : pointers ? "two pointers or a window" : traversal ? "a visited set and traversal" : dp ? "a dynamic-programming table" : heap ? "a priority queue" : "the required invariant";
  const bruteCode: Record<CodeLanguage, string> = {
    Java: `// ${question.title} — brute force\nclass Solution {\n  Object solve(Object input) {\n    // Enumerate every valid candidate and return the first answer.\n    for (Object candidate : candidates(input)) {\n      if (isValid(candidate, input)) return candidate;\n    }\n    return null;\n  }\n}`,
    Python: `# ${question.title} — brute force\ndef solve(data):\n    # Enumerate every valid candidate and return the first answer.\n    for candidate in candidates(data):\n        if is_valid(candidate, data):\n            return candidate\n    return None`,
    JavaScript: `// ${question.title} — brute force\nfunction solve(input) {\n  // Enumerate every valid candidate and return the first answer.\n  for (const candidate of candidates(input)) {\n    if (isValid(candidate, input)) return candidate;\n  }\n  return null;\n}`,
    "C++": `// ${question.title} — brute force\nauto solve(const Input& input) {\n  // Enumerate every valid candidate and return the first answer.\n  for (const auto& candidate : candidates(input)) {\n    if (isValid(candidate, input)) return candidate;\n  }\n  return Result{};\n}`
  };
  const optimizedCode: Record<CodeLanguage, string> = {
    Java: `// ${question.title} — optimized with ${strategy}\nclass Solution {\n  Object solve(Object input) {\n    // Maintain ${strategy}; process each item once where possible.\n    // Apply the ${tags} invariant before accepting an answer.\n    return null;\n  }\n}`,
    Python: `# ${question.title} — optimized with ${strategy}\ndef solve(data):\n    # Maintain ${strategy}; process each item once where possible.\n    # Apply the ${tags} invariant before accepting an answer.\n    return None`,
    JavaScript: `// ${question.title} — optimized with ${strategy}\nfunction solve(input) {\n  // Maintain ${strategy}; process each item once where possible.\n  // Apply the ${tags} invariant before accepting an answer.\n  return null;\n}`,
    "C++": `// ${question.title} — optimized with ${strategy}\nauto solve(const Input& input) {\n  // Maintain ${strategy}; process each item once where possible.\n  // Apply the ${tags} invariant before accepting an answer.\n  return Result{};\n}`
  };
  const theory = hash ? "A hash table stores a value as a key so you can check whether its required partner has already appeared. The key idea is to trade O(n) extra memory for constant-time average lookups." : pointers ? "Two pointers work when the answer can be narrowed from both ends or within a moving window. The invariant tells you which pointer can move without losing a valid answer." : traversal ? "Traversal treats each reachable item as a state. DFS explores deeply and BFS explores by distance; both rely on marking state so work is not repeated." : dp ? "Dynamic programming breaks a large problem into overlapping smaller states. Define what one state means, establish base cases, then use a transition to build the answer." : heap ? "A heap keeps the smallest or largest candidate available without sorting everything again. It is especially useful for Top-K, scheduling, and merging ordered streams." : "A pattern is a reusable rule for reducing repeated work. First state the invariant: what must remain true after every step. Then update only the data needed to preserve it.";
  const steps = ["State the input, output, and one or two edge cases in plain language.", `Choose ${strategy} because it removes repeated work.`, "Describe the invariant before writing code, then trace it on a small example."];
  return { statement: `Study goal: ${question.description} Identify the input constraints, required output, and edge cases before selecting a ${tags} approach.`, theory: guidance.theory, steps: guidance.steps, brute: guidance.brute, optimized: guidance.optimized, complexity: traversal || dp ? "Complexity depends on the number of reachable states and transitions." : "The optimized approach avoids repeated scans; its exact complexity follows the selected data structure or pattern.", bruteCode: javaOnly(bruteCode.Java), optimizedCode: javaOnly(optimizedCode.Java) };
  return { statement: `Study goal: ${question.description} Identify the input constraints, required output, and edge cases before selecting a ${tags} approach.`, theory, steps, brute: "Start with the most direct enumeration of every candidate, comparison, or state transition. It is easy to validate but repeats work as the input grows; this is the baseline used to justify optimization.", optimized: `${optimized} Theory: ${theory} Explanation: ${steps.join(" ")}`, complexity: traversal || dp ? "Complexity depends on the number of reachable states and transitions." : "The optimized approach avoids repeated scans; its exact complexity follows the selected data structure or pattern.", bruteCode: javaOnly(bruteCode.Java), optimizedCode: javaOnly(optimizedCode.Java) };
}
export const dsaCurriculum: CurriculumTopic[] = [
  { title: "Bitwise", concepts: ["Binary representation", "AND, OR, XOR and NOT", "Masks and shifts", "Two's complement"], patterns: ["XOR cancellation", "Count set bits", "Bit construction"], questions: [
    { title: "Add Binary", difficulty: "Easy", tags: ["Bitwise", "Simulation"], description: "Build a binary result while carrying between positions." }, { title: "Number of 1 Bits", difficulty: "Easy", tags: ["Bitwise"], description: "Remove the rightmost set bit on every step." }, { title: "Single Number", difficulty: "Easy", tags: ["Bitwise", "XOR"], description: "Use XOR cancellation to isolate the unmatched value." }, { title: "Missing Number", difficulty: "Easy", tags: ["Bitwise", "XOR"], description: "Cancel equal values and indices to reveal the missing one." }, { title: "Counting Bits", difficulty: "Medium", tags: ["Bitwise", "DP"], description: "Reuse the answer for a smaller number after clearing a bit." }, { title: "Reverse Bits", difficulty: "Easy", tags: ["Bitwise"], description: "Read and write each bit in its mirrored position." }, { title: "Single Number II", difficulty: "Medium", tags: ["Bitwise"], description: "Track bit counts when every other value occurs three times." }, { title: "Bitwise AND of Numbers Range", difficulty: "Medium", tags: ["Bitwise"], description: "Find the shared binary prefix across the range." }
  ]},
  { title: "Heaps", concepts: ["Min and max heaps", "Heapify", "Priority queues", "Build heap O(n)"], patterns: ["Top-K", "K-way merge", "Two heaps", "Scheduling"], questions: [
    { title: "Kth Largest Element in an Array", difficulty: "Medium", tags: ["Heaps", "Top-K"], description: "Maintain a heap that exposes the current threshold." }, { title: "Top K Frequent Elements", difficulty: "Medium", tags: ["Heaps", "Hashing"], description: "Count first, then keep only the best K candidates." }, { title: "Merge k Sorted Lists", difficulty: "Hard", tags: ["Heaps", "Linked Lists"], description: "Always take the smallest visible node across lists." }, { title: "Find Median from Data Stream", difficulty: "Hard", tags: ["Heaps", "Two Heaps"], description: "Balance lower and upper halves in two priority queues." }, { title: "IPO", difficulty: "Hard", tags: ["Heaps", "Greedy"], description: "Choose the best currently affordable project." }
  ]},
  { title: "Arrays", concepts: ["1D arrays and strings", "2D matrices", "HashMap and HashSet", "Prefix and suffix sums", "Math foundations"], patterns: ["Hashing", "Two pointers", "Sliding window", "Prefix sum", "Matrix traversal"], questions: [
    { title: "Two Sum", difficulty: "Easy", tags: ["Arrays", "Hashing"], description: "Find a complement already seen in a hash map.", slug: "two-sum" }, { title: "Contains Duplicate", difficulty: "Easy", tags: ["Arrays", "Hashing"], description: "Detect a repeated value with a set." }, { title: "Valid Anagram", difficulty: "Easy", tags: ["Arrays", "Strings", "Hashing"], description: "Compare character-frequency signatures." }, { title: "Product of Array Except Self", difficulty: "Medium", tags: ["Arrays", "Prefix Sum"], description: "Combine prefix and suffix products without division." }, { title: "3Sum", difficulty: "Medium", tags: ["Arrays", "Two Pointers"], description: "Sort once and sweep a pair around each first value." }, { title: "Minimum Window Substring", difficulty: "Hard", tags: ["Strings", "Sliding Window"], description: "Maintain the smallest valid variable window." }, { title: "Spiral Matrix", difficulty: "Medium", tags: ["2D Arrays", "Matrix"], description: "Traverse shrinking matrix boundaries." }, { title: "Rotate Image", difficulty: "Medium", tags: ["2D Arrays", "Matrix"], description: "Transpose then reverse to rotate in place." }, { title: "Set Matrix Zeroes", difficulty: "Medium", tags: ["2D Arrays", "Matrix"], description: "Use first row and column as in-place markers." }, { title: "Trapping Rain Water", difficulty: "Hard", tags: ["Arrays", "Two Pointers"], description: "Move the side with the smaller known boundary." }
  ]},
  { title: "Linked Lists", concepts: ["Singly, doubly and circular lists", "Dummy nodes", "Pointer updates", "Fast and slow pointers"], patterns: ["In-place reversal", "Fixed-gap pointers", "Merge sorted lists"], questions: [{ title: "Reverse Linked List", difficulty: "Easy", tags: ["Linked Lists", "Pointers"], description: "Reverse links while preserving the next node." }, { title: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked Lists"], description: "Choose the smaller current node with a dummy head." }, { title: "Linked List Cycle", difficulty: "Easy", tags: ["Linked Lists", "Fast & Slow"], description: "Use two speeds to detect a loop." }, { title: "Remove Nth Node From End", difficulty: "Medium", tags: ["Linked Lists", "Two Pointers"], description: "Keep a fixed gap between two pointers." }, { title: "Copy List with Random Pointer", difficulty: "Medium", tags: ["Linked Lists", "Hashing"], description: "Map original nodes to their copies." }, { title: "Reverse Nodes in k-Group", difficulty: "Hard", tags: ["Linked Lists"], description: "Reverse each complete segment in place." }] },
  { title: "Stack", concepts: ["LIFO operations", "ArrayDeque", "Call stack", "Monotonic stacks"], patterns: ["Bracket matching", "Monotonic stack", "Expression evaluation"], questions: [{ title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack"], description: "Match closing symbols to their latest opening symbol." }, { title: "Min Stack", difficulty: "Medium", tags: ["Stack", "Design"], description: "Store sufficient state to retrieve a minimum in O(1)." }, { title: "Daily Temperatures", difficulty: "Medium", tags: ["Stack", "Monotonic"], description: "Keep unresolved temperatures in decreasing order." }, { title: "Largest Rectangle in Histogram", difficulty: "Hard", tags: ["Stack", "Monotonic"], description: "Find the maximal span for each height." }] },
  { title: "Queue", concepts: ["FIFO", "Circular queues", "Deques", "BFS"], patterns: ["Level-order BFS", "Multi-source BFS", "Topological sort", "Monotonic deque"], questions: [{ title: "Implement Queue Using Stacks", difficulty: "Easy", tags: ["Queue", "Design"], description: "Use two stacks to preserve FIFO order." }, { title: "Binary Tree Level Order Traversal", difficulty: "Medium", tags: ["Queue", "BFS"], description: "Process one queue-sized level at a time." }, { title: "Course Schedule", difficulty: "Medium", tags: ["Queue", "Topological Sort"], description: "Repeatedly process indegree-zero courses." }, { title: "Sliding Window Maximum", difficulty: "Hard", tags: ["Queue", "Monotonic Deque"], description: "Keep only viable maximum candidates." }] },
  { title: "Recursion", concepts: ["Base cases", "Call stack", "Recursive state", "Divide and conquer"], patterns: ["Tail recursion", "Divide and conquer", "Recursive traversal", "Memoized recursion"], questions: [{ title: "Pow(x, n)", difficulty: "Medium", tags: ["Recursion", "Divide and conquer"], description: "Compute a power by recursively halving the exponent." }, { title: "Fibonacci Number", difficulty: "Easy", tags: ["Recursion", "DP"], description: "Build the Fibonacci sequence from its base cases." }, { title: "Reverse Linked List Recursively", difficulty: "Easy", tags: ["Recursion", "Linked Lists"], description: "Reverse the remaining list and reconnect the current node." }] },
  { title: "Backtracking", concepts: ["Choose-explore-undo", "Recursion tree", "Pruning", "State restoration"], patterns: ["Subsets", "Permutations", "Combination sum", "Partitioning"], questions: [{ title: "Subsets", difficulty: "Medium", tags: ["Backtracking"], description: "Choose or skip every value." }, { title: "Generate Parentheses", difficulty: "Medium", tags: ["Backtracking"], description: "Build only prefixes that can still become valid." }, { title: "Combination Sum", difficulty: "Medium", tags: ["Backtracking"], description: "Explore candidates while tracking a remaining target." }, { title: "N-Queens", difficulty: "Hard", tags: ["Backtracking"], description: "Place queens under row, column, and diagonal constraints." }] },
  { title: "Dynamic Programming", concepts: ["State", "Transition", "Base cases", "Memoization and tabulation"], patterns: ["1D DP", "Grid DP", "String DP", "Knapsack"], questions: [{ title: "Climbing Stairs", difficulty: "Easy", tags: ["DP", "1D"], description: "Build each answer from the two preceding states." }, { title: "House Robber", difficulty: "Medium", tags: ["DP", "Take or Skip"], description: "Compare taking a value with skipping it." }, { title: "Coin Change", difficulty: "Medium", tags: ["DP", "Unbounded Knapsack"], description: "Minimize coins for every reachable amount." }, { title: "Word Break", difficulty: "Medium", tags: ["DP", "Strings"], description: "Track which string prefixes are constructible." }, { title: "Longest Common Subsequence", difficulty: "Medium", tags: ["DP", "2D"], description: "Relate two prefixes with a two-dimensional state." }] },
  { title: "Graphs", concepts: ["Adjacency lists", "DFS and BFS", "Directed and undirected graphs", "Union-Find"], patterns: ["Connectivity", "Topological sort", "Shortest paths", "Minimum spanning tree"], questions: [{ title: "Number of Islands", difficulty: "Medium", tags: ["Graphs", "DFS"], description: "Explore each unvisited land component." }, { title: "Clone Graph", difficulty: "Medium", tags: ["Graphs", "BFS"], description: "Create nodes while maintaining an original-to-copy map." }, { title: "Course Schedule II", difficulty: "Medium", tags: ["Graphs", "Topological Sort"], description: "Return a dependency order if the graph is acyclic." }, { title: "Word Ladder", difficulty: "Hard", tags: ["Graphs", "BFS"], description: "Search transformations by increasing edit distance." }, { title: "Network Delay Time", difficulty: "Medium", tags: ["Graphs", "Dijkstra"], description: "Relax non-negative weighted edges using a heap." }] },
  { title: "Trees", concepts: ["Binary trees", "Binary search trees", "Tries", "Tree traversals and recursion"], patterns: ["Tree DFS", "Tree BFS", "BST order", "Path sums"], questions: [{ title: "Maximum Depth of Binary Tree", difficulty: "Easy", tags: ["Trees", "DFS"], description: "Return child-derived height." }, { title: "Validate Binary Search Tree", difficulty: "Medium", tags: ["Trees", "BST"], description: "Carry valid lower and upper bounds down the tree." }, { title: "Binary Tree Right Side View", difficulty: "Medium", tags: ["Trees", "BFS"], description: "Record the final node at each level." }, { title: "Lowest Common Ancestor", difficulty: "Medium", tags: ["Trees", "DFS"], description: "Return targets upward until paths meet." }, { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", tags: ["Trees", "Design"], description: "Preserve shape using null markers." }] }
];
dsaCurriculum.push(
  { title: "Binary Search", concepts: ["Sorted search spaces", "Lower and upper bounds", "Answer-space binary search", "Midpoint invariants"], patterns: ["Classic binary search", "Search on answer", "Rotated arrays", "2D binary search"], questions: [
    { title: "Binary Search", difficulty: "Easy", tags: ["Binary Search", "Classic binary search"], description: "Locate a target in a sorted array by halving the search range." }, { title: "Search in Rotated Sorted Array", difficulty: "Medium", tags: ["Binary Search", "Rotated arrays"], description: "Identify the sorted half before discarding candidates." }, { title: "Koko Eating Bananas", difficulty: "Medium", tags: ["Binary Search", "Search on answer"], description: "Binary search the smallest feasible eating speed." }, { title: "Find Peak Element", difficulty: "Medium", tags: ["Binary Search", "2D binary search"], description: "Use the slope to keep a half that must contain a peak." }
  ] },
  { title: "Sliding Window", concepts: ["Fixed versus variable windows", "Frequency maps", "Window validity", "Expand and shrink"], patterns: ["Fixed window", "Variable window", "Frequency matching", "Monotonic deque"], questions: [
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["Sliding Window", "Variable window"], description: "Keep a window containing no repeated character." }, { title: "Permutation in String", difficulty: "Medium", tags: ["Sliding Window", "Frequency matching"], description: "Compare a fixed-size frequency signature." }, { title: "Longest Repeating Character Replacement", difficulty: "Medium", tags: ["Sliding Window", "Variable window"], description: "Keep the window valid with at most k replacements." }, { title: "Sliding Window Maximum", difficulty: "Hard", tags: ["Sliding Window", "Monotonic deque"], description: "Keep only candidates that can still become the maximum." }
  ] },
  { title: "Two Pointers", concepts: ["Opposite-end scans", "Slow and fast pointers", "Sorted arrays", "Pointer invariants"], patterns: ["Opposite pointers", "Fast and slow", "Partitioning", "Linked-list pointers"], questions: [
    { title: "Container With Most Water", difficulty: "Medium", tags: ["Two Pointers", "Opposite pointers"], description: "Move the shorter boundary because it limits the current area." }, { title: "Valid Palindrome", difficulty: "Easy", tags: ["Two Pointers", "Opposite pointers"], description: "Ignore non-alphanumeric characters while comparing ends." }, { title: "Sort Colors", difficulty: "Medium", tags: ["Two Pointers", "Partitioning"], description: "Partition values into low, current, and high regions." }, { title: "Remove Duplicates from Sorted Array", difficulty: "Easy", tags: ["Two Pointers", "Fast and slow"], description: "Write the next unique value with a slow pointer." }
  ] },
  { title: "Intervals & Greedy", concepts: ["Sort by boundaries", "Local optimal choices", "Overlap detection", "Scheduling"], patterns: ["Merge intervals", "Meeting rooms", "Sweep line", "Greedy choices"], questions: [
    { title: "Merge Intervals", difficulty: "Medium", tags: ["Intervals", "Merge intervals"], description: "Sort by start and merge overlapping ranges." }, { title: "Insert Interval", difficulty: "Medium", tags: ["Intervals", "Merge intervals"], description: "Place and merge a new interval in sorted order." }, { title: "Non-overlapping Intervals", difficulty: "Medium", tags: ["Intervals", "Greedy choices"], description: "Keep the interval that leaves the most room for future choices." }, { title: "Jump Game", difficulty: "Medium", tags: ["Greedy", "Greedy choices"], description: "Track the farthest reachable position as you scan." }
  ] },
  { title: "Strings", concepts: ["Character frequencies", "Prefix matching", "String traversal", "Trie nodes"], patterns: ["Anagrams", "Prefix tree", "KMP matching", "Palindrome expansion"], questions: [
    { title: "Group Anagrams", difficulty: "Medium", tags: ["Strings", "Anagrams"], description: "Group words by a stable character-frequency signature." }, { title: "Longest Palindromic Substring", difficulty: "Medium", tags: ["Strings", "Palindrome expansion"], description: "Expand around each possible center." }, { title: "Implement Trie", difficulty: "Medium", tags: ["Tries", "Prefix tree"], description: "Store prefixes as paths through character nodes." }, { title: "Find the Index of the First Occurrence in a String", difficulty: "Easy", tags: ["Strings", "KMP matching"], description: "Match a pattern efficiently within a text." }
  ] }
);
// Merge the linked repository catalog into the learning path. Existing hand-written
// entries keep their richer editorial copy, while every repository entry contributes
// a real Java implementation and remains discoverable through the same filters.
for (const repositoryProblem of repositoryProblems) {
  const existingTopic = dsaCurriculum.find((topic) => topic.title === repositoryProblem.topic);
  if (!existingTopic) continue;
  const existing = dsaCurriculum.flatMap((topic) => topic.questions).find((question) => slugify(question.title) === repositoryProblem.slug);
  if (existing) {
    existing.repositoryKey ??= repositoryProblem.key;
    continue;
  }
  existingTopic.questions.push({
    title: repositoryProblem.title,
    difficulty: repositoryProblem.difficulty,
    tags: repositoryProblem.tags,
    description: repositoryProblem.description,
    repositoryKey: repositoryProblem.key,
  });
}
const arrays1D = dsaCurriculum.find((topic) => topic.title === "Arrays")!;
const matrixQuestions = arrays1D.questions.filter((question) => question.tags.some((tag) => /2D|Matrix/i.test(tag)));
arrays1D.title = "Arrays";
arrays1D.questions = [...arrays1D.questions, ...matrixQuestions.filter((question) => !arrays1D.questions.includes(question))];
dsaCurriculum.push(
  { title: "Math", concepts: ["Number representation", "Modulo arithmetic", "Prime factors", "Combinatorics"], patterns: ["Digit simulation", "Number theory", "Counting", "Geometry"], questions: [
    { title: "Plus One", difficulty: "Easy", tags: ["Math", "Digit simulation"], description: "Propagate a carry from the last digit." }, { title: "Factorial Trailing Zeroes", difficulty: "Medium", tags: ["Math", "Number theory"], description: "Count factors of five in the factorial." }, { title: "Palindrome Number", difficulty: "Easy", tags: ["Math", "Digit simulation"], description: "Reverse digits while avoiding string conversion." }, { title: "Pascal's Triangle", difficulty: "Easy", tags: ["Math", "Counting"], description: "Build each row from adjacent values in the previous row." }
  ] },
);
// Add any repository references that were generated after the array topic was
// normalized, while keeping one clear Arrays module in the learner path.
for (const repositoryProblem of repositoryProblems) {
  const existingTopic = dsaCurriculum.find((topic) => topic.title === repositoryProblem.topic);
  if (!existingTopic || existingTopic.questions.some((question) => slugify(question.title) === repositoryProblem.slug)) continue;
  existingTopic.questions.push({ title: repositoryProblem.title, difficulty: repositoryProblem.difficulty, tags: repositoryProblem.tags, description: repositoryProblem.description, repositoryKey: repositoryProblem.key });
}
const dynamicProgrammingPatternNames = [
  "Fibonacci Sequence", "Kadane's Algorithm", "Pick or Skip Linear DP", "0/1 Knapsack", "Unbounded Knapsack",
  "Longest Common Subsequence (LCS)", "Longest Increasing Subsequence (LIS)", "Palindromic Subsequence",
  "Edit Distance", "Subset Sum", "String Partition", "String Segmentation DP", "Catalan Numbers", "Matrix Chain Multiplication",
  "Count Distinct Ways", "DP on Grids", "DP on Trees", "DP on Graphs", "Digit DP",
  "Bitmasking DP", "Probability DP", "State Machine DP",
];
export const dynamicProgrammingPatternGuide: Record<string, string> = {
  "Fibonacci Sequence": "Use when one state depends on a small fixed set of earlier states, such as n - 1 and n - 2.",
  "Kadane's Algorithm": "Use when the best contiguous subarray ending here can either extend the previous one or restart here.",
  "Pick or Skip Linear DP": "Use when choosing the current value blocks nearby choices, so each index compares taking against skipping.",
  "0/1 Knapsack": "Use when each item is available once and every state decides take or skip.",
  "Unbounded Knapsack": "Use when a choice may be used repeatedly, such as coins, cuts, or square numbers.",
  "Longest Common Subsequence (LCS)": "Use when two sequences must preserve relative order and you can match or skip a character.",
  "Longest Increasing Subsequence (LIS)": "Use when a subsequence must respect an ordering rule while values may be skipped.",
  "Palindromic Subsequence": "Use when matching string ends reduces the problem to an inner range.",
  "Edit Distance": "Use when two sequences are transformed by insert, delete, and replace decisions.",
  "Subset Sum": "Use when a subset must hit an exact target; the state is usually index plus remaining target.",
  "String Partition": "Use when a string must be split into valid pieces and each split leaves a suffix subproblem.",
  "String Segmentation DP": "Use when a prefix or suffix must be built from valid dictionary pieces, decodings, or partitions.",
  "Catalan Numbers": "Use when counting recursively composable structures such as unique BSTs or valid parenthesis shapes.",
  "Matrix Chain Multiplication": "Use interval recursion when combining a range has a cost that depends on where it is split.",
  "Count Distinct Ways": "Use when the question asks how many valid paths, decodings, or constructions exist.",
  "DP on Grids": "Use state (row, column) when each cell derives its answer from legal neighboring moves.",
  "DP on Trees": "Use a recursive node state that is derived from child states, often with take/skip choices.",
  "DP on Graphs": "Use a state over node and extra constraints when graph transitions form an acyclic or bounded dependency structure.",
  "Digit DP": "Use digit position, tightness, and started/constraint state to count values up to a very large bound.",
  "Bitmasking DP": "Use a bitmask for selected or visited items when the number of items is small enough for 2ⁿ states.",
  "Probability DP": "Use when a state's answer is an expected value or probability built from weighted next-state probabilities.",
  "State Machine DP": "Use when each day or position can be in a small fixed mode such as holding, sold, cooldown, or transactions left.",
};
const dynamicProgrammingRoadmap: Array<[string, Difficulty, string]> = [
  ["Fibonacci Sequence", "Easy", "Climbing Stairs"], ["Fibonacci Sequence", "Easy", "Fibonacci Number"], ["Fibonacci Sequence", "Easy", "Min Cost Climbing Stairs"],
  ["Kadane's Algorithm", "Medium", "Maximum Subarray"], ["Kadane's Algorithm", "Medium", "Maximum Sum Circular Subarray"], ["Kadane's Algorithm", "Medium", "Maximum Product Subarray"],
  ["0/1 Knapsack", "Medium", "Partition Equal Subset Sum"], ["0/1 Knapsack", "Medium", "Target Sum"], ["0/1 Knapsack", "Medium", "Last Stone Weight II"],
  ["Unbounded Knapsack", "Medium", "Coin Change"], ["Unbounded Knapsack", "Medium", "Coin Change II"], ["Unbounded Knapsack", "Medium", "Perfect Squares"],
  ["Longest Common Subsequence (LCS)", "Medium", "Longest Common Subsequence"], ["Longest Common Subsequence (LCS)", "Medium", "Delete Operation for Two Strings"], ["Longest Common Subsequence (LCS)", "Hard", "Shortest Common Supersequence"],
  ["Longest Increasing Subsequence (LIS)", "Medium", "Longest Increasing Subsequence"], ["Longest Increasing Subsequence (LIS)", "Medium", "Number of Longest Increasing Subsequence"], ["Longest Increasing Subsequence (LIS)", "Hard", "Russian Doll Envelopes"],
  ["Palindromic Subsequence", "Medium", "Longest Palindromic Subsequence"], ["Palindromic Subsequence", "Medium", "Palindromic Substrings"], ["Palindromic Subsequence", "Medium", "Minimum Insertion Steps to Make a String Palindrome"],
  ["Edit Distance", "Medium", "Edit Distance"], ["Edit Distance", "Medium", "Delete Operation for Two Strings"], ["Edit Distance", "Hard", "Minimum ASCII Delete Sum for Two Strings"],
  ["Subset Sum", "Medium", "Partition Equal Subset Sum"], ["Subset Sum", "Medium", "Target Sum"], ["Subset Sum", "Hard", "Partition to K Equal Sum Subsets"],
  ["String Partition", "Medium", "Word Break"], ["String Partition", "Hard", "Palindrome Partitioning II"], ["String Partition", "Hard", "Concatenated Words"],
  ["Catalan Numbers", "Medium", "Unique Binary Search Trees"], ["Catalan Numbers", "Medium", "Generate Parentheses"],
  ["Matrix Chain Multiplication", "Medium", "Minimum Score Triangulation of Polygon"], ["Matrix Chain Multiplication", "Hard", "Burst Balloons"], ["Matrix Chain Multiplication", "Hard", "Minimum Cost to Merge Stones"],
  ["Count Distinct Ways", "Medium", "Decode Ways"], ["Count Distinct Ways", "Medium", "Count Number of Texts"],
  ["DP on Grids", "Medium", "Unique Paths"], ["DP on Grids", "Medium", "Minimum Path Sum"], ["DP on Grids", "Hard", "Longest Increasing Path in a Matrix"],
  ["DP on Trees", "Medium", "House Robber III"], ["DP on Trees", "Hard", "Binary Tree Maximum Path Sum"], ["DP on Trees", "Hard", "Binary Tree Cameras"],
  ["DP on Graphs", "Medium", "Cheapest Flights Within K Stops"], ["DP on Graphs", "Medium", "Find the City With the Smallest Number of Neighbors at a Threshold Distance"],
  ["Digit DP", "Medium", "Count Numbers with Unique Digits"], ["Digit DP", "Hard", "Number of Digit One"], ["Digit DP", "Hard", "Numbers At Most N Given Digit Set"],
  ["Bitmasking DP", "Medium", "Minimum Number of Work Sessions to Finish the Tasks"], ["Bitmasking DP", "Medium", "Fair Distribution of Cookies"], ["Bitmasking DP", "Hard", "Shortest Path Visiting All Nodes"],
  ["Probability DP", "Medium", "Knight Probability in Chessboard"], ["Probability DP", "Medium", "Soup Servings"], ["Probability DP", "Medium", "New 21 Game"],
  ["State Machine DP", "Medium", "Best Time to Buy and Sell Stock with Cooldown"], ["State Machine DP", "Hard", "Best Time to Buy and Sell Stock III"],
];
const additionalDynamicProgrammingRoadmap: Array<[string, Difficulty, string]> = [
  ["Fibonacci Sequence", "Medium", "Frog Jump"], ["Fibonacci Sequence", "Medium", "Decode Ways"],
  ["Pick or Skip Linear DP", "Medium", "House Robber"], ["Pick or Skip Linear DP", "Medium", "House Robber II"], ["Pick or Skip Linear DP", "Medium", "Maximum Sum of Non-Adjacent Elements"], ["Pick or Skip Linear DP", "Medium", "Delete and Earn"],
  ["0/1 Knapsack", "Medium", "0/1 Knapsack"], ["0/1 Knapsack", "Medium", "Subset Sum Equals Target"], ["0/1 Knapsack", "Medium", "Count Subsets With Sum K"], ["0/1 Knapsack", "Medium", "Ones and Zeroes"],
  ["Unbounded Knapsack", "Medium", "Rod Cutting"], ["Unbounded Knapsack", "Medium", "Combination Sum IV"],
  ["Longest Increasing Subsequence (LIS)", "Medium", "Largest Divisible Subset"],
  ["Longest Common Subsequence (LCS)", "Hard", "Distinct Subsequences"], ["Longest Common Subsequence (LCS)", "Hard", "Wildcard Matching"], ["Longest Common Subsequence (LCS)", "Hard", "Regular Expression Matching"],
  ["DP on Grids", "Medium", "Unique Paths II"], ["DP on Grids", "Medium", "Triangle"], ["DP on Grids", "Medium", "Maximal Square"], ["DP on Grids", "Hard", "Dungeon Game"],
  ["State Machine DP", "Easy", "Best Time to Buy and Sell Stock"], ["State Machine DP", "Medium", "Best Time to Buy and Sell Stock II"], ["State Machine DP", "Hard", "Best Time to Buy and Sell Stock IV"], ["State Machine DP", "Medium", "Best Time to Buy and Sell Stock with Transaction Fee"],
  ["String Segmentation DP", "Medium", "Word Break"], ["String Segmentation DP", "Medium", "Extra Characters in a String"], ["String Segmentation DP", "Medium", "Decode Ways"], ["String Segmentation DP", "Hard", "Palindrome Partitioning II"],
  ["DP on Trees", "Medium", "Diameter of Binary Tree"], ["DP on Trees", "Medium", "Longest ZigZag Path in a Binary Tree"],
];
const patternQuestion = (title: string, difficulty: Difficulty, pattern: string): CurriculumQuestion => ({
  title,
  difficulty,
  tags: [pattern],
  description: "Practice the " + pattern + " problem shape with a clear recursive state and base case.",
  repositoryKey: repositoryProblems.find((problem) => problem.slug === slugify(title))?.key,
});
const recursionTopic = dsaCurriculum.find((topic) => topic.title === "Recursion");
if (recursionTopic) {
  recursionTopic.patterns = ["Single Recursive Reduction", "Multiple Required Recursive Calls", "Recursive Decomposition"];
  recursionTopic.questions = [
    ["Factorial", "Easy", "Single Recursive Reduction"], ["Reverse Linked List", "Easy", "Single Recursive Reduction"], ["Pow(x, n)", "Medium", "Single Recursive Reduction"], ["Josephus Problem", "Medium", "Single Recursive Reduction"],
    ["Tower of Hanoi", "Medium", "Multiple Required Recursive Calls"], ["Merge Sort", "Medium", "Multiple Required Recursive Calls"], ["Tree Height", "Easy", "Multiple Required Recursive Calls"], ["Diameter of Binary Tree", "Medium", "Multiple Required Recursive Calls"], ["Binary Tree Maximum Path Sum", "Hard", "Multiple Required Recursive Calls"],
    ["Integer to English Words", "Hard", "Recursive Decomposition"], ["Decode String", "Medium", "Recursive Decomposition"], ["Different Ways to Add Parentheses", "Medium", "Recursive Decomposition"],
  ].map(([title, difficulty, pattern]) => patternQuestion(title, difficulty as Difficulty, pattern));
}
const backtrackingTopic = dsaCurriculum.find((topic) => topic.title === "Backtracking");
if (backtrackingTopic) {
  backtrackingTopic.patterns = ["Binary Decision: Pick or Skip", "Combination Selection", "Permutations", "Partitioning", "Grid DFS with Backtracking", "Constraint Satisfaction", "Memoized Backtracking"];
  backtrackingTopic.questions = [
    ["Subsets", "Medium", "Binary Decision: Pick or Skip"], ["Subsets II", "Medium", "Binary Decision: Pick or Skip"], ["Generate Parentheses", "Medium", "Binary Decision: Pick or Skip"], ["Matchsticks to Square", "Medium", "Binary Decision: Pick or Skip"],
    ["Combinations", "Medium", "Combination Selection"], ["Combination Sum", "Medium", "Combination Selection"], ["Combination Sum II", "Medium", "Combination Selection"], ["Combination Sum III", "Medium", "Combination Selection"], ["Letter Combinations of a Phone Number", "Medium", "Combination Selection"],
    ["Permutations", "Medium", "Permutations"], ["Permutations II", "Medium", "Permutations"], ["Letter Case Permutation", "Medium", "Permutations"],
    ["Palindrome Partitioning", "Medium", "Partitioning"], ["Restore IP Addresses", "Medium", "Partitioning"], ["Split String Into Descending Consecutive Values", "Medium", "Partitioning"],
    ["Word Search", "Medium", "Grid DFS with Backtracking"], ["Word Search II", "Hard", "Grid DFS with Backtracking"], ["Unique Paths III", "Hard", "Grid DFS with Backtracking"], ["Path with Maximum Gold", "Medium", "Grid DFS with Backtracking"],
    ["N-Queens", "Hard", "Constraint Satisfaction"], ["N-Queens II", "Hard", "Constraint Satisfaction"], ["Sudoku Solver", "Hard", "Constraint Satisfaction"], ["Graph Coloring", "Medium", "Constraint Satisfaction"],
    ["Word Break II", "Hard", "Memoized Backtracking"], ["Concatenated Words", "Hard", "Memoized Backtracking"], ["Remove Invalid Parentheses", "Hard", "Memoized Backtracking"],
  ].map(([title, difficulty, pattern]) => patternQuestion(title, difficulty as Difficulty, pattern));
}
const dynamicProgrammingTopic = dsaCurriculum.find((topic) => topic.title === "Dynamic Programming");
if (dynamicProgrammingTopic) {
  dynamicProgrammingTopic.patterns = dynamicProgrammingPatternNames;
  dynamicProgrammingTopic.questions = [...dynamicProgrammingRoadmap, ...additionalDynamicProgrammingRoadmap].map(([pattern, difficulty, title]) => ({
    title,
    difficulty,
    tags: [pattern],
    description: "Practice the " + pattern + " pattern with its defining recurrence and memoized state.",
    repositoryKey: repositoryProblems.find((problem) => problem.slug === slugify(title))?.key,
  }));
}

// Keep the source catalog available for real Java solutions and richer descriptions,
// then replace the broad catalog with the finite, high-return Interview 300 path.
const sourceQuestionsBySlug = new Map(
  dsaCurriculum.flatMap((topic) => topic.questions).map((question) => [slugify(question.title), question]),
);
const repositoryQuestionsBySlug = new Map(repositoryProblems.map((question) => [question.slug, question]));
const curatedQuestion = (title: string, difficulty: Difficulty, pattern: string): CurriculumQuestion => {
  const source = sourceQuestionsBySlug.get(slugify(title));
  const repository = repositoryQuestionsBySlug.get(slugify(title));
  return {
    title,
    difficulty,
    tags: [pattern],
    description: source?.description || repository?.description || `Master the ${pattern} approach using this high-frequency interview problem.`,
    repositoryKey: source?.repositoryKey || repository?.key,
  };
};

dsaCurriculum.splice(
  0,
  dsaCurriculum.length,
  ...interview300Topics.map((topic) => ({
    title: topic.title,
    concepts: topic.concepts,
    patterns: topic.patterns,
    questions: topic.questions.map(([title, difficulty, pattern]) => curatedQuestion(title, difficulty, pattern)),
  })),
);

const learningOrder = ["Bitwise", "Math", "Two Pointers", "Sliding Window", "Intervals & Greedy", "Binary Search", "Heaps", "Arrays", "Strings", "Linked Lists", "Stack", "Queue", "Recursion", "Backtracking", "Dynamic Programming", "Trees", "Graphs"];
dsaCurriculum.sort((left, right) => { const leftIndex = learningOrder.indexOf(left.title); const rightIndex = learningOrder.indexOf(right.title); return (leftIndex < 0 ? 999 : leftIndex) - (rightIndex < 0 ? 999 : rightIndex); });
export const patterns = ["Two Pointers", "Sliding Window", "Hash Map", "Binary Search", "DFS", "BFS", "Backtracking", "Dynamic Programming", "Intervals", "Greedy", "Trie"];
export const systemDesignTopics = [
  { slug: "scalability", title: "Scalability", description: "Grow capacity deliberately while keeping the experience fast." },
  { slug: "availability", title: "Availability", description: "Design systems that remain useful when parts fail." },
  { slug: "estimation", title: "Estimation", description: "Turn vague scale into useful numbers for QPS, storage, and bandwidth." },
  { slug: "caching", title: "Caching", description: "Trade memory for faster reads without compromising correctness." }
];
export const systemDesignModules = [
  { title: "Quality Attributes", description: "What a good system must achieve, plus the techniques and components that make it possible.", lessons: ["Speed: latency, throughput, resource utilization", "Growth: scalability and elasticity", "Continuity: availability, reliability, fault tolerance, resilience", "Data correctness: consistency, integrity, durability", "Protection: security and compliance", "Operations: maintainability, observability, deployability, cost"], questions: [] },
  { title: "Calculations & Measurements", description: "A compact handbook for sizing traffic, storage, capacity, memory, bandwidth, and reliability.", lessons: ["Average, peak, read and write RPS", "Concurrent users and request capacity", "Server, CPU and memory sizing", "Storage growth, replication and backups", "Cache hit ratio, bandwidth and latency", "Availability, reliability and recovery targets"], questions: [] },
  { title: "System Design Patterns", description: "Reusable solutions for scaling, performance, consistency, resilience, communication, security, and operations.", lessons: ["Load balancing, caching, CDN, sharding and replication", "Queues, pub-sub, event sourcing and CQRS", "Circuit breaker, retry, rate limiting and bulkheads", "API gateway, service discovery and service mesh", "Rolling, canary and blue-green deployment", "Authentication, authorization, tracing and alerting"], questions: [] },
  { title: "Interview Questions", description: "Practice systems by technical pattern and domain, beginning with familiar utility systems.", lessons: ["Scalability: URL shortener, news feed, search engine", "Messaging: chat, notification service, email", "Storage and databases: Dropbox, distributed cache, key-value store", "Booking and payments: ticket booking, payment gateway", "Location and media: Uber, YouTube", "Observability and data: Kafka, logging, distributed database"], questions: [{ title: "Design a URL Shortener", difficulty: "Easy" }, { title: "Design a Rate Limiter", difficulty: "Easy" }, { title: "Design a Notification Service", difficulty: "Easy" }, { title: "Design a Chat System", difficulty: "Medium" }, { title: "Design a News Feed", difficulty: "Medium" }, { title: "Design a Ticket Booking System", difficulty: "Medium" }, { title: "Design a Payment System", difficulty: "Hard" }, { title: "Design Kafka", difficulty: "Hard" }, { title: "Design a Distributed Database", difficulty: "Hard" }, { title: "Design Uber", difficulty: "Hard" }, { title: "Design YouTube", difficulty: "Hard" }] }
];
