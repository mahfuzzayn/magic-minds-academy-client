import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./providers/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ChakraProvider>
                        <RouterProvider router={router} />
                    </ChakraProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
