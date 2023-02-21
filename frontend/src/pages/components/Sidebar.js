import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function Es_Neesmu_Dzeina_Bonda() {
  const { collapseSidebar, rtl } = useProSidebar();
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex", flexDirection: "row-reverse" } )}>
        <Sidebar  rtl={true} style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Čīča</h2>
          </MenuItem>
          <MenuItem component={<Link to="/home" />} icon={<HomeOutlinedIcon />}>Māja</MenuItem>
          <MenuItem component={<Link to="/login" />} icon={<PeopleOutlinedIcon />}>Ieiešana</MenuItem>
          <MenuItem component={<Link to="/signup" />} icon={<ContactsOutlinedIcon />}>Pievienošanās</MenuItem>
          <MenuItem component={<Link to="/logout" />} icon={<ReceiptOutlinedIcon />}>Aiziešana</MenuItem>
          <MenuItem component={<Link to="/data_upload" />} icon={<HelpOutlineOutlinedIcon />}>Datu augšupielāde</MenuItem>
          <MenuItem component={<Link to="/make_quiz" />} icon={<CalendarTodayOutlinedIcon />}>Izveido viktorīnu</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1 style={{ color: "black", marginRight: "5rem" }}>
          Mr. Čīča
        </h1>
      </main>
      </div>
    );
  }
  
  export default Es_Neesmu_Dzeina_Bonda;