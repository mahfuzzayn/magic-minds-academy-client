import React from "react";
import useAuth from "../../../hooks/useAuth";

const ThirdParty = () => {
    const { userGoogleSignIn, userGithubSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        userGoogleSignIn()
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGithubSignIn = () => {
        userGithubSignIn()
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="third-party mt-10 flex gap-x-4">
            <button
                onClick={handleGoogleSignIn}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
                Sign in With Google
            </button>
            <button
                onClick={handleGithubSignIn}
                className="bg-black text-white py-2 px-4 rounded-lg"
            >
                Sign in With Github
            </button>
        </div>
    );
};

export default ThirdParty;
