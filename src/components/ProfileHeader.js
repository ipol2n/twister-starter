import React, { PropTypes } from 'react'

const ProfileHeader = ({ name, username }) => (
  <div className="header">
    <a href="me.html">
      <div className="name">{ name }</div>
    </a>
    <a href="me.html">
      <div className="screen-name">@{ username }</div>
    </a>
  </div>
)

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default ProfileHeader
