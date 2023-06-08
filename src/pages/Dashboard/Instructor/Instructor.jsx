import React from "react";
import { Outlet } from "react-router-dom";

const Instructor = () => {
    return (
        <div className="instructor">
            <Outlet></Outlet>
        </div>
    );
};

export default Instructor;
