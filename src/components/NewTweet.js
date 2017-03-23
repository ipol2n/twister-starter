import React, { PropTypes, Component } from 'react'
import config from '../config'

class NewTweet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetText: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnChange(event) {
    this.setState({
      tweetText: event.target.value,
    })
  }

  handleOnKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.addTweet({
        name: this.props.name,
        username: this.props.username,
        tweetText: this.state.tweetText,
      })
    }
  }

  handleOnClick() {
    this.addTweet({
      name: this.props.name,
      username: this.props.username,
      tweetText: this.state.tweetText,
    })
  }

  addTweet(tweet) {
    fetch(`http://${config.api.host}:${config.api.port}/api/tweets`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(tweet),
    })
    .then(response => response.json())
    .then((json) => {
      if (typeof json.id !== 'undefined') {
        this.props.addToTweetList(json)
        this.setState({
          tweetText: '',
        })
      }
    })
  }



  render() {
    return (
      <div className="new-tweet first-item">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="tweet-text col-sm-10">
              <input
                type="text"
                className="form-control"
                id="tweetText"
                placeholder="What's happening"
                value={this.state.tweetText}
                onChange={this.handleOnChange}
                onKeyDown={this.handleOnKeyDown}
              />
            </div>
            <div className="col-sm-2">
              <input
                type="button"
                className="btn btn-default"
                value="Tweet"
                onClick={this.handleOnClick}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

NewTweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  addToTweetList: PropTypes.func.isRequired,
}

export default NewTweet
