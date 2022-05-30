import React, {useState, useEffect} from 'react'
import PostLink from './PostLink'
import { Link } from 'react-router-dom'

import { auth } from '../firebase'
import { doc, getDoc, getFirestore } from "firebase/firestore";


import gridIcon from '../images/grid.svg'
import savedIcon from '../images/saved.svg'

const ProfilePosts = ({ user, active, posts }) => {
  const [postsList, setPostsList] = useState([]);
  
  const loadPosts = async posts => {
    posts.forEach(async postId => {

      const docRef = doc(getFirestore(), "posts", postId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPostsList([...postsList, {...docSnap.data(), id: postId}])
      } else {
        console.log("No such document!");
      }
    })
  }

  useEffect(() => {
    loadPosts(posts)
  }, [posts])

  return (
    <div className={`profile__posts ${active}`}>
      <div className="profile__posts-buttons">
        <Link to={`/profile/${user.username}`} className='profile__posts-button posts'>
          <img src={gridIcon} alt="" />
          posts
        </Link>
        {auth.currentUser.uid === user.id
          && <Link to={`/profile/${user.username}/saved`} className='profile__posts-button saved'>
            <img src={savedIcon} alt="" />
            saved
          </Link>}
      </div>
      <div className="profile__posts-inner">
          {postsList.map(post => <PostLink key={post.id} post={post}/>)}
      </div>
    </div>
  )
}

export default ProfilePosts