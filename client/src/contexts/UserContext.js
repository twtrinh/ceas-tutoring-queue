import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase, { auth } from '../firebase';

const UserContext = createContext();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export function UserProvider({ children }) {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged(authState => {
            setUser(authState)
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )
}

export const signIn = () => auth.signInWithPopup(googleProvider);

export const useUser = () => useContext(UserContext);