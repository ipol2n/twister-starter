import React, { Component } from 'react'
import Profile from './Profile'
import MainPanel from './MainPanel'
import config from '../config'
import {
  fetchTweets,
  fetchProfile,
  fetchFollowStatus,
  follow,
  unfollow,
} from '../helpers'

class BodyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Kittiporn Korprasertthaworn',
      username: 'ipol2n',
      tweets: [],
      numTweets: 0,
      numFollowers: 0,
      numFollowings: 0,
      isFollowing: false,
      enableTweet: false,
    }
    if (props.ownerUsername=='' || props.ownerUsername==this.state.username) {
      this.state.enableTweet = true
    }
    this.addToTweetList = this.addToTweetList.bind(this)
    this.toggleFollow = this.toggleFollow.bind(this)
  }

  componentDidMount() {
    const fetchedState = {}
    const ownerUsername = this.props.ownerUsername || this.state.username
    fetchTweets(ownerUsername)
      .then((tweets) => {
        fetchedState.tweets = tweets
      })
      .then(() => fetchProfile(ownerUsername))
      .then((profile) => {
        fetchedState.numFollowers = profile.numFollowers
        fetchedState.numFollowings = profile.numFollowings
        fetchedState.numTweets = profile.numTweets
      })
      .then(() => fetchFollowStatus(this.state.username, ownerUsername))
      .then((status) => {
        fetchedState.isFollowing = status
        this.setState(fetchedState)
      })
  }

  toggleFollow() {
    if (this.state.isFollowing) {
      unfollow(this.state.username, this.props.ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers - 1,
          })
        })
    } else {
      follow(this.state.username, this.props.ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers + 1,
          })
        })
    }
  }

  addToTweetList(tweet) {
    const tweetWithId = tweet
    tweetWithId.id = this.state.tweets.length

    this.setState({
      tweets: [
        ...this.state.tweets,
        tweetWithId,
      ],
    })
  }

  render() {
    return (
      <div className="container body">
        <div className="left-panel">
          <Profile
            name={this.props.ownerName}
            username={this.props.ownerUsername}
            isOwnProfile={this.state.enableTweet}
            isFollowing={this.state.isFollowing}
            handleToggleFollow={this.toggleFollow}
            numTweets={this.state.numTweets}
            numFollowers={this.state.numFollowers}
            numFollowings={this.state.numFollowings}
          />
        </div>
        <MainPanel
          name={this.state.name}
          username={this.state.username}
          tweets={this.state.tweets}
          addToTweetList={this.addToTweetList}
          enableTweet={this.state.enableTweet}
        />
      </div>
    )
  }
}

export default BodyContainer