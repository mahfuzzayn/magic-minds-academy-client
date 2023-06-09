import React from "react";
import useStudent from "../hooks/useStudent";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isStudent, isStudentLoading] = useStudent();
    const location = useLocation();

    if (loading || isStudentLoading) {
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

    if (user && isStudent) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default StudentRoute;
