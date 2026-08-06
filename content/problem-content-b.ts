import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const example = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });

const problem = (
  statement: string,
  examples: ProblemExample[],
  constraints: string[],
  bruteExplanation: string,
  bruteDrawback: string,
  optimizedExplanation: string,
  bruteComplexity: string,
  optimizedComplexity: string,
  steps: string[],
  bruteCode: string,
  optimizedCode: string,
): ProblemContent => ({
  statement,
  examples,
  constraints,
  brute: { explanation: bruteExplanation, drawback: bruteDrawback, complexity: bruteComplexity, code: bruteCode },
  optimized: { explanation: optimizedExplanation, complexity: optimizedComplexity, steps, code: optimizedCode },
});

export const problemContentB: Record<string, ProblemContent> = {
  "binary-search": problem(
    "Given an integer array nums sorted in ascending order and an integer target, return the index of target. Return -1 when target does not occur in the array.",
    [example("nums = [-1,0,3,5,9,12], target = 9", "4", "The value 9 is stored at index 4."), example("nums = [-1,0,3,5,9,12], target = 2", "-1", "The target is absent."), example("nums = [5], target = 5", "0", "The only element matches the target.")],
    ["1 <= nums.length <= 10000", "-10000 <= nums[i], target <= 10000", "nums is sorted in strictly increasing order."],
    "Scan from the first element to the last and return as soon as an element equals target.",
    "A linear scan ignores the sorted order and can inspect every element.",
    "Keep an inclusive range that may contain target. Compare target with the middle value and discard the impossible half after every comparison.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Set left and right to the first and last indices.", "Compute a safe midpoint while the range is valid.", "Return mid on equality; otherwise retain only the half in which target can occur.", "Return -1 after the range becomes empty."],
    `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
    `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
  ),
  "search-insert-position": problem(
    "Given a sorted array of distinct integers and a target, return its index if present; otherwise return the index where it should be inserted to keep the array sorted.",
    [example("nums = [1,3,5,6], target = 5", "2", "The target already appears at index 2."), example("nums = [1,3,5,6], target = 2", "1", "Inserting at index 1 preserves sorted order."), example("nums = [1,3,5,6], target = 7", "4", "The target belongs after every existing value.")],
    ["1 <= nums.length <= 10000", "-10000 <= nums[i], target <= 10000", "nums contains distinct values in ascending order."],
    "Walk through the array until finding the first value greater than or equal to target; that index is the answer.",
    "The insertion boundary may be at the end, forcing a scan of all n elements.",
    "Binary-search for the first index whose value is at least target. Use a half-open range so left naturally becomes nums.length when every value is smaller.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Initialize the candidate range as [0, nums.length).", "When nums[mid] is at least target, keep mid and everything left of it.", "Otherwise discard mid and all smaller positions.", "Return the converged left boundary."],
    `class Solution {
    public int searchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= target) return i;
        }
        return nums.length;
    }
}`,
    `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= target) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}`
  ),
  "find-first-and-last-position-of-element-in-sorted-array": problem(
    "Given a nondecreasing integer array nums and a target, return the first and last indices containing target. Return [-1,-1] if target is absent.",
    [example("nums = [5,7,7,8,8,10], target = 8", "[3,4]", "The two occurrences of 8 occupy indices 3 and 4."), example("nums = [5,7,7,8,8,10], target = 6", "[-1,-1]", "No element equals 6."), example("nums = [2,2], target = 2", "[0,1]", "The first and last elements both match.")],
    ["0 <= nums.length <= 100000", "-1000000000 <= nums[i], target <= 1000000000", "nums is sorted in nondecreasing order."],
    "Scan the full array, set the first index on the first match, and update the last index on every match.",
    "The scan remains O(n) even though equal values form one contiguous sorted block.",
    "Run two boundary searches: the first finds the first value not smaller than target, and the second finds the first value greater than target. Their difference describes the target block.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Find lowerBound(target).", "If that index is outside the array or does not equal target, return [-1,-1].", "Find lowerBound(target + 1) without arithmetic overflow by using an upper-bound comparison.", "Return first and upperBound - 1."],
    `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = -1;
        int last = -1;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                if (first == -1) first = i;
                last = i;
            }
        }
        return new int[]{first, last};
    }
}`,
    `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = bound(nums, target, false);
        if (first == nums.length || nums[first] != target) return new int[]{-1, -1};
        int after = bound(nums, target, true);
        return new int[]{first, after - 1};
    }

    private int bound(int[] nums, int target, boolean upper) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > target || (!upper && nums[mid] == target)) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}`
  ),
  "search-a-2d-matrix": problem(
    "Given an m by n matrix whose rows are increasing and whose first value in each row is greater than the last value of the previous row, determine whether target exists.",
    [example("matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", "true", "The target appears in the first row."), example("matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", "false", "13 is not present."), example("matrix = [[1]], target = 2", "false", "The single value is not the target.")],
    ["1 <= m, n <= 100", "-10000 <= matrix[i][j], target <= 10000", "Rows and row boundaries are strictly increasing as described."],
    "Inspect every cell and stop when target is found.",
    "This takes O(mn) comparisons and does not use the global sorted order.",
    "Treat the matrix as one sorted array of length m*n. Convert a virtual index mid to row mid/n and column mid%n during binary search.",
    "O(mn) time and O(1) space",
    "O(log(mn)) time and O(1) space",
    ["Search virtual indices 0 through m*n - 1.", "Map each midpoint to its row and column.", "Compare that cell with target and discard half of the virtual array.", "Return false if the interval empties."],
    `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int[] row : matrix) {
            for (int value : row) {
                if (value == target) return true;
            }
        }
        return false;
    }
}`,
    `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int left = 0;
        int right = rows * cols - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int value = matrix[mid / cols][mid % cols];
            if (value == target) return true;
            if (value < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`
  ),
  "find-minimum-in-rotated-sorted-array": problem(
    "A strictly increasing array was rotated at an unknown pivot. Return its minimum value.",
    [example("nums = [3,4,5,1,2]", "1", "Rotation places the original first value 1 after 5."), example("nums = [4,5,6,7,0,1,2]", "0", "Zero is the rotation boundary."), example("nums = [11,13,15,17]", "11", "An unrotated array has its minimum first.")],
    ["1 <= nums.length <= 5000", "-5000 <= nums[i] <= 5000", "All values are unique and the input is a rotation of a sorted array."],
    "Scan every value and keep the smallest.",
    "A full scan costs linear time despite the array consisting of two sorted pieces.",
    "Compare the middle value with the rightmost value. If mid is larger, the minimum lies strictly right of mid; otherwise mid may be the minimum, so keep the left half including mid.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Set left and right to the array ends.", "While they differ, compare nums[mid] with nums[right].", "Move left past mid for the rotated high portion; otherwise move right to mid.", "Return nums[left] at convergence."],
    `class Solution {
    public int findMin(int[] nums) {
        int answer = nums[0];
        for (int value : nums) answer = Math.min(answer, value);
        return answer;
    }
}`,
    `class Solution {
    public int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
}`
  ),
  "search-in-rotated-sorted-array": problem(
    "A sorted array of distinct integers was rotated at an unknown pivot. Return the index of target, or -1 if it is absent.",
    [example("nums = [4,5,6,7,0,1,2], target = 0", "4", "Zero appears at index 4."), example("nums = [4,5,6,7,0,1,2], target = 3", "-1", "Three is absent."), example("nums = [1], target = 0", "-1", "The only value does not match.")],
    ["1 <= nums.length <= 5000", "-10000 <= nums[i], target <= 10000", "All nums values are distinct."],
    "Linearly inspect each index until target is found.",
    "The baseline uses O(n) time and ignores that at least one half around every midpoint is sorted.",
    "At each midpoint identify the sorted half. Test whether target falls inside that half's boundaries; keep it if so, otherwise search the other half.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Compare nums[mid] with target first.", "Determine whether the left half is sorted.", "Use inclusive value boundaries to decide whether target belongs in that sorted half.", "Discard the other half and repeat."],
    `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
    `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`
  ),
  "koko-eating-bananas": problem(
    "Koko has piles of bananas and h hours. At a chosen integer speed k, she consumes up to k bananas from one pile per hour. Return the smallest k that lets her finish all piles within h hours.",
    [example("piles = [3,6,7,11], h = 8", "4", "At speed 4 the piles require 1+2+2+3 = 8 hours."), example("piles = [30,11,23,4,20], h = 5", "30", "Only a speed of at least the largest pile finishes one pile per hour."), example("piles = [30,11,23,4,20], h = 6", "23", "Speed 23 completes the piles in six hours.")],
    ["1 <= piles.length <= 10000", "piles.length <= h <= 1000000000", "1 <= piles[i] <= 1000000000"],
    "Try speeds from 1 upward, calculate the required hours for each speed, and return the first feasible speed.",
    "The maximum pile can be one billion, so checking every possible speed is too slow.",
    "Feasibility is monotonic: if speed k works, every faster speed works. Binary-search the first feasible speed between 1 and the maximum pile.",
    "O(n * max(piles)) time and O(1) space",
    "O(n log max(piles)) time and O(1) space",
    ["Use speeds 1 through the largest pile as the search space.", "At mid, sum ceil(pile/mid) with long arithmetic.", "Keep mid when the total is at most h; otherwise discard slower speeds.", "Return the first feasible boundary."],
    `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int max = 0;
        for (int pile : piles) max = Math.max(max, pile);
        for (int speed = 1; speed <= max; speed++) {
            long hours = 0;
            for (int pile : piles) hours += (pile + (long) speed - 1) / speed;
            if (hours <= h) return speed;
        }
        return max;
    }
}`,
    `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for (int pile : piles) right = Math.max(right, pile);
        while (left < right) {
            int mid = left + (right - left) / 2;
            long hours = 0;
            for (int pile : piles) hours += (pile + (long) mid - 1) / mid;
            if (hours <= h) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}`
  ),
  "find-peak-element": problem(
    "Given an integer array, return the index of any element that is strictly greater than its immediate neighbours. Values outside the array are treated as negative infinity.",
    [example("nums = [1,2,3,1]", "2", "The value 3 is greater than 2 and 1."), example("nums = [1,2,1,3,5,6,4]", "1 or 5", "Both indices are valid peaks."), example("nums = [1]", "0", "A single element is a peak against two imaginary smaller neighbours.")],
    ["1 <= nums.length <= 1000", "-2147483648 <= nums[i] <= 2147483647", "Adjacent elements are different."],
    "Check every index against its existing left and right neighbours and return the first peak.",
    "The scan can inspect all n values and does not use the direction of the local slope.",
    "Compare nums[mid] with nums[mid+1]. A rising slope guarantees a peak to the right; a falling slope guarantees one at mid or to the left.",
    "O(n) time and O(1) space",
    "O(log n) time and O(1) space",
    ["Search while left is smaller than right.", "Compare the midpoint with its right neighbour.", "Move left after mid on a rising slope; otherwise keep mid by moving right to it.", "Return the single remaining index."],
    `class Solution {
    public int findPeakElement(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            boolean left = i == 0 || nums[i] > nums[i - 1];
            boolean right = i == nums.length - 1 || nums[i] > nums[i + 1];
            if (left && right) return i;
        }
        return -1;
    }
}`,
    `class Solution {
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
  ),
  "time-based-key-value-store": problem(
    "Design a data structure that stores multiple string values for each key at strictly increasing timestamps. get(key,timestamp) must return the value with the greatest stored timestamp not exceeding the query, or an empty string if none exists.",
    [example("set(foo, bar, 1); get(foo, 1)", "bar", "The exact timestamp is stored."), example("set(foo, bar, 1); get(foo, 3)", "bar", "Timestamp 1 is the latest value not after 3."), example("get(missing, 5)", "\"\"", "No value has been stored for this key.")],
    ["1 <= key.length, value.length <= 100", "1 <= timestamp <= 10000000", "set timestamps are strictly increasing", "At most 200000 operations are called."],
    "Store all entries and, for each get, scan the requested key's list to find the latest eligible timestamp.",
    "Repeated queries may scan every historical value, making each get linear in that key's history.",
    "Append pairs because set timestamps arrive in order. For get, binary-search the rightmost timestamp less than or equal to the query.",
    "set O(1), get O(n) time, O(n) total space",
    "set O(1), get O(log n) time, O(n) total space",
    ["Map each key to its chronological list of entries.", "Append on set.", "Binary-search with a candidate answer on get.", "Move rightward after an eligible timestamp and return the saved value."],
    `class TimeMap {
    private final Map<String, List<Entry>> data = new HashMap<>();

    public void set(String key, String value, int timestamp) {
        data.computeIfAbsent(key, k -> new ArrayList<>()).add(new Entry(timestamp, value));
    }

    public String get(String key, int timestamp) {
        String answer = "";
        for (Entry entry : data.getOrDefault(key, Collections.emptyList())) {
            if (entry.time > timestamp) break;
            answer = entry.value;
        }
        return answer;
    }

    private static class Entry {
        int time;
        String value;
        Entry(int time, String value) { this.time = time; this.value = value; }
    }
}`,
    `class TimeMap {
    private final Map<String, List<Entry>> data = new HashMap<>();

    public void set(String key, String value, int timestamp) {
        data.computeIfAbsent(key, k -> new ArrayList<>()).add(new Entry(timestamp, value));
    }

    public String get(String key, int timestamp) {
        List<Entry> list = data.get(key);
        if (list == null) return "";
        int left = 0;
        int right = list.size() - 1;
        String answer = "";
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (list.get(mid).time <= timestamp) {
                answer = list.get(mid).value;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return answer;
    }

    private static class Entry {
        int time;
        String value;
        Entry(int time, String value) { this.time = time; this.value = value; }
    }
}`
  ),
  "median-of-two-sorted-arrays": problem(
    "Given two sorted integer arrays, return the median of their combined multiset. The required overall running time is logarithmic in the smaller input length.",
    [example("nums1 = [1,3], nums2 = [2]", "2.0", "The merged order is [1,2,3]."), example("nums1 = [1,2], nums2 = [3,4]", "2.5", "The middle values 2 and 3 average to 2.5."), example("nums1 = [], nums2 = [1]", "1.0", "The nonempty array supplies the median.")],
    ["0 <= nums1.length, nums2.length <= 1000", "1 <= nums1.length + nums2.length <= 2000", "-1000000 <= values <= 1000000", "Both arrays are sorted."],
    "Merge both sorted arrays into one array and compute its middle value or middle pair.",
    "Merging requires linear time and linear extra space, which misses the logarithmic target.",
    "Partition the smaller array and infer the complementary partition in the larger array. Binary-search until every left-side value is at most every right-side value, then read the boundary values.",
    "O(m+n) time and O(m+n) space",
    "O(log(min(m,n))) time and O(1) space",
    ["Ensure the first array is the smaller one.", "Choose its left partition size and derive the other partition so the total left side has half the values.", "Move the partition left or right when cross-boundary ordering fails.", "Use the maximum left value and minimum right value to compute the median."],
    `class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        int[] merged = new int[a.length + b.length];
        int i = 0;
        int j = 0;
        int k = 0;
        while (i < a.length || j < b.length) {
            if (j == b.length || (i < a.length && a[i] <= b[j])) merged[k++] = a[i++];
            else merged[k++] = b[j++];
        }
        int n = merged.length;
        if ((n & 1) == 1) return merged[n / 2];
        return ((long) merged[n / 2 - 1] + merged[n / 2]) / 2.0;
    }
}`,
    `class Solution {
    public double findMedianSortedArrays(int[] a, int[] b) {
        if (a.length > b.length) return findMedianSortedArrays(b, a);
        int m = a.length;
        int n = b.length;
        int left = 0;
        int right = m;
        while (left <= right) {
            int cutA = left + (right - left) / 2;
            int cutB = (m + n + 1) / 2 - cutA;
            int aLeft = cutA == 0 ? Integer.MIN_VALUE : a[cutA - 1];
            int aRight = cutA == m ? Integer.MAX_VALUE : a[cutA];
            int bLeft = cutB == 0 ? Integer.MIN_VALUE : b[cutB - 1];
            int bRight = cutB == n ? Integer.MAX_VALUE : b[cutB];
            if (aLeft <= bRight && bLeft <= aRight) {
                if (((m + n) & 1) == 1) return Math.max(aLeft, bLeft);
                return ((long) Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
            }
            if (aLeft > bRight) right = cutA - 1;
            else left = cutA + 1;
        }
        throw new IllegalArgumentException();
    }
}`
  ),
  "capacity-to-ship-packages-within-d-days": problem(
    "Packages must be loaded in their given order and shipped within days days. A ship carries at most one fixed capacity per day. Return the smallest capacity that completes the shipment on time.",
    [example("weights = [1,2,3,4,5,6,7,8,9,10], days = 5", "15", "Capacity 15 creates five valid daily loads."), example("weights = [3,2,2,4,1,4], days = 3", "6", "The ordered loads can be [3,2], [2,4], and [1,4]."), example("weights = [1,2,3,1,1], days = 4", "3", "Capacity 3 is feasible and 2 is not.")],
    ["1 <= days <= weights.length <= 50000", "1 <= weights[i] <= 500"],
    "Try every capacity from the heaviest package to the sum of all weights, simulating the number of days each requires.",
    "The numeric search range can be very large, and every attempted capacity scans the whole input.",
    "Required days never increase when capacity increases. Binary-search the first feasible capacity between max(weights) and sum(weights).",
    "O(n * sum(weights)) time and O(1) space",
    "O(n log(sum(weights))) time and O(1) space",
    ["Set the lower bound to the largest single package and the upper bound to the total weight.", "Simulate ordered daily loads at the midpoint.", "Keep feasible capacity values on the left; discard capacities that need too many days.", "Return the converged first feasible capacity."],
    `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0;
        int high = 0;
        for (int weight : weights) {
            low = Math.max(low, weight);
            high += weight;
        }
        for (int capacity = low; capacity <= high; capacity++) {
            if (needed(weights, capacity) <= days) return capacity;
        }
        return high;
    }

    private int needed(int[] weights, int capacity) {
        int days = 1;
        int load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                days++;
                load = 0;
            }
            load += weight;
        }
        return days;
    }
}`,
    `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int left = 0;
        int right = 0;
        for (int weight : weights) {
            left = Math.max(left, weight);
            right += weight;
        }
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (needed(weights, mid) <= days) right = mid;
            else left = mid + 1;
        }
        return left;
    }

    private int needed(int[] weights, int capacity) {
        int days = 1;
        int load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                days++;
                load = 0;
            }
            load += weight;
        }
        return days;
    }
}`
  ),
  "split-array-largest-sum": problem(
    "Split nums into exactly k nonempty contiguous subarrays while preserving order. Return the smallest possible value of the largest subarray sum.",
    [example("nums = [7,2,5,10,8], k = 2", "18", "The split [7,2,5] and [10,8] has largest sum 18, which is minimal."), example("nums = [1,2,3,4,5], k = 2", "9", "Splitting after 3 gives sums 6 and 9."), example("nums = [1,4,4], k = 3", "4", "Each value must form its own subarray.")],
    ["1 <= nums.length <= 1000", "0 <= nums[i] <= 1000000", "1 <= k <= nums.length"],
    "Use recursion to try every placement of the k-1 split boundaries and keep the minimum largest segment sum.",
    "The number of boundary combinations grows exponentially, and many segment sums are recomputed.",
    "For a proposed maximum sum, greedily form each subarray as large as possible. The number of required pieces decreases monotonically as the limit grows, so binary-search the smallest feasible limit.",
    "O(n^k) time and O(k) recursion space",
    "O(n log(sum(nums))) time and O(1) space",
    ["Search between the largest element and the total sum.", "Scan nums and start a new piece whenever adding the next value would exceed mid.", "If at most k pieces are needed, keep mid; otherwise increase the lower bound.", "Return the first feasible limit."],
    `class Solution {
    public int splitArray(int[] nums, int k) {
        return search(nums, 0, k);
    }

    private int search(int[] nums, int start, int parts) {
        if (parts == 1) {
            int sum = 0;
            for (int i = start; i < nums.length; i++) sum += nums[i];
            return sum;
        }
        int best = Integer.MAX_VALUE;
        int sum = 0;
        for (int end = start; end <= nums.length - parts; end++) {
            sum += nums[end];
            best = Math.min(best, Math.max(sum, search(nums, end + 1, parts - 1)));
        }
        return best;
    }
}`,
    `class Solution {
    public int splitArray(int[] nums, int k) {
        long left = 0;
        long right = 0;
        for (int value : nums) {
            left = Math.max(left, value);
            right += value;
        }
        while (left < right) {
            long mid = left + (right - left) / 2;
            int parts = 1;
            long sum = 0;
            for (int value : nums) {
                if (sum + value > mid) {
                    parts++;
                    sum = 0;
                }
                sum += value;
            }
            if (parts <= k) right = mid;
            else left = mid + 1;
        }
        return (int) left;
    }
}`
  ),
  "minimum-days-to-make-m-bouquets": problem(
    "Each flower blooms on bloomDay[i]. To make one bouquet, choose k adjacent bloomed flowers, and each flower may be used once. Return the earliest day on which m bouquets can be made, or -1 if impossible.",
    [example("bloomDay = [1,10,3,10,2], m = 3, k = 1", "3", "By day 3, flowers at days 1, 3, and 2 provide three one-flower bouquets."), example("bloomDay = [1,10,3,10,2], m = 3, k = 2", "-1", "Six flowers are required but only five exist."), example("bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3", "12", "Day 12 allows two disjoint adjacent groups of three.")],
    ["1 <= bloomDay.length <= 100000", "1 <= bloomDay[i] <= 1000000000", "1 <= m <= 1000000", "1 <= k <= bloomDay.length"],
    "Test every calendar day from the earliest bloom to the latest, scanning the row to count adjacent bouquets.",
    "The day range can approach one billion, making day-by-day simulation impractical.",
    "Whether a day works is monotonic. Binary-search the first feasible day and count bouquets by resetting the consecutive-flower counter whenever an unbloomed flower breaks adjacency.",
    "O(n * (maxDay-minDay)) time and O(1) space",
    "O(n log(maxDay-minDay)) time and O(1) space",
    ["Reject immediately when m*k exceeds the flower count.", "Use minimum and maximum bloom days as bounds.", "For mid, count disjoint runs of k flowers with bloomDay <= mid.", "Keep feasible days and discard infeasible earlier days."],
    `class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        int min = bloomDay[0];
        int max = bloomDay[0];
        for (int day : bloomDay) {
            min = Math.min(min, day);
            max = Math.max(max, day);
        }
        for (int day = min; day <= max; day++) {
            if (canMake(bloomDay, m, k, day)) return day;
        }
        return -1;
    }

    private boolean canMake(int[] bloomDay, int m, int k, int day) {
        int bouquets = 0;
        int run = 0;
        for (int bloom : bloomDay) {
            if (bloom <= day) {
                run++;
                if (run == k) {
                    bouquets++;
                    run = 0;
                }
            } else run = 0;
        }
        return bouquets >= m;
    }
}`,
    `class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) return -1;
        int left = Integer.MAX_VALUE;
        int right = Integer.MIN_VALUE;
        for (int day : bloomDay) {
            left = Math.min(left, day);
            right = Math.max(right, day);
        }
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canMake(bloomDay, m, k, mid)) right = mid;
            else left = mid + 1;
        }
        return left;
    }

    private boolean canMake(int[] bloomDay, int m, int k, int day) {
        int bouquets = 0;
        int run = 0;
        for (int bloom : bloomDay) {
            if (bloom <= day) {
                run++;
                if (run == k) {
                    bouquets++;
                    run = 0;
                }
            } else run = 0;
        }
        return bouquets >= m;
    }
}`
  ),
  "find-k-closest-elements": problem(
    "Given a sorted array arr, an integer k, and a value x, return the k values closest to x in ascending order. A smaller value wins a distance tie.",
    [example("arr = [1,2,3,4,5], k = 4, x = 3", "[1,2,3,4]", "These are the four smallest distance-and-value choices."), example("arr = [1,2,3,4,5], k = 4, x = -1", "[1,2,3,4]", "The first four values are closest to a point left of the array."), example("arr = [1,1,2,3,4,5], k = 4, x = 3", "[1,2,3,4]", "The tie at distance two selects the smaller value 1.")],
    ["1 <= k <= arr.length <= 10000", "-10000 <= arr[i], x <= 10000", "arr is sorted in ascending order."],
    "Sort a copy by distance from x and then by value, take k entries, and sort those entries numerically.",
    "Sorting all n values costs O(n log n) and discards the input's useful sorted structure.",
    "Any valid answer is a contiguous window of size k. Binary-search its left boundary by comparing the excluded distances x-arr[mid] and arr[mid+k]-x.",
    "O(n log n) time and O(n) space",
    "O(log(n-k) + k) time and O(k) output space",
    ["Search possible window starts from 0 through n-k.", "If the left excluded value is farther, move the start right.", "Otherwise keep the current or an earlier start to preserve the smaller-value tie rule.", "Copy the k values beginning at the final start."],
    `class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        List<Integer> values = new ArrayList<>();
        for (int value : arr) values.add(value);
        values.sort((a, b) -> {
            int byDistance = Integer.compare(Math.abs(a - x), Math.abs(b - x));
            return byDistance != 0 ? byDistance : Integer.compare(a, b);
        });
        List<Integer> answer = new ArrayList<>(values.subList(0, k));
        Collections.sort(answer);
        return answer;
    }
}`,
    `class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int left = 0;
        int right = arr.length - k;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if ((long) x - arr[mid] > (long) arr[mid + k] - x) left = mid + 1;
            else right = mid;
        }
        List<Integer> answer = new ArrayList<>();
        for (int i = left; i < left + k; i++) answer.add(arr[i]);
        return answer;
    }
}`
  ),
  "find-k-th-smallest-pair-distance": problem(
    "For every pair i < j, define its distance as abs(nums[i]-nums[j]). Return the kth smallest distance among all pairs.",
    [example("nums = [1,3,1], k = 1", "0", "The sorted pair distances are [0,2,2]."), example("nums = [1,1,1], k = 2", "0", "Every pair has distance zero."), example("nums = [1,6,1], k = 3", "5", "The three distances are 0, 5, and 5.")],
    ["2 <= nums.length <= 10000", "0 <= nums[i] <= 1000000", "1 <= k <= nums.length*(nums.length-1)/2"],
    "Generate all pair distances, sort them, and return the value at index k-1.",
    "There are O(n^2) pairs, so both memory and sorting become too expensive.",
    "Sort nums and binary-search a distance d. A sliding left pointer counts in O(n) how many pairs have distance at most d; this count is monotonic in d.",
    "O(n^2 log n) time and O(n^2) space",
    "O(n log n + n log range) time and O(1) extra space",
    ["Sort nums and search distances from zero to max-min.", "For each right index, advance left until nums[right]-nums[left] <= mid.", "Add right-left eligible pairs and compare the total with k.", "Keep mid when at least k pairs qualify; otherwise increase it."],
    `class Solution {
    public int smallestDistancePair(int[] nums, int k) {
        List<Integer> distances = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                distances.add(Math.abs(nums[i] - nums[j]));
            }
        }
        Collections.sort(distances);
        return distances.get(k - 1);
    }
}`,
    `class Solution {
    public int smallestDistancePair(int[] nums, int k) {
        Arrays.sort(nums);
        int left = 0;
        int right = nums[nums.length - 1] - nums[0];
        while (left < right) {
            int mid = left + (right - left) / 2;
            long count = 0;
            int start = 0;
            for (int end = 0; end < nums.length; end++) {
                while (nums[end] - nums[start] > mid) start++;
                count += end - start;
            }
            if (count >= k) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}`
  ),
  "search-a-2d-matrix-ii": problem(
    "Each row and each column of matrix is sorted in ascending order. Return whether target appears anywhere in the matrix.",
    [example("matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5", "true", "Five occurs at row 1, column 1."), example("same matrix, target = 20", "false", "No row or column contains 20."), example("matrix = [[-1]], target = -1", "true", "The single cell matches.")],
    ["1 <= matrix.length, matrix[i].length <= 300", "-1000000000 <= matrix[i][j], target <= 1000000000", "Rows and columns are nondecreasing."],
    "Check every cell for equality.",
    "The O(mn) scan ignores both sorted dimensions.",
    "Start at the top-right corner. A value larger than target eliminates its whole column; a smaller value eliminates its whole row.",
    "O(mn) time and O(1) space",
    "O(m+n) time and O(1) space",
    ["Begin at row 0 and the last column.", "Return true when the current cell matches.", "Move left if it is too large and down if it is too small.", "Return false after leaving the matrix."],
    `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int[] row : matrix) {
            for (int value : row) {
                if (value == target) return true;
            }
        }
        return false;
    }
}`,
    `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int row = 0;
        int col = matrix[0].length - 1;
        while (row < matrix.length && col >= 0) {
            int value = matrix[row][col];
            if (value == target) return true;
            if (value > target) col--;
            else row++;
        }
        return false;
    }
}`
  ),
  "find-in-mountain-array": problem(
    "A mountain array strictly increases to one peak and then strictly decreases. Using only MountainArray.get and MountainArray.length, return the smallest index containing target, or -1 if absent.",
    [example("mountainArr = [1,2,3,4,5,3,1], target = 3", "2", "The first occurrence is on the increasing side."), example("mountainArr = [0,1,2,4,2,1], target = 3", "-1", "Three is absent."), example("mountainArr = [1,5,2], target = 2", "2", "The target appears on the descending side.")],
    ["3 <= mountainArr.length() <= 10000", "0 <= target, mountainArr.get(i) <= 1000000000", "The array has exactly one mountain peak.", "Calls to MountainArray.get should remain below the platform limit."],
    "Read every value from left to right and return the first matching index.",
    "This makes O(n) API calls and may exceed the interactive call limit.",
    "First binary-search the peak by slope. Then binary-search the increasing segment; only if that fails, binary-search the decreasing segment with reversed comparisons.",
    "O(n) time, O(n) API calls, and O(1) space",
    "O(log n) time, O(log n) API calls, and O(1) space",
    ["Find the peak where the slope changes from rising to falling.", "Search target in [0, peak] using ascending comparisons.", "Return that result first to guarantee the smallest index.", "Search [peak+1, n-1] using descending comparisons if needed."],
    `class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        for (int i = 0; i < mountainArr.length(); i++) {
            if (mountainArr.get(i) == target) return i;
        }
        return -1;
    }
}`,
    `class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        int left = 0;
        int right = mountainArr.length() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mountainArr.get(mid) < mountainArr.get(mid + 1)) left = mid + 1;
            else right = mid;
        }
        int peak = left;
        int answer = search(mountainArr, target, 0, peak, true);
        if (answer != -1) return answer;
        return search(mountainArr, target, peak + 1, mountainArr.length() - 1, false);
    }

    private int search(MountainArray array, int target, int left, int right, boolean ascending) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int value = array.get(mid);
            if (value == target) return mid;
            if ((ascending && value < target) || (!ascending && value > target)) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
  ),
  "aggressive-cows": problem(
    "Place k cows in stalls at given coordinates so that the minimum distance between any two placed cows is as large as possible. Return that largest minimum distance.",
    [example("stalls = [1,2,4,8,9], k = 3", "3", "Place cows at 1, 4, and 8 or 9; every adjacent gap is at least 3."), example("stalls = [10,1,2,7,5], k = 3", "4", "After sorting, positions 1, 5, and 10 achieve minimum gap 4."), example("stalls = [1,2], k = 2", "1", "Both stalls must be used.")],
    ["2 <= stalls.length <= 100000", "0 <= stalls[i] <= 1000000000", "2 <= k <= stalls.length", "Stall coordinates are distinct."],
    "After sorting, enumerate every combination of k stalls and compute its minimum adjacent gap.",
    "There are exponentially many placements, so combination enumeration is unusable for large inputs.",
    "For a proposed gap, greedily place the first cow at the first stall and each later cow at the earliest stall far enough away. Feasibility is monotonic, so binary-search the greatest feasible gap.",
    "O(C(n,k) * k + n log n) time and O(k) recursion space",
    "O(n log coordinateRange + n log n) time and O(1) extra space",
    ["Sort stall coordinates.", "Binary-search candidate gaps from 0 through last-first.", "Greedily count how many cows fit at each candidate gap.", "Keep a feasible gap and search larger; otherwise search smaller."],
    `class Solution {
    public int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);
        return choose(stalls, k, 0, new int[k], 0, 0);
    }

    private int choose(int[] stalls, int k, int start, int[] picked, int size, int best) {
        if (size == k) {
            int distance = Integer.MAX_VALUE;
            for (int i = 1; i < k; i++) distance = Math.min(distance, picked[i] - picked[i - 1]);
            return Math.max(best, distance);
        }
        for (int i = start; i <= stalls.length - (k - size); i++) {
            picked[size] = stalls[i];
            best = choose(stalls, k, i + 1, picked, size + 1, best);
        }
        return best;
    }
}`,
    `class Solution {
    public int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);
        int left = 0;
        int right = stalls[stalls.length - 1] - stalls[0];
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (canPlace(stalls, k, mid)) left = mid;
            else right = mid - 1;
        }
        return left;
    }

    private boolean canPlace(int[] stalls, int k, int gap) {
        int cows = 1;
        int last = stalls[0];
        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= gap) {
                cows++;
                last = stalls[i];
                if (cows == k) return true;
            }
        }
        return cows >= k;
    }
}`
  ),
  "kth-largest-element-in-an-array": problem(
    "Given an unsorted integer array and k, return the kth largest value by sorted order. Duplicate values count as separate positions.",
    [example("nums = [3,2,1,5,6,4], k = 2", "5", "Descending order begins [6,5], so the second value is 5."), example("nums = [3,2,3,1,2,4,5,5,6], k = 4", "4", "Duplicates remain in the ordering."), example("nums = [1], k = 1", "1", "The only element is both largest and kth largest.")],
    ["1 <= k <= nums.length <= 100000", "-10000 <= nums[i] <= 10000"],
    "Sort the entire array and return nums[nums.length-k].",
    "Full sorting orders every value even though only one rank is required.",
    "Maintain a min-heap containing the k largest values seen. When its size exceeds k, remove the smallest; the root is then the kth largest.",
    "O(n log n) time and O(log n) sorting stack space",
    "O(n log k) time and O(k) space",
    ["Create a min-heap.", "Insert each number.", "Remove the heap root whenever more than k candidates are stored.", "Return the root after the scan."],
    `class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k];
    }
}`,
    `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int value : nums) {
            heap.offer(value);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }
}`
  ),
  "top-k-frequent-elements": problem(
    "Given an integer array and k, return any ordering of the k distinct values with the greatest frequencies.",
    [example("nums = [1,1,1,2,2,3], k = 2", "[1,2]", "One occurs three times and two occurs twice."), example("nums = [1], k = 1", "[1]", "The only distinct value is most frequent."), example("nums = [4,4,5,5,6], k = 2", "[4,5]", "Four and five share the highest frequency.")],
    ["1 <= nums.length <= 100000", "-10000 <= nums[i] <= 10000", "1 <= k <= number of distinct values", "The answer set is unique."],
    "Count frequencies, sort every distinct value by decreasing frequency, and take the first k.",
    "Sorting u distinct values costs O(u log u), although a frequency cannot exceed n.",
    "Place each distinct value in a bucket indexed by its frequency. Scan buckets from n down and collect values until k answers are found.",
    "O(n + u log u) time and O(u) space",
    "O(n) time and O(n) space",
    ["Build a value-to-frequency map.", "Create buckets for frequencies 0 through n.", "Append each value to its frequency bucket.", "Read buckets from high to low until k values are collected."],
    `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) counts.merge(value, 1, Integer::sum);
        List<Integer> values = new ArrayList<>(counts.keySet());
        values.sort((a, b) -> Integer.compare(counts.get(b), counts.get(a)));
        int[] answer = new int[k];
        for (int i = 0; i < k; i++) answer[i] = values.get(i);
        return answer;
    }
}`,
    `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) counts.merge(value, 1, Integer::sum);
        List<Integer>[] buckets = new List[nums.length + 1];
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int frequency = entry.getValue();
            if (buckets[frequency] == null) buckets[frequency] = new ArrayList<>();
            buckets[frequency].add(entry.getKey());
        }
        int[] answer = new int[k];
        int index = 0;
        for (int frequency = nums.length; frequency >= 1 && index < k; frequency--) {
            if (buckets[frequency] == null) continue;
            for (int value : buckets[frequency]) {
                answer[index++] = value;
                if (index == k) break;
            }
        }
        return answer;
    }
}`
  ),
  "k-closest-points-to-origin": problem(
    "Given points [x,y] on a plane and k, return any ordering of the k points with the smallest Euclidean distance from the origin.",
    [example("points = [[1,3],[-2,2]], k = 1", "[[-2,2]]", "Squared distances are 10 and 8."), example("points = [[3,3],[5,-1],[-2,4]], k = 2", "[[3,3],[-2,4]]", "Their squared distances are the two smallest."), example("points = [[0,1],[1,0]], k = 2", "[[0,1],[1,0]]", "Both points are requested.")],
    ["1 <= k <= points.length <= 10000", "-10000 <= xi, yi <= 10000"],
    "Sort all points by squared distance and copy the first k.",
    "Sorting all n points costs O(n log n) and stores an ordering that is not otherwise needed.",
    "Keep a max-heap of at most k points. Its root is the farthest selected point, so replace it whenever a closer candidate arrives.",
    "O(n log n) time and O(log n) sorting stack space",
    "O(n log k) time and O(k) space",
    ["Use squared distance to avoid square roots.", "Offer every point to a max-heap ordered by distance.", "Remove the root whenever the heap grows beyond k.", "Poll the remaining k points into the result."],
    `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        Arrays.sort(points, (a, b) -> Long.compare(distance(a), distance(b)));
        return Arrays.copyOf(points, k);
    }

    private long distance(int[] point) {
        return (long) point[0] * point[0] + (long) point[1] * point[1];
    }
}`,
    `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Long.compare(distance(b), distance(a)));
        for (int[] point : points) {
            heap.offer(point);
            if (heap.size() > k) heap.poll();
        }
        int[][] answer = new int[k][];
        for (int i = 0; i < k; i++) answer[i] = heap.poll();
        return answer;
    }

    private long distance(int[] point) {
        return (long) point[0] * point[0] + (long) point[1] * point[1];
    }
}`
  ),
  "kth-smallest-element-in-a-sorted-matrix": problem(
    "Given an n by n matrix whose rows and columns are sorted in ascending order, return the kth smallest element. Count duplicates as separate elements.",
    [example("matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8", "13", "The sorted values put 13 in the eighth position."), example("matrix = [[-5]], k = 1", "-5", "The only value is the answer."), example("matrix = [[1,2],[1,3]], k = 2", "1", "The duplicate one occupies the first two ranks.")],
    ["1 <= n <= 300", "-1000000000 <= matrix[i][j] <= 1000000000", "Rows and columns are nondecreasing.", "1 <= k <= n*n"],
    "Copy all n squared values into an array, sort it, and return index k-1.",
    "This stores and sorts every matrix value, costing O(n squared log n) time and O(n squared) space.",
    "Treat every row as a sorted list. Put the first item of each row in a min-heap, then replace each extracted item with the next value from the same row until the kth extraction.",
    "O(n^2 log n) time and O(n^2) space",
    "O(k log n) time and O(n) space",
    ["Insert the first cell of every row with its coordinates.", "Remove the globally smallest cell.", "Insert the next cell from that same row if it exists.", "Return the value removed on the kth iteration."],
    `class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int[] values = new int[n * n];
        int index = 0;
        for (int[] row : matrix) {
            for (int value : row) values[index++] = value;
        }
        Arrays.sort(values);
        return values[k - 1];
    }
}`,
    `class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        for (int row = 0; row < matrix.length; row++) heap.offer(new int[]{matrix[row][0], row, 0});
        int value = 0;
        for (int count = 0; count < k; count++) {
            int[] cell = heap.poll();
            value = cell[0];
            int nextCol = cell[2] + 1;
            if (nextCol < matrix[cell[1]].length) heap.offer(new int[]{matrix[cell[1]][nextCol], cell[1], nextCol});
        }
        return value;
    }
}`
  ),
  "merge-k-sorted-lists": problem(
    "Given an array of k linked-list heads, with every list sorted in ascending order, merge all nodes into one sorted linked list.",
    [example("lists = [[1,4,5],[1,3,4],[2,6]]", "[1,1,2,3,4,4,5,6]", "All nodes are merged in sorted order."), example("lists = []", "[]", "There are no lists to merge."), example("lists = [[]]", "[]", "The only list is empty.")],
    ["0 <= lists.length <= 10000", "0 <= total nodes <= 10000", "-10000 <= node values <= 10000", "Each input list is sorted."],
    "Collect every node value, sort the values, and build a new linked list.",
    "This uses O(N) extra storage and sorts all N values instead of exploiting the k sorted streams.",
    "Put each nonempty list head in a min-heap. The smallest head is always the next output node; after taking it, offer its successor.",
    "O(N log N) time and O(N) extra space",
    "O(N log k) time and O(k) space",
    ["Offer every non-null head to the heap.", "Poll the smallest node and attach it to the output tail.", "Offer that node's successor if present.", "Repeat until the heap is empty."],
    `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        List<Integer> values = new ArrayList<>();
        for (ListNode head : lists) {
            for (ListNode node = head; node != null; node = node.next) values.add(node.val);
        }
        Collections.sort(values);
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int value : values) {
            tail.next = new ListNode(value);
            tail = tail.next;
        }
        return dummy.next;
    }
}`,
    `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        for (ListNode head : lists) {
            if (head != null) heap.offer(head);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = node;
            if (node.next != null) heap.offer(node.next);
        }
        return dummy.next;
    }
}`
  ),
  "find-median-from-data-stream": problem(
    "Design a structure supporting addNum(int) and findMedian(). The median is the middle value of the sorted stream, or the average of the two middle values when the count is even.",
    [example("addNum(1); addNum(2); findMedian()", "1.5", "The two middle values are 1 and 2."), example("addNum(1); addNum(2); addNum(3); findMedian()", "2.0", "Two is the middle of [1,2,3]."), example("addNum(-1); findMedian()", "-1.0", "A one-value stream has that value as its median.")],
    ["-100000 <= num <= 100000", "At least one value exists before findMedian.", "At most 50000 total operations are called."],
    "Append every number to a list. On each median query, sort a copy and inspect its middle value or values.",
    "Every query repeats a complete sort, costing O(n log n) even when only one new value was added.",
    "Keep the lower half in a max-heap and the upper half in a min-heap. Rebalance so their sizes differ by at most one, making the median available at the roots.",
    "addNum O(1), findMedian O(n log n) time, O(n) space",
    "addNum O(log n), findMedian O(1) time, O(n) space",
    ["Insert into lower when the number belongs below its root; otherwise insert into upper.", "Move one root if either heap is more than one larger.", "For odd size, return the root of the larger heap.", "For even size, average both roots with overflow-safe arithmetic."],
    `class MedianFinder {
    private final List<Integer> values = new ArrayList<>();

    public void addNum(int num) {
        values.add(num);
    }

    public double findMedian() {
        List<Integer> sorted = new ArrayList<>(values);
        Collections.sort(sorted);
        int n = sorted.size();
        if ((n & 1) == 1) return sorted.get(n / 2);
        return ((long) sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0;
    }
}`,
    `class MedianFinder {
    private final PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder());
    private final PriorityQueue<Integer> upper = new PriorityQueue<>();

    public void addNum(int num) {
        if (lower.isEmpty() || num <= lower.peek()) lower.offer(num);
        else upper.offer(num);
        if (lower.size() > upper.size() + 1) upper.offer(lower.poll());
        else if (upper.size() > lower.size() + 1) lower.offer(upper.poll());
    }

    public double findMedian() {
        if (lower.size() > upper.size()) return lower.peek();
        if (upper.size() > lower.size()) return upper.peek();
        return ((long) lower.peek() + upper.peek()) / 2.0;
    }
}`
  ),
  "kth-largest-element-in-a-stream": problem(
    "Construct a stream tracker from k and an initial integer array. Every add(val) call inserts val and returns the kth largest value among all values seen so far.",
    [example("k = 3, nums = [4,5,8,2]; add(3)", "4", "The descending stream is [8,5,4,3,2]."), example("same tracker; add(10)", "5", "The three largest values are 10, 8, and 5."), example("same tracker; add(9)", "8", "The three largest values become 10, 9, and 8.")],
    ["1 <= k <= 10000", "0 <= nums.length <= 10000", "-10000 <= nums[i], val <= 10000", "At most 10000 calls to add are made.", "At least k-1 values exist before construction."],
    "Store every value. After each add, sort a copy of the complete stream and read index size-k.",
    "The stored history grows without bound and every add repeats an O(n log n) sort.",
    "Maintain only the k largest stream values in a min-heap. The smallest of those k values, at the root, is the kth largest overall.",
    "add O(n log n) time and O(n) space",
    "constructor O(n log k), add O(log k) time, O(k) space",
    ["Create a min-heap and feed it the initial values through add.", "Offer each new value.", "Poll when the heap contains more than k values.", "Return the root."],
    `class KthLargest {
    private final int k;
    private final List<Integer> values = new ArrayList<>();

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int value : nums) values.add(value);
    }

    public int add(int val) {
        values.add(val);
        List<Integer> sorted = new ArrayList<>(values);
        Collections.sort(sorted);
        return sorted.get(sorted.size() - k);
    }
}`,
    `class KthLargest {
    private final int k;
    private final PriorityQueue<Integer> heap = new PriorityQueue<>();

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int value : nums) add(value);
    }

    public int add(int val) {
        heap.offer(val);
        if (heap.size() > k) heap.poll();
        return heap.peek();
    }
}`
  ),
  "task-scheduler": problem(
    "Each capital-letter task takes one unit of time. Equal task types must be separated by at least n time units, while the CPU may be idle. Return the minimum total intervals needed to finish all tasks.",
    [example("tasks = [A,A,A,B,B,B], n = 2", "8", "A,B,idle,A,B,idle,A,B is optimal."), example("tasks = [A,C,A,B,D,B], n = 1", "6", "The tasks can be reordered without idle intervals."), example("tasks = [A,A,A,B,B,B], n = 0", "6", "No cooldown is required.")],
    ["1 <= tasks.length <= 10000", "Tasks are uppercase English letters.", "0 <= n <= 100"],
    "Simulate time. At each interval, scan all task types and execute the available type with the largest remaining count, idling when none is available.",
    "Scanning every task type at every time unit repeats selection work and may include many idle intervals.",
    "The most frequent tasks form maxFrequency-1 frames of length n+1. The final answer is the larger of tasks.length and the frame size after accounting for all types tied at maximum frequency.",
    "O(totalIntervals * 26) time and O(26) space",
    "O(tasks.length + 26) time and O(26) space",
    ["Count each task frequency.", "Find the maximum frequency and how many task types have it.", "Compute (max-1)*(n+1)+numberAtMax.", "Return the larger of that frame length and the number of tasks."],
    `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] remaining = new int[26];
        int[] ready = new int[26];
        for (char task : tasks) remaining[task - 'A']++;
        int completed = 0;
        int time = 0;
        while (completed < tasks.length) {
            int best = -1;
            for (int i = 0; i < 26; i++) {
                if (remaining[i] > 0 && ready[i] <= time && (best == -1 || remaining[i] > remaining[best])) best = i;
            }
            if (best != -1) {
                remaining[best]--;
                ready[best] = time + n + 1;
                completed++;
            }
            time++;
        }
        return time;
    }
}`,
    `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26];
        for (char task : tasks) counts[task - 'A']++;
        int max = 0;
        for (int count : counts) max = Math.max(max, count);
        int tied = 0;
        for (int count : counts) {
            if (count == max) tied++;
        }
        int frame = (max - 1) * (n + 1) + tied;
        return Math.max(tasks.length, frame);
    }
}`
  ),
  "reorganize-string": problem(
    "Rearrange the characters of s so that no two adjacent characters are equal. Return any valid rearrangement, or an empty string if none exists.",
    [example("s = \"aab\"", "\"aba\"", "The two a characters are separated."), example("s = \"aaab\"", "\"\"", "Three a characters cannot be separated by only one other character."), example("s = \"vvvlo\"", "\"vlvov\"", "This is one valid arrangement.")],
    ["1 <= s.length <= 500", "s contains lowercase English letters."],
    "Backtrack over unused character counts, never placing the same character as the previous one, and stop at the first complete arrangement.",
    "The search may try exponentially many permutations before proving that no arrangement exists.",
    "Always choose the most frequent currently available character, then hold it out for one step before returning it to the max-heap. This prevents adjacent duplicates while prioritizing the hardest character to place.",
    "O(26^n) time and O(n+26) space",
    "O(n log 26) time and O(26) space",
    ["Count characters and add positive counts to a max-heap.", "Poll the most frequent available character and append it.", "Return the previously used character to the heap only after a different one is chosen.", "Return empty if unused count remains after the heap empties."],
    `class Solution {
    public String reorganizeString(String s) {
        int[] counts = new int[26];
        for (char ch : s.toCharArray()) counts[ch - 'a']++;
        StringBuilder path = new StringBuilder();
        return build(counts, path, s.length()) ? path.toString() : "";
    }

    private boolean build(int[] counts, StringBuilder path, int length) {
        if (path.length() == length) return true;
        for (int i = 0; i < 26; i++) {
            if (counts[i] == 0) continue;
            if (path.length() > 0 && path.charAt(path.length() - 1) == (char) ('a' + i)) continue;
            counts[i]--;
            path.append((char) ('a' + i));
            if (build(counts, path, length)) return true;
            path.deleteCharAt(path.length() - 1);
            counts[i]++;
        }
        return false;
    }
}`,
    `class Solution {
    public String reorganizeString(String s) {
        int[] counts = new int[26];
        for (char ch : s.toCharArray()) counts[ch - 'a']++;
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[1], a[1]));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) heap.offer(new int[]{i, counts[i]});
        }
        StringBuilder answer = new StringBuilder();
        int[] previous = null;
        while (!heap.isEmpty()) {
            int[] current = heap.poll();
            answer.append((char) ('a' + current[0]));
            current[1]--;
            if (previous != null && previous[1] > 0) heap.offer(previous);
            previous = current;
        }
        return answer.length() == s.length() ? answer.toString() : "";
    }
}`
  ),
  "ipo": problem(
    "You start with capital w and may complete at most k projects. Project i requires capital[i] to start and adds profits[i] after completion. Return the maximum capital achievable.",
    [example("k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]", "4", "Take profit 1 first, then profit 3."), example("k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]", "6", "Capital unlocks all projects over three choices."), example("k = 1, w = 0, profits = [1], capital = [1]", "0", "No project is initially affordable.")],
    ["1 <= k <= 100000", "0 <= w <= 1000000000", "1 <= profits.length == capital.length <= 100000", "0 <= profits[i] <= 10000", "0 <= capital[i] <= 1000000000"],
    "For each of up to k choices, scan every unfinished project and select the affordable project with the largest profit.",
    "Repeatedly scanning all n projects costs O(kn).",
    "Sort projects by required capital. As current capital grows, add every newly affordable profit to a max-heap and choose the largest one.",
    "O(kn) time and O(n) space",
    "O(n log n + k log n) time and O(n) space",
    ["Pair capital requirements with profits and sort by capital.", "Before each choice, push every newly affordable project's profit.", "Stop if the heap is empty.", "Add the maximum available profit to current capital."],
    `class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        boolean[] used = new boolean[profits.length];
        for (int round = 0; round < k; round++) {
            int best = -1;
            for (int i = 0; i < profits.length; i++) {
                if (!used[i] && capital[i] <= w && (best == -1 || profits[i] > profits[best])) best = i;
            }
            if (best == -1) break;
            used[best] = true;
            w += profits[best];
        }
        return w;
    }
}`,
    `class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int[][] projects = new int[profits.length][2];
        for (int i = 0; i < profits.length; i++) projects[i] = new int[]{capital[i], profits[i]};
        Arrays.sort(projects, Comparator.comparingInt(a -> a[0]));
        PriorityQueue<Integer> available = new PriorityQueue<>(Collections.reverseOrder());
        int index = 0;
        for (int round = 0; round < k; round++) {
            while (index < projects.length && projects[index][0] <= w) available.offer(projects[index++][1]);
            if (available.isEmpty()) break;
            w += available.poll();
        }
        return w;
    }
}`
  ),
  "smallest-range-covering-elements-from-k-lists": problem(
    "Given k sorted integer lists, find the smallest inclusive range [a,b] containing at least one value from every list. Prefer the smaller a when ranges have equal length.",
    [example("nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]", "[20,24]", "20, 24, and 22 cover the three lists with width 4."), example("nums = [[1,2,3],[1,2,3],[1,2,3]]", "[1,1]", "Value 1 appears in every list."), example("nums = [[1],[2],[3]]", "[1,3]", "Every singleton must be covered.")],
    ["1 <= nums.length <= 3500", "1 <= nums[i].length", "1 <= total elements <= 100000", "-100000 <= values <= 100000", "Each list is sorted."],
    "Try one selected element from every list recursively, compute the resulting minimum and maximum, and retain the narrowest range.",
    "The Cartesian product contains the product of all list lengths, which grows exponentially.",
    "Keep one current element from every list in a min-heap and track their maximum. The heap minimum and tracked maximum form a covering range; advance the list that supplied the minimum because no other move can increase the lower boundary.",
    "O(product of list lengths * k) time and O(k) recursion space",
    "O(N log k) time and O(k) space",
    ["Insert the first value of every list and record the current maximum.", "Compare the heap minimum to the maximum and update the best range.", "Advance the list containing the minimum and update the maximum.", "Stop when one list is exhausted."],
    `class Solution {
    private int bestLeft;
    private int bestRight;

    public int[] smallestRange(List<List<Integer>> nums) {
        bestLeft = 0;
        bestRight = Integer.MAX_VALUE;
        choose(nums, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);
        return new int[]{bestLeft, bestRight};
    }

    private void choose(List<List<Integer>> nums, int list, int min, int max) {
        if (list == nums.size()) {
            if ((long) max - min < (long) bestRight - bestLeft || ((long) max - min == (long) bestRight - bestLeft && min < bestLeft)) {
                bestLeft = min;
                bestRight = max;
            }
            return;
        }
        for (int value : nums.get(list)) choose(nums, list + 1, Math.min(min, value), Math.max(max, value));
    }
}`,
    `class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        int currentMax = Integer.MIN_VALUE;
        for (int list = 0; list < nums.size(); list++) {
            int value = nums.get(list).get(0);
            heap.offer(new int[]{value, list, 0});
            currentMax = Math.max(currentMax, value);
        }
        int bestLeft = heap.peek()[0];
        int bestRight = currentMax;
        while (heap.size() == nums.size()) {
            int[] current = heap.poll();
            if ((long) currentMax - current[0] < (long) bestRight - bestLeft) {
                bestLeft = current[0];
                bestRight = currentMax;
            }
            int nextIndex = current[2] + 1;
            if (nextIndex == nums.get(current[1]).size()) break;
            int nextValue = nums.get(current[1]).get(nextIndex);
            heap.offer(new int[]{nextValue, current[1], nextIndex});
            currentMax = Math.max(currentMax, nextValue);
        }
        return new int[]{bestLeft, bestRight};
    }
}`
  ),
  "furthest-building-you-can-reach": problem(
    "Move through building heights from left to right. Downward or level moves are free; an upward gap consumes that many bricks or one ladder. Return the greatest reachable index with the available bricks and ladders.",
    [example("heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1", "4", "Use bricks for the climb 2 to 7 and the ladder for 9 to 14; the next required resources are unavailable."), example("heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2", "7", "Optimal allocation reaches index 7."), example("heights = [14,3,19,3], bricks = 17, ladders = 0", "3", "The single climb costs 16 bricks.")],
    ["1 <= heights.length <= 100000", "1 <= heights[i] <= 1000000", "0 <= bricks <= 1000000000", "0 <= ladders <= heights.length"],
    "At every positive climb, recursively try spending bricks and, when available, a ladder; return the farther reachable result.",
    "Branching on every climb creates an exponential decision tree with repeated states.",
    "Tentatively assign ladders to all positive climbs by adding them to a min-heap. When more than ladders climbs are stored, pay bricks for the smallest one, preserving ladders for the largest climbs encountered.",
    "O(2^n) time and O(n) recursion space",
    "O(n log(ladders+1)) time and O(ladders) space",
    ["Skip nonpositive height differences.", "Add each positive climb to a min-heap.", "When heap size exceeds ladders, pay bricks for its smallest climb.", "If bricks becomes negative, return the previous building; otherwise reach the end."],
    `class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        return travel(heights, 0, bricks, ladders);
    }

    private int travel(int[] heights, int index, int bricks, int ladders) {
        if (index == heights.length - 1) return index;
        int climb = heights[index + 1] - heights[index];
        if (climb <= 0) return travel(heights, index + 1, bricks, ladders);
        int best = index;
        if (bricks >= climb) best = Math.max(best, travel(heights, index + 1, bricks - climb, ladders));
        if (ladders > 0) best = Math.max(best, travel(heights, index + 1, bricks, ladders - 1));
        return best;
    }
}`,
    `class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> climbs = new PriorityQueue<>();
        for (int i = 0; i < heights.length - 1; i++) {
            int climb = heights[i + 1] - heights[i];
            if (climb <= 0) continue;
            climbs.offer(climb);
            if (climbs.size() > ladders) bricks -= climbs.poll();
            if (bricks < 0) return i;
        }
        return heights.length - 1;
    }
}`
  ),
  "two-sum": problem(
    "Given an integer array nums and target, return the indices of two distinct elements whose values add to target. Exactly one answer exists.",
    [example("nums = [2,7,11,15], target = 9", "[0,1]", "2 + 7 equals 9."), example("nums = [3,2,4], target = 6", "[1,2]", "The values at indices 1 and 2 sum to 6."), example("nums = [3,3], target = 6", "[0,1]", "The two equal values occupy different indices.")],
    ["2 <= nums.length <= 10000", "-1000000000 <= nums[i], target <= 1000000000", "Exactly one valid pair exists.", "The same index cannot be used twice."],
    "Try every index pair i < j and return the pair whose values sum to target.",
    "Most pairs are irrelevant, so nested loops take quadratic time.",
    "Scan once with a map from value to earlier index. Before storing nums[i], look for target-nums[i]; finding it completes the pair without reusing the current element.",
    "O(n^2) time and O(1) space",
    "O(n) average time and O(n) space",
    ["Create an empty value-to-index map.", "Compute the needed complement for the current value.", "Return the earlier complement index when present.", "Otherwise store the current value and index."],
    `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) return new int[]{i, j};
            }
        }
        return new int[0];
    }
}`,
    `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`
  ),
  "contains-duplicate": problem(
    "Return true if any integer appears at least twice in nums; otherwise return false.",
    [example("nums = [1,2,3,1]", "true", "One occurs at indices 0 and 3."), example("nums = [1,2,3,4]", "false", "Every value is distinct."), example("nums = [1,1,1,3,3,4,3,2,4,2]", "true", "Several values repeat.")],
    ["1 <= nums.length <= 100000", "-1000000000 <= nums[i] <= 1000000000"],
    "Compare every pair of positions and return true when equal values are found.",
    "Nested comparisons require O(n squared) time when all values are unique.",
    "Insert each value into a hash set. Set.add returns false when the value was already present, proving a duplicate immediately.",
    "O(n^2) time and O(1) space",
    "O(n) average time and O(n) space",
    ["Create an empty set.", "Attempt to add each value.", "Return true when an insertion reports an existing value.", "Return false after every value is inserted once."],
    `class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
}`,
    `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            if (!seen.add(value)) return true;
        }
        return false;
    }
}`
  ),
  "product-of-array-except-self": problem(
    "Return an array where answer[i] is the product of every nums value except nums[i]. Division is not allowed, and all prefix or suffix products fit in a 32-bit integer.",
    [example("nums = [1,2,3,4]", "[24,12,8,6]", "Each output multiplies the other three values."), example("nums = [-1,1,0,-3,3]", "[0,0,9,0,0]", "Only the position containing zero has a nonzero product."), example("nums = [2,3]", "[3,2]", "Each answer is the other value.")],
    ["2 <= nums.length <= 100000", "-30 <= nums[i] <= 30", "Prefix and suffix products fit in a signed 32-bit integer.", "Division may not be used."],
    "For each index, multiply all values at different indices.",
    "Almost the same products are recomputed n times, leading to quadratic time.",
    "First store in answer[i] the product strictly left of i. Then walk right to left with a running suffix product and multiply it into answer[i].",
    "O(n^2) time and O(1) extra space excluding output",
    "O(n) time and O(1) extra space excluding output",
    ["Build left products directly in the answer array.", "Initialize the right product to one.", "Walk backward, multiply answer[i] by the current right product, then include nums[i].", "Return answer."],
    `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] answer = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            int product = 1;
            for (int j = 0; j < nums.length; j++) {
                if (i != j) product *= nums[j];
            }
            answer[i] = product;
        }
        return answer;
    }
}`,
    `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] answer = new int[nums.length];
        int leftProduct = 1;
        for (int i = 0; i < nums.length; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }
        int rightProduct = 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        return answer;
    }
}`
  ),
  "longest-consecutive-sequence": problem(
    "Given an unsorted integer array, return the length of its longest run of consecutive values. Values in the run need not be adjacent in the input.",
    [example("nums = [100,4,200,1,3,2]", "4", "The run [1,2,3,4] has length four."), example("nums = [0,3,7,2,5,8,4,6,0,1]", "9", "The values 0 through 8 all occur."), example("nums = []", "0", "An empty array has no consecutive run.")],
    ["0 <= nums.length <= 100000", "-1000000000 <= nums[i] <= 1000000000"],
    "Sort nums, then scan while ignoring duplicates and extending the current run when adjacent values differ by one.",
    "Sorting costs O(n log n), while only membership relationships are needed.",
    "Store every value in a set. Begin counting only at values whose predecessor is absent, so every distinct value participates in at most one forward run.",
    "O(n log n) time and O(log n) sorting stack space",
    "O(n) average time and O(n) space",
    ["Insert all values into a set.", "Treat a value as a run start only when value-1 is absent.", "Advance while consecutive values exist.", "Keep the greatest run length."],
    `class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Arrays.sort(nums);
        int best = 1;
        int current = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) current++;
            else current = 1;
            best = Math.max(best, current);
        }
        return best;
    }
}`,
    `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int value : nums) values.add(value);
        int best = 0;
        for (int value : values) {
            if (!values.contains(value - 1)) {
                int length = 1;
                while (values.contains(value + length)) length++;
                best = Math.max(best, length);
            }
        }
        return best;
    }
}`
  ),
  "majority-element": problem(
    "Return the value that appears more than floor(n/2) times in nums. Such a majority value is guaranteed to exist.",
    [example("nums = [3,2,3]", "3", "Three appears twice out of three values."), example("nums = [2,2,1,1,1,2,2]", "2", "Two appears four times out of seven."), example("nums = [7]", "7", "The only value is the majority.")],
    ["1 <= nums.length <= 50000", "-1000000000 <= nums[i] <= 1000000000", "A majority element always exists."],
    "For each value, count its occurrences by scanning the entire array and return one exceeding n/2.",
    "Repeated counting takes quadratic time.",
    "Boyer-Moore cancellation keeps a candidate and balance. Different values cancel in pairs; because the true majority outnumbers all others combined, it remains the final candidate.",
    "O(n^2) time and O(1) space",
    "O(n) time and O(1) space",
    ["Set balance to zero.", "When balance is zero, choose the current value as candidate.", "Increment for the candidate and decrement for a different value.", "Return the surviving candidate."],
    `class Solution {
    public int majorityElement(int[] nums) {
        for (int candidate : nums) {
            int count = 0;
            for (int value : nums) {
                if (value == candidate) count++;
            }
            if (count > nums.length / 2) return candidate;
        }
        throw new IllegalArgumentException();
    }
}`,
    `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int balance = 0;
        for (int value : nums) {
            if (balance == 0) candidate = value;
            balance += value == candidate ? 1 : -1;
        }
        return candidate;
    }
}`
  ),
  "majority-element-ii": problem(
    "Return all values that occur more than floor(n/3) times. The answer contains at most two values.",
    [example("nums = [3,2,3]", "[3]", "Three appears twice, exceeding floor(3/3)."), example("nums = [1]", "[1]", "One occurrence exceeds floor(1/3)."), example("nums = [1,2]", "[1,2]", "Both values occur more than zero times.")],
    ["1 <= nums.length <= 50000", "-1000000000 <= nums[i] <= 1000000000"],
    "For every distinct candidate, scan nums to count it and add it when its count exceeds n/3.",
    "Repeated scans are quadratic and require a set to avoid duplicate output.",
    "Generalized Boyer-Moore tracks two candidates because at most two values can exceed n/3. Cancel groups of three distinct values, then verify both survivors in a second pass.",
    "O(n^2) time and O(n) space",
    "O(n) time and O(1) extra space",
    ["Maintain two candidate-and-count pairs.", "Match existing candidates before filling an empty slot; otherwise decrement both counts.", "Count both final candidates again.", "Return only candidates whose verified count exceeds n/3."],
    `class Solution {
    public List<Integer> majorityElement(int[] nums) {
        List<Integer> answer = new ArrayList<>();
        Set<Integer> checked = new HashSet<>();
        for (int candidate : nums) {
            if (!checked.add(candidate)) continue;
            int count = 0;
            for (int value : nums) if (value == candidate) count++;
            if (count > nums.length / 3) answer.add(candidate);
        }
        return answer;
    }
}`,
    `class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int first = 0;
        int second = 1;
        int firstCount = 0;
        int secondCount = 0;
        for (int value : nums) {
            if (value == first) firstCount++;
            else if (value == second) secondCount++;
            else if (firstCount == 0) {
                first = value;
                firstCount = 1;
            } else if (secondCount == 0) {
                second = value;
                secondCount = 1;
            } else {
                firstCount--;
                secondCount--;
            }
        }
        firstCount = 0;
        secondCount = 0;
        for (int value : nums) {
            if (value == first) firstCount++;
            else if (value == second) secondCount++;
        }
        List<Integer> answer = new ArrayList<>();
        if (firstCount > nums.length / 3) answer.add(first);
        if (secondCount > nums.length / 3) answer.add(second);
        return answer;
    }
}`
  ),
  "maximum-subarray": problem(
    "Return the largest sum among all nonempty contiguous subarrays of nums.",
    [example("nums = [-2,1,-3,4,-1,2,1,-5,4]", "6", "The subarray [4,-1,2,1] sums to 6."), example("nums = [1]", "1", "The only nonempty subarray is [1]."), example("nums = [5,4,-1,7,8]", "23", "The entire array has the largest sum.")],
    ["1 <= nums.length <= 100000", "-10000 <= nums[i] <= 10000"],
    "Choose every starting index, extend to every ending index with a running sum, and keep the largest.",
    "There are O(n squared) contiguous ranges.",
    "Kadane's algorithm tracks the best sum ending exactly at the current index. Either extend the previous range or restart at the current value, then update the global best.",
    "O(n^2) time and O(1) space",
    "O(n) time and O(1) space",
    ["Initialize current and best with nums[0].", "For each later value, set current to max(value, current+value).", "Update best with current.", "Return best."],
    `class Solution {
    public int maxSubArray(int[] nums) {
        int best = Integer.MIN_VALUE;
        for (int start = 0; start < nums.length; start++) {
            int sum = 0;
            for (int end = start; end < nums.length; end++) {
                sum += nums[end];
                best = Math.max(best, sum);
            }
        }
        return best;
    }
}`,
    `class Solution {
    public int maxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}`
  ),
  "maximum-product-subarray": problem(
    "Return the largest product among all nonempty contiguous subarrays of nums.",
    [example("nums = [2,3,-2,4]", "6", "The subarray [2,3] has product 6."), example("nums = [-2,0,-1]", "0", "No contiguous subarray may skip the zero to combine -2 and -1."), example("nums = [-2,3,-4]", "24", "The complete array has product 24.")],
    ["1 <= nums.length <= 20000", "-10 <= nums[i] <= 10", "Every subarray product fits in a 32-bit signed integer."],
    "Enumerate every starting index, multiply through every ending index, and keep the largest product.",
    "The number of subarrays is quadratic.",
    "Track both maximum and minimum products ending at each index. A negative current value can turn the prior minimum into the new maximum, so both states are required.",
    "O(n^2) time and O(1) space",
    "O(n) time and O(1) space",
    ["Initialize current maximum, current minimum, and answer with nums[0].", "Swap maximum and minimum when the new value is negative.", "Either restart at the value or multiply each prior state.", "Update the global maximum."],
    `class Solution {
    public int maxProduct(int[] nums) {
        int best = nums[0];
        for (int start = 0; start < nums.length; start++) {
            int product = 1;
            for (int end = start; end < nums.length; end++) {
                product *= nums[end];
                best = Math.max(best, product);
            }
        }
        return best;
    }
}`,
    `class Solution {
    public int maxProduct(int[] nums) {
        int maximum = nums[0];
        int minimum = nums[0];
        int answer = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int temp = maximum;
                maximum = minimum;
                minimum = temp;
            }
            maximum = Math.max(nums[i], maximum * nums[i]);
            minimum = Math.min(nums[i], minimum * nums[i]);
            answer = Math.max(answer, maximum);
        }
        return answer;
    }
}`
  ),
  "subarray-sum-equals-k": problem(
    "Count the nonempty contiguous subarrays whose sum equals k.",
    [example("nums = [1,1,1], k = 2", "2", "The first two and last two values form valid subarrays."), example("nums = [1,2,3], k = 3", "2", "Subarrays [1,2] and [3] sum to 3."), example("nums = [1,-1,0], k = 0", "3", "[1,-1], [0], and [1,-1,0] are valid.")],
    ["1 <= nums.length <= 20000", "-1000 <= nums[i] <= 1000", "-10000000 <= k <= 10000000"],
    "Start at every index, extend right with a running sum, and increment the answer whenever it equals k.",
    "Enumerating all subarrays takes quadratic time.",
    "If current prefix sum is P, a subarray ending here sums to k for every earlier prefix P-k. Store how often each prefix has occurred and add that frequency.",
    "O(n^2) time and O(1) space",
    "O(n) average time and O(n) space",
    ["Store frequency 1 for prefix sum zero.", "Add each value to the running prefix.", "Add frequency(prefix-k) to the answer.", "Increment the current prefix frequency."],
    `class Solution {
    public int subarraySum(int[] nums, int k) {
        int answer = 0;
        for (int start = 0; start < nums.length; start++) {
            int sum = 0;
            for (int end = start; end < nums.length; end++) {
                sum += nums[end];
                if (sum == k) answer++;
            }
        }
        return answer;
    }
}`,
    `class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> frequencies = new HashMap<>();
        frequencies.put(0, 1);
        int prefix = 0;
        int answer = 0;
        for (int value : nums) {
            prefix += value;
            answer += frequencies.getOrDefault(prefix - k, 0);
            frequencies.merge(prefix, 1, Integer::sum);
        }
        return answer;
    }
}`
  ),
