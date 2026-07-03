export default {
  id: 'open-the-lock',
  title: 'Open the Lock',
  difficulty: 'medium',
  description: 'A lock has 4 circular wheels each with digits 0-9. You can turn any wheel one step forward or backward. Given a list of <code>deadends</code> and a <code>target</code>, find the minimum turns to reach the target from "0000", or -1 if impossible.',
  examples: [
    { input: 'deadends=["0201","0101","0102","1212","2002"], target="0202"', output: '6' },
    { input: 'deadends=["8888"], target="0009"', output: '1' },
  ],
  constraints: ['1 ≤ deadends.length ≤ 500', 'target.length == deadends[i].length == 4', 'target is not in deadends'],
  starterCode: `def open_lock(deadends, target):
  pass`,
  functionName: 'open_lock',
  conceptId: 'graphs',
  testCases: [
    { label: '6 turns', args: [['0201','0101','0102','1212','2002'],'0202'], expected: 6 },
    { label: '1 turn', args: [['8888'],'0009'], expected: 1 },
    { label: 'Already there', args: [[],  '0000'], expected: 0 },
  ],
}
