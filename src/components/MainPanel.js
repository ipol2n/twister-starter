import React, { Component } from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'
import config from '../config'

class MainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Kittiporn Korprasertthaworn',
      username: 'ipol2n',
      tweets: [
        { id: 0, name: 'Supasate Choochaisri', username: 'kaizerwing', tweetText: 'Lorem Ipsum ...' },
        { id: 1, name: 'Arnupharp Viratanapanu', username: 'topscores', tweetText: 'Lorem Ipsum ...' },
      ],
    }
    this.addToTweetList = this.addToTweetList.bind(this)
  }

  componentDidMount() {
    const url = `http://${config.api.host}:${config.api.port}/api/tweets`
    const filter = `{ "where": { "username": "${this.state.username}" }}`
    fetch(`${url}?filter=${filter}`, { mode: 'cors' })
    .then(response => response.json())
    .then((tweets) => {
      console.log(tweets)
      this.setState({
        tweets: tweets,
      })
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
    const { name, username, tweets } = this.state
    return (
      <div className="main-panel">
        {this.props.enableTweet?
        <NewTweet
          name={name}
          username={username}
          addToTweetList={this.addToTweetList}

        />
        : null }
        <TweetList tweets={tweets} />
      </div>
    )
  }
}

export default MainPanel
