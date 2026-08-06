import { problemContentA } from "@/content/problem-content-a";
import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const example = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });

const reviewed = (
  slug: string,
  sourceUrl: string,
  overrides: Partial<ProblemContent> = {},
): ProblemContent => {
  const content = problemContentA[slug];
  if (!content) throw new Error(`Missing Math content for ${slug}.`);
  return { ...content, ...overrides, sourceUrl };
};

export const problemContentMath: Record<string, ProblemContent> = {
  "palindrome-number": reviewed(
    "palindrome-number",
    "https://leetcode.com/problems/palindrome-number/description/",
  ),
  "plus-one": reviewed(
    "plus-one",
    "https://leetcode.com/problems/plus-one/description/",
    {
      examples: [
        example("digits = [1,2,3]", "[1,2,4]", "The array represents 123; adding one produces 124."),
        example("digits = [4,3,2,1]", "[4,3,2,2]", "The array represents 4321; adding one changes the final digit."),
        example("digits = [9]", "[1,0]", "Adding one to nine creates a new leading digit."),
      ],
    },
  ),
  "factorial-trailing-zeroes": reviewed(
    "factorial-trailing-zeroes",
    "https://leetcode.com/problems/factorial-trailing-zeroes/description/",
    {
      examples: [
        example("n = 3", "0", "3! equals 6, which has no trailing zero."),
        example("n = 5", "1", "5! equals 120, which has one trailing zero."),
        example("n = 0", "0", "0! equals 1, so it has no trailing zero."),
      ],
    },
  ),
  "happy-number": reviewed(
    "happy-number",
    "https://leetcode.com/problems/happy-number/description/",
    {
      examples: [
        example("n = 19", "true", "19 becomes 82, then 68, then 100, and finally 1."),
        example("n = 2", "false", "The digit-square sequence enters a cycle that does not contain one."),
      ],
    },
  ),
  "sqrt-x": reviewed(
    "sqrt-x",
    "https://leetcode.com/problems/sqrtx/description/",
    {
      examples: [
        example("x = 4", "2", "The square root of four is exactly two."),
        example("x = 8", "2", "The exact square root is about 2.828, which rounds down to two."),
      ],
      constraints: ["0 <= x <= 2^31 - 1", "Do not use a built-in exponent function or operator."],
    },
  ),
  "count-primes": reviewed(
    "count-primes",
    "https://leetcode.com/problems/count-primes/description/",
    {
      examples: [
        example("n = 10", "4", "The primes strictly below ten are 2, 3, 5, and 7."),
        example("n = 0", "0", "There are no prime numbers strictly below zero."),
        example("n = 1", "0", "There are no prime numbers strictly below one."),
      ],
    },
  ),
  "excel-sheet-column-number": reviewed(
    "excel-sheet-column-number",
    "https://leetcode.com/problems/excel-sheet-column-number/description/",
    {
      constraints: ["1 <= columnTitle.length <= 7", "columnTitle contains only uppercase English letters.", "columnTitle is between \"A\" and \"FXSHRXW\" inclusive."],
    },
  ),
  "roman-to-integer": reviewed(
    "roman-to-integer",
    "https://leetcode.com/problems/roman-to-integer/description/",
    {
      constraints: ["1 <= s.length <= 15", "s contains only I, V, X, L, C, D, and M.", "s is a valid Roman numeral representing a value from 1 through 3,999."],
    },
  ),
  "integer-to-roman": reviewed(
    "integer-to-roman",
    "https://leetcode.com/problems/integer-to-roman/description/",
  ),
  "fraction-to-recurring-decimal": reviewed(
    "fraction-to-recurring-decimal",
    "https://leetcode.com/problems/fraction-to-recurring-decimal/description/",
  ),
  "multiply-strings": reviewed(
    "multiply-strings",
    "https://leetcode.com/problems/multiply-strings/description/",
    {
      examples: [
        example('num1 = "2", num2 = "3"', '"6"', "Two multiplied by three is six."),
        example('num1 = "123", num2 = "456"', '"56088"', "Grade-school multiplication produces 56,088."),
      ],
    },
  ),
  "valid-square": reviewed(
    "valid-square",
    "https://leetcode.com/problems/valid-square/description/",
    {
      constraints: ["p1.length == p2.length == p3.length == p4.length == 2", "-10,000 <= each x and y coordinate <= 10,000"],
    },
  ),
};
