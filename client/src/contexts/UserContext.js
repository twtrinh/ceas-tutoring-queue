import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const UserContext = createContext();

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

export const useUser = () => useContext(UserContext);