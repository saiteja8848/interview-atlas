import type { ProblemContent } from "./problem-content-types";

const code = String.raw;

export const problemContentC: Record<string, ProblemContent> = {
  "reverse-linked-list": {
    statement: "Given the head of a singly linked list, reverse every next pointer and return the new head. Return null when the input list is empty.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "The last node becomes the head and every link points toward the former head." },
      { input: "head = [1,2]", output: "[2,1]", explanation: "The link 1 -> 2 is changed to 2 -> 1." },
      { input: "head = []", output: "[]", explanation: "There are no links to reverse." }
    ],
    constraints: ["The list contains 0 to 5,000 nodes.", "-5,000 <= Node.val <= 5,000.", "The input contains no cycle."],
    brute: {
      explanation: "Save every node in an array. Walk that array backward and reconnect adjacent nodes, then terminate the former head with null.",
      drawback: "The links are easy to rebuild, but storing every node uses O(n) extra memory even though the reversal can be performed in place.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode reverseList(ListNode head) {
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) nodes.add(node);
        for (int i = nodes.size() - 1; i > 0; i--) nodes.get(i).next = nodes.get(i - 1);
        if (!nodes.isEmpty()) nodes.get(0).next = null;
        return nodes.isEmpty() ? null : nodes.get(nodes.size() - 1);
    }
}`
    },
    optimized: {
      explanation: "Keep prev as the already reversed prefix and current as the first untouched node. Save current.next before redirecting it, point current.next to prev, and advance both pointers. When current becomes null, prev is the new head.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Initialize prev to null and current to head.", "Save the next untouched node before changing current.next.", "Reverse the link, advance prev and current, and return prev after the loop."],
      code: code`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }
}`
    }
  },
  "merge-two-sorted-lists": {
    statement: "Given the heads of two linked lists whose values are sorted in nondecreasing order, merge their values into one sorted linked list and return its head.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Taking the smaller visible value at each step produces the merged order." },
      { input: "list1 = [], list2 = []", output: "[]", explanation: "Both lists are empty." },
      { input: "list1 = [], list2 = [0]", output: "[0]", explanation: "The nonempty list is already the answer." }
    ],
    constraints: ["Each list contains 0 to 50 nodes.", "-100 <= Node.val <= 100.", "Both input lists are sorted in nondecreasing order."],
    brute: {
      explanation: "Copy all values from both lists into an array, sort it, and allocate a new list from the sorted values.",
      drawback: "Sorting ignores that both inputs are already ordered and also allocates storage for all values and all result nodes.",
      complexity: "O((m + n) log(m + n)) time · O(m + n) extra space",
      code: code`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (ListNode node = list1; node != null; node = node.next) values.add(node.val);
        for (ListNode node = list2; node != null; node = node.next) values.add(node.val);
        java.util.Collections.sort(values);
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int value : values) {
            tail.next = new ListNode(value);
            tail = tail.next;
        }
        return dummy.next;
    }
}`
    },
    optimized: {
      explanation: "Because each head is the smallest remaining value in its list, compare the two heads and append the smaller node. Advance only the list that supplied that node. Once one list ends, append the untouched remainder of the other list.",
      complexity: "O(m + n) time · O(1) extra space",
      steps: ["Create a dummy node and keep a tail pointer.", "Append the smaller current node and advance its source list.", "Attach the remaining nonempty suffix and return dummy.next."],
      code: code`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`
    }
  },
  "linked-list-cycle": {
    statement: "Given the head of a singly linked list, return true if following next pointers eventually visits a node that was already seen; otherwise return false.",
    examples: [
      { input: "head = [3,2,0,-4], tail connects to index 1", output: "true", explanation: "The node containing -4 points back to the node containing 2." },
      { input: "head = [1,2], tail connects to index 0", output: "true", explanation: "The two nodes form a cycle." },
      { input: "head = [1], tail connects to no node", output: "false", explanation: "The next pointer reaches null." }
    ],
    constraints: ["The list contains 0 to 10,000 nodes.", "-100,000 <= Node.val <= 100,000.", "The cycle connection is represented only by existing next pointers."],
    brute: {
      explanation: "Insert each visited node reference into a hash set. If the current reference is already present, the traversal has returned to a previous node.",
      drawback: "The set makes detection straightforward but can hold every node in an acyclic list.",
      complexity: "O(n) time · O(n) extra space",
      code: code`public class Solution {
    public boolean hasCycle(ListNode head) {
        java.util.Set<ListNode> seen = new java.util.HashSet<>();
        while (head != null) {
            if (!seen.add(head)) return true;
            head = head.next;
        }
        return false;
    }
}`
    },
    optimized: {
      explanation: "Move slow one edge and fast two edges at a time. In an acyclic list fast reaches null. Inside a cycle, fast gains one position on slow each round, so the pointers must meet.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Start slow and fast at head.", "Advance slow once and fast twice while two fast steps are possible.", "Return true on a meeting; return false if fast reaches the end."],
      code: code`public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
    }
  },
  "linked-list-cycle-ii": {
    statement: "Given a linked-list head, return the node where a cycle begins. Return null when the list has no cycle. Do not change the list.",
    examples: [
      { input: "head = [3,2,0,-4], tail connects to index 1", output: "node with value 2", explanation: "Value 2 is the first node entered when the tail loops back." },
      { input: "head = [1,2], tail connects to index 0", output: "node with value 1", explanation: "The cycle starts at the head." },
      { input: "head = [1], no cycle", output: "null", explanation: "Traversal terminates normally." }
    ],
    constraints: ["The list contains 0 to 10,000 nodes.", "-100,000 <= Node.val <= 100,000.", "At most one cycle exists."],
    brute: {
      explanation: "Record node references in a set as they are visited. The first reference that cannot be added because it already exists is exactly the cycle entry.",
      drawback: "It identifies the entry in one pass but uses memory proportional to the number of visited nodes.",
      complexity: "O(n) time · O(n) extra space",
      code: code`public class Solution {
    public ListNode detectCycle(ListNode head) {
        java.util.Set<ListNode> seen = new java.util.HashSet<>();
        while (head != null) {
            if (!seen.add(head)) return head;
            head = head.next;
        }
        return null;
    }
}`
    },
    optimized: {
      explanation: "First use Floyd's two-speed pointers to obtain a meeting inside the cycle. Then place one pointer at head and keep the other at the meeting point. Moving both one edge at a time makes them meet at the cycle entry because their remaining distances are equal modulo the cycle length.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Find a slow-fast meeting inside the cycle or return null.", "Reset slow to head while leaving fast at the meeting node.", "Move both one step until they meet again; return that node."],
      code: code`public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        do {
            if (fast == null || fast.next == null) return null;
            slow = slow.next;
            fast = fast.next.next;
        } while (slow != fast);
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }
}`
    }
  },
  "intersection-of-two-linked-lists": {
    statement: "Given heads headA and headB of two acyclic singly linked lists, return the shared node at which they intersect by reference, or null if they never share a node. Equal values alone do not form an intersection.",
    examples: [
      { input: "A = [4,1,8,4,5], B = [5,6,1,8,4,5], shared node value = 8", output: "node with value 8", explanation: "Both next-pointer chains become identical starting at the same node containing 8." },
      { input: "A = [1,9,1,2,4], B = [3,2,4], shared node value = 2", output: "node with value 2", explanation: "The suffix [2,4] is shared by reference." },
      { input: "A = [2,6,4], B = [1,5]", output: "null", explanation: "The two chains contain no common node reference." }
    ],
    constraints: ["Each list contains 1 to 30,000 nodes.", "The lists are acyclic.", "The list structure must remain unchanged."],
    brute: {
      explanation: "Store every node reference from list A in a set, then walk list B and return its first node found in that set.",
      drawback: "The lookup is fast, but the set requires O(m) extra references.",
      complexity: "O(m + n) time · O(m) extra space",
      code: code`public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        java.util.Set<ListNode> nodes = new java.util.HashSet<>();
        for (ListNode node = headA; node != null; node = node.next) nodes.add(node);
        for (ListNode node = headB; node != null; node = node.next) {
            if (nodes.contains(node)) return node;
        }
        return null;
    }
}`
    },
    optimized: {
      explanation: "Walk one pointer through A then B and the other through B then A. Each pointer covers exactly m + n edges, so the length difference disappears. They meet at the shared node or both become null.",
      complexity: "O(m + n) time · O(1) extra space",
      steps: ["Start one pointer at each head.", "On null, redirect the pointer to the other list's head.", "Stop when both references are equal and return that reference."],
      code: code`public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA;
        ListNode b = headB;
        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }
        return a;
    }
}`
    }
  },
  "remove-nth-node-from-end-of-list": {
    statement: "Given the head of a linked list and a positive integer n, remove the nth node counted from the end and return the resulting head.",
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "The second node from the end contains 4." },
      { input: "head = [1], n = 1", output: "[]", explanation: "Removing the only node leaves an empty list." },
      { input: "head = [1,2], n = 2", output: "[2]", explanation: "The requested node is the head." }
    ],
    constraints: ["The list contains sz nodes where 1 <= sz <= 30.", "0 <= Node.val <= 100.", "1 <= n <= sz."],
    brute: {
      explanation: "Count the list length, convert nth-from-end into the zero-based index length - n, and make a second pass to unlink that index. A dummy node handles removal of the head.",
      drawback: "It uses constant space but traverses much of the list twice.",
      complexity: "O(n) time with two passes · O(1) extra space",
      code: code`class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int length = 0;
        for (ListNode node = head; node != null; node = node.next) length++;
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 0; i < length - n; i++) prev = prev.next;
        prev.next = prev.next.next;
        return dummy.next;
    }
}`
    },
    optimized: {
      explanation: "A dummy node protects the head case. Advance fast n + 1 positions from the dummy, creating a gap of n nodes between fast and slow. Move both until fast is null; slow then sits immediately before the node to remove.",
      complexity: "O(n) time with one pass · O(1) extra space",
      steps: ["Point slow and fast at a dummy before head.", "Advance fast n + 1 times to establish the gap.", "Move both to the end, unlink slow.next, and return dummy.next."],
      code: code`class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode slow = dummy;
        ListNode fast = dummy;
        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`
    }
  },
  "reorder-list": {
    statement: "Rearrange a singly linked list in place from L0 -> L1 -> ... -> Ln into L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 and so on. Do not change node values.",
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]", explanation: "Nodes are taken alternately from the front and back." },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]", explanation: "The middle node remains last when the length is odd." }
    ],
    constraints: ["The list contains 1 to 50,000 nodes.", "1 <= Node.val <= 1,000.", "Node values must not be altered."],
    brute: {
      explanation: "Store the node references in an array. Alternate indices from the left and right ends, linking each chosen node after the previous one.",
      drawback: "Random access makes the order simple, but retaining every node reference costs O(n) extra space.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public void reorderList(ListNode head) {
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) nodes.add(node);
        int left = 0;
        int right = nodes.size() - 1;
        ListNode tail = new ListNode(0);
        while (left <= right) {
            tail.next = nodes.get(left++);
            tail = tail.next;
            if (left <= right) {
                tail.next = nodes.get(right--);
                tail = tail.next;
            }
        }
        tail.next = null;
    }
}`
    },
    optimized: {
      explanation: "Find the end of the first half with slow and fast pointers, reverse the second half, then weave one node from each half. Splitting before reversal prevents accidental cycles.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Find the middle and detach the second half.", "Reverse the detached second half in place.", "Alternate nodes from the first and reversed halves until the second half ends."],
      code: code`class Solution {
    public void reorderList(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode current = slow.next;
        slow.next = null;
        ListNode prev = null;
        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        ListNode first = head;
        ListNode second = prev;
        while (second != null) {
            ListNode nextFirst = first.next;
            ListNode nextSecond = second.next;
            first.next = second;
            second.next = nextFirst;
            first = nextFirst;
            second = nextSecond;
        }
    }
}`
    }
  },
  "palindrome-linked-list": {
    statement: "Given a singly linked list, return true when its values read the same from head to tail and from tail to head.",
    examples: [
      { input: "head = [1,2,2,1]", output: "true", explanation: "The forward and reverse value sequences are both 1,2,2,1." },
      { input: "head = [1,2]", output: "false", explanation: "The first and last values differ." },
      { input: "head = [7]", output: "true", explanation: "A one-node list is always a palindrome." }
    ],
    constraints: ["The list contains 1 to 100,000 nodes.", "0 <= Node.val <= 9."],
    brute: {
      explanation: "Copy every value into an array and compare symmetric positions moving inward from both ends.",
      drawback: "The comparison is direct, but the copied array duplicates the complete list's data.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public boolean isPalindrome(ListNode head) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) values.add(node.val);
        int left = 0;
        int right = values.size() - 1;
        while (left < right) {
            if (!values.get(left++).equals(values.get(right--))) return false;
        }
        return true;
    }
}`
    },
    optimized: {
      explanation: "Find the midpoint, reverse the second half, and compare it with the first half node by node. Only half the list is reversed and no additional collection is needed.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Move slow by one and fast by two to locate the second half.", "Reverse the suffix beginning at slow.", "Compare the head side with the reversed suffix until the suffix ends."],
      code: code`class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }
        ListNode left = head;
        ListNode right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }
        return true;
    }
}`
    }
  },
  "add-two-numbers": {
    statement: "Two nonempty linked lists store nonnegative integers in reverse digit order, one digit per node. Add the integers and return their sum in the same reverse-order list format.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "The lists represent 342 and 465, whose sum is 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]", explanation: "Zero plus zero is zero." },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]", explanation: "The carry continues through several positions and creates a final digit." }
    ],
    constraints: ["Each list contains 1 to 100 nodes.", "0 <= Node.val <= 9.", "The represented numbers have no leading zeros except the number zero."],
    brute: {
      explanation: "Read each reversed digit list into a decimal string, use arbitrary-precision arithmetic to add the values, then build a reversed result list from the sum's digits.",
      drawback: "It creates full string and BigInteger representations, so it uses much more memory and depends on a numeric library instead of adding the list digits directly.",
      complexity: "O(m + n) arithmetic time · O(m + n) extra space",
      code: code`class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        java.math.BigInteger a = read(l1);
        java.math.BigInteger b = read(l2);
        String sum = a.add(b).toString();
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int i = sum.length() - 1; i >= 0; i--) {
            tail.next = new ListNode(sum.charAt(i) - '0');
            tail = tail.next;
        }
        return dummy.next;
    }

    private java.math.BigInteger read(ListNode node) {
        StringBuilder digits = new StringBuilder();
        while (node != null) {
            digits.append(node.val);
            node = node.next;
        }
        return new java.math.BigInteger(digits.reverse().toString());
    }
}`
    },
    optimized: {
      explanation: "Process matching digit positions together. For each position add both available digits and the carry, append sum modulo 10, and carry sum divided by 10. Continue while either list or the carry remains.",
      complexity: "O(max(m, n)) time · O(max(m, n)) result space and O(1) auxiliary space",
      steps: ["Initialize carry to zero and a dummy result head.", "Add the current digits and carry, append the ones digit, and update carry.", "Advance available nodes and continue through a final carry."],
      code: code`class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
            carry = sum / 10;
        }
        return dummy.next;
    }
}`
    }
  },
  "copy-list-with-random-pointer": {
    statement: "A linked list node has next and random pointers, where random may reference any list node or null. Return a deep copy whose pointers refer only to copied nodes.",
    examples: [
      { input: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", explanation: "Each pair gives a value and the index targeted by random; the copy preserves the same structure with new nodes." },
      { input: "[[1,1],[2,1]]", output: "[[1,1],[2,1]]", explanation: "Both copied random pointers target the copied node at index 1." },
      { input: "[]", output: "[]", explanation: "An empty list has an empty deep copy." }
    ],
    constraints: ["The list contains 0 to 1,000 nodes.", "-10,000 <= Node.val <= 10,000.", "random is null or references a node in the same list."],
    brute: {
      explanation: "Create copied nodes in list order. For each original random pointer, scan the original list to find its target index, then scan the copied list to select the node at that index.",
      drawback: "Repeatedly locating random targets turns a linear copy into O(n²) work.",
      complexity: "O(n²) time · O(n) result space",
      code: code`class Solution {
    public Node copyRandomList(Node head) {
        java.util.List<Node> originals = new java.util.ArrayList<>();
        java.util.List<Node> copies = new java.util.ArrayList<>();
        for (Node node = head; node != null; node = node.next) {
            originals.add(node);
            copies.add(new Node(node.val));
        }
        for (int i = 0; i < copies.size(); i++) {
            if (i + 1 < copies.size()) copies.get(i).next = copies.get(i + 1);
            Node target = originals.get(i).random;
            if (target != null) {
                for (int j = 0; j < originals.size(); j++) {
                    if (originals.get(j) == target) {
                        copies.get(i).random = copies.get(j);
                        break;
                    }
                }
            }
        }
        return copies.isEmpty() ? null : copies.get(0);
    }
}`
    },
    optimized: {
      explanation: "Map each original node reference to a newly allocated node. A second pass assigns next and random by looking up their copied targets, giving every pointer assignment constant average time.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Allocate one copy for every original node and store the mapping.", "For each original, map its next and random targets to copied targets.", "Return the mapped copy of head."],
      code: code`class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        java.util.Map<Node, Node> copies = new java.util.HashMap<>();
        for (Node node = head; node != null; node = node.next) copies.put(node, new Node(node.val));
        for (Node node = head; node != null; node = node.next) {
            Node copy = copies.get(node);
            copy.next = copies.get(node.next);
            copy.random = copies.get(node.random);
        }
        return copies.get(head);
    }
}`
    }
  },
  "lru-cache": {
    statement: "Design an LRU cache with a fixed positive capacity. get(key) returns the stored value or -1 and marks the key as most recently used. put(key, value) inserts or updates a key, marks it most recently used, and evicts the least recently used key when capacity is exceeded.",
    examples: [
      { input: "capacity = 2; put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "[null,null,1,null,-1]", explanation: "Reading key 1 makes key 2 least recent, so inserting key 3 evicts key 2." },
      { input: "capacity = 2; put(2,1), put(2,2), get(2), put(1,1), put(4,1), get(2)", output: "[null,null,2,null,null,-1]", explanation: "Updating key 2 refreshes it, but later key 2 becomes least recent and is evicted by key 4." }
    ],
    constraints: ["1 <= capacity <= 3,000.", "0 <= key <= 10,000 and 0 <= value <= 100,000.", "At most 200,000 get and put calls are made."],
    brute: {
      explanation: "Keep entries in an ArrayList ordered from least to most recent. Search linearly for every key; remove and append an accessed entry, and remove index zero on eviction.",
      drawback: "Both key lookup and shifting after a removal can take O(capacity), which is too slow for a long operation sequence.",
      complexity: "O(capacity) per get or put · O(capacity) space",
      code: code`class LRUCache {
    private static class Entry {
        int key;
        int value;
        Entry(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final java.util.List<Entry> entries = new java.util.ArrayList<>();

    public LRUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        for (int i = 0; i < entries.size(); i++) {
            Entry entry = entries.get(i);
            if (entry.key == key) {
                entries.remove(i);
                entries.add(entry);
                return entry.value;
            }
        }
        return -1;
    }

    public void put(int key, int value) {
        for (int i = 0; i < entries.size(); i++) {
            if (entries.get(i).key == key) {
                entries.remove(i);
                break;
            }
        }
        entries.add(new Entry(key, value));
        if (entries.size() > capacity) entries.remove(0);
    }
}`
    },
    optimized: {
      explanation: "A hash map locates a node by key in constant average time. A doubly linked list orders nodes from least recent near the head to most recent near the tail. Access detaches a node and appends it at the tail; eviction removes the head's neighbor.",
      complexity: "O(1) average time per get or put · O(capacity) space",
      steps: ["Use sentinels so every detach and append has the same pointer operations.", "On get or update, move the located node to the most-recent end.", "After a new insertion exceeds capacity, remove the least-recent node from both structures."],
      code: code`class LRUCache {
    private static class Node {
        int key;
        int value;
        Node prev;
        Node next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final java.util.Map<Integer, Node> cache = new java.util.HashMap<>();
    private final Node head = new Node(0, 0);
    private final Node tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;
        remove(node);
        append(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node != null) {
            node.value = value;
            remove(node);
            append(node);
            return;
        }
        node = new Node(key, value);
        cache.put(key, node);
        append(node);
        if (cache.size() > capacity) {
            Node oldest = head.next;
            remove(oldest);
            cache.remove(oldest.key);
        }
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void append(Node node) {
        node.prev = tail.prev;
        node.next = tail;
        tail.prev.next = node;
        tail.prev = node;
    }
}`
    }
  },
  "reverse-nodes-in-k-group": {
    statement: "Given a linked list and a positive integer k, reverse nodes in consecutive groups of exactly k. Leave a final group shorter than k unchanged and return the head. Node values may not be changed.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]", explanation: "The first two complete pairs are reversed; node 5 remains." },
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]", explanation: "Only the first three-node group is complete." },
      { input: "head = [1], k = 1", output: "[1]", explanation: "Reversing a group of one changes nothing." }
    ],
    constraints: ["The list contains n nodes where 1 <= n <= 5,000.", "0 <= Node.val <= 1,000.", "1 <= k <= n."],
    brute: {
      explanation: "Store every node reference in an array. Reverse each complete k-sized slice in the array, then reconnect the array order into a list.",
      drawback: "Array slicing makes the groups easy to address but consumes O(n) memory solely for node references.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) nodes.add(node);
        for (int start = 0; start + k <= nodes.size(); start += k) {
            int left = start;
            int right = start + k - 1;
            while (left < right) {
                ListNode temp = nodes.get(left);
                nodes.set(left++, nodes.get(right));
                nodes.set(right--, temp);
            }
        }
        for (int i = 0; i + 1 < nodes.size(); i++) nodes.get(i).next = nodes.get(i + 1);
        nodes.get(nodes.size() - 1).next = null;
        return nodes.get(0);
    }
}`
    },
    optimized: {
      explanation: "Before reversing a group, walk k edges to prove that all k nodes exist. Reverse exactly the links from the group start through that kth node, connect the old group head to the next group, and continue from that old head.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Use a dummy node and locate the kth node after groupPrev.", "Reverse the current group with groupNext as the initial previous pointer.", "Reconnect groupPrev to the new group head and advance groupPrev to the old head."],
      code: code`class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;
        while (true) {
            ListNode kth = groupPrev;
            for (int i = 0; i < k && kth != null; i++) kth = kth.next;
            if (kth == null) return dummy.next;
            ListNode groupNext = kth.next;
            ListNode prev = groupNext;
            ListNode current = groupPrev.next;
            while (current != groupNext) {
                ListNode next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            ListNode oldHead = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = oldHead;
        }
    }
}`
    }
  },
  "swap-nodes-in-pairs": {
    statement: "Given a singly linked list, swap each adjacent pair of nodes and return the head. If one node remains at the end, leave it in place. Do not swap only the values.",
    examples: [
      { input: "head = [1,2,3,4]", output: "[2,1,4,3]", explanation: "Nodes 1 and 2 swap, then nodes 3 and 4 swap." },
      { input: "head = []", output: "[]", explanation: "There are no pairs." },
      { input: "head = [1,2,3]", output: "[2,1,3]", explanation: "The final unpaired node remains last." }
    ],
    constraints: ["The list contains 0 to 100 nodes.", "0 <= Node.val <= 100."],
    brute: {
      explanation: "Copy all node references into an array, exchange each neighboring pair in the array, and reconnect nodes in the new order.",
      drawback: "The whole list is duplicated as references even though each pair can be rewired locally.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode swapPairs(ListNode head) {
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) nodes.add(node);
        for (int i = 0; i + 1 < nodes.size(); i += 2) {
            ListNode temp = nodes.get(i);
            nodes.set(i, nodes.get(i + 1));
            nodes.set(i + 1, temp);
        }
        for (int i = 0; i + 1 < nodes.size(); i++) nodes.get(i).next = nodes.get(i + 1);
        if (!nodes.isEmpty()) nodes.get(nodes.size() - 1).next = null;
        return nodes.isEmpty() ? null : nodes.get(0);
    }
}`
    },
    optimized: {
      explanation: "Keep prev immediately before the next pair. Redirect prev to the second node, the first node to the pair's successor, and the second node to the first. Then advance prev to the pair's new tail.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Create a dummy node before head.", "Save the two nodes and the node after their pair.", "Perform the three link changes and advance to the next pair."],
      code: code`class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            first.next = second.next;
            second.next = first;
            prev.next = second;
            prev = first;
        }
        return dummy.next;
    }
}`
    }
  },
  "rotate-list": {
    statement: "Given a linked-list head and a nonnegative integer k, rotate the list right by k positions and return the new head.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]", explanation: "The last two nodes move in front while keeping their order." },
      { input: "head = [0,1,2], k = 4", output: "[2,0,1]", explanation: "Four rotations equal one effective rotation for a three-node list." },
      { input: "head = [], k = 3", output: "[]", explanation: "An empty list is unchanged." }
    ],
    constraints: ["The list contains 0 to 500 nodes.", "-100 <= Node.val <= 100.", "0 <= k <= 2,000,000,000."],
    brute: {
      explanation: "Store nodes in an array, reduce k modulo the length, then reconnect array indices beginning at length - k and wrapping around.",
      drawback: "Direct indexing is convenient but requires O(n) storage for a transformation that needs only a few pointers.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) return null;
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) nodes.add(node);
        k %= nodes.size();
        int start = (nodes.size() - k) % nodes.size();
        for (int count = 0; count + 1 < nodes.size(); count++) {
            nodes.get((start + count) % nodes.size()).next = nodes.get((start + count + 1) % nodes.size());
        }
        nodes.get((start + nodes.size() - 1) % nodes.size()).next = null;
        return nodes.get(start);
    }
}`
    },
    optimized: {
      explanation: "Find the length and tail, reduce k modulo the length, and join tail to head to form a ring. The new tail is length - k - 1 steps from the old head; its next node is the new head. Break the ring there.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Count nodes while locating the old tail.", "Connect the tail to head and reduce k modulo length.", "Walk to the new tail, save its next as the head, and set newTail.next to null."],
      code: code`class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k %= length;
        if (k == 0) return head;
        tail.next = head;
        ListNode newTail = head;
        for (int i = 0; i < length - k - 1; i++) newTail = newTail.next;
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
}`
    }
  },
  "partition-list": {
    statement: "Given a linked-list head and value x, place every node with value less than x before every node with value at least x. Preserve the original relative order within both groups and return the head.",
    examples: [
      { input: "head = [1,4,3,2,5,2], x = 3", output: "[1,2,2,4,3,5]", explanation: "The less-than group [1,2,2] and the other group [4,3,5] each retain their input order." },
      { input: "head = [2,1], x = 2", output: "[1,2]", explanation: "Node 1 belongs before node 2." }
    ],
    constraints: ["The list contains 0 to 200 nodes.", "-100 <= Node.val <= 100.", "-200 <= x <= 200."],
    brute: {
      explanation: "Make two arrays of node references, one for values below x and one for the rest. Concatenate the arrays and reconnect their nodes.",
      drawback: "The stable grouping is clear, but the arrays retain O(n) extra node references.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode partition(ListNode head, int x) {
        java.util.List<ListNode> ordered = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) {
            if (node.val < x) ordered.add(node);
        }
        for (ListNode node = head; node != null; node = node.next) {
            if (node.val >= x) ordered.add(node);
        }
        for (int i = 0; i + 1 < ordered.size(); i++) ordered.get(i).next = ordered.get(i + 1);
        if (!ordered.isEmpty()) ordered.get(ordered.size() - 1).next = null;
        return ordered.isEmpty() ? null : ordered.get(0);
    }
}`
    },
    optimized: {
      explanation: "Build two chains with dummy heads while reusing input nodes. Append each node to the less chain or greater-or-equal chain in encounter order, then join the chains and terminate the second one.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Create less and greater dummy heads with tail pointers.", "Append each input node to exactly one tail.", "Join lessTail to greaterDummy.next, terminate greaterTail, and return lessDummy.next."],
      code: code`class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode lessDummy = new ListNode(0);
        ListNode greaterDummy = new ListNode(0);
        ListNode less = lessDummy;
        ListNode greater = greaterDummy;
        while (head != null) {
            if (head.val < x) {
                less.next = head;
                less = less.next;
            } else {
                greater.next = head;
                greater = greater.next;
            }
            head = head.next;
        }
        greater.next = null;
        less.next = greaterDummy.next;
        return lessDummy.next;
    }
}`
    }
  },
  "sort-list": {
    statement: "Sort the values of a linked list into ascending order and return the sorted head.",
    examples: [
      { input: "head = [4,2,1,3]", output: "[1,2,3,4]", explanation: "All four nodes are returned in nondecreasing value order." },
      { input: "head = [-1,5,3,4,0]", output: "[-1,0,3,4,5]", explanation: "Negative and positive values are ordered together." },
      { input: "head = []", output: "[]", explanation: "The empty list is already sorted." }
    ],
    constraints: ["The list contains 0 to 50,000 nodes.", "-100,000 <= Node.val <= 100,000."],
    brute: {
      explanation: "Copy all values to an array, sort the array, and write the sorted values back into the existing nodes.",
      drawback: "It relies on random-access storage and uses O(n) extra memory instead of exploiting linked-list splitting and merging.",
      complexity: "O(n log n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode sortList(ListNode head) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) values.add(node.val);
        java.util.Collections.sort(values);
        ListNode node = head;
        for (int value : values) {
            node.val = value;
            node = node.next;
        }
        return head;
    }
}`
    },
    optimized: {
      explanation: "Merge sort matches linked lists because a slow-fast scan splits without indexing and two sorted chains merge by pointer changes. Recursively sort each half, then merge them.",
      complexity: "O(n log n) time · O(log n) recursion space",
      steps: ["Return immediately for zero or one node.", "Split at the midpoint and recursively sort both detached halves.", "Merge the two sorted chains with a dummy tail."],
      code: code`class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode right = slow.next;
        slow.next = null;
        return merge(sortList(head), sortList(right));
    }

    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}`
    }
  },
  "flatten-a-multilevel-doubly-linked-list": {
    statement: "Each node of a doubly linked list may own a child list with the same structure. Flatten all nodes into one depth-first doubly linked list in place, inserting each child list immediately after its parent and setting every child pointer to null.",
    examples: [
      { input: "1-2-3-4-5-6, 3.child = 7-8-9-10, 8.child = 11-12", output: "[1,2,3,7,8,11,12,9,10,4,5,6]", explanation: "Each child chain is visited before returning to its parent's former next node." },
      { input: "1-2, 1.child = 3", output: "[1,3,2]", explanation: "The child of node 1 is inserted before node 2." },
      { input: "head = []", output: "[]", explanation: "There are no nodes to flatten." }
    ],
    constraints: ["The structure contains at most 1,000 nodes in total.", "1 <= Node.val <= 100,000.", "No node appears in more than one next or child chain."],
    brute: {
      explanation: "Perform a recursive preorder traversal and store node references in an array. After traversal, connect consecutive array entries with next and prev and clear every child.",
      drawback: "The array duplicates the complete traversal order before any links can be finalized.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public Node flatten(Node head) {
        java.util.List<Node> order = new java.util.ArrayList<>();
        collect(head, order);
        for (int i = 0; i < order.size(); i++) {
            Node node = order.get(i);
            node.prev = i == 0 ? null : order.get(i - 1);
            node.next = i + 1 == order.size() ? null : order.get(i + 1);
            node.child = null;
        }
        return order.isEmpty() ? null : order.get(0);
    }

    private void collect(Node node, java.util.List<Node> order) {
        while (node != null) {
            Node next = node.next;
            order.add(node);
            if (node.child != null) collect(node.child, order);
            node = next;
        }
    }
}`
    },
    optimized: {
      explanation: "Traverse depth first with a stack. Before moving into a child, save the current next node on the stack. Connect the child after the parent and clear child. When a chain ends, pop the deferred next node and connect it after the current tail.",
      complexity: "O(n) time · O(d) extra space, where d is nesting depth",
      steps: ["Push a parent's original next node before entering its child.", "Splice the child after the parent and clear the child pointer.", "At the end of a chain, pop and reconnect the most recently deferred suffix."],
      code: code`class Solution {
    public Node flatten(Node head) {
        if (head == null) return null;
        java.util.Deque<Node> deferred = new java.util.ArrayDeque<>();
        Node current = head;
        while (current != null) {
            if (current.child != null) {
                if (current.next != null) deferred.push(current.next);
                current.next = current.child;
                current.child.prev = current;
                current.child = null;
            }
            if (current.next == null && !deferred.isEmpty()) {
                current.next = deferred.pop();
                current.next.prev = current;
            }
            current = current.next;
        }
        return head;
    }
}`
    }
  },
  "odd-even-linked-list": {
    statement: "Group the nodes at odd one-based positions first, followed by nodes at even positions, while preserving relative order inside each group. Return the head and use constant auxiliary space.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[1,3,5,2,4]", explanation: "Positions 1,3,5 precede positions 2,4." },
      { input: "head = [2,1,3,5,6,4,7]", output: "[2,3,6,7,1,5,4]", explanation: "Odd-position nodes and even-position nodes each keep their original order." },
      { input: "head = []", output: "[]", explanation: "There are no positions to group." }
    ],
    constraints: ["The list contains 0 to 10,000 nodes.", "-1,000,000 <= Node.val <= 1,000,000."],
    brute: {
      explanation: "Store odd-position node references in one array and even-position references in another, concatenate their order, and reconnect all nodes.",
      drawback: "The arrays make positional grouping direct but use O(n) extra memory.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode oddEvenList(ListNode head) {
        java.util.List<ListNode> odd = new java.util.ArrayList<>();
        java.util.List<ListNode> even = new java.util.ArrayList<>();
        int position = 1;
        for (ListNode node = head; node != null; node = node.next) {
            if ((position++ & 1) == 1) odd.add(node);
            else even.add(node);
        }
        java.util.List<ListNode> nodes = new java.util.ArrayList<>(odd);
        nodes.addAll(even);
        for (int i = 0; i + 1 < nodes.size(); i++) nodes.get(i).next = nodes.get(i + 1);
        if (!nodes.isEmpty()) nodes.get(nodes.size() - 1).next = null;
        return nodes.isEmpty() ? null : nodes.get(0);
    }
}`
    },
    optimized: {
      explanation: "Maintain the tails of the growing odd and even chains. Each iteration skips the odd tail over the next even node, then skips the even tail over the next odd node. Finally attach the original even head after the odd tail.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Save head.next as the even-chain head.", "Alternately advance odd.next and even.next over the opposite group.", "Connect the last odd node to evenHead."],
      code: code`class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}`
    }
  },
  "remove-duplicates-from-sorted-list-ii": {
    statement: "Given a linked list sorted in nondecreasing order, remove every value that occurs more than once. Return a list containing only values that were unique in the input.",
    examples: [
      { input: "head = [1,2,3,3,4,4,5]", output: "[1,2,5]", explanation: "All nodes containing 3 or 4 are removed." },
      { input: "head = [1,1,1,2,3]", output: "[2,3]", explanation: "The entire run of 1 values is removed, including the original head." },
      { input: "head = [1,2,3]", output: "[1,2,3]", explanation: "Every value occurs once." }
    ],
    constraints: ["The list contains 0 to 300 nodes.", "-100 <= Node.val <= 100.", "Values are sorted in nondecreasing order."],
    brute: {
      explanation: "Count every value in a hash map, then build a new list from input values whose count equals one.",
      drawback: "It uses a map and allocates new nodes even though equal values are already adjacent and can be skipped in place.",
      complexity: "O(n) time · O(n) extra space",
      code: code`class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        java.util.Map<Integer, Integer> count = new java.util.HashMap<>();
        for (ListNode node = head; node != null; node = node.next) count.merge(node.val, 1, Integer::sum);
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (ListNode node = head; node != null; node = node.next) {
            if (count.get(node.val) == 1) {
                tail.next = new ListNode(node.val);
                tail = tail.next;
            }
        }
        return dummy.next;
    }
}`
    },
    optimized: {
      explanation: "A dummy node protects duplicate runs that begin at the head. When current begins a repeated run, advance past every node with that value and connect prev.next to the first different node. Otherwise advance prev normally.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Start prev at a dummy and current at head.", "Detect a run by comparing current with current.next.", "Skip the whole repeated run or advance both pointers for a unique node."],
      code: code`class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        ListNode current = head;
        while (current != null) {
            if (current.next != null && current.val == current.next.val) {
                int value = current.val;
                while (current != null && current.val == value) current = current.next;
                prev.next = current;
            } else {
                prev = current;
                current = current.next;
            }
        }
        return dummy.next;
    }
}`
    }
  },
  "delete-node-in-a-linked-list": {
    statement: "You are given direct access to a non-tail node of a singly linked list, but not the head. Delete that node so the list behaves as though its position was removed.",
    examples: [
      { input: "list = [4,5,1,9], node points to 5", output: "[4,1,9]", explanation: "The supplied node takes value 1 and bypasses the original node containing 1." },
      { input: "list = [4,5,1,9], node points to 1", output: "[4,5,9]", explanation: "The supplied node takes the tail value and then becomes the tail." }
    ],
    constraints: ["The list contains 2 to 1,000 nodes.", "-1,000 <= Node.val <= 1,000.", "The supplied node belongs to the list and is not the tail.", "Every node value is unique."],
    brute: {
      explanation: "Shift every successor value one node to the left until reaching the tail, then unlink that tail from its predecessor.",
      drawback: "It performs work for every node after the target even though only the immediate successor is needed to make the target disappear logically.",
      complexity: "O(n) time · O(1) extra space",
      code: code`class Solution {
    public void deleteNode(ListNode node) {
        while (node.next.next != null) {
            node.val = node.next.val;
            node = node.next;
        }
        node.val = node.next.val;
        node.next = null;
    }
}`
    },
    optimized: {
      explanation: "Copy the immediate successor's value into the supplied node, then bypass that successor. The observable sequence loses the requested value even though the supplied object remains in memory.",
      complexity: "O(1) time · O(1) extra space",
      steps: ["Read the guaranteed non-null successor.", "Copy its value into the supplied node.", "Set node.next to node.next.next."],
      code: code`class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}`
    }
  },
  "design-browser-history": {
    statement: "Design browser history initialized with a homepage. visit(url) opens a new page and discards all forward history. back(steps) and forward(steps) move as far as possible in the requested direction and return the current URL.",
    examples: [
      { input: "BrowserHistory('leetcode.com'); visit('google.com'); visit('facebook.com'); visit('youtube.com'); back(1); back(1); forward(1)", output: "['facebook.com','google.com','facebook.com']", explanation: "The current index moves backward twice and forward once through the stored order." },
      { input: "after the first example: visit('linkedin.com'); forward(2); back(2); back(7)", output: "['linkedin.com','linkedin.com','google.com','leetcode.com']", explanation: "Visiting LinkedIn discards YouTube; moves stop at either end of history." }
    ],
    constraints: ["1 <= homepage.length, url.length <= 20.", "URLs contain lowercase English letters and periods.", "1 <= steps <= 100.", "At most 5,000 method calls are made."],
    brute: {
      explanation: "Keep the active history in an ArrayList. A visit repeatedly removes every entry after the current index before appending the new URL. Back and forward clamp the index.",
      drawback: "Discarding forward history can shift or remove many elements one by one, so a visit may take O(n).",
      complexity: "visit O(n), back O(1), forward O(1) · O(n) space",
      code: code`class BrowserHistory {
    private final java.util.List<String> history = new java.util.ArrayList<>();
    private int current;

    public BrowserHistory(String homepage) {
        history.add(homepage);
    }

    public void visit(String url) {
        while (history.size() > current + 1) history.remove(history.size() - 1);
        history.add(url);
        current++;
    }

    public String back(int steps) {
        current = Math.max(0, current - steps);
        return history.get(current);
    }

    public String forward(int steps) {
        current = Math.min(history.size() - 1, current + steps);
        return history.get(current);
    }
}`
    },
    optimized: {
      explanation: "Keep an array plus current and last-valid indices. A new visit increments current, overwrites or appends that slot, and sets last to current, which discards forward history logically without deleting it. Navigation only clamps current.",
      complexity: "O(1) amortized per operation · O(n) space",
      steps: ["Track the current position and the last reachable position separately.", "On visit, move current once, overwrite or append, and set last to current.", "Clamp back to zero and forward to last."],
      code: code`class BrowserHistory {
    private final java.util.List<String> history = new java.util.ArrayList<>();
    private int current;
    private int last;

    public BrowserHistory(String homepage) {
        history.add(homepage);
    }

    public void visit(String url) {
        current++;
        if (current < history.size()) history.set(current, url);
        else history.add(url);
        last = current;
    }

    public String back(int steps) {
        current = Math.max(0, current - steps);
        return history.get(current);
    }

    public String forward(int steps) {
        current = Math.min(last, current + steps);
        return history.get(current);
    }
}`
    }
  },
  "valid-parentheses": {
    statement: "Given a string containing only round, square, and curly brackets, return true when every opening bracket is closed by the same type in the correct nested order.",
    examples: [
      { input: "s = '()'", output: "true", explanation: "The opening parenthesis is immediately closed." },
      { input: "s = '()[]{}'", output: "true", explanation: "All three adjacent pairs are valid." },
      { input: "s = '([)]'", output: "false", explanation: "The parenthesis closes before the square bracket nested inside it." }
    ],
    constraints: ["1 <= s.length <= 10,000.", "s contains only the characters ()[]{}."],
    brute: {
      explanation: "Repeatedly remove every adjacent valid pair: (), [], and {}. Correctly nested inner pairs eventually become adjacent, so the input is valid exactly when all characters disappear.",
      drawback: "Each replacement can copy and rescan the string, producing quadratic work for deeply nested input.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public boolean isValid(String s) {
        while (true) {
            String next = s.replace("()", "").replace("[]", "").replace("{}", "");
            if (next.length() == s.length()) return s.isEmpty();
            s = next;
        }
    }
}`
    },
    optimized: {
      explanation: "A closing bracket must match the latest unmatched opener, so store expected closing brackets on a stack. On an opener push its expected closer; on a closer require it to equal the top. A valid scan ends with an empty stack.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Push the matching closer whenever an opener appears.", "For a closer, reject an empty stack or a different top value.", "After all characters, accept only if no expected closer remains."],
      code: code`class Solution {
    public boolean isValid(String s) {
        java.util.Deque<Character> expected = new java.util.ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(') expected.push(')');
            else if (ch == '[') expected.push(']');
            else if (ch == '{') expected.push('}');
            else if (expected.isEmpty() || expected.pop() != ch) return false;
        }
        return expected.isEmpty();
    }
}`
    }
  },
  "min-stack": {
    statement: "Design a stack supporting push, pop, top, and getMin, where getMin returns the smallest stored value. Every operation must be available, and the optimized design must run each one in constant time.",
    examples: [
      { input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "[-3,0,-2]", explanation: "After -3 is removed, the minimum returns to -2." },
      { input: "push(2), push(2), getMin(), pop(), getMin()", output: "[2,2]", explanation: "Duplicate minima are tracked independently." }
    ],
    constraints: ["-2,147,483,648 <= val <= 2,147,483,647.", "pop, top, and getMin are called only on a nonempty stack.", "At most 30,000 operations are made."],
    brute: {
      explanation: "Store values in one stack. push, pop, and top use its end directly; getMin scans every stored value to find the minimum.",
      drawback: "A minimum query costs O(n), and repeated queries can make the operation sequence quadratic.",
      complexity: "push/pop/top O(1), getMin O(n) · O(n) space",
      code: code`class MinStack {
    private final java.util.List<Integer> values = new java.util.ArrayList<>();

    public MinStack() {
    }

    public void push(int val) {
        values.add(val);
    }

    public void pop() {
        values.remove(values.size() - 1);
    }

    public int top() {
        return values.get(values.size() - 1);
    }

    public int getMin() {
        int minimum = values.get(0);
        for (int value : values) minimum = Math.min(minimum, value);
        return minimum;
    }
}`
    },
    optimized: {
      explanation: "Alongside each pushed value, store the minimum at that stack depth. The new minimum is min(value, previous minimum), so popping automatically restores the earlier minimum.",
      complexity: "O(1) per operation · O(n) space",
      steps: ["Represent each entry as its value and minimum-so-far.", "Push min(newValue, currentMinimum) with every value.", "Read both top and minimum from the last entry."],
      code: code`class MinStack {
    private final java.util.Deque<int[]> stack = new java.util.ArrayDeque<>();

    public MinStack() {
    }

    public void push(int val) {
        int minimum = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[]{val, minimum});
    }

    public void pop() {
        stack.pop();
    }

    public int top() {
        return stack.peek()[0];
    }

    public int getMin() {
        return stack.peek()[1];
    }
}`
    }
  },
  "evaluate-reverse-polish-notation": {
    statement: "Evaluate an arithmetic expression provided as Reverse Polish Notation tokens. Each operator follows its two operands. Division truncates toward zero, and every intermediate result fits a signed 32-bit integer.",
    examples: [
      { input: "tokens = ['2','1','+','3','*']", output: "9", explanation: "2 + 1 becomes 3, then 3 * 3 becomes 9." },
      { input: "tokens = ['4','13','5','/','+']", output: "6", explanation: "13 / 5 truncates to 2, then 4 + 2 is 6." },
      { input: "tokens = ['10','6','9','3','+','-11','*','/','*','17','+','5','+']", output: "22", explanation: "Applying operators to the two most recent values yields 22." }
    ],
    constraints: ["1 <= tokens.length <= 10,000.", "Each token is an operator or an integer in [-200, 200].", "The expression is valid and never divides by zero."],
    brute: {
      explanation: "Keep tokens in a mutable list. Find the first operator, evaluate the two numeric tokens immediately before it, replace all three with the result, and restart until one value remains.",
      drawback: "Removing and inserting inside an array list shifts later tokens repeatedly, causing O(n²) work.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public int evalRPN(String[] tokens) {
        java.util.List<String> expression = new java.util.ArrayList<>(java.util.Arrays.asList(tokens));
        while (expression.size() > 1) {
            for (int i = 0; i < expression.size(); i++) {
                String token = expression.get(i);
                if (token.length() == 1 && "+-*/".contains(token)) {
                    int left = Integer.parseInt(expression.get(i - 2));
                    int right = Integer.parseInt(expression.get(i - 1));
                    int value = apply(left, right, token.charAt(0));
                    expression.set(i - 2, String.valueOf(value));
                    expression.remove(i);
                    expression.remove(i - 1);
                    break;
                }
            }
        }
        return Integer.parseInt(expression.get(0));
    }

    private int apply(int left, int right, char operator) {
        if (operator == '+') return left + right;
        if (operator == '-') return left - right;
        if (operator == '*') return left * right;
        return left / right;
    }
}`
    },
    optimized: {
      explanation: "Push each number. An operator consumes the right operand from the top and then the left operand beneath it; apply the operator and push the result. The final stack value is the expression result.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Push parsed integer tokens.", "For an operator, pop right then left and compute left operator right.", "Push each intermediate result and return the sole remaining value."],
      code: code`class Solution {
    public int evalRPN(String[] tokens) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        for (String token : tokens) {
            if (!token.equals("+") && !token.equals("-") && !token.equals("*") && !token.equals("/")) {
                stack.push(Integer.parseInt(token));
                continue;
            }
            int right = stack.pop();
            int left = stack.pop();
            if (token.equals("+")) stack.push(left + right);
            else if (token.equals("-")) stack.push(left - right);
            else if (token.equals("*")) stack.push(left * right);
            else stack.push(left / right);
        }
        return stack.pop();
    }
}`
    }
  },
  "daily-temperatures": {
    statement: "For each daily temperature, return how many days must pass before a strictly warmer temperature. Use zero when no warmer future day exists.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", explanation: "For temperature 75, the next warmer value is 76 four days later." },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]", explanation: "Every day except the last is followed immediately by a warmer day." },
      { input: "temperatures = [30,60,90]", output: "[1,1,0]", explanation: "The sequence is strictly increasing." }
    ],
    constraints: ["1 <= temperatures.length <= 100,000.", "30 <= temperatures[i] <= 100."],
    brute: {
      explanation: "For each index, scan later days until the first strictly warmer value appears and record the distance.",
      drawback: "A decreasing sequence scans nearly the whole suffix for every day, producing quadratic time.",
      complexity: "O(n²) time · O(1) extra space excluding output",
      code: code`class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        for (int i = 0; i < temperatures.length; i++) {
            for (int j = i + 1; j < temperatures.length; j++) {
                if (temperatures[j] > temperatures[i]) {
                    answer[i] = j - i;
                    break;
                }
            }
        }
        return answer;
    }
}`
    },
    optimized: {
      explanation: "Keep indices whose warmer day is unresolved in a stack with decreasing temperatures. A new warmer temperature resolves every smaller temperature on top, and its index difference is the wait.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Read temperatures left to right.", "Pop while the current value is warmer and fill each popped index's distance.", "Push the current index; unresolved indices keep zero."],
      code: code`class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int previous = stack.pop();
                answer[previous] = i - previous;
            }
            stack.push(i);
        }
        return answer;
    }
}`
    }
  },
  "next-greater-element-i": {
    statement: "nums1 contains distinct values drawn from distinct-value array nums2. For every nums1 value, return the first greater value to its right in nums2, or -1 if none exists.",
    examples: [
      { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]", explanation: "Value 1 first sees 3; values 4 and 2 have no greater value to their right." },
      { input: "nums1 = [2,4], nums2 = [1,2,3,4]", output: "[3,-1]", explanation: "The next greater value after 2 is 3, while 4 is last." }
    ],
    constraints: ["1 <= nums1.length <= nums2.length <= 1,000.", "0 <= nums1[i], nums2[i] <= 10,000.", "All values in each array are unique and nums1 is a subset of nums2."],
    brute: {
      explanation: "For each nums1 value, locate it in nums2 and scan to the right until a greater value appears.",
      drawback: "Every query may rescan most of nums2, so many queries repeat the same comparisons.",
      complexity: "O(mn) time · O(1) extra space excluding output",
      code: code`class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int[] answer = new int[nums1.length];
        java.util.Arrays.fill(answer, -1);
        for (int i = 0; i < nums1.length; i++) {
            int position = 0;
            while (nums2[position] != nums1[i]) position++;
            for (int j = position + 1; j < nums2.length; j++) {
                if (nums2[j] > nums1[i]) {
                    answer[i] = nums2[j];
                    break;
                }
            }
        }
        return answer;
    }
}`
    },
    optimized: {
      explanation: "Scan nums2 once with a decreasing stack of unresolved values. A current value becomes the next greater value for every smaller stack top. Save those relationships in a map, then answer nums1 by lookup.",
      complexity: "O(m + n) time · O(n) extra space",
      steps: ["Keep unresolved nums2 values in decreasing order.", "Map every smaller popped value to the current greater value.", "Look up each nums1 value, defaulting to -1."],
      code: code`class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        java.util.Map<Integer, Integer> next = new java.util.HashMap<>();
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        for (int value : nums2) {
            while (!stack.isEmpty() && stack.peek() < value) next.put(stack.pop(), value);
            stack.push(value);
        }
        int[] answer = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) answer[i] = next.getOrDefault(nums1[i], -1);
        return answer;
    }
}`
    }
  },
  "next-greater-element-ii": {
    statement: "Given a circular integer array, return the first strictly greater value encountered after each element while moving right and wrapping to index zero. Return -1 when none exists.",
    examples: [
      { input: "nums = [1,2,1]", output: "[2,-1,2]", explanation: "The last 1 wraps around and finds 2." },
      { input: "nums = [1,2,3,4,3]", output: "[2,3,4,-1,4]", explanation: "The final 3 wraps and reaches 4; the maximum value has no greater element." },
      { input: "nums = [5,4,3]", output: "[-1,5,5]", explanation: "Both 4 and 3 find 5 after wrapping." }
    ],
    constraints: ["1 <= nums.length <= 10,000.", "-1,000,000,000 <= nums[i] <= 1,000,000,000."],
    brute: {
      explanation: "For every index, test the next n - 1 circular positions in order and stop at the first greater value.",
      drawback: "When no greater value exists, each index scans almost the complete array, producing O(n²) work.",
      complexity: "O(n²) time · O(1) extra space excluding output",
      code: code`class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        java.util.Arrays.fill(answer, -1);
        for (int i = 0; i < n; i++) {
            for (int step = 1; step < n; step++) {
                int value = nums[(i + step) % n];
                if (value > nums[i]) {
                    answer[i] = value;
                    break;
                }
            }
        }
        return answer;
    }
}`
    },
    optimized: {
      explanation: "Scan 2n virtual positions using index modulo n. During the first pass, push unresolved original indices in decreasing-value order. During both passes, the current value resolves smaller stack tops; the second pass supplies wrapped candidates without pushing duplicates.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Initialize every answer to -1.", "For i from 0 through 2n - 1, use index i modulo n to simulate wrapping.", "Resolve smaller stack tops and push indices only during the first n iterations."],
      code: code`class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        java.util.Arrays.fill(answer, -1);
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        for (int i = 0; i < 2 * n; i++) {
            int index = i % n;
            while (!stack.isEmpty() && nums[stack.peek()] < nums[index]) answer[stack.pop()] = nums[index];
            if (i < n) stack.push(index);
        }
        return answer;
    }
}`
    }
  },
  "largest-rectangle-in-histogram": {
    statement: "Given nonnegative bar heights of unit width, return the largest rectangular area that can be formed from one or more consecutive bars.",
    examples: [
      { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "The bars of heights 5 and 6 form a width-2 rectangle limited to height 5." },
      { input: "heights = [2,4]", output: "4", explanation: "Either the height-4 single bar or both bars at height 2 has area 4." },
      { input: "heights = [2,1,2]", output: "3", explanation: "All three bars support height 1." }
    ],
    constraints: ["1 <= heights.length <= 100,000.", "0 <= heights[i] <= 10,000."],
    brute: {
      explanation: "Treat each index as the shortest bar of a rectangle. Expand left and right while neighboring heights remain at least that height, then compute its maximal span.",
      drawback: "A flat or increasing histogram expands across most bars for many indices, resulting in quadratic time.",
      complexity: "O(n²) time · O(1) extra space",
      code: code`class Solution {
    public int largestRectangleArea(int[] heights) {
        int best = 0;
        for (int i = 0; i < heights.length; i++) {
            int left = i;
            int right = i;
            while (left > 0 && heights[left - 1] >= heights[i]) left--;
            while (right + 1 < heights.length && heights[right + 1] >= heights[i]) right++;
            best = Math.max(best, heights[i] * (right - left + 1));
        }
        return best;
    }
}`
    },
    optimized: {
      explanation: "Keep increasing bar indices on a stack. When the current height is lower, each popped height has just found its first smaller boundary on the right, while the new stack top identifies its first smaller boundary on the left. That determines its maximal width.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Scan through one extra zero-height sentinel position.", "While the current height is lower than the stack top, pop and compute its width between smaller boundaries.", "Push the current index and retain the maximum area."],
      code: code`class Solution {
    public int largestRectangleArea(int[] heights) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= heights.length; i++) {
            int current = i == heights.length ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > current) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, height * (i - left - 1));
            }
            stack.push(i);
        }
        return best;
    }
}`
    }
  },
  "car-fleet": {
    statement: "Cars travel toward the same target on one lane and cannot pass. Given each car's position and speed, return how many fleets reach the target. A faster car that catches a slower fleet joins it and then shares its speed.",
    examples: [
      { input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3", explanation: "Cars at 10 and 8 meet at the target, cars at 5 and 3 meet earlier, and the car at 0 remains separate." },
      { input: "target = 10, position = [3], speed = [3]", output: "1", explanation: "A single car is one fleet." },
      { input: "target = 100, position = [0,2,4], speed = [4,2,1]", output: "1", explanation: "The faster cars behind catch the slower car ahead." }
    ],
    constraints: ["1 <= position.length = speed.length <= 100,000.", "0 < target <= 1,000,000.", "0 <= position[i] < target and positions are distinct.", "0 < speed[i] <= 1,000,000."],
    brute: {
      explanation: "Sort cars by position. For each position i, recompute the maximum arrival time among every car from i through the frontmost car. A new suffix maximum indicates a fleet that cannot catch the fleet ahead.",
      drawback: "The same suffix arrival times are recomputed for many starting cars, so sorting is followed by quadratic scanning.",
      complexity: "O(n² + n log n) time · O(n) extra space",
      code: code`class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        Integer[] order = new Integer[position.length];
        for (int i = 0; i < order.length; i++) order[i] = i;
        java.util.Arrays.sort(order, java.util.Comparator.comparingInt(i -> position[i]));
        double previous = -1.0;
        int fleets = 0;
        for (int i = order.length - 1; i >= 0; i--) {
            double suffixMaximum = 0.0;
            for (int j = i; j < order.length; j++) {
                int index = order[j];
                suffixMaximum = Math.max(suffixMaximum, (double) (target - position[index]) / speed[index]);
            }
            if (suffixMaximum > previous) {
                fleets++;
                previous = suffixMaximum;
            }
        }
        return fleets;
    }
}`
    },
    optimized: {
      explanation: "Sort cars from nearest to farthest from the target and compute each solo arrival time. Scanning backward through position order, a car forms a new fleet only when its arrival time is greater than the slowest fleet ahead; otherwise it catches that fleet.",
      complexity: "O(n log n) time · O(n) extra space",
      steps: ["Sort car indices by position.", "Scan from the car nearest the target toward the farthest.", "Count and update the leading arrival time only when the current car arrives later."],
      code: code`class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        Integer[] order = new Integer[position.length];
        for (int i = 0; i < order.length; i++) order[i] = i;
        java.util.Arrays.sort(order, java.util.Comparator.comparingInt(i -> position[i]));
        double fleetTime = -1.0;
        int fleets = 0;
        for (int i = order.length - 1; i >= 0; i--) {
            int index = order[i];
            double arrival = (double) (target - position[index]) / speed[index];
            if (arrival > fleetTime) {
                fleets++;
                fleetTime = arrival;
            }
        }
        return fleets;
    }
}`
    }
  },
  "asteroid-collision": {
    statement: "Asteroids move along one line at equal speed. A positive value moves right and a negative value moves left; absolute value is size. When opposite-moving asteroids meet, the smaller one is destroyed, or both are destroyed if equal. Return the surviving asteroids in order.",
    examples: [
      { input: "asteroids = [5,10,-5]", output: "[5,10]", explanation: "10 and -5 collide, and size 10 survives." },
      { input: "asteroids = [8,-8]", output: "[]", explanation: "Equal sizes destroy each other." },
      { input: "asteroids = [10,2,-5]", output: "[10]", explanation: "-5 destroys 2, then 10 destroys -5." }
    ],
    constraints: ["2 <= asteroids.length <= 10,000.", "-1,000 <= asteroids[i] <= 1,000.", "asteroids[i] is never zero."],
    brute: {
      explanation: "Store asteroids in a mutable list. Repeatedly scan for the first adjacent right-moving and left-moving pair, resolve that collision, and restart until no collision remains.",
      drawback: "Every removal shifts the list and restarting rescans settled asteroids, leading to quadratic time.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (int value : asteroids) values.add(value);
        boolean changed = true;
        while (changed) {
            changed = false;
            for (int i = 0; i + 1 < values.size(); i++) {
                int left = values.get(i);
                int right = values.get(i + 1);
                if (left > 0 && right < 0) {
                    if (left <= -right) values.remove(i);
                    if (left >= -right) values.remove(left <= -right ? i : i + 1);
                    changed = true;
                    break;
                }
            }
        }
        return values.stream().mapToInt(Integer::intValue).toArray();
    }
}`
    },
    optimized: {
      explanation: "Survivors form a stack. Only a positive stack top and a new negative asteroid can collide. Keep comparing until the new asteroid is destroyed, both disappear, or it has no opposing survivor; then push it if still alive.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Assume each incoming asteroid is alive.", "While it moves left against a right-moving stack top, remove the smaller asteroid or both equals.", "Push the incoming asteroid only if it survives all collisions."],
      code: code`class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        for (int asteroid : asteroids) {
            boolean alive = true;
            while (alive && asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {
                if (stack.peek() < -asteroid) stack.pop();
                else if (stack.peek() == -asteroid) {
                    stack.pop();
                    alive = false;
                } else alive = false;
            }
            if (alive) stack.push(asteroid);
        }
        int[] answer = new int[stack.size()];
        for (int i = answer.length - 1; i >= 0; i--) answer[i] = stack.pop();
        return answer;
    }
}`
    }
  },
  "simplify-path": {
    statement: "Given an absolute Unix path, return its canonical form. Treat repeated slashes as one, ignore '.' components, let '..' remove one existing directory, and never move above root.",
    examples: [
      { input: "path = '/home/'", output: "'/home'", explanation: "The trailing slash is omitted." },
      { input: "path = '/home//foo/'", output: "'/home/foo'", explanation: "Repeated separators collapse to one." },
      { input: "path = '/home/user/Documents/../Pictures'", output: "'/home/user/Pictures'", explanation: "The parent marker removes Documents." }
    ],
    constraints: ["1 <= path.length <= 3,000.", "path begins with '/'.", "path contains letters, digits, periods, underscores, and slashes."],
    brute: {
      explanation: "Build a canonical string component by component. For '..', find the final slash in the current result and create a substring without its last directory.",
      drawback: "Each string append or parent removal creates and copies strings, so a long path can require quadratic character work.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public String simplifyPath(String path) {
        String result = "";
        for (String part : path.split("/+")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) {
                int slash = result.lastIndexOf('/');
                result = slash < 0 ? "" : result.substring(0, slash);
            } else result = result + "/" + part;
        }
        return result.isEmpty() ? "/" : result;
    }
}`
    },
    optimized: {
      explanation: "Split the path into components and keep valid directory names in a deque. Ignore empty and '.' parts, pop one directory for '..' when possible, and push normal names. Joining the deque with single slashes gives the canonical path.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Split on one or more slashes.", "Ignore no-op components, pop for '..', and append ordinary directories.", "Join retained names after a root slash."],
      code: code`class Solution {
    public String simplifyPath(String path) {
        java.util.Deque<String> directories = new java.util.ArrayDeque<>();
        for (String part : path.split("/+")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) {
                if (!directories.isEmpty()) directories.removeLast();
            } else directories.addLast(part);
        }
        return "/" + String.join("/", directories);
    }
}`
    }
  },
  "basic-calculator": {
    statement: "Evaluate a valid expression containing nonnegative integers, spaces, '+', '-', and parentheses. Unary minus may appear, and normal integer arithmetic applies.",
    examples: [
      { input: "s = '1 + 1'", output: "2", explanation: "The two numbers add directly." },
      { input: "s = ' 2-1 + 2 '", output: "3", explanation: "Operations are evaluated from left to right because they have equal precedence." },
      { input: "s = '(1+(4+5+2)-3)+(6+8)'", output: "23", explanation: "Parenthesized expressions are evaluated before their surrounding signs." }
    ],
    constraints: ["1 <= s.length <= 300,000.", "s contains digits, '+', '-', '(', ')', and spaces.", "The expression is valid and every result fits a signed 32-bit integer."],
    brute: {
      explanation: "Repeatedly locate the innermost parenthesized substring, evaluate its flat plus-minus expression, and replace it with its numeric result. Evaluate the final flat expression afterward.",
      drawback: "Finding parentheses and rebuilding the surrounding string after each replacement can copy the expression many times.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public int calculate(String s) {
        while (s.indexOf(')') >= 0) {
            int close = s.indexOf(')');
            int open = s.lastIndexOf('(', close);
            int value = flat(s.substring(open + 1, close));
            s = s.substring(0, open) + value + s.substring(close + 1);
        }
        return flat(s);
    }

    private int flat(String s) {
        int total = 0;
        int sign = 1;
        int number = 0;
        for (int i = 0; i <= s.length(); i++) {
            char ch = i == s.length() ? '+' : s.charAt(i);
            if (Character.isDigit(ch)) number = number * 10 + ch - '0';
            else if (ch == '+' || ch == '-') {
                total += sign * number;
                number = 0;
                sign = ch == '+' ? 1 : -1;
            }
        }
        return total;
    }
}`
    },
    optimized: {
      explanation: "Scan once while maintaining the accumulated result and sign for the current parenthesis level. On '(', save the outer result and sign. On ')', finish the inner result, multiply it by its saved sign, and add the saved outer result.",
      complexity: "O(n) time · O(n) extra space for nesting",
      steps: ["Accumulate multi-digit numbers and apply them with the current sign.", "On '(', push the outer result and sign, then reset the inner state.", "On ')', close the inner number and combine the inner result with the saved outer state."],
      code: code`class Solution {
    public int calculate(String s) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        int result = 0;
        int sign = 1;
        int number = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (Character.isDigit(ch)) number = number * 10 + ch - '0';
            else if (ch == '+' || ch == '-') {
                result += sign * number;
                number = 0;
                sign = ch == '+' ? 1 : -1;
            } else if (ch == '(') {
                stack.push(result);
                stack.push(sign);
                result = 0;
                sign = 1;
            } else if (ch == ')') {
                result += sign * number;
                number = 0;
                result *= stack.pop();
                result += stack.pop();
            }
        }
        return result + sign * number;
    }
}`
    }
  },
  "basic-calculator-ii": {
    statement: "Evaluate a valid expression containing nonnegative integers, spaces, '+', '-', '*', and '/'. Multiplication and division have higher precedence, and integer division truncates toward zero.",
    examples: [
      { input: "s = '3+2*2'", output: "7", explanation: "Multiplication is evaluated before addition." },
      { input: "s = ' 3/2 '", output: "1", explanation: "Integer division truncates toward zero." },
      { input: "s = ' 3+5 / 2 '", output: "5", explanation: "5 / 2 becomes 2, then 3 + 2 is 5." }
    ],
    constraints: ["1 <= s.length <= 300,000.", "s contains digits, operators, and spaces.", "The expression is valid and every intermediate value fits a signed 32-bit integer."],
    brute: {
      explanation: "Parse numbers and operators into lists. Repeatedly find and collapse multiplication or division first, then repeatedly collapse addition or subtraction.",
      drawback: "Removing list elements shifts the remaining expression after every operation, creating quadratic work.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public int calculate(String s) {
        java.util.List<Integer> numbers = new java.util.ArrayList<>();
        java.util.List<Character> operators = new java.util.ArrayList<>();
        int number = 0;
        boolean reading = false;
        for (int i = 0; i <= s.length(); i++) {
            char ch = i == s.length() ? '+' : s.charAt(i);
            if (Character.isDigit(ch)) {
                number = number * 10 + ch - '0';
                reading = true;
            } else if (ch != ' ') {
                if (reading) numbers.add(number);
                number = 0;
                reading = false;
                if (i < s.length()) operators.add(ch);
            }
        }
        for (int i = 0; i < operators.size();) {
            char op = operators.get(i);
            if (op == '*' || op == '/') {
                int value = op == '*' ? numbers.get(i) * numbers.get(i + 1) : numbers.get(i) / numbers.get(i + 1);
                numbers.set(i, value);
                numbers.remove(i + 1);
                operators.remove(i);
            } else i++;
        }
        int result = numbers.get(0);
        for (int i = 0; i < operators.size(); i++) result = operators.get(i) == '+' ? result + numbers.get(i + 1) : result - numbers.get(i + 1);
        return result;
    }
}`
    },
    optimized: {
      explanation: "Scan one number at a time and apply the preceding operator. Addition and subtraction push signed terms; multiplication and division immediately replace the previous stack term. Summing the stack after the scan respects precedence.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Build the current number across consecutive digits.", "At an operator or the end, apply the previous operator to that number and the stack.", "Sum the signed terms left in the stack."],
      code: code`class Solution {
    public int calculate(String s) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        int number = 0;
        char operator = '+';
        for (int i = 0; i <= s.length(); i++) {
            char ch = i == s.length() ? '+' : s.charAt(i);
            if (Character.isDigit(ch)) number = number * 10 + ch - '0';
            if ((!Character.isDigit(ch) && ch != ' ') || i == s.length()) {
                if (operator == '+') stack.push(number);
                else if (operator == '-') stack.push(-number);
                else if (operator == '*') stack.push(stack.pop() * number);
                else stack.push(stack.pop() / number);
                operator = ch;
                number = 0;
            }
        }
        int result = 0;
        while (!stack.isEmpty()) result += stack.pop();
        return result;
    }
}`
    }
  },
  "remove-k-digits": {
    statement: "Given a nonnegative decimal string num and integer k, remove exactly k digits so the remaining digits form the smallest possible integer. Return the result without leading zeros, or '0' if no digit remains.",
    examples: [
      { input: "num = '1432219', k = 3", output: "'1219'", explanation: "Removing 4, 3, and one 2 produces the smallest remaining sequence." },
      { input: "num = '10200', k = 1", output: "'200'", explanation: "Removing 1 leaves 0200, which is written without leading zeros." },
      { input: "num = '10', k = 2", output: "'0'", explanation: "All digits are removed." }
    ],
    constraints: ["1 <= k <= num.length <= 100,000.", "num contains only decimal digits.", "num has no leading zero unless it is exactly '0'."],
    brute: {
      explanation: "Generate every subsequence of length num.length - k, normalize leading zeros, and retain the numerically smallest candidate by length and lexicographic order.",
      drawback: "There are combinatorially many digit subsets, making enumeration unusable beyond tiny strings.",
      complexity: "O(C(n, k) · n) time · O(n) recursion space",
      code: code`class Solution {
    private String best;

    public String removeKdigits(String num, int k) {
        choose(num, 0, num.length() - k, new StringBuilder());
        return best == null || best.isEmpty() ? "0" : best;
    }

    private void choose(String num, int index, int needed, StringBuilder path) {
        if (needed == 0) {
            String candidate = normalize(path.toString());
            if (best == null || candidate.length() < best.length() || candidate.length() == best.length() && candidate.compareTo(best) < 0) best = candidate;
            return;
        }
        if (num.length() - index < needed) return;
        path.append(num.charAt(index));
        choose(num, index + 1, needed - 1, path);
        path.deleteCharAt(path.length() - 1);
        choose(num, index + 1, needed, path);
    }

    private String normalize(String value) {
        int index = 0;
        while (index < value.length() && value.charAt(index) == '0') index++;
        return index == value.length() ? "0" : value.substring(index);
    }
}`
    },
    optimized: {
      explanation: "A larger digit followed by a smaller digit should be removed as early as possible because the leftmost differing digit dominates the number. Maintain increasing digits in a stack and pop larger trailing digits while removals remain. Remove any leftover digits from the end.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["For each digit, remove larger trailing stack digits while k remains.", "Append the current digit, then remove trailing digits if k is still positive.", "Strip leading zeros and return zero when the result is empty."],
      code: code`class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder stack = new StringBuilder();
        for (char digit : num.toCharArray()) {
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }
            stack.append(digit);
        }
        while (k-- > 0) stack.deleteCharAt(stack.length() - 1);
        int first = 0;
        while (first < stack.length() && stack.charAt(first) == '0') first++;
        return first == stack.length() ? "0" : stack.substring(first);
    }
}`
    }
  },
  "decode-string": {
    statement: "Decode a string whose repetition rule is k[encoded], meaning the bracketed text is repeated k times. Rules may be nested, and the input contains no digits except repetition counts.",
    examples: [
      { input: "s = '3[a]2[bc]'", output: "'aaabcbc'", explanation: "a repeats three times and bc repeats twice." },
      { input: "s = '3[a2[c]]'", output: "'accaccacc'", explanation: "The inner 2[c] becomes cc before the outer repetition." },
      { input: "s = '2[abc]3[cd]ef'", output: "'abcabccdcdcdef'", explanation: "Literal text remains in its original position." }
    ],
    constraints: ["1 <= s.length <= 30.", "Counts are positive integers from 1 through 300.", "The input is valid and the decoded result length does not exceed 100,000."],
    brute: {
      explanation: "Repeatedly locate the first closing bracket and its nearest opening bracket, parse the count immediately before it, replace that innermost encoded section with its expanded text, and continue.",
      drawback: "Every replacement rebuilds large strings, so nested or long outputs can be copied repeatedly.",
      complexity: "O(n² + output²) worst-case time · O(output) space",
      code: code`class Solution {
    public String decodeString(String s) {
        while (s.indexOf(']') >= 0) {
            int close = s.indexOf(']');
            int open = s.lastIndexOf('[', close);
            int start = open - 1;
            while (start >= 0 && Character.isDigit(s.charAt(start))) start--;
            int count = Integer.parseInt(s.substring(start + 1, open));
            String part = s.substring(open + 1, close);
            String expanded = part.repeat(count);
            s = s.substring(0, start + 1) + expanded + s.substring(close + 1);
        }
        return s;
    }
}`
    },
    optimized: {
      explanation: "Keep a stack of earlier text builders and a stack of repetition counts. On '[', save the current prefix and count, then start an inner builder. On ']', repeat the completed inner text into its saved prefix.",
      complexity: "O(n + output length) time · O(n + output length) space",
      steps: ["Accumulate multi-digit repeat counts and literal characters.", "On '[', save the outer builder and count, then reset both current states.", "On ']', restore the outer builder and append the inner builder the saved number of times."],
      code: code`class Solution {
    public String decodeString(String s) {
        java.util.Deque<Integer> counts = new java.util.ArrayDeque<>();
        java.util.Deque<StringBuilder> prefixes = new java.util.ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int number = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) number = number * 10 + ch - '0';
            else if (ch == '[') {
                counts.push(number);
                prefixes.push(current);
                number = 0;
                current = new StringBuilder();
            } else if (ch == ']') {
                int repeat = counts.pop();
                StringBuilder outer = prefixes.pop();
                while (repeat-- > 0) outer.append(current);
                current = outer;
            } else current.append(ch);
        }
        return current.toString();
    }
}`
    }
  },
  "online-stock-span": {
    statement: "Design StockSpanner. For each next(price) call, return the number of consecutive days ending today whose prices are less than or equal to today's price.",
    examples: [
      { input: "next calls = [100,80,60,70,60,75,85]", output: "[1,1,1,2,1,4,6]", explanation: "For price 75, the consecutive suffix 60,70,60,75 has four values no greater than 75." },
      { input: "next calls = [31,41,48,59,79]", output: "[1,2,3,4,5]", explanation: "Each price exceeds every earlier consecutive price." }
    ],
    constraints: ["1 <= price <= 100,000.", "At most 10,000 next calls are made."],
    brute: {
      explanation: "Store every price. On each call, scan backward from today while prices are no greater than today's value and count that suffix.",
      drawback: "An increasing sequence rescans the full history on every call, leading to quadratic total time.",
      complexity: "O(n) per call, O(n²) total · O(n) space",
      code: code`class StockSpanner {
    private final java.util.List<Integer> prices = new java.util.ArrayList<>();

    public StockSpanner() {
    }

    public int next(int price) {
        prices.add(price);
        int span = 0;
        for (int i = prices.size() - 1; i >= 0 && prices.get(i) <= price; i--) span++;
        return span;
    }
}`
    },
    optimized: {
      explanation: "Keep decreasing price blocks as pairs of price and their already-compressed span. Pop every block with price no greater than today's and add its span; push today's combined block. Each historical price is pushed and popped once.",
      complexity: "O(1) amortized per call, O(n) total · O(n) space",
      steps: ["Start today's span at one.", "Pop dominated prices and add their compressed spans.", "Push today's price with the combined span and return it."],
      code: code`class StockSpanner {
    private final java.util.Deque<int[]> stack = new java.util.ArrayDeque<>();

    public StockSpanner() {
    }

    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) span += stack.pop()[1];
        stack.push(new int[]{price, span});
        return span;
    }
}`
    }
  },
  "implement-queue-using-stacks": {
    statement: "Implement a first-in-first-out queue using only standard stack operations. Support push, pop, peek, and empty with the same observable behavior as a queue.",
    examples: [
      { input: "push(1), push(2), peek(), pop(), empty()", output: "[null,null,1,1,false]", explanation: "The first inserted value is both peeked and removed first." },
      { input: "push(7), pop(), empty()", output: "[null,7,true]", explanation: "Removing the only value leaves the queue empty." }
    ],
    constraints: ["1 <= x <= 9.", "At most 100 operations are made.", "pop and peek are called only when the queue is nonempty."],
    brute: {
      explanation: "Keep one main stack. To pop or peek the oldest value, move every value to a temporary stack, access the bottom value, and then move the remaining values back.",
      drawback: "Every pop and peek moves nearly the entire queue twice, so repeated front operations cost O(n) each.",
      complexity: "push O(1), pop/peek O(n), empty O(1) · O(n) space",
      code: code`class MyQueue {
    private final java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();

    public MyQueue() {
    }

    public void push(int x) {
        stack.push(x);
    }

    public int pop() {
        java.util.Deque<Integer> temp = new java.util.ArrayDeque<>();
        while (stack.size() > 1) temp.push(stack.pop());
        int value = stack.pop();
        while (!temp.isEmpty()) stack.push(temp.pop());
        return value;
    }

    public int peek() {
        java.util.Deque<Integer> temp = new java.util.ArrayDeque<>();
        while (stack.size() > 1) temp.push(stack.pop());
        int value = stack.peek();
        while (!temp.isEmpty()) stack.push(temp.pop());
        return value;
    }

    public boolean empty() {
        return stack.isEmpty();
    }
}`
    },
    optimized: {
      explanation: "Use an input stack for new values and an output stack for the queue front. Transfer all input values to output only when output is empty. The reversal places the oldest value on top, and each value transfers at most once.",
      complexity: "O(1) amortized per operation · O(n) space",
      steps: ["Push new values onto input.", "Before pop or peek, transfer input to output only if output is empty.", "Read or remove output's top; the queue is empty only when both stacks are empty."],
      code: code`class MyQueue {
    private final java.util.Deque<Integer> input = new java.util.ArrayDeque<>();
    private final java.util.Deque<Integer> output = new java.util.ArrayDeque<>();

    public MyQueue() {
    }

    public void push(int x) {
        input.push(x);
    }

    public int pop() {
        move();
        return output.pop();
    }

    public int peek() {
        move();
        return output.peek();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }

    private void move() {
        if (output.isEmpty()) while (!input.isEmpty()) output.push(input.pop());
    }
}`
    }
  },
  "design-circular-queue": {
    statement: "Design a fixed-capacity circular queue supporting enQueue, deQueue, Front, Rear, isEmpty, and isFull. Failed insertions or removals return false, and Front or Rear returns -1 for an empty queue.",
    examples: [
      { input: "k = 3; enQueue(1), enQueue(2), enQueue(3), enQueue(4), Rear(), isFull(), deQueue(), enQueue(4), Rear()", output: "[true,true,true,false,3,true,true,true,4]", explanation: "The fourth initial insertion fails; after removing the front, the freed slot is reused." },
      { input: "k = 1; enQueue(8), Front(), Rear(), deQueue(), isEmpty()", output: "[true,8,8,true,true]", explanation: "For one element, front and rear are the same slot." }
    ],
    constraints: ["1 <= k <= 1,000.", "0 <= value <= 1,000.", "At most 3,000 operations are made."],
    brute: {
      explanation: "Use an ArrayList in logical queue order. Append for enQueue and remove index zero for deQueue; front and rear read the list ends.",
      drawback: "Removing index zero shifts all remaining elements, so deQueue takes O(k).",
      complexity: "deQueue O(k), other operations O(1) amortized · O(k) space",
      code: code`class MyCircularQueue {
    private final int capacity;
    private final java.util.List<Integer> values = new java.util.ArrayList<>();

    public MyCircularQueue(int k) {
        capacity = k;
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;
        values.add(value);
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) return false;
        values.remove(0);
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : values.get(0);
    }

    public int Rear() {
        return isEmpty() ? -1 : values.get(values.size() - 1);
    }

    public boolean isEmpty() {
        return values.isEmpty();
    }

    public boolean isFull() {
        return values.size() == capacity;
    }
}`
    },
    optimized: {
      explanation: "Store values in a fixed array with the index of the logical front and a size. The rear insertion index is (front + size) modulo capacity, and removing the front advances it modulo capacity. No elements move.",
      complexity: "O(1) per operation · O(k) space",
      steps: ["Track front, size, and the fixed capacity.", "Insert at the wrapped index front + size and increment size.", "Remove by advancing front and decrementing size; derive rear from front and size."],
      code: code`class MyCircularQueue {
    private final int[] values;
    private int front;
    private int size;

    public MyCircularQueue(int k) {
        values = new int[k];
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;
        values[(front + size) % values.length] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % values.length;
        size--;
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : values[front];
    }

    public int Rear() {
        return isEmpty() ? -1 : values[(front + size - 1) % values.length];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == values.length;
    }
}`
    }
  },
  "design-circular-deque": {
    statement: "Design a fixed-capacity circular double-ended queue supporting insertion and deletion at both ends, reading both ends, and checking empty or full state.",
    examples: [
      { input: "k = 3; insertLast(1), insertLast(2), insertFront(3), insertFront(4), getRear(), isFull(), deleteLast(), insertFront(4), getFront()", output: "[true,true,true,false,2,true,true,true,4]", explanation: "The fourth insertion fails while full; deletion frees one reusable circular slot." },
      { input: "k = 1; insertFront(9), getFront(), getRear(), deleteFront(), isEmpty()", output: "[true,9,9,true,true]", explanation: "A single stored item is visible from both ends." }
    ],
    constraints: ["1 <= k <= 1,000.", "0 <= value <= 1,000.", "At most 2,000 operations are made."],
    brute: {
      explanation: "Keep logical deque order in an ArrayList. Insert or delete at index zero for front operations and use the list end for rear operations.",
      drawback: "Front insertion and deletion shift every existing item, costing O(k).",
      complexity: "front updates O(k), rear updates and reads O(1) amortized · O(k) space",
      code: code`class MyCircularDeque {
    private final int capacity;
    private final java.util.List<Integer> values = new java.util.ArrayList<>();

    public MyCircularDeque(int k) {
        capacity = k;
    }

    public boolean insertFront(int value) {
        if (isFull()) return false;
        values.add(0, value);
        return true;
    }

    public boolean insertLast(int value) {
        if (isFull()) return false;
        values.add(value);
        return true;
    }

    public boolean deleteFront() {
        if (isEmpty()) return false;
        values.remove(0);
        return true;
    }

    public boolean deleteLast() {
        if (isEmpty()) return false;
        values.remove(values.size() - 1);
        return true;
    }

    public int getFront() {
        return isEmpty() ? -1 : values.get(0);
    }

    public int getRear() {
        return isEmpty() ? -1 : values.get(values.size() - 1);
    }

    public boolean isEmpty() {
        return values.isEmpty();
    }

    public boolean isFull() {
        return values.size() == capacity;
    }
}`
    },
    optimized: {
      explanation: "Use a fixed array, a front index, and size. Front insertion decrements front with wraparound; rear insertion writes at front + size. Deletions adjust front or only size, so every operation touches constant state.",
      complexity: "O(1) per operation · O(k) space",
      steps: ["Represent the occupied segment by front and size.", "Wrap front changes with modulo arithmetic.", "Derive the rear index from front + size - 1 and update size after each mutation."],
      code: code`class MyCircularDeque {
    private final int[] values;
    private int front;
    private int size;

    public MyCircularDeque(int k) {
        values = new int[k];
    }

    public boolean insertFront(int value) {
        if (isFull()) return false;
        front = (front - 1 + values.length) % values.length;
        values[front] = value;
        size++;
        return true;
    }

    public boolean insertLast(int value) {
        if (isFull()) return false;
        values[(front + size) % values.length] = value;
        size++;
        return true;
    }

    public boolean deleteFront() {
        if (isEmpty()) return false;
        front = (front + 1) % values.length;
        size--;
        return true;
    }

    public boolean deleteLast() {
        if (isEmpty()) return false;
        size--;
        return true;
    }

    public int getFront() {
        return isEmpty() ? -1 : values[front];
    }

    public int getRear() {
        return isEmpty() ? -1 : values[(front + size - 1) % values.length];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == values.length;
    }
}`
    }
  },
  "implement-stack-using-queues": {
    statement: "Implement a last-in-first-out stack using only standard queue operations. Support push, pop, top, and empty with stack behavior.",
    examples: [
      { input: "push(1), push(2), top(), pop(), empty()", output: "[null,null,2,2,false]", explanation: "The most recently pushed value is read and removed first." },
      { input: "push(5), pop(), empty()", output: "[null,5,true]", explanation: "Removing the only item empties the stack." }
    ],
    constraints: ["1 <= x <= 9.", "At most 100 operations are made.", "pop and top are called only when the stack is nonempty."],
    brute: {
      explanation: "Enqueue values normally. For pop, move the first n - 1 values into a temporary queue, remove the final value, and swap queue roles. top performs the same rotation but puts the final value back.",
      drawback: "Both pop and top move almost every element, so repeated reads of the stack top are linear.",
      complexity: "push O(1), pop/top O(n), empty O(1) · O(n) space",
      code: code`class MyStack {
    private java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();

    public MyStack() {
    }

    public void push(int x) {
        queue.offer(x);
    }

    public int pop() {
        for (int i = 1; i < queue.size(); i++) queue.offer(queue.poll());
        return queue.poll();
    }

    public int top() {
        for (int i = 1; i < queue.size(); i++) queue.offer(queue.poll());
        int value = queue.poll();
        queue.offer(value);
        return value;
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}`
    },
    optimized: {
      explanation: "After each push, rotate every older queue value behind the new value. The queue front is then always the stack top, making pop and top constant time.",
      complexity: "push O(n), pop/top/empty O(1) · O(n) space",
      steps: ["Enqueue the new value.", "Rotate the previous queue size by polling and offering each older value.", "Use the queue front directly for top and pop."],
      code: code`class MyStack {
    private final java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();

    public MyStack() {
    }

    public void push(int x) {
        int older = queue.size();
        queue.offer(x);
        while (older-- > 0) queue.offer(queue.poll());
    }

    public int pop() {
        return queue.poll();
    }

    public int top() {
        return queue.peek();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}`
    }
  },
  "moving-average-from-data-stream": {
    statement: "Given a positive window size, design MovingAverage so each next(value) returns the arithmetic mean of the most recent size values, or all values seen so far when fewer have arrived.",
    examples: [
      { input: "size = 3; next(1), next(10), next(3), next(5)", output: "[1.0,5.5,4.66667,6.0]", explanation: "The final average uses the latest window [10,3,5]." },
      { input: "size = 1; next(-2), next(8)", output: "[-2.0,8.0]", explanation: "A size-one window always contains only the newest value." }
    ],
    constraints: ["1 <= size <= 1,000.", "-100,000 <= value <= 100,000.", "At most 10,000 next calls are made."],
    brute: {
      explanation: "Store every value. On each call, sum the last min(size, count) entries and divide by that count.",
      drawback: "The same values are summed again for consecutive overlapping windows, costing O(size) per call.",
      complexity: "O(size) per next · O(n) space",
      code: code`class MovingAverage {
    private final int size;
    private final java.util.List<Integer> values = new java.util.ArrayList<>();

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        values.add(val);
        long sum = 0;
        int start = Math.max(0, values.size() - size);
        for (int i = start; i < values.size(); i++) sum += values.get(i);
        return (double) sum / (values.size() - start);
    }
}`
    },
    optimized: {
      explanation: "Keep exactly the active window in a queue and maintain its running sum. Add the new value, subtract the oldest if capacity is exceeded, and divide the sum by the queue size.",
      complexity: "O(1) per next · O(size) space",
      steps: ["Enqueue the new value and add it to sum.", "If the queue is too large, dequeue and subtract its oldest value.", "Return sum divided by the current queue size."],
      code: code`class MovingAverage {
    private final int size;
    private final java.util.Queue<Integer> window = new java.util.ArrayDeque<>();
    private long sum;

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        window.offer(val);
        sum += val;
        if (window.size() > size) sum -= window.poll();
        return (double) sum / window.size();
    }
}`
    }
  },
  "number-of-recent-calls": {
    statement: "Design RecentCounter. Each ping(t) records a request at strictly increasing millisecond t and returns how many recorded requests lie in the inclusive interval [t - 3000, t].",
    examples: [
      { input: "ping(1), ping(100), ping(3001), ping(3002)", output: "[1,2,3,3]", explanation: "At 3002, timestamp 1 is outside the window while 100, 3001, and 3002 remain." },
      { input: "ping(3000), ping(6000), ping(6001)", output: "[1,2,2]", explanation: "At 6001, timestamp 3000 is too old but the latest two requests remain." }
    ],
    constraints: ["1 <= t <= 1,000,000,000.", "Every t is strictly greater than the previous one.", "At most 10,000 ping calls are made."],
    brute: {
      explanation: "Store every timestamp. For each ping, scan the full history and count timestamps at least t - 3000.",
      drawback: "Expired requests remain stored and are reconsidered on every later call, producing quadratic total work.",
      complexity: "O(n) per ping · O(n) space",
      code: code`class RecentCounter {
    private final java.util.List<Integer> times = new java.util.ArrayList<>();

    public RecentCounter() {
    }

    public int ping(int t) {
        times.add(t);
        int count = 0;
        for (int time : times) if (time >= t - 3000) count++;
        return count;
    }
}`
    },
    optimized: {
      explanation: "Because timestamps arrive in increasing order, expired requests form a prefix. Enqueue t and remove front timestamps below t - 3000. The queue size is exactly the number of recent calls.",
      complexity: "O(1) amortized per ping · O(w) space for calls in one window",
      steps: ["Enqueue the new increasing timestamp.", "Remove timestamps strictly smaller than t - 3000 from the front.", "Return the number of timestamps left."],
      code: code`class RecentCounter {
    private final java.util.Queue<Integer> times = new java.util.ArrayDeque<>();

    public RecentCounter() {
    }

    public int ping(int t) {
        times.offer(t);
        while (times.peek() < t - 3000) times.poll();
        return times.size();
    }
}`
    }
  },
  "first-unique-number": {
    statement: "Design FirstUnique from an initial integer array. showFirstUnique returns the earliest value whose total frequency is one, or -1 when none exists. add(value) appends a value to the stream.",
    examples: [
      { input: "initial = [2,3,5]; show(), add(5), show(), add(2), show(), add(3), show()", output: "[2,2,3,-1]", explanation: "Values stop being unique as their second copies arrive." },
      { input: "initial = [7,7,7,7,7,7]; show(), add(7), add(3), add(3), add(7), add(17), show()", output: "[-1,17]", explanation: "17 is the first value whose count remains one." }
    ],
    constraints: ["1 <= initial length <= 100,000.", "1 <= value <= 100,000,000.", "At most 50,000 method calls are made."],
    brute: {
      explanation: "Maintain the complete arrival list and a frequency map. add updates both. showFirstUnique scans from the beginning until it finds a value with frequency one.",
      drawback: "When no early value is unique, every show call rescans a long prefix.",
      complexity: "add O(1) average, show O(n) · O(n) space",
      code: code`class FirstUnique {
    private final java.util.List<Integer> order = new java.util.ArrayList<>();
    private final java.util.Map<Integer, Integer> count = new java.util.HashMap<>();

    public FirstUnique(int[] nums) {
        for (int value : nums) add(value);
    }

    public int showFirstUnique() {
        for (int value : order) if (count.get(value) == 1) return value;
        return -1;
    }

    public void add(int value) {
        order.add(value);
        count.merge(value, 1, Integer::sum);
    }
}`
    },
    optimized: {
      explanation: "Keep all first arrivals in a queue and maintain frequencies. Before returning, remove queue-front values whose frequency is greater than one. Such values can never become unique again, so each leaves the queue once.",
      complexity: "O(1) amortized per operation · O(n) space",
      steps: ["Increment the frequency and enqueue a value only on its first arrival.", "Before show, discard nonunique values from the queue front.", "Return the front or -1 when the queue is empty."],
      code: code`class FirstUnique {
    private final java.util.Queue<Integer> candidates = new java.util.ArrayDeque<>();
    private final java.util.Map<Integer, Integer> count = new java.util.HashMap<>();

    public FirstUnique(int[] nums) {
        for (int value : nums) add(value);
    }

    public int showFirstUnique() {
        while (!candidates.isEmpty() && count.get(candidates.peek()) > 1) candidates.poll();
        return candidates.isEmpty() ? -1 : candidates.peek();
    }

    public void add(int value) {
        int frequency = count.getOrDefault(value, 0) + 1;
        count.put(value, frequency);
        if (frequency == 1) candidates.offer(value);
    }
}`
    }
  },
  "design-hit-counter": {
    statement: "Design a hit counter. hit(timestamp) records a hit, and getHits(timestamp) returns hits received in the previous 300 seconds, meaning timestamps in (timestamp - 300, timestamp]. Calls arrive in nondecreasing timestamp order.",
    examples: [
      { input: "hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)", output: "[3,4,3]", explanation: "At 301, the hit at timestamp 1 is exactly 300 seconds old and is excluded." },
      { input: "hit(1), hit(1), getHits(1)", output: "3", explanation: "Multiple hits at one timestamp are counted independently." }
    ],
    constraints: ["1 <= timestamp <= 2,000,000,000.", "Timestamps are supplied in nondecreasing order.", "At most 300 calls are made in the standard problem setting."],
    brute: {
      explanation: "Store one timestamp per hit. For getHits, scan all stored hits and count those greater than timestamp - 300.",
      drawback: "Expired hits are kept forever and rescanned in every query.",
      complexity: "hit O(1), getHits O(n) · O(n) space",
      code: code`class HitCounter {
    private final java.util.List<Integer> hits = new java.util.ArrayList<>();

    public HitCounter() {
    }

    public void hit(int timestamp) {
        hits.add(timestamp);
    }

    public int getHits(int timestamp) {
        int count = 0;
        for (int hit : hits) if (hit > timestamp - 300) count++;
        return count;
    }
}`
    },
    optimized: {
      explanation: "Use 300 circular second-buckets. A bucket stores its timestamp and hit count. On hit, reset a reused bucket if its timestamp differs. On query, sum only buckets whose timestamp is less than 300 seconds old.",
      complexity: "hit O(1), getHits O(300) = O(1) · O(300) = O(1) space",
      steps: ["Map timestamp to index timestamp modulo 300.", "Reset a stale bucket before incrementing its count.", "Sum buckets whose stored timestamp lies inside the requested window."],
      code: code`class HitCounter {
    private final int[] times = new int[300];
    private final int[] counts = new int[300];

    public HitCounter() {
    }

    public void hit(int timestamp) {
        int index = timestamp % 300;
        if (times[index] != timestamp) {
            times[index] = timestamp;
            counts[index] = 0;
        }
        counts[index]++;
    }

    public int getHits(int timestamp) {
        int total = 0;
        for (int i = 0; i < 300; i++) {
            if (timestamp - times[i] < 300) total += counts[i];
        }
        return total;
    }
}`
    }
  },
  "time-needed-to-buy-tickets": {
    statement: "People stand in a queue, where tickets[i] is how many tickets person i wants. Each second the front person buys one ticket and, if still needing more, rejoins the rear. Return the seconds until person k finishes.",
    examples: [
      { input: "tickets = [2,3,2], k = 2", output: "6", explanation: "After two full turns, person 2 buys their second ticket at second 6." },
      { input: "tickets = [5,1,1,1], k = 0", output: "8", explanation: "The three other people leave after one turn; person 0 then buys four more tickets." },
      { input: "tickets = [1], k = 0", output: "1", explanation: "The only person finishes in one second." }
    ],
    constraints: ["1 <= tickets.length <= 100.", "1 <= tickets[i] <= 100.", "0 <= k < tickets.length."],
    brute: {
      explanation: "Simulate the queue with indices. Poll the front, decrement that person's need, and either return when k reaches zero or re-enqueue the person if tickets remain.",
      drawback: "The loop runs once per purchased ticket, so large ticket counts cause far more work than the number of people.",
      complexity: "O(sum(tickets)) time · O(n) extra space",
      code: code`class Solution {
    public int timeRequiredToBuy(int[] tickets, int k) {
        java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
        for (int i = 0; i < tickets.length; i++) queue.offer(i);
        int seconds = 0;
        while (true) {
            int person = queue.poll();
            tickets[person]--;
            seconds++;
            if (person == k && tickets[person] == 0) return seconds;
            if (tickets[person] > 0) queue.offer(person);
        }
    }
}`
    },
    optimized: {
      explanation: "Person k participates in exactly tickets[k] rounds. A person at or before k can buy at most tickets[k] times before k finishes; a person after k can buy at most tickets[k] - 1 times because the final round stops at k. Sum these contributions directly.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Let target be tickets[k].", "For indices through k, add min(tickets[i], target).", "For indices after k, add min(tickets[i], target - 1)."],
      code: code`class Solution {
    public int timeRequiredToBuy(int[] tickets, int k) {
        int seconds = 0;
        for (int i = 0; i < tickets.length; i++) {
            int limit = i <= k ? tickets[k] : tickets[k] - 1;
            seconds += Math.min(tickets[i], limit);
        }
        return seconds;
    }
}`
    }
  },
  "dota2-senate": {
    statement: "A senate string contains Radiant and Dire members in speaking order. On each turn, an active senator bans one active opponent's future rights. Turns repeat cyclically until only one party has active senators. Return 'Radiant' or 'Dire'.",
    examples: [
      { input: "senate = 'RD'", output: "'Radiant'", explanation: "R acts first and bans the only D senator." },
      { input: "senate = 'RDD'", output: "'Dire'", explanation: "R bans the first D, but the remaining D later bans R." },
      { input: "senate = 'RRDDD'", output: "'Radiant'", explanation: "Turn order and carried bans eventually leave only Radiant senators." }
    ],
    constraints: ["1 <= senate.length <= 10,000.", "Every character is 'R' or 'D'."],
    brute: {
      explanation: "Keep active senators in a mutable character list. Move cyclically; for the current senator, search forward with wraparound for the nearest opponent and remove that opponent. Continue until all remaining characters match.",
      drawback: "Finding and removing an opponent can scan and shift O(n) positions per ban, resulting in quadratic time.",
      complexity: "O(n²) time · O(n) extra space",
      code: code`class Solution {
    public String predictPartyVictory(String senate) {
        java.util.List<Character> active = new java.util.ArrayList<>();
        for (char party : senate.toCharArray()) active.add(party);
        int current = 0;
        while (true) {
            boolean mixed = false;
            for (char party : active) if (party != active.get(0)) mixed = true;
            if (!mixed) return active.get(0) == 'R' ? "Radiant" : "Dire";
            char party = active.get(current);
            int opponent = (current + 1) % active.size();
            while (active.get(opponent) == party) opponent = (opponent + 1) % active.size();
            active.remove(opponent);
            if (opponent < current) current--;
            current = (current + 1) % active.size();
        }
    }
}`
    },
    optimized: {
      explanation: "Store Radiant and Dire indices in separate queues. Remove the earliest index from each; the smaller index acts first, bans the other, and returns for the next cycle with index + n. The nonempty queue identifies the winner.",
      complexity: "O(n) time · O(n) extra space",
      steps: ["Enqueue each original index by party.", "Compare the two earliest active indices and remove both.", "Re-enqueue the earlier senator at index + n until one party's queue empties."],
      code: code`class Solution {
    public String predictPartyVictory(String senate) {
        java.util.Queue<Integer> radiant = new java.util.ArrayDeque<>();
        java.util.Queue<Integer> dire = new java.util.ArrayDeque<>();
        int n = senate.length();
        for (int i = 0; i < n; i++) {
            if (senate.charAt(i) == 'R') radiant.offer(i);
            else dire.offer(i);
        }
        while (!radiant.isEmpty() && !dire.isEmpty()) {
            int r = radiant.poll();
            int d = dire.poll();
            if (r < d) radiant.offer(r + n);
            else dire.offer(d + n);
        }
        return radiant.isEmpty() ? "Dire" : "Radiant";
    }
}`
    }
  },
  "factorial": {
    statement: "Given a nonnegative integer n, return n factorial, the product of every positive integer from 1 through n. By definition, 0 factorial is 1.",
    examples: [
      { input: "n = 5", output: "120", explanation: "5 × 4 × 3 × 2 × 1 equals 120." },
      { input: "n = 0", output: "1", explanation: "The empty product is defined as one." },
      { input: "n = 1", output: "1", explanation: "The product contains only 1." }
    ],
    constraints: ["0 <= n <= 20.", "The answer fits in a signed 64-bit integer."],
    brute: {
      explanation: "Use the recurrence factorial(n) = n × factorial(n - 1) with factorial(0) = 1. Each call waits for the smaller call before multiplying.",
      drawback: "The call stack retains one frame per integer, even though only a running product is needed.",
      complexity: "O(n) time · O(n) recursion space",
      code: code`class Solution {
    public long factorial(int n) {
        if (n <= 1) return 1L;
        return n * factorial(n - 1);
    }
}`
    },
    optimized: {
      explanation: "Maintain the product directly while iterating from 2 through n. This evaluates the same recurrence without retaining pending recursive multiplications.",
      complexity: "O(n) time · O(1) extra space",
      steps: ["Initialize the product to one, which covers n equal to zero or one.", "Multiply by every integer from two through n.", "Return the accumulated long value."],
      code: code`class Solution {
    public long factorial(int n) {
        long result = 1L;
        for (int value = 2; value <= n; value++) result *= value;
        return result;
    }
}`
    }
  },
  "fibonacci-number": {
    statement: "Given n, return the nth Fibonacci number, where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2) for n at least 2.",
    examples: [
      { input: "n = 2", output: "1", explanation: "F(2) is F(1) + F(0), or 1 + 0." },
      { input: "n = 4", output: "3", explanation: "The sequence begins 0, 1, 1, 2, 3." },
      { input: "n = 0", output: "0", explanation: "This is the first base case." }
    ],
    constraints: ["0 <= n <= 30."],
    brute: {
      explanation: "Translate the definition directly: return n for the two base cases, otherwise recursively calculate both previous Fibonacci numbers and add them.",
      drawback: "The recursion tree recomputes the same F(k) through many branches; for example F(n - 2) appears inside both major subtrees.",
      complexity: "O(2^n) time · O(n) recursion space",
      code: code`class Solution {
    public int fib(int n) {
        if (n < 2) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`
    },
    optimized: {
      explanation: "Keep the recursive recurrence but memoize each n. The first call computes and stores F(n); every repeated call returns the stored value, collapsing the recursion tree to one state per index.",
      complexity: "O(n) time · O(n) memo and recursion space",
      steps: ["Allocate a memo array and mark unknown states.", "Return n at the base cases or a saved result when available.", "Compute the two smaller states once, save their sum, and return it."],
      code: code`class Solution {
    public int fib(int n) {
        int[] memo = new int[n + 1];
        java.util.Arrays.fill(memo, -1);
        return solve(n, memo);
    }

    private int solve(int n, int[] memo) {
        if (n < 2) return n;
        if (memo[n] != -1) return memo[n];
        memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
        return memo[n];
    }
}`
    }
  },
  "recursive-binary-search": {
    statement: "Given an ascending array of distinct integers and a target, return the target's index using recursion, or -1 if the target is absent.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "The value 9 is stored at index 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "Repeated interval halving produces an empty range." },
      { input: "nums = [5], target = 5", output: "0", explanation: "The first midpoint is the answer." }
    ],
    constraints: ["1 <= nums.length <= 10,000.", "-10,000 < nums[i], target < 10,000.", "nums is strictly increasing."],
    brute: {
      explanation: "Recursively inspect one index at a time. If the current value is not the target, call the function for the next index.",
      drawback: "It ignores sorted order, may recurse once per element, and risks deep-stack failure for large arrays.",
      complexity: "O(n) time · O(n) recursion space",
      code: code`class Solution {
    public int search(int[] nums, int target) {
        return linear(nums, target, 0);
    }

    private int linear(int[] nums, int target, int index) {
        if (index == nums.length) return -1;
        if (nums[index] == target) return index;
        return linear(nums, target, index + 1);
    }
}`
    },
    optimized: {
      explanation: "A recursive call represents an inclusive sorted interval. Compare its midpoint with target and recurse only into the half that can still contain the target. An interval with left greater than right is absent.",
      complexity: "O(log n) time · O(log n) recursion space",
      steps: ["Call the helper with the full inclusive interval.", "Return the midpoint when equal; otherwise choose the only possible sorted half.", "Return -1 when the interval becomes empty."],
      code: code`class Solution {
    public int search(int[] nums, int target) {
        return binary(nums, target, 0, nums.length - 1);
    }

    private int binary(int[] nums, int target, int left, int right) {
        if (left > right) return -1;
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (target < nums[mid]) return binary(nums, target, left, mid - 1);
        return binary(nums, target, mid + 1, right);
    }
}`
    }
  },
  "merge-sort": {
    statement: "Given an integer array, return its values sorted in nondecreasing order. This lesson focuses on implementing merge sort through recursive divide and conquer.",
    examples: [
      { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "The array is divided, each half is sorted, and ordered halves are merged." },
      { input: "nums = [5,1,1,2,0,0]", output: "[0,0,1,1,2,5]", explanation: "Duplicate values remain in nondecreasing order." },
      { input: "nums = []", output: "[]", explanation: "An empty array needs no work." }
    ],
    constraints: ["0 <= nums.length <= 50,000.", "-50,000 <= nums[i] <= 50,000."],
    brute: {
      explanation: "Use insertion sort: recursively sort the prefix ending before index, then shift larger prefix values right and insert the current value.",
      drawback: "A reverse-sorted input shifts the full sorted prefix for every insertion, producing quadratic time.",
      complexity: "O(n²) time · O(n) recursion space",
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        insertion(nums, nums.length);
        return nums;
    }

    private void insertion(int[] nums, int length) {
        if (length <= 1) return;
        insertion(nums, length - 1);
        int value = nums[length - 1];
        int index = length - 2;
        while (index >= 0 && nums[index] > value) {
            nums[index + 1] = nums[index];
            index--;
        }
        nums[index + 1] = value;
    }
}`
    },
    optimized: {
      explanation: "Recursively sort the left and right halves. During merge, compare the smallest not-yet-used value from each half and copy the smaller one. Each recursion level processes all n values, and there are logarithmically many levels.",
      complexity: "O(n log n) time · O(n) auxiliary array plus O(log n) recursion space",
      steps: ["Stop when a range has at most one element.", "Recursively sort both halves around the midpoint.", "Merge the ordered halves into a temporary array and copy it back."],
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        int[] temp = new int[nums.length];
        sort(nums, temp, 0, nums.length - 1);
        return nums;
    }

    private void sort(int[] nums, int[] temp, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        sort(nums, temp, left, mid);
        sort(nums, temp, mid + 1, right);
        int i = left;
        int j = mid + 1;
        int write = left;
        while (i <= mid && j <= right) temp[write++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
        while (i <= mid) temp[write++] = nums[i++];
        while (j <= right) temp[write++] = nums[j++];
        for (int k = left; k <= right; k++) nums[k] = temp[k];
    }
}`
    }
  },
  "quick-sort": {
    statement: "Given an integer array, sort it in nondecreasing order using the quick-sort divide-and-conquer idea: partition values around a pivot and recursively sort the resulting ranges.",
    examples: [
      { input: "nums = [10,7,8,9,1,5]", output: "[1,5,7,8,9,10]", explanation: "Partitioning repeatedly places smaller values before larger values." },
      { input: "nums = [3,3,2,1,3]", output: "[1,2,3,3,3]", explanation: "Equal pivot values are grouped together." },
      { input: "nums = [1]", output: "[1]", explanation: "A one-value range is already sorted." }
    ],
    constraints: ["0 <= nums.length <= 50,000.", "-50,000 <= nums[i] <= 50,000."],
    brute: {
      explanation: "Choose the final value as pivot, partition with Lomuto's method, then recurse on both sides. The algorithm is correct but a consistently smallest or largest pivot creates highly unbalanced ranges.",
      drawback: "Already sorted or reverse-sorted input can shrink by only one value per call, causing O(n²) comparisons and O(n) stack depth.",
      complexity: "O(n²) worst-case time · O(n) worst-case recursion space",
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        quicksort(nums, 0, nums.length - 1);
        return nums;
    }

    private void quicksort(int[] nums, int left, int right) {
        if (left >= right) return;
        int pivot = partition(nums, left, right);
        quicksort(nums, left, pivot - 1);
        quicksort(nums, pivot + 1, right);
    }

    private int partition(int[] nums, int left, int right) {
        int write = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= nums[right]) {
                int temp = nums[write];
                nums[write++] = nums[i];
                nums[i] = temp;
            }
        }
        int temp = nums[write];
        nums[write] = nums[right];
        nums[right] = temp;
        return write;
    }
}`
    },
    optimized: {
      explanation: "Choose the middle value as pivot and use three-way partitioning. Values smaller than pivot move left, greater values move right, and equal values stay in the middle. Recurse only outside the equal block, which handles duplicates efficiently.",
      complexity: "O(n log n) average time, O(n²) worst case · O(log n) average recursion space",
      steps: ["Select a pivot value and maintain less, scan, and greater boundaries.", "Move each scanned value into the smaller, equal, or greater region.", "Recursively sort only the smaller and greater regions."],
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        quicksort(nums, 0, nums.length - 1);
        return nums;
    }

    private void quicksort(int[] nums, int left, int right) {
        if (left >= right) return;
        int pivot = nums[left + (right - left) / 2];
        int less = left;
        int scan = left;
        int greater = right;
        while (scan <= greater) {
            if (nums[scan] < pivot) swap(nums, less++, scan++);
            else if (nums[scan] > pivot) swap(nums, scan, greater--);
            else scan++;
        }
        quicksort(nums, left, less - 1);
        quicksort(nums, greater + 1, right);
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`
    }
  },
  "sort-an-array": {
    statement: "Given an integer array, return it sorted in nondecreasing order without using a built-in sorting function. The solution should handle many duplicate and negative values efficiently.",
    examples: [
      { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "Every value is placed in ascending order." },
      { input: "nums = [5,1,1,2,0,0]", output: "[0,0,1,1,2,5]", explanation: "Both copies of zero and one are preserved." },
      { input: "nums = [-2,3,-5]", output: "[-5,-2,3]", explanation: "Negative values are ordered normally." }
    ],
    constraints: ["1 <= nums.length <= 50,000.", "-50,000 <= nums[i] <= 50,000."],
    brute: {
      explanation: "Selection sort repeatedly finds the minimum value in the unsorted suffix and swaps it into the next output position.",
      drawback: "Finding each next minimum scans the remaining suffix, so n output positions require quadratic comparisons.",
      complexity: "O(n²) time · O(1) extra space",
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int smallest = i;
            for (int j = i + 1; j < nums.length; j++) if (nums[j] < nums[smallest]) smallest = j;
            int temp = nums[i];
            nums[i] = nums[smallest];
            nums[smallest] = temp;
        }
        return nums;
    }
}`
    },
    optimized: {
      explanation: "Merge sort recursively reduces the array to one-value ranges and merges them in order. One shared temporary array avoids repeated allocation while guaranteeing O(n log n) time on every input order.",
      complexity: "O(n log n) time · O(n) extra space",
      steps: ["Divide each multi-value interval at its midpoint.", "Recursively sort both halves.", "Merge them into shared temporary storage and copy the sorted interval back."],
      code: code`class Solution {
    public int[] sortArray(int[] nums) {
        mergeSort(nums, new int[nums.length], 0, nums.length - 1);
        return nums;
    }

    private void mergeSort(int[] nums, int[] temp, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(nums, temp, left, mid);
        mergeSort(nums, temp, mid + 1, right);
        int i = left;
        int j = mid + 1;
        int write = left;
        while (i <= mid && j <= right) temp[write++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
        while (i <= mid) temp[write++] = nums[i++];
        while (j <= right) temp[write++] = nums[j++];
        for (int k = left; k <= right; k++) nums[k] = temp[k];
    }
}`
    }
  },
  "k-th-symbol-in-grammar": {
    statement: "Row 1 is '0'. Each later row replaces every 0 with 01 and every 1 with 10. Given row n and one-based position k, return the symbol at that position.",
    examples: [
      { input: "n = 1, k = 1", output: "0", explanation: "The first row contains only zero." },
      { input: "n = 2, k = 2", output: "1", explanation: "Row 2 is 01." },
      { input: "n = 4, k = 5", output: "1", explanation: "Row 4 is 01101001, whose fifth symbol is 1." }
    ],
    constraints: ["1 <= n <= 30.", "1 <= k <= 2^(n - 1)."],
    brute: {
      explanation: "Build each complete row string from the previous row by appending 01 for zero and 10 for one, then read index k - 1.",
      drawback: "Row length doubles each time, so both work and memory grow exponentially even though only one symbol is requested.",
      complexity: "O(2^n) time · O(2^n) space",
      code: code`class Solution {
    public int kthGrammar(int n, int k) {
        String row = "0";
        for (int level = 2; level <= n; level++) {
            StringBuilder next = new StringBuilder(row.length() * 2);
            for (char symbol : row.toCharArray()) next.append(symbol == '0' ? "01" : "10");
            row = next.toString();
        }
        return row.charAt(k - 1) - '0';
    }
}`
    },
    optimized: {
      explanation: "Position k has parent position (k + 1) / 2 in the previous row. An odd-position child equals its parent; an even-position child is inverted. Recurse to the first row and apply that relationship while returning.",
      complexity: "O(n) time · O(n) recursion space",
      steps: ["Return zero at row one.", "Recursively obtain the parent symbol at position (k + 1) / 2.", "Return the parent for odd k and its inverse for even k."],
      code: code`class Solution {
    public int kthGrammar(int n, int k) {
        if (n == 1) return 0;
        int parent = kthGrammar(n - 1, (k + 1) / 2);
        return (k & 1) == 1 ? parent : 1 - parent;
    }
}`
    }
  },
  "different-ways-to-add-parentheses": {
    statement: "Given an expression of integers joined by '+', '-', and '*', return every result obtainable by adding parentheses in all valid ways. Results may repeat when different parenthesizations produce the same value.",
    examples: [
      { input: "expression = '2-1-1'", output: "[0,2]", explanation: "(2-1)-1 is 0, while 2-(1-1) is 2." },
      { input: "expression = '2*3-4*5'", output: "[-34,-14,-10,-10,10]", explanation: "Five binary parenthesization trees produce these results." },
      { input: "expression = '11'", output: "[11]", explanation: "With no operator, the number itself is the only result." }
    ],
    constraints: ["1 <= expression.length <= 20.", "The expression contains digits and the operators +, -, *.", "Every integer is between 0 and 99 and every result fits a signed 32-bit integer."],
    brute: {
      explanation: "For every operator, recursively compute all results on its left and right, then combine every pair with that operator. Repeat this decomposition independently whenever the same substring appears.",
      drawback: "The same substring is solved many times in different parenthesization branches, adding substantial repeated work beyond the unavoidable output count.",
      complexity: "Exponential time plus output size · O(n) recursion depth",
      code: code`class Solution {
    public java.util.List<Integer> diffWaysToCompute(String expression) {
        java.util.List<Integer> results = new java.util.ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char operator = expression.charAt(i);
            if (operator != '+' && operator != '-' && operator != '*') continue;
            java.util.List<Integer> left = diffWaysToCompute(expression.substring(0, i));
            java.util.List<Integer> right = diffWaysToCompute(expression.substring(i + 1));
            for (int a : left) for (int b : right) results.add(apply(a, b, operator));
        }
        if (results.isEmpty()) results.add(Integer.parseInt(expression));
        return results;
    }

    private int apply(int a, int b, char operator) {
        if (operator == '+') return a + b;
        if (operator == '-') return a - b;
        return a * b;
    }
}`
    },
    optimized: {
      explanation: "Use the same operator-root recursion, but memoize each expression substring. Every distinct substring's result list is built once and reused anywhere that substring occurs again.",
      complexity: "Output-sensitive exponential time · O(number of substring results) memo space",
      steps: ["Return a cached result list when the substring was solved before.", "Split at every operator and combine all cached left and right results.", "Parse an operator-free substring as one number and cache the completed list."],
      code: code`class Solution {
    private final java.util.Map<String, java.util.List<Integer>> memo = new java.util.HashMap<>();

    public java.util.List<Integer> diffWaysToCompute(String expression) {
        if (memo.containsKey(expression)) return memo.get(expression);
        java.util.List<Integer> results = new java.util.ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char operator = expression.charAt(i);
            if (operator != '+' && operator != '-' && operator != '*') continue;
            for (int left : diffWaysToCompute(expression.substring(0, i))) {
                for (int right : diffWaysToCompute(expression.substring(i + 1))) {
                    if (operator == '+') results.add(left + right);
                    else if (operator == '-') results.add(left - right);
                    else results.add(left * right);
                }
            }
        }
        if (results.isEmpty()) results.add(Integer.parseInt(expression));
        memo.put(expression, results);
        return results;
    }
}`
    }
  },
  "tower-of-hanoi": {
    statement: "Move n differently sized disks from rod A to rod C using rod B. Move one top disk at a time and never place a larger disk on a smaller one. Return the ordered moves as strings such as 'A->C'.",
    examples: [
      { input: "n = 1", output: "['A->C']", explanation: "The single disk moves directly to the destination." },
      { input: "n = 2", output: "['A->B','A->C','B->C']", explanation: "Move the small disk away, move the large disk, then place the small disk on it." },
      { input: "n = 3", output: "7 moves", explanation: "The minimum move count is 2^3 - 1." }
    ],
    constraints: ["1 <= n <= 20.", "All disks begin on A ordered from largest at bottom to smallest at top."],
    brute: {
      explanation: "Breadth-first search all legal configurations. Each state records the rod holding every disk and its move path; the first state with all disks on C gives a shortest valid solution.",
      drawback: "The search stores exponentially many configurations and full paths, while the recursive structure determines the unique minimal strategy directly.",
      complexity: "O(3^n) state exploration · O(3^n · n) space",
      code: code`class Solution {
    private static class State {
        int[] rods;
        java.util.List<String> moves;
        State(int[] rods, java.util.List<String> moves) {
            this.rods = rods;
            this.moves = moves;
        }
    }

    public java.util.List<String> towerOfHanoi(int n) {
        java.util.Queue<State> queue = new java.util.ArrayDeque<>();
        java.util.Set<String> seen = new java.util.HashSet<>();
        int[] start = new int[n];
        queue.offer(new State(start, new java.util.ArrayList<>()));
        seen.add(java.util.Arrays.toString(start));
        while (!queue.isEmpty()) {
            State state = queue.poll();
            boolean done = true;
            for (int rod : state.rods) if (rod != 2) done = false;
            if (done) return state.moves;
            int[] top = {-1, -1, -1};
            for (int disk = 0; disk < n; disk++) if (top[state.rods[disk]] == -1) top[state.rods[disk]] = disk;
            for (int from = 0; from < 3; from++) {
                if (top[from] == -1) continue;
                for (int to = 0; to < 3; to++) {
                    if (from == to || top[to] != -1 && top[from] > top[to]) continue;
                    int[] next = state.rods.clone();
                    next[top[from]] = to;
                    String key = java.util.Arrays.toString(next);
                    if (!seen.add(key)) continue;
                    java.util.List<String> moves = new java.util.ArrayList<>(state.moves);
                    moves.add(String.valueOf((char) ('A' + from)) + "->" + (char) ('A' + to));
                    queue.offer(new State(next, moves));
                }
            }
        }
        return java.util.Collections.emptyList();
    }
}`
    },
    optimized: {
      explanation: "To move n disks from source to destination, first move the top n - 1 disks to the helper, move the largest disk to destination, then move those n - 1 disks from helper to destination. The base case moves one disk.",
      complexity: "O(2^n) time for 2^n - 1 required moves · O(n) recursion space",
      steps: ["Return after recording the direct move when n equals one.", "Recursively move n - 1 disks from source to helper.", "Move the largest disk, then recursively move n - 1 disks from helper to destination."],
      code: code`class Solution {
    public java.util.List<String> towerOfHanoi(int n) {
        java.util.List<String> moves = new java.util.ArrayList<>();
        move(n, 'A', 'B', 'C', moves);
        return moves;
    }

    private void move(int disks, char source, char helper, char destination, java.util.List<String> moves) {
        if (disks == 0) return;
        move(disks - 1, source, destination, helper, moves);
        moves.add(String.valueOf(source) + "->" + destination);
        move(disks - 1, helper, source, destination, moves);
    }
}`
    }
  },
  "josephus-problem": {
    statement: "n people numbered 1 through n stand in a circle. Starting at person 1, repeatedly count k active people and remove the kth, continuing after the removed person. Return the final survivor's number.",
    examples: [
      { input: "n = 5, k = 2", output: "3", explanation: "People leave in order 2,4,1,5, leaving person 3." },
      { input: "n = 6, k = 5", output: "1", explanation: "Circular counting and removal eventually leaves person 1." },
      { input: "n = 1, k = 7", output: "1", explanation: "The only person survives regardless of k." }
    ],
    constraints: ["1 <= n <= 500.", "1 <= k <= 1,000,000."],
    brute: {
      explanation: "Put people in a queue. Rotate the first k - 1 active people to the rear, remove the kth, and repeat until one person remains.",
      drawback: "The queue performs k operations per elimination, so a large k causes substantial repeated rotation.",
      complexity: "O(nk) time · O(n) extra space",
      code: code`class Solution {
    public int findTheWinner(int n, int k) {
        java.util.Queue<Integer> people = new java.util.ArrayDeque<>();
        for (int person = 1; person <= n; person++) people.offer(person);
        while (people.size() > 1) {
            for (int count = 1; count < k; count++) people.offer(people.poll());
            people.poll();
        }
        return people.peek();
    }
}`
    },
    optimized: {
      explanation: "For a circle of size one, survivor index is zero. When expanding a solved circle of size m - 1 to size m, counting shifts every index by k, so survivor(m) = (survivor(m - 1) + k) modulo m. Convert the final zero-based index to one-based.",
      complexity: "O(n) time · O(n) recursion space",
      steps: ["Use zero as the survivor for one person.", "Recursively solve n - 1 people.", "Shift by k modulo n and add one only to the final returned label."],
      code: code`class Solution {
    public int findTheWinner(int n, int k) {
        return survivor(n, k) + 1;
    }

    private int survivor(int n, int k) {
        if (n == 1) return 0;
        return (survivor(n - 1, k) + k) % n;
    }
}`
    }
  },
  "pow-x-n": {
    statement: "Given a double x and a signed integer n, return x raised to power n. Negative exponents represent reciprocals, and the implementation must handle the minimum 32-bit exponent safely.",
    examples: [
      { input: "x = 2.0, n = 10", output: "1024.0", explanation: "Multiplying ten factors of two gives 1024." },
      { input: "x = 2.1, n = 3", output: "9.261", explanation: "2.1 × 2.1 × 2.1 equals 9.261." },
      { input: "x = 2.0, n = -2", output: "0.25", explanation: "A negative exponent gives 1 / 2²." }
    ],
    constraints: ["-100.0 < x < 100.0.", "-2,147,483,648 <= n <= 2,147,483,647.", "Either x is nonzero or n is positive.", "The result fits a double."],
    brute: {
      explanation: "Convert n to long, multiply the result by x exactly |n| times, and take the reciprocal for a negative exponent.",
      drawback: "The loop can require more than two billion multiplications, making it impractical for large exponents.",
      complexity: "O(|n|) time · O(1) extra space",
      code: code`class Solution {
    public double myPow(double x, int n) {
        long exponent = n;
        boolean negative = exponent < 0;
        if (negative) exponent = -exponent;
        double result = 1.0;
        while (exponent-- > 0) result *= x;
        return negative ? 1.0 / result : result;
    }
}`
    },
    optimized: {
      explanation: "Exponentiation by squaring uses x^n = (x²)^(n/2) for even n and multiplies one extra x for odd n. Convert to long before negating the minimum int, invert x for a negative exponent, and recursively halve the exponent.",
      complexity: "O(log |n|) time · O(log |n|) recursion space",
      steps: ["Promote n to long; for a negative exponent invert x and negate the long exponent.", "Recursively calculate the power for exponent divided by two.", "Square the half result and multiply by x only when the exponent is odd."],
      code: code`class Solution {
    public double myPow(double x, int n) {
        long exponent = n;
        if (exponent < 0) {
            x = 1.0 / x;
            exponent = -exponent;
        }
        return power(x, exponent);
    }

    private double power(double x, long exponent) {
        if (exponent == 0) return 1.0;
        double half = power(x, exponent / 2);
        double result = half * half;
        return (exponent & 1L) == 0 ? result : result * x;
    }
}`
    }
  },
  "nested-list-weight-sum": {
    statement: "Given a nested list of integers, return the sum of every integer multiplied by its depth. Integers in the outer list have depth 1, and each nested list increases depth by one.",
    examples: [
      { input: "nestedList = [[1,1],2,[1,1]]", output: "10", explanation: "Four ones have depth 2 and value 2 has depth 1, giving 8 + 2." },
      { input: "nestedList = [1,[4,[6]]]", output: "27", explanation: "1 × 1 + 4 × 2 + 6 × 3 equals 27." },
      { input: "nestedList = [0]", output: "0", explanation: "Zero contributes nothing at depth one." }
    ],
    constraints: ["1 <= nestedList.size <= 50.", "Nested depth is at most 50.", "-100 <= each integer <= 100.", "The total number of integers is at most 50."],
    brute: {
      explanation: "First find the maximum depth. For every depth from one through that maximum, traverse the entire nested structure again and sum only integers found at that exact depth, multiplied by the depth.",
      drawback: "The full structure is revisited once per depth, repeating the same navigation work in deeply nested input.",
      complexity: "O(N · D) time · O(D) recursion space",
      code: code`class Solution {
    public int depthSum(java.util.List<NestedInteger> nestedList) {
        int maximum = maxDepth(nestedList, 1);
        int total = 0;
        for (int depth = 1; depth <= maximum; depth++) total += sumAt(nestedList, 1, depth) * depth;
        return total;
    }

    private int maxDepth(java.util.List<NestedInteger> list, int depth) {
        int maximum = depth;
        for (NestedInteger item : list) if (!item.isInteger()) maximum = Math.max(maximum, maxDepth(item.getList(), depth + 1));
        return maximum;
    }

    private int sumAt(java.util.List<NestedInteger> list, int depth, int target) {
        int sum = 0;
        for (NestedInteger item : list) {
            if (item.isInteger() && depth == target) sum += item.getInteger();
            else if (!item.isInteger()) sum += sumAt(item.getList(), depth + 1, target);
        }
        return sum;
    }
}`
    },
    optimized: {
      explanation: "Traverse once with a recursive depth parameter. An integer contributes value × depth immediately; a nested list recursively contributes its own weighted sum at depth + 1.",
      complexity: "O(N) time · O(D) recursion space",
      steps: ["Start the outer list at depth one.", "Add integer value times current depth when an integer is reached.", "Recurse into each list with depth plus one and add its returned sum."],
      code: code`class Solution {
    public int depthSum(java.util.List<NestedInteger> nestedList) {
        return sum(nestedList, 1);
    }

    private int sum(java.util.List<NestedInteger> list, int depth) {
        int total = 0;
        for (NestedInteger item : list) {
            if (item.isInteger()) total += item.getInteger() * depth;
            else total += sum(item.getList(), depth + 1);
        }
        return total;
    }
}`
    }
  }
};
