import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import magicMindsAcademyLogo from "../../../assets/images/logo/magic_minds_academy_logo.png";
import useTheme from "../../../hooks/useTheme";

const Footer = () => {
    const { theme } = useTheme();

    return (
        <div
            className={`footer ${
                theme === "light"
                    ? "bg-white text-black"
                    : "bg-[#2C3639] text-white"
            } pt-[130px]`}
        >
            <div
                className={`bg-gradient-to-r ${
                    theme === "light" ? "from-blue-100" : "from-blue-700"
                }  ${theme === "light" ? "to-red-100" : "to-red-700"} `}
            >
                <div className="flex flex-col md:flex-row-reverse justify-between p-4 gap-y-8">
                    <div className="website-name">
                        <Link to="/" className="flex md:justify-end">
                            <img
                                src={magicMindsAcademyLogo}
                                alt="Magic Minds Academy Logo"
                                className="w-10"
                            />
                            <p className="flex flex-col">
                                <span className="text-lg uppercase leading-[20px]">
                                    Magic Minds
                                </span>
                                <span className="text-2xl uppercase font-bold leading-[20px]">
                                    Academy
                                </span>
                            </p>
                        </Link>
                        <p className="font-semibold text-sm mt-2">
                            Unlock the extraordinary by learning new.
                        </p>
                    </div>
                    <div className="flex flex-col font-medium text-sm gap-y-1">
                        <p className="text-lg font-semibold mb-1">
                            Connect with us
                        </p>
                        <p>+8801580464009</p>
                        <p>Sylhet, Bangladesh</p>
                        <ul className="flex text-xl font-semibold mt-2 gap-x-2">
                            <a
                                href="https://www.facebook.com/mahfuzzayn8/"
                                target="_blank"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://twitter.com/guidingtechca"
                                target="_blank"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://www.youtube.com/@mahfuzzayn"
                                target="_blank"
                            >
                                <FaYoutube />
                            </a>
                        </ul>
                    </div>
                </div>
                <p className="text-center p-4 font-semibold">
                    Copyright © 2023 - All right reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
