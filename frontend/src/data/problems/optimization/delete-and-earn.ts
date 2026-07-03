export default {
  id: 'delete-and-earn',
  title: 'Delete and Earn',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, on each step you can pick any value <code>x</code> and gain <code>x</code> points, but then must delete all occurrences of <code>x-1</code> and <code>x+1</code>. Return maximum points you can earn.',
  examples: [
    { input: 'nums = [3,4,2]', output: '6', explanation: 'Earn 3 (delete 2 and 4) → earn 2 = total 5. Or earn 4 (delete 3) → earn 2 = total 6.' },
    { input: 'nums = [2,2,3,3,3,4]', output: '9', explanation: 'Earn all 3s (9 points), deleting 2 and 4.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] ≤ 10⁴'],
  starterCode: `def delete_and_earn(nums):
  pass`,
  functionName: 'delete_and_earn',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Simple', args: [[3,4,2]], expected: 6 },
    { label: 'Three 3s', args: [[2,2,3,3,3,4]], expected: 9 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
}
