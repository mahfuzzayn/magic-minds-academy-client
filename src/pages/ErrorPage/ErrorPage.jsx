import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const ErrorPage = () => {
    useTitle("404");

    return (
        <div className="error-page 404 mt-[100px] mb-[130px]">
            <div className="flex flex-col justify-center items-center">
                <div className="picture mb-10">
                    <img
                        src="https://media3.giphy.com/media/JQMlfqZfEIaQDopMBQ/giphy.gif?cid=6c09b9527714219d02507daba10822431647f5ae0d2715f5&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=s"
                        className="w-full max-w-[640px]"
                        alt=""
                    />
                </div>
                <Link to="/">
                    <button className="bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
