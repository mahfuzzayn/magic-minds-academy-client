import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            console.log("OnAuthStateChange", currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
