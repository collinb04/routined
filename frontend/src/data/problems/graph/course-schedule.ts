export default {
  id: 'course-schedule',
  title: 'Course Schedule',
  difficulty: 'medium',
  description: 'There are <code>numCourses</code> courses labeled 0 to numCourses-1. <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before <code>a</code>. Return <code>true</code> if you can finish all courses (no cycle exists).',
  examples: [
    { input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true', explanation: 'Take 0 then 1.' },
    { input: 'numCourses=2, prerequisites=[[1,0],[0,1]]', output: 'false', explanation: 'Cycle: 0→1→0.' },
  ],
  constraints: [
    '1 ≤ numCourses ≤ 2000',
    '0 ≤ prerequisites.length ≤ 5000',
  ],
  starterCode: `class Solution:
    def can_finish(self, num_courses, prerequisites):
        # Hint: build adjacency list + in-degree array, use Kahn's BFS algorithm
        pass`,
  runnerSetup: 'can_finish = Solution().can_finish',
  functionName: 'can_finish',
  conceptId: 'topological-sort',
  testCases: [
    { label: 'Simple dep', args: [2, [[1,0]]], expected: true },
    { label: 'Cycle', args: [2, [[1,0],[0,1]]], expected: false },
    { label: 'No deps', args: [3, []], expected: true },
    { label: 'Linear chain', args: [4, [[1,0],[2,1],[3,2]]], expected: true },
    { label: 'Diamond cycle', args: [4, [[1,0],[2,1],[3,2],[1,3]]], expected: false },
  ],
  bruteHint: 'A brute-force approach could check every pair of courses directly, tracing a chain of prerequisites from one course back toward itself to spot a circular dependency. With up to 2000 courses, exhaustively tracing dependency chains between all pairs balloons toward O(numCourses^2) or worse, well beyond the O(V + E) a single graph traversal would cost. Could you instead process each course and each prerequisite edge exactly once, letting the graph structure itself reveal a cycle?',
  optimizeComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  clues: [
    {
      id: 'boolean-output',
      question: 'Many graph problems collapse into checking for a single structural property once you look past the surface-level output type. The output is true or false — can you finish all courses? What single graph property does this reduce to?',
      highlight: { location: 'description', text: 'Return <code>true</code> if you can finish all courses (no cycle exists).' },
      options: [
        { label: 'Whether the graph is connected', isCorrect: false, feedback: 'Connectivity asks if every node can reach every other. Here courses can be completely independent with no prerequisites — disconnected components are fine as long as no circular dependency exists.' },
        { label: 'Whether the prerequisite graph has a cycle', isCorrect: true },
        { label: 'Whether any course has more than one prerequisite', isCorrect: false, feedback: 'A course can require many prerequisites and still be completable. Only a circular dependency — where A requires B and B requires A, directly or transitively — makes completion impossible.' },
        { label: 'Whether prerequisites.length < numCourses', isCorrect: false, feedback: 'The count relationship between edges and nodes doesn\'t determine feasibility. A single edge [0,1],[1,0] with 2 courses is impossible; 5000 edges with 2000 courses could be perfectly feasible.' },
      ],
      correctFeedback: 'If the prerequisite graph contains a cycle, no valid ordering exists — some course in the cycle can never be taken first. Detecting a cycle is the entire problem.',
      wrongFeedback: [
        'Think about what makes it impossible to finish: what graph structure means "course A requires B, which requires A"?',
        'You can finish all courses if and only if a valid ordering exists. A valid ordering exists if and only if what property holds in the graph?',
      ],
    },
    {
      id: 'prerequisite-direction',
      question: 'The direction you assign each edge while building the graph determines whether in-degree counts and traversal order come out correct. [a, b] means take b before a. In your adjacency list, which direction should edges point?',
      highlight: { location: 'description', text: '<code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before <code>a</code>.' },
      options: [
        { label: 'From a to b — a points to what it needs', isCorrect: false, feedback: 'If edges point from a to b, then in-degree counts how many courses depend on a, not how many prerequisites a has. Kahn\'s algorithm needs edges pointing from prerequisite to dependent — from b to a.' },
        { label: 'Both directions — prerequisites are mutual', isCorrect: false, feedback: 'Prerequisites are strictly directed: b must come before a, not the other way around. Making edges undirected would incorrectly imply a requires b and b requires a simultaneously.' },
        { label: 'From b to a — completing b unlocks a', isCorrect: true },
        { label: 'Direction doesn\'t matter for cycle detection', isCorrect: false, feedback: 'Direction matters critically. In Kahn\'s, when b is processed you need to know which courses it unlocks — that means outgoing edges from b to its dependents. Wrong direction means wrong in-degree counts.' },
      ],
      correctFeedback: 'Edge b → a means "finishing b makes a one step closer to being available." When Kahn\'s processes b, it traverses its outgoing edges and decrements in-degree for each dependent.',
      wrongFeedback: [
        'In Kahn\'s BFS, when you process a node you reduce the in-degree of everything it unlocks. Which node is "finished" and which node is "now closer to ready" in the pair [a, b]?',
        'In-degree of a course = number of prerequisites it still needs. Which direction of edge causes a\'s in-degree to be the count of its prerequisites?',
      ],
    },
    {
      id: 'cycle-detection-mechanism',
      question: 'Knowing exactly how an algorithm signals failure internally is what lets you translate its final state into the correct answer. In Kahn\'s algorithm, how do you know a cycle exists after BFS finishes?',
      options: [
        { label: 'Some node\'s in-degree never reached 0', isCorrect: true },
        { label: 'The queue became empty before processing any node', isCorrect: false, feedback: 'The queue starts with all in-degree-0 nodes. If there are any such nodes, the queue is never initially empty. An empty final queue alone doesn\'t signal a cycle — you need to compare processed count to numCourses.' },
        { label: 'Any node was visited more than once', isCorrect: false, feedback: 'In Kahn\'s, each node enters the queue exactly once (when its in-degree hits 0). Revisiting is not the mechanism — the cycle signal is that some nodes never reach in-degree 0 at all.' },
        { label: 'prerequisites.length equals numCourses', isCorrect: false, feedback: 'The edge-to-node ratio has no direct connection to cycle existence. A cycle is detected by checking how many courses Kahn\'s actually processed — fewer than numCourses means the rest are stuck in a cycle.' },
      ],
      correctFeedback: 'Nodes in a cycle always have in-degree ≥ 1 among themselves, so they never enter the queue. After BFS, if processed_count < numCourses, the remaining nodes form a cycle — return false.',
      wrongFeedback: [
        'After Kahn\'s BFS finishes, compare how many courses were processed to numCourses. What does a shortfall mean about the unprocessed courses?',
        'Nodes in a cycle can\'t have their in-degree reduced to 0 by each other. If some courses are never processed, what structural property do they share?',
      ],
    },
    {
      id: 'constraint-size',
      question: 'Checking the actual input bounds tells you whether a clean O(V + E) approach is required or a slower one would still pass. numCourses ≤ 2000 and up to 5000 prerequisites. What is the complexity of Kahn\'s algorithm here?',
      highlight: { location: 'constraint', text: '1 ≤ numCourses ≤ 2000' },
      options: [
        { label: 'O(V²) — checking all pairs of courses', isCorrect: false, feedback: 'At V = 2000, O(V²) is 4 million operations — not necessary. Kahn\'s processes each node once and each edge once, giving O(V + E) ≈ 7000 operations here.' },
        { label: 'O(V + E) — each node and edge processed once', isCorrect: true },
        { label: 'O(E log V) — sorting edges by in-degree', isCorrect: false, feedback: 'Kahn\'s doesn\'t sort edges. It uses a queue to process nodes as their in-degree hits 0 — each edge is touched once to decrement a counter, giving O(V + E) without any sorting.' },
        { label: 'O(V!) — trying all possible orderings', isCorrect: false, feedback: 'Brute-force permutation search would be factorial — catastrophically slow at V = 2000. Kahn\'s builds a valid ordering in a single BFS pass: O(V + E).' },
      ],
      correctFeedback: 'With V = 2000 and E = 5000, O(V + E) ≈ 7000 operations. Kahn\'s processes each node once (when it enters the queue) and each edge once (when its source is dequeued).',
      wrongFeedback: [
        'In Kahn\'s BFS, each node enters the queue exactly once and each edge is traversed exactly once. What does that give you in terms of V and E?',
        'V + E here is about 7000. What time complexity processes each of V nodes and each of E edges exactly once?',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def can_finish(self, num_courses, prerequisites):
        adj = [[] for _ in range(num_courses)]
        indegree = [0] * num_courses
        for course, pre in prerequisites:
            adj[pre].append(course)
            indegree[course] += 1
        queue = deque([c for c in range(num_courses) if indegree[c] == 0])
        visited = 0
        while queue:
            node = queue.popleft()
            visited += 1
            for nxt in adj[node]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        return visited == num_courses`,
  solutionComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  solutionCaveat: 'If the queue empties before every course has been visited, whatever\'s left over must be stuck in a cycle — courses that depend on each other in a loop can never reach indegree 0, so they never make it into the queue at all.',
  solutionExplanation: 'Courses with no unfinished prerequisites (indegree 0) can always be taken right away, and taking one frees up every course that depended on it — decrementing their indegree. That\'s Kahn\'s algorithm: repeatedly peel off the courses that are currently free, which is only possible for every course if the whole dependency graph has no cycle. Counting how many courses actually got processed and comparing it to the total is a clean way to detect whether anything got left stuck.',
}
