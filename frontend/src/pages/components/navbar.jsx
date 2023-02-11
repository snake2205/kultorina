import React from "react";
import { Link, Outlet } from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/ ">Home</Link>
                    </li>
                    <li>
                        <Link to="/signup ">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}


export default NavBar;
