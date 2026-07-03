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
}
