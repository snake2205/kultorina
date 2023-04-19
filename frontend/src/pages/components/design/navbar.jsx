import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


function NavBar() {
    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <div className="d-flex row" style={{ height: "7%" }}>
                <div className="d-flex flex-sm-column bg-dark align-items-end wbordermain">
                    <button className="btn btn-secondary" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="border rounded-3 p-1 text-decoration-none">
                        <i className="bi bi-list bi-lg py-2 p-1"></i>
                    </button>
                    <img src="../images/klogo.png" className=""></img>
                </div>
            </div>
            <div className="row flex-grow-1" style={{ maxHeight: "93%" }}>
                <div className="col-12 col-sm-10 overflow-auto bg-light d-flex h-100">
                    <Outlet />
                    </div>
                <Sidebar />
            </div>
        </div>
    );
}

export default NavBar;