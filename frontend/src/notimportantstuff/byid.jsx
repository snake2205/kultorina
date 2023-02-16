import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

function ById() {
    const { id } = useParams(0);
    const [loading, setLoading] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const news = async () => {
            const data = {
                "username": "admin",
                "password": "root"
            };
            const payload = new FormData(); 
            payload.append(`username`, "admin");
            payload.append(`password`, "root");
            const config = { headers: { 'Content-Type': 'application/json' } }
            axios.post("http://127.0.0.1:8000/auth/login", payload).then((res) => { console.log(res); });
        }
        news();
    });

        return (
            <>
                <div className="Home">
                </div>
            </>
        );
}

export default ById;