import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000`
                );
                setData(response.data);
                setError(null);
                console.log(data.id);
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



//https://codesandbox.io/s/react-router-dom-example-8vcqu?from-embed    