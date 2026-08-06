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

export const interview300QuestionCount = interview300Topics.reduce((count, item) => count + item.questions.length, 0);

if (interview300QuestionCount !== 300) {
  throw new Error(`Interview 300 must contain exactly 300 questions; received ${interview300QuestionCount}.`);
}

const interview300Titles = interview300Topics.flatMap((item) => item.questions.map(([title]) => title.toLowerCase()));
if (new Set(interview300Titles).size !== interview300Titles.length) {
  throw new Error("Interview 300 must not contain duplicate questions.");
}

if (interview300Topics.some((item) => item.questions.length < 10 || item.questions.length > 30)) {
  throw new Error("Every Interview 300 topic must contain between 10 and 30 questions.");
}

if (interview300Topics.some((item) => item.questions.some(([, , pattern]) => !item.patterns.includes(pattern)))) {
  throw new Error("Every Interview 300 question must belong to a pattern in its topic.");
}
