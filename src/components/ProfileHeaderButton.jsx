import React, {useState} from 'react'
import { auth } from '../firebase'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'

const ProfileHeaderButton = ({ user, followers, setFollowers }) => {

  const follow = async () => {
    const curUserRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const curUserSnap = await getDoc(curUserRef);

    let localFollowers = [];
    let localFollowing = [];

    localFollowers = [...followers, auth.currentUser.uid]
    localFollowing = [...curUserSnap.data().following, user.id]

    setFollowers(localFollowers)
    await updateDoc(doc(getFirestore(), 'users', user.id), { followers: localFollowers })
    await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { following: localFollowing })

  }
  
  const unfollow = async () => {
    const curUserRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const curUserSnap = await getDoc(curUserRef);

    let localFollowers = [];
    let localFollowing = [];

    localFollowers = followers.filter(uid => uid !== auth.currentUser.uid)
    localFollowing = curUserSnap.data().following.filter(uid => uid !== user.id)

    setFollowers(localFollowers)
    await updateDoc(doc(getFirestore(), 'users', user.id), { followers: localFollowers })
    await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { following: localFollowing })
  }

  if (auth.currentUser.uid === user.id) {
    return (
      <button className='profile__content-btn edit'>Edit Profile</button>
    )
  } else {
    if (followers.includes(auth.currentUser.uid)) {
      return (
        <button className='profile__content-btn unfollow' onClick={unfollow}>unfollow</button>
      )
    } else if (!followers.includes(auth.currentUser.uid)) {
      return (
        <button className='profile__content-btn unfollow' onClick={follow}>follow</button>
      )
    }
  }
}

export default ProfileHeaderButton