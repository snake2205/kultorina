import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";

function Join_Quiz_Form() {
    const { register, handleSubmit } = useForm();
    const { token, setToken } = useToken(); 
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState();

    const onSubmit = (data, e) => {
        const payload = new FormData();
        payload.append(`code`, data.code);
        axios.post("http://127.0.0.1:8000/quiz/join_quiz", payload, { headers: token })
            .then((res) => {
                if (res.data.detail === true) {
                    console.log(data.code);
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
