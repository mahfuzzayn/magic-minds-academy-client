import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import magicMindsAcademyLogo from "../../../assets/images/logo/magic_minds_academy_logo.png";

const Footer = () => {
    return (
        <div className="footer bg-gradient-to-r from-blue-100 to-red-100">
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
    );
};

export default Footer;
