import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Header from '../components/Header'

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [dropdownVisible, setDropdownVisible] = useState(false)

  function loadPosts() {
    // Create the query to load the last 12 posts and listen for new ones.
    const recentPostsQuery = query(collection(getFirestore(), 'posts'), orderBy('timestamp'), limit(12));

    // Start listening to the query.
    onSnapshot(recentPostsQuery, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'removed') {
          deletePost(change.doc.id);
        } else {
          const post = change.doc.data();
          if (!posts.find(post => post.id === change.doc.id)) {
            const newPost = { id: change.doc.id, ...post };
            const prevPosts = posts;
            prevPosts.push(newPost)
            setPosts(structuredClone(prevPosts))
          }
        }
      });
    });
  }

  function deletePost(id) {
    var li = document.getElementById(id);
    // If an element for that post exists we delete it.
    if (li) {
      li.parentNode.removeChild(li);
    }
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
        </main>
      </div>
    </div>

  )
}

export default Home