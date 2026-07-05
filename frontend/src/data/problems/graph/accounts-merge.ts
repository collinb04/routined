export default {
  id: 'accounts-merge',
  title: 'Accounts Merge',
  difficulty: 'medium',
  description: 'Given a list of accounts (first element is the name, rest are emails), merge accounts that share an email. Return accounts sorted: name first, then emails in sorted order.',
  examples: [
    { input: 'accounts=[["John","j1","j2"],["John","j1","j3"],["Mary","m1"]]', output: '[["John","j1","j2","j3"],["Mary","m1"]]' },
  ],
  constraints: ['1 ≤ accounts.length ≤ 1000', '2 ≤ accounts[i].length ≤ 10', 'All emails are lowercase'],
  starterCode: `def accounts_merge(accounts):
  pass`,
  functionName: 'accounts_merge',
  conceptId: 'graphs',
  testCases: [
    { label: 'Merge John', args: [[['John','j1','j2'],['John','j1','j3'],['Mary','m1']]], expected: [['John','j1','j2','j3'],['Mary','m1']] },
  ],
  clues: [
    {
      id: 'merge-condition',
      question: 'Two accounts merge if and only if they share an email. This means the merge relationship is…',
      options: [
        { label: 'Transitive — chains must propagate', isCorrect: true },
        { label: 'Based on matching names', isCorrect: false, feedback: 'Two "John" accounts with completely different emails must stay separate. The name is metadata — only a shared email triggers a merge.' },
        { label: 'Limited to direct pairs only', isCorrect: false, feedback: 'If A shares an email with B, and B shares a different email with C, all three belong together. Merging only direct pairs would leave transitive chains split.' },
        { label: 'Resolved by sorting emails first', isCorrect: false, feedback: 'Sorting finds nothing — it can\'t tell you which accounts are connected. You need to track which emails belong to the same identity before you sort.' },
      ],
      correctFeedback: 'Right — if A links to B and B links to C, all three merge. That transitive closure is the defining structure of a Union-Find problem.',
      wrongFeedback: [
        'If account A has email e1 and e2, and account B has email e2 and e3, should A and B merge? What if a third account C has only e3?',
        'The merge relation is transitive: shared email links groups together, and those groups can chain. What data structure tracks transitive group membership efficiently?',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output requires emails sorted within each account. What does this tell you about when to sort?',
      options: [
        { label: 'Sort inputs before merging', isCorrect: false, feedback: 'Sorting inputs doesn\'t help you find which accounts share emails — it just reorders the input. You need to merge first, then sort the resulting email sets.' },
        { label: 'Sort during the merge step', isCorrect: false, feedback: 'Sorting mid-merge adds complexity without benefit. Merge all connected emails into groups first, then sort each group as a final output step.' },
        { label: 'Sort after all groups are finalized', isCorrect: true },
        { label: 'No sort needed — Union-Find preserves order', isCorrect: false, feedback: 'Union-Find merges sets but makes no ordering guarantees. The sorted output is your responsibility — it must be applied explicitly after grouping.' },
      ],
      correctFeedback: 'Sorting is a formatting step, not a search step. Finalize each merged group, then sort its emails before building the output row.',
      wrongFeedback: [
        'The problem says "return emails in sorted order." At what point in your algorithm do you actually know the full set of emails in a group?',
        'You can only sort a group once it\'s complete. When does a group become complete in a Union-Find approach?',
      ],
    },
    {
      id: 'email-as-key',
      question: 'The same email can appear in multiple input accounts. What data structure lets you track which group each email belongs to?',
      options: [
        { label: 'A set of all unique emails', isCorrect: false, feedback: 'A set tells you an email exists but not which group it belongs to. You need a mapping from each email to its group representative.' },
        { label: 'A map from email to group/root', isCorrect: true },
        { label: 'A sorted list of all emails', isCorrect: false, feedback: 'A sorted list lets you binary-search for duplicates, but still doesn\'t associate emails with their merged group. The lookup direction you need is email → group.' },
        { label: 'A count of occurrences per email', isCorrect: false, feedback: 'Knowing how many times an email appears doesn\'t tell you which accounts it links together. You need to know which group representative to union with.' },
      ],
      correctFeedback: 'A hash map from email to its Union-Find root lets you detect when a new account shares an email with an existing group and union them in O(1) average.',
      wrongFeedback: [
        'When you encounter an email you\'ve seen before, you need to know which group already owns it. What structure gives you that lookup?',
        'You need email → group in O(1). One structure does that directly.',
      ],
    },
    {
      id: 'constraint-size',
      question: 'With up to 1000 accounts each holding up to 10 emails, what is the upper bound on total emails, and what does it permit?',
      options: [
        { label: 'O(n²) merges are required', isCorrect: false, feedback: 'With at most 10,000 total emails, even an O(n²) comparison would be 100 million operations — unnecessary. A Union-Find pass over the email list is linear and sufficient.' },
        { label: 'At most 10,000 emails — linear processing is fine', isCorrect: true },
        { label: 'You must precompute all email pairs', isCorrect: false, feedback: 'Precomputing every pair of emails would be O(n²) and is not needed. Process each email once: look it up in your map, union if seen before, insert if new.' },
        { label: 'Input is too large for a hash map', isCorrect: false, feedback: '10,000 entries is trivially small for a hash map. The constraint is generous — it permits straightforward linear approaches without any space concern.' },
      ],
      correctFeedback: '1000 accounts × 10 emails = 10,000 emails at most. A single linear pass with Union-Find handles this comfortably.',
      wrongFeedback: [
        'Multiply the two bounds: what is the maximum total number of emails across all accounts?',
        '10,000 elements is small. What complexity does that size permit?',
      ],
    },
  ],
}
