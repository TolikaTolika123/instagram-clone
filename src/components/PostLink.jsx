import React from 'react'
import { Link } from 'react-router-dom'

import commentIcon from '../images/comment.svg'
import likeIcon from '../images/heart.svg'

const PostLink = ({ post }) => {
  console.log(post)
  return (
    <Link className='profile__posts-item' to={`/post/${post.id}`}>
      <img src={post.imageUrl} alt="" />
      <div className="profile__posts-item-stats">
        <div>
          <img src={likeIcon} alt="comments" />
          <span>{post.likes.length}</span>
        </div>
        <div>
          <img src={commentIcon} alt="comments" />
          <span>{post.comments.length - 1}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostLink