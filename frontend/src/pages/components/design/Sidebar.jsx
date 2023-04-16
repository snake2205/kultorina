import { useState, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React from "react";
import { Link, Outlet } from "react-router-dom";


function Sidebar() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 576;

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return width < breakpoint ? <MobileSidebar /> : <DesktopSidebar />;
}

function MobileSidebar() {
    return (
        <div className="offcanvas offcanvas-end w-50 bg-light bg-dark" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body text-primary text-center">
                <div className="col">
                    <Links />
                </div>
            </div>
        </div>
    );
}

function DesktopSidebar() {
    return (
        <div className="col-2 bg-dark text-primary text-center h-100">
            <Links />
        </div>
    );
}

function Links() {
    return (
        <>
        <div className="row p-2">
            <a href="/" className="nav-link text-truncate">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Home</span>
            </a>
        </div>
        <div className="row p-2">
            <a href="/login" className="nav-link text-truncate">
                    <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Login</span>
            </a>
        </div>
        <div className="row p-2">
            <a href="/logout" className="nav-link text-truncate">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Logout</span>
            </a>
        </div>
        <div className="row p-2">
            <a href="/signup" className="nav-link text-truncate">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Signup</span>
            </a>
        </div>
        <div className="row p-2">
            <a href="/make_quiz" className="nav-link text-truncate">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Play quiz</span>
            </a>
        </div>
        <div className="row p-2">
            <a href="/data_upload" className="nav-link text-truncate">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Data upload</span>
            </a>
        </div>
        </>
    );
}
export default Sidebar;

