import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import magicMindsAcademyLogo from "../../../assets/images/logo/magic_minds_academy_logo.png";
import useAuth from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useValidateImageURL } from "use-validate-image-url";
import "./NavBar.css";
import { motion } from "framer-motion";
import useTheme from "../../../hooks/useTheme";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const NavBar = () => {
    const { user, userLogOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const userPhotoStatus = useValidateImageURL(user?.photoURL);

    const handleLogOut = () => {
        userLogOut()
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    const handleTheme = () => {
        toggleTheme();
    };

    return (
        <div
            className={`nav-bar p-4 ${
                theme === "dark" ? "bg-[#2C3639]" : "bg-white"
            }`}
        >
            <div
                className={`bg-gradient-to-r nav-bar flex justify-between p-4 rounded-lg ${
                    theme === "light" ? "from-red-100" : "from-red-700"
                } ${theme === "light" ? "to-blue-100" : "to-blue-700"}`}
            >
                <div
                    className={`website-name ${
                        theme === "light" ? "text-black" : "text-white"
                    }`}
                >
                    <Link to="/" className="flex">
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
                </div>
                <div className="hamburger-menu md:hidden">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<FaBars />}
                            variant="outline"
                        />
                        <MenuList>
                            <div className="hamburger-items mx-2 font-semibold">
                                <div className="flex">
                                    <NavLink
                                        to="/"
                                        className="w-full px-1 py-2 hover:bg-gray-100"
                                    >
                                        Home
                                    </NavLink>
                                </div>
                                <div className="flex">
                                    <NavLink
                                        to="/instructors"
                                        className="w-full px-1  py-2 hover:bg-gray-100"
                                    >
                                        Instructors
                                    </NavLink>
                                </div>
                                <div className="flex">
                                    <NavLink
                                        to="/classes"
                                        className="w-full px-1 py-2 hover:bg-gray-100"
                                    >
                                        Classes
                                    </NavLink>
                                </div>
                                {user && (
                                    <div className="flex">
                                        <NavLink
                                            to={`${
                                                isAdmin
                                                    ? "/dashboard/admin/classes"
                                                    : isInstructor
                                                    ? "/dashboard/instructor/classes"
                                                    : "/dashboard/student/selected-classes"
                                            }`}
                                            className="w-full px-1 py-2 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </div>
                                )}
                                <div className="authentication mt-2">
                                    {user ? (
                                        userPhotoStatus === "valid" ? (
                                            <div className="flex gap-x-4">
                                                <div
                                                    className="min-w-[40px]"
                                                    data-tooltip-id="mma-tooltip"
                                                    data-tooltip-content={
                                                        user?.displayName ||
                                                        "No name"
                                                    }
                                                >
                                                    <img
                                                        src={user.photoURL}
                                                        className="w-[40px] h-[40px] rounded-full"
                                                    />
                                                </div>
                                                <Button
                                                    onClick={handleLogOut}
                                                    colorScheme="red"
                                                    size="md"
                                                    className="w-full"
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex gap-x-4">
                                                    <div
                                                        className="min-w-[40px]"
                                                        data-tooltip-id="mma-tooltip"
                                                        data-tooltip-content={
                                                            user?.displayName ||
                                                            "No name"
                                                        }
                                                    >
                                                        <FaUserCircle className="text-[40px]"></FaUserCircle>
                                                    </div>
                                                    <Button
                                                        onClick={handleLogOut}
                                                        colorScheme="red"
                                                        size="md"
                                                        className="w-full"
                                                    >
                                                        Logout
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <div className="flex">
                                            <Link
                                                to="/login"
                                                className="bg-red-600 text-center py-2 mt-2 mx-2 rounded-md text-white w-full"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </MenuList>
                    </Menu>
                </div>
                <div className="hidden md:flex items-center">
                    <div className="menu-list">
                        <ul
                            className={`flex gap-x-10 font-semibold ${
                                theme === "light" ? "text-black" : "text-white"
                            }`}
                        >
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/instructors">Instructors</NavLink>
                            </li>
                            <li>
                                <NavLink to="/classes">Classes</NavLink>
                            </li>
                            {user && (
                                <li>
                                    <NavLink
                                        to={`${
                                            isAdmin
                                                ? "/dashboard/admin/classes"
                                                : isInstructor
                                                ? "/dashboard/instructor/classes"
                                                : "/dashboard/student/selected-classes"
                                        }`}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    {user ? (
                        userPhotoStatus === "valid" ? (
                            <div className="ml-6 flex">
                                <div
                                    data-tooltip-id="mma-tooltip"
                                    data-tooltip-content={
                                        user?.displayName || "No name"
                                    }
                                >
                                    <img
                                        src={user.photoURL}
                                        className="w-[40px] h-[40px] rounded-full"
                                    />
                                </div>
                                <Button
                                    onClick={handleLogOut}
                                    colorScheme="red"
                                    size="md"
                                    className="ml-4"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="ml-6 flex">
                                    <div
                                        data-tooltip-id="mma-tooltip"
                                        data-tooltip-content={
                                            user?.displayName || "No name"
                                        }
                                    >
                                        <FaUserCircle
                                            className={`text-[40px] ${
                                                theme === "light"
                                                    ? "text-black"
                                                    : "text-white"
                                            }`}
                                        ></FaUserCircle>
                                    </div>
                                    <Button
                                        onClick={handleLogOut}
                                        colorScheme="red"
                                        size="md"
                                        className="ml-4"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </>
                        )
                    ) : (
                        <Link to="/login">
                            <Button
                                colorScheme="red"
                                size="md"
                                className="ml-6"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                    {theme === "light" ? (
                        <motion.button
                            onClick={handleTheme}
                            className="bg-yellow-500 text-white p-2.5 font-semibold rounded-md hover:bg-yellow-700 disabled:bg-gray-400 ml-4"
                            whileHover={{ scale: 1.1 }}
                            onHoverStart={(e) => {}}
                            onHoverEnd={(e) => {}}
                        >
                            <FaSun className="text-xl"></FaSun>
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={handleTheme}
                            className="bg-blue-500 text-white p-2.5 font-semibold rounded-md hover:bg-blue-800 disabled:bg-gray-400 ml-4"
                            whileHover={{ scale: 1.1 }}
                        >
                            <FaMoon className="text-lg"></FaMoon>
                        </motion.button>
                    )}
                </div>
                <Tooltip id="mma-tooltip" className="z-[100]" />
            </div>
        </div>
    );
};

export default NavBar;
