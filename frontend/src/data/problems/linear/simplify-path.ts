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
  starterCode: `def simplify_path(path):
  pass`,
  functionName: 'simplify_path',
  conceptId: 'stack',
  testCases: [
    { label: 'Trailing slash', args: ['/home/'], expected: '/home' },
    { label: 'Double slash', args: ['/home//foo/'], expected: '/home/foo' },
    { label: 'Parent dir', args: ['/home/user/Documents/../Pictures'], expected: '/home/user/Pictures' },
    { label: 'Go to root', args: ['/../'], expected: '/' },
  ],
}
