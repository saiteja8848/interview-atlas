import type { Difficulty } from "@/content/library";

export type CuratedQuestion = readonly [title: string, difficulty: Difficulty, pattern: string];
export type CuratedTopic = {
  title: string;
  concepts: string[];
  patterns: string[];
  questions: CuratedQuestion[];
};

const topic = (title: string, concepts: string[], patterns: string[], questions: CuratedQuestion[]): CuratedTopic => ({ title, concepts, patterns, questions });

// A deliberately finite curriculum: 300 unique questions chosen for pattern coverage,
// recurrence across mainstream interview lists, and practical return on study time.
export const interview300Topics: CuratedTopic[] = [
  topic("Bitwise", ["Binary representation", "AND, OR, XOR and NOT", "Masks and shifts", "Two's complement"], ["Binary arithmetic", "Bit counting", "Bit construction", "XOR cancellation", "Bit masks", "Common prefix"], [
    ["Add Binary", "Easy", "Binary arithmetic"], ["Number of 1 Bits", "Easy", "Bit counting"], ["Counting Bits", "Easy", "Bit counting"], ["Reverse Bits", "Easy", "Bit construction"],
    ["Power of Two", "Easy", "Bit masks"], ["Single Number", "Easy", "XOR cancellation"], ["Missing Number", "Easy", "XOR cancellation"], ["Find the Difference", "Easy", "XOR cancellation"],
    ["Single Number II", "Medium", "Bit counting"], ["Bitwise AND of Numbers Range", "Medium", "Common prefix"], ["Sum of Two Integers", "Medium", "Binary arithmetic"], ["Divide Two Integers", "Medium", "Binary arithmetic"],
  ]),
  topic("Math", ["Number representation", "Modulo arithmetic", "Prime factors", "Combinatorics"], ["Digit manipulation", "Number theory", "Base conversion", "Parsing and simulation", "Geometry"], [
    ["Palindrome Number", "Easy", "Digit manipulation"], ["Plus One", "Easy", "Digit manipulation"], ["Factorial Trailing Zeroes", "Medium", "Number theory"], ["Happy Number", "Easy", "Number theory"],
    ["Sqrt(x)", "Easy", "Number theory"], ["Count Primes", "Medium", "Number theory"], ["Excel Sheet Column Number", "Easy", "Base conversion"], ["Roman to Integer", "Easy", "Parsing and simulation"],
    ["Integer to Roman", "Medium", "Parsing and simulation"], ["Fraction to Recurring Decimal", "Medium", "Parsing and simulation"], ["Multiply Strings", "Medium", "Digit manipulation"], ["Valid Square", "Medium", "Geometry"],
  ]),
  topic("Two Pointers", ["Opposite-end scans", "Slow and fast pointers", "Sorted arrays", "Pointer invariants"], ["Opposite ends", "Sort and sweep", "Read/write pointers", "Fast and slow", "Merge from ends", "Reverse scan", "Greedy pairing"], [
    ["Two Sum II - Input Array Is Sorted", "Medium", "Opposite ends"], ["3Sum", "Medium", "Sort and sweep"], ["3Sum Closest", "Medium", "Sort and sweep"], ["4Sum", "Medium", "Sort and sweep"],
    ["Container With Most Water", "Medium", "Opposite ends"], ["Trapping Rain Water", "Hard", "Opposite ends"], ["Valid Palindrome", "Easy", "Opposite ends"], ["Reverse String", "Easy", "Opposite ends"],
    ["Move Zeroes", "Easy", "Read/write pointers"], ["Remove Duplicates from Sorted Array", "Easy", "Read/write pointers"], ["Remove Element", "Easy", "Read/write pointers"], ["Sort Colors", "Medium", "Read/write pointers"],
    ["Squares of a Sorted Array", "Easy", "Merge from ends"], ["Backspace String Compare", "Easy", "Reverse scan"], ["Boats to Save People", "Medium", "Greedy pairing"], ["Next Permutation", "Medium", "Sort and sweep"],
    ["Find the Duplicate Number", "Medium", "Fast and slow"], ["Is Subsequence", "Easy", "Read/write pointers"],
  ]),
  topic("Sliding Window", ["Fixed and variable windows", "Frequency maps", "Window validity", "Expand and shrink"], ["Fixed window", "Variable window", "Frequency matching", "At-most / exactly-K", "Monotonic deque", "Last-seen window"], [
    ["Best Time to Buy and Sell Stock", "Easy", "Variable window"], ["Longest Substring Without Repeating Characters", "Medium", "Variable window"], ["Longest Repeating Character Replacement", "Medium", "Variable window"], ["Permutation in String", "Medium", "Frequency matching"],
    ["Find All Anagrams in a String", "Medium", "Frequency matching"], ["Minimum Window Substring", "Hard", "Variable window"], ["Minimum Size Subarray Sum", "Medium", "Variable window"], ["Maximum Average Subarray I", "Easy", "Fixed window"],
    ["Sliding Window Maximum", "Hard", "Monotonic deque"], ["Fruit Into Baskets", "Medium", "At-most / exactly-K"], ["Subarray Product Less Than K", "Medium", "Variable window"], ["Max Consecutive Ones III", "Medium", "At-most / exactly-K"],
    ["Subarrays with K Different Integers", "Hard", "At-most / exactly-K"], ["Longest Substring with At Most K Distinct Characters", "Medium", "At-most / exactly-K"], ["Minimum Consecutive Cards to Pick Up", "Medium", "Last-seen window"], ["Grumpy Bookstore Owner", "Medium", "Fixed window"],
    ["Maximum Number of Vowels in a Substring of Given Length", "Medium", "Fixed window"], ["Substring with Concatenation of All Words", "Hard", "Frequency matching"],
  ]),
  topic("Intervals & Greedy", ["Sort by boundaries", "Merge and sweep", "Reachability", "Local versus global choice"], ["Merge and sweep", "Room allocation", "Difference arrays", "Reachability greedy", "Boundary greedy"], [
    ["Merge Intervals", "Medium", "Merge and sweep"], ["Insert Interval", "Medium", "Merge and sweep"], ["Non-overlapping Intervals", "Medium", "Boundary greedy"], ["Meeting Rooms", "Easy", "Merge and sweep"],
    ["Meeting Rooms II", "Medium", "Room allocation"], ["Minimum Number of Arrows to Burst Balloons", "Medium", "Boundary greedy"], ["Car Pooling", "Medium", "Difference arrays"], ["Employee Free Time", "Hard", "Merge and sweep"],
    ["Jump Game", "Medium", "Reachability greedy"], ["Jump Game II", "Medium", "Reachability greedy"], ["Gas Station", "Medium", "Reachability greedy"], ["Partition Labels", "Medium", "Boundary greedy"],
  ]),
  topic("Binary Search", ["Sorted search spaces", "Lower and upper bounds", "Answer-space binary search", "Midpoint invariants"], ["Classic binary search", "Boundaries", "Rotated arrays", "Search on answer", "Search a matrix", "Partition search", "Binary search with data structure"], [
    ["Binary Search", "Easy", "Classic binary search"], ["Search Insert Position", "Easy", "Boundaries"], ["Find First and Last Position of Element in Sorted Array", "Medium", "Boundaries"], ["Search a 2D Matrix", "Medium", "Search a matrix"],
    ["Find Minimum in Rotated Sorted Array", "Medium", "Rotated arrays"], ["Search in Rotated Sorted Array", "Medium", "Rotated arrays"], ["Koko Eating Bananas", "Medium", "Search on answer"], ["Find Peak Element", "Medium", "Classic binary search"],
    ["Time Based Key-Value Store", "Medium", "Binary search with data structure"], ["Median of Two Sorted Arrays", "Hard", "Partition search"], ["Capacity To Ship Packages Within D Days", "Medium", "Search on answer"], ["Split Array Largest Sum", "Hard", "Search on answer"],
    ["Minimum Days to Make m Bouquets", "Medium", "Search on answer"], ["Find K Closest Elements", "Medium", "Boundaries"], ["Find K-th Smallest Pair Distance", "Hard", "Search on answer"], ["Search a 2D Matrix II", "Medium", "Search a matrix"],
    ["Find in Mountain Array", "Hard", "Classic binary search"], ["Aggressive Cows", "Medium", "Search on answer"],
  ]),
  topic("Heaps", ["Min and max heaps", "Heapify", "Priority queues", "Build heap in O(n)"], ["Top-K", "K-way merge", "Two heaps", "Scheduling and reordering", "Heap with greedy", "Multi-source range"], [
    ["Kth Largest Element in an Array", "Medium", "Top-K"], ["Top K Frequent Elements", "Medium", "Top-K"], ["K Closest Points to Origin", "Medium", "Top-K"], ["Kth Smallest Element in a Sorted Matrix", "Medium", "K-way merge"],
    ["Merge k Sorted Lists", "Hard", "K-way merge"], ["Find Median from Data Stream", "Hard", "Two heaps"], ["Kth Largest Element in a Stream", "Easy", "Top-K"], ["Task Scheduler", "Medium", "Scheduling and reordering"],
    ["Reorganize String", "Medium", "Scheduling and reordering"], ["IPO", "Hard", "Heap with greedy"], ["Smallest Range Covering Elements from K Lists", "Hard", "Multi-source range"], ["Furthest Building You Can Reach", "Medium", "Heap with greedy"],
  ]),
  topic("Arrays", ["1D arrays", "2D matrices", "HashMap and HashSet", "Prefix and suffix sums"], ["Hashing", "Prefix sum", "Kadane's algorithm", "In-place marking", "Array transformations", "Matrix traversal", "Prefix-sum query"], [
    ["Two Sum", "Easy", "Hashing"], ["Contains Duplicate", "Easy", "Hashing"], ["Product of Array Except Self", "Medium", "Array transformations"], ["Longest Consecutive Sequence", "Medium", "Hashing"],
    ["Majority Element", "Easy", "Hashing"], ["Majority Element II", "Medium", "Hashing"], ["Maximum Subarray", "Medium", "Kadane's algorithm"], ["Maximum Product Subarray", "Medium", "Kadane's algorithm"],
    ["Subarray Sum Equals K", "Medium", "Prefix sum"], ["Continuous Subarray Sum", "Medium", "Prefix sum"], ["Contiguous Array", "Medium", "Prefix sum"], ["Longest Subarray with Sum K", "Medium", "Prefix sum"],
    ["Maximum Sum Circular Subarray", "Medium", "Kadane's algorithm"], ["First Missing Positive", "Hard", "In-place marking"], ["Merge Sorted Array", "Easy", "Array transformations"], ["Rotate Array", "Medium", "Array transformations"],
    ["Set Matrix Zeroes", "Medium", "Matrix traversal"], ["Spiral Matrix", "Medium", "Matrix traversal"], ["Rotate Image", "Medium", "Matrix traversal"], ["Game of Life", "Medium", "Matrix traversal"],
    ["Diagonal Traverse", "Medium", "Matrix traversal"], ["Pascal's Triangle", "Easy", "Array transformations"], ["Find Pivot Index", "Easy", "Prefix sum"], ["Range Sum Query - Immutable", "Easy", "Prefix-sum query"],
    ["Range Sum Query 2D - Immutable", "Medium", "Prefix-sum query"], ["Find All Numbers Disappeared in an Array", "Easy", "In-place marking"], ["Intersection of Two Arrays", "Easy", "Hashing"],
  ]),
  topic("Strings", ["Character frequency", "Parsing", "Palindrome checks", "String building"], ["Frequency signatures", "Palindrome expansion", "Parsing and simulation", "String transforms", "Prefix matching", "Hashing and encoding", "Stack-assisted parsing"], [
    ["Valid Anagram", "Easy", "Frequency signatures"], ["Group Anagrams", "Medium", "Frequency signatures"], ["Longest Common Prefix", "Easy", "Prefix matching"], ["Longest Palindromic Substring", "Medium", "Palindrome expansion"],
    ["Palindromic Substrings", "Medium", "Palindrome expansion"], ["String Compression", "Medium", "String transforms"], ["Reverse Words in a String", "Medium", "String transforms"], ["Isomorphic Strings", "Easy", "Frequency signatures"],
    ["Word Pattern", "Easy", "Frequency signatures"], ["Find the Index of the First Occurrence in a String", "Easy", "Prefix matching"], ["String to Integer (atoi)", "Medium", "Parsing and simulation"], ["Zigzag Conversion", "Medium", "String transforms"],
    ["Compare Version Numbers", "Medium", "Parsing and simulation"], ["Add Strings", "Easy", "String transforms"], ["Count and Say", "Medium", "Parsing and simulation"], ["Valid Palindrome II", "Easy", "Palindrome expansion"],
    ["Repeated DNA Sequences", "Medium", "Hashing and encoding"], ["Find Duplicate File in System", "Medium", "Hashing and encoding"], ["Encode and Decode Strings", "Medium", "Hashing and encoding"], ["Longest Valid Parentheses", "Hard", "Stack-assisted parsing"],
    ["Minimum Remove to Make Valid Parentheses", "Medium", "Stack-assisted parsing"],
  ]),
  topic("Linked Lists", ["Singly and doubly linked lists", "Dummy nodes", "Pointer updates", "Fast and slow pointers"], ["In-place reversal", "Fast and slow", "Fixed-gap pointers", "Merge and sort", "Hash map and copies", "Doubly linked design", "Segment reversal"], [
    ["Reverse Linked List", "Easy", "In-place reversal"], ["Merge Two Sorted Lists", "Easy", "Merge and sort"], ["Linked List Cycle", "Easy", "Fast and slow"], ["Linked List Cycle II", "Medium", "Fast and slow"],
    ["Intersection of Two Linked Lists", "Easy", "Fixed-gap pointers"], ["Remove Nth Node From End of List", "Medium", "Fixed-gap pointers"], ["Reorder List", "Medium", "In-place reversal"], ["Palindrome Linked List", "Easy", "In-place reversal"],
    ["Add Two Numbers", "Medium", "In-place reversal"], ["Copy List with Random Pointer", "Medium", "Hash map and copies"], ["LRU Cache", "Medium", "Doubly linked design"], ["Reverse Nodes in k-Group", "Hard", "Segment reversal"],
    ["Swap Nodes in Pairs", "Medium", "Segment reversal"], ["Rotate List", "Medium", "Fixed-gap pointers"], ["Partition List", "Medium", "Merge and sort"], ["Sort List", "Medium", "Merge and sort"],
    ["Flatten a Multilevel Doubly Linked List", "Medium", "Doubly linked design"], ["Odd Even Linked List", "Medium", "In-place reversal"], ["Remove Duplicates from Sorted List II", "Medium", "Merge and sort"], ["Delete Node in a Linked List", "Medium", "In-place reversal"],
    ["Design Browser History", "Medium", "Doubly linked design"],
  ]),
  topic("Stack", ["LIFO operations", "ArrayDeque", "Call stack", "Monotonic stacks"], ["Bracket and expression evaluation", "Monotonic stack", "Simulation", "Path normalization", "Parsing and calculation", "Stack design"], [
    ["Valid Parentheses", "Easy", "Bracket and expression evaluation"], ["Min Stack", "Medium", "Stack design"], ["Evaluate Reverse Polish Notation", "Medium", "Bracket and expression evaluation"], ["Daily Temperatures", "Medium", "Monotonic stack"],
    ["Next Greater Element I", "Easy", "Monotonic stack"], ["Next Greater Element II", "Medium", "Monotonic stack"], ["Largest Rectangle in Histogram", "Hard", "Monotonic stack"], ["Car Fleet", "Medium", "Monotonic stack"],
    ["Asteroid Collision", "Medium", "Simulation"], ["Simplify Path", "Medium", "Path normalization"], ["Basic Calculator", "Hard", "Parsing and calculation"], ["Basic Calculator II", "Medium", "Parsing and calculation"],
    ["Remove K Digits", "Medium", "Monotonic stack"], ["Decode String", "Medium", "Bracket and expression evaluation"], ["Online Stock Span", "Medium", "Monotonic stack"],
  ]),
  topic("Queue", ["FIFO operations", "Circular queues", "Deques", "Amortized queue design"], ["Queue design", "Stream processing", "Deque design", "Simulation", "Rate and window counting"], [
    ["Implement Queue using Stacks", "Easy", "Queue design"], ["Design Circular Queue", "Medium", "Queue design"], ["Design Circular Deque", "Medium", "Deque design"], ["Implement Stack using Queues", "Easy", "Queue design"],
    ["Moving Average from Data Stream", "Easy", "Stream processing"], ["Number of Recent Calls", "Easy", "Rate and window counting"], ["First Unique Number", "Medium", "Stream processing"], ["Design Hit Counter", "Medium", "Rate and window counting"],
    ["Time Needed to Buy Tickets", "Easy", "Simulation"], ["Dota2 Senate", "Medium", "Simulation"],
  ]),
  topic("Recursion", ["Base cases", "Call stack", "Recursive state", "Divide and conquer"], ["Linear recursion", "Divide and conquer", "Recursive decomposition", "Recursive search"], [
    ["Factorial", "Easy", "Linear recursion"], ["Fibonacci Number", "Easy", "Linear recursion"], ["Recursive Binary Search", "Easy", "Recursive search"], ["Merge Sort", "Medium", "Divide and conquer"],
    ["Quick Sort", "Medium", "Divide and conquer"], ["Sort an Array", "Medium", "Divide and conquer"], ["K-th Symbol in Grammar", "Medium", "Recursive search"], ["Different Ways to Add Parentheses", "Medium", "Recursive decomposition"],
    ["Tower of Hanoi", "Medium", "Recursive decomposition"], ["Josephus Problem", "Medium", "Linear recursion"], ["Pow(x, n)", "Medium", "Divide and conquer"], ["Nested List Weight Sum", "Medium", "Recursive decomposition"],
  ]),
  topic("Backtracking", ["Choose-explore-undo", "Recursion tree", "Pruning", "State restoration"], ["Pick or skip", "Combinations", "Permutations", "Partitioning", "Grid search", "Constraint satisfaction", "Pruned search"], [
    ["Subsets", "Medium", "Pick or skip"], ["Subsets II", "Medium", "Pick or skip"], ["Combinations", "Medium", "Combinations"], ["Combination Sum", "Medium", "Combinations"],
    ["Combination Sum II", "Medium", "Combinations"], ["Combination Sum III", "Medium", "Combinations"], ["Permutations", "Medium", "Permutations"], ["Permutations II", "Medium", "Permutations"],
    ["Letter Combinations of a Phone Number", "Medium", "Combinations"], ["Generate Parentheses", "Medium", "Pruned search"], ["Palindrome Partitioning", "Medium", "Partitioning"], ["Restore IP Addresses", "Medium", "Partitioning"],
    ["Word Search", "Medium", "Grid search"], ["N-Queens", "Hard", "Constraint satisfaction"], ["Sudoku Solver", "Hard", "Constraint satisfaction"], ["Matchsticks to Square", "Medium", "Pruned search"],
    ["Partition to K Equal Sum Subsets", "Medium", "Pruned search"], ["Remove Invalid Parentheses", "Hard", "Pruned search"],
  ]),
  topic("Dynamic Programming", ["State", "Transition", "Base cases", "Memoization and tabulation"], ["1D recurrence", "Take or skip / knapsack", "Subsequence DP", "String DP", "Grid DP", "State machine", "Interval DP"], [
    ["Climbing Stairs", "Easy", "1D recurrence"], ["Min Cost Climbing Stairs", "Easy", "1D recurrence"], ["House Robber", "Medium", "Take or skip / knapsack"], ["House Robber II", "Medium", "Take or skip / knapsack"],
    ["Delete and Earn", "Medium", "Take or skip / knapsack"], ["Coin Change", "Medium", "Take or skip / knapsack"], ["Coin Change II", "Medium", "Take or skip / knapsack"], ["Combination Sum IV", "Medium", "1D recurrence"],
    ["Partition Equal Subset Sum", "Medium", "Take or skip / knapsack"], ["Target Sum", "Medium", "Take or skip / knapsack"], ["0/1 Knapsack", "Medium", "Take or skip / knapsack"], ["Longest Increasing Subsequence", "Medium", "Subsequence DP"],
    ["Russian Doll Envelopes", "Hard", "Subsequence DP"], ["Longest Common Subsequence", "Medium", "String DP"], ["Edit Distance", "Hard", "String DP"], ["Distinct Subsequences", "Hard", "String DP"],
    ["Word Break", "Medium", "String DP"], ["Decode Ways", "Medium", "1D recurrence"], ["Unique Paths", "Medium", "Grid DP"], ["Unique Paths II", "Medium", "Grid DP"],
    ["Minimum Path Sum", "Medium", "Grid DP"], ["Maximal Square", "Medium", "Grid DP"], ["Longest Increasing Path in a Matrix", "Hard", "Grid DP"], ["Best Time to Buy and Sell Stock with Cooldown", "Medium", "State machine"],
    ["Burst Balloons", "Hard", "Interval DP"],
  ]),
  topic("Trees", ["Binary trees", "Binary search trees", "Tries", "Tree traversals and recursion"], ["Tree DFS", "Tree BFS", "BST invariant", "Tree construction", "Tree conversion", "Tree serialization", "Trie"], [
    ["Maximum Depth of Binary Tree", "Easy", "Tree DFS"], ["Same Tree", "Easy", "Tree DFS"], ["Invert Binary Tree", "Easy", "Tree DFS"], ["Balanced Binary Tree", "Easy", "Tree DFS"],
    ["Diameter of Binary Tree", "Easy", "Tree DFS"], ["Binary Tree Maximum Path Sum", "Hard", "Tree DFS"], ["Path Sum", "Easy", "Tree DFS"], ["Path Sum II", "Medium", "Tree DFS"],
    ["Subtree of Another Tree", "Easy", "Tree DFS"], ["Count Good Nodes in Binary Tree", "Medium", "Tree DFS"], ["Binary Tree Level Order Traversal", "Medium", "Tree BFS"], ["Binary Tree Zigzag Level Order Traversal", "Medium", "Tree BFS"],
    ["Binary Tree Right Side View", "Medium", "Tree BFS"], ["Average of Levels in Binary Tree", "Easy", "Tree BFS"], ["Validate Binary Search Tree", "Medium", "BST invariant"], ["Kth Smallest Element in a BST", "Medium", "BST invariant"],
    ["Lowest Common Ancestor of a Binary Tree", "Medium", "Tree DFS"], ["Lowest Common Ancestor of a Binary Search Tree", "Medium", "BST invariant"], ["Binary Search Tree Iterator", "Medium", "BST invariant"], ["Convert Sorted Array to Binary Search Tree", "Easy", "Tree conversion"],
    ["Construct Binary Tree from Preorder and Inorder Traversal", "Medium", "Tree construction"], ["Flatten Binary Tree to Linked List", "Medium", "Tree conversion"], ["Serialize and Deserialize Binary Tree", "Hard", "Tree serialization"], ["Implement Trie (Prefix Tree)", "Medium", "Trie"],
    ["Design Add and Search Words Data Structure", "Medium", "Trie"],
  ]),
  topic("Graphs", ["Adjacency lists", "DFS and BFS", "Directed and undirected graphs", "Union-Find"], ["Grid traversal", "Graph traversal", "Topological sort", "Union-Find", "BFS shortest path", "Dijkstra", "Minimum spanning tree", "Graph ordering"], [
    ["Number of Islands", "Medium", "Grid traversal"], ["Max Area of Island", "Medium", "Grid traversal"], ["Clone Graph", "Medium", "Graph traversal"], ["Course Schedule", "Medium", "Topological sort"],
    ["Course Schedule II", "Medium", "Topological sort"], ["Graph Valid Tree", "Medium", "Union-Find"], ["Number of Connected Components in an Undirected Graph", "Medium", "Union-Find"], ["Redundant Connection", "Medium", "Union-Find"],
    ["Number of Provinces", "Medium", "Graph traversal"], ["Is Graph Bipartite?", "Medium", "Graph traversal"], ["Rotting Oranges", "Medium", "Grid traversal"], ["Word Ladder", "Hard", "BFS shortest path"],
    ["Pacific Atlantic Water Flow", "Medium", "Grid traversal"], ["Surrounded Regions", "Medium", "Grid traversal"], ["Walls and Gates", "Medium", "Grid traversal"], ["Open the Lock", "Medium", "BFS shortest path"],
    ["Evaluate Division", "Medium", "Graph traversal"], ["Network Delay Time", "Medium", "Dijkstra"], ["Cheapest Flights Within K Stops", "Medium", "Dijkstra"], ["Reconstruct Itinerary", "Hard", "Graph ordering"],
    ["Accounts Merge", "Medium", "Union-Find"], ["Min Cost to Connect All Points", "Medium", "Minimum spanning tree"], ["Critical Connections in a Network", "Hard", "Graph traversal"], ["Alien Dictionary", "Hard", "Topological sort"],
  ]),
];

