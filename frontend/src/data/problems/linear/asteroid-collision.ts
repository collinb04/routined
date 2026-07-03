export default {
  id: 'asteroid-collision',
  title: 'Asteroid Collision',
  difficulty: 'medium',
  description: 'Asteroids move in a row: positive = right, negative = left. When two collide, the smaller explodes; equal-sized ones both explode. Return the final state after all collisions.',
  examples: [
    { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: '-5 and 10 collide; 10 survives.' },
    { input: 'asteroids = [8,-8]', output: '[]', explanation: 'Both same size; both explode.' },
    { input: 'asteroids = [10,2,-5]', output: '[10]', explanation: '-5 and 2 collide; -5 wins. -5 and 10 collide; 10 wins.' },
  ],
  constraints: ['2 ≤ asteroids.length ≤ 10⁴', '-1000 ≤ asteroids[i] ≤ 1000', 'asteroids[i] ≠ 0'],
  starterCode: `def asteroid_collision(asteroids):
  pass`,
  functionName: 'asteroid_collision',
  conceptId: 'stack',
  testCases: [
    { label: 'One survives', args: [[5,10,-5]], expected: [5,10] },
    { label: 'Both explode', args: [[8,-8]], expected: [] },
    { label: '10 survives', args: [[10,2,-5]], expected: [10] },
    { label: 'No collision', args: [[1,2,3]], expected: [1,2,3] },
  ],
}
