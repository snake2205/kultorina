import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Logout from "./logout";
import NavBar from "./components/navbar";

function WSRoutes() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <NavBar />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
            </Route>
            </Routes>
    </BrowserRouter>
    )
}

export default WSRoutes;