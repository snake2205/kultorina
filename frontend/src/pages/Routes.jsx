import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Logout from "./auth/logout";
import NavBar from "./components/navbar";
import Data_Upload from "./auth/data_upload";
import Make_Quiz from "./quizMaker/make_quiz";

function WSRoutes() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <NavBar />}>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/data_upload" element={<Data_Upload />} />
                <Route path="/make_quiz" element={<Make_Quiz />} />
            </Route>
            </Routes>
    </BrowserRouter>
    )
}

export default WSRoutes;