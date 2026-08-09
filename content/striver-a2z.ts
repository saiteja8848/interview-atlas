export const STRIVER_A2Z_SHEET_URL = "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z";

const normalizeTitle = (value: string) => value
  .toLowerCase()
  .replace(/&/g, "and")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

// Verified against the live Striver A2Z sheet. The set includes direct matches
// plus conservative title aliases only when the underlying problem is the same.
const striverA2ZProblemSlugs = new Set([
  "3sum", "4sum", "accounts-merge", "add-two-numbers", "aggressive-cows", "alien-dictionary",
  "asteroid-collision", "balanced-binary-tree", "best-time-to-buy-and-sell-stock",
  "best-time-to-buy-and-sell-stock-with-cooldown", "binary-search", "binary-search-tree-iterator",
  "binary-tree-level-order-traversal", "binary-tree-maximum-path-sum", "binary-tree-right-side-view",
  "binary-tree-zigzag-level-order-traversal", "burst-balloons",
  "capacity-to-ship-packages-within-d-days", "cheapest-flights-within-k-stops", "climbing-stairs",
  "coin-change", "coin-change-ii", "combination-sum", "combination-sum-ii", "combination-sum-iii",
  "construct-binary-tree-from-preorder-and-inorder-traversal", "copy-list-with-random-pointer",
  "count-and-say", "count-primes", "course-schedule", "course-schedule-ii",
  "critical-connections-in-a-network", "delete-node-in-a-linked-list", "diameter-of-binary-tree",
  "distinct-subsequences", "divide-two-integers", "edit-distance", "fibonacci-number",
  "factorial",
  "find-first-and-last-position-of-element-in-sorted-array", "find-median-from-data-stream",
  "find-minimum-in-rotated-sorted-array", "find-peak-element", "flatten-binary-tree-to-linked-list",
  "fruit-into-baskets", "generate-parentheses", "house-robber", "house-robber-ii",
  "implement-queue-using-stacks", "implement-stack-using-queues", "implement-trie-prefix-tree",
  "insert-interval", "intersection-of-two-linked-lists", "is-graph-bipartite", "isomorphic-strings",
  "jump-game", "jump-game-ii", "koko-eating-bananas", "kth-largest-element-in-a-stream",
  "kth-largest-element-in-an-array",
  "kth-smallest-element-in-a-bst", "largest-rectangle-in-histogram",
  "letter-combinations-of-a-phone-number", "linked-list-cycle", "linked-list-cycle-ii",
  "longest-common-prefix", "longest-common-subsequence", "longest-consecutive-sequence",
  "longest-increasing-subsequence", "longest-palindromic-substring",
  "longest-repeating-character-replacement", "longest-subarray-with-sum-k",
  "longest-substring-with-at-most-k-distinct-characters", "longest-substring-without-repeating-characters",
  "lowest-common-ancestor-of-a-binary-search-tree", "lowest-common-ancestor-of-a-binary-tree",
  "lru-cache", "majority-element", "majority-element-ii", "max-consecutive-ones-iii",
  "maximum-depth-of-binary-tree", "maximum-product-subarray", "maximum-subarray",
  "median-of-two-sorted-arrays", "merge-intervals", "merge-k-sorted-lists", "merge-sorted-array",
  "merge-sort", "missing-number",
  "min-stack", "minimum-days-to-make-m-bouquets", "minimum-path-sum", "minimum-window-substring",
  "move-zeroes", "n-queens", "network-delay-time", "next-greater-element-i",
  "next-greater-element-ii", "next-permutation", "non-overlapping-intervals", "number-of-islands",
  "number-of-provinces", "odd-even-linked-list", "online-stock-span", "palindrome-linked-list",
  "number-of-1-bits",
  "palindrome-number", "palindrome-partitioning", "partition-equal-subset-sum", "pow-x-n",
  "pascal-s-triangle", "quick-sort",
  "power-of-two", "remove-duplicates-from-sorted-array", "remove-k-digits",
  "remove-nth-node-from-end-of-list", "reverse-linked-list", "reverse-nodes-in-k-group",
  "reverse-words-in-a-string", "roman-to-integer", "rotate-array", "rotate-image", "rotate-list",
  "rotting-oranges", "same-tree", "search-a-2d-matrix", "search-a-2d-matrix-ii",
  "search-in-rotated-sorted-array", "search-insert-position", "serialize-and-deserialize-binary-tree",
  "set-matrix-zeroes", "single-number", "sliding-window-maximum", "sort-colors", "sort-list",
  "spiral-matrix", "split-array-largest-sum", "string-to-integer-atoi", "subarray-sum-equals-k",
  "subarrays-with-k-different-integers", "subsets", "subsets-ii", "sudoku-solver",
  "surrounded-regions", "target-sum", "task-scheduler", "top-k-frequent-elements",
  "trapping-rain-water", "two-sum", "unique-paths", "unique-paths-ii", "valid-anagram",
  "valid-palindrome", "valid-parentheses", "validate-binary-search-tree", "word-break", "word-ladder",
  "word-search",
]);

export const isStriverA2ZProblem = (title: string) => striverA2ZProblemSlugs.has(normalizeTitle(title));
