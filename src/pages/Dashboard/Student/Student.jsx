import React from "react";
import { Outlet } from "react-router-dom";

const Student = () => {
    return (
        <div className="student">
            <Outlet></Outlet>
        </div>
    );
};

export default Student;
