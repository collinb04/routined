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
}
