import React, { useEffect, useState } from 'react'
import axios from "axios";

function useFetch(url, method = "GET", body = {}) {

    let mainUrl = " http://localhost:1337";

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let exeRequest = async () => {
            await fetch(`${mainUrl}`,
                {
                    method: method.toUpperCase(),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }
            )
                .then(res => res.json())
                .then(data => {
                    setData(data)
                }
                ).catch(error => {

                    setLoading(false);
                    setError( error );
                })
        }
        exeRequest();
    }, [url])


    return { data, loading, error };
}

export default useFetch;