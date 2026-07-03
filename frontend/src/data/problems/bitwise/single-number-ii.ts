export default {
  id: 'single-number-ii',
  title: 'Single Number II',
  difficulty: 'medium',
  description: 'Given an integer array where every element appears three times except for one, find the element that appears only once. Your algorithm must use O(1) extra space.',
  examples: [
    { input: 'nums = [2,2,3,2]', output: '3', explanation: '3 appears once; 2 appears three times.' },
    { input: 'nums = [0,1,0,1,0,1,99]', output: '99' },
  ],
  constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Every element appears exactly three times except one', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `def single_number(nums):
  pass`,
  functionName: 'single_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Three pairs', args: [[2,2,3,2]], expected: 3 },
    { label: 'Larger', args: [[0,1,0,1,0,1,99]], expected: 99 },
    { label: 'Single element', args: [[7]], expected: 7 },
    { label: 'Negatives', args: [-2,-2,-3,-2], expected: -3 },
  ],
}
