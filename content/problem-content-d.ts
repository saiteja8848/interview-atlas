import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const e=(input:string,output:string,explanation:string):ProblemExample=>({input,output,explanation});
const formatJava=(source:string)=>{
  const lines:string[]=[];
  let current="";
  let indent=0;
  let parentheses=0;
  let quote="";
  let escaped=false;
  const flush=()=>{const text=current.trim();if(text)lines.push("    ".repeat(indent)+text);current="";};
  for(let index=0;index<source.length;index++){
    const character=source[index];
    if(quote){current+=character;if(escaped)escaped=false;else if(character==="\\")escaped=true;else if(character===quote)quote="";continue;}
    if(character==='"'||character==="'"){quote=character;current+=character;continue;}
    if(character==="("){parentheses++;current+=character;continue;}
    if(character===")"){parentheses--;current+=character;continue;}
    if(character==="{"){current=current.trimEnd()+" {";flush();indent++;continue;}
    if(character==="}"){flush();indent=Math.max(0,indent-1);lines.push("    ".repeat(indent)+"}");continue;}
    if(character===";"&&parentheses===0){current+=";";flush();continue;}
    if(/\s/.test(character)){if(current&&!current.endsWith(" "))current+=" ";continue;}
    current+=character;
  }
  flush();
  return lines.join("\n").replace(/\}\n(\s*)(else|catch|finally)\b/g,"} $2");
};
const p=(statement:string,examples:ProblemExample[],constraints:string[],bruteExplanation:string,drawback:string,optimizedExplanation:string,bruteComplexity:string,optimizedComplexity:string,steps:string[],bruteCode:string,optimizedCode:string):ProblemContent=>({statement,examples,constraints,brute:{explanation:bruteExplanation,drawback,complexity:bruteComplexity,code:formatJava(bruteCode)},optimized:{explanation:optimizedExplanation,complexity:optimizedComplexity,steps,code:formatJava(optimizedCode)}});

