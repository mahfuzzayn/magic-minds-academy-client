import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

// Create an Axios instance with base URL
const instance = axios.create({
    baseURL: "http://localhost:5000/", // Replace with your base URL
});

const useAxiosSecure = () => {
    const { userLogOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Add interceptor for setting the JWT token
        const interceptor = instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-jwt-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Add interceptor for handling errors
        const errorInterceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Unauthorized error
                    userLogOut();
                    navigate("/login");
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
    return [];
};

export default useAxiosSecure;
