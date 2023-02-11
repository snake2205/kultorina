import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

function ById() {
    const { id } = useParams(null);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/${id}`
                );
                setData(response.data);
                setError(null);
                console.log(data.task);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [loading]);

    return (
        <>
            <div className="Home">
                {!loading && <p>asd</p>}
            </div>
        </>
    )
}

export default ById;