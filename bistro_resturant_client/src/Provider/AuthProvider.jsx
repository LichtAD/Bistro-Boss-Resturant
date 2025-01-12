import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(loading, user);

    // ! register with email and password
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // ! log in with email and password
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // ! sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle)
    }

    // ! update profile
    const updateMyProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }

    // ! log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const AuthInfo = {
        user,
        setUser,
        loading,
        createNewUser,
        logInUser,
        signInWithGoogle,
        updateMyProfile,
        logOut
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return <AuthContext.Provider value={AuthInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;