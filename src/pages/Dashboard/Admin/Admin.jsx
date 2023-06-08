import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div className="admin">
            <Outlet></Outlet>
        </div>
    );
};

export default Admin;
