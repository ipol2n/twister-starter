import React, { PropTypes } from 'react'
import Tweet from './Tweet'

const TweetList = ({ tweets }) => (
  <div className="tweet-list">
    { tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
  </div>
)

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    tweetText: PropTypes.string.isRequired,
  })),
}

TweetList.defaultProps = {
  tweets: [],
}

export default TweetList