// PDF-backed expansions: these are the complete problem modules from the supplied
// Binary Search and Bit Manipulation guides. They are appended to the curated core
// so the learner can follow the same pattern -> question -> explanation flow.
const binaryPdf = interview300Topics.find((item) => item.title === "Binary Search")!;
binaryPdf.patterns = ["BS on 1D Arrays", "BS on Answers", "BS on 2D Arrays"];
const binaryPdfQuestions: CuratedQuestion[] = [
  ["Search in Sorted Array (LeetCode 704)", "Easy", "Classic binary search"], ["Lower Bound", "Easy", "Boundaries"], ["Upper Bound", "Easy", "Boundaries"], ["Search Insert Position (LeetCode 35)", "Easy", "Boundaries"],
  ["Floor and Ceil in Sorted Array", "Medium", "Boundaries"], ["First and Last Occurrence (LeetCode 34)", "Medium", "Boundaries"], ["Count Occurrences in a Sorted Array", "Easy", "Boundaries"],
  ["Search in Rotated Sorted Array I (LeetCode 33)", "Medium", "Rotated arrays"], ["Search in Rotated Sorted Array II (LeetCode 81)", "Medium", "Rotated arrays"], ["Find Minimum in Rotated Sorted Array (LeetCode 153)", "Medium", "Rotated arrays"], ["Find How Many Times the Array Is Rotated", "Medium", "Rotated arrays"], ["Single Element in a Sorted Array (LeetCode 540)", "Medium", "Classic binary search"], ["Find Peak Element (LeetCode 162)", "Medium", "Peak search"],
  ["Find Row With Maximum 1s", "Medium", "2D matrix search"], ["Search in a 2D Matrix (LeetCode 74)", "Medium", "2D matrix search"], ["Search in 2D Matrix II (LeetCode 240)", "Medium", "2D matrix search"], ["Find Peak Element II", "Hard", "Peak search"], ["Matrix Median", "Hard", "2D matrix search"],
  ["Square Root of a Number (LeetCode 69)", "Easy", "Search on answer"], ["Nth Root of a Number", "Medium", "Search on answer"], ["Koko Eating Bananas (LeetCode 875)", "Medium", "Search on answer"], ["Minimum Days to Make M Bouquets (LeetCode 1482)", "Medium", "Search on answer"], ["Smallest Divisor (LeetCode 1283)", "Medium", "Search on answer"], ["Capacity to Ship Packages Within D Days (LeetCode 1011)", "Medium", "Search on answer"], ["Kth Missing Positive Number (LeetCode 1539)", "Easy", "Search on answer"], ["Aggressive Cows", "Medium", "Search on answer"], ["Book Allocation Problem", "Hard", "Search on answer"], ["Split Array Largest Sum (LeetCode 410)", "Hard", "Search on answer"], ["Painter's Partition Problem", "Hard", "Search on answer"], ["Minimize Maximum Distance to Gas Station (LeetCode 774)", "Hard", "Search on answer"], ["Median of Two Sorted Arrays (LeetCode 4)", "Hard", "Partition search"], ["Kth Element of Two Sorted Arrays", "Hard", "Partition search"],
];
const binaryPdfCatalog: CuratedQuestion[] = [
  ["Search X in sorted array", "Easy", "BS on 1D Arrays"], ["Lower Bound", "Easy", "BS on 1D Arrays"], ["Upper Bound", "Easy", "BS on 1D Arrays"], ["Search insert position", "Easy", "BS on 1D Arrays"], ["Floor and Ceil in Sorted Array", "Medium", "BS on 1D Arrays"], ["First and last occurrence", "Medium", "BS on 1D Arrays"], ["Count Occurrences in a Sorted Array", "Easy", "BS on 1D Arrays"], ["Search in rotated sorted array-I", "Medium", "BS on 1D Arrays"], ["Search in rotated sorted array-II", "Medium", "BS on 1D Arrays"], ["Find minimum in Rotated Sorted Array", "Medium", "BS on 1D Arrays"], ["Find out how many times the array is rotated", "Medium", "BS on 1D Arrays"], ["Single element in a Sorted Array", "Medium", "BS on 1D Arrays"], ["Find peak element", "Medium", "BS on 1D Arrays"],
  ["Find square root of a number", "Easy", "BS on Answers"], ["Find Nth root of a number", "Medium", "BS on Answers"], ["Koko eating bananas", "Medium", "BS on Answers"], ["Minimum days to make M bouquets", "Medium", "BS on Answers"], ["Find the smallest divisor", "Medium", "BS on Answers"], ["Capacity to Ship Packages Within D Days", "Medium", "BS on Answers"], ["Kth Missing Positive Number", "Easy", "BS on Answers"], ["Aggressive Cows", "Medium", "BS on Answers"], ["Book Allocation Problem", "Hard", "BS on Answers"], ["Split array - largest sum", "Hard", "BS on Answers"], ["Painter's Partition", "Hard", "BS on Answers"], ["Minimize Max Distance to Gas Station", "Hard", "BS on Answers"], ["Median of 2 sorted arrays", "Hard", "BS on Answers"], ["Kth element of 2 sorted arrays", "Hard", "BS on Answers"],
  ["Find row with maximum 1's", "Medium", "BS on 2D Arrays"], ["Search in a 2D matrix", "Medium", "BS on 2D Arrays"], ["Search in 2D matrix - II", "Medium", "BS on 2D Arrays"], ["Find Peak Element - II", "Hard", "BS on 2D Arrays"], ["Matrix Median", "Hard", "BS on 2D Arrays"],
];
binaryPdf.questions = binaryPdfCatalog;

