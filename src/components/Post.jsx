import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import PostOptions from './PostOptions'
import PostNewComment from './PostNewComment'
import PostHeader from './PostHeader'
import {auth} from '../firebase'
import { getFirestore, updateDoc, getDoc, doc } from 'firebase/firestore'
import { LoginPopupContext } from '../context'

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments)
  const [likes, setLikes] = useState(post.likes)
  const [animation, setAnimation] = useState(false)
  const navigate = useNavigate();
  const setLoginPopup = useContext(LoginPopupContext)


  const openPost = async () => {
    navigate(`/post/${post.id}`)
  }

  const addLikeDblClick = async e => {
    setAnimation(true);
    if (e.detail === 2) {
      if (!auth.currentUser) {
        setLoginPopup(true)
        return;
      };
      const docRef = doc(getFirestore(), 'posts', post.id);
      const docSnap = await getDoc(docRef);
  
      let localLikes = [];
  
      if (!docSnap.data().likes.includes(auth.currentUser.uid)) {
        localLikes = [...docSnap.data().likes, auth.currentUser.uid]
        setLikes(localLikes)
        await updateDoc(doc(getFirestore(), 'posts', post.id), { likes: localLikes })
      }
    }
  }  

  return (
    <li className='post'>
      <PostHeader post={post}/>
      <div
        className='post__img'
        style={{ backgroundImage: "url(" + post.imageUrl + ")", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        onClick={addLikeDblClick}
      >
        <svg className={animation ? 'active' : ''} onAnimationEnd={() => setAnimation(false)} aria-label="Unlike" color="#fff" fill="#fff" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
      </div>
      <div className="post__footer">
        <PostOptions post={post} likes={likes} setLikes={setLikes}/>
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