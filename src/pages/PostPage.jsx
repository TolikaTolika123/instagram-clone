import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import PostHeader from '../components/PostHeader';
import PostOptions from '../components/PostOptions';
import { formatDistanceToNow } from 'date-fns'
import PostNewComment from '../components/PostNewComment';
import Header from '../components/Header';

const PostPage = () => {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState(post.comments)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const params = useParams();

  const loadPost = async () => {
    const postRef = doc(getFirestore(), 'posts', params.post);
    const postSnap = await getDoc(postRef);
    setPost({ ...postSnap.data(), id: params.post })
  }

  useEffect(() => {
    loadPost();
  }, [])

  return (
    <div className="postPage" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="postPage main">
          {Object.keys(post).length && <div className="postPage__post">
            <div className="postPage__img">
              <img src={post.imageUrl} alt="PostImg" />
            </div>
            <div className="postPage__content">
              <PostHeader post={post} />
              <ul className="postPage__comments">
                {post.comments.map(com =>
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
                <PostOptions post={post} />
                <time className="post__time">{formatDistanceToNow(new Date(post.time))} ago</time>
                <PostNewComment {...{ setComments, post }} />
              </div>
            </div>
          </div>}
        </main>
      </div>
    </div>

  )
}

export default PostPage