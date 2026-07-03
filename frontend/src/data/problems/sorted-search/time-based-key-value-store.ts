export default {
  id: 'time-based-key-value-store',
  title: 'Time Based Key-Value Store',
  difficulty: 'medium',
  description: `<p>Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.</p><p>Implement <code>set(key, value, timestamp)</code> and <code>get(key, timestamp)</code> which returns the value with the largest timestamp ≤ given timestamp, or <code>""</code> if no such value exists.</p>`,
  examples: [
    { input: 'set("foo","bar",1), get("foo",1), get("foo",3), set("foo","bar2",4), get("foo",4)', output: '"bar","bar","bar2"' },
  ],
  constraints: ['1 <= key.length, value.length <= 100', '1 <= timestamp <= 10^7', 'All timestamps for set are strictly increasing'],
  starterCode: `class TimeMap:
  def __init__(self):
      pass

  def set(self, key, value, timestamp):
      pass

  def get(self, key, timestamp):
      pass`,
  functionName: 'time_map_run',
  conceptId: 'binary-search',
  runnerSetup: `def time_map_run(ops, args):
  tm = TimeMap()
  results = []
  for op, a in zip(ops, args):
      if op == 'set': tm.set(*a)
      elif op == 'get': results.append(tm.get(*a))
  return results`,
  testCases: [
    { label: 'set/get', args: [['set','get','get','set','get','get','get'],[[['foo','bar',1]],[['foo',1]],[['foo',3]],[['foo','bar2',4]],[['foo',4]],[['foo',5]],[['foo',0]]]], expected: ['bar','bar','bar2','bar2',''] },
  ],
}
