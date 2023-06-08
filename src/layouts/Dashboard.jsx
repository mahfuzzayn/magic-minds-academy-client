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
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => {
        onOpen();
    };

    return (
        <div className="dashboard">
            <NavBar></NavBar>
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
                                        to="/dashboard/admin/classes"
                                        className="hover:text-red-500"
                                    >
                                        Manage Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/admin/users"
                                        className="hover:text-red-500"
                                    >
                                        Manage Users
                                    </Link>
                                </li>
                            </ul>
                        ) : isInstructor ? (
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/dashboard/instructor/add-a-class"
                                        className="hover:text-red-500"
                                    >
                                        Add a Class
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/instructor/classes"
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
                                        to="/dashboard/student/selected-classes"
                                        className="hover:text-red-500"
                                    >
                                        My Selected Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/student/enrolled-classes"
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
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;
