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
  "best-time-to-buy-and-sell-stock": P(
    "Given one stock price per day, choose one day to buy and a later day to sell. Return the greatest nonnegative profit obtainable from at most one transaction.",
    [E("prices = [7,1,5,3,6,4]", "5", "Buy at one and later sell at six."), E("prices = [7,6,4,3,1]", "0", "Every later price is lower, so making no transaction is best."), E("prices = [2,4,1]", "2", "Buy at two and sell at four before the later low.")],
    ["1 <= prices.length <= 100000", "0 <= prices[i] <= 10000", "Buying must occur before selling."],
    "Try every buy day with every later sell day and retain the greatest difference.",
    "The quadratic pair search repeats the same minimum-price comparison for many sell days.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int maxProfit(int[] prices) {
    int best = 0;
    for (int buy = 0; buy < prices.length; buy++) {
      for (int sell = buy + 1; sell < prices.length; sell++) best = Math.max(best, prices[sell] - prices[buy]);
    }
    return best;
  }
}`,
    "For each possible sell day, only the cheapest earlier price matters. Track that running minimum and compare today's price against it before moving forward.",
    "Time O(n), space O(1).",
    ["Initialize the minimum to the first price and profit to zero.", "At each day, evaluate selling against the minimum earlier price.", "Update the best profit and then the running minimum."],
    `class Solution {
  public int maxProfit(int[] prices) {
    int minimum = prices[0];
    int best = 0;
    for (int price : prices) {
      best = Math.max(best, price - minimum);
      minimum = Math.min(minimum, price);
    }
    return best;
  }
}`,
  ),
  "longest-substring-without-repeating-characters": P(
    "Return the length of the longest contiguous substring containing no repeated character.",
    [E('s = "abcabcbb"', "3", "abc is one longest substring."), E('s = "bbbbb"', "1", "Any one b is valid, but a longer substring repeats b."), E('s = "pwwkew"', "3", "wke has length three; the answer must be contiguous.")],
    ["0 <= s.length <= 50000", "s may contain letters, digits, symbols, and spaces."],
    "Start at each position and extend a set-backed substring until its first duplicate, retaining the greatest length.",
    "After a duplicate, later starts rebuild nearly the same character set, causing quadratic work.",
    "Time O(n squared), space O(min(n, alphabet size)).",
    `class Solution {
  public int lengthOfLongestSubstring(String s) {
    int best = 0;
    for (int start = 0; start < s.length(); start++) {
      java.util.Set<Character> seen = new java.util.HashSet<>();
      for (int end = start; end < s.length(); end++) {
        if (!seen.add(s.charAt(end))) break;
        best = Math.max(best, end - start + 1);
      }
    }
    return best;
  }
}`,
    "Store the latest index of each character. When a repeated character lies inside the current window, jump the left boundary just past its previous index; otherwise keep expanding.",
    "Time O(n), space O(min(n, alphabet size)).",
    ["Maintain a left boundary and last-seen map.", "For each right character, move left beyond its previous in-window occurrence.", "Save its new index and update the maximum window length."],
    `class Solution {
  public int lengthOfLongestSubstring(String s) {
    java.util.Map<Character, Integer> last = new java.util.HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
      char c = s.charAt(right);
      if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);
      last.put(c, right);
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
  ),
  "longest-repeating-character-replacement": P(
    "Given an uppercase string and an allowance k, replace at most k characters so a contiguous substring consists of one repeated letter. Return the greatest possible substring length.",
    [E('s = "ABAB", k = 2', "4", "Replace both A values or both B values."), E('s = "AABABBA", k = 1', "4", "A window such as AABA can become all A."), E('s = "AAAA", k = 0', "4", "No replacement is needed.")],
    ["1 <= s.length <= 100000", "s contains uppercase English letters.", "0 <= k <= s.length"],
    "Enumerate every substring, count all 26 letters inside it, and accept it when its length minus its largest frequency is at most k.",
    "Recounting every substring requires cubic-style repeated work instead of updating one moving frequency table.",
    "Time O(26n squared), space O(26).",
    `class Solution {
  public int characterReplacement(String s, int k) {
    int best = 0;
    for (int left = 0; left < s.length(); left++) {
      int[] count = new int[26];
      int largest = 0;
      for (int right = left; right < s.length(); right++) {
        largest = Math.max(largest, ++count[s.charAt(right) - 'A']);
        if (right - left + 1 - largest <= k) best = Math.max(best, right - left + 1);
      }
    }
    return best;
  }
}`,
    "A window can be made uniform when its size minus its most frequent letter count is at most k. Expand right, retain the largest frequency observed, and shrink left while the required replacements exceed k.",
    "Time O(n), space O(1) for 26 counts.",
    ["Add each right character to the frequency table and update the maximum frequency.", "While window size minus that maximum exceeds k, remove the left character and advance left.", "Update the best valid window length."],
    `class Solution {
  public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int left = 0;
    int largest = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
      largest = Math.max(largest, ++count[s.charAt(right) - 'A']);
      while (right - left + 1 - largest > k) count[s.charAt(left++) - 'A']--;
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
  ),
  "permutation-in-string": P(
    "Return true when s2 contains a contiguous substring that is a permutation of s1.",
    [E('s1 = "ab", s2 = "eidbaooo"', "true", "The substring ba is a permutation of ab."), E('s1 = "ab", s2 = "eidboaoo"', "false", "No length-two window contains one a and one b."), E('s1 = "adc", s2 = "dcda"', "true", "The window cda has the required frequencies.")],
    ["1 <= s1.length, s2.length <= 10000", "Both strings contain lowercase English letters."],
    "Sort s1 once, then sort every same-length substring of s2 and compare the resulting strings.",
    "Creating and sorting every overlapping window repeats almost all its work.",
    "Time O((n - m + 1) m log m), space O(m).",
    `class Solution {
  private String sorted(String value) {
    char[] chars = value.toCharArray();
    java.util.Arrays.sort(chars);
    return new String(chars);
  }
  public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    String target = sorted(s1);
    for (int i = 0; i + s1.length() <= s2.length(); i++) {
      if (target.equals(sorted(s2.substring(i, i + s1.length())))) return true;
    }
    return false;
  }
}`,
    "Every candidate has fixed length s1.length. Maintain one 26-letter difference array by adding the entering character and removing the leaving one; a window is a permutation when all balances match.",
    "Time O(n), space O(1).",
    ["Count letters required by s1 and subtract the first window letters.", "Check whether all 26 balances are zero.", "Slide one position by restoring the outgoing character and subtracting the incoming character."],
    `class Solution {
  private boolean zero(int[] balance) {
    for (int value : balance) if (value != 0) return false;
    return true;
  }
  public boolean checkInclusion(String s1, String s2) {
    int m = s1.length();
    if (m > s2.length()) return false;
    int[] balance = new int[26];
    for (int i = 0; i < m; i++) {
      balance[s1.charAt(i) - 'a']++;
      balance[s2.charAt(i) - 'a']--;
    }
    if (zero(balance)) return true;
    for (int right = m; right < s2.length(); right++) {
      balance[s2.charAt(right - m) - 'a']++;
      balance[s2.charAt(right) - 'a']--;
      if (zero(balance)) return true;
    }
    return false;
  }
}`,
  ),
  "find-all-anagrams-in-a-string": P(
    "Return every starting index in s where the substring of length p.length is an anagram of p. Indices may be returned in any order.",
    [E('s = "cbaebabacd", p = "abc"', "[0,6]", "The windows cba and bac contain the same letters as abc."), E('s = "abab", p = "ab"', "[0,1,2]", "Each length-two window is an anagram."), E('s = "a", p = "ab"', "[]", "The source is shorter than the pattern.")],
    ["1 <= s.length, p.length <= 30000", "Both strings contain lowercase English letters."],
    "For every possible start, build a fresh 26-letter count for its window and compare it with p's count.",
    "Adjacent windows differ by only two characters, but rebuilding each frequency array costs O(p.length).",
    "Time O(nm), space O(1), where m is p.length.",
    `class Solution {
  public java.util.List<Integer> findAnagrams(String s, String p) {
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int[] target = new int[26];
    for (char c : p.toCharArray()) target[c - 'a']++;
    for (int start = 0; start + p.length() <= s.length(); start++) {
      int[] current = new int[26];
      for (int i = start; i < start + p.length(); i++) current[s.charAt(i) - 'a']++;
      if (java.util.Arrays.equals(target, current)) answer.add(start);
    }
    return answer;
  }
}`,
    "Maintain the frequency table for one fixed-length window. Add each entering character and remove the character that falls out; compare the constant-size arrays after every move.",
    "Time O(26n), which is O(n), and space O(1).",
    ["Build target counts and grow the current window one character at a time.", "When the window is longer than p, remove its leftmost character.", "At exactly p.length, record the left index when the two count arrays match."],
    `class Solution {
  public java.util.List<Integer> findAnagrams(String s, String p) {
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int[] target = new int[26];
    int[] window = new int[26];
    for (char c : p.toCharArray()) target[c - 'a']++;
    for (int right = 0; right < s.length(); right++) {
      window[s.charAt(right) - 'a']++;
      if (right >= p.length()) window[s.charAt(right - p.length()) - 'a']--;
      if (right + 1 >= p.length() && java.util.Arrays.equals(target, window)) answer.add(right - p.length() + 1);
    }
    return answer;
  }
}`,
  ),
  "minimum-window-substring": P(
    "Return the shortest substring of s containing every character of t with at least the multiplicity required by t. Return an empty string when no such window exists.",
    [E('s = "ADOBECODEBANC", t = "ABC"', '"BANC"', "BANC is the shortest window containing A, B, and C."), E('s = "a", t = "a"', '"a"', "The single character satisfies the requirement."), E('s = "a", t = "aa"', '""', "One a cannot supply two required copies.")],
    ["1 <= s.length, t.length <= 100000", "s and t contain uppercase and lowercase English letters.", "The answer is unique when it exists."],
    "Enumerate every substring and scan a frequency table to test whether it covers t, retaining the shortest valid one.",
    "There are quadratic substrings and validating each can repeat another linear amount of work.",
    "Time O(n cubed) in a direct implementation, space O(alphabet size).",
    `class Solution {
  private boolean covers(String value, int start, int end, int[] need) {
    int[] have = new int[128];
    for (int i = start; i <= end; i++) have[value.charAt(i)]++;
    for (int c = 0; c < need.length; c++) if (have[c] < need[c]) return false;
    return true;
  }
  public String minWindow(String s, String t) {
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;
    int bestStart = 0;
    int bestLength = Integer.MAX_VALUE;
    for (int left = 0; left < s.length(); left++) {
      for (int right = left; right < s.length(); right++) {
        if (right - left + 1 < bestLength && covers(s, left, right, need)) {
          bestStart = left;
          bestLength = right - left + 1;
        }
      }
    }
    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
  }
}`,
    "Expand a window while counting characters. A character reaches a useful match only while its count does not exceed t's requirement. Once all required copies are matched, shrink from the left to record the smallest valid window and expose the next missing requirement.",
    "Time O(n + m), space O(alphabet size).",
    ["Count t and set required to t.length.", "Expand right, decreasing required when the added copy was needed.", "While required is zero, update the best window and remove left characters until validity breaks."],
    `class Solution {
  public String minWindow(String s, String t) {
    if (t.length() > s.length()) return "";
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;
    int required = t.length();
    int left = 0;
    int bestStart = 0;
    int bestLength = Integer.MAX_VALUE;
    for (int right = 0; right < s.length(); right++) {
      char added = s.charAt(right);
      if (need[added] > 0) required--;
      need[added]--;
      while (required == 0) {
        if (right - left + 1 < bestLength) {
          bestStart = left;
          bestLength = right - left + 1;
        }
        char removed = s.charAt(left++);
        need[removed]++;
        if (need[removed] > 0) required++;
      }
    }
    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
  }
}`,
  ),
  "minimum-size-subarray-sum": P(
    "Given an array of positive integers and a positive target, return the shortest non-empty contiguous subarray whose sum is at least target, or zero when none exists.",
    [E("target = 7, nums = [2,3,1,2,4,3]", "2", "The subarray [4,3] reaches seven with length two."), E("target = 4, nums = [1,4,4]", "1", "Either single four is sufficient."), E("target = 11, nums = [1,1,1,1,1,1,1,1]", "0", "Even the full array is too small.")],
    ["1 <= target <= 1000000000", "1 <= nums.length <= 100000", "1 <= nums[i] <= 10000"],
    "Start at each index, add following values until the target is reached, and record that length.",
    "Each new start recomputes almost the same sums, yielding quadratic time.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int minSubArrayLen(int target, int[] nums) {
    int best = Integer.MAX_VALUE;
    for (int left = 0; left < nums.length; left++) {
      int sum = 0;
      for (int right = left; right < nums.length; right++) {
        sum += nums[right];
        if (sum >= target) {
          best = Math.min(best, right - left + 1);
          break;
        }
      }
    }
    return best == Integer.MAX_VALUE ? 0 : best;
  }
}`,
    "Because all values are positive, expanding right can only increase the sum and removing left can only decrease it. Expand once, and whenever the target is met, shrink repeatedly to find the shortest window ending at right.",
    "Time O(n), space O(1).",
    ["Add each right value to the running sum.", "While the sum reaches target, update the minimum length.", "Subtract the left value and advance left to test a shorter window."],
    `class Solution {
  public int minSubArrayLen(int target, int[] nums) {
    int left = 0;
    int sum = 0;
    int best = Integer.MAX_VALUE;
    for (int right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum >= target) {
        best = Math.min(best, right - left + 1);
        sum -= nums[left++];
      }
    }
    return best == Integer.MAX_VALUE ? 0 : best;
  }
}`,
  ),
  "maximum-average-subarray-i": P(
    "Return the greatest average among all contiguous subarrays of exactly length k.",
    [E("nums = [1,12,-5,-6,50,3], k = 4", "12.75", "The window [12,-5,-6,50] sums to 51."), E("nums = [5], k = 1", "5.0", "The only window contains five."), E("nums = [-1,-2,-3,-4], k = 2", "-1.5", "The first pair has the greatest average.")],
    ["1 <= k <= nums.length <= 100000", "-10000 <= nums[i] <= 10000", "Answers within 1e-5 are accepted."],
    "For every possible start, sum all k values from scratch and retain the largest sum.",
    "Consecutive windows share k - 1 elements, so recomputing them costs an unnecessary factor of k.",
    "Time O(nk), space O(1).",
    `class Solution {
  public double findMaxAverage(int[] nums, int k) {
    long best = Long.MIN_VALUE;
    for (int left = 0; left + k <= nums.length; left++) {
      long sum = 0;
      for (int i = left; i < left + k; i++) sum += nums[i];
      best = Math.max(best, sum);
    }
    return (double) best / k;
  }
}`,
    "Compute the first window sum once. Each one-position slide removes exactly the outgoing value and adds exactly the incoming value, so every later sum is obtained in constant time.",
    "Time O(n), space O(1).",
    ["Sum the first k values and initialize the best sum.", "For each later right index, add its value and subtract the value k positions behind.", "Update the best sum and divide it by k once at the end."],
    `class Solution {
  public double findMaxAverage(int[] nums, int k) {
    long sum = 0;
    for (int i = 0; i < k; i++) sum += nums[i];
    long best = sum;
    for (int right = k; right < nums.length; right++) {
      sum += nums[right] - nums[right - k];
      best = Math.max(best, sum);
    }
    return (double) best / k;
  }
}`,
  ),
  "sliding-window-maximum": P(
    "As a window of length k moves one position at a time across nums, return the maximum value in every window.",
    [E("nums = [1,3,-1,-3,5,3,6,7], k = 3", "[3,3,5,5,6,7]", "Each output is the maximum of one length-three window."), E("nums = [1], k = 1", "[1]", "The only value is the only maximum."), E("nums = [9,8,7,6], k = 2", "[9,8,7]", "Each descending window is led by its left value.")],
    ["1 <= nums.length <= 100000", "-10000 <= nums[i] <= 10000", "1 <= k <= nums.length"],
    "Scan all k elements inside every window and write its maximum.",
    "Overlapping windows rescan the same elements, taking O(k) time per output.",
    "Time O(nk), space O(1) excluding the answer.",
    `class Solution {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int[] answer = new int[nums.length - k + 1];
    for (int left = 0; left + k <= nums.length; left++) {
      int maximum = nums[left];
      for (int i = left + 1; i < left + k; i++) maximum = Math.max(maximum, nums[i]);
      answer[left] = maximum;
    }
    return answer;
  }
}`,
    "Keep indices in a deque with values decreasing from front to back. Remove expired indices from the front and smaller-or-equal values from the back; the front is then the current maximum.",
    "Time O(n), space O(k).",
    ["Discard the front index when it lies left of the current window.", "Discard back indices whose values cannot beat the entering value now or later.", "Append the current index and output the front after the first full window."],
    `class Solution {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int[] answer = new int[nums.length - k + 1];
    java.util.Deque<Integer> deque = new java.util.ArrayDeque<>();
    for (int right = 0; right < nums.length; right++) {
      while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.pollFirst();
      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) deque.pollLast();
      deque.offerLast(right);
      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];
    }
    return answer;
  }
}`,
  ),
  "fruit-into-baskets": P(
    "Fruit types are listed along a row of trees. Starting anywhere, collect one fruit from each consecutive tree while carrying at most two fruit types. Return the greatest number collectable.",
    [E("fruits = [1,2,1]", "3", "The full row uses two types."), E("fruits = [0,1,2,2]", "3", "The suffix [1,2,2] uses two types."), E("fruits = [1,2,3,2,2]", "4", "The suffix [2,3,2,2] is valid.")],
    ["1 <= fruits.length <= 100000", "0 <= fruits[i] < fruits.length"],
    "Start at every tree and extend until a third distinct fruit type appears, recording the longest valid segment.",
    "Each starting point rebuilds almost the same set of fruit types, causing quadratic work.",
    "Time O(n squared), space O(1) for at most three types.",
    `class Solution {
  public int totalFruit(int[] fruits) {
    int best = 0;
    for (int left = 0; left < fruits.length; left++) {
      java.util.Set<Integer> types = new java.util.HashSet<>();
      for (int right = left; right < fruits.length; right++) {
        types.add(fruits[right]);
        if (types.size() > 2) break;
        best = Math.max(best, right - left + 1);
      }
    }
    return best;
  }
}`,
    "Maintain counts for the current segment. Expand right, and whenever a third type appears, remove left fruits until only two types remain. Every tree enters and leaves once.",
    "Time O(n), space O(1) active types, bounded by three during adjustment.",
    ["Add the right fruit to the window count.", "While more than two types exist, decrement and possibly remove the left type.", "Update the largest valid window."],
    `class Solution {
  public int totalFruit(int[] fruits) {
    java.util.Map<Integer, Integer> count = new java.util.HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < fruits.length; right++) {
      count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);
      while (count.size() > 2) {
        int value = fruits[left++];
        count.put(value, count.get(value) - 1);
        if (count.get(value) == 0) count.remove(value);
      }
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
  ),
  "subarray-product-less-than-k": P(
    "Given positive integers nums and integer k, return how many contiguous subarrays have product strictly less than k.",
    [E("nums = [10,5,2,6], k = 100", "8", "The valid subarrays are [10], [5], [2], [6], [10,5], [5,2], [2,6], and [5,2,6]."), E("nums = [1,2,3], k = 0", "0", "Every positive product is at least one."), E("nums = [1,1,1], k = 2", "6", "Every non-empty contiguous subarray has product one.")],
    ["1 <= nums.length <= 30000", "1 <= nums[i] <= 1000", "0 <= k <= 1000000"],
    "Multiply every subarray from each starting index and count it until the product reaches k.",
    "Although positivity permits early stopping, many products are rebuilt from scratch, so the worst case remains quadratic.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int numSubarrayProductLessThanK(int[] nums, int k) {
    int answer = 0;
    for (int left = 0; left < nums.length; left++) {
      long product = 1;
      for (int right = left; right < nums.length; right++) {
        product *= nums[right];
        if (product >= k) break;
        answer++;
      }
    }
    return answer;
  }
}`,
    "With positive values, expanding can only increase the product. Shrink left until the product is below k; then every suffix ending at right and starting between left and right is valid, contributing right - left + 1 subarrays.",
    "Time O(n), space O(1).",
    ["Return zero immediately when k is at most one.", "Multiply in each right value and divide out left values while the product is too large.", "Add the number of valid starts for this right endpoint."],
    `class Solution {
  public int numSubarrayProductLessThanK(int[] nums, int k) {
    if (k <= 1) return 0;
    int left = 0;
    int answer = 0;
    long product = 1;
    for (int right = 0; right < nums.length; right++) {
      product *= nums[right];
      while (product >= k) product /= nums[left++];
      answer += right - left + 1;
    }
    return answer;
  }
}`,
  ),
  "max-consecutive-ones-iii": P(
    "In a binary array, change at most k zeroes to ones. Return the greatest length of a contiguous run of ones obtainable.",
    [E("nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2", "6", "Flipping two zeroes creates a run of six."), E("nums = [0,0,1,1,1,0,0], k = 0", "3", "Without flips, the middle run has length three."), E("nums = [0,0,0], k = 3", "3", "All zeroes can be flipped.")],
    ["1 <= nums.length <= 100000", "nums[i] is 0 or 1.", "0 <= k <= nums.length"],
    "Start at each index, extend right while counting zeroes, and stop after the count exceeds k.",
    "Every new start recounts zeroes from an overlapping suffix, causing quadratic work.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int longestOnes(int[] nums, int k) {
    int best = 0;
    for (int left = 0; left < nums.length; left++) {
      int zeroes = 0;
      for (int right = left; right < nums.length; right++) {
        if (nums[right] == 0) zeroes++;
        if (zeroes > k) break;
        best = Math.max(best, right - left + 1);
      }
    }
    return best;
  }
}`,
    "A window is feasible exactly when it contains at most k zeroes. Expand right, and if the allowance is exceeded, move left until the window is feasible again.",
    "Time O(n), space O(1).",
    ["Add the right value and increment the zero count when needed.", "While zeroes exceed k, move left and decrement when a zero leaves.", "Record the largest valid window."],
    `class Solution {
  public int longestOnes(int[] nums, int k) {
    int left = 0;
    int zeroes = 0;
    int best = 0;
    for (int right = 0; right < nums.length; right++) {
      if (nums[right] == 0) zeroes++;
      while (zeroes > k) if (nums[left++] == 0) zeroes--;
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
  ),
  "subarrays-with-k-different-integers": P(
    "Return the number of contiguous subarrays containing exactly k distinct integer values.",
    [E("nums = [1,2,1,2,3], k = 2", "7", "Seven subarrays contain exactly the types one and two or two and three."), E("nums = [1,2,1,3,4], k = 3", "3", "The valid subarrays are [1,2,1,3], [2,1,3], and [1,3,4]."), E("nums = [1,1,1], k = 1", "6", "Every non-empty subarray has one distinct value.")],
    ["1 <= nums.length <= 20000", "1 <= nums[i], k <= nums.length"],
    "Enumerate every subarray, add values to a set, count when its size is k, and stop when it exceeds k.",
    "Rebuilding distinct-value state for every start costs quadratic time.",
    "Time O(n squared), space O(k + 1).",
    `class Solution {
  public int subarraysWithKDistinct(int[] nums, int k) {
    int answer = 0;
    for (int left = 0; left < nums.length; left++) {
      java.util.Set<Integer> values = new java.util.HashSet<>();
      for (int right = left; right < nums.length; right++) {
        values.add(nums[right]);
        if (values.size() == k) answer++;
        if (values.size() > k) break;
      }
    }
    return answer;
  }
}`,
    "Exactly k equals the number of subarrays with at most k distinct values minus those with at most k - 1. Each at-most count uses a frequency window; every valid start between left and right contributes one subarray ending at right.",
    "Time O(n), space O(n) in the worst case.",
    ["Write a helper that counts subarrays with at most a given number of distinct values.", "Expand right and shrink until the distinct count fits.", "Return atMost(k) minus atMost(k - 1)."],
    `class Solution {
  private int atMost(int[] nums, int limit) {
    java.util.Map<Integer, Integer> count = new java.util.HashMap<>();
    int left = 0;
    int answer = 0;
    for (int right = 0; right < nums.length; right++) {
      count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);
      while (count.size() > limit) {
        int value = nums[left++];
        count.put(value, count.get(value) - 1);
        if (count.get(value) == 0) count.remove(value);
      }
      answer += right - left + 1;
    }
    return answer;
  }
  public int subarraysWithKDistinct(int[] nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
  }
}`,
  ),
  "longest-substring-with-at-most-k-distinct-characters": P(
    "Return the length of the longest contiguous substring containing at most k distinct characters.",
    [E('s = "eceba", k = 2', "3", "ece contains two distinct characters."), E('s = "aa", k = 1', "2", "The whole string contains one distinct character."), E('s = "abc", k = 0', "0", "No non-empty window may contain zero distinct characters.")],
    ["0 <= s.length <= 50000", "0 <= k <= 50", "s contains English letters."],
    "Start at each position and extend a set-backed substring until it contains more than k distinct characters.",
    "The character state for overlapping starts is repeatedly rebuilt, causing quadratic time.",
    "Time O(n squared), space O(k + 1).",
    `class Solution {
  public int lengthOfLongestSubstringKDistinct(String s, int k) {
    int best = 0;
    for (int left = 0; left < s.length(); left++) {
      java.util.Set<Character> values = new java.util.HashSet<>();
      for (int right = left; right < s.length(); right++) {
        values.add(s.charAt(right));
        if (values.size() > k) break;
        best = Math.max(best, right - left + 1);
      }
    }
    return best;
  }
}`,
    "Keep counts for a variable window. Expand right, and when more than k distinct characters are present, remove left characters until the limit is restored.",
    "Time O(n), space O(min(n, alphabet size)).",
    ["Count the entering right character.", "Shrink left while the map contains more than k keys, deleting zero counts.", "Update the longest valid length."],
    `class Solution {
  public int lengthOfLongestSubstringKDistinct(String s, int k) {
    if (k == 0) return 0;
    java.util.Map<Character, Integer> count = new java.util.HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
      char added = s.charAt(right);
      count.put(added, count.getOrDefault(added, 0) + 1);
      while (count.size() > k) {
        char removed = s.charAt(left++);
        count.put(removed, count.get(removed) - 1);
        if (count.get(removed) == 0) count.remove(removed);
      }
      best = Math.max(best, right - left + 1);
    }
    return best;
  }
}`,
  ),
  "minimum-consecutive-cards-to-pick-up": P(
    "Choose a contiguous segment of cards that contains at least two cards with the same value. Return the minimum segment length, or -1 if no duplicate value exists.",
    [E("cards = [3,4,2,3,4,7]", "4", "The segment [3,4,2,3] has length four; the two fours span five."), E("cards = [1,0,5,3]", "-1", "Every card value is unique."), E("cards = [7,7]", "2", "Adjacent equal cards form the shortest possible segment.")],
    ["1 <= cards.length <= 100000", "0 <= cards[i] <= 1000000"],
    "Compare every pair of positions holding equal values and retain their distance plus one.",
    "The pair comparison takes quadratic time even though only the latest occurrence can make the shortest segment ending at an index.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int minimumCardPickup(int[] cards) {
    int best = Integer.MAX_VALUE;
    for (int i = 0; i < cards.length; i++) {
      for (int j = i + 1; j < cards.length; j++) if (cards[i] == cards[j]) best = Math.min(best, j - i + 1);
    }
    return best == Integer.MAX_VALUE ? -1 : best;
  }
}`,
    "Store the latest index of every value. When the same value appears again, the closest prior copy is its latest one, so update the answer with their distance plus one and replace the saved index.",
    "Time O(n), space O(n).",
    ["Map each card value to its most recent index.", "At a repeated value, compute current index minus prior index plus one.", "Update the minimum and save the current index."],
    `class Solution {
  public int minimumCardPickup(int[] cards) {
    java.util.Map<Integer, Integer> last = new java.util.HashMap<>();
    int best = Integer.MAX_VALUE;
    for (int i = 0; i < cards.length; i++) {
      if (last.containsKey(cards[i])) best = Math.min(best, i - last.get(cards[i]) + 1);
      last.put(cards[i], i);
    }
    return best == Integer.MAX_VALUE ? -1 : best;
  }
}`,
  ),
  "grumpy-bookstore-owner": P(
    "Customers arrive once per minute. Normally, customers[i] are satisfied only when grumpy[i] is zero. The owner can suppress grumpiness for one consecutive block of minutes. Return the maximum number of satisfied customers.",
    [E("customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3", "16", "Using the technique over minutes 5 through 7 recovers the best additional customers."), E("customers = [1], grumpy = [0], minutes = 1", "1", "The customer is already satisfied."), E("customers = [4,10,10], grumpy = [1,1,0], minutes = 2", "24", "Suppressing the first two grumpy minutes satisfies everyone.")],
    ["customers.length = grumpy.length", "1 <= customers.length <= 20000", "0 <= customers[i] <= 1000", "grumpy[i] is 0 or 1.", "1 <= minutes <= customers.length"],
    "Try every possible suppression block and rescan all minutes to total customers satisfied under that choice.",
    "Each candidate block recomputes the same always-satisfied customers and most of the same recovered customers.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
    int best = 0;
    for (int start = 0; start + minutes <= customers.length; start++) {
      int total = 0;
      for (int i = 0; i < customers.length; i++) {
        if (grumpy[i] == 0 || i >= start && i < start + minutes) total += customers[i];
      }
      best = Math.max(best, total);
    }
    return best;
  }
}`,
    "Separate customers who are always satisfied from customers recoverable only during suppression. Use a fixed window to find the greatest recoverable sum and add it to the baseline.",
    "Time O(n), space O(1).",
    ["Sum customers from every naturally calm minute.", "Slide a length-minutes window over grumpy minutes, adding only customers that would otherwise be lost.", "Return the baseline plus the greatest window gain."],
    `class Solution {
  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
    int baseline = 0;
    int gain = 0;
    int bestGain = 0;
    for (int i = 0; i < customers.length; i++) {
      if (grumpy[i] == 0) baseline += customers[i];
      else gain += customers[i];
      if (i >= minutes && grumpy[i - minutes] == 1) gain -= customers[i - minutes];
      bestGain = Math.max(bestGain, gain);
    }
    return baseline + bestGain;
  }
}`,
  ),
  "maximum-number-of-vowels-in-a-substring-of-given-length": P(
    "Return the greatest number of vowels found in any substring of s having exactly length k.",
    [E('s = "abciiidef", k = 3', "3", "The substring iii contains three vowels."), E('s = "aeiou", k = 2', "2", "Every adjacent pair is made of vowels."), E('s = "leetcode", k = 3', "2", "The window lee contains two vowels.")],
    ["1 <= s.length <= 100000", "s contains lowercase English letters.", "1 <= k <= s.length"],
    "For each length-k substring, scan its characters and count the vowels from scratch.",
    "Adjacent windows share k - 1 characters, so recounting them costs O(k) per window.",
    "Time O(nk), space O(1).",
    `class Solution {
  private boolean vowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }
  public int maxVowels(String s, int k) {
    int best = 0;
    for (int left = 0; left + k <= s.length(); left++) {
      int count = 0;
      for (int i = left; i < left + k; i++) if (vowel(s.charAt(i))) count++;
      best = Math.max(best, count);
    }
    return best;
  }
}`,
    "Count vowels in the first fixed window. For every slide, add one if the entering character is a vowel and subtract one if the outgoing character is a vowel.",
    "Time O(n), space O(1).",
    ["Count vowels among the first k characters.", "Slide right by updating for exactly one outgoing and one incoming character.", "Track the largest count, returning early if it reaches k."],
    `class Solution {
  private boolean vowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }
  public int maxVowels(String s, int k) {
    int count = 0;
    for (int i = 0; i < k; i++) if (vowel(s.charAt(i))) count++;
    int best = count;
    for (int right = k; right < s.length(); right++) {
      if (vowel(s.charAt(right))) count++;
      if (vowel(s.charAt(right - k))) count--;
      best = Math.max(best, count);
    }
    return best;
  }
}`,
  ),
  "substring-with-concatenation-of-all-words": P(
    "All words have equal length. Return every index in s where a substring is formed by concatenating every word exactly once in any order, with no gap between words.",
    [E('s = "barfoothefoobarman", words = ["foo","bar"]', "[0,9]", "barfoo and foobar each use both words once."), E('s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]', "[]", "No window has the required multiplicities."), E('s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]', "[6,9,12]", "Each matching block contains the three words in some order.")],
    ["1 <= s.length <= 10000", "1 <= words.length <= 5000", "1 <= words[i].length <= 30", "All words have the same length and contain lowercase letters."],
    "At every character index, split the candidate block into word-sized pieces, count them in a new map, and compare against the required multiplicities.",
    "Most starting indices cannot align with an existing word, and every overlapping block rebuilds its full frequency map.",
    "Time O(n times word count times word length), space O(word count).",
    `class Solution {
  public java.util.List<Integer> findSubstring(String s, String[] words) {
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int width = words[0].length();
    int total = width * words.length;
    java.util.Map<String, Integer> need = new java.util.HashMap<>();
    for (String word : words) need.put(word, need.getOrDefault(word, 0) + 1);
    for (int start = 0; start + total <= s.length(); start++) {
      java.util.Map<String, Integer> used = new java.util.HashMap<>();
      int count = 0;
      while (count < words.length) {
        String word = s.substring(start + count * width, start + (count + 1) * width);
        used.put(word, used.getOrDefault(word, 0) + 1);
        if (used.get(word) > need.getOrDefault(word, 0)) break;
        count++;
      }
      if (count == words.length) answer.add(start);
    }
    return answer;
  }
}`,
    "Process each possible alignment modulo the word length. Within one alignment, add complete words to a sliding frequency map; discard through the left boundary when an unknown or overused word appears. A window holding exactly words.length valid pieces is an answer.",
    "Time O(n times word length) for substring materialization in Java, space O(word count).",
    ["Build the required word-count map and process each offset from zero to wordLength - 1.", "Add the next aligned word; reset on an unknown word and shrink while its count is too high.", "When the window contains all words, record left and slide one word to continue."],
    `class Solution {
  public java.util.List<Integer> findSubstring(String s, String[] words) {
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int width = words[0].length();
    java.util.Map<String, Integer> need = new java.util.HashMap<>();
    for (String word : words) need.put(word, need.getOrDefault(word, 0) + 1);
    for (int offset = 0; offset < width; offset++) {
      java.util.Map<String, Integer> used = new java.util.HashMap<>();
      int left = offset;
      int count = 0;
      for (int right = offset; right + width <= s.length(); right += width) {
        String word = s.substring(right, right + width);
        if (!need.containsKey(word)) {
          used.clear();
          count = 0;
          left = right + width;
          continue;
        }
        used.put(word, used.getOrDefault(word, 0) + 1);
        count++;
        while (used.get(word) > need.get(word)) {
          String removed = s.substring(left, left + width);
          used.put(removed, used.get(removed) - 1);
          left += width;
          count--;
        }
        if (count == words.length) {
          answer.add(left);
          String removed = s.substring(left, left + width);
          used.put(removed, used.get(removed) - 1);
          left += width;
          count--;
        }
      }
    }
    return answer;
  }
}`,
  ),
  "merge-intervals": P(
    "Merge every pair of overlapping closed intervals and return the disjoint intervals that cover exactly the same values. Output order does not matter.",
    [E("intervals = [[1,3],[2,6],[8,10],[15,18]]", "[[1,6],[8,10],[15,18]]", "The first two intervals overlap and become [1,6]."), E("intervals = [[1,4],[4,5]]", "[[1,5]]", "Touching closed intervals overlap at four."), E("intervals = [[1,4],[0,4]]", "[[0,4]]", "One merged interval covers both.")],
    ["1 <= intervals.length <= 10000", "intervals[i].length = 2", "0 <= start <= end <= 10000"],
    "Repeatedly scan all current pairs; whenever two overlap, replace them with their union and restart until no merge is possible.",
    "Repeated pair scans and middle removals can take cubic time and make the result order unpredictable.",
    "Time O(n cubed), space O(n).",
    `class Solution {
  public int[][] merge(int[][] intervals) {
    java.util.List<int[]> values = new java.util.ArrayList<>();
    for (int[] interval : intervals) values.add(interval.clone());
    boolean changed = true;
    while (changed) {
      changed = false;
      for (int i = 0; i < values.size() && !changed; i++) {
        for (int j = i + 1; j < values.size(); j++) {
          int[] a = values.get(i);
          int[] b = values.get(j);
          if (a[0] <= b[1] && b[0] <= a[1]) {
            values.set(i, new int[]{Math.min(a[0], b[0]), Math.max(a[1], b[1])});
            values.remove(j);
            changed = true;
            break;
          }
        }
      }
    }
    return values.toArray(new int[values.size()][]);
  }
}`,
    "Sort by start. The next interval either begins after the current merged end and starts a new result, or overlaps and extends that end. Sorting makes every possible overlap adjacent to the current merged range.",
    "Time O(n log n), space O(n) for the output.",
    ["Sort intervals by starting point.", "Compare each interval with the last merged interval.", "Append a gap; otherwise extend the last end to the larger endpoint."],
    `class Solution {
  public int[][] merge(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[0]));
    java.util.List<int[]> answer = new java.util.ArrayList<>();
    for (int[] interval : intervals) {
      if (answer.isEmpty() || answer.get(answer.size() - 1)[1] < interval[0]) answer.add(interval.clone());
      else answer.get(answer.size() - 1)[1] = Math.max(answer.get(answer.size() - 1)[1], interval[1]);
    }
    return answer.toArray(new int[answer.size()][]);
  }
}`,
  ),
  "insert-interval": P(
    "A list of pairwise disjoint intervals is sorted by start. Insert one new interval, merging every overlap, and return a sorted pairwise-disjoint result.",
    [E("intervals = [[1,3],[6,9]], newInterval = [2,5]", "[[1,5],[6,9]]", "The new interval overlaps [1,3]."), E("intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", "[[1,2],[3,10],[12,16]]", "The new interval connects three existing intervals."), E("intervals = [], newInterval = [5,7]", "[[5,7]]", "The new interval becomes the complete result.")],
    ["0 <= intervals.length <= 10000", "0 <= start <= end <= 100000", "Existing intervals are sorted and non-overlapping."],
    "Append the new interval to all existing intervals, sort the combined list, and run the general merge-intervals algorithm.",
    "Sorting discards the useful guarantee that the existing list is already ordered and disjoint.",
    "Time O(n log n), space O(n).",
    `class Solution {
  public int[][] insert(int[][] intervals, int[] newInterval) {
    int[][] all = java.util.Arrays.copyOf(intervals, intervals.length + 1);
    all[intervals.length] = newInterval;
    java.util.Arrays.sort(all, java.util.Comparator.comparingInt(a -> a[0]));
    java.util.List<int[]> answer = new java.util.ArrayList<>();
    for (int[] interval : all) {
      if (answer.isEmpty() || answer.get(answer.size() - 1)[1] < interval[0]) answer.add(interval.clone());
      else answer.get(answer.size() - 1)[1] = Math.max(answer.get(answer.size() - 1)[1], interval[1]);
    }
    return answer.toArray(new int[answer.size()][]);
  }
}`,
    "Copy intervals ending before the new interval. Merge every interval whose start is at most the growing new end. Append that merged interval, then copy the intervals beginning afterward.",
    "Time O(n), space O(n) for the output.",
    ["Append all intervals strictly before newInterval.", "Expand newInterval across every overlap.", "Append the merged interval and all remaining intervals."],
    `class Solution {
  public int[][] insert(int[][] intervals, int[] newInterval) {
    java.util.List<int[]> answer = new java.util.ArrayList<>();
    int index = 0;
    while (index < intervals.length && intervals[index][1] < newInterval[0]) answer.add(intervals[index++]);
    while (index < intervals.length && intervals[index][0] <= newInterval[1]) {
      newInterval[0] = Math.min(newInterval[0], intervals[index][0]);
      newInterval[1] = Math.max(newInterval[1], intervals[index][1]);
      index++;
    }
    answer.add(newInterval);
    while (index < intervals.length) answer.add(intervals[index++]);
    return answer.toArray(new int[answer.size()][]);
  }
}`,
  ),
  "non-overlapping-intervals": P(
    "Return the minimum number of intervals that must be removed so all remaining intervals are pairwise non-overlapping. Intervals that only touch at an endpoint do not overlap.",
    [E("intervals = [[1,2],[2,3],[3,4],[1,3]]", "1", "Removing [1,3] leaves three compatible intervals."), E("intervals = [[1,2],[1,2],[1,2]]", "2", "At most one identical interval can remain."), E("intervals = [[1,2],[2,3]]", "0", "Touching at two is allowed.")],
    ["1 <= intervals.length <= 100000", "intervals[i].length = 2", "-50000 <= start < end <= 50000"],
    "Sort by start and recursively try keeping or removing each interval, maximizing how many compatible intervals remain.",
    "The choice tree has two branches per interval and becomes exponential.",
    "Time O(2 to the n), space O(n) recursion plus sorting.",
    `class Solution {
  private int keep(int[][] intervals, int index, int end) {
    if (index == intervals.length) return 0;
    int skip = keep(intervals, index + 1, end);
    int take = 0;
    if (intervals[index][0] >= end) take = 1 + keep(intervals, index + 1, intervals[index][1]);
    return Math.max(skip, take);
  }
  public int eraseOverlapIntervals(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[0]));
    return intervals.length - keep(intervals, 0, Integer.MIN_VALUE);
  }
}`,
    "Sort by ending point and keep the compatible interval that ends earliest. This leaves at least as much room as any later-ending alternative for every future interval, so each overlap can discard the current later option greedily.",
    "Time O(n log n), space O(log n) for sorting.",
    ["Sort intervals by end.", "Keep the first end as the current boundary.", "For each later interval, count it as kept only when its start reaches the boundary; removals equal total minus kept."],
    `class Solution {
  public int eraseOverlapIntervals(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[1]));
    int kept = 1;
    int end = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] >= end) {
        kept++;
        end = intervals[i][1];
      }
    }
    return intervals.length - kept;
  }
}`,
  ),
  "meeting-rooms": P(
    "Given meeting time intervals, return whether one person can attend every meeting without any overlap. A meeting may begin exactly when another ends.",
    [E("intervals = [[0,30],[5,10],[15,20]]", "false", "The long meeting overlaps both shorter meetings."), E("intervals = [[7,10],[2,4]]", "true", "The meetings occupy disjoint ranges."), E("intervals = [[1,2],[2,3]]", "true", "Endpoint touching does not create a conflict.")],
    ["0 <= intervals.length <= 10000", "0 <= start < end <= 1000000"],
    "Compare every pair and return false when their interiors overlap.",
    "It checks a quadratic number of pairs even though sorting makes any conflict appear between neighbors.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public boolean canAttendMeetings(int[][] intervals) {
    for (int i = 0; i < intervals.length; i++) {
      for (int j = i + 1; j < intervals.length; j++) {
        if (intervals[i][0] < intervals[j][1] && intervals[j][0] < intervals[i][1]) return false;
      }
    }
    return true;
  }
}`,
    "Sort meetings by start time. If a meeting starts before the immediately previous meeting ends, attendance is impossible; otherwise every earlier meeting ends no later.",
    "Time O(n log n), space O(log n) for sorting.",
    ["Sort by starting time.", "Compare each meeting's start with the preceding end.", "Return false on the first overlap and true if none appears."],
    `class Solution {
  public boolean canAttendMeetings(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[0]));
    for (int i = 1; i < intervals.length; i++) if (intervals[i][0] < intervals[i - 1][1]) return false;
    return true;
  }
}`,
  ),
  "meeting-rooms-ii": P(
    "Return the minimum number of rooms needed so every meeting interval can take place. A room becomes available when a meeting ends.",
    [E("intervals = [[0,30],[5,10],[15,20]]", "2", "At most two meetings run simultaneously."), E("intervals = [[7,10],[2,4]]", "1", "The meetings do not overlap."), E("intervals = [[1,5],[2,6],[3,7]]", "3", "All three meetings overlap between times three and five.")],
    ["1 <= intervals.length <= 10000", "0 <= start < end <= 1000000"],
    "Sort by start and scan a list of room end times to find any reusable room for each meeting; otherwise add a room.",
    "Searching every existing room for every meeting can take quadratic time.",
    "Time O(n squared), space O(n).",
    `class Solution {
  public int minMeetingRooms(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[0]));
    java.util.List<Integer> ends = new java.util.ArrayList<>();
    for (int[] interval : intervals) {
      int room = -1;
      for (int i = 0; i < ends.size(); i++) {
        if (ends.get(i) <= interval[0]) {
          room = i;
          break;
        }
      }
      if (room < 0) ends.add(interval[1]);
      else ends.set(room, interval[1]);
    }
    return ends.size();
  }
}`,
    "After sorting starts, only the earliest room end determines whether any room is reusable. Store active end times in a min-heap; remove the earliest when it ends by the new start, then add the new end. Heap size tracks rooms.",
    "Time O(n log n), space O(n).",
    ["Sort meetings by start.", "Before adding a meeting, reuse the heap's earliest-ending room when available.", "Push the new end and retain the largest heap size."],
    `class Solution {
  public int minMeetingRooms(int[][] intervals) {
    java.util.Arrays.sort(intervals, java.util.Comparator.comparingInt(a -> a[0]));
    java.util.PriorityQueue<Integer> ends = new java.util.PriorityQueue<>();
    int rooms = 0;
    for (int[] interval : intervals) {
      if (!ends.isEmpty() && ends.peek() <= interval[0]) ends.poll();
      ends.offer(interval[1]);
      rooms = Math.max(rooms, ends.size());
    }
    return rooms;
  }
}`,
  ),
  "minimum-number-of-arrows-to-burst-balloons": P(
    "Each balloon occupies a closed horizontal interval. A vertical arrow at x bursts every balloon whose interval contains x. Return the fewest arrows needed to burst all balloons.",
    [E("points = [[10,16],[2,8],[1,6],[7,12]]", "2", "One arrow can hit the first overlapping group and another hits the second."), E("points = [[1,2],[3,4],[5,6],[7,8]]", "4", "No two intervals overlap."), E("points = [[1,2],[2,3],[3,4],[4,5]]", "2", "Arrows at two and four each hit two balloons.")],
    ["1 <= points.length <= 100000", "points[i].length = 2", "-2147483648 <= start < end <= 2147483647"],
    "While unburst balloons remain, scan for the smallest end among them, shoot there, and rescan all balloons to mark every interval containing that point.",
    "The greedy choice is correct, but repeatedly searching and marking requires quadratic time.",
    "Time O(n squared), space O(n).",
    `class Solution {
  public int findMinArrowShots(int[][] points) {
    boolean[] burst = new boolean[points.length];
    int remaining = points.length;
    int arrows = 0;
    while (remaining > 0) {
      long position = Long.MAX_VALUE;
      for (int i = 0; i < points.length; i++) if (!burst[i]) position = Math.min(position, points[i][1]);
      for (int i = 0; i < points.length; i++) {
        if (!burst[i] && points[i][0] <= position && position <= points[i][1]) {
          burst[i] = true;
          remaining--;
        }
      }
      arrows++;
    }
    return arrows;
  }
}`,
    "Sort by end and shoot the first arrow at the earliest end. It hits every later balloon starting by that point; the first balloon starting afterward forces a new arrow at its end. Choosing the earliest end preserves maximum reach for future overlaps.",
    "Time O(n log n), space O(log n) for sorting.",
    ["Sort balloons by right endpoint using a safe comparison.", "Place an arrow at the first end.", "Whenever a start lies beyond the current arrow, count a new arrow and move it to that balloon's end."],
    `class Solution {
  public int findMinArrowShots(int[][] points) {
    java.util.Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
    int arrows = 1;
    long position = points[0][1];
    for (int i = 1; i < points.length; i++) {
      if (points[i][0] > position) {
        arrows++;
        position = points[i][1];
      }
    }
    return arrows;
  }
}`,
  ),
  "car-pooling": P(
    "A vehicle with fixed capacity drives only east. Each trip gives passengers, pickup location, and drop-off location. Return whether all trips can be completed without exceeding capacity at any point; passengers leave at the drop-off before pickups there.",
    [E("trips = [[2,1,5],[3,3,7]], capacity = 4", "false", "Five passengers would be onboard from location three to five."), E("trips = [[2,1,5],[3,3,7]], capacity = 5", "true", "The peak load equals capacity."), E("trips = [[2,1,5],[3,5,7]], capacity = 3", "true", "The first passengers leave where the second group boards.")],
    ["1 <= trips.length <= 1000", "trips[i].length = 3", "1 <= passengers <= 100", "0 <= from < to <= 1000", "1 <= capacity <= 100000"],
    "At every integer location, scan all trips and sum passengers whose half-open travel range covers that location.",
    "Every trip is reconsidered at every location, repeating work instead of recording only where the load changes.",
    "Time O(trips times 1001), space O(1).",
    `class Solution {
  public boolean carPooling(int[][] trips, int capacity) {
    for (int location = 0; location <= 1000; location++) {
      int passengers = 0;
      for (int[] trip : trips) if (trip[1] <= location && location < trip[2]) passengers += trip[0];
      if (passengers > capacity) return false;
    }
    return true;
  }
}`,
    "Use a difference array: add passengers at pickup and subtract them at drop-off. A prefix sum reconstructs the onboard count in travel order, naturally processing drop-offs and pickups at the same location together.",
    "Time O(trips + 1001), space O(1001).",
    ["Record each trip's positive change at pickup and negative change at drop-off.", "Prefix-sum the changes by location.", "Return false if any running load exceeds capacity."],
    `class Solution {
  public boolean carPooling(int[][] trips, int capacity) {
    int[] change = new int[1001];
    for (int[] trip : trips) {
      change[trip[1]] += trip[0];
      change[trip[2]] -= trip[0];
    }
    int passengers = 0;
    for (int value : change) {
      passengers += value;
      if (passengers > capacity) return false;
    }
    return true;
  }
}`,
  ),
  "employee-free-time": P(
    "Each employee has a sorted list of non-overlapping working intervals. Return the finite positive-length intervals during which every employee is free.",
    [E("schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]", "[[3,4]]", "All employees are free after the combined busy block ends at three and before the next starts at four."), E("schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]", "[[5,6],[7,9]]", "Merging all busy time exposes two common gaps."), E("schedule = [[[1,2]],[[2,3]]]", "[]", "The busy intervals touch, leaving no positive-length common gap.")],
    ["1 <= number of employees and total intervals <= 50000", "0 <= start < end <= 100000000", "Each employee's schedule is sorted and internally non-overlapping."],
    "Flatten all busy intervals into one list, sort it by start, merge it, and output every positive gap between consecutive merged ranges.",
    "Sorting all N intervals costs O(N log N) even though each of the k employee lists is already sorted.",
    "Time O(N log N), space O(N).",
    `class Solution {
  public java.util.List<Interval> employeeFreeTime(java.util.List<java.util.List<Interval>> schedule) {
    java.util.List<Interval> busy = new java.util.ArrayList<>();
    for (java.util.List<Interval> employee : schedule) busy.addAll(employee);
    busy.sort(java.util.Comparator.comparingInt(a -> a.start));
    java.util.List<Interval> answer = new java.util.ArrayList<>();
    int end = busy.get(0).end;
    for (int i = 1; i < busy.size(); i++) {
      Interval current = busy.get(i);
      if (current.start > end) answer.add(new Interval(end, current.start));
      end = Math.max(end, current.end);
    }
    return answer;
  }
}`,
    "Perform a k-way merge with a min-heap containing the next busy interval from each employee. As intervals arrive in global start order, compare each start with the merged busy end to discover a free gap, then push that employee's following interval.",
    "Time O(N log k), space O(k), where k is the employee count.",
    ["Seed a min-heap with each employee's first interval and its list position.", "Pop the earliest start, output a gap when it begins after the current merged end, and extend that end.", "Push the next interval from the same employee and continue."],
    `class Solution {
  private static class Entry {
    int employee;
    int index;
    Interval interval;
    Entry(int employee, int index, Interval interval) {
      this.employee = employee;
      this.index = index;
      this.interval = interval;
    }
  }
  public java.util.List<Interval> employeeFreeTime(java.util.List<java.util.List<Interval>> schedule) {
    java.util.PriorityQueue<Entry> heap = new java.util.PriorityQueue<>((a, b) -> Integer.compare(a.interval.start, b.interval.start));
    for (int employee = 0; employee < schedule.size(); employee++) {
      if (!schedule.get(employee).isEmpty()) heap.offer(new Entry(employee, 0, schedule.get(employee).get(0)));
    }
    java.util.List<Interval> answer = new java.util.ArrayList<>();
    int end = heap.peek().interval.end;
    while (!heap.isEmpty()) {
      Entry entry = heap.poll();
      if (entry.interval.start > end) answer.add(new Interval(end, entry.interval.start));
      end = Math.max(end, entry.interval.end);
      int next = entry.index + 1;
      if (next < schedule.get(entry.employee).size()) heap.offer(new Entry(entry.employee, next, schedule.get(entry.employee).get(next)));
    }
    return answer;
  }
}`,
  ),
  "jump-game": P(
    "Each array value is the maximum jump length from that index. Starting at index zero, return whether the final index is reachable.",
    [E("nums = [2,3,1,1,4]", "true", "Jump from zero to one, then from one to the end."), E("nums = [3,2,1,0,4]", "false", "Every path becomes trapped at index three."), E("nums = [0]", "true", "The starting index is already the destination.")],
    ["1 <= nums.length <= 10000", "0 <= nums[i] <= 100000"],
    "Recursively try every legal next jump from each position until one reaches the end or all choices fail.",
    "Different paths revisit the same positions, so the recursion can grow exponentially.",
    "Time O(2 to the n) in the worst case, space O(n) recursion.",
    `class Solution {
  private boolean reach(int[] nums, int index) {
    if (index >= nums.length - 1) return true;
    int end = Math.min(nums.length - 1, index + nums[index]);
    for (int next = index + 1; next <= end; next++) if (reach(nums, next)) return true;
    return false;
  }
  public boolean canJump(int[] nums) {
    return reach(nums, 0);
  }
}`,
    "Scan reachable indices and maintain the farthest position reachable from any of them. If the scan index ever lies beyond that frontier, it is unreachable; if the frontier reaches the end, success is guaranteed.",
    "Time O(n), space O(1).",
    ["Set farthest to zero.", "For each index not beyond farthest, extend farthest with index + nums[index].", "Return true once farthest reaches the last index, or false when an index is outside it."],
    `class Solution {
  public boolean canJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i <= farthest && i < nums.length; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      if (farthest >= nums.length - 1) return true;
    }
    return false;
  }
}`,
  ),
  "jump-game-ii": P(
    "Each array value is the maximum jump length from that index. Starting at zero, return the minimum number of jumps needed to reach the final index. The end is guaranteed reachable.",
    [E("nums = [2,3,1,1,4]", "2", "Jump from index zero to one, then to four."), E("nums = [2,3,0,1,4]", "2", "The same two-jump route through index one works."), E("nums = [0]", "0", "No jump is needed when already at the end.")],
    ["1 <= nums.length <= 10000", "0 <= nums[i] <= 1000", "The final index is reachable."],
    "Use dynamic programming where dp[i] is the minimum jumps to i, relaxing every destination reachable from each index.",
    "Trying every outgoing jump can require quadratic time and stores a value for every index.",
    "Time O(n squared), space O(n).",
    `class Solution {
  public int jump(int[] nums) {
    int[] jumps = new int[nums.length];
    java.util.Arrays.fill(jumps, Integer.MAX_VALUE);
    jumps[0] = 0;
    for (int i = 0; i < nums.length; i++) {
      int end = Math.min(nums.length - 1, i + nums[i]);
      for (int next = i + 1; next <= end; next++) jumps[next] = Math.min(jumps[next], jumps[i] + 1);
    }
    return jumps[nums.length - 1];
  }
}`,
    "Treat all indices reachable with the current jump count as one breadth-first layer. While scanning that layer, compute the farthest next-layer endpoint. Reaching the current endpoint commits one jump and advances the endpoint to that farthest reach.",
    "Time O(n), space O(1).",
    ["Track the end of the current jump layer and the farthest reachable next endpoint.", "Scan indices before the destination, extending farthest.", "When the scan reaches the current end, increment jumps and promote farthest to the new end."],
    `class Solution {
  public int jump(int[] nums) {
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      if (i == currentEnd) {
        jumps++;
        currentEnd = farthest;
      }
    }
    return jumps;
  }
}`,
  ),
  "gas-station": P(
    "Stations form a circle. At station i, receive gas[i] fuel and spend cost[i] to reach the next station. Return a starting index that permits one complete clockwise circuit with an empty initial tank, or -1 if impossible. A valid start is unique.",
    [E("gas = [1,2,3,4,5], cost = [3,4,5,1,2]", "3", "Starting at index three keeps the tank nonnegative around the circle."), E("gas = [2,3,4], cost = [3,4,3]", "-1", "Total fuel is less than total travel cost."), E("gas = [5], cost = [4]", "0", "The only station provides enough fuel.")],
    ["gas.length = cost.length", "1 <= gas.length <= 100000", "0 <= gas[i], cost[i] <= 10000", "A solution is unique when one exists."],
    "Simulate a full circuit from every station, abandoning a start as soon as its tank becomes negative.",
    "The same failing road segments are traversed from many starts, producing quadratic work.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public int canCompleteCircuit(int[] gas, int[] cost) {
    for (int start = 0; start < gas.length; start++) {
      int tank = 0;
      int steps = 0;
      while (steps < gas.length) {
        int station = (start + steps) % gas.length;
        tank += gas[station] - cost[station];
        if (tank < 0) break;
        steps++;
      }
      if (steps == gas.length) return start;
    }
    return -1;
  }
}`,
    "If total gas is below total cost, no start works. During one scan, when the running tank becomes negative at i, no station from the current candidate through i can reach i + 1, so the next candidate is i + 1 and the tank resets.",
    "Time O(n), space O(1).",
    ["Accumulate both the global fuel balance and the candidate's running tank.", "When the tank becomes negative, reset it and set the next station as candidate.", "Return the candidate only if the global balance is nonnegative."],
    `class Solution {
  public int canCompleteCircuit(int[] gas, int[] cost) {
    int total = 0;
    int tank = 0;
    int start = 0;
    for (int i = 0; i < gas.length; i++) {
      int balance = gas[i] - cost[i];
      total += balance;
      tank += balance;
      if (tank < 0) {
        start = i + 1;
        tank = 0;
      }
    }
    return total < 0 ? -1 : start;
  }
}`,
  ),
  "partition-labels": P(
    "Partition a string into as many contiguous parts as possible so every letter appears in at most one part. Return the lengths of the parts.",
    [E('s = "ababcbacadefegdehijhklij"', "[9,7,8]", "Every occurrence of each letter stays inside exactly one of the three parts."), E('s = "eccbbbbdec"', "[10]", "The occurrences connect the entire string into one part."), E('s = "abc"', "[1,1,1]", "Each unique character may form its own part.")],
    ["1 <= s.length <= 500", "s contains lowercase English letters."],
    "At each position, scan the rest of the string to find that character's final occurrence; extend the current partition end and close it when the scan index reaches that end.",
    "Searching for a last occurrence at every position repeats suffix scans and takes quadratic time.",
    "Time O(n squared), space O(1).",
    `class Solution {
  public java.util.List<Integer> partitionLabels(String s) {
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int start = 0;
    int end = 0;
    for (int i = 0; i < s.length(); i++) {
      int last = i;
      for (int j = i; j < s.length(); j++) if (s.charAt(j) == s.charAt(i)) last = j;
      end = Math.max(end, last);
      if (i == end) {
        answer.add(end - start + 1);
        start = i + 1;
      }
    }
    return answer;
  }
}`,
    "Precompute the final index of each letter. While scanning a partition, extend its required end to the farthest final occurrence of any letter seen. When the current index reaches that end, every letter in the part is complete and the earliest possible cut maximizes part count.",
    "Time O(n), space O(1) for 26 last positions.",
    ["Record the last index of every letter.", "Scan while expanding the current partition end to the last position of each encountered letter.", "When index equals end, append the partition length and begin the next part."],
    `class Solution {
  public java.util.List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
    java.util.List<Integer> answer = new java.util.ArrayList<>();
    int start = 0;
    int end = 0;
    for (int i = 0; i < s.length(); i++) {
      end = Math.max(end, last[s.charAt(i) - 'a']);
      if (i == end) {
        answer.add(end - start + 1);
        start = i + 1;
      }
    }
    return answer;
  }
}`,
  ),
};
