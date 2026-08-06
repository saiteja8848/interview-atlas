import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const e = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });
const p = (
  statement: string,
  examples: ProblemExample[],
  constraints: string[],
  bruteExplanation: string,
  drawback: string,
  bruteComplexity: string,
  bruteCode: string,
  optimizedExplanation: string,
  optimizedComplexity: string,
  steps: string[],
  optimizedCode: string,
): ProblemContent => ({
  statement,
  examples,
  constraints,
  brute: { explanation: bruteExplanation, drawback, complexity: bruteComplexity, code: bruteCode },
  optimized: { explanation: optimizedExplanation, complexity: optimizedComplexity, steps, code: optimizedCode },
});

export const problemContentF: Record<string, ProblemContent> = {
  "climbing-stairs": p(
    "A staircase has n steps. Each move climbs either one or two steps. Return the number of distinct move sequences that reach exactly the top.",
    [e("n = 2", "2", "The sequences are 1+1 and 2."), e("n = 3", "3", "The sequences are 1+1+1, 1+2, and 2+1.")],
    ["1 <= n <= 45"],
    "From step n, the final move came from n - 1 or n - 2. Recursively count both possibilities and add them, using one way for step zero and one.",
    "The same remaining step count is solved repeatedly, creating an exponential recursion tree.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int climbStairs(int n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
  }
}`,
    "Memoize the answer for each remaining step count. The recurrence stays identical, but every state from zero through n is evaluated once.",
    "Time O(n), space O(n).",
    ["Create a memo array indexed by remaining steps.", "Return one for the zero-step and one-step base cases.", "Store count(n - 1) + count(n - 2) before returning it."],
    `class Solution {
  public int climbStairs(int n) {
    return count(n, new int[n + 1]);
  }
  private int count(int n, int[] memo) {
    if (n <= 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = count(n - 1, memo) + count(n - 2, memo);
    return memo[n];
  }
}`,
  ),
  "min-cost-climbing-stairs": p(
    "Each stair has a cost paid when stepped on. Start at index 0 or 1, move one or two positions at a time, and return the minimum cost needed to move beyond the final stair.",
    [e("cost = [10,15,20]", "15", "Start at the middle stair and jump to the top."), e("cost = [1,100,1,1,1,100,1,1,100,1]", "6", "Choosing the low-cost stairs produces total cost six.")],
    ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
    "Recursively try both next jumps from a stair. The cost from index i is cost[i] plus the smaller result from i + 1 and i + 2; moving past the array costs zero.",
    "Overlapping suffixes are recomputed throughout the recursion tree.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int minCostClimbingStairs(int[] cost) {
    return Math.min(solve(cost, 0), solve(cost, 1));
  }
  private int solve(int[] cost, int index) {
    if (index >= cost.length) return 0;
    return cost[index] + Math.min(solve(cost, index + 1), solve(cost, index + 2));
  }
}`,
    "Cache the minimum cost from every index. The two legal starting positions then share the same memoized suffix calculations.",
    "Time O(n), space O(n).",
    ["Allocate memo and fill it with an uncomputed marker.", "For index i, recursively evaluate the one-step and two-step suffixes.", "Cache cost[i] plus the smaller suffix and take the smaller starting result."],
    `class Solution {
  public int minCostClimbingStairs(int[] cost) {
    int[] memo = new int[cost.length];
    java.util.Arrays.fill(memo, -1);
    return Math.min(solve(cost, 0, memo), solve(cost, 1, memo));
  }
  private int solve(int[] cost, int index, int[] memo) {
    if (index >= cost.length) return 0;
    if (memo[index] != -1) return memo[index];
    memo[index] = cost[index] + Math.min(solve(cost, index + 1, memo), solve(cost, index + 2, memo));
    return memo[index];
  }
}`,
  ),
  "house-robber": p(
    "Houses stand in a line, and adjacent houses cannot both be robbed. Return the maximum amount obtainable without selecting adjacent indices.",
    [e("nums = [1,2,3,1]", "4", "Rob houses with values one and three."), e("nums = [2,7,9,3,1]", "12", "Rob values two, nine, and one.")],
    ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    "At each index, either skip the house or rob it and continue two positions later. Recursively return the better choice.",
    "Both branches repeatedly solve the same suffix indices.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int rob(int[] nums) {
    return solve(nums, 0);
  }
  private int solve(int[] nums, int index) {
    if (index >= nums.length) return 0;
    return Math.max(solve(nums, index + 1), nums[index] + solve(nums, index + 2));
  }
}`,
    "Memoize the best amount obtainable from each index. Each state evaluates the same take-or-skip recurrence once.",
    "Time O(n), space O(n).",
    ["Use index as the DP state.", "Compute skip from index + 1 and take from nums[index] plus index + 2.", "Cache and return the larger result."],
    `class Solution {
  public int rob(int[] nums) {
    int[] memo = new int[nums.length];
    java.util.Arrays.fill(memo, -1);
    return solve(nums, 0, memo);
  }
  private int solve(int[] nums, int index, int[] memo) {
    if (index >= nums.length) return 0;
    if (memo[index] != -1) return memo[index];
    memo[index] = Math.max(solve(nums, index + 1, memo), nums[index] + solve(nums, index + 2, memo));
    return memo[index];
  }
}`,
  ),
  "house-robber-ii": p(
    "Houses form a circle, so the first and last houses are adjacent. Return the maximum amount obtainable without robbing adjacent houses.",
    [e("nums = [2,3,2]", "3", "The two value-two houses are adjacent through the circle."), e("nums = [1,2,3,1]", "4", "Rob values one and three."), e("nums = [1,2,3]", "3", "Rob the final house only.")],
    ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    "Break the circle into two legal linear cases: exclude the last house or exclude the first. Recursively solve each case with take-or-skip branching.",
    "The split handles the circle, but each linear recursion still recomputes overlapping suffixes exponentially.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(solve(nums, 0, nums.length - 2), solve(nums, 1, nums.length - 1));
  }
  private int solve(int[] nums, int index, int end) {
    if (index > end) return 0;
    return Math.max(solve(nums, index + 1, end), nums[index] + solve(nums, index + 2, end));
  }
}`,
    "Memoize each of the two linear ranges separately. The better range result is the circular answer because every valid solution excludes at least one endpoint.",
    "Time O(n), space O(n).",
    ["Handle the one-house boundary case.", "Memoize the range from 0 through n - 2.", "Memoize the range from 1 through n - 1 and return the larger result."],
    `class Solution {
  public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(run(nums, 0, nums.length - 2), run(nums, 1, nums.length - 1));
  }
  private int run(int[] nums, int start, int end) {
    int[] memo = new int[nums.length];
    java.util.Arrays.fill(memo, -1);
    return solve(nums, start, end, memo);
  }
  private int solve(int[] nums, int index, int end, int[] memo) {
    if (index > end) return 0;
    if (memo[index] != -1) return memo[index];
    memo[index] = Math.max(solve(nums, index + 1, end, memo), nums[index] + solve(nums, index + 2, end, memo));
    return memo[index];
  }
}`,
  ),
  "delete-and-earn": p(
    "Choosing a value earns that value for each chosen occurrence and deletes every occurrence of its immediate neighbors. Return the maximum points obtainable.",
    [e("nums = [3,4,2]", "6", "Choosing both threes and then two earns six."), e("nums = [2,2,3,3,3,4]", "9", "Choosing all three copies of three earns nine.")],
    ["1 <= nums.length <= 20000", "1 <= nums[i] <= 10000"],
    "Aggregate the total points for each value. At value v, either skip it or take all its points and continue at v + 2.",
    "The recursion repeatedly evaluates the same next value positions.",
    "Time O(2^M + n), space O(M), where M is the maximum value.",
    `class Solution {
  public int deleteAndEarn(int[] nums) {
    int maximum = 0;
    for (int value : nums) maximum = Math.max(maximum, value);
    int[] points = new int[maximum + 1];
    for (int value : nums) points[value] += value;
    return solve(points, 0);
  }
  private int solve(int[] points, int value) {
    if (value >= points.length) return 0;
    return Math.max(solve(points, value + 1), points[value] + solve(points, value + 2));
  }
}`,
    "Memoize the best score from each value. This is House Robber over the aggregated value line: adjacent values cannot both be selected.",
    "Time O(n + M), space O(M).",
    ["Sum all occurrences into points[value].", "At each value compare skipping it with taking it and jumping two values.", "Cache every value state and return the result from zero."],
    `class Solution {
  public int deleteAndEarn(int[] nums) {
    int maximum = 0;
    for (int value : nums) maximum = Math.max(maximum, value);
    int[] points = new int[maximum + 1];
    for (int value : nums) points[value] += value;
    int[] memo = new int[maximum + 1];
    java.util.Arrays.fill(memo, -1);
    return solve(points, 0, memo);
  }
  private int solve(int[] points, int value, int[] memo) {
    if (value >= points.length) return 0;
    if (memo[value] != -1) return memo[value];
    memo[value] = Math.max(solve(points, value + 1, memo), points[value] + solve(points, value + 2, memo));
    return memo[value];
  }
}`,
  ),
  "coin-change": p(
    "Given coin denominations and an amount, return the fewest coins whose values sum exactly to the amount, or -1 when no combination exists. Every denomination may be reused.",
    [e("coins = [1,2,5], amount = 11", "3", "Two fives and one one use three coins."), e("coins = [2], amount = 3", "-1", "No number of twos makes three."), e("coins = [1], amount = 0", "0", "The empty choice makes amount zero.")],
    ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10000"],
    "For the remaining amount, try using each coin and recursively solve the smaller remainder. Return one plus the smallest valid child result.",
    "Different coin orders reach the same remaining amount, causing exponential recomputation.",
    "Time O(c^amount), space O(amount).",
    `class Solution {
  public int coinChange(int[] coins, int amount) {
    int answer = solve(coins, amount);
    return answer >= 1000000000 ? -1 : answer;
  }
  private int solve(int[] coins, int remaining) {
    if (remaining == 0) return 0;
    if (remaining < 0) return 1000000000;
    int best = 1000000000;
    for (int coin : coins) best = Math.min(best, 1 + solve(coins, remaining - coin));
    return best;
  }
}`,
    "Memoize the minimum coins for each remaining amount. Each amount is computed once by checking every denomination.",
    "Time O(amount * coins.length), space O(amount).",
    ["Use remaining amount as the memo key.", "Return zero at remaining zero and an impossible sentinel below zero.", "Cache one plus the smallest memoized child, converting the final sentinel to -1."],
    `class Solution {
  public int coinChange(int[] coins, int amount) {
    int[] memo = new int[amount + 1];
    java.util.Arrays.fill(memo, -2);
    int answer = solve(coins, amount, memo);
    return answer >= 1000000000 ? -1 : answer;
  }
  private int solve(int[] coins, int remaining, int[] memo) {
    if (remaining == 0) return 0;
    if (remaining < 0) return 1000000000;
    if (memo[remaining] != -2) return memo[remaining];
    int best = 1000000000;
    for (int coin : coins) best = Math.min(best, 1 + solve(coins, remaining - coin, memo));
    memo[remaining] = best;
    return best;
  }
}`,
  ),
  "coin-change-ii": p(
    "Return the number of combinations of the given coin denominations that sum to amount. A coin may be reused, and different orders of the same chosen values count once.",
    [e("amount = 5, coins = [1,2,5]", "4", "The combinations are 5, 2+2+1, 2+1+1+1, and five ones."), e("amount = 3, coins = [2]", "0", "Twos cannot form three."), e("amount = 10, coins = [10]", "1", "One ten forms the amount.")],
    ["0 <= amount <= 5000", "1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "All coin values are unique."],
    "At coin index i, either skip that denomination or use it once and remain at i so it can be reused. Reaching amount zero contributes one combination.",
    "The same pair of coin index and remaining amount appears in many branches.",
    "Exponential time, O(coins.length + amount) recursion space.",
    `class Solution {
  public int change(int amount, int[] coins) {
    return solve(coins, 0, amount);
  }
  private int solve(int[] coins, int index, int remaining) {
    if (remaining == 0) return 1;
    if (index == coins.length || remaining < 0) return 0;
    return solve(coins, index + 1, remaining) + solve(coins, index, remaining - coins[index]);
  }
}`,
    "Memoize each (index, remaining) state. Keeping index unchanged on the take branch preserves unlimited reuse without counting permutations.",
    "Time O(coins.length * amount), space O(coins.length * amount).",
    ["Use denomination index and remaining amount as the state.", "Add the skip branch and the reuse-current-coin branch.", "Cache the total and return the state at index zero and the full amount."],
    `class Solution {
  public int change(int amount, int[] coins) {
    Integer[][] memo = new Integer[coins.length][amount + 1];
    return solve(coins, 0, amount, memo);
  }
  private int solve(int[] coins, int index, int remaining, Integer[][] memo) {
    if (remaining == 0) return 1;
    if (index == coins.length || remaining < 0) return 0;
    if (memo[index][remaining] != null) return memo[index][remaining];
    memo[index][remaining] = solve(coins, index + 1, remaining, memo) + solve(coins, index, remaining - coins[index], memo);
    return memo[index][remaining];
  }
}`,
  ),
  "combination-sum-iv": p(
    "Given distinct positive nums and target, return the number of ordered sequences whose sum is target. Values may be reused, and different orders count separately.",
    [e("nums = [1,2,3], target = 4", "7", "The seven ordered sequences include 1+3 and 3+1 separately."), e("nums = [9], target = 3", "0", "Nine cannot contribute to a sum of three.")],
    ["1 <= nums.length <= 200", "1 <= nums[i] <= 1000", "All nums values are distinct.", "1 <= target <= 1000", "The answer fits in a 32-bit integer."],
    "For every remaining total, try every value as the next sequence element and recursively count ways to finish.",
    "Many different prefixes leave the same remaining total, so their suffix counts are recomputed.",
    "Time O(nums.length^target), space O(target).",
    `class Solution {
  public int combinationSum4(int[] nums, int target) {
    return solve(nums, target);
  }
  private int solve(int[] nums, int remaining) {
    if (remaining == 0) return 1;
    if (remaining < 0) return 0;
    int ways = 0;
    for (int value : nums) ways += solve(nums, remaining - value);
    return ways;
  }
}`,
    "Memoize the number of ordered completions for each remaining total. Trying every possible next value preserves sequence order.",
    "Time O(target * nums.length), space O(target).",
    ["Use remaining target as the state.", "Return one when remaining reaches zero.", "Sum every next-value state once, cache it, and return the target state."],
    `class Solution {
  public int combinationSum4(int[] nums, int target) {
    int[] memo = new int[target + 1];
    java.util.Arrays.fill(memo, -1);
    memo[0] = 1;
    return solve(nums, target, memo);
  }
  private int solve(int[] nums, int remaining, int[] memo) {
    if (remaining < 0) return 0;
    if (memo[remaining] != -1) return memo[remaining];
    int ways = 0;
    for (int value : nums) ways += solve(nums, remaining - value, memo);
    memo[remaining] = ways;
    return ways;
  }
}`,
  ),
  "partition-equal-subset-sum": p(
    "Return whether the positive integer array can be split into two subsets having equal sums.",
    [e("nums = [1,5,11,5]", "true", "One subset is [11] and the other is [1,5,5]."), e("nums = [1,2,3,5]", "false", "No subset has half of the total sum.")],
    ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    "If the total is even, recursively choose whether each value belongs to a subset whose sum must reach total / 2.",
    "The same index and remaining target combination is reached through many choice paths.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int value : nums) sum += value;
    return sum % 2 == 0 && solve(nums, 0, sum / 2);
  }
  private boolean solve(int[] nums, int index, int remaining) {
    if (remaining == 0) return true;
    if (index == nums.length || remaining < 0) return false;
    return solve(nums, index + 1, remaining) || solve(nums, index + 1, remaining - nums[index]);
  }
}`,
    "Memoize each index and remaining half-sum. A true state immediately stops further exploration.",
    "Time O(n * target), space O(n * target), where target is half the total.",
    ["Reject an odd total and set target to half an even total.", "At each index try skipping and taking the value.", "Cache the boolean result for (index, remaining)."],
    `class Solution {
  public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int value : nums) sum += value;
    if (sum % 2 != 0) return false;
    Boolean[][] memo = new Boolean[nums.length][sum / 2 + 1];
    return solve(nums, 0, sum / 2, memo);
  }
  private boolean solve(int[] nums, int index, int remaining, Boolean[][] memo) {
    if (remaining == 0) return true;
    if (index == nums.length || remaining < 0) return false;
    if (memo[index][remaining] != null) return memo[index][remaining];
    memo[index][remaining] = solve(nums, index + 1, remaining, memo) || solve(nums, index + 1, remaining - nums[index], memo);
    return memo[index][remaining];
  }
}`,
  ),
  "target-sum": p(
    "Place either a plus or minus sign before every number. Return how many resulting expressions evaluate to target.",
    [e("nums = [1,1,1,1,1], target = 3", "5", "Five sign assignments produce three."), e("nums = [1], target = 1", "1", "The positive sign is the only valid assignment.")],
    ["1 <= nums.length <= 20", "0 <= nums[i] <= 1000", "0 <= sum(nums) <= 1000", "-1000 <= target <= 1000"],
    "At each index, branch by adding the value or subtracting it. Count a path when all numbers are used and the running total equals target.",
    "Different sign prefixes often reach the same (index, total) state and repeat its entire suffix tree.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int findTargetSumWays(int[] nums, int target) {
    return solve(nums, 0, 0, target);
  }
  private int solve(int[] nums, int index, int sum, int target) {
    if (index == nums.length) return sum == target ? 1 : 0;
    return solve(nums, index + 1, sum + nums[index], target) + solve(nums, index + 1, sum - nums[index], target);
  }
}`,
    "Memoize the number of completions for each index and running sum. Encode both integers in one long key so negative totals remain distinct.",
    "Time O(n * totalSum), space O(n * totalSum).",
    ["Use index and running sum as the state.", "Add the positive-sign and negative-sign child counts.", "Cache the total before returning it."],
    `class Solution {
  public int findTargetSumWays(int[] nums, int target) {
    return solve(nums, 0, 0, target, new java.util.HashMap<>());
  }
  private int solve(int[] nums, int index, int sum, int target, java.util.Map<Long, Integer> memo) {
    if (index == nums.length) return sum == target ? 1 : 0;
    long key = ((long) index << 32) ^ (sum & 0xffffffffL);
    if (memo.containsKey(key)) return memo.get(key);
    int ways = solve(nums, index + 1, sum + nums[index], target, memo) + solve(nums, index + 1, sum - nums[index], target, memo);
    memo.put(key, ways);
    return ways;
  }
}`,
  ),
  "0-1-knapsack": p(
    "Given item weights, item values, and a capacity, return the greatest total value obtainable when every item may be selected at most once.",
    [e("capacity = 4, values = [1,2,3], weights = [4,5,1]", "3", "Only the third item gives the best value within capacity."), e("capacity = 3, values = [1,2,3], weights = [4,5,6]", "0", "No item fits.")],
    ["values.length == weights.length", "All weights and values are nonnegative.", "Each item can be used at most once."],
    "At each item, either skip it or take it when its weight fits, reducing the remaining capacity.",
    "The same item index and remaining capacity is recomputed through many subsets.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int knapSack(int capacity, int[] weights, int[] values) {
    return solve(weights, values, 0, capacity);
  }
  private int solve(int[] weights, int[] values, int index, int capacity) {
    if (index == weights.length) return 0;
    int best = solve(weights, values, index + 1, capacity);
    if (weights[index] <= capacity) best = Math.max(best, values[index] + solve(weights, values, index + 1, capacity - weights[index]));
    return best;
  }
}`,
    "Memoize the best value for every (index, remaining capacity) pair. Advancing the index on both branches enforces the 0/1 rule.",
    "Time O(n * capacity), space O(n * capacity).",
    ["Use item index and remaining capacity as the state.", "Compute the skip value, then the take value only when the item fits.", "Cache and return the larger value."],
    `class Solution {
  public int knapSack(int capacity, int[] weights, int[] values) {
    Integer[][] memo = new Integer[weights.length][capacity + 1];
    return solve(weights, values, 0, capacity, memo);
  }
  private int solve(int[] weights, int[] values, int index, int capacity, Integer[][] memo) {
    if (index == weights.length) return 0;
    if (memo[index][capacity] != null) return memo[index][capacity];
    int best = solve(weights, values, index + 1, capacity, memo);
    if (weights[index] <= capacity) best = Math.max(best, values[index] + solve(weights, values, index + 1, capacity - weights[index], memo));
    memo[index][capacity] = best;
    return best;
  }
}`,
  ),
  "longest-increasing-subsequence": p(
    "Return the length of the longest strictly increasing subsequence. Chosen values keep their original order but need not be contiguous.",
    [e("nums = [10,9,2,5,3,7,101,18]", "4", "One longest subsequence is [2,3,7,101]."), e("nums = [0,1,0,3,2,3]", "4", "One answer is [0,1,2,3]."), e("nums = [7,7,7,7,7]", "1", "Strict increase allows only one equal value.")],
    ["1 <= nums.length <= 2500", "-10000 <= nums[i] <= 10000"],
    "At each index, skip the value or take it when it exceeds the previously selected value. Track the previous index in the recursion state.",
    "The same current and previous-index combinations recur exponentially.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int lengthOfLIS(int[] nums) {
    return solve(nums, 0, -1);
  }
  private int solve(int[] nums, int index, int previous) {
    if (index == nums.length) return 0;
    int best = solve(nums, index + 1, previous);
    if (previous == -1 || nums[index] > nums[previous]) best = Math.max(best, 1 + solve(nums, index + 1, index));
    return best;
  }
}`,
    "Memoize current index and previous index shifted by one. Each of the O(n squared) states evaluates the same take-or-skip rule once.",
    "Time O(n^2), space O(n^2).",
    ["Represent no previous choice with column zero.", "Compare skipping with taking when strict increase holds.", "Cache the result for (index, previous + 1)."],
    `class Solution {
  public int lengthOfLIS(int[] nums) {
    Integer[][] memo = new Integer[nums.length][nums.length + 1];
    return solve(nums, 0, -1, memo);
  }
  private int solve(int[] nums, int index, int previous, Integer[][] memo) {
    if (index == nums.length) return 0;
    if (memo[index][previous + 1] != null) return memo[index][previous + 1];
    int best = solve(nums, index + 1, previous, memo);
    if (previous == -1 || nums[index] > nums[previous]) best = Math.max(best, 1 + solve(nums, index + 1, index, memo));
    memo[index][previous + 1] = best;
    return best;
  }
}`,
  ),
  "russian-doll-envelopes": p(
    "An envelope fits inside another only when both its width and height are strictly smaller. Return the maximum number of envelopes that can be nested.",
    [e("envelopes = [[5,4],[6,4],[6,7],[2,3]]", "3", "[2,3] fits in [5,4], which fits in [6,7]."), e("envelopes = [[1,1],[1,1],[1,1]]", "1", "Equal dimensions cannot nest.")],
    ["1 <= envelopes.length <= 100000", "envelopes[i].length == 2", "1 <= width, height <= 100000"],
    "Sort by width and recursively take or skip each envelope when both dimensions exceed the previous choice.",
    "The exponential recursion is too slow and the repeated pair comparisons ignore the one-dimensional LIS reduction.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int maxEnvelopes(int[][] envelopes) {
    java.util.Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
    return solve(envelopes, 0, -1);
  }
  private int solve(int[][] envelopes, int index, int previous) {
    if (index == envelopes.length) return 0;
    int best = solve(envelopes, index + 1, previous);
    if (previous == -1 || envelopes[index][0] > envelopes[previous][0] && envelopes[index][1] > envelopes[previous][1]) best = Math.max(best, 1 + solve(envelopes, index + 1, index));
    return best;
  }
}`,
    "Sort widths ascending but equal widths by height descending. Equal-width envelopes then cannot join the same increasing height sequence, so binary-search LIS on heights gives the nesting depth.",
    "Time O(n log n), space O(n).",
    ["Sort by width ascending and equal-width height descending.", "Maintain tails[length] as the smallest ending height for that length.", "Binary-search each height into tails and return the number of occupied positions."],
    `class Solution {
  public int maxEnvelopes(int[][] envelopes) {
    java.util.Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(b[1], a[1]));
    int[] tails = new int[envelopes.length];
    int size = 0;
    for (int[] envelope : envelopes) {
      int left = 0;
      int right = size;
      while (left < right) {
        int mid = left + (right - left) / 2;
        if (tails[mid] < envelope[1]) left = mid + 1;
        else right = mid;
      }
      tails[left] = envelope[1];
      if (left == size) size++;
    }
    return size;
  }
}`,
  ),
  "longest-common-subsequence": p(
    "Return the length of the longest sequence of characters appearing in both strings in the same relative order, without requiring contiguity.",
    [e('text1 = "abcde", text2 = "ace"', "3", "The characters a, c, and e form a common subsequence."), e('text1 = "abc", text2 = "abc"', "3", "The complete strings match."), e('text1 = "abc", text2 = "def"', "0", "No character is shared.")],
    ["1 <= text1.length, text2.length <= 1000", "Both strings contain lowercase English letters."],
    "When current characters match, consume both and add one. Otherwise skip one character from either string and keep the better result.",
    "Mismatch branches repeatedly solve the same suffix pair.",
    "Time O(2^(m+n)), space O(m+n).",
    `class Solution {
  public int longestCommonSubsequence(String text1, String text2) {
    return solve(text1, text2, 0, 0);
  }
  private int solve(String a, String b, int i, int j) {
    if (i == a.length() || j == b.length()) return 0;
    if (a.charAt(i) == b.charAt(j)) return 1 + solve(a, b, i + 1, j + 1);
    return Math.max(solve(a, b, i + 1, j), solve(a, b, i, j + 1));
  }
}`,
    "Memoize every pair of suffix starts. There are only m times n distinct pairs, and each performs constant work beyond its child states.",
    "Time O(mn), space O(mn).",
    ["Use indices i and j as the state.", "On equal characters, add one and advance both.", "On a mismatch, cache the larger one-sided skip result."],
    `class Solution {
  public int longestCommonSubsequence(String text1, String text2) {
    Integer[][] memo = new Integer[text1.length()][text2.length()];
    return solve(text1, text2, 0, 0, memo);
  }
  private int solve(String a, String b, int i, int j, Integer[][] memo) {
    if (i == a.length() || j == b.length()) return 0;
    if (memo[i][j] != null) return memo[i][j];
    if (a.charAt(i) == b.charAt(j)) memo[i][j] = 1 + solve(a, b, i + 1, j + 1, memo);
    else memo[i][j] = Math.max(solve(a, b, i + 1, j, memo), solve(a, b, i, j + 1, memo));
    return memo[i][j];
  }
}`,
  ),
  "edit-distance": p(
    "Return the minimum number of single-character insertions, deletions, and replacements needed to transform word1 into word2.",
    [e('word1 = "horse", word2 = "ros"', "3", "Replace h with r, delete the second r, and delete e."), e('word1 = "intention", word2 = "execution"', "5", "Five edits transform the first word into the second.")],
    ["0 <= word1.length, word2.length <= 500", "Both strings contain lowercase English letters."],
    "Matching characters advance together for free. On a mismatch, recursively try insert, delete, and replace, then add one to the cheapest result.",
    "The three branches revisit the same suffix pairs exponentially.",
    "Time O(3^(m+n)), space O(m+n).",
    `class Solution {
  public int minDistance(String word1, String word2) {
    return solve(word1, word2, 0, 0);
  }
  private int solve(String a, String b, int i, int j) {
    if (i == a.length()) return b.length() - j;
    if (j == b.length()) return a.length() - i;
    if (a.charAt(i) == b.charAt(j)) return solve(a, b, i + 1, j + 1);
    int insert = solve(a, b, i, j + 1);
    int delete = solve(a, b, i + 1, j);
    int replace = solve(a, b, i + 1, j + 1);
    return 1 + Math.min(insert, Math.min(delete, replace));
  }
}`,
    "Memoize each pair of word indices. Base cases directly count the unconsumed suffix that must be inserted or deleted.",
    "Time O(mn), space O(mn).",
    ["Use positions in both words as the state.", "Return the other suffix length when one word is exhausted.", "Cache either the free match transition or one plus the minimum edit transition."],
    `class Solution {
  public int minDistance(String word1, String word2) {
    Integer[][] memo = new Integer[word1.length()][word2.length()];
    return solve(word1, word2, 0, 0, memo);
  }
  private int solve(String a, String b, int i, int j, Integer[][] memo) {
    if (i == a.length()) return b.length() - j;
    if (j == b.length()) return a.length() - i;
    if (memo[i][j] != null) return memo[i][j];
    if (a.charAt(i) == b.charAt(j)) memo[i][j] = solve(a, b, i + 1, j + 1, memo);
    else memo[i][j] = 1 + Math.min(solve(a, b, i, j + 1, memo), Math.min(solve(a, b, i + 1, j, memo), solve(a, b, i + 1, j + 1, memo)));
    return memo[i][j];
  }
}`,
  ),
  "distinct-subsequences": p(
    "Return the number of distinct ways to delete characters from s so the remaining characters equal t.",
    [e('s = "rabbbit", t = "rabbit"', "3", "Three choices of which repeated b to omit produce rabbit."), e('s = "babgbag", t = "bag"', "5", "Five index selections spell bag.")],
    ["1 <= s.length, t.length <= 1000", "Both strings contain English letters.", "The answer fits in a signed 32-bit integer."],
    "At each source character, skip it. When it matches the next target character, also count the branch that uses it.",
    "The same pair of source and target positions is recomputed along many selection paths.",
    "Time O(2^|s|), space O(|s| + |t|).",
    `class Solution {
  public int numDistinct(String s, String t) {
    return solve(s, t, 0, 0);
  }
  private int solve(String s, String t, int i, int j) {
    if (j == t.length()) return 1;
    if (i == s.length()) return 0;
    int ways = solve(s, t, i + 1, j);
    if (s.charAt(i) == t.charAt(j)) ways += solve(s, t, i + 1, j + 1);
    return ways;
  }
}`,
    "Memoize each (source index, target index) pair. Once t is fully matched, that branch contributes exactly one distinct deletion choice.",
    "Time O(|s| * |t|), space O(|s| * |t|).",
    ["Use source and target positions as the state.", "Always count skipping the source character.", "When characters match, add the consume-both branch and cache the sum."],
    `class Solution {
  public int numDistinct(String s, String t) {
    Integer[][] memo = new Integer[s.length()][t.length()];
    return solve(s, t, 0, 0, memo);
  }
  private int solve(String s, String t, int i, int j, Integer[][] memo) {
    if (j == t.length()) return 1;
    if (i == s.length()) return 0;
    if (memo[i][j] != null) return memo[i][j];
    int ways = solve(s, t, i + 1, j, memo);
    if (s.charAt(i) == t.charAt(j)) ways += solve(s, t, i + 1, j + 1, memo);
    memo[i][j] = ways;
    return ways;
  }
}`,
  ),
  "word-break": p(
    "Return whether s can be split into one or more dictionary words. A dictionary word may be reused.",
    [e('s = "leetcode", wordDict = ["leet","code"]', "true", "The split leet + code is valid."), e('s = "applepenapple", wordDict = ["apple","pen"]', "true", "The word apple is reused."), e('s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', "false", "No complete dictionary segmentation exists.")],
    ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20", "Inputs contain lowercase English letters.", "Dictionary words are unique."],
    "From a starting index, try every following end position. When that substring is a dictionary word, recursively segment the remaining suffix.",
    "Failed suffixes are rediscovered from many earlier word choices.",
    "Exponential time, O(n) recursion space.",
    `class Solution {
  public boolean wordBreak(String s, java.util.List<String> wordDict) {
    return solve(s, 0, new java.util.HashSet<>(wordDict));
  }
  private boolean solve(String s, int start, java.util.Set<String> words) {
    if (start == s.length()) return true;
    for (int end = start + 1; end <= s.length(); end++) {
      if (words.contains(s.substring(start, end)) && solve(s, end, words)) return true;
    }
    return false;
  }
}`,
    "Memoize whether each suffix start can be segmented. Each start is fully explored at most once.",
    "Time O(n^3) with Java substring creation, space O(n + dictionary size).",
    ["Convert the dictionary to a hash set.", "At start, try every candidate next word.", "Cache true on the first successful suffix and false after every end fails."],
    `class Solution {
  public boolean wordBreak(String s, java.util.List<String> wordDict) {
    return solve(s, 0, new java.util.HashSet<>(wordDict), new Boolean[s.length()]);
  }
  private boolean solve(String s, int start, java.util.Set<String> words, Boolean[] memo) {
    if (start == s.length()) return true;
    if (memo[start] != null) return memo[start];
    for (int end = start + 1; end <= s.length(); end++) {
      if (words.contains(s.substring(start, end)) && solve(s, end, words, memo)) return memo[start] = true;
    }
    return memo[start] = false;
  }
}`,
  ),
  "decode-ways": p(
    "Digits map from 1 through 26 to letters A through Z. Return how many ways the complete digit string can be decoded; a segment cannot begin with zero.",
    [e('s = "12"', "2", "The decodings are AB and L."), e('s = "226"', "3", "The decodings are BZ, VF, and BBF."), e('s = "06"', "0", "A code cannot begin with zero.")],
    ["1 <= s.length <= 100", "s contains only digits and may contain leading zeroes."],
    "At each index, consume one valid digit and optionally consume two digits when their numeric value is between 10 and 26.",
    "The one-digit and two-digit branches repeatedly decode the same suffix.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int numDecodings(String s) {
    return solve(s, 0);
  }
  private int solve(String s, int index) {
    if (index == s.length()) return 1;
    if (s.charAt(index) == '0') return 0;
    int ways = solve(s, index + 1);
    if (index + 1 < s.length() && Integer.parseInt(s.substring(index, index + 2)) <= 26) ways += solve(s, index + 2);
    return ways;
  }
}`,
    "Memoize the number of decodings from every index. The zero rule and two-digit bound make each state constant work.",
    "Time O(n), space O(n).",
    ["Return one after consuming the complete string and zero when the current digit is zero.", "Count the one-digit transition.", "Add a two-digit transition when valid and cache the index result."],
    `class Solution {
  public int numDecodings(String s) {
    int[] memo = new int[s.length()];
    java.util.Arrays.fill(memo, -1);
    return solve(s, 0, memo);
  }
  private int solve(String s, int index, int[] memo) {
    if (index == s.length()) return 1;
    if (s.charAt(index) == '0') return 0;
    if (memo[index] != -1) return memo[index];
    int ways = solve(s, index + 1, memo);
    if (index + 1 < s.length() && (s.charAt(index) - '0') * 10 + s.charAt(index + 1) - '0' <= 26) ways += solve(s, index + 2, memo);
    memo[index] = ways;
    return ways;
  }
}`,
  ),
  "unique-paths": p(
    "A robot starts at the upper-left cell of an m by n grid and moves only right or down. Return the number of paths to the lower-right cell.",
    [e("m = 3, n = 7", "28", "Twenty-eight right/down sequences reach the destination."), e("m = 3, n = 2", "3", "The paths are right-down-down, down-right-down, and down-down-right.")],
    ["1 <= m, n <= 100", "The answer is at most 2 * 10^9."],
    "From each cell, recursively count paths from the cell below and the cell to the right. The destination contributes one path and out-of-bounds positions contribute zero.",
    "Every interior cell is reached through many prefixes and recomputed exponentially.",
    "Time O(2^(m+n)), space O(m+n).",
    `class Solution {
  public int uniquePaths(int m, int n) {
    return solve(0, 0, m, n);
  }
  private int solve(int row, int column, int m, int n) {
    if (row == m - 1 && column == n - 1) return 1;
    if (row == m || column == n) return 0;
    return solve(row + 1, column, m, n) + solve(row, column + 1, m, n);
  }
}`,
    "Memoize the number of paths from every grid coordinate. Each cell combines its two forward neighbors once.",
    "Time O(mn), space O(mn).",
    ["Use row and column as the state.", "Return one at the destination and zero outside the grid.", "Cache the sum of down and right states."],
    `class Solution {
  public int uniquePaths(int m, int n) {
    return solve(0, 0, m, n, new Integer[m][n]);
  }
  private int solve(int row, int column, int m, int n, Integer[][] memo) {
    if (row == m - 1 && column == n - 1) return 1;
    if (row == m || column == n) return 0;
    if (memo[row][column] != null) return memo[row][column];
    memo[row][column] = solve(row + 1, column, m, n, memo) + solve(row, column + 1, m, n, memo);
    return memo[row][column];
  }
}`,
  ),
  "unique-paths-ii": p(
    "Return the number of right/down paths from the upper-left to lower-right grid cell when cells containing one are blocked.",
    [e("obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]", "2", "Two paths go around the center obstacle."), e("obstacleGrid = [[0,1],[0,0]]", "1", "Only the downward-first path remains.")],
    ["1 <= rows, columns <= 100", "obstacleGrid[i][j] is 0 or 1."],
    "Recursively move down and right. A blocked or out-of-bounds cell contributes zero, while the unblocked destination contributes one.",
    "The same reachable cell is recomputed for every path prefix that reaches it.",
    "Exponential time, O(rows + columns) recursion space.",
    `class Solution {
  public int uniquePathsWithObstacles(int[][] grid) {
    return solve(grid, 0, 0);
  }
  private int solve(int[][] grid, int row, int column) {
    if (row == grid.length || column == grid[0].length || grid[row][column] == 1) return 0;
    if (row == grid.length - 1 && column == grid[0].length - 1) return 1;
    return solve(grid, row + 1, column) + solve(grid, row, column + 1);
  }
}`,
    "Memoize each open cell. Obstacles terminate before memo access, and each remaining cell combines its two successors once.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Reject blocked and out-of-range cells.", "Return one at the open destination.", "Cache the sum of the down and right states."],
    `class Solution {
  public int uniquePathsWithObstacles(int[][] grid) {
    return solve(grid, 0, 0, new Integer[grid.length][grid[0].length]);
  }
  private int solve(int[][] grid, int row, int column, Integer[][] memo) {
    if (row == grid.length || column == grid[0].length || grid[row][column] == 1) return 0;
    if (row == grid.length - 1 && column == grid[0].length - 1) return 1;
    if (memo[row][column] != null) return memo[row][column];
    memo[row][column] = solve(grid, row + 1, column, memo) + solve(grid, row, column + 1, memo);
    return memo[row][column];
  }
}`,
  ),
  "minimum-path-sum": p(
    "Move only right or down from the upper-left to lower-right cell of a nonnegative grid. Return the minimum sum of values along such a path.",
    [e("grid = [[1,3,1],[1,5,1],[4,2,1]]", "7", "The path 1 -> 3 -> 1 -> 1 -> 1 has sum seven."), e("grid = [[1,2,3],[4,5,6]]", "12", "The minimum path is 1 -> 2 -> 3 -> 6.")],
    ["1 <= rows, columns <= 200", "0 <= grid[i][j] <= 200"],
    "The minimum cost from a cell is its value plus the smaller cost from below or right. Moving outside returns an infinite sentinel.",
    "The two branches recompute the same suffix cells exponentially.",
    "Time O(2^(rows+columns)), space O(rows + columns).",
    `class Solution {
  public int minPathSum(int[][] grid) {
    return solve(grid, 0, 0);
  }
  private int solve(int[][] grid, int row, int column) {
    if (row == grid.length || column == grid[0].length) return 1000000000;
    if (row == grid.length - 1 && column == grid[0].length - 1) return grid[row][column];
    return grid[row][column] + Math.min(solve(grid, row + 1, column), solve(grid, row, column + 1));
  }
}`,
    "Memoize the minimum suffix cost for every cell. Each coordinate evaluates its down and right transitions once.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Return an infinite sentinel outside the grid.", "Return the destination value at the base cell.", "Cache current value plus the smaller memoized neighbor cost."],
    `class Solution {
  public int minPathSum(int[][] grid) {
    return solve(grid, 0, 0, new Integer[grid.length][grid[0].length]);
  }
  private int solve(int[][] grid, int row, int column, Integer[][] memo) {
    if (row == grid.length || column == grid[0].length) return 1000000000;
    if (row == grid.length - 1 && column == grid[0].length - 1) return grid[row][column];
    if (memo[row][column] != null) return memo[row][column];
    memo[row][column] = grid[row][column] + Math.min(solve(grid, row + 1, column, memo), solve(grid, row, column + 1, memo));
    return memo[row][column];
  }
}`,
  ),
  "maximal-square": p(
    "Given a binary character matrix, return the area of the largest square containing only '1' cells.",
    [e("matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", "4", "The largest all-one square has side length two."), e("matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]", "1", "Any single one is a side-one square."), e("matrix = [[\"0\"]]", "0", "No all-one square exists.")],
    ["1 <= rows, columns <= 300", "matrix[i][j] is '0' or '1'."],
    "Treat every one-cell as a potential top-left corner and test successively larger square borders and interiors.",
    "Most cells are scanned repeatedly across overlapping candidate squares.",
    "Time O(rows * columns * min(rows, columns)^3), space O(1).",
    `class Solution {
  public int maximalSquare(char[][] matrix) {
    int best = 0;
    for (int row = 0; row < matrix.length; row++) {
      for (int column = 0; column < matrix[0].length; column++) {
        for (int size = 1; row + size <= matrix.length && column + size <= matrix[0].length; size++) {
          boolean valid = true;
          for (int i = row; i < row + size && valid; i++) for (int j = column; j < column + size; j++) if (matrix[i][j] == '0') valid = false;
          if (!valid) break;
          best = Math.max(best, size * size);
        }
      }
    }
    return best;
  }
}`,
    "Let solve(row, column) be the largest all-one square whose top-left corner is that cell. A one-cell extends by one plus the minimum of right, down, and diagonal child sides. Memoize every cell and track the greatest side.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Return zero outside the matrix or at a zero-cell.", "Recursively obtain right, down, and diagonal square sides.", "Cache one plus their minimum, update the greatest side, and square it at the end."],
    `class Solution {
  private int best;
  public int maximalSquare(char[][] matrix) {
    solve(matrix, 0, 0, new Integer[matrix.length][matrix[0].length]);
    return best * best;
  }
  private int solve(char[][] matrix, int row, int column, Integer[][] memo) {
    if (row == matrix.length || column == matrix[0].length) return 0;
    if (memo[row][column] != null) return memo[row][column];
    int right = solve(matrix, row, column + 1, memo);
    int down = solve(matrix, row + 1, column, memo);
    int diagonal = solve(matrix, row + 1, column + 1, memo);
    memo[row][column] = matrix[row][column] == '1' ? 1 + Math.min(right, Math.min(down, diagonal)) : 0;
    best = Math.max(best, memo[row][column]);
    return memo[row][column];
  }
}`,
  ),
  "longest-increasing-path-in-a-matrix": p(
    "Move between orthogonally adjacent matrix cells only when the next value is strictly greater. Return the maximum number of cells in a valid path.",
    [e("matrix = [[9,9,4],[6,6,8],[2,1,1]]", "4", "One path is 1 -> 2 -> 6 -> 9."), e("matrix = [[3,4,5],[3,2,6],[2,2,1]]", "4", "One path is 3 -> 4 -> 5 -> 6."), e("matrix = [[1]]", "1", "The only cell forms a path of length one.")],
    ["1 <= rows, columns <= 200", "0 <= matrix[i][j] <= 2^31 - 1"],
    "Start a DFS at every cell and recursively follow every greater neighbor, returning one plus the best child length.",
    "Increasing paths merge into the same suffix cells, which are recomputed from many starts.",
    "Exponential time in the worst case, O(rows * columns) recursion space.",
    `class Solution {
  private final int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
  public int longestIncreasingPath(int[][] matrix) {
    int best = 0;
    for (int row = 0; row < matrix.length; row++) for (int column = 0; column < matrix[0].length; column++) best = Math.max(best, solve(matrix, row, column));
    return best;
  }
  private int solve(int[][] matrix, int row, int column) {
    int best = 1;
    for (int[] direction : directions) {
      int nextRow = row + direction[0];
      int nextColumn = column + direction[1];
      if (nextRow >= 0 && nextRow < matrix.length && nextColumn >= 0 && nextColumn < matrix[0].length && matrix[nextRow][nextColumn] > matrix[row][column]) best = Math.max(best, 1 + solve(matrix, nextRow, nextColumn));
    }
    return best;
  }
}`,
    "Memoize the longest increasing path starting at every cell. Strict increase prevents cycles, so no separate visited set is required.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Use a cell coordinate as the state.", "Inspect its four in-bounds greater neighbors.", "Cache one plus the best neighbor path and take the maximum across all starts."],
    `class Solution {
  private final int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
  public int longestIncreasingPath(int[][] matrix) {
    int[][] memo = new int[matrix.length][matrix[0].length];
    int best = 0;
    for (int row = 0; row < matrix.length; row++) for (int column = 0; column < matrix[0].length; column++) best = Math.max(best, solve(matrix, row, column, memo));
    return best;
  }
  private int solve(int[][] matrix, int row, int column, int[][] memo) {
    if (memo[row][column] != 0) return memo[row][column];
    int best = 1;
    for (int[] direction : directions) {
      int nextRow = row + direction[0];
      int nextColumn = column + direction[1];
      if (nextRow >= 0 && nextRow < matrix.length && nextColumn >= 0 && nextColumn < matrix[0].length && matrix[nextRow][nextColumn] > matrix[row][column]) best = Math.max(best, 1 + solve(matrix, nextRow, nextColumn, memo));
    }
    memo[row][column] = best;
    return best;
  }
}`,
  ),
  "best-time-to-buy-and-sell-stock-with-cooldown": p(
    "Maximize profit from any number of stock transactions when selling is followed by one cooldown day. Only one share may be held at a time.",
    [e("prices = [1,2,3,0,2]", "3", "Buy, sell, cooldown, buy, and sell for total profit three."), e("prices = [1]", "0", "No sale can follow a purchase.")],
    ["1 <= prices.length <= 5000", "0 <= prices[i] <= 1000"],
    "At each day, either do nothing or perform the legal action for the current holding state. Selling advances two days to enforce cooldown.",
    "The same day and holding state is reached by many transaction histories.",
    "Time O(2^n), space O(n).",
    `class Solution {
  public int maxProfit(int[] prices) {
    return solve(prices, 0, 0);
  }
  private int solve(int[] prices, int day, int holding) {
    if (day >= prices.length) return 0;
    int rest = solve(prices, day + 1, holding);
    if (holding == 1) return Math.max(rest, prices[day] + solve(prices, day + 2, 0));
    return Math.max(rest, -prices[day] + solve(prices, day + 1, 1));
  }
}`,
    "Memoize each (day, holding) state. The sell transition jumps over the cooldown while buy and rest move one day.",
    "Time O(n), space O(n).",
    ["Use day and whether a share is held as the state.", "Compare rest with sell when holding or buy when empty.", "Cache the better profit and return the empty state on day zero."],
    `class Solution {
  public int maxProfit(int[] prices) {
    Integer[][] memo = new Integer[prices.length][2];
    return solve(prices, 0, 0, memo);
  }
  private int solve(int[] prices, int day, int holding, Integer[][] memo) {
    if (day >= prices.length) return 0;
    if (memo[day][holding] != null) return memo[day][holding];
    int best = solve(prices, day + 1, holding, memo);
    if (holding == 1) best = Math.max(best, prices[day] + solve(prices, day + 2, 0, memo));
    else best = Math.max(best, -prices[day] + solve(prices, day + 1, 1, memo));
    memo[day][holding] = best;
    return best;
  }
}`,
  ),
  "burst-balloons": p(
    "Burst all balloons. Bursting index i earns the product of its current left neighbor, its value, and its current right neighbor; missing neighbors count as one. Return the maximum total coins.",
    [e("nums = [3,1,5,8]", "167", "An optimal burst order earns 3 + 15 + 40 + 120."), e("nums = [1,5]", "10", "Bursting one then five earns ten.")],
    ["1 <= nums.length <= 300", "0 <= nums[i] <= 100"],
    "Recursively try every remaining balloon as the next one to burst, physically removing and restoring it around each branch.",
    "The order search has factorial growth and rebuilding lists adds overhead.",
    "Time O(n! * n), space O(n).",
    `class Solution {
  public int maxCoins(int[] nums) {
    java.util.List<Integer> balloons = new java.util.ArrayList<>();
    for (int value : nums) balloons.add(value);
    return solve(balloons);
  }
  private int solve(java.util.List<Integer> balloons) {
    if (balloons.isEmpty()) return 0;
    int best = 0;
    for (int i = 0; i < balloons.size(); i++) {
      int left = i == 0 ? 1 : balloons.get(i - 1);
      int right = i == balloons.size() - 1 ? 1 : balloons.get(i + 1);
      int value = balloons.remove(i);
      best = Math.max(best, left * value * right + solve(balloons));
      balloons.add(i, value);
    }
    return best;
  }
}`,
    "Reverse the decision: choose the last balloon burst inside an interval. Its outside neighbors are then fixed, and the left and right intervals are independent. Memoize each interval.",
    "Time O(n^3), space O(n^2).",
    ["Pad nums with boundary ones.", "For interval (left, right), try every index as the final burst.", "Add its fixed boundary product to both memoized subintervals and cache the maximum."],
    `class Solution {
  public int maxCoins(int[] nums) {
    int[] values = new int[nums.length + 2];
    values[0] = values[values.length - 1] = 1;
    for (int i = 0; i < nums.length; i++) values[i + 1] = nums[i];
    return solve(values, 1, nums.length, new Integer[values.length][values.length]);
  }
  private int solve(int[] values, int left, int right, Integer[][] memo) {
    if (left > right) return 0;
    if (memo[left][right] != null) return memo[left][right];
    int best = 0;
    for (int last = left; last <= right; last++) {
      int coins = values[left - 1] * values[last] * values[right + 1];
      coins += solve(values, left, last - 1, memo) + solve(values, last + 1, right, memo);
      best = Math.max(best, coins);
    }
    memo[left][right] = best;
    return best;
  }
}`,
  ),
};
