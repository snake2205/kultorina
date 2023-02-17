import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";

function Logout_Form() {
    const { register, handleSubmit } = useForm();
    const { token, destroyToken } = useToken();

    const onSubmit = (data, e) => {
        destroyToken();
    }
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <button>logout</button>
            </form>
        </>

    )
}
export default Logout_Form;
