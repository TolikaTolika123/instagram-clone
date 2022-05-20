import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../firebase"

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}