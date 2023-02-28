import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar, ProSidebarProvider  } from "react-pro-sidebar";
import Es_Neesmu_Dzeina_Bonda from "./Sidebar";


function NavBar() {
    return (
        <>

        <div>
        <Outlet />
        <ProSidebarProvider>
            <Es_Neesmu_Dzeina_Bonda />
        </ProSidebarProvider>
        </div>

        </>
    );
}


export default NavBar;
