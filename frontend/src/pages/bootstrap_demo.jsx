import { Outlet } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Es_Neesmu_Dzeina_Bonda from "./components/Sidebar";

function Demo() {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-md-10">
                    <Outlet />
                </div>
                <div className="col-md-2 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="/" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                </a>
                                <a href="/login" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Login</span>
                                </a>
                                <a href="/signup" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Signup</span>
                                </a>
                                <a href="/logout" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                                </a>
                                <a href="/make_quiz" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Izveido viktorinu</span>
                                </a>
                                <a href="/data_upload" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">augsupielādē datus</span>
                                </a>
                            </li>
                        </ul>
                            <div className="dropdown pb-4">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                        <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
	);
}

export default Demo;