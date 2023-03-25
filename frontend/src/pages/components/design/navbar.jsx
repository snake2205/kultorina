import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


function NavBar() {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column">
            <div className="row bg-dark">
                <div className="col-sm-auto bg-dark sticky-top">
                    <div className="d-flex flex-sm-column flex-nowrap bg-dark align-items-center sticky-top">
                        <button className="btn btn-secondary" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="border rounded-3 p-1 text-decoration-none">
                            <i className="bi bi-list bi-lg py-2 p-1"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col">
                    <Outlet />
                </div>
                <Sidebar />
            </div>
        </div>
    );
}

export default NavBar;