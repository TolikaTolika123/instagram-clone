import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import PostHeader from '../components/PostHeader';
import PostOptions from '../components/PostOptions';
import { formatDistanceToNow } from 'date-fns'
import PostNewComment from '../components/PostNewComment';
import Header from '../components/Header';
import { auth } from '../firebase';
import { LoginPopupContext } from '../context';

const PostPage = () => {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [animation, setAnimation] = useState(false)
  const [likes, setLikes] = useState([])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const params = useParams();
  const setLoginPopup = useContext(LoginPopupContext)


  const loadPost = async () => {
    const postRef = doc(getFirestore(), 'posts', params.post);
    const postSnap = await getDoc(postRef);
    setPost({ ...postSnap.data(), id: params.post })
    setLikes(postSnap.data().likes)
    setComments(postSnap.data().comments)
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

  useEffect(() => {
    loadPost();
  }, [comments.length])

  return (
    <div className="postPage" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="postPage main">
          {Object.keys(post).length && <div className="postPage__post">
            <div className="postPage__img" onClick={addLikeDblClick}>
              <img src={post.imageUrl} alt="PostImg" />
              <svg className={animation ? 'active' : ''} onAnimationEnd={() => setAnimation(false)} aria-label="Unlike" color="#fff" fill="#fff" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            </div>
            <div className="postPage__content">
              <PostHeader post={post} />
              <ul className="postPage__comments">
                {post.comments.sort((a, b) => b.time - a.time).map(com =>
                  <li className='postPage__comment' key={com.id}>
                    <Link className="postPage__comment-pfp" to={`/profile/${com.username}`}>
                      <img src={com.profilePicUrl} alt="ProfilePic" />
                    </Link>
                    <div className="postPage__comment-content">
                      <Link className='post__username' to={`/profile/${com.username}`}>
                        {com.username}
                      </Link>
                      <p className="postPage__comment-text"> {com.text}</p>
                      <time className="postPage__comment-time">{formatDistanceToNow(new Date(com.time))} ago</time>
                    </div>
                  </li>)
                }
              </ul>
              <div className="postPage__footer">
                <PostOptions post={post} likes={likes} setLikes={setLikes} />
                <time className="post__time">{formatDistanceToNow(new Date(post.time))} ago</time>
                <PostNewComment {...{ setComments, post }}/>
              </div>
            </div>
          </div>}
        </main>
      </div>
    </div>

  )
}

export default PostPage