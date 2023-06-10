import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import magicMindsAcademyLogo from "../../../assets/images/logo/magic_minds_academy_logo.png";
import useAuth from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useValidateImageURL } from "use-validate-image-url";
import "./NavBar.css";

const NavBar = () => {
    const { user, userLogOut } = useAuth();
    const userPhotoStatus = useValidateImageURL(user?.photoURL);

    const handleLogOut = () => {
        userLogOut()
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="bg-gradient-to-r from-red-100 to-blue-100 nav-bar flex justify-between p-4 m-4 rounded-lg">
            <div className="website-name">
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
            <div className="hamburger-menu lg:hidden">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FaBars />}
                        variant="outline"
                        className="mt-0"
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
                                        to="/dashboard"
                                        className="w-full px-1 py-2 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            )}
                            <div className="authentication mt-2">
                                {user ? (
                                    userPhotoStatus === "valid" ? (
                                        <div className="flex items-center gap-x-4">
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
                                                className="w-full mt-0"
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-x-4">
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
                                                    className="w-full mt-0"
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
            <div className="hidden lg:flex items-center">
                <div className="menu-list">
                    <ul className="flex gap-x-10 font-semibold">
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
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                {user ? (
                    userPhotoStatus === "valid" ? (
                        <div className="ml-6 flex items-center">
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
                                className="ml-4 mt-0"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="ml-6 flex items-center">
                                <div
                                    data-tooltip-id="mma-tooltip"
                                    data-tooltip-content={
                                        user?.displayName || "No name"
                                    }
                                >
                                    <FaUserCircle className="text-[40px]"></FaUserCircle>
                                </div>
                                <Button
                                    onClick={handleLogOut}
                                    colorScheme="red"
                                    size="md"
                                    className="ml-4 mt-0"
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
                            className="ml-6 mt-0"
                        >
                            Login
                        </Button>
                    </Link>
                )}
            </div>
            <Tooltip id="mma-tooltip" className="z-[100]" />
        </div>
    );
};

export default NavBar;
