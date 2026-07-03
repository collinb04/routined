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
  starterCode: `def min_mutation(start_gene, end_gene, bank):
  pass`,
  functionName: 'min_mutation',
  conceptId: 'graphs',
  testCases: [
    { label: '1 mutation', args: ['AACCGGTT','AACCGGTA',['AACCGGTA']], expected: 1 },
    { label: '2 mutations', args: ['AACCGGTT','AAACGGTA',['AACCGGTA','AACCGCTA','AAACGGTA']], expected: 2 },
    { label: 'Impossible', args: ['AACCGGTT','AAACGGTA',['AACCGGTA']], expected: -1 },
  ],
}
