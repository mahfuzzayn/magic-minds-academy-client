import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import AnimatedText from "react-animated-text-content";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="mt-[130px] text-center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red.500"
                    size="xl"
                />
                <AnimatedText
                    type="words" // animate words or chars
                    animation={{
                        x: "200px",
                        y: "-20px",
                        scale: 1.1,
                        ease: "ease-in-out",
                    }}
                    animationType="float"
                    interval={0.06}
                    duration={0.8}
                    tag="p"
                    className="animated-paragraph text-2xl font-semibold mt-4 text-red-500"
                    includeWhiteSpaces
                    threshold={0.1}
                    rootMargin="20%"
                >
                    L O A D I N G
                </AnimatedText>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
