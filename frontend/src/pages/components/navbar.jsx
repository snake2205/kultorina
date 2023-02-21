import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar, ProSidebarProvider  } from "react-pro-sidebar";
import Es_Neesmu_Dzeina_Bonda from "./Sidebar";


function NavBar() {
    return (
        <>
        <div><Outlet />
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
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/data_upload">Datu augšupielāde</Link>
                    </li>
                    <li>
                        <Link to="/make_quiz">Izveido viktorīnu!!!</Link>
                    </li>
                </ul>
            </nav>
            </div>
         <div>
         <ProSidebarProvider>
            <Es_Neesmu_Dzeina_Bonda />
            
        </ProSidebarProvider>
        </div>
        </>
    );
}


export default NavBar;
