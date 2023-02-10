import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
            </ul>
        </nav>
    );
}


export default NavBar;
