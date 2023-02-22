import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState, useEffect } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";

function Signup_Form() {
    const { register, handleSubmit } = useForm();
    const { token, setToken } = useToken();
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState();

    const FotoQ = ["lokācija", "gadskaitļi", "Karte", "ātrums"];
    const AudioQ = ["komponists", "nosaukums", "gadskaitlis"];

    let type = null;
    let options = null;

    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    if (selected === "foto") {
        type = FotoQ;
    } else if (selected === "audio") {
        type = AudioQ;
    }

    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
    }

    const onSubmit = (data, e) => {
        const payload = new FormData();
        payload.append(`username`, data.username);
        payload.append(`password`, data.password);
        payload.append(`email`, data.email);
        axios.post("http://127.0.0.1:8000/auth/signup", payload)
            .then((res) => { setToken(res.data); setError(<Navigate to="/" />); })
            .catch((err) => {
                setError(return_error(err));
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>mediju tips:</label><br />
                <select name="field" id="field" onChange={changeSelectOptionHandler}>
                    <option value="foto">Foto</option>
                    <option value="audio">Audio</option>
                </select><br />
                <label>jautajuma veids:</label><br />
                <select name="question_type" id="question_type">
                    {options}
                </select><br />
                <button>Informācija ir ievadīta!</button>
            </form>
            <p>{error}</p>
        </>

    )
}




export default Signup_Form;
