import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const e = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });
const p = (statement: string, examples: ProblemExample[], constraints: string[], bruteExplanation: string, drawback: string, bruteComplexity: string, bruteCode: string, optimizedExplanation: string, optimizedComplexity: string, steps: string[], optimizedCode: string): ProblemContent => ({ statement, examples, constraints, brute: { explanation: bruteExplanation, drawback, complexity: bruteComplexity, code: bruteCode }, optimized: { explanation: optimizedExplanation, complexity: optimizedComplexity, steps, code: optimizedCode } });

export const problemContentG: Record<string, ProblemContent> = {
  "lowest-common-ancestor-of-a-binary-tree": p(
    "Given a binary tree and two existing nodes p and q, return their lowest common ancestor: the deepest node whose subtree contains both nodes. A node may be its own descendant.",
    [e("root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", "3", "The two nodes lie in different subtrees of the root."), e("root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", "5", "Node five is an ancestor of node four."), e("root = [1,2], p = 1, q = 2", "1", "The root is one of the requested nodes.")],
    ["The tree contains 2 to 100000 nodes.", "-10^9 <= TreeNode.val <= 10^9", "All values are unique and p and q exist in the tree."],
    "Find the root-to-node path for p and q separately, then scan the two paths until their nodes differ. The last shared node is the answer.",
    "It traverses the tree twice and stores two complete root paths.",
    "Time O(n), space O(h).",
    `class Solution {
  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    java.util.List<TreeNode> first = new java.util.ArrayList<>();
    java.util.List<TreeNode> second = new java.util.ArrayList<>();
    path(root, p, first);
    path(root, q, second);
    TreeNode answer = root;
    for (int i = 0; i < Math.min(first.size(), second.size()) && first.get(i) == second.get(i); i++) answer = first.get(i);
    return answer;
  }
  private boolean path(TreeNode node, TreeNode target, java.util.List<TreeNode> result) {
    if (node == null) return false;
    result.add(node);
    if (node == target || path(node.left, target, result) || path(node.right, target, result)) return true;
    result.remove(result.size() - 1);
    return false;
  }
}`,
    "Postorder recursion returns p or q when found. If both child subtrees return a node, the current node is their first meeting point; otherwise propagate the one non-null result.",
    "Time O(n), space O(h).",
    ["Return null for an empty subtree and return the current node when it is p or q.", "Search both child subtrees.", "Return the current node when both sides found a target; otherwise propagate the non-null side."],
    `class Solution {
  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
  }
}`,
  ),
  "lowest-common-ancestor-of-a-binary-search-tree": p(
    "Given a binary search tree and two existing nodes p and q, return their lowest common ancestor.",
    [e("root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", "6", "The values split on opposite sides of six."), e("root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", "2", "Node two is an ancestor of node four."), e("root = [2,1], p = 2, q = 1", "2", "The root is one requested node.")],
    ["The tree contains 2 to 100000 nodes.", "-10^9 <= Node.val <= 10^9", "All values are unique and the BST invariant holds."],
    "Build the search path from the root to each target using the BST comparisons, then return the final shared node.",
    "It stores two paths even though their divergence can be recognized during one search.",
    "Time O(h), space O(h).",
    `class Solution {
  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    java.util.List<TreeNode> a = path(root, p.val);
    java.util.List<TreeNode> b = path(root, q.val);
    TreeNode answer = root;
    for (int i = 0; i < Math.min(a.size(), b.size()) && a.get(i) == b.get(i); i++) answer = a.get(i);
    return answer;
  }
  private java.util.List<TreeNode> path(TreeNode node, int target) {
    java.util.List<TreeNode> result = new java.util.ArrayList<>();
    while (node != null) {
      result.add(node);
      if (target == node.val) break;
      node = target < node.val ? node.left : node.right;
    }
    return result;
  }
}`,
    "If both target values are smaller, the LCA must be left; if both are larger, it must be right. The first node between the two values is the split point and answer.",
    "Time O(h), space O(1).",
    ["Order the two target values as low and high.", "Move left while the current value exceeds high and right while it is below low.", "Return the first current value inside the inclusive target range."],
    `class Solution {
  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    int low = Math.min(p.val, q.val);
    int high = Math.max(p.val, q.val);
    TreeNode current = root;
    while (current.val < low || current.val > high) current = current.val > high ? current.left : current.right;
    return current;
  }
}`,
  ),
  "binary-search-tree-iterator": p(
    "Design an iterator over a binary search tree that returns values in ascending order. next returns the next value, and hasNext reports whether another value exists.",
    [e("operations = [BSTIterator,next,next,hasNext,next,hasNext,next,hasNext,next,hasNext], root = [7,3,15,null,null,9,20]", "[null,3,7,true,9,true,15,true,20,false]", "The iterator emits the inorder sequence."), e("root = [1], operations = [BSTIterator,hasNext,next,hasNext]", "[null,true,1,false]", "The single value is emitted once.")],
    ["The tree contains at most 100000 nodes.", "0 <= Node.val <= 10^6", "At most 100000 calls are made and next is called only when a value exists."],
    "Perform a complete inorder traversal in the constructor and store every value in a list. next reads the next list position.",
    "Construction and storage are O(n), even when the caller consumes only a prefix.",
    "Construction O(n), next and hasNext O(1), space O(n).",
    `class BSTIterator {
  private final java.util.List<Integer> values = new java.util.ArrayList<>();
  private int index;
  public BSTIterator(TreeNode root) {
    inorder(root);
  }
  private void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    values.add(node.val);
    inorder(node.right);
  }
  public int next() {
    return values.get(index++);
  }
  public boolean hasNext() {
    return index < values.size();
  }
}`,
    "A stack stores only the path to the next smallest node. Push an entire left chain initially and after removing a node push the left chain of its right subtree.",
    "Construction O(h), amortized next O(1), hasNext O(1), space O(h).",
    ["Push the root's left chain.", "For next, pop the smallest node.", "Push the popped node's right-subtree left chain before returning its value."],
    `class BSTIterator {
  private final java.util.Deque<TreeNode> stack = new java.util.ArrayDeque<>();
  public BSTIterator(TreeNode root) {
    pushLeft(root);
  }
  private void pushLeft(TreeNode node) {
    while (node != null) {
      stack.push(node);
      node = node.left;
    }
  }
  public int next() {
    TreeNode node = stack.pop();
    pushLeft(node.right);
    return node.val;
  }
  public boolean hasNext() {
    return !stack.isEmpty();
  }
}`,
  ),
  "convert-sorted-array-to-binary-search-tree": p(
    "Convert a strictly increasing array into a height-balanced binary search tree. Any valid balanced result may be returned.",
    [e("nums = [-10,-3,0,5,9]", "[0,-3,9,-10,null,5]", "Choosing middle values keeps subtree heights balanced."), e("nums = [1,3]", "[3,1]", "Either element may be chosen as the balanced root.")],
    ["1 <= nums.length <= 10000", "-10000 <= nums[i] <= 10000", "nums is strictly increasing."],
    "Choose the middle element as root, but copy the left and right array slices for each recursive call.",
    "The tree is correct, but repeated slice copies add O(n log n) total copying and allocation.",
    "Time O(n log n), space O(n log n) including copied slices.",
    `class Solution {
  public TreeNode sortedArrayToBST(int[] nums) {
    if (nums.length == 0) return null;
    int mid = nums.length / 2;
    TreeNode root = new TreeNode(nums[mid]);
    root.left = sortedArrayToBST(java.util.Arrays.copyOfRange(nums, 0, mid));
    root.right = sortedArrayToBST(java.util.Arrays.copyOfRange(nums, mid + 1, nums.length));
    return root;
  }
}`,
    "Pass inclusive array boundaries instead of copying. The midpoint becomes the root and recursively divides the sorted range into balanced halves.",
    "Time O(n), space O(log n) recursion.",
    ["Use left and right indices for the current sorted range.", "Return null for an empty range and create the midpoint node otherwise.", "Build its left and right children from the two remaining halves."],
    `class Solution {
  public TreeNode sortedArrayToBST(int[] nums) {
    return build(nums, 0, nums.length - 1);
  }
  private TreeNode build(int[] nums, int left, int right) {
    if (left > right) return null;
    int mid = left + (right - left) / 2;
    TreeNode root = new TreeNode(nums[mid]);
    root.left = build(nums, left, mid - 1);
    root.right = build(nums, mid + 1, right);
    return root;
  }
}`,
  ),
  "construct-binary-tree-from-preorder-and-inorder-traversal": p(
    "Reconstruct and return the unique binary tree described by preorder and inorder traversals containing the same distinct values.",
    [e("preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", "[3,9,20,null,null,15,7]", "Preorder selects roots while inorder separates their subtrees."), e("preorder = [-1], inorder = [-1]", "[-1]", "The traversals describe one node.")],
    ["1 <= preorder.length == inorder.length <= 3000", "-3000 <= values <= 3000", "All values are unique and both traversals contain the same values."],
    "Take the next preorder value as root, scan its current inorder range to find the split, and recursively build both ranges.",
    "A skewed tree causes nearly the entire inorder range to be rescanned at every level.",
    "Time O(n^2), space O(h).",
    `class Solution {
  private int preorderIndex;
  public TreeNode buildTree(int[] preorder, int[] inorder) {
    return build(preorder, inorder, 0, inorder.length - 1);
  }
  private TreeNode build(int[] preorder, int[] inorder, int left, int right) {
    if (left > right) return null;
    int value = preorder[preorderIndex++];
    int split = left;
    while (inorder[split] != value) split++;
    TreeNode root = new TreeNode(value);
    root.left = build(preorder, inorder, left, split - 1);
    root.right = build(preorder, inorder, split + 1, right);
    return root;
  }
}`,
    "Map every inorder value to its index once. Preorder still supplies roots in order, and each split is then found in O(1).",
    "Time O(n), space O(n).",
    ["Build a value-to-inorder-index map.", "Consume the next preorder value as the current root.", "Use its mapped split to recursively build left and right inorder ranges."],
    `class Solution {
  private int preorderIndex;
  private final java.util.Map<Integer, Integer> position = new java.util.HashMap<>();
  public TreeNode buildTree(int[] preorder, int[] inorder) {
    for (int i = 0; i < inorder.length; i++) position.put(inorder[i], i);
    return build(preorder, 0, inorder.length - 1);
  }
  private TreeNode build(int[] preorder, int left, int right) {
    if (left > right) return null;
    int value = preorder[preorderIndex++];
    int split = position.get(value);
    TreeNode root = new TreeNode(value);
    root.left = build(preorder, left, split - 1);
    root.right = build(preorder, split + 1, right);
    return root;
  }
}`,
  ),
  "flatten-binary-tree-to-linked-list": p(
    "Modify a binary tree in place into a preorder-linked list using only right pointers. Every left pointer must become null.",
    [e("root = [1,2,5,3,4,null,6]", "[1,null,2,null,3,null,4,null,5,null,6]", "The right chain follows preorder traversal."), e("root = []", "[]", "An empty tree remains empty."), e("root = [0]", "[0]", "A single node is already flat.")],
    ["The tree contains 0 to 2000 nodes.", "-100 <= Node.val <= 100"],
    "Collect all nodes in preorder, then connect consecutive nodes through right and clear every left pointer.",
    "The node list consumes O(n) extra memory.",
    "Time O(n), space O(n).",
    `class Solution {
  public void flatten(TreeNode root) {
    java.util.List<TreeNode> nodes = new java.util.ArrayList<>();
    preorder(root, nodes);
    for (int i = 0; i < nodes.size(); i++) {
      nodes.get(i).left = null;
      nodes.get(i).right = i + 1 < nodes.size() ? nodes.get(i + 1) : null;
    }
  }
  private void preorder(TreeNode node, java.util.List<TreeNode> nodes) {
    if (node == null) return;
    nodes.add(node);
    preorder(node.left, nodes);
    preorder(node.right, nodes);
  }
}`,
    "Traverse in reverse preorder: right, then left, then node. Keep the previously processed node as the next node in the flattened chain.",
    "Time O(n), space O(h).",
    ["Recursively flatten the right subtree before the left subtree.", "Point the current right pointer to the previously processed node and clear left.", "Update previous to the current node while recursion unwinds."],
    `class Solution {
  private TreeNode previous;
  public void flatten(TreeNode root) {
    if (root == null) return;
    flatten(root.right);
    flatten(root.left);
    root.right = previous;
    root.left = null;
    previous = root;
  }
}`,
  ),
  "serialize-and-deserialize-binary-tree": p(
    "Design methods that convert a binary tree to a string and reconstruct an identical tree from that string. The format may be chosen freely as long as both methods agree.",
    [e("root = [1,2,3,null,null,4,5]", "deserialize(serialize(root)) = [1,2,3,null,null,4,5]", "Values and null child positions are preserved."), e("root = []", "deserialize(serialize(root)) = []", "The empty tree round-trips correctly.")],
    ["The tree contains 0 to 10000 nodes.", "-1000 <= Node.val <= 1000"],
    "Serialize level order with explicit null markers, then rebuild children while reading the tokens through a queue.",
    "The level-order representation and queue can retain an entire wide level plus null markers.",
    "Time O(n), space O(n).",
    `public class Codec {
  public String serialize(TreeNode root) {
    if (root == null) return "#";
    java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
    java.util.List<String> tokens = new java.util.ArrayList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      TreeNode node = queue.poll();
      if (node == null) tokens.add("#");
      else {
        tokens.add(String.valueOf(node.val));
        queue.offer(node.left);
        queue.offer(node.right);
      }
    }
    return String.join(",", tokens);
  }
  public TreeNode deserialize(String data) {
    if (data.equals("#")) return null;
    String[] tokens = data.split(",");
    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
    java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
    queue.offer(root);
    int index = 1;
    while (!queue.isEmpty()) {
      TreeNode node = queue.poll();
      if (!tokens[index].equals("#")) {
        node.left = new TreeNode(Integer.parseInt(tokens[index]));
        queue.offer(node.left);
      }
      index++;
      if (!tokens[index].equals("#")) {
        node.right = new TreeNode(Integer.parseInt(tokens[index]));
        queue.offer(node.right);
      }
      index++;
    }
    return root;
  }
}`,
    "Preorder serialization writes a value before its two subtrees and uses a null marker. Deserialization consumes the same token stream recursively, so subtree boundaries need no extra metadata.",
    "Time O(n), space O(h) recursion plus output tokens.",
    ["Write each node value in preorder and write # for null.", "Split the serialized data and keep one shared token index.", "Read # as null; otherwise create the node and recursively read its left and right children."],
    `public class Codec {
  public String serialize(TreeNode root) {
    StringBuilder result = new StringBuilder();
    write(root, result);
    return result.toString();
  }
  private void write(TreeNode node, StringBuilder result) {
    if (node == null) {
      result.append("#,");
      return;
    }
    result.append(node.val).append(',');
    write(node.left, result);
    write(node.right, result);
  }
  public TreeNode deserialize(String data) {
    return read(data.split(","), new int[1]);
  }
  private TreeNode read(String[] tokens, int[] index) {
    String token = tokens[index[0]++];
    if (token.equals("#")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(token));
    node.left = read(tokens, index);
    node.right = read(tokens, index);
    return node;
  }
}`,
  ),
  "implement-trie-prefix-tree": p(
    "Implement a trie supporting insert(word), search(word) for an exact word, and startsWith(prefix). Inputs contain lowercase English letters.",
    [e("operations = [Trie,insert,search,search,startsWith,insert,search], values = [[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]", "[null,null,true,false,true,null,true]", "A prefix is not an exact word until inserted."), e("operations = [Trie,insert,startsWith], values = [[],[\"cat\"],[\"ca\"]]", "[null,null,true]", "The stored word begins with ca.")],
    ["1 <= word.length, prefix.length <= 2000", "Inputs contain lowercase English letters.", "At most 30000 calls are made."],
    "Store every inserted word in a list. Exact search checks list membership, and prefix search scans every word until one starts with the prefix.",
    "search and startsWith may inspect all stored strings, so repeated queries scale poorly.",
    "insert O(1), search O(number of words), startsWith O(total stored characters), space O(total stored characters).",
    `class Trie {
  private final java.util.List<String> words = new java.util.ArrayList<>();
  public Trie() {}
  public void insert(String word) {
    words.add(word);
  }
  public boolean search(String word) {
    return words.contains(word);
  }
  public boolean startsWith(String prefix) {
    for (String word : words) if (word.startsWith(prefix)) return true;
    return false;
  }
}`,
    "Each trie edge represents one character. Insert creates missing edges, search follows all characters and checks the terminal flag, and startsWith only requires the path to exist.",
    "Each operation O(length), space O(total inserted characters).",
    ["Give every node 26 child references and an end-of-word flag.", "Walk or create the matching child for every inserted character.", "For queries, follow the path; require end for search but only path existence for startsWith."],
    `class Trie {
  private static class Node {
    Node[] children = new Node[26];
    boolean end;
  }
  private final Node root = new Node();
  public Trie() {}
  public void insert(String word) {
    Node node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) node.children[index] = new Node();
      node = node.children[index];
    }
    node.end = true;
  }
  public boolean search(String word) {
    Node node = find(word);
    return node != null && node.end;
  }
  public boolean startsWith(String prefix) {
    return find(prefix) != null;
  }
  private Node find(String value) {
    Node node = root;
    for (char c : value.toCharArray()) {
      node = node.children[c - 'a'];
      if (node == null) return null;
    }
    return node;
  }
}`,
  ),
  "design-add-and-search-words-data-structure": p(
    "Design a word dictionary supporting addWord and search. A search pattern may contain '.', which matches any single lowercase letter.",
    [e("operations = [WordDictionary,addWord,addWord,addWord,search,search,search,search], values = [[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]", "[null,null,null,null,false,true,true,true]", "Wildcards match one character at their positions."), e("operations = [WordDictionary,addWord,search], values = [[],[\"a\"],[\".\"]]", "[null,null,true]", "The wildcard matches the stored single letter.")],
    ["1 <= word.length <= 25", "Added words contain lowercase letters.", "Search patterns contain lowercase letters or '.'.", "At most 10000 total calls are made."],
    "Store words in a list. For search, compare every same-length word character by character, accepting either equality or a dot wildcard.",
    "Every query can scan all stored words and repeatedly compare shared prefixes.",
    "addWord O(1), search O(number of words * pattern length), space O(total characters).",
    `class WordDictionary {
  private final java.util.List<String> words = new java.util.ArrayList<>();
  public WordDictionary() {}
  public void addWord(String word) {
    words.add(word);
  }
  public boolean search(String word) {
    for (String candidate : words) {
      if (candidate.length() != word.length()) continue;
      int index = 0;
      while (index < word.length() && (word.charAt(index) == '.' || word.charAt(index) == candidate.charAt(index))) index++;
      if (index == word.length()) return true;
    }
    return false;
  }
}`,
    "Insert words into a trie. Search follows a concrete letter directly; at a dot, recursively try every existing child. A match at the final position also requires the terminal flag.",
    "addWord O(length), exact search O(length), wildcard worst case O(26^dots), space O(total characters).",
    ["Insert each word through trie children and mark its terminal node.", "During search, follow a letter's single child.", "For '.', recursively test all non-null children and accept any branch that reaches a terminal node at the pattern end."],
    `class WordDictionary {
  private static class Node {
    Node[] children = new Node[26];
    boolean end;
  }
  private final Node root = new Node();
  public WordDictionary() {}
  public void addWord(String word) {
    Node node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.children[index] == null) node.children[index] = new Node();
      node = node.children[index];
    }
    node.end = true;
  }
  public boolean search(String word) {
    return match(word, 0, root);
  }
  private boolean match(String word, int index, Node node) {
    if (index == word.length()) return node.end;
    char c = word.charAt(index);
    if (c != '.') return node.children[c - 'a'] != null && match(word, index + 1, node.children[c - 'a']);
    for (Node child : node.children) if (child != null && match(word, index + 1, child)) return true;
    return false;
  }
}`,
  ),
};
