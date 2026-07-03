export default {
  id: 'daily-temperatures',
  title: 'Daily Temperatures',
  difficulty: 'medium',
  description: `<p>Given an array of integers <code>temperatures</code> representing the daily temperatures, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code>.</p>`,
  examples: [
    { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
  ],
  constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
  starterCode: `def daily_temperatures(temperatures):
  pass`,
  functionName: 'daily_temperatures',
  conceptId: 'stack',
  testCases: [
    { label: 'classic', args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
    { label: '[30,40,50,60]', args: [[30,40,50,60]], expected: [1,1,1,0] },
  ],
}
