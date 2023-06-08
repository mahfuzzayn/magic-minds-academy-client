import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { FcBarChart, FcSettings, FcUpLeft } from "react-icons/fc";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => {
        onOpen();
    };

    return (
        <div className="dashboard">
            <Button
                onClick={() => handleClick("xs")}
                key="xs"
                bg="red.500"
                color="white"
                m={4}
            >
                Open Drawer{" "}
                <RiArchiveDrawerFill className="ml-2"></RiArchiveDrawerFill>
            </Button>
            <Drawer
                placement="left"
                onClose={onClose}
                isOpen={isOpen}
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dashboard</DrawerHeader>
                    <DrawerBody>
                        <p className="font-medium">
                            Role:{" "}
                            {isAdmin
                                ? "Admin"
                                : isInstructor
                                ? "Instructor"
                                : "Student"}
                        </p>
                        <hr className="my-5" />
                        <h3 className="text-xl my-4 font-semibold flex gap-x-2 items-center">
                            <FcSettings></FcSettings>
                            {isAdmin
                                ? "Admin"
                                : isInstructor
                                ? "Instructor"
                                : "Student"}{" "}
                            Panel
                        </h3>
                        {isAdmin ? (
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/dashboard/classes"
                                        className="hover:text-red-500"
                                    >
                                        Manage Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/users"
                                        className="hover:text-red-500"
                                    >
                                        Manage Classes
                                    </Link>
                                </li>
                            </ul>
                        ) : isInstructor ? (
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/dashboard/add-a-class"
                                        className="hover:text-red-500"
                                    >
                                        Add a Class
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/classes"
                                        className="hover:text-red-500"
                                    >
                                        My Classes
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/dashboard/selected-classes"
                                        className="hover:text-red-500"
                                    >
                                        My Selected Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/enrolled-classes"
                                        className="hover:text-red-500"
                                    >
                                        My Enrolled Classes
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <hr className="my-5" />
                        <h3 className="text-xl my-4 font-semibold flex gap-x-2 items-center">
                            <FcUpLeft></FcUpLeft>Return Links
                        </h3>
                        <ul>
                            <li>
                                <Link to="/" className="hover:text-red-500">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;
