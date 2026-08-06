import { problemContentA } from "@/content/problem-content-a";
import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const example = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });

const reviewed = (slug: string, overrides: Partial<ProblemContent> = {}): ProblemContent => {
  const content = problemContentA[slug];
  if (!content) throw new Error(`Missing Sliding Window content for ${slug}.`);
  return {
    ...content,
    ...overrides,
    sourceUrl: `https://leetcode.com/problems/${slug}/description/`,
  };
};

export const problemContentSlidingWindow: Record<string, ProblemContent> = {
  "best-time-to-buy-and-sell-stock": reviewed("best-time-to-buy-and-sell-stock"),
  "longest-substring-without-repeating-characters": reviewed("longest-substring-without-repeating-characters"),
  "longest-repeating-character-replacement": reviewed("longest-repeating-character-replacement"),
  "permutation-in-string": reviewed("permutation-in-string"),
  "find-all-anagrams-in-a-string": reviewed("find-all-anagrams-in-a-string"),
  "minimum-window-substring": reviewed("minimum-window-substring"),
  "minimum-size-subarray-sum": reviewed("minimum-size-subarray-sum"),
  "maximum-average-subarray-i": reviewed("maximum-average-subarray-i"),
  "sliding-window-maximum": reviewed("sliding-window-maximum"),
  "fruit-into-baskets": reviewed("fruit-into-baskets"),
  "subarray-product-less-than-k": reviewed("subarray-product-less-than-k"),
  "max-consecutive-ones-iii": reviewed("max-consecutive-ones-iii", {
    examples: [
      example(
        "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
        "6",
        "Flipping two zeroes creates a longest contiguous run of six ones.",
      ),
      example(
        "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
        "10",
        "Choosing three zeroes inside the best window creates ten consecutive ones.",
      ),
    ],
  }),
  "subarrays-with-k-different-integers": reviewed("subarrays-with-k-different-integers"),
  "longest-substring-with-at-most-k-distinct-characters": reviewed("longest-substring-with-at-most-k-distinct-characters"),
  "minimum-consecutive-cards-to-pick-up": reviewed("minimum-consecutive-cards-to-pick-up"),
  "grumpy-bookstore-owner": reviewed("grumpy-bookstore-owner"),
  "maximum-number-of-vowels-in-a-substring-of-given-length": reviewed("maximum-number-of-vowels-in-a-substring-of-given-length"),
  "substring-with-concatenation-of-all-words": reviewed("substring-with-concatenation-of-all-words"),
};
