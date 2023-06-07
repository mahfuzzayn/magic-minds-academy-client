import React from "react";

const ThirdParty = () => {
    const handleGoogleSignIn = () => {};

    const handleGithubSignIn = () => {};

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
