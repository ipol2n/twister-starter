import React, { PropTypes } from 'react'

const ProfileDetail = ({numTweets, numFollowers, numFollowings}) => (
  <div className="detail last-section">
    <div className="col">
      <div className="text">Tweets</div>
      <div className="number">{ numTweets }</div>
    </div>
    <div className="col">
      <div className="text">Followers</div>
      <div className="number">{ numFollowers }</div>
    </div>
    <div className="col">
      <div className="text">Following</div>
      <div className="number">{ numFollowings }</div>
    </div>
  </div>
)

ProfileDetail.propTypes = {
  numTweets: PropTypes.number.isRequired,
  numFollowers: PropTypes.number.isRequired,
  numFollowings: PropTypes.number.isRequired,
}

export default ProfileDetail
