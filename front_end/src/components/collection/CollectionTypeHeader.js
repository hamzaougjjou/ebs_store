import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiStorageUrl, apiUrl } from '../../config';
// import tv from "./../../assets/img/tv.png"

function CollectionTypeHeader({ id }) {

    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        let getData = async () => {
            setLoading(true);
            await axios.get(apiUrl + "/api/categories/" + id)
                .then(res => {
                    if (res.data.success) {
                        setCategory(res.data.category)
                    }
                }
                )
                .catch((err) => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        getData();
    }, [id])

    return (
        <>
            {
                !loading ?
                    <div>
                        <section className='up-header-container  d-center'>
                            <img src={apiStorageUrl + '/' + category.image} alt="tv" />
                        </section>
                        <section className='down-header-container'>
                            <h2 className='c-light'> {category.name}</h2>
                        </section>
                    </div>
                    :
                    <div>
                        <section className='up-header-container d-center'>
                            <div style={{ height: '90%' }} className='line w90 c-light'></div>
                        </section>
                        <section className='down-header-container d-center'>
                            <h2 className='line h50 w200p c-light'></h2>
                        </section>
                    </div>
            }
        </>
    )
}

export default CollectionTypeHeader;