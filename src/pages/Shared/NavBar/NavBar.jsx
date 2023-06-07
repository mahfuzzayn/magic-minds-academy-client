import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import magicMindsAcademyLogo from "../../../assets/images/logo/magic_minds_academy_logo.png";
import useAuth from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useValidateImageURL } from "use-validate-image-url";

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
            <div className="hamburger-menu md:hidden">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FaBars />}
                        variant="outline"
                    />
                    <MenuList>
                        <div className="font-semibold">
                            <MenuItem>
                                <Link to="/">Home</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/">Instructors</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/">Classes</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/">Dashboard</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    to="/login"
                                    className="bg-red-600 text-center py-1 rounded-md text-white w-full"
                                >
                                    Login
                                </Link>
                            </MenuItem>
                        </div>
                    </MenuList>
                </Menu>
            </div>
            <div className="hidden md:flex items-center">
                <div className="menu-list">
                    <ul className="flex gap-x-10 font-semibold">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Instructors</Link>
                        </li>
                        <li>
                            <Link to="/">Classes</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/">Dashboard</Link>
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
                                    <FaUserCircle className="text-[40px]"></FaUserCircle>
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
                        <Button colorScheme="red" size="md" className="ml-6">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
            <Tooltip id="mma-tooltip" />
        </div>
    );
};

export default NavBar;
