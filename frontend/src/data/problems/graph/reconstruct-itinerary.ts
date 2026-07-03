export default {
  id: 'reconstruct-itinerary',
  title: 'Reconstruct Itinerary',
  difficulty: 'hard',
  description: 'Given a list of airline tickets as <code>[from, to]</code> pairs, reconstruct the itinerary starting from "JFK". All tickets must be used exactly once. Return the lexicographically smallest valid itinerary.',
  examples: [
    { input: 'tickets=[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' },
  ],
  constraints: ['1 ≤ tickets.length ≤ 300', 'tickets[i].length == 2', 'All airport codes are 3 uppercase letters', 'A valid itinerary is guaranteed to exist'],
  starterCode: `def find_itinerary(tickets):
  pass`,
  functionName: 'find_itinerary',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Linear path', args: [[['MUC','LHR'],['JFK','MUC'],['SFO','SJC'],['LHR','SFO']]], expected: ['JFK','MUC','LHR','SFO','SJC'] },
    { label: 'Simple', args: [[['JFK','ATL'],['ATL','JFK'],['JFK','SFO']]], expected: ['JFK','ATL','JFK','SFO'] },
  ],
}
