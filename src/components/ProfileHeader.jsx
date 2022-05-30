import React from 'react'
import ProfileHeaderButton from './ProfileHeaderButton'

const ProfileHeader = ({ user }) => {
  return (
    <div className='profile__header'>
      <div className="profile__picture">
        <img src={user.publicImageUrl} alt="" />
      </div>
      <div className="profile__content">
        <div className="profile__content-top">
          <h2 className="profile__username">{user.username}</h2>
          <ProfileHeaderButton user={user} />
        </div>
        <p className="profile__stats">
          <b className="profile__stats-num">{user.posts.length}</b> posts
          <b className="profile__stats-num">{user.followers.length}</b> followers
          <b className="profile__stats-num">{user.following.length}</b> following
        </p>
        <p className="profile__fullName">{user.fullName}</p>
        <p className="profile__bio">{user.bio}</p>
      </div>
    </div>
  )
}

export default ProfileHeader