export const problemContentD:Record<string,ProblemContent>={
  "subsets":p(
    "Given an array of distinct integers, return every possible subset, including the empty set and the complete array. The output must not contain duplicate subsets.",
    [e("nums = [1,2,3]","[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]","Each element is either included or excluded."),e("nums = [0]","[[],[0]]","One value produces two subsets.")],
    ["1 <= nums.length <= 10","-10 <= nums[i] <= 10","All nums values are distinct."],
    "Enumerate all bit masks from zero through 2^n-1 and include nums[i] when bit i is set.",
    "Bit-mask enumeration is correct but rebuilds each subset from scratch and hides the reusable choose-explore-undo pattern.",
    "Backtrack from a start index. Record the current path, choose each remaining value, recurse, then remove it. The recursion visits each output once.",
    "O(n*2^n) time and O(n) temporary space","O(n*2^n) time and O(n) recursion space excluding output",
    ["Add a copy of the current path.","Loop choices from start onward.","Append one value and recurse from the next index.","Remove the appended value before the next choice."],
    `class Solution { public List<List<Integer>> subsets(int[]a){List<List<Integer>>r=new ArrayList<>();for(int mask=0;mask<(1<<a.length);mask++){List<Integer>x=new ArrayList<>();for(int i=0;i<a.length;i++)if((mask&(1<<i))!=0)x.add(a[i]);r.add(x);}return r;} }`,
    `class Solution { public List<List<Integer>> subsets(int[]a){List<List<Integer>>r=new ArrayList<>();dfs(a,0,new ArrayList<>(),r);return r;}private void dfs(int[]a,int start,List<Integer>path,List<List<Integer>>r){r.add(new ArrayList<>(path));for(int i=start;i<a.length;i++){path.add(a[i]);dfs(a,i+1,path,r);path.remove(path.size()-1);}} }`
  ),
  "subsets-ii":p(
    "Given an integer array that may contain duplicates, return every distinct subset exactly once.",
    [e("nums = [1,2,2]","[[],[1],[2],[1,2],[2,2],[1,2,2]]","Duplicate input values do not create duplicate subsets."),e("nums = [0]","[[],[0]]","There are two unique subsets.")],
    ["1 <= nums.length <= 10","-10 <= nums[i] <= 10"],
    "Generate all 2^n index subsets, sort each subset, and store it in a set to remove duplicates.",
    "It creates duplicate branches and pays hashing and copying costs after the wasted work.",
    "Sort nums first. At one recursion depth, skip an equal value after its first occurrence; deeper levels may still choose another copy, so all unique multiplicities remain.",
    "O(n*2^n) time and O(n*2^n) set space","O(n*2^n) output-sensitive time and O(n) recursion space excluding output",
    ["Sort nums so duplicates are adjacent.","Record the current subset.","Skip nums[i] when i is beyond start and equals nums[i-1].","Choose, recurse from i+1, and undo."],
    `class Solution { public List<List<Integer>> subsetsWithDup(int[]a){Set<List<Integer>>set=new HashSet<>();for(int m=0;m<(1<<a.length);m++){List<Integer>x=new ArrayList<>();for(int i=0;i<a.length;i++)if((m&(1<<i))!=0)x.add(a[i]);Collections.sort(x);set.add(x);}return new ArrayList<>(set);} }`,
    `class Solution { public List<List<Integer>> subsetsWithDup(int[]a){Arrays.sort(a);List<List<Integer>>r=new ArrayList<>();dfs(a,0,new ArrayList<>(),r);return r;}private void dfs(int[]a,int start,List<Integer>x,List<List<Integer>>r){r.add(new ArrayList<>(x));for(int i=start;i<a.length;i++){if(i>start&&a[i]==a[i-1])continue;x.add(a[i]);dfs(a,i+1,x,r);x.remove(x.size()-1);}} }`
  ),
  "combinations":p(
    "Return every size-k combination chosen from the integers 1 through n, with each number used at most once.",
    [e("n = 4, k = 2","[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]","Every unordered pair appears once."),e("n = 1, k = 1","[[1]]","The only value must be selected.")],
    ["1 <= n <= 20","1 <= k <= n"],
    "Enumerate all 2^n masks and retain only masks containing exactly k set bits.",
    "Most masks have the wrong size, so the algorithm explores and discards many impossible candidates.",
    "Backtrack in increasing order and stop a loop early when fewer remaining numbers exist than required slots.",
    "O(n*2^n) time and O(k) temporary space","O(C(n,k)*k) output time and O(k) recursion space",
    ["Return a copy when path size reaches k.","Compute how many values are still needed.","Loop only while enough later values remain.","Choose the number, recurse with i+1, and undo."],
    `class Solution { public List<List<Integer>> combine(int n,int k){List<List<Integer>>r=new ArrayList<>();for(int m=0;m<(1<<n);m++)if(Integer.bitCount(m)==k){List<Integer>x=new ArrayList<>();for(int i=0;i<n;i++)if((m&(1<<i))!=0)x.add(i+1);r.add(x);}return r;} }`,
    `class Solution { public List<List<Integer>> combine(int n,int k){List<List<Integer>>r=new ArrayList<>();dfs(1,n,k,new ArrayList<>(),r);return r;}private void dfs(int start,int n,int k,List<Integer>x,List<List<Integer>>r){if(x.size()==k){r.add(new ArrayList<>(x));return;}int need=k-x.size();for(int i=start;i<=n-need+1;i++){x.add(i);dfs(i+1,n,k,x,r);x.remove(x.size()-1);}} }`
  ),
  "combination-sum":p(
    "Given distinct positive candidates and target, return all unique combinations summing to target. A candidate may be chosen unlimited times.",
    [e("candidates = [2,3,6,7], target = 7","[[2,2,3],[7]]","Two may be reused three times across the first combination."),e("candidates = [2,3,5], target = 8","[[2,2,2,2],[2,3,3],[3,5]]","These are all unordered combinations.")],
    ["1 <= candidates.length <= 30","2 <= candidates[i] <= 40","All candidates are distinct.","1 <= target <= 40"],
    "Recursively try every candidate at every level until the running sum reaches or exceeds target, then deduplicate reordered results with a set.",
    "It explores permutations of the same combination and branches even after small sorted choices could prove failure.",
    "Sort candidates and recurse with a start index. Reuse i by recursing from i, and stop the loop when candidates[i] exceeds the remaining target.",
    "Exponential time with duplicate permutation work and O(target) stack space","O(number of valid search nodes) time and O(target/minCandidate) stack space",
    ["Sort candidates.","When remaining is zero, record the path.","Loop from start and break when the candidate is too large.","Choose it, recurse with the same index and smaller remaining value, then undo."],
    `class Solution { public List<List<Integer>> combinationSum(int[]a,int target){Set<List<Integer>>set=new HashSet<>();dfs(a,target,new ArrayList<>(),set);return new ArrayList<>(set);}private void dfs(int[]a,int rem,List<Integer>x,Set<List<Integer>>set){if(rem==0){List<Integer>y=new ArrayList<>(x);Collections.sort(y);set.add(y);return;}if(rem<0)return;for(int v:a){x.add(v);dfs(a,rem-v,x,set);x.remove(x.size()-1);}} }`,
    `class Solution { public List<List<Integer>> combinationSum(int[]a,int target){Arrays.sort(a);List<List<Integer>>r=new ArrayList<>();dfs(a,0,target,new ArrayList<>(),r);return r;}private void dfs(int[]a,int start,int rem,List<Integer>x,List<List<Integer>>r){if(rem==0){r.add(new ArrayList<>(x));return;}for(int i=start;i<a.length&&a[i]<=rem;i++){x.add(a[i]);dfs(a,i,rem-a[i],x,r);x.remove(x.size()-1);}} }`
  ),
  "combination-sum-ii":p(
    "Given positive candidates that may repeat and target, return every distinct combination summing to target. Each array position may be used once.",
    [e("candidates = [10,1,2,7,6,1,5], target = 8","[[1,1,6],[1,2,5],[1,7],[2,6]]","Duplicate ones may both be used, but result combinations are unique."),e("candidates = [2,5,2,1,2], target = 5","[[1,2,2],[5]]","Each chosen position is used once.")],
    ["1 <= candidates.length <= 100","1 <= candidates[i] <= 50","1 <= target <= 30"],
    "Enumerate every index subset, keep those summing to target, sort their values, and deduplicate with a set.",
    "All 2^n subsets are built and duplicate-value branches generate the same combination repeatedly.",
    "Sort candidates, skip equal choices at the same depth, and break when the next positive value exceeds the remaining target.",
    "O(n*2^n) time and exponential set space","O(2^n) worst-case time and O(n) recursion space excluding output",
    ["Sort candidates.","Record the path at remaining zero.","At each depth skip equal candidates after the first.","Recurse from i+1 because positions cannot be reused, then undo."],
    `class Solution { public List<List<Integer>> combinationSum2(int[]a,int target){Set<List<Integer>>s=new HashSet<>();for(long m=0;m<(1L<<a.length);m++){int sum=0;List<Integer>x=new ArrayList<>();for(int i=0;i<a.length;i++)if((m&(1L<<i))!=0){sum+=a[i];x.add(a[i]);}if(sum==target){Collections.sort(x);s.add(x);}}return new ArrayList<>(s);} }`,
    `class Solution { public List<List<Integer>> combinationSum2(int[]a,int target){Arrays.sort(a);List<List<Integer>>r=new ArrayList<>();dfs(a,0,target,new ArrayList<>(),r);return r;}private void dfs(int[]a,int start,int rem,List<Integer>x,List<List<Integer>>r){if(rem==0){r.add(new ArrayList<>(x));return;}for(int i=start;i<a.length&&a[i]<=rem;i++){if(i>start&&a[i]==a[i-1])continue;x.add(a[i]);dfs(a,i+1,rem-a[i],x,r);x.remove(x.size()-1);}} }`
  ),
  "combination-sum-iii":p(
    "Return every combination of exactly k distinct numbers from 1 through 9 whose sum is n. Each number may be used once.",
    [e("k = 3, n = 7","[[1,2,4]]","The three distinct values sum to seven."),e("k = 3, n = 9","[[1,2,6],[1,3,5],[2,3,4]]","These are all valid increasing triples."),e("k = 4, n = 1","[]","Four positive distinct values cannot sum to one.")],
    ["2 <= k <= 9","1 <= n <= 60"],
    "Enumerate all 512 subsets of 1 through 9 and retain those with size k and sum n.",
    "It checks every subset even when size or partial sum already makes success impossible.",
    "Backtrack in increasing order while tracking remaining size and sum. Stop when the sum is negative or too few values remain.",
    "O(2^9*9) time and O(k) space","O(C(9,k)*k) worst-case time and O(k) recursion space",
    ["Pass start, remaining count, and remaining sum.","Record only when both remaining values reach zero.","Loop through feasible increasing choices.","Choose, recurse with i+1, and undo."],
    `class Solution { public List<List<Integer>> combinationSum3(int k,int n){List<List<Integer>>r=new ArrayList<>();for(int m=0;m<512;m++)if(Integer.bitCount(m)==k){int sum=0;List<Integer>x=new ArrayList<>();for(int i=0;i<9;i++)if((m&(1<<i))!=0){sum+=i+1;x.add(i+1);}if(sum==n)r.add(x);}return r;} }`,
    `class Solution { public List<List<Integer>> combinationSum3(int k,int n){List<List<Integer>>r=new ArrayList<>();dfs(1,k,n,new ArrayList<>(),r);return r;}private void dfs(int start,int k,int rem,List<Integer>x,List<List<Integer>>r){if(k==0){if(rem==0)r.add(new ArrayList<>(x));return;}for(int i=start;i<=9&&i<=rem;i++){if(10-i<k)break;x.add(i);dfs(i+1,k-1,rem-i,x,r);x.remove(x.size()-1);}} }`
  ),
  "permutations":p(
    "Given an array of distinct integers, return every possible ordering of all values.",
    [e("nums = [1,2,3]","[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]","Three distinct values have 3! orderings."),e("nums = [0,1]","[[0,1],[1,0]]","There are two orderings.")],
    ["1 <= nums.length <= 6","-10 <= nums[i] <= 10","All values are distinct."],
    "Generate every length-n sequence by trying every value at every position, then reject sequences that reuse an index.",
    "The recursion explores n^n sequences, most of which are invalid.",
    "Track used indices while building the path, so only unused values branch. Every leaf is immediately a valid permutation.",
    "O(n^n*n) time and O(n) recursion space","O(n!*n) output time and O(n) recursion space",
    ["Create a used array.","At path length n, record a copy.","Loop over only unused indices.","Mark, choose, recurse, then unmark and remove."],
    `class Solution { public List<List<Integer>> permute(int[]a){List<List<Integer>>r=new ArrayList<>();build(a,new ArrayList<>(),r);return r;}private void build(int[]a,List<Integer>x,List<List<Integer>>r){if(x.size()==a.length){Set<Integer>s=new HashSet<>(x);if(s.size()==a.length)r.add(new ArrayList<>(x));return;}for(int v:a){x.add(v);build(a,x,r);x.remove(x.size()-1);}} }`,
    `class Solution { public List<List<Integer>> permute(int[]a){List<List<Integer>>r=new ArrayList<>();dfs(a,new boolean[a.length],new ArrayList<>(),r);return r;}private void dfs(int[]a,boolean[]used,List<Integer>x,List<List<Integer>>r){if(x.size()==a.length){r.add(new ArrayList<>(x));return;}for(int i=0;i<a.length;i++){if(used[i])continue;used[i]=true;x.add(a[i]);dfs(a,used,x,r);x.remove(x.size()-1);used[i]=false;}} }`
  ),
  "permutations-ii":p(
    "Given an integer array that may contain duplicates, return all distinct permutations.",
    [e("nums = [1,1,2]","[[1,1,2],[1,2,1],[2,1,1]]","Swapping equal ones does not create a new ordering."),e("nums = [1,2,3]","six distinct permutations","All values are different.")],
    ["1 <= nums.length <= 8","-10 <= nums[i] <= 10"],
    "Generate all index permutations and store completed value lists in a set.",
    "Equal values create duplicate branches that are discarded only after a full permutation is built.",
    "Sort nums and track used indices. At one depth, skip nums[i] when the equal preceding copy has not been used in the current path, forcing a canonical order among duplicates.",
    "O(n!*n) time with duplicate work and O(n!*n) set space","O(number of unique permutations*n) time and O(n) recursion space excluding output",
    ["Sort nums and create used flags.","Record at path length n.","Skip used indices and skip an equal value whose predecessor is unused.","Choose, recurse, and restore both path and flag."],
    `class Solution { public List<List<Integer>> permuteUnique(int[]a){Set<List<Integer>>s=new HashSet<>();dfs(a,new boolean[a.length],new ArrayList<>(),s);return new ArrayList<>(s);}private void dfs(int[]a,boolean[]u,List<Integer>x,Set<List<Integer>>s){if(x.size()==a.length){s.add(new ArrayList<>(x));return;}for(int i=0;i<a.length;i++)if(!u[i]){u[i]=true;x.add(a[i]);dfs(a,u,x,s);x.remove(x.size()-1);u[i]=false;}} }`,
    `class Solution { public List<List<Integer>> permuteUnique(int[]a){Arrays.sort(a);List<List<Integer>>r=new ArrayList<>();dfs(a,new boolean[a.length],new ArrayList<>(),r);return r;}private void dfs(int[]a,boolean[]u,List<Integer>x,List<List<Integer>>r){if(x.size()==a.length){r.add(new ArrayList<>(x));return;}for(int i=0;i<a.length;i++){if(u[i]||i>0&&a[i]==a[i-1]&&!u[i-1])continue;u[i]=true;x.add(a[i]);dfs(a,u,x,r);x.remove(x.size()-1);u[i]=false;}} }`
  ),
  "letter-combinations-of-a-phone-number":p(
    "Given digits from 2 through 9, return every letter string represented by their telephone keypad mappings. Return an empty list for an empty input.",
    [e("digits = \"23\"","[ad,ae,af,bd,be,bf,cd,ce,cf]","Each letter for 2 combines with each letter for 3."),e("digits = \"\"","[]","There are no digits to map."),e("digits = \"2\"","[a,b,c]","Digit 2 maps to three letters.")],
    ["0 <= digits.length <= 4","Every digit lies from 2 through 9."],
    "Generate every lowercase string of the required length and keep only strings whose character at each position belongs to that digit's keypad group.",
    "This explores 26^n strings although each digit allows only three or four letters.",
    "Backtrack directly over the letters mapped by the current digit. Every explored branch is a valid prefix and every leaf is an answer.",
    "O(26^n*n) time and O(n) recursion space","O(4^n*n) output time and O(n) recursion space",
    ["Return an empty list for empty digits.","At index i, read the mapped letter string for digits[i].","Append each mapped letter, recurse to i+1, then remove it.","Record the builder when i reaches digits.length."],
    `class Solution { public List<String> letterCombinations(String d){List<String>r=new ArrayList<>();if(d.isEmpty())return r;char[]x=new char[d.length()];all(d,0,x,r);return r;}private void all(String d,int i,char[]x,List<String>r){if(i==x.length){String s=new String(x);String[]m={"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};for(int j=0;j<x.length;j++)if(m[d.charAt(j)-'2'].indexOf(x[j])<0)return;r.add(s);return;}for(char c='a';c<='z';c++){x[i]=c;all(d,i+1,x,r);}} }`,
    `class Solution { private static final String[]M={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};public List<String> letterCombinations(String d){List<String>r=new ArrayList<>();if(!d.isEmpty())dfs(d,0,new StringBuilder(),r);return r;}private void dfs(String d,int i,StringBuilder b,List<String>r){if(i==d.length()){r.add(b.toString());return;}for(char c:M[d.charAt(i)-'0'].toCharArray()){b.append(c);dfs(d,i+1,b,r);b.deleteCharAt(b.length()-1);}} }`
  ),
  "generate-parentheses":p(
    "Given n pairs of parentheses, return every distinct string in which all parentheses are correctly matched.",
    [e("n = 3","[((())),(()()),(())(),()(()),()()()]","Five valid strings use three pairs; ordering may differ."),e("n = 1","[()]","One pair has one valid arrangement.")],
    ["1 <= n <= 8"],
    "Generate all 2^(2n) strings of opening and closing parentheses, then validate each completed string with a balance counter.",
    "Most prefixes are already impossible but are expanded to full length before rejection.",
    "Track how many opening and closing symbols have been used. Add an opening symbol while open<n and a closing symbol only while close<open, so every prefix can still become valid.",
    "O(2^(2n)*n) time and O(n) recursion space","O(Catalan(n)*n) output time and O(n) recursion space",
    ["Pass open and close counts with the builder.","Record at length 2n.","Recurse with '(' when openings remain.","Recurse with ')' only when it cannot make the balance negative."],
    `class Solution { public List<String> generateParenthesis(int n){List<String>r=new ArrayList<>();all(n,0,new StringBuilder(),r);return r;}private void all(int n,int i,StringBuilder b,List<String>r){if(i==2*n){int q=0;for(int j=0;j<b.length();j++){q+=b.charAt(j)=='('?1:-1;if(q<0)return;}if(q==0)r.add(b.toString());return;}b.append('(');all(n,i+1,b,r);b.setCharAt(b.length()-1,')');all(n,i+1,b,r);b.deleteCharAt(b.length()-1);} }`,
    `class Solution { public List<String> generateParenthesis(int n){List<String>r=new ArrayList<>();dfs(n,0,0,new StringBuilder(),r);return r;}private void dfs(int n,int open,int close,StringBuilder b,List<String>r){if(b.length()==2*n){r.add(b.toString());return;}if(open<n){b.append('(');dfs(n,open+1,close,b,r);b.deleteCharAt(b.length()-1);}if(close<open){b.append(')');dfs(n,open,close+1,b,r);b.deleteCharAt(b.length()-1);}} }`
  ),
  "palindrome-partitioning":p(
    "Partition s so every piece is a palindrome, and return all possible palindrome partitions.",
    [e("s = \"aab\"","[[a,a,b],[aa,b]]","Both valid cut placements contain only palindromes."),e("s = \"a\"","[[a]]","The whole one-character string is palindromic."),e("s = \"efe\"","[[e,f,e],[efe]]","The whole string and all singletons form valid partitions.")],
    ["1 <= s.length <= 16","s contains lowercase English letters."],
    "Enumerate every subset of the n-1 cut positions, build all pieces, then check whether every piece is a palindrome.",
    "Invalid pieces are discovered only after a complete partition is constructed, and palindrome ranges are repeatedly rescanned.",
    "Backtrack from a start index and recurse only after the chosen next substring passes a palindrome check. This prunes an invalid piece immediately.",
    "O(2^n*n^2) time and O(n) temporary space","O(2^n*n) worst-case time and O(n) recursion space excluding output",
    ["If start reaches the string length, record the partition.","Try each possible end from start onward.","Skip a substring that is not palindromic.","Choose the substring, recurse from end+1, and undo."],
    `class Solution { public List<List<String>> partition(String s){List<List<String>>r=new ArrayList<>();int cuts=1<<(s.length()-1);for(int m=0;m<cuts;m++){List<String>x=new ArrayList<>();int start=0;boolean ok=true;for(int i=0;i<s.length()-1;i++)if((m&(1<<i))!=0){String q=s.substring(start,i+1);if(!pal(q))ok=false;x.add(q);start=i+1;}String q=s.substring(start);if(!pal(q))ok=false;x.add(q);if(ok)r.add(x);}return r;}private boolean pal(String s){int l=0,r=s.length()-1;while(l<r)if(s.charAt(l++)!=s.charAt(r--))return false;return true;} }`,
    `class Solution { public List<List<String>> partition(String s){List<List<String>>r=new ArrayList<>();dfs(s,0,new ArrayList<>(),r);return r;}private void dfs(String s,int start,List<String>x,List<List<String>>r){if(start==s.length()){r.add(new ArrayList<>(x));return;}for(int end=start;end<s.length();end++)if(pal(s,start,end)){x.add(s.substring(start,end+1));dfs(s,end+1,x,r);x.remove(x.size()-1);}}private boolean pal(String s,int l,int r){while(l<r)if(s.charAt(l++)!=s.charAt(r--))return false;return true;} }`
  ),
  "restore-ip-addresses":p(
    "Insert three dots into a digit string to form every valid IPv4 address. Each of four parts must be 0 through 255 and may not contain leading zeroes unless it is exactly 0.",
    [e("s = \"25525511135\"","[255.255.11.135,255.255.111.35]","Both use all digits in four valid parts."),e("s = \"0000\"","[0.0.0.0]","Each zero must stand alone."),e("s = \"101023\"","[1.0.10.23,1.0.102.3,10.1.0.23,10.10.2.3,101.0.2.3]","These are all valid placements.")],
    ["1 <= s.length <= 20","s contains only digits."],
    "Try every triple of dot positions, extract four substrings, and validate their numeric ranges and leading zeroes.",
    "The loops construct many candidates whose remaining digit count already makes four valid parts impossible.",
    "Backtrack one part at a time, choosing one to three digits. Prune when remaining digits cannot fill the remaining parts or must overflow them.",
    "O(n^3) candidates and O(n) temporary space","O(3^4) bounded search time and O(4) recursion space excluding output",
    ["Pass the current string index and number of parts.","Reject states whose remaining digits are outside [remainingParts,3*remainingParts].","Try lengths one through three, stopping on a leading zero or value above 255.","Record when four parts consume the full string."],
    `class Solution { public List<String> restoreIpAddresses(String s){List<String>r=new ArrayList<>();for(int a=1;a<s.length();a++)for(int b=a+1;b<s.length();b++)for(int c=b+1;c<s.length();c++){String[]p={s.substring(0,a),s.substring(a,b),s.substring(b,c),s.substring(c)};boolean ok=true;for(String x:p)ok&=valid(x);if(ok)r.add(String.join(".",p));}return r;}private boolean valid(String x){return x.length()>0&&x.length()<=3&&(x.length()==1||x.charAt(0)!='0')&&Integer.parseInt(x)<=255;} }`,
    `class Solution { public List<String> restoreIpAddresses(String s){List<String>r=new ArrayList<>();dfs(s,0,0,new ArrayList<>(),r);return r;}private void dfs(String s,int index,int parts,List<String>x,List<String>r){int remain=s.length()-index,slots=4-parts;if(remain<slots||remain>3*slots)return;if(parts==4){if(index==s.length())r.add(String.join(".",x));return;}int value=0;for(int end=index;end<Math.min(s.length(),index+3);end++){if(end>index&&s.charAt(index)=='0')break;value=value*10+s.charAt(end)-'0';if(value>255)break;x.add(s.substring(index,end+1));dfs(s,end+1,parts+1,x,r);x.remove(x.size()-1);}} }`
  ),
  "word-search":p(
    "Given a character grid and word, return true if the word can be formed by horizontally or vertically adjacent cells without using a cell more than once in one path.",
    [e("board = [[A,B,C,E],[S,F,C,S],[A,D,E,E]], word = \"ABCCED\"","true","A path follows A-B-C-C-E-D."),e("same board, word = \"SEE\"","true","A valid adjacent path begins at the second-row S."),e("same board, word = \"ABCB\"","false","The only matching path would reuse B.")],
    ["1 <= rows,columns <= 6","1 <= word.length <= 15","Board and word contain English letters."],
    "Start DFS from every cell and explore all four directions while marking cells on the active path.",
    "The direct search begins from impossible letters and may branch heavily before discovering that a rare end letter would be a better start.",
    "Count board letters first to reject impossible words. Reverse the word when its final letter is rarer than its first, then run in-place-marked DFS only from matching starts.",
    "O(mn*4^L) time and O(L) recursion space","O(mn*3^L) time after the first step and O(L) recursion space",
    ["Count board characters and verify the word's required counts.","Optionally reverse the word to start with the rarer end.","Start DFS only at cells matching character zero.","Temporarily replace a used cell, explore four neighbours, and restore it."],
    `class Solution { public boolean exist(char[][]b,String w){for(int r=0;r<b.length;r++)for(int c=0;c<b[0].length;c++)if(dfs(b,w,r,c,0))return true;return false;}private boolean dfs(char[][]b,String w,int r,int c,int i){if(i==w.length())return true;if(r<0||r==b.length||c<0||c==b[0].length||b[r][c]!=w.charAt(i))return false;char ch=b[r][c];b[r][c]=0;boolean ok=dfs(b,w,r+1,c,i+1)||dfs(b,w,r-1,c,i+1)||dfs(b,w,r,c+1,i+1)||dfs(b,w,r,c-1,i+1);b[r][c]=ch;return ok;} }`,
    `class Solution { public boolean exist(char[][]b,String w){int[]f=new int[128];for(char[]row:b)for(char c:row)f[c]++;for(char c:w.toCharArray())if(--f[c]<0)return false;if(f[w.charAt(0)]>f[w.charAt(w.length()-1)])w=new StringBuilder(w).reverse().toString();for(int r=0;r<b.length;r++)for(int c=0;c<b[0].length;c++)if(b[r][c]==w.charAt(0)&&dfs(b,w,r,c,0))return true;return false;}private boolean dfs(char[][]b,String w,int r,int c,int i){if(i==w.length())return true;if(r<0||r==b.length||c<0||c==b[0].length||b[r][c]!=w.charAt(i))return false;char ch=b[r][c];b[r][c]=0;boolean ok=dfs(b,w,r+1,c,i+1)||dfs(b,w,r-1,c,i+1)||dfs(b,w,r,c+1,i+1)||dfs(b,w,r,c-1,i+1);b[r][c]=ch;return ok;} }`
  ),
  "n-queens":p(
    "Place n queens on an n by n chessboard so no two share a row, column, or diagonal. Return every board representation using Q and period characters.",
    [e("n = 4","two boards: [.Q..,...Q,Q...,..Q.] and [..Q.,Q...,...Q,.Q..]","Four queens have exactly two valid layouts."),e("n = 1","[[Q]]","One queen is valid on one cell.")],
    ["1 <= n <= 9"],
    "Choose any column for each row, producing n^n full boards, then validate every pair of queens only at each leaf.",
    "Conflicts known in early rows are still extended through all remaining rows, and leaf validation costs O(n squared).",
    "Track occupied columns and the two diagonal identifiers row-column and row+column. Reject conflicts in O(1) before descending.",
    "O(n^n*n^2) time and O(n) recursion space","O(n!) worst-case search time and O(n) state space excluding output",
    ["Place exactly one queen in the current row.","Check column and both diagonal sets.","Mark the three constraints, place Q, and recurse to the next row.","Restore the board and sets after returning."],
    `class Solution { public List<List<String>> solveNQueens(int n){List<List<String>>r=new ArrayList<>();int[]q=new int[n];all(0,n,q,r);return r;}private void all(int row,int n,int[]q,List<List<String>>r){if(row==n){for(int i=0;i<n;i++)for(int j=i+1;j<n;j++)if(q[i]==q[j]||Math.abs(i-j)==Math.abs(q[i]-q[j]))return;List<String>b=new ArrayList<>();for(int c:q){char[]x=new char[n];Arrays.fill(x,'.');x[c]='Q';b.add(new String(x));}r.add(b);return;}for(int c=0;c<n;c++){q[row]=c;all(row+1,n,q,r);}} }`,
    `class Solution { public List<List<String>> solveNQueens(int n){List<List<String>>r=new ArrayList<>();char[][]b=new char[n][n];for(char[]x:b)Arrays.fill(x,'.');dfs(0,b,new boolean[n],new boolean[2*n],new boolean[2*n],r);return r;}private void dfs(int row,char[][]b,boolean[]col,boolean[]d1,boolean[]d2,List<List<String>>r){int n=b.length;if(row==n){List<String>x=new ArrayList<>();for(char[]q:b)x.add(new String(q));r.add(x);return;}for(int c=0;c<n;c++){int a=row-c+n,z=row+c;if(col[c]||d1[a]||d2[z])continue;col[c]=d1[a]=d2[z]=true;b[row][c]='Q';dfs(row+1,b,col,d1,d2,r);b[row][c]='.';col[c]=d1[a]=d2[z]=false;}} }`
  ),
  "sudoku-solver":p(
    "Fill a partially completed 9 by 9 Sudoku board so every row, column, and 3 by 3 box contains digits 1 through 9 exactly once. Empty cells are periods, and one solution is guaranteed.",
    [e("board with first row 53..7.... and standard valid puzzle","the unique completed Sudoku board","Each inserted digit satisfies its row, column, and box."),e("a solved valid board","the same board","No empty cell requires modification.")],
    ["board has 9 rows and 9 columns","Each cell is '.', or '1' through '9'.","The puzzle has exactly one solution."],
    "At the first empty cell, try digits 1 through 9 and scan its full row, column, and box to validate each choice before recurring.",
    "Each candidate repeatedly scans 27 cells and a poor fixed empty-cell order can create many unnecessary branches.",
    "Build row, column, and box bit masks once. At every recursion choose the remaining empty cell with the fewest legal digits, update masks in O(1), recurse, and undo on failure.",
    "O(9^E*9) time and O(E) recursion space","O(9^E) worst-case time with strong MRV pruning and O(E) recursion space",
    ["Build three arrays of used-digit bit masks and a list of empty cells.","Among remaining cells, select the one with the smallest available mask.","Try each set bit, update board and masks, and recurse.","Undo masks and restore the period if the branch fails."],
    `class Solution { public void solveSudoku(char[][]b){solve(b);}private boolean solve(char[][]b){for(int r=0;r<9;r++)for(int c=0;c<9;c++)if(b[r][c]=='.'){for(char d='1';d<='9';d++)if(ok(b,r,c,d)){b[r][c]=d;if(solve(b))return true;b[r][c]='.';}return false;}return true;}private boolean ok(char[][]b,int r,int c,char d){for(int i=0;i<9;i++)if(b[r][i]==d||b[i][c]==d||b[r/3*3+i/3][c/3*3+i%3]==d)return false;return true;} }`,
    `class Solution { private final int[]row=new int[9],col=new int[9],box=new int[9];private final List<int[]>empty=new ArrayList<>();public void solveSudoku(char[][]b){for(int r=0;r<9;r++)for(int c=0;c<9;c++)if(b[r][c]=='.')empty.add(new int[]{r,c});else set(r,c,b[r][c]-'1');dfs(b,0);}private boolean dfs(char[][]b,int at){if(at==empty.size())return true;int best=at,count=10;for(int i=at;i<empty.size();i++){int[]x=empty.get(i);int n=Integer.bitCount((~(row[x[0]]|col[x[1]]|box[x[0]/3*3+x[1]/3]))&511);if(n<count){count=n;best=i;}}Collections.swap(empty,at,best);int[]x=empty.get(at);int mask=(~(row[x[0]]|col[x[1]]|box[x[0]/3*3+x[1]/3]))&511;while(mask!=0){int bit=mask&-mask,d=Integer.numberOfTrailingZeros(bit);set(x[0],x[1],d);b[x[0]][x[1]]=(char)('1'+d);if(dfs(b,at+1))return true;unset(x[0],x[1],d);mask-=bit;}b[x[0]][x[1]]='.';Collections.swap(empty,at,best);return false;}private void set(int r,int c,int d){int q=1<<d;row[r]|=q;col[c]|=q;box[r/3*3+c/3]|=q;}private void unset(int r,int c,int d){int q=~(1<<d);row[r]&=q;col[c]&=q;box[r/3*3+c/3]&=q;} }`
  ),
  "matchsticks-to-square":p(
    "Use every matchstick exactly once to form a square. Each stick is one whole side segment and cannot be broken. Return whether four equal side sums can be formed.",
    [e("matchsticks = [1,1,2,2,2]","true","The two length-two sticks and two pairs of ones form four sides of length two."),e("matchsticks = [3,3,3,3,4]","false","The length-four stick leaves four threes that cannot complete equal sides.")],
    ["1 <= matchsticks.length <= 15","1 <= matchsticks[i] <= 100000000","The total length fits in a 32-bit integer."],
    "Assign each stick to any of four side buckets recursively and only test equality after all sticks are assigned.",
    "It explores 4^n assignments, including sides that exceed the target and symmetric swaps of identical side totals.",
    "Reject a non-divisible total, sort sticks descending, and stop as soon as a side would exceed target. At one level, skip side buckets with an equal current sum.",
    "O(4^n) time and O(n) recursion space","O(4^n) worst-case time with capacity and symmetry pruning, O(n) recursion space",
    ["Compute target total/4 and sort sticks descending.","For the current stick, try each side that stays at most target.","Skip another side having the same pre-choice sum.","Undo after recursion and accept when every stick is placed."],
    `class Solution { public boolean makesquare(int[]a){int sum=0;for(int v:a)sum+=v;if(sum%4!=0)return false;return dfs(a,0,new int[4],sum/4);}private boolean dfs(int[]a,int i,int[]s,int target){if(i==a.length)return s[0]==target&&s[1]==target&&s[2]==target&&s[3]==target;for(int j=0;j<4;j++){s[j]+=a[i];if(dfs(a,i+1,s,target))return true;s[j]-=a[i];}return false;} }`,
    `class Solution { public boolean makesquare(int[]a){int sum=0;for(int v:a)sum+=v;if(sum%4!=0)return false;Arrays.sort(a);for(int l=0,r=a.length-1;l<r;l++,r--){int t=a[l];a[l]=a[r];a[r]=t;}return dfs(a,0,new int[4],sum/4);}private boolean dfs(int[]a,int i,int[]s,int target){if(i==a.length)return true;for(int j=0;j<4;j++){if(s[j]+a[i]>target)continue;if(j>0&&s[j]==s[j-1])continue;s[j]+=a[i];if(dfs(a,i+1,s,target))return true;s[j]-=a[i];}return false;} }`
  ),
  "partition-to-k-equal-sum-subsets":p(
    "Partition nums into k nonempty disjoint subsets whose sums are all equal, using every value exactly once.",
    [e("nums = [4,3,2,3,5,2,1], k = 4","true","The target sum is 5: [5],[1,4],[2,3],[2,3]."),e("nums = [1,2,3,4], k = 3","false","The total cannot be divided into three equal integer sums.")],
    ["1 <= k <= nums.length <= 16","1 <= nums[i] <= 10000","Each value appears at most four times."],
    "Assign every number to one of k subset buckets and validate equal sums only after all assignments.",
    "It explores k^n labeled bucket assignments, including overflowing and symmetric buckets.",
    "Require a divisible total, sort descending, and place each value only into a bucket that stays within target. Skip equal bucket sums and stop trying empty buckets after the first.",
    "O(k^n) time and O(n) recursion space","O(k^n) worst-case time with strong pruning and O(n+k) space",
    ["Compute target and reject impossible totals or a largest value above target.","Process values from largest to smallest.","Try only buckets that remain within target and skip equal bucket states.","Undo; if an empty bucket failed, no other empty bucket differs."],
    `class Solution { public boolean canPartitionKSubsets(int[]a,int k){int sum=0;for(int v:a)sum+=v;if(sum%k!=0)return false;return dfs(a,0,new int[k],sum/k);}private boolean dfs(int[]a,int i,int[]b,int target){if(i==a.length){for(int s:b)if(s!=target)return false;return true;}for(int j=0;j<b.length;j++){b[j]+=a[i];if(dfs(a,i+1,b,target))return true;b[j]-=a[i];}return false;} }`,
    `class Solution { public boolean canPartitionKSubsets(int[]a,int k){int sum=0;for(int v:a)sum+=v;if(sum%k!=0)return false;Arrays.sort(a);for(int l=0,r=a.length-1;l<r;l++,r--){int t=a[l];a[l]=a[r];a[r]=t;}int target=sum/k;if(a[0]>target)return false;return dfs(a,0,new int[k],target);}private boolean dfs(int[]a,int i,int[]b,int target){if(i==a.length)return true;for(int j=0;j<b.length;j++){if(b[j]+a[i]>target)continue;if(j>0&&b[j]==b[j-1])continue;b[j]+=a[i];if(dfs(a,i+1,b,target))return true;b[j]-=a[i];if(b[j]==0)break;}return false;} }`
  ),
  "remove-invalid-parentheses":p(
    "Remove the minimum number of parentheses to make the input valid, keeping all non-parenthesis characters. Return every distinct result achievable with that minimum removal count.",
    [e("s = \"()())()\"","[(())(),()()()]","Removing one of the unmatched closing parentheses yields two distinct valid strings."),e("s = \"(a)())()\"","[(a())(),(a)()()]","Letters remain fixed while one close is removed."),e("s = \"\)(\"","[\"\"]","Both invalid parentheses must be removed.")],
    ["1 <= s.length <= 25","s contains letters and parentheses.","At most 20 characters are parentheses."],
    "Recursively choose keep or delete for every parenthesis, validate every completed string, and retain only valid strings having the greatest length.",
    "The full 2^p decision tree contains many branches that delete too many symbols or can no longer repair the balance.",
    "First count the exact unmatched left and right parentheses that must be removed. DFS with those budgets, current balance, and duplicate-deletion skipping; reject any prefix with negative balance.",
    "O(2^p*n) time and exponential result/set space","O(2^p) worst-case time with removal and balance pruning, O(n) recursion space",
    ["Scan once to compute leftRemove and rightRemove.","At each parenthesis, optionally delete it only when its removal budget remains.","Keep a close only when balance is positive; update balance for kept symbols.","Record at the end only when both budgets and balance are zero."],
    `class Solution { public List<String> removeInvalidParentheses(String s){Set<String>r=new HashSet<>();int[]best={-1};dfs(s,0,new StringBuilder(),r,best);return new ArrayList<>(r);}private void dfs(String s,int i,StringBuilder b,Set<String>r,int[]best){if(i==s.length()){if(valid(b)){if(b.length()>best[0]){best[0]=b.length();r.clear();}if(b.length()==best[0])r.add(b.toString());}return;}char c=s.charAt(i);if(c=='('||c==')')dfs(s,i+1,b,r,best);b.append(c);dfs(s,i+1,b,r,best);b.deleteCharAt(b.length()-1);}private boolean valid(CharSequence s){int q=0;for(int i=0;i<s.length();i++){char c=s.charAt(i);if(c=='(')q++;else if(c==')'&&--q<0)return false;}return q==0;} }`,
    `class Solution { public List<String> removeInvalidParentheses(String s){int l=0,r=0;for(char c:s.toCharArray())if(c=='(')l++;else if(c==')'){if(l>0)l--;else r++;}Set<String>out=new HashSet<>();dfs(s,0,l,r,0,new StringBuilder(),out);return new ArrayList<>(out);}private void dfs(String s,int i,int l,int r,int balance,StringBuilder b,Set<String>out){if(i==s.length()){if(l==0&&r==0&&balance==0)out.add(b.toString());return;}char c=s.charAt(i);if(c=='('&&l>0)dfs(s,i+1,l-1,r,balance,b,out);if(c==')'&&r>0)dfs(s,i+1,l,r-1,balance,b,out);if(c!=')'||balance>0){b.append(c);dfs(s,i+1,l,r,balance+(c=='('?1:c==')'?-1:0),b,out);b.deleteCharAt(b.length()-1);}} }`
  ),
};
