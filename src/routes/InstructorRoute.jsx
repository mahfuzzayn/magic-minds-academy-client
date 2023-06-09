import React from "react";
import useInstructor from "../hooks/useInstructor";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return (
            <div className="mt-[130px] text-center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red.500"
                    size="xl"
                />
                <h2 className="animated-paragraph text-2xl font-semibold mt-4 text-red-500">
                    L O A D I N G
                </h2>
            </div>
        );
    }

    if (user && isInstructor) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
