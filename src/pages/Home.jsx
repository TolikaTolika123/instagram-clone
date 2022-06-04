import React, { useEffect, useState, useRef } from 'react'
import Post from '../components/Post'
import Header from '../components/Header'
import useScroll from '../hooks/useScroll'

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter
} from 'firebase/firestore'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [lastKey, setLastKey] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const parentRef = useRef();
  const childRef = useRef();
  const intersected = useScroll(parentRef, childRef, () => loadNextPosts());

  function loadPosts() {
    // Create the query to load the last 12 posts and listen for new ones.
    const recentPostsQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'), limit(5));

    // Start listening to the query.
    onSnapshot(recentPostsQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        const post = change.doc.data();
        if (!posts.find(post => post.id === change.doc.id)) {
          const newPost = { id: change.doc.id, ...post };
          const prevPosts = posts;
          prevPosts.push(newPost)
          setPosts(structuredClone(prevPosts))
          setLastKey(change.doc)
        }
      });
    });
  }

  function loadNextPosts() {
    // Create the query to load the last 12 posts and listen for new ones.
    const recentPostsQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp', 'desc'), limit(5),
      startAfter(lastKey));

    // Start listening to the query.
    onSnapshot(recentPostsQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        const post = change.doc.data();
        if (!posts.find(post => post.id === change.doc.id)) {
          const newPost = { id: change.doc.id, ...post };
          const prevPosts = posts;
          prevPosts.push(newPost)
          setPosts(structuredClone(prevPosts))
          setLastKey(change.doc.data().time)
        }
      });
    });
  }


  useEffect(() => {
    loadPosts();

  }, [])
  return (
    <div className="homepage" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="homepage main">
          <ul className="posts__list">
            {posts.map(post => <Post key={post.id} post={post} />)}
          </ul>
          <div ref={childRef}/>
        </main>
      </div>
    </div>

  )
}

export default Home