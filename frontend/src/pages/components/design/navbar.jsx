import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../CSS/css.css"

function NavBar() {
    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <div className="d-flex row flex-row bg-dark" style={{ height: "50px" }}>
                <div className="col-1" align="start">
                    <img className="logo" src={require("../images/klogo.png")}></img>
                </div>
                <div className="col-10"></div>
                <div className="col-1 my-auto" align="end">
                    <button className="btn btn-secondary" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="border rounded-3 p-1 text-decoration-none">
                        <i className="bi bi-list bi-lg py-2 p-1"></i>
                    </button>
                </div>
            </div>
            <div className="row flex-grow-1" style={{ maxHeight: "93%" }}>
                <div className="col-12 col-sm-10 overflow-auto bodymainbg d-flex h-100">
                    <Outlet />
                    </div>
                <Sidebar />
            </div>
        </div>
    );
}

export default NavBar;