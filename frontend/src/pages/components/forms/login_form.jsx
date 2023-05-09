import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";
import { proxy } from "../CSS/proxy"

function Login_Form() {
    const { register, handleSubmit } = useForm(); {/* js hook, kas ļauj izsaukt funkciju un dormas datus  */ }
    const { token, setToken } = useToken(); {/* js hook, kas ļauj saglabāt tokenu no backenda, kas dod piekļuvi citām lapām (doesnt matter) */ }
    const [error, setError] = useState(null); {/* js hook, basically variable error, kuru var definēt izmantojot funkciju setError() */ }

    const onSubmit = (data, e) => {
        const payload = new FormData(); {/* izveido FormData() instanci payload */ }
        payload.append(`username`, data.username); {/* pievieno payload datus no formas */ }
        payload.append(`password`, data.password);
        const url = proxy + "/auth/login";
        axios.post(url, payload) 
            .then((res) => { setToken(res.data); setError(<Navigate to="/" />);})
            .catch((err) => {
                setError(return_error(err));
            })
        {/* definē, kas notiek pēc axios.post, res ir atbilde no backenda */ }
        {/* axios nosūta datus uz backend url, kur tie tiks apstrādāti */ }
        {/* gadījumā, ja izment error, seto error variable par paskaidrojošu tekstu */ }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>{/* kas uzspiež submit tiek izsaukta funkcija onSubmit */}
                    <label>Lietotājvārds:</label><br/>
                <input {...register("username")} type="text" /><br />{/* ...register reģistrē elementu ar nosaukumu data.username funkcijā onSubmit()  */}
                        <label>Parole:</label><br/>
                <input {...register("password")} type="text" /><br/>
                <input type="submit" /> 
            </form>{/* šādi jāizskatās formas struktūrai */}
            <p>{error}</p>{/* error ir variable, kas sākumā ir null, bet ja parādas error, tam tiek definēts teksts  */}
        </>
      
    )
  }
export default Login_Form;
