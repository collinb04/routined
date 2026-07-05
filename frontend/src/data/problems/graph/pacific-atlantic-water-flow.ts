export default {
  id: 'pacific-atlantic-water-flow',
  title: 'Pacific Atlantic Water Flow',
  difficulty: 'medium',
  description: `<p>There is an <code>m x n</code> rectangular island that borders both the Pacific and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the right and bottom edges. Water can flow to a neighboring cell if that cell has height less than or equal to the current cell. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.</p>`,
  examples: [
    { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
  ],
  constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
  starterCode: `def pacific_atlantic(heights):
  pass`,
  functionName: 'pacific_atlantic_run',
  conceptId: 'graphs',
  runnerSetup: `def pacific_atlantic_run(heights):
  result = pacific_atlantic(heights)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: '5x5', args: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]], expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
  ],
  clues: [
    {
      id: 'constraint-grid-size',
      question: 'm, n ≤ 200 means the grid has up to 40,000 cells. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(m²n²) is fine', isCorrect: false, feedback: 'At m = n = 200, O(m²n²) is 1.6 billion operations — far too slow. You need an approach that visits each cell a constant number of times.' },
        { label: 'O(mn) per ocean, O(mn) total', isCorrect: true },
        { label: 'O(log(mn)) is required', isCorrect: false, feedback: 'O(log(mn)) would mean not reading most cells — impossible when you need to evaluate every cell\'s reachability. The constraint rules out quadratic approaches, not linear ones.' },
        { label: 'Grid size doesn\'t affect algorithm choice', isCorrect: false, feedback: 'Grid size directly determines what\'s acceptable. At 40,000 cells, O(mn) is 40,000 operations per traversal — very fast. A quadratic approach over cells would be 1.6 billion.' },
      ],
      correctFeedback: 'With up to 40,000 cells, an O(mn) BFS or DFS from each ocean\'s border is efficient — each cell is visited at most once per ocean traversal.',
      wrongFeedback: [
        'At m = n = 200, how many cells does the grid have? What does that bound say about nested loops over cells?',
        'O(mn) visits each of the 40,000 cells once. O(m²n²) visits 1.6 billion. The constraint rules out the latter.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is a list of coordinates where water can reach both oceans. What does "both" imply about the search strategy?',
      options: [
        { label: 'Run one BFS from every cell', isCorrect: false, feedback: 'Running BFS from every cell would be O(m²n²) — too slow for a 200×200 grid. The "both" condition suggests tracking reachability per ocean, then combining.' },
        { label: 'Separate reachability sets, then intersect', isCorrect: true },
        { label: 'Find a path from Pacific to Atlantic directly', isCorrect: false, feedback: 'There\'s no single path from one ocean to the other — you need every cell that satisfies both conditions independently. The question is about reachability, not routing.' },
        { label: 'BFS from all cells simultaneously', isCorrect: false, feedback: 'Multi-source BFS is a valid technique, but starting from all cells doesn\'t give you per-ocean reachability. You need to know which cells can reach the Pacific and which can reach the Atlantic separately.' },
      ],
      correctFeedback: 'Track which cells can reach the Pacific in one set and the Atlantic in another. Any cell in both sets is an answer. This reduces the problem to two independent traversals plus a set intersection.',
      wrongFeedback: [
        'You need to know if a cell can reach ocean A AND ocean B. Does one traversal give you that, or do you need two separate traversals?',
        'Run one traversal for Pacific reachability and one for Atlantic reachability. What cells are in both results?',
      ],
    },
    {
      id: 'reverse-flow',
      question: 'Water flows from higher to lower (or equal) cells. The border cells touch an ocean directly. What does reversing the flow direction let you do?',
      options: [
        { label: 'Start BFS from border cells, flow uphill', isCorrect: true },
        { label: 'Sort cells by height and process in order', isCorrect: false, feedback: 'Sorting by height doesn\'t capture the connectivity structure — a cell\'s reachability depends on its neighbors, not just its height rank. Reversing flow direction gives you a traversal starting point, not a sort order.' },
        { label: 'Treat all border cells as blocked', isCorrect: false, feedback: 'Border cells are the opposite of blocked — they\'re your starting point. Reversing flow means asking "which inland cells can water flow from to reach this border?" not blocking borders.' },
        { label: 'Use DFS to detect cycles in the grid', isCorrect: false, feedback: 'Grid traversal here has no cycles concern — cells don\'t loop back. Reversing the flow direction is about changing where you start the search, not about cycle detection.' },
      ],
      correctFeedback: 'If water flows downhill from interior to ocean, then reversing direction means: start at the ocean border and flow uphill (to equal or higher neighbors). Every cell reachable this way can flow to that ocean.',
      wrongFeedback: [
        'Forward flow goes from high cells toward the ocean border. If you reverse that, where do you start, and in which direction do you travel?',
        'Instead of asking "can this cell reach the ocean?", ask "starting from the ocean border, which cells are reachable going uphill?" That\'s the same question asked backwards.',
      ],
    },
    {
      id: 'flow-condition',
      question: 'Water flows to a neighbor if that neighbor\'s height is less than or equal to the current cell. In the reverse traversal (starting from borders), what is the valid neighbor condition?',
      options: [
        { label: 'Neighbor height ≥ current height', isCorrect: true },
        { label: 'Neighbor height ≤ current height', isCorrect: false, feedback: 'That\'s the forward flow condition. In the reverse direction, you\'re climbing uphill — you can only move to a cell that is at least as high as where you are.' },
        { label: 'Neighbor height == current height', isCorrect: false, feedback: 'Equal height is allowed, but not required. The reversed condition is neighbor height ≥ current — both equal and higher neighbors are valid in the reverse direction.' },
        { label: 'Any unvisited neighbor', isCorrect: false, feedback: 'Height still matters — you can only reverse-flow to cells that could have sent water down to you. That means cells at least as high as the current cell.' },
      ],
      correctFeedback: 'Forward: flow to neighbor if neighbor ≤ current. Reversed: move to neighbor if neighbor ≥ current. This preserves the physical meaning — you\'re tracing back along valid downhill paths.',
      wrongFeedback: [
        'If forward flow goes from high to low, which direction does the reversed traversal go? What does that mean for the height comparison?',
        'In the reverse direction you\'re simulating water flowing uphill. To step to a neighbor, that neighbor must be at least as high as where you currently stand.',
      ],
    },
  ],
}
