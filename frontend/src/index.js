import React from 'react';
import ReactDOM from 'react-dom/client';
import WSRoutes from "./pages/Routes";
import { Sidebar, Menu, MenuItem, useProSidebar, ProSidebarProvider  } from "react-pro-sidebar";
import Es_Neesmu_Dzeina_Bonda from "./pages/components/Sidebar";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        
        
        <WSRoutes />
        
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

