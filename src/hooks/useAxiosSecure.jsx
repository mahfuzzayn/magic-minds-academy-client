import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

// Create an Axios axiosSecure with base URL
const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/", // Replace with your base URL
});

const useAxiosSecure = () => {
    const { userLogOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Add interceptor for setting the JWT token
        const interceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-jwt-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Add interceptor for handling errors
        const errorInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (
                    error.response &&
                    [401, 403].includes(error.response.status)
                ) {
                    userLogOut().then(() => {
                        navigate("/login");
                    });
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptors on component unmount
        return () => {
            axios.interceptors.request.eject(interceptor);
            axios.interceptors.response.eject(errorInterceptor);
        };
    }, [userLogOut, navigate]);

    // Return an empty array or any other desired value
    return [axiosSecure];
};

export default useAxiosSecure;
