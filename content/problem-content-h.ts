import type { ProblemContent, ProblemExample } from "@/content/problem-content-types";

const e = (input: string, output: string, explanation: string): ProblemExample => ({ input, output, explanation });
const p = (statement: string, examples: ProblemExample[], constraints: string[], bruteExplanation: string, drawback: string, bruteComplexity: string, bruteCode: string, optimizedExplanation: string, optimizedComplexity: string, steps: string[], optimizedCode: string): ProblemContent => ({ statement, examples, constraints, brute: { explanation: bruteExplanation, drawback, complexity: bruteComplexity, code: bruteCode }, optimized: { explanation: optimizedExplanation, complexity: optimizedComplexity, steps, code: optimizedCode } });

export const problemContentH: Record<string, ProblemContent> = {
  "number-of-islands": p(
    "Given a grid of '1' land and '0' water, return the number of four-directionally connected land components.",
    [e("grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "1", "All land cells belong to one connected island."), e("grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "3", "The land forms three separate components.")],
    ["1 <= rows, columns <= 300", "grid[i][j] is '0' or '1'."],
    "Create one set for every land cell, union adjacent land cells, and count distinct roots after processing the grid.",
    "Union-Find allocates parent and rank arrays for the full grid when a traversal can mark land directly.",
    "Time O(rows * columns * alpha), space O(rows * columns).",
    `class Solution {
  public int numIslands(char[][] grid) {
    int rows = grid.length;
    int columns = grid[0].length;
    int[] parent = new int[rows * columns];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int row = 0; row < rows; row++) for (int column = 0; column < columns; column++) if (grid[row][column] == '1') {
      if (row > 0 && grid[row - 1][column] == '1') union(parent, row * columns + column, (row - 1) * columns + column);
      if (column > 0 && grid[row][column - 1] == '1') union(parent, row * columns + column, row * columns + column - 1);
    }
    java.util.Set<Integer> roots = new java.util.HashSet<>();
    for (int row = 0; row < rows; row++) for (int column = 0; column < columns; column++) if (grid[row][column] == '1') roots.add(find(parent, row * columns + column));
    return roots.size();
  }
  private int find(int[] parent, int value) {
    while (value != parent[value]) value = parent[value];
    return value;
  }
  private void union(int[] parent, int a, int b) {
    parent[find(parent, a)] = find(parent, b);
  }
}`,
    "Scan the grid. Each unvisited land cell begins one island; depth-first flood-fill changes every reachable land cell to water so it is never counted again.",
    "Time O(rows * columns), space O(rows * columns) recursion worst case.",
    ["Scan every grid position.", "On land, increment the island count and start flood fill.", "Mark the current cell as water and recurse into its four land neighbors."],
    `class Solution {
  public int numIslands(char[][] grid) {
    int islands = 0;
    for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) if (grid[row][column] == '1') {
      islands++;
      flood(grid, row, column);
    }
    return islands;
  }
  private void flood(char[][] grid, int row, int column) {
    if (row < 0 || row == grid.length || column < 0 || column == grid[0].length || grid[row][column] != '1') return;
    grid[row][column] = '0';
    flood(grid, row + 1, column);
    flood(grid, row - 1, column);
    flood(grid, row, column + 1);
    flood(grid, row, column - 1);
  }
}`,
  ),
  "max-area-of-island": p(
    "Given a binary grid, return the greatest number of cells in any four-directionally connected group of ones, or zero when no land exists.",
    [e("grid = [[0,0,1,0],[1,1,1,0],[0,1,0,0]]", "5", "The connected cross-shaped island contains five cells."), e("grid = [[0,0,0,0,0,0,0,0]]", "0", "There is no land.")],
    ["1 <= rows, columns <= 50", "grid[i][j] is 0 or 1."],
    "Use a separate visited matrix. Start DFS from each unvisited land cell, count its component, and retain the largest count.",
    "The traversal is linear but the visited matrix duplicates the grid's state.",
    "Time O(rows * columns), space O(rows * columns).",
    `class Solution {
  public int maxAreaOfIsland(int[][] grid) {
    boolean[][] visited = new boolean[grid.length][grid[0].length];
    int best = 0;
    for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) if (grid[row][column] == 1 && !visited[row][column]) best = Math.max(best, area(grid, row, column, visited));
    return best;
  }
  private int area(int[][] grid, int row, int column, boolean[][] visited) {
    if (row < 0 || row == grid.length || column < 0 || column == grid[0].length || grid[row][column] == 0 || visited[row][column]) return 0;
    visited[row][column] = true;
    return 1 + area(grid, row + 1, column, visited) + area(grid, row - 1, column, visited) + area(grid, row, column + 1, visited) + area(grid, row, column - 1, visited);
  }
}`,
    "Mark visited land directly as zero. Each DFS returns one plus the areas of its four unvisited land neighbors.",
    "Time O(rows * columns), space O(rows * columns) recursion worst case.",
    ["Start DFS from each remaining one-cell.", "Return zero outside the grid or on water.", "Change land to water, sum the four child areas, and update the maximum component."],
    `class Solution {
  public int maxAreaOfIsland(int[][] grid) {
    int best = 0;
    for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) best = Math.max(best, area(grid, row, column));
    return best;
  }
  private int area(int[][] grid, int row, int column) {
    if (row < 0 || row == grid.length || column < 0 || column == grid[0].length || grid[row][column] == 0) return 0;
    grid[row][column] = 0;
    return 1 + area(grid, row + 1, column) + area(grid, row - 1, column) + area(grid, row, column + 1) + area(grid, row, column - 1);
  }
}`,
  ),
  "clone-graph": p(
    "Given a reference to a node in a connected undirected graph, return a deep copy in which every original node and edge has an independent clone.",
    [e("adjList = [[2,4],[1,3],[2,4],[1,3]]", "[[2,4],[1,3],[2,4],[1,3]]", "The copied square graph has identical adjacency and different node objects."), e("adjList = [[]]", "[[]]", "The single node has no neighbors."), e("adjList = []", "[]", "A null input returns null.")],
    ["0 <= number of nodes <= 100", "1 <= Node.val <= 100", "Node values are unique and match their one-based indices.", "The graph is simple and connected."],
    "Breadth-first traverse the graph while mapping each original node to its clone. Create missing neighbor clones and append the mapped neighbor to the current clone.",
    "The solution is correct but stores both a queue and the clone map; recursion can express the same graph-copy relation more directly.",
    "Time O(V + E), space O(V).",
    `class Solution {
  public Node cloneGraph(Node node) {
    if (node == null) return null;
    java.util.Map<Node, Node> copies = new java.util.HashMap<>();
    java.util.Queue<Node> queue = new java.util.ArrayDeque<>();
    copies.put(node, new Node(node.val));
    queue.offer(node);
    while (!queue.isEmpty()) {
      Node current = queue.poll();
      for (Node neighbor : current.neighbors) {
        if (!copies.containsKey(neighbor)) {
          copies.put(neighbor, new Node(neighbor.val));
          queue.offer(neighbor);
        }
        copies.get(current).neighbors.add(copies.get(neighbor));
      }
    }
    return copies.get(node);
  }
}`,
    "Memoized DFS creates a clone before visiting neighbors. Encountering the node again returns the existing clone, which both prevents cycles and preserves shared edges.",
    "Time O(V + E), space O(V).",
    ["Return null for null input and an existing mapped clone for a revisited node.", "Create and store the current clone before descending.", "Recursively clone every neighbor and append it to the clone's adjacency list."],
    `class Solution {
  private final java.util.Map<Node, Node> copies = new java.util.HashMap<>();
  public Node cloneGraph(Node node) {
    if (node == null) return null;
    if (copies.containsKey(node)) return copies.get(node);
    Node copy = new Node(node.val);
    copies.put(node, copy);
    for (Node neighbor : node.neighbors) copy.neighbors.add(cloneGraph(neighbor));
    return copy;
  }
}`,
  ),
  "course-schedule": p(
    "Courses are connected by prerequisite pairs [course, prerequisite]. Return whether all courses can be completed, which is possible exactly when the directed dependency graph has no cycle.",
    [e("numCourses = 2, prerequisites = [[1,0]]", "true", "Take course zero before course one."), e("numCourses = 2, prerequisites = [[1,0],[0,1]]", "false", "Each course waits for the other, forming a cycle.")],
    ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "Each pair contains two distinct valid course numbers.", "All prerequisite pairs are unique."],
    "Run a fresh path-based DFS from every course. If the recursion reaches a node already in the current path, a cycle exists.",
    "Without a permanently completed state, acyclic suffixes are traversed again from many starting courses.",
    "Time O(V * (V + E)), space O(V).",
    `class Solution {
  public boolean canFinish(int numCourses, int[][] prerequisites) {
    java.util.List<Integer>[] graph = graph(numCourses, prerequisites);
    for (int course = 0; course < numCourses; course++) if (cycle(course, graph, new boolean[numCourses])) return false;
    return true;
  }
  private boolean cycle(int course, java.util.List<Integer>[] graph, boolean[] path) {
    if (path[course]) return true;
    path[course] = true;
    for (int next : graph[course]) if (cycle(next, graph, path)) return true;
    path[course] = false;
    return false;
  }
  private java.util.List<Integer>[] graph(int n, int[][] edges) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : edges) graph[edge[1]].add(edge[0]);
    return graph;
  }
}`,
    "Kahn's algorithm counts prerequisites for every course. Repeatedly take indegree-zero courses and remove their outgoing dependencies. All courses are completable only if every vertex is processed.",
    "Time O(V + E), space O(V + E).",
    ["Build adjacency lists and indegrees.", "Queue every zero-indegree course.", "Process the queue, decrement neighbor indegrees, and compare the processed count with numCourses."],
    `class Solution {
  public boolean canFinish(int numCourses, int[][] prerequisites) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[numCourses];
    int[] indegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : prerequisites) {
      graph[edge[1]].add(edge[0]);
      indegree[edge[0]]++;
    }
    java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
    for (int course = 0; course < numCourses; course++) if (indegree[course] == 0) queue.offer(course);
    int completed = 0;
    while (!queue.isEmpty()) {
      int course = queue.poll();
      completed++;
      for (int next : graph[course]) if (--indegree[next] == 0) queue.offer(next);
    }
    return completed == numCourses;
  }
}`,
  ),
  "course-schedule-ii": p(
    "Return one valid order for completing all courses under the prerequisite pairs, or an empty array when the dependency graph contains a cycle.",
    [e("numCourses = 2, prerequisites = [[1,0]]", "[0,1]", "Course zero must precede course one."), e("numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", "[0,2,1,3]", "Either middle-course order is valid before course three."), e("numCourses = 1, prerequisites = []", "[0]", "The only course has no prerequisite.")],
    ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= numCourses * (numCourses - 1)", "Pairs are unique and contain distinct valid course numbers."],
    "Repeatedly scan every course for one whose prerequisites are already completed, append it, and restart. If a full scan makes no progress, return empty.",
    "Scanning all edges for every selected course can take quadratic work.",
    "Time O(VE), space O(V).",
    `class Solution {
  public int[] findOrder(int numCourses, int[][] prerequisites) {
    boolean[] done = new boolean[numCourses];
    int[] order = new int[numCourses];
    for (int position = 0; position < numCourses; position++) {
      int chosen = -1;
      for (int course = 0; course < numCourses && chosen == -1; course++) if (!done[course]) {
        boolean ready = true;
        for (int[] edge : prerequisites) if (edge[0] == course && !done[edge[1]]) ready = false;
        if (ready) chosen = course;
      }
      if (chosen == -1) return new int[0];
      done[chosen] = true;
      order[position] = chosen;
    }
    return order;
  }
}`,
    "Build indegrees once and apply Kahn's topological sort. Every dependency edge is removed exactly once when its prerequisite course is processed.",
    "Time O(V + E), space O(V + E).",
    ["Build prerequisite-to-course adjacency and indegree counts.", "Queue all courses with no remaining prerequisite.", "Write each dequeued course to the order and release neighbors; return empty unless all courses are written."],
    `class Solution {
  public int[] findOrder(int numCourses, int[][] prerequisites) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[numCourses];
    int[] indegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : prerequisites) {
      graph[edge[1]].add(edge[0]);
      indegree[edge[0]]++;
    }
    java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
    for (int course = 0; course < numCourses; course++) if (indegree[course] == 0) queue.offer(course);
    int[] order = new int[numCourses];
    int size = 0;
    while (!queue.isEmpty()) {
      int course = queue.poll();
      order[size++] = course;
      for (int next : graph[course]) if (--indegree[next] == 0) queue.offer(next);
    }
    return size == numCourses ? order : new int[0];
  }
}`,
  ),
  "graph-valid-tree": p(
    "Given n labeled vertices and undirected edges, return whether the graph is a tree: connected and cycle-free.",
    [e("n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", "true", "All vertices are connected through four edges without a cycle."), e("n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", "false", "Edges 1-2-3-1 form a cycle.")],
    ["1 <= n <= 2000", "0 <= edges.length <= 5000", "Edges are unique undirected pairs without self-loops."],
    "Build adjacency lists, DFS from vertex zero while rejecting a visited neighbor other than the parent, then verify every vertex was reached.",
    "The traversal is linear but requires adjacency storage and recursion; the n - 1 edge property can reject invalid inputs earlier.",
    "Time O(V + E), space O(V + E).",
    `class Solution {
  public boolean validTree(int n, int[][] edges) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : edges) {
      graph[edge[0]].add(edge[1]);
      graph[edge[1]].add(edge[0]);
    }
    boolean[] visited = new boolean[n];
    if (cycle(0, -1, graph, visited)) return false;
    for (boolean value : visited) if (!value) return false;
    return true;
  }
  private boolean cycle(int node, int parent, java.util.List<Integer>[] graph, boolean[] visited) {
    if (visited[node]) return true;
    visited[node] = true;
    for (int next : graph[node]) if (next != parent && cycle(next, node, graph, visited)) return true;
    return false;
  }
}`,
    "A tree on n vertices must contain exactly n - 1 edges. Union each edge; if its endpoints already share a root, it creates a cycle. With n - 1 non-cycling edges, connectivity follows.",
    "Time O(E alpha(V)), space O(V).",
    ["Reject unless edge count equals n - 1.", "Initialize one disjoint set per vertex.", "Union every edge and reject when both endpoints already have the same root."],
    `class Solution {
  public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    int[] parent = new int[n];
    int[] rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] edge : edges) {
      int a = find(parent, edge[0]);
      int b = find(parent, edge[1]);
      if (a == b) return false;
      if (rank[a] < rank[b]) parent[a] = b;
      else if (rank[a] > rank[b]) parent[b] = a;
      else {
        parent[b] = a;
        rank[a]++;
      }
    }
    return true;
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
  ),
  "number-of-connected-components-in-an-undirected-graph": p(
    "Given n vertices and undirected edges, return the number of connected components.",
    [e("n = 5, edges = [[0,1],[1,2],[3,4]]", "2", "Vertices 0-1-2 and 3-4 form two groups."), e("n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", "1", "Every vertex belongs to one chain.")],
    ["1 <= n <= 2000", "1 <= edges.length <= 5000", "Edges contain distinct valid vertices and no duplicate undirected pair."],
    "Build adjacency lists. Every unvisited vertex starts one component; DFS marks all vertices reachable from it.",
    "The method stores the complete adjacency structure even when edges arrive naturally as merge operations.",
    "Time O(V + E), space O(V + E).",
    `class Solution {
  public int countComponents(int n, int[][] edges) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : edges) {
      graph[edge[0]].add(edge[1]);
      graph[edge[1]].add(edge[0]);
    }
    boolean[] visited = new boolean[n];
    int components = 0;
    for (int node = 0; node < n; node++) if (!visited[node]) {
      components++;
      visit(node, graph, visited);
    }
    return components;
  }
  private void visit(int node, java.util.List<Integer>[] graph, boolean[] visited) {
    visited[node] = true;
    for (int next : graph[node]) if (!visited[next]) visit(next, graph, visited);
  }
}`,
    "Begin with n independent sets. Each successful union joins two previously separate components, so decrement the component count once.",
    "Time O(E alpha(V)), space O(V).",
    ["Initialize parent roots and component count n.", "Find both endpoint roots for every edge.", "When roots differ, union them and decrement the count."],
    `class Solution {
  public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    int[] size = new int[n];
    for (int i = 0; i < n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
    int components = n;
    for (int[] edge : edges) {
      int a = find(parent, edge[0]);
      int b = find(parent, edge[1]);
      if (a == b) continue;
      if (size[a] < size[b]) {
        int value = a;
        a = b;
        b = value;
      }
      parent[b] = a;
      size[a] += size[b];
      components--;
    }
    return components;
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
  ),
  "redundant-connection": p(
    "An undirected graph began as a tree and received one extra edge. Return the last input edge whose removal restores a tree.",
    [e("edges = [[1,2],[1,3],[2,3]]", "[2,3]", "The final edge closes the triangle."), e("edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", "[1,4]", "That edge closes the first cycle.")],
    ["3 <= edges.length <= 1000", "Each endpoint is between 1 and edges.length.", "The graph is connected and has exactly one extra edge."],
    "Before adding each edge, run BFS in the graph built so far to see whether its endpoints are already connected. If they are, that edge is redundant.",
    "A graph traversal for every input edge produces quadratic work.",
    "Time O(E^2), space O(V + E).",
    `class Solution {
  public int[] findRedundantConnection(int[][] edges) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[edges.length + 1];
    for (int i = 0; i < graph.length; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : edges) {
      if (connected(edge[0], edge[1], graph)) return edge;
      graph[edge[0]].add(edge[1]);
      graph[edge[1]].add(edge[0]);
    }
    return new int[0];
  }
  private boolean connected(int start, int target, java.util.List<Integer>[] graph) {
    boolean[] visited = new boolean[graph.length];
    java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
    queue.offer(start);
    visited[start] = true;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      if (node == target) return true;
      for (int next : graph[node]) if (!visited[next]) {
        visited[next] = true;
        queue.offer(next);
      }
    }
    return false;
  }
}`,
    "Union-Find answers connectivity incrementally. The first edge whose endpoints already share a root closes the unique cycle and is returned.",
    "Time O(E alpha(V)), space O(V).",
    ["Initialize one parent per possible vertex.", "Find both endpoint roots for each edge.", "Return the edge when roots match; otherwise union the roots."],
    `class Solution {
  public int[] findRedundantConnection(int[][] edges) {
    int[] parent = new int[edges.length + 1];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int[] edge : edges) {
      int a = find(parent, edge[0]);
      int b = find(parent, edge[1]);
      if (a == b) return edge;
      parent[a] = b;
    }
    return new int[0];
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
  ),
  "number-of-provinces": p(
    "An adjacency matrix describes direct connections among cities. Return the number of connected groups of cities, including indirect connections.",
    [e("isConnected = [[1,1,0],[1,1,0],[0,0,1]]", "2", "Cities zero and one form one province; city two forms another."), e("isConnected = [[1,0,0],[0,1,0],[0,0,1]]", "3", "No distinct cities are connected.")],
    ["1 <= n <= 200", "isConnected is an n by n symmetric matrix.", "isConnected[i][i] == 1"],
    "Every unvisited city begins one province. DFS across matrix entries equal to one and mark the entire group.",
    "Scanning an entire matrix row for every visited city is unavoidable for matrix input, but recursion may use O(n) call depth.",
    "Time O(n^2), space O(n).",
    `class Solution {
  public int findCircleNum(int[][] isConnected) {
    boolean[] visited = new boolean[isConnected.length];
    int provinces = 0;
    for (int city = 0; city < isConnected.length; city++) if (!visited[city]) {
      provinces++;
      visit(city, isConnected, visited);
    }
    return provinces;
  }
  private void visit(int city, int[][] graph, boolean[] visited) {
    visited[city] = true;
    for (int next = 0; next < graph.length; next++) if (graph[city][next] == 1 && !visited[next]) visit(next, graph, visited);
  }
}`,
    "Union every connected city pair. Start with n provinces and decrement only when an edge merges two previously different roots.",
    "Time O(n^2 alpha(n)), space O(n).",
    ["Initialize each city as its own root and set provinces to n.", "Inspect one triangle of the symmetric matrix.", "Union different roots and decrement the province count."],
    `class Solution {
  public int findCircleNum(int[][] isConnected) {
    int n = isConnected.length;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int provinces = n;
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (isConnected[i][j] == 1) {
      int a = find(parent, i);
      int b = find(parent, j);
      if (a != b) {
        parent[a] = b;
        provinces--;
      }
    }
    return provinces;
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
  ),
  "is-graph-bipartite": p(
    "Return whether an undirected graph can be divided into two groups so every edge connects vertices in different groups.",
    [e("graph = [[1,2,3],[0,2],[0,1,3],[0,2]]", "false", "The graph contains an odd cycle."), e("graph = [[1,3],[0,2],[1,3],[0,2]]", "true", "Vertices {0,2} and {1,3} form a valid split.")],
    ["1 <= graph.length <= 100", "0 <= graph[u].length < graph.length", "No self-edge or duplicate neighbor exists and adjacency is symmetric."],
    "Enumerate every two-color assignment and test all edges. Accept the first assignment whose edge endpoints always differ.",
    "There are 2^V assignments even though one chosen color forces all colors in its connected component.",
    "Time O(2^V * E), space O(V).",
    `class Solution {
  public boolean isBipartite(int[][] graph) {
    int[] colors = new int[graph.length];
    return assign(graph, colors, 0);
  }
  private boolean assign(int[][] graph, int[] colors, int node) {
    if (node == graph.length) {
      for (int from = 0; from < graph.length; from++) for (int to : graph[from]) if (colors[from] == colors[to]) return false;
      return true;
    }
    colors[node] = 1;
    if (assign(graph, colors, node + 1)) return true;
    colors[node] = -1;
    return assign(graph, colors, node + 1);
  }
}`,
    "For every uncolored component, assign one start color and BFS. Each edge forces the neighbor to have the opposite color; equal colors on an edge prove failure.",
    "Time O(V + E), space O(V).",
    ["Store zero for uncolored and plus/minus one for the two groups.", "Start BFS from each uncolored vertex.", "Assign opposite colors to new neighbors and reject an equal-colored edge."],
    `class Solution {
  public boolean isBipartite(int[][] graph) {
    int[] color = new int[graph.length];
    for (int start = 0; start < graph.length; start++) if (color[start] == 0) {
      java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
      queue.offer(start);
      color[start] = 1;
      while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int next : graph[node]) {
          if (color[next] == color[node]) return false;
          if (color[next] == 0) {
            color[next] = -color[node];
            queue.offer(next);
          }
        }
      }
    }
    return true;
  }
}`,
  ),
  "rotting-oranges": p(
    "Each minute, every fresh orange four-directionally adjacent to a rotten orange becomes rotten. Return the minimum minutes until no fresh orange remains, or -1 when impossible.",
    [e("grid = [[2,1,1],[1,1,0],[0,1,1]]", "4", "The infection reaches the final orange after four layers."), e("grid = [[2,1,1],[0,1,1],[1,0,1]]", "-1", "The lower-left fresh orange is unreachable."), e("grid = [[0,2]]", "0", "There is no fresh orange.")],
    ["1 <= rows, columns <= 10", "grid[i][j] is 0, 1, or 2."],
    "Simulate one minute at a time by scanning the full grid, recording every fresh orange adjacent to current rot, then applying those changes together.",
    "Each minute rescans every cell, leading to quadratic grid work in a long infection chain.",
    "Time O((rows * columns)^2), space O(rows * columns).",
    `class Solution {
  public int orangesRotting(int[][] grid) {
    int minutes = 0;
    while (true) {
      java.util.List<int[]> next = new java.util.ArrayList<>();
      for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) if (grid[row][column] == 1 && adjacent(grid, row, column)) next.add(new int[]{row, column});
      if (next.isEmpty()) break;
      for (int[] cell : next) grid[cell[0]][cell[1]] = 2;
      minutes++;
    }
    for (int[] row : grid) for (int value : row) if (value == 1) return -1;
    return minutes;
  }
  private boolean adjacent(int[][] grid, int row, int column) {
    return row > 0 && grid[row - 1][column] == 2 || row + 1 < grid.length && grid[row + 1][column] == 2 || column > 0 && grid[row][column - 1] == 2 || column + 1 < grid[0].length && grid[row][column + 1] == 2;
  }
}`,
    "Multi-source BFS starts with every rotten orange. Each queue layer is one minute, so every fresh orange enters the queue once at its earliest possible infection time.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Queue all rotten oranges and count fresh ones.", "Process one queue-sized minute layer and rot fresh neighbors.", "Stop when the queue or fresh count is empty; return elapsed minutes only when fresh reaches zero."],
    `class Solution {
  public int orangesRotting(int[][] grid) {
    java.util.Queue<int[]> queue = new java.util.ArrayDeque<>();
    int fresh = 0;
    for (int row = 0; row < grid.length; row++) for (int column = 0; column < grid[0].length; column++) {
      if (grid[row][column] == 2) queue.offer(new int[]{row, column});
      else if (grid[row][column] == 1) fresh++;
    }
    int minutes = 0;
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    while (fresh > 0 && !queue.isEmpty()) {
      int size = queue.size();
      minutes++;
      while (size-- > 0) {
        int[] cell = queue.poll();
        for (int[] direction : directions) {
          int row = cell[0] + direction[0];
          int column = cell[1] + direction[1];
          if (row >= 0 && row < grid.length && column >= 0 && column < grid[0].length && grid[row][column] == 1) {
            grid[row][column] = 2;
            fresh--;
            queue.offer(new int[]{row, column});
          }
        }
      }
    }
    return fresh == 0 ? minutes : -1;
  }
}`,
  ),
  "word-ladder": p(
    "Change one letter at a time from beginWord to endWord so every intermediate word belongs to wordList. Return the number of words in the shortest sequence, or zero when no sequence exists.",
    [e('beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', "5", "One shortest sequence is hit, hot, dot, dog, cog."), e('beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', "0", "The required end word is unavailable.")],
    ["1 <= word length <= 10", "1 <= wordList.length <= 5000", "All words have equal length and contain lowercase letters.", "wordList contains unique words and beginWord differs from endWord."],
    "Build the complete word graph by comparing every pair for exactly one differing position, connect beginWord similarly, then BFS for the shortest path.",
    "Pairwise graph construction costs O(N^2 * L) before the search begins.",
    "Time O(N^2 * L), space O(N^2).",
    `class Solution {
  public int ladderLength(String beginWord, String endWord, java.util.List<String> wordList) {
    java.util.List<String> words = new java.util.ArrayList<>(wordList);
    words.add(beginWord);
    java.util.List<Integer>[] graph = new java.util.ArrayList[words.size()];
    for (int i = 0; i < words.size(); i++) graph[i] = new java.util.ArrayList<>();
    for (int i = 0; i < words.size(); i++) for (int j = i + 1; j < words.size(); j++) if (neighbors(words.get(i), words.get(j))) {
      graph[i].add(j);
      graph[j].add(i);
    }
    int start = words.size() - 1;
    java.util.Queue<Integer> queue = new java.util.ArrayDeque<>();
    queue.offer(start);
    int[] distance = new int[words.size()];
    distance[start] = 1;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      if (words.get(node).equals(endWord)) return distance[node];
      for (int next : graph[node]) if (distance[next] == 0) {
        distance[next] = distance[node] + 1;
        queue.offer(next);
      }
    }
    return 0;
  }
  private boolean neighbors(String a, String b) {
    int difference = 0;
    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i)) difference++;
    return difference == 1;
  }
}`,
    "BFS generates one-letter mutations on demand. A dictionary set gives O(1) membership, and removing an enqueued word ensures each dictionary word is processed once.",
    "Time O(N * L * 26), space O(N).",
    ["Return zero unless endWord is in the dictionary.", "BFS from beginWord and generate every one-letter replacement.", "Remove and enqueue valid unseen words; return the current distance when endWord is reached."],
    `class Solution {
  public int ladderLength(String beginWord, String endWord, java.util.List<String> wordList) {
    java.util.Set<String> words = new java.util.HashSet<>(wordList);
    if (!words.contains(endWord)) return 0;
    java.util.Queue<String> queue = new java.util.ArrayDeque<>();
    queue.offer(beginWord);
    int length = 1;
    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        String word = queue.poll();
        if (word.equals(endWord)) return length;
        char[] letters = word.toCharArray();
        for (int i = 0; i < letters.length; i++) {
          char original = letters[i];
          for (char c = 'a'; c <= 'z'; c++) {
            letters[i] = c;
            String next = new String(letters);
            if (words.remove(next)) queue.offer(next);
          }
          letters[i] = original;
        }
      }
      length++;
    }
    return 0;
  }
}`,
  ),
  "pacific-atlantic-water-flow": p(
    "Water flows from a cell to orthogonal neighbors of equal or lower height. Return all coordinates from which water can reach both the Pacific top/left borders and Atlantic bottom/right borders.",
    [e("heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", "Each listed cell has a non-increasing route to both oceans."), e("heights = [[1]]", "[[0,0]]", "The only cell touches both oceans.")],
    ["1 <= rows, columns <= 200", "0 <= heights[i][j] <= 100000"],
    "From every cell, run a fresh DFS following downhill flow and record whether each ocean border can be reached.",
    "Most flow suffixes are explored again from many starting cells, producing quadratic grid work.",
    "Time O((rows * columns)^2), space O(rows * columns).",
    `class Solution {
  public java.util.List<java.util.List<Integer>> pacificAtlantic(int[][] heights) {
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    for (int row = 0; row < heights.length; row++) for (int column = 0; column < heights[0].length; column++) {
      boolean[] oceans = new boolean[2];
      flow(heights, row, column, new boolean[heights.length][heights[0].length], oceans);
      if (oceans[0] && oceans[1]) answer.add(java.util.Arrays.asList(row, column));
    }
    return answer;
  }
  private void flow(int[][] heights, int row, int column, boolean[][] visited, boolean[] oceans) {
    if (visited[row][column]) return;
    visited[row][column] = true;
    if (row == 0 || column == 0) oceans[0] = true;
    if (row == heights.length - 1 || column == heights[0].length - 1) oceans[1] = true;
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int[] direction : directions) {
      int nextRow = row + direction[0];
      int nextColumn = column + direction[1];
      if (nextRow >= 0 && nextRow < heights.length && nextColumn >= 0 && nextColumn < heights[0].length && heights[nextRow][nextColumn] <= heights[row][column]) flow(heights, nextRow, nextColumn, visited, oceans);
    }
  }
}`,
    "Reverse the flow. Start from each ocean border and move to neighbors of equal or greater height. Cells reached from both reverse searches are exactly the answer.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Mark all cells reachable uphill from Pacific borders.", "Mark all cells reachable uphill from Atlantic borders.", "Collect coordinates marked by both searches."],
    `class Solution {
  public java.util.List<java.util.List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length;
    int columns = heights[0].length;
    boolean[][] pacific = new boolean[rows][columns];
    boolean[][] atlantic = new boolean[rows][columns];
    for (int row = 0; row < rows; row++) {
      visit(heights, row, 0, pacific);
      visit(heights, row, columns - 1, atlantic);
    }
    for (int column = 0; column < columns; column++) {
      visit(heights, 0, column, pacific);
      visit(heights, rows - 1, column, atlantic);
    }
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    for (int row = 0; row < rows; row++) for (int column = 0; column < columns; column++) if (pacific[row][column] && atlantic[row][column]) answer.add(java.util.Arrays.asList(row, column));
    return answer;
  }
  private void visit(int[][] heights, int row, int column, boolean[][] reached) {
    if (reached[row][column]) return;
    reached[row][column] = true;
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int[] direction : directions) {
      int nextRow = row + direction[0];
      int nextColumn = column + direction[1];
      if (nextRow >= 0 && nextRow < heights.length && nextColumn >= 0 && nextColumn < heights[0].length && heights[nextRow][nextColumn] >= heights[row][column]) visit(heights, nextRow, nextColumn, reached);
    }
  }
}`,
  ),
  "surrounded-regions": p(
    "Capture every four-directionally connected region of 'O' that does not touch the board boundary by changing its cells to 'X'. Modify the board in place.",
    [e("board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "The internal region is captured; the boundary O survives."), e("board = [[\"X\"]]", "[[\"X\"]]", "No region exists.")],
    ["1 <= rows, columns <= 200", "board[i][j] is 'X' or 'O'."],
    "For each unvisited O component, BFS to collect its cells and track whether any touches a border. Flip the collected component only when it is enclosed.",
    "It stores every component's full cell list before knowing whether the region survives.",
    "Time O(rows * columns), space O(rows * columns).",
    `class Solution {
  public void solve(char[][] board) {
    boolean[][] visited = new boolean[board.length][board[0].length];
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int startRow = 0; startRow < board.length; startRow++) for (int startColumn = 0; startColumn < board[0].length; startColumn++) if (board[startRow][startColumn] == 'O' && !visited[startRow][startColumn]) {
      java.util.List<int[]> cells = new java.util.ArrayList<>();
      java.util.Queue<int[]> queue = new java.util.ArrayDeque<>();
      queue.offer(new int[]{startRow, startColumn});
      visited[startRow][startColumn] = true;
      boolean border = false;
      while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        cells.add(cell);
        if (cell[0] == 0 || cell[1] == 0 || cell[0] == board.length - 1 || cell[1] == board[0].length - 1) border = true;
        for (int[] direction : directions) {
          int row = cell[0] + direction[0];
          int column = cell[1] + direction[1];
          if (row >= 0 && row < board.length && column >= 0 && column < board[0].length && board[row][column] == 'O' && !visited[row][column]) {
            visited[row][column] = true;
            queue.offer(new int[]{row, column});
          }
        }
      }
      if (!border) for (int[] cell : cells) board[cell[0]][cell[1]] = 'X';
    }
  }
}`,
    "Only O cells connected to a border can survive. Flood-fill those cells to a temporary marker, turn every remaining O into X, then restore the marked cells.",
    "Time O(rows * columns), space O(rows * columns) recursion worst case.",
    ["Flood-fill O cells from all four borders and mark them safe.", "Change every unmarked O to X.", "Restore each safe marker to O."],
    `class Solution {
  public void solve(char[][] board) {
    for (int row = 0; row < board.length; row++) {
      mark(board, row, 0);
      mark(board, row, board[0].length - 1);
    }
    for (int column = 0; column < board[0].length; column++) {
      mark(board, 0, column);
      mark(board, board.length - 1, column);
    }
    for (int row = 0; row < board.length; row++) for (int column = 0; column < board[0].length; column++) {
      if (board[row][column] == 'O') board[row][column] = 'X';
      else if (board[row][column] == 'S') board[row][column] = 'O';
    }
  }
  private void mark(char[][] board, int row, int column) {
    if (row < 0 || row == board.length || column < 0 || column == board[0].length || board[row][column] != 'O') return;
    board[row][column] = 'S';
    mark(board, row + 1, column);
    mark(board, row - 1, column);
    mark(board, row, column + 1);
    mark(board, row, column - 1);
  }
}`,
  ),
  "walls-and-gates": p(
    "Rooms contain -1 walls, 0 gates, and a large INF value for empty rooms. Fill every empty room with its shortest four-directional distance to a gate, leaving unreachable rooms unchanged.",
    [e("rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]", "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]", "Each INF cell receives its distance to the nearest gate."), e("rooms = [[-1]]", "[[-1]]", "A wall remains unchanged.")],
    ["1 <= rows, columns <= 250", "rooms[i][j] is -1, 0, or 2^31 - 1."],
    "Run a separate BFS from every empty room until reaching its closest gate, then write that distance.",
    "Each room may traverse most of the grid, producing quadratic grid work.",
    "Time O((rows * columns)^2), space O(rows * columns).",
    `class Solution {
  public void wallsAndGates(int[][] rooms) {
    for (int row = 0; row < rooms.length; row++) for (int column = 0; column < rooms[0].length; column++) if (rooms[row][column] == Integer.MAX_VALUE) rooms[row][column] = distance(rooms, row, column);
  }
  private int distance(int[][] rooms, int startRow, int startColumn) {
    boolean[][] visited = new boolean[rooms.length][rooms[0].length];
    java.util.Queue<int[]> queue = new java.util.ArrayDeque<>();
    queue.offer(new int[]{startRow, startColumn});
    visited[startRow][startColumn] = true;
    int distance = 0;
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        int[] cell = queue.poll();
        if (rooms[cell[0]][cell[1]] == 0) return distance;
        for (int[] direction : directions) {
          int row = cell[0] + direction[0];
          int column = cell[1] + direction[1];
          if (row >= 0 && row < rooms.length && column >= 0 && column < rooms[0].length && rooms[row][column] != -1 && !visited[row][column]) {
            visited[row][column] = true;
            queue.offer(new int[]{row, column});
          }
        }
      }
      distance++;
    }
    return Integer.MAX_VALUE;
  }
}`,
    "Multi-source BFS begins from all gates simultaneously. The first time an empty room is reached is through its nearest gate, so assign parent distance plus one and enqueue it once.",
    "Time O(rows * columns), space O(rows * columns).",
    ["Queue every gate.", "Remove a cell and inspect four neighbors.", "For each untouched INF room, assign current distance plus one and enqueue it."],
    `class Solution {
  public void wallsAndGates(int[][] rooms) {
    java.util.Queue<int[]> queue = new java.util.ArrayDeque<>();
    for (int row = 0; row < rooms.length; row++) for (int column = 0; column < rooms[0].length; column++) if (rooms[row][column] == 0) queue.offer(new int[]{row, column});
    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty()) {
      int[] cell = queue.poll();
      for (int[] direction : directions) {
        int row = cell[0] + direction[0];
        int column = cell[1] + direction[1];
        if (row >= 0 && row < rooms.length && column >= 0 && column < rooms[0].length && rooms[row][column] == Integer.MAX_VALUE) {
          rooms[row][column] = rooms[cell[0]][cell[1]] + 1;
          queue.offer(new int[]{row, column});
        }
      }
    }
  }
}`,
  ),
  "open-the-lock": p(
    "A four-wheel lock starts at 0000. One move rotates one wheel by one digit with wraparound. Return the fewest moves to target while never entering a deadend, or -1 if impossible.",
    [e('deadends = ["0201","0101","0102","1212","2002"], target = "0202"', "6", "A shortest legal sequence reaches the target in six moves."), e('deadends = ["8888"], target = "0009"', "1", "Rotate the final wheel backward once."), e('deadends = ["0000"], target = "8888"', "-1", "The starting state is forbidden.")],
    ["1 <= deadends.length <= 500", "Each state and target is a four-digit string.", "target is not in deadends."],
    "Build all 10000 lock states and every legal one-move edge, remove deadends, then BFS from 0000.",
    "Materializing the complete state graph stores about 80000 edges even when BFS visits only a small portion.",
    "Time O(10000 * 8), space O(10000 * 8).",
    `class Solution {
  public int openLock(String[] deadends, String target) {
    java.util.Set<String> blocked = new java.util.HashSet<>(java.util.Arrays.asList(deadends));
    if (blocked.contains("0000")) return -1;
    java.util.Map<String, java.util.List<String>> graph = new java.util.HashMap<>();
    for (int value = 0; value < 10000; value++) {
      String state = String.format("%04d", value);
      if (!blocked.contains(state)) graph.put(state, neighbors(state));
    }
    java.util.Queue<String> queue = new java.util.ArrayDeque<>();
    java.util.Map<String, Integer> distance = new java.util.HashMap<>();
    queue.offer("0000");
    distance.put("0000", 0);
    while (!queue.isEmpty()) {
      String state = queue.poll();
      if (state.equals(target)) return distance.get(state);
      for (String next : graph.get(state)) if (graph.containsKey(next) && !distance.containsKey(next)) {
        distance.put(next, distance.get(state) + 1);
        queue.offer(next);
      }
    }
    return -1;
  }
  private java.util.List<String> neighbors(String state) {
    java.util.List<String> result = new java.util.ArrayList<>();
    char[] digits = state.toCharArray();
    for (int i = 0; i < 4; i++) {
      char original = digits[i];
      digits[i] = (char) ('0' + (original - '0' + 1) % 10);
      result.add(new String(digits));
      digits[i] = (char) ('0' + (original - '0' + 9) % 10);
      result.add(new String(digits));
      digits[i] = original;
    }
    return result;
  }
}`,
    "BFS generates the eight neighboring combinations only when a state is processed. Reuse the deadend set as visited by adding each enqueued state.",
    "Time O(10000 * 8), space O(10000).",
    ["Reject a blocked start and queue 0000 at distance zero.", "For every state, rotate each wheel forward and backward.", "Enqueue each nonblocked unseen neighbor once and return its BFS layer on reaching target."],
    `class Solution {
  public int openLock(String[] deadends, String target) {
    java.util.Set<String> visited = new java.util.HashSet<>(java.util.Arrays.asList(deadends));
    if (!visited.add("0000")) return -1;
    java.util.Queue<String> queue = new java.util.ArrayDeque<>();
    queue.offer("0000");
    int moves = 0;
    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        String state = queue.poll();
        if (state.equals(target)) return moves;
        char[] digits = state.toCharArray();
        for (int i = 0; i < 4; i++) {
          char original = digits[i];
          digits[i] = (char) ('0' + (original - '0' + 1) % 10);
          String up = new String(digits);
          if (visited.add(up)) queue.offer(up);
          digits[i] = (char) ('0' + (original - '0' + 9) % 10);
          String down = new String(digits);
          if (visited.add(down)) queue.offer(down);
          digits[i] = original;
        }
      }
      moves++;
    }
    return -1;
  }
}`,
  ),
  "evaluate-division": p(
    "Equations such as a / b = value define ratios between variables. Return each requested ratio, or -1 when either variable is unknown or no relationship connects them.",
    [e('equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', "[6.0,0.5,-1.0,1.0,-1.0]", "Multiplying a/b and b/c gives a/c; unknown variables return -1."), e('equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"]]', "[0.5,2.0]", "Reversing an equation uses its reciprocal.")],
    ["1 <= equations.length <= 20", "values.length == equations.length", "1 <= queries.length <= 20", "Variable names contain lowercase letters and digits.", "All input divisions are valid and consistent."],
    "Build a weighted bidirectional graph. For every query, run DFS multiplying edge ratios until the target is reached.",
    "Repeated queries traverse the same relationship paths again.",
    "Time O(queries * (vertices + edges)), space O(vertices + edges).",
    `class Solution {
  public double[] calcEquation(java.util.List<java.util.List<String>> equations, double[] values, java.util.List<java.util.List<String>> queries) {
    java.util.Map<String, java.util.Map<String, Double>> graph = new java.util.HashMap<>();
    for (int i = 0; i < equations.size(); i++) {
      String a = equations.get(i).get(0);
      String b = equations.get(i).get(1);
      graph.computeIfAbsent(a, key -> new java.util.HashMap<>()).put(b, values[i]);
      graph.computeIfAbsent(b, key -> new java.util.HashMap<>()).put(a, 1.0 / values[i]);
    }
    double[] answer = new double[queries.size()];
    for (int i = 0; i < queries.size(); i++) answer[i] = search(queries.get(i).get(0), queries.get(i).get(1), graph, new java.util.HashSet<>());
    return answer;
  }
  private double search(String current, String target, java.util.Map<String, java.util.Map<String, Double>> graph, java.util.Set<String> visited) {
    if (!graph.containsKey(current) || !graph.containsKey(target)) return -1.0;
    if (current.equals(target)) return 1.0;
    visited.add(current);
    for (java.util.Map.Entry<String, Double> edge : graph.get(current).entrySet()) if (!visited.contains(edge.getKey())) {
      double suffix = search(edge.getKey(), target, graph, visited);
      if (suffix >= 0.0) return edge.getValue() * suffix;
    }
    return -1.0;
  }
}`,
    "Weighted Union-Find stores each variable's ratio to its parent. Union equations join roots with the required relative weight; path compression converts weights to ratios directly against the root.",
    "Nearly O((equations + queries) alpha(vertices)) time, O(vertices) space.",
    ["Initialize each variable as its own root with weight one.", "Union equation endpoints while setting the attached root's ratio.", "For a query, compress both paths and divide their root-relative weights when the roots match."],
    `class Solution {
  private final java.util.Map<String, String> parent = new java.util.HashMap<>();
  private final java.util.Map<String, Double> weight = new java.util.HashMap<>();
  public double[] calcEquation(java.util.List<java.util.List<String>> equations, double[] values, java.util.List<java.util.List<String>> queries) {
    for (int i = 0; i < equations.size(); i++) union(equations.get(i).get(0), equations.get(i).get(1), values[i]);
    double[] answer = new double[queries.size()];
    for (int i = 0; i < queries.size(); i++) {
      String a = queries.get(i).get(0);
      String b = queries.get(i).get(1);
      if (!parent.containsKey(a) || !parent.containsKey(b) || !find(a).equals(find(b))) answer[i] = -1.0;
      else answer[i] = weight.get(a) / weight.get(b);
    }
    return answer;
  }
  private void add(String value) {
    parent.putIfAbsent(value, value);
    weight.putIfAbsent(value, 1.0);
  }
  private String find(String value) {
    String direct = parent.get(value);
    if (!direct.equals(value)) {
      String root = find(direct);
      weight.put(value, weight.get(value) * weight.get(direct));
      parent.put(value, root);
    }
    return parent.get(value);
  }
  private void union(String a, String b, double ratio) {
    add(a);
    add(b);
    String rootA = find(a);
    String rootB = find(b);
    if (rootA.equals(rootB)) return;
    parent.put(rootA, rootB);
    weight.put(rootA, ratio * weight.get(b) / weight.get(a));
  }
}`,
  ),
  "network-delay-time": p(
    "Directed weighted edges describe signal travel times among n nodes. Starting from k, return the time until every node receives the signal, or -1 when some node is unreachable.",
    [e("times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", "2", "Node four receives the signal after two time units."), e("times = [[1,2,1]], n = 2, k = 1", "1", "The only other node is one edge away."), e("times = [[1,2,1]], n = 2, k = 2", "-1", "Node one cannot be reached from node two.")],
    ["1 <= k <= n <= 100", "1 <= times.length <= 6000", "Each directed pair is unique.", "0 <= travel time <= 100"],
    "Bellman-Ford relaxes every edge up to n - 1 times. The final maximum finite distance is when the last node receives the signal.",
    "It scans all edges even after most shortest distances are settled.",
    "Time O(VE), space O(V).",
    `class Solution {
  public int networkDelayTime(int[][] times, int n, int k) {
    int[] distance = new int[n + 1];
    java.util.Arrays.fill(distance, 1000000000);
    distance[k] = 0;
    for (int round = 1; round < n; round++) {
      int[] next = distance.clone();
      for (int[] edge : times) if (distance[edge[0]] < 1000000000) next[edge[1]] = Math.min(next[edge[1]], distance[edge[0]] + edge[2]);
      distance = next;
    }
    int answer = 0;
    for (int node = 1; node <= n; node++) answer = Math.max(answer, distance[node]);
    return answer >= 1000000000 ? -1 : answer;
  }
}`,
    "Dijkstra's algorithm uses a min-heap to process the currently earliest signal arrival. The first heap removal for a node fixes its shortest time because all edge weights are nonnegative.",
    "Time O((V + E) log V), space O(V + E).",
    ["Build weighted outgoing adjacency lists.", "Push source time zero into a min-heap.", "Finalize unseen nodes in increasing time, push improved neighbor times, and return the largest finalized distance when all nodes are reached."],
    `class Solution {
  public int networkDelayTime(int[][] times, int n, int k) {
    java.util.List<int[]>[] graph = new java.util.ArrayList[n + 1];
    for (int i = 1; i <= n; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] edge : times) graph[edge[0]].add(new int[]{edge[1], edge[2]});
    java.util.PriorityQueue<int[]> heap = new java.util.PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    heap.offer(new int[]{0, k});
    boolean[] visited = new boolean[n + 1];
    int reached = 0;
    int answer = 0;
    while (!heap.isEmpty()) {
      int[] current = heap.poll();
      int time = current[0];
      int node = current[1];
      if (visited[node]) continue;
      visited[node] = true;
      reached++;
      answer = time;
      for (int[] edge : graph[node]) if (!visited[edge[0]]) heap.offer(new int[]{time + edge[1], edge[0]});
    }
    return reached == n ? answer : -1;
  }
}`,
  ),
  "cheapest-flights-within-k-stops": p(
    "Return the cheapest price from src to dst using at most k intermediate stops, or -1 when no permitted route exists.",
    [e("n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1", "700", "With one stop, route 0 -> 1 -> 3 is cheapest."), e("n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", "200", "One stop permits the route through node one."), e("n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0", "500", "No intermediate stop is allowed.")],
    ["1 <= n <= 100", "0 <= flights.length <= n * (n - 1) / 2", "1 <= price <= 10000", "0 <= src, dst, k < n", "src differs from dst and directed pairs are unique."],
    "Depth-first search every route while tracking edges remaining, visited nodes on the current path, and accumulated price. Keep the cheapest arrival.",
    "The number of permitted paths grows exponentially and many routes reach the same node with the same edge budget.",
    "Exponential time, O(V + E) space.",
    `class Solution {
  private int best = Integer.MAX_VALUE;
  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    java.util.List<int[]>[] graph = new java.util.ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
    for (int[] flight : flights) graph[flight[0]].add(new int[]{flight[1], flight[2]});
    search(src, dst, k + 1, 0, graph, new boolean[n]);
    return best == Integer.MAX_VALUE ? -1 : best;
  }
  private void search(int node, int destination, int edges, int cost, java.util.List<int[]>[] graph, boolean[] path) {
    if (cost >= best) return;
    if (node == destination) {
      best = cost;
      return;
    }
    if (edges == 0) return;
    path[node] = true;
    for (int[] flight : graph[node]) if (!path[flight[0]]) search(flight[0], destination, edges - 1, cost + flight[1], graph, path);
    path[node] = false;
  }
}`,
    "Run exactly k + 1 Bellman-Ford relaxation rounds. Each round reads the previous distance array, so a round adds at most one flight and cannot accidentally exceed the stop limit.",
    "Time O((k + 1)E), space O(V).",
    ["Set source distance to zero and all others to infinity.", "For each permitted flight count, clone the previous distances and relax every edge from the previous array.", "Return the destination distance after k + 1 rounds or -1 when infinite."],
    `class Solution {
  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] distance = new int[n];
    java.util.Arrays.fill(distance, 1000000000);
    distance[src] = 0;
    for (int round = 0; round <= k; round++) {
      int[] next = distance.clone();
      for (int[] flight : flights) if (distance[flight[0]] < 1000000000) next[flight[1]] = Math.min(next[flight[1]], distance[flight[0]] + flight[2]);
      distance = next;
    }
    return distance[dst] >= 1000000000 ? -1 : distance[dst];
  }
}`,
  ),
  "reconstruct-itinerary": p(
    "Use every directed airline ticket exactly once, starting from JFK. Return the lexicographically smallest valid airport itinerary; at least one itinerary exists.",
    [e('tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]", "The only complete ticket order forms this route."), e('tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]", "Among complete routes, this one is lexicographically smallest.")],
    ["1 <= tickets.length <= 300", "Airport codes contain three uppercase letters.", "Every ticket may appear more than once.", "A valid complete itinerary from JFK exists."],
    "Sort tickets by destination and backtrack from JFK, marking each ticket used. Return the first path that consumes every ticket.",
    "Dead-end partial routes can explore permutations of many identical or competing tickets.",
    "Time O(E! * E), space O(E).",
    `class Solution {
  public java.util.List<String> findItinerary(java.util.List<java.util.List<String>> tickets) {
    tickets.sort((a, b) -> a.get(1).compareTo(b.get(1)));
    java.util.List<String> route = new java.util.ArrayList<>();
    route.add("JFK");
    search("JFK", tickets, new boolean[tickets.size()], route);
    return route;
  }
  private boolean search(String airport, java.util.List<java.util.List<String>> tickets, boolean[] used, java.util.List<String> route) {
    if (route.size() == tickets.size() + 1) return true;
    for (int i = 0; i < tickets.size(); i++) if (!used[i] && tickets.get(i).get(0).equals(airport)) {
      used[i] = true;
      route.add(tickets.get(i).get(1));
      if (search(tickets.get(i).get(1), tickets, used, route)) return true;
      route.remove(route.size() - 1);
      used[i] = false;
    }
    return false;
  }
}`,
    "Hierholzer's algorithm follows the smallest available outgoing ticket using a priority queue. An airport is added to the front only after all its outgoing tickets are consumed, which correctly places temporary dead ends.",
    "Time O(E log E), space O(E).",
    ["Map each origin to a min-heap of destinations.", "Recursively consume the smallest outgoing ticket until none remains.", "Add the airport to the front during recursion unwind and return the completed route."],
    `class Solution {
  public java.util.List<String> findItinerary(java.util.List<java.util.List<String>> tickets) {
    java.util.Map<String, java.util.PriorityQueue<String>> graph = new java.util.HashMap<>();
    for (java.util.List<String> ticket : tickets) graph.computeIfAbsent(ticket.get(0), key -> new java.util.PriorityQueue<>()).offer(ticket.get(1));
    java.util.LinkedList<String> route = new java.util.LinkedList<>();
    visit("JFK", graph, route);
    return route;
  }
  private void visit(String airport, java.util.Map<String, java.util.PriorityQueue<String>> graph, java.util.LinkedList<String> route) {
    java.util.PriorityQueue<String> destinations = graph.get(airport);
    while (destinations != null && !destinations.isEmpty()) visit(destinations.poll(), graph, route);
    route.addFirst(airport);
  }
}`,
  ),
  "accounts-merge": p(
    "Each account lists a name followed by emails. Accounts belong to the same person when they share any email, directly or transitively. Return merged accounts with sorted emails.",
    [e('accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', "Three merged accounts", "The first two John rows merge through johnsmith@mail.com; Mary and the other John remain separate."), e('accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Gabe","Gabe3@m.co","Gabe4@m.co"]]', "One merged Gabe account", "The shared Gabe3 email joins both rows.")],
    ["1 <= accounts.length <= 1000", "2 <= accounts[i].length <= 10", "Names and emails have length 1 to 30.", "Each account has no duplicate email and shared emails always have the same name."],
    "Create an undirected graph connecting emails that appear in the same account. DFS each unvisited email component, sort it, and prefix its owner name.",
    "The graph stores two directed adjacency entries for every within-account connection.",
    "Time O(total emails log total emails), space O(total emails).",
    `class Solution {
  public java.util.List<java.util.List<String>> accountsMerge(java.util.List<java.util.List<String>> accounts) {
    java.util.Map<String, java.util.List<String>> graph = new java.util.HashMap<>();
    java.util.Map<String, String> owner = new java.util.HashMap<>();
    for (java.util.List<String> account : accounts) {
      String first = account.get(1);
      graph.computeIfAbsent(first, key -> new java.util.ArrayList<>());
      for (int i = 1; i < account.size(); i++) {
        String email = account.get(i);
        owner.put(email, account.get(0));
        graph.computeIfAbsent(email, key -> new java.util.ArrayList<>());
        if (i > 1) {
          graph.get(first).add(email);
          graph.get(email).add(first);
        }
      }
    }
    java.util.List<java.util.List<String>> answer = new java.util.ArrayList<>();
    java.util.Set<String> visited = new java.util.HashSet<>();
    for (String email : graph.keySet()) if (visited.add(email)) {
      java.util.List<String> component = new java.util.ArrayList<>();
      collect(email, graph, visited, component);
      java.util.Collections.sort(component);
      component.add(0, owner.get(email));
      answer.add(component);
    }
    return answer;
  }
  private void collect(String email, java.util.Map<String, java.util.List<String>> graph, java.util.Set<String> visited, java.util.List<String> component) {
    component.add(email);
    for (String next : graph.get(email)) if (visited.add(next)) collect(next, graph, visited, component);
  }
}`,
    "Union account indices whenever an email has appeared before. Then group every email by its account root, sort each group, and use the root account's name.",
    "Time O(total emails alpha(accounts) + total emails log total emails), space O(total emails).",
    ["Map each first-seen email to an account index.", "Union the current account with the prior owner of every repeated email.", "Group emails by compressed account root, sort them, and prefix the corresponding name."],
    `class Solution {
  public java.util.List<java.util.List<String>> accountsMerge(java.util.List<java.util.List<String>> accounts) {
    int[] parent = new int[accounts.size()];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    java.util.Map<String, Integer> emailOwner = new java.util.HashMap<>();
    for (int account = 0; account < accounts.size(); account++) for (int i = 1; i < accounts.get(account).size(); i++) {
      String email = accounts.get(account).get(i);
      if (emailOwner.containsKey(email)) parent[find(parent, account)] = find(parent, emailOwner.get(email));
      else emailOwner.put(email, account);
    }
    java.util.Map<Integer, java.util.List<String>> groups = new java.util.HashMap<>();
    for (java.util.Map.Entry<String, Integer> entry : emailOwner.entrySet()) groups.computeIfAbsent(find(parent, entry.getValue()), key -> new java.util.ArrayList<>()).add(entry.getKey());
    java.util.List<java.util.List<String>> answer = new java.util.ArrayList<>();
    for (java.util.Map.Entry<Integer, java.util.List<String>> entry : groups.entrySet()) {
      java.util.Collections.sort(entry.getValue());
      entry.getValue().add(0, accounts.get(entry.getKey()).get(0));
      answer.add(entry.getValue());
    }
    return answer;
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
  ),
  "min-cost-to-connect-all-points": p(
    "Connect every point in the plane with minimum total Manhattan edge cost. Any connected network is allowed.",
    [e("points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", "20", "A minimum spanning tree connects all five points for total cost twenty."), e("points = [[3,12],[-2,5],[-4,1]]", "18", "The cheapest spanning connection costs eighteen.")],
    ["1 <= points.length <= 1000", "-10^6 <= x, y <= 10^6", "All points are distinct."],
    "Generate all pairwise Manhattan edges, sort them, and use Kruskal's algorithm to add the cheapest edge that connects two different components.",
    "Storing and sorting O(n squared) edges uses substantial memory and O(n squared log n) time.",
    "Time O(n^2 log n), space O(n^2).",
    `class Solution {
  public int minCostConnectPoints(int[][] points) {
    java.util.List<int[]> edges = new java.util.ArrayList<>();
    for (int i = 0; i < points.length; i++) for (int j = i + 1; j < points.length; j++) edges.add(new int[]{distance(points[i], points[j]), i, j});
    edges.sort((a, b) -> Integer.compare(a[0], b[0]));
    int[] parent = new int[points.length];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    int cost = 0;
    int used = 0;
    for (int[] edge : edges) {
      int a = find(parent, edge[1]);
      int b = find(parent, edge[2]);
      if (a == b) continue;
      parent[a] = b;
      cost += edge[0];
      if (++used == points.length - 1) break;
    }
    return cost;
  }
  private int distance(int[] a, int[] b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }
  private int find(int[] parent, int value) {
    if (parent[value] != value) parent[value] = find(parent, parent[value]);
    return parent[value];
  }
}`,
    "Prim's algorithm grows one tree. Keep each unconnected point's cheapest edge to the current tree, choose the smallest distance next, and update distances using the newly added point without storing all edges.",
    "Time O(n^2), space O(n).",
    ["Initialize every connection cost to infinity except point zero.", "Repeatedly choose the unused point with smallest current cost and add that cost.", "Relax the Manhattan distance from the new point to every unused point."],
    `class Solution {
  public int minCostConnectPoints(int[][] points) {
    int n = points.length;
    int[] minimum = new int[n];
    java.util.Arrays.fill(minimum, Integer.MAX_VALUE);
    minimum[0] = 0;
    boolean[] used = new boolean[n];
    int cost = 0;
    for (int count = 0; count < n; count++) {
      int next = -1;
      for (int i = 0; i < n; i++) if (!used[i] && (next == -1 || minimum[i] < minimum[next])) next = i;
      used[next] = true;
      cost += minimum[next];
      for (int i = 0; i < n; i++) if (!used[i]) {
        int distance = Math.abs(points[next][0] - points[i][0]) + Math.abs(points[next][1] - points[i][1]);
        minimum[i] = Math.min(minimum[i], distance);
      }
    }
    return cost;
  }
}`,
  ),
  "critical-connections-in-a-network": p(
    "Return every undirected edge whose removal disconnects the connected network. Such edges are bridges, and output order does not matter.",
    [e("n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]", "[[1,3]]", "The triangle remains connected without any one triangle edge, but node three depends on edge 1-3."), e("n = 2, connections = [[0,1]]", "[[0,1]]", "The only edge is a bridge.")],
    ["2 <= n <= 100000", "n - 1 <= connections.length <= 100000", "The graph is connected, simple, and contains no duplicate edges."],
    "Remove each edge in turn and DFS from one endpoint. If the other endpoint becomes unreachable, record the removed edge as critical.",
    "A complete graph traversal per edge takes quadratic graph time.",
    "Time O(E * (V + E)), space O(V + E).",
    `class Solution {
  public java.util.List<java.util.List<Integer>> criticalConnections(int n, java.util.List<java.util.List<Integer>> connections) {
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    for (int skipped = 0; skipped < connections.size(); skipped++) {
      java.util.List<Integer>[] graph = new java.util.ArrayList[n];
      for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
      for (int i = 0; i < connections.size(); i++) if (i != skipped) {
        int a = connections.get(i).get(0);
        int b = connections.get(i).get(1);
        graph[a].add(b);
        graph[b].add(a);
      }
      int start = connections.get(skipped).get(0);
      int target = connections.get(skipped).get(1);
      boolean[] visited = new boolean[n];
      visit(start, graph, visited);
      if (!visited[target]) answer.add(connections.get(skipped));
    }
    return answer;
  }
  private void visit(int node, java.util.List<Integer>[] graph, boolean[] visited) {
    visited[node] = true;
    for (int next : graph[node]) if (!visited[next]) visit(next, graph, visited);
  }
}`,
    "Tarjan DFS records each node's discovery time and the earliest discovery reachable through its subtree. A tree edge is a bridge exactly when the child's low value is greater than the parent's discovery time.",
    "Time O(V + E), space O(V + E).",
    ["Build undirected adjacency and assign discovery times during DFS.", "After visiting a child, propagate its low-link value upward.", "Record the edge when child low is greater than the current discovery time; ignore only the direct parent edge."],
    `class Solution {
  private int time;
  public java.util.List<java.util.List<Integer>> criticalConnections(int n, java.util.List<java.util.List<Integer>> connections) {
    java.util.List<Integer>[] graph = new java.util.ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
    for (java.util.List<Integer> edge : connections) {
      graph[edge.get(0)].add(edge.get(1));
      graph[edge.get(1)].add(edge.get(0));
    }
    int[] discovery = new int[n];
    int[] low = new int[n];
    java.util.Arrays.fill(discovery, -1);
    java.util.List<java.util.List<Integer>> answer = new java.util.ArrayList<>();
    dfs(0, -1, graph, discovery, low, answer);
    return answer;
  }
  private void dfs(int node, int parent, java.util.List<Integer>[] graph, int[] discovery, int[] low, java.util.List<java.util.List<Integer>> answer) {
    discovery[node] = low[node] = time++;
    for (int next : graph[node]) {
      if (next == parent) continue;
      if (discovery[next] == -1) {
        dfs(next, node, graph, discovery, low, answer);
        low[node] = Math.min(low[node], low[next]);
        if (low[next] > discovery[node]) answer.add(java.util.Arrays.asList(node, next));
      } else {
        low[node] = Math.min(low[node], discovery[next]);
      }
    }
  }
}`,
  ),
  "alien-dictionary": p(
    "A sorted list of words follows an unknown lowercase alphabet. Return any character order consistent with the list, or an empty string when the ordering is invalid.",
    [e('words = ["wrt","wrf","er","ett","rftt"]', '"wertf"', "The first differing characters create constraints w<e, e<r, r<t, and t<f."), e('words = ["z","x"]', '"zx"', "The words require z before x."), e('words = ["z","x","z"]', '""', "The constraints contain a cycle.")],
    ["1 <= words.length <= 100", "1 <= words[i].length <= 100", "Words contain lowercase English letters."],
    "Collect all distinct letters, generate their permutations, and return the first order under which every adjacent word pair is correctly sorted.",
    "The number of possible alphabets is factorial in the distinct character count.",
    "Time O(C! * total characters), space O(C).",
    `class Solution {
  public String alienOrder(String[] words) {
    java.util.Set<Character> unique = new java.util.TreeSet<>();
    for (String word : words) for (char c : word.toCharArray()) unique.add(c);
    char[] letters = new char[unique.size()];
    int index = 0;
    for (char c : unique) letters[index++] = c;
    return permute(letters, 0, words);
  }
  private String permute(char[] letters, int index, String[] words) {
    if (index == letters.length) return valid(letters, words) ? new String(letters) : "";
    for (int i = index; i < letters.length; i++) {
      char value = letters[index];
      letters[index] = letters[i];
      letters[i] = value;
      String answer = permute(letters, index + 1, words);
      value = letters[index];
      letters[index] = letters[i];
      letters[i] = value;
      if (!answer.isEmpty()) return answer;
    }
    return "";
  }
  private boolean valid(char[] letters, String[] words) {
    int[] position = new int[26];
    for (int i = 0; i < letters.length; i++) position[letters[i] - 'a'] = i;
    for (int i = 0; i + 1 < words.length; i++) {
      String a = words[i];
      String b = words[i + 1];
      int length = Math.min(a.length(), b.length());
      int j = 0;
      while (j < length && a.charAt(j) == b.charAt(j)) j++;
      if (j == length) {
        if (a.length() > b.length()) return false;
      } else if (position[a.charAt(j) - 'a'] > position[b.charAt(j) - 'a']) return false;
    }
    return true;
  }
}`,
    "Compare adjacent words and add one directed edge from their first differing characters. Reject a longer word preceding its exact prefix, then topologically sort all observed characters.",
    "Time O(total characters + C + E), space O(C + E).",
    ["Create a vertex for every observed character.", "From each adjacent word pair, reject an invalid prefix or add the first-difference edge once.", "Topologically process zero-indegree characters and return empty if a cycle prevents using all characters."],
    `class Solution {
  public String alienOrder(String[] words) {
    java.util.Map<Character, java.util.Set<Character>> graph = new java.util.HashMap<>();
    java.util.Map<Character, Integer> indegree = new java.util.HashMap<>();
    for (String word : words) for (char c : word.toCharArray()) {
      graph.putIfAbsent(c, new java.util.HashSet<>());
      indegree.putIfAbsent(c, 0);
    }
    for (int i = 0; i + 1 < words.length; i++) {
      String first = words[i];
      String second = words[i + 1];
      int length = Math.min(first.length(), second.length());
      int index = 0;
      while (index < length && first.charAt(index) == second.charAt(index)) index++;
      if (index == length) {
        if (first.length() > second.length()) return "";
      } else {
        char from = first.charAt(index);
        char to = second.charAt(index);
        if (graph.get(from).add(to)) indegree.put(to, indegree.get(to) + 1);
      }
    }
    java.util.PriorityQueue<Character> queue = new java.util.PriorityQueue<>();
    for (char c : indegree.keySet()) if (indegree.get(c) == 0) queue.offer(c);
    StringBuilder order = new StringBuilder();
    while (!queue.isEmpty()) {
      char current = queue.poll();
      order.append(current);
      for (char next : graph.get(current)) {
        indegree.put(next, indegree.get(next) - 1);
        if (indegree.get(next) == 0) queue.offer(next);
      }
    }
    return order.length() == indegree.size() ? order.toString() : "";
  }
}`,
  ),
};
