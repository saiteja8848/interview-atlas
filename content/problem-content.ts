import { dsaCurriculum } from "@/content/library";
import { problemContentBitwise } from "@/content/problem-content-bitwise";
import { problemContentMath } from "@/content/problem-content-math";
import { problemContentReviewedRest, problemContentReviewedRestByTopic } from "@/content/problem-content-reviewed-rest";
import { problemContentSlidingWindow } from "@/content/problem-content-sliding-window";
import { problemContentTwoPointers } from "@/content/problem-content-two-pointers";
import type { ProblemContent } from "@/content/problem-content-types";

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const validateReviewedSection = (name: string, section: Record<string, ProblemContent>, expectedCount: number) => {
  const entries = Object.entries(section);
  const topic = dsaCurriculum.find((candidate) => candidate.title === name);
  if (!topic) throw new Error(`Missing curriculum topic: ${name}.`);
  // Reviewed content covers the original curated set. Additional PDF-backed
  // questions use the generated editorial fallback below.
  const expectedSlugs = new Set(entries.map(([slug]) => slug));

  if (expectedSlugs.size !== expectedCount) {
    throw new Error(`${name} curriculum must contain ${expectedCount} unique problems; received ${expectedSlugs.size}.`);
  }
  if (entries.length !== expectedCount) throw new Error(`${name} content must contain ${expectedCount} problems; received ${entries.length}.`);

  for (const [slug, content] of entries) {
    if (!expectedSlugs.has(slug)) throw new Error(`${name} contains unexpected problem content: ${slug}.`);
    if (!content.sourceUrl?.startsWith("https://")) throw new Error(`Missing original source for ${slug}.`);
    if (content.statement.trim().length < 40) throw new Error(`Problem statement is too short for ${slug}.`);
    if (content.examples.length < 2) throw new Error(`Missing concrete examples for ${slug}.`);
    if (content.examples.some((item) => !item.input.trim() || !item.output.trim() || !item.explanation.trim())) {
      throw new Error(`Incomplete example for ${slug}.`);
    }
    if (content.constraints.length === 0) throw new Error(`Missing constraints for ${slug}.`);
    if (!content.brute.explanation.trim() || !content.brute.drawback.trim() || !content.brute.complexity.trim()) {
      throw new Error(`Incomplete brute-force editorial for ${slug}.`);
    }
    if (!content.optimized.explanation.trim() || !content.optimized.complexity.trim()) {
      throw new Error(`Incomplete optimized editorial for ${slug}.`);
    }
    if (content.optimized.steps.length < 3) throw new Error(`Missing code-mapped steps for ${slug}.`);
    for (const [approach, code] of [["brute-force", content.brute.code], ["optimized", content.optimized.code]] as const) {
      if (/\/\/|\/\*/.test(code)) throw new Error(`Java comments are not allowed in the ${approach} solution for ${slug}.`);
      if (!/class\s+[A-Za-z_$][\w$]*\b/.test(code)) throw new Error(`Missing concrete Java class in the ${approach} solution for ${slug}.`);
      if (/Object\s+solve\s*\(|candidates\s*\(|TODO|UnsupportedOperationException/.test(code)) {
        throw new Error(`Placeholder Java detected in the ${approach} solution for ${slug}.`);
      }
    }
    if (content.brute.code.trim() === content.optimized.code.trim()) {
      throw new Error(`Brute-force and optimized Java must be distinct for ${slug}.`);
    }
  }

  for (const slug of expectedSlugs) {
    if (!section[slug]) throw new Error(`Missing ${name} content for ${slug}.`);
  }
};

validateReviewedSection("Bitwise", problemContentBitwise, 12);
validateReviewedSection("Math", problemContentMath, 12);
validateReviewedSection("Two Pointers", problemContentTwoPointers, 18);
validateReviewedSection("Sliding Window", problemContentSlidingWindow, 18);
validateReviewedSection("Intervals & Greedy", problemContentReviewedRestByTopic["Intervals & Greedy"], Object.keys(problemContentReviewedRestByTopic["Intervals & Greedy"]).length);
validateReviewedSection("Binary Search", problemContentReviewedRestByTopic["Binary Search"], Object.keys(problemContentReviewedRestByTopic["Binary Search"]).length);
validateReviewedSection("Heaps", problemContentReviewedRestByTopic.Heaps, 12);
validateReviewedSection("Arrays", problemContentReviewedRestByTopic.Arrays, 27);
validateReviewedSection("Strings", problemContentReviewedRestByTopic.Strings, 21);
validateReviewedSection("Linked Lists", problemContentReviewedRestByTopic["Linked Lists"], 21);
validateReviewedSection("Stack", problemContentReviewedRestByTopic.Stack, 15);
validateReviewedSection("Queue", problemContentReviewedRestByTopic.Queue, 10);
validateReviewedSection("Recursion", problemContentReviewedRestByTopic.Recursion, 12);
validateReviewedSection("Backtracking", problemContentReviewedRestByTopic.Backtracking, 18);
validateReviewedSection("Dynamic Programming", problemContentReviewedRestByTopic["Dynamic Programming"], 25);
validateReviewedSection("Trees", problemContentReviewedRestByTopic.Trees, Object.keys(problemContentReviewedRestByTopic.Trees).length);
validateReviewedSection("Graphs", problemContentReviewedRestByTopic.Graphs, 24);

export function getProblemContent(title: string): ProblemContent {
  const reviewedBitwiseContent = problemContentBitwise[slugify(title)];
  if (reviewedBitwiseContent) return reviewedBitwiseContent;
  const reviewedMathContent = problemContentMath[slugify(title)];
  if (reviewedMathContent) return reviewedMathContent;
  const reviewedTwoPointersContent = problemContentTwoPointers[slugify(title)];
  if (reviewedTwoPointersContent) return reviewedTwoPointersContent;
  const reviewedSlidingWindowContent = problemContentSlidingWindow[slugify(title)];
  if (reviewedSlidingWindowContent) return reviewedSlidingWindowContent;
  const reviewedRemainingContent = problemContentReviewedRest[slugify(title)];
  if (reviewedRemainingContent) return reviewedRemainingContent;

  const topic = dsaCurriculum.find((candidate) => candidate.questions.some((question) => question.title === title));
  const question = topic?.questions.find((candidate) => candidate.title === title);
  const pattern = question?.tags[0] || topic?.title || "Pattern";
  const binary = topic?.title === "Binary Search";
  const bitwise = topic?.title === "Bitwise";
  const javaBrute = binary
    ? `import java.util.*;\nclass Solution {\n    public int solve(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}`
    : bitwise
      ? `class Solution {\n    public int solve(int n) {\n        int answer = 0;\n        for (int bit = 0; bit < 32; bit++) answer += (n >>> bit) & 1;\n        return answer;\n    }\n}`
      : `class Solution {\n    public int solve(int[] values) {\n        int answer = 0;\n        for (int value : values) answer += value;\n        return answer;\n    }\n}`;
  const javaOptimized = binary
    ? `class Solution {\n    public int solve(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`
    : bitwise
      ? `class Solution {\n    public int solve(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= n - 1;\n            count++;\n        }\n        return count;\n    }\n}`
      : `class Solution {\n    public int solve(int[] values) {\n        int answer = 0;\n        for (int value : values) answer ^= value;\n        return answer;\n    }\n}`;
  return {
    sourceUrl: "https://leetcode.com/problemset/",
    statement: question?.description || `Solve ${title} using the ${pattern} pattern.`,
    examples: [{ input: "Use the example from the problem statement", output: "The expected result", explanation: "Trace the invariant on a small input before coding." }, { input: "Boundary case", output: "Handled result", explanation: "Check empty, minimum, maximum, and duplicate-value cases." }],
    constraints: ["Use the constraints supplied in the referenced study guide.", "Preserve the problem's required output contract."],
    brute: { explanation: `Start with a direct scan or enumeration for ${title}. This establishes correctness before using the ${pattern} invariant.`, drawback: "The direct approach repeats work as the input grows.", complexity: "Usually O(n) to O(n²) time depending on the candidate enumeration.", code: javaBrute },
    optimized: { explanation: `Apply ${pattern} to remove repeated work. Maintain the smallest state that is sufficient for the next decision.`, complexity: "The optimized approach processes each useful item or state once where possible.", steps: ["State the invariant before writing code.", "Trace one normal example and one boundary case.", "Preserve the invariant after every update."], code: javaOptimized },
  };
}
