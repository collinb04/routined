export default {
  id: 'restore-ip-addresses',
  title: 'Restore IP Addresses',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> of digits only, return all possible valid IP addresses. A valid IP has four 0-255 octets (no leading zeros). Return in any order.',
  examples: [
    { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]' },
    { input: 's = "0000"', output: '["0.0.0.0"]' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', 's consists of digits only'],
  starterCode: `def restore_ip_addresses(s):
  pass`,
  functionName: 'restore_ip_addresses',
  conceptId: 'backtracking',
  testCases: [
    { label: 'Two valid IPs', args: ['25525511135'], expected: ['255.255.11.135','255.255.111.35'] },
    { label: 'All zeros', args: ['0000'], expected: ['0.0.0.0'] },
    { label: 'Too short', args: ['1'], expected: [] },
  ],
}
