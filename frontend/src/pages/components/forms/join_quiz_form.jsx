import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";
import { proxy } from "../CSS/proxy"

function Join_Quiz_Form() {
    const { register, handleSubmit } = useForm();
    const { token, setToken } = useToken(); 
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState();

    const onSubmit = (data, e) => {
        const payload = new FormData();
        payload.append(`code`, data.code);
        const url = proxy + "/quiz/join_quiz";
        axios.post(url, payload, { headers: token })
            .then((res) => {
                if (res.data.detail === true) {
                    console.log(res);
                    setRedirect(<Navigate to="ws" state={{ code: data.code }} />);
                }
            })
            .catch((err) => {
                setError(return_error(err));
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("code")} type="text" /><br />
                <input type="submit" />
            </form>
            <p>{error}</p>
            {redirect}
        </>

    )
}
export default Join_Quiz_Form;
