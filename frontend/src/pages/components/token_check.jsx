import { useToken } from "./hooks/useToken";
import { Navigate } from "react-router-dom";

export default function TokenCheck(){
    const { token, setToken } = useToken({});

    if (token == false) {
        return <Navigate to="/login" />
    } else {
        return <></>
    }
}