export default {
  id: 'reconstruct-itinerary',
  title: 'Reconstruct Itinerary',
  difficulty: 'hard',
  description: 'Given a list of airline tickets as <code>[from, to]</code> pairs, reconstruct the itinerary starting from "JFK". All tickets must be used exactly once. Return the lexicographically smallest valid itinerary.',
  examples: [
    { input: 'tickets=[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' },
  ],
  constraints: ['1 ≤ tickets.length ≤ 300', 'tickets[i].length == 2', 'All airport codes are 3 uppercase letters', 'A valid itinerary is guaranteed to exist'],
  starterCode: `def find_itinerary(tickets):
  pass`,
  functionName: 'find_itinerary',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Linear path', args: [[['MUC','LHR'],['JFK','MUC'],['SFO','SJC'],['LHR','SFO']]], expected: ['JFK','MUC','LHR','SFO','SJC'] },
    { label: 'Simple', args: [[['JFK','ATL'],['ATL','JFK'],['JFK','SFO']]], expected: ['JFK','ATL','JFK','SFO'] },
  ],
  bruteHint: 'Describe a brute-force approach that tries every permutation of tickets and checks which forms a valid itinerary, and its time complexity',
  optimizeHint: 'Name the classic algorithm for finding a path that uses every edge exactly once',
  clues: [
    {
      id: 'constraint-use-all-tickets',
      question: 'All tickets must be used exactly once. What kind of graph problem is this?',
      options: [
        { label: 'Shortest path (Dijkstra)', isCorrect: false, feedback: 'Dijkstra finds the lowest-cost path between two nodes — it doesn\'t require using every edge. This problem requires traversing every edge exactly once, which is a different graph property.' },
        { label: 'Eulerian path — traverse every edge once', isCorrect: true },
        { label: 'Topological sort of airports', isCorrect: false, feedback: 'Topological sort orders nodes, not edges, and applies to DAGs. Here, the graph may have cycles (you can fly back and forth), and the requirement is about edges (tickets), not a node ordering.' },
        { label: 'Hamiltonian path — visit every node once', isCorrect: false, feedback: 'A Hamiltonian path visits every node exactly once — that\'s NP-hard in general. This problem requires every edge (ticket) exactly once, which is an Eulerian path — solvable in polynomial time.' },
      ],
      correctFeedback: 'Using every ticket exactly once is the definition of an Eulerian path. Hierholzer\'s algorithm finds one efficiently and can be adapted to prefer the lexicographically smallest next destination.',
      wrongFeedback: [
        'The requirement is about edges (tickets), not nodes (airports). What graph path property involves traversing every edge exactly once?',
        'Eulerian path: every edge exactly once. Hamiltonian path: every node exactly once. Which applies when tickets are edges?',
      ],
    },
    {
      id: 'lexicographic-order',
      question: 'The output must be the lexicographically smallest valid itinerary. What does this require?',
      options: [
        { label: 'Sort destinations for each airport', isCorrect: true },
        { label: 'Try all permutations of tickets', isCorrect: false, feedback: 'With up to 300 tickets, permutations are factorial — entirely infeasible. Lexicographic smallest is achieved greedily: always take the smallest available destination from each airport.' },
        { label: 'Sort all tickets globally by destination', isCorrect: false, feedback: 'Global sorting doesn\'t capture per-airport choices. From each airport you want the smallest available next destination — that requires sorting per source, not globally.' },
        { label: 'BFS with lexicographic comparison', isCorrect: false, feedback: 'BFS would find all reachable states, but you need to construct a specific sequence using all edges. The lexicographic preference is a local greedy choice within a depth-first construction.' },
      ],
      correctFeedback: 'Sort each airport\'s destination list alphabetically before starting. Then always pick the smallest available destination first — this greedy choice, combined with Hierholzer\'s algorithm, yields the lexicographically smallest Eulerian path.',
      wrongFeedback: [
        'At each airport you choose which ticket to use next. To get the globally smallest itinerary, what should you choose locally at each step?',
        'Pre-sort the destinations available from each airport alphabetically. Then always pick the first one available — the greedy local choice produces the globally smallest result here.',
      ],
    },
    {
      id: 'valid-itinerary-guarantee',
      question: 'A valid itinerary is guaranteed to exist. What does this let you skip?',
      options: [
        { label: 'Checking whether the graph is connected', isCorrect: false, feedback: 'Connectivity is implied by the guarantee, but the more concrete thing you skip is handling the no-solution case. You don\'t need to detect or report impossibility.' },
        { label: 'No need to handle the impossible case', isCorrect: true },
        { label: 'No need to sort destinations', isCorrect: false, feedback: 'The guarantee tells you a solution exists — it says nothing about uniqueness or ordering. You still need to sort destinations to find the lexicographically smallest one.' },
        { label: 'No need to track which tickets are used', isCorrect: false, feedback: 'You absolutely must track which tickets are used — "exactly once" is a hard constraint. The guarantee only removes the need to handle the case where no valid itinerary exists.' },
      ],
      correctFeedback: 'The guarantee removes the dead code branch: you never need to return an empty list or signal failure. Your algorithm can assume it will always produce a valid result.',
      wrongFeedback: [
        'The problem says a valid answer always exists. What is the one kind of output your code never has to produce?',
        'Guarantees are permissions. This one permits you to skip the "no solution found" branch entirely.',
      ],
    },
    {
      id: 'post-order-construction',
      question: 'Hierholzer\'s algorithm builds the path by appending airports after all their outgoing edges are exhausted. Why append in post-order rather than pre-order?',
      options: [
        { label: 'Pre-order gives the correct sequence directly', isCorrect: false, feedback: 'Pre-order appending fails when you hit a dead-end mid-traversal — you\'d record the dead-end airport before all the edges that should precede it in the itinerary. Post-order and reversal corrects this.' },
        { label: 'Post-order handles dead-ends and cycles correctly', isCorrect: true },
        { label: 'Airports must be sorted before insertion', isCorrect: false, feedback: 'Sorting destinations happens before traversal to enforce lexicographic order. The post-order insertion is a separate concern: it handles the case where a node is a dead-end in a sub-cycle.' },
        { label: 'Post-order avoids revisiting airports', isCorrect: false, feedback: 'Post-order doesn\'t prevent revisiting — the same airport can appear multiple times in the itinerary. It handles the ordering problem: sub-cycles must be placed before the nodes that lead into them.' },
      ],
      correctFeedback: 'When DFS hits a dead-end (no more edges), that node is appended to the result. After the full traversal, reversing the list gives the correct forward itinerary. This correctly handles sub-cycles that branch off the main path.',
      wrongFeedback: [
        'Imagine you\'re at JFK and you can go to ATL or SFO. If you go to ATL first and get stuck in a sub-cycle, you need ATL\'s sub-cycle to appear before SFO in the final itinerary. How does post-order insertion achieve that?',
        'Post-order: add a node only after all its edges are exhausted, then reverse the whole list. What problem does this solve when the path branches into a cycle before continuing?',
      ],
    },
  ],
}
