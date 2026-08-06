import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const E = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });
const P = (
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

export const problemContentA: Record<string, ProblemContent> = {
  "add-binary": P(
    "Given two non-empty strings containing only binary digits, return their sum as another binary string. Neither input has leading zeroes unless the value itself is zero.",
    [
      E('a = "11", b = "1"', '"100"', "Binary 3 plus binary 1 is binary 4."),
      E('a = "1010", b = "1011"', '"10101"', "Binary 10 plus binary 11 is binary 21."),
      E('a = "0", b = "0"', '"0"', "Adding two zero values leaves zero."),
    ],
    ["1 <= a.length, b.length <= 10000", "a and b contain only '0' and '1'.", "Inputs have no unnecessary leading zeroes."],
    "Convert both strings to arbitrary-precision integers, add them, and convert the result back to base two.",
    "It relies on a library conversion instead of demonstrating binary addition and creates large intermediate numbers.",
    "Time O(n), space O(n), where n is the longer string.",
    `class Solution {
  public String addBinary(String a, String b) {
    java.math.BigInteger x = new java.math.BigInteger(a, 2);
    java.math.BigInteger y = new java.math.BigInteger(b, 2);
    return x.add(y).toString(2);
  }
}`,
    "Walk from right to left as in column addition. The current output bit is sum modulo two, and sum divided by two becomes the carry for the next column.",
    "Time O(n), space O(n) for the returned string.",
    ["Place pointers at the final character of both strings.", "Add available digits and the incoming carry.", "Append the low bit, keep the high bit as carry, then reverse the built answer."],
    `class Solution {
  public String addBinary(String a, String b) {
    StringBuilder answer = new StringBuilder();
    int i = a.length() - 1;
    int j = b.length() - 1;
    int carry = 0;
    while (i >= 0 || j >= 0 || carry != 0) {
      int sum = carry;
      if (i >= 0) sum += a.charAt(i--) - '0';
      if (j >= 0) sum += b.charAt(j--) - '0';
      answer.append(sum & 1);
      carry = sum >> 1;
    }
    return answer.reverse().toString();
  }
}`,
  ),
  "number-of-1-bits": P(
    "Return the number of set bits in the 32-bit binary representation of the given integer.",
    [
      E("n = 11", "3", "The binary representation 00000000000000000000000000001011 contains three ones."),
      E("n = 128", "1", "Only the eighth bit is set."),
      E("n = 2147483645", "30", "Its 32-bit representation contains thirty set bits."),
    ],
    ["n is a 32-bit integer.", "Treat the bit pattern as 32 bits even when the Java int is negative."],
    "Inspect each of the 32 positions with an unsigned shift and add its lowest bit to the answer.",
    "It always performs 32 inspections even when the number contains very few set bits.",
    "Time O(32), space O(1).",
    `class Solution {
  public int hammingWeight(int n) {
    int count = 0;
    for (int bit = 0; bit < 32; bit++) count += (n >>> bit) & 1;
    return count;
  }
}`,
    "The operation n & (n - 1) clears the lowest set bit. Repeat it until no set bit remains, counting one removal per iteration.",
    "Time O(k), space O(1), where k is the number of set bits.",
    ["Start the count at zero.", "Clear the lowest set bit with n &= n - 1.", "Increment once per cleared bit and stop at zero."],
    `class Solution {
  public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
      n &= n - 1;
      count++;
    }
    return count;
  }
}`,
  ),
  "counting-bits": P(
    "For every integer from 0 through n, return how many one bits appear in its binary representation.",
    [
      E("n = 2", "[0, 1, 1]", "Zero has no set bits; one and two each have one."),
      E("n = 5", "[0, 1, 1, 2, 1, 2]", "The values are evaluated for 0, 1, 2, 3, 4, and 5."),
    ],
    ["0 <= n <= 100000", "The result must contain n + 1 entries."],
    "For each value, count its set bits independently by repeatedly clearing its lowest set bit.",
    "Nearby values repeat the same smaller subproblems, so the total work includes a logarithmic factor.",
    "Time O(n log n), space O(n) for the answer.",
    `class Solution {
  public int[] countBits(int n) {
    int[] answer = new int[n + 1];
    for (int value = 1; value <= n; value++) {
      int current = value;
      while (current != 0) {
        current &= current - 1;
        answer[value]++;
      }
    }
    return answer;
  }
}`,
    "Removing the lowest binary digit from i gives i >> 1, whose count is already known. Add the final digit i & 1 to that stored count.",
    "Time O(n), space O(n) for the answer.",
    ["Create an array for values 0 through n.", "Process values in increasing order so i >> 1 is ready.", "Set answer[i] to answer[i >> 1] plus i's lowest bit."],
    `class Solution {
  public int[] countBits(int n) {
    int[] answer = new int[n + 1];
    for (int i = 1; i <= n; i++) answer[i] = answer[i >> 1] + (i & 1);
    return answer;
  }
}`,
  ),
  "reverse-bits": P(
    "Reverse all 32 bits of the supplied integer and return the integer represented by the reversed bit pattern.",
    [
      E("n = 43261596", "964176192", "00000010100101000001111010011100 becomes 00111001011110000010100101000000."),
      E("n = 4294967293 as an unsigned value", "3221225471 as an unsigned value", "The reversal preserves all 32 positions, including leading zeroes."),
    ],
    ["The input is represented by exactly 32 bits.", "Java uses a signed int, so unsigned right shift must be used."],
    "Read every source position and place that bit into its mirrored destination position.",
    "It performs separate shift calculations for every position and is more cumbersome than building the result as a stream.",
    "Time O(32), space O(1).",
    `class Solution {
  public int reverseBits(int n) {
    int answer = 0;
    for (int i = 0; i < 32; i++) {
      int bit = (n >>> i) & 1;
      answer |= bit << (31 - i);
    }
    return answer;
  }
}`,
    "Build the answer from left to right. Before consuming each low input bit, shift the existing answer left and attach that bit; use unsigned shift on the input.",
    "Time O(32), space O(1).",
    ["Initialize the result to zero.", "Shift the result left and append n's low bit.", "Unsigned-shift n right and repeat exactly 32 times."],
    `class Solution {
  public int reverseBits(int n) {
    int answer = 0;
    for (int i = 0; i < 32; i++) {
      answer = (answer << 1) | (n & 1);
      n >>>= 1;
    }
    return answer;
  }
}`,
  ),
  "power-of-two": P(
    "Return true exactly when the integer n is a positive power of two.",
    [
      E("n = 1", "true", "One equals two to the power zero."),
      E("n = 16", "true", "Sixteen equals two to the power four."),
      E("n = 3", "false", "No integer exponent of two produces three."),
    ],
    ["-2147483648 <= n <= 2147483647", "A power of two must be positive."],
    "For a positive value, repeatedly divide by two while it is even and check whether the final value is one.",
    "Division and a loop are unnecessary because a power of two has a recognizable bit pattern.",
    "Time O(log n), space O(1).",
    `class Solution {
  public boolean isPowerOfTwo(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
  }
}`,
    "A positive power of two contains one set bit. Subtracting one turns that bit off and all lower bits on, so n & (n - 1) becomes zero only for a single-set-bit value.",
    "Time O(1), space O(1).",
    ["Reject zero and negative values.", "Clear the lowest set bit with n & (n - 1).", "Return true when nothing remains."],
    `class Solution {
  public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }
}`,
  ),
  "single-number": P(
    "Every value in the array occurs exactly twice except one value that occurs once. Return that unique value.",
    [
      E("nums = [2, 2, 1]", "1", "The two copies of two pair off."),
      E("nums = [4, 1, 2, 1, 2]", "4", "Four is the only unpaired value."),
      E("nums = [1]", "1", "The sole value is unique."),
    ],
    ["1 <= nums.length <= 30000", "-30000 <= nums[i] <= 30000", "Exactly one value occurs once; all others occur twice."],
    "Count every value in a hash map, then return the key whose count is one.",
    "The frequency map consumes linear extra memory even though pair cancellation contains all needed information.",
    "Time O(n), space O(n).",
    `class Solution {
  public int singleNumber(int[] nums) {
    java.util.Map<Integer, Integer> counts = new java.util.HashMap<>();
    for (int value : nums) counts.put(value, counts.getOrDefault(value, 0) + 1);
    for (int value : nums) if (counts.get(value) == 1) return value;
    throw new IllegalStateException();
  }
}`,
    "XOR is associative, and x XOR x is zero. XORing the whole array cancels every duplicate pair and leaves the unique value.",
    "Time O(n), space O(1).",
    ["Set an accumulator to zero.", "XOR every array value into it.", "Return the accumulator after all pairs cancel."],
    `class Solution {
  public int singleNumber(int[] nums) {
    int answer = 0;
    for (int value : nums) answer ^= value;
    return answer;
  }
}`,
  ),
  "missing-number": P(
    "An array of length n contains distinct values selected from 0 through n, with exactly one value absent. Return the absent value.",
    [
      E("nums = [3, 0, 1]", "2", "Two is the only value from zero through three that is absent."),
      E("nums = [0, 1]", "2", "The missing value can be n itself."),
      E("nums = [9,6,4,2,3,5,7,0,1]", "8", "All values except eight appear."),
    ],
    ["1 <= nums.length <= 10000", "0 <= nums[i] <= nums.length", "All array values are distinct."],
    "Sort the array and return the first index whose value is different from the index; if none differs, n is missing.",
    "Sorting changes the input and costs O(n log n), although the values and indices can cancel directly.",
    "Time O(n log n), space O(log n) for the sort.",
    `class Solution {
  public int missingNumber(int[] nums) {
    java.util.Arrays.sort(nums);
    for (int i = 0; i < nums.length; i++) if (nums[i] != i) return i;
    return nums.length;
  }
}`,
    "XOR all legal values 0 through n with all present values. Each present value cancels its matching index, leaving only the missing one.",
    "Time O(n), space O(1).",
    ["Initialize the accumulator with n.", "For each index, XOR both the index and its stored value.", "Return the one value that has no partner."],
    `class Solution {
  public int missingNumber(int[] nums) {
    int answer = nums.length;
    for (int i = 0; i < nums.length; i++) answer ^= i ^ nums[i];
    return answer;
  }
}`,
  ),
  "find-the-difference": P(
    "String t is made by shuffling string s and adding one lowercase letter. Return the added letter.",
    [
      E('s = "abcd", t = "abcde"', "'e'", "The first four letters match after reordering, leaving e."),
      E('s = "", t = "y"', "'y'", "The only character is the added character."),
      E('s = "a", t = "aa"', "'a'", "One of the two a characters is extra."),
    ],
    ["0 <= s.length <= 1000", "t.length = s.length + 1", "s and t contain lowercase English letters."],
    "Count letters in s, subtract letters in t, and find the position whose balance is negative.",
    "A 26-entry frequency table is small but unnecessary because equal characters can cancel without remembering counts.",
    "Time O(n), space O(1) because the alphabet is fixed.",
    `class Solution {
  public char findTheDifference(String s, String t) {
    int[] counts = new int[26];
    for (char c : s.toCharArray()) counts[c - 'a']++;
    for (char c : t.toCharArray()) counts[c - 'a']--;
    for (int i = 0; i < 26; i++) if (counts[i] < 0) return (char) ('a' + i);
    throw new IllegalStateException();
  }
}`,
    "XOR every character from both strings. Characters present in both cancel regardless of order, so the unmatched added character remains.",
    "Time O(n), space O(1).",
    ["Start a character accumulator at zero.", "XOR all characters of s and t into it.", "Return the unmatched character left in the accumulator."],
    `class Solution {
  public char findTheDifference(String s, String t) {
    char answer = 0;
    for (char c : s.toCharArray()) answer ^= c;
    for (char c : t.toCharArray()) answer ^= c;
    return answer;
  }
}`,
  ),
  "single-number-ii": P(
    "Every array value occurs exactly three times except one value that occurs once. Return the value that occurs once.",
    [
      E("nums = [2, 2, 3, 2]", "3", "The three copies of two are discarded."),
      E("nums = [0,1,0,1,0,1,99]", "99", "Zero and one each occur three times."),
      E("nums = [-2,-2,1,1,4,1,4,4,-4,-2]", "-4", "Negative values are handled through all 32 bits."),
    ],
    ["1 <= nums.length <= 30000", "-2147483648 <= nums[i] <= 2147483647", "One value appears once and every other value appears three times."],
    "Store every frequency in a hash map and return the entry with count one.",
    "The map uses linear memory; the fixed-width integer representation lets us count each bit with constant extra space.",
    "Time O(n), space O(n).",
    `class Solution {
  public int singleNumber(int[] nums) {
    java.util.Map<Integer, Integer> counts = new java.util.HashMap<>();
    for (int value : nums) counts.put(value, counts.getOrDefault(value, 0) + 1);
    for (int value : nums) if (counts.get(value) == 1) return value;
    throw new IllegalStateException();
  }
}`,
    "At every one of the 32 bit positions, counts contributed by triplicated values are multiples of three. The count remainder identifies that bit of the unique value, including its sign bit.",
    "Time O(32n), space O(1).",
    ["Visit each of the 32 bit positions.", "Count input values whose bit at that position is set.", "Set the answer bit when the count is not divisible by three."],
    `class Solution {
  public int singleNumber(int[] nums) {
    int answer = 0;
    for (int bit = 0; bit < 32; bit++) {
      int count = 0;
      for (int value : nums) count += (value >>> bit) & 1;
      if (count % 3 != 0) answer |= 1 << bit;
    }
    return answer;
  }
}`,
  ),
  "bitwise-and-of-numbers-range": P(
    "Return the bitwise AND of every integer in the inclusive range from left to right.",
    [
      E("left = 5, right = 7", "4", "5 AND 6 AND 7 keeps only the common high bit."),
      E("left = 0, right = 0", "0", "The range contains one value."),
      E("left = 1, right = 2147483647", "0", "The wide range changes every bit position."),
    ],
    ["0 <= left <= right <= 2147483647"],
    "Start with left and AND every following value through right, stopping early if the result becomes zero.",
    "The range can contain billions of numbers, so visiting each value is infeasible and incrementing near the integer limit needs care.",
    "Time O(right - left), space O(1).",
    `class Solution {
  public int rangeBitwiseAnd(int left, int right) {
    int answer = left;
    for (long value = (long) left + 1; value <= right && answer != 0; value++) answer &= (int) value;
    return answer;
  }
}`,
    "Only the common binary prefix of left and right survives. Right-shift both until they are equal, count those shifts, and restore the common prefix to its original position.",
    "Time O(log right), space O(1).",
    ["Shift left and right together while they differ.", "Count how many low positions were removed.", "Shift their common prefix back left by that count."],
    `class Solution {
  public int rangeBitwiseAnd(int left, int right) {
    int shifts = 0;
    while (left != right) {
      left >>= 1;
      right >>= 1;
      shifts++;
    }
    return left << shifts;
  }
}`,
  ),
  "sum-of-two-integers": P(
    "Return the sum of two 32-bit integers without using Java's addition or subtraction operators in the calculation.",
    [
      E("a = 1, b = 2", "3", "The low bits combine without a carry."),
      E("a = 2, b = 3", "5", "XOR produces the partial sum and AND produces the carried bit."),
      E("a = -2, b = 3", "1", "Two's-complement arithmetic handles negative values."),
    ],
    ["-1000 <= a, b <= 1000", "The returned result fits in a signed 32-bit integer.", "Do not use + or - to calculate the sum."],
    "Process all 32 bit positions with a full-adder rule, storing each result bit and carrying majority-one combinations into the next position.",
    "The manual 32-step full adder is verbose and obscures that XOR and shifted AND already represent the same two parts.",
    "Time O(32), space O(1).",
    `class Solution {
  public int getSum(int a, int b) {
    int answer = 0;
    int carry = 0;
    for (int bit = 0; bit < 32; bit++) {
      int x = (a >>> bit) & 1;
      int y = (b >>> bit) & 1;
      int value = x ^ y ^ carry;
      answer |= value << bit;
      carry = (x & y) | (x & carry) | (y & carry);
    }
    return answer;
  }
}`,
    "XOR produces a sum with carries omitted. AND identifies positions that generate a carry; shifting it left aligns those carries with the next column. Repeat until no carry remains.",
    "Time O(32), space O(1).",
    ["Compute the carry as (a & b) shifted left.", "Replace a with the carry-free sum a XOR b.", "Use the carry as b and repeat until it is zero."],
    `class Solution {
  public int getSum(int a, int b) {
    while (b != 0) {
      int carry = (a & b) << 1;
      a ^= b;
      b = carry;
    }
    return a;
  }
}`,
  ),
  "divide-two-integers": P(
    "Divide dividend by divisor without multiplication, division, or remainder operators. Truncate toward zero and clamp the one overflowing result to the 32-bit signed maximum.",
    [
      E("dividend = 10, divisor = 3", "3", "Three fits three times and the remainder is discarded."),
      E("dividend = 7, divisor = -3", "-2", "The exact quotient is truncated toward zero."),
      E("dividend = -2147483648, divisor = -1", "2147483647", "The mathematical result exceeds the signed 32-bit maximum and is clamped."),
    ],
    ["-2147483648 <= dividend, divisor <= 2147483647", "divisor is not zero.", "Multiplication, division, and remainder operators are forbidden."],
    "Convert both operands to negative long magnitudes and repeatedly subtract the divisor magnitude until the remainder is too small.",
    "One subtraction per quotient unit can take billions of iterations.",
    "Time O(|quotient|), space O(1).",
    `class Solution {
  public int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
    long a = Math.abs((long) dividend);
    long b = Math.abs((long) divisor);
    int quotient = 0;
    while (a >= b) {
      a -= b;
      quotient++;
    }
    return (dividend < 0) ^ (divisor < 0) ? -quotient : quotient;
  }
}`,
    "Subtract the largest doubled divisor that still fits in the remaining dividend. Each chosen double contributes the matching power of two to the quotient, reducing the remainder geometrically.",
    "Time O(log |dividend|), space O(1).",
    ["Use positive long magnitudes and record whether the signs differ.", "Double a divisor chunk and its quotient contribution while the chunk fits.", "Subtract the chunk, add its contribution, and restore the required sign."],
    `class Solution {
  public int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
    long remaining = Math.abs((long) dividend);
    long unit = Math.abs((long) divisor);
    long quotient = 0;
    while (remaining >= unit) {
      long chunk = unit;
      long value = 1;
      while ((chunk << 1) <= remaining) {
        chunk <<= 1;
        value <<= 1;
      }
      remaining -= chunk;
      quotient += value;
    }
    if ((dividend < 0) ^ (divisor < 0)) quotient = -quotient;
    return (int) quotient;
  }
}`,
  ),
  "palindrome-number": P(
    "Return true when an integer reads identically from left to right and right to left in ordinary decimal notation.",
    [
      E("x = 121", "true", "The decimal text is unchanged when reversed."),
      E("x = -121", "false", "The minus sign would appear at the opposite end."),
      E("x = 10", "false", "The reversed digits form 01, not 10."),
    ],
    ["-2147483648 <= x <= 2147483647"],
    "Convert the number to text and compare characters from opposite ends.",
    "The conversion allocates a string even though the digits can be compared numerically.",
    "Time O(d), space O(d), where d is the digit count.",
    `class Solution {
  public boolean isPalindrome(int x) {
    String value = Integer.toString(x);
    int left = 0;
    int right = value.length() - 1;
    while (left < right) if (value.charAt(left++) != value.charAt(right--)) return false;
    return true;
  }
}`,
    "Negative numbers and positive numbers ending in zero cannot qualify, except zero itself. Reverse only the lower half of the digits; when it reaches the upper half, compare the halves and ignore the middle digit for odd lengths.",
    "Time O(d), space O(1).",
    ["Reject negative values and nonzero values ending in zero.", "Move digits from x into reversedHalf until reversedHalf is at least x.", "Compare equal halves, allowing reversedHalf divided by ten for an odd middle digit."],
    `class Solution {
  public boolean isPalindrome(int x) {
    if (x < 0 || (x != 0 && x % 10 == 0)) return false;
    int reversedHalf = 0;
    while (x > reversedHalf) {
      reversedHalf = reversedHalf * 10 + x % 10;
      x /= 10;
    }
    return x == reversedHalf || x == reversedHalf / 10;
  }
}`,
  ),
  "plus-one": P(
    "A non-empty array stores a nonnegative integer with one decimal digit per position, most significant first. Add one and return the resulting digit array.",
    [
      E("digits = [1,2,3]", "[1,2,4]", "The represented value 123 becomes 124."),
      E("digits = [4,3,2,1]", "[4,3,2,2]", "Only the final digit changes."),
      E("digits = [9,9]", "[1,0,0]", "Both nines carry, creating a new leading digit."),
    ],
    ["1 <= digits.length <= 100", "0 <= digits[i] <= 9", "The number has no leading zeroes."],
    "Build a decimal string, parse it as an arbitrary-precision integer, add one, and convert its decimal digits back to an array.",
    "It creates several large objects and delegates the simple carry operation to a big-number library.",
    "Time O(n), space O(n).",
    `class Solution {
  public int[] plusOne(int[] digits) {
    StringBuilder text = new StringBuilder();
    for (int digit : digits) text.append(digit);
    String value = new java.math.BigInteger(text.toString()).add(java.math.BigInteger.ONE).toString();
    int[] answer = new int[value.length()];
    for (int i = 0; i < value.length(); i++) answer[i] = value.charAt(i) - '0';
    return answer;
  }
}`,
    "Addition affects the suffix only. Scan from the last digit: a digit below nine can be incremented and returned immediately; a nine becomes zero and passes the carry left. If all digits were nine, create a longer array beginning with one.",
    "Time O(n) in the all-nine case and O(1) best case; space O(1) excluding a possible output expansion.",
    ["Scan the digits from right to left.", "Increment and return at the first digit below nine; otherwise set each nine to zero.", "If the carry leaves the array, return a new array with one at index zero."],
    `class Solution {
  public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
      if (digits[i] < 9) {
        digits[i]++;
        return digits;
      }
      digits[i] = 0;
    }
    int[] answer = new int[digits.length + 1];
    answer[0] = 1;
    return answer;
  }
}`,
  ),
  "factorial-trailing-zeroes": P(
    "Return the number of zero digits at the end of n factorial.",
    [
      E("n = 3", "0", "3! is 6 and has no trailing zero."),
      E("n = 5", "1", "5! is 120 and ends in one zero."),
      E("n = 30", "7", "Factors 5, 10, 15, 20, and 30 contribute five fives, while 25 contributes two more."),
    ],
    ["0 <= n <= 10000"],
    "Construct n factorial with BigInteger, convert it to decimal text, and count zeroes from the end.",
    "The factorial contains thousands of digits even though only its factors of ten matter, making this approach needlessly expensive.",
    "Time and space grow with the number of digits in n!, far beyond O(n).",
    `class Solution {
  public int trailingZeroes(int n) {
    java.math.BigInteger value = java.math.BigInteger.ONE;
    for (int i = 2; i <= n; i++) value = value.multiply(java.math.BigInteger.valueOf(i));
    String text = value.toString();
    int count = 0;
    for (int i = text.length() - 1; i >= 0 && text.charAt(i) == '0'; i--) count++;
    return count;
  }
}`,
    "Each trailing zero needs a factor pair 2 times 5. Factorials contain more twos than fives, so count multiples of 5, then extra factors from multiples of 25, 125, and so on.",
    "Time O(log base 5 of n), space O(1).",
    ["Divide n by five to count numbers supplying at least one factor five.", "Repeat division to count additional powers of five.", "Add every quotient until it becomes zero."],
    `class Solution {
  public int trailingZeroes(int n) {
    int count = 0;
    while (n > 0) {
      n /= 5;
      count += n;
    }
    return count;
  }
}`,
  ),
  "happy-number": P(
    "Repeatedly replace a positive integer with the sum of the squares of its decimal digits. Return true if the sequence reaches one and false if it enters a cycle that never reaches one.",
    [
      E("n = 19", "true", "19 becomes 82, 68, 100, and then 1."),
      E("n = 2", "false", "The generated sequence eventually repeats without reaching one."),
      E("n = 1", "true", "The starting value already satisfies the goal."),
    ],
    ["1 <= n <= 2147483647"],
    "Store every generated value in a hash set. Stop with success at one or failure when a value is seen a second time.",
    "The set grows with the visited sequence even though cycle detection needs only two moving values.",
    "Time O(k log n), space O(k), where k is the number of generated values before termination.",
    `class Solution {
  private int next(int n) {
    int sum = 0;
    while (n > 0) {
      int digit = n % 10;
      sum += digit * digit;
      n /= 10;
    }
    return sum;
  }
  public boolean isHappy(int n) {
    java.util.Set<Integer> seen = new java.util.HashSet<>();
    while (n != 1 && seen.add(n)) n = next(n);
    return n == 1;
  }
}`,
    "View each generated number as the next node in a linked sequence. Move a slow value one transformation and a fast value two; they either meet at one or meet inside a non-one cycle.",
    "Time O(k log n), space O(1).",
    ["Define the digit-square transformation.", "Advance slow once and fast twice until fast reaches one or the two values meet.", "Return whether the meeting destination is one."],
    `class Solution {
  private int next(int n) {
    int sum = 0;
    while (n > 0) {
      int digit = n % 10;
      sum += digit * digit;
      n /= 10;
    }
    return sum;
  }
  public boolean isHappy(int n) {
    int slow = n;
    int fast = next(n);
    while (fast != 1 && slow != fast) {
      slow = next(slow);
      fast = next(next(fast));
    }
    return fast == 1;
  }
}`,
  ),
  "sqrt-x": P(
    "Return the integer square root of a nonnegative integer x: the greatest integer r for which r squared is at most x.",
    [
      E("x = 4", "2", "Two squared equals four."),
      E("x = 8", "2", "The exact root lies between two and three, so it truncates to two."),
      E("x = 0", "0", "Zero is its own square root."),
    ],
    ["0 <= x <= 2147483647", "Do not rely on a floating-point answer."],
    "Try candidates from zero upward and return the last one whose square does not exceed x.",
    "A linear scan can perform more than forty-six thousand checks for a 32-bit input and does not exploit monotonicity.",
    "Time O(sqrt x), space O(1).",
    `class Solution {
  public int mySqrt(int x) {
    long candidate = 0;
    while ((candidate + 1) * (candidate + 1) <= x) candidate++;
    return (int) candidate;
  }
}`,
    "The predicate candidate squared <= x changes from true to false once. Binary-search the final true candidate, using long multiplication to avoid overflow.",
    "Time O(log x), space O(1).",
    ["Search between zero and x, retaining the best feasible midpoint.", "Move right when mid squared is at most x; otherwise move left.", "Return the greatest saved feasible midpoint."],
    `class Solution {
  public int mySqrt(int x) {
    long left = 0;
    long right = x;
    long answer = 0;
    while (left <= right) {
      long mid = left + (right - left) / 2;
      if (mid * mid <= x) {
        answer = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return (int) answer;
  }
}`,
  ),
  "count-primes": P(
    "Return how many prime numbers are strictly smaller than n.",
    [
      E("n = 10", "4", "The primes below ten are 2, 3, 5, and 7."),
      E("n = 0", "0", "There are no nonnegative values below zero."),
      E("n = 2", "0", "Two itself is excluded by the strict bound."),
    ],
    ["0 <= n <= 5000000"],
    "Test each candidate independently by trying divisors through its square root.",
    "The same composite relationships are rediscovered for many candidates, producing much more work than marking multiples once.",
    "Time O(n sqrt n), space O(1).",
    `class Solution {
  private boolean prime(int value) {
    if (value < 2) return false;
    for (int divisor = 2; (long) divisor * divisor <= value; divisor++) {
      if (value % divisor == 0) return false;
    }
    return true;
  }
  public int countPrimes(int n) {
    int count = 0;
    for (int value = 2; value < n; value++) if (prime(value)) count++;
    return count;
  }
}`,
    "The Sieve of Eratosthenes starts with every candidate potentially prime. For each still-prime p, mark multiples from p squared because smaller multiples were already handled.",
    "Time O(n log log n), space O(n).",
    ["Create a composite marker array of size n.", "For every unmarked p through sqrt(n), mark p squared, p squared plus p, and so on.", "Count unmarked values from two through n - 1."],
    `class Solution {
  public int countPrimes(int n) {
    boolean[] composite = new boolean[n];
    for (int p = 2; (long) p * p < n; p++) {
      if (!composite[p]) {
        for (int multiple = p * p; multiple < n; multiple += p) composite[multiple] = true;
      }
    }
    int count = 0;
    for (int value = 2; value < n; value++) if (!composite[value]) count++;
    return count;
  }
}`,
  ),
  "excel-sheet-column-number": P(
    "Convert an uppercase spreadsheet column title to its one-based column number, where A is 1, Z is 26, AA is 27, and so on.",
    [
      E('columnTitle = "A"', "1", "A is the first column."),
      E('columnTitle = "AB"', "28", "AB represents 1 times 26 plus 2."),
      E('columnTitle = "ZY"', "701", "ZY represents 26 times 26 plus 25."),
    ],
    ["1 <= columnTitle.length <= 7", "columnTitle contains only uppercase English letters.", "The result fits in a signed 32-bit integer."],
    "Generate spreadsheet titles in order from one upward until the generated title equals the input.",
    "Runtime grows with the answer value, so a short title such as FXSHRXW would require over two billion generated columns.",
    "Time O(answer × title length), space O(title length).",
    `class Solution {
  private String title(int number) {
    StringBuilder value = new StringBuilder();
    while (number > 0) {
      number--;
      value.append((char) ('A' + number % 26));
      number /= 26;
    }
    return value.reverse().toString();
  }
  public int titleToNumber(String columnTitle) {
    for (int number = 1; ; number++) if (title(number).equals(columnTitle)) return number;
  }
}`,
    "Treat the title as a base-26 number whose digits are one through twenty-six. Multiply the accumulated prefix by 26 and add the current letter's value.",
    "Time O(n), space O(1).",
    ["Start the result at zero.", "For each character, multiply the prefix by 26.", "Add character minus 'A' plus one."],
    `class Solution {
  public int titleToNumber(String columnTitle) {
    int answer = 0;
    for (char c : columnTitle.toCharArray()) answer = answer * 26 + c - 'A' + 1;
    return answer;
  }
}`,
  ),
  "roman-to-integer": P(
    "Convert a valid Roman numeral using symbols I, V, X, L, C, D, and M into its integer value.",
    [
      E('s = "III"', "3", "Three I symbols contribute one each."),
      E('s = "LVIII"', "58", "L, V, and three I symbols total 58."),
      E('s = "MCMXCIV"', "1994", "CM, XC, and IV are subtractive pairs."),
    ],
    ["1 <= s.length <= 15", "s is a valid Roman numeral in the range 1 through 3999."],
    "Expand each of the six subtractive pairs into equivalent additive symbols, then sum every remaining symbol.",
    "Repeated string replacement creates intermediate strings and handles subtractive notation as special preprocessing.",
    "Time O(n), space O(n).",
    `class Solution {
  private int value(char c) {
    if (c == 'I') return 1;
    if (c == 'V') return 5;
    if (c == 'X') return 10;
    if (c == 'L') return 50;
    if (c == 'C') return 100;
    if (c == 'D') return 500;
    return 1000;
  }
  public int romanToInt(String s) {
    s = s.replace("IV", "IIII").replace("IX", "VIIII");
    s = s.replace("XL", "XXXX").replace("XC", "LXXXX");
    s = s.replace("CD", "CCCC").replace("CM", "DCCCC");
    int answer = 0;
    for (char c : s.toCharArray()) answer += value(c);
    return answer;
  }
}`,
    "A smaller symbol immediately before a larger symbol must be subtracted; every other symbol is added. One left-to-right scan therefore covers both ordinary and subtractive notation.",
    "Time O(n), space O(1).",
    ["Map each Roman symbol to its value.", "Subtract a value when the next symbol is larger.", "Add it otherwise, including the final symbol."],
    `class Solution {
  private int value(char c) {
    if (c == 'I') return 1;
    if (c == 'V') return 5;
    if (c == 'X') return 10;
    if (c == 'L') return 50;
    if (c == 'C') return 100;
    if (c == 'D') return 500;
    return 1000;
  }
  public int romanToInt(String s) {
    int answer = 0;
    for (int i = 0; i < s.length(); i++) {
      int current = value(s.charAt(i));
      if (i + 1 < s.length() && current < value(s.charAt(i + 1))) answer -= current;
      else answer += current;
    }
    return answer;
  }
}`,
  ),
  "integer-to-roman": P(
    "Convert an integer from 1 through 3999 to its canonical Roman numeral representation.",
    [
      E("num = 3749", '"MMMDCCXLIX"', "The thousands, hundreds, tens, and ones are encoded canonically."),
      E("num = 58", '"LVIII"', "Fifty, five, and three ones form LVIII."),
      E("num = 1994", '"MCMXCIV"', "The answer uses CM, XC, and IV subtractive pairs."),
    ],
    ["1 <= num <= 3999"],
    "Handle thousands, hundreds, tens, and ones separately with explicit condition chains for nine, five, four, and repeated unit symbols.",
    "The place-by-place condition tree repeats logic and becomes difficult to extend or verify.",
    "Time O(1), space O(1), because the input range is bounded.",
    `class Solution {
  public String intToRoman(int num) {
    String[] thousands = {"", "M", "MM", "MMM"};
    String[] hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    String[] tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    String[] ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    return thousands[num / 1000] + hundreds[num / 100 % 10] + tens[num / 10 % 10] + ones[num % 10];
  }
}`,
    "List Roman tokens from greatest value to smallest, including subtractive pairs. Repeatedly take the greatest token that fits, append it, and reduce the remaining number.",
    "Time O(1), space O(1), with at most fifteen output symbols.",
    ["Prepare aligned value and symbol arrays in descending order.", "At each token, append while its value fits in the remaining number.", "Subtract each appended token and continue downward."],
    `class Solution {
  public String intToRoman(int num) {
    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    StringBuilder answer = new StringBuilder();
    for (int i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        answer.append(symbols[i]);
        num -= values[i];
      }
    }
    return answer.toString();
  }
}`,
  ),
  "fraction-to-recurring-decimal": P(
    "Return the exact decimal representation of numerator divided by denominator. Put the repeating part in parentheses, and return an integer string when the division terminates.",
    [
      E("numerator = 1, denominator = 2", '"0.5"', "The remainder becomes zero after one decimal digit."),
      E("numerator = 2, denominator = 1", '"2"', "There is no fractional part."),
      E("numerator = 4, denominator = 333", '"0.(012)"', "The remainder repeats after digits 012."),
    ],
    ["-2147483648 <= numerator, denominator <= 2147483647", "denominator is not zero.", "The result length is below 10000 characters."],
    "Perform long division while storing prior remainders in a list; before each digit, linearly search the list to see whether the remainder appeared earlier.",
    "Searching the remainder history costs linear time per digit, making a k-digit cycle quadratic.",
    "Time O(k squared), space O(k), where k is the non-repeating prefix plus cycle length.",
    `class Solution {
  public String fractionToDecimal(int numerator, int denominator) {
    if (numerator == 0) return "0";
    StringBuilder answer = new StringBuilder();
    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');
    long a = Math.abs((long) numerator);
    long b = Math.abs((long) denominator);
    answer.append(a / b);
    long remainder = a % b;
    if (remainder == 0) return answer.toString();
    answer.append('.');
    java.util.List<Long> seen = new java.util.ArrayList<>();
    while (remainder != 0) {
      int repeat = seen.indexOf(remainder);
      if (repeat >= 0) {
        answer.insert(answer.indexOf(".") + 1 + repeat, "(");
        answer.append(')');
        break;
      }
      seen.add(remainder);
      remainder *= 10;
      answer.append(remainder / b);
      remainder %= b;
    }
    return answer.toString();
  }
}`,
    "A remainder completely determines every later digit. Map each remainder to the output index where its digit starts; a repeated remainder marks the opening parenthesis position in constant lookup time.",
    "Time O(k), space O(k).",
    ["Write the sign and integer quotient using long magnitudes.", "For each nonzero remainder, save its current output index before generating the next digit.", "When a saved remainder returns, insert an opening parenthesis at its index and append the closing parenthesis."],
    `class Solution {
  public String fractionToDecimal(int numerator, int denominator) {
    if (numerator == 0) return "0";
    StringBuilder answer = new StringBuilder();
    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');
    long a = Math.abs((long) numerator);
    long b = Math.abs((long) denominator);
    answer.append(a / b);
    long remainder = a % b;
    if (remainder == 0) return answer.toString();
    answer.append('.');
    java.util.Map<Long, Integer> position = new java.util.HashMap<>();
    while (remainder != 0) {
      if (position.containsKey(remainder)) {
        answer.insert(position.get(remainder).intValue(), "(");
        answer.append(')');
        break;
      }
      position.put(remainder, answer.length());
      remainder *= 10;
      answer.append(remainder / b);
      remainder %= b;
    }
    return answer.toString();
  }
}`,
  ),
  "multiply-strings": P(
    "Given two nonnegative integers as decimal strings, return their product as a decimal string without converting either complete input to an integer type or using arbitrary-precision arithmetic.",
    [
      E('num1 = "2", num2 = "3"', '"6"', "Two times three is six."),
      E('num1 = "123", num2 = "456"', '"56088"', "Grade-school multiplication produces 56088."),
      E('num1 = "0", num2 = "999"', '"0"', "Any value multiplied by zero is zero."),
    ],
    ["1 <= num1.length, num2.length <= 200", "Both strings contain only digits.", "Neither has leading zeroes unless it equals zero.", "Do not use BigInteger or parse the complete strings."],
    "Add num1 to a decimal-string accumulator num2 times, using a helper that adds two decimal strings.",
    "The numeric value of num2 can be astronomically larger than its digit count, so repeated addition is infeasible.",
    "Time O(value(num2) × (m + n)), space O(m + n).",
    `class Solution {
  private String add(String a, String b) {
    StringBuilder result = new StringBuilder();
    int i = a.length() - 1;
    int j = b.length() - 1;
    int carry = 0;
    while (i >= 0 || j >= 0 || carry != 0) {
      int sum = carry;
      if (i >= 0) sum += a.charAt(i--) - '0';
      if (j >= 0) sum += b.charAt(j--) - '0';
      result.append(sum % 10);
      carry = sum / 10;
    }
    return result.reverse().toString();
  }
  private String decrement(String value) {
    char[] digits = value.toCharArray();
    int i = digits.length - 1;
    while (digits[i] == '0') digits[i--] = '9';
    digits[i]--;
    int start = digits[0] == '0' && digits.length > 1 ? 1 : 0;
    return new String(digits, start, digits.length - start);
  }
  public String multiply(String num1, String num2) {
    String answer = "0";
    while (!num2.equals("0")) {
      answer = add(answer, num1);
      num2 = decrement(num2);
    }
    return answer;
  }
}`,
    "Multiply every digit pair and accumulate it in an array whose indices represent decimal places. Propagate each carry immediately into the previous position, then skip leading zeroes when building the string.",
    "Time O(mn), space O(m + n).",
    ["Create an integer array of length m + n.", "For every digit pair, add its product to the two corresponding result positions and normalize the carry.", "Skip leading zeroes and join the remaining digits."],
    `class Solution {
  public String multiply(String num1, String num2) {
    if (num1.equals("0") || num2.equals("0")) return "0";
    int[] digits = new int[num1.length() + num2.length()];
    for (int i = num1.length() - 1; i >= 0; i--) {
      for (int j = num2.length() - 1; j >= 0; j--) {
        int product = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
        int low = i + j + 1;
        int sum = product + digits[low];
        digits[low] = sum % 10;
        digits[low - 1] += sum / 10;
      }
    }
    StringBuilder answer = new StringBuilder();
    int index = 0;
    while (index < digits.length && digits[index] == 0) index++;
    while (index < digits.length) answer.append(digits[index++]);
    return answer.toString();
  }
}`,
  ),
  "valid-square": P(
    "Given four points in the plane, return true when they are the four distinct vertices of a square in any order.",
    [
      E("p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]", "true", "There are four equal sides and two equal diagonals."),
      E("p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]", "false", "The side lengths are not equal."),
      E("p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]", "true", "The points form a square rotated around the origin."),
    ],
    ["Each point contains two integers.", "-10000 <= coordinate <= 10000"],
    "Try every ordering of the four points and accept an ordering whose four consecutive sides are equal and nonzero and whose two diagonals are equal.",
    "Checking all 24 orderings repeats the same six distance calculations and makes correctness harder to see.",
    "Time O(1), space O(1), with a constant 24 permutations.",
    `class Solution {
  private long distance(int[] a, int[] b) {
    long dx = a[0] - b[0];
    long dy = a[1] - b[1];
    return dx * dx + dy * dy;
  }
  private boolean ordered(int[][] p) {
    long side = distance(p[0], p[1]);
    return side > 0 && side == distance(p[1], p[2]) && side == distance(p[2], p[3]) && side == distance(p[3], p[0]) && distance(p[0], p[2]) == distance(p[1], p[3]);
  }
  private boolean search(int[][] p, int index) {
    if (index == p.length) return ordered(p);
    for (int i = index; i < p.length; i++) {
      int[] value = p[index];
      p[index] = p[i];
      p[i] = value;
      if (search(p, index + 1)) return true;
      value = p[index];
      p[index] = p[i];
      p[i] = value;
    }
    return false;
  }
  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
    return search(new int[][]{p1, p2, p3, p4}, 0);
  }
}`,
    "A square has exactly six pairwise squared distances: four equal positive side distances and two equal diagonal distances, with each diagonal twice a side. Sort those six values and verify this pattern.",
    "Time O(1), space O(1).",
    ["Compute all six squared pairwise distances.", "Sort the constant-size distance array.", "Require four equal positive small distances and two equal large distances."],
    `class Solution {
  private long distance(int[] a, int[] b) {
    long dx = a[0] - b[0];
    long dy = a[1] - b[1];
    return dx * dx + dy * dy;
  }
  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
    int[][] p = {p1, p2, p3, p4};
    long[] distances = new long[6];
    int index = 0;
    for (int i = 0; i < 4; i++) for (int j = i + 1; j < 4; j++) distances[index++] = distance(p[i], p[j]);
    java.util.Arrays.sort(distances);
    return distances[0] > 0 && distances[0] == distances[1] && distances[1] == distances[2] && distances[2] == distances[3] && distances[4] == distances[5] && distances[4] == 2 * distances[0];
  }
}`,
  ),
  "two-sum-ii-input-array-is-sorted": P(
    "A one-indexed integer array is sorted in nondecreasing order. Return the two distinct one-based indices whose values add to target; exactly one answer exists and constant extra space is required.",
    [E("numbers = [2,7,11,15], target = 9", "[1,2]", "Two plus seven equals nine."), E("numbers = [2,3,4], target = 6", "[1,3]", "The first and third values form the answer."), E("numbers = [-1,0], target = -1", "[1,2]", "Negative values follow the same rule.")],
    ["2 <= numbers.length <= 30000", "-1000 <= numbers[i], target <= 1000", "numbers is sorted and exactly one answer exists."],
    "Try every pair in index order and return when its sum equals target.",
    "It ignores the sorted order and examines a quadratic number of pairs.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    for (int i = 0; i < numbers.length; i++) {
      for (int j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] == target) return new int[]{i + 1, j + 1};
      }
    }
    throw new IllegalStateException();
  }
}`,
    "Keep one pointer at each end. A sum below target can only improve by moving the smaller value right; a sum above target can only improve by moving the larger value left.",
    "Time O(n), space O(1).",
    ["Compute the sum at the two endpoints.", "Move left rightward when the sum is too small and right leftward when it is too large.", "Return the one-based indices when the sum matches."],
    `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    while (left < right) {
      int sum = numbers[left] + numbers[right];
      if (sum == target) return new int[]{left + 1, right + 1};
      if (sum < target) left++;
      else right--;
    }
    throw new IllegalStateException();
  }
}`,
  ),
  "3sum": P(
    "Return every unique triplet of values in the integer array whose sum is zero. A result triplet may not reuse an array position, and duplicate triplets must be omitted.",
    [E("nums = [-1,0,1,2,-1,-4]", "[[-1,-1,2],[-1,0,1]]", "These are the two distinct value combinations summing to zero."), E("nums = [0,1,1]", "[]", "The only possible triplet sums to two."), E("nums = [0,0,0]", "[[0,0,0]]", "The three zeroes form one unique triplet.")],
    ["3 <= nums.length <= 3000", "-100000 <= nums[i] <= 100000", "Output order does not matter."],
    "Enumerate all index triples, sort each matching triple, and use a set to remove duplicate value combinations.",
    "Three nested loops take cubic time and the set stores duplicate candidates after discovering them.",
    "Time O(n cubed), space O(number of answers).",
    `class Solution {
  public java.util.List<java.util.List<Integer>> threeSum(int[] nums) {
    java.util.Set<java.util.List<Integer>> unique = new java.util.HashSet<>();
    for (int i = 0; i < nums.length; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        for (int k = j + 1; k < nums.length; k++) {
          if (nums[i] + nums[j] + nums[k] == 0) {
            int[] values = {nums[i], nums[j], nums[k]};
            java.util.Arrays.sort(values);
            unique.add(java.util.Arrays.asList(values[0], values[1], values[2]));
          }
        }
      }
    }
    return new java.util.ArrayList<>(unique);
  }
}`,
    "Sort the array. Fix the first value, then use opposite pointers on the suffix; the sum tells which pointer must move. Skipping equal values at every level prevents duplicate triplets before they are produced.",
    "Time O(n squared), space O(1) excluding the answer and sort stack.",
    ["Sort the values and skip repeated first values.", "For each first value, sweep left and right pointers through the suffix.", "Record zero sums, skip duplicate pointer values, and move according to the sum."],
    `class Solution {
  public java.util.List<java.util.List<Integer>> threeSum(int[] nums) {
    java.util.Arrays.sort(nums);
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      int left = i + 1;
      int right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum < 0) left++;
        else if (sum > 0) right--;
        else {
          answer.add(java.util.Arrays.asList(nums[i], nums[left], nums[right]));
          int low = nums[left];
          int high = nums[right];
          while (left < right && nums[left] == low) left++;
          while (left < right && nums[right] == high) right--;
        }
      }
    }
    return answer;
  }
}`,
  ),
  "3sum-closest": P(
    "Choose three distinct array elements whose sum is closest to target and return that sum. Every input has exactly one closest sum.",
    [E("nums = [-1,2,1,-4], target = 1", "2", "The sum -1 + 2 + 1 is one away from target."), E("nums = [0,0,0], target = 1", "0", "The only triplet has sum zero."), E("nums = [1,1,1,0], target = -100", "2", "The smallest available triplet sum is closest.")],
    ["3 <= nums.length <= 500", "-1000 <= nums[i], target <= 10000", "Exactly one closest sum exists."],
    "Evaluate every index triplet and retain the sum with the smallest absolute difference from target.",
    "The cubic enumeration repeats pair searches that sorting can reduce to a linear sweep.",
    "Time O(n cubed), space O(1).",
    `class Solution {
  public int threeSumClosest(int[] nums, int target) {
    int best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < nums.length; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        for (int k = j + 1; k < nums.length; k++) {
          int sum = nums[i] + nums[j] + nums[k];
          if (Math.abs((long) sum - target) < Math.abs((long) best - target)) best = sum;
        }
      }
    }
    return best;
  }
}`,
    "After sorting, fix one value and sweep the remaining pair inward. Save every improvement; a low sum requires moving left rightward and a high sum requires moving right leftward. An exact target can return immediately.",
    "Time O(n squared), space O(1) excluding sort stack.",
    ["Sort the array and initialize a valid best sum.", "Fix each first index and sweep a pair around the remaining values.", "Update the closest sum, then move the pointer dictated by whether the sum is below or above target."],
    `class Solution {
  public int threeSumClosest(int[] nums, int target) {
    java.util.Arrays.sort(nums);
    int best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < nums.length - 2; i++) {
      int left = i + 1;
      int right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (Math.abs((long) sum - target) < Math.abs((long) best - target)) best = sum;
        if (sum == target) return target;
        if (sum < target) left++;
        else right--;
      }
    }
    return best;
  }
}`,
  ),
  "4sum": P(
    "Return all unique quadruplets of distinct array positions whose four values add to target. Duplicate value quadruplets must appear only once.",
    [E("nums = [1,0,-1,0,-2,2], target = 0", "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]", "All three unique combinations sum to zero."), E("nums = [2,2,2,2,2], target = 8", "[[2,2,2,2]]", "Many index choices represent the same value quadruplet."), E("nums = [1,2,3,4], target = 100", "[]", "The only quadruplet does not reach target.")],
    ["1 <= nums.length <= 200", "-1000000000 <= nums[i], target <= 1000000000", "Use long arithmetic when adding values."],
    "Enumerate every four-index combination, sort each matching set of values, and deduplicate it in a hash set.",
    "Four nested loops require quartic time and generate duplicate answers after the expensive search.",
    "Time O(n to the fourth), space O(number of answers).",
    `class Solution {
  public java.util.List<java.util.List<Integer>> fourSum(int[] nums, int target) {
    java.util.Set<java.util.List<Integer>> unique = new java.util.HashSet<>();
    for (int a = 0; a < nums.length; a++) for (int b = a + 1; b < nums.length; b++) {
      for (int c = b + 1; c < nums.length; c++) for (int d = c + 1; d < nums.length; d++) {
        if ((long) nums[a] + nums[b] + nums[c] + nums[d] == target) {
          int[] values = {nums[a], nums[b], nums[c], nums[d]};
          java.util.Arrays.sort(values);
          unique.add(java.util.Arrays.asList(values[0], values[1], values[2], values[3]));
        }
      }
    }
    return new java.util.ArrayList<>(unique);
  }
}`,
    "Sort first, fix two indices, and solve the remaining two-sum with opposite pointers. Skip equal values at each level so each value quadruplet is emitted once, and use long for the sum.",
    "Time O(n cubed), space O(1) excluding the answer and sort stack.",
    ["Sort and choose the first two indices while skipping duplicates.", "Sweep left and right through the remaining suffix.", "Record target sums, skip duplicate endpoints, and move the correct pointer otherwise."],
    `class Solution {
  public java.util.List<java.util.List<Integer>> fourSum(int[] nums, int target) {
    java.util.Arrays.sort(nums);
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    for (int i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      for (int j = i + 1; j < nums.length - 2; j++) {
        if (j > i + 1 && nums[j] == nums[j - 1]) continue;
        int left = j + 1;
        int right = nums.length - 1;
        while (left < right) {
          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
          if (sum < target) left++;
          else if (sum > target) right--;
          else {
            answer.add(java.util.Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
            int low = nums[left];
            int high = nums[right];
            while (left < right && nums[left] == low) left++;
            while (left < right && nums[right] == high) right--;
          }
        }
      }
    }
    return answer;
  }
}`,
  ),
  "container-with-most-water": P(
    "Vertical lines stand at consecutive x-coordinates with the given heights. Choose two lines that, together with the x-axis, hold the greatest possible area of water.",
    [E("height = [1,8,6,2,5,4,8,3,7]", "49", "The lines of heights eight and seven are seven positions apart."), E("height = [1,1]", "1", "The only pair has width one and height one."), E("height = [4,3,2,1,4]", "16", "The equal height-four endpoints give width four.")],
    ["2 <= height.length <= 100000", "0 <= height[i] <= 10000"],
    "Compute the area formed by every pair of lines and retain the maximum.",
    "There are a quadratic number of pairs, which is too slow for one hundred thousand lines.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int maxArea(int[] height) {
    int best = 0;
    for (int i = 0; i < height.length; i++) {
      for (int j = i + 1; j < height.length; j++) best = Math.max(best, Math.min(height[i], height[j]) * (j - i));
    }
    return best;
  }
}`,
    "Start with maximum width at both ends. Area is limited by the shorter line; moving the taller line inward only reduces width without raising that limit, so only the shorter side can lead to improvement.",
    "Time O(n), space O(1).",
    ["Measure the area between the current endpoints.", "Update the maximum.", "Move the endpoint with smaller height inward, using either one when equal."],
    `class Solution {
  public int maxArea(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int best = 0;
    while (left < right) {
      best = Math.max(best, Math.min(height[left], height[right]) * (right - left));
      if (height[left] <= height[right]) left++;
      else right--;
    }
    return best;
  }
}`,
  ),
  "trapping-rain-water": P(
    "Given nonnegative bar heights of width one, return how many units of rainwater remain trapped between the bars after raining.",
    [E("height = [0,1,0,2,1,0,1,3,2,1,2,1]", "6", "The valleys collectively hold six units."), E("height = [4,2,0,3,2,5]", "9", "The left and right boundaries trap nine units across the middle."), E("height = [1,2,3]", "0", "An increasing profile has no enclosed valley.")],
    ["1 <= height.length <= 20000", "0 <= height[i] <= 100000"],
    "For every position, scan left and right to find its highest boundaries; water there is the smaller boundary minus the bar height.",
    "The same prefix and suffix maxima are recomputed for every bar, resulting in quadratic time.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int trap(int[] height) {
    int water = 0;
    for (int i = 0; i < height.length; i++) {
      int leftMax = 0;
      int rightMax = 0;
      for (int left = 0; left <= i; left++) leftMax = Math.max(leftMax, height[left]);
      for (int right = i; right < height.length; right++) rightMax = Math.max(rightMax, height[right]);
      water += Math.min(leftMax, rightMax) - height[i];
    }
    return water;
  }
}`,
    "Track the highest boundary seen from each end. The smaller current maximum determines a guaranteed water level because the opposite side already has a boundary at least that high; process that side and move inward.",
    "Time O(n), space O(1).",
    ["Keep pointers and running maxima at both ends.", "Process the side with the smaller running maximum.", "Add that maximum minus the current height, update state, and move inward."],
    `class Solution {
  public int trap(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;
    while (left <= right) {
      if (leftMax <= rightMax) {
        leftMax = Math.max(leftMax, height[left]);
        water += leftMax - height[left++];
      } else {
        rightMax = Math.max(rightMax, height[right]);
        water += rightMax - height[right--];
      }
    }
    return water;
  }
}`,
  ),
  "valid-palindrome": P(
    "Return true when a string is a palindrome after converting letters to one case and removing every non-alphanumeric character.",
    [E('s = "A man, a plan, a canal: Panama"', "true", "Normalization produces amanaplanacanalpanama."), E('s = "race a car"', "false", "Normalization produces raceacar, which differs in mirrored positions."), E('s = " "', "true", "After removing non-alphanumeric characters, the string is empty.")],
    ["1 <= s.length <= 200000", "s contains printable ASCII characters."],
    "Build a normalized lowercase string containing only letters and digits, then compare it with its reversed copy.",
    "It allocates both the normalized string and its reversal even though each relevant character can be compared in place.",
    "Time O(n), space O(n).",
    `class Solution {
  public boolean isPalindrome(String s) {
    StringBuilder clean = new StringBuilder();
    for (char c : s.toCharArray()) if (Character.isLetterOrDigit(c)) clean.append(Character.toLowerCase(c));
    return clean.toString().equals(clean.reverse().toString());
  }
}`,
    "Use two pointers on the original string. Skip non-alphanumeric characters from both sides and compare the lowercase forms of each remaining mirrored pair.",
    "Time O(n), space O(1).",
    ["Place pointers at both ends.", "Advance either pointer past characters that do not participate.", "Compare normalized characters and move inward until the pointers meet."],
    `class Solution {
  public boolean isPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
      left++;
      right--;
    }
    return true;
  }
}`,
  ),
  "reverse-string": P(
    "Reverse an array of characters in place, using constant extra memory.",
    [E("s = ['h','e','l','l','o']", "['o','l','l','e','h']", "The character order is mirrored."), E("s = ['H','a','n','n','a','h']", "['h','a','n','n','a','H']", "Case is preserved while positions reverse."), E("s = ['a']", "['a']", "A one-character array is already reversed.")],
    ["1 <= s.length <= 100000", "Each element is a printable ASCII character.", "The input array must be modified in place."],
    "Copy characters into a second array in reverse order, then copy that array back into the input.",
    "It uses linear auxiliary memory despite needing only symmetric swaps.",
    "Time O(n), space O(n).",
    `class Solution {
  public void reverseString(char[] s) {
    char[] copy = new char[s.length];
    for (int i = 0; i < s.length; i++) copy[i] = s[s.length - 1 - i];
    for (int i = 0; i < s.length; i++) s[i] = copy[i];
  }
}`,
    "The first and last positions belong to each other, as do the second and second-last. Swap these pairs while moving two pointers inward.",
    "Time O(n), space O(1).",
    ["Place pointers at the first and last characters.", "Swap their values.", "Move both inward and repeat until they cross."],
    `class Solution {
  public void reverseString(char[] s) {
    int left = 0;
    int right = s.length - 1;
    while (left < right) {
      char value = s[left];
      s[left++] = s[right];
      s[right--] = value;
    }
  }
}`,
  ),
  "move-zeroes": P(
    "Move all zero values to the end of the array in place while preserving the relative order of nonzero values.",
    [E("nums = [0,1,0,3,12]", "[1,3,12,0,0]", "The three nonzero values retain their order."), E("nums = [0]", "[0]", "The array is unchanged."), E("nums = [1,2,3]", "[1,2,3]", "No zero needs to move.")],
    ["1 <= nums.length <= 10000", "-2147483648 <= nums[i] <= 2147483647", "The operation must modify nums in place."],
    "Collect nonzero values in a temporary array, copy them back, and fill the remaining suffix with zeroes.",
    "The temporary array consumes O(n) memory for a stable transformation that can be written directly.",
    "Time O(n), space O(n).",
    `class Solution {
  public void moveZeroes(int[] nums) {
    int[] values = new int[nums.length];
    int size = 0;
    for (int value : nums) if (value != 0) values[size++] = value;
    for (int i = 0; i < nums.length; i++) nums[i] = values[i];
  }
}`,
    "A write pointer marks where the next nonzero belongs. Write nonzero values in encounter order, then fill every unwritten position with zero.",
    "Time O(n), space O(1).",
    ["Scan once and write each nonzero at the next write index.", "The write index now equals the number of nonzero values.", "Fill the remaining suffix with zeroes."],
    `class Solution {
  public void moveZeroes(int[] nums) {
    int write = 0;
    for (int value : nums) if (value != 0) nums[write++] = value;
    while (write < nums.length) nums[write++] = 0;
  }
}`,
  ),
  "remove-duplicates-from-sorted-array": P(
    "Remove duplicates from a sorted array in place so each distinct value occupies the first k positions, and return k.",
    [E("nums = [1,1,2]", "k = 2, nums starts [1,2]", "One copy of each value remains."), E("nums = [0,0,1,1,1,2,2,3,3,4]", "k = 5, nums starts [0,1,2,3,4]", "Five distinct values remain."), E("nums = [7]", "k = 1, nums starts [7]", "The sole value is already unique.")],
    ["1 <= nums.length <= 30000", "-100 <= nums[i] <= 100", "nums is sorted in nondecreasing order."],
    "Insert all values into a LinkedHashSet, then write the set contents back to the beginning of the array.",
    "The set uses linear extra space and ignores the fact that equal values are adjacent.",
    "Time O(n), space O(n).",
    `class Solution {
  public int removeDuplicates(int[] nums) {
    java.util.Set<Integer> unique = new java.util.LinkedHashSet<>();
    for (int value : nums) unique.add(value);
    int write = 0;
    for (int value : unique) nums[write++] = value;
    return write;
  }
}`,
    "The sorted order means a value is new exactly when it differs from the last written value. Keep one write pointer and overwrite the next prefix position only for a new value.",
    "Time O(n), space O(1).",
    ["Keep the first value and set write to one.", "Scan from the second value onward.", "When the current value differs from nums[write - 1], write it and advance write."],
    `class Solution {
  public int removeDuplicates(int[] nums) {
    int write = 1;
    for (int read = 1; read < nums.length; read++) {
      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];
    }
    return write;
  }
}`,
  ),
  "remove-element": P(
    "Remove every occurrence of val from nums in place and return the number k of remaining values. The first k positions must contain those values; their order may change.",
    [E("nums = [3,2,2,3], val = 3", "k = 2, nums starts [2,2]", "Both copies of three are excluded."), E("nums = [0,1,2,2,3,0,4,2], val = 2", "k = 5", "The five values different from two remain in the prefix."), E("nums = [1], val = 1", "k = 0", "No value remains.")],
    ["0 <= nums.length <= 100", "0 <= nums[i], val <= 50", "Only the first returned k positions are evaluated."],
    "Copy every value different from val into a temporary array, then copy the retained prefix back to nums.",
    "The extra array duplicates the input even though values can be written directly into positions already scanned.",
    "Time O(n), space O(n).",
    `class Solution {
  public int removeElement(int[] nums, int val) {
    int[] kept = new int[nums.length];
    int size = 0;
    for (int value : nums) if (value != val) kept[size++] = value;
    for (int i = 0; i < size; i++) nums[i] = kept[i];
    return size;
  }
}`,
    "Use a read pointer to inspect every value and a write pointer for the next retained position. Values equal to val are simply not written.",
    "Time O(n), space O(1).",
    ["Initialize write to zero.", "Scan every value with read.", "Copy a value to nums[write] and advance write only when it differs from val."],
    `class Solution {
  public int removeElement(int[] nums, int val) {
    int write = 0;
    for (int value : nums) if (value != val) nums[write++] = value;
    return write;
  }
}`,
  ),
  "sort-colors": P(
    "Sort an array containing only 0, 1, and 2 in place so equal colors are adjacent in the order 0, 1, 2. Do not use the library sort in the intended solution.",
    [E("nums = [2,0,2,1,1,0]", "[0,0,1,1,2,2]", "All zeroes precede ones, which precede twos."), E("nums = [2,0,1]", "[0,1,2]", "Each color appears once."), E("nums = [1,1]", "[1,1]", "An already uniform array is unchanged.")],
    ["1 <= nums.length <= 300", "nums[i] is 0, 1, or 2.", "The optimized solution must be in place and one pass."],
    "Use the general-purpose array sort.",
    "Comparison sorting costs O(n log n) and does not exploit the three-value domain or one-pass requirement.",
    "Time O(n log n), space O(log n) for the sort.",
    `class Solution {
  public void sortColors(int[] nums) {
    java.util.Arrays.sort(nums);
  }
}`,
    "Maintain three regions: zeroes before low, unclassified values from current through high, and twos after high. Swap zeroes left, twos right, and leave ones in the middle.",
    "Time O(n), space O(1).",
    ["Set low and current to the start and high to the end.", "Swap a zero with low and advance both; advance current over a one.", "Swap a two with high and decrease high without advancing current until the incoming value is classified."],
    `class Solution {
  public void sortColors(int[] nums) {
    int low = 0;
    int current = 0;
    int high = nums.length - 1;
    while (current <= high) {
      if (nums[current] == 0) {
        int value = nums[low];
        nums[low++] = nums[current];
        nums[current++] = value;
      } else if (nums[current] == 2) {
        int value = nums[high];
        nums[high--] = nums[current];
        nums[current] = value;
      } else {
        current++;
      }
    }
  }
}`,
  ),
  "squares-of-a-sorted-array": P(
    "Square every value in a nondecreasing integer array and return the squares in nondecreasing order.",
    [E("nums = [-4,-1,0,3,10]", "[0,1,9,16,100]", "Squaring changes sign-based order, then sorting restores numeric order."), E("nums = [-7,-3,2,3,11]", "[4,9,9,49,121]", "The two values with magnitude three produce equal squares."), E("nums = [0]", "[0]", "Zero squared is zero.")],
    ["1 <= nums.length <= 10000", "-10000 <= nums[i] <= 10000", "nums is sorted in nondecreasing order."],
    "Square every value and sort the resulting array.",
    "Sorting adds an O(log n) factor even though the greatest remaining square must always come from one of the two ends.",
    "Time O(n log n), space O(log n) for the sort.",
    `class Solution {
  public int[] sortedSquares(int[] nums) {
    int[] answer = new int[nums.length];
    for (int i = 0; i < nums.length; i++) answer[i] = nums[i] * nums[i];
    java.util.Arrays.sort(answer);
    return answer;
  }
}`,
    "Because the input is sorted, the largest absolute value is at an endpoint. Compare endpoint squares, place the larger at the answer's final open position, and move that endpoint inward.",
    "Time O(n), space O(n) for the returned array.",
    ["Place input pointers at both ends and an output pointer at the final index.", "Write the larger endpoint square at output.", "Move the chosen endpoint and fill output backward."],
    `class Solution {
  public int[] sortedSquares(int[] nums) {
    int[] answer = new int[nums.length];
    int left = 0;
    int right = nums.length - 1;
    for (int write = nums.length - 1; write >= 0; write--) {
      int leftSquare = nums[left] * nums[left];
      int rightSquare = nums[right] * nums[right];
      if (leftSquare > rightSquare) {
        answer[write] = leftSquare;
        left++;
      } else {
        answer[write] = rightSquare;
        right--;
      }
    }
    return answer;
  }
}`,
  ),
  "backspace-string-compare": P(
    "In each input string, '#' behaves like a backspace that deletes the previous typed character when one exists. Return whether the two final typed strings are equal.",
    [E('s = "ab#c", t = "ad#c"', "true", "Both reduce to ac."), E('s = "ab##", t = "c#d#"', "true", "Both reduce to the empty string."), E('s = "a#c", t = "b"', "false", "The final strings are c and b.")],
    ["1 <= s.length, t.length <= 200", "Inputs contain lowercase letters and '#'."],
    "Simulate each text editor with a character stack, build both final strings, and compare them.",
    "It stores both processed strings even though they can be compared from the end while skipping deleted characters.",
    "Time O(n + m), space O(n + m).",
    `class Solution {
  private String build(String value) {
    StringBuilder result = new StringBuilder();
    for (char c : value.toCharArray()) {
      if (c == '#') {
        if (result.length() > 0) result.deleteCharAt(result.length() - 1);
      } else {
        result.append(c);
      }
    }
    return result.toString();
  }
  public boolean backspaceCompare(String s, String t) {
    return build(s).equals(build(t));
  }
}`,
    "Scan each string backward. A backspace increases a skip count; a normal character is skipped while that count is positive. Compare the next surviving character from each string until both are exhausted.",
    "Time O(n + m), space O(1).",
    ["Move backward over backspaces and the characters they erase in each string.", "Compare the next surviving characters, treating exhaustion consistently.", "Move past matched survivors and repeat."],
    `class Solution {
  private int previous(String value, int index) {
    int skip = 0;
    while (index >= 0) {
      if (value.charAt(index) == '#') {
        skip++;
        index--;
      } else if (skip > 0) {
        skip--;
        index--;
      } else {
        break;
      }
    }
    return index;
  }
  public boolean backspaceCompare(String s, String t) {
    int i = s.length() - 1;
    int j = t.length() - 1;
    while (i >= 0 || j >= 0) {
      i = previous(s, i);
      j = previous(t, j);
      if (i < 0 || j < 0) return i == j;
      if (s.charAt(i) != t.charAt(j)) return false;
      i--;
      j--;
    }
    return true;
  }
}`,
  ),
  "boats-to-save-people": P(
    "Each boat carries at most two people and has the given weight limit. Return the minimum number of boats needed to carry everyone.",
    [E("people = [1,2], limit = 3", "1", "Both people fit together."), E("people = [3,2,2,1], limit = 3", "3", "One and two share; the other two values need separate boats."), E("people = [3,5,3,4], limit = 5", "4", "No pair fits within the limit.")],
    ["1 <= people.length <= 50000", "1 <= people[i] <= limit <= 30000"],
    "Sort the weights, repeatedly select the heaviest unused person, and scan all lighter unused people to find the lightest partner that fits.",
    "The repeated search for an available partner makes the approach quadratic and needs a used marker array.",
    "Time O(n squared), space O(n).",
    `class Solution {
  public int numRescueBoats(int[] people, int limit) {
    java.util.Arrays.sort(people);
    boolean[] used = new boolean[people.length];
    int boats = 0;
    for (int heavy = people.length - 1; heavy >= 0; heavy--) {
      if (used[heavy]) continue;
      used[heavy] = true;
      for (int light = 0; light < heavy; light++) {
        if (!used[light] && people[light] + people[heavy] <= limit) {
          used[light] = true;
          break;
        }
      }
      boats++;
    }
    return boats;
  }
}`,
    "After sorting, the heaviest remaining person must take a boat. Pair that person with the lightest remaining person whenever they fit; if even the lightest cannot fit, no other partner can. Either choice consumes one boat optimally.",
    "Time O(n log n), space O(log n) for sorting.",
    ["Sort weights and place pointers at both ends.", "Always board the heaviest remaining person.", "Also board the lightest when their combined weight fits, then count the boat."],
    `class Solution {
  public int numRescueBoats(int[] people, int limit) {
    java.util.Arrays.sort(people);
    int light = 0;
    int heavy = people.length - 1;
    int boats = 0;
    while (light <= heavy) {
      if (people[light] + people[heavy] <= limit) light++;
      heavy--;
      boats++;
    }
    return boats;
  }
}`,
  ),
  "next-permutation": P(
    "Rearrange the array into the lexicographically next greater permutation. If no greater arrangement exists, rearrange it into ascending order. Modify the array in place.",
    [E("nums = [1,2,3]", "[1,3,2]", "This is the smallest permutation greater than 123."), E("nums = [3,2,1]", "[1,2,3]", "The greatest permutation wraps to the smallest."), E("nums = [1,1,5]", "[1,5,1]", "Duplicate values still produce a well-defined next ordering.")],
    ["1 <= nums.length <= 100", "0 <= nums[i] <= 100", "The transformation must be in place with constant extra memory in the optimized approach."],
    "Generate every permutation, retain the lexicographically smallest one greater than the original, and use the sorted arrangement when none exists.",
    "Enumerating n factorial arrangements is unusable and stores recursion state even though the next arrangement is determined by one suffix.",
    "Time O(n times n factorial), space O(n) recursion excluding generated candidates.",
    `class Solution {
  private int[] best;
  private int compare(int[] a, int[] b) {
    for (int i = 0; i < a.length; i++) if (a[i] != b[i]) return Integer.compare(a[i], b[i]);
    return 0;
  }
  private void generate(int[] values, int index, int[] original) {
    if (index == values.length) {
      if (compare(values, original) > 0 && (best == null || compare(values, best) < 0)) best = values.clone();
      return;
    }
    for (int i = index; i < values.length; i++) {
      int value = values[index];
      values[index] = values[i];
      values[i] = value;
      generate(values, index + 1, original);
      value = values[index];
      values[index] = values[i];
      values[i] = value;
    }
  }
  public void nextPermutation(int[] nums) {
    int[] original = nums.clone();
    generate(nums, 0, original);
    if (best == null) {
      java.util.Arrays.sort(nums);
    } else {
      System.arraycopy(best, 0, nums, 0, nums.length);
    }
  }
}`,
    "A nonincreasing suffix is already its greatest arrangement. Find the pivot just before that suffix, swap it with the smallest larger suffix value, then reverse the suffix into its smallest order. If the whole array is nonincreasing, reversing it wraps to the first permutation.",
    "Time O(n), space O(1).",
    ["Find the rightmost index whose value is smaller than its next value.", "If a pivot exists, swap it with the rightmost value greater than it.", "Reverse everything after the pivot."],
    `class Solution {
  public void nextPermutation(int[] nums) {
    int pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) pivot--;
    if (pivot >= 0) {
      int larger = nums.length - 1;
      while (nums[larger] <= nums[pivot]) larger--;
      int value = nums[pivot];
      nums[pivot] = nums[larger];
      nums[larger] = value;
    }
    int left = pivot + 1;
    int right = nums.length - 1;
    while (left < right) {
      int value = nums[left];
      nums[left++] = nums[right];
      nums[right--] = value;
    }
  }
}`,
  ),
  "find-the-duplicate-number": P(
    "An array contains n + 1 integers, each in the inclusive range 1 through n. Exactly one value is repeated, possibly more than twice. Return that duplicate without modifying the array and with constant extra space.",
    [E("nums = [1,3,4,2,2]", "2", "Two appears twice."), E("nums = [3,1,3,4,2]", "3", "Three is repeated."), E("nums = [3,3,3,3,3]", "3", "The same duplicate may occur many times.")],
    ["1 <= n <= 100000", "nums.length = n + 1", "1 <= nums[i] <= n", "Exactly one distinct value repeats; do not modify nums and use O(1) extra space."],
    "Compare every pair of positions and return when two values are equal.",
    "Pair comparison takes quadratic time and does not use the fact that each value is a valid next index.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int findDuplicate(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
      for (int j = i + 1; j < nums.length; j++) if (nums[i] == nums[j]) return nums[i];
    }
    throw new IllegalStateException();
  }
}`,
    "Treat index zero as the start of a linked sequence whose next pointer is nums[index]. The duplicate value gives two incoming paths and therefore a cycle. Floyd's meeting phase finds a point in the cycle; restarting one pointer at the beginning makes their next meeting the cycle entrance, which is the duplicate.",
    "Time O(n), space O(1).",
    ["Move slow one edge and fast two edges until they meet.", "Reset slow to index zero while leaving fast at the meeting point.", "Move both one edge at a time; their meeting value is the duplicate."],
    `class Solution {
  public int findDuplicate(int[] nums) {
    int slow = nums[0];
    int fast = nums[0];
    do {
      slow = nums[slow];
      fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
      slow = nums[slow];
      fast = nums[fast];
    }
    return slow;
  }
}`,
  ),
  "is-subsequence": P(
    "Return whether string s can be formed by deleting zero or more characters from string t without changing the order of the remaining characters.",
    [E('s = "abc", t = "ahbgdc"', "true", "Choose a, b, and c in order from t."), E('s = "axc", t = "ahbgdc"', "false", "No x appears in t."), E('s = "", t = "anything"', "true", "The empty string is a subsequence of every string.")],
    ["0 <= s.length <= 100", "0 <= t.length <= 10000", "Both strings contain lowercase English letters."],
    "Recursively explore both choices at each t position: skip it, or consume it when it matches the next required character of s.",
    "The recursion revisits overlapping states and can branch exponentially.",
    "Time O(2 to the length of t), space O(length of t) recursion.",
    `class Solution {
  private boolean search(String s, String t, int i, int j) {
    if (i == s.length()) return true;
    if (j == t.length()) return false;
    if (search(s, t, i, j + 1)) return true;
    return s.charAt(i) == t.charAt(j) && search(s, t, i + 1, j + 1);
  }
  public boolean isSubsequence(String s, String t) {
    return search(s, t, 0, 0);
  }
}`,
    "Match greedily because using the earliest available occurrence of each required character leaves the greatest possible suffix for later characters. Advance through t once and move s only on a match.",
    "Time O(length of t), space O(1).",
    ["Point i to the next required character in s.", "Scan t from left to right.", "Advance i whenever t supplies that character; success means i reaches s.length."],
    `class Solution {
  public boolean isSubsequence(String s, String t) {
    int i = 0;
    for (int j = 0; j < t.length() && i < s.length(); j++) {
      if (s.charAt(i) == t.charAt(j)) i++;
    }
    return i == s.length();
  }
}`,
  ),
};
