import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleAuthProvider = new GoogleAuthProvider();
    const githubAuthProvider = new GithubAuthProvider();

    const userLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const userGoogleSignIn = () => {
        return signInWithPopup(auth, googleAuthProvider);
    };

    const userGithubSignIn = () => {
        return signInWithPopup(auth, githubAuthProvider);
    };

    const userLogOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("OnAuthStateChange", currentUser);
            if (currentUser && currentUser?.email) {
                axios
                    .post("http://localhost:5000/jwt", {
                        email: currentUser.email,
                    })
                    .then((res) => {
                        localStorage.setItem(
                            "access-jwt-token",
                            res.data.token
                        );
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem("access-jwt-token");
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        userLogIn,
        userRegister,
        userUpdateProfile,
        userGoogleSignIn,
        userGithubSignIn,
        userLogOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
