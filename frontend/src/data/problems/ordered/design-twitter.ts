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
  clues: [
    {
      id: 'feed-output-count',
      question: 'get_news_feed returns the 10 most recent tweets — not all of them. What does that fixed cap suggest?',
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
    },
    {
      id: 'multi-source-merge',
      question: 'The news feed merges tweets from the user and everyone they follow. What does merging multiple per-user tweet lists require?',
      options: [
        { label: 'Concatenate all lists, sort by time', isCorrect: false, feedback: 'Concatenating and sorting works but costs O(T log T) where T is total tweets. You only need 10 results, so sorting everything is unnecessary work.' },
        { label: 'Merge sorted streams with a heap', isCorrect: false },
        { label: 'Merge sorted streams with a heap', isCorrect: true },
        { label: 'Use a set to deduplicate tweets', isCorrect: false, feedback: 'The constraints guarantee all tweet IDs are unique, so deduplication is not needed. The challenge is merging multiple per-user streams in recency order.' },
      ],
      correctFeedback: 'Each user\'s tweet list is naturally ordered by insertion time. A min-heap seeded with the latest tweet from each followed user lets you extract the global top 10 in O(10 log f) where f is the number of followees.',
      wrongFeedback: [
        'Each followed user\'s tweets are already in order. What data structure efficiently finds the next most-recent item across k sorted sequences?',
        'This is a k-way merge. A heap holds the current "frontier" element from each list and always gives you the next globally most-recent tweet.',
      ],
    },
    {
      id: 'follow-unfollow-structure',
      question: 'Users can follow and unfollow dynamically. What structure supports O(1) follow, unfollow, and membership checks?',
      options: [
        { label: 'Sorted list of followee IDs', isCorrect: false, feedback: 'A sorted list requires O(log f) binary search for membership and O(f) for removal. Dynamic follow/unfollow is much cheaper with a hash set.' },
        { label: 'Hash set per user', isCorrect: true },
        { label: 'Adjacency matrix (500×500)', isCorrect: false, feedback: 'A 500×500 matrix uses 250,000 cells even when most users follow nobody. A hash set per user only stores actual relationships and scales to the actual follow graph.' },
        { label: 'Linked list of followers', isCorrect: false, feedback: 'A linked list makes membership check O(f) and removal O(f). You need O(1) for both — use a hash set.' },
      ],
      correctFeedback: 'A hash set per user gives O(1) add, remove, and membership check. With up to 500 users each potentially following up to 499 others, constant-time follow/unfollow keeps the design clean.',
      wrongFeedback: [
        'Follow and unfollow both need to be fast. What data structure gives O(1) membership check and O(1) removal?',
        'You need to add, remove, and query membership. One structure does all three in O(1) — it is not a list or array.',
      ],
    },
    {
      id: 'tweet-ordering-guarantee',
      question: 'All tweet IDs are unique and tweets are posted over time. How do you track recency without storing timestamps explicitly?',
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
    },
  ],
}
