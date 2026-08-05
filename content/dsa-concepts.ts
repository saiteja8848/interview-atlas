export type ConceptLesson = {
  summary: string;
  foundations: { title: string; description: string }[];
  operations: string[];
  interviewNotes: string[];
  snippetTitle: string;
  snippetDescription: string;
  java: string;
  deepDives?: {
    title: string;
    complexity: string;
    description: string;
    keyPoints: string[];
    dryRun: { input: string; steps: string[]; result: string };
    java?: string;
  }[];
};

export const dsaConcepts: Record<string, ConceptLesson> = {
  Bitwise: {
    summary: "Bitwise code works on the binary digits of an integer. It is valuable when a bit can stand for a boolean choice, a small counter, or a compact state.",
    foundations: [
      { title: "Binary places", description: "Each position represents a power of two. The rightmost bit is the least significant bit (LSB)." },
      { title: "Operators", description: "AND keeps shared 1s, OR combines 1s, XOR keeps differences, and shifts move binary places." },
      { title: "Masks", description: "A mask such as 1 << i lets you read or change exactly one position without affecting the others." },
    ],
    operations: ["Check the ith bit with (n & (1 << i)) != 0.", "Set, clear, or toggle a bit with OR, AND-not, and XOR.", "Use n & (n - 1) to remove the lowest set bit."],
    interviewNotes: ["XOR cancels equal pairs: x ^ x is 0.", "A positive power of two has exactly one set bit.", "A bitmask can represent a subset when there are only a small number of choices."],
    snippetTitle: "Read and update one bit",
    snippetDescription: "This small helper set is the base for masks, subsets, and bit-counting problems.",
    java: `class BitOperations {
  boolean isSet(int n, int bit) {
    return (n & (1 << bit)) != 0;
  }

  int setBit(int n, int bit) {
    return n | (1 << bit);
  }

  int clearLowestSetBit(int n) {
    return n & (n - 1);
  }
}`,
    deepDives: [
      {
        title: "1. Binary, truth tables, and signed shifts",
        complexity: "Every bit operation O(1)",
        description: "Integers are binary positions: 1, 2, 4, 8, and so on. AND keeps a 1 only when both bits are 1; OR keeps a 1 when either bit is 1; XOR keeps a 1 when bits differ; NOT flips bits. Left shift moves digits left; right shift moves them right.",
        keyPoints: ["AND: 0&0=0, 0&1=0, 1&0=0, 1&1=1.", "OR: 0|0=0, 0|1=1, 1|0=1, 1|1=1. XOR: equal bits give 0, different bits give 1.", "n << k usually multiplies non-overflowing positive n by 2ᵏ; n >> k divides while preserving the sign; n >>> k fills with zeros."],
        dryRun: { input: "n = 10 = 1010₂", steps: ["10 << 1 becomes 10100₂ = 20.", "10 >> 1 becomes 0101₂ = 5.", "1010₂ XOR 0110₂ = 1100₂ = 12 because only differing positions become 1."], result: "Shifts move binary places; XOR highlights differences." },
        java: `class BitBasics {
  int and(int a, int b) { return a & b; }
  int or(int a, int b) { return a | b; }
  int xor(int a, int b) { return a ^ b; }
  int shiftLeft(int n, int places) { return n << places; }
  int logicalShiftRight(int n, int places) { return n >>> places; }
}`,
      },
      {
        title: "2. Read, set, clear, toggle, mask, and unmask",
        complexity: "Every bit operation O(1)",
        description: "A mask has a 1 at each position you care about. AND reads or keeps masked bits, OR turns selected bits on, AND with an inverted mask turns them off, and XOR flips selected bits.",
        keyPoints: ["Read ith bit: (n & (1 << i)) != 0.", "Set: n | (1 << i). Clear: n & ~(1 << i). Toggle: n ^ (1 << i).", "Keep only selected bits with n & mask; remove selected bits with n & ~mask."],
        dryRun: { input: "n = 1010₂, i = 1", steps: ["Mask 1 << 1 is 0010₂.", "n & mask is 0010₂, so bit 1 is set.", "n ^ mask becomes 1000₂, so bit 1 was toggled off."], result: "One mask changes exactly one chosen position." },
        java: `class BitMask {
  boolean isSet(int n, int bit) { return (n & (1 << bit)) != 0; }
  int set(int n, int bit) { return n | (1 << bit); }
  int clear(int n, int bit) { return n & ~(1 << bit); }
  int toggle(int n, int bit) { return n ^ (1 << bit); }
  int keepMasked(int n, int mask) { return n & mask; }
  int removeMasked(int n, int mask) { return n & ~mask; }
}`,
      },
      {
        title: "3. Fast number tricks",
        complexity: "O(1) each · Count set bits O(number of set bits)",
        description: "The least significant bit exposes several interview shortcuts. Parity is determined by the final bit. A positive power of two has only one 1. Subtracting one flips the lowest 1 and trailing zeros, so AND with n - 1 removes that lowest 1.",
        keyPoints: ["Even: (n & 1) == 0. Odd: (n & 1) == 1.", "Power of two: n > 0 && (n & (n - 1)) == 0.", "Remove lowest set bit: n &= n - 1. Lowest set-bit value: n & -n."],
        dryRun: { input: "n = 12 = 1100₂", steps: ["12 is even because its last bit is 0.", "n - 1 is 1011₂.", "1100₂ & 1011₂ = 1000₂, removing the lowest 1."], result: "Repeating this operation counts the two set bits in 12." },
        java: `class BitTricks {
  boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }

  int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
      n &= n - 1;
      count++;
    }
    return count;
  }
}`,
      },
      {
        title: "4. XOR cancellation and subset masks",
        complexity: "XOR scan O(n) · Enumerating masks O(2ⁿ)",
        description: "XOR cancels equal values because x ^ x = 0 and leaves a unique or missing value behind. A bitmask can encode a subset: bit i says whether item i is selected.",
        keyPoints: ["Single Number: XOR every value; pairs cancel.", "Missing number: XOR indices and values; shared values cancel.", "For n items, masks 0 through (1 << n) - 1 represent every subset."],
        dryRun: { input: "Values [4,1,2,1,2]", steps: ["4 ^ 1 ^ 2 ^ 1 ^ 2.", "The two 1s cancel; the two 2s cancel.", "Only 4 remains."], result: "XOR finds the unpaired value without extra storage." },
        java: `class Solution {
  public int singleNumber(int[] nums) {
    int answer = 0;
    for (int value : nums) answer ^= value;
    return answer;
  }

  public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> answer = new ArrayList<>();
    for (int mask = 0; mask < (1 << nums.length); mask++) {
      List<Integer> subset = new ArrayList<>();
      for (int bit = 0; bit < nums.length; bit++) if ((mask & (1 << bit)) != 0) subset.add(nums[bit]);
      answer.add(subset);
    }
    return answer;
  }
}`,
      },
    ],
  },
  Math: {
    summary: "Math problems reward reducing a large computation to a repeatable property: factors, remainders, digits, or a geometric invariant.",
    foundations: [
      { title: "Remainders", description: "Modulo arithmetic keeps only the remainder and is essential for cyclic values and overflow-safe counting." },
      { title: "Factors", description: "A number is prime when no divisor up to its square root divides it. GCD captures shared factors." },
      { title: "Digits", description: "Repeated % 10 and / 10 process a number from right to left without converting it to a string." },
    ],
    operations: ["Use Euclid's algorithm for GCD.", "Compute LCM as a / gcd(a, b) * b to reduce overflow risk.", "Use fast exponentiation to halve the exponent at every step."],
    interviewNotes: ["Count factor contributions instead of constructing huge factorials.", "Check the input range before choosing int or long.", "For prime queries over a range, precompute with a sieve."],
    snippetTitle: "Euclidean greatest common divisor",
    snippetDescription: "Each remainder is smaller than the previous divisor, so the loop finishes in logarithmic time.",
    java: `class MathTools {
  int gcd(int a, int b) {
    while (b != 0) {
      int remainder = a % b;
      a = b;
      b = remainder;
    }
    return Math.abs(a);
  }

  long lcm(int a, int b) {
    return (long) a / gcd(a, b) * b;
  }
}`,
    deepDives: [
      {
        title: "1. Digits, divisibility, GCD, LCM, and modulo",
        complexity: "GCD O(log min(a,b))",
        description: "Math questions usually hide a repeatable invariant in digits, factors, or remainders. Process digits with % 10 and / 10. Use GCD for shared factors, LCM for common multiples, and modulo for values that wrap around.",
        keyPoints: ["gcd(a,b) repeatedly replaces (a,b) with (b,a%b).", "lcm(a,b) = (long) a / gcd(a,b) * b.", "A negative modulo needs careful normalization when indexing circular arrays."],
        dryRun: { input: "gcd(48,18)", steps: ["48 % 18 = 12, so continue with gcd(18,12).", "18 % 12 = 6, so continue with gcd(12,6).", "12 % 6 = 0, so 6 is the answer."], result: "Each remainder gets smaller, giving logarithmic work." },
        java: `class MathTools {
  int gcd(int a, int b) {
    while (b != 0) {
      int remainder = a % b;
      a = b;
      b = remainder;
    }
    return Math.abs(a);
  }

  long lcm(int a, int b) {
    return (long) a / gcd(a, b) * b;
  }
}`,
      },
      {
        title: "2. Primes, powers, and combinatorics",
        complexity: "Sieve O(n log log n) · Fast power O(log exponent)",
        description: "For one number, trial-divide only to its square root. For many prime queries, sieve once. Fast power halves the exponent recursively. Counting arrangements uses permutations when order matters and combinations when it does not.",
        keyPoints: ["A composite number has a factor at most √n.", "Sieve marks multiples starting from p × p.", "Use long for multiplication before modulo to avoid overflow."],
        dryRun: { input: "Check 29 for primality", steps: ["Only try divisors through √29, which is less than 6.", "2, 3, 4, and 5 do not divide 29.", "No divisor exists, so 29 is prime."], result: "You avoid checking values all the way to 28." },
        java: `class NumberTheory {
  boolean isPrime(int n) {
    if (n < 2) return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++) {
      if (n % divisor == 0) return false;
    }
    return true;
  }

  long power(long base, long exponent) {
    if (exponent == 0) return 1;
    long half = power(base, exponent / 2);
    return exponent % 2 == 0 ? half * half : half * half * base;
  }
}`,
      },
    ],
  },
  "Two Pointers": {
    summary: "Two pointers turn a quadratic pair search into a linear scan when the movement of one pointer can safely rule out many candidates.",
    foundations: [
      { title: "Opposite ends", description: "On sorted data, compare a left and right value, then move the side that cannot improve the answer." },
      { title: "Read and write", description: "A slow pointer marks the next output slot while a fast pointer scans the input." },
      { title: "Fast and slow", description: "Different speeds reveal cycles or a midpoint in linked lists." },
    ],
    operations: ["Sort first when order lets a sum or comparison eliminate a side.", "Maintain what every region of the array means before moving a pointer.", "Move only the pointer justified by the current comparison."],
    interviewNotes: ["Do not move both ends without explaining why no answer is skipped.", "For duplicates, skip repeated anchor values after using them.", "A fixed pointer gap finds the nth node from the end."],
    snippetTitle: "Two Sum in a sorted array",
    snippetDescription: "If the sum is too small, moving left is the only move that can increase it; if too large, move right.",
    java: `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    while (left < right) {
      int sum = numbers[left] + numbers[right];
      if (sum == target) return new int[]{left + 1, right + 1};
      if (sum < target) left++;
      else right--;
    }
    return new int[]{};
  }
}`,
    deepDives: [
      {
        title: "1. Opposite-end pointers on sorted data",
        complexity: "Time O(n) after any required sorting",
        description: "Put one pointer at each end. The current comparison proves which side cannot participate in a better answer, so move only that pointer.",
        keyPoints: ["For a target sum in sorted data: sum too small means move left; too large means move right.", "For container area: move the shorter height because the taller side cannot improve the limiting height.", "For palindromes: move both inward only after comparing matching positions."],
        dryRun: { input: "Sorted [1,2,4,7], target 6", steps: ["1 + 7 = 8, too large, so move right.", "1 + 4 = 5, too small, so move left.", "2 + 4 = 6, so the pair is found."], result: "Each pointer moves at most n times, not n² pair checks." },
        java: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
      int sum = nums[left] + nums[right];
      if (sum == target) return new int[]{left, right};
      if (sum < target) left++;
      else right--;
    }
    return new int[]{};
  }
}`,
      },
      {
        title: "2. Slow/fast, partition, and linked-list pointers",
        complexity: "Time O(n) · Space O(1)",
        description: "A slow pointer marks the answer built so far while a fast pointer scans. Different speeds reveal linked-list cycles. Three pointers divide an array into known regions for partitioning.",
        keyPoints: ["Remove duplicates: fast reads every value; slow writes the next unique one.", "Cycle detection: slow moves one step, fast moves two; they meet only in a cycle.", "Dutch National Flag: maintain [0..low), [low..current), and (high..end] regions."],
        dryRun: { input: "Sorted [1,1,2,2,3]", steps: ["slow starts at 1; fast sees duplicate 1 and skips it.", "fast sees 2, so write it after the previous unique value.", "Continue for 3."], result: "The front becomes [1,2,3] without another array." },
        java: `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int slow = 1;
    for (int fast = 1; fast < nums.length; fast++) {
      if (nums[fast] != nums[fast - 1]) nums[slow++] = nums[fast];
    }
    return slow;
  }
}`,
      },
    ],
  },
  "Sliding Window": {
    summary: "A sliding window keeps one contiguous range and updates its state as the right edge grows and the left edge shrinks.",
    foundations: [
      { title: "Fixed window", description: "The size is known, so add the new item and remove the expired item on every step." },
      { title: "Variable window", description: "Expand until a rule breaks, then shrink only enough to restore validity." },
      { title: "Window state", description: "A sum, frequency map, count of distinct values, or monotonic deque explains whether the window is valid." },
    ],
    operations: ["Add the right value before checking validity.", "Use a while loop when several left values may need removal.", "Update the answer only when the window has the required property."],
    interviewNotes: ["Contiguous subarray or substring wording is the main signal.", "Never rebuild the state for each window; update it incrementally.", "Use a deque when you need a window maximum or minimum."],
    snippetTitle: "Longest substring without repeated characters",
    snippetDescription: "The map remembers the latest position of each character. The left boundary only moves forward.",
    java: `class Solution {
  public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
      char ch = s.charAt(right);
      if (lastSeen.containsKey(ch)) left = Math.max(left, lastSeen.get(ch) + 1);
      lastSeen.put(ch, right);
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
    deepDives: [
      {
        title: "1. Fixed windows",
        complexity: "Time O(n) · Space depends on maintained state",
        description: "When the required subarray or substring length is k, add the new right value and remove the expired left value. Never recompute the whole window.",
        keyPoints: ["Signals: exactly k elements, anagrams of a length-k pattern, maximum sum of k values.", "The window is valid when right - left + 1 == k.", "Update the answer after the window reaches size k, then slide once."],
        dryRun: { input: "nums [2,1,5,1,3], k = 3", steps: ["First sum is 2+1+5=8.", "Slide: add 1, remove 2, giving 7.", "Slide: add 3, remove 1, giving 9."], result: "The maximum window sum is 9." },
        java: `class Solution {
  public int maxSum(int[] nums, int k) {
    int sum = 0;
    int best = Integer.MIN_VALUE;
    for (int right = 0; right < nums.length; right++) {
      sum += nums[right];
      if (right >= k) sum -= nums[right - k];
      if (right >= k - 1) best = Math.max(best, sum);
    }
    return best;
  }
}`,
      },
      {
        title: "2. Variable windows and frequency tricks",
        complexity: "Time O(n) because each pointer only moves forward",
        description: "Expand right until the window breaks a rule. Shrink left in a while loop until it is valid again. A map or frequency array tells you what validity means.",
        keyPoints: ["Signals: longest or smallest contiguous range satisfying a condition.", "For no-repeat characters, shrink until the duplicate leaves.", "For required characters, track a matched requirement count rather than comparing maps every time."],
        dryRun: { input: "String 'abca'", steps: ["Window 'abc' is valid with length 3.", "Adding final a creates a duplicate.", "Move left past the first a; window becomes 'bca' and is valid again."], result: "The longest no-repeat window has length 3." },
        java: `class Solution {
  public int lengthOfLongestSubstring(String s) {
    int[] count = new int[128];
    int left = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
      count[s.charAt(right)]++;
      while (count[s.charAt(right)] > 1) count[s.charAt(left++)]--;
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
      },
    ],
  },
  "Intervals & Greedy": {
    summary: "Interval problems become manageable after sorting by a boundary. Greedy algorithms make the locally best choice only when an invariant proves it remains safe.",
    foundations: [
      { title: "Overlap", description: "For sorted intervals, the next start compared with the current end tells you whether ranges overlap." },
      { title: "Boundary choice", description: "Sorting by start helps merge ranges; sorting by end often helps schedule the largest number of non-overlapping ranges." },
      { title: "Greedy proof", description: "State what future choices stay possible after making the local decision." },
    ],
    operations: ["Sort intervals before comparing neighbors.", "Extend a merge with the larger end.", "When retaining one overlapping interval, keep the one ending earlier if future room matters."],
    interviewNotes: ["Use a min-heap of end times when simultaneous rooms matter.", "A sweep line records starts and ends as events.", "Do not call an approach greedy unless you can explain why it does not block an optimal result."],
    snippetTitle: "Merge overlapping intervals",
    snippetDescription: "After sorting by start time, every new interval either extends the last merged range or begins a new one.",
    java: `class Solution {
  public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
        merged.add(interval.clone());
      } else {
        merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
      }
    }
    return merged.toArray(new int[merged.size()][]);
  }
}`,
    deepDives: [
      {
        title: "1. Intervals and greedy decisions",
        complexity: "Sort O(n log n) · Scan O(n)",
        description: "Sort intervals first so a current range can be compared only with its next neighbor. Greedy means choosing a locally best option only when it preserves the most room for later choices.",
        keyPoints: ["Merge: sort by start; overlap exists when next.start <= current.end.", "Erase overlap: keep the interval that ends earlier, because it leaves more room.", "Meeting rooms: a min-heap of end times counts active overlaps."],
        dryRun: { input: "[[1,3],[2,6],[8,10]]", steps: ["Start with [1,3].", "Next start 2 is within end 3, so extend end to 6.", "Next start 8 is after 6, so begin a new interval."], result: "Merged result is [[1,6],[8,10]]." },
        java: `class Solution {
  public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
    List<int[]> answer = new ArrayList<>();
    for (int[] interval : intervals) {
      if (answer.isEmpty() || answer.get(answer.size() - 1)[1] < interval[0]) answer.add(interval.clone());
      else answer.get(answer.size() - 1)[1] = Math.max(answer.get(answer.size() - 1)[1], interval[1]);
    }
    return answer.toArray(new int[answer.size()][]);
  }
}`,
      },
    ],
  },
  "Binary Search": {
    summary: "Binary search repeatedly discards a half that cannot contain the answer. It works on sorted values and on any monotonic true/false feasibility condition.",
    foundations: [
      { title: "Search interval", description: "Decide whether left and right are inclusive, then keep that rule for the whole loop." },
      { title: "Monotonic condition", description: "For answer-space search, all values on one side fail and all values on the other side succeed." },
      { title: "Midpoint", description: "left + (right - left) / 2 avoids overflow and always stays inside the interval." },
    ],
    operations: ["Use left <= right when looking for an exact target in an inclusive interval.", "Move one boundary past mid after rejecting mid.", "Store a possible answer before continuing when looking for a first or last valid value."],
    interviewNotes: ["Ask what fact makes one half impossible.", "Rotated arrays still have one sorted half at each midpoint.", "Search on answer needs a feasibility function, not a sorted input array."],
    snippetTitle: "Inclusive binary search",
    snippetDescription: "Every update removes mid and preserves the promise that a target, if present, remains inside the interval.",
    java: `class Solution {
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
}`,
    deepDives: [
      {
        title: "1. Binary-search invariants and answer space",
        complexity: "Time O(log n) per feasibility check",
        description: "Binary search works whenever a comparison or yes/no feasibility test divides answers into a false region and a true region. Keep an interval invariant: if the answer exists, it stays inside your current search range.",
        keyPoints: ["Exact target: discard mid after comparing it.", "First valid / minimum feasible: store mid as candidate, then search left.", "Search-on-answer: write a canDo(mid) function; examples include Koko, capacity, and speed."],
        dryRun: { input: "Minimum speed with canDo(speed): false,false,true,true", steps: ["Try mid; if false, the answer must be to the right.", "If true, keep mid as a candidate and search left.", "Continue until left passes right."], result: "The first true speed is the minimum valid answer." },
        java: `class Solution {
  public int firstTrue(int low, int high) {
    int answer = -1;
    while (low <= high) {
      int mid = low + (high - low) / 2;
      if (canDo(mid)) {
        answer = mid;
        high = mid - 1;
      } else low = mid + 1;
    }
    return answer;
  }
}`,
      },
    ],
  },
  Heaps: {
    summary: "A heap keeps the most useful current value at its root. It is ideal when you repeatedly need the smallest, largest, or next-best item without sorting everything again.",
    foundations: [
      { title: "Complete tree", description: "A heap is stored compactly in an array: parent (i - 1) / 2, children 2i + 1 and 2i + 2." },
      { title: "Heap property", description: "A min-heap puts the smallest item at the root; a max-heap puts the largest there." },
      { title: "Cost", description: "Peek is O(1); insertion and root removal are O(log n); building a heap is O(n)." },
    ],
    operations: ["Use PriorityQueue for a min-heap.", "Pass Collections.reverseOrder() for a max-heap.", "Keep only K values when the root represents the current threshold."],
    interviewNotes: ["Use two heaps to maintain a streaming median.", "For K sorted sources, keep the next candidate from each source in a min-heap.", "A heap orders the next best item; it is not a fully sorted collection."],
    snippetTitle: "Kth largest with a bounded min-heap",
    snippetDescription: "The heap keeps the K largest values seen so far. Its root is therefore the Kth largest.",
    java: `class Solution {
  public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int value : nums) {
      heap.offer(value);
      if (heap.size() > k) heap.poll();
    }
    return heap.peek();
  }
}`,
    deepDives: [
      {
        title: "1. Heap / PriorityQueue patterns",
        complexity: "Peek O(1) · Insert/remove root O(log n)",
        description: "A heap is a complete tree stored in an array where only the root is globally best. Use a min-heap for smallest-next work and a max-heap for largest-next work.",
        keyPoints: ["Top K: keep a min-heap of size K; its root is the Kth largest.", "K-way merge: keep one next candidate from each sorted source.", "Two heaps: max-heap lower half and min-heap upper half maintain a median stream."],
        dryRun: { input: "Find 2nd largest in [3,2,1,5,6,4]", steps: ["Keep a min-heap of at most two values.", "When it exceeds size two, remove its smallest value.", "After all values, heap contains [5,6]."], result: "The root 5 is the 2nd largest." },
        java: `class Solution {
  public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int value : nums) {
      heap.offer(value);
      if (heap.size() > k) heap.poll();
    }
    return heap.peek();
  }
}`,
      },
    ],
  },
  Arrays: {
    summary: "Arrays provide constant-time indexing. Most array solutions are a single scan plus carefully maintained state such as a map, set, prefix value, or matrix boundary.",
    foundations: [
      { title: "Contiguous data", description: "An array supports O(1) access by index, but inserting in the middle usually shifts later values." },
      { title: "Subarray versus subsequence", description: "A subarray is contiguous; a subsequence preserves order but may skip values." },
      { title: "2D arrays", description: "Use row and column bounds deliberately. A grid often behaves like a graph of adjacent cells." },
    ],
    operations: ["Use a prefix array to answer range sums in O(1) after O(n) preprocessing.", "Use first row and column as markers for in-place matrix transformations.", "Combine an array scan with HashMap or HashSet for lookup and frequency state."],
    interviewNotes: ["Write the meaning of each index or pointer before updating it.", "For in-place work, separate read and write positions.", "Matrix problems often reduce to traversal directions, boundaries, or cell-as-node BFS/DFS."],
    snippetTitle: "Prefix sums for range queries",
    snippetDescription: "prefix[i] stores the sum of values before i, making any inclusive range subtraction immediate.",
    java: `class RangeSum {
  private final int[] prefix;

  RangeSum(int[] nums) {
    prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) {
      prefix[i + 1] = prefix[i] + nums[i];
    }
  }

  int sumRange(int left, int right) {
    return prefix[right + 1] - prefix[left];
  }
}`,
    deepDives: [
      {
        title: "1. Arrays — state, prefix/suffix, hashing, and matrices",
        complexity: "Most scans O(n) · Matrix scan O(rows × cols)",
        description: "Arrays give O(1) index access. Strong solutions scan once while preserving a small state: a set, map, prefix value, product, pointer, or matrix boundary.",
        keyPoints: ["HashMap stores value→index, count, or prefix sum frequency.", "Prefix sums turn a range sum into prefix[right+1] - prefix[left].", "For matrices, define boundaries or directions first; a grid can be treated as a graph."],
        dryRun: { input: "nums [2,7,11], target 9", steps: ["At 2, store 2→0.", "At 7, need is 2; it is already stored.", "Return indices 0 and 1."], result: "A hash lookup removes the inner loop." },
        java: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      int need = target - nums[i];
      if (seen.containsKey(need)) return new int[]{seen.get(need), i};
      seen.put(nums[i], i);
    }
    return new int[]{};
  }
}`,
      },
      {
        title: "2. Array in-place and 2D tricks",
        complexity: "Time O(n) or O(rows × cols) · Often O(1) extra space",
        description: "Use read/write pointers for in-place filtering. For Rotate Image, transpose then reverse each row. For Set Matrix Zeroes, the first row and column can be marker storage.",
        keyPoints: ["State the meaning of every region before modifying it.", "Use a sentinel or first row/column only after protecting their original state.", "Subarray means contiguous; subsequence permits gaps."],
        dryRun: { input: "Rotate [[1,2],[3,4]] clockwise", steps: ["Transpose to [[1,3],[2,4]].", "Reverse each row.", "Rows become [3,1] and [4,2]."], result: "The matrix rotates without an extra matrix." },
        java: `class Solution {
  public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int row = 0; row < n; row++) {
      for (int col = row + 1; col < n; col++) {
        int temp = matrix[row][col];
        matrix[row][col] = matrix[col][row];
        matrix[col][row] = temp;
      }
    }
    for (int[] row : matrix) {
      for (int left = 0, right = n - 1; left < right; left++, right--) {
        int temp = row[left];
        row[left] = row[right];
        row[right] = temp;
      }
    }
  }
}`,
      },
    ],
  },
  Strings: {
    summary: "String problems are array problems over characters, with extra attention to immutability, prefixes, frequency signatures, and building output efficiently.",
    foundations: [
      { title: "Immutable values", description: "Java String changes create a new value, so repeated concatenation should usually use StringBuilder." },
      { title: "Character state", description: "A frequency array or map represents the multiset of characters in a substring or word." },
      { title: "Order", description: "A substring is contiguous; a subsequence keeps order while allowing skips. A prefix begins at index zero." },
    ],
    operations: ["Use StringBuilder when constructing text in a loop.", "Use a 26-length frequency array for lowercase English letters.", "Use a Trie when many queries share prefixes."],
    interviewNotes: ["Anagrams have the same frequency signature.", "Palindromes compare outward from a center or use a two-ended scan.", "Pattern matching may need a prefix table (KMP) when the pattern is reused."],
    snippetTitle: "Anagram frequency comparison",
    snippetDescription: "Each character increments once and decrements once; any nonzero count means the words differ.",
    java: `class Solution {
  public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
      count[s.charAt(i) - 'a']++;
      count[t.charAt(i) - 'a']--;
    }
    for (int value : count) if (value != 0) return false;
    return true;
  }
}`,
    deepDives: [
      {
        title: "1. Strings — frequency, palindrome, transformation, and prefix",
        complexity: "Most scans O(n) · Trie operations O(word length)",
        description: "Strings are immutable character arrays. Use StringBuilder for repeated construction, a frequency array for small alphabets, two pointers for palindromes, and a Trie or prefix table when prefixes are reused.",
        keyPoints: ["Anagrams have identical character counts.", "Palindrome expansion chooses every one-character and two-character center.", "Substring is contiguous; subsequence preserves order with gaps."],
        dryRun: { input: "Check 'listen' and 'silent'", steps: ["Increment counts for every character in listen.", "Decrement counts for every character in silent.", "Every count returns to zero."], result: "The words are anagrams." },
        java: `class Solution {
  public boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < a.length(); i++) {
      count[a.charAt(i) - 'a']++;
      count[b.charAt(i) - 'a']--;
    }
    for (int value : count) if (value != 0) return false;
    return true;
  }
}`,
      },
    ],
  },
  "Linked Lists": {
    summary: "A linked list trades indexed access for inexpensive pointer changes. The central habit is saving the next link before changing the current link.",
    foundations: [
      { title: "Node links", description: "Singly linked nodes have next; doubly linked nodes add prev; circular lists connect the tail back to the head." },
      { title: "Dummy node", description: "A sentinel before the head makes deletion, merging, and building a result uniform." },
      { title: "Access cost", description: "Finding a node is O(n), but changing known links is O(1)." },
    ],
    operations: ["Save next before rewiring current.next.", "Use a dummy node when the head may change.", "Use fast and slow pointers for cycles and midpoints."],
    interviewNotes: ["A fixed fast-pointer lead finds the nth node from the end.", "Merge lists by attaching the smaller current node to a dummy tail.", "In a cycle problem, two pointers meet because their speed difference closes the loop."],
    snippetTitle: "In-place linked-list reversal",
    snippetDescription: "At each step, preserve the remainder, reverse one arrow, and advance both roles.",
    java: `class Solution {
  public ListNode reverseList(ListNode head) {
    ListNode previous = null;
    ListNode current = head;
    while (current != null) {
      ListNode next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    return previous;
  }
}`,
    deepDives: [
      {
        title: "1. Linked lists — pointer safety and fast/slow patterns",
        complexity: "Traversal O(n) · Known-link changes O(1)",
        description: "Linked lists do not support direct indexing, but they make link changes inexpensive. Save next before rewiring current. A dummy node removes head special cases; fast/slow pointers find a midpoint or detect a cycle.",
        keyPoints: ["Reversal: save next, point current backward, advance previous/current.", "Fixed gap: move fast n steps first, then advance both for nth-from-end.", "Merge: use a dummy tail and attach the smaller current node."],
        dryRun: { input: "Reverse 1→2→3", steps: ["Save 2; point 1 to null.", "Save 3; point 2 to 1.", "Point 3 to 2 and return previous 3."], result: "The list becomes 3→2→1." },
        java: `class Solution {
  public ListNode reverseList(ListNode head) {
    ListNode previous = null;
    while (head != null) {
      ListNode next = head.next;
      head.next = previous;
      previous = head;
      head = next;
    }
    return previous;
  }
}`,
      },
    ],
  },
  Stack: {
    summary: "A stack keeps the newest unresolved value at the top. It naturally models nesting, expression evaluation, undo-like state, and next-greater relationships.",
    foundations: [
      { title: "LIFO", description: "Last in, first out means push, pop, and peek are normally O(1)." },
      { title: "Monotonic stack", description: "Keep values or indices in increasing or decreasing order so invalid older candidates can be removed once." },
      { title: "Java choice", description: "ArrayDeque is the usual Java stack implementation; prefer it over the legacy Stack class." },
    ],
    operations: ["Use push, pop, and peek on a Deque.", "Store indices when an answer needs a distance or span.", "Pair each value with an extra minimum or count when the stack must answer more than top."],
    interviewNotes: ["A closing bracket must match the latest unmatched opening bracket.", "For next-greater tasks, pop values resolved by the current value.", "A monotonic value is pushed once and popped once, giving O(n) total work."],
    snippetTitle: "Balanced bracket validation",
    snippetDescription: "Open brackets wait on the stack. Every closing bracket must consume the matching latest opener.",
    java: `class Solution {
  public boolean isValid(String s) {
    Map<Character, Character> opening = Map.of(')', '(', ']', '[', '}', '{');
    Deque<Character> stack = new ArrayDeque<>();
    for (char ch : s.toCharArray()) {
      if (opening.containsValue(ch)) stack.push(ch);
      else if (stack.isEmpty() || stack.pop() != opening.get(ch)) return false;
    }
    return stack.isEmpty();
  }
}`,
    deepDives: [
      {
        title: "1. Stacks — nesting, monotonic state, and spans",
        complexity: "O(n) total for monotonic scans",
        description: "A stack stores unresolved recent state. Use it for nesting, expression evaluation, and next-greater/smaller questions. A monotonic stack pops an item once when its answer becomes known.",
        keyPoints: ["Bracket matching compares each close to the latest open.", "Store indices when the answer needs a distance or width.", "Increasing/decreasing stack direction depends on which boundary you need."],
        dryRun: { input: "Temperatures [73,74,71]", steps: ["Push index 0 for 73.", "74 resolves 73, so pop 0 and record one day.", "Push index 1 then index 2; 71 remains unresolved."], result: "Each index enters and leaves once." },
        java: `class Solution {
  public boolean isValid(String s) {
    Map<Character, Character> match = Map.of(')', '(', ']', '[', '}', '{');
    Deque<Character> stack = new ArrayDeque<>();
    for (char ch : s.toCharArray()) {
      if (match.containsValue(ch)) stack.push(ch);
      else if (stack.isEmpty() || stack.pop() != match.get(ch)) return false;
    }
    return stack.isEmpty();
  }
}`,
      },
    ],
  },
  Queue: {
    summary: "A queue processes work in arrival order. It powers breadth-first search, level-by-level traversal, scheduling, and shortest paths in unweighted graphs.",
    foundations: [
      { title: "FIFO", description: "First in, first out: offer adds to the rear, poll removes the front, and peek inspects it." },
      { title: "Deque", description: "A deque supports both ends and is useful for monotonic-window problems." },
      { title: "BFS levels", description: "All nodes already in the queue at a step belong to the same breadth level." },
    ],
    operations: ["Use ArrayDeque as a Queue in Java.", "Capture queue.size() before processing one BFS level.", "Track visited state at enqueue time, not later."],
    interviewNotes: ["The first BFS visit is the shortest number of edges in an unweighted graph.", "Seed all sources first for multi-source BFS.", "Kahn's topological sort queues every zero-indegree node."],
    snippetTitle: "Level-order binary-tree traversal",
    snippetDescription: "The queue size creates one result row at a time, then enqueues the next level.",
    java: `class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) return answer;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> level = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        level.add(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
      }
      answer.add(level);
    }
    return answer;
  }
}`,
    deepDives: [
      {
        title: "1. Queues, BFS, circular buffers, and deques",
        complexity: "Queue operations O(1) · BFS O(V + E)",
        description: "A queue processes first-in-first-out work. It is the natural tool for level-by-level BFS and unweighted shortest paths. A deque supports both ends and maintains candidates for sliding-window extremes.",
        keyPoints: ["Mark visited when enqueueing, not when dequeueing.", "Process queue.size() nodes to define one BFS level.", "A circular array queue wraps indexes with (index + 1) % capacity."],
        dryRun: { input: "Binary tree root 1 with children 2,3", steps: ["Queue [1]; remove 1 and enqueue 2,3.", "The next queue size is 2, exactly one level.", "Remove 2 and 3 before moving deeper."], result: "Level order is [[1],[2,3]]." },
        java: `class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) return answer;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> level = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        level.add(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
      }
      answer.add(level);
    }
    return answer;
  }
}`,
      },
    ],
  },
  Recursion: {
    summary: "Recursion solves a problem by asking a smaller version of the same problem. A correct recursive solution has a base case, a smaller recursive call, and a precise return meaning.",
    foundations: [
      { title: "Base case", description: "A smallest input returns immediately and prevents infinite calls." },
      { title: "Recursive contract", description: "State exactly what one call returns to its caller; this makes combination logic straightforward." },
      { title: "Call stack", description: "Every active call uses stack space until it returns, so depth matters." },
    ],
    operations: ["Make every recursive branch reduce the input or move toward a base case.", "Use divide and conquer when independent halves can be combined.", "Memoize repeated state when separate branches ask the same question."],
    interviewNotes: ["Draw a small recursion tree before coding.", "Avoid shared mutable state unless the method deliberately returns it.", "A tree DFS is often simplest as a recursive postorder contract."],
    snippetTitle: "Fast power by divide and conquer",
    snippetDescription: "Halving the exponent reduces the recursion depth from n to log n.",
    java: `class Solution {
  public double myPow(double x, int n) {
    long exponent = n;
    if (exponent < 0) {
      x = 1 / x;
      exponent = -exponent;
    }
    return power(x, exponent);
  }

  private double power(double x, long n) {
    if (n == 0) return 1;
    double half = power(x, n / 2);
    return n % 2 == 0 ? half * half : half * half * x;
  }
}`,
    deepDives: [
      {
        title: "1. Recursion foundations — contract, base case, progress",
        complexity: "Call-stack space O(recursion depth)",
        description: "A recursive method promises to solve one smaller version of the same problem. The base case handles the smallest input, and every recursive call must make measurable progress toward it.",
        keyPoints: ["Write the return meaning in English before the method.", "Trust the recursive call to solve its smaller input; combine only its returned answer.", "Trace calls downward and returns upward separately."],
        dryRun: { input: "sum(3) where sum(n) = n + sum(n-1)", steps: ["sum(3) waits for 3 + sum(2).", "sum(2) waits for 2 + sum(1).", "sum(1) is the base case; answers return 1, then 3, then 6."], result: "The return path combines answers after reaching the base case." },
        java: `class Solution {
  public int sumTo(int n) {
    if (n == 1) return 1;
    return n + sumTo(n - 1);
  }
}`,
      },
      {
        title: "2. Recursion trees and divide-and-conquer",
        complexity: "Depends on branch count and shrink rate",
        description: "A recursion tree draws every method call. One branch creates a chain; two independent smaller calls create a branching tree. Divide-and-conquer splits independent work, solves each part, then combines their answers.",
        keyPoints: ["Binary search has one half-sized branch, so depth is O(log n).", "Merge sort has two half-sized branches plus combine work.", "Draw the tree to see depth, leaves, and repeated state labels."],
        dryRun: { input: "power(2,5)", steps: ["power(2,5) asks for power(2,2).", "power(2,2) asks for power(2,1).", "Return upward: 2, then 4, then 4 × 4 × 2 = 32."], result: "Halving the exponent gives logarithmic depth." },
        java: `class Solution {
  public double power(double x, long n) {
    if (n == 0) return 1;
    double half = power(x, n / 2);
    return n % 2 == 0 ? half * half : half * half * x;
  }
}`,
      },
      {
        title: "3. Recursion by input shape",
        complexity: "Often O(n) when each input part is visited once",
        description: "For arrays and strings, recurse on a smaller index range. For a linked list, recurse on next. For a tree, recurse on both children and combine what they return.",
        keyPoints: ["Array/string state is commonly index or left/right.", "Linked-list recursion preserves current while the call solves the rest.", "Tree postorder contracts compute height, balance, paths, and diameter."],
        dryRun: { input: "maxDepth(root 2 with children 1 and 3)", steps: ["depth(2) asks for depth(1) and depth(3).", "Both leaves return 1.", "Root returns 1 + max(1,1) = 2."], result: "A node’s answer is built from its child answers." },
        java: `class Solution {
  public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  }
}`,
      },
      {
        title: "4. When recursion becomes DP",
        complexity: "Memoized: one solve per unique state",
        description: "Recursion becomes dynamic programming only when different call paths ask the same state question. Keep pure recursion for independent branches; add a memo when the recursion tree repeats state labels.",
        keyPoints: ["Merge sort repeats no subarray state, so memoization does not help.", "Fibonacci repeats fib(2), fib(3), and smaller states, so memoization helps.", "The memo key contains every state parameter that changes the answer."],
        dryRun: { input: "fib(4)", steps: ["fib(4) calls fib(3) and fib(2).", "fib(3) calls fib(2) again.", "Memo reuses the first fib(2) answer."], result: "A repeated subtree is the DP signal." },
        java: `class Solution {
  Integer[] memo;

  int fib(int n) {
    memo = new Integer[n + 1];
    return solve(n);
  }

  int solve(int n) {
    if (n < 2) return n;
    if (memo[n] != null) return memo[n];
    return memo[n] = solve(n - 1) + solve(n - 2);
  }
}`,
      },
    ],
  },
  Backtracking: {
    summary: "Backtracking explores a decision tree. It builds a partial answer, tries a valid choice, explores its consequence, and restores state before the next choice.",
    foundations: [
      { title: "State", description: "The partial solution built so far, such as a path, selected values, board, or remaining target." },
      { title: "Choices", description: "At each level, enumerate only the next valid decisions." },
      { title: "Pruning", description: "Stop a branch as soon as it cannot become a valid or better answer." },
    ],
    operations: ["Use choose → explore → undo in that exact order.", "Copy a completed path before adding it to the result.", "Pass a start index for combinations and track used values for permutations."],
    interviewNotes: ["All selections signals subsets or combinations.", "All orderings signals permutations.", "A board or constraints signals place-and-prune search such as N-Queens."],
    snippetTitle: "Generate all subsets",
    snippetDescription: "At each index, the decision tree has two branches: skip the value or choose it and undo afterward.",
    java: `class Solution {
  public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> answer = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), answer);
    return answer;
  }

  private void backtrack(int index, int[] nums, List<Integer> path, List<List<Integer>> answer) {
    if (index == nums.length) {
      answer.add(new ArrayList<>(path));
      return;
    }
    backtrack(index + 1, nums, path, answer);
    path.add(nums[index]);
    backtrack(index + 1, nums, path, answer);
    path.remove(path.size() - 1);
  }
}`,
    deepDives: [
      {
        title: "1. Backtracking versus ordinary recursion",
        complexity: "Exponential worst case before pruning",
        description: "Ordinary recursion follows a fixed decomposition. Backtracking has multiple choices at one state, so it tries one, explores it, then returns to the latest choice point and tries the next.",
        keyPoints: ["Use it to enumerate all valid answers or find one valid answer under constraints.", "The explored state changes, so undo is essential.", "Prune a branch as soon as it cannot become valid."],
        dryRun: { input: "Subsets of [1,2]", steps: ["At 1, first skip, then choose 1.", "Within both branches, make the same decision for 2.", "After a choose branch finishes, remove the value before the next branch."], result: "The answers are [], [2], [1], and [1,2]." },
        java: `class Template {
  void backtrack(State state) {
    if (complete(state)) {
      save(state);
      return;
    }
    for (Choice choice : choices(state)) {
      if (!valid(choice, state)) continue;
      choose(choice, state);
      backtrack(state);
      undo(choice, state);
    }
  }
}`,
      },
      {
        title: "2. Subsets and combinations",
        complexity: "O(2ⁿ) subsets · O(C(n,k)) fixed-size combinations",
        description: "For subsets, every item has a choose or skip branch. For combinations, carry a start index so reordered copies such as [1,2] and [2,1] are not generated twice.",
        keyPoints: ["Copy a completed path before adding it to answers.", "Advance start index after choosing a value.", "Skip equal choices at one depth when duplicate values exist."],
        dryRun: { input: "Combinations of size 2 from [1,2,3]", steps: ["Choose 1, then choose 2 and 3.", "Backtrack 1; choose 2, then choose 3.", "Never restart from index 0."], result: "The answers are [1,2], [1,3], [2,3]." },
        java: `class Solution {
  void combinations(int start, int k, int[] nums, List<Integer> path, List<List<Integer>> answer) {
    if (path.size() == k) {
      answer.add(new ArrayList<>(path));
      return;
    }
    for (int i = start; i < nums.length; i++) {
      path.add(nums[i]);
      combinations(i + 1, k, nums, path, answer);
      path.remove(path.size() - 1);
    }
  }
}`,
      },
      {
        title: "3. Permutations and target-sum choices",
        complexity: "O(n!) permutations",
        description: "Permutations care about order, so use a used array rather than a start index. Combination Sum tracks a remaining target; it prunes once the target is negative and decides whether a candidate can be reused.",
        keyPoints: ["Permutation: each recursion level fills one position.", "Combination Sum: reuse keeps index i; no reuse advances to i + 1.", "Sort candidates to stop early once a value exceeds the target."],
        dryRun: { input: "Permutations of [1,2]", steps: ["Choose 1; only 2 remains, giving [1,2].", "Undo 1; choose 2; only 1 remains, giving [2,1].", "used[] stops an element being chosen twice."], result: "Order creates two different answers." },
        java: `class Solution {
  void permute(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> answer) {
    if (path.size() == nums.length) {
      answer.add(new ArrayList<>(path));
      return;
    }
    for (int i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.add(nums[i]);
      permute(nums, used, path, answer);
      path.remove(path.size() - 1);
      used[i] = false;
    }
  }
}`,
      },
      {
        title: "4. Partitioning, grids, constraints, and pruning",
        complexity: "Exponential worst case; pruning reduces explored branches",
        description: "Partitioning selects the next valid piece of a string. Grid backtracking marks a cell, explores neighbors, then restores it. Constraint placement such as N-Queens tracks columns and diagonals so invalid branches end immediately.",
        keyPoints: ["Palindrome partitioning recurses only after choosing a palindrome prefix.", "Word Search marks then restores the current grid cell.", "N-Queens places one row at each depth and rejects conflicts in O(1)."],
        dryRun: { input: "Place queens row by row", steps: ["Choose a safe column on row 0.", "On the next row, reject same-column and diagonal positions.", "If a row has no safe position, undo the earlier placement and try its next choice."], result: "Pruning avoids boards that can never become a solution." },
        java: `class Solution {
  void place(int row, int n, Set<Integer> columns, Set<Integer> diagonals, Set<Integer> antiDiagonals) {
    if (row == n) {
      saveBoard();
      return;
    }
    for (int col = 0; col < n; col++) {
      int diagonal = row - col;
      int antiDiagonal = row + col;
      if (columns.contains(col) || diagonals.contains(diagonal) || antiDiagonals.contains(antiDiagonal)) continue;
      columns.add(col);
      diagonals.add(diagonal);
      antiDiagonals.add(antiDiagonal);
      place(row + 1, n, columns, diagonals, antiDiagonals);
      columns.remove(col);
      diagonals.remove(diagonal);
      antiDiagonals.remove(antiDiagonal);
    }
  }
}`,
      },
    ],
  },
  "Dynamic Programming": {
    summary: "Dynamic programming is recursion with reuse. First write the recursive state and draw its call tree; then memoize each repeated state so it is solved once.",
    foundations: [
      { title: "State", description: "The method parameters must uniquely describe one smaller question, such as index i or cells (row, col)." },
      { title: "Choices", description: "The recursive calls represent all legal next decisions: take/skip, move right/down, match/skip, or split." },
      { title: "Memo", description: "Cache the answer using exactly the state parameters as the key. A cache hit removes an entire repeated subtree." },
    ],
    operations: ["Write the state meaning in one sentence before coding.", "Write base cases before recursive calls.", "Check memo before recursing and save the finished answer before returning."],
    interviewNotes: ["A recursion tree with repeated labels is a DP signal.", "Time is number of unique states × non-recursive work per state.", "Use an array for small integer states and a Map for strings, masks, or several changing values."],
    snippetTitle: "Universal top-down memoization template",
    snippetDescription: "This is the only DP style used in this Concepts section: recursion first, memoization second.",
    java: `class Solution {
  Integer[] memo;

  int solve(int state) {
    if (state <= 1) return baseAnswer(state);
    if (memo[state] != null) return memo[state];
    int answer = combine(solve(nextStateA(state)), solve(nextStateB(state)));
    return memo[state] = answer;
  }
}`,
    deepDives: [
      {
        title: "1. DP mindset — recursive tree first, memo second",
        complexity: "Memoized time = unique states × work per state",
        description: "Start by pretending time does not matter: write the most direct recursion. Its call tree shows every subproblem. If the same labeled state appears in multiple branches, cache its answer. Memoization changes the recursion tree into a directed acyclic graph of unique states.",
        keyPoints: ["State means exactly what the recursive method must answer.", "Base cases are the smallest valid states with known answers.", "A memo key must include every parameter that changes the answer."],
        dryRun: { input: "fib(5)", steps: ["fib(5) calls fib(4) and fib(3).", "fib(4) calls fib(3) again, so the fib(3) subtree is duplicated.", "Memo stores fib(3) after its first computation; the second call returns immediately."], result: "Naive recursion is exponential; memoized Fibonacci has only states 0 through 5." },
        java: `class Solution {
  private Integer[] memo;

  public int fib(int n) {
    memo = new Integer[n + 1];
    return dfs(n);
  }

  private int dfs(int n) {
    if (n < 2) return n;
    if (memo[n] != null) return memo[n];
    return memo[n] = dfs(n - 1) + dfs(n - 2);
  }
}`,
      },
      {
        title: "2. 1D DP — Fibonacci / linear recurrence",
        complexity: "Time O(n) · Space O(n) memo + O(n) call stack",
        description: "Use one index when the answer at position i depends only on smaller positions. The recursive question is commonly “how many ways / what best value can I get starting at or ending at i?”",
        keyPoints: ["Signals: stairs, jumps, ways to reach a position, minimum cost to reach a position.", "Choose the direction that makes the base case natural: from i to end or from i back to zero.", "A 1D memo is enough when index alone determines the remaining work."],
        dryRun: { input: "Climb 4 stairs taking 1 or 2 steps", steps: ["ways(4) branches to ways(3) and ways(2).", "ways(3) asks for ways(2) again.", "Cache ways(2), then reuse it for the second branch."], result: "ways(4) = 5 after solving states 0,1,2,3,4 once." },
        java: `class Solution {
  Integer[] memo;

  public int climbStairs(int n) {
    memo = new Integer[n + 1];
    return ways(n);
  }

  private int ways(int steps) {
    if (steps <= 1) return 1;
    if (memo[steps] != null) return memo[steps];
    return memo[steps] = ways(steps - 1) + ways(steps - 2);
  }
}`,
      },
      {
        title: "3. 1D DP — take or skip / 0-1 choice",
        complexity: "Time O(n) · Space O(n)",
        description: "At index i, compare the two meaningful choices: take the current item and jump to a compatible state, or skip it and move on. This is the recursive shape behind House Robber and many 0/1 decisions.",
        keyPoints: ["Signals: choose non-adjacent values, maximize/minimize while taking each item at most once.", "The state is usually the current index.", "If an item can be reused, do not advance index on the take branch."],
        dryRun: { input: "House Robber nums = [2,7,9]", steps: ["rob(0) compares take 2 + rob(2) against skip rob(1).", "rob(1) compares take 7 + rob(3) against skip rob(2).", "rob(2) is reached from both paths, so memoization reuses it."], result: "The best answer is 11 by taking 2 and 9." },
        java: `class Solution {
  Integer[] memo;

  public int rob(int[] nums) {
    memo = new Integer[nums.length];
    return dfs(0, nums);
  }

  private int dfs(int index, int[] nums) {
    if (index >= nums.length) return 0;
    if (memo[index] != null) return memo[index];
    int take = nums[index] + dfs(index + 2, nums);
    int skip = dfs(index + 1, nums);
    return memo[index] = Math.max(take, skip);
  }
}`,
      },
      {
        title: "4. 1D DP — unbounded choice, segmentation, and subsequences",
        complexity: "Usually states O(n) or O(n × target)",
        description: "Unbounded knapsack lets a take choice keep the same index, as in Coin Change. Prefix/segmentation DP asks whether a suffix beginning at index i is possible, as in Word Break. LIS often uses state (index, previous index) because the previous selected value changes what can be taken next.",
        keyPoints: ["Coin Change: choose a coin and remain on the same coin index, or skip to the next coin.", "Word Break: try every dictionary word starting at i, then recurse on its ending index.", "LIS: memoize both current index and previous chosen index; one index alone loses needed information."],
        dryRun: { input: "Coins [1,2], amount 3", steps: ["min(3) tries coin 1 → min(2) and coin 2 → min(1).", "min(2) tries coin 1 → min(1), so min(1) repeats.", "Cache each remaining amount before returning."], result: "The minimum is 2 coins: 1 + 2." },
        java: `class Solution {
  Integer[] memo;

  public int coinChange(int[] coins, int amount) {
    memo = new Integer[amount + 1];
    int answer = dfs(amount, coins);
    return answer == Integer.MAX_VALUE ? -1 : answer;
  }

  private int dfs(int remain, int[] coins) {
    if (remain == 0) return 0;
    if (remain < 0) return Integer.MAX_VALUE;
    if (memo[remain] != null) return memo[remain];
    int best = Integer.MAX_VALUE;
    for (int coin : coins) {
      int next = dfs(remain - coin, coins);
      if (next != Integer.MAX_VALUE) best = Math.min(best, 1 + next);
    }
    return memo[remain] = best;
  }
}`,
      },
      {
        title: "5. 2D DP — grid paths",
        complexity: "Time O(rows × cols) · Space O(rows × cols)",
        description: "Use state (row, col) when the remaining problem is a location in a grid. From each cell, recurse into only legal moves, commonly right and down. The memo is a 2D array because both coordinates matter.",
        keyPoints: ["Signals: count paths, minimum path sum, or maximum path score in a matrix.", "Out-of-bounds is a base case; reaching the destination is another.", "For obstacles, return zero paths or an impossible cost immediately."],
        dryRun: { input: "2×2 open grid; start (0,0), end (1,1)", steps: ["paths(0,0) branches right to (0,1) and down to (1,0).", "Both branches need the same destination state (1,1).", "Memo saves each coordinate pair once."], result: "There are 2 paths: right-down and down-right." },
        java: `class Solution {
  Integer[][] memo;

  public int uniquePaths(int rows, int cols) {
    memo = new Integer[rows][cols];
    return dfs(0, 0, rows, cols);
  }

  private int dfs(int row, int col, int rows, int cols) {
    if (row == rows - 1 && col == cols - 1) return 1;
    if (row >= rows || col >= cols) return 0;
    if (memo[row][col] != null) return memo[row][col];
    return memo[row][col] = dfs(row + 1, col, rows, cols) + dfs(row, col + 1, rows, cols);
  }
}`,
      },
      {
        title: "6. 2D DP — two sequences and edit decisions",
        complexity: "Time O(m × n) · Space O(m × n)",
        description: "Use state (i, j) when comparing the remaining suffixes of two strings or arrays. If values match, take the matching transition; otherwise try the legal alternatives. This family includes LCS, edit distance, interleaving strings, and distinct subsequences.",
        keyPoints: ["LCS asks for the longest common subsequence from positions i and j onward.", "Edit distance tries insert, delete, and replace when the characters differ.", "Memo[i][j] is valid because i and j fully identify the remaining suffix pair."],
        dryRun: { input: "LCS of 'abc' and 'ac'", steps: ["At a/a, match them and recurse to b/c.", "At b/c, they differ, so try skipping b or skipping c.", "The better branch keeps c and reaches one more match."], result: "The LCS length is 2: 'ac'." },
        java: `class Solution {
  Integer[][] memo;

  public int longestCommonSubsequence(String a, String b) {
    memo = new Integer[a.length()][b.length()];
    return dfs(0, 0, a, b);
  }

  private int dfs(int i, int j, String a, String b) {
    if (i == a.length() || j == b.length()) return 0;
    if (memo[i][j] != null) return memo[i][j];
    if (a.charAt(i) == b.charAt(j)) return memo[i][j] = 1 + dfs(i + 1, j + 1, a, b);
    return memo[i][j] = Math.max(dfs(i + 1, j, a, b), dfs(i, j + 1, a, b));
  }
}`,
      },
      {
        title: "7. 2D DP — intervals, palindromes, and state machines",
        complexity: "Intervals O(n²) states · Stock states O(n × states)",
        description: "Interval DP uses state (left, right) for a contiguous range: split it, remove from an end, or use matching ends. Palindrome DP asks about a substring's endpoints. State-machine DP adds a small mode such as holding/not holding stock or remaining transactions.",
        keyPoints: ["Palindrome: matching ends reduce to the inner interval.", "Interval split: try every k between left and right when the problem asks for the best way to partition a range.", "Stocks: state commonly includes day, holding flag, and transactions left."],
        dryRun: { input: "Palindrome check for 'aba'", steps: ["Ends a/a match, so recurse on inner interval 'b'.", "A one-character interval is already a palindrome.", "Return true to the outer interval and memoize (0,2)."], result: "'aba' is a palindrome after solving only its inner state." },
        java: `class Solution {
  Boolean[][] memo;

  public boolean isPalindrome(String s) {
    memo = new Boolean[s.length()][s.length()];
    return dfs(0, s.length() - 1, s);
  }

  private boolean dfs(int left, int right, String s) {
    if (left >= right) return true;
    if (memo[left][right] != null) return memo[left][right];
    return memo[left][right] = s.charAt(left) == s.charAt(right) && dfs(left + 1, right - 1, s);
  }
}`,
      },
    ],
  },
  Trees: {
    summary: "Trees model hierarchy. Before solving questions, learn what each node represents, what one recursive call returns to its parent, and which traversal order matches the required output.",
    foundations: [
      { title: "Hierarchy and terminology", description: "Root, parent, child, leaf, ancestor, descendant, and subtree describe a node's position." },
      { title: "Traversal contracts", description: "Every tree recursion becomes clearer when the call's return value is stated in one sentence." },
      { title: "Specialized trees", description: "Tries optimize prefix lookup; Fenwick and segment trees make range queries efficient after updates." },
    ],
    operations: ["Use DFS when child results must be combined and BFS when a question is level-by-level.", "For BST validation, carry a valid lower and upper bound instead of checking only direct children.", "Choose prefix sums for immutable ranges and Fenwick/segment trees when values change."],
    interviewNotes: ["Inorder traversal of a BST is sorted.", "The lowest common ancestor is the first node that receives targets from different sides.", "Tree questions usually reveal their pattern through the answer required from each subtree: height, valid flag, path sum, or node."],
    snippetTitle: "Tree recursion baseline",
    snippetDescription: "The detailed tree lessons below start with examples and dry runs, then give Java references for the operations you will use in questions.",
    java: `class Solution {
  public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  }
}`,
    deepDives: [
      {
        title: "1. Trees, terminology, types, and properties",
        complexity: "Tree traversal Time O(n) · Recursive space O(height)",
        description: "A tree is a connected graph with no cycles. The top is the root; a node below another is its child; a node with no children is a leaf. A binary tree has at most two children, an N-ary tree can have many, a BST keeps smaller values left and larger values right, and a balanced tree keeps its height close to logarithmic.",
        keyPoints: ["Depth is edges from the root to a node; height is edges on the longest downward path to a leaf.", "Diameter is the longest path between any two nodes, possibly passing through the root.", "Width counts nodes or positions on one level; degree is a node's child count.", "A full binary tree has zero or two children per node; a complete tree fills levels left to right."],
        dryRun: { input: "      5\n     / \\\n    3   8\n   / \\\n  1   4", steps: ["5 is root. 3 and 8 are children of 5; 1 and 4 are leaves.", "Node 4 has depth 2. Node 3 has height 1.", "The path 1→3→5→8 has 3 edges, so it is a candidate diameter."], result: "This is a binary tree and also a BST because every left value is smaller and every right value is larger." },
        java: `class TreeFacts {
  int height(TreeNode root) {
    if (root == null) return -1;
    return 1 + Math.max(height(root.left), height(root.right));
  }

  int diameter(TreeNode root) {
    int[] best = new int[1];
    heightForDiameter(root, best);
    return best[0];
  }

  int heightForDiameter(TreeNode node, int[] best) {
    if (node == null) return 0;
    int left = heightForDiameter(node.left, best);
    int right = heightForDiameter(node.right, best);
    best[0] = Math.max(best[0], left + right);
    return 1 + Math.max(left, right);
  }
}`,
      },
      {
        title: "2. Binary Search Tree (BST) — search, insert, delete, validate",
        complexity: "Balanced: O(log n) each · Skewed: O(n) each",
        description: "A BST orders every entire left subtree below the node and every entire right subtree above it. Search and insert follow one comparison path. Deletion has three cases: leaf, one child, or two children; for two children, replace the node with its inorder successor and delete that successor.",
        keyPoints: ["Search: go left for smaller target, right for larger target.", "Validation needs global bounds because a node can violate an ancestor even when it agrees with its parent.", "Inorder traversal reads BST values in sorted order."],
        dryRun: { input: "BST: 5 with left 3 and right 8; insert 4; delete 5", steps: ["Insert 4: 4 < 5, then 4 > 3, so attach it as 3's right child.", "Delete 5: it has two children, so choose successor 8 (the smallest value in the right subtree).", "Replace 5 with 8 and remove the original successor node."], result: "The ordering remains valid after both operations." },
        java: `class BinarySearchTree {
  TreeNode search(TreeNode root, int target) {
    while (root != null && root.val != target) {
      root = target < root.val ? root.left : root.right;
    }
    return root;
  }

  TreeNode insert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.val) root.left = insert(root.left, value);
    else if (value > root.val) root.right = insert(root.right, value);
    return root;
  }

  boolean isValid(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
  }

  boolean valid(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
}`,
      },
      {
        title: "3. Balanced trees — AVL and Red-Black Tree concepts",
        complexity: "Search / insert / delete O(log n)",
        description: "A plain BST can become a linked-list-shaped chain. Balanced trees repair that shape after updates. AVL trees keep every node's left and right heights within one; Red-Black trees use color rules to guarantee a looser but still logarithmic height bound.",
        keyPoints: ["AVL: balance factor = height(left) - height(right); rotations repair a factor outside -1, 0, 1.", "Red-Black: recoloring and rotations enforce black-height rules; Java TreeMap is a Red-Black tree.", "LL, RR, LR, and RL describe the direction of imbalance and the rotations needed."],
        dryRun: { input: "Insert 30, then 20, then 10 into a BST", steps: ["Without balancing, the tree becomes 30→20→10, a left chain.", "AVL sees node 30 with balance factor +2.", "A right rotation makes 20 the root with children 10 and 30."], result: "Height drops from 2 to 1, preserving fast operations." },
      },
      {
        title: "4. Breadth-first traversal — level order",
        complexity: "Time O(n) · Space O(width)",
        description: "Level-order traversal uses a queue. Capture queue.size() before each loop to process exactly one level, which is why this method fits views, averages, zigzag order, and minimum depth.",
        keyPoints: ["Enqueue root, then repeatedly dequeue a whole level.", "Children are queued for the next level only.", "Right Side View records the final node processed at each level."],
        dryRun: { input: "      5\n     / \\\n    3   8\n   / \\\n  1   4", steps: ["Queue [5], so first level is [5].", "Queue becomes [3,8], so second level is [3,8].", "Queue becomes [1,4], so third level is [1,4]."], result: "Level-order result is [[5], [3,8], [1,4]]." },
        java: `class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) return answer;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> level = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        level.add(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
      }
      answer.add(level);
    }
    return answer;
  }
}`,
      },
      {
        title: "5. Depth-first traversal — preorder, inorder, postorder",
        complexity: "Time O(n) · Space O(height)",
        description: "DFS chooses a route down the tree. Preorder is root-left-right and suits copying or serialization. Inorder is left-root-right and gives sorted BST order. Postorder is left-right-root and suits height, diameter, and child-before-parent calculations.",
        keyPoints: ["Preorder processes the parent before either child.", "Inorder processes a node between its children.", "Postorder processes a node only after both child answers are available."],
        dryRun: { input: "Tree: root 2, left 1, right 3", steps: ["Preorder reads root first: 2, then 1, then 3.", "Inorder reads left first: 1, then 2, then 3.", "Postorder reads children first: 1, 3, then 2."], result: "The inorder result is sorted because this example is a BST." },
        java: `class Traversals {
  void preorder(TreeNode node, List<Integer> values) {
    if (node == null) return;
    values.add(node.val);
    preorder(node.left, values);
    preorder(node.right, values);
  }

  void inorder(TreeNode node, List<Integer> values) {
    if (node == null) return;
    inorder(node.left, values);
    values.add(node.val);
    inorder(node.right, values);
  }

  void postorder(TreeNode node, List<Integer> values) {
    if (node == null) return;
    postorder(node.left, values);
    postorder(node.right, values);
    values.add(node.val);
  }
}`,
      },
      {
        title: "6. Morris traversal — inorder with O(1) extra space",
        complexity: "Time O(n) · Extra space O(1)",
        description: "Morris traversal temporarily threads a node's inorder predecessor back to the node. That lets us return from the left subtree without recursion or a stack. Every temporary link is removed before the algorithm finishes.",
        keyPoints: ["If no left child exists, visit and move right.", "Otherwise find the rightmost node in the left subtree.", "Create a temporary predecessor.right link on first visit; remove it and visit the node on second visit."],
        dryRun: { input: "Tree: root 2, left 1, right 3", steps: ["At 2, predecessor in its left subtree is 1; temporarily set 1.right = 2.", "Move to 1, visit 1, and follow its temporary right link back to 2.", "Remove the thread, visit 2, then visit 3."], result: "Inorder output is [1,2,3] without a stack." },
        java: `class Solution {
  public List<Integer> morrisInorder(TreeNode root) {
    List<Integer> answer = new ArrayList<>();
    TreeNode current = root;
    while (current != null) {
      if (current.left == null) {
        answer.add(current.val);
        current = current.right;
      } else {
        TreeNode predecessor = current.left;
        while (predecessor.right != null && predecessor.right != current) predecessor = predecessor.right;
        if (predecessor.right == null) {
          predecessor.right = current;
          current = current.left;
        } else {
          predecessor.right = null;
          answer.add(current.val);
          current = current.right;
        }
      }
    }
    return answer;
  }
}`,
      },
      {
        title: "7. Tries — prefix trees",
        complexity: "Insert / search / prefix lookup O(L)",
        description: "A Trie stores a word as a path of characters. Shared prefixes share nodes, which makes it ideal for prefix lookup. A terminal flag marks a complete word. For wildcard search, branch through all children at the wildcard; for Word Search II, combine the Trie with grid DFS.",
        keyPoints: ["Implement Trie supports insert, search, and startsWith.", "Longest common prefix is the path shared by every word until a branch or word ending.", "Design Add and Search Word uses DFS when a '.' can match any child."],
        dryRun: { input: "Insert 'cat' and 'car', then search prefix 'ca'", steps: ["Both words share nodes c then a.", "The final node branches into t and r.", "Following c→a succeeds, so startsWith('ca') is true."], result: "The Trie avoids comparing the common prefix twice." },
        java: `class Trie {
  static class Node {
    Node[] next = new Node[26];
    boolean word;
  }

  private final Node root = new Node();

  void insert(String word) {
    Node node = root;
    for (char ch : word.toCharArray()) {
      int index = ch - 'a';
      if (node.next[index] == null) node.next[index] = new Node();
      node = node.next[index];
    }
    node.word = true;
  }

  boolean search(String word) {
    Node node = walk(word);
    return node != null && node.word;
  }

  boolean startsWith(String prefix) {
    return walk(prefix) != null;
  }

  private Node walk(String text) {
    Node node = root;
    for (char ch : text.toCharArray()) {
      node = node.next[ch - 'a'];
      if (node == null) return null;
    }
    return node;
  }
}`,
      },
      {
        title: "8. Fenwick Tree (Binary Indexed Tree)",
        complexity: "Build O(n log n) · Update/query O(log n)",
        description: "A Fenwick Tree stores partial sums in a compact array. lowbit = index & -index tells how much range one tree entry represents. Updates move upward by adding lowbit; prefix queries move downward by subtracting it.",
        keyPoints: ["Use it for mutable point updates plus prefix or range sum queries.", "Range sum(left,right) = prefix(right) - prefix(left - 1).", "It is simpler and smaller than a segment tree when the operation is prefix-compatible, such as sum or count."],
        dryRun: { input: "Values [2,3,5]; query sum(1,2) using 1-based indices", steps: ["Update adds each value into its responsible tree buckets.", "prefix(2) returns 2 + 3 = 5.", "prefix(0) is 0, so range sum 1..2 is 5."], result: "Queries and updates touch only logarithmically many indices." },
        java: `class FenwickTree {
  private final int[] tree;

  FenwickTree(int n) {
    tree = new int[n + 1];
  }

  void add(int index, int delta) {
    for (; index < tree.length; index += index & -index) tree[index] += delta;
  }

  int prefixSum(int index) {
    int sum = 0;
    for (; index > 0; index -= index & -index) sum += tree[index];
    return sum;
  }

  int rangeSum(int left, int right) {
    return prefixSum(right) - prefixSum(left - 1);
  }
}`,
      },
      {
        title: "9. Segment Trees and range-sum choices",
        complexity: "Segment tree build O(n) · Query/update O(log n)",
        description: "A segment tree stores an aggregate for every interval, such as sum, min, or max. Use a prefix sum for immutable 1D ranges, a 2D prefix sum for immutable 2D rectangles, and a Fenwick or segment tree for mutable 1D/2D ranges. Segment trees also support range updates with lazy propagation.",
        keyPoints: ["Immutable Range Sum Query: prefix sums are the simplest choice.", "Mutable Range Sum Query: Fenwick Tree or Segment Tree.", "For 2D, use 2D prefix sums if immutable; use 2D Fenwick/segment structures if updates occur."],
        dryRun: { input: "Values [2,1,4,3]; query range [1,3], then set index 2 to 6", steps: ["The root stores sum 10; query walks only segments covering indices 1..3.", "The query returns 1 + 4 + 3 = 8.", "After updating index 2, update its leaf and every parent on the path."], result: "The next range sum becomes 10 without rebuilding the entire array." },
        java: `class SegmentTree {
  private final int n;
  private final int[] tree;

  SegmentTree(int[] nums) {
    n = nums.length;
    tree = new int[2 * n];
    System.arraycopy(nums, 0, tree, n, n);
    for (int i = n - 1; i > 0; i--) tree[i] = tree[i << 1] + tree[i << 1 | 1];
  }

  void update(int index, int value) {
    int position = index + n;
    tree[position] = value;
    for (position >>= 1; position > 0; position >>= 1) tree[position] = tree[position << 1] + tree[position << 1 | 1];
  }

  int sumRange(int left, int right) {
    int sum = 0;
    for (left += n, right += n; left <= right; left >>= 1, right >>= 1) {
      if ((left & 1) == 1) sum += tree[left++];
      if ((right & 1) == 0) sum += tree[right--];
    }
    return sum;
  }
}`,
      },
    ],
  },
  Graphs: {
    summary: "Graphs model connections between states. Learn the type, representation, and traversal first; then choose the algorithm whose guarantee exactly matches the question.",
    foundations: [
      { title: "Classify the graph", description: "Directedness, weights, cycles, and connectivity decide which algorithms are valid." },
      { title: "Choose the representation", description: "An adjacency list is the normal interview choice; a matrix is useful for dense graphs and O(1) edge lookup." },
      { title: "Protect the guarantee", description: "BFS minimizes edges, Dijkstra requires non-negative weights, and topological order needs a DAG." },
    ],
    operations: ["Mark visited at enqueue time in BFS or on entry in DFS.", "State what each array means: visited, color, parent, distance, indegree, or root.", "Treat grid cells as graph nodes when movement is between neighbors."],
    interviewNotes: ["Ask directed or undirected, weighted or unweighted, and cyclic or acyclic before coding.", "Start another traversal for every unvisited node when the prompt asks for separate groups.", "Use the smallest correct algorithm: plain BFS before Dijkstra, and DFS/BFS before Union-Find unless merges are repeated."],
    snippetTitle: "Graph traversal baseline",
    snippetDescription: "Read the ordered guide below before opening Graph patterns. Each lesson explains the idea, a dry run, and a Java reference.",
    java: `class GraphTraversal {
  void bfs(int start, List<List<Integer>> graph) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    visited[start] = true;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      for (int next : graph.get(node)) {
        if (!visited[next]) {
          visited[next] = true;
          queue.offer(next);
        }
      }
    }
  }
}`,
    deepDives: [
      {
        title: "1. About graphs, types, and representation",
        complexity: "Adjacency list O(V + E) space · Matrix O(V²) space",
        description: "A graph is vertices joined by edges. Directed edges have arrows; undirected edges go both ways. A cyclic graph can return to an earlier node. A weighted edge has a cost, while an unweighted edge usually represents one step.",
        keyPoints: ["Adjacency matrix stores matrix[u][v], so checking one edge is O(1).", "Adjacency list stores only actual neighbors, so traversal work is O(V + E).", "For an undirected edge u—v add both u→v and v→u; for directed add only the stated arrow."],
        dryRun: { input: "Undirected edges: (0,1), (0,2), (2,3)", steps: ["Start four empty neighbor lists.", "Add each edge in both directions.", "Read the resulting lists before choosing a traversal."], result: "0:[1,2], 1:[0], 2:[0,3], 3:[2]." },
        java: `class GraphBuilder {
  List<List<Integer>> buildUndirected(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (int[] edge : edges) {
      graph.get(edge[0]).add(edge[1]);
      graph.get(edge[1]).add(edge[0]);
    }
    return graph;
  }
}`,
      },
      {
        title: "2. Breadth-first search (BFS) — level by level",
        complexity: "Time O(V + E) · Space O(V)",
        description: "BFS uses a queue. It visits every node one edge away before nodes two edges away, so it finds minimum edge counts in an unweighted graph.",
        keyPoints: ["Put the start in the queue and mark it visited immediately.", "When adding a neighbor, set its distance to current distance + 1.", "Do not enqueue a node twice."],
        dryRun: { input: "0:[1,2], 1:[3], 2:[3], 3:[]; start 0", steps: ["Queue [0]; remove 0 and add 1, 2.", "Remove 1 and add 3.", "Remove 2; skip 3 because it is already visited."], result: "Visit order 0,1,2,3 and shortest edge distances [0,1,1,2]." },
        java: `class Solution {
  public int[] shortestEdgeDistance(int start, List<List<Integer>> graph) {
    int[] distance = new int[graph.size()];
    Arrays.fill(distance, -1);
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    distance[start] = 0;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      for (int next : graph.get(node)) if (distance[next] == -1) {
        distance[next] = distance[node] + 1;
        queue.offer(next);
      }
    }
    return distance;
  }
}`,
      },
      {
        title: "3. Depth-first search (DFS) — go deep",
        complexity: "Time O(V + E) · Space O(V)",
        description: "DFS follows one branch until it cannot continue, then returns to try another branch. Use recursive calls or your own stack for components, cycle checks, and postorder reasoning.",
        keyPoints: ["A recursive call means “fully explore this neighbor.”", "Mark before recursing so cycles cannot loop forever.", "The recursive stack can be V deep in a chain graph."],
        dryRun: { input: "0:[1,2], 1:[3], 2:[], 3:[]; start 0", steps: ["Visit 0, then go to 1.", "From 1 go to 3, then return because 3 ends.", "Return to 0 and visit 2."], result: "One valid DFS order is 0,1,3,2." },
        java: `class GraphTraversal {
  void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    for (int next : graph.get(node)) {
      if (!visited[next]) dfs(next, graph, visited);
    }
  }
}`,
      },
      {
        title: "4. Multi-source BFS",
        complexity: "Time O(V + E) · Space O(V)",
        description: "Multi-source BFS starts normal BFS from several nodes at once. Every source begins at distance zero, so a first visit comes from the closest source.",
        keyPoints: ["Seed every source before the loop.", "Use it for Rotting Oranges, 01 Matrix, Walls and Gates, and nearest-source distance.", "All nodes in one queue layer are equally far from their closest source."],
        dryRun: { input: "0—1—2—3—4; sources [0,4]", steps: ["Queue begins [0,4] with distance 0.", "Their neighbors 1 and 3 receive distance 1.", "Node 2 is reached next at distance 2."], result: "Nearest-source distances are [0,1,2,1,0]." },
        java: `class Solution {
  public int[] nearestSource(int n, List<List<Integer>> graph, int[] sources) {
    int[] distance = new int[n];
    Arrays.fill(distance, -1);
    Queue<Integer> queue = new ArrayDeque<>();
    for (int source : sources) {
      distance[source] = 0;
      queue.offer(source);
    }
    while (!queue.isEmpty()) {
      int node = queue.poll();
      for (int next : graph.get(node)) if (distance[next] == -1) {
        distance[next] = distance[node] + 1;
        queue.offer(next);
      }
    }
    return distance;
  }
}`,
      },
      {
        title: "5. Connected components and cycle detection",
        complexity: "Time O(V + E) · Space O(V)",
        description: "One traversal discovers exactly one connected component, so count fresh traversals. For an undirected cycle, a visited neighbor that is not the parent proves a cycle. For a directed cycle, reaching a node already in the current DFS path proves a back edge.",
        keyPoints: ["Counting islands is connected-components traversal on a grid.", "Undirected DFS must remember parent because the edge back to parent is expected.", "Directed DFS uses states: 0 unvisited, 1 visiting, 2 finished."],
        dryRun: { input: "Groups 0—1—2 and 3—4; cycle 0—1—2—0", steps: ["DFS from 0 marks 0,1,2: component count is 1.", "DFS from 3 marks 3,4: component count is 2.", "In the cycle, node 2 sees visited 0, which is not parent 1."], result: "There are 2 groups, and the triangle has a cycle." },
        java: `class GraphChecks {
  int components(List<List<Integer>> graph) {
    boolean[] visited = new boolean[graph.size()];
    int count = 0;
    for (int node = 0; node < graph.size(); node++) {
      if (!visited[node]) {
        count++;
        visit(node, graph, visited);
      }
    }
    return count;
  }

  boolean undirectedCycle(int node, int parent, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    for (int next : graph.get(node)) {
      if (!visited[next] && undirectedCycle(next, node, graph, visited)) return true;
      if (visited[next] && next != parent) return true;
    }
    return false;
  }

  boolean directedCycle(int node, List<List<Integer>> graph, int[] state) {
    state[node] = 1;
    for (int next : graph.get(node)) {
      if (state[next] == 1 || state[next] == 0 && directedCycle(next, graph, state)) return true;
    }
    state[node] = 2;
    return false;
  }
}`,
      },
      {
        title: "6. Topological sort — dependency ordering",
        complexity: "Time O(V + E) · Space O(V)",
        description: "A topological order puts every prerequisite before a dependent task. Kahn's algorithm repeatedly processes every node with zero remaining indegree. It succeeds only for a directed acyclic graph.",
        keyPoints: ["indegree[node] counts unfinished incoming dependencies.", "Queue all zero-indegree nodes at the start.", "If fewer than V nodes are output, a cycle blocked the remaining nodes."],
        dryRun: { input: "0→1, 0→2, 1→3, 2→3", steps: ["Indegrees are [0,1,1,2], so queue [0].", "Removing 0 makes 1 and 2 ready.", "Removing 1 and 2 makes 3 ready."], result: "A valid order is [0,1,2,3]." },
        java: `class Solution {
  public int[] topologicalOrder(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] indegree = new int[n];
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (int[] edge : edges) {
      graph.get(edge[0]).add(edge[1]);
      indegree[edge[1]]++;
    }
    Queue<Integer> queue = new ArrayDeque<>();
    for (int node = 0; node < n; node++) if (indegree[node] == 0) queue.offer(node);
    int[] order = new int[n];
    int index = 0;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      order[index++] = node;
      for (int next : graph.get(node)) if (--indegree[next] == 0) queue.offer(next);
    }
    return index == n ? order : new int[]{};
  }
}`,
      },
      {
        title: "7. Bipartite graph check",
        complexity: "Time O(V + E) · Space O(V)",
        description: "A graph is bipartite when every edge crosses between two groups. Color a start node 0, color every neighbor 1, and keep alternating. An edge joining equal colors is a contradiction.",
        keyPoints: ["Use -1 for uncolored, then 0 and 1 for the two sets.", "Run BFS/DFS from every uncolored node because the graph can be disconnected.", "Even cycles can be bipartite; odd cycles cannot."],
        dryRun: { input: "Square 0—1—2—3—0", steps: ["Color 0 with 0; color 1 and 3 with 1.", "From 1, color 2 with 0.", "Every edge joins different colors."], result: "The two groups are {0,2} and {1,3}." },
        java: `class Solution {
  public boolean isBipartite(List<List<Integer>> graph) {
    int[] color = new int[graph.size()];
    Arrays.fill(color, -1);
    for (int start = 0; start < graph.size(); start++) {
      if (color[start] != -1) continue;
      Queue<Integer> queue = new ArrayDeque<>();
      queue.offer(start);
      color[start] = 0;
      while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int next : graph.get(node)) {
          if (color[next] == -1) {
            color[next] = 1 - color[node];
            queue.offer(next);
          } else if (color[next] == color[node]) return false;
        }
      }
    }
    return true;
  }
}`,
      },
      {
        title: "8. Disjoint Set (Union-Find)",
        complexity: "Near O(1) amortized per find/union",
        description: "Union-Find maintains separate groups without traversing the whole graph again. find returns a group's representative; union merges two group representatives. Path compression and union by size make repeated checks fast.",
        keyPoints: ["Use it for repeated connectivity checks, merging groups, cycle checks, and Kruskal.", "If two endpoints already have the same root, adding that undirected edge forms a cycle.", "It is faster than a fresh traversal when edges arrive one by one."],
        dryRun: { input: "union(0,1), union(1,2), connected(0,2)", steps: ["Merge roots of 0 and 1.", "find(1) now leads to the same root as 0; merge that root with 2.", "find(0) and find(2) match."], result: "0, 1, and 2 are in one group." },
        java: `class UnionFind {
  private final int[] parent;
  private final int[] size;

  UnionFind(int n) {
    parent = new int[n];
    size = new int[n];
    for (int i = 0; i < n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
  }

  int find(int node) {
    if (parent[node] != node) parent[node] = find(parent[node]);
    return parent[node];
  }

  boolean union(int a, int b) {
    int rootA = find(a);
    int rootB = find(b);
    if (rootA == rootB) return false;
    if (size[rootA] < size[rootB]) {
      int temp = rootA;
      rootA = rootB;
      rootB = temp;
    }
    parent[rootB] = rootA;
    size[rootA] += size[rootB];
    return true;
  }
}`,
      },
      {
        title: "9. Minimum spanning tree — Kruskal's and Prim's",
        complexity: "Kruskal O(E log E) · Prim O(E log V)",
        description: "An MST connects all nodes with the smallest total edge cost and no cycles. Kruskal takes cheapest edges in sorted order and uses Union-Find to reject cycles. Prim grows one tree by taking the cheapest edge to a new node with a priority queue.",
        keyPoints: ["Use Kruskal with an edge list; use Prim with an adjacency list.", "MST is for minimum total connection cost, not shortest paths from one source.", "Both assume a connected, undirected, weighted graph."],
        dryRun: { input: "0—1 (1), 1—2 (2), 0—2 (4)", steps: ["Kruskal takes weight 1, joining 0 and 1.", "It takes weight 2, joining 2 to that group.", "It rejects the weight-4 edge because all nodes are already connected."], result: "MST cost is 3." },
        java: `class Solution {
  public int kruskal(int n, int[][] edges) {
    Arrays.sort(edges, Comparator.comparingInt(edge -> edge[2]));
    UnionFind groups = new UnionFind(n);
    int cost = 0;
    int used = 0;
    for (int[] edge : edges) {
      if (groups.union(edge[0], edge[1])) {
        cost += edge[2];
        used++;
      }
    }
    return used == n - 1 ? cost : -1;
  }

  public int prim(List<List<int[]>> graph) {
    boolean[] used = new boolean[graph.size()];
    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(edge -> edge[1]));
    heap.offer(new int[]{0, 0});
    int cost = 0;
    int count = 0;
    while (!heap.isEmpty()) {
      int[] edge = heap.poll();
      if (used[edge[0]]) continue;
      used[edge[0]] = true;
      cost += edge[1];
      count++;
      for (int[] next : graph.get(edge[0])) if (!used[next[0]]) heap.offer(next);
    }
    return count == graph.size() ? cost : -1;
  }
}`,
      },
      {
        title: "10. Shortest paths — Dijkstra, Bellman-Ford, Floyd-Warshall",
        complexity: "BFS O(V + E) · Dijkstra O((V + E) log V) · Bellman-Ford O(VE) · Floyd-Warshall O(V³)",
        description: "BFS handles unweighted graphs. Dijkstra finds one-source paths only when weights are non-negative. Bellman-Ford allows negative edges and can detect a reachable negative cycle. Floyd-Warshall computes every source-to-destination pair and is useful only when V is moderate.",
        keyPoints: ["Dijkstra finalizes the smallest tentative distance, which negative weights would break.", "Bellman-Ford relaxes every edge V - 1 times; one further improvement indicates a negative cycle.", "Floyd-Warshall tries each node k as an intermediate between i and j."],
        dryRun: { input: "0→1 (2), 0→2 (5), 1→2 (1); source 0", steps: ["Start distances [0,∞,∞].", "From 0, set 1 to 2 and 2 to 5.", "From 1, improve 2 from 5 to 3."], result: "Shortest distances from 0 are [0,2,3]." },
        java: `class Solution {
  public int[] dijkstra(int start, List<List<int[]>> graph) {
    int[] distance = new int[graph.size()];
    Arrays.fill(distance, Integer.MAX_VALUE);
    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(state -> state[1]));
    distance[start] = 0;
    heap.offer(new int[]{start, 0});
    while (!heap.isEmpty()) {
      int[] state = heap.poll();
      int node = state[0];
      if (state[1] != distance[node]) continue;
      for (int[] edge : graph.get(node)) {
        int next = edge[0];
        int candidate = distance[node] + edge[1];
        if (candidate < distance[next]) {
          distance[next] = candidate;
          heap.offer(new int[]{next, candidate});
        }
      }
    }
    return distance;
  }
}`,
      },
      {
        title: "11. Network flow — Max Flow / Min Cut (advanced)",
        complexity: "Edmonds-Karp O(VE²)",
        description: "A flow network sends as much as possible from source to sink while respecting capacities. The residual graph holds unused forward capacity and reverse capacity that can undo a previous choice. Max-Flow Min-Cut says maximum flow equals the smallest capacity that can block the source from the sink.",
        keyPoints: ["Find an augmenting source-to-sink path in the residual graph.", "Send the path's bottleneck amount, subtract it forward, and add it backward.", "Edmonds-Karp uses BFS; Dinic is the common faster advanced implementation."],
        dryRun: { input: "0→1 cap 3, 1→2 cap 2, 0→2 cap 1; source 0, sink 2", steps: ["Send 1 through direct path 0→2.", "Send 2 through 0→1→2; its bottleneck is 2.", "No residual source-to-sink path remains."], result: "Maximum flow is 3." },
        java: `class Solution {
  public int maxFlow(int[][] capacity, int source, int sink) {
    int n = capacity.length;
    int[][] residual = new int[n][n];
    for (int i = 0; i < n; i++) residual[i] = capacity[i].clone();
    int[] parent = new int[n];
    int flow = 0;
    while (path(residual, source, sink, parent)) {
      int added = Integer.MAX_VALUE;
      for (int node = sink; node != source; node = parent[node]) {
        added = Math.min(added, residual[parent[node]][node]);
      }
      for (int node = sink; node != source; node = parent[node]) {
        residual[parent[node]][node] -= added;
        residual[node][parent[node]] += added;
      }
      flow += added;
    }
    return flow;
  }

  private boolean path(int[][] residual, int source, int sink, int[] parent) {
    Arrays.fill(parent, -1);
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(source);
    parent[source] = source;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      for (int next = 0; next < residual.length; next++) {
        if (parent[next] == -1 && residual[node][next] > 0) {
          parent[next] = node;
          if (next == sink) return true;
          queue.offer(next);
        }
      }
    }
    return false;
  }
}`,
      },
    ],
  },
};
