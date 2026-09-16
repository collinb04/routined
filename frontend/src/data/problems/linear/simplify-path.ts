export default {
  id: 'simplify-path',
  title: 'Simplify Path',
  difficulty: 'medium',
  description: 'Given an absolute path for a Unix file system, simplify it to the canonical path. The canonical path starts with <code>/</code>, has no trailing <code>/</code>, and resolves <code>..</code> (parent) and <code>.</code> (current).',
  examples: [
    { input: 'path = "/home/"', output: '"/home"' },
    { input: 'path = "/home//foo/"', output: '"/home/foo"' },
    { input: 'path = "/home/user/Documents/../Pictures"', output: '"/home/user/Pictures"' },
  ],
  constraints: ['1 ≤ path.length ≤ 3000', 'path is a valid absolute Unix path'],
  starterCode: `class Solution:
    def simplify_path(self, path):
        pass`,
  runnerSetup: 'simplify_path = Solution().simplify_path',
  functionName: 'simplify_path',
  conceptId: 'stack',
  testCases: [
    { label: 'Trailing slash', args: ['/home/'], expected: '/home' },
    { label: 'Double slash', args: ['/home//foo/'], expected: '/home/foo' },
    { label: 'Parent dir', args: ['/home/user/Documents/../Pictures'], expected: '/home/user/Pictures' },
    { label: 'Go to root', args: ['/../'], expected: '/' },
  ],
  bruteHint: 'A brute-force approach might repeatedly scan the string looking for the next ".." and the segment right before it, removing both and restarting the scan since every position shifts after a removal. With up to O(n) such removals, each costing O(n) to locate and rebuild, this degrades toward O(n²) on paths with many nested parent references. Why does redoing a full scan after every single removal waste all the work already done during a single left-to-right pass?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'dotdot-implies-stack',
      question: 'The right data structure should match the operation you actually need to perform. ".." means go up to the parent directory. What data structure naturally supports "undo the last directory entered"?',
      highlight: { location: 'description', text: 'resolves <code>..</code> (parent) and <code>.</code> (current)' },
      options: [
        { label: 'A queue — process components in order', isCorrect: false, feedback: 'A queue processes front-to-back and has no concept of undoing the most recent addition. ".." requires removing the last directory added, which is LIFO behavior.' },
        { label: 'A stack — push directories, pop on ..', isCorrect: true },
        { label: 'A hash map — map each name to its parent', isCorrect: false, feedback: 'A hash map could store parent relationships, but you would need to build the entire tree first. A stack processes the path left-to-right with O(1) push/pop.' },
        { label: 'A sorted set — keep directory names in order', isCorrect: false, feedback: 'Alphabetic ordering has no relationship to path traversal order. You need LIFO access, not sorted access.' },
      ],
      correctFeedback: 'A stack holds the directory components you have entered. ".." pops the last one — undoing one level. At the end, join the stack contents with "/" to get the canonical path.',
      wrongFeedback: [
        'When you encounter "..", you undo the most recently entered directory. Which end of a structure holds the most recent item?',
        '"Most recently added, first removed" is LIFO. Which named data structure implements LIFO?',
      ],
    },
    {
      id: 'output-canonical-form',
      question: 'Sometimes a signal tells you how much extra work is needed to shape your result into the exact expected format, not how to compute it. The output must start with "/", have no trailing "/", and no double slashes. What does this require at the end?',
      highlight: { location: 'description', text: 'starts with <code>/</code>, has no trailing <code>/</code>' },
      options: [
        { label: 'Return the collected directory names joined with "/"', isCorrect: false, feedback: 'Joining with "/" alone gives "home/foo" — missing the leading slash. You need to prepend "/" and the join separator already handles internal slashes.' },
        { label: 'Prepend "/" to the "/".join of the collected directory names', isCorrect: true },
        { label: 'Append "/" to the result', isCorrect: false, feedback: 'Appending "/" would create a trailing slash, which the canonical form explicitly forbids. Prepend only.' },
        { label: 'Replace all double slashes in the raw path first', isCorrect: false, feedback: 'Pre-processing double slashes with string replacement is fragile. Splitting on "/" and filtering empty components handles double slashes, "..", and "." uniformly.' },
      ],
      correctFeedback: '"/" + "/".join(stack) produces exactly the canonical form: leading slash, no trailing slash, single slashes between components. If the stack is empty, this gives "/".',
      wrongFeedback: [
        'Your stack contains ["home", "foo"]. What string operations produce "/home/foo" from that list?',
        'Join the list with "/" to get "home/foo", then prepend "/" to get "/home/foo". If the stack is empty, "/" + "" = "/" — the root.',
      ],
    },
    {
      id: 'components-to-ignore',
      question: 'Some signals tell you what to explicitly rule out rather than what to act on. After splitting on "/", some components are ".", "", or "..". Which ones should be silently skipped?',
      options: [
        { label: 'Only empty strings from double slashes', isCorrect: false, feedback: 'Empty strings and "." are both no-ops and must both be skipped. Ignoring only empty strings would push "." as a directory name.' },
        { label: '"." and empty strings — both are no-ops', isCorrect: true },
        { label: 'Only "." — empty strings are valid separators', isCorrect: false, feedback: 'Splitting "/home//foo" on "/" gives ["", "home", "", "foo", ""]. Empty strings are artifacts of double slashes and trailing slashes — they are not valid directory names.' },
        { label: 'All components shorter than 2 characters', isCorrect: false, feedback: 'Single-character directory names like "a" are valid. Filtering by length would discard legitimate directory names. Filter by specific values: "" and ".".' },
      ],
      correctFeedback: '"." means stay in the current directory — ignore it. Empty strings appear between adjacent slashes — ignore them. Only ".." and actual names require action.',
      wrongFeedback: [
        'Split "/home/./foo/" on "/". Which tokens in the resulting list represent no movement at all?',
        'After splitting, you get tokens including "", ".", and actual names. "" comes from adjacent slashes; "." means current directory. Both are no-ops. Only ".." changes the stack.',
      ],
    },
    {
      id: 'root-boundary',
      question: 'Edge cases reveal what your logic must explicitly guard against. "/../" simplifies to "/". What should happen when ".." is encountered at the root?',
      options: [
        { label: 'Raise an error — invalid path', isCorrect: false, feedback: 'The problem states paths are valid Unix paths, but Unix silently treats "/.." as "/" — going above root stays at root. No error is raised.' },
        { label: 'Remove the last collected entry only if any remain; otherwise do nothing', isCorrect: true },
        { label: 'Add ".." as a literal entry to the collected components', isCorrect: false, feedback: 'Adding ".." as a literal would produce a path like "/../.." which is never a canonical Unix path. ".." at root is a no-op.' },
        { label: 'Clear all collected entries back to empty', isCorrect: false, feedback: 'The collected entries are already empty at root — clearing them is equivalent to doing nothing. But the explicit action should be "remove the last one if any remain", not "clear everything".' },
      ],
      correctFeedback: 'Unix defines "/.." as "/". In your stack: pop only if the stack is non-empty. An empty stack means you are at root — ".." there has no effect.',
      wrongFeedback: [
        'What is in the stack when you are at "/"? What should a pop operation do when there is nothing to pop?',
        'An empty stack represents the root. Popping from an empty stack would cause an error. Guard with "if stack: stack.pop()" — otherwise skip the ".." entirely.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def simplify_path(self, path):
        stack = []
        for part in path.split('/'):
            if part == '' or part == '.':
                continue
            elif part == '..':
                if stack:
                    stack.pop()
            else:
                stack.append(part)
        return '/' + '/'.join(stack)`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Splitting on <code>\'/\'</code> already turns every run of consecutive slashes into empty-string segments, and a bare "." into its own segment — both get silently skipped by the same <code>continue</code>, so "extra slashes" and "current directory" never need separate handling.',
  solutionExplanation: 'A stack mirrors exactly how a file system path is walked: each real directory name gets pushed, and <code>..</code> pops back up to whatever directory came before it — with an empty stack meaning "already at root," where a further <code>..</code> simply has nowhere to go and is ignored. Rebuilding the canonical path is just joining whatever directory names remain on the stack with single slashes, which naturally produces no trailing slash and no doubled slashes.',
}
