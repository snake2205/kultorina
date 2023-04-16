import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";

function Data_Upload_Form() {
    const { register, handleSubmit } = useForm(); {/* js hook, kas ļauj izsaukt funkciju un dormas datus  */ }
    const { token, setToken } = useToken(); {/* js hook, kas ļauj saglabāt tokenu no backenda, kas dod piekļuvi citām lapām (doesnt matter) */ }
    const [error, setError] = useState(null); {/* js hook, basically variable error, kuru var definēt izmantojot funkciju setError() */ }
    const fileTypes = ["JSON"]; {/* failina tips */ }
    // https://www.npmjs.com/package/react-drag-drop-files rekur ir links uz dokumentaciju backend gudriniekam
    const onSubmit = (data, e) => {
        const payload = new FormData(); {/* izveido FormData() instanci payload */ }
        payload.append(`categories`, data.categories[0]); {/* pievieno payload datus no formas */ }
        payload.append(`field`, data.field);
        payload.append(`data`, data.data[0]);
        axios.post("http://127.0.0.1:8000/admin/data_upload", payload, { headers:  token  } )
            .then((res) => { setError(res.data.detail);})
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

                <label>Kategorijas:</label><br />
                <input {...register("categories")} type="file" /><br />
                <label>Dati:</label><br />
                <input {...register("data")} type="file" /><br />
                <label>Lauka nosaukums:</label><br />
                <input {...register("field")} type="text" /><br />
                <label>Vēlos aizsūtīt failus!</label><br />
                <input type="submit" />

            </form>{/* šādi jāizskatās formas struktūrai */}
            <p>{error}</p>{/* error ir variable, kas sākumā ir null, bet ja parādas error, tam tiek definēts teksts  */}
        </>

    )
}
export default Data_Upload_Form;