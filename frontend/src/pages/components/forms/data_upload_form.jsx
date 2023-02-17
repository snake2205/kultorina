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
    const fileTypes = ["JSON"]; {/* failina tips */}
    // https://www.npmjs.com/package/react-drag-drop-files rekur ir links uz dokumentaciju backend gudriniekam
    const onSubmit = (data, e) => {
        const payload = new FormData(); {/* izveido FormData() instanci payload */ }
        payload.append(`file_kategorija`, data.file_kategorija); {/* pievieno payload datus no formas */ }
        payload.append(`lauka_nosaukums`, data.lauka_nosaukums);
        payload.append(`file_dati`, data.file_dati);
        axios.post("http://127.0.0.1:8000/admin/data_upload", payload) 
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

                    <label>Kategorijas:</label><br/>
                <FileUploader name="file_kategorija" types={fileTypes} maxSize={1} />
                    <label>Dati:</label><br/>
                <FileUploader name="file_dati" types={fileTypes} maxSize={1} />
                    <label>Lauka nosaukums:</label><br/>
                <input {...register("lauka_nosaukums")} type="text" /><br />
                    <label>Vēlos aizsūtīt failus!</label><br/>
                <input type="submit" /> 

            </form>{/* šādi jāizskatās formas struktūrai */}
            <p>{error}</p>{/* error ir variable, kas sākumā ir null, bet ja parādas error, tam tiek definēts teksts  */}
        </>
      
    )
  }
export default Data_Upload_Form;