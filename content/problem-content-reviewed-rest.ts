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

for (const topic of interview300Topics) {
  if (!reviewedTopicNames.has(topic.title)) continue;
  const section: Record<string, ProblemContent> = {};
  for (const [title] of topic.questions) {
    const slug = slugify(title);
    const entry = content[slug];
    if (!entry) throw new Error(`Missing reviewed content for ${topic.title}: ${title}.`);
    const reviewed = {
      ...entry,
      sourceUrl: sourceOverrides[slug] ?? `https://leetcode.com/problems/${slug}/description/`,
    };
    section[slug] = reviewed;
    problemContentReviewedRest[slug] = reviewed;
  }
  problemContentReviewedRestByTopic[topic.title] = section;
}
