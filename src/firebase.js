// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import uniqid from 'uniqid'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAvwQTwEBwvvKe_pZjAAvPbT01XrB29XY",
  authDomain: "instagram-clone-bffad.firebaseapp.com",
  projectId: "instagram-clone-bffad",
  storageBucket: "instagram-clone-bffad.appspot.com",
  messagingSenderId: "396897856208",
  appId: "1:396897856208:web:936258d93ab153de1f0cd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
}

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
}

export const logOut = async () => {
  signOut(auth);
}


export const savePost = async (img, caption) => {
  try {
    // getting username
    const usernameRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const usernameSnap = await getDoc(usernameRef);

    // getting blank image 
    const blankImageRef = ref(getStorage(), 'images/gray.jpg');
    const blankImageUrl = await getDownloadURL(blankImageRef);

    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const postRef = await addDoc(collection(getFirestore(), 'posts'), {
      username: usernameSnap.data().username,
      fullname: auth.currentUser.displayName,
      comments: [
        {
          text: caption,
          time: Date.now(),
          username: usernameSnap.data().username,
          profilePicUrl: auth.currentUser.photoURL,
          id: uniqid()
        }
      ],
      likes: [],
      imageUrl: blankImageUrl,
      profilePicUrl: auth.currentUser.photoURL,
      time: Date.now(),
      timestamp: serverTimestamp()
    });

    // 2 - Upload the image to Cloud Storage.
    const filePath = `${auth.currentUser.uid}/${postRef.id}/${img.name}`;
    const newImageRef = ref(getStorage(), filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, img);

    // 3 - Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(newImageRef);

    // 4 - Update the chat message placeholder with the image's URL.
    await updateDoc(postRef, {
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath
    });
  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }
}