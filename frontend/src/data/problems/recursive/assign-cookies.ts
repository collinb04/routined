export default {
  id: 'assign-cookies',
  title: 'Assign Cookies',
  difficulty: 'easy',
  description: 'You want to give cookies to children. Child <code>i</code> has a greed factor <code>g[i]</code> — the minimum cookie size they\'ll accept. Cookie <code>j</code> has size <code>s[j]</code>. Each child gets at most one cookie. Return the maximum number of content children.',
  examples: [
    { input: 'g = [1,2,3], s = [1,1]', output: '1', explanation: 'Only one child with greed 1 can be satisfied.' },
    { input: 'g = [1,2], s = [1,2,3]', output: '2', explanation: 'Both children can be satisfied.' },
  ],
  constraints: [
    '1 ≤ g.length ≤ 3 × 10⁴',
    '0 ≤ s.length ≤ 3 × 10⁴',
    '1 ≤ g[i], s[j] ≤ 2³¹ - 1',
  ],
  starterCode: `def find_content_children(g, s):
  # Hint: sort both, use two pointers — give smallest sufficient cookie first
  pass`,
  functionName: 'find_content_children',
  conceptId: 'greedy',
  testCases: [
    { label: 'One satisfied', args: [[1,2,3],[1,1]], expected: 1 },
    { label: 'All satisfied', args: [[1,2],[1,2,3]], expected: 2 },
    { label: 'No cookies', args: [[1,2],[]], expected: 0 },
    { label: 'None fit', args: [[10],[1,2,3]], expected: 0 },
    { label: 'Exact match', args: [[1,2,3],[1,2,3]], expected: 3 },
  ],
}
