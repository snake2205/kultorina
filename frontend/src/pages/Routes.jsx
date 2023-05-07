import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Logout from "./auth/logout";
import NavBar from "./components/design/navbar";
import Data_Upload from "./auth/data_upload";
import Make_Quiz from "./quizMaker/make_quiz";
import Start_Quiz from "./quizMaker/start_quiz";
import Join_Quiz from "./quizMaker/join_quiz";
import Play_Quiz from "./quizMaker/play_quiz";

function WSRoutes() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <NavBar />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/data_upload" element={<Data_Upload />} />
                <Route path="/make_quiz" element={<Make_Quiz />} />
                <Route path="/make_quiz/ws" element={<Start_Quiz />} />
                <Route path="/join_quiz" element={<Join_Quiz />} />
                <Route path="/join_quiz/ws" element={<Play_Quiz />} />
            </Route>
            </Routes>
    </BrowserRouter>
    )
}

export default WSRoutes;