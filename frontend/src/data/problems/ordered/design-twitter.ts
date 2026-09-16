export default {
  id: 'design-twitter',
  title: 'Design Twitter',
  difficulty: 'medium',
  description: `<p>Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.</p><p>Implement: <code>post_tweet(userId, tweetId)</code>, <code>get_news_feed(userId)</code> → list of 10 most recent tweet IDs, <code>follow(followerId, followeeId)</code>, <code>unfollow(followerId, followeeId)</code>.</p>`,
  examples: [
    { input: 'post(1,5), post(1,3), follow(1,2), post(2,6), getNewsFeed(1)', output: '[6,3,5]' },
  ],
  constraints: ['1 <= userId, followerId, followeeId <= 500', '0 <= tweetId <= 10^4', 'All tweets have unique IDs'],
  starterCode: `class Twitter:
  def __init__(self):
      pass

  def post_tweet(self, user_id, tweet_id):
      pass

  def get_news_feed(self, user_id):
      pass

  def follow(self, follower_id, followee_id):
      pass

  def unfollow(self, follower_id, followee_id):
      pass`,
  functionName: 'twitter_run',
  conceptId: 'heap',
  runnerSetup: `def twitter_run(ops, args):
  t = Twitter()
  results = []
  for op, a in zip(ops, args):
      if op == 'post_tweet': t.post_tweet(*a)
      elif op == 'get_news_feed': results.append(t.get_news_feed(*a))
      elif op == 'follow': t.follow(*a)
      elif op == 'unfollow': t.unfollow(*a)
  return results`,
  testCases: [
    { label: 'basic feed', args: [['post_tweet','post_tweet','follow','post_tweet','get_news_feed'],[[1,5],[1,3],[1,2],[2,6],[1]]], expected: [[6,3,5]] },
  ],
  bruteHint: 'The brute-force approach gathers every tweet from the user and everyone they follow into one combined list, then sorts that entire list by recency and keeps just the top 10 — repeating the full sort on every single get_news_feed call. If followees have posted many tweets in total, that\'s O(t log t) work per call, where t is the total number of tweets involved. As post_tweet keeps growing the stream and get_news_feed is called repeatedly, how does re-sorting everything from scratch each time scale?',
  optimizeComplexity: { time: 'O(10 log f)', space: 'O(n)' },
  clues: [
    {
      id: 'feed-output-count',
      question: 'The shape of the output you\'re asked to produce tells you how much work each call actually requires. get_news_feed returns the 10 most recent tweets — not all of them. What does that fixed cap suggest?',
      options: [
        { label: 'Sort all tweets each call', isCorrect: false, feedback: 'Sorting all stored tweets on every get_news_feed call is expensive and discards no work. The fixed cap of 10 suggests you only need to extract a small top-k — not a full sort.' },
        { label: 'Keep a bounded top-k structure', isCorrect: true },
        { label: 'Store tweets in a queue, pop 10', isCorrect: false, feedback: 'A plain queue gives you the last 10 tweets from a single user, but the feed merges tweets across all followed users. Popping 10 from a queue loses recency ordering across users.' },
        { label: 'Track tweet count per user', isCorrect: false, feedback: 'Counting tweets per user does not help you identify which 10 across all followed users are most recent. You need a structure that compares recency across multiple sources.' },
      ],
      correctFeedback: 'Returning exactly 10 most recent items from multiple sources is a classic top-k merge problem. A heap lets you pull the globally most recent tweet one at a time without sorting everything.',
      wrongFeedback: [
        'You need the 10 most recent tweets across several users\' streams. What structure efficiently extracts the top item from multiple sorted sequences?',
        'When merging k sorted streams and taking only the top 10, a heap does it in O(10 log k) instead of O(total tweets).',
      ],
      highlight: { location: 'description', text: 'the 10 most recent tweets' },
    },
    {
      id: 'multi-source-merge',
      question: 'When a result must be assembled from many independent sources, the way you combine them determines your overall complexity. The news feed merges tweets from the user and everyone they follow. What does merging multiple per-user tweet lists require?',
      options: [
        { label: 'Concatenate all lists, sort by time', isCorrect: false, feedback: 'Concatenating and sorting works but costs O(T log T) where T is total tweets. You only need 10 results, so sorting everything is unnecessary work.' },
        { label: 'Repeatedly scan every followee\'s latest tweet for the max', isCorrect: false, feedback: 'Scanning every followee\'s latest tweet to find the next maximum costs O(f) per extraction, so pulling 10 results costs O(10f). A heap does each extraction in O(log f) instead.' },
        { label: 'Merge sorted streams with a heap', isCorrect: true },
        { label: 'Use a set to deduplicate tweets', isCorrect: false, feedback: 'The constraints guarantee all tweet IDs are unique, so deduplication is not needed. The challenge is merging multiple per-user streams in recency order.' },
      ],
      correctFeedback: 'Each user\'s tweet list is naturally ordered by insertion time. A min-heap seeded with the latest tweet from each followed user lets you extract the global top 10 in O(10 log f) where f is the number of followees.',
      wrongFeedback: [
        'Each followed user\'s tweets are already in order. What data structure efficiently finds the next most-recent item across k sorted sequences?',
        'This is a k-way merge. A heap holds the current "frontier" element from each list and always gives you the next globally most-recent tweet.',
      ],
      highlight: { location: 'description', text: '10 most recent tweet IDs' },
    },
    {
      id: 'follow-unfollow-structure',
      question: 'The exact operations a structure must support — and how fast each one needs to be — determines which structure is even viable. Users can follow and unfollow dynamically. What structure supports O(1) follow, unfollow, and membership checks?',
      options: [
        { label: 'Sorted list of followee IDs', isCorrect: false, feedback: 'A sorted list requires O(log f) binary search for membership and O(f) for removal. Dynamic follow/unfollow is much cheaper with a hash set.' },
        { label: 'A per-user structure with O(1) add, remove, and membership check', isCorrect: true },
        { label: 'Adjacency matrix (500×500)', isCorrect: false, feedback: 'A 500×500 matrix uses 250,000 cells even when most users follow nobody. A hash set per user only stores actual relationships and scales to the actual follow graph.' },
        { label: 'Linked list of followers', isCorrect: false, feedback: 'A linked list makes membership check O(f) and removal O(f). You need O(1) for both — use a hash set.' },
      ],
      correctFeedback: 'A hash set per user gives O(1) add, remove, and membership check. With up to 500 users each potentially following up to 499 others, constant-time follow/unfollow keeps the design clean.',
      wrongFeedback: [
        'Follow and unfollow both need to be fast. What data structure gives O(1) membership check and O(1) removal?',
        'You need to add, remove, and query membership. One structure does all three in O(1) — it is not a list or array.',
      ],
      highlight: { location: 'description', text: 'follow/unfollow another user' },
    },
    {
      id: 'tweet-ordering-guarantee',
      question: 'A guarantee (or lack of one) in the problem statement tells you what you can rely on and what you must construct yourself. All tweet IDs are unique and tweets are posted over time. How do you track recency without storing timestamps explicitly?',
      options: [
        { label: 'Use tweet IDs as timestamps', isCorrect: false, feedback: 'Tweet IDs range from 0 to 10,000 and are not guaranteed to be monotonically increasing — ID 5 could be posted after ID 3. You need a separate counter.' },
        { label: 'Attach a global sequence number', isCorrect: true },
        { label: 'Sort by userId, then tweetId', isCorrect: false, feedback: 'User ID has no relationship to tweet recency. Sorting by userId would group tweets by user, not by when they were posted.' },
        { label: 'Store a Unix timestamp per tweet', isCorrect: false },
      ],
      correctFeedback: 'A simple global counter incremented on each post_tweet call gives each tweet a monotonically increasing sequence number. Comparing sequence numbers is cheaper and more reliable than real timestamps.',
      wrongFeedback: [
        'Tweet IDs are not guaranteed to be in posting order. How do you create a reliable ordering when none is given?',
        'You control the data structure. Augmenting each stored tweet with an incrementing counter gives you a total ordering at zero extra cost.',
      ],
      highlight: { location: 'constraint', text: 'All tweets have unique IDs' },
    },
  ],
  solutionCode: `import heapq

class Twitter:
    def __init__(self):
        self.timer = 0
        self.tweets = {}
        self.following = {}

    def post_tweet(self, user_id, tweet_id):
        self.tweets.setdefault(user_id, []).append((self.timer, tweet_id))
        self.timer -= 1

    def get_news_feed(self, user_id):
        heap = []
        users = self.following.get(user_id, set()) | {user_id}
        for uid in users:
            tweets = self.tweets.get(uid, [])
            if tweets:
                idx = len(tweets) - 1
                ts, tid = tweets[idx]
                heapq.heappush(heap, (ts, tid, uid, idx - 1))
        result = []
        while heap and len(result) < 10:
            ts, tid, uid, idx = heapq.heappop(heap)
            result.append(tid)
            if idx >= 0:
                nts, ntid = self.tweets[uid][idx]
                heapq.heappush(heap, (nts, ntid, uid, idx - 1))
        return result

    def follow(self, follower_id, followee_id):
        if follower_id != followee_id:
            self.following.setdefault(follower_id, set()).add(followee_id)

    def unfollow(self, follower_id, followee_id):
        if follower_id in self.following:
            self.following[follower_id].discard(followee_id)`,
  solutionComplexity: { time: 'O(10 log f)', space: 'O(n)' },
  solutionCaveat: 'The timer counts *downward* on every post, so smaller values mean more recent tweets — that lets a plain min-heap surface the most recent tweet first, without needing a max-heap or negated timestamps anywhere else in the logic.',
  solutionExplanation: 'Each user\'s own tweets are already in chronological order in their own list, so a news feed is really a k-way merge of "most recent tweet per followed user" — exactly the classic merge-k-sorted-lists pattern, using a heap to always pull whichever followed user\'s most recent still-unseen tweet is newest. Popping a user\'s tweet and immediately pushing their next-most-recent one back onto the heap keeps every followee\'s stream available without ever materializing and sorting the full combined tweet history.',
}
