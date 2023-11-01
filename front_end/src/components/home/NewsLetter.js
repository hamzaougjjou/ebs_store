import axios from 'axios';
import React, { useState } from 'react'
import { apiUrl } from '../../config';
import { PopUpMessages } from '../../elements/PopUpMessages';

function NewsLetter() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const [popUpMessage, setPopUpMessage] = useState(null);

    const validateEmail = (email_p) => {
        return String(email_p)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let setData = async () => {
            setLoading(true);
            await axios.post(apiUrl + "/api/newsletter", { "email": email })
                .then(res => {
                    console.log('====================================');
                    console.log(res.data);
                    console.log('====================================');
                    if (res.data.success) {
                        setErrorMsg(null)
                        if (res.data.code === 0) {
                            setPopUpMessage(<PopUpMessages
                                title=". اشترك في صحيفتنا الإخبارية"
                                message="انت مشترك بالفعل في صحيفتنا الإخبارية"
                                hide={setPopUpMessage}
                            />);
                        } else {
                            setPopUpMessage(<PopUpMessages
                                title=". اشترك في صحيفتنا الإخبارية"
                                message="لقد اشترك في صحيفتنا الإخبارية"
                                hide={setPopUpMessage}
                            />);
                        }
                        setEmail('');
                        return false;
                    }

                }).catch(
                    (err) => {
                        setError(true)
                        console.log('====================================');
                        console.log(err);
                        console.log('====================================');
                    }
                ).finally(() => {
                    setLoading(false);
                })
        }

        if (email.length === 0) {
            setError(true)
            setErrorMsg("المرجو ادخال البريد الالكتروني");
            return false;
        }
        else if (!validateEmail(email)) {
            setError(true)
            setErrorMsg("البريد الالكتروني غير صالح");
            return false;
        }
        setData();
    }


    return (

        <>
            {
                popUpMessage
            }

            <div className="newsletter-container">
                <div className="newsletter">
                    <h1 className="ar">
                        احصل على أفضل العروض أولاً !
                    </h1>
                    <p className="ar">
                        اشترك في صحيفتنا الإخبارية
                    </p>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        action="#" method="post">
                        <section className='d-flex error-container'>
                            <p>Email :</p>
                            {
                                error && <span className='error'>{errorMsg}</span>}
                        </section>
                        <input
                            onChange={(e) => setEmail(e.target.value.trim()) | setError(false) | setErrorMsg('')}
                            type="email" name="email" id="newsletter-email" placeholder="Email.."
                            value={email}
                        />

                        {
                            !loading ?

                                <button type="submit">اشتراك الان</button>
                                :

                                <button type="button">
                                    <i className='fas fa-spinner  fa-pulse'></i>
                                    <span>
                                        اشتراك الان
                                    </span>
                                </button>
                        }
                    </form>
                </div>
            </div>

        </>
    )
}

export default NewsLetter