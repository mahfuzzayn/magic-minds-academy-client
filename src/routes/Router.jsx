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
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;
