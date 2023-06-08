import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Student from "../pages/Dashboard/Student/Student";
import Admin from "../pages/Dashboard/Admin/Admin";
import Instructor from "../pages/Dashboard/Instructor/Instructor";
import AdminRoute from "./AdminRoute";
import AdminClasses from "../pages/Dashboard/Admin/AdminClasses";
import AdminUsers from "../pages/Dashboard/Admin/AdminUsers";
import InstructorRoute from "./InstructorRoute";
import InstructorAddAClass from "../pages/Dashboard/Instructor/InstructorAddAClass";
import InstructorClasses from "../pages/Dashboard/Instructor/InstructorClasses";
import StudentSelectedClasses from "../pages/Dashboard/Student/StudentSelectedClasses";
import StudentEnrolledClasses from "../pages/Dashboard/Student/StudentEnrolledClasses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <Admin></Admin>
                    </AdminRoute>
                ),
                children: [
                    {
                        path: "classes",
                        element: <AdminClasses></AdminClasses>,
                    },
                    {
                        path: "users",
                        element: <AdminUsers></AdminUsers>,
                    },
                ],
            },
            {
                path: "instructor",
                element: (
                    <InstructorRoute>
                        <Instructor></Instructor>
                    </InstructorRoute>
                ),
                children: [
                    {
                        path: "add-a-class",
                        element: <InstructorAddAClass></InstructorAddAClass>,
                    },
                    {
                        path: "classes",
                        element: <InstructorClasses></InstructorClasses>,
                    },
                ],
            },
            {
                path: "student",
                element: <Student></Student>,
                children: [
                    {
                        path: "selected-classes",
                        element: (
                            <StudentSelectedClasses></StudentSelectedClasses>
                        ),
                    },
                    {
                        path: "enrolled-classes",
                        element: (
                            <StudentEnrolledClasses></StudentEnrolledClasses>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;
