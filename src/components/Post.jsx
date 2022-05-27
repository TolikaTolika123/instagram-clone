import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { getFirestore } from 'firebase/firestore'
import { getDoc, doc } from 'firebase/firestore'
import PostOptions from './PostOptions'
import PostNewComment from './PostNewComment'
import PostHeader from './PostHeader'

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments)
  const navigate = useNavigate();

  const openPost = async () => {
    const docRef = doc(getFirestore(), 'posts', post.id);
    const docSnap = await getDoc(docRef);
    navigate(`/post/${post.id}`)
  }

  

  return (
    <li className='post'>
      <PostHeader post={post}/>
      <div
        className="post__img"
        style={{ backgroundImage: "url(" + post.imageUrl + ")", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
      >
      </div>
      <div className="post__footer">
        <PostOptions post={post}/>
        <div className="post__caption">
          <Link className='post__caption-username' to={`/profile/${comments[0].username}`}>{comments[0].username} </Link>
          <p className="post__caption-text">{comments[0].text}</p>
        </div>
        {comments.length > 1 && <p onClick={openPost} className='post__allComments'>View all {comments.length} comments</p>}
        <time className="post__time" onClick={openPost}>{formatDistanceToNow(new Date(post.time))} ago</time>
      <PostNewComment {...{setComments, post}}/>
      </div>
    </li>
  )
}

export default Post