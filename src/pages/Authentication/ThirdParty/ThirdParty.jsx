import React from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const ThirdParty = ({ setSuccess, setError }) => {
    const { userGoogleSignIn, userGithubSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        setSuccess("")
        setError("")

        userGoogleSignIn()
            .then((result) => {
                const loggedUser = result.user;
                const userData = {
                    name: loggedUser.displayName,
                    email: loggedUser?.email || "unknown",
                    photoURL: loggedUser.photoURL,
                    date: new Date(),
                    role: "student",
                };

                axios
                    .post("https://magic-minds-academy-server.vercel.app/users", userData, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        if (res.data.insertedId) {
                            setSuccess("Google Sign in completed successfully.");
                        }
                    });
            })
            .catch((error) => {
                const message = error.message;
                console.log(error);
                setError(message);
            });
    };

    const handleGithubSignIn = () => {
        setSuccess("")
        setError("")

        userGithubSignIn()
            .then((result) => {
                const loggedUser = result.user;
                const userData = {
                    name: loggedUser.displayName,
                    email: loggedUser?.email || "unknown",
                    photoURL: loggedUser.photoURL,
                    date: new Date(),
                    role: "student",
                };

                axios
                    .post("https://magic-minds-academy-server.vercel.app/users", userData, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        if (res.data.insertedId) {
                            setSuccess("Github Sign in completed successfully.");
                        }
                    });
            })
            .catch((error) => {
                const message = error.message;
                console.log(error);
                setError(message);
            });
    };

    return (
        <div className="third-party mt-10 flex flex-col sm:flex-row gap-4">
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
