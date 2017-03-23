import React, { Component } from 'react'
import Profile from './Profile'
import MainPanel from './MainPanel'
import config from '../config'

class BodyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Kittiporn Korprasertthaworn',
      username: 'ipol2n',
      tweets: [],
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
    const url = `http://${config.api.host}:${config.api.port}/api/tweets`
    const filter = `{ "where": { "username": "${this.props.ownerUsername}" }}`
    fetch(`${url}?filter=${filter}`, { mode: 'cors' })
    .then(response => response.json())
    .then((tweets) => {
      this.setState({
        tweets: tweets,
      })
    })
  }

  toggleFollow() {
    this.setState({
      isFollowing: !this.state.isFollowing,
    })
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