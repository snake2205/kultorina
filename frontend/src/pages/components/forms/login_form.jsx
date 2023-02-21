import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState } from "react";
import { return_error } from "../errors/errorHandling";

function Login_Form() {
    const { register, handleSubmit } = useForm();
    const { token, setToken } = useToken();
    const [ error, setError ] = useState(null);

    const onSubmit = (data, e) => {
        const payload = new FormData();
        payload.append(`username`, data.username);
        payload.append(`password`, data.password);
        axios.post("http://127.0.0.1:8000/auth/login", payload)
            .then((res) => { setToken(res.data); setError(null); })
            .catch((err) => {
                setError(return_error(err));
            })
    }
    return (
        <>
        
        <form onSubmit={handleSubmit(onSubmit)}>
                <label>Lietotājvārds:</label><br/>
            <input {...register("username")} type="text" /><br/>
                    <label>Parole:</label><br/>
            <input {...register("password")} type="text" /><br/>
            <input type="submit" />
        </form>
        <p>{ error }</p>
        </>
      
    )
  }
export default Login_Form;
