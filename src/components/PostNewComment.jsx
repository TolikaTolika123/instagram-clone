import React, {useState} from 'react'
import { doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore'
import { auth } from '../firebase'
import uniqid from 'uniqid'

const PostNewComment = ({setComments, post}) => {
  const [newComment, setNewComment] = useState('')

  const addComment = async e => {
    e.preventDefault();
    const postRef = doc(getFirestore(), 'posts', post.id);
    const postSnap = await getDoc(postRef);

    const userRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    let localComments = [];

    localComments = [
      ...postSnap.data().comments,
      { 
        profilePicUrl: auth.currentUser.photoURL,
        username: userSnap.data().username,
        text: newComment,
        id: uniqid(),
        time: Date.now()
      }
    ]
    setComments(localComments)
    setNewComment('')
    await updateDoc(doc(getFirestore(), 'posts', post.id), { comments: localComments })
  }

  return (
    <form className="post__addComment" onSubmit={addComment}>
          <textarea
            required
            style={{ resize: 'none' }}
            className="post__addComment-textarea"
            placeholder='Add a comment...'
            value={newComment}
            onChange={e => setNewComment(e.target.value)}>
          </textarea>
          <button className="post__addComment-btn">Post</button>
        </form>
  )
}

export default PostNewComment