import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


function NavBar() {
    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <div className="d-flex row" style={{ height: "7%" }}>
                <div className="d-flex flex-sm-column bg-dark align-items-center">
                    <button className="btn btn-secondary" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="border rounded-3 p-1 text-decoration-none">
                        <i className="bi bi-list bi-lg py-2 p-1"></i>
                    </button>
                </div>
            </div>
            <div className="row flex-grow-1" style={{ maxHeight: "93%" }}>
                <div className="col-12 col-sm-10 h-100 overflow-auto">
                    <Outlet />
                </div>
                <Sidebar />
            </div>
        </div>
    );
}

export default NavBar;