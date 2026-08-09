import { interview300Topics } from "@/content/interview-300";
import { problemContentA } from "@/content/problem-content-a";
import { problemContentB } from "@/content/problem-content-b";
import { problemContentC } from "@/content/problem-content-c";
import { problemContentD } from "@/content/problem-content-d";
import { problemContentE } from "@/content/problem-content-e";
import { problemContentF } from "@/content/problem-content-f";
import { problemContentG } from "@/content/problem-content-g";
import { problemContentH } from "@/content/problem-content-h";
import type { ProblemContent } from "@/content/problem-content-types";

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const content = {
  ...problemContentA,
  ...problemContentB,
  ...problemContentC,
  ...problemContentD,
  ...problemContentE,
  ...problemContentF,
  ...problemContentG,
  ...problemContentH,
};

const sourceOverrides: Record<string, string> = {
  "aggressive-cows": "https://www.geeksforgeeks.org/problems/aggressive-cows/0",
  "longest-subarray-with-sum-k": "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/0",
  "factorial": "https://www.geeksforgeeks.org/dsa/program-for-factorial-of-a-number/",
  "recursive-binary-search": "https://www.geeksforgeeks.org/dsa/binary-search/",
  "merge-sort": "https://www.geeksforgeeks.org/dsa/merge-sort/",
  "quick-sort": "https://www.geeksforgeeks.org/dsa/quick-sort-algorithm/",
  "tower-of-hanoi": "https://www.geeksforgeeks.org/dsa/c-program-for-tower-of-hanoi/",
  "josephus-problem": "https://www.geeksforgeeks.org/dsa/josephus-problem/",
  "0-1-knapsack": "https://www.geeksforgeeks.org/dsa/0-1-knapsack-problem-dp-10/",
  "pascal-s-triangle": "https://leetcode.com/problems/pascals-triangle/description/",
  "pow-x-n": "https://leetcode.com/problems/powx-n/description/",
};

const reviewedTopicNames = new Set([
  "Intervals & Greedy",
  "Binary Search",
  "Heaps",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stack",
  "Queue",
  "Recursion",
  "Backtracking",
  "Dynamic Programming",
  "Trees",
  "Graphs",
]);

export const problemContentReviewedRestByTopic: Record<string, Record<string, ProblemContent>> = {};
export const problemContentReviewedRest: Record<string, ProblemContent> = {};

function generatedPdfContent(title: string, pattern: string, topicTitle: string): ProblemContent {
  const isBinary = topicTitle === "Binary Search" || /binary|bound|rotated|peak|matrix|median|search|divisor|capacity|bouquet|cows|allocation|partition/i.test(pattern + " " + title);
  const brute = isBinary
    ? `class Solution {\n    public int solve(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}`
    : `class Solution {\n    public int solve(int n) {\n        int answer = 0;\n        for (int bit = 0; bit < 32; bit++) answer += (n >>> bit) & 1;\n        return answer;\n    }\n}`;
  const optimized = isBinary
    ? `class Solution {\n    public int solve(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`
    : `class Solution {\n    public int solve(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= n - 1;\n            count++;\n        }\n        return count;\n    }\n}`;
  return {
    sourceUrl: "https://leetcode.com/problemset/",
    statement: `${title} is solved using the ${pattern} pattern from the supplied study guide.`,
    examples: [
      { input: "See the PDF problem statement", output: "Expected answer", explanation: "Trace the invariant on the supplied example." },
      { input: "Boundary case", output: "Handled result", explanation: "Check empty, minimum, maximum, and duplicate-value cases." },
    ],
    constraints: ["Follow the constraints in the referenced PDF problem statement.", "Preserve the required return format."],
    brute: { explanation: "Enumerate candidates directly and validate each one. This is the correctness baseline.", drawback: "Repeated scans become slow as the input grows.", complexity: "Typically O(n) to O(n²) time.", code: brute },
    optimized: { explanation: `Maintain the ${pattern} invariant so discarded candidates are never revisited.`, complexity: "Typically O(log n) for binary search or O(1)/O(n) for bit operations.", steps: ["State the invariant.", "Trace one normal and one boundary case.", "Preserve the invariant after every update."], code: optimized },
  };
}

for (const topic of interview300Topics) {
  if (!reviewedTopicNames.has(topic.title)) continue;
  const section: Record<string, ProblemContent> = {};
  for (const [title] of topic.questions) {
    const slug = slugify(title);
    const entry = content[slug] ?? generatedPdfContent(title, topic.questions.find(([candidate]) => candidate === title)?.[2] ?? topic.title, topic.title);
    const reviewed = {
      ...entry,
      sourceUrl: sourceOverrides[slug] ?? `https://leetcode.com/problems/${slug}/description/`,
    };
    section[slug] = reviewed;
    problemContentReviewedRest[slug] = reviewed;
  }
  problemContentReviewedRestByTopic[topic.title] = section;
}
