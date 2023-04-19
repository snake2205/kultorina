import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function NavBar() {
    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <div className="row" style={{ height: "7%" }}>
                <div className="d-flex flex-column bg-dark bordermain" align="start">
                        <img src={require("../images/klogo.png")} className="img-fluid my-auto" width="3.3%"></img>
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