const bitwisePdf = interview300Topics.find((item) => item.title === "Bitwise")!;
bitwisePdf.patterns = ["Single-bit operations", "Counting and checking", "XOR patterns", "Bit construction", "Arithmetic with bits", "Conversions and number theory"];
const bitwisePdfQuestions: CuratedQuestion[] = [
  ["Get, Set, Clear, Toggle ith Bit", "Easy", "Single-bit operations"], ["Check if ith Bit Is Set", "Easy", "Single-bit operations"], ["Check if Number Is Power of Two", "Easy", "Counting and checking"], ["Check if Number Is Odd or Even", "Easy", "Single-bit operations"], ["Number of 1 Bits (Hamming Weight)", "Easy", "Counting and checking"], ["Counting Bits", "Easy", "Counting and checking"], ["Reverse Bits", "Easy", "Bit construction"], ["Minimum Bit Flips to Convert Number", "Medium", "Counting and checking"],
  ["Sparse Number", "Easy", "Counting and checking"], ["Subsets (Power Set)", "Medium", "Bit construction"], ["Bitwise AND of Numbers Range", "Medium", "XOR patterns"], ["Copy Set Bits in a Range", "Medium", "Single-bit operations"], ["Swap Two Numbers Using XOR", "Easy", "XOR patterns"], ["Maximum XOR Subset", "Hard", "XOR patterns"], ["XOR of Numbers in a Given Range", "Medium", "XOR patterns"], ["Single Number II", "Medium", "XOR patterns"], ["Single Number III (LeetCode 260)", "Medium", "XOR patterns"], ["Missing Number", "Easy", "XOR patterns"],
  ["Add Binary", "Easy", "Arithmetic with bits"], ["Divide Two Integers Without Multiplication", "Medium", "Arithmetic with bits"], ["Power (x, n) Fast Exponentiation", "Medium", "Arithmetic with bits"], ["Square Without Multiplication", "Medium", "Arithmetic with bits"], ["Sum of Bit Differences Among All Pairs", "Medium", "Counting and checking"], ["Print Prime Factors of a Number", "Medium", "Conversions and number theory"], ["Count Primes in Range", "Medium", "Conversions and number theory"], ["Decimal to Binary", "Easy", "Conversions and number theory"], ["Binary to Decimal", "Easy", "Conversions and number theory"], ["Count Set Bits from 1 to N", "Hard", "Counting and checking"], ["Power Set Using Bit Masks", "Medium", "Bit construction"],
];
for (const question of bitwisePdfQuestions) if (!bitwisePdf.questions.some(([title]) => title === question[0])) bitwisePdf.questions.push(question);

// PDF-backed Greedy expansion. The supplied guide is organized around the same
// eight reusable patterns shown in its cheat sheet; keep the source titles intact
// so the topic page mirrors the guide's problem order.
const greedyPdf = interview300Topics.find((item) => item.title === "Intervals & Greedy")!;
greedyPdf.patterns = ["Sort + greedy pick", "Interval scheduling", "Reachability / jump", "Running balance / prefix", "Partition greedy", "Frequency + greedy", "Heap-assisted greedy", "Monotonic stack greedy"];
const greedyPdfCatalog: CuratedQuestion[] = [
  ["Assign Cookies (LeetCode 455)", "Easy", "Sort + greedy pick"], ["Lemonade Change (LeetCode 860)", "Easy", "Sort + greedy pick"], ["Can Place Flowers (LeetCode 605)", "Easy", "Sort + greedy pick"], ["Best Time to Buy and Sell Stock II (LeetCode 122)", "Medium", "Sort + greedy pick"], ["Boats to Save People (LeetCode 881)", "Medium", "Sort + greedy pick"], ["Maximum Units on a Truck (LeetCode 1710)", "Easy", "Sort + greedy pick"], ["Bag of Tokens (LeetCode 948)", "Medium", "Sort + greedy pick"], ["Two City Scheduling (LeetCode 1029)", "Medium", "Sort + greedy pick"],
  ["Summary Ranges (LeetCode 228)", "Easy", "Interval scheduling"], ["Non-overlapping Intervals (LeetCode 435)", "Medium", "Interval scheduling"], ["Minimum Number of Arrows to Burst Balloons (LeetCode 452)", "Medium", "Interval scheduling"], ["Merge Intervals (LeetCode 56)", "Medium", "Interval scheduling"], ["Insert Interval (LeetCode 57)", "Medium", "Interval scheduling"], ["Meeting Rooms I (LeetCode 252)", "Easy", "Interval scheduling"], ["Meeting Rooms II (LeetCode 253)", "Medium", "Interval scheduling"], ["Car Pooling (LeetCode 1094)", "Medium", "Interval scheduling"], ["Minimum Platforms (GFG)", "Medium", "Interval scheduling"],
  ["Jump Game (LeetCode 55)", "Medium", "Reachability / jump"], ["Jump Game II (LeetCode 45)", "Medium", "Reachability / jump"], ["Gas Station (LeetCode 134)", "Medium", "Reachability / jump"],
  ["Maximum Subarray (LeetCode 53)", "Medium", "Running balance / prefix"], ["Maximum Sum Circular Subarray (LeetCode 918)", "Medium", "Running balance / prefix"],
  ["Partition Labels (LeetCode 763)", "Medium", "Partition greedy"], ["Optimal Partition of String (LeetCode 2405)", "Medium", "Partition greedy"], ["Merge Triplets to Form Target Triplet (LeetCode 1899)", "Medium", "Partition greedy"], ["Increasing Triplet Subsequence (LeetCode 334)", "Medium", "Partition greedy"], ["Find the Celebrity (LeetCode 277)", "Medium", "Partition greedy"],
  ["Task Scheduler (LeetCode 621)", "Medium", "Frequency + greedy"], ["Reorganize String (LeetCode 767)", "Medium", "Frequency + greedy"], ["Hand of Straights (LeetCode 846)", "Medium", "Frequency + greedy"], ["Divide Array in Sets of K Consecutive Numbers (LeetCode 1296)", "Medium", "Frequency + greedy"], ["Distribute Candies (LeetCode 575)", "Easy", "Frequency + greedy"],
  ["Minimum Number of Refueling Stops (LeetCode 871)", "Hard", "Heap-assisted greedy"], ["Furthest Building You Can Reach (LeetCode 1642)", "Medium", "Heap-assisted greedy"], ["IPO (LeetCode 502)", "Hard", "Heap-assisted greedy"], ["Course Schedule III (LeetCode 630)", "Hard", "Heap-assisted greedy"], ["Maximum Performance of a Team (LeetCode 1383)", "Hard", "Heap-assisted greedy"],
  ["Queue Reconstruction by Height (LeetCode 406)", "Medium", "Monotonic stack greedy"], ["Largest Number (LeetCode 179)", "Medium", "Monotonic stack greedy"], ["Remove K Digits (LeetCode 402)", "Medium", "Monotonic stack greedy"], ["Remove Duplicate Letters (LeetCode 316)", "Medium", "Monotonic stack greedy"], ["Smallest Subsequence of Distinct Characters (LeetCode 1081)", "Medium", "Monotonic stack greedy"], ["Valid Parenthesis String (LeetCode 678)", "Medium", "Monotonic stack greedy"], ["Minimum Add to Make Parentheses Valid (LeetCode 921)", "Medium", "Monotonic stack greedy"], ["Minimum Swaps to Make String Balanced (LeetCode 1963)", "Medium", "Monotonic stack greedy"], ["Candy (LeetCode 135)", "Hard", "Monotonic stack greedy"], ["Wiggle Subsequence (LeetCode 376)", "Medium", "Monotonic stack greedy"], ["Minimum Deletions to Make Character Frequencies Unique (LeetCode 1647)", "Medium", "Monotonic stack greedy"],
];
greedyPdf.questions = greedyPdfCatalog;

// Tree guide expansion, including the companion Tries and Segment Trees guide.
// Both are presented as child patterns of the Trees topic in the study plan.
const treesPdf = interview300Topics.find((item) => item.title === "Trees")!;
treesPdf.patterns = ["Breadth First Traversal", "Depth First Traversal", "Tree Properties", "Tree Views & Traversals", "Tree Validations", "Tree Constructions and Conversions", "Tree Sum", "Tries", "Segment Trees"];
const treesPdfCatalog: CuratedQuestion[] = [
  ["BFS - I (Top-down Level order traversal)", "Medium", "Breadth First Traversal"], ["BFS - II (Bottom-up Level order traversal)", "Medium", "Breadth First Traversal"], ["N-ary Tree Level Order Traversal", "Easy", "Breadth First Traversal"], ["Average of Levels in a Binary Tree", "Easy", "Breadth First Traversal"], ["Cousins in a Binary Tree", "Easy", "Breadth First Traversal"],
  ["Pre-Order Traversal", "Easy", "Depth First Traversal"], ["N-ary Tree Pre-order", "Easy", "Depth First Traversal"], ["Post-Order Traversal", "Easy", "Depth First Traversal"], ["N-ary Tree Post-order", "Easy", "Depth First Traversal"], ["In-Order Traversal", "Easy", "Depth First Traversal"],
  ["Height of Binary Tree", "Easy", "Tree Properties"], ["Maximum Depth of Binary Tree", "Easy", "Tree Properties"], ["Minimum Depth of Binary Tree", "Easy", "Tree Properties"], ["Maximum Depth of N-ary Tree", "Easy", "Tree Properties"], ["Diameter of Binary Tree", "Easy", "Tree Properties"], ["Maximum Width of Binary Tree", "Medium", "Tree Properties"],
  ["Left View of a Tree", "Medium", "Tree Views & Traversals"], ["Right View of a Tree", "Medium", "Tree Views & Traversals"], ["Top View of a Tree", "Medium", "Tree Views & Traversals"], ["Bottom View of a Tree", "Medium", "Tree Views & Traversals"], ["Bottom Left View of a Tree", "Medium", "Tree Views & Traversals"], ["Boundary Traversal", "Medium", "Tree Views & Traversals"], ["Zigzag Traversal", "Medium", "Tree Views & Traversals"], ["Vertical Order Traversal", "Hard", "Tree Views & Traversals"],
  ["Invert Binary Tree", "Easy", "Tree Validations"], ["Same Tree", "Easy", "Tree Validations"], ["Subtree of Another Tree", "Easy", "Tree Validations"], ["Symmetric Tree", "Easy", "Tree Validations"], ["Balanced Binary Tree", "Easy", "Tree Validations"], ["Validate Binary Search Tree", "Medium", "Tree Validations"], ["Unique Binary Search Trees", "Medium", "Tree Validations"],
  ["Inorder Successor in BST", "Medium", "Tree Constructions and Conversions"], ["Count Leaves in Binary Tree", "Easy", "Tree Constructions and Conversions"], ["Convert Sorted Array to Binary Search Tree", "Easy", "Tree Constructions and Conversions"], ["Convert Sorted List to Binary Search Tree", "Medium", "Tree Constructions and Conversions"], ["Flatten Binary Tree to Linked List", "Medium", "Tree Constructions and Conversions"], ["Convert Binary Search Tree to Sorted Doubly Linked List", "Medium", "Tree Constructions and Conversions"], ["Convert BST to Greater Tree", "Medium", "Tree Constructions and Conversions"], ["Construct Binary Tree from Preorder and Inorder Traversal", "Medium", "Tree Constructions and Conversions"], ["Construct String from Binary Tree", "Medium", "Tree Constructions and Conversions"],
  ["Path Sum I and II", "Medium", "Tree Sum"], ["Sum Root to Leaf Numbers", "Medium", "Tree Sum"], ["Maximum Path Sum", "Hard", "Tree Sum"], ["Populating Next Right Pointers in Each Node", "Medium", "Tree Sum"], ["Trim a Binary Search Tree", "Medium", "Tree Sum"], ["Serialize and Deserialize a Binary Tree", "Hard", "Tree Sum"], ["Lowest Common Ancestor in BST", "Medium", "Tree Sum"], ["Lowest Common Ancestor in Binary Tree", "Medium", "Tree Sum"], ["Merge Two Binary Trees", "Easy", "Tree Sum"], ["Kth Smallest Element in a BST", "Medium", "Tree Sum"],
  ["Implement Prefix Tree", "Medium", "Tries"], ["Design Add and Search Words Data Structure", "Medium", "Tries"],
  ["Range Sum Query - Mutable", "Medium", "Segment Trees"], ["Range Sum Query - Immutable", "Easy", "Segment Trees"], ["Range Sum Query 2D - Immutable", "Medium", "Segment Trees"],
];
treesPdf.questions = treesPdfCatalog;

export const interview300QuestionCount = interview300Topics.reduce((count, item) => count + item.questions.length, 0);

const interview300Titles = interview300Topics.flatMap((item) => item.questions.map(([title]) => title.toLowerCase()));
// A few PDF titles intentionally overlap with canonical interview names; retain the
// first occurrence in the rendered curriculum while allowing the source catalog to
// retain its original labels.

// Topic sizes and legacy pattern labels may exceed the original Interview 300
// bounds after importing the supplied PDF curricula; the runtime groups unmatched
// legacy labels into the nearest current pattern.
