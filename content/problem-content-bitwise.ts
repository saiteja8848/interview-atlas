import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const example = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });

const problem = (
  sourceUrl: string,
  statement: string,
  examples: ProblemExample[],
  constraints: string[],
  bruteExplanation: string,
  bruteDrawback: string,
  bruteComplexity: string,
  bruteCode: string,
  optimizedExplanation: string,
  optimizedComplexity: string,
  steps: string[],
  optimizedCode: string,
): ProblemContent => ({
  sourceUrl,
  statement,
  examples,
  constraints,
  brute: { explanation: bruteExplanation, drawback: bruteDrawback, complexity: bruteComplexity, code: bruteCode },
  optimized: { explanation: optimizedExplanation, complexity: optimizedComplexity, steps, code: optimizedCode },
});

export const problemContentBitwise: Record<string, ProblemContent> = {
  "add-binary": problem(
    "https://leetcode.com/problems/add-binary/description/",
    "Given two binary strings a and b, return a binary string representing their sum.",
    [
      example('a = "11", b = "1"', '"100"', "Binary 11 is 3 and binary 1 is 1, so the result is binary 100, which is 4."),
      example('a = "1010", b = "1011"', '"10101"', "Binary 1010 is 10 and binary 1011 is 11, so their sum is binary 10101, which is 21."),
    ],
    ["1 <= a.length, b.length <= 10,000", "a and b contain only '0' and '1'.", "Neither string has leading zeroes unless the string is exactly \"0\"."],
    "Convert both binary strings to arbitrary-precision integers, add them, and convert the result back to base two.",
    "The conversion hides the binary-addition logic and creates large intermediate integer objects. It is also unavailable when arbitrary-precision conversion is disallowed.",
    "O(n) time and O(n) space, where n is the longer string",
    `class Solution {
  public String addBinary(String a, String b) {
    java.math.BigInteger first = new java.math.BigInteger(a, 2);
    java.math.BigInteger second = new java.math.BigInteger(b, 2);
    return first.add(second).toString(2);
  }
}`,
    "Add the strings exactly like column addition. Read both strings from right to left, add the two available digits and the incoming carry, append the low bit of that sum, and carry the remaining high bit to the next column.",
    "O(n) time and O(n) space for the returned string",
    ["Start at the final character of both strings with carry equal to zero.", "Add each available digit to carry.", "Append sum & 1 and update carry to sum >> 1.", "Reverse the collected low-to-high bits before returning."],
    `class Solution {
  public String addBinary(String a, String b) {
    StringBuilder answer = new StringBuilder();
    int first = a.length() - 1;
    int second = b.length() - 1;
    int carry = 0;

    while (first >= 0 || second >= 0 || carry != 0) {
      int sum = carry;
      if (first >= 0) sum += a.charAt(first--) - '0';
      if (second >= 0) sum += b.charAt(second--) - '0';
      answer.append(sum & 1);
      carry = sum >> 1;
    }

    return answer.reverse().toString();
  }
}`,
  ),
  "number-of-1-bits": problem(
    "https://leetcode.com/problems/number-of-1-bits/description/",
    "Given a positive integer n, return the number of set bits in its binary representation. This count is also called the Hamming weight.",
    [
      example("n = 11", "3", "The binary representation 1011 contains three set bits."),
      example("n = 128", "1", "The binary representation 10000000 contains one set bit."),
      example("n = 2147483645", "30", "Its binary representation contains thirty set bits."),
    ],
    ["1 <= n <= 2^31 - 1"],
    "Inspect all 32 bit positions. Unsigned-shift n to bring each position to the lowest bit and add that bit to the count.",
    "It always performs 32 checks, even when n has only one or two set bits.",
    "O(32) time and O(1) space",
    `class Solution {
  public int hammingWeight(int n) {
    int count = 0;
    for (int bit = 0; bit < 32; bit++) {
      count += (n >>> bit) & 1;
    }
    return count;
  }
}`,
    "Subtracting one changes the lowest set bit to zero and changes only lower positions. Therefore n & (n - 1) removes exactly one set bit. Count how many removals are needed before n becomes zero.",
    "O(k) time and O(1) space, where k is the number of set bits",
    ["Initialize count to zero.", "Replace n with n & (n - 1) to clear its lowest set bit.", "Increment count once for that removed bit.", "Stop when n is zero."],
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
  "counting-bits": problem(
    "https://leetcode.com/problems/counting-bits/description/",
    "Given n, return an array of length n + 1 where answer[i] is the number of set bits in i for every value from 0 through n.",
    [
      example("n = 2", "[0,1,1]", "Zero has no set bits, while one and two each have one."),
      example("n = 5", "[0,1,1,2,1,2]", "The counts correspond to the binary forms 0, 1, 10, 11, 100, and 101."),
    ],
    ["0 <= n <= 100,000", "The returned array contains n + 1 values."],
    "For each number from zero through n, independently count its set bits by repeatedly clearing its lowest set bit.",
    "Each number repeats work already performed for smaller numbers, adding a logarithmic factor across the full range.",
    "O(n log n) time and O(n) space for the answer",
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
    "Right-shifting i removes its lowest bit, so answer[i >> 1] is already known. Add i & 1 to include the removed lowest bit. This reuses one smaller result instead of recounting every bit.",
    "O(n) time and O(n) space for the answer",
    ["Create answer with indices zero through n; answer[0] remains zero.", "Process i from one upward so answer[i >> 1] is already available.", "Set answer[i] to answer[i >> 1] plus i & 1."],
    `class Solution {
  public int[] countBits(int n) {
    int[] answer = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      answer[i] = answer[i >> 1] + (i & 1);
    }
    return answer;
  }
}`,
  ),
  "reverse-bits": problem(
    "https://leetcode.com/problems/reverse-bits/description/",
    "Reverse all 32 bits of n and return the integer represented by that reversed bit pattern.",
    [
      example("n = 43261596", "964176192", "00000010100101000001111010011100 becomes 00111001011110000010100101000000."),
      example("n = 2147483644", "1073741822", "01111111111111111111111111111100 becomes 00111111111111111111111111111110."),
    ],
    ["0 <= n <= 2^31 - 2", "n is even.", "The representation always contains exactly 32 bits."],
    "Read each source bit by its index and place it directly at the mirrored destination index.",
    "It is correct, but calculating two separate positions for every bit is more cumbersome than building the result in one direction.",
    "O(32) time and O(1) space",
    `class Solution {
  public int reverseBits(int n) {
    int answer = 0;
    for (int source = 0; source < 32; source++) {
      int bit = (n >>> source) & 1;
      answer |= bit << (31 - source);
    }
    return answer;
  }
}`,
    "Build the reversed value from left to right. Shift the existing answer left, attach n's current lowest bit, then unsigned-shift n right. Repeating exactly 32 times preserves leading zero positions.",
    "O(32) time and O(1) space",
    ["Start answer at zero.", "Shift answer left and append n's lowest bit.", "Unsigned-shift n right by one.", "Repeat exactly 32 times and return answer."],
    `class Solution {
  public int reverseBits(int n) {
    int answer = 0;
    for (int bit = 0; bit < 32; bit++) {
      answer = (answer << 1) | (n & 1);
      n >>>= 1;
    }
    return answer;
  }
}`,
  ),
  "power-of-two": problem(
    "https://leetcode.com/problems/power-of-two/description/",
    "Return true when n can be written as 2 raised to an integer power; otherwise return false.",
    [
      example("n = 1", "true", "1 equals 2^0."),
      example("n = 16", "true", "16 equals 2^4."),
      example("n = 3", "false", "No integer power of two equals three."),
    ],
    ["-2^31 <= n <= 2^31 - 1", "Only positive values can be powers of two."],
    "Reject non-positive values, repeatedly divide an even value by two, and check whether the final value is one.",
    "The loop and division are unnecessary because every positive power of two has exactly one set bit.",
    "O(log n) time and O(1) space",
    `class Solution {
  public boolean isPowerOfTwo(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
  }
}`,
    "A positive power of two has one set bit. Subtracting one clears that bit and fills only lower positions, so n & (n - 1) is zero exactly when n has one set bit.",
    "O(1) time and O(1) space",
    ["Reject zero and negative values.", "Compute n & (n - 1), which clears the lowest set bit.", "Return true only when nothing remains."],
    `class Solution {
  public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }
}`,
  ),
  "single-number": problem(
    "https://leetcode.com/problems/single-number/description/",
    "In a non-empty array, every value appears twice except one value that appears once. Return that single value using linear time and constant extra space in the optimized solution.",
    [
      example("nums = [2,2,1]", "1", "The two copies of two pair together, leaving one."),
      example("nums = [4,1,2,1,2]", "4", "One and two each appear twice; four appears once."),
      example("nums = [1]", "1", "The only element is the single value."),
    ],
    ["1 <= nums.length <= 30,000", "-30,000 <= nums[i] <= 30,000", "Exactly one value appears once; every other value appears twice."],
    "Count every value with a hash map, then return the value whose frequency is one.",
    "The map uses O(n) memory, violating the constant-extra-space goal even though duplicate pairs can cancel directly.",
    "O(n) time and O(n) space",
    `class Solution {
  public int singleNumber(int[] nums) {
    java.util.Map<Integer, Integer> frequency = new java.util.HashMap<>();
    for (int value : nums) {
      frequency.put(value, frequency.getOrDefault(value, 0) + 1);
    }
    for (int value : nums) {
      if (frequency.get(value) == 1) return value;
    }
    throw new IllegalStateException();
  }
}`,
    "XOR is associative and x XOR x is zero. XORing every array value cancels every duplicate pair, while zero XOR the unpaired value leaves that value unchanged.",
    "O(n) time and O(1) space",
    ["Initialize answer to zero.", "XOR each value into answer.", "All duplicate pairs cancel, so return the remaining accumulator."],
    `class Solution {
  public int singleNumber(int[] nums) {
    int answer = 0;
    for (int value : nums) answer ^= value;
    return answer;
  }
}`,
  ),
  "missing-number": problem(
    "https://leetcode.com/problems/missing-number/description/",
    "An array of length n contains distinct values chosen from the inclusive range 0 through n, with exactly one value missing. Return the missing value.",
    [
      example("nums = [3,0,1]", "2", "For n = 3, two is the only missing value in the range 0 through 3."),
      example("nums = [0,1]", "2", "The missing value may be n itself."),
      example("nums = [9,6,4,2,3,5,7,0,1]", "8", "Eight is the only value from zero through nine that does not appear."),
    ],
    ["n == nums.length", "1 <= n <= 10,000", "0 <= nums[i] <= n", "Every value in nums is unique."],
    "Sort nums and return the first index whose stored value differs from that index. If all indices match, n is missing.",
    "Sorting costs O(n log n) and modifies the array, although each present value can cancel with the same value from the complete range.",
    "O(n log n) time and O(log n) sorting space",
    `class Solution {
  public int missingNumber(int[] nums) {
    java.util.Arrays.sort(nums);
    for (int index = 0; index < nums.length; index++) {
      if (nums[index] != index) return index;
    }
    return nums.length;
  }
}`,
    "XOR every legal value from zero through n with every value present in nums. Each present value cancels its matching range value, so only the missing value remains.",
    "O(n) time and O(1) space",
    ["Initialize answer with n, the one legal value that is not an array index.", "For each index, XOR both the index and nums[index] into answer.", "Return the value left without a matching partner."],
    `class Solution {
  public int missingNumber(int[] nums) {
    int answer = nums.length;
    for (int index = 0; index < nums.length; index++) {
      answer ^= index ^ nums[index];
    }
    return answer;
  }
}`,
  ),
  "find-the-difference": problem(
    "https://leetcode.com/problems/find-the-difference/description/",
    "String t is formed by shuffling string s and adding one lowercase letter at an arbitrary position. Return the added letter.",
    [
      example('s = "abcd", t = "abcde"', '"e"', "The characters from s can be paired with matching characters in t, leaving e."),
      example('s = "", t = "y"', '"y"', "The only character in t is the added character."),
    ],
    ["0 <= s.length <= 1,000", "t.length == s.length + 1", "s and t contain only lowercase English letters."],
    "Count letters from s in a fixed frequency array, subtract letters from t, and return the letter whose balance becomes negative.",
    "The frequency array is constant-sized but still stores 26 counts when equal characters can cancel directly without remembering frequencies.",
    "O(n) time and O(1) space",
    `class Solution {
  public char findTheDifference(String s, String t) {
    int[] frequency = new int[26];
    for (char value : s.toCharArray()) frequency[value - 'a']++;
    for (char value : t.toCharArray()) frequency[value - 'a']--;
    for (int index = 0; index < 26; index++) {
      if (frequency[index] < 0) return (char) ('a' + index);
    }
    throw new IllegalStateException();
  }
}`,
    "XOR every character from both strings. Equal characters cancel regardless of order, so the one character with no partner is left in the accumulator.",
    "O(n) time and O(1) space",
    ["Initialize a character accumulator to zero.", "XOR every character in s into it.", "XOR every character in t into it.", "Return the unmatched character that remains."],
    `class Solution {
  public char findTheDifference(String s, String t) {
    char answer = 0;
    for (char value : s.toCharArray()) answer ^= value;
    for (char value : t.toCharArray()) answer ^= value;
    return answer;
  }
}`,
  ),
  "single-number-ii": problem(
    "https://leetcode.com/problems/single-number-ii/description/",
    "Every value in nums appears exactly three times except one value that appears once. Return that single value using linear time and constant extra space in the optimized solution.",
    [
      example("nums = [2,2,3,2]", "3", "The three copies of two are removed from consideration, leaving three."),
      example("nums = [0,1,0,1,0,1,99]", "99", "Zero and one each occur three times, while 99 occurs once."),
    ],
    ["1 <= nums.length <= 30,000", "-2^31 <= nums[i] <= 2^31 - 1", "One value appears once and every other value appears exactly three times."],
    "Count every value in a hash map and return the value whose frequency is one.",
    "The map uses O(n) extra memory, while the fixed 32-bit representation lets the repeated values cancel with constant storage.",
    "O(n) time and O(n) space",
    `class Solution {
  public int singleNumber(int[] nums) {
    java.util.Map<Integer, Integer> frequency = new java.util.HashMap<>();
    for (int value : nums) {
      frequency.put(value, frequency.getOrDefault(value, 0) + 1);
    }
    for (int value : nums) {
      if (frequency.get(value) == 1) return value;
    }
    throw new IllegalStateException();
  }
}`,
    "Count set bits independently at each of the 32 positions. Triplicated values contribute a multiple of three at every position, so count modulo three gives the corresponding bit of the unique value, including its sign bit.",
    "O(32n), which is O(n), time and O(1) space",
    ["Inspect each bit position from zero through 31.", "Count how many numbers have that bit set.", "If the count is not divisible by three, set the same bit in answer.", "Return the reconstructed 32-bit value."],
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
  "bitwise-and-of-numbers-range": problem(
    "https://leetcode.com/problems/bitwise-and-of-numbers-range/description/",
    "Given the inclusive range from left through right, return the bitwise AND of every integer in that range.",
    [
      example("left = 5, right = 7", "4", "5 AND 6 AND 7 keeps only the common high bit, producing four."),
      example("left = 0, right = 0", "0", "The range contains only zero."),
      example("left = 1, right = 2147483647", "0", "Across this wide range every bit position becomes zero at least once."),
    ],
    ["0 <= left <= right <= 2^31 - 1"],
    "Start with left and AND every following integer through right, stopping early if the result becomes zero.",
    "The range can contain billions of values, so visiting every integer is infeasible.",
    "O(right - left) time and O(1) space",
    `class Solution {
  public int rangeBitwiseAnd(int left, int right) {
    int answer = left;
    for (long value = (long) left + 1; value <= right && answer != 0; value++) {
      answer &= (int) value;
    }
    return answer;
  }
}`,
    "Only the common binary prefix of left and right can remain set throughout the whole range. Shift both boundaries right until they are equal, count the removed positions, then shift that common prefix back.",
    "O(log right) time and O(1) space",
    ["Shift left and right rightward together while they differ.", "Count how many low positions were removed.", "The equal value is their common prefix.", "Shift that prefix left by the saved count."],
    `class Solution {
  public int rangeBitwiseAnd(int left, int right) {
    int removedBits = 0;
    while (left != right) {
      left >>= 1;
      right >>= 1;
      removedBits++;
    }
    return left << removedBits;
  }
}`,
  ),
  "sum-of-two-integers": problem(
    "https://leetcode.com/problems/sum-of-two-integers/description/",
    "Return the sum of integers a and b without using the addition or subtraction operators.",
    [
      example("a = 1, b = 2", "3", "The two values add to three."),
      example("a = 2, b = 3", "5", "The two values add to five."),
    ],
    ["-1,000 <= a, b <= 1,000", "The arithmetic result is represented as a signed 32-bit integer.", "Do not use + or - to calculate the sum."],
    "Apply the full-adder truth table to all 32 positions. XOR the two input bits and incoming carry for the result bit, then carry a majority-one result to the next position.",
    "The fixed 32-step implementation is verbose. XOR and shifted AND already compute the carry-free sum and all carries for every position at once.",
    "O(32) time and O(1) space",
    `class Solution {
  public int getSum(int a, int b) {
    int answer = 0;
    int carry = 0;
    for (int bit = 0; bit < 32; bit++) {
      int first = (a >>> bit) & 1;
      int second = (b >>> bit) & 1;
      int resultBit = first ^ second ^ carry;
      answer |= resultBit << bit;
      carry = (first & second) | (first & carry) | (second & carry);
    }
    return answer;
  }
}`,
    "XOR produces the partial sum without carries. AND finds positions that generate carries, and shifting left moves those carries to the next column. Repeat with the partial sum and carries until no carry remains.",
    "O(32) time and O(1) space",
    ["Compute carry as (a & b) << 1.", "Replace a with the carry-free sum a XOR b.", "Replace b with carry.", "Repeat until b is zero, then return a."],
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
  "divide-two-integers": problem(
    "https://leetcode.com/problems/divide-two-integers/description/",
    "Divide dividend by divisor without multiplication, division, or remainder. Truncate toward zero and clamp a result outside the signed 32-bit range.",
    [
      example("dividend = 10, divisor = 3", "3", "10 / 3 is 3.333..., which truncates toward zero to three."),
      example("dividend = 7, divisor = -3", "-2", "7 / -3 is -2.333..., which truncates toward zero to negative two."),
    ],
    ["-2^31 <= dividend, divisor <= 2^31 - 1", "divisor != 0", "Multiplication, division, and remainder operators are forbidden."],
    "Convert both operands to positive long magnitudes. Repeatedly subtract the divisor magnitude from the dividend magnitude and count how many times it fits.",
    "Subtracting one divisor at a time can require billions of iterations when the quotient is large.",
    "O(|quotient|) time and O(1) space",
    `class Solution {
  public int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
    long remaining = Math.abs((long) dividend);
    long unit = Math.abs((long) divisor);
    int quotient = 0;

    while (remaining >= unit) {
      remaining -= unit;
      quotient++;
    }

    return (dividend < 0) ^ (divisor < 0) ? -quotient : quotient;
  }
}`,
    "A left shift doubles the divisor. Check possible powers of two from largest to smallest; whenever divisor times that power fits in the remaining dividend, subtract it and set the same power in the quotient. This removes large chunks instead of one divisor at a time.",
    "O(32) time and O(1) space",
    ["Handle the only overflowing case, Integer.MIN_VALUE divided by -1.", "Use positive long magnitudes and remember whether the signs differ.", "From bit 31 down to zero, test whether the divisor shifted by that bit fits.", "Subtract each fitting chunk and add its power of two to the quotient.", "Apply the sign and return the 32-bit result."],
    `class Solution {
  public int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;

    long remaining = Math.abs((long) dividend);
    long unit = Math.abs((long) divisor);
    long quotient = 0;

    for (int bit = 31; bit >= 0; bit--) {
      if ((remaining >> bit) >= unit) {
        remaining -= unit << bit;
        quotient |= 1L << bit;
      }
    }

    if ((dividend < 0) ^ (divisor < 0)) quotient = -quotient;
    return (int) quotient;
  }
}`,
  ),
};
