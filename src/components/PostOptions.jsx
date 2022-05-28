import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const PostOptions = ({ post }) => {
  const [likes, setLikes] = useState(post.likes)
  const [saved, setSaved] = useState([])
  const navigate = useNavigate();

  const openPost = async () => {
    navigate(`/post/${post.id}`)
  }

  const toggleLike = async () => {
    const docRef = doc(getFirestore(), 'posts', post.id);
    const docSnap = await getDoc(docRef);

    let localLikes = [];

    if (docSnap.data().likes.includes(auth.currentUser.uid)) {
      localLikes = docSnap.data().likes.filter(uid => uid !== auth.currentUser.uid)
      setLikes(localLikes)
    } else if (!docSnap.data().likes.includes(auth.currentUser.uid)) {
      localLikes = [...docSnap.data().likes, auth.currentUser.uid]
      setLikes(localLikes)
    }
    await updateDoc(doc(getFirestore(), 'posts', post.id), { likes: localLikes })
  }

  const toggleSaved = async () => {
    const userRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    
    let localSaved = []

    if (userSnap.data().saved.includes(post.id)) {
      localSaved = userSnap.data().saved.filter(id => id !== post.id)
      setSaved(localSaved)
    } else if (!userSnap.data().saved.includes(post.id)) {
      localSaved = [...userSnap.data().saved, post.id]
      setSaved(localSaved)
    }
    await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { saved: localSaved })
  }

  useEffect(() => {
    (async function () {
      const userRef = doc(getFirestore(), 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      setSaved(userSnap.data().saved)
    })()
  }, [])

  return (
    <div>
      <ul className="post__options">
        <li className="post__option">
          <button className='post__option-btn' onClick={toggleLike}>
            {likes.includes(auth.currentUser.uid)
              ? <svg aria-label="Unlike" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              : <svg className='hover' aria-label="Like" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z" strokeWidth='.3'></path></svg>}
          </button>
        </li>
        <li className="post__option">
          <button onClick={openPost} className='post__option-btn'>
            <svg className='hover' aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </button>
        </li>
        <li className="post__option">
          <button className='post__option-btn' onClick={toggleSaved}>
            {saved?.includes(post.id)
              ? <svg aria-label="Удалить" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path></svg>
              : <svg className='hover' aria-label="Save" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>}
          </button>
        </li>
      </ul>
      {likes.length
        ? <p className='post__likes-count'>
          {likes.length === 1 ? '1 like' : `${likes.length} likes`}
        </p>
        : <p className='post__likes-count'>
          <span>Be the first to </span><button className='post__add-firstLik' onClick={toggleLike}>like this</button>
        </p>}
    </div>
  )
}

export default PostOptions