import { problemContentA } from "@/content/problem-content-a";
import type { ProblemContent } from "@/content/problem-content-types";

const reviewed = (slug: string): ProblemContent => {
  const content = problemContentA[slug];
  if (!content) throw new Error(`Missing Two Pointers content for ${slug}.`);
  return {
    ...content,
    sourceUrl: `https://leetcode.com/problems/${slug}/description/`,
  };
};

export const problemContentTwoPointers: Record<string, ProblemContent> = {
  "two-sum-ii-input-array-is-sorted": reviewed("two-sum-ii-input-array-is-sorted"),
  "3sum": reviewed("3sum"),
  "3sum-closest": reviewed("3sum-closest"),
  "4sum": reviewed("4sum"),
  "container-with-most-water": reviewed("container-with-most-water"),
  "trapping-rain-water": reviewed("trapping-rain-water"),
  "valid-palindrome": reviewed("valid-palindrome"),
  "reverse-string": reviewed("reverse-string"),
  "move-zeroes": reviewed("move-zeroes"),
  "remove-duplicates-from-sorted-array": reviewed("remove-duplicates-from-sorted-array"),
  "remove-element": reviewed("remove-element"),
  "sort-colors": reviewed("sort-colors"),
  "squares-of-a-sorted-array": reviewed("squares-of-a-sorted-array"),
  "backspace-string-compare": reviewed("backspace-string-compare"),
  "boats-to-save-people": reviewed("boats-to-save-people"),
  "next-permutation": reviewed("next-permutation"),
  "find-the-duplicate-number": reviewed("find-the-duplicate-number"),
  "is-subsequence": reviewed("is-subsequence"),
};
