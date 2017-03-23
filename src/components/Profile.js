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
    this.toggleFollow = this.toggleFollow.bind(this)
  }

  toggleFollow() {
    this.setState({
      isFollowing: !this.state.isFollowing,
    })
  }

  render() {
    return (
      <div className="profile">
        <ProfileHeader
          name={this.state.name}
          username={this.state.username}
        />
        <ProfileDetail
          numTweets={this.state.numTweets}
          numFollowers={this.state.numFollowers}
          numFollowings={this.state.numFollowings}
        />
        { this.state.isOwnProfile
            ? null
        : <ProfileFollow
            isFollowing={this.state.isFollowing}
            handleToggleFollow={this.toggleFollow}
        /> }
      </div>
    )
  }
}

export default Profile