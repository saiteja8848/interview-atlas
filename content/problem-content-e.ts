import type { ProblemContent } from "./problem-content-types";

const code = String.raw;

export const problemContentE: Record<string, ProblemContent> = {
  "maximum-depth-of-binary-tree": {
    statement: "Given the root of a binary tree, return its maximum depth: the number of nodes on the longest path from the root down to a leaf. An empty tree has depth zero.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "The longest root-to-leaf path contains three nodes, such as 3 -> 20 -> 15." },
      { input: "root = [1,null,2]", output: "2", explanation: "The only root-to-leaf path contains nodes 1 and 2." },
      { input: "root = []", output: "0", explanation: "There is no root node." }
    ],
    constraints: ["The tree contains 0 to 10,000 nodes.", "-100 <= TreeNode.val <= 100."],
    brute: {
      explanation: "Traverse the tree level by level with a queue. Count one depth unit after processing every queue-sized level.",
      drawback: "The breadth-first traversal is linear, but it can retain an entire wide level of up to O(n) nodes when only the depth is required.",
      complexity: "O(n) time · O(w) extra space, where w is maximum width",
      code: code`class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
        queue.offer(root);
        int depth = 0;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            while (levelSize-- > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            depth++;
        }
        return depth;
    }
}`
    },
    optimized: {
      explanation: "A node's depth is one plus the larger depth returned by its children. Null contributes zero, so the recursion directly follows the definition and retains only the active root-to-leaf path.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Return zero for a null subtree.", "Recursively obtain the left and right subtree depths.", "Return one plus the larger child depth."],
      code: code`class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`
    }
  },
  "same-tree": {
    statement: "Given roots p and q, return true when the two binary trees have the same shape and equal values at corresponding nodes.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true", explanation: "Every corresponding position has the same node value." },
      { input: "p = [1,2], q = [1,null,2]", output: "false", explanation: "The value 2 appears on different sides of the root." },
      { input: "p = [1,2,1], q = [1,1,2]", output: "false", explanation: "The child values do not match by position." }
    ],
    constraints: ["Each tree contains 0 to 100 nodes.", "-10,000 <= TreeNode.val <= 10,000."],
    brute: {
      explanation: "Serialize both trees in preorder with explicit null markers, then compare the complete serialized strings.",
      drawback: "It builds two representations containing every value and null position even though comparison can stop at the first mismatch.",
      complexity: "O(n + m) time · O(n + m) extra space",
      code: code`class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        return serialize(p).equals(serialize(q));
    }

    private String serialize(TreeNode node) {
        if (node == null) return "#,";
        return node.val + "," + serialize(node.left) + serialize(node.right);
    }
}`
    },
    optimized: {
      explanation: "Compare corresponding nodes immediately. Two null nodes match, one null node fails, and unequal values fail. Only when the current nodes match do both child pairs need recursive comparison.",
      complexity: "O(min(n, m)) time before a mismatch, O(n) when equal · O(h) recursion space",
      steps: ["Accept when both current nodes are null.", "Reject when exactly one is null or their values differ.", "Require both the left pair and right pair to be the same."],
      code: code`class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null || q == null) return p == q;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`
    }
  },
  "invert-binary-tree": {
    statement: "Given a binary-tree root, mirror the tree by swapping the left and right child of every node, and return the root of the inverted tree.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", explanation: "Every left and right subtree is exchanged." },
      { input: "root = [2,1,3]", output: "[2,3,1]", explanation: "The root's two children swap." },
      { input: "root = []", output: "[]", explanation: "An empty tree is unchanged." }
    ],
    constraints: ["The tree contains 0 to 100 nodes.", "-100 <= TreeNode.val <= 100."],
    brute: {
      explanation: "Allocate a new mirrored tree. For each original node, create a copy whose left subtree is copied from the original right and whose right subtree is copied from the original left.",
      drawback: "It preserves the original tree but allocates one additional node for every input node even though the task permits in-place changes.",
      complexity: "O(n) time · O(n) copied-node space plus O(h) recursion space",
      code: code`class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode copy = new TreeNode(root.val);
        copy.left = invertTree(root.right);
        copy.right = invertTree(root.left);
        return copy;
    }
}`
    },
    optimized: {
      explanation: "At each node, swap its existing child references and recursively invert the two subtrees. Every node is changed once, and no replacement tree is allocated.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Return null for an empty subtree.", "Swap the current node's left and right references.", "Recursively invert both children and return the current node."],
      code: code`class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`
    }
  },
  "balanced-binary-tree": {
    statement: "Return true when a binary tree is height-balanced: at every node, the heights of its left and right subtrees differ by at most one.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true", explanation: "Every node's two subtree heights differ by zero or one." },
      { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false", explanation: "At the root, the deeper left subtree differs from the right by more than one." },
      { input: "root = []", output: "true", explanation: "An empty tree is balanced." }
    ],
    constraints: ["The tree contains 0 to 5,000 nodes.", "-10,000 <= TreeNode.val <= 10,000."],
    brute: {
      explanation: "At every node, independently calculate the full height of its left and right subtrees, check their difference, and recursively validate both children.",
      drawback: "Height is recomputed for the same descendants at every ancestor; a skewed tree therefore takes O(n²) time.",
      complexity: "O(n²) worst-case time · O(h) recursion space",
      code: code`class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        if (Math.abs(height(root.left) - height(root.right)) > 1) return false;
        return isBalanced(root.left) && isBalanced(root.right);
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }
}`
    },
    optimized: {
      explanation: "Use one postorder traversal that returns subtree height when balanced and -1 as a failure signal. A parent stops immediately if either child failed or their heights differ by more than one.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Return height zero for null.", "Obtain left and right heights, propagating -1 immediately.", "Return -1 for an excessive difference; otherwise return one plus the larger height."],
      code: code`class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        if (left == -1) return -1;
        int right = height(node.right);
        if (right == -1 || Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
}`
    }
  },
  "diameter-of-binary-tree": {
    statement: "Return the diameter of a binary tree: the greatest number of edges on a path between any two nodes. The path may or may not pass through the root.",
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "A longest path is 4 -> 2 -> 1 -> 3 and contains three edges." },
      { input: "root = [1,2]", output: "1", explanation: "The two nodes are connected by one edge." },
      { input: "root = [1]", output: "0", explanation: "A path containing one node has zero edges." }
    ],
    constraints: ["The tree contains 1 to 10,000 nodes.", "-100 <= TreeNode.val <= 100."],
    brute: {
      explanation: "Treat every node as the highest point of a candidate path. Recompute the left and right heights from that node, add them as its diameter, and recursively test every other node.",
      drawback: "The height of a descendant is recalculated once for each ancestor, causing quadratic work on a skewed tree.",
      complexity: "O(n²) worst-case time · O(h) recursion space",
      code: code`class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int throughRoot = height(root.left) + height(root.right);
        return Math.max(throughRoot, Math.max(diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right)));
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }
}`
    },
    optimized: {
      explanation: "During one postorder height calculation, leftHeight + rightHeight is the best path whose highest node is current. Update a global maximum before returning one plus the larger child height to the parent.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Return zero height for null.", "Calculate both child heights once.", "Update the diameter with their sum, then return the current subtree height."],
      code: code`class Solution {
    private int diameter;

    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return diameter;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        int right = height(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
}`
    }
  },
  "binary-tree-maximum-path-sum": {
    statement: "Given a nonempty binary tree, return the maximum sum of values along any nonempty path of connected nodes. A path may start and end anywhere but cannot visit a node twice.",
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "The path 2 -> 1 -> 3 uses all three nodes." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The best path is 15 -> 20 -> 7." },
      { input: "root = [-3]", output: "-3", explanation: "A path must contain a node, so the negative root is the answer." }
    ],
    constraints: ["The tree contains 1 to 30,000 nodes.", "-1,000 <= TreeNode.val <= 1,000."],
    brute: {
      explanation: "For every node as a possible path peak, separately compute the best nonnegative downward path from its left and right children and combine both with the node value. Recursively repeat for every peak.",
      drawback: "Each downward gain is recalculated for many ancestors, causing O(n²) time in a skewed tree.",
      complexity: "O(n²) worst-case time · O(h) recursion space",
      code: code`class Solution {
    public int maxPathSum(TreeNode root) {
        int throughRoot = root.val + Math.max(0, gain(root.left)) + Math.max(0, gain(root.right));
        int best = throughRoot;
        if (root.left != null) best = Math.max(best, maxPathSum(root.left));
        if (root.right != null) best = Math.max(best, maxPathSum(root.right));
        return best;
    }

    private int gain(TreeNode node) {
        if (node == null) return 0;
        return node.val + Math.max(0, Math.max(gain(node.left), gain(node.right)));
    }
}`
    },
    optimized: {
      explanation: "A postorder call returns the best one-branch gain that its parent can extend. Negative child gains are ignored. At each node, joining both nonnegative gains with the current value forms a complete candidate path and updates the global answer.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Return zero for null and clamp each child gain at zero.", "Update the answer with node value plus both usable child gains.", "Return node value plus the larger child gain because a parent path can choose only one branch."],
      code: code`class Solution {
    private int best = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        gain(root);
        return best;
    }

    private int gain(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, gain(node.left));
        int right = Math.max(0, gain(node.right));
        best = Math.max(best, node.val + left + right);
        return node.val + Math.max(left, right);
    }
}`
    }
  },
  "path-sum": {
    statement: "Given a binary-tree root and targetSum, return true when at least one root-to-leaf path has node values whose sum equals targetSum. A leaf has no children.",
    examples: [
      { input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", output: "true", explanation: "The path 5 -> 4 -> 11 -> 2 sums to 22." },
      { input: "root = [1,2,3], targetSum = 5", output: "false", explanation: "The leaf-path sums are 3 and 4." },
      { input: "root = [], targetSum = 0", output: "false", explanation: "There is no root-to-leaf path." }
    ],
    constraints: ["The tree contains 0 to 5,000 nodes.", "-1,000 <= TreeNode.val <= 1,000.", "-1,000 <= targetSum <= 1,000."],
    brute: {
      explanation: "Build a list of values for every root-to-leaf path. At each leaf, sum its copied path from the beginning and compare with targetSum.",
      drawback: "Each leaf copies and resums its path, repeating prefix work and using up to O(nh) total temporary storage.",
      complexity: "O(nh) time · O(nh) stored path space",
      code: code`class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        java.util.List<java.util.List<Integer>> paths = new java.util.ArrayList<>();
        collect(root, new java.util.ArrayList<>(), paths);
        for (java.util.List<Integer> path : paths) {
            int sum = 0;
            for (int value : path) sum += value;
            if (sum == targetSum) return true;
        }
        return false;
    }

    private void collect(TreeNode node, java.util.List<Integer> path, java.util.List<java.util.List<Integer>> paths) {
        if (node == null) return;
        java.util.List<Integer> next = new java.util.ArrayList<>(path);
        next.add(node.val);
        if (node.left == null && node.right == null) paths.add(next);
        else {
            collect(node.left, next, paths);
            collect(node.right, next, paths);
        }
    }
}`
    },
    optimized: {
      explanation: "Subtract each visited value from the remaining target. At a leaf, success means the remaining target equals that leaf's value. The recursion can stop as soon as either branch succeeds.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Reject a null node.", "At a leaf, compare its value with the remaining target.", "Recurse into either child with remaining target minus the current value."],
      code: code`class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
    }
}`
    }
  },
  "path-sum-ii": {
    statement: "Given a binary-tree root and targetSum, return every root-to-leaf path whose values total targetSum. Each returned path lists values from root to leaf.",
    examples: [
      { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22", output: "[[5,4,11,2],[5,8,4,5]]", explanation: "Exactly these two leaf-ending paths total 22." },
      { input: "root = [1,2,3], targetSum = 5", output: "[]", explanation: "Neither root-to-leaf sum equals five." },
      { input: "root = [1,2], targetSum = 0", output: "[]", explanation: "The only path totals three." }
    ],
    constraints: ["The tree contains 0 to 5,000 nodes.", "-1,000 <= TreeNode.val <= 1,000.", "-1,000 <= targetSum <= 1,000."],
    brute: {
      explanation: "Generate and store every root-to-leaf path by copying the complete prefix at each recursive step. Afterward, separately sum and filter all stored paths.",
      drawback: "It materializes even invalid paths and repeatedly copies and sums shared prefixes before filtering.",
      complexity: "O(nh) time · O(nh) stored path space",
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> pathSum(TreeNode root, int targetSum) {
        java.util.List<java.util.List<Integer>> all = new java.util.ArrayList<>();
        collect(root, new java.util.ArrayList<>(), all);
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        for (java.util.List<Integer> path : all) {
            int sum = 0;
            for (int value : path) sum += value;
            if (sum == targetSum) answer.add(path);
        }
        return answer;
    }

    private void collect(TreeNode node, java.util.List<Integer> path, java.util.List<java.util.List<Integer>> all) {
        if (node == null) return;
        java.util.List<Integer> next = new java.util.ArrayList<>(path);
        next.add(node.val);
        if (node.left == null && node.right == null) all.add(next);
        else {
            collect(node.left, next, all);
            collect(node.right, next, all);
        }
    }
}`
    },
    optimized: {
      explanation: "Maintain one mutable path and remaining target during depth-first search. Add the node on entry, copy the path only at a matching leaf, and remove the node on return so sibling branches reuse the same list safely.",
      complexity: "O(n + total output size) time · O(h) traversal space plus output",
      steps: ["Append the current value and subtract it from the target.", "At a matching leaf, copy the current path into the answer.", "Recurse into both children, then remove the current value before returning."],
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> pathSum(TreeNode root, int targetSum) {
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        search(root, targetSum, new java.util.ArrayList<>(), answer);
        return answer;
    }

    private void search(TreeNode node, long remaining, java.util.List<Integer> path, java.util.List<java.util.List<Integer>> answer) {
        if (node == null) return;
        path.add(node.val);
        remaining -= node.val;
        if (node.left == null && node.right == null && remaining == 0) answer.add(new java.util.ArrayList<>(path));
        else {
            search(node.left, remaining, path, answer);
            search(node.right, remaining, path, answer);
        }
        path.remove(path.size() - 1);
    }
}`
    }
  },
  "subtree-of-another-tree": {
    statement: "Given roots root and subRoot, return true when some node of root begins a subtree that is identical in both shape and values to the complete tree subRoot.",
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true", explanation: "The subtree rooted at value 4 exactly matches subRoot." },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false", explanation: "The extra node 0 makes the candidate subtree's shape different." },
      { input: "root = [1,1], subRoot = [1]", output: "true", explanation: "The leaf containing 1 is an exact match." }
    ],
    constraints: ["root contains 1 to 2,000 nodes.", "subRoot contains 1 to 1,000 nodes.", "-10,000 <= TreeNode.val <= 10,000."],
    brute: {
      explanation: "At every node in root, recursively compare that complete subtree with subRoot. If it does not match, repeat from the left and right child.",
      drawback: "When many values match subRoot's root, the same descendants are compared repeatedly, taking O(nm) time in the worst case.",
      complexity: "O(nm) worst-case time · O(h + s) recursion space",
      code: code`class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    private boolean same(TreeNode a, TreeNode b) {
        if (a == null || b == null) return a == b;
        return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
    }
}`
    },
    optimized: {
      explanation: "Serialize both trees in preorder with unambiguous value boundaries and null markers, reducing subtree matching to substring matching. KMP searches the large serialization without restarting after partial matches.",
      complexity: "O(n + m) time · O(n + m) extra space",
      steps: ["Serialize both trees with a marker before each value and a distinct null marker.", "Build the KMP prefix table for the subRoot serialization.", "Scan the root serialization while reusing the longest valid matched prefix."],
      code: code`class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        String text = serialize(root);
        String pattern = serialize(subRoot);
        int[] prefix = new int[pattern.length()];
        for (int i = 1, matched = 0; i < pattern.length(); i++) {
            while (matched > 0 && pattern.charAt(i) != pattern.charAt(matched)) matched = prefix[matched - 1];
            if (pattern.charAt(i) == pattern.charAt(matched)) matched++;
            prefix[i] = matched;
        }
        for (int i = 0, matched = 0; i < text.length(); i++) {
            while (matched > 0 && text.charAt(i) != pattern.charAt(matched)) matched = prefix[matched - 1];
            if (text.charAt(i) == pattern.charAt(matched)) matched++;
            if (matched == pattern.length()) return true;
        }
        return false;
    }

    private String serialize(TreeNode node) {
        if (node == null) return "N,";
        return "V" + node.val + "," + serialize(node.left) + serialize(node.right);
    }
}`
    }
  },
  "count-good-nodes-in-binary-tree": {
    statement: "A node is good when no node before it on the path from the root has a value greater than it. Return the number of good nodes in the binary tree.",
    examples: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4", explanation: "The root, left leaf 3, node 4, and leaf 5 meet or exceed every earlier path value." },
      { input: "root = [3,3,null,4,2]", output: "3", explanation: "Both 3 values and 4 are good; 2 is below a previous maximum." },
      { input: "root = [1]", output: "1", explanation: "The root has no earlier node and is always good." }
    ],
    constraints: ["The tree contains 1 to 100,000 nodes.", "-10,000 <= TreeNode.val <= 10,000."],
    brute: {
      explanation: "For every target node, search from the root to recover its path and track the maximum value before reaching it. Count the target when its value is at least that maximum.",
      drawback: "Recovering a root path independently for every node repeats ancestor traversal and can take O(n²) time.",
      complexity: "O(n²) worst-case time · O(h) recursion space",
      code: code`class Solution {
    public int goodNodes(TreeNode root) {
        java.util.List<TreeNode> nodes = new java.util.ArrayList<>();
        collect(root, nodes);
        int count = 0;
        for (TreeNode target : nodes) if (goodOnPath(root, target, Integer.MIN_VALUE)) count++;
        return count;
    }

    private void collect(TreeNode node, java.util.List<TreeNode> nodes) {
        if (node == null) return;
        nodes.add(node);
        collect(node.left, nodes);
        collect(node.right, nodes);
    }

    private boolean goodOnPath(TreeNode node, TreeNode target, int maximum) {
        if (node == null) return false;
        if (node == target) return node.val >= maximum;
        int next = Math.max(maximum, node.val);
        return goodOnPath(node.left, target, next) || goodOnPath(node.right, target, next);
    }
}`
    },
    optimized: {
      explanation: "Carry the maximum value seen on the current root-to-node path. The current node is good when its value reaches or exceeds that maximum, and the maximum passed to its children is updated once.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Start with the root value as the path maximum.", "Count the current node when its value is at least that maximum.", "Pass max(previousMaximum, node.val) into both child calls."],
      code: code`class Solution {
    public int goodNodes(TreeNode root) {
        return count(root, Integer.MIN_VALUE);
    }

    private int count(TreeNode node, int maximum) {
        if (node == null) return 0;
        int good = node.val >= maximum ? 1 : 0;
        int nextMaximum = Math.max(maximum, node.val);
        return good + count(node.left, nextMaximum) + count(node.right, nextMaximum);
    }
}`
    }
  },
  "binary-tree-level-order-traversal": {
    statement: "Return the binary tree's node values level by level from top to bottom and from left to right within each level.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "The root is level zero, its children level one, and their children level two." },
      { input: "root = [1]", output: "[[1]]", explanation: "The only node forms one level." },
      { input: "root = []", output: "[]", explanation: "An empty tree has no levels." }
    ],
    constraints: ["The tree contains 0 to 2,000 nodes.", "-1,000 <= TreeNode.val <= 1,000."],
    brute: {
      explanation: "First calculate tree height. For every level number, traverse down from the root and collect nodes exactly at that depth.",
      drawback: "Upper paths are revisited for every requested depth; a skewed tree takes O(n²) time.",
      complexity: "O(nh) time · O(h) recursion space plus output",
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> levelOrder(TreeNode root) {
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        int height = height(root);
        for (int level = 1; level <= height; level++) {
            java.util.List<Integer> values = new java.util.ArrayList<>();
            collect(root, level, values);
            answer.add(values);
        }
        return answer;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }

    private void collect(TreeNode node, int level, java.util.List<Integer> values) {
        if (node == null) return;
        if (level == 1) values.add(node.val);
        else {
            collect(node.left, level - 1, values);
            collect(node.right, level - 1, values);
        }
    }
}`
    },
    optimized: {
      explanation: "Breadth-first search naturally exposes one level at a time. At the start of each outer loop, queue size is exactly the number of nodes in that level; process that many and enqueue their children for the next level.",
      complexity: "O(n) time · O(w) extra space plus output",
      steps: ["Return an empty result for a null root; otherwise enqueue it.", "Capture queue size and remove exactly that many nodes into one level list.", "Enqueue nonnull children and append the completed level."],
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> levelOrder(TreeNode root) {
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        if (root == null) return answer;
        java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            java.util.List<Integer> level = new java.util.ArrayList<>(size);
            while (size-- > 0) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            answer.add(level);
        }
        return answer;
    }
}`
    }
  },
  "binary-tree-zigzag-level-order-traversal": {
    statement: "Return binary-tree levels in alternating directions: the root level left to right, the next level right to left, then left to right again, continuing this zigzag.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]", explanation: "The second level reverses direction while the third returns to left-to-right." },
      { input: "root = [1]", output: "[[1]]", explanation: "A one-level tree has no visible direction change." },
      { input: "root = []", output: "[]", explanation: "No levels are returned." }
    ],
    constraints: ["The tree contains 0 to 2,000 nodes.", "-100 <= TreeNode.val <= 100."],
    brute: {
      explanation: "Run ordinary level-order traversal, then reverse every level list at an odd zero-based depth.",
      drawback: "It stores each level in the wrong direction first and performs an additional pass to reverse half of the level lists.",
      complexity: "O(n) time · O(w) traversal space plus output",
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> zigzagLevelOrder(TreeNode root) {
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        if (root == null) return answer;
        java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
        queue.offer(root);
        int depth = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            java.util.List<Integer> level = new java.util.ArrayList<>();
            while (size-- > 0) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            if ((depth++ & 1) == 1) java.util.Collections.reverse(level);
            answer.add(level);
        }
        return answer;
    }
}`
    },
    optimized: {
      explanation: "Still use BFS for level boundaries, but write values directly into a linked list. Append at the rear on left-to-right levels and at the front on right-to-left levels, avoiding a reversal pass.",
      complexity: "O(n) time · O(w) traversal space plus output",
      steps: ["Use queue size to isolate one level.", "Insert each value at the level list's rear or front according to the direction flag.", "Enqueue children normally and flip the direction after completing the level."],
      code: code`class Solution {
    public java.util.List<java.util.List<Integer>> zigzagLevelOrder(TreeNode root) {
        java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
        if (root == null) return answer;
        java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
        queue.offer(root);
        boolean leftToRight = true;
        while (!queue.isEmpty()) {
            int size = queue.size();
            java.util.LinkedList<Integer> level = new java.util.LinkedList<>();
            while (size-- > 0) {
                TreeNode node = queue.poll();
                if (leftToRight) level.addLast(node.val);
                else level.addFirst(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            answer.add(level);
            leftToRight = !leftToRight;
        }
        return answer;
    }
}`
    }
  },
  "binary-tree-right-side-view": {
    statement: "Return the value visible at each depth when looking at a binary tree from its right side, ordered from the root level downward.",
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]", explanation: "The rightmost visible values by level are 1, 3, and 4." },
      { input: "root = [1,2,3,4]", output: "[1,3,4]", explanation: "Although 4 is in the left subtree, it is the only node at its depth." },
      { input: "root = []", output: "[]", explanation: "An empty tree has no visible nodes." }
    ],
    constraints: ["The tree contains 0 to 100 nodes.", "-100 <= TreeNode.val <= 100."],
    brute: {
      explanation: "Perform complete level-order traversal and store all values at every level. Afterward, select the final value from each stored level.",
      drawback: "It retains all n values even though only one value per depth is needed.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public java.util.List<Integer> rightSideView(TreeNode root) {
        java.util.List<java.util.List<Integer>> levels = new java.util.ArrayList<>();
        collect(root, 0, levels);
        java.util.List<Integer> answer = new java.util.ArrayList<>();
        for (java.util.List<Integer> level : levels) answer.add(level.get(level.size() - 1));
        return answer;
    }

    private void collect(TreeNode node, int depth, java.util.List<java.util.List<Integer>> levels) {
        if (node == null) return;
        if (depth == levels.size()) levels.add(new java.util.ArrayList<>());
        levels.get(depth).add(node.val);
        collect(node.left, depth + 1, levels);
        collect(node.right, depth + 1, levels);
    }
}`
    },
    optimized: {
      explanation: "Run depth-first search right child before left child. The first node reached at a new depth is the visible one, so append only when depth equals the current answer size.",
      complexity: "O(n) time · O(h) recursion space plus O(h) output",
      steps: ["Start at depth zero and visit right before left.", "When depth has no saved value yet, append the current value.", "Continue both subtrees so a missing right branch can be filled from the left."],
      code: code`class Solution {
    public java.util.List<Integer> rightSideView(TreeNode root) {
        java.util.List<Integer> answer = new java.util.ArrayList<>();
        visit(root, 0, answer);
        return answer;
    }

    private void visit(TreeNode node, int depth, java.util.List<Integer> answer) {
        if (node == null) return;
        if (depth == answer.size()) answer.add(node.val);
        visit(node.right, depth + 1, answer);
        visit(node.left, depth + 1, answer);
    }
}`
    }
  },
  "average-of-levels-in-binary-tree": {
    statement: "Return the arithmetic mean of node values at every binary-tree depth, from the root level to the deepest level.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[3.0,14.5,11.0]", explanation: "Level averages are 3, (9+20)/2, and (15+7)/2." },
      { input: "root = [3,9,20,15,7]", output: "[3.0,14.5,11.0]", explanation: "Tree shape does not change which values belong to each depth." },
      { input: "root = [5]", output: "[5.0]", explanation: "The only level contains value 5." }
    ],
    constraints: ["The tree contains 1 to 10,000 nodes.", "-2,147,483,648 <= TreeNode.val <= 2,147,483,647."],
    brute: {
      explanation: "Compute tree height, then run a fresh traversal for each level to collect that level's sum and count before calculating its average.",
      drawback: "Root-to-level prefixes are revisited for every depth, producing O(n²) time on a skewed tree.",
      complexity: "O(nh) time · O(h) recursion space",
      code: code`class Solution {
    public java.util.List<Double> averageOfLevels(TreeNode root) {
        java.util.List<Double> answer = new java.util.ArrayList<>();
        for (int level = 1; level <= height(root); level++) {
            long[] state = new long[2];
            collect(root, level, state);
            answer.add((double) state[0] / state[1]);
        }
        return answer;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }

    private void collect(TreeNode node, int level, long[] state) {
        if (node == null) return;
        if (level == 1) {
            state[0] += node.val;
            state[1]++;
        } else {
            collect(node.left, level - 1, state);
            collect(node.right, level - 1, state);
        }
    }
}`
    },
    optimized: {
      explanation: "Use BFS so every queue-sized batch is one level. Accumulate its values in a long to avoid integer overflow, then divide by the captured level size.",
      complexity: "O(n) time · O(w) extra space",
      steps: ["Enqueue the root.", "Capture queue size, remove exactly those nodes, and add their values to a long sum.", "Append sum divided by level size and enqueue children for the next round."],
      code: code`class Solution {
    public java.util.List<Double> averageOfLevels(TreeNode root) {
        java.util.List<Double> answer = new java.util.ArrayList<>();
        java.util.Queue<TreeNode> queue = new java.util.ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            long sum = 0;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                sum += node.val;
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            answer.add((double) sum / size);
        }
        return answer;
    }
}`
    }
  },
  "validate-binary-search-tree": {
    statement: "Return true when a binary tree is a valid binary search tree: every node in a left subtree is strictly smaller than its ancestor, and every node in a right subtree is strictly greater. Duplicate values are invalid.",
    examples: [
      { input: "root = [2,1,3]", output: "true", explanation: "Value 1 is below 2 and value 3 is above 2." },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Value 3 lies in the right subtree of 5 but is smaller than 5." },
      { input: "root = [2,2,2]", output: "false", explanation: "BST ordering is strict, so duplicates fail." }
    ],
    constraints: ["The tree contains 1 to 10,000 nodes.", "-2,147,483,648 <= TreeNode.val <= 2,147,483,647."],
    brute: {
      explanation: "Collect the complete inorder traversal in an array. A binary tree is a valid BST exactly when this sequence is strictly increasing.",
      drawback: "It stores all n values before validation and cannot stop until traversal reaches a potential adjacent violation.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public boolean isValidBST(TreeNode root) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        inorder(root, values);
        for (int i = 1; i < values.size(); i++) if (values.get(i) <= values.get(i - 1)) return false;
        return true;
    }

    private void inorder(TreeNode node, java.util.List<Integer> values) {
        if (node == null) return;
        inorder(node.left, values);
        values.add(node.val);
        inorder(node.right, values);
    }
}`
    },
    optimized: {
      explanation: "Carry the strict numeric interval allowed for each node. A left child inherits the lower bound and uses its parent value as the upper bound; a right child uses the parent as its lower bound. Long bounds safely surround all int values.",
      complexity: "O(n) time · O(h) recursion space",
      steps: ["Start with negative and positive long infinity bounds.", "Reject a value that is not strictly inside its allowed interval.", "Validate left with an updated upper bound and right with an updated lower bound."],
      code: code`class Solution {
    public boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean valid(TreeNode node, long lower, long upper) {
        if (node == null) return true;
        if (node.val <= lower || node.val >= upper) return false;
        return valid(node.left, lower, node.val) && valid(node.right, node.val, upper);
    }
}`
    }
  },
  "kth-smallest-element-in-a-bst": {
    statement: "Given a binary-search-tree root and positive k, return the kth smallest node value when all values are ordered increasingly.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1", explanation: "The inorder order is [1,2,3,4]." },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3", explanation: "The sorted values begin 1,2,3." },
      { input: "root = [1], k = 1", output: "1", explanation: "The only node is the first smallest." }
    ],
    constraints: ["The tree contains n nodes where 1 <= n <= 10,000.", "1 <= k <= n.", "0 <= TreeNode.val <= 10,000.", "All values are unique and root is a valid BST."],
    brute: {
      explanation: "Traverse the tree without using its BST ordering, collect all values, sort them, and return index k - 1.",
      drawback: "Sorting every value costs O(n log n) and stores the entire tree even when k is small.",
      complexity: "O(n log n) time · O(n) extra space",
      code: code`class Solution {
    public int kthSmallest(TreeNode root, int k) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        collect(root, values);
        java.util.Collections.sort(values);
        return values.get(k - 1);
    }

    private void collect(TreeNode node, java.util.List<Integer> values) {
        if (node == null) return;
        values.add(node.val);
        collect(node.left, values);
        collect(node.right, values);
    }
}`
    },
    optimized: {
      explanation: "BST inorder traversal visits values in increasing order. Use a stack to descend left, pop the next smallest node, decrement k, and stop immediately when k reaches zero.",
      complexity: "O(h + k) time · O(h) extra space",
      steps: ["Push the entire left spine onto a stack.", "Pop the next inorder node and decrement k.", "Return its value at zero; otherwise push the left spine of its right subtree."],
      code: code`class Solution {
    public int kthSmallest(TreeNode root, int k) {
        java.util.Deque<TreeNode> stack = new java.util.ArrayDeque<>();
        TreeNode current = root;
        while (true) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (--k == 0) return current.val;
            current = current.right;
        }
    }
}`
    }
  },
};
