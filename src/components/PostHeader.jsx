import React from 'react'
import { Link } from 'react-router-dom'

const PostHeader = ({post}) => {
  return (
    <div className="post__header">
        <Link className="post__pfp" to={`/profile/${post.username}`}>
          <img src={post.profilePicUrl} alt="ProfilePic" />
        </Link>
        <Link className='post__username' to={`/profile/${post.username}`}>
          {post.username}
        </Link>
      </div>
  )
}

export default PostHeader