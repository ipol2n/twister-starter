import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileDetail from './ProfileDetail'
import ProfileFollow from './ProfileFollow'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Kittiporn',
      username: 'ipol2n',
      numTweets: 123,
      numFollowers: 234,
      numFollowings: 345,
      isFollowing: true,
    }
  }

  render() {
    return (
      <div className="profile">
        <ProfileHeader
          name={this.props.name}
          username={this.props.username}
        />
        <ProfileDetail
          numTweets={this.state.numTweets}
          numFollowers={this.state.numFollowers}
          numFollowings={this.state.numFollowings}
        />
        { this.props.isOwnProfile
            ? null
        : <ProfileFollow
            isFollowing={this.props.isFollowing}
            handleToggleFollow={this.props.handleToggleFollow}
        /> }
      </div>
    )
  }
}

export default Profile