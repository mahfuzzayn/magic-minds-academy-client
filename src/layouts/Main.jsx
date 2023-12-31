import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";

const Main = () => {
    return (
        <div className="main-layout">
            <div className="container max-w-[1920px] mx-auto">
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Main;
