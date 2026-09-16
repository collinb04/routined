export default {
  id: 'minimum-genetic-mutation',
  title: 'Minimum Genetic Mutation',
  difficulty: 'medium',
  description: 'A gene string is a sequence of 8 characters from A, C, G, T. A mutation changes one character. Given a start gene, end gene, and a gene bank (valid mutations), find the minimum mutations from start to end, or -1 if impossible.',
  examples: [
    { input: 'startGene="AACCGGTT", endGene="AACCGGTA", bank=["AACCGGTA"]', output: '1' },
    { input: 'startGene="AACCGGTT", endGene="AAACGGTA", bank=["AACCGGTA","AACCGCTA","AAACGGTA"]', output: '2' },
  ],
  constraints: ['startGene.length == endGene.length == bank[i].length == 8', '0 ≤ bank.length ≤ 10'],
  starterCode: `class Solution:
    def min_mutation(self, start_gene, end_gene, bank):
        pass`,
  runnerSetup: 'min_mutation = Solution().min_mutation',
  functionName: 'min_mutation',
  conceptId: 'graphs',
  testCases: [
    { label: '1 mutation', args: ['AACCGGTT','AACCGGTA',['AACCGGTA']], expected: 1 },
    { label: '2 mutations', args: ['AACCGGTT','AAACGGTA',['AACCGGTA','AACCGCTA','AAACGGTA']], expected: 2 },
    { label: 'Impossible', args: ['AACCGGTT','AAACGGTA',['AACCGGTA']], expected: -1 },
  ],
  bruteHint: 'A brute-force approach explores mutation sequences with DFS, following one chain of one-character changes as deep as possible before backtracking, without tracking how many steps each path took to reach a valid gene. Because DFS finds *a* path to endGene without comparing it against shorter alternatives, it can return a valid but non-minimal mutation count, or waste time exploring long chains before stumbling onto a short one. With up to 10 bank genes and 8 positions × 3 possible substitutions per position, the search space is small, but depth-first order still gives no guarantee about which path it finds first. How could you guarantee that the first time you reach endGene, you\'ve used the fewest possible mutations?',
  optimizeComplexity: { time: 'O(n · m)', space: 'O(n)' },
  clues: [
    {
      id: 'minimum-mutations',
      highlight: { location: 'description', text: 'find the minimum mutations from start to end' },
      question: 'The way a problem phrases its goal often points directly at which graph-traversal algorithm applies. "Find the minimum number of mutations" — what algorithm finds shortest paths in an unweighted graph?',
      options: [
        { label: 'DFS with backtracking', isCorrect: false, feedback: 'DFS explores one path fully before trying others — it finds a path, not necessarily the shortest one. Minimum steps requires exploring all paths at equal depth before going deeper.' },
        { label: 'BFS, expanding one mutation at a time', isCorrect: true },
        { label: 'Dijkstra with mutation count as weight', isCorrect: false, feedback: 'Dijkstra handles weighted edges. Every mutation here costs exactly 1 step, making it an unweighted graph — BFS handles that directly and with less overhead.' },
        { label: 'Greedy: always pick the gene closest to endGene', isCorrect: false, feedback: 'Greedy local choices can lead into dead ends not in the bank. The bank constrains which mutations are valid — you need to explore all reachable neighbors, not just the one that looks closest.' },
      ],
      correctFeedback: 'BFS explores all genes reachable in 1 mutation, then all reachable in 2, and so on. The first time you reach endGene, that level count is the minimum.',
      wrongFeedback: [
        'Each mutation is one step. You want the fewest steps total. Which traversal guarantees you find the shortest path in an unweighted graph?',
        'Think of each gene string as a node and each valid one-character change as an edge. The graph is unweighted — all edges cost 1. What algorithm finds shortest paths in that setting?',
      ],
    },
    {
      id: 'bank-constraint',
      highlight: { location: 'description', text: 'a gene bank (valid mutations)' },
      question: 'The description also specifies exactly which states are legal to visit, shaping how you model the graph itself. Every intermediate gene must be in the bank. What does that mean for the graph structure?',
      options: [
        { label: 'The bank is the set of valid nodes to visit', isCorrect: true },
        { label: 'Each bank entry is an edge, not a node', isCorrect: false, feedback: 'Bank entries are gene strings — they represent states (nodes), not transitions. An edge exists between two genes when they differ by exactly one character and both are reachable.' },
        { label: 'The bank defines which characters can appear', isCorrect: false, feedback: 'The characters are always A, C, G, T — that\'s given by the alphabet. The bank restricts which specific 8-character strings are valid intermediate states.' },
        { label: 'The bank is irrelevant if a direct path exists', isCorrect: false, feedback: 'There is no direct path — every step must land on a bank gene. A one-character change that produces a string not in the bank is an invalid mutation and cannot be used.' },
      ],
      correctFeedback: 'Only genes in the bank (plus startGene) are valid nodes. Mutations that produce strings outside the bank are illegal — convert the bank to a set for O(1) membership checks.',
      wrongFeedback: [
        'You can only mutate to genes listed in the bank. How does that constrain which nodes are reachable in BFS?',
        'Think of the bank as a whitelist. What happens if you try to visit a gene not on it?',
      ],
    },
    {
      id: 'small-bank',
      highlight: { location: 'constraint', text: '0 ≤ bank.length ≤ 10' },
      question: 'Small constraint bounds can be a signal that a naive approach is perfectly acceptable, freeing you from premature optimization. bank.length ≤ 10 and gene length is exactly 8. What does the small bank size tell you?',
      options: [
        { label: 'At most 10 nodes in the graph', isCorrect: false, feedback: 'startGene is also a node (11 total at most), but the key insight is that with at most 10 valid intermediate genes, the search space is tiny — even brute force would work here.' },
        { label: 'The search space is tiny — no pruning needed', isCorrect: true },
        { label: 'You should precompute all pairwise distances', isCorrect: false, feedback: 'With at most 10+1 nodes, BFS finishes immediately. Precomputing all-pairs distances is unnecessary overhead for a graph this small.' },
        { label: 'Gene strings must be stored as integers for speed', isCorrect: false, feedback: 'String comparison is fast for length-8 strings, and with at most 10 bank entries the total work is negligible. No bit-packing or integer encoding is needed.' },
      ],
      correctFeedback: 'With at most 10 bank entries, BFS visits at most 11 nodes. Even generating all 8×3 = 24 one-character neighbors per node is trivial — the constraint frees you from any optimization concern.',
      wrongFeedback: [
        'How many nodes can BFS visit at most given bank.length ≤ 10?',
        'With 10 valid intermediate genes and gene length 8, what is the maximum total work BFS could do?',
      ],
    },
    {
      id: 'impossible-case',
      highlight: { location: 'description', text: 'or -1 if impossible' },
      question: 'The description\'s failure-case wording tells you exactly when your algorithm should give up and what it should return. The function returns -1 when the end gene is unreachable. When does this happen?',
      options: [
        { label: 'When endGene is not in the bank', isCorrect: true },
        { label: 'When startGene equals endGene', isCorrect: false, feedback: 'If start equals end, the answer is 0 mutations — not -1. The -1 case is specifically when no valid path exists through the bank to reach endGene.' },
        { label: 'When the bank contains duplicate entries', isCorrect: false, feedback: 'Duplicates in the bank don\'t affect reachability — they\'re redundant nodes. The -1 case is when endGene cannot be reached, which happens when it isn\'t a valid bank gene.' },
        { label: 'When more than one mutation is required', isCorrect: false, feedback: 'Multiple mutations are fine — BFS handles paths of any length. The -1 case means the target is completely unreachable, not that the path is long.' },
      ],
      correctFeedback: 'Since every intermediate and final gene must be in the bank, if endGene is not in the bank it can never be reached — return -1 immediately. BFS also returns -1 when the queue empties without finding endGene.',
      wrongFeedback: [
        'Every valid mutation must land on a bank gene. What must be true of endGene for a solution to exist?',
        'If endGene is not in the bank, can you ever reach it through valid mutations? What should you return immediately in that case?',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def min_mutation(self, start_gene, end_gene, bank):
        bank_set = set(bank)
        if end_gene not in bank_set:
            return -1

        queue = deque([(start_gene, 0)])
        visited = {start_gene}
        while queue:
            gene, steps = queue.popleft()
            if gene == end_gene:
                return steps
            for i in range(len(gene)):
                for c in 'ACGT':
                    if c != gene[i]:
                        mutated = gene[:i] + c + gene[i+1:]
                        if mutated in bank_set and mutated not in visited:
                            visited.add(mutated)
                            queue.append((mutated, steps + 1))
        return -1`,
  solutionComplexity: { time: 'O(L · 4 · N)', space: 'O(N · L)' },
  solutionCaveat: 'Checking <code>end_gene not in bank_set</code> up front is not just an optimization — since every intermediate and final gene visited must be a member of the bank, a target gene missing from the bank is provably unreachable, so returning <code>-1</code> immediately is correct, not just faster.',
  solutionExplanation: 'Treating each valid single-character mutation as an edge to another bank gene turns this into an unweighted shortest-path problem, which BFS solves optimally: the first time <code>end_gene</code> is dequeued, the <code>steps</code> value it carries is the minimum number of mutations, since BFS explores genes in strictly increasing distance order. Generating every one-character variant of the current gene and filtering to only those actually present in the bank keeps the branching factor bounded to <code>gene length × 3</code> alternative bases per position.',
}
