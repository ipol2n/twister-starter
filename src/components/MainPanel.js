import React, { Component } from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'

const MainPanel = ({enableTweet, name, username, addToTweetList, tweets}) => (
  <div className="main-panel">
    {enableTweet?
    <NewTweet
      name={name}
      username={username}
      addToTweetList={addToTweetList}

    />
    : null }
    <TweetList tweets={tweets} />
  </div>
)

export default MainPanel
