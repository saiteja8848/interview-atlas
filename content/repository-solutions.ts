// Generated from the linked DSA repository. Do not hand-edit this data file.
export type RepositoryDifficulty = "Easy" | "Medium" | "Hard";
export type RepositoryProblem = { key: string; title: string; slug: string; topic: string; difficulty: RepositoryDifficulty; tags: string[]; description: string; sourcePath: string; sourceCode: string };
export const repositoryProblems: RepositoryProblem[] = [
  {
    "key": "Arrays:Arrays/ExcelSheet.java",
    "title": "Excel Sheet",
    "slug": "excel-sheet",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Excel Sheet using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/ExcelSheet.java",
    "sourceCode": "public class ExcelSheet {\n      public String convertToTitle(int columnNumber) {\n        String ans = \"\";\n        \n        while(columnNumber > 0) {\n            columnNumber--;\n            ans= (char)((columnNumber) % 26 + 'A') + ans;\n            columnNumber = (columnNumber) / 26;\n        }\n        return ans;\n    }\n\n    public int titleToNumber(String columnTitle) {\n        int result=0;\n\n        for(char ch:columnTitle.toCharArray()){\n            result*=26;\n            result+=ch-'A'+1;\n        }\n       return result;\n    }\n}"
  },
  {
    "key": "Arrays:Arrays/FactorialTrailingZeros.java",
    "title": "Factorial Trailing Zeros",
    "slug": "factorial-trailing-zeros",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Factorial Trailing Zeros using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/FactorialTrailingZeros.java",
    "sourceCode": "public class FactorialTrailingZeros {\n\tpublic int trailingZeroes(int n) {\n\t\tint count = 0;\n\t\twhile (n != 0) {\n\t\t\tint tmp = n / 5;\n\t\t\tcount += tmp;\n\t\t\tn = tmp;\n\t\t}\n\t\treturn count;\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/FirstMissingPositive.java",
    "title": "First Missing Positive",
    "slug": "first-missing-positive",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice First Missing Positive using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/FirstMissingPositive.java",
    "sourceCode": "//https://leetcode.com/problems/first-missing-positive\n\npublic class FirstMissingPositive {\n\t\n\t public int firstMissingPositive(int[] nums) {\n\t        \n\t      int i = 0;\n\t    \n\t             // Cyclic Sort in action - trying to place the elements in their respective index\n\t            while(i<nums.length){\n\t                int correct = nums[i]-1;\n\t                if(nums[i]>0 && nums[i] <=nums.length && nums[i]!=nums[correct]){\n\t                    int temp = nums[i];\n\t                    nums[i] = nums[correct];\n\t                    nums[correct]=temp;  \n\t                }\n\t                else\n\t                    i++;\n\t             }\n\t    \n\t              // Checking for the missing item in the soted array \"nums\"\n\t                for(int z =0 ;z<nums.length ; z++){\n\t                    if(nums[z] != z+1){\n\t                        return z+1;\n\t                    }\n\t                }\n\t    \n\t        return nums.length+1;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:Arrays/FractionToRecurringDecimal.java",
    "title": "Fraction To Recurring Decimal",
    "slug": "fraction-to-recurring-decimal",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Fraction To Recurring Decimal using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/FractionToRecurringDecimal.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class FractionToRecurringDecimal {\n    public String fractionToDecimal(int num, int denom) {\n        if(denom==0)\n          return \"undefined\";\n        if(num==0)\n           return \"0\";\n\n        String sign = ((num>0)^(denom>0))?\"-\":\"\";\n        \n        long numerator = Math.abs((long)num);\n        long denominator = Math.abs((long)denom);\n\n        StringBuilder result = new StringBuilder();\n        result.append(sign);\n        result.append(numerator/denominator);\n      \n        numerator=numerator%denominator;\n        if(numerator==0)\n         return result.toString();\n        result.append(\".\");\n      \n        Map<Long,Integer> trackQuotient = new HashMap<>();\n        trackQuotient.put(numerator , result.length());\n        while(numerator!=0){\n            numerator*=10;\n            result.append(numerator/denominator);\n            numerator=numerator%denominator;\n            if(trackQuotient.containsKey(numerator)){\n                int index = trackQuotient.get(numerator);\n                result.insert(index,\"(\");\n                result.append(\")\");\n                break;\n            }else\n              trackQuotient.put(numerator,result.length());\n        }\n      return result.toString();\n    }\n}"
  },
  {
    "key": "Arrays:Arrays/IntegerToRomanViceVersa.java",
    "title": "Integer To Roman Vice Versa",
    "slug": "integer-to-roman-vice-versa",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Integer To Roman Vice Versa using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/IntegerToRomanViceVersa.java",
    "sourceCode": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class IntegerToRomanViceVersa {\n\n\n   public int romanToInt(String s) {\n    Map<Character,Integer> map = new LinkedHashMap<Character,Integer>(); \n        map.put('I',1);\n        map.put('V',5);\n        map.put('X',10);\n        map.put('L',50);\n        map.put('C',100);\n        map.put('D',500);\n        map.put('M',1000);    \n       \n       int len = s.length();\n       int result = map.get(s.charAt(len-1));\n       \n       // here we have to do only 2 operations either add up\n       // value of roman to result or subtract for special cases\n       for(int i = len-2;i>=0;i--){\n           int a = map.get(s.charAt(i));\n           int currPrevChar = map.get(s.charAt(i+1));\n           result = a<currPrevChar?result-a:result+a;\n       }\n       return result;\n    }\n\n  \n\n  \n\n     public String intToRoman(int num) {\n        Map<String,Integer> map = new LinkedHashMap<>();\n        map.put(\"M\",1000); // After 1000\n        map.put(\"CM\",900); // newly added(1)\n        map.put(\"D\",500);  //after 500\n        map.put(\"CD\",400); // newly added(2)\n        map.put(\"C\",100);  // after 100\n        map.put(\"XC\",90); // newly added(3)\n        map.put(\"L\",50); // after 50\n        map.put(\"XL\",40); // newly added(4)\n        map.put(\"X\",10);  //after 10\n        map.put(\"IX\",9); // newly added(5)\n        map.put(\"V\",5);  //after 5\n        map.put(\"IV\",4); // newly added(6)\n        map.put(\"I\",1);\n        StringBuilder sb = new StringBuilder();  \n        for(Map.Entry<String,Integer> entry : map.entrySet()){\n             /*it is nothing but the division\n             where num is a divident and entry.getValue is a\n             divisor and remainder will be new Num */\n            while(num>=entry.getValue()){\n                num-=entry.getValue();\n                sb.append(entry.getKey());\n            }\n        }    \n        return sb.toString();   \n    }\n\n  \n}"
  },
  {
    "key": "Arrays:Arrays/LongestConsecutiveSequence.java",
    "title": "Longest Consecutive Sequence",
    "slug": "longest-consecutive-sequence",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Longest Consecutive Sequence using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/LongestConsecutiveSequence.java",
    "sourceCode": "import java.util.Arrays;\nimport java.util.HashSet;\nimport java.util.stream.Collectors;\n\npublic class LongestConsecutiveSequence {\n\tpublic int longestConsecutive(int[] nums) {\n\t\tint maxLength = 0;\n\t\tHashSet<Integer> set = Arrays.stream(nums).boxed().collect(Collectors.toCollection(HashSet::new));\n\t\tfor (int n : nums) {\n\t\t\t// Step1 : check whether current n is not falling in between sequence\n\t\t\t// we always have to start from the start of sequence\n\n\t\t\tif (!set.contains(n - 1)) {\n\t\t\t\tint currentNum = n;\n\t\t\t\tint count = 1;\n\t\t\t\twhile (set.contains(currentNum + 1)) {\n\t\t\t\t\tcurrentNum += 1;\n\t\t\t\t\tcount++;\n\t\t\t\t}\n\t\t\t\tmaxLength = Math.max(count, maxLength);\n\t\t\t}\n\t\t}\n\t\treturn maxLength;\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/LongestPalindromeLength.java",
    "title": "Longest Palindrome Length",
    "slug": "longest-palindrome-length",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Longest Palindrome Length using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/LongestPalindromeLength.java",
    "sourceCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class LongestPalindromeLength {\n\tpublic int longestPalindrome(String s) {\n\t\tSet<Character> set = new HashSet();\n\t\t// Even no of characters we are trying to remove - example : aabcd, aa will be\n\t\t// removed\n\t\t// bcd will left out in the set\n\t\tfor (char ch : s.toCharArray()) {\n\t\t\tif (set.contains(ch)) {\n\t\t\t\tset.remove(ch);\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\tset.add(ch);\n\t\t}\n\n\t\t// since bcd is left out, size will be 3\n\t\tint oddCharacterLen = set.size();\n\t\tint totalLength = s.length();\n\t\t// we want to include only one odd character, so need -1 from oddCharactersLen\n\t\t// and rest all\n\t\t// should be removed\n\t\t// aabcd, aa removed, out of bcd, we keep only 1, so need to remove 2 character\n\t\t// from len\n\t\treturn totalLength - (oddCharacterLen == 0 ? 0 : oddCharacterLen - 1);\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/MajorityElement.java",
    "title": "Majority Element",
    "slug": "majority-element",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Majority Element using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/MajorityElement.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class MajorityElement {\n\t/**\n\t * \n\t * Problem Statement:\n\t * \n\t * majority element is the one which appears > (n/2)\n\t * \n\t * \n\t * moore's voting algorithm : canceling out majority | minority element\n\t * \n\t * \n\t * Arrays.sort(nums); return nums[nums.length/2];\n\t * \n\t * hashMap counts - grouping concept - canceling out the same frequent elements\n\t * and left we one extra element\n\t * \n\t */\n\n\tpublic int majorityElement(int[] nums) {\n\t\tint count = 0;\n\t\tint candidate = 0;\n\t\tfor (int num : nums) {\n\n\t\t\tif (count == 0) {\n\t\t\t\tcandidate = num;\n\t\t\t}\n\t\t\tcount += (num == candidate) ? 1 : -1;\n\t\t}\n\t\treturn candidate;\n\t}\n\n\tpublic List<Integer> majorityElementII(int[] nums) {\n\t\tif (nums == null || nums.length == 0)\n\t\t\treturn new ArrayList<Integer>();\n\t\tList<Integer> result = new ArrayList<Integer>();\n\t\tint number1 = nums[0], number2 = nums[0], count1 = 0, count2 = 0, len = nums.length;\n\t\tfor (int i = 0; i < len; i++) {\n\t\t\tif (nums[i] == number1)\n\t\t\t\tcount1++;\n\t\t\telse if (nums[i] == number2)\n\t\t\t\tcount2++;\n\t\t\telse if (count1 == 0) {\n\t\t\t\tnumber1 = nums[i];\n\t\t\t\tcount1 = 1;\n\t\t\t} else if (count2 == 0) {\n\t\t\t\tnumber2 = nums[i];\n\t\t\t\tcount2 = 1;\n\t\t\t} else {\n\t\t\t\tcount1--;\n\t\t\t\tcount2--;\n\t\t\t}\n\t\t}\n\t\tcount1 = 0;\n\t\tcount2 = 0;\n\t\tfor (int i = 0; i < len; i++) {\n\t\t\tif (nums[i] == number1)\n\t\t\t\tcount1++;\n\t\t\telse if (nums[i] == number2)\n\t\t\t\tcount2++;\n\t\t}\n\t\tif (count1 > len / 3)\n\t\t\tresult.add(number1);\n\t\tif (count2 > len / 3)\n\t\t\tresult.add(number2);\n\t\treturn result;\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/PalindromeNumber.java",
    "title": "Palindrome Number",
    "slug": "palindrome-number",
    "topic": "Arrays",
    "difficulty": "Easy",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Palindrome Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/PalindromeNumber.java",
    "sourceCode": "public class PalindromeNumber {\n\tpublic boolean isPalindrome(int x) {\n\t\tif (x < 0 || (x != 0 && x % 10 == 0))\n\t\t\treturn false;\n\t\tint rev = 0;\n\t\twhile (x > rev) {\n\t\t\trev = rev * 10 + x % 10;\n\t\t\tx = x / 10;\n\t\t}\n\t\treturn (x == rev || x == rev / 10);\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/PascalsTriangle_I.java",
    "title": "Pascal's Triangle II",
    "slug": "pascal-s-triangle-ii",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Pascal's Triangle II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/PascalsTriangle_I.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\n\n/**\n * Problem Link : https://leetcode.com/problems/pascals-triangle/description/\n * @param args\n */\n\npublic class PascalsTriangle_I {\n\t\n\tclass Solution {\n\t    public List<List<Integer>> generate(int numRows) {\n\t        List<List<Integer>> answer = new ArrayList<List<Integer>>();\n\t        List<Integer> row, pre=null;        \n\t        for(int i=0;i<numRows;i++){\n\t            row = new ArrayList();\n\t            for(int j=0;j<=i;j++){\n\t                row.add((j==0||j ==i) ? 1 :pre.get(j-1)+pre.get(j));\n\t            }\n\t            pre=row;\n\t            answer.add(row);   \n\t        }\n\t        return answer;    \n\t    }\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:Arrays/Primes.java",
    "title": "Primes",
    "slug": "primes",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Primes using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/Primes.java",
    "sourceCode": "public class Primes {\n     public boolean isUgly(int n) {\n        // A non-positive integer cannot be ugly\n        if (n <= 0) {\n            return false;\n        }\n\n        // Factorize by dividing with permitted factors\n        for (int factor : new int[] { 2, 3, 5 }) {\n            n = keepDividingWhenDivisible(n, factor);\n        }\n\n        // Check if the integer is reduced to 1 or not.\n        return n == 1;\n    }\n\n    // Keep dividing dividend by divisor when division is possible.\n    private int keepDividingWhenDivisible(int dividend, int divisor) {\n        while (dividend % divisor == 0) {\n            dividend /= divisor;\n        }\n        return dividend;\n    }\n\n\n   // Counting primies\n       public int countPrimes(int n) {\n          if(n==0 || n == 1) return 0;\n        \n        boolean[] prime = new boolean[n];\n        //initialising notPrime with a value 1(counting \"1\" as not prime)\n        int notPrime = 1;\n        \n        for(int i=2;i*i<n;i++){\n            if(prime[i] == false){\n                for(int j=i;j*i<n;j++){\n                    if(prime[j*i] == false){\n                        notPrime++;\n                        prime[j*i] = true;\n                    }\n                }\n            }\n        }\n        return n - notPrime - 1;\n    }\n     \n}"
  },
  {
    "key": "Arrays:Arrays/RotateArray.java",
    "title": "Rotate Array",
    "slug": "rotate-array",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Rotate Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/RotateArray.java",
    "sourceCode": "public class RotateArray {\n    public void rotate(int[] nums, int k) {\n    k %= nums.length;\n    reverse(nums, 0, nums.length - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, nums.length - 1);\n}\n\npublic void reverse(int[] nums, int start, int end) {\n    while (start < end) {\n        int temp = nums[start];\n        nums[start] = nums[end];\n        nums[end] = temp;\n        start++;\n        end--;\n    }\n}\n\n}\n\n\n/*\nCompare all neignbour elements (a,b) in A,\nthe case of a > b can happen at most once.\n\nNote that the first element and the last element are also connected.\n\nIf all a <= b, A is already sorted.\nIf all a <= b but only one a > b,\nwe can rotate and make b the first element.\nOther case, return false.\n\n\nComplexity\nTime O(n)\nSpace O(1)\n\n*/\n\n\nclass RotateArray_II {\n  public boolean check(int[] A) {\n        int k = 0, n = A.length;\n        for (int i = 0; i < n; ++i) {\n            if (A[i] > A[(i + 1) % n]) {\n                k++;\n            }\n            if (k > 1) {\n                return false;\n            }\n        }\n        return true;\n    }\n}"
  },
  {
    "key": "Arrays:Arrays/RotateImage.java",
    "title": "Rotate Image",
    "slug": "rotate-image",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Rotate Image using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/RotateImage.java",
    "sourceCode": "public class RotateImage {\n\tpublic void rotate(int[][] matrix) {\n\t\t// transpose, where row becomes column and column becomes row\n\t\tfor (int i = 0; i < matrix.length; i++) {\n\t\t\tfor (int j = i; j < matrix[0].length; j++) {\n\t\t\t\tint temp = 0;\n\t\t\t\ttemp = matrix[i][j];\n\t\t\t\tmatrix[i][j] = matrix[j][i];\n\t\t\t\tmatrix[j][i] = temp;\n\t\t\t}\n\t\t}\n\t\t//Reverse of the row elements after transpose\n\t\tfor (int i = 0; i < matrix.length; i++) {\n\t\t\tfor (int j = 0; j < matrix.length / 2; j++) {\n\t\t\t\tint temp = 0;\n\t\t\t\ttemp = matrix[i][j];\n\t\t\t\tmatrix[i][j] = matrix[i][matrix.length - 1 - j];\n\t\t\t\tmatrix[i][matrix.length - 1 - j] = temp;\n\t\t\t}\n\t\t}\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/SetMatrixToZeros.java",
    "title": "Set Matrix Zeroes",
    "slug": "set-matrix-zeroes",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Set Matrix Zeroes using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/SetMatrixToZeros.java",
    "sourceCode": "public class SetMatrixToZeros {\n\tpublic void setZeroes(int[][] matrix) {\n\t\tboolean fr = false, fc = false;\n\t\tfor (int i = 0; i < matrix.length; i++) {\n\t\t\tfor (int j = 0; j < matrix[0].length; j++) {\n\t\t\t\tif (matrix[i][j] == 0) {\n\t\t\t\t\tif (i == 0)\n\t\t\t\t\t\tfr = true;\n\t\t\t\t\tif (j == 0)\n\t\t\t\t\t\tfc = true;\n\t\t\t\t\tmatrix[0][j] = 0;\n\t\t\t\t\tmatrix[i][0] = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfor (int i = 1; i < matrix.length; i++) {\n\t\t\tfor (int j = 1; j < matrix[0].length; j++) {\n\t\t\t\tif (matrix[i][0] == 0 || matrix[0][j] == 0) {\n\t\t\t\t\tmatrix[i][j] = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tif (fr) {\n\t\t\tfor (int j = 0; j < matrix[0].length; j++) {\n\t\t\t\tmatrix[0][j] = 0;\n\t\t\t}\n\t\t}\n\t\tif (fc) {\n\t\t\tfor (int i = 0; i < matrix.length; i++) {\n\t\t\t\tmatrix[i][0] = 0;\n\t\t\t}\n\t\t}\n\n\t}\n}"
  },
  {
    "key": "Arrays:Arrays/WiggleSort_I.java",
    "title": "Wiggle Sort I",
    "slug": "wiggle-sort-i",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Wiggle Sort I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/WiggleSort_I.java",
    "sourceCode": "/**\n * \n * \n * \n * Odd index values > previous Even Index values\n * Even Index values < next Odd Index values\n * \n * if this condition doesn't met, swap the values in the array\n * \n * TC:o(N)\n * \n * BRUTE FORCE: Sort and swap alternating elements\n * \n * ProblmeLink : https://www.lintcode.com/problem/508/description\n * @author saite\n *\n */\n\n\npublic class WiggleSort_I {\n\t\n\tpublic void wiggleSort(int[] nums) {\n\n\t\tfor (int i = 1; i < nums.length; i++) {\n\n\t\t\tif ((i % 2 == 1 && nums[i] < nums[i - 1]) || (i % 2 == 0 && nums[i] > nums[i - 1])) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[i - 1];\n\t\t\t\tnums[i - 1] = temp;\n\t\t\t}\n\t\t}\n\n\t\treturn;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:Arrays/WiggleSort_II.java",
    "title": "Wiggle Sort II",
    "slug": "wiggle-sort-ii",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Arrays"
    ],
    "description": "Practice Wiggle Sort II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Arrays/WiggleSort_II.java",
    "sourceCode": "import java.util.Arrays;\n\n/*\n * \n * \n * \n * Leetcode :https://leetcode.com/problems/wiggle-sort-ii/description/\n * \n * \n * //sort and swap, so maintain temp arra\n        //example: \n        /*\n            [1,3,2,2,3,1]\n                 \n                 midPoint =2     \n                 lastPoint=5\n             \n             0 1 2 3 4 5\n            [1,1,2,2,3,3]\n            \n            Now swap\n             [2,3]\n             [2,3,1,3]\n             [2,3,1,3,1,3]\n           O(n)sc , O(nlogn) \n * \n * \n * \n * */\n\n\n\n\npublic class WiggleSort_II {\n\t\n\t public void wiggleSort(int[] nums) {\n\t        if(nums.length==0)\n\t            return;\n\t      \n\t        Arrays.sort(nums);\n\t        int[] copy=Arrays.copyOf(nums,nums.length);\n\t      \n\t        int len=nums.length;\n\t        int midPoint= (len%2==0 ? len/2:(len/2) + 1)-1; \n\t        int lastPoint = len-1;\n\t        \n\t        for(int i=0;i<len;i++){\n\t            nums[i] = i%2==0 ? copy[midPoint--] : copy[lastPoint--];\n\t        }\n\t        \n\t    }\n\t\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/Combination.java",
    "title": "Combination",
    "slug": "combination",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Combination using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/Combination.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Combination {\n\tpublic List<List<Integer>> combine(int n, int k) {\n\t\tList<List<Integer>> subsets = new ArrayList<>();\n\t\tgeneratesubsets(1, n, new ArrayList(), subsets, k);\n\t\treturn subsets;\n\t}\n\n\tvoid generatesubsets(int start, int n, List<Integer> current, List<List<Integer>> subsets, int k) {\n\t\tif (current.size() == k) {\n\t\t\tsubsets.add(new ArrayList(current));\n\t\t}\n\t\tfor (int i = start; i <= n; i++) {\n\t\t\tcurrent.add(i);\n\t\t\tgeneratesubsets(i + 1, n, current, subsets, k);\n\t\t\tcurrent.remove(current.size() - 1);\n\t\t}\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/CombinationSum.java",
    "title": "Combination Sum",
    "slug": "combination-sum",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Combination Sum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/CombinationSum.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.HashMap;\nimport java.util.LinkedList;\nimport java.util.List;\n\nclass CombinationSum {\n\tpublic List<List<Integer>> combinationSum(int[] candidates, int target) {\n\t\tList<List<Integer>> list = new ArrayList<>();\n\t\tbacktrack(list, new ArrayList<Integer>(), candidates, target, 0);\n\t\treturn list;\n\t}\n\n\tprivate void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\n\t\tif (remain < 0)\n\t\t\treturn; /** no solution */\n\t\telse if (remain == 0)\n\t\t\tlist.add(new ArrayList<>(tempList));\n\t\telse {\n\t\t\tfor (int i = start; i < cand.length; i++) {\n\t\t\t\ttempList.add(cand[i]);\n\t\t\t\tbacktrack(list, tempList, cand, remain - cand[i], i);\n\t\t\t\ttempList.remove(tempList.size() - 1);\n\t\t\t}\n\t\t}\n\n\t}\n\n}\n\nclass CombinationSumII {\n\tpublic List<List<Integer>> combinationSum2(int[] candidates, int target) {\n\t\tList<List<Integer>> list = new LinkedList<List<Integer>>();\n\t\tArrays.sort(candidates);\n\t\tbacktrack(list, new ArrayList<Integer>(), candidates, target, 0);\n\t\treturn list;\n\t}\n\n\tprivate void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\n\n\t\tif (remain < 0)\n\t\t\treturn; /** no solution */\n\t\telse if (remain == 0)\n\t\t\tlist.add(new ArrayList<>(tempList));\n\t\telse {\n\t\t\tfor (int i = start; i < cand.length; i++) {\n\t\t\t\tif (i > start && cand[i] == cand[i - 1])\n\t\t\t\t\tcontinue; /** skip duplicates */\n\t\t\t\ttempList.add(cand[i]);\n\t\t\t\tbacktrack(list, tempList, cand, remain - cand[i], i + 1);\n\t\t\t\ttempList.remove(tempList.size() - 1);\n\t\t\t}\n\t\t}\n\t}\n\n}\n\nclass CombinationSumIII {\n\tpublic List<List<Integer>> combinationSum3(int k, int n) {\n\t\tList<List<Integer>> list = new ArrayList<>();\n\t\tbacktrack(list, new ArrayList<Integer>(), k, n, 1);\n\t\treturn list;\n\t}\n\n\tprivate void backtrack(List<List<Integer>> list, List<Integer> tempList, int k, int remain, int start) {\n\t\tif (tempList.size() > k)\n\t\t\treturn; /** no solution */\n\t\telse if (tempList.size() == k && remain == 0)\n\t\t\tlist.add(new ArrayList<>(tempList));\n\t\telse {\n\t\t\tfor (int i = start; i <= 9; i++) {\n\t\t\t\ttempList.add(i);\n\t\t\t\tbacktrack(list, tempList, k, remain - i, i + 1);\n\t\t\t\ttempList.remove(tempList.size() - 1);\n\t\t\t}\n\t\t}\n\t}\n\n}\n\nclass CombinationSumIV {\n\tHashMap<Integer, Integer> cache = new HashMap<>();\n\n\tpublic int combinationSum4(int[] candidates, int target) {\n\n\t\treturn dfs(candidates, target);\n\t}\n\n\tpublic int dfs(int[] candidates, int currentValue) {\n\n\t\tif (cache.containsKey(currentValue)) {\n\t\t\treturn cache.get(currentValue);\n\t\t}\n\n\t\tint count = 0;\n\t\tif (currentValue == 0) {\n\t\t\treturn ++count;\n\t\t}\n\n\t\tfor (int candidate : candidates) {\n\t\t\tif (currentValue - candidate >= 0) {\n\t\t\t\tcount += dfs(candidates, currentValue - candidate);\n\t\t\t}\n\t\t}\n\t\tcache.put(currentValue, count);\n\n\t\treturn count;\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/DecodeWays.java",
    "title": "Decode Ways",
    "slug": "decode-ways",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Decode Ways using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/DecodeWays.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class DecodeWays {\n\n\tMap<Integer, Integer> memo = new HashMap<>();\n\n\tpublic int numDecodings(String s) {\n\n\t\treturn back(s, 0);\n\t}\n\n\tprivate int back(String s, int start) {\n\t\tif (start == s.length())\n\t\t\treturn 1;\n\n\t\tif (memo.containsKey(start))\n\t\t\treturn memo.get(start);\n\n\t\tint ans = 0;\n\t\tfor (int i = start + 1; i <= s.length(); i++) {\n\t\t\tif (Integer.parseInt(s.substring(start, i)) > 26)\n\t\t\t\tbreak;\n\t\t\tif (Integer.parseInt(s.substring(start, i)) == 0)\n\t\t\t\treturn 0;\n\n\t\t\tans += back(s, i);\n\t\t}\n\n\t\tmemo.put(start, ans);\n\t\treturn ans;\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/GenerateParenthesis.java",
    "title": "Generate Parenthesis",
    "slug": "generate-parenthesis",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Generate Parenthesis using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/GenerateParenthesis.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class GenerateParenthesis {\n\n\tpublic List<String> generateParenthesis(int n) {\n\t\tList<String> solution = new ArrayList<>();\n\t\tgenerateParenthesis(n, solution, \"\", 0, 0);\n\t\treturn solution;\n\t}\n\n\tvoid generateParenthesis(int n, List<String> solution, String result, int open, int close) {\n\n\t\tif (result.length() == n * 2) {\n\t\t\tsolution.add(result);\n\t\t\treturn;\n\t\t}\n\n\t\tif (open < n)\n\t\t\tgenerateParenthesis(n, solution, result + \"(\", open + 1, close);\n\t\tif (close < open)\n\t\t\tgenerateParenthesis(n, solution, result + \")\", open, close + 1);\n\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/LetterCombinationsOfAPhoneNumber.java",
    "title": "Letter Combinations Of A Phone Number",
    "slug": "letter-combinations-of-a-phone-number",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Letter Combinations Of A Phone Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/LetterCombinationsOfAPhoneNumber.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class LetterCombinationsOfAPhoneNumber {\n\n\tList<String> result;\n\n\t// map the characters to the indices 2 - 9\n\tString[] digitToChars = new String[] { \"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\" };\n\n\tpublic List<String> letterCombinations(String digits) {\n\t\tthis.result = new ArrayList<>();\n\t\tif (digits.length() == 0)\n\t\t\treturn result;\n\t\t// Compute the result recursively\n\t\tcompute(0, digits, new char[digits.length()]);\n\t\treturn result;\n\t}\n\n\tprivate void compute(int index, String digits, char[] combination) {\n\n\t\t// if the index reaches the end, means a possible combination is created\n\t\t// Add it to the result\n\t\tif (index == digits.length())\n\t\t\tresult.add(new String(combination));\n\t\telse {\n\t\t\tint digit = digits.charAt(index) - '0'; // for eg: input: 23 --> take 2 first\n\t\t\tString digitChars = digitToChars[digit]; // get the mapping of 2 -> \"abc\", now iterate over abc\n\n\t\t\t// Use all the characters for the current digit one at a time\n\t\t\t// and compute the rest of the result\n\t\t\tfor (int i = 0; i < digitChars.length(); i++) {\n\t\t\t\tcombination[index] = digitChars.charAt(i);\n\t\t\t\tcompute(index + 1, digits, combination);\n\t\t\t}\n\t\t}\n\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/NQueens.java",
    "title": "N-Queens",
    "slug": "n-queens",
    "topic": "Backtracking",
    "difficulty": "Hard",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice N-Queens using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/NQueens.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\nclass Solution {\n\n\tList<List<String>> lists;\n\n\tpublic List<List<String>> solveNQueens(int n) {\n\t\tlists = new ArrayList<>();\n\n\t\tchar[][] matrix = new char[n][n];\n\t\tfor (char[] array : matrix)\n\t\t\tArrays.fill(array, '.');\n\n\t\trecursion(0, n, matrix);\n\t\treturn lists;\n\t}\n\n\tvoid recursion(int row, int n, char[][] matrix) {\n\t\t// Add to the solution - it means we found one solution successfully\n\t\tif (row == n) {\n\t\t\tList<String> list = new ArrayList<>();\n\t\t\tfor (char[] array : matrix)\n\t\t\t\tlist.add(String.valueOf(array));\n\t\t\tlists.add(list);\n\t\t\treturn;\n\t\t}\n\t\tfor (int col = 0; col < n; col++) {\n\t\t\tif (isValid(row, col, n, matrix)) {\n\t\t\t\tmatrix[row][col] = 'Q';\n\t\t\t\t// proceed further\n\t\t\t\trecursion(row + 1, n, matrix);\n\t\t\t\t// backtrack\n\t\t\t\tmatrix[row][col] = '.';\n\t\t\t}\n\t\t}\n\t}\n\n\tboolean isValid(int row, int col, int n, char[][] matrix) {\n\t\t// checking row wise - column is constant\n\t\tfor (int i = 0; i < row; i++) {\n\t\t\tif (matrix[i][col] == 'Q')\n\t\t\t\treturn false;\n\t\t}\n\n\t\t// checking column wise - row is constant\n\t\tfor (int i = 0; i < col; i++) {\n\t\t\tif (matrix[row][i] == 'Q')\n\t\t\t\treturn false;\n\t\t}\n\n\t\t// checking diagonally\n\t\tfor (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {\n\t\t\tif (matrix[i][j] == 'Q')\n\t\t\t\treturn false;\n\t\t}\n\n\t\tfor (int i = row, j = col; i >= 0 && j < n; i--, j++) {\n\t\t\tif (matrix[i][j] == 'Q')\n\t\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n}\n\npublic class NQueens {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/Permutation.java",
    "title": "Permutation",
    "slug": "permutation",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Permutation using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/Permutation.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Map;\n\nclass Permutation {\n\tpublic List<List<Integer>> permute(int[] nums) {\n\t\tList<List<Integer>> ans = new ArrayList<>();\n\t\tbacktrack(new ArrayList<>(), ans, nums);\n\t\treturn ans;\n\t}\n\n\tpublic void backtrack(List<Integer> curr, List<List<Integer>> ans, int[] nums) {\n\t\tif (curr.size() == nums.length) {\n\t\t\tans.add(new ArrayList<>(curr));\n\t\t\treturn;\n\t\t}\n\n\t\tfor (int num : nums) {\n\t\t\tif (!curr.contains(num)) {\n\t\t\t\tcurr.add(num);\n\t\t\t\tbacktrack(curr, ans, nums);\n\t\t\t\tcurr.remove(curr.size() - 1);\n\t\t\t}\n\t\t}\n\t}\n\n\t// Permutations_II\n\n\tpublic List<List<Integer>> permuteUnique(int[] nums) {\n\t\tList<List<Integer>> results = new ArrayList<>();\n\n\t\tHashMap<Integer, Integer> counter = new HashMap<>();\n\t\tfor (int num : nums) {\n\t\t\tcounter.put(num, counter.getOrDefault(num, 0) + 1);\n\t\t}\n\n\t\tLinkedList<Integer> comb = new LinkedList<>();\n\t\tthis.backtrack(comb, nums.length, counter, results);\n\t\treturn results;\n\t}\n\n\tstatic public void backtrack(LinkedList<Integer> comb, Integer N, HashMap<Integer, Integer> counter,\n\t\t\tList<List<Integer>> results) {\n\t\tif (comb.size() == N) {\n\t\t\tresults.add(new ArrayList<Integer>(comb));\n\t\t\treturn;\n\t\t}\n\n\t\tfor (Map.Entry<Integer, Integer> entry : counter.entrySet()) {\n\t\t\tInteger num = entry.getKey();\n\t\t\tInteger count = entry.getValue();\n\t\t\tif (count == 0)\n\t\t\t\tcontinue;\n\t\t\tcomb.addLast(num);\n\t\t\tcounter.put(num, count - 1);\n\t\t\tbacktrack(comb, N, counter, results);\n\t\t\tcomb.removeLast();\n\t\t\tcounter.put(num, count);\n\t\t}\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/Permutation_II.java",
    "title": "Permutation II",
    "slug": "permutation-ii",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Permutation II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/Permutation_II.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution10 {\n\tpublic List<List<Integer>> permuteUnique(int[] nums) {\n\t\tList<List<Integer>> solution = new ArrayList<>();\n\t\tgeneratePermutations(nums, solution, 0, nums.length);\n\t\treturn solution;\n\t}\n\n\tvoid generatePermutations(int[] choices, List<List<Integer>> solution, int tempIndex, int size) {\n\n\t\tif (tempIndex == size) {\n\t\t\tList<Integer> ds = new ArrayList<>();\n\t\t\tfor (int i = 0; i < choices.length; i++) {\n\t\t\t\tds.add(choices[i]);\n\t\t\t}\n\t\t\tsolution.add(new ArrayList<>(ds));\n\t\t\treturn;\n\t\t}\n\n\t\tfor (int i = tempIndex; i < size; i++) {\n\t\t\tint x = choices[i];\n\t\t\tchoices[i] = choices[tempIndex];\n\t\t\tchoices[tempIndex] = x;\n\t\t\tgeneratePermutations(choices, solution, tempIndex + 1, size);\n\t\t\tx = choices[i];\n\t\t\tchoices[i] = choices[tempIndex];\n\t\t\tchoices[tempIndex] = x;\n\n\t\t}\n\n\t}\n\n}\n\npublic class Permutation_II {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/RatInaMaze.java",
    "title": "Rat Ina Maze",
    "slug": "rat-ina-maze",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Rat Ina Maze using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/RatInaMaze.java",
    "sourceCode": "class RatMaze {\n\n\tstatic int N;\n\n\tvoid printSolution(int sol[][]) {\n\t\tfor (int i = 0; i < N; i++) {\n\t\t\tfor (int j = 0; j < N; j++)\n\t\t\t\tSystem.out.print(\" \" + sol[i][j] + \" \");\n\t\t\tSystem.out.println();\n\t\t}\n\t}\n\n\t// Path should exist and point(x,y) should be with in the range\n\tboolean isSafe(int maze[][], int x, int y) {\n\t\treturn (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);\n\t}\n\n\tboolean solveMazeUtil(int maze[][], int x, int y, int sol[][]) {\n\t\t// We reached the end corner of the matrix - means reached destination\n\t\tif (x == N - 1 && y == N - 1 && maze[x][y] == 1) {\n\t\t\tsol[x][y] = 1;\n\t\t\treturn true;\n\t\t}\n\t\tif (isSafe(maze, x, y) == true) {\n\t\t\tif (sol[x][y] == 1)\n\t\t\t\treturn false;\n\t\t\tsol[x][y] = 1;\n\n\t\t\tif (solveMazeUtil(maze, x + 1, y, sol))\n\t\t\t\treturn true;\n\t\t\tif (solveMazeUtil(maze, x, y + 1, sol))\n\t\t\t\treturn true;\n\n\t\t\t// backtrack\n\t\t\tsol[x][y] = 0;\n\n\t\t\t// No solution\n\t\t\treturn false;\n\t\t}\n\t\t// No solution\n\t\treturn false;\n\t}\n\n\tboolean solveMaze(int maze[][]) {\n\t\tint sol[][] = new int[N][N];\n\t\tif (solveMazeUtil(maze, 0, 0, sol) == false) {\n\t\t\tSystem.out.print(\"Solution doesn't exist\");\n\t\t\treturn false;\n\t\t}\n\t\tprintSolution(sol);\n\t\treturn true;\n\t}\n\n\tpublic static void main(String args[]) {\n\t\tRatMaze rat = new RatMaze();\n\t\tint maze[][] = { { 1, 0, 0, 0 }, { 1, 1, 0, 1 }, { 0, 1, 0, 0 }, { 1, 1, 1, 1 } };\n\t\tN = maze.length;\n\t\trat.solveMaze(maze);\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/RegularExpressionMatching.java",
    "title": "Regular Expression Matching",
    "slug": "regular-expression-matching",
    "topic": "Backtracking",
    "difficulty": "Hard",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Regular Expression Matching using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/RegularExpressionMatching.java",
    "sourceCode": "/*\n   \n   main idea:\n   \n       using two pointers i, j go through each character of s and p\n       \n       for wildcard * the two options are not use it or use it one or more times\n       \n       s=aa  p=a*                  a*\n                               /        \\\n                            a(use)   \"\"(not use)\n                           /     \\\n                       aa(use)    a(not use)\n                       \n       \n       \n       if we decide not to use it, \n           \n           we need to move j fwd twice (so that we skip *)\n           i remains the same\n\n       each time we use it,\n           move i fwd (meaning we matched one char of s)\n           j remains the same\n   \n   \n   recursive approach\n   \n       if i and j reach the end of s and p, means s matches the pattern\n   \n       if only j reaches the end, means s doesn't match the pattern\n       \n       if chars of s and p at index i and j are equal or if char at p is . we can move i and j fwd\n       \n       if char after p at j + 1 is *\n           \n           recurse without current char\n           recurse using current char       << check if chars at i, j are equal\n       \n       otherwise, we can recurse moving both i and j fwd\n       \n   --\n   \n   improve time complexity using DP Top/Down Memoization\n   \n   dp cache is a bidimensional array of size i + 1, j + 1\n   \n   if cache has the answer for a given i, j, return from there, otherwise, compute and update cache\n   */\n\npublic class RegularExpressionMatching {\n\n\tpublic boolean isMatch(String s, String p) {\n\t\treturn isMatch(s, p, 0, 0, new Boolean[s.length() + 1][p.length() + 1]);\n\t}\n\n\tprivate boolean isMatch(String s, String p, int i, int j, Boolean[][] dp) {\n\t\tif (i >= s.length() && j >= p.length()) {\n\t\t\treturn true;\n\t\t}\n\n\t\tif (j >= p.length()) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// if(dp[i][j] != null){\n\t\t// return dp[i][j];\n\t\t// }\n\n\t\tboolean matchCondition = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');\n\t\tboolean result;\n\t\tif (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n\t\t\tresult = isMatch(s, p, i, j + 2, dp) || matchCondition && isMatch(s, p, i + 1, j, dp);\n\t\t} else {\n\t\t\tresult = matchCondition == true ? isMatch(s, p, i + 1, j + 1, dp) : false;\n\t\t}\n\n\t\treturn result;\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/RestoreIpAddress.java",
    "title": "Restore Ip Address",
    "slug": "restore-ip-address",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Restore Ip Address using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/RestoreIpAddress.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class RestoreIpAddress {\n\n\tList<String> ans = new ArrayList<>();\n\n\tvoid backtrack(String s, String path, int index, int count) {\n\t\tif (count > 4)\n\t\t\treturn;\n\t\tif (count == 4 && index >= s.length()) {\n\t\t\tans.add(path.substring(0, path.length() - 1));\n\t\t\treturn;\n\t\t}\n\t\tfor (int i = 1; i <= 3 && index + i <= s.length(); i++) {\n\t\t\tString num = s.substring(index, index + i);\n\t\t\tif (num.charAt(0) == '0' && i != 1)\n\t\t\t\tbreak;\n\t\t\telse if (Integer.parseInt(num) <= 255) {\n\t\t\t\tbacktrack(s, path + s.substring(index, index + i) + \".\", index + i, count + 1);\n\t\t\t}\n\t\t}\n\t}\n\n\tpublic List<String> restoreIpAddresses(String s) {\n\t\tbacktrack(s, \"\", 0, 0);\n\t\treturn ans;\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/Subsets_I.java",
    "title": "Subsets I",
    "slug": "subsets-i",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Subsets I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/Subsets_I.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class Subsets_I {\n\n\tpublic static List<List<Integer>> subsets11(int[] nums) {\n\t\tList<List<Integer>> res = new ArrayList<>();\n\t\tsubset1(nums, 0, new ArrayList<>(), res);\n\t\treturn res;\n\t}\n\n\tpublic static void subset1(int[] nums, int idx, List<Integer> list, List<List<Integer>> res) {\n\t\tres.add(new ArrayList<>(list));\n\t\tfor (int i = idx; i < nums.length; i++) {\n\t\t\tlist.add(nums[i]);\n\t\t\tsubset1(nums, i + 1, list, res);\n\t\t\tlist.remove(list.size() - 1);\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n\tstatic public List<List<Integer>> subsetsWithDup(int[] nums) {\n\t\tArrays.sort(nums);\n\t\tList<List<Integer>> res = new ArrayList<>();\n\t\tsubset12(nums, 0, new ArrayList<>(), res);\n\t\treturn res;\n\t}\n\n\tstatic public void subset12(int[] nums, int idx, List<Integer> list, List<List<Integer>> res) {\n\t\tres.add(new ArrayList<>(list));\n\t\tfor (int i = idx; i < nums.length; i++) {\n\t\t\tif (i > idx && nums[i] == nums[i - 1])\n\t\t\t\tcontinue;\n\t\t\tlist.add(nums[i]);\n\t\t\tsubset1(nums, i + 1, list, res);\n\t\t\tlist.remove(list.size() - 1);\n\t\t}\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/Subsets_II.java",
    "title": "Subsets II",
    "slug": "subsets-ii",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Subsets II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/Subsets_II.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class Subsets_II {\n\n\tpublic List<List<Integer>> subsetsWithDup(int[] nums) {\n\t\tArrays.sort(nums); // To handle duplicate\n\t\tList<List<Integer>> res = new ArrayList<>();\n\t\tsubset2(res, new ArrayList<>(), nums, 0);\n\t\treturn res;\n\t}\n\n\tpublic void subset2(List<List<Integer>> res, List<Integer> ls, int[] nums, int idx) {\n\t\tres.add(new ArrayList<>(ls));\n\t\tfor (int i = idx; i < nums.length; i++) {\n\t\t\tif (i > idx && nums[i] == nums[i - 1])\n\t\t\t\tcontinue; // skip the duplicates, except for the first time\n\t\t\tls.add(nums[i]); // add the element to list\n\t\t\tsubset2(res, ls, nums, i + 1);\n\t\t\tls.remove(ls.size() - 1); // backtrack, remove the element from list\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/SudukoSolver.java",
    "title": "Sudoku Solver",
    "slug": "sudoku-solver",
    "topic": "Backtracking",
    "difficulty": "Hard",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Sudoku Solver using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/SudukoSolver.java",
    "sourceCode": "//T.C :-O(9^(n^2)), for each cell in the n^2 board, we have 9 possible numbers\nclass Solution1 {\n\n\tpublic void solveSudoku(char[][] board) {\n\t\thelper(board);\n\t}\n\n\tboolean helper(char[][] board) {\n\t\tfor (int row = 0; row < board.length; row++) {\n\t\t\tfor (int col = 0; col < board.length; col++) {\n\t\t\t\tif (board[row][col] == '.') {\n\t\t\t\t\tfor (int val = 1; val <= 9; val++) {\n\t\t\t\t\t\tif (isSafe(row, col, (char) (val + '0'), board)) {\n\t\t\t\t\t\t\tchar c = (char) (val + '0');\n\t\t\t\t\t\t\tboard[row][col] = c;\n\t\t\t\t\t\t\tif (helper(board))\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\tboard[row][col] = '.';\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t// if we reached here means we tried all value from 1 to 9 at that cell but no\n\t\t\t\t\t// one satisfying the all the three conditions it means current\n\t\t\t\t\t// state of board is wrong we have to backtrack to change it's previous state so\n\t\t\t\t\t// return false\n\t\t\t\t\t// that mean temp will store false and it goes to backtracking step\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t// if we reached here means our board if filled return true\n\t\treturn true;\n\t}\n\n\tboolean isSafe(int row, int col, char val, char[][] board) {\n\t\tfor (int i = 0; i < board.length; i++) {\n\t\t\t// check row\n\t\t\tif (board[row][i] == val)\n\t\t\t\treturn false;\n\n\t\t\t// check column\n\t\t\tif (board[i][col] == val)\n\t\t\t\treturn false;\n\n\t\t\t// check 3*3 matrix\n\t\t\tif (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == val)\n\t\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n}\n\npublic class SudukoSolver {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/UniquePathsIII.java",
    "title": "Unique Paths III",
    "slug": "unique-paths-iii",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Unique Paths III using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/UniquePathsIII.java",
    "sourceCode": "class UniquePathsIII {\n\n\tpublic int uniquePathsIII(int[][] grid) {\n\t\tint zero = 0; // Count the 0's\n\t\tint sx = 0; // starting x index\n\t\tint sy = 0; // starting y index\n\n\t\tfor (int r = 0; r < grid.length; r++) { // r = row\n\t\t\tfor (int c = 0; c < grid[0].length; c++) { // c = column\n\t\t\t\tif (grid[r][c] == 0)\n\t\t\t\t\tzero++; // if current cell is 0, count it.\n\t\t\t\telse if (grid[r][c] == 1) {\n\t\t\t\t\tsx = r; // starting x co-ordinate\n\t\t\t\t\tsy = c; // starting y co-ordinate\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn dfs(grid, sx, sy, zero);\n\t}\n\n\tpublic int dfs(int grid[][], int x, int y, int zero) {\n\t\t// Base Condition\n\t\tif (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] == -1) {\n\t\t\treturn 0;\n\t\t}\n\t\tif (grid[x][y] == 2) {\n\t\t\treturn zero == -1 ? 1 : 0; // Why zero = -1, because in above example we have 9 zero's. So, when we reach\n\t\t\t\t\t\t\t\t\t\t// the final cell we are covering one cell extra then the zero count.\n\t\t\t// If that's the case we find the path and return '1' otherwise return '0';\n\t\t}\n\t\tgrid[x][y] = -1; // mark the visited cells as -1;\n\t\tzero--; // and reduce the zero by 1\n\n\t\tint totalPaths = dfs(grid, x + 1, y, zero) + // calculating all the paths available in 4 directions\n\t\t\t\tdfs(grid, x - 1, y, zero) + dfs(grid, x, y + 1, zero) + dfs(grid, x, y - 1, zero);\n\n\t\t// Let's say if we are not able to count all the paths. Now we use Backtracking\n\t\t// over here\n\t\tgrid[x][y] = 0;\n\t\tzero++;\n\n\t\treturn totalPaths; // if we get all the paths, simply return it.\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/ValidSuduko.java",
    "title": "Valid Sudoku",
    "slug": "valid-sudoku",
    "topic": "Backtracking",
    "difficulty": "Hard",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Valid Sudoku using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/ValidSuduko.java",
    "sourceCode": "class Solution3 {\n\tpublic boolean isValidSudoku(char[][] board) {\n\t\tfor (int row = 0; row < 9; row++) {\n\t\t\tfor (int column = 0; column < 9; column++) {\n\t\t\t\tif (board[row][column] != '.' && !isValidPlacement(board, board[row][column], row, column))\n\t\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tprivate boolean isNumberInRow(char[][] board, char number, int row, int column) {\n\t\tfor (int i = 0; i < 9; i++) {\n\t\t\tif (column != i && board[row][i] == number)\n\t\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tprivate boolean isNumberInColumn(char[][] board, char number, int row, int column) {\n\t\tfor (int i = 0; i < 9; i++) {\n\t\t\tif (row != i && board[i][column] == number)\n\t\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tprivate boolean isNumberInBox(char[][] board, char number, int row, int column) {\n\t\tint boxRow = row - row % 3;\n\t\tint boxColumn = column - column % 3;\n\t\tfor (int i = boxRow; i < boxRow + 3; i++) {\n\t\t\tfor (int j = boxColumn; j < boxColumn + 3; j++) {\n\t\t\t\tif (row != i && column != j && board[i][j] == number)\n\t\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}\n\n\tprivate boolean isValidPlacement(char[][] board, char number, int row, int column) {\n\t\treturn !isNumberInRow(board, number, row, column) && !isNumberInColumn(board, number, row, column)\n\t\t\t\t&& !isNumberInBox(board, number, row, column);\n\t}\n}\n\npublic class ValidSuduko {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/WildCard.java",
    "title": "Wild Card",
    "slug": "wild-card",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Wild Card using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/WildCard.java",
    "sourceCode": "public class WildCard {\n\n\tBoolean dp[][];\n\n\tpublic boolean isMatch(String s, String p) {\n\t\tint m = p.length();\n\t\tint n = s.length();\n\n\t\tdp = new Boolean[m][n];\n\n\t\treturn is_match(m - 1, n - 1, p, s);\n\t}\n\n\tprivate boolean is_match(int m, int n, String p, String s) {\n\n\t\t// Base Case\n\t\t// if m and n both are 0 i.e strings are matching\n\t\tif (m < 0 && n < 0)\n\t\t\treturn true;\n\n\t\t// if n has some character but m is empty\n\t\tif (m < 0 && n >= 0)\n\t\t\treturn false;\n\n\t\t// if m has some character but n is empty\n\n\t\tif (n < 0 && m >= 0) {\n\t\t\t/*\n\t\t\t * if str = \"\" && pattern = \"***\" then return true; because we can neglect the *\n\t\t\t * also else str = \"\" && pattern = \"sd**\" return false; because after neglecting\n\t\t\t * the * pattern has some more character\n\t\t\t * \n\t\t\t */\n\t\t\tfor (int i = 0; i <= m; i++) {\n\t\t\t\tif (p.charAt(i) != '*')\n\t\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\n\t\t// Memorisation\n\t\tif (dp[m][n] != null)\n\t\t\treturn dp[m][n];\n\n\t\t// if both the character is equal || patern[m] == ?\n\t\tif (p.charAt(m) == s.charAt(n) || p.charAt(m) == '?') {\n\t\t\treturn dp[m][n] = is_match(m - 1, n - 1, p, s);\n\t\t}\n\n\t\t// if p has '*'\n\t\tif (p.charAt(m) == '*') {\n\t\t\treturn dp[m][n] = is_match(m - 1, n, p, s) || is_match(m, n - 1, p, s);\n\t\t}\n\t\t// if both the character is not equal\n\t\treturn false;\n\n\t}\n\n}"
  },
  {
    "key": "Backtracking:backtracking/WordBreak_I.java",
    "title": "Word Break",
    "slug": "word-break",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Word Break using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/WordBreak_I.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.List;\n\npublic class WordBreak_I {\n\tpublic boolean wordBreak(String s, List<String> wordDict) {\n\t\t// For Memoization\n\t\tHashMap<String, Boolean> map = new HashMap<>();\n\t\treturn helper(s, wordDict, map);\n\t}\n\n\tpublic boolean helper(String target, List<String> wordDict, HashMap<String, Boolean> map) {\n\n\t\tif (map.containsKey(target))\n\t\t\treturn map.get(target);\n\n\t\t// If the target lenght is empty, it means we have parsed the string and it is\n\t\t// avaliable in the dictionary right\n\t\tif (target.isEmpty())\n\t\t\treturn true;\n\n\t\tfor (String word : wordDict) {\n\n\t\t\tSystem.out.println(target);\n\t\t\tif (target.startsWith(word)) {\n\n\t\t\t\tif (helper(target.substring(word.length()), wordDict, map)) {\n\t\t\t\t\t// System.out.println(target);\n\t\t\t\t\tmap.put(target, true);\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t}\n\t\t}\n\n\t\tmap.put(target, false);\n\t\treturn false;\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/WordSearch_I.java",
    "title": "Word Search I",
    "slug": "word-search-i",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Word Search I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/WordSearch_I.java",
    "sourceCode": "/*\n\nTime Complexity:  O(m*n*4^k), where “K” is the length of the word. And we are searching for the letter m*n times in the worst case. Here 4 in 4^k is because at each level of our decision tree we are making 4 recursive calls which equal 4^k in the worst case.\n\nSpace Complexity: O(K), Where k is the length of the given words.\n\n*/\n\npublic class WordSearch_I {\n\tpublic boolean exist(char[][] board, String word) {\n\n\t\tint m = board.length;\n\t\tint n = board[0].length;\n\n\t\tint index = 0;\n\n\t\t// First search the first character\n\t\tfor (int i = 0; i < m; i++) {\n\t\t\tfor (int j = 0; j < n; j++) {\n\n\t\t\t\tif (board[i][j] == word.charAt(index)) {\n\t\t\t\t\tif (searchNext(board, word, i, j, index, m, n))\n\t\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\tprivate boolean searchNext(char[][] board, String word, int row, int col, int index, int m, int n) {\n\n\t\t// if index reaches at the end that means we have found the word\n\t\tif (index == word.length())\n\t\t\treturn true;\n\n\t\t// Checking the boundaries if the character at which we are placed is not\n\t\t// the required character\n\t\tif (row < 0 || col < 0 || row == m || col == n || board[row][col] != word.charAt(index)\n\t\t\t\t|| board[row][col] == '!')\n\t\t\treturn false;\n\n\t\t// this is to prevent reusing of the same character\n\t\tchar c = board[row][col];\n\t\tboard[row][col] = '!';\n\n\t\t// top direction\n\t\tboolean top = searchNext(board, word, row - 1, col, index + 1, m, n);\n\t\t// right direction\n\t\tboolean right = searchNext(board, word, row, col + 1, index + 1, m, n);\n\t\t// bottom direction\n\t\tboolean bottom = searchNext(board, word, row + 1, col, index + 1, m, n);\n\t\t// left direction\n\t\tboolean left = searchNext(board, word, row, col - 1, index + 1, m, n);\n\n\t\tboard[row][col] = c; // undo change\n\n\t\treturn top || right || bottom || left;\n\t}\n}"
  },
  {
    "key": "Backtracking:backtracking/WordSearch_II.java",
    "title": "Word Search II",
    "slug": "word-search-ii",
    "topic": "Backtracking",
    "difficulty": "Medium",
    "tags": [
      "Backtracking",
      "Backtracking"
    ],
    "description": "Practice Word Search II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/backtracking/WordSearch_II.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Map;\n\npublic class WordSearch_II {\n\n\tclass TrieNode {\n\t\tString word;\n\t\tMap<Character, TrieNode> children;\n\n\t\tTrieNode() {\n\t\t\tchildren = new HashMap<>();\n\t\t}\n\t}\n\n\tvoid insertCharToTrie(TrieNode rootNode, String word) {\n\t\tTrieNode temp = rootNode;\n\t\tfor (char ch : word.toCharArray()) {\n\t\t\tif (!temp.children.containsKey(ch)) {\n\t\t\t\tTrieNode newTrieNode = new TrieNode();\n\t\t\t\ttemp.children.put(ch, newTrieNode);\n\t\t\t\ttemp = newTrieNode;\n\t\t\t} else {\n\t\t\t\ttemp = temp.children.get(ch);\n\t\t\t}\n\t\t}\n\t\ttemp.word = word;\n\t}\n\n\tpublic List<String> findWords(char[][] board, String[] words) {\n\t\tTrieNode rootNode = new TrieNode();\n\t\tfor (String string : words) {\n\t\t\tinsertCharToTrie(rootNode, string);\n\t\t}\n\n\t\tList<String> result = new LinkedList<>();\n\t\tint rows = board.length, cols = (rows == 0) ? rows : board[0].length;\n\t\tfor (int i = 0; i < board.length; i++) {\n\t\t\tfor (int j = 0; j < board[0].length; j++) {\n\t\t\t\tif (rootNode.children.containsKey(board[i][j])) {\n\t\t\t\t\tdfs(board, i, j, rows, cols, rootNode, result);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t}\n\n\tprivate static void dfs(char[][] board, int row, int col, int rows, int cols, TrieNode root, List<String> result) {\n\t\tchar currentChar = board[row][col];\n\t\tTrieNode currentNode = root.children.get(currentChar);\n\n\t\tif (currentNode.word != null) {\n\t\t\tresult.add(currentNode.word);\n\t\t\tcurrentNode.word = null;\n\t\t}\n\n\t\t// mark the current letter before the starting dfs: sort of visited node\n\t\tboard[row][col] = '*';\n\n\t\t// explore neighbor cells in all 4 directions\n\t\tint[][] directions = new int[][] { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };\n\t\tfor (int[] direction : directions) {\n\t\t\tint newRow = row + direction[0], newCol = col + direction[1];\n\n\t\t\tif ((newRow < 0) || (newCol < 0) || (newRow >= rows) || (newCol >= cols)) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tif (currentNode.children.containsKey(board[newRow][newCol])) {\n\t\t\t\tdfs(board, newRow, newCol, rows, cols, currentNode, result);\n\t\t\t}\n\t\t}\n\n\t\t// restore the original letter in the board: sort of remove from visited node\n\t\tboard[row][col] = currentChar;\n\n\t\t// prune the leaf nodes\n\t\tif (currentNode.children.isEmpty()) {\n\t\t\troot.children.remove(currentChar);\n\t\t}\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/AggresiveCows.java",
    "title": "Aggresive Cows",
    "slug": "aggresive-cows",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Aggresive Cows using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/AggresiveCows.java",
    "sourceCode": "public class AggresiveCows {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/AllocateBooksToStudents.java",
    "title": "Allocate Books To Students",
    "slug": "allocate-books-to-students",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Allocate Books To Students using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/AllocateBooksToStudents.java",
    "sourceCode": "import java.util.ArrayList;\n\npublic class AllocateBooksToStudents {\n\n\tpublic static int countSubarraysWithGivenSum(ArrayList<Integer> boards, int sum) {\n\t\tint count = 1;\n\t\tint totalSum = 0;\n\t\tfor (int num : boards) {\n\t\t\tif (num + totalSum > sum) {\n\t\t\t\ttotalSum = 0;\n\t\t\t\tcount++;\n\t\t\t}\n\t\t\ttotalSum += num;\n\t\t}\n\t\treturn count;\n\t}\n\n\tpublic static int findPages(ArrayList<Integer> boards, int n, int k) {\n\n\t\tif (k > n)\n\t\t\treturn -1;\n\t\tint low = 0, high = 0;\n\t\tfor (int i = 0; i < boards.size(); i++) {\n\t\t\tif (boards.get(i) > low)\n\t\t\t\tlow = boards.get(i);\n\t\t\thigh += boards.get(i);\n\t\t}\n\n\t\tint ans = -1;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tint countOfSubarraysWithGivenSum = countSubarraysWithGivenSum(boards, mid);\n\t\t\tif (countOfSubarraysWithGivenSum > k) {\n\t\t\t\tlow = mid + 1;\n\t\t\t} else {\n\t\t\t\t// it means we have k subarrays with given sum, so we can say this MAY BE our\n\t\t\t\t// answer\n\t\t\t\tans = mid;\n\t\t\t\t// Try find even better\n\t\t\t\thigh = mid - 1;\n\t\t\t}\n\t\t}\n\n\t\treturn ans;\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/BinarySearch.java",
    "title": "Binary Search",
    "slug": "binary-search",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Binary Search using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/BinarySearch.java",
    "sourceCode": "public class BinarySearch {\n\n\tpublic int search(int[] nums, int target) {\n\t\tint low = 0, high = nums.length - 1;\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\tif (nums[mid] == target)\n\t\t\t\treturn mid;\n\t\t\telse if (target > nums[mid])\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn -1;\n\t}\n\n\tpublic int recursiveSearch(int[] nums, int low, int high, int target) {\n\t\tif (low > high) {\n\t\t\treturn -1;\n\t\t}\n\n\t\tint mid = low + (high - low) / 2;\n\t\tif (nums[mid] == target)\n\t\t\treturn mid;\n\n\t\telse if (nums[mid] < target) {\n\t\t\treturn recursiveSearch(nums, mid + 1, high, target);\n\t\t}\n\n\t\telse {\n\t\t\treturn recursiveSearch(nums, low, mid - 1, target);\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/CapacityToShip.java",
    "title": "Capacity To Ship",
    "slug": "capacity-to-ship",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Capacity To Ship using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/CapacityToShip.java",
    "sourceCode": "import java.util.Arrays;\n\nclass Solution111 {\n\tpublic int shipWithinDays(int[] weights, int days) {\n\t\tint low = Arrays.stream(weights).max().getAsInt();\n\t\tint high = Arrays.stream(weights).sum();\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\t// Note : Incase we are getting more no of days, it means our capcity is low,\n\t\t\t// so we have to increase our capacity - so move to increasing side, low = mid\n\t\t\t// +1, so that we will get least no of days\n\t\t\tif (getNumOfDays(weights, days, mid) > days)\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn low;\n\t}\n\n\tpublic int getNumOfDays(int[] weights, int days, int midAsCapacityPerDay) {\n\t\tint sum = 0;\n\t\tint count = 1;\n\t\tfor (int weight : weights) {\n\t\t\tif (count > days)\n\t\t\t\tbreak;\n\t\t\tif (sum + weight > midAsCapacityPerDay) {\n\t\t\t\tcount += 1;\n\t\t\t\tsum = 0;\n\t\t\t}\n\t\t\tsum += weight;\n\t\t}\n\t\treturn count;\n\t}\n}\n\npublic class CapacityToShip {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/FindAPeakElementIN_1DMatrix.java",
    "title": "Find A Peak Element IN 1 D Matrix",
    "slug": "find-a-peak-element-in-1-d-matrix",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Find A Peak Element IN 1 D Matrix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/FindAPeakElementIN_1DMatrix.java",
    "sourceCode": "public class FindAPeakElementIN_1DMatrix {\n\n\tpublic int findPeakElement1(int[] nums) {\n\t\tint len = nums.length;\n\t\tif (len == 1)\n\t\t\treturn 0;\n\n\t\t// if the first element is the peak element - then it is greater the its next\n\t\t// element same for the last element\n\t\tif (nums[0] > nums[1])\n\t\t\treturn 0;\n\n\t\tif (nums[len - 1] > nums[len - 2])\n\t\t\treturn len - 1;\n\n\t\tfor (int i = 1; i <= len - 2; i++) {\n\n\t\t\tif (nums[i] > nums[i + 1] && nums[i] > nums[i - 1]) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\n\t\treturn 0;\n\t}\n\n\tpublic int findPeakElement2(int[] nums) {\n\t\tint len = nums.length;\n\t\tif (len == 1 || nums[0] > nums[1])\n\t\t\treturn 0;\n\t\tif (nums[len - 1] > nums[len - 2])\n\t\t\treturn len - 1;\n\n\t\tint low = 1, high = len - 2;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\n\t\t\tif (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1])\n\t\t\t\treturn mid;\n\t\t\tif (nums[mid] < nums[mid + 1])\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\n\t\t}\n\t\treturn 0;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/FindMinimum.java",
    "title": "Find Minimum",
    "slug": "find-minimum",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Find Minimum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/FindMinimum.java",
    "sourceCode": "public class FindMinimum {\n\n\tpublic static int findMin(int[] arr) {\n\t\tint low = 0, high = arr.length - 1;\n\t\tint ans = Integer.MAX_VALUE;\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\n\t\t\t// search space is already sorted\n\t\t\t// then arr[low] will always be\n\t\t\t// the minimum in that search space:\n\t\t\tif (arr[low] <= arr[high]) {\n\t\t\t\tans = Math.min(ans, arr[low]);\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t// if left part is sorted:\n\t\t\tif (arr[low] <= arr[mid]) {\n\t\t\t\t// keep the minimum:\n\t\t\t\tans = Math.min(ans, arr[low]);\n\n\t\t\t\t// Eliminate left half:\n\t\t\t\tlow = mid + 1;\n\n\t\t\t} else { // if right part is sorted:\n\n\t\t\t\t// keep the minimum:\n\t\t\t\tans = Math.min(ans, arr[mid]);\n\n\t\t\t\t// Eliminate right half:\n\t\t\t\thigh = mid - 1;\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/FindTheFirstAndLastCountOccurences.java",
    "title": "Find The First And Last Count Occurences",
    "slug": "find-the-first-and-last-count-occurences",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Find The First And Last Count Occurences using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/FindTheFirstAndLastCountOccurences.java",
    "sourceCode": "public class FindTheFirstAndLastCountOccurences {\n\n\tpublic static int firstOccurrence(int[] arr, int n, int k) {\n\t\tint low = 0, high = n - 1;\n\t\tint first = -1;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\t// maybe an answer\n\t\t\tif (arr[mid] == k) {\n\t\t\t\tfirst = mid;\n\t\t\t\t// look for smaller index on the left\n\t\t\t\thigh = mid - 1;\n\t\t\t} else if (arr[mid] < k) {\n\t\t\t\tlow = mid + 1; // look on the right\n\t\t\t} else {\n\t\t\t\thigh = mid - 1; // look on the left\n\t\t\t}\n\t\t}\n\t\treturn first;\n\t}\n\n\tpublic static int lastOccurrence(int[] arr, int n, int k) {\n\t\tint low = 0, high = n - 1;\n\t\tint last = -1;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\t// maybe an answer\n\t\t\tif (arr[mid] == k) {\n\t\t\t\tlast = mid;\n\t\t\t\t// look for larger index on the right\n\t\t\t\tlow = mid + 1;\n\t\t\t} else if (arr[mid] < k) {\n\t\t\t\tlow = mid + 1; // look on the right\n\t\t\t} else {\n\t\t\t\thigh = mid - 1; // look on the left\n\t\t\t}\n\t\t}\n\t\treturn last;\n\t}\n\n\tpublic static int[] firstAndLastPosition(int[] arr, int n, int k) {\n\t\tint first = firstOccurrence(arr, n, k);\n\t\tif (first == -1)\n\t\t\treturn new int[] { -1, -1 };\n\t\tint last = lastOccurrence(arr, n, k);\n\t\treturn new int[] { first, last };\n\t}\n\n\tpublic static int count(int arr[], int n, int x) {\n\t\tint[] ans = firstAndLastPosition(arr, n, x);\n\t\tif (ans[0] == -1)\n\t\t\treturn 0;\n\t\treturn (ans[1] - ans[0] + 1);\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tint[] arr = { 2, 4, 6, 8, 8, 8, 11, 13 };\n\t\tint n = 8, x = 8;\n\t\tint ans = count(arr, n, x);\n\t\tSystem.out.println(\"The number of occurrences is: \" + ans);\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/FindThePeakElementInA2DMatrix.java",
    "title": "Find The Peak Element In A2 D Matrix",
    "slug": "find-the-peak-element-in-a2-d-matrix",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Find The Peak Element In A2 D Matrix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/FindThePeakElementInA2DMatrix.java",
    "sourceCode": "public class FindThePeakElementInA2DMatrix {\n\n\tpublic int[] findPeakGrid1(int[][] mat) {\n\t\tint[][] directions = new int[][] { { 0, 1 }, { 0, -1 }, { -1, 0 }, { 1, 0 } };\n\t\tfor (int r = 0; r < mat.length; r++) {\n\t\t\tfor (int c = 0; c < mat[0].length; c++) {\n\t\t\t\tboolean isGreater = true;\n\t\t\t\tfor (int[] dir : directions) {\n\t\t\t\t\tint row = r + dir[0];\n\t\t\t\t\tint col = c + dir[1];\n\t\t\t\t\tif (row < 0 || row >= mat.length || col < 0 || col >= mat[0].length)\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\tif (mat[r][c] <= mat[row][col])\n\t\t\t\t\t\tisGreater = false;\n\t\t\t\t}\n\t\t\t\tif (isGreater)\n\t\t\t\t\treturn new int[] { r, c };\n\t\t\t}\n\t\t}\n\t\treturn new int[] { -1, -1 };\n\t}\n\n\tpublic int[] findPeakGrid(int[][] mat) {\n\t\tint low = 0;\n\t\tint high = mat[0].length - 1;\n\t\tint rows = mat.length;\n\t\twhile (low <= high) {\n\t\t\tint midColumnIndex = low + (high - low) / 2;\n\t\t\t// step1 find the maxRow which is the midColumn which is having maxElement\n\t\t\tint maxRowIndex = 0;\n\t\t\tfor (int i = 0; i < rows; i++) {\n\t\t\t\tmaxRowIndex = (mat[i][midColumnIndex] > mat[maxRowIndex][midColumnIndex]) ? i : maxRowIndex;\n\t\t\t}\n\t\t\t// Now we have mat[maxRowIndex][midColumnIndex] it means in a column+row, we\n\t\t\t// pick on number, so top and bottom sorted\n\t\t\t// Step2: think about left and right\n\t\t\tboolean isLeftHigh = (midColumnIndex - 1 >= 0)\n\t\t\t\t\t&& (mat[maxRowIndex][midColumnIndex] < mat[maxRowIndex][midColumnIndex - 1]);\n\n\t\t\tboolean isRightHigh = (midColumnIndex + 1 < mat[0].length)\n\t\t\t\t\t&& (mat[maxRowIndex][midColumnIndex] < mat[maxRowIndex][midColumnIndex + 1]);\n\n\t\t\tif (!isLeftHigh && !isRightHigh) {\n\t\t\t\treturn new int[] { maxRowIndex, midColumnIndex };\n\t\t\t} else if (isLeftHigh) {\n\t\t\t\thigh = midColumnIndex - 1;\n\t\t\t} else {\n\t\t\t\tlow = midColumnIndex + 1;\n\t\t\t}\n\n\t\t}\n\t\treturn null;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/FloorAndCeil.java",
    "title": "Floor And Ceil",
    "slug": "floor-and-ceil",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Floor And Ceil using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/FloorAndCeil.java",
    "sourceCode": "public class FloorAndCeil {\n\n\tstatic int findFloor(int[] arr, int n, int x) {\n\t\tint low = 0, high = n - 1;\n\t\tint ans = -1;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\t// maybe an answer\n\t\t\tif (arr[mid] <= x) {\n\t\t\t\tans = arr[mid];\n\t\t\t\t// look for smaller index on the left\n\t\t\t\tlow = mid + 1;\n\t\t\t} else {\n\t\t\t\thigh = mid - 1; // look on the right\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tstatic int findCeil(int[] arr, int n, int x) {\n\t\tint low = 0, high = n - 1;\n\t\tint ans = -1;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\t// maybe an answer\n\t\t\tif (arr[mid] >= x) {\n\t\t\t\tans = arr[mid];\n\t\t\t\t// look for smaller index on the left\n\t\t\t\thigh = mid - 1;\n\t\t\t} else {\n\t\t\t\tlow = mid + 1; // look on the right\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic static int[] getFloorAndCeil(int[] arr, int n, int x) {\n\t\tint f = findFloor(arr, n, x);\n\t\tint c = findCeil(arr, n, x);\n\t\treturn new int[] { f, c };\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tint[] arr = { 3, 4, 4, 7, 8, 10 };\n\t\tint n = 6, x = 5;\n\t\tint[] ans = getFloorAndCeil(arr, n, x);\n\t\tSystem.out.println(\"The floor and ceil are: \" + ans[0] + \" \" + ans[1]);\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/Heaters.java",
    "title": "Heaters",
    "slug": "heaters",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Heaters using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/Heaters.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class Heaters {\n\n\tclass Solution {\n//\t    public int findRadius(int[] houses, int[] heaters) {\n//\t         int res = Integer.MIN_VALUE;\n//\t         for(int house:houses){\n//\t             int dis = Integer.MAX_VALUE;\n//\t             for(int i=0;i<heaters.length;i++){\n//\t                 dis = Math.min(dis,Math.abs(heaters[i]-house));\n//\t             }\n//\t             res = Math.max(res,dis);\n//\t         }\n//\t         return res;\n//\t     }\n\n\t\tpublic int findRadius(int[] houses, int[] heaters) {\n\t\t\tint i = 0, j = (int) 1e9;\n\t\t\tArrays.sort(houses);\n\t\t\tArrays.sort(heaters);\n\t\t\twhile (i <= j) {\n\t\t\t\tint mid = (i + j) / 2;\n\n\t\t\t\tif (isPossible(houses, heaters, mid)) {\n\t\t\t\t\tj = mid - 1;\n\t\t\t\t} else {\n\t\t\t\t\ti = mid + 1;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn i;\n\t\t}\n\n\t\tprivate boolean isPossible(int[] houses, int[] heaters, int r) {\n\t\t\tint i = 0, j = 0;\n\t\t\twhile (i < houses.length) {\n\t\t\t\tif (houses[i] < heaters[j] - r) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\tif (houses[i] > heaters[j] + r) {\n\t\t\t\t\tif (++j == heaters.length) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t\ti--;\n\t\t\t\t}\n\t\t\t\ti++;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/HIndex.java",
    "title": "H Index",
    "slug": "h-index",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice H Index using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/HIndex.java",
    "sourceCode": "public class HIndex {\n\t\n\t//HIndex i O(n)\n\t public int hIndex(int[] citations) {\n\t\t    int n = citations.length;\n\t\t    int[] buckets = new int[n+1];\n\t\t    for(int c : citations) {\n\t\t        if(c >= n) {\n\t\t            buckets[n]++;\n\t\t        } else {\n\t\t            buckets[c]++;\n\t\t        }\n\t\t    }\n\t\t    int count = 0;\n\t\t    for(int i = n; i >= 0; i--) {\n\t\t        count += buckets[i];\n\t\t        if(count >= i) {\n\t\t            return i;\n\t\t        }\n\t\t    }\n\t\t    return 0;\n\t\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/HIndex_II.java",
    "title": "H Index II",
    "slug": "h-index-ii",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice H Index II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/HIndex_II.java",
    "sourceCode": "public class HIndex_II {\n\n\t// public int hIndex(int[] citations) {\n\t// int n = citations.length;\n\t// int[] count = new int[n+1];\n\t// for(int i=0;i<n;i++){\n\t// if(citations[i]>=n)\n\t// count[n]++;\n\t// else\n\t// count[citations[i]]++;\n\t// }\n\t// int pages=0;\n\t// for(int i=n;i>=0;i--){\n\t// pages+=count[i];\n\t// if(pages>=i)\n\t// return i;\n\t// }\n\t// return 0;\n\t// }\n\n\tpublic int hIndex(int[] citations) {\n\t\tint left = 0;\n\t\tint right = citations.length - 1;\n\t\tint n = citations.length;\n\t\twhile (left <= right) {\n\t\t\tint mid = left + (right - left) / 2;\n\t\t\tint expectedCount = n - mid;\n\t\t\tif (citations[mid] == expectedCount)\n\t\t\t\treturn n - mid;\n\t\t\telse if (citations[mid] < expectedCount)\n\t\t\t\tleft = mid + 1;\n\t\t\telse\n\t\t\t\tright = mid - 1;\n\t\t}\n\t\treturn n - left;\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/KokoEatingBananas.java",
    "title": "Koko Eating Bananas",
    "slug": "koko-eating-bananas",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Koko Eating Bananas using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/KokoEatingBananas.java",
    "sourceCode": "import java.util.Arrays;\n\nclass Solution99 {\n\n\t  // Approach 1: Brute Force - TLE\n\n\t// Time complexity: O(m * n), where n is length of piles, m is max(piles)\n\t// Space complexity: O(1)\n\n\t// public int minEatingSpeed(int[] piles, int h) {\n//\t \tint speed = 1;\n//\t \twhile (true) {\n//\t \t\tif (getHoursToEat(piles,speed) <= h)\n//\t \t\t\tbreak;\n//\t \t\tspeed++;\n//\t \t}\n//\t \treturn speed;\n\t// }\n\n\n\n\t    public int minEatingSpeed(int[] piles, int h) {\n\t        int low =1;\n\t        int high = Arrays.stream(piles).max().getAsInt();\n\n\t        while (low <= high) {\n\t            int mid = (low + high) / 2;\n\t            int totalH = getHoursToEat(piles, mid);\n\t            if (totalH > h) {\n\t                low = mid + 1;\n\t            } else {\n\t                high = mid - 1;\n\t            }\n\t        }\n\t        return low;\n\t    }\n\n\t    private int getHoursToEat(int[] piles, int speed) {\n\t        int hours=0;\n\t        for (int pile : piles) {\n\t          hours += Math.ceil((double)(pile) / (double)(speed));\n\t\t\t}\n\t        return hours;\n\t    }\n\t}\n\npublic class KokoEatingBananas {\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/KthSmallestElementInASortedMatrix.java",
    "title": "Kth Smallest Element In A Sorted Matrix",
    "slug": "kth-smallest-element-in-a-sorted-matrix",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Kth Smallest Element In A Sorted Matrix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/KthSmallestElementInASortedMatrix.java",
    "sourceCode": "class Solution {\n\t// Approach 1: sorting - TC: O(NlogN) and space complexity : O(n)\n\t// public int kthSmallest(int[][] matrix, int k) {\n\t// int n = matrix.length;\n\t// int [] arr = new int[n*n];\n\t// int idx = 0;\n\t// for(int i = 0;i<n;i++){\n\t// for(int j = 0;j<n;j++){\n\t// arr[idx++] = matrix[i][j];\n\t// }\n\t// }\n\t// Arrays.sort(arr);\n\t// return arr[k - 1];\n\t// }\n\n\t// Approach 2: PriorityQueue - maxHeap maitains the largest number on top\n\t// TC : O(n^2logk) and SC: O(k)\n\t// public int kthSmallest(int[][] matrix, int k) {\n\t// int n = matrix.length+matrix[0].length;\n\t// PriorityQueue<Integer> pq = new\n\t// PriorityQueue<Integer>(Collections.reverseOrder());\n\t// for(int i=0;i<matrix.length;i++)\n\t// for(int j=0;j<matrix[0].length;j++)\n\t// {\n\n\t// pq.add(matrix[i][j]);\n\t// if(pq.size()>k)\n\t// pq.poll();\n\n\t// }\n\t// return pq.poll();\n\t// }\n\n\tpublic int kthSmallest(int[][] matrix, int k) {\n\t\t// Step 1: sorted, so take the search space\n\t\tint row = matrix.length, col = matrix[0].length;\n\t\tint low = matrix[0][0];\n\t\tint high = matrix[row - 1][col - 1];\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tif (getCountOfNumbersLessThanMid(matrix, mid, row, col) < k) {\n\t\t\t\tlow = mid + 1;\n\t\t\t\t// System.out.println(\"mid=\"+mid+\"\n\t\t\t\t// count=\"+getCountOfNumbersLessThanMid(matrix,mid,row,col));\n\t\t\t} else\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn low;\n\t}\n\n\tpublic int getCountOfNumbersLessThanMid(int[][] matrix, int mid, int row, int col) {\n\t\tint count = 0;\n\t\tfor (int i = 0; i < row; i++) {\n\t\t\tfor (int j = col - 1; j >= 0; j--) {\n\t\t\t\tif (matrix[i][j] <= mid) {\n\t\t\t\t\tcount = count + (j + 1);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn count;\n\t}\n}\n\npublic class KthSmallestElementInASortedMatrix {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/LowerAndUpperBound.java",
    "title": "Lower And Upper Bound",
    "slug": "lower-and-upper-bound",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Lower And Upper Bound using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/LowerAndUpperBound.java",
    "sourceCode": "public class LowerAndUpperBound {\n\n\tpublic static int lowerBound(int[] arr, int n, int x) {\n\t\tint low = 0, high = n - 1;\n\t\tint ans = n;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\tif (arr[mid] >= x) {\n\t\t\t\tans = mid;\n\t\t\t\thigh = mid - 1;\n\t\t\t} else {\n\t\t\t\tlow = mid + 1; // look on the right\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic static int upperBound(int[] arr, int x, int n) {\n\t\tint low = 0, high = n - 1;\n\t\tint ans = n;\n\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\t// maybe an answer\n\t\t\tif (arr[mid] > x) {\n\t\t\t\tans = mid;\n\t\t\t\t// look for smaller index on the left\n\t\t\t\thigh = mid - 1;\n\t\t\t} else {\n\t\t\t\tlow = mid + 1; // look on the right\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/MatrixMedian.java",
    "title": "Matrix Median",
    "slug": "matrix-median",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Matrix Median using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/MatrixMedian.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class MatrixMedian {\n\n\tint median(int matrix[][], int R, int C) {\n\t\tList<Integer> list = new ArrayList<>();\n\t\tfor (int i = 0; i < R; i++) {\n\t\t\tfor (int j = 0; j < C; j++) {\n\t\t\t\tlist.add(matrix[i][j]);\n\t\t\t}\n\t\t}\n\n\t\tCollections.sort(list);\n\t\tint mid = list.size() / 2;\n\t\tint median;\n\t\tif (list.size() % 2 == 0) {\n\t\t\tmedian = (list.get(mid - 1) + list.get(mid)) / 2;\n\t\t} else {\n\t\t\tmedian = list.get(mid);\n\t\t}\n\n\t\treturn median;\n\n\t}\n\n\tint median_binarySearch(int matrix[][], int R, int C) {\n\t\t// code here\n\t\tint min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;\n\t\tfor (int i = 0; i < R; i++) {\n\t\t\tif (matrix[i][0] < min)\n\t\t\t\tmin = matrix[i][0];\n\n\t\t\tif (matrix[i][C - 1] > max)\n\t\t\t\tmax = matrix[i][C - 1];\n\t\t}\n\n\t\tint desired = (R * C + 1) / 2;\n\t\twhile (min <= max) {\n\t\t\tint mid = min + (max - min) / 2;\n\t\t\tint place = 0;\n\n\t\t\tfor (int i = 0; i < R; ++i) {\n\t\t\t\tint l = 0, col = C - 1;\n\t\t\t\twhile (l < col) {\n\t\t\t\t\tint m = (l + col) / 2;\n\t\t\t\t\tif (matrix[i][m] <= mid) {\n\t\t\t\t\t\tl = m + 1;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcol = m;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (matrix[i][l] <= mid) {\n\t\t\t\t\tplace++;\n\t\t\t\t}\n\t\t\t\tplace += l;\n\n\t\t\t}\n\n\t\t\tif (place < desired)\n\t\t\t\tmin = mid + 1;\n\t\t\telse\n\t\t\t\tmax = mid - 1;\n\t\t}\n\t\treturn min;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}\n\nclass Solution1 {\n\n\tint lesserThanMid(int[] arr, int x) {\n\t\tint low = 0, high = arr.length - 1;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tif (arr[mid] <= x)\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn low;\n\t}\n\n\tpublic int getCountOfNumbersLessThanMid(int[][] matrix, int mid, int row, int col) {\n\t\tint count = 0;\n\t\tfor (int i = 0; i < row; i++) {\n\t\t\tfor (int j = col - 1; j >= 0; j--) {\n\t\t\t\tif (matrix[i][j] <= mid) {\n\t\t\t\t\tcount = count + (j + 1);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn count;\n\t}\n\n\tint median(int matrix[][], int R, int C) {\n\t\tint low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;\n\t\tfor (int i = 0; i < R; i++) {\n\t\t\tlow = Math.min(low, matrix[i][0]);\n\t\t\thigh = Math.max(high, matrix[i][C - 1]);\n\t\t}\n\n\t\tint pos = ((R * C) - 1) / 2;\n\t\tSystem.out.println(\"expected median position=\" + pos);\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\n\t\t\t// int count=0;\n\t\t\t// for(int i=0;i<R;i++)\n\t\t\t// count+=lesserThanMid(matrix[i],mid);\n\t\t\tSystem.out.println(\n\t\t\t\t\t\"mid=\" + mid + \" couny=\" + getCountOfNumbersLessThanMid(matrix, mid, R, C) + \" low=\" + low);\n\t\t\tif (getCountOfNumbersLessThanMid(matrix, mid, R, C) <= pos)\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn low;\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/MedianOfTwoSortedArrays.java",
    "title": "Median Of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "topic": "Binary Search",
    "difficulty": "Hard",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Median Of Two Sorted Arrays using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/MedianOfTwoSortedArrays.java",
    "sourceCode": "/**\n * \n * \n * Problem Link: https://leetcode.com/problems/median-of-two-sorted-arrays/\n * \n * Video Solution: https://youtu.be/NTop3VTjmxk\n * \n * */\n\npublic class MedianOfTwoSortedArrays {\n\t\n\t\n\t//Approach 1 : O(m+n)TC, O(m+n)Space\n\tpublic double findMedianSortedArrays1(int[] nums1, int[] nums2) {\n\t       int total = nums1.length+nums2.length;\n\t     int i=0,j=0,k=0;\n\t     int[] result = new int[total]; \n\t      \n\t        while(k<total)\n\t        {\n\t            if(j==nums2.length ||(i<nums1.length&&nums1[i]<=nums2[j])){\n\t                result[k++]=nums1[i++];\n\t            }\n\t            else \n\t             if(i==nums1.length ||(j<nums2.length&&nums2[j]<nums1[i])){\n\t                result[k++]=nums2[j++];\n\t            }\n\t        }    \n\t        return (total%2==0) ?((result[total/2]+result[total/2-1])/2.0):result[total/2]; \n\t    }\n\t\n\t\n\t//Optimized Solution OLog(m+n)TC, Space :O(1)\n\t public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n\t        return median(nums1,nums2,nums1.length,nums2.length);\n\t    }\n\t    \n\t    double median(int arr1[],int arr2[],int m,int n) {\n\t    if(m>n)\n\t        return median(arr2,arr1,n,m);//ensuring that binary search happens on minimum size array\n\t        \n\t    int low=0,high=m,medianPos=((m+n)+1)/2;\n\t    while(low<=high) {\n\t        int cut1 = (low+high)>>1;\n\t        int cut2 = medianPos - cut1;\n\t        \n\t        int l1 = (cut1 == 0)? Integer.MIN_VALUE:arr1[cut1-1];\n\t        int l2 = (cut2 == 0)? Integer.MIN_VALUE:arr2[cut2-1];\n\t        int r1 = (cut1 == m)? Integer.MAX_VALUE:arr1[cut1];\n\t        int r2 = (cut2 == n)? Integer.MAX_VALUE:arr2[cut2];\n\t        \n\t        if(l1<=r2 && l2<=r1) {\n\t            if((m+n)%2 != 0)\n\t                return Math.max(l1,l2);\n\t            else \n\t                return (Math.max(l1,l2)+Math.min(r1,r2))/2.0;\n\t        }\n\t        else if(l1>r2) high = cut1-1;\n\t        else low = cut1+1;\n\t    }\n\t    return 0.0;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/MinimumBouquets.java",
    "title": "Minimum Bouquets",
    "slug": "minimum-bouquets",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Minimum Bouquets using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/MinimumBouquets.java",
    "sourceCode": "import java.util.Arrays;\n\nclass Solution8 {\n\tpublic static int getNumberOfBouques(int[] arr, int day, int k) {\n\t\tint cnt = 0;\n\t\tint noOfB = 0;\n\t\tfor (int i = 0; i < arr.length; i++) {\n\t\t\tif (arr[i] <= day) {\n\t\t\t\tcnt++;\n\t\t\t} else {\n\t\t\t\tnoOfB += (cnt / k);\n\t\t\t\tcnt = 0;\n\t\t\t}\n\t\t}\n\t\tnoOfB += (cnt / k);\n\t\treturn noOfB;\n\t}\n\n\tpublic int minDays(int[] arr, int m, int k) {\n\t\t// if no of flowers required is more than no of flowers given, return -1;\n\t\tlong val = (long) m * k;\n\t\tif (val > arr.length)\n\t\t\treturn -1;\n\n\t\tint low = Arrays.stream(arr).min().getAsInt();\n\t\tint high = Arrays.stream(arr).max().getAsInt();\n\t\twhile (low <= high) {\n\t\t\tint mid = (low + high) / 2;\n\t\t\tif (getNumberOfBouques(arr, mid, k) < m) {\n\t\t\t\tlow = mid + 1;\n\t\t\t} else {\n\t\t\t\thigh = mid - 1;\n\t\t\t}\n\t\t}\n\t\treturn low;\n\t}\n}\n\npublic class MinimumBouquets {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/PaintersPartition.java",
    "title": "Painters Partition",
    "slug": "painters-partition",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Painters Partition using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/PaintersPartition.java",
    "sourceCode": "import java.util.ArrayList;\n\npublic class PaintersPartition {\n\tpublic static int countSubarraysWithGivenSum(ArrayList<Integer> boards, int sum) {\n\t\tint count = 1;\n\t\tint totalSum = 0;\n\t\tfor (int num : boards) {\n\t\t\tif (num + totalSum > sum) {\n\t\t\t\ttotalSum = 0;\n\t\t\t\tcount++;\n\t\t\t}\n\t\t\ttotalSum += num;\n\t\t}\n\t\treturn count;\n\t}\n\n\tpublic static int findLargestMinDistance(ArrayList<Integer> boards, int k) {\n\t\tint low = 0, high = 0;\n\t\tfor (int i = 0; i < boards.size(); i++) {\n\t\t\tif (boards.get(i) > low)\n\t\t\t\tlow = boards.get(i);\n\t\t\thigh += boards.get(i);\n\t\t}\n\n\t\tint ans = 0;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tint countOfSubarraysWithGivenSum = countSubarraysWithGivenSum(boards, mid);\n\t\t\tif (countOfSubarraysWithGivenSum > k) {\n\t\t\t\tlow = mid + 1;\n\t\t\t} else {\n\t\t\t\t// it means we have k subarrays with given sum, so we can say this MAY BE our\n\t\t\t\t// answer\n\t\t\t\tans = mid;\n\t\t\t\t// Try find even better\n\t\t\t\thigh = mid - 1;\n\t\t\t}\n\t\t}\n\n\t\treturn ans;\n\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/PeakIndexInMountainArray.java",
    "title": "Peak Index In Mountain Array",
    "slug": "peak-index-in-mountain-array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Peak Index In Mountain Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/PeakIndexInMountainArray.java",
    "sourceCode": "public class PeakIndexInMountainArray {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}\n\n\nclass Solution111111 {\n    public int peakIndexInMountainArray(int[] arr) {\n        int s = 1;\n        int e = arr.length-2;\n        int mid = (s+e)/2;\n        while(s<=e){\n            mid = (s+e)/2;\n            if(arr[mid]>arr[mid-1] && arr[mid]>arr[mid+1])\n                return mid;\n            else if(arr[mid]>arr[mid-1])\n                s = mid+1;\n            else\n                e = mid-1;\n        }\n        return -1;\n    }\n}"
  },
  {
    "key": "Binary Search:BinarySearch/SearchInA2DMatrix_I.java",
    "title": "Search In A2 D Matrix I",
    "slug": "search-in-a2-d-matrix-i",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Search In A2 D Matrix I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/SearchInA2DMatrix_I.java",
    "sourceCode": "public class SearchInA2DMatrix_I {\n\n\tpublic boolean searchMatrix(int[][] matrix, int target) {\n\t\tif (matrix[0][0] == target)\n\t\t\treturn true;\n\n\t\tint n = matrix.length;\n\t\tint m = matrix[0].length;\n\n\t\tint crow = 0;\n\t\tint ccol = m - 1;\n\t\twhile (crow <= n - 1 && ccol >= 0) {\n\t\t\tint temp = matrix[crow][ccol];\n\t\t\tif (temp == target)\n\t\t\t\treturn true;\n\t\t\tif (temp > target)\n\t\t\t\tccol--;\n\t\t\telse\n\t\t\t\tcrow++;\n\t\t}\n\t\treturn false;\n\t}\n\n\tpublic boolean searchMatrix2(int[][] matrix, int target) {\n\t\tint m = matrix.length;\n\t\tint n = matrix[0].length;\n\n\t\tint left = 0;\n\t\tint right = m * n - 1;\n\n\t\twhile (left <= right) {\n\t\t\tint mid = left + (right - left) / 2;\n\t\t\tint row = mid / n;\n\t\t\tint col = mid % n;\n\t\t\tif (matrix[row][col] == target) {\n\t\t\t\treturn true;\n\t\t\t} else if (matrix[row][col] < target) {\n\t\t\t\tleft = mid + 1;\n\t\t\t} else {\n\t\t\t\tright = mid - 1;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/SearchInA2DMatrix_II.java",
    "title": "Search In A2 D Matrix II",
    "slug": "search-in-a2-d-matrix-ii",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Search In A2 D Matrix II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/SearchInA2DMatrix_II.java",
    "sourceCode": "public class SearchInA2DMatrix_II {\n\n\tpublic boolean searchMatrix(int[][] matrix, int target) {\n\n\t\tif (matrix == null || matrix.length == 0 || matrix[0].length == 0)\n\t\t\treturn false;\n\n\t\tint row = 0, col = matrix[0].length - 1;\n\t\twhile (row != matrix.length && col != matrix[0].length && row >= 0 && col >= 0) {\n\t\t\tif (matrix[row][col] == target)\n\t\t\t\treturn true;\n\t\t\telse if (matrix[row][col] > target)\n\t\t\t\tcol--;\n\t\t\telse\n\t\t\t\trow++;\n\t\t}\n\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/SearchInASortedRotatedMatrix.java",
    "title": "Search In A Sorted Rotated Matrix",
    "slug": "search-in-a-sorted-rotated-matrix",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Search In A Sorted Rotated Matrix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/SearchInASortedRotatedMatrix.java",
    "sourceCode": "public class SearchInASortedRotatedMatrix {\n\n\tpublic int search(int[] nums, int target) {\n\n\t\tint low = 0;\n\t\tint high = nums.length - 1;\n\n\t\twhile (low <= high) {\n\n\t\t\tint mid = (low + high) / 2;\n\n\t\t\tif (target == nums[mid])\n\t\t\t\treturn mid;\n\n\t\t\t// step 1: we need find our element is left sorted or right sorted\n\t\t\t// example: 8, 9 , 10, 1, 2,3, 4 , here 1 is left sorted where as 10 is right\n\t\t\t// sorted // here 1 is left sorted\n\n\t\t\tif (nums[low] <= nums[mid]) {\n\t\t\t\t// step 2: now we need check where target lies in the range of left sorted\n\t\t\t\tif (nums[low] <= target && target <= nums[mid]) {\n\t\t\t\t\thigh = mid - 1;\n\t\t\t\t} else\n\t\t\t\t\tlow = mid + 1;\n\t\t\t} else { // else right sorted\n\n\t\t\t\tif (nums[mid] <= target && target <= nums[high]) {\n\t\t\t\t\tlow = mid + 1;\n\t\t\t\t} else\n\t\t\t\t\thigh = mid - 1;\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn -1;\n\n\t}\n\n\t// Duplicates allowed\n\tpublic boolean search22(int[] nums, int target) {\n\t\tint i = 0, n = nums.length, j = n - 1, mid;\n\t\twhile (i <= j) {\n\t\t\tmid = (i + j) / 2;\n\t\t\tif (nums[mid] == target || nums[i] == target || nums[j] == target)\n\t\t\t\treturn true;\n\t\t\tif (nums[i] == nums[j]) {\n\t\t\t\ti++;\n\t\t\t\tj--;\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tif (nums[i] <= nums[mid]) {\n\t\t\t\tif (nums[i] <= target) {\n\t\t\t\t\tif (nums[mid] < target)\n\t\t\t\t\t\ti = mid + 1;\n\t\t\t\t\telse\n\t\t\t\t\t\tj = mid - 1;\n\t\t\t\t} else {\n\t\t\t\t\ti = mid + 1;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif (nums[i] > target) {\n\t\t\t\t\tif (nums[mid] < target)\n\t\t\t\t\t\ti = mid + 1;\n\t\t\t\t\telse\n\t\t\t\t\t\tj = mid - 1;\n\t\t\t\t} else\n\t\t\t\t\tj = mid - 1;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Binary Search:BinarySearch/SingleElementInSortedArray.java",
    "title": "Single Element In Sorted Array",
    "slug": "single-element-in-sorted-array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Single Element In Sorted Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/SingleElementInSortedArray.java",
    "sourceCode": "public class SingleElementInSortedArray {\n\n}\n\nclass Solution889 {\n\tpublic int singleNonDuplicate(int[] nums) {\n\t\tint n = nums.length;\n\t\tif (n == 1 || nums[0] != nums[1])\n\t\t\treturn nums[0];\n\t\tif (nums[n - 1] != nums[n - 2])\n\t\t\treturn nums[n - 1];\n\n\t\tint low = 1, high = n - 2;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tif (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1])\n\t\t\t\treturn nums[mid];\n\t\t\telse if ((mid % 2 == 1 && nums[mid - 1] == nums[mid]) || (mid % 2 == 0 && nums[mid] == nums[mid + 1]))\n\t\t\t\tlow = mid + 1;\n\t\t\telse\n\t\t\t\thigh = mid - 1;\n\t\t}\n\t\treturn -1;\n\t}\n}"
  },
  {
    "key": "Binary Search:BinarySearch/SplitArrayLargestSum.java",
    "title": "Split Array Largest Sum",
    "slug": "split-array-largest-sum",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "tags": [
      "Binary Search",
      "BinarySearch"
    ],
    "description": "Practice Split Array Largest Sum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/BinarySearch/SplitArrayLargestSum.java",
    "sourceCode": "public class SplitArrayLargestSum {\n\tpublic int splitArray(int[] nums, int k) {\n\t\t// Search space : max(nums) to sum(nums)\n\t\tint low = 0, high = 0;\n\t\tfor (int i : nums) {\n\t\t\tif (i > low)\n\t\t\t\tlow = i;\n\t\t\thigh += i;\n\t\t}\n\t\tint ans = low;\n\t\twhile (low <= high) {\n\t\t\tint mid = low + (high - low) / 2;\n\t\t\tint n = noOfSubarraysWithMaxSumAsMid(nums, mid);\n\n\t\t\tif (n > k) // this means we have taken a very low value of mid, as we are getting more\n\t\t\t\t\t\t// subarrays than required\n\t\t\t{\n\t\t\t\tlow = mid + 1;\n\t\t\t} else // this means mid is are possible answer, but still we'll try to minimize\n\t\t\t\t\t// (ooptimize) it\n\t\t\t{\n\t\t\t\tans = mid;\n\t\t\t\t// try to find a better ans i.e., minimize the answer\n\t\t\t\thigh = mid - 1;\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic int noOfSubarraysWithMaxSumAsMid(int[] nums, int mid) {\n\t\tint sum = 0;\n\t\tint cnt = 1;\n\n\t\tfor (int i = 0; i < nums.length; i++) {\n\t\t\tif (sum + nums[i] > mid) {\n\t\t\t\tsum = nums[i];\n\t\t\t\tcnt++;\n\t\t\t} else {\n\t\t\t\tsum += nums[i];\n\t\t\t}\n\t\t}\n\t\treturn cnt;\n\t}\n}"
  },
  {
    "key": "Bitwise:Bitwise/AddBinary.java",
    "title": "Add Binary",
    "slug": "add-binary",
    "topic": "Bitwise",
    "difficulty": "Easy",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Add Binary using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/AddBinary.java",
    "sourceCode": "public class AddBinary {\n\n\tpublic String addBinary(String a, String b) {\n\t\tStringBuilder result = new StringBuilder();\n\t\tint carry = 0;\n\t\tint i = a.length() - 1, j = b.length() - 1;\n\n\t\t// we have start from lsb to msb (right to left)\n\t\twhile (i >= 0 || j >= 0) {\n\n\t\t\tcarry += i >= 0 ? a.charAt(i--) - '0' : 0;\n\t\t\tcarry += j >= 0 ? b.charAt(j--) - '0' : 0;\n\t\t\t// 1+1=2, 1+1=10(here carry is 1, result is 0) 2%2=0(sum), 2/2=1(carry)\n\t\t\tresult.insert(0, carry % 2);\n\t\t\tcarry = carry / 2;\n\t\t}\n\n\t\t// need to care of leftover carry as well, if it 0, then fine else we need to\n\t\t// add to solu\n\t\tif (carry == 1)\n\t\t\tresult.insert(0, carry);\n\n\t\treturn result.toString();\n\t}\n}"
  },
  {
    "key": "Bitwise:Bitwise/BinaryToDecimalConversion.java",
    "title": "Binary To Decimal Conversion",
    "slug": "binary-to-decimal-conversion",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Binary To Decimal Conversion using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/BinaryToDecimalConversion.java",
    "sourceCode": "public class BinaryToDecimalConversion {\n\n\tstatic int binaryToDecimal(int n) {\n\t\tint num = n;\n\t\tint dec_value = 0;\n\t\tint base = 1;\n\t\tint temp = num;\n\t\twhile (temp > 0) {\n\t\t\tint last_digit = temp % 10;\n\t\t\ttemp = temp / 10;\n\t\t\tdec_value += last_digit * base;\n\t\t\tbase = base * 2;\n\t\t}\n\t\treturn dec_value;\n\t}\n\t\n\tpublic static int binaryToDecimal10(int n){\n\t    int dec_num = 0;\n\t    int power = 0;\n\t    while (n > 0) {\n\t      if (n % 10 == 1) {\n\t        dec_num += (1 << power);\n\t      }\n\t      power++;\n\t      n = n / 10;\n\t    }\n\t    return dec_num;\n\t }\n\t\n\tstatic int binaryToDecimal(String n){\n        String num = n;\n        int dec_value = 0;\n \n        // Initializing base value to 1,\n        // i.e 2^0\n        int base = 1;\n \n        int len = num.length();\n        for (int i = len - 1; i >= 0; i--) {\n            if (num.charAt(i) == '1')\n                dec_value += base;\n            base = base * 2;\n        }\n \n        return dec_value;\n    }\n\n\tpublic static void main(String[] args) {\n\t\t\n\t\tInteger.parseInt(\"1001\",2);\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/BitSetOrNot.java",
    "title": "Bit Set Or Not",
    "slug": "bit-set-or-not",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Bit Set Or Not using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/BitSetOrNot.java",
    "sourceCode": "public class BitSetOrNot {\n\t\n\t/**\n\t * TC:SC:O(1)\n\t * @param n\n\t * @param k\n\t * @return\n\t */\n\n\tpublic Boolean checkKthBit(int n, int k) {\n\n\t\t// return (n&(1<<k))==1<<k;\n\t\t// return (n & (1 << k)) != 0;\n\n\t\treturn ((n >> k) & 1) != 0;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/BitwiseANDRange.java",
    "title": "Bitwise AND of Numbers Range",
    "slug": "bitwise-and-of-numbers-range",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Bitwise AND of Numbers Range using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/BitwiseANDRange.java",
    "sourceCode": "public class BitwiseANDRange {\n\n\tpublic int rangeBitwiseAnd(int left, int right) {\n\t        \n\t        //checking for the fist unmatched bit - how many shifts it took\n\t        int shiftCount=0;\n\t        while(left!=right){\n\t          left>>=1;\n\t          right>>=1;\n\t          shiftCount++;\n\t        }\n\t        return right<<shiftCount;\n\n\t        // int ans=left;\n\t        // for(int i=left+1;i<=right;i++){\n\t        //     ans=ans&i;\n\t        // }\n\t        // return ans;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/DecimalToBinaryConversion.java",
    "title": "Decimal To Binary Conversion",
    "slug": "decimal-to-binary-conversion",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Decimal To Binary Conversion using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/DecimalToBinaryConversion.java",
    "sourceCode": "public class DecimalToBinaryConversion {\n\n\tpublic void decToBinary(int n) {\n\t\t// Size of an integer is assumed to be 32 bits\n\t\tfor (int i = 31; i >= 0; i--) {\n\t\t\tint k = n >> i;\n\t\t\tif ((k & 1) > 0)\n\t\t\t\tSystem.out.print(\"1\");\n\t\t\telse\n\t\t\t\tSystem.out.print(\"0\");\n\t\t}\n\t}\n\n\tstatic void toBinary(int N) {\n\t\tString s = \"\";\n\t\tint rem;\n\t\twhile (N != 0) {\n\t\t\trem = N % 2;\n\t\t\ts = rem + s + \"\";\n\t\t\tN = N / 2;\n\t\t}\n\t\tSystem.out.print(s);\n\t}\n\n\tstatic void decToBinary11(int n) {\n\t\t// array to store binary number\n\t\tint[] binaryNum = new int[32];\n\n\t\t// counter for binary array\n\t\tint i = 0;\n\t\twhile (n > 0) {\n\t\t\t// storing remainder in binary array\n\t\t\tbinaryNum[i] = n % 2;\n\t\t\tn = n / 2;\n\t\t\ti++;\n\t\t}\n\n\t\t// printing binary array in reverse order\n\t\tfor (int j = i - 1; j >= 0; j--)\n\t\t\tSystem.out.print(binaryNum[j]);\n\t}\n\n\tpublic void decToBinary12(int n) {\n\t\t// Size of an integer is assumed to be 32 bits\n\t\tfor (int i = 31; i >= 0; i--) {\n\t\t\tint k = n >> i;\n\t\t\tif ((k & 1) > 0)\n\t\t\t\tSystem.out.print(\"1\");\n\t\t\telse\n\t\t\t\tSystem.out.print(\"0\");\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/divideTwoIntegers.java",
    "title": "divide Two Integers",
    "slug": "divide-two-integers",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice divide Two Integers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/divideTwoIntegers.java",
    "sourceCode": "/**\n\n\nVideo Link : https://youtu.be/m4L_5qG4vG8\n\nGFG Link : https://www.geeksforgeeks.org/divide-two-integers-without-using-multiplication-division-mod-operator/\n\nLeetcode Link  : https://leetcode.com/problems/divide-two-integers/\n\n\n\nHere Input : is 2 int numbers are given\nOutput : Quotient of 2 numbers, we have to provide\n\nCondition : We are not allowed to use \"* or  % or /\" operators\n\nApproach 1 : subtract divident by divisor as long as its valid\n     long quotient = 0;\n     while (dividend >= divisor) {\n          dividend -= divisor;\n          ++quotient;\n      }\nTime complexity : O(a/b) \nAuxiliary space : O(1)\n\nApproach 2: \ndividend = quotient * divisor + remainder \nBasic Idea : a/b = e ln(a) / e ln(b) = e( ln(a) – ln(b) )\n\nTime complexity : O(log(a)) \nAuxiliary space : O(1)\n\nExample : Divident =10, divisor=3\n \n10 - 3 (7)>=0 ,so double divisor and move on, count=1\n10 - 6 (4)>=0 ,so double divisor and move on, count=2\n10 - 12(-2) >=0 false\n\nresult  = 1<<count, count=2, left shit means multiply by 2\nresult=2,\n\nNow update dividend =  10 - 6 = 4\n\n4-3(1)>=0, count=1\n4-6(-2)>=0, false\n\nupdate result = 2 + 1 = 3\n\n*/\n\n\n\n\n\n\npublic class divideTwoIntegers {\n\t\n\t public static int divide(int dividend, int divisor) {\n\t        //overflow condition checking\n\t        if(dividend == 1<<31 && divisor ==-1)\n\t          return Integer.MAX_VALUE;\n\t       //sign checking\n\t       boolean sign = (dividend>=0) == (divisor>=0) ? true : false;\n\t       dividend = Math.abs(dividend);\n\t       divisor = Math.abs(divisor);\n\t       int result=0;\n\t       while(dividend-divisor>=0){\n\t           int count=0;\n\t           while(dividend-(divisor<<1<<count)>=0){\n\t               count++;\n\t           }\n\t           result+=1<<count;\n\t           dividend-=divisor<<count;\n\t       }\n\t       return sign?result:-result;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/EvenOrOdd.java",
    "title": "Even Or Odd",
    "slug": "even-or-odd",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Even Or Odd using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/EvenOrOdd.java",
    "sourceCode": "public class EvenOrOdd {\n\n\tstatic String oddEven(int N) {\n\n\t\treturn (N & 1) != 0 ? \"odd\" : \"even\";\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/MissingNumberXor.java",
    "title": "Missing Number XOR",
    "slug": "missing-number-xor",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Missing Number XOR using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/MissingNumberXor.java",
    "sourceCode": "public class MissingNumberXor {\n\n\tpublic int missingNumber(int[] nums) {\n\t\tint xor = 0;\n\t\tint i = 0;\n\t\tfor (; i < nums.length; i++) {\n\t\t\txor = xor ^ i ^ nums[i];\n\t\t}\n\t\treturn xor ^ i;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/NumberOfSetBits.java",
    "title": "Number of 1 Bits",
    "slug": "number-of-1-bits",
    "topic": "Bitwise",
    "difficulty": "Easy",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Number of 1 Bits using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/NumberOfSetBits.java",
    "sourceCode": "public class NumberOfSetBits {\n\n\tpublic int hammingWeight(int n) {\n\t\tint count = 0;\n\t\twhile (n != 0) {\n\t\t\tn = n & (n - 1);\n\t\t\tcount++;\n\t\t}\n\t\treturn count;\n\n\t\t// int c=0;\n\t\t// for(int i=0;i<32;i++){\n\t\t// if(((n>>i) & 1)!=0)\n\t\t// c++;\n\t\t// }\n\t\t// return c;\n\t}\n\t// TC : O(1) or O(no of set bits)\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/PowerOf2OrNot.java",
    "title": "Power Of2 Or Not",
    "slug": "power-of2-or-not",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Power Of2 Or Not using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/PowerOf2OrNot.java",
    "sourceCode": "public class PowerOf2OrNot {\n\n\tstatic boolean isPowerofTwo(int n) {\n\t\tint cnt = 0;\n\t\twhile (n > 0) {\n\t\t\tif ((n & 1) == 1) {\n\t\t\t\tcnt++; // if n&1 == 1 keep incrementing cnt\n\t\t\t\t// variable\n\t\t\t}\n\t\t\tn = n >> 1; // keep dividing n by 2 using right\n\t\t\t\t\t\t// shift operator\n\t\t}\n\t\tif (cnt == 1) {\n\t\t\t// if cnt = 1 only then it is power of 2\n\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tpublic static boolean isPowerofTwo(long n) {\n\n\t\t// Your code here\n\t\tif (n <= 0) {\n\t\t\treturn false;\n\t\t}\n\t\treturn (n & (n - 1)) == 0;\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/ReverseBits.java",
    "title": "Reverse Bits",
    "slug": "reverse-bits",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Reverse Bits using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/ReverseBits.java",
    "sourceCode": "public class ReverseBits {\n\tpublic int reverseBits(int n) {\n\t\tint res = 0;\n\t\tfor (int i = 0; i < 32; i++) {\n\t\t\tint bit = (n >> i) & 1;\n\t\t\tres = res | (bit << (31 - i));\n\t\t}\n\t\treturn res;\n\t}\n}"
  },
  {
    "key": "Bitwise:Bitwise/SingleNumber_I.java",
    "title": "Single Number",
    "slug": "single-number",
    "topic": "Bitwise",
    "difficulty": "Easy",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Single Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/SingleNumber_I.java",
    "sourceCode": "public class SingleNumber_I {\n\n\tpublic int singleNumber(int[] nums) {\n\t\tint xor = 0;\n\t\tfor (int i : nums) {\n\t\t\txor ^= i; // xor =xor^i\n\t\t}\n\t\treturn xor;\n\t}\n\n\tpublic int singleNumberII(int[] nums) {\n\t\tint ans = 0;\n\t\tfor (int i = 0; i < 32; i++) {\n\t\t\tint sum = 0;\n\t\t\tfor (int j = 0; j < nums.length; j++) {\n\t\t\t\tif (((nums[j] >> i) & 1) == 1) {\n\t\t\t\t\tsum++;\n\t\t\t\t\tsum %= 3;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (sum != 0) {\n\t\t\t\tans = ans | sum << i;\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/SumOfTwoIntegers.java",
    "title": "Sum Of Two Integers",
    "slug": "sum-of-two-integers",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Sum Of Two Integers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/SumOfTwoIntegers.java",
    "sourceCode": "public class SumOfTwoIntegers {\n\n\tpublic int getSum(int a, int b) {\n\n\t\tint carry = 0;\n\t\twhile (b != 0) {\n\t\t\tcarry = a & b;\n\t\t\ta = a ^ b;\n\t\t\tb = carry << 1;\n\t\t}\n\t\treturn a;\n\t}\n}"
  },
  {
    "key": "Bitwise:Bitwise/TwoUniqueNumbers.java",
    "title": "Two Unique Numbers",
    "slug": "two-unique-numbers",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice Two Unique Numbers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/TwoUniqueNumbers.java",
    "sourceCode": "class UniqueNumbers {\n\t \n\t \n\n\n\n\tint PositionRightmostSetbit(int n)\n\t{\n\t    if (n == 0)\n\t        return 0;\n\t  \n\t    int position = 1;\n\t    int m = 1;\n\t \n\t    while ((n & m)==0) {\n\t \n\t        // left shift\n\t        m = m << 1;\n\t        position++;\n\t    }\n\t    return position;\n\t}\n\n\n\tpublic static void UniqueNumbers2(int[] arr, int n) {\n\t\tint sum = 0;\n\t\tfor (int i = 0; i < n; i++) {\n\n\t\t\t// Xor all the elements of the array\n\t\t\t// all the elements occurring twice will\n\t\t\t// cancel out each other remaining\n\t\t\t// two unique numbers will be xored\n\t\t\tsum = (sum ^ arr[i]);\n\t\t}\n\n\t\t// Bitwise & the sum with it's 2's Complement\n\t\t// Bitwise & will give us the sum containing\n\t\t// only the rightmost set bit\n\t\tsum = (sum & -sum);\n\n\t\t// sum1 and sum2 will contains 2 unique\n\t\t// elements initialized with 0 box\n\t\t// number xored with 0 is number itself\n\t\tint sum1 = 0;\n\t\tint sum2 = 0;\n\n\t\t// traversing the array again\n\t\tfor (int i = 0; i < arr.length; i++) {\n\n\t\t\t// Bitwise & the arr[i] with the sum\n\t\t\t// Two possibilities either result == 0\n\t\t\t// or result > 0\n\t\t\tif ((arr[i] & sum) > 0) {\n\n\t\t\t\t// if result > 0 then arr[i] xored\n\t\t\t\t// with the sum1\n\t\t\t\tsum1 = (sum1 ^ arr[i]);\n\t\t\t} else {\n\t\t\t\t// if result == 0 then arr[i]\n\t\t\t\t// xored with sum2\n\t\t\t\tsum2 = (sum2 ^ arr[i]);\n\t\t\t}\n\t\t}\n\n\t\t// print the two unique numbers\n\t\tSystem.out.println(\"The non-repeating elements are \" + sum1 + \" and \" + sum2);\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tint[] arr = new int[] { 2, 3, 7, 9, 11, 2, 3, 11 };\n\t\tint n = arr.length;\n\t\tUniqueNumbers2(arr, n);\n\t}\n}\n\n\npublic class TwoUniqueNumbers {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Bitwise:Bitwise/XOR_Range.java",
    "title": "XOR Range",
    "slug": "xor-range",
    "topic": "Bitwise",
    "difficulty": "Medium",
    "tags": [
      "Bitwise",
      "Bitwise"
    ],
    "description": "Practice XOR Range using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Bitwise/XOR_Range.java",
    "sourceCode": "public class XOR_Range {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:CyclicSort/FillAllDuplicatesInArray.java",
    "title": "Fill All Duplicates In Array",
    "slug": "fill-all-duplicates-in-array",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice Fill All Duplicates In Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/FillAllDuplicatesInArray.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\n\n\n/**\n * \n * @author saiteja\n * PraticeLink : https://leetcode.com/problems/find-all-duplicates-in-an-array/\n * Time Complexity : O(n)\n * Space Complexity : O(1)\n * Duplicate Number II\n *\n * \n * \n *\n */\npublic class FillAllDuplicatesInArray {\n\t\n\tpublic List<Integer> findDuplicates(int[] nums) {\n\n\t\tint i = 0;\n\t\twhile (i < nums.length) {\n\t\t\tint correct = nums[i] - 1;\n\t\t\tif (nums[i] != nums[correct]) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[correct];\n\t\t\t\tnums[correct] = temp;\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\t\tList<Integer> repeated = new ArrayList<>();\n\t\t// Checking for the missing item in the soted array \"nums\"\n\t\tfor (int z = 0; z < nums.length; z++) {\n\t\t\tif (nums[z] != z + 1) {\n\t\t\t\trepeated.add(nums[z]);\n\t\t\t}\n\t\t}\n\n\t\treturn repeated;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:CyclicSort/FindAllMissingNumbersInArray.java",
    "title": "Find All Missing Numbers In Array",
    "slug": "find-all-missing-numbers-in-array",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice Find All Missing Numbers In Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/FindAllMissingNumbersInArray.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\n\n/**\n * \n * @author saiteja\n * PraticeLink : https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/\n * Time Complexity : O(n)\n * Space Complexity : O(1)\n * Duplicate Number II\n *\n * \n * \n *\n */\n\n\npublic class FindAllMissingNumbersInArray {\n\t\n\tpublic List<Integer> findDisappearedNumbers(int[] nums) {\n\t\tList<Integer> nonOccuredNumbers = new ArrayList<>();\n\t\tint i = 0;\n\t\twhile (i < nums.length) {\n\t\t\tint correct = nums[i] - 1;\n\t\t\tif (nums[i] != nums[correct]) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[correct];\n\t\t\t\tnums[correct] = temp;\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\t\t// Checking for the missing item in the soted array \"nums\"\n\t\tfor (int z = 0; z < nums.length; z++) {\n\t\t\tif (nums[z] != z + 1) {\n\t\t\t\tnonOccuredNumbers.add(z + 1);\n\t\t\t}\n\t\t}\n\t\treturn nonOccuredNumbers;\n\t}\n\t\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Arrays:CyclicSort/FindTheDuplicateNumber.java",
    "title": "Find The Duplicate Number",
    "slug": "find-the-duplicate-number",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice Find The Duplicate Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/FindTheDuplicateNumber.java",
    "sourceCode": "/**\n * \n * @author saiteja\n * PraticeLink : https://leetcode.com/problems/find-the-duplicate-number/\n * Time Complexity : O(n)\n * Space Complexity : O(1)\n *\n * Duplicate Number I\n * we can use cyclic sort or fast-slow pointer\n * \n *\n */\n\n\npublic class FindTheDuplicateNumber {\n\t\n\t//Cyclic sort solution\n\tpublic int findDuplicate1(int[] nums) {\n\t\tint i = 0;\n\t\twhile (i < nums.length) {\n\t\t\tif (nums[i] != i + 1) {\n\t\t\t\tint correct = nums[i] - 1;\n\t\t\t\tif (nums[i] != nums[correct]) {\n\t\t\t\t\tint temp = nums[i];\n\t\t\t\t\tnums[i] = nums[correct];\n\t\t\t\t\tnums[correct] = temp;\n\t\t\t\t} else\n\t\t\t\t\treturn nums[i];\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\t\treturn -1;\n\t}\n\t\n\t// Slow and fast pointer - imagine linkedList cycle\n\tpublic static int findDuplicate(int[] nums) {\n\n\t\tint slow = nums[0];\n\t\tint fast = nums[0];\n\n\t\t// first create a cycle\n\t\tdo {\n\t\t\tslow = nums[slow];\n\t\t\tfast = nums[nums[fast]];\n\t\t} while (slow != fast);\n\n\t\t// compare the slow and fast with in the cycle\n\t\tfast = nums[0];\n\t\twhile (slow != fast) {\n\t\t\tslow = nums[slow];\n\t\t\tfast = nums[fast];\n\t\t}\n\t\treturn slow;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:CyclicSort/FirstMissingPositive.java",
    "title": "First Missing Positive",
    "slug": "first-missing-positive",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice First Missing Positive using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/FirstMissingPositive.java",
    "sourceCode": "/**\n* \n* @author saiteja\n* PraticeLink : https://leetcode.com/problems/first-missing-positive/\n* Time Complexity : O(n)\n* Space Complexity : O(1)\n*\n* same as first missing number - cyclic sort\n* \n*\n*/\npublic class FirstMissingPositive {\n\n\t// same as missingNumber\n\tpublic int firstMissingPositive(int[] nums) {\n\n\t\tint i = 0;\n\n\t\t// Cyclic Sort in action - trying to place the elements in their respective\n\t\t// index\n\t\twhile (i < nums.length) {\n\t\t\tint correct = nums[i] - 1;\n\t\t\tif (nums[i] > 0 && nums[i] <= nums.length && nums[i] != nums[correct]) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[correct];\n\t\t\t\tnums[correct] = temp;\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\n\t\t// Checking for the missing item in the soted array \"nums\"\n\t\tfor (int z = 0; z < nums.length; z++) {\n\t\t\tif (nums[z] != z + 1) {\n\t\t\t\treturn z + 1;\n\t\t\t}\n\t\t}\n\n\t\treturn nums.length + 1;\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Arrays:CyclicSort/MissingNumber.java",
    "title": "Missing Number",
    "slug": "missing-number",
    "topic": "Arrays",
    "difficulty": "Easy",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice Missing Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/MissingNumber.java",
    "sourceCode": "/**\n * \n * @author saiteja\n * PraticeLink : https://leetcode.com/problems/missing-number/\n * Time Complexity : O(n)\n * Space Complexity : O(1)\n *\n * Approach 1 : we can use statusArray - to mark element is present or not - but space - O(n)\n * Approach 2 : Sort the array - O(nlogn) and compare element with its index\n * Approach 3 : Sum of n natural numbers - totalSumOfGivenArray\n * \n *\n */\n\n\npublic class MissingNumber {\n\n\tpublic static int missingNumber(int[] nums) {\n\t\tint n = nums.length;\n\t\tint totalSum = (n * (n + 1)) / 2;\n\t\tint sum = 0;\n\t\tfor (int i : nums) {\n\t\t\tsum += i;\n\t\t}\n\t\treturn (totalSum - sum);\n\t}\t\n\t\n\t/*\n    cyclic sort - range is fixed O- n ==> O to n-1 [0-3 means 0,1,2]\n    we expect nos to be like 0,1,2 and indexes also 0,1,2\n    \n    so now we have 2 conditions to swap to set it back as above\n    \n     0,1,2\n    [3,0,1]\n    \n    0th index we expect 0, but it is 3, which is out of boundary, so continue to next\n    1st index we expect 1, but it is 0, so swap now, take 0 out and \n      - inplace of 0, update  \n \n */\n \n\tpublic int missingNumber2(int[] nums) {\n\t\tint i = 0;\n\n\t\t// Cyclic Sort in action - trying to place the elements in their respective\n\t\t// index\n\t\twhile (i < nums.length) {\n\t\t\tint correct = nums[i];\n\t\t\tif (nums[i] < nums.length && nums[i] != nums[correct]) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[correct];\n\t\t\t\tnums[correct] = temp;\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\n\t\t// Checking for the missing item in the soted array \"nums\"\n\t\tfor (int z = 0; z < nums.length; z++) {\n\t\t\tif (nums[z] != z) {\n\t\t\t\treturn z;\n\t\t\t}\n\t\t}\n\n\t\treturn nums.length;\n\t}\n\t\n\t // XOR SOLUTION - WILL DISCUSS LATER - SAME NUMBERS CANCEL OUT HERE, ONLY UNIQUE NUMBER STAYS\n\t public int missingNumber3(int[] nums) {\n\t        int xor = 0;\n\t        int i = 0;\n\t        for(; i < nums.length; i++) {\n\t            xor = xor ^ i ^ nums[i];\n\t        }\n\t        return xor ^ i;\n\t    }\n\t\n\tpublic static void main(String[] args) {\n\t\n\t}\n}"
  },
  {
    "key": "Arrays:CyclicSort/SetMismatch.java",
    "title": "Set Mismatch",
    "slug": "set-mismatch",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "CyclicSort"
    ],
    "description": "Practice Set Mismatch using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/CyclicSort/SetMismatch.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\n/**\n * \n * @author saiteja\n * PraticeLink :https://leetcode.com/problems/set-mismatch/\n * Time Complexity : O(n)\n * Space Complexity : O(1)\n * \n * SAME AS MISSING NUMBER --> fist missing number == first repeated number ==> cyclic sort\n *\n * \n * \n *\n */\npublic class SetMismatch {\n\t\n\t// first repeating element === first missing number\n\tpublic int[] findErrorNums(int[] nums) {\n\n\t\tint i = 0;\n\t\twhile (i < nums.length) {\n\t\t\tint correct = nums[i] - 1;\n\t\t\tif (nums[i] != nums[correct]) {\n\t\t\t\tint temp = nums[i];\n\t\t\t\tnums[i] = nums[correct];\n\t\t\t\tnums[correct] = temp;\n\t\t\t} else\n\t\t\t\ti++;\n\t\t}\n\t\t// first missig number - index+1, in that place we have repeating no arr[index]\n\t\tfor (int z = 0; z < nums.length; z++) {\n\t\t\tif (nums[z] != z + 1) {\n\t\t\t\treturn new int[] { nums[z], z + 1 };\n\t\t\t}\n\t\t}\n\n\t\treturn new int[] { -1, -1 };\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Dynamic Programming:DynamicProgramming/RegularExpression.java",
    "title": "Regular Expression",
    "slug": "regular-expression",
    "topic": "Dynamic Programming",
    "difficulty": "Hard",
    "tags": [
      "Dynamic Programming",
      "DynamicProgramming"
    ],
    "description": "Practice Regular Expression using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/DynamicProgramming/RegularExpression.java",
    "sourceCode": "/*\n * \n * Problem Link : https://leetcode.com/problems/regular-expression-matching/\n * \n * */\n\n\npublic class RegularExpression {\n\t\n\t\n\n\t  /*\n\t    \n\t    main idea:\n\t    \n\t        using two pointers i, j go through each character of s and p\n\t        \n\t        for wildcard * the two options are not use it or use it one or more times\n\t        \n\t        s=aa  p=a*                  a*\n\t                                /        \\\n\t                             a(use)   \"\"(not use)\n\t                            /     \\\n\t                        aa(use)    a(not use)\n\t                        \n\t        \n\t        \n\t        if we decide not to use it, \n\t            \n\t            we need to move j fwd twice (so that we skip *)\n\t            i remains the same\n\n\t        each time we use it,\n\t            move i fwd (meaning we matched one char of s)\n\t            j remains the same\n\t    \n\t    \n\t    recursive approach\n\t    \n\t        if i and j reach the end of s and p, means s matches the pattern\n\t    \n\t        if only j reaches the end, means s doesn't match the pattern\n\t        \n\t        if chars of s and p at index i and j are equal or if char at p is . we can move i and j fwd\n\t        \n\t        if char after p at j + 1 is *\n\t            \n\t            recurse without current char\n\t            recurse using current char       << check if chars at i, j are equal\n\t        \n\t        otherwise, we can recurse moving both i and j fwd\n\t        \n\t    --\n\t    \n\t    improve time complexity using DP Top/Down Memoization\n\t    \n\t    dp cache is a bidimensional array of size i + 1, j + 1\n\t    \n\t    if cache has the answer for a given i, j, return from there, otherwise, compute and update cache\n\t    */\n\n\n\t \n\t    public boolean isMatch(String s, String p) {\n\t        return isMatch(s, p, 0, 0, new Boolean[s.length() + 1][p.length() + 1]);\n\t    }\n\t    \n\t    private boolean isMatch(String s, String p, int i, int j, Boolean[][] dp){\n\t        if(i >= s.length() && j >= p.length()){\n\t            return true;\n\t        }\n\n\t        if(j >= p.length()){\n\t            return false;\n\t        }\n\t        \n\t        // if(dp[i][j] != null){\n\t        //     return dp[i][j];\n\t        // }\n\t    \n\t        boolean matchCondition = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');\n\t        boolean result;\n\t        if(j + 1 < p.length() && p.charAt(j + 1) == '*'){\n\t            result = isMatch(s, p, i, j + 2, dp) ||  matchCondition && isMatch(s, p, i + 1, j, dp);        \n\t        } else {\n\t            result = matchCondition==true ? isMatch(s,p,i+1,j+1,dp) : false;\n\t        }\n\t        \n\t        return result;\n\t    }\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Dynamic Programming:DynamicProgramming/WildCardPatternMatching.java",
    "title": "Wild Card Pattern Matching",
    "slug": "wild-card-pattern-matching",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "tags": [
      "Dynamic Programming",
      "DynamicProgramming"
    ],
    "description": "Practice Wild Card Pattern Matching using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/DynamicProgramming/WildCardPatternMatching.java",
    "sourceCode": "/**\n * https://leetcode.com/problems/wildcard-matching/description/\n * @author saite\n *\n */\npublic class WildCardPatternMatching {\n\t\n\n\t    Boolean dp[][];\n\t    public boolean isMatch(String s, String p) {\n\t        int m = p.length();\n\t        int n = s.length();\n\t        \n\t        dp = new Boolean[m][n];\n\t        \n\t        return is_match(m-1,n-1,p,s);\n\t    }\n\t    \n\t    private boolean is_match(int m,int n,String p,String s){\n\t        \n\t        //Base Case\n\t        //if m and n both are 0 i.e strings are matching\n\t        if (m<0 && n<0) return true;\n\t        \n\t        // if n has some character but m is empty\n\t        if (m<0 && n>=0) return false;\n\t        \n\t        // if m has some character but n is empty\n\t        \n\t        if (n<0 && m>=0) {\n\t            /*\n\t                if str = \"\" && pattern = \"***\" then return true;\n\t                    because we can neglect the * also\n\t                else str = \"\"  && pattern = \"sd**\" return false;\n\t                    because after neglecting the * pattern has some more character\n\t            \n\t            */\n\t            for (int i=0;i<=m;i++){\n\t                if (p.charAt(i) != '*') return false;\n\t            }\n\t            return true;\n\t        }\n\t        \n\t        //Memorisation\n\t        if (dp[m][n] != null) return dp[m][n];\n\t        \n\t        //if both the character is equal || patern[m] == ?\n\t        if (p.charAt(m) == s.charAt(n) || p.charAt(m) == '?'){\n\t            return dp[m][n] = is_match(m-1,n-1,p,s);\n\t        }\n\t        \n\t        // if p has '*'\n\t        if (p.charAt(m) == '*'){\n\t            return dp[m][n] = is_match(m-1,n,p,s) || is_match(m,n-1,p,s);\n\t        }\n\t        // if both the character is not equal\n\t        return false;\n\t            \n\t    }\n\t\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/CircularArrayLoop.java",
    "title": "Circular Array Loop",
    "slug": "circular-array-loop",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Circular Array Loop using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/CircularArrayLoop.java",
    "sourceCode": "//Problem Link : https://leetcode.com/problems/circular-array-loop/\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: O(n), \n//Space complexity: O(1)\npublic class CircularArrayLoop {\n\n\tpublic boolean circularArrayLoop(int[] arr) {\n\t\tif (arr.length <= 1) {\n\t\t\treturn false;\n\t\t}\n\n\t\tfor (int i = 0; i < arr.length; i++) {\n\n\t\t\tint slow, fast;\n\t\t\tslow = fast = i;\n\t\t\tboolean ifForward = arr[i] > 0;\n\n\t\t\twhile (true) {\n\t\t\t\tslow = getNextPosition(arr, slow, ifForward);\n\t\t\t\tif (slow == -1) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tfast = getNextPosition(arr, fast, ifForward);\n\t\t\t\tif (fast == -1) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tfast = getNextPosition(arr, fast, ifForward);\n\t\t\t\tif (fast == -1) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tif (slow == fast) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\tprivate static int getNextPosition(int[] arr, int index, boolean ifForward) {\n\t\tboolean direction = arr[index] >= 0;\n\n\t\tif (direction != ifForward) {\n\t\t\treturn -1;\n\t\t}\n\n\t\tint nextIndex = (index + arr[index]) % arr.length;\n\n\t\t//In case if starting element is -2, (0thIndex-2)%5=-2, but its wrong it should move right so we need to add arraylength to move backward\n\t\tif (nextIndex < 0) {\n\t\t\tnextIndex = nextIndex + arr.length;\n\t\t}\n\n\t\t // this is for negative case if there is only 1 element and that is 1, (0+1)%1=1 going back to same node - nocycle\n\t\tif (nextIndex == index) {\n\t\t\treturn -1;\n\t\t}\n\n\t\treturn nextIndex;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/DeleteMiddleOfLinkedList.java",
    "title": "Delete Middle Of Linked List",
    "slug": "delete-middle-of-linked-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Delete Middle Of Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/DeleteMiddleOfLinkedList.java",
    "sourceCode": "public class DeleteMiddleOfLinkedList {\n\tpublic ListNode deleteMiddle(ListNode head) {\n\t\t// Base Condition\n\t\tif (head == null || head.next == null)\n\t\t\treturn null;\n\t\t// Pointers Created\n\t\tListNode fast = head;\n\t\tListNode slow = head;\n\t\tListNode prev = head;\n\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tprev = slow;\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t}\n\t\tprev.next = slow.next;\n\t\treturn head;\n\t}\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/DeleteNodeInALinkedList.java",
    "title": "Delete Node In A Linked List",
    "slug": "delete-node-in-a-linked-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Delete Node In A Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/DeleteNodeInALinkedList.java",
    "sourceCode": "public class DeleteNodeInALinkedList {\n\n\tpublic void deleteNode(ListNode node) {\n\t\t// Since we know input node is not last node, so nextNode will not be null\n\t\tListNode nextNode = node.next;\n\t\t// Step 2\n\t\tnode.val = nextNode.val;\n\t\t// Step 3\n\t\tnode.next = nextNode.next;\n\t\tnextNode.next = null;\n\t}\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/FindTheDuplicateNumber.java",
    "title": "Find The Duplicate Number",
    "slug": "find-the-duplicate-number",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Find The Duplicate Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/FindTheDuplicateNumber.java",
    "sourceCode": "public class FindTheDuplicateNumber {\n\n\tpublic int findDuplicate(int[] nums) {\n\n\t\tint slow = nums[0];\n\t\tint fast = nums[0];\n\n\t\t// first create a cycle\n\t\tdo {\n\t\t\tslow = nums[slow];\n\t\t\tfast = nums[nums[fast]];\n\t\t} while (slow != fast);\n\n\t\t// compare the slow and fast with in the cycle\n\t\tfast = nums[0];\n\t\twhile (slow != fast) {\n\t\t\tslow = nums[slow];\n\t\t\tfast = nums[fast];\n\t\t}\n\t\treturn slow;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/HappyNumber.java",
    "title": "Happy Number",
    "slug": "happy-number",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Happy Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/HappyNumber.java",
    "sourceCode": "//Problem Link : https://leetcode.com/problems/happy-number\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: , \n//Space complexity: O(1)\n\npublic class HappyNumber {\n\n\tpublic boolean isHappy1(int n) { \n\t\tint s = n, f = n; // slow , fast\n\n\t\tdo {\n\t\t\ts = compute(s); // slow computes only once\n\t\t\tf = compute(compute(f)); // fast computes 2 times\n\n\t\t\tif (s == 1)\n\t\t\t\treturn true; // if we found 1 then happy indeed !!!\n\t\t} while (s != f); // else at some point they will meet in the cycle\n\n\t\treturn false; // it's a cycle , not happy at all !!!\n\t}\n\n\tpublic int compute(int n) {\n\t\tint s = 0;\n\t\twhile (n != 0) {\n\t\t\ts += (n % 10) * (n % 10);\n\t\t\tn = n / 10;\n\t\t}\n\t\treturn s;\n\t}\n\n\tpublic boolean isHappy(int n) {\n\t\tif (n < 1)\n\t\t\treturn false;\n\t\twhile (true) {\n\t\t\tn = helper(n);\n\t\t\tif (n == 1 || n == 7)\n\t\t\t\treturn true;\n\t\t\tif (n < 10)\n\t\t\t\treturn false;\n\t\t}\n\t}\n\n\tpublic int helper(int n) {\n\t\tint sum = 0;\n\t\twhile (n != 0) {\n\t\t\tint rem = n % 10;\n\t\t\tsum += rem * rem;\n\t\t\tn /= 10;\n\t\t}\n\t\treturn sum;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/LinkedListCycle.java",
    "title": "Linked List Cycle",
    "slug": "linked-list-cycle",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Linked List Cycle using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/LinkedListCycle.java",
    "sourceCode": "//Problem Link : https://leetcode.com/problems/linked-list-cycle/\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: O(n), \n//Space complexity: O(1)\n\npublic class LinkedListCycle {\n\n\tpublic static boolean hasCycle(ListNode head) {\n\t\tListNode fast = head;\n\t\tListNode slow = head;\n\n\t\t// while condition is like, can i move ahead, is means can i make a move with\n\t\t// slow and fast from current\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t\tif (slow == fast) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/LinkedListCycle_II.java",
    "title": "Linked List Cycle II",
    "slug": "linked-list-cycle-ii",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Linked List Cycle II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/LinkedListCycle_II.java",
    "sourceCode": "//Problem Link : https://leetcode.com/problems/linked-list-cycle-ii/\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: O(n), \n//Space complexity: O(1)\n\n\npublic class LinkedListCycle_II {\n\n\tpublic ListNode detectCycle(ListNode head) {\n\n\t\tif (head == null || head.next == null) {\n\t\t\treturn null; // no circle\n\t\t}\n\t\tListNode slow = head, fast = head;\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tfast = fast.next.next;\n\t\t\tslow = slow.next;\n\t\t\tif (fast == slow) { // circle detected\n\t\t\t\t\n\t\t\t\t//Suppose there is a cycle found from lastNode to 3rdNode in LinkedList of size 5\n\t\t\t\t// Our current head is pointing to 0th index, but we need to know startingPointing 3rd, so move both fast and head\n\t\t\t\t// because we cann't say fast.next because it will work when loop is at lastNode, fast -> loop is at some mid node\n\t\t\t\t// so better move head and fast pointer, it will help to get start point of the loop\n\t\t\t\twhile (head != fast) {\n\t\t\t\t\tfast = fast.next;\n\t\t\t\t\thead = head.next;\n\t\t\t\t}\n\t\t\t\treturn head;\n\t\t\t}\n\t\t}\n\t\treturn null; // no circle\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/MiddleOfTheLinkedList.java",
    "title": "Middle Of The Linked List",
    "slug": "middle-of-the-linked-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Middle Of The Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/MiddleOfTheLinkedList.java",
    "sourceCode": "//Problem Link : https://leetcode.com/problems/middle-of-the-linked-list/\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: O(n/2), \n//Space complexity: O(1)\n\npublic class MiddleOfTheLinkedList {\n\n\tpublic ListNode middleNode(ListNode head) {\n\n\t\tListNode slow = head;\n\t\tListNode fast = head;\n\n\t\t// since is fast is moving ahead, so it reaches to null[end] or last node so\n\t\t// that is why we are taking fast and checking for this conditions\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t}\n\t\treturn slow;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/PalindromeLinkedList.java",
    "title": "Palindrome Linked List",
    "slug": "palindrome-linked-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Palindrome Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/PalindromeLinkedList.java",
    "sourceCode": "import java.util.Stack;\n\n\n\n//Problem Link : https://leetcode.com/problems/palindrome-linked-list/\n//Logic: Object moves twice as fast as other\n//by the time the faster object moves x distance, slower will move x/2 distance\n//Time complexity: O(n), \n//Space complexity: O(1)\n\npublic class PalindromeLinkedList {\n\n\tpublic static boolean isPalindrome1(ListNode head) {\n\n\t\tStack<Integer> stack = new Stack<>();\n\n\t\tListNode temp = head;\n\n\t\twhile (temp != null) {\n\t\t\tstack.push(temp.val);\n\t\t\ttemp = temp.next;\n\t\t}\n\n\t\ttemp = head;\n\t\twhile (temp != null) {\n\t\t\tif (!stack.isEmpty() && stack.pop() != temp.val)\n\t\t\t\treturn false;\n\t\t\ttemp = temp.next;\n\t\t}\n\t\treturn true;\n\n\t}\n\n\tpublic boolean isPalindrome(ListNode head) {\n\n\t\tif (head == null)\n\t\t\treturn true;\n\n\t\tListNode slow = head;\n\t\tListNode fast = head;\n\n\t\twhile (fast.next != null && fast.next.next != null) {\n\t\t\tfast = fast.next.next;\n\t\t\tslow = slow.next;\n\t\t}\n\n\t\tListNode firstHalf = head;\n\t\tListNode secondHalf = reverse(slow.next);\n\n\t\twhile (firstHalf != null && secondHalf != null) {\n\t\t\tif (firstHalf.val != secondHalf.val)\n\t\t\t\treturn false;\n\n\t\t\tfirstHalf = firstHalf.next;\n\t\t\tsecondHalf = secondHalf.next;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\tpublic ListNode reverse(ListNode head) {\n\t\tListNode current = null, temp = head, previous = null;\n\t\twhile (temp != null) {\n\t\t\tprevious = current;\n\t\t\tcurrent = temp;\n\t\t\ttemp = current.next;\n\t\t\tcurrent.next = previous;\n\t\t}\n\t\treturn current;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/RemoveNthNodeFromEndOfList.java",
    "title": "Remove Nth Node From End Of List",
    "slug": "remove-nth-node-from-end-of-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Remove Nth Node From End Of List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/RemoveNthNodeFromEndOfList.java",
    "sourceCode": "public class RemoveNthNodeFromEndOfList {\n\tpublic ListNode removeNthFromEnd(ListNode head, int n) {\n\t\tListNode dummyNode = new ListNode(0, head);\n\t\tListNode leftPtr = dummyNode;\n\t\tListNode rightPtr = head;\n\t\twhile (n > 0 && rightPtr != null) {\n\t\t\trightPtr = rightPtr.next;\n\t\t\tn--;\n\t\t}\n\t\twhile (rightPtr != null) {\n\t\t\trightPtr = rightPtr.next;\n\t\t\tleftPtr = leftPtr.next;\n\t\t}\n\t\tleftPtr.next = leftPtr.next.next;\n\t\treturn dummyNode.next;\n\t}\n}"
  },
  {
    "key": "Two Pointers:FastAndSlowPointers/SwapNodesInLinkedList.java",
    "title": "Swap Nodes In Linked List",
    "slug": "swap-nodes-in-linked-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "FastAndSlowPointers"
    ],
    "description": "Practice Swap Nodes In Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/FastAndSlowPointers/SwapNodesInLinkedList.java",
    "sourceCode": "public class SwapNodesInLinkedList {\n\tpublic ListNode swapNodes(ListNode head, int k) {\n\n\t\t// simply swap the kth node from start with kth node from end\n\t\t// fast and slow pointer technique to detect, the kth start and kth end\n\t\tk = k - 1;\n\t\tListNode firstNode = head;\n\t\twhile (k > 0) {\n\t\t\tfirstNode = firstNode.next;\n\t\t\tk--;\n\t\t}\n\n\t\tListNode secondNode = head;\n\t\tListNode temp = firstNode;\n\t\twhile (temp.next != null) {\n\t\t\tsecondNode = secondNode.next;\n\t\t\ttemp = temp.next;\n\t\t}\n\n\t\tint t = firstNode.val;\n\t\tfirstNode.val = secondNode.val;\n\t\tsecondNode.val = t;\n\t\treturn head;\n\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/AlienDictionary.java",
    "title": "Alien Dictionary",
    "slug": "alien-dictionary",
    "topic": "Graphs",
    "difficulty": "Hard",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Alien Dictionary using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/AlienDictionary.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.Queue;\n\n/**\n * Topological Sort\n * Problem Link : https://practice.geeksforgeeks.org/problems/alien-dictionary/1\n * GFG Link : https://www.lintcode.com/problem/892/description?fromId=201&_from=collection\n *\n */\n\n\n\npublic class AlienDictionary {\n\tpublic String findOrder(String [] dict, int N, int K)\n    {\n        // Write your code here\n        ArrayList<ArrayList<Integer>> adj=new ArrayList<>();\n        int[] inDeg=new int[K];\n        for(int i=0;i<K;i++)\n        \tadj.add(new ArrayList<Integer>());\n        for(int i=0;i<N-1;i++){\n            String s1=dict[i];\n            String s2=dict[i+1];\n            for(int j=0;j<s1.length();j++){\n                if(j<s2.length() && s1.charAt(j)!=s2.charAt(j)){\n                    int node=(int)(s1.charAt(j)-'a');\n                    int neg=(int)(s2.charAt(j)-'a');\n                    adj.get(node).add(neg);\n                    inDeg[neg]++;\n                    break;\n                }\n            }\n        }\n        \n        Queue<Integer> q=new LinkedList<>();\n        for(int i=0;i<K;i++){\n            if(inDeg[i]==0)\n                q.offer(i);\n        }\n        String ans=\"\";\n        while(!q.isEmpty()){\n            int node=q.poll();\n            ans=ans+(char)(node+97);\n            for(int i:adj.get(node)){\n                inDeg[i]--;\n                if(inDeg[i]==0)\n                     q.offer(i);\n            }\n        }\n        return ans;\n        \n        \n    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}\n\n//public class Solution {\n//    /**\n//     * @param words: a list of words\n//     * @return: a string which is correct order\n//     */\n//    public String alienOrder(String[] words) {\n//        // Topo sort\n//        // Edge case\n//        if(words == null || words.length == 0) return \"\";\n//        \n//        //1. Init inDegree & topoMap\n//        HashMap<Character, Integer> inDegree = new HashMap<>();\n//        HashMap<Character, List<Character>> topoMap = new HashMap<>();\n//        for(String word : words)\n//            for(char c : word.toCharArray()) {\n//                inDegree.put(c, 0);\n//                topoMap.put(c, new ArrayList<Character>());\n//            }\n//        \n//        //2. Build Map\n//        for(int i = 0; i < words.length - 1; i++) {\n//            String w1 = words[i], w2 = words[i + 1];\n//            for(int j = 0; j < Math.min(w1.length(), w2.length()); j++) {\n//                char parent = w1.charAt(j), child = w2.charAt(j);\n//                if(parent != child) {\n//                    inDegree.put(child, inDegree.get(child) + 1);\n//                    topoMap.get(parent).add(child);\n//                    break;\n//                }\n//            }\n//        }\n//        \n//        //3. Topo sort\n//        StringBuilder res = new StringBuilder();\n//        while(!inDegree.isEmpty()) {\n//            boolean flag = false;\n//            for(Character c : inDegree.keySet()) {\n//                if(inDegree.get(c) == 0) {\n//                    flag = true;\n//                    res.append(c);\n//                    List<Character> children = topoMap.get(c);\n//                    for(Character ch : children)\n//                        inDegree.put(ch, inDegree.get(ch) - 1);\n//                    inDegree.remove(c);\n//                    break;\n//                }\n//            }\n//            if(flag == false)\n//                return \"\";\n//        }\n//        return res.toString();\n//    }\n//}"
  },
  {
    "key": "Graphs:Graphs/CloneGraph.java",
    "title": "Clone Graph",
    "slug": "clone-graph",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Clone Graph using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/CloneGraph.java",
    "sourceCode": "import java.util.Arrays;\n\n\npublic class CloneGraph {\n    public void dfs(Node node , Node copy , Node[] visited){\n        visited[copy.val] = copy;\n        for(Node n : node.neighbors){\n            if(visited[n.val] == null){\n                Node newNode = new Node(n.val);\n                copy.neighbors.add(newNode);\n                dfs(n , newNode , visited);\n            }else{\n                copy.neighbors.add(visited[n.val]);\n            }\n        }\n    }\n    public Node cloneGraph(Node node) {\n        if(node == null) return null; \n        Node copy = new Node(node.val); \n        Node[] visited = new Node[101]; \n        Arrays.fill(visited , null); \n        dfs(node , copy , visited); \n        return copy; \n    }\n}"
  },
  {
    "key": "Graphs:Graphs/CourseSchedule_I.java",
    "title": "Course Schedule",
    "slug": "course-schedule",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Course Schedule using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/CourseSchedule_I.java",
    "sourceCode": "import java.util.Arrays;\nimport java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.Set;\n\n//Time and Space is O(V+E)\n//https://youtu.be/hGscdp38JKM\n\npublic class CourseSchedule_I {\n\t\n\t HashMap<Integer, Set<Integer>> adj = new HashMap<>();\n\t    \n\t    public boolean canFinish(int numCourses, int[][] prerequisites) {\n\t         \n\t        int[] visited = new int[numCourses];\n\t        Arrays.fill(visited,0);\n\t        for (int i = 0; i < numCourses; i++) {\n\t            adj.put(i, new HashSet());\n\t        }\n\t        \n\t        for (int i = 0; i < prerequisites.length; i++) {\n\t            adj.get(prerequisites[i][1]).add(prerequisites[i][0]);\n\t        }\n\t        \n\t        for (int i = 0; i < numCourses; i++) {\n\t            if (visited[i]==0){\n\t                boolean hasCycle = dfsDetectCycle(i,visited);\n\t                if(hasCycle)\n\t                    return false; \n\t            }\n\t        }\n\t        return true;\n\t    }\n\t    \n\t    private boolean dfsDetectCycle(int n,int[] visited) {\n\t      \n\t       if(visited[n]==2)\n\t           return true;\n\t    \n\t        visited[n]=2;\n\t        for (int e: adj.get(n)) {\n\t            if (visited[e]!=1) {\n\t                boolean hasCycle = dfsDetectCycle(e,visited);\n\t                if (hasCycle) return true;\n\t            }\n\t        }\n\t        \n\t        visited[n]=1;\n\t        return false;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/CourseSchedule_II.java",
    "title": "Course Schedule II",
    "slug": "course-schedule-ii",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Course Schedule II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/CourseSchedule_II.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\n\n/**\n * https://leetcode.com/problems/course-schedule-ii/solutions/190393/topological-sort-template-general-approach/?orderBy=most_votes\n * @author saite\n *\n */\n\npublic class CourseSchedule_II {\n\t\n\t public int[] findOrder(int numCourses, int[][] prerequisites) {\n\t        // Topological sort\n\t        // Edge case\n\t        if(numCourses <= 0) return new int[0];\n\t        \n\t        //1. Init Map\n\t        HashMap<Integer, Integer> inDegree = new HashMap<>();\n\t        HashMap<Integer, List<Integer>> topoMap = new HashMap<>();\n\t        for(int i = 0; i < numCourses; i++) {\n\t            inDegree.put(i, 0);\n\t            topoMap.put(i, new ArrayList<Integer>());\n\t        }\n\t        \n\t        //2. Build Map\n\t        for(int[] pair : prerequisites) {\n\t            int curCourse = pair[0], preCourse = pair[1];\n\t            topoMap.get(preCourse).add(curCourse);  // put the child into it's parent's list\n\t            inDegree.put(curCourse, inDegree.get(curCourse) + 1); // increase child inDegree by 1\n\t        }\n\t        //3. find course with 0 indegree, minus one to its children's indegree, until all indegree is 0\n\t        int[] res = new int[numCourses];\n\t        int base = 0;\n\t        while(!inDegree.isEmpty()) {\n\t            boolean flag = false;   // use to check whether there is cycle\n\t            for(int key : inDegree.keySet()) {  // find nodes with 0 indegree\n\t                if(inDegree.get(key) == 0) {\n\t                    res[base ++] = key;\n\t                    List<Integer> children = topoMap.get(key);  // get the node's children, and minus their inDegree\n\t                    for(int child : children) \n\t                        inDegree.put(child, inDegree.get(child) - 1);\n\t                    inDegree.remove(key);      // remove the current node with 0 degree and start over\n\t                    flag = true;\n\t                    break;\n\t                }\n\t            }\n\t            if(!flag)  // there is a circle --> All Indegree are not 0\n\t                return new int[0];\n\t        }\n\t        return res;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/DisjointSet.java",
    "title": "Disjoint Set",
    "slug": "disjoint-set",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Disjoint Set using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/DisjointSet.java",
    "sourceCode": "public class DisjointSet {\n    \tint find(int A[],int X){\n        return A[X]==X ? X : find(A,A[X]);\n\t}\n\tvoid unionSet(int A[],int X,int Z){\n       int xParent = find(A,X);\n       int yParent = find(A,Z);\n       A[xParent]=yParent;\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/FindTheCelebrity.java",
    "title": "Find The Celebrity",
    "slug": "find-the-celebrity",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Find The Celebrity using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/FindTheCelebrity.java",
    "sourceCode": "/*\n * \n * Problem stmt : In a party, a group of people are there, out them 1 celebrity is there\n * so find that celebrity\n * \n * By Definition of celebrity : celebrity is known to all the people in the party\n * but for celebrity, he doesn't know any one\n * \n * Problem Link : https://www.lintcode.com/problem/645/description\n * \n * \n * Video Link : https://youtu.be/5rkKCrPzD8c\n * \n * \n * Logic : \n * Step 1: Pick a candidate and check with all other persons in linear order is enough\n *   and update if both knowing each other\n *   \n * Step2: check candidate against rules, he should not be knowing anyone \n *   he is known to all other people in the party\n * if not return -1\n * \n * \n * \n * */\n\n\npublic class FindTheCelebrity {\n\t\n\t boolean knows(int a, int  b) {\n\t\t return false; // some logic, there are using API which checks in 2D Matrix\n\t }\n\t\n\t public int findCelebrity(int n) {\n\t        if (n <= 0) {\n\t            return -1;\n\t        }\n\t        if (n == 1) {\n\t            return 0;\n\t        }\n\t        int candi = 0;\n\t        for (int i = 1; i < n; ++i) {\n\t            if (knows(candi, i)) {\n\t                candi = i;\n\t            }\n\t        }\n\t        // check candi according to the def of celebrity\n\t        for (int i = 0; i < n; ++i) {\n\t        \t//since we assume candidate as celebrity\n\t        \t//if candidate doesn't know to i - return false\n\t            if (i != candi && !knows(i, candi)) {\n\t                return -1;\n\t            }\n\t            \n\t            //if candidate knows the other person return false\n\t            if (i != candi && knows(candi, i)) {\n\t                return -1;\n\t            }\n\t        }\n\t        return candi;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/FloodFill.java",
    "title": "Flood Fill",
    "slug": "flood-fill",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Flood Fill using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/FloodFill.java",
    "sourceCode": "public class FloodFill {\n\tpublic int[][] floodFill(int[][] image, int sr, int sc, int newColor) {\n\t\tif (image[sr][sc] == newColor)\n\t\t\treturn image;\n\t\tchangeColor(image, sr, sc, image[sr][sc], newColor);\n\t\treturn image;\n\t}\n\n\tpublic void changeColor(int[][] image, int sr, int sc, int color, int newColor) {\n\n\t\tif (sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length || image[sr][sc] != color)\n\t\t\treturn;\n\t\timage[sr][sc] = newColor;\n\t\tchangeColor(image, sr - 1, sc, color, newColor);\n\t\tchangeColor(image, sr + 1, sc, color, newColor);\n\t\tchangeColor(image, sr, sc - 1, color, newColor);\n\t\tchangeColor(image, sr, sc + 1, color, newColor);\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/GraphBFS.java",
    "title": "Graph BFS",
    "slug": "graph-bfs",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Graph BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/GraphBFS.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.Queue;\n\npublic class GraphBFS {\n\t// Function to return Breadth First Traversal of given graph.\n\n\tvoid doBreadthFirstTraversal(Queue<Integer> queue, boolean[] visited, ArrayList<ArrayList<Integer>> adj,\n\t\t\tArrayList<Integer> bft) {\n\t\tif (queue.isEmpty())\n\t\t\treturn;\n\n\t\tint node = queue.poll();// FIFO\n\t\tbft.add(node);\n\t\tfor (int adjacent : adj.get(node)) {\n\t\t\tif (!visited[adjacent]) {\n\t\t\t\tqueue.add(adjacent);\n\t\t\t\tvisited[adjacent] = true;\n\t\t\t}\n\t\t}\n\n\t\tdoBreadthFirstTraversal(queue, visited, adj, bft);\n\t}\n\n\t// public ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>>\n\t// adj) {\n\t// boolean[] visited = new boolean[V];\n\t// ArrayList<Integer> bft = new ArrayList<>();\n\t// Queue<Integer> queue = new LinkedList<>();\n\t// for(int i=0;i<V;i++){\n\t// if(!visited[i]){\n\t// visited[i]=true;\n\t// queue.add(i);\n\t// doBreadthFirstTraversal(queue,visited,adj,bft);\n\t// }\n\t// }\n\t// return bft;\n\t// }\n\n\tpublic ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n\t\t// Code here\n\n\t\tArrayList<Integer> bfs = new ArrayList<Integer>();\n\t\tQueue<Integer> queue = new LinkedList<Integer>();\n\t\tboolean[] visited = new boolean[V];\n\n\t\tqueue.add(0);\n\t\tvisited[0] = true;\n\n\t\twhile (!queue.isEmpty()) {\n\t\t\tint node = queue.poll();\n\t\t\tbfs.add(node);\n\t\t\tfor (Integer adjacent : adj.get(node)) {\n\t\t\t\tif (!visited[adjacent]) {\n\t\t\t\t\tvisited[adjacent] = true;\n\t\t\t\t\tqueue.add(adjacent);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn bfs;\n\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/GraphDFS.java",
    "title": "Graph DFS",
    "slug": "graph-dfs",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Graph DFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/GraphDFS.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Stack;\n\npublic class GraphDFS {\n\n\n\n}\n\n\n\n\nclass Solution {\n    // Function to return a list containing the DFS traversal of the graph.\n \n    void doDepthFirstTraversal(int node, boolean[] visited, ArrayList<ArrayList<Integer>> adjacencyList,ArrayList<Integer> dft){\n          visited[node]=true; // done visiting\n          dft.add(node);\n          for(int adjacentNode:adjacencyList.get(node)){\n                if(!visited[adjacentNode])\n                    doDepthFirstTraversal(adjacentNode,visited,adjacencyList,dft);\n          }\n    }\n    \n    \n    void doDfsIterative(int startNode, boolean[]visited, ArrayList<ArrayList<Integer>> adj, ArrayList<Integer> dft){\n        \n        Stack<Integer> stack = new Stack<Integer>();\n        stack.push(startNode);\n        while(!stack.isEmpty()){\n           int node = stack.pop();\n           if(!visited[node]){\n                visited[node] =true;\n                dft.add(node);\n           }\n           for(int adjacentNode:adj.get(node)){\n                if(!visited[adjacentNode])\n                    stack.push(adjacentNode);\n           }\n            \n        }\n    }\n    \n \n\n    public ArrayList<Integer> dfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {\n        boolean[] visited = new boolean[V];\n        ArrayList<Integer> dft = new ArrayList<>();\n        for(int i=0;i<V;i++){\n           if(!visited[i])\n              doDepthFirstTraversal(i,visited,adj,dft);\n        }\n        return dft;\n    }\n    \n    \n    \n}"
  },
  {
    "key": "Graphs:Graphs/LongestIncreasingPathInAMatrix.java",
    "title": "Longest Increasing Path In A Matrix",
    "slug": "longest-increasing-path-in-a-matrix",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Longest Increasing Path In A Matrix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/LongestIncreasingPathInAMatrix.java",
    "sourceCode": "import java.util.Arrays;\n\n\n/*\n * \n * link : https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/\n * \n * memoziation + dfs\n * \n * */\n\n\npublic class LongestIncreasingPathInAMatrix {\n\n\n    public int longestIncreasingPath(int[][] matrix) {\n        if(matrix == null || matrix.length == 0) return 0;\n        \n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        int maxLength = 0;\n        \n\t\t// memoization\n        int[][]dp = new int[rows+1][cols+1];\n        for(int[] row : dp) {\n            Arrays.fill(row, -1);\n        }\n        \n\t\t// check when to apply DFS\n        for(int i=0;i<rows;i++) {\n            for(int j=0;j<cols;j++) {\n                maxLength = Math.max(maxLength, dfs(matrix, dp, i, j, rows, cols, Integer.MIN_VALUE));\n            }\n        }\n        \n        return maxLength;\n    }\n    private int dfs(int[][] matrix, int[][]dp, int i, int j, int rows, int cols, int compareWith) {\n        \n        boolean isCurrentCellSafe = isSafe(matrix, i, j, compareWith);\n    \n        int result = 0;\n\n        if(isCurrentCellSafe) {\n            \n            if(dp[i][j] != -1) \n                return dp[i][j];\n            \n            int ch = matrix[i][j];\n            matrix[i][j] = -1;\n            \n            // Go in each direction, and check which path yields the maximum length path\n            // This is giving TLE, so we will have to memoize the code\n\n            int d = dfs(matrix, dp, i+1, j, rows, cols, ch) ;\n            int u = dfs(matrix, dp, i-1, j, rows, cols, ch) ;\n            int r = dfs(matrix, dp, i, j+1, rows, cols, ch) ;\n            int l = dfs(matrix, dp, i, j-1, rows, cols, ch) ;\n            \n            // adding 1, to include the current cell in the path\n\n            result = 1 + Math.max(Math.max(d,u), Math.max(l,r));\n            matrix[i][j] = ch;\n            \n            dp[i][j] = result;\n        }\n        return result;\n    }\n    private boolean isSafe(int[][]matrix, int i, int j, int cw) {\n        if(i>=0 && i<matrix.length && j>=0 && j<matrix[0].length && matrix[i][j] > cw && cw!=-1) {\n            return true;\n        }\n        return false;\n    }\n\n\t\n\t\t\n\t\t\n\t\t\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/MaxAreaOfIsland.java",
    "title": "Max Area Of Island",
    "slug": "max-area-of-island",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Max Area Of Island using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/MaxAreaOfIsland.java",
    "sourceCode": "public class MaxAreaOfIsland {\n\tpublic int maxAreaOfIsland(int[][] grid) {\n\t\tint rows = grid.length;\n\t\tint cols = grid[0].length;\n\t\tint maxArea = 0;\n\t\tfor (int i = 0; i < rows; i++) {\n\t\t\tfor (int j = 0; j < cols; j++) {\n\t\t\t\tif (grid[i][j] == 1)\n\t\t\t\t\tmaxArea = Math.max(maxArea, dfs(i, j, grid));\n\t\t\t}\n\t\t}\n\t\treturn maxArea;\n\t}\n\n\tint dfs(int row, int col, int[][] grid) {\n\n\t\tif (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] <= 0) {\n\t\t\treturn 0;\n\t\t}\n\t\tgrid[row][col] = -1;\n\n\t\tint totalArea = dfs(row + 1, col, grid) + dfs(row - 1, col, grid) + dfs(row, col + 1, grid)\n\t\t\t\t+ dfs(row, col - 1, grid);\n\t\treturn totalArea + 1;\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/Node.java",
    "title": "Node",
    "slug": "node",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Node using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/Node.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node() {\n        val = 0;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val) {\n        val = _val;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val, ArrayList<Node> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n}"
  },
  {
    "key": "Graphs:Graphs/NumberOfIslands.java",
    "title": "Number Of Islands",
    "slug": "number-of-islands",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Number Of Islands using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/NumberOfIslands.java",
    "sourceCode": "/*\n * \n * \n * https://leetcode.com/problems/number-of-islands/description/\n * */\n\n\npublic class NumberOfIslands {\n\n\tprivate int rows;\n\tprivate int cols;\n\n\tpublic int numIslands(char[][] grid) {\n\n\t\tif (grid == null)\n\t\t\treturn 0;\n\t\tif (grid.length == 0)\n\t\t\treturn 0;\n\n\t\tint result = 0;\n\t\tthis.rows = grid.length;\n\t\tthis.cols = grid[0].length;\n\n\t\tfor (int x = 0; x < rows; x++) {\n\t\t\tfor (int y = 0; y < cols; y++) {\n\t\t\t\tif (grid[x][y] == '1') {\n\t\t\t\t\tresult++;\n\t\t\t\t\tdepth_first_search(grid, x, y);\n\t\t\t\t}\n\n\t\t\t}\n\t\t}\n\n\t\treturn result;\n\n\t}\n\n\tprivate void depth_first_search(char[][] grid, int x, int y) {\n\n\t\t// it checks whether rowwise, we are inbound or not\n\t\tif (x < 0 || x >= rows)\n\t\t\treturn;\n\n\t\t// it checks colum wise, whether we are inbound or not\n\t\tif (y < 0 || y >= cols)\n\t\t\treturn;\n\n\t\t// if already visited 'v' or there is no path '0' simply return we cann't\n\t\t// proceed further as there is no path\n\t\tif (grid[x][y] == '0' || grid[x][y] == 'v')\n\t\t\treturn;\n\n\t\t// mark every visted node as 'v' if not met with above conditions\n\t\tgrid[x][y] = 'v';\n\n\t\tdepth_first_search(grid, x + 1, y);\n\n\t\tdepth_first_search(grid, x - 1, y);\n\n\t\tdepth_first_search(grid, x, y + 1);\n\n\t\tdepth_first_search(grid, x, y - 1);\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/RedundantConnections.java",
    "title": "Redundant Connections",
    "slug": "redundant-connections",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Redundant Connections using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/RedundantConnections.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\n\nclass UnionFind {\n    int[] parent, size;\n    public UnionFind(int n) {\n        parent = new int[n]; size = new int[n];\n        for (int i = 0; i < n; i++) {\n            parent[i] = i; size[i] = 1;\n        }\n    }\n    public int find(int x) {\n        if (x == parent[x]) return x;\n        return parent[x] = find(parent[x]); // Path compression\n    }\n    public boolean union(int u, int v) {\n        int pu = find(u), \n        pv = find(v);\n        if (pu == pv) \n            return false; // Return False if u and v are already union\n        if (size[pu] > size[pv]) { // Union by larger size\n            size[pu] += size[pv];\n            parent[pv] = pu;\n        } else {\n            size[pv] += size[pu];\n            parent[pu] = pv;\n        }\n        return true;\n    }\n}\n\npublic class RedundantConnections {\n      public int[] findRedundantConnection(int[][] edges) {\n        int n = edges.length; \n        UnionFind uf = new UnionFind(n);\n        for (int[] e : edges) {\n            if (!uf.union(e[0]-1, e[1]-1)) \n                 return new int[]{e[0], e[1]};\n        }\n        return new int[]{};\n    }\n}\n\n\n\n// Cycle detection in a undirected graph\n\nclass SolutionDFS_CYCLCE {\n    public int[] findRedundantConnection(int[][] edges) {\n       if(edges.length == 0)return new int[]{0,0};\n        // LETS CREATE GRAPH\n        int n = edges.length+1;\n        ArrayList<ArrayList<Integer>> adj = new ArrayList<>(n);\n        for(int i = 0; i<n; i++ ){\n            adj.add(new ArrayList<>());\n        }\n        boolean vis[] = new boolean[n];\n        int ans []= new int[2];\n        for(int c[]: edges){\n            Arrays.fill(vis, false);\n            adj.get(c[0]).add(c[1]);\n            adj.get(c[1]).add(c[0]);\n            if(dfs(c[0],-1,vis, adj)){\n                return c; \n            }\n        }\n        return ans; \n    }\n   public boolean dfs(int node,int parent, boolean[] visited,ArrayList<ArrayList<Integer>> adj){\n        visited[node]=true;\n        for(int adjacent:adj.get(node)){\n            if(!visited[adjacent]){\n                if(dfs(adjacent,node,visited,adj))\n                  return true;\n            }else if(parent!=adjacent)\n               return true;\n        }\n        return false;\n    }\n}"
  },
  {
    "key": "Graphs:Graphs/RottenOranges.java",
    "title": "Rotten Oranges",
    "slug": "rotten-oranges",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Rotten Oranges using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/RottenOranges.java",
    "sourceCode": "public class RottenOranges {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/SnakesAndLadder.java",
    "title": "Snakes And Ladder",
    "slug": "snakes-and-ladder",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Snakes And Ladder using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/SnakesAndLadder.java",
    "sourceCode": "public class SnakesAndLadder {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/SurroundedRegions.java",
    "title": "Surrounded Regions",
    "slug": "surrounded-regions",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Surrounded Regions using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/SurroundedRegions.java",
    "sourceCode": "public class SurroundedRegions {\n\tpublic void solve(char[][] board) {\n\t\tif (board.length == 0)\n\t\t\treturn;\n\n\t\t// this for loop handles all boundary condition in 1st & last row.\n\t\tfor (int i = 0; i < board[0].length; i++) {\n\t\t\tif (board[0][i] == 'O')\n\t\t\t\tDFS(board, 0, i);\n\t\t\tif (board[board.length - 1][i] == 'O')\n\t\t\t\tDFS(board, board.length - 1, i);\n\n\t\t}\n\n\t\t// this for loop handles all boundary condition in 1st & last col.\n\t\tfor (int i = 0; i < board.length; i++) {\n\t\t\tif (board[i][0] == 'O')\n\t\t\t\tDFS(board, i, 0);\n\t\t\tif (board[i][board[0].length - 1] == 'O')\n\t\t\t\tDFS(board, i, board[0].length - 1);\n\n\t\t}\n\n\t\tfor (int i = 0; i < board.length; i++) {\n\t\t\tfor (int j = 0; j < board[0].length; j++) {\n\n\t\t\t\tif (board[i][j] == 'O')\n\t\t\t\t\tboard[i][j] = 'X';\n\n\t\t\t\tif (board[i][j] == '#')\n\t\t\t\t\tboard[i][j] = 'O';\n\t\t\t}\n\t\t}\n\t}\n\n\tprivate void DFS(char[][] board, int i, int j) {\n\n\t\tif (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] != 'O')\n\t\t\treturn;\n\n\t\tboard[i][j] = '#';\n\n\t\tDFS(board, i + 1, j);\n\t\tDFS(board, i - 1, j);\n\t\tDFS(board, i, j - 1);\n\t\tDFS(board, i, j + 1);\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Graphs:Graphs/TimeNeededToInformAllEmployees.java",
    "title": "Time Needed To Inform All Employees",
    "slug": "time-needed-to-inform-all-employees",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Time Needed To Inform All Employees using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/TimeNeededToInformAllEmployees.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\n/**\n * Solution 1: Top down DFS dfs find out the time needed for each employees. The\n * time for a manager = max(manager's employees) + informTime[manager]\n * \n * Time O(N), Space O(N)\n */\n\npublic class TimeNeededToInformAllEmployees {\n\n\tpublic int numOfMinutes(final int n, final int headID, final int[] manager, final int[] informTime) {\n\t\tfinal Map<Integer, List<Integer>> graph = new HashMap<>();\n\t\tint total = 0;\n\t\tfor (int i = 0; i < manager.length; i++) {\n\t\t\tint j = manager[i];\n\t\t\tif (!graph.containsKey(j))\n\t\t\t\tgraph.put(j, new ArrayList<>());\n\t\t\tgraph.get(j).add(i);\n\t\t}\n\t\treturn dfs(graph, informTime, headID);\n\t}\n\n\tprivate int dfs(final Map<Integer, List<Integer>> graph, final int[] informTime, final int cur) {\n\t\tint max = 0;\n\t\tif (!graph.containsKey(cur))\n\t\t\treturn max;\n\t\tfor (int i = 0; i < graph.get(cur).size(); i++)\n\t\t\tmax = Math.max(max, dfs(graph, informTime, graph.get(cur).get(i)));\n\t\treturn max + informTime[cur];\n\t}\n}"
  },
  {
    "key": "Graphs:Graphs/ToplogicalSort.java",
    "title": "Toplogical Sort",
    "slug": "toplogical-sort",
    "topic": "Graphs",
    "difficulty": "Medium",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Toplogical Sort using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/ToplogicalSort.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.Queue;\nimport java.util.Stack;\n\n/**\n * \n * \n * Video Explanation : https://youtu.be/eL-KzMXSXXI\n * \n * Note : \n * 1.Topological sort can be applied only on directed acyclic graph - since there is dependency factor\n * 2.we can have multiples topological sort orders\n *\n * We solve this dfs or bfs\n * \n * GFG Pratice Link : https://practice.geeksforgeeks.org/problems/topological-sort/1\n * \n * \n * Time complexity : O(V + E) , since we won't repeat visiting on already visted edge, it will be vertices + edges\n * Space Complexity: O(V) - for visited/unvisited status checks\n * \n * Application : when there is prerequiste, examples project build scenarios, A has to build first before B\n *\n */\n\n\npublic class ToplogicalSort {\n\n\tstatic void findTopologicalOrder(int node, ArrayList<ArrayList<Integer>> adjacencyList, Stack<Integer> stack,\n\t\t\tboolean[] visited) {\n\t\tvisited[node] = true;\n\t\tfor (int n : adjacencyList.get(node)) {\n\t\t\tif (!visited[n]) {\n\t\t\t\tfindTopologicalOrder(n, adjacencyList, stack, visited);\n\t\t\t}\n\t\t}\n\t\tstack.push(node);\n\t}\n\n\tstatic int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {\n\n\t\tint[] topSort = new int[V];\n\t\tStack<Integer> stack = new Stack<>();\n\t\tboolean[] visited = new boolean[V];\n\n\t\tfor (int i = 0; i < V; i++) {\n\t\t\tif (visited[i] == false)\n\t\t\t\tfindTopologicalOrder(i, adj, stack, visited);\n\t\t}\n\n\t\tint index = 0;\n\t\twhile (!stack.isEmpty()) {\n\t\t\ttopSort[index] = stack.pop();\n\t\t\tindex++;\n\t\t}\n\n\t\treturn topSort;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\nstatic int[] topoSortBFS(int V, ArrayList<ArrayList<Integer>> adj) \n    {\n        // add your code here\n        int[] visited = new int[V];\n        for(int i = 0; i < adj.size(); i++) {\n            for(int j = 0; j < adj.get(i).size(); j++) {\n                visited[adj.get(i).get(j)]++;\n            }\n        }\n        int[] ans = new int[V];\n        int k = 0;\n        Queue<Integer> queue = new LinkedList<>();\n        for(int i = 0; i < V; i++) {\n            if(visited[i] == 0) queue.offer(i);\n        }\n        while(!queue.isEmpty()) {\n            int first = queue.poll();\n            ans[k] = first;\n            k++;\n            for(int v : adj.get(first)) {\n                visited[v]--;\n                if(visited[v] == 0) {\n                    queue.offer(v);\n                }\n            }\n        }\n        return ans;\n    }\n\n}"
  },
  {
    "key": "Graphs:Graphs/WordLadder_BFS.java",
    "title": "Word Ladder BFS",
    "slug": "word-ladder-bfs",
    "topic": "Graphs",
    "difficulty": "Hard",
    "tags": [
      "Graphs",
      "Graphs"
    ],
    "description": "Practice Word Ladder BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Graphs/WordLadder_BFS.java",
    "sourceCode": "import java.util.HashSet;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\nimport java.util.Set;\n\n// https://leetcode.com/problems/word-ladder/solutions/1764371/a-very-highly-detailed-explanation/?orderBy=most_votes\n\npublic class WordLadder_BFS {\n\n\tpublic int ladderLength(String beginWord, String endWord, List<String> wordList) {\n\t\tSet<String> set = new HashSet<>(wordList);\n\t\tif (!set.contains(endWord))\n\t\t\treturn 0;\n\n\t\tQueue<String> queue = new LinkedList<>();\n\t\tqueue.add(beginWord);\n\n\t\tSet<String> visited = new HashSet<>();\n\t\tqueue.add(beginWord);\n\n\t\tint changes = 1;\n\n\t\twhile (!queue.isEmpty()) {\n\t\t\tint size = queue.size();\n\t\t\tfor (int i = 0; i < size; i++) {\n\t\t\t\tString word = queue.poll();\n\t\t\t\tif (word.equals(endWord))\n\t\t\t\t\treturn changes;\n\n\t\t\t\tfor (int j = 0; j < word.length(); j++) {\n\t\t\t\t\tfor (int k = 'a'; k <= 'z'; k++) {\n\t\t\t\t\t\tchar arr[] = word.toCharArray();\n\t\t\t\t\t\tarr[j] = (char) k;\n\n\t\t\t\t\t\tString str = new String(arr);\n\t\t\t\t\t\tif (set.contains(str) && !visited.contains(str)) {\n\t\t\t\t\t\t\tqueue.add(str);\n\t\t\t\t\t\t\tvisited.add(str);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t++changes;\n\t\t}\n\t\treturn 0;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/CarPoolingAndCandy.java",
    "title": "Car Pooling And Candy",
    "slug": "car-pooling-and-candy",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Car Pooling And Candy using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/CarPoolingAndCandy.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class CarPoolingAndCandy {\n  \n    public int candy(int[] ratings) {\n          int n =  ratings.length;\n        if(n==0)\n            return 0;\n        int left[] = new int[n];\n        Arrays.fill(left,1);\n        for(int i=1;i<n;i++)\n        {\n            if(ratings[i] > ratings[i-1])\n                left[i] = left[i-1]+1;\n        }\n        int right=1;\n        int ans = left[n-1];\n        for(int i=n-2;i>=0;i--)\n        {\n            if(ratings[i] > ratings[i+1]){\n                right++;\n                  left[i] = Math.max(right,left[i]);\n            }\n              \n            else\n              right=1;\n            \n            ans += left[i];\n        }\n \n        return ans;\n    }\n  \n    \n\n    // public boolean carPooling(int[][] trips, int capacity) {\n// \t Arrays.sort(trips, (a,b) -> a[1]-b[1]);  // sort array from start time in ascending order\n//         PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[2]-b[2]);  // sort PriorityQueue from end time in ascending order.\n        \n//         for(int[] trip : trips) {\n//             while(!pq.isEmpty() && pq.peek()[2] <= trip[1]) {\n//                 capacity += pq.poll()[0];\n//             }\n//             pq.offer(trip);\n//             capacity -= trip[0];\n//             if(capacity < 0)\n//                 return false;\n//         }\n        \n//         return true;\n// }\n\n\npublic boolean carPooling(int[][] trips, int capacity) {\n        int[] stops = new int[1001];\n        \n        for(int[] trip : trips){\n            stops[trip[1]] += trip[0];\n            stops[trip[2]] -= trip[0];\n        }\n        \n        int passengerCount = 0;\n        for(int val: stops){\n            passengerCount += val;\n            if(passengerCount > capacity){\n                return false;\n            }\n        }\n        \n        return true;\n    }\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/DistributeCandies.java",
    "title": "Distribute Candies",
    "slug": "distribute-candies",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Distribute Candies using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/DistributeCandies.java",
    "sourceCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class DistributeCandies {\n\n\tpublic int distributeCandies(int[] candyType) {\n\t\tSet<Integer> candyTypes = new HashSet<>();\n\t\tfor (int candy : candyType) {\n\t\t\tcandyTypes.add(candy);\n\t\t}\n\n\t\treturn (candyTypes.size() >= candyType.length / 2) ? candyType.length / 2 : candyTypes.size();\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/FindTheCelebrity.java",
    "title": "Find The Celebrity",
    "slug": "find-the-celebrity",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Find The Celebrity using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/FindTheCelebrity.java",
    "sourceCode": "public class FindTheCelebrity {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/GasStationOrCircularTour.java",
    "title": "Gas Station Or Circular Tour",
    "slug": "gas-station-or-circular-tour",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Gas Station Or Circular Tour using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/GasStationOrCircularTour.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class GasStationOrCircularTour {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = Arrays.stream(gas).sum();\n        int totalCost = Arrays.stream(cost).sum();\n\n        if(totalGas<totalCost)\n            return -1;\n        \n        int remainingGas=0;\n        int start=0;\n        \n        for(int i=0;i<gas.length;i++){\n            remainingGas+=gas[i]-cost[i];\n            if(remainingGas<0){\n                start=i+1;\n                remainingGas=0;\n            }\n        }\n        \n        return start;\n    }\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/IncreasingTripletSubsequence.java",
    "title": "Increasing Triplet Subsequence",
    "slug": "increasing-triplet-subsequence",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Increasing Triplet Subsequence using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/IncreasingTripletSubsequence.java",
    "sourceCode": "public class IncreasingTripletSubsequence {\n   public boolean increasingTriplet(int[] nums) {\n    int a = Integer.MAX_VALUE;\n    int b = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n        if (num <= a) {\n            a = num;\n        } else if (num <= b) {\n            b = num;\n        } else {\n            return true;\n        }\n    }\n\n    return false;\n}\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/JumpGame.java",
    "title": "Jump Game",
    "slug": "jump-game",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Jump Game using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/JumpGame.java",
    "sourceCode": "public class JumpGame {\n   public boolean canJump(int[] nums) {\n        int n = nums.length;\n        int reachable = 0;\n\n        for (int i = 0; i < n; ++i) {\n            if (reachable < i)\n                return false;\n            reachable = Math.max(reachable, i + nums[i]);\n        }\n        return true;\n    }\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/LargestFromArray.java",
    "title": "Largest From Array",
    "slug": "largest-from-array",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Largest From Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/LargestFromArray.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.Comparator;\nimport java.util.List;\n\npublic class LargestFromArray {\n\n\tpublic String largestNumber(int[] nums) {\n\n\t\tList<String> list = new ArrayList<String>();\n\t\tfor (int i = 0; i < nums.length; i++) {\n\t\t\tlist.add(String.valueOf(nums[i]));\n\t\t}\n\n\t\t// S, we are sorting things based on the this core logic\n\t\t// [1,2] -> AB=12, BA=21, is BA>AB(21>12) then make a swap b/w A and B\n\n\t\tCollections.sort(list, new Comparator<String>() {\n\t\t\tpublic int compare(String A, String B) {\n\t\t\t\tString AB = A + B;\n\t\t\t\tString BA = B + A;\n\t\t\t\treturn AB.compareTo(BA) > 0 ? -1 : 1;\n\t\t\t}\n\t\t});\n\n\t\t// Now we have a sorted array, Then merge all the number into One String\n\t\tString res = \"\";\n\t\tfor (String s : list) {\n\t\t\tres += s;\n\t\t}\n\n\t\t// [0,0], we will get as 00, so just return 0 for this case\n\t\tif (res.charAt(0) == '0')\n\t\t\treturn \"0\";\n\n\t\treturn res;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/MinimumNoOfBoatsToSavePeople.java",
    "title": "Minimum No Of Boats To Save People",
    "slug": "minimum-no-of-boats-to-save-people",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Minimum No Of Boats To Save People using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/MinimumNoOfBoatsToSavePeople.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class MinimumNoOfBoatsToSavePeople {\n\n  public int numRescueBoats(int[] people, int limit) {\n        int boatCount = 0;\n        Arrays.sort(people);\n        int left = 0;\n        int right = people.length - 1;\n        while(left <= right){\n             left = (people[left] + people[right])<=limit? left+1: left;\n             boatCount++;\n             right--;\n        }\n        return boatCount;\n    }\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/MinimumNoOfPlatformsRequired.java",
    "title": "Minimum No Of Platforms Required",
    "slug": "minimum-no-of-platforms-required",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Minimum No Of Platforms Required using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/MinimumNoOfPlatformsRequired.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class MinimumNoOfPlatformsRequired {\n\tstatic int findPlatform(int arr[], int dep[], int n) {\n\t\tArrays.sort(arr);\n\t\tArrays.sort(dep);\n\n\t\tint plat_needed = 1; // Initialize the count of platforms needed to 1\n\t\tint result = 1; // Initialize the result to 1\n\t\tint i = 1, j = 0;\n\n\t\t// Use a single loop to traverse both arrival and departure arrays\n\t\twhile (i < n && j < n) {\n\t\t\t// If the next event is an arrival, increment the number of platforms needed\n\t\t\tif (arr[i] <= dep[j]) {\n\t\t\t\tplat_needed++;\n\t\t\t\ti++;\n\t\t\t} else { // If the next event is a departure, decrement the number of platforms needed\n\t\t\t\tplat_needed--;\n\t\t\t\tj++;\n\t\t\t}\n\n\t\t\t// Update the result with the maximum number of platforms needed at any time\n\t\t\tresult = Math.max(result, plat_needed);\n\t\t}\n\n\t\treturn result;\n\t}\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/MinimumNoOfRefuelingStops.java",
    "title": "Minimum No Of Refueling Stops",
    "slug": "minimum-no-of-refueling-stops",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Minimum No Of Refueling Stops using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/MinimumNoOfRefuelingStops.java",
    "sourceCode": "import java.util.PriorityQueue;\n\npublic class MinimumNoOfRefuelingStops {\n\n\tpublic int minRefuelStops(int target, int startFuel, int[][] stations) {\n\t\tint currentFeul = startFuel;\n\t\tint numOfStationsRefueled = 0;\n\t\tPriorityQueue<Integer> queue = new PriorityQueue<>((a, b) -> (b - a));\n\t\t// As a greed approach always wanted to reach farthest and fill out with max gas\n\t\t// check each and every station - whether we are gng to make it or not if not\n\t\t// refuel it\n\t\tfor (int[] station : stations) {\n\t\t\tint nextStation = station[0];\n\t\t\tint fuelCapacity = station[1];\n\t\t\twhile (currentFeul < nextStation) {\n\t\t\t\tif (queue.isEmpty())\n\t\t\t\t\treturn -1;\n\t\t\t\tcurrentFeul += queue.poll();\n\t\t\t\tnumOfStationsRefueled++;\n\t\t\t}\n\t\t\tqueue.add(fuelCapacity);\n\t\t}\n\n\t\twhile (currentFeul < target) {\n\t\t\tif (queue.isEmpty())\n\t\t\t\treturn -1;\n\t\t\tcurrentFeul += queue.poll();\n\t\t\tnumOfStationsRefueled++;\n\t\t}\n\t\treturn numOfStationsRefueled;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:Greedy/TwoCitySchedulingInterview.java",
    "title": "Two City Scheduling Interview",
    "slug": "two-city-scheduling-interview",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "Greedy"
    ],
    "description": "Practice Two City Scheduling Interview using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Greedy/TwoCitySchedulingInterview.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class TwoCitySchedulingInterview {\n\n\tpublic int twoCitySchedCost(int[][] costs) {\n\t\tArrays.sort(costs, (a, b) -> {\n\t\t\treturn (a[0] - a[1]) - (b[0] - b[1]);\n\t\t});\n\n\t\tint total = 0;\n\t\tfor (int i = 0; i < costs.length; i++) {\n\t\t\tif (i < costs.length / 2) {\n\t\t\t\ttotal += costs[i][0];\n\t\t\t} else {\n\t\t\t\ttotal += costs[i][1];\n\t\t\t}\n\t\t}\n\t\treturn total;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Heaps:Heaps/MergeKSortedLists.java",
    "title": "Merge k Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "topic": "Heaps",
    "difficulty": "Hard",
    "tags": [
      "Heaps",
      "Heaps"
    ],
    "description": "Practice Merge k Sorted Lists using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Heaps/MergeKSortedLists.java",
    "sourceCode": "import java.util.PriorityQueue;\nimport java.util.Queue;\n\n/**\n * \n * https://leetcode.com/problems/merge-k-sorted-lists/\n *\n */\n\npublic class MergeKSortedLists {\n\t\n\t  public class ListNode {\n\t\t      int val;\n\t\t      ListNode next;\n\t\t      ListNode() {}\n\t\t      ListNode(int val) { this.val = val; }\n\t\t     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n\t\t }\n\t\n\tpublic ListNode mergeKLists(ListNode[] lists) {\n        //MinHeap only since we are comparing values of list. we \n        Queue<ListNode> q = new PriorityQueue<ListNode>((a,b) -> a.val - b.val);\n        // only head pointer of all lists are added\n        for(ListNode l : lists){\n            if(l!=null){\n                q.add(l);\n            }        \n        }\n       // System.out.println(\"value:\"+q.peek().val);\n        ListNode head = new ListNode(-1);\n        ListNode point = head;\n        while(!q.isEmpty()){ \n            point.next = q.poll();\n            point = point.next; \n            if(point.next!=null){\n                q.add(point.next); // add next of current smallest\n            }\n        }\n        return head.next;\n    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/AddTwoNumbers.java",
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Add Two Numbers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/AddTwoNumbers.java",
    "sourceCode": "public class AddTwoNumbers {\n\tpublic ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n\t\tint carry = 0;\n\t\tListNode temp, result = new ListNode(0);\n\t\ttemp = result;\n\n\t\twhile (l1 != null || l2 != null || carry != 0) {\n\n\t\t\tif (l1 != null) {\n\t\t\t\tcarry += l1.val;\n\t\t\t\tl1 = l1.next;\n\t\t\t}\n\n\t\t\tif (l2 != null) {\n\t\t\t\tcarry += l2.val;\n\t\t\t\tl2 = l2.next;\n\t\t\t}\n\n\t\t\ttemp.next = new ListNode(carry % 10);\n\t\t\tcarry /= 10;\n\t\t\ttemp = temp.next;\n\t\t}\n\n\t\treturn result.next;\n\n\t}\n}"
  },
  {
    "key": "Linked Lists:LinkedList/BinaryNumberToLinkedListInteger.java",
    "title": "Binary Number To Linked List Integer",
    "slug": "binary-number-to-linked-list-integer",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Binary Number To Linked List Integer using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/BinaryNumberToLinkedListInteger.java",
    "sourceCode": "public class BinaryNumberToLinkedListInteger {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}\n\nclass binary {\n    public int getDecimalValue(ListNode head) {\n        int res=0;\n        while(head!=null){\n            res*=2;\n            res+=head.val;\n            head=head.next;\n        }\n        return res;\n    }\n}\n\n// Using the number 123 as an example, then from basic Math, we know this:\n\n// 1 is in the hundreds column so it’s value is 100\n// 2 is in the tens column so it’s value is 20\n// 3 is in the ones column so it’s value is just 3\n// Let’s forget about binary for a second and focus on decimal counting since that’s what humans use. So, if we were to convert the string “123” to integer 123, we’ll go through each character one at a time.\n\n// When we start with the first character, 1, we don’t really know it’s value is yet. i.e whether it’s in the millions or hundreds or thousands etc. But, we do know that if we encounter a character again, then it’s value has to go up by x10.\n\n// So if we get 1, we assume it’s just 1. Then we encounter 2. At this point, we realize that the previous was is no longer just a 1 but (1 x 10). So we do that arithmetic and then add the current value. This is how is looks like in tabular form.\n\n// Loop\tCharacter\tOperation\t  Result\n// 1\t    ‘1’\t        1\t          1\n// 2\t    ‘2’\t        (1x10) + 2\t  12\n// 3\t    ‘3’\t        (12*10) + 3\t  123\n// Note: Operation is always the previous multiplied by the counting system. In this this, we're doing decimal so x10. If we were doing hex, it'll x16. Binary will be x 2.\n\n// Using this logic, let’s come back to binary. It’s exactly the same except for instead of multiplying by 10 when we encounter the next digit, we multiply by 2. So If we have a LinkeList 1 -> 0 -> 1 and apply the same logic, this is how it'll be\n\n// Loop\tCharacter\tOperation\t  Result\n// 1\t    ‘1’\t        1\t          1\n// 2\t    ‘0’\t        (1x2) + 0\t  2\n// 3\t    ‘1’\t        (2*2) + 1\t  5"
  },
  {
    "key": "Linked Lists:LinkedList/CopyListWithRandomPointer.java",
    "title": "Copy List With Random Pointer",
    "slug": "copy-list-with-random-pointer",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Copy List With Random Pointer using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/CopyListWithRandomPointer.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\n\nclass Node {\n    int val;\n    Node next;\n    Node random;\n\n    public Node(int val) {\n        this.val = val;\n        this.next = null;\n        this.random = null;\n    }\n\n\tpublic Node(int val2, Node next2, Node random2) {\n\t\t// TODO Auto-generated constructor stub\n\t}\n}\n\npublic class CopyListWithRandomPointer {\n\n\tpublic ListNode copyRandomList(ListNode head) {\n\n\t\tListNode temp = head;\n\t\tMap<ListNode, ListNode> map = new HashMap<>();\n\n\t\twhile (temp != null) {\n\t\t\tmap.put(temp, new ListNode(temp.val));\n\t\t\ttemp = temp.next;\n\t\t}\n\n\t\ttemp = head;\n\t\twhile (temp != null) {\n\t\t\tmap.get(temp).next = map.get(temp.next);\n\t\t\tmap.get(temp).random = map.get(temp.random);\n\t\t\ttemp = temp.next;\n\t\t}\n\n\t\treturn map.get(head);\n\t}\n\t\n\t   public Node copyRandomList(Node head) {\n\t        if(head==null) return null;\n\t        \n\t        Node temp=head;\n\t        \n\t        while(temp!=null){\n\t            temp.next=new Node(temp.val,temp.next,temp.random);\n\t            temp=temp.next.next;\n\t        }\n\t        \n\t        //Update the random \n\t        Node newHead=head.next;\n\t        temp=head;\n\t        \n\t        while(temp!=null){\n\t            if(temp.next.random!=null) \n\t                temp.next.random=temp.next.random.next;\n\t            temp=temp.next.next;\n\t        }\n\t        \n\t        //Unwinding the list\n\t        temp=head;\n\t        \n\t        while(temp!=null){\n\t            Node copy=temp.next;\n\t            temp.next=copy.next;\n\t            if(copy.next!=null) \n\t                copy.next=temp.next.next;\n\t            temp=temp.next;\n\t        }\n\t        \n\t        return newHead;\n\t    }\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/DeleteNthNodeFromEndOfList.java",
    "title": "Delete Nth Node From End Of List",
    "slug": "delete-nth-node-from-end-of-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Delete Nth Node From End Of List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/DeleteNthNodeFromEndOfList.java",
    "sourceCode": "public class DeleteNthNodeFromEndOfList {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/FlattenBinaryTree.java",
    "title": "Flatten Binary Tree",
    "slug": "flatten-binary-tree",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Flatten Binary Tree using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/FlattenBinaryTree.java",
    "sourceCode": "public class FlattenBinaryTree {\n\n\t public void flatten(TreeNode root) {\n\t        // if(root==null)\n\t        //    return;\n\n\t        // TreeNode tempLeft = root.left;\n\t        // TreeNode tempRight =root.right;\n\n\t        // root.left=null;\n\t       \n\t        // //Go Left first and do this\n\t        // flatten(tempLeft);\n\t        // flatten(tempRight);\n\n\t        // root.right = tempLeft;\n\t        // TreeNode current =root;\n\t        // while(current.right!=null)\n\t        //    current=current.right;\n\n\t        // current.right=tempRight;\n\n\t        //Morris tree traversal\n\t        if(root==null)\n\t          return ;\n\t        while(root!=null){\n\t            if(root.left!=null){\n\t                TreeNode left = root.left;\n\t                TreeNode current = left;\n\t                while(current.right!=null)\n\t                  current=current.right;\n\t                current.right=root.right;\n\t                root.left=null;\n\t                root.right=left;\n\t            }\n\t            root=root.right;\n\t        }\n\t  \n\n\t    }\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/IntersectionOfTwoLists.java",
    "title": "Intersection Of Two Lists",
    "slug": "intersection-of-two-lists",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Intersection Of Two Lists using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/IntersectionOfTwoLists.java",
    "sourceCode": "public class IntersectionOfTwoLists {\n\n\tpublic ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n\t\tint countA = getCount(headA);\n\t\tint countB = getCount(headB);\n\t\twhile (countA > countB) {\n\t\t\theadA = headA.next;\n\t\t\tcountA--;\n\t\t}\n\t\twhile (countB > countA) {\n\t\t\theadB = headB.next;\n\t\t\tcountB--;\n\t\t}\n\t\twhile (headA != null && headB != null) {\n\t\t\tif (headA == headB) {\n\t\t\t\treturn headA;\n\t\t\t}\n\t\t\theadA = headA.next;\n\t\t\theadB = headB.next;\n\t\t}\n\t\treturn null;\n\t}\n\n\tpublic int getCount(ListNode head) {\n\t\tint count = 0;\n\t\tListNode curr = head;\n\t\twhile (curr != null) {\n\t\t\tcount++;\n\t\t\tcurr = curr.next;\n\t\t}\n\t\treturn count;\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/LinkedListInABinaryTree.java",
    "title": "Linked List In A Binary Tree",
    "slug": "linked-list-in-a-binary-tree",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Linked List In A Binary Tree using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/LinkedListInABinaryTree.java",
    "sourceCode": "public class LinkedListInABinaryTree {\n    public boolean isSubPath(ListNode head, TreeNode root) {\n        if(root == null) \n            return false;\n        \n     \n        if(head.val == root.val){\n            if(searchPath(head, root)) \n                return true;\n        }\n\n        return isSubPath(head, root.left) || isSubPath(head, root.right);\n    }\n    \n    \n    private boolean searchPath(ListNode listNode, TreeNode treeNode){\n        //base cases\n        //if tree node reched to end,\n        //check list node reached to end or node\n        if(treeNode == null) \n            return listNode == null;\n        \n        //list node reached to end, it meand found \n        if(listNode == null) \n            return true;\n        \n        //if treeNode val is not match with list val,\n        //return, no need to search further\n        if(treeNode.val != listNode.val) \n            return false;\n        \n        return searchPath(listNode.next, treeNode.left) || searchPath(listNode.next, treeNode.right);\n    }\n    \n}"
  },
  {
    "key": "Linked Lists:LinkedList/MaximumTwinSumOfLinkedList.java",
    "title": "Maximum Twin Sum Of Linked List",
    "slug": "maximum-twin-sum-of-linked-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Maximum Twin Sum Of Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/MaximumTwinSumOfLinkedList.java",
    "sourceCode": "public class MaximumTwinSumOfLinkedList {\n\n\tpublic int pairSum(ListNode head) {\n\t\tListNode fast = head, slow = head;\n\t\tListNode prev = null, next = null;\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tfast = fast.next.next;\n\t\t\tnext = slow.next;\n\t\t\tslow.next = prev;\n\t\t\tprev = slow;\n\t\t\tslow = next;\n\t\t}\n\n\t\tint max = 0;\n\t\twhile (slow != null) {\n\t\t\tmax = Integer.max(max, prev.val + slow.val);\n\t\t\tprev = prev.next;\n\t\t\tslow = slow.next;\n\t\t}\n\t\treturn max;\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/MergeInBetween.java",
    "title": "Merge In Between",
    "slug": "merge-in-between",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Merge In Between using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/MergeInBetween.java",
    "sourceCode": "public class MergeInBetween {\n\tpublic ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {\n\t\tListNode left = list1;\n\t\tfor (int i = 1; i < a; i++)\n\t\t\tleft = left.next;\n\n\t\tListNode middle = left;\n\t\tfor (int i = a; i <= b; i++)\n\t\t\tmiddle = middle.next;\n\n\t\tleft.next = list2;\n\t\twhile (list2.next != null)\n\t\t\tlist2 = list2.next;\n\n\t\tlist2.next = middle.next;\n\t\treturn list1;\n\t}\n}"
  },
  {
    "key": "Linked Lists:LinkedList/MergeTwoSortedLists.java",
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Merge Two Sorted Lists using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/MergeTwoSortedLists.java",
    "sourceCode": "public class MergeTwoSortedLists {\n\n\tpublic ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n\n\t\tif (l1 == null)\n\t\t\treturn l2;\n\t\tif (l2 == null)\n\t\t\treturn l1;\n\n\t\tif (l1.val < l2.val) {\n\t\t\tl1.next = mergeTwoLists(l1.next, l2);\n\t\t\treturn l1;\n\t\t} else {\n\t\t\tl2.next = mergeTwoLists(l1, l2.next);\n\t\t\treturn l2;\n\t\t}\n\n\t}\n}"
  },
  {
    "key": "Linked Lists:LinkedList/OddEvenLinkedList.java",
    "title": "Odd Even Linked List",
    "slug": "odd-even-linked-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Odd Even Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/OddEvenLinkedList.java",
    "sourceCode": "public class OddEvenLinkedList {\n\n\tpublic ListNode oddEvenList(ListNode head) {\n\t\tif (head == null)\n\t\t\treturn null;\n\t\tListNode odd = head, even = head.next, evenHead = head.next;\n\t\twhile (even != null && even.next != null) {\n\t\t\todd.next = even.next;\n\t\t\todd = odd.next;\n\t\t\teven.next = odd.next;\n\t\t\teven = even.next;\n\t\t}\n\t\todd.next = evenHead;\n\t\treturn head;\n\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/PartitionList.java",
    "title": "Partition List",
    "slug": "partition-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Partition List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/PartitionList.java",
    "sourceCode": "public class PartitionList {\n\n\tpublic ListNode partition(ListNode head, int x) {\n\t\tListNode left = new ListNode(0);\n\t\tListNode right = new ListNode(0);\n\n\t\tListNode leftTail = left;\n\t\tListNode rightTail = right;\n\n\t\twhile (head != null) {\n\t\t\tif (head.val < x) {\n\t\t\t\tleftTail.next = head;\n\t\t\t\tleftTail = leftTail.next;\n\t\t\t} else {\n\t\t\t\trightTail.next = head;\n\t\t\t\trightTail = rightTail.next;\n\t\t\t}\n\t\t\thead = head.next;\n\t\t}\n\n\t\tleftTail.next = right.next;\n\t\trightTail.next = null;\n\n\t\treturn left.next;\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/RemoveDuplicate.java",
    "title": "Remove Duplicate",
    "slug": "remove-duplicate",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Remove Duplicate using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/RemoveDuplicate.java",
    "sourceCode": "public class RemoveDuplicate {\n\n\t public ListNode deleteDuplicates(ListNode head) {\n         ListNode temp = head;\n        if (head == null)\n        {\n            return head;\n        }\n        \n        while (temp.next !=null)\n        {\n            if (temp.val != temp.next.val) {\n                temp = temp.next;\n            }\n            else temp.next = temp.next.next;\n        }\n        return head;\n    }\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/RemoveDuplicates.java",
    "title": "Remove Duplicates",
    "slug": "remove-duplicates",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Remove Duplicates using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/RemoveDuplicates.java",
    "sourceCode": "public class RemoveDuplicates {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/ReorderList.java",
    "title": "Reorder List",
    "slug": "reorder-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Reorder List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/ReorderList.java",
    "sourceCode": "public class ReorderList {\n\n\tpublic void reorderList(ListNode head) {\n\t\tListNode p1 = head;\n\t\tListNode p2 = reverse(getMiddle(head));\n\n\t\twhile (p1 != p2) {\n\t\t\tListNode temp = p1.next;\n\t\t\tp1.next = p2;\n\t\t\tp1 = p2;\n\t\t\tp2 = temp;\n\t\t}\n\t}\n\n\tpublic ListNode getMiddle(ListNode head) {\n\t\tif (head == null || head.next == null)\n\t\t\treturn head;\n\t\tListNode slow = head, fast = head.next.next;\n\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t}\n\n\t\treturn slow.next;\n\t}\n\n\tpublic ListNode reverse(ListNode head) {\n\t\tif (head == null || head.next == null)\n\t\t\treturn head;\n\n\t\tListNode prev = null;\n\t\twhile (head != null) {\n\t\t\tListNode temp = head.next; // next target node\n\t\t\thead.next = prev; // reverse direction\n\t\t\tprev = head; // set previous node\n\t\t\thead = temp; // next target node\n\t\t}\n\t\treturn prev;\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/ReverseLinkedList.java",
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "topic": "Linked Lists",
    "difficulty": "Easy",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Reverse Linked List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/ReverseLinkedList.java",
    "sourceCode": "public class ReverseLinkedList {\n\n\t //Brute force and TC: o(n) AND SC: O(n)\n    // public ListNode reverseList(ListNode head) {\n    //     if(head==null)\n    //        return null;\n        \n    //     if(head.next==null)\n    //        return head;\n        \n    //     Stack<Integer> stack = new Stack<>();\n    //     ListNode cur = head;\n    //     while(cur!=null){\n    //       stack.push(cur.val);  \n    //       cur=cur.next;           \n    //     }\n\n    //    ListNode dummy = new ListNode(0);\n    //    ListNode ptr=dummy;\n       \n    //    while(!stack.isEmpty()){\n    //        ptr.next= new ListNode(stack.pop());\n    //        ptr=ptr.next;\n    //    }\n\n    //    return dummy.next;\n    // }\n\n   // OPtimized - Tc: o(n) and sc: O(1)\n    public ListNode reverseList(ListNode head) {\n        //No elements\n        if(head==null)\n           return null;\n\n        //it means only a single element\n        if(head.next==null) \n           return head;\n         \n        ListNode current = head;\n        ListNode next=null, prev=null;\n\n        while(current!=null){\n            next = current.next; // first take the next pointer of the current\n            current.next=prev; // Now update the current with previous\n            prev=current; // now the current will act as previous to next element\n            current = next; // move forward\n        }\n        \n        return prev; // after reversal prev will always point to last, which head\n\n    }\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/ReverseLinkedListEvenGroup.java",
    "title": "Reverse Linked List Even Group",
    "slug": "reverse-linked-list-even-group",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Reverse Linked List Even Group using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/ReverseLinkedListEvenGroup.java",
    "sourceCode": "import java.util.Stack;\n\npublic class ReverseLinkedListEvenGroup {\n\n\tpublic ListNode reverseEvenLengthGroups(ListNode head) {\n\t\tStack<Integer> stk = new Stack<>();\n\n\t\tint group = 1;\n\t\tListNode temp = head;\n\t\twhile (temp != null) {\n\t\t\tListNode start = temp;\n\t\t\tint count = 0;\n\n\t\t\twhile (count < group && temp != null) {\n\t\t\t\tstk.push(temp.val);\n\t\t\t\ttemp = temp.next;\n\t\t\t\tcount++;\n\t\t\t}\n\n\t\t\tif (count % 2 == 0) {\n\t\t\t\twhile (start != temp) {\n\t\t\t\t\tstart.val = stk.pop();\n\t\t\t\t\tstart = start.next;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tgroup++;\n\t\t}\n\n\t\treturn head;\n\t}\n\t\n\t//SECOND APPROACH WITH OUT STACK\n\t\n\t ListNode end=null;\n\t    public ListNode reverseEvenLengthGroups2(ListNode head) {\n\t         if(head==null || head.next==null)\n\t              return head;\n\t        \n\t         int length = getLength(head);\n\t         ListNode dummy = new ListNode(0);\n\t         ListNode result = dummy;\n\t         ListNode curr=head;\n\t         for(int i=1;curr!=null&&length>0;i++){\n\t           int groupSize = Math.min(i,length);\n\t           if(groupSize%2==0){\n\t               dummy.next = reverseKGroup(curr,groupSize);\n\t               while(dummy.next!=null)\n\t                   dummy=dummy.next;\n\t               curr=end;\n\t           }else{\n\t              int gp=groupSize;\n\t              while(gp!=0&&curr!=null){ \n\t               dummy.next = curr;\n\t               dummy=curr;\n\t               curr=curr.next;\n\t               gp--;\n\t              }\n\t           }\n\t           length-=groupSize;\n\t         }\n\t         return result.next;\n\t    }\n\t    \n\t    ListNode reverseKGroup(ListNode head, int k){\n\t         ListNode prev=null;\n\t         ListNode next=null;\n\t         ListNode curr=head;\n\t         while(k>0&&curr!=null){\n\t             next=curr.next;\n\t             curr.next=prev;\n\t             prev=curr;\n\t             curr=next;\n\t             k--;\n\t         }\n\t         end=curr;\n\t         return prev;\n\t    }\n\t    \n\t    int getLength(ListNode head){\n\t        int total=0;\n\t        ListNode curr=head;\n\t        while(curr!=null){\n\t            total++;\n\t            curr=curr.next;\n\t        }\n\t        return total;\n\t    }\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/ReverseLinkedListII.java",
    "title": "Reverse Linked List II",
    "slug": "reverse-linked-list-ii",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Reverse Linked List II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/ReverseLinkedListII.java",
    "sourceCode": "public class ReverseLinkedListII {\n\n\tpublic ListNode reverseBetween(ListNode head, int left, int right) {\n\n\t\tListNode prev = null;\n\t\tListNode curr = head;\n\t\twhile (left != 1) {\n\t\t\tprev = curr;\n\t\t\tcurr = curr.next;\n\t\t\tleft--;\n\t\t\tright--;\n\t\t}\n\n\t\tListNode start = prev;\n\t\tListNode end = curr;\n\t\tListNode next = null;\n\t\twhile (right != 0) {\n\t\t\tnext = curr.next;\n\t\t\tcurr.next = prev;\n\t\t\tprev = curr;\n\t\t\tcurr = next;\n\t\t\tright--;\n\t\t}\n\n\t\tif (start != null)\n\t\t\tstart.next = prev;\n\t\telse\n\t\t\thead = prev;\n\n\t\tend.next = curr;\n\n\t\treturn head;\n\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/ReverseLinkedListsInKGroup.java",
    "title": "Reverse Linked Lists In K Group",
    "slug": "reverse-linked-lists-in-k-group",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Reverse Linked Lists In K Group using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/ReverseLinkedListsInKGroup.java",
    "sourceCode": "import java.util.Stack;\n\npublic class ReverseLinkedListsInKGroup {\n\n\tpublic ListNode reverseKGroup(ListNode head, int k) {\n\t\tif (head == null || head.next == null || k == 1)\n\t\t\treturn head;\n\t\tint length = 0;\n\t\tListNode dummyHead = new ListNode(0);\n\t\tdummyHead.next = head;\n\t\tListNode pre = dummyHead;\n\t\tListNode cur = dummyHead;\n\t\tListNode nex = dummyHead;\n\t\twhile (cur.next != null) {\n\t\t\tlength++;\n\t\t\tcur = cur.next;\n\t\t}\n\t\twhile (length >= k) {\n\t\t\tcur = pre.next;\n\t\t\tnex = cur.next;\n\t\t\tfor (int i = 1; i < k; i++) {\n\t\t\t\tcur.next = nex.next;\n\t\t\t\tnex.next = pre.next;\n\t\t\t\tpre.next = nex;\n\t\t\t\tnex = cur.next;\n\t\t\t}\n\t\t\tpre = cur;\n\t\t\tlength -= k;\n\t\t}\n\t\treturn dummyHead.next;\n\t}\n\n}\n\nclass Solution {\n\n\tListNode reverse(ListNode head, int k, int total) {\n\t\tif (head == null)\n\t\t\treturn null;\n\n\t\tint kGroup = k;\n\t\tListNode prev = null;\n\t\tListNode current = head;\n\t\tListNode next = null;\n\t\twhile (kGroup > 0 && current != null) {\n\t\t\tnext = current.next;\n\t\t\tcurrent.next = prev;\n\t\t\tprev = current;\n\t\t\tcurrent = next;\n\t\t\tkGroup--;\n\t\t}\n\t\ttotal = total - k;\n\t\thead.next = (next != null && total >= k) ? reverse(next, k, total) : next;\n\t\treturn prev;\n\t}\n\n\tListNode reverseKGroup(ListNode head, int k) {\n\t\tint total = 0;\n\t\tListNode temp = head;\n\t\twhile (temp != null) {\n\t\t\ttotal++;\n\t\t\ttemp = temp.next;\n\t\t}\n\t\treturn reverse(head, k, total);\n\t}\n\n}\n\n\nclass Solution303 {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        Stack<Integer> stk = new Stack<>();\n\n        ListNode temp = head;\n        while(temp != null){\n            ListNode start = temp;\n            int count = k;\n\n            while(count>0 &&  temp!=null){\n                stk.push(temp.val);\n                temp = temp.next;\n                count--;\n            }\n            if(count== 0){\n                while(start != temp){\n                    start.val = stk.pop();\n                    start = start.next;\n                }\n            }         \n        }\n\n        return head; \n    }\n}"
  },
  {
    "key": "Linked Lists:LinkedList/RotateList.java",
    "title": "Rotate List",
    "slug": "rotate-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Rotate List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/RotateList.java",
    "sourceCode": "public class RotateList {\n\n\tpublic ListNode rotateRight(ListNode head, int k) {\n\t\tif (head == null) {\n\t\t\treturn head;\n\t\t}\n\t\tint len = 1;\n\t\tListNode curr = head;\n\t\twhile (curr.next != null) {\n\t\t\tcurr = curr.next;\n\t\t\tlen++;\n\t\t}\n\t\tk = k % len;\n\t\tif (k == 0) {\n\t\t\treturn head;\n\t\t}\n\t\tcurr.next = head;\n\t\tListNode newHead = head;\n\t\tfor (int i = 0; i < len - k - 1; i++) {\n\t\t\tnewHead = newHead.next;\n\t\t}\n\t\tListNode temp = newHead.next;\n\t\tnewHead.next = null;\n\t\treturn temp;\n\t}\n\n}"
  },
  {
    "key": "Linked Lists:LinkedList/SortedListToBST.java",
    "title": "Sorted List To BST",
    "slug": "sorted-list-to-bst",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Sorted List To BST using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/SortedListToBST.java",
    "sourceCode": "public class SortedListToBST {\n\tpublic TreeNode sortedListToBST(ListNode head) {\n\t\tif (head == null)\n\t\t\treturn null;\n\t\tif (head.next == null)\n\t\t\treturn new TreeNode(head.val);\n\t\tListNode mid = mid(head);\n\t\tTreeNode root = new TreeNode(mid.val);\n\t\troot.left = sortedListToBST(head);\n\t\troot.right = sortedListToBST(mid.next);\n\t\treturn root;\n\t}\n\n\tpublic ListNode mid(ListNode head) {\n\t\tListNode fast = head;\n\t\tListNode slow = head;\n\t\tListNode prev = head;\n\t\t// If a personA runs 2x speec than personB, obviously personA reaches the end,\n\t\t// meanwhile personB is in the middle of the raceTrack\n\t\twhile (fast != null && fast.next != null) {\n\t\t\tprev = slow;\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t}\n\t\t// since we are taking the mid value, just before mid value we are cutting it\n\t\t// off\n\t\tif (prev != null)\n\t\t\tprev.next = null;\n\t\treturn slow; // slow is the mid value of the list\n\t}\n}"
  },
  {
    "key": "Linked Lists:LinkedList/SortList.java",
    "title": "Sort List",
    "slug": "sort-list",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Sort List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/SortList.java",
    "sourceCode": "public class SortList {\n\n}\n\nclass SolutionAS {\n\tpublic ListNode sortList(ListNode head) {\n\t\tif (head == null || head.next == null)\n\t\t\treturn head;\n\t\tListNode mid = middleNode(head);\n\t\tListNode left = sortList(head);\n\t\tListNode right = sortList(mid);\n\t\treturn mergeTwoLists(left, right);\n\t}\n\n\tpublic ListNode middleNode(ListNode head) {\n\t\tListNode slow = head, fast = head, mid;\n\t\twhile (fast.next != null && fast.next.next != null) {\n\t\t\tslow = slow.next;\n\t\t\tfast = fast.next.next;\n\t\t}\n\t\tmid = slow.next;\n\t\tslow.next = null;\n\t\treturn mid;\n\t}\n\n\tpublic ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n\t\tListNode dummyHead = new ListNode(-1), current = dummyHead;\n\t\twhile (l1 != null && l2 != null) {\n\t\t\tif (l1.val <= l2.val) {\n\t\t\t\tcurrent.next = l1;\n\t\t\t\tl1 = l1.next;\n\t\t\t} else {\n\t\t\t\tcurrent.next = l2;\n\t\t\t\tl2 = l2.next;\n\t\t\t}\n\t\t\tcurrent = current.next;\n\t\t}\n\t\tcurrent.next = l1 != null ? l1 : l2;\n\t\treturn dummyHead.next;\n\t}\n}\n\n//Brute force\n// public ListNode sortList(ListNode head) {\n//     if(head==null || head.next==null)\n//          return head;\n\n//     ListNode curr = head;\n//     while(curr!=null){\n//         ListNode iter=curr;\n//         ListNode minNode=curr;\n//         while(iter!=null){\n//             if(iter.val<minNode.val)\n//                 minNode=iter;\n//             iter=iter.next;\n//         }\n//         int temp = curr.val;\n//         curr.val=minNode.val;\n//         minNode.val=temp;\n//         curr=curr.next;\n//     }\n\n//     return head;\n// }"
  },
  {
    "key": "Linked Lists:LinkedList/SwapNodesInPair.java",
    "title": "Swap Nodes In Pair",
    "slug": "swap-nodes-in-pair",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "tags": [
      "Linked Lists",
      "LinkedList"
    ],
    "description": "Practice Swap Nodes In Pair using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/LinkedList/SwapNodesInPair.java",
    "sourceCode": "public class SwapNodesInPair {\n\n//  public ListNode swapPairs(ListNode head) {\n\n//     if(head==null||head.next==null)\n//         return head;\n\n//     ListNode thirdElement = head.next.next;\n\n//     //Swap 1st and 2nd elements (i mean elements in the list)\n//     ListNode secondElement = head.next;\n//     head.next.next=head;\n\n//     head.next = swapPairs(thirdElement);\n//     return secondElement;\n\n// }\n\n\tpublic ListNode swapPairs(ListNode head) {\n\n\t\tListNode prevNode = new ListNode(0); // Node situated before the two to-be-swapped nodes\n\t\tprevNode.next = head; // Starting before head\n\t\tListNode newHead = prevNode; // Storing a reference for returning\n\n\t\twhile (prevNode.next != null && prevNode.next.next != null) {\n\n\t\t\t// Declare // ...[prev]-->[node1]-->[node2]-->[next]...\n\t\t\tListNode node1 = prevNode.next;\n\t\t\tListNode node2 = node1.next;\n\t\t\tListNode nextNode = node2.next;\n\n\t\t\t// Swap\n\t\t\tprevNode.next = node2; // ...[prev]-->[node2]<--[node1] [next]...\n\t\t\tnode2.next = node1; // ...[prev]-->[node2]<-->[node1] [next]...\n\t\t\tnode1.next = nextNode; // ...[prev]-->[node2]-->[node1]-->[next]...\n\n\t\t\t// Move\n\t\t\tprevNode = node1; // ...[...]-->[node2]-->[node1/prev]-->[next]...\n\t\t}\n\n\t\treturn newHead.next;\n\t}\n\n}"
  },
  {
    "key": "Math:Math/ExcelSheetColumnNumber.java",
    "title": "Excel Sheet Column Number",
    "slug": "excel-sheet-column-number",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Excel Sheet Column Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/ExcelSheetColumnNumber.java",
    "sourceCode": "/*\n * ProblemLink : https://leetcode.com/problems/excel-sheet-column-number/\n * \n *  A - 1\n   B - 2\n   .... Z-26\n\n   BC ==> (26*2) + 3 = 52 + 3 = 55\n   HERE IF WE OBSERVE \n    26 single digit characters\n   A26 , plus 26 single digit characters combinated with A\n   so, total it is 26 + 26 =52 (26*2)\n   plus B with 3 combinations = 3\n   52+3\n\n   same thing goes with AAB also, ACBC also\n\n   TC:O(N)\n   SC:O(1)\n   LOGIC: \n   1. traverse the string from left to right, intially single digit characters\n      so, it is 0 combinations with 26\n   2. for second iteration we multiple with 26, means we did 1 round of iteration\n   3. we do sum since we are adding previousCount+currentCount etc \n\n   A-65 to Z-97\n   so A-A=0+1=1\n * \n * \n * \n * */\n\n\npublic class ExcelSheetColumnNumber {\n\t\n\t  public int titleToNumber(String columnTitle) {\n\t        int result=0;\n\t        for(char ch:columnTitle.toCharArray()){\n\t            result*=26;\n\t            result+=ch-'A'+1;\n\t        }\n\t       return result;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Math:Math/ExcelSheetColumnTitle.java",
    "title": "Excel Sheet Column Title",
    "slug": "excel-sheet-column-title",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Excel Sheet Column Title using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/ExcelSheetColumnTitle.java",
    "sourceCode": "/*\n * \n * \n * Leetcode problem Link : https://leetcode.com/problems/excel-sheet-column-title/\n * \n *  A - 1\n   B - 2\n   .... Z-26\n\n  example : Input-26, output-z\n\n  26)26(1\n     26\n    ---\n     0\n\n     remainder 0+26=26(1st letter from left, z)\n\nExample 2: 28\n\n1. subtract 1 from 28, since ascii codes start from 0 instead of 1\n\n\n1.27>0\n\n26)27(1\n   26\n------\n 1\n\n 1+65=66(char)=B\n\nleft over remainder = 1\n\n26)0(0\n 0\n====\n0\n\nAB\n   TC:OLog(N) with base 26, since for every iteration we are reducing the n value by 26\n   SC:O(1)\n   LOGIC: \n\n * \n * \n * */\n\n\npublic class ExcelSheetColumnTitle {\n\t\n    public String convertToTitle(int n) {\n        StringBuilder result = new StringBuilder();\n\n        while(n>0){\n            n--;\n            result.insert(0, (char)('A' + n % 26));\n            n /= 26;\n        }\n\n        return result.toString();\n        //return n == 0 ? \"\" : convertToTitle(--n / 26) + (char)('A' + (n % 26));\n    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Math:Math/FractionToRecurringDecimal.java",
    "title": "Fraction To Recurring Decimal",
    "slug": "fraction-to-recurring-decimal",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Fraction To Recurring Decimal using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/FractionToRecurringDecimal.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\n\n/**\n\n\n\nLEETCODE Link : https://leetcode.com/problems/fraction-to-recurring-decimal/description/\ngfg Link  :https://www.geeksforgeeks.org/find-recurring-sequence-fraction/\n\n**/\n\n\npublic class FractionToRecurringDecimal {\n\t\n\t public String fractionToDecimal(int numerator, int denominator) {\n\t        if(numerator==0)\n\t            return \"0\";\n\t        StringBuilder answer = new StringBuilder();\n\t        answer.append(((numerator>0)^(denominator>0))?\"-\":\"\");\n\t        long num = Math.abs((long)numerator);\n\t        long den = Math.abs((long)denominator); \n\t        answer.append(num/den);\n\t        num%=den; // remainder is next value \n\t        if(num==0)\n\t         return answer.toString();\n\t         answer.append(\".\");\n\t        //Now fractional part, so here we can wrap up by getting remainder 0 or continue the adding decimals\n\t        Map<Long, Integer> map = new HashMap<Long,Integer>();\n\t        map.put(num,answer.length()); // starting remainder where repeatation got started\n\t    \n\t        while(num!=0){\n\t             num*=10;\n\t             answer.append(num/den);\n\t             num%=den;\n\t             if(map.containsKey(num)){\n\t                 int startIndex = map.get(num);\n\t                 answer.insert(startIndex,\"(\");\n\t                 answer.append(\")\");\n\t                 break;\n\t             }else\n\t               map.put(num,answer.length());\n\t        } \n\t        return answer.toString();\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Math:Math/IntegerToEnglishWords.java",
    "title": "Integer To English Words",
    "slug": "integer-to-english-words",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Integer To English Words using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/IntegerToEnglishWords.java",
    "sourceCode": "/*\n * \n *  GFG Link :https://leetcode.com/problems/integer-to-english-words/description/\n *  Leetcode Link : https://leetcode.com/problems/integer-to-english-words/description/\n * \n * */\n\n\npublic class IntegerToEnglishWords {\n\t\n\n\t    \n\tprivate final String[] LESS_THAN_20 = {\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\", \"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"};\n\tprivate final String[] TENS = {\"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};\n\n\tpublic String numberToWords(int num) {\n\t    if (num == 0) return  \"Zero\";\n\t    return help(num);\n\t}\n\n\tString help(int num) {\n\t    String ret = \"\";\n\t    \n\t    \n\t    //BASE CASES\n\t    if (num < 20) {\n\t        ret = LESS_THAN_20[num];\n\t    } else if (num < 100) {\n\t        ret = TENS[num / 10] + \" \" + help(num % 10);\n\t    } \n\t    \n\t    //Recursive conditions\n\t    else if (num < 1000) {\n\t        ret = help(num / 100) + \" Hundred \" + help(num % 100);\n\t    } else if (num < 1000000) {\n\t        ret = help(num / 1000) + \" Thousand \" + help(num % 1000);\n\t    } else if (num < 1000000000) {\n\t        ret = help(num / 1000000) + \" Million \" + help(num % 1000000);\n\t    } else {\n\t        ret = help(num / 1000000000) + \" Billion \" + help(num % 1000000000);\n\t    }\n\t    return ret.trim();\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Math:Math/IntegerToRoman.java",
    "title": "Integer To Roman",
    "slug": "integer-to-roman",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Integer To Roman using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/IntegerToRoman.java",
    "sourceCode": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\n/*\n * \n * Leetcode Link : https://leetcode.com/problems/integer-to-roman/description/\n * \n * */\n\n\npublic class IntegerToRoman {\n\n\tpublic String intToRoman(int num) {\n\t\tMap<String, Integer> map = new LinkedHashMap<>();\n\t\tmap.put(\"M\", 1000); // After 1000\n\t\tmap.put(\"CM\", 900); // newly added(1)\n\t\tmap.put(\"D\", 500); // after 500\n\t\tmap.put(\"CD\", 400); // newly added(2)\n\t\tmap.put(\"C\", 100); // after 100\n\t\tmap.put(\"XC\", 90); // newly added(3)\n\t\tmap.put(\"L\", 50); // after 50\n\t\tmap.put(\"XL\", 40); // newly added(4)\n\t\tmap.put(\"X\", 10); // after 10\n\t\tmap.put(\"IX\", 9); // newly added(5)\n\t\tmap.put(\"V\", 5); // after 5\n\t\tmap.put(\"IV\", 4); // newly added(6)\n\t\tmap.put(\"I\", 1);\n\t\tStringBuilder sb = new StringBuilder();\n\t\tfor (Map.Entry<String, Integer> entry : map.entrySet()) {\n\t\t\t/*\n\t\t\t * it is nothing but the division where num is a divident and entry.getValue is\n\t\t\t * a divisor and remainder will be new Num\n\t\t\t */\n\t\t\twhile (num >= entry.getValue()) {\n\t\t\t\tnum -= entry.getValue();\n\t\t\t\tsb.append(entry.getKey());\n\t\t\t}\n\t\t}\n\t\treturn sb.toString();\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Math:Math/RomanToInteger.java",
    "title": "Roman To Integer",
    "slug": "roman-to-integer",
    "topic": "Math",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Math"
    ],
    "description": "Practice Roman To Integer using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Math/RomanToInteger.java",
    "sourceCode": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\n\n/**\n * \n * *\n * @param s\n * @return\n * \n * \n * videoLink: https://leetcode.com/problems/roman-to-integer/description/\n * \n * problem Link : https://youtu.be/dlATMslQ6Uc\n */\n\n\n\n\npublic class RomanToInteger {\n\t\n\tpublic static int romanToInt(String s) {\n\t    Map<Character,Integer> map = new LinkedHashMap<Character,Integer>(); \n\t        map.put('I',1);\n\t        map.put('V',5);\n\t        map.put('X',10);\n\t        map.put('L',50);\n\t        map.put('C',100);\n\t        map.put('D',500);\n\t        map.put('M',1000);    \n\t       \n\t       int len = s.length();\n\t       int result = map.get(s.charAt(len-1));\n\t       \n\t       // here we have to do only 2 operations either add up\n\t       // value of roman to result or subtract for special cases\n\t       for(int i = len-2;i>=0;i--){\n\t           int a = map.get(s.charAt(i));\n\t           int currPrevChar = map.get(s.charAt(i+1));\n\t           result = a<currPrevChar?result-a:result+a;\n\t       }\n\t       return result;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Intervals & Greedy:mergeIntervals/InsertIntervals.java",
    "title": "Insert Intervals",
    "slug": "insert-intervals",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "mergeIntervals"
    ],
    "description": "Practice Insert Intervals using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/mergeIntervals/InsertIntervals.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class InsertIntervals {\n\t public int[][] insert(int[][] intervals, int[] newInterval) {\n        \n        List<int[]> out = new ArrayList<>();\n        int i = 0;\n        \n        /*\n        Step 1.\n        Add all intervals before newInterval (that don't overlap with newInterval so just 1 in this case\n            1.    2.     3.     4.      5  \n          ----- ------- ---- -------- ------\n                    -------------        \n         */\n        while( i<intervals.length && intervals[i][1] < newInterval[0] ){\n            out.add(intervals[i++]);\n        }\n        \n        // \n        /*\n        Step 2.\n        Now i is at an interval that we merge with OR that we don't merge with (case B)\n        Case A.\n            1.    2.     3.     4.      5  \n          ----- ------- ---- -------- ------\n                    -------------   \n\n        Case B.\n            1.                          2.  \n          -----                       ------\n                    -------------   \n                    \n        \"intervals[i][0] <= newInterval[1]\" below means if the current interval's start is before or \n\t\tat the newIntervals end, it should be part of the merge interval. Look at the diagram,\n\t\tin case A it is easy to see 4. is the last interval we take. In case B. there are no intervals so the while never loops\n         */\n        while( i<intervals.length && intervals[i][0] <= newInterval[1] ){\n            newInterval[0] = Math.min( newInterval[0], intervals[i][0] ); \n            newInterval[1] = Math.max( newInterval[1], intervals[i][1] ); \n            i++;\n        }\n        \n\t\t// Add the insert interval\n        out.add(newInterval);\n        \n        // Step 3. Add all of the intervals that come after the inserted interval if any\n        while( i<intervals.length ){\n            out.add(intervals[i++]);\n        }\n        \n        return out.toArray(new int[out.size()][2]);\n    }\n}"
  },
  {
    "key": "Intervals & Greedy:mergeIntervals/MeetingRooms.java",
    "title": "Meeting Rooms",
    "slug": "meeting-rooms",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "mergeIntervals"
    ],
    "description": "Practice Meeting Rooms using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/mergeIntervals/MeetingRooms.java",
    "sourceCode": "import java.util.Arrays;\nimport java.util.Collections;\nimport java.util.Comparator;\nimport java.util.List;\nimport java.util.PriorityQueue;\n\n\nclass Interval {\n\tint start;\n\tint end;\n\t\n}\npublic class MeetingRooms {\n\t  public boolean canAttendMeetings(List<Interval> intervals) {\n\t        Collections.sort(intervals, new Comparator<Interval>() {\n\t            public int compare(Interval i1, Interval i2) {\n\t                return i1.start - i2.start;\n\t            }\n\t        });\n\n\t        for (int i = 0; i < intervals.size() - 1; i++) {\n\t        if (intervals.get(i).end > intervals.get(i+1).start)\n\t            return false;\n\t        }\n\t        return true;\n\t    }\n\t  \n\t  \n\t  /**\n\t     * @param intervals: an array of meeting time intervals\n\t     * @return: the minimum number of conference rooms required\n\t     */\n\tpublic static int minRooms(int[][] intervals) {\n\t\t if (intervals == null || intervals.length == 0) {\n            return 0;\n        }\n\n        // Sort the intervals by their start times\n        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n\n        // Create a min heap to keep track of the end times of ongoing meetings\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n\n        // Add the end time of the first meeting to the heap\n        minHeap.offer(intervals[0][1]);\n\n        for (int i = 1; i < intervals.length; i++) {\n            int currentStart = intervals[i][0];\n            int earliestEnd = minHeap.peek();\n\n            // If the current meeting can reuse a room (its start time is after the earliest end time),\n            // remove the earliest end time from the heap.\n            if (currentStart >= earliestEnd) {\n                minHeap.poll();\n            }\n\n            // Add the end time of the current meeting to the heap\n            minHeap.offer(intervals[i][1]);\n        }\n\n        // The size of the heap represents the minimum number of meeting rooms required\n        return minHeap.size();\n\t}\n\n\t  \n}"
  },
  {
    "key": "Intervals & Greedy:mergeIntervals/MinimumArrowsToBurstBallons.java",
    "title": "Minimum Arrows To Burst Ballons",
    "slug": "minimum-arrows-to-burst-ballons",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "mergeIntervals"
    ],
    "description": "Practice Minimum Arrows To Burst Ballons using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/mergeIntervals/MinimumArrowsToBurstBallons.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class MinimumArrowsToBurstBallons {\n\tpublic int findMinArrowShots(int[][] points) {\n\t\tif (points == null || points.length == 0) {\n\t\t\treturn 0; // No balloons to burst\n\t\t}\n\n\t\t// Sort the balloons by their end points\n\t\tArrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n\n\t\tint arrows = 1; // Initial arrow position\n\t\tint prevEnd = points[0][1]; // End point of the first balloon\n\n\t\tfor (int i = 1; i < points.length; i++) {\n\t\t\tint currentStart = points[i][0];\n\t\t\tint currentEnd = points[i][1];\n\n\t\t\t// If the current balloon doesn't overlap with the previous one,\n\t\t\t// we need a new arrow and update the previous end point\n\t\t\tif (currentStart > prevEnd) {\n\t\t\t\tarrows++;\n\t\t\t\tprevEnd = currentEnd;\n\t\t\t}\n\t\t\t// If the current balloon overlaps with the previous one,\n\t\t\t// update the previous end point to the smaller of the two end points\n\t\t\telse {\n\t\t\t\tprevEnd = Math.min(prevEnd, currentEnd);\n\t\t\t}\n\t\t}\n\n\t\treturn arrows;\n\t}\n}"
  },
  {
    "key": "Intervals & Greedy:mergeIntervals/Non_overlappingInterval.java",
    "title": "Non overlapping Interval",
    "slug": "non-overlapping-interval",
    "topic": "Intervals & Greedy",
    "difficulty": "Medium",
    "tags": [
      "Intervals & Greedy",
      "mergeIntervals"
    ],
    "description": "Practice Non overlapping Interval using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/mergeIntervals/Non_overlappingInterval.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class Non_overlappingInterval {\n\n\n\t  public int eraseOverlapIntervals(int[][] intervals) {\n\t        Arrays.sort(intervals,(a,b)->Integer.compare(a[0], b[0]));\n\t        \n\t        \n\t        int prevEnd = intervals[0][1];\n\t        int count=0;\n\t        for(int i=1;i<intervals.length;i++){\n\t        \n\t            //if not overlapping ex: [1,3] [4,5];\n\t            if(intervals[i][0]>=prevEnd){\n\t                prevEnd = intervals[i][1];\n\t            }else{\n\t                count=count+1;\n\t                prevEnd = Math.min(prevEnd,intervals[i][1]);\n\t            }\n\t            \n\t        }\n\t        return count;\n\t    }\n\n}"
  },
  {
    "key": "Arrays:Prefix/ProductOfArrayExceptSelf.java",
    "title": "Product Of Array Except Self",
    "slug": "product-of-array-except-self",
    "topic": "Arrays",
    "difficulty": "Medium",
    "tags": [
      "Arrays",
      "Prefix"
    ],
    "description": "Practice Product Of Array Except Self using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Prefix/ProductOfArrayExceptSelf.java",
    "sourceCode": "/**\n * \n * \n * \n * @author saiteja\n * \n * LeetCode Problem Link :  https://leetcode.com/problems/product-of-array-except-self/description/\n * \n * Input : [1,2,3,4]\n * Output : [24,12,8,6]\n * \n * \n * \n * \n *\n */\n\n\npublic class ProductOfArrayExceptSelf {\n\n\tpublic int[] productExceptSelf(int[] nums) {\n\t\tif (nums.length == 0)\n\t\t\treturn null;\n\n\t\tint[] res = new int[nums.length];\n\t\t\n\t\t//Calculate Prefix Left Product\n\t\tres[0] = nums[0];\n\t\tfor (int i = 1; i < nums.length; i++)\n\t\t\tres[i] = res[i - 1] * nums[i];\n\t\t\n\t\t//Since we have left product, traverse from right end\n\t\tint right = 1; // for last element assuming right product is 1\n\t\tfor (int i = nums.length - 1; i > 0; --i) {\n\t\t\tres[i] = res[i - 1] * right; // leftProduct * rightProduct, leaving currentElement\n\t\t\tright *= nums[i]; // Now right product is updated with current Element to carry forward\n\t\t}\n\t\tres[0] = right;\n\t\treturn res;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n}"
  },
  {
    "key": "Recursion:recursion/CountGoodNumbers.java",
    "title": "Count Good Numbers",
    "slug": "count-good-numbers",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Count Good Numbers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/CountGoodNumbers.java",
    "sourceCode": "public class CountGoodNumbers {\n\n\t// This is the mod value given in question.\n\tpublic long mod = 1000000007;\n\n\tpublic int countGoodNumbers(long n) {\n\n\t\t// Indexing is 0 based according to the question.\n\t\tlong odd = n / 2; // It gives the number of odd indices starting from 1 to n.\n\t\tlong even = (n + 1) / 2; // It gives number of even indices. It is basically n/2 + n%2;\n\t\treturn (int) (pow(5, even) * pow(4, odd) % mod); // As there are 4 prime numbers and 5 even numbers\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// from 0 to 9.\n\n\t}\n\n\t// To understand this pow function properly you can solve leetcode problem 50\n\t// where you will have to contruct it. I will attach the link above.\n\tpublic long pow(long x, long n) {\n\t\tif (n == 0)\n\t\t\treturn 1;\n\t\tlong temp = pow(x, n / 2);\n\t\tif (n % 2 == 0) {\n\t\t\treturn (temp * temp) % mod;\n\t\t} else {\n\t\t\treturn (x * temp * temp) % mod;\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Recursion:recursion/FactorialAndFibonacci.java",
    "title": "Factorial And Fibonacci",
    "slug": "factorial-and-fibonacci",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Factorial And Fibonacci using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/FactorialAndFibonacci.java",
    "sourceCode": "public class FactorialAndFibonacci {\n\n\tstatic int factorial(int n) {\n\t\tif (n == 0)\n\t\t\treturn 1;\n\t\telse\n\t\t\treturn (n * factorial(n - 1));\n\t}\n\n\tstatic int fib(int n) {\n\t\tif (n <= 1)\n\t\t\treturn n;\n\t\treturn fib(n - 1) + fib(n - 2);\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Recursion:recursion/IntegerToEnglishWords.java",
    "title": "Integer To English Words",
    "slug": "integer-to-english-words",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Integer To English Words using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/IntegerToEnglishWords.java",
    "sourceCode": "public class IntegerToEnglishWords {\n\n\tprivate final String[] LESS_THAN_20 = { \"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\",\n\t\t\t\"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\",\n\t\t\t\"Nineteen\" };\n\tprivate final String[] TENS = { \"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\",\n\t\t\t\"Ninety\" };\n\n\tpublic String numberToWords(int num) {\n\t\tif (num == 0)\n\t\t\treturn \"Zero\";\n\t\treturn help(num);\n\t}\n\n\tString help(int num) {\n\t\tString ret = \"\";\n\t\tif (num < 20) {\n\t\t\tret = LESS_THAN_20[num];\n\t\t} else if (num < 100) {\n\t\t\tret = TENS[num / 10] + \" \" + help(num % 10);\n\t\t} else if (num < 1000) {\n\t\t\tret = help(num / 100) + \" Hundred \" + help(num % 100);\n\t\t} else if (num < 1000000) {\n\t\t\tret = help(num / 1000) + \" Thousand \" + help(num % 1000);\n\t\t} else if (num < 1000000000) {\n\t\t\tret = help(num / 1000000) + \" Million \" + help(num % 1000000);\n\t\t} else {\n\t\t\tret = help(num / 1000000000) + \" Billion \" + help(num % 1000000000);\n\t\t}\n\t\treturn ret.trim();\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Recursion:recursion/JosephusProblem.java",
    "title": "Josephus Problem",
    "slug": "josephus-problem",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Josephus Problem using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/JosephusProblem.java",
    "sourceCode": "public class JosephusProblem {\n\tpublic static void main(String[] args) {\n\t}\n}\n\nclass Solution1589\n{\n    public int josephus(int n, int k){\n        if(n == 1) \n           return 1;\n        int position = josephus(n-1,k); \n        return (position + k-1) % n + 1; \n    }\n    \n\n    public int josephus2(int n, int k){\n      int survivor = 0;\n        for (int i = 2; i <= n; i++) {\n            survivor = (survivor + k) % i;\n        }\n        return survivor + 1;\n    }\n    \n\n     public int josephus3(int n, int k){\n      if(n == 1) \n          return 0;\n        int position = josephus(n-1,k);     \n        return (position + k) % n; \n    }\n    \n}"
  },
  {
    "key": "Recursion:recursion/PowerOfANumber.java",
    "title": "Power Of A Number",
    "slug": "power-of-a-number",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Power Of A Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/PowerOfANumber.java",
    "sourceCode": "public class PowerOfANumber {\n\n\tpublic boolean isPowerOfThree(int n) {\n\t\treturn checkIsPowerOf3(n);\n\t}\n\n\tboolean checkIsPowerOf3(int n) {\n\t\tif (n == 3 || n == 1)\n\t\t\treturn true;\n\n\t\tif (n < 1)\n\t\t\treturn false;\n\n\t\tif (n % 3 == 0)\n\t\t\treturn checkIsPowerOf3(n / 3);\n\n\t\treturn false;\n\t}\n\n\tpublic boolean isPowerOfTwo(int n) {\n\t\treturn checkPowerOfTwo(n);\n\t}\n\n\tpublic boolean checkPowerOfTwo(int n) {\n\t\tif (n == 1 || n == 2)\n\t\t\treturn true;\n\n\t\tif (n < 1)\n\t\t\treturn false;\n\n\t\tif (n % 2 == 0)\n\t\t\treturn checkPowerOfTwo(n / 2);\n\n\t\treturn false;\n\t}\n\n\tpublic boolean isPowerOfFour(int n) {\n\t\treturn checkPowerOfFour(n);\n\t}\n\n\tboolean checkPowerOfFour(int n) {\n\t\tif (n == 1 || n == 4)\n\t\t\treturn true;\n\n\t\tif (n < 1)\n\t\t\treturn false;\n\n\t\tif (n % 4 == 0)\n\t\t\treturn checkPowerOfFour(n / 4);\n\n\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Recursion:recursion/PowerOfXRaisedToN.java",
    "title": "Power Of X Raised To N",
    "slug": "power-of-x-raised-to-n",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Power Of X Raised To N using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/PowerOfXRaisedToN.java",
    "sourceCode": "public class PowerOfXRaisedToN {\n\n\tpublic double myPow(double base, int exponent) {\n\t\tlong power = Math.abs((long) exponent);\n\t\tdouble ans = 1;\n\t\twhile (power > 0) {\n\t\t\t// check whether power is odd or not\n\t\t\tif ((power & 1) == 1)\n\t\t\t\tans = ans * base;\n\t\t\tbase = base * base;\n\n\t\t\t// divide by power by 2\n\t\t\tpower >>= 1;\n\t\t}\n\n\t\treturn exponent < 0 ? 1 / ans : ans;\n\t}\n\n//\t     public double myPow(double base, int exponent) {\n//\t         return myPow(base, 1L*exponent);\n//\t     }\n\n//\t     double myPow(double base, long exponent){\n//\t           //reduce the exponent by half, and increase the base by self 1\n//\t         if(exponent==0)\n//\t             return 1;\n\n//\t         if(exponent<0)\n//\t             return myPow(1/base,-exponent);\n\n//\t         return exponent%2==0 ? myPow(base*base,exponent/2) : base * myPow(base*base, exponent/2);\n//\t     }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Recursion:recursion/SpecialKeyboard.java",
    "title": "Special Keyboard",
    "slug": "special-keyboard",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Special Keyboard using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/SpecialKeyboard.java",
    "sourceCode": "// /*\n//  *  Example  : N=7\n//  *   \n//  *   RESULT = 7, 8, 9,5\n//  * CASE 1 : 7 A's is the maximum\n//  * CASE 2 : DECREASE A by 1 and increase paste by 1, AAAAca|Cc|Cv. (7-3) = 4 A's and 4*2=8\n//  * CASE 3:  3 A's * 3 Cv = 9\n//  * CASE 4 : 2A's * 4 Cv= 8\n//  * CASE 5 : 1A's * 5Cv = 5\n//  * \n//  * /\n\n\npublic class SpecialKeyboard {\n\t\n\t\n\t\n\t\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n     static int optimalKeys(int N)\n    {\n        // code here\n        int dp[] = new int[N+1];\n        for(int i=0;i<=6 && i<=N;i++)\n        dp[i] = i;\n        \n        for(int i=7;i<=N;i++)\n        {\n            for(int j=i-3;j>=1;j--)\n            {\n                dp[i] = Math.max(dp[i],dp[j]*(i-j-1));\n            }\n        }\n        return dp[N];\n    }\n\n\n  public static int findMaxA(int N) {\n        // Base case\n        if (N <= 6) {\n            return N;\n        }\n\n        int max = 0;\n\n        // Try all possible lengths for Ctrl-V\n        for (int i = N - 3; i >= 1; i--) {\n            int currMax = (N - i - 1) * findMaxA(i);\n            if (currMax > max) {\n                max = currMax;\n            }\n        }\n\n        return max;\n    }\n\n\n    //    static int[] memo;\n    // static int optimalKeys(int N){\n    //            memo = new int[N + 1];\n    //     Arrays.fill(memo, -1);\n    //   return findMaxA(N);\n    // }\n \n    // public static int findMaxA(int N) {\n    //     if (N <= 6) {\n    //         return N;\n    //     }\n\n    //     if (memo[N] != -1) {\n    //         return memo[N];\n    //     }\n\n    //     int max = 0;\n\n    //     for (int i = N - 3; i >= 1; i--) {\n    //         int currMax = (N - i - 1) * findMaxA(i);\n    //         if (currMax > max) {\n    //             max = currMax;\n    //         }\n    //     }\n\n    //     memo[N] = max;\n    //     return max;\n    // }\t\n\t\n\t\n\n}"
  },
  {
    "key": "Recursion:recursion/TowersOfHanoi.java",
    "title": "Towers Of Hanoi",
    "slug": "towers-of-hanoi",
    "topic": "Recursion",
    "difficulty": "Medium",
    "tags": [
      "Recursion",
      "Backtracking"
    ],
    "description": "Practice Towers Of Hanoi using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/recursion/TowersOfHanoi.java",
    "sourceCode": "public class TowersOfHanoi {\n\t\n\t// these parameters of fixed and  they work according there definition\n\t\t// source - starting and destination is the place where we are moving rods to\n\t\tstatic void towersOfHanoi(int n, char source, char auxiliary, char destination) {\n\t\t\t\n\t\t\tif(n==1) {\n\t\t\t\tSystem.out.println(source +\"-->\"+destination);\n\t\t\t\treturn;\n\t\t\t}\n\t\t\t\n\t\t\ttowersOfHanoi(n-1, source, destination, auxiliary); // here source--> auxilaryNode\n\t\t\ttowersOfHanoi(1,source, auxiliary, destination); // source --> destination\n\t\t\ttowersOfHanoi(n-1,auxiliary,source,destination ); // now we put back auxilaryNode --> Source\n\t\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:SegmentTrees/RangeSumQuery_Immutable_1D_303.java",
    "title": "Range Sum Query Immutable 1 D 303",
    "slug": "range-sum-query-immutable-1-d-303",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "SegmentTrees"
    ],
    "description": "Practice Range Sum Query Immutable 1 D 303 using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SegmentTrees/RangeSumQuery_Immutable_1D_303.java",
    "sourceCode": "/*\nPrefixSum Problem : O(1)\nCalculate PrefixSum\nApply rangeSumFormular PrefixSum[end]-prefixSum[start-1], where end/start are inclusive\nhttps://leetcode.com/problems/range-sum-query-immutable/\n\n*/\n\n\nclass NumArrayA { \n  int[] preSum;\n  public NumArrayA(int[] nums) {\n      preSum = nums; \n      for (int i = 1; i < preSum.length; ++i)\n          preSum[i] += preSum[i-1]; \n  }\n  \n  public int sumRange(int left, int right) {\n      //edge case when sum(0,1) return sum[1], because 0-1=-1\n      if (left == 0) \n          return preSum[right];\n      return preSum[right] - preSum[left-1];\n  }\n}\n/**\n* Your NumArray object will be instantiated and called as such:\n* NumArray obj = new NumArray(nums);\n* int param_1 = obj.sumRange(left,right);\n*/\n\n\n\npublic class RangeSumQuery_Immutable_1D_303 {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:SegmentTrees/RangeSumQuery_Immutable_2D_304.java",
    "title": "Range Sum Query Immutable 2 D 304",
    "slug": "range-sum-query-immutable-2-d-304",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "SegmentTrees"
    ],
    "description": "Practice Range Sum Query Immutable 2 D 304 using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SegmentTrees/RangeSumQuery_Immutable_2D_304.java",
    "sourceCode": "/*\n\nVideo Solution : https://youtu.be/aAA8ymRAZy8\n\n Brute Force : Iterate over given m rows  * n colums for every query\n i. e : (m*n) * q \n \n PrefixSum 2D: Iterate over m rows and apply the rangePrefixSum Formula and add them up\n which is like O(m*n ) for prefixSum once and O(m * q) for query querys\n \n Next Appoarach : O(1) for getting prefixSum\n O(m*n ) for preprocessing \n \n means, we try to think of every matrix corners, \n currentCell + justBeforeRowCellSum + justAsideColSumCell - repeated starting cellSum\n\n*/\n\n\n\nclass NumMatrix {\n\tprivate int[][] dp;\n\n\tpublic NumMatrix(int[][] matrix) {\n\t\tif (matrix.length == 0 || matrix[0].length == 0)\n\t\t\treturn;\n\t\tdp = new int[matrix.length + 1][matrix[0].length + 1];\n\n\t\tfor (int r = 0; r < matrix.length; r++) {\n\t\t\tfor (int c = 0; c < matrix[0].length; c++) {\n\t\t\t\tdp[r + 1][c + 1] = dp[r + 1][c] + dp[r][c + 1] + matrix[r][c] - dp[r][c];\n\t\t\t}\n\t\t}\n\t}\n\n\tpublic int sumRegion(int row1, int col1, int row2, int col2) {\n\t\treturn dp[row2 + 1][col2 + 1] - dp[row1][col2 + 1] - dp[row2 + 1][col1] + dp[row1][col1];\n\t}\n}\n\n\n\npublic class RangeSumQuery_Immutable_2D_304 {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:SegmentTrees/RangeSumQuery_Mutable_1D_307.java",
    "title": "Range Sum Query Mutable 1 D 307",
    "slug": "range-sum-query-mutable-1-d-307",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "SegmentTrees"
    ],
    "description": "Practice Range Sum Query Mutable 1 D 307 using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SegmentTrees/RangeSumQuery_Mutable_1D_307.java",
    "sourceCode": "/**\n\nIn case of brute force:\n\nreturn preSum[end], when start is 0, since it is an edge case\nprefixSum[end] - prefixSum[start-1] == gives range Sum => O(1)\nwhere as update operation update index n, with x value => O(n);\n\nSo to optimize this go for segment tree ==> Building segmentTree => PreOrderTraversal => O(n)\n\nNode description : sum = left + right sum==> simplying suming up by diving the array, so that we can have mid ranges sum\nwhich is easy while searching range sums ==> So the time complexity will be O(logN)\n\nRangle sum also  O(logn)\n\nProblem Link : https://leetcode.com/problems/range-sum-query-mutable/\n\nVideo Solution : https://youtu.be/dUkRI0R3sg8\n\nMutable means we can able to change the array values\nImmutable we are not allowed to modifiy\n\n*/\n\n\nclass NumArray {\n    \n    class SegmentTreeNode{\n        private int start,end;\n        private SegmentTreeNode left,right;\n        private int sum;\n        \n        public SegmentTreeNode(int start,int end){\n            this.start=start;\n            this.end=end;\n            this.left = null;\n            this.right =null;\n            this.sum=0;\n        }\n    }\n    \n    SegmentTreeNode root = null;\n    \n    public NumArray(int[] nums) {\n        root = buildTree(nums,0,nums.length-1);\n    }\n    \n    //o(n)-\n    private SegmentTreeNode buildTree(int[] nums, int start, int end){\n        if(start > end) // leftNodes calling left and right return null\n            return null;\n        else{\n            SegmentTreeNode newNode = new SegmentTreeNode(start,end);\n            if(start==end) // base condition - for leafNode\n                 newNode.sum=nums[start];\n            else{\n                int mid = start + (end-start)/2;\n                newNode.left = buildTree(nums,start,mid);\n                newNode.right = buildTree(nums,mid+1,end);\n                newNode.sum = newNode.left.sum + newNode.right.sum;\n            }\n            return newNode;\n       }    \n    }\n    \n    \n    \n    public void update(int index, int val) {\n        updateHelper(root,index,val);\n    }\n    \n    void updateHelper(SegmentTreeNode root, int index, int newValue){\n        if(root.start==root.end)\n            root.sum=newValue;\n        else{\n            int mid = root.start + (root.end-root.start)/2;\n            if(index<=mid)\n                updateHelper(root.left,index,newValue);\n            else\n                updateHelper(root.right,index,newValue);\n            root.sum = root.left.sum + root.right.sum;\n        }\n    }\n    \n    \n    public int sumRange(int left, int right) {\n        return sumRangeHelper(root,left,right);\n    }\n    \n    int sumRangeHelper(SegmentTreeNode root, int start, int end){\n        if(root.start==start && root.end == end)\n            return root.sum;\n        else{\n            int mid = root.start + (root.end - root.start) /2;\n            if(end <=mid)\n                return sumRangeHelper(root.left,start,end);\n            else if(start >=mid+1)\n                return sumRangeHelper(root.right,start,end);\n            else \n                return sumRangeHelper(root.left,start,mid) + sumRangeHelper(root.right,mid+1,end);\n        }\n    }\n    \n}\n\n\n\npublic class RangeSumQuery_Mutable_1D_307 {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/ContainsDuplicate_II.java",
    "title": "Contains Duplicate II",
    "slug": "contains-duplicate-ii",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Contains Duplicate II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/ContainsDuplicate_II.java",
    "sourceCode": "import java.util.HashSet;\nimport java.util.LinkedHashSet;\n\n//https://leetcode.com/problems/contains-duplicate-ii/\npublic class ContainsDuplicate_II {\n\n\tpublic boolean containsNearbyDuplicate(int[] nums, int k) {\n\n\t\t// bruteForce: O(n*min(n,k))\n//\t         for(int i=0;i<nums.length;i++){\n\n//\t             for(int j=i+1;j<nums.length&&j<=i+k;j++){\n//\t                 if(nums[i]==nums[j])\n//\t                     return true;\n//\t             }\n//\t         }\n//\t         return false;\n\n\t\t// O(n)\n\t\tHashSet<Integer> set = new LinkedHashSet<>();\n\t\tfor (int i = 0; i < nums.length; i++) {\n\t\t\tif (set.contains(nums[i]))\n\t\t\t\treturn true;\n\t\t\tset.add(nums[i]);\n\t\t\tif (set.size() > k)\n\t\t\t\tset.remove(nums[i - k]);\n\t\t}\n\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/DietPlanPerformance.java",
    "title": "Diet Plan Performance",
    "slug": "diet-plan-performance",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Diet Plan Performance using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/DietPlanPerformance.java",
    "sourceCode": "//http://lixinchengdu.github.io/algorithmbook/leetcode/prime-arrangements.html\npublic class DietPlanPerformance {\n\t\n\t  int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n\t        int calorie = 0;\n\t        int score = 0;\n\t        for (int i = 0; i < k - 1; ++i) {\n\t            calorie += calories[i];\n\t        }\n\n\t        for (int i = k - 1; i < calories.length; ++i) {\n\t            calorie += calories[i];\n\t            if (calorie < lower) {\n\t                score -= 1;\n\t            } else if (calorie > upper) {\n\t                score += 1;\n\t            } \n\t            calorie -= calories[i - k + 1];\n\t        }\n\n\t        return score;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/FindAllAnagaramsInAString.java",
    "title": "Find All Anagrams in a String",
    "slug": "find-all-anagrams-in-a-string",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Find All Anagrams in a String using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/FindAllAnagaramsInAString.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class FindAllAnagaramsInAString {\n\n\tpublic List<Integer> findAnagrams(String s, String p) {\n\n\t\tList<Integer> output = new ArrayList<>();\n\n\t\tif (s.length() < p.length())\n\t\t\treturn output;\n\n\t\tint[] hashmap = new int[128];\n\t\tfor (char ch : p.toCharArray()) {\n\t\t\thashmap[ch]++;\n\t\t}\n\n\t\tint beg = 0, end = 0, counter = p.length();\n\t\twhile (end < s.length()) {\n\t\t\tif (hashmap[s.charAt(end++)]-- > 0)\n\t\t\t\tcounter--;\n\n\t\t\tif (counter == 0)\n\t\t\t\toutput.add(beg);\n\n\t\t\tif (end - beg == p.length() && hashmap[s.charAt(beg++)]++ >= 0)\n\t\t\t\tcounter++;\n\t\t}\n\t\treturn output;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/FindTheKBeautyOFANumber.java",
    "title": "Find The K Beauty OFA Number",
    "slug": "find-the-k-beauty-ofa-number",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Find The K Beauty OFA Number using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/FindTheKBeautyOFANumber.java",
    "sourceCode": "//https://leetcode.com/problems/find-the-k-beauty-of-a-number/\npublic class FindTheKBeautyOFANumber {\n\n\tpublic int divisorSubstrings(int num, int k) {\n\t\tString s = String.valueOf(num);\n\t\tint count = 0;\n\t\tfor (int i = 0; i <= s.length() - k; i++) {\n\t\t\tint number = Integer.parseInt(s.substring(i, i + k));\n\t\t\tif (number > 0 && num % number == 0) {\n\t\t\t\tcount++;\n\t\t\t}\n\t\t}\n\t\treturn count;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/FruitsIntoBasket.java",
    "title": "Fruits Into Basket",
    "slug": "fruits-into-basket",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Fruits Into Basket using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/FruitsIntoBasket.java",
    "sourceCode": "import java.util.HashMap;\n\npublic class FruitsIntoBasket {\n\n\tpublic int totalFruit(int[] fruits) {\n\t\tint maxLen = 0;\n\t\tint i = 0, j = 0;\n\t\tHashMap<Integer, Integer> h = new HashMap<>();\n\n\t\twhile (j < fruits.length) {\n\t\t\th.put(fruits[j], h.getOrDefault(fruits[j], 0) + 1);\n\t\t\twhile (h.size() > 2) {\n\t\t\t\th.put(fruits[i], h.get(fruits[i]) - 1);\n\t\t\t\tif (h.get(fruits[i]) == 0)\n\t\t\t\t\th.remove(fruits[i]);\n\t\t\t\ti++;\n\t\t\t}\n\t\t\tmaxLen = Math.max(maxLen, j - i + 1);\n\t\t\tj++;\n\t\t}\n\t\treturn maxLen;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/Maximum_average_subarray_I.java",
    "title": "Maximum average subarray I",
    "slug": "maximum-average-subarray-i",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Maximum average subarray I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/Maximum_average_subarray_I.java",
    "sourceCode": "//https://leetcode.com/problems/maximum-average-subarray-i/description/\npublic class Maximum_average_subarray_I {\n\n\tpublic double findMaxAverage(int[] nums, int k) {\n\t\tdouble sum = 0;\n\t\tfor (int i = 0; i < k; i++) {\n\t\t\tsum += nums[i];\n\t\t}\n\t\tdouble res = sum;\n\t\tfor (int i = k; i < nums.length; i++) {\n\t\t\tsum += nums[i] - nums[i - k];\n\t\t\tres = Math.max(res, sum);\n\t\t}\n\n\t\treturn res / k;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/MinimumWindowSubstring.java",
    "title": "Minimum Window Substring",
    "slug": "minimum-window-substring",
    "topic": "Sliding Window",
    "difficulty": "Hard",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Minimum Window Substring using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/MinimumWindowSubstring.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\n/**8\n * https://leetcode.com/problems/minimum-window-substring/description/\n * @author saite\n *\n */\n\npublic class MinimumWindowSubstring {\npublic String minWindow(String s, String t) {\n        \n        if(s.length()==0 || t.length()==0)\n            return \"\";\n        \n         Map<Character,Integer> tCount = new HashMap<>();\n         Map<Character,Integer> sCount = new HashMap<>();\n        \n         //Here maps are used to compare, for eg: substring = BANC and t = \"ABC\"\n        //substring = [B-1,A-1,N-1,C-1] and t = [A-1,B-1,C-1] so t is present in substring\n       \n        for(char ch:t.toCharArray())\n            tCount.put(ch,tCount.getOrDefault(ch,0)+1);\n        \n        //expected window size and current \n        int expectedWindowSize = tCount.size();\n        int currentWindowSize=0;\n        \n        //ans\n        int startIndex=0;\n        int endIndex=0;\n        int minLength=-1;\n        \n        //windowptrs\n        int startPtr=0;\n        int endPtr=0;\n        \n        while(endPtr<s.length()){\n            char ch = s.charAt(endPtr);\n            int count = sCount.getOrDefault(ch,0);\n            sCount.put(ch,count+1);\n            \n            if(tCount.containsKey(ch)&&tCount.get(ch).intValue()==sCount.get(ch).intValue())\n                currentWindowSize++;\n            \n            //so if we hit this condition means, we have a substring with us which is covering t\n            // now we have to check, can we make it even smaller length -> which is still matching t\n            \n            \n            while(startPtr<=endPtr && currentWindowSize == expectedWindowSize){\n                char c = s.charAt(startPtr);\n                if(minLength==-1||endPtr-startPtr+1<minLength){\n                    minLength = endPtr-startPtr+1;\n                    startIndex=startPtr;\n                    endIndex=endPtr;\n                }\n                \n                \n                sCount.put(c,sCount.get(c)-1);\n                \n                if(tCount.containsKey(c)&&sCount.get(c).intValue()<tCount.get(c).intValue())\n                    currentWindowSize--;\n                       \n                startPtr++;\n            }\n            \n            \n            \n            endPtr++;\n        }\n    \n        return minLength==-1 ? \"\" : s.substring(startIndex,endIndex+1);\n    }\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/PermutationInAString.java",
    "title": "Permutation In A String",
    "slug": "permutation-in-a-string",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Permutation In A String using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/PermutationInAString.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class PermutationInAString {\n\n\tpublic boolean checkInclusion(String s1, String s2) {\n\t\tif (s1.length() > s2.length() || s2.length() == 0)\n\t\t\treturn false;\n\t\tif (s1.length() == 0)\n\t\t\treturn true;\n\t\tint[] arr1 = new int[26];\n\t\tint[] arr2 = new int[26];\n\n\t\tfor (int i = 0; i < s1.length(); i++) {\n\t\t\tarr1[s1.charAt(i) - 'a']++;\n\t\t\tarr2[s2.charAt(i) - 'a']++;\n\t\t}\n\n\t\tfor (int i = s1.length(); i < s2.length(); i++) {\n\t\t\tif (Arrays.equals(arr1, arr2))\n\t\t\t\treturn true;\n\t\t\tarr2[s2.charAt(i - s1.length()) - 'a']--;\n\t\t\tarr2[s2.charAt(i) - 'a']++;\n\t\t}\n\t\tif (Arrays.equals(arr1, arr2))\n\t\t\treturn true;\n\t\telse\n\t\t\treturn false;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/RepeatedDNASequences.java",
    "title": "Repeated DNA Sequences",
    "slug": "repeated-dna-sequences",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Repeated DNA Sequences using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/RepeatedDNASequences.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashSet;\nimport java.util.List;\nimport java.util.Set;\n\n//https://leetcode.com/problems/repeated-dna-sequences/\npublic class RepeatedDNASequences {\n\n\tpublic List<String> findRepeatedDnaSequences(String s) {\n\n\t\t/*\n\t\t * Brute Force: Map<String,String> freq = new HashMap<>(); for(int\n\t\t * i=0;i<s.length-9;i++){ String dna = s.substring(i,i+10);\n\t\t * freq.put(dna,freq.getOrDefault(dna,0)+1); }\n\t\t * \n\t\t * return\n\t\t * freq.entrySet().stream().filter(e->e.getValue()>1).map(e->e.getKey()).collect\n\t\t * (Collectors.toList());\n\t\t */\n\n\t\tif (s == null || s.length() <= 10)\n\t\t\treturn new ArrayList<String>();\n\n\t\tint startWindow = 0;\n\t\tint endWindow = 10;\n\t\tSet<String> seen = new HashSet<>(), repeated = new HashSet<>();\n\n\t\twhile (endWindow <= s.length()) {\n\t\t\tString subString = s.substring(startWindow, endWindow);\n\t\t\tif (seen.contains(subString))\n\t\t\t\trepeated.add(subString);\n\t\t\tseen.add(subString);\n\t\t\tstartWindow++;\n\t\t\tendWindow++;\n\t\t}\n\t\treturn new ArrayList(repeated);\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/SlidingWindowMaximum.java",
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Sliding Window Maximum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/SlidingWindowMaximum.java",
    "sourceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class SlidingWindowMaximum {\n\n\tpublic int[] maxSlidingWindow(int[] nums, int k) {\n\t\tif (nums.length == 0 || nums.length < k)\n\t\t\treturn new int[0];\n\n\t\tint len = nums.length;\n\t\tint[] result = new int[len - k + 1];\n\t\tint idx = 0;\n\t\t// stores only the indexes of the element\n\t\tDeque<Integer> queue = new ArrayDeque<>();\n\n\t\tfor (int i = 0; i < len; i++) {\n\t\t\t// remove previousWindowElement\n\t\t\tif (!queue.isEmpty() && i - k == queue.peekFirst())\n\t\t\t\tqueue.pollFirst();\n\n\t\t\twhile (!queue.isEmpty() && nums[queue.peekLast()] < nums[i])\n\t\t\t\tqueue.pollLast();\n\n\t\t\tqueue.addLast(i);\n\n\t\t\t// add to solution if we hit the window boundary - maxElement -first\n\t\t\tif (i - k + 1 >= 0)\n\t\t\t\tresult[idx++] = nums[queue.peekFirst()];\n\t\t}\n\n\t\treturn result;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Fixed/SubstringsOfSize3WithDistinctCharacters.java",
    "title": "Substrings Of Size3 With Distinct Characters",
    "slug": "substrings-of-size3-with-distinct-characters",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Fixed"
    ],
    "description": "Practice Substrings Of Size3 With Distinct Characters using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Fixed/SubstringsOfSize3WithDistinctCharacters.java",
    "sourceCode": "import java.util.LinkedHashSet;\nimport java.util.Set;\n\npublic class SubstringsOfSize3WithDistinctCharacters {\n\n\tpublic int countGoodSubstrings(String s) {\n\t\tint l = s.length();\n\t\tint i = 0, j = 0, k = 3, count = 0;\n\t\twhile (j < l) {\n\t\t\tif (j - i + 1 < k)\n\t\t\t\tj++;\n\t\t\telse if (j - i + 1 == k) {\n\t\t\t\tif (s.charAt(i) != s.charAt(j) && s.charAt(j) != s.charAt(i + 1) && s.charAt(i) != s.charAt(i + 1))\n\t\t\t\t\tcount++;\n\t\t\t\ti++;\n\t\t\t\tj++;\n\t\t\t}\n\t\t}\n\t\treturn count;\n\n\t}\n\n\t//Make sure of removing the startCharacter in case of new start or in case of duplicates\n    public int countGoodSubstrings2(String s) {\n        int count=0;\n        \n        int windowStart=0, end=0;\n        Set<Character> differentCharacters = new LinkedHashSet();\n        while(end<s.length()){\n            //if there are duplicates, then remove and start with new substring\n            while(differentCharacters.contains(s.charAt(end))){\n                differentCharacters.remove(s.charAt(windowStart));\n                windowStart++;\n            }\n            \n            //If no duplicates\n            differentCharacters.add(s.charAt(end));\n            if(end-windowStart+1==3){\n                count++;\n                differentCharacters.remove(s.charAt(windowStart));\n                windowStart++;\n            }\n            end++;\n        }        \n        return count;\n    }\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/GrumpyBookStoreOwner.java",
    "title": "Grumpy Book Store Owner",
    "slug": "grumpy-book-store-owner",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Grumpy Book Store Owner using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/GrumpyBookStoreOwner.java",
    "sourceCode": "/**\n * \n * @author saiteja \n * ProblemLink :https://leetcode.com/problems/grumpy-bookstore-owner\n * Tc: O(n) SC : O(1)\n */\n\n\npublic class GrumpyBookStoreOwner {\n    \n\t public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n\t        int existingSatisified =0;\n\t        int currChange=0;\n\t        int maxChange=0;\n\t        \n\t        for(int i=0;i<customers.length;i++){\n\t            //0 - awake, he received the customers\n\t            if(grumpy[i]==0)\n\t                existingSatisified+=customers[i];\n\t            //1- sleepy, he has n't received the customers with good manner\n\t            if(grumpy[i]==1)\n\t                currChange+=customers[i];\n\t            \n\t            //incase we are at the end of the window, means we are in second window, now remove 1st windows\n\t            // 1st value and that only when he is sleepy, other wise it won't effect to sum since it is 0\n\t            if(i>=minutes&&grumpy[i-minutes]==1)\n\t                currChange-=customers[i-minutes];\n\t                // previous windows 1st element\n\t                \n\t            maxChange = Math.max(maxChange,currChange);\n\t        }\n\t        \n\t        return existingSatisified + maxChange;\n\t        \n\t        \n\t    }\n\t\n\tpublic static void main(String[] args) {\n\t\t\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/LongestContinuousSubarrayWithAbsoluteDiffLessThan.java",
    "title": "Longest Continuous Subarray With Absolute Diff Less Than",
    "slug": "longest-continuous-subarray-with-absolute-diff-less-than",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Longest Continuous Subarray With Absolute Diff Less Than using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/LongestContinuousSubarrayWithAbsoluteDiffLessThan.java",
    "sourceCode": "import java.util.TreeMap;\n\n// https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit\n\nclass Solution1 {\n\t// Solution 2: Use TreeMap\n// Use one tree map can easily get the maximum and the minimum at the same time.\n// In java, we can use TreeMap to count elements.\n// In cpp, it suports multi treeset, that's even better.\n\n// Time O(NogN)\n// Space O(N)\n\n\tpublic int longestSubarray(int[] A, int limit) {\n\t\tint i = 0, j;\n\t\tTreeMap<Integer, Integer> m = new TreeMap<>();\n\t\tfor (j = 0; j < A.length; j++) {\n\t\t\tm.put(A[j], 1 + m.getOrDefault(A[j], 0));\n\t\t\tif (m.lastEntry().getKey() - m.firstEntry().getKey() > limit) {\n\t\t\t\tm.put(A[i], m.get(A[i]) - 1);\n\t\t\t\tif (m.get(A[i]) == 0)\n\t\t\t\t\tm.remove(A[i]);\n\t\t\t\ti++;\n\t\t\t}\n\t\t}\n\t\treturn j - i;\n\t}\n}\n\npublic class LongestContinuousSubarrayWithAbsoluteDiffLessThan {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/LongestNiceSubstring.java",
    "title": "Longest Nice Substring",
    "slug": "longest-nice-substring",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Longest Nice Substring using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/LongestNiceSubstring.java",
    "sourceCode": "import java.util.HashSet;\nimport java.util.Set;\n\n\n//https://leetcode.com/problems/longest-nice-substring/description/\npublic class LongestNiceSubstring {\n\t\n\t public String longestNiceSubstring(String s) {\n\t        Set<Character> set = new HashSet<>();\n\t        for(char ch:s.toCharArray())\n\t            set.add(ch);\n\t        \n\t        for(int i=0;i<s.length();i++){\n\t            char ch = s.charAt(i);\n\t            if(set.contains(Character.toUpperCase(ch))&&set.contains(Character.toLowerCase(ch)))\n\t                continue;\n\t            String s1 = longestNiceSubstring(s.substring(0,i));\n\t            String s2 = longestNiceSubstring(s.substring(i+1));\n\t            return s1.length()>=s2.length() ? s1:s2;\n\t        }\n\t        return s;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/LongestRepeatingCharacterReplacement.java",
    "title": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Longest Repeating Character Replacement using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/LongestRepeatingCharacterReplacement.java",
    "sourceCode": "import java.util.HashMap;\n\n\n/**\n * \n * @author saiteja \n * ProblemLink :https://leetcode.com/problems/longest-repeating-character-replacement\n * Tc: O(n) SC : O(1)\n */\n\n\npublic class LongestRepeatingCharacterReplacement {\n\t public int characterReplacement(String s, int k) {\n\t        \n\t        HashMap<Character,Integer> map = new HashMap<>();\n\t        int startWindow=0;\n\t        int endWindow=0;\n\t        int maxReplacements =0;\n\t        int maxCharCount=0;\n\t        //maxReplacements = len(substring) - maxRepeatingCharInSubstr\n\t        while(endWindow<s.length()){\n\t            char ch = s.charAt(endWindow); \n\t            \n\t            map.put(ch, map.getOrDefault(ch,0)+1);\n\t            maxCharCount=Math.max(maxCharCount,map.get(ch));\n\t            \n\t        \n\t            while((endWindow-startWindow+1)-maxCharCount>k){\n\t                map.put(s.charAt(startWindow), map.get(s.charAt(startWindow))-1 );\n\t                startWindow++;\n\t            }\n\t            maxReplacements = Math.max(maxReplacements,endWindow-startWindow+1) ;\n\t            \n\t            endWindow++;\n\t        }\n\t        return maxReplacements;\n\t        \n\t    }\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/LongestSubstringWithoutRepeatingCharacters.java",
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Longest Substring Without Repeating Characters using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/LongestSubstringWithoutRepeatingCharacters.java",
    "sourceCode": "import java.util.HashSet;\n\n/**\n * \n * @author saiteja \n * ProblemLink :https://leetcode.com/problems/longest-substring-without-repeating-characters\n * Tc: O(n) SC : O(1)\n */\n\npublic class LongestSubstringWithoutRepeatingCharacters {\n\n\tpublic int lengthOfLongestSubstring(String s) {\n\n\t\tHashSet<Character> set = new HashSet<>();\n\t\tint left = 0;\n\t\tint ans = 0;\n\t\tfor (int right = 0; right < s.length(); right++) {\n\t\t\twhile (set.contains(s.charAt(right))) {\n\t\t\t\tset.remove(s.charAt(left));\n\t\t\t\tleft++;\n\t\t\t}\n\t\t\tset.add(s.charAt(right));\n\t\t\tans = Math.max(ans, right - left + 1);\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/MaxConsecutiveOnes_III.java",
    "title": "Max Consecutive Ones III",
    "slug": "max-consecutive-ones-iii",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Max Consecutive Ones III using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/MaxConsecutiveOnes_III.java",
    "sourceCode": "/**\n * \n * @author saiteja \n * ProblemLink :https://leetcode.com/problems/max-consecutive-ones-iii\n * Tc: O(n) SC : O(1)\n */\n\n\npublic class MaxConsecutiveOnes_III {\n\n\tpublic int longestOnes(int[] nums, int k) {\n\t\tint flips = 0;\n\t\tint startWindow = 0;\n\t\tint endWindow = 0;\n\t\tint n = nums.length;\n\t\tint maxCount = Integer.MIN_VALUE;\n\t\twhile (endWindow < n) {\n\t\t\tif (nums[endWindow] == 0) {\n\t\t\t\tflips++;\n\t\t\t}\n\t\t\twhile (flips > k && nums[startWindow++] == 0) {\n\t\t\t\tflips--;\n\t\t\t}\n\t\t\tmaxCount = Math.max(maxCount, endWindow - startWindow + 1);\n\t\t\tendWindow++;\n\t\t}\n\t\treturn maxCount;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/MaximumSizeSubArraySumEqualsToK.java",
    "title": "Maximum Size Sub Array Sum Equals To K",
    "slug": "maximum-size-sub-array-sum-equals-to-k",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Maximum Size Sub Array Sum Equals To K using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/MaximumSizeSubArraySumEqualsToK.java",
    "sourceCode": "import java.util.HashMap;\n\n/**\n * \n * @author saiteja \n * Problem Link   :https://www.lintcode.com/problem/911\n *         Tc: O(n) SC : O(n)\n */\n\n\npublic class MaximumSizeSubArraySumEqualsToK {\n\n\tpublic int maxSubArrayLen(int[] nums, int k) {\n\t\tHashMap<Integer, Integer> map = new HashMap<>();\n\t\tmap.put(0, -1);\n\t\tint result = 0;\n\t\tint sum = 0;\n\t\tfor (int i = 0; i < nums.length; i++) {\n\t\t\tsum += nums[i];\n\t\t\tif (map.containsKey(sum - k)) {\n\t\t\t\tresult = Math.max(result, i - map.get(sum - k));\n\t\t\t}\n\t\t\tmap.putIfAbsent(sum, i);\n\t\t}\n\t\treturn result;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/MinimumSize_SubarraySum_GreaterThanEquals_K.java",
    "title": "Minimum Size Subarray Sum Greater Than Equals K",
    "slug": "minimum-size-subarray-sum-greater-than-equals-k",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Minimum Size Subarray Sum Greater Than Equals K using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/MinimumSize_SubarraySum_GreaterThanEquals_K.java",
    "sourceCode": "/**\n * \n * @author saiteja \n * Problem Link   :https://leetcode.com/problems/minimum-size-subarray-sum\n *         Tc: O(n) SC : O(n)\n */\n\n/*Note:  This code works only in case of positive numbers, in questions there are clearly mentioned, i/p is positive*/\npublic class MinimumSize_SubarraySum_GreaterThanEquals_K {\n\n\tpublic int minSubArrayLen(int target, int[] nums) {\n\t\tint start = 0, end = 0;\n\t\tint sum = 0;\n\t\tint min = Integer.MAX_VALUE;\n\t\twhile (end < nums.length) {\n\t\t\tsum += nums[end++];\n\t\t\twhile (sum >= target) {\n\t\t\t\tmin = Math.min(min, end - start);\n\t\t\t\tsum = sum - nums[start++];\n\t\t\t}\n\t\t}\n\t\treturn min == Integer.MAX_VALUE ? 0 : min;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/MinimumWindowSubstring.java",
    "title": "Minimum Window Substring",
    "slug": "minimum-window-substring",
    "topic": "Sliding Window",
    "difficulty": "Hard",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Minimum Window Substring using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/MinimumWindowSubstring.java",
    "sourceCode": "import java.util.HashMap;\nimport java.util.Map;\n\n/**\n * \n * @author saiteja \n * ProblemLink :https://leetcode.com/problems/minimum-window-substring/\n * Tc: O(n) SC : O(1)\n */\n\npublic class MinimumWindowSubstring {\n\n\tpublic String minWindow(String s, String t) {\n\n\t\tif (s.length() == 0 || t.length() == 0)\n\t\t\treturn \"\";\n\n\t\tMap<Character, Integer> tCount = new HashMap<>();\n\t\tMap<Character, Integer> sCount = new HashMap<>();\n\n\t\t// Here maps are used to compare, for eg: substring = BANC and t = \"ABC\"\n\t\t// substring = [B-1,A-1,N-1,C-1] and t = [A-1,B-1,C-1] so t is present in\n\t\t// substring\n\n\t\tfor (char ch : t.toCharArray())\n\t\t\ttCount.put(ch, tCount.getOrDefault(ch, 0) + 1);\n\n\t\t// expected window size and current\n\t\tint expectedWindowSize = tCount.size();\n\t\tint currentWindowSize = 0;\n\n\t\t// ans\n\t\tint startIndex = 0;\n\t\tint endIndex = 0;\n\t\tint minLength = -1;\n\n\t\t// windowptrs\n\t\tint startPtr = 0;\n\t\tint endPtr = 0;\n\n\t\twhile (endPtr < s.length()) {\n\t\t\tchar ch = s.charAt(endPtr);\n\t\t\tint count = sCount.getOrDefault(ch, 0);\n\t\t\tsCount.put(ch, count + 1);\n\n\t\t\tif (tCount.containsKey(ch) && tCount.get(ch).intValue() == sCount.get(ch).intValue())\n\t\t\t\tcurrentWindowSize++;\n\n\t\t\t// so if we hit this condition means, we have a substring with us which is\n\t\t\t// covering t\n\t\t\t// now we have to check, can we make it even smaller length -> which is still\n\t\t\t// matching t\n\n\t\t\twhile (startPtr <= endPtr && currentWindowSize == expectedWindowSize) {\n\t\t\t\tchar c = s.charAt(startPtr);\n\t\t\t\tif (minLength == -1 || endPtr - startPtr + 1 < minLength) {\n\t\t\t\t\tminLength = endPtr - startPtr + 1;\n\t\t\t\t\tstartIndex = startPtr;\n\t\t\t\t\tendIndex = endPtr;\n\t\t\t\t}\n\n\t\t\t\tsCount.put(c, sCount.get(c) - 1);\n\n\t\t\t\tif (tCount.containsKey(c) && sCount.get(c).intValue() < tCount.get(c).intValue())\n\t\t\t\t\tcurrentWindowSize--;\n\n\t\t\t\tstartPtr++;\n\t\t\t}\n\n\t\t\tendPtr++;\n\t\t}\n\n\t\treturn minLength == -1 ? \"\" : s.substring(startIndex, endIndex + 1);\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/Sliding_Window_Median.java",
    "title": "Sliding Window Median",
    "slug": "sliding-window-median",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Sliding Window Median using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/Sliding_Window_Median.java",
    "sourceCode": "import java.util.Collections;\nimport java.util.PriorityQueue;\n\n\n// https://leetcode.com/problems/sliding-window-median/description/\n\nclass Solution {\n    \n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n    \n    public double[] medianSlidingWindow(int[] nums, int k) {\n        if(nums.length==0)\n            return new double[0];\n        int len=nums.length;\n        double[] result = new double[len-k+1];\n        for(int i=0;i<len;i++){\n            addToHeap(nums[i]);\n            if(i-k+1>=0){\n                result[i-k+1]=findMedian();\n                removeFromHeap(nums[i-k+1]);\n            }\n        }\n        return result;   \n    }\n    \n    private void addToHeap(int num){\n        if (maxHeap.size() == 0 || maxHeap.peek() >= num) \n            maxHeap.add(num);\n        else \n            minHeap.add(num);\n        rebalanceHeaps();\n    }\n\n\t// This method removes the first element in the sliding window from the appropriate heap and rebalances the heaps\n    private void removeFromHeap(int num){\n        if (num > maxHeap.peek())\n            minHeap.remove(num);\n        else \n            maxHeap.remove(num);\n        rebalanceHeaps();\n    }    \n    \n\t// This method keeps the height of the 2 heaps same\n    private void rebalanceHeaps(){\n        if (maxHeap.size() == minHeap.size())\n            return;\n        if (maxHeap.size() > minHeap.size() + 1)\n            minHeap.add(maxHeap.poll());\n        else if (maxHeap.size() < minHeap.size())\n            maxHeap.add(minHeap.poll());        \n    }\n    \n     private double findMedian(){\n        return maxHeap.size() > minHeap.size() ? maxHeap.peek() : minHeap.peek() / 2.0 + maxHeap.peek() / 2.0;\n    }\n    \n    \n}\n\n\npublic class Sliding_Window_Median {\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/Subarray_Product_LessThan_K.java",
    "title": "Subarray Product Less Than K",
    "slug": "subarray-product-less-than-k",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Subarray Product Less Than K using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/Subarray_Product_LessThan_K.java",
    "sourceCode": "/**\n * \n * @author saiteja\n * Problem Link :https://leetcode.com/problems/subarray-product-less-than-k/description/\n * Tc: O(n)\n * SC : O(1)\n */\n\npublic class Subarray_Product_LessThan_K {\n\n\t  public int numSubarrayProductLessThanK(int[] nums, int k) {\n\t        if (k <= 1) return 0;\n\t        int product = 1, ans = 0, start = 0;\n\t        for (int end=0;end<nums.length;end++) {\n\t            //condition to increase window\n\t            product*=nums[end];\n\t            \n\t            //Condition to shrink the window from starting\n\t            while (product >= k) \n\t              product /= nums[start++];\n\t            \n\t            //suming up the count whose subarray product is less than K\n\t            ans += end - start + 1;\n\t        }\n\t        return ans;  \n\t    }\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/Subarray_Sum_Equals_K.java",
    "title": "Subarray Sum Equals K",
    "slug": "subarray-sum-equals-k",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Subarray Sum Equals K using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/Subarray_Sum_Equals_K.java",
    "sourceCode": "import java.util.HashMap;\n\n/**\n * \n * @author saiteja \n * Problem Link   :https://leetcode.com/problems/subarray-sum-equals-k/description/\n *         Tc: O(n) SC : O(1)\n */\n\npublic class Subarray_Sum_Equals_K {\n\n\tpublic int subarraySum(int[] nums, int k) {\n\t\tint sum = 0;\n\t\tint count = 0;\n\t\tHashMap<Integer, Integer> map = new HashMap<>();\n\n\t\t// map(sum,occurrence)\n\t\tmap.put(0, 1);\n\t\tfor (int i = 0; i < nums.length; i++) {\n\t\t\tsum += nums[i];\n\t\t\t// k-sum gives negative value so it doesn't work\n\t\t\tif (map.containsKey(sum - k))\n\t\t\t\tcount += map.get(sum - k);\n\t\t\tmap.put(sum, map.getOrDefault(sum, 0) + 1);\n\t\t}\n\t\treturn count;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Sliding Window:SlidingWindow_Variable/SubstringWithConcatenationOfAllWords.java",
    "title": "Substring With Concatenation Of All Words",
    "slug": "substring-with-concatenation-of-all-words",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "tags": [
      "Sliding Window",
      "SlidingWindow_Variable"
    ],
    "description": "Practice Substring With Concatenation Of All Words using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/SlidingWindow_Variable/SubstringWithConcatenationOfAllWords.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\n\n//https://leetcode.com/problems/substring-with-concatenation-of-all-words\n\nclass Solution3 {\n    public List<Integer> findSubstring(String s, String[] words) {\n\n        Map<String,Integer> wordsCount = new HashMap<>();\n        for(String word:words)\n            wordsCount.put(word,wordsCount.getOrDefault(word,0)+1);\n    \n        List<Integer> result = new ArrayList<>();\n        int wordsCnt = words.length;\n        int wordLength = words[0].length();\n        \n        for(int i=0;i<=s.length()-wordsCnt*wordLength;i++){\n            Map<String,Integer> seen=new HashMap<>();\n            for(int j=0;j<wordsCnt;j++){\n                int nextIndexOfWord = i+j*wordLength;\n                String nextWord=s.substring(nextIndexOfWord,nextIndexOfWord+wordLength);\n                \n                if(!wordsCount.containsKey(nextWord))\n                    break;\n                \n                seen.put(nextWord,seen.getOrDefault(nextWord,0)+1);\n                \n                if(seen.get(nextWord)>wordsCount.getOrDefault(nextWord,0))\n                    break;\n                \n                if(j+1==wordsCnt)\n                    result.add(i);    \n            }   \n        }\n        return result;\n    }\n}\n\npublic class SubstringWithConcatenationOfAllWords {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Stack:Stack/EvaluateReversePolish.java",
    "title": "Evaluate Reverse Polish",
    "slug": "evaluate-reverse-polish",
    "topic": "Stack",
    "difficulty": "Medium",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Evaluate Reverse Polish using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/EvaluateReversePolish.java",
    "sourceCode": "public class EvaluateReversePolish {\n    public int evalRPN(String[] a) {\n         Stack<Integer> stack = new Stack<Integer>();\n  \n      for (int i = 0; i < a.length; i++) {\n        switch (a[i]) {\n          case \"+\":\n            stack.push(stack.pop() + stack.pop());\n            break;\n\n          case \"-\":\n            stack.push(-stack.pop() + stack.pop());\n            break;\n\n          case \"*\":\n            stack.push(stack.pop() * stack.pop());\n            break;\n\n          case \"/\":\n            int n1 = stack.pop(), n2 = stack.pop();\n            stack.push(n2 / n1);\n            break;\n\n          default:\n            stack.push(Integer.parseInt(a[i]));\n        }\n      }\n\n      return stack.pop();\n    }\n}"
  },
  {
    "key": "Stack:Stack/LargestRectangleInAHistogram.java",
    "title": "Largest Rectangle in Histogram",
    "slug": "largest-rectangle-in-histogram",
    "topic": "Stack",
    "difficulty": "Hard",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Largest Rectangle in Histogram using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/LargestRectangleInAHistogram.java",
    "sourceCode": "import java.util.Stack;\n\n\n//https://www.geeksforgeeks.org/largest-rectangular-area-in-a-histogram-using-stack/\npublic class LargestRectangleInAHistogram {\n\t/****\n\thttps://leetcode.com/problems/largest-rectangle-in-histogram/solutions/1727776/java-c-explanation-going-from-brute-to-optimal-approach/ */\n\n\n\tclass Solution {\n\t    public int largestRectangleArea(int[] heights) {\n\t        int len = heights.length;\n\t        Stack<Integer> s = new Stack<>();\n\t        int maxArea = 0;\n\t        for (int i = 0; i <= len; i++){\n\t            int h = (i == len ? 0 : heights[i]);\n\t            if (s.isEmpty() || h >= heights[s.peek()]) {\n\t                s.push(i);\n\t            } else {\n\t                int tp = s.pop();\n\t                maxArea = Math.max(maxArea, heights[tp] * (s.isEmpty() ? i : i - 1 - s.peek()));\n\t                i--;\n\t            }\n\t        }\n\t        return maxArea;\n\t    }\n\t}\n}"
  },
  {
    "key": "Stack:Stack/NextGreaterElementToLeft.java",
    "title": "Next Greater Element To Left",
    "slug": "next-greater-element-to-left",
    "topic": "Stack",
    "difficulty": "Medium",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Next Greater Element To Left using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/NextGreaterElementToLeft.java",
    "sourceCode": "import java.util.Stack;\n\npublic class NextGreaterElementToLeft {\n\n\tpublic static int[] previousGreaterElement(int[] nums) {\n\t\tint n = nums.length;\n\t\tint[] result = new int[n];\n\t\tStack<Integer> stack = new Stack<>();\n\n\t\tfor (int i = 0; i < n; i++) {\n\t\t\t// Pop elements from the stack while they are smaller than the current element\n\t\t\twhile (!stack.isEmpty() && nums[i] >= stack.peek()) {\n\t\t\t\tstack.pop();\n\t\t\t}\n\n\t\t\t// If the stack is empty, there is no previous greater element\n\t\t\t// Otherwise, the previous greater element is at the top of the stack\n\t\t\tresult[i] = stack.isEmpty() ? -1 : stack.peek();\n\n\t\t\t// Push the current element onto the stack\n\t\t\tstack.push(nums[i]);\n\t\t}\n\n\t\treturn result;\n\t}\n\n\t// Remove k digits\n\t// Previous greater element or Next greater element to left\n\tpublic String removeKdigits(String num, int k) {\n\t\tStack<Character> s = new Stack<>();\n\n\t\tfor (char c : num.toCharArray()) {\n\t\t\t// loop means curr ele is less then the peek (there is decline in ele) whenever\n\t\t\t// find decline pop peek\n\t\t\t// left ele have more weight,thatswhy we poping it\n\t\t\twhile (!s.isEmpty() && s.peek() > c && k > 0) {\n\t\t\t\ts.pop();\n\t\t\t\tk--;\n\t\t\t}\n\t\t\t// only push if stack empty or curr is not \"0\"\n\t\t\t// bcz if stack is empty and 0 comes then have to skip 0,don''t push;\n\t\t\tif (!s.isEmpty() || c != '0')\n\t\t\t\ts.push(c);\n\t\t}\n\n\t\t// imagine a case 123,k=3\n\t\t// in it nothing will pop , no decline in no.s\n\t\t// but k is still same\n\t\t// so just pop from stack(from right side of string), stk already contain ele in\n\t\t// increasing order ex : 112 , k=1\n\t\twhile (!s.isEmpty() && k-- != 0) {\n\t\t\ts.pop();\n\t\t}\n\n\t\tif (s.isEmpty())\n\t\t\treturn \"0\";\n\n\t\tString res = \"\";\n\t\twhile (!s.isEmpty()) {\n\t\t\tres = s.pop() + res;\n\t\t}\n\n\t\treturn res;\n\n\t}\n\n}"
  },
  {
    "key": "Stack:Stack/NextGreaterElementToRight.java",
    "title": "Next Greater Element To Right",
    "slug": "next-greater-element-to-right",
    "topic": "Stack",
    "difficulty": "Medium",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Next Greater Element To Right using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/NextGreaterElementToRight.java",
    "sourceCode": "import java.util.Stack;\n\npublic class NextGreaterElementToRight {\n\n\t// Stand at every index and ask a question by yourself, can i be a next greater\n\t// element for the elements which i encounter so far(stack)\n\tpublic static int[] nextGreaterElement(int[] nums, int n) {\n\t\tint[] result = new int[n];\n\t\tStack<Integer> stack = new Stack<>();\n\n\t\tfor (int i = 0; i < n; i++) {\n\t\t\t// Simple logic if 4,5,6 is there, assume [4,5.. top] are in stack\n\t\t\t// so 6 > 5(top) it means 6 is next Greater element for 5, which so far we\n\t\t\t// passed through\n\t\t\twhile (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n\t\t\t\tint index = stack.pop();\n\t\t\t\tresult[index] = nums[i];\n\t\t\t}\n\t\t\tstack.push(i);\n\t\t}\n\n\t\t// For elements with no greater element to the right, mark them as -1.\n\t\twhile (!stack.isEmpty()) {\n\t\t\tint index = stack.pop();\n\t\t\tresult[index] = -1;\n\t\t}\n\n\t\treturn result;\n\n\t}\n\n\t// Daily temperatures\n\tpublic static int[] dailyTemperatures(int[] temperatures) {\n\t\tint n = temperatures.length;\n\t\tint[] result = new int[n];\n\t\tStack<Integer> stack = new Stack<>();\n\n\t\tfor (int i = 0; i < n; i++) {\n\t\t\twhile (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n\t\t\t\tint index = stack.pop();\n\t\t\t\tresult[index] = i - index;\n\t\t\t}\n\t\t\tstack.push(i);\n\t\t}\n\n\t\treturn result;\n\t}\n\n}"
  },
  {
    "key": "Stack:Stack/SimplifyPath.java",
    "title": "Simplify Path",
    "slug": "simplify-path",
    "topic": "Stack",
    "difficulty": "Medium",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Simplify Path using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/SimplifyPath.java",
    "sourceCode": "public class SimplifyPath {\n\n   public String simplifyPath(String path) {\n        Stack<String> s = new Stack<>();\n        StringBuilder res = new StringBuilder();\n        String[] p =path.split(\"/\");\n        \n        for(int i=0;i<p.length;i++){\n            if(!s.isEmpty()  && p[i].equals(\"..\")) s.pop();\n            else if(!p[i].equals(\"\") && !p[i].equals(\".\") && !p[i].equals(\"..\"))\n                s.push(p[i]);\n        }\n        \n        \n        if(s.isEmpty()) return \"/\";\n        while(!s.isEmpty()){\n            res.insert(0,s.pop()).insert(0,\"/\");\n        }\n        \n        return res.toString();\n    }\n\n}"
  },
  {
    "key": "Stack:Stack/ValidParenthesis.java",
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "topic": "Stack",
    "difficulty": "Easy",
    "tags": [
      "Stack",
      "Stack"
    ],
    "description": "Practice Valid Parentheses using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Stack/ValidParenthesis.java",
    "sourceCode": "public class ValidParenthesis {\n      public boolean isValid(String s) {\n        if(s==null||s.length()%2==1)\n            return false;\n        if(s.isEmpty())\n\t\t\treturn true;\n       Stack<Character> stack = new Stack<Character>();\n        for(char c:s.toCharArray()){\n            if(c=='(')\n                stack.push(')');\n            else if(c=='[')\n                stack.push(']');\n            else if(c=='{')\n                stack.push('}');\n            else \n                 if(stack.isEmpty()||stack.pop()!=c)\n                return false; \n        }\n        \n        return stack.isEmpty();  \n    }\n}"
  },
  {
    "key": "Strings:Strings/AtoIKMP.java",
    "title": "Ato IKMP",
    "slug": "ato-ikmp",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Ato IKMP using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/AtoIKMP.java",
    "sourceCode": "public class AtoIKMP {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/CompareVersionNumbers.java",
    "title": "Compare Version Numbers",
    "slug": "compare-version-numbers",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Compare Version Numbers using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/CompareVersionNumbers.java",
    "sourceCode": "public class CompareVersionNumbers {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/CountAndSay.java",
    "title": "Count And Say",
    "slug": "count-and-say",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Count And Say using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/CountAndSay.java",
    "sourceCode": "public class CountAndSay {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/EncodeAndDecodeStrings.java",
    "title": "Encode And Decode Strings",
    "slug": "encode-and-decode-strings",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Encode And Decode Strings using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/EncodeAndDecodeStrings.java",
    "sourceCode": "public class EncodeAndDecodeStrings {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/GroupAnagrams.java",
    "title": "Group Anagrams",
    "slug": "group-anagrams",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Group Anagrams using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/GroupAnagrams.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\n\npublic class GroupAnagrams {\n\n\tpublic List<List<String>> groupAnagrams(String[] strs) {\n\t\tHashMap<HashMap<Character, Integer>, ArrayList<String>> map = new HashMap<>();\n\n\t\tfor (String string : strs) {\n\n\t\t\tHashMap<Character, Integer> fmap = new HashMap<>();\n\t\t\tfor (char ch : string.toCharArray()) {\n\t\t\t\tfmap.put(ch, fmap.getOrDefault(ch, 0) + 1);\n\t\t\t}\n\n\t\t\tif (map.containsKey(fmap) == false) {\n\t\t\t\tArrayList<String> al = new ArrayList<>();\n\t\t\t\tal.add(string);\n\t\t\t\tmap.put(fmap, al);\n\t\t\t} else\n\t\t\t\tmap.get(fmap).add(string);\n\n\t\t}\n\n\t\tList<List<String>> result = new ArrayList<>();\n\t\tfor (ArrayList<String> arr : map.values()) {\n\t\t\tresult.add(arr);\n\t\t}\n\n\t\treturn result;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/Isomorphic.java",
    "title": "Isomorphic",
    "slug": "isomorphic",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Isomorphic using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/Isomorphic.java",
    "sourceCode": "public class Isomorphic {\n\t\n\t public boolean isIsomorphic(String s, String t) {\n\t        if(s.length() != t.length())\n\t            return false;\n\n\t        int[] map1 = new int[256];\n\t        int[] map2 = new int[256];\n\t       \n\t        for(int idx = 0; idx < s.length(); idx++){\n\t            if(map1[s.charAt(idx)] != map2[t.charAt(idx)])\n\t                return false;\n\t            map1[s.charAt(idx)] = idx + 1;\n\t            map2[t.charAt(idx)] = idx + 1;\n\t        }\n\t        return true;  \n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/LengthOfLastWord.java",
    "title": "Length Of Last Word",
    "slug": "length-of-last-word",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Length Of Last Word using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/LengthOfLastWord.java",
    "sourceCode": "public class LengthOfLastWord {\n\n\tpublic int lengthOfLastWord(String s) {\n\t\tint start;\n\t\tint end = s.length() - 1;\n\t\tfor (start = end; start >= 0; start--) {\n\t\t\tif (s.charAt(start) == ' ' && s.charAt(end) == ' ') {\n\t\t\t\tend--;\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\tif (s.charAt(start) == ' ')\n\t\t\t\tbreak;\n\t\t}\n\t\treturn end - start;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/LongestCommonPrefix.java",
    "title": "Longest Common Prefix",
    "slug": "longest-common-prefix",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Longest Common Prefix using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/LongestCommonPrefix.java",
    "sourceCode": "public class LongestCommonPrefix {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/LongestPalindromicSubstring.java",
    "title": "Longest Palindromic Substring",
    "slug": "longest-palindromic-substring",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Longest Palindromic Substring using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/LongestPalindromicSubstring.java",
    "sourceCode": "public class LongestPalindromicSubstring {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/MinInsertions.java",
    "title": "Min Insertions",
    "slug": "min-insertions",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Min Insertions using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/MinInsertions.java",
    "sourceCode": "public class MinInsertions {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/RansomNote.java",
    "title": "Ransom Note",
    "slug": "ransom-note",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Ransom Note using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/RansomNote.java",
    "sourceCode": "public class RansomNote {\n\tpublic boolean canConstruct(String ransomNote, String magazine) {\n\t\tif (ransomNote.length() > magazine.length())\n\t\t\treturn false;\n\t\tint[] alphabets_counter = new int[26];\n\n\t\tfor (char c : magazine.toCharArray())\n\t\t\talphabets_counter[c - 'a']++;\n\n\t\tfor (char c : ransomNote.toCharArray()) {\n\t\t\tif (alphabets_counter[c - 'a'] == 0)\n\t\t\t\treturn false;\n\t\t\talphabets_counter[c - 'a']--;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ReverseWordsInAString.java",
    "title": "Reverse Words In A String",
    "slug": "reverse-words-in-a-string",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Reverse Words In A String using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ReverseWordsInAString.java",
    "sourceCode": "public class ReverseWordsInAString {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/StringToInteger.java",
    "title": "String To Integer",
    "slug": "string-to-integer",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice String To Integer using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/StringToInteger.java",
    "sourceCode": "public class StringToInteger {\n\t\n\t\n/*\n * Leetcode : https://leetcode.com/problems/string-to-integer-atoi/description/\n * \n * \n * \n * */\t\n\t\n\t\n\t\npublic int myAtoi(String str) {\n        \n        final int len = str.length();\n        \n        if(len == 0){\n            return 0;\n        }\n        \n        int index = 0;\n        while(index < len && str.charAt(index) == ' '){\n            index++;\n        }\n        \n        if(index == len){\n            return 0;\n        }\n        \n        char ch;\n        boolean isNegative = (ch = str.charAt(index)) ==  '-';\n        \n        if(isNegative || ch == '+'){\n            ++index;\n        }\n            \n        final int maxLimit = Integer.MAX_VALUE / 10;\n        int result = 0;\n        while(index < len && isDigit(ch = str.charAt(index))){\n            \n            int digit = ch - '0';\n            \n            if(result > maxLimit || (result == maxLimit && digit > 7)){\n                return isNegative ? Integer.MIN_VALUE : Integer.MAX_VALUE;\n            }\n            \n            result = (result * 10) + digit;\n            \n            ++index;\n        }\n        \n        return isNegative ? -result : result;\n    }\n    \n    private boolean isDigit(char ch){\n        return ch >= '0' && ch <= '9';\n    }\n\t\n\t\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/TextJustification.java",
    "title": "Text Justification",
    "slug": "text-justification",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Text Justification using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/TextJustification.java",
    "sourceCode": "public class TextJustification {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ValidAnagram.java",
    "title": "Valid Anagram",
    "slug": "valid-anagram",
    "topic": "Strings",
    "difficulty": "Easy",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Valid Anagram using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ValidAnagram.java",
    "sourceCode": "public class ValidAnagram {\n\n\tpublic boolean isAnagram(String s, String t) {\n\n\t\t// Ascii value of a is 97, so, if we take a string abcdef\n\t\t// so how we get the indexs is\n\t\t/*\n\t\t * a-'a' = 97-97=0 exact index numbers think them as alphabets 0 - a b-'a' =\n\t\t * 98-97=1 c-'a' = 99-97=2\n\t\t * \n\t\t * but for A, ascii value is 'A' A- 'A' = 65-65 B -'A' = 66 -65\n\t\t * \n\t\t */\n\n\t\tif (s.length() != t.length())\n\t\t\treturn false;\n\t\tint[] count = new int[26];\n\t\tfor (int i = 0; i < s.length(); i++) {\n\t\t\tcount[s.charAt(i) - 'a']++;\n\t\t\tcount[t.charAt(i) - 'a']--;\n\t\t}\n\t\tfor (int i : count) {\n\t\t\tif (i != 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ValidateIPAddress.java",
    "title": "Validate IP Address",
    "slug": "validate-ip-address",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Validate IP Address using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ValidateIPAddress.java",
    "sourceCode": "public class ValidateIPAddress {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ValidPalindrome.java",
    "title": "Valid Palindrome",
    "slug": "valid-palindrome",
    "topic": "Strings",
    "difficulty": "Easy",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Valid Palindrome using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ValidPalindrome.java",
    "sourceCode": "public class ValidPalindrome {\n\n\tpublic boolean isPalindrome(String s) {\n\t\tif (s.isEmpty()) {\n\t\t\treturn true;\n\t\t}\n\n\t\tint leftPtr = 0;\n\t\tint rightPtr = s.length() - 1;\n\n\t\twhile (leftPtr < rightPtr) {\n\t\t\tchar a = s.charAt(leftPtr);\n\t\t\tchar b = s.charAt(rightPtr);\n\n\t\t\t// if it is not a character, move forward\n\t\t\tif (!Character.isLetterOrDigit(a))\n\t\t\t\tleftPtr++;\n\t\t\telse if (!Character.isLetterOrDigit(b))\n\t\t\t\trightPtr--;\n\t\t\telse {\n\t\t\t\tif (Character.toLowerCase(a) != Character.toLowerCase(b))\n\t\t\t\t\treturn false;\n\t\t\t\tleftPtr++;\n\t\t\t\trightPtr--;\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ValidPalindromeII.java",
    "title": "Valid Palindrome II",
    "slug": "valid-palindrome-ii",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Valid Palindrome II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ValidPalindromeII.java",
    "sourceCode": "public class ValidPalindromeII {\n\n\tboolean isValidPalindrome(String s, int left, int right, boolean isCharacterDeleted) {\n\t\twhile (left < right) {\n\t\t\tif (s.charAt(left) != s.charAt(right)) {\n\t\t\t\tif (isCharacterDeleted)\n\t\t\t\t\treturn false;\n\t\t\t\treturn isValidPalindrome(s, left + 1, right, true) || isValidPalindrome(s, left, right - 1, true);\n\t\t\t}\n\t\t\tleft++;\n\t\t\tright--;\n\t\t}\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Strings:Strings/ZigZagConversion.java",
    "title": "Zig Zag Conversion",
    "slug": "zig-zag-conversion",
    "topic": "Strings",
    "difficulty": "Medium",
    "tags": [
      "Strings",
      "Strings"
    ],
    "description": "Practice Zig Zag Conversion using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Strings/ZigZagConversion.java",
    "sourceCode": "import java.util.Arrays;\n\npublic class ZigZagConversion {\n\n\tpublic String convert(String s, int n) {\n\t\tif (n == 1)\n\t\t\treturn s;\n\n\t\tStringBuilder result = new StringBuilder();\n\n\t\tfor (int rowNum = 0; rowNum < n; rowNum++) {\n\t\t\tint i = rowNum;\n\t\t\tboolean up = true;\n\n\t\t\twhile (i < s.length()) {\n\t\t\t\tresult = result.append(s.charAt(i));\n\t\t\t\tif (rowNum == 0 || rowNum == n - 1) {\n\t\t\t\t\ti += (2 * n - 2);\n\t\t\t\t} else {\n\t\t\t\t\tif (up) {\n\t\t\t\t\t\ti += (2 * (n - rowNum) - 2);\n\t\t\t\t\t} else {\n\t\t\t\t\t\ti += rowNum * 2;\n\t\t\t\t\t}\n\t\t\t\t\tup = up ^ true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn result.toString();\n\t}\n\t\n\t public String convert1(String s, int n) {\n\t        if(n==1)\n\t          return s;\n\n\t        String[] str = new String[n];\n\t        Arrays.fill(str,\"\");    \n\t  \n\t        int row=0;\n\t        boolean down=true;\n\t      \n\t        for(char ch: s.toCharArray()){\n\t            str[row]+=ch;\n\t            if(row==n-1)\n\t               down=false;\n\t            else if(row==0)\n\t               down=true;\n\n\t            if(down)\n\t              row++;\n\t            else\n\t              row--;   \n\t        }  \n\n\t       String result=\"\";\n\t        for(int i=0;i<n;i++){\n\t             result+=str[i];\n\t        }\n\t     return result;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/AverageOfLevelsInBT_BFS.java",
    "title": "Average Of Levels In BT BFS",
    "slug": "average-of-levels-in-bt-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Average Of Levels In BT BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/AverageOfLevelsInBT_BFS.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/average-of-levels-in-binary-tree/\n * \n * */\n\n\npublic class AverageOfLevelsInBT_BFS {\n\t\n\t public List < Double > averageOfLevels(TreeNode root) {\n\t        List < Double > res = new ArrayList < > ();\n\t        Queue < TreeNode > queue = new LinkedList < > ();\n\t        queue.add(root);\n\t        while (!queue.isEmpty()) {\n\t            long sum = 0, count = 0;\n\t            Queue < TreeNode > temp = new LinkedList < > ();\n\t            while (!queue.isEmpty()) {\n\t                TreeNode n = queue.remove();\n\t                sum += n.val;\n\t                count++;\n\t                if (n.left != null)\n\t                    temp.add(n.left);\n\t                if (n.right != null)\n\t                    temp.add(n.right);\n\t            }\n\t            queue = temp;\n\t            res.add(sum * 1.0 / count);\n\t        }\n\t        return res;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/CousinsInBinaryTree_BFS.java",
    "title": "Cousins In Binary Tree BFS",
    "slug": "cousins-in-binary-tree-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Cousins In Binary Tree BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/CousinsInBinaryTree_BFS.java",
    "sourceCode": "import java.util.LinkedList;\nimport java.util.Queue;\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/cousins-in-binary-tree/\n * \n * */\n\n\n\npublic class CousinsInBinaryTree_BFS {\n\t\n\t public boolean isCousins(TreeNode root, int x, int y) {\n\t        Queue<TreeNode> queue = new LinkedList<>();\n\t        queue.offer(root);\n\t        while(!queue.isEmpty()) {\n\t            TreeNode parentX = null, parentY = null;\n\t            int size = queue.size();\n\t            for(int i = 0; i < size; i++) {\n\t                root = queue.poll();\n\t                if(root.left != null) {\n\t                    if(root.left.val == x) \n\t                        parentX = root;\n\t                    else if(root.left.val == y) \n\t                        parentY = root;\n\t                    queue.offer(root.left);\n\t                }\n\t                if(root.right != null) {\n\t                    if(root.right.val == x) \n\t                        parentX = root;\n\t                    else if(root.right.val == y) \n\t                        parentY = root;\n\t                    queue.offer(root.right);\n\t                }\n\t            }\n\t            if(parentX != null && parentY != null) \n\t                return parentX != parentY;\n\t            if(parentX != null || parentY != null) \n\t                return false;\n\t        }\n\t        return false;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/LevelOrderTraversal_BFS.java",
    "title": "Level Order Traversal BFS",
    "slug": "level-order-traversal-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Level Order Traversal BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/LevelOrderTraversal_BFS.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/binary-tree-level-order-traversal/\n *  same as above : https://leetcode.com/problems/binary-tree-level-order-traversal-ii/\n * \n * GFG Article : https://www.geeksforgeeks.org/level-order-tree-traversal/\n * */\n\n\n\npublic class LevelOrderTraversal_BFS {\n    \n\tpublic List<List<Integer>> levelOrder(TreeNode root) {\n\n\t\tList<List<Integer>> sol = new ArrayList<>();\n\t\tif (root == null)\n\t\t\treturn sol;\n\t\tQueue<TreeNode> queue = new LinkedList<>();\n\t\tqueue.add(root);\n\t\twhile (!queue.isEmpty()) {\n\t\t\tList<Integer> temp = new ArrayList<>();\n\t\t\tint queueSize = queue.size();\n\t\t\tfor (int i = 0; i < queueSize; i++) {\n\n\t\t\t\tTreeNode node = queue.poll();\n\t\t\t\tif (node != null) {\n\t\t\t\t\tif (node.left != null)\n\t\t\t\t\t\tqueue.add(node.left);\n\t\t\t\t\tif (node.right != null)\n\t\t\t\t\t\tqueue.add(node.right);\n\t\t\t\t\ttemp.add(node.val);\n\t\t\t\t}\n\t\t\t}\n\t\t\tsol.add(temp);\n\n\t\t}\n\t\treturn sol;\n\n\t}\n\t\n\t\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/MaximumDepthOfATree_BFS.java",
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Maximum Depth of Binary Tree using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/MaximumDepthOfATree_BFS.java",
    "sourceCode": "import java.util.LinkedList;\nimport java.util.Queue;\n\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/maximum-depth-of-binary-tree/\n * */\n\npublic class MaximumDepthOfATree_BFS {\n\t\n\tpublic int maxDepth(TreeNode root) {\n\t\tif (root == null)\n\t\t\treturn 0;\n\n\t\tQueue<TreeNode> queue = new LinkedList<>();\n\n\t\tqueue.add(root);\n\t\tint level = 1;\n\t\twhile (!queue.isEmpty()) {\n\t\t\tint size = queue.size();\n\t\t\tfor (int i = 0; i < size; i++) {\n\t\t\t\tTreeNode node = queue.poll();\n\t\t\t\tif (node.left != null)\n\t\t\t\t\tqueue.add(node.left);\n\t\t\t\tif (node.right != null)\n\t\t\t\t\tqueue.add(node.right);\n\t\t\t}\n\t\t\tif (queue.size() == 0) {\n\t\t\t\treturn level;\n\t\t\t}\n\n\t\t\tlevel++;\n\t\t}\n\t\treturn level;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/MinimumDepthOfATree_BFS.java",
    "title": "Minimum Depth Of A Tree BFS",
    "slug": "minimum-depth-of-a-tree-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Minimum Depth Of A Tree BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/MinimumDepthOfATree_BFS.java",
    "sourceCode": "import java.util.LinkedList;\nimport java.util.Queue;\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/minimum-depth-of-binary-tree/\n * */\n\n\npublic class MinimumDepthOfATree_BFS {\n\t\n\tpublic int minDepth(TreeNode root) {\n\t    if(root == null) return 0;\n\t    int depth = 1;\n\t    Queue<TreeNode> q = new LinkedList<TreeNode>();\n\t    q.offer(root);\n\t    while(!q.isEmpty()){\n\t        int size = q.size();\n\t        // for each level\n\t        for(int i=0;i<size;i++){\n\t            TreeNode node = q.poll();\n\t            if(node.left == null && node.right == null){\n\t                return depth;\n\t            }\n\t            if(node.left != null){\n\t                q.offer(node.left);\n\t            }\n\t            if(node.right != null){\n\t                q.offer(node.right);\n\t            }\n\t        }\n\t        depth++;\n\t    }\n\t    return depth;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/N_Array_BFS.java",
    "title": "N Array BFS",
    "slug": "n-array-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice N Array BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/N_Array_BFS.java",
    "sourceCode": "import java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link : https://leetcode.com/problems/n-ary-tree-level-order-traversal/\n * \n * */\n\npublic class N_Array_BFS {\n\t\n\tclass Node {\n\t    public int val;\n\t    public List<Node> children;\n\n\t    public Node() {}\n\n\t    public Node(int _val) {\n\t        val = _val;\n\t    }\n\n\t    public Node(int _val, List<Node> _children) {\n\t        val = _val;\n\t        children = _children;\n\t    }\n\t}\n\t\n\t public List<List<Integer>> levelOrder(Node root) {\n         List<List<Integer>> ret = new LinkedList<>();\n        \n        if (root == null) \n            return ret;\n        \n        Queue<Node> queue = new LinkedList<>();\n        queue.offer(root);\n        \n        while (!queue.isEmpty()) {\n            List<Integer> curLevel = new LinkedList<>();\n            int len = queue.size();\n            for (int i = 0; i < len; i++) {\n                Node curr = queue.poll();\n                curLevel.add(curr.val);\n                for (Node c : curr.children)\n                    queue.offer(c);\n            }\n            ret.add(curLevel);\n        }\n        \n        return ret;\n    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Trees:Trees/ZigZag_BFS.java",
    "title": "Zig Zag BFS",
    "slug": "zig-zag-bfs",
    "topic": "Trees",
    "difficulty": "Medium",
    "tags": [
      "Trees",
      "Trees"
    ],
    "description": "Practice Zig Zag BFS using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/Trees/ZigZag_BFS.java",
    "sourceCode": "import java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\n/*\n * \n * TimeComplexity :  O(n)\n * SpaceComplexity : O(n)\n * \n * where n is the no of nodes in the given tree\n * \n * Problem Link :https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/\n\n * */\n\npublic class ZigZag_BFS {\n\t\n\tpublic List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n        List<List<Integer>> result = new LinkedList<>();\n       if(root==null){\n           return result;\n       }\n       Queue<TreeNode> queue = new LinkedList<>();\n       queue.add(root);\n       boolean odd=true;\n       while(!queue.isEmpty()) {\n          int size = queue.size();\n          LinkedList<Integer> res = new LinkedList<>();\n          for(int i=1;i<=size;i++){\n              TreeNode node = queue.poll();\n              if(odd){\n                  res.add(node.val);   \n              } else {\n                  res.add(0,node.val);\n              }\n              if(node.left!=null) {\n                      queue.add(node.left);\n              }\n           if(node.right!=null){\n                       queue.add(node.right);\n                  }\n              \n          }\n           result.add(res);\n           odd=!odd;\n       }\n       return result;\n   }\n\t\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ContainerWithMostWater.java",
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Container With Most Water using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ContainerWithMostWater.java",
    "sourceCode": "/**\n * \n * @author saiteja\n *  https://leetcode.com/problems/container-with-most-water\n */\n\n\npublic class ContainerWithMostWater {\n\n//  public int maxArea(int[] height) {\n//  //O(n^2) solution, where we take one left, check with every right and ask which is giving the max combination of area\n\n//  int result = 0;\n//  int len = height.length-1;\n//  for(int i=0;i<len;i++){\n//      for(int j=i+1;j<len;j++){\n//          int area = (j-i) * Math.min(height[i],height[j]);\n//          result = Math.max(area, result);\n\n//      }\n//  }\n//  return result;\n//}\n\n\tpublic int maxArea(int[] height) {\n\t\t// O(n) solution,\n\n\t\tint result = 0;\n\t\tint i = 0;\n\t\tint j = height.length - 1;\n\n\t\twhile (i < j) {\n\t\t\tint area = (j - i) * Math.min(height[i], height[j]);\n\t\t\tresult = Math.max(area, result);\n\n\t\t\tif (height[i] < height[j])\n\t\t\t\ti++;\n\t\t\telse\n\t\t\t\tj--;\n\n\t\t}\n\t\treturn result;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/FindIndexOfFirstOccurenceOfString.java",
    "title": "Find the Index of the First Occurrence in a String",
    "slug": "find-the-index-of-the-first-occurrence-in-a-string",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Find the Index of the First Occurrence in a String using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/FindIndexOfFirstOccurenceOfString.java",
    "sourceCode": "/**\n * \n * @author saiteja\n * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/\n */\n\npublic class FindIndexOfFirstOccurenceOfString {\n\n\tpublic int strStr(String haystack, String needle) {\n\t\tif (haystack.length() < needle.length())\n\t\t\treturn -1;\n\t\tfor (int i = 0; i < haystack.length() - needle.length() + 1; i++) {\n\t\t\tif (haystack.charAt(i) == needle.charAt(0)) {\n\t\t\t\tif (haystack.substring(i, i + needle.length()).equals(needle)) {\n\t\t\t\t\treturn i;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/FindKDiffPairs.java",
    "title": "Find K Diff Pairs",
    "slug": "find-k-diff-pairs",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Find K Diff Pairs using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/FindKDiffPairs.java",
    "sourceCode": "import java.util.Arrays;\n\n\n/*\n * https://leetcode.com/problems/k-diff-pairs-in-an-array/description/\n * \n */\n\npublic class FindKDiffPairs {\n\t\n\t\n//\t if(B<0)\n//         B=-B;\n//\n//       int i=0, j=1;\n//       int len = A.size();\n//       while(j<len){\n//           int diff = A.get(j)-A.get(i);\n//          \n//\n//            if(i!=j&&diff==B){\n//              return 1;\n//            }\n//            else if(diff>B)\n//               i++;\n//            else\n//               j++;   \n//\n//       }\n//       return 0;\n\n\n\tpublic int findPairs(int[] nums, int k) {\n\t\tArrays.sort(nums);\n\t\tint left = 0;\n\t\tint right = 1;\n\t\tint count = 0;\n\n\t\twhile (left < nums.length && right < nums.length) {\n\n\t\t\t// skip duplicate element\n\t\t\tif (left > 0 && nums[left - 1] == nums[left]) {\n\t\t\t\tleft++;\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tif (left == right) {\n\t\t\t\tright++;\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tint diff = nums[right] - nums[left];\n\t\t\tif (diff == k) {\n\t\t\t\tcount++;\n\t\t\t\tleft++;\n\t\t\t} else if (diff < k) {\n\t\t\t\tright++;\n\t\t\t} else {\n\t\t\t\tleft++;\n\t\t\t}\n\t\t}\n\t\treturn count;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/FourSum.java",
    "title": "Four Sum",
    "slug": "four-sum",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Four Sum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/FourSum.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\n/**\n * \n * https://leetcode.com/problems/4sum/description/\n * @author saite\n *\n */\n\npublic class FourSum {\n\n\tpublic List<List<Integer>> fourSum(int[] nums, int target) {\n\n\t\tList<List<Integer>> ans = new ArrayList<>();\n\n\t\tArrays.sort(nums);\n\n\t\tint n = nums.length;\n\n\t\tfor (int i = 0; i < n - 3; i++) {\n\t\t\tif (i > 0 && nums[i] == nums[i - 1])\n\t\t\t\tcontinue;\n\n\t\t\tfor (int j = i + 1; j < n - 2; j++) {\n\t\t\t\tif (j > i + 1 && nums[j] == nums[j - 1])\n\t\t\t\t\tcontinue;\n\n\t\t\t\tint targetSum = target - (nums[i] + nums[j]);\n\t\t\t\tint low = j + 1;\n\t\t\t\tint high = n - 1;\n\t\t\t\twhile (low < high) {\n\t\t\t\t\tif (nums[low] + nums[high] == targetSum) {\n\t\t\t\t\t\tList<Integer> temp = new ArrayList();\n\t\t\t\t\t\ttemp.add(nums[i]);\n\t\t\t\t\t\ttemp.add(nums[j]);\n\t\t\t\t\t\ttemp.add(nums[low]);\n\t\t\t\t\t\ttemp.add(nums[high]);\n\t\t\t\t\t\tans.add(temp);\n\t\t\t\t\t\twhile (low < high && nums[low] == nums[low + 1])\n\t\t\t\t\t\t\tlow++;\n\t\t\t\t\t\twhile (low < high && nums[high] == nums[high - 1])\n\t\t\t\t\t\t\thigh--;\n\n\t\t\t\t\t\tlow++;\n\t\t\t\t\t\thigh--;\n\t\t\t\t\t} else if (nums[low] + nums[high] < targetSum)\n\t\t\t\t\t\tlow++;\n\t\t\t\t\telse\n\t\t\t\t\t\thigh--;\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\t\treturn ans;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/FourSum_II.java",
    "title": "Four Sum II",
    "slug": "four-sum-ii",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Four Sum II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/FourSum_II.java",
    "sourceCode": "import java.util.Arrays;\nimport java.util.HashMap;\n\n/**\n * \n * https://leetcode.com/problems/4sum-ii/description/\n * @author saite\n *\n */\n\npublic class FourSum_II {\n\t\n//\t  public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {\n//\t        var pairCountBySum = new HashMap<Integer, Integer>();\n//\t\t\n//\t\tArrays.stream(nums1)\n//\t          .forEach(num1 -> Arrays.stream(nums2)\n//\t\t\t  .forEach(num2 -> pairCountBySum.compute(num1 + num2, (k, sumCount) -> sumCount == null ? 1 : ++sumCount)));\n//\t\t\t  \n//\t\treturn Arrays.stream(nums3)\n//\t\t\t\t\t .map(num3 -> Arrays.stream(nums4).map(num4 -> pairCountBySum.getOrDefault(-(num3 + num4), 0)).sum())\n//\t\t\t\t\t .sum();\n//\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ImplementStrStr.java",
    "title": "Implement Str Str",
    "slug": "implement-str-str",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Implement Str Str using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ImplementStrStr.java",
    "sourceCode": "public class ImplementStrStr {\n\n\tpublic int strStr(String haystack, String needle) {\n\t\tif (haystack.length() < needle.length())\n\t\t\treturn -1;\n\t\tfor (int i = 0; i < haystack.length() - needle.length() + 1; i++) {\n\t\t\tif (haystack.charAt(i) == needle.charAt(0)) {\n\t\t\t\tif (haystack.substring(i, i + needle.length()).equals(needle)) {\n\t\t\t\t\treturn i;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/IntersectionOfTwoArrays.java",
    "title": "Intersection Of Two Arrays",
    "slug": "intersection-of-two-arrays",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Intersection Of Two Arrays using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/IntersectionOfTwoArrays.java",
    "sourceCode": "public class IntersectionOfTwoArrays {\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/MaxConsecutiveOnes.java",
    "title": "Max Consecutive Ones",
    "slug": "max-consecutive-ones",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Max Consecutive Ones using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/MaxConsecutiveOnes.java",
    "sourceCode": "/**\n * \n * \n * @author saiteja\n *         https://leetcode.com/problems/max-consecutive-ones/description/\n */\n\npublic class MaxConsecutiveOnes {\n\n\tpublic int findMaxConsecutiveOnes(int[] nums) {\n\t\tint count = 0, i = 0;\n\n\t\tint maxCount = Integer.MIN_VALUE;\n\n\t\twhile (i < nums.length) {\n\t\t\tif (nums[i] == 1)\n\t\t\t\tcount++;\n\t\t\telse\n\t\t\t\tcount = 0;\n\n\t\t\tmaxCount = Math.max(maxCount, count);\n\n\t\t\ti++;\n\t\t}\n\t\treturn maxCount;\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/MergeSortedArray.java",
    "title": "Merge Sorted Array",
    "slug": "merge-sorted-array",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Merge Sorted Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/MergeSortedArray.java",
    "sourceCode": "/**\n * \n * \n * @author saiteja \n * https://leetcode.com/problems/merge-sorted-array/description/\n */\n\npublic class MergeSortedArray {\n\n\tpublic void merge(int[] nums1, int m, int[] nums2, int n) {\n\n\t\tint i1 = m - 1; // pointer for last element in nums1\n\t\tint i2 = n - 1; // pointer for last element in nums2\n\n\t\t// Loop through the arrays, from last element to first\n\t\twhile (i1 >= 0 && i2 >= 0) {\n\t\t\tif (nums1[i1] >= nums2[i2]) {\n\t\t\t\tnums1[i1 + i2 + 1] = nums1[i1--];\n\t\t\t} else {\n\t\t\t\tnums1[i1 + i2 + 1] = nums2[i2--];\n\t\t\t}\n\t\t}\n\n\t\t// Copy in the remaining elements\n\t\twhile (i2 >= 0) {\n\t\t\tnums1[i2] = nums2[i2--];\n\t\t}\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/MoveZeros.java",
    "title": "Move Zeros",
    "slug": "move-zeros",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Move Zeros using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/MoveZeros.java",
    "sourceCode": "/**\n * \n * \n * \n * @author saiteja \n * https://leetcode.com/problems/move-zeroes/\n *\n */\npublic class MoveZeros {\n\n\tpublic void moveZeroes(int[] nums) {\n\t\tint right = 0;\n\t\tint left = 0;\n\t\twhile (left < nums.length) {\n\t\t\tif (nums[left] != 0) {\n\t\t\t\tint temp = nums[left];\n\t\t\t\tnums[left] = nums[right];\n\t\t\t\tnums[right] = temp;\n\t\t\t\tright++;\n\t\t\t}\n\t\t\tleft++;\n\t\t}\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/PartitionLabels.java",
    "title": "Partition Labels",
    "slug": "partition-labels",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Partition Labels using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/PartitionLabels.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.List;\n\n\n\n/**\n * \n * \n * @author saiteja \n * https://leetcode.com/problems/partition-labels\n *\n */\n\n\npublic class PartitionLabels {\n\n\tpublic List<Integer> partitionLabels(String s) {\n\n\t\tint[] lastIndex = new int[26];\n\t\tfor (int i = 0; i < s.length(); i++)\n\t\t\tlastIndex[s.charAt(i) - 'a'] = i;\n\n\t\tList<Integer> ans = new ArrayList<>();\n\t\tint leftPtr = 0;\n\n\t\tint previousCutPoint = 0;\n\n\t\tfor (int rightPtr = 0; rightPtr < s.length(); ++rightPtr) {\n\n\t\t\tleftPtr = Math.max(leftPtr, lastIndex[s.charAt(rightPtr) - 'a']);\n\n\t\t\tif (rightPtr == leftPtr) {\n\t\t\t\tans.add(rightPtr - previousCutPoint + 1);\n\t\t\t\tpreviousCutPoint = rightPtr + 1;\n\t\t\t}\n\t\t}\n\n\t\treturn ans;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/RemoveDuplicatesFromSortedArrayIAndII.java",
    "title": "Remove Duplicates From Sorted Array I And II",
    "slug": "remove-duplicates-from-sorted-array-i-and-ii",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Remove Duplicates From Sorted Array I And II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/RemoveDuplicatesFromSortedArrayIAndII.java",
    "sourceCode": "/**\n * \n * @author saiteja\n * https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/\n * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/\n *\n */\n\npublic class RemoveDuplicatesFromSortedArrayIAndII {\n\n\tpublic int removeDuplicatesII(int[] nums) {\n\t\tint i = 2;\n\t\tint j = 2;\n\n\t\tif (nums.length < 3)\n\t\t\treturn nums.length;\n\n\t\twhile (j < nums.length) {\n\t\t\tif (nums[i - 2] != nums[j])\n\t\t\t\tnums[i++] = nums[j];\n\t\t\tj++;\n\t\t}\n\n\t\treturn i;\n\t}\n\n\tpublic int removeDuplicatesI(int[] nums) {\n\t\t// Core logic, whenever we find the duplicate elem, search for the next elem\n\t\t// which is not equal and update it\n\t\tint i = 0;\n\t\tint j = 1;\n\n\t\twhile (j < nums.length) {\n\t\t\tif (nums[i] != nums[j])\n\t\t\t\tnums[++i] = nums[j++];\n\t\t\telse\n\t\t\t\tj++;\n\t\t}\n\n\t\treturn (i + 1);\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/RemoveElement.java",
    "title": "Remove Element",
    "slug": "remove-element",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Remove Element using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/RemoveElement.java",
    "sourceCode": "/**\n * \n * \n * @author saiteja https://leetcode.com/problems/remove-element/description/\n */\npublic class RemoveElement {\n\n\tpublic int removeElement(int[] nums, int val) {\n\t\tint left = 0;\n\t\tint right = nums.length - 1;\n\n\t\twhile (left <= right) {\n\n\t\t\t// both are same from both ends,we cann't move left ptrs,\n\t\t\tif (nums[left] == val && nums[right] == val)\n\t\t\t\tright--;\n\t\t\telse if (nums[left] == val && nums[right] != val)\n\t\t\t\tnums[left++] = nums[right--];\n\t\t\telse\n\t\t\t\tleft++;\n\t\t}\n\n\t\treturn left;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/RemoveNthNodeFromEndOfList.java",
    "title": "Remove Nth Node From End Of List",
    "slug": "remove-nth-node-from-end-of-list",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Remove Nth Node From End Of List using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/RemoveNthNodeFromEndOfList.java",
    "sourceCode": "/**\n * \n * @author saiteja\n *         https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/\n */\n\npublic class RemoveNthNodeFromEndOfList {\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ReverseWordsInAString.java",
    "title": "Reverse Words In A String",
    "slug": "reverse-words-in-a-string",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Reverse Words In A String using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ReverseWordsInAString.java",
    "sourceCode": "/*\n * \n * https://leetcode.com/problems/reverse-words-in-a-string/description/\n */\n\npublic class ReverseWordsInAString {\n\n\tpublic String reverseWords(String s) {\n\t\tString result = \"\";\n\t\tint i = 0;\n\t\tint n = s.length();\n\t\twhile (i < n) {\n\t\t\t// if there spaces, we move forward\n\t\t\twhile (i < n && s.charAt(i) == ' ')\n\t\t\t\ti++;\n\t\t\tif (i >= n)\n\t\t\t\tbreak;\n\t\t\t// if there are no spaces, try to move forward\n\t\t\tint j = i + 1;\n\t\t\twhile (j < n && s.charAt(j) != ' ')\n\t\t\t\tj++;\n\n\t\t\tString word = s.substring(i, j);\n\t\t\tresult = result.isEmpty() ? word : word + \" \" + result;\n\t\t\t// continue the process for rest of the string\n\t\t\ti = j + 1;\n\t\t}\n\t\treturn result;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/RotateArray.java",
    "title": "Rotate Array",
    "slug": "rotate-array",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Rotate Array using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/RotateArray.java",
    "sourceCode": "/**\n * \n * @author saiteja https://leetcode.com/problems/rotate-array/\n */\n\npublic class RotateArray {\n\n\tpublic void swap(int[] nums, int low, int high) {\n\n\t\twhile (low < high) {\n\t\t\tint temp = nums[low];\n\t\t\tnums[low] = nums[high];\n\t\t\tnums[high] = temp;\n\t\t\tlow++;\n\t\t\thigh--;\n\t\t}\n\n\t}\n\n\tpublic void rotate(int[] nums, int k) {\n\t\t// if suppose array size is 4, k=5, k =5%4=1, we only need to rotate right\n\t\tint n = nums.length;\n\t\tk = k % n;\n\n\t\tswap(nums, 0, n - k - 1);\n\t\tswap(nums, n - k, n - 1);\n\t\tswap(nums, 0, n - 1);\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/SortColors.java",
    "title": "Sort Colors",
    "slug": "sort-colors",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Sort Colors using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/SortColors.java",
    "sourceCode": "/**\n * \n * \n * @author saiteja https://leetcode.com/problems/sort-colors/\n */\n\npublic class SortColors {\n\n\tpublic void sortColors(int[] nums) {\n\t\tint movingPtr = 0; // it always keep traks of 1,\n\t\tint leftPtr = 0; // if moving ptrs encounters 1, assing it to left and both move ahead\n\t\tint rightPtr = nums.length - 1; // if moving ptrs encounters 2, only decrease right, kept move\n\n\t\twhile (movingPtr <= rightPtr) {\n\n\t\t\tif (nums[movingPtr] == 1)\n\t\t\t\tmovingPtr++;\n\t\t\telse if (nums[movingPtr] == 0) {\n\t\t\t\tint temp = nums[movingPtr];\n\t\t\t\tnums[movingPtr++] = nums[leftPtr];\n\t\t\t\tnums[leftPtr++] = temp;\n\t\t\t} else if (nums[movingPtr] == 2) {\n\t\t\t\tint temp = nums[movingPtr];\n\t\t\t\tnums[movingPtr] = nums[rightPtr];\n\t\t\t\tnums[rightPtr--] = temp;\n\t\t\t}\n\t\t}\n\n\t}\n\n\tpublic static void main(String[] args) {\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/StringCompression.java",
    "title": "String Compression",
    "slug": "string-compression",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice String Compression using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/StringCompression.java",
    "sourceCode": "public class StringCompression {\n\t\n\t  public int compress(char[] chars) {\n\t        int n = chars.length;\n\t        int i = 0, j = 0;\n\t        while (i < n) {\n\t            int count = 1;\n\t            while (i + 1 < n && chars[i] == chars[i + 1]) {\n\t                i++;\n\t                count++;\n\t            }\n\t            chars[j] = chars[i];\n\t            j++;\n\t            if (count > 1) {\n\t                String countStr = String.valueOf(count);\n\t                for (int k = 0; k < countStr.length(); k++) {\n\t                    chars[j] = countStr.charAt(k);\n\t                    j++;\n\t                }\n\t            }\n\t            i++;\n\t        }\n\t        return j;\n\t    }\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ThreeSum.java",
    "title": "3Sum",
    "slug": "3sum",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice 3Sum using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ThreeSum.java",
    "sourceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\n\n/*\n * \n * https://leetcode.com/problems/3sum/description/\n */\n\npublic class ThreeSum {\n\n\tpublic List<List<Integer>> threeSum(int[] nums) {\n\t\tList<List<Integer>> ans = new ArrayList<>();\n\t\tif (nums.length == 0)\n\t\t\treturn ans;\n\t\tArrays.sort(nums);\n\n\t\t// A+B+C =0 ==> +A-(B+C)=0 or -A+(B+C)=0 , so if we have one negative or\n\t\t// positive with us, will check for other\n\t\tfor (int i = 0; i < nums.length - 2; i++) {\n\t\t\tif (i == 0 || (i > 0 && nums[i] != nums[i - 1])) {\n\t\t\t\tint a = -nums[i];\n\t\t\t\tint low = i + 1;\n\t\t\t\tint high = nums.length - 1;\n\t\t\t\twhile (low < high) {\n\t\t\t\t\tint currSum = nums[low] + nums[high];\n\t\t\t\t\tif (currSum > a)\n\t\t\t\t\t\thigh--;\n\t\t\t\t\telse if (currSum < a)\n\t\t\t\t\t\tlow++;\n\t\t\t\t\telse {\n\t\t\t\t\t\tList<Integer> temp = new ArrayList<>();\n\t\t\t\t\t\ttemp.add(nums[i]);\n\t\t\t\t\t\ttemp.add(nums[low++]);\n\t\t\t\t\t\ttemp.add(nums[high--]);\n\t\t\t\t\t\tans.add(temp);\n\n\t\t\t\t\t\twhile (low < high && nums[low] == nums[low - 1])\n\t\t\t\t\t\t\tlow++;\n\t\t\t\t\t\twhile (high > low && nums[high] == nums[high + 1])\n\t\t\t\t\t\t\thigh--;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn ans;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ThreeSumClosest.java",
    "title": "Three Sum Closest",
    "slug": "three-sum-closest",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Three Sum Closest using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ThreeSumClosest.java",
    "sourceCode": "import java.util.Arrays;\n\n\n/*\n * \n * https://leetcode.com/problems/3sum-closest/description/\n */\n\npublic class ThreeSumClosest {\n\n\tpublic int threeSumClosest(int[] nums, int target) {\n\t\tArrays.sort(nums);\n\n\t\tlong closest = Integer.MAX_VALUE;\n\n\t\tfor (int i = 0; i < nums.length - 2; i++) {\n\n\t\t\tint p1 = i + 1;\n\t\t\tint p2 = nums.length - 1;\n\n\t\t\twhile (p1 < p2) {\n\n\t\t\t\tint sum = nums[i] + nums[p1] + nums[p2];\n\n\t\t\t\tif (Math.abs(sum - target) < Math.abs(closest - target))\n\t\t\t\t\tclosest = sum;\n\n\t\t\t\tif (sum < target)\n\t\t\t\t\tp1++;\n\t\t\t\telse\n\t\t\t\t\tp2--;\n\n\t\t\t}\n\n\t\t}\n\n\t\treturn (int) closest;\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/TrappingRainWater.java",
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "topic": "Two Pointers",
    "difficulty": "Hard",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Trapping Rain Water using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/TrappingRainWater.java",
    "sourceCode": "/**\n * https://leetcode.com/problems/trapping-rain-water/description/\n * https://www.geeksforgeeks.org/trapping-rain-water/\n *\n * TimeComplexity :\n * Space Complexity:\n *\n *\n * Core Logic : for every Index, check the leftMax height and rightMaxHeight , take minimum height\n *  Min(maxLeft,maxRight) - currentHeight\n *  \n *  so we have to maintain - prefixLeftSum and prefixRightSum --> which takes extra time complexity\n *  \n *\n *\n */\n\npublic class TrappingRainWater {\n\t\n\t  public int trap(int[] height) {\n\t\t    int water = 0;\n\t\t    int l = 0;\n\t\t    int r = height.length-1;\n\t\t    int lmax = Integer.MIN_VALUE;\n\t\t    int rmax = Integer.MIN_VALUE;\n\t\t    \n\t\t         //minimum height window only moves then only we can save water, \n\t\t        while(l < r){\n\t\t            lmax = Math.max(height[l], lmax);\n\t\t            rmax = Math.max(height[r], rmax);\n\t\t            \n\t\t            //here logic is if we standing in ith position, we need to think about Min(leftMax,rightMax)-h[i]\n\t\t            water+=  (lmax < rmax) ? lmax-height[l++] : rmax-height[r--] ;\n\t\t            //which one is minimum that one moves further\n\t\t        }\n\t\t\t  return water;\n\t\t    }\n\n\tpublic static void main(String[] args) {\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/TwoSum_I.java",
    "title": "Two Sum I",
    "slug": "two-sum-i",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Two Sum I using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/TwoSum_I.java",
    "sourceCode": "import java.util.HashMap;\n\nimport java.util.Map;\n\n/**\n * \n * \n * @author saiteja\n * https://leetcode.com/problems/two-sum/description/\n *\n */\n\n\npublic class TwoSum_I {\n\tpublic int[] twoSum(int[] nums, int target) {\n\t\tMap<Integer, Integer> map = new HashMap<Integer, Integer>();\n\t\tint[] result = new int[2];\n\t\tint i = 0;\n\t\tfor (int n : nums) {\n\t\t\t// Initially check whether difference is existing in map or not\n\t\t\t// if not put the element with its index in key, because it may // act as key to\n\t\t\t// further elements\n\t\t\tif (map.containsKey(target - n)) {\n\t\t\t\tresult[1] = i;\n\t\t\t\tresult[0] = map.get(target - n);\n\t\t\t}\n\t\t\tmap.put(n, i++);\n\t\t}\n\t\treturn result;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/TwoSum_II.java",
    "title": "Two Sum II",
    "slug": "two-sum-ii",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Two Sum II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/TwoSum_II.java",
    "sourceCode": "/**\n * \n * \n * @author saiteja\n * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/\n *\n */\n\npublic class TwoSum_II {\n\n\tpublic int[] twoSum(int[] numbers, int target) {\n\n\t\tint low = 0, high = numbers.length - 1;\n\n\t\twhile (low < high) {\n\n\t\t\tint sum = numbers[low] + numbers[high];\n\n\t\t\tif (sum > target)\n\t\t\t\thigh--;\n\t\t\telse if (sum < target)\n\t\t\t\tlow++;\n\t\t\telse\n\t\t\t\treturn new int[] { low + 1, high + 1 }; // sum==target\n\n\t\t}\n\n\t\treturn new int[2];\n\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ValidPalindrome.java",
    "title": "Valid Palindrome",
    "slug": "valid-palindrome",
    "topic": "Two Pointers",
    "difficulty": "Easy",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Valid Palindrome using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ValidPalindrome.java",
    "sourceCode": "/**\n * \n * https://leetcode.com/problems/valid-palindrome/\n * @author saite\n *\n */\n\npublic class ValidPalindrome {\n\n\tpublic boolean isPalindrome(String s) {\n\t\tif (s.isEmpty()) {\n\t\t\treturn true;\n\t\t}\n\n\t\tint leftPtr = 0;\n\t\tint rightPtr = s.length() - 1;\n\n\t\twhile (leftPtr < rightPtr) {\n\t\t\tchar a = s.charAt(leftPtr);\n\t\t\tchar b = s.charAt(rightPtr);\n\n\t\t\t// if it is not a character, move forward\n\t\t\tif (!Character.isLetterOrDigit(a))\n\t\t\t\tleftPtr++;\n\t\t\telse if (!Character.isLetterOrDigit(b))\n\t\t\t\trightPtr--;\n\t\t\telse {\n\t\t\t\tif (Character.toLowerCase(a) != Character.toLowerCase(b))\n\t\t\t\t\treturn false;\n\t\t\t\tleftPtr++;\n\t\t\t\trightPtr--;\n\t\t\t}\n\t\t}\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ValidPalindrome_II.java",
    "title": "Valid Palindrome II",
    "slug": "valid-palindrome-ii",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Valid Palindrome II using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ValidPalindrome_II.java",
    "sourceCode": "/*8\n * \n * https://leetcode.com/problems/valid-palindrome-ii/description/\n */\n\npublic class ValidPalindrome_II {\n\n\tpublic boolean validPalindrome(String s) {\n\t\treturn isValidPalindrome(s, 0, s.length() - 1, false);\n\t}\n\n\tboolean isValidPalindrome(String s, int left, int right, boolean isCharacterDeleted) {\n\t\twhile (left < right) {\n\t\t\tif (s.charAt(left) != s.charAt(right)) {\n\t\t\t\tif (isCharacterDeleted)\n\t\t\t\t\treturn false;\n\t\t\t\treturn isValidPalindrome(s, left + 1, right, true) || isValidPalindrome(s, left, right - 1, true);\n\t\t\t}\n\t\t\tleft++;\n\t\t\tright--;\n\t\t}\n\t\treturn true;\n\t}\n\n\tpublic static void main(String[] args) {\n\t\t// TODO Auto-generated method stub\n\n\t}\n\n}"
  },
  {
    "key": "Two Pointers:TwoPointers/ValidTriangle.java",
    "title": "Valid Triangle",
    "slug": "valid-triangle",
    "topic": "Two Pointers",
    "difficulty": "Medium",
    "tags": [
      "Two Pointers",
      "TwoPointers"
    ],
    "description": "Practice Valid Triangle using the Java implementation from the repository reference. Read the signature, state the invariant, and test the edge cases before optimizing.",
    "sourcePath": "src/main/java/TwoPointers/ValidTriangle.java",
    "sourceCode": "import java.util.Arrays;\n\n/**\n * \n * @author saiteja\n *  https://leetcode.com/problems/valid-triangle-number/\n */\n\npublic class ValidTriangle {\n\n\tpublic int triangleNumber(int[] nums) {\n\t\t// a+b>c , b+c>a , a+c>b when these 3 conditions are satisfied we can say\n\t\t// a,b,c is a triangle, so it means a>b>c\n\t\t/*\n\t\t *  a<b<c\n\t\t *    if we observe c is already greater here, so when we combine c with either a,b it always greater\n\t\t *   \n\t\t *     // a+b>c These condition we need to check\n\t\t *   \n\t\t *    //By default\n\t\t *   b+c>a (true)\n\t\t *   a+c>b (true)\n\t\t * \n\t\t * \n\t\t */\n\t\t\n\t\t// By property we can say\n\t\tArrays.sort(nums);\n\t\tint n = nums.length;\n\t\tint ans = 0;\n\n\t\tfor (int c = n - 1; c >= 2; c--) { \n\t\t\t// here we are fixing c, now apart from c, we need to pick a and b\n\t\t\tint a = 0; // smaller end\n\t\t\tint b = c - 1; // larger end\n\t\t\twhile (a < b) {\n\t\t\t\tif (nums[a] + nums[b] > nums[c]) {\n\t\t\t\t\tans += b - a;\n\t\t\t\t\tb--;\n\t\t\t\t} else\n\t\t\t\t\ta++;\n\t\t\t}\n\t\t}\n\t\treturn ans;\n\t}\n\n\tpublic static void main(String[] args) {\n\t}\n}"
  }
];
export const repositorySolutions: Record<string, string> = Object.fromEntries(repositoryProblems.map((problem) => [problem.key, problem.sourceCode]));
