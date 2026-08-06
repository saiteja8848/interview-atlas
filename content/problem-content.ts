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
  const expectedSlugs = new Set(topic.questions.map((question) => slugify(question.title)));

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
validateReviewedSection("Intervals & Greedy", problemContentReviewedRestByTopic["Intervals & Greedy"], 12);
validateReviewedSection("Binary Search", problemContentReviewedRestByTopic["Binary Search"], 18);
validateReviewedSection("Heaps", problemContentReviewedRestByTopic.Heaps, 12);
validateReviewedSection("Arrays", problemContentReviewedRestByTopic.Arrays, 27);
validateReviewedSection("Strings", problemContentReviewedRestByTopic.Strings, 21);
validateReviewedSection("Linked Lists", problemContentReviewedRestByTopic["Linked Lists"], 21);
validateReviewedSection("Stack", problemContentReviewedRestByTopic.Stack, 15);
validateReviewedSection("Queue", problemContentReviewedRestByTopic.Queue, 10);
validateReviewedSection("Recursion", problemContentReviewedRestByTopic.Recursion, 12);
validateReviewedSection("Backtracking", problemContentReviewedRestByTopic.Backtracking, 18);
validateReviewedSection("Dynamic Programming", problemContentReviewedRestByTopic["Dynamic Programming"], 25);
validateReviewedSection("Trees", problemContentReviewedRestByTopic.Trees, 25);
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

  throw new Error(`Missing reviewed problem content for ${title}.`);
}
