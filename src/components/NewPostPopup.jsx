import { getFirestore, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, savePost } from '../firebase';
import imgPlaceholder from '../images/placeholder.svg'
import xIcon from '../images/x.svg'

const NewPostPopup = ({ popup, setPopup, pfp }) => {
  const classes = popup ? 'newPostPopup active' : 'newPostPopup';
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState()
  const [caption, setCaption] = useState('')

  const hidePopup = () => {
    setImage('');
    setCaption('');
    setPopup(false);
    setImageFile(undefined);
  }

  const loadUsername = async () => {
    const docRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUsername(docSnap.data().username)
  }

  useEffect(() => {
    loadUsername();
  }, [])


  const handleShare = async () => {
    if (!imageFile || !caption) {
      alert('You need to fill all field first')
      return;
    }
    await savePost(imageFile, caption)
    hidePopup()
  }

  return (
    <div className={classes} onClick={hidePopup}>
      <img src={xIcon} alt="x" className="newPostPopup-close" />
      <div className="newPostPopup__content" onClick={e => e.stopPropagation()}>
        <div className="newPostPopup__header">
          <h3 className="newPostPopup__title">Create new post</h3>
          <button className='newPostPopup__sharePost' onClick={handleShare}>Share</button>
        </div>
        <div className="newPostPopup__main">
          <div className="newPostPopup__img">
            {image
              ? <img className="newPostPopup__img-uploaded" src={image} alt='' />
              : <div className="newPostPopup__img-notUploaded">
                <img className='newPostPopup__img-placeholder' src={imgPlaceholder} alt="" />
                <label className="newPostPopup__img-upload">
                  <input
                    placeholder='Select from device'
                    type="file"
                    onChange={(event) => {
                      event.target.files[0].arrayBuffer().then(buf => {
                        const blob = new Blob([buf], { type: 'image/png' });
                        setImage(URL.createObjectURL(blob));
                      })
                      setImageFile(event.target.files[0])
                    }}
                  />
                  Select from device
                </label>

              </div>}
          </div>
          <div className="newPostPopup__options">
            <div className="newPostPopup__options-header">
              <div className="newPostPopup__options-img">
                <img src={pfp} alt="pfp" />

              </div>
              <h4 className="newPostPopup__options-username">{username}</h4>
            </div>
            <textarea
              style={{ resize: 'none' }}
              placeholder='Write a caption...'
              className="newPostPopup__options-caption"
              value={caption}
              onChange={e => setCaption(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPostPopup