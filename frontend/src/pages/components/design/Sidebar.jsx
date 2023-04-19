import { useState, useEffect } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../CSS/css.css"


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
        <div className="offcanvas offcanvas-end w-50 bg-light bg-dark bordermain" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body text-primary text-left">
                <div className="col">
                    <Links />
                </div>
            </div>
        </div>
    );
}

function DesktopSidebar() {
    return (
        <div className="col-2 bg-dark text-primary text-left h-100 bordermain">
            <Links />
        </div>
    );
}

function Links() {
    return (
        <>
            <div className="row p-2 hover bordermain buttoncol">
           <a href="/" className="nav-link text-truncate ">
                <i className="fs-5 bi-house"></i><span className="ms-1 d-inline">Sākumlapa</span>
            </a>
        </div>
            <div className="row p-2 hover bordermain buttoncol">
                <a href="/login" className="nav-link text-truncate ">
                    <i className="bi bi-door-open"></i><span className="ms-1 d-inline">Pieslēgties</span>
            </a>
        </div>
            <div className="row p-2 bordermain hover buttoncol">
                <a href="/logout" className="nav-link text-truncate ">
                    <i className="bi bi-door-closed"></i><span className="ms-1 d-inline">Atslēgties</span>
            </a>
        </div>
            <div className="row p-2 hover bordermain buttoncol">
                <a href="/signup" className="nav-link text-truncate ">
                    <i className="bi bi-pencil-square"></i><span className="ms-1 d-inline">Reģistrēties</span>
            </a>
        </div>
            <div className="row p-2 hover bordermain buttoncol">
                <a href="/make_quiz" className="nav-link text-truncate ">
                    <i className="bi bi-play-fill"></i><span className="ms-1 d-inline">Spēlēt viktorīnu</span>
            </a>
        </div>
            <div className="row p-2 hover bordermain buttoncol">
                <a href="/data_upload" className="nav-link text-truncate ">
                    <i className="bi bi-upload"></i><span className="ms-1 d-inline">Datu augšupielāde</span>
            </a>
        </div>
        </>
    );
}
export default Sidebar;

