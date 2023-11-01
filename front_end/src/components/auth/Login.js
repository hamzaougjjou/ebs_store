import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config';
import { addAuth } from '../../redux/reducers/authSlice';
import "./../../assets/css/auth.css";
import Error from './Error';
// import { GoogleLogin } from 'react-google-login';
// import GoogleLogin from "react-google-login";

function Login({ setShowLoginPage, setShowRegisterPage }) {

    let [email, setEmail] = useState(null);
    let [password, setPassword] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        hasError: false,
        message: ''
    });
    const dispatch = useDispatch();
    let myForm = useRef();
    const handleContainerClick = (event) => {
        // Check if the click occurred on the content div inside the parent
        if (myForm.current.contains(event.target)) {
            return;
        }
        // If the click occurred on the parent container, hide it
        setShowLoginPage(false);
    };

    let showRegPageFunc = () => {
        setShowLoginPage(false);
        setShowRegisterPage(true);
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    let handleLogin = async (e) => {
        e.preventDefault();
        setError({
            hasError: !true,
            message: ""
        });
        // validat data in form
        if (!validateEmail(email) || email === null) {
            setError({
                hasError: true,
                message: "البريد الالكتروني غير صالح"
            });
            return false;
        }
        else if (password.length < 6 || password === null) {
            setError({
                hasError: true,
                message: "كلمة المرور غير صحيحة"
            });
            return false;
        }
        setLoading(true);
        await axios.post(apiUrl + "/api/login", { "email": email, "password": password })
            .then(res => {
                if (res.data.success) {
                    dispatch(addAuth({
                        user: res.data.user,
                        token: res.data.authorization.token,
                        logedIn: true
                    }));

                    setShowLoginPage(false);

                    sessionStorage.setItem('isLogedIn', true);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                    return false;
                }

                if (res.data.error === "unauthorized") {
                    setError({
                        hasError: true,
                        message: "البريد الالكتروني او كلمة المرور غير صحيحة"
                    });
                }
            }
            ).catch(
                (err) => {
                    setError({
                        hasError: true,
                        message: "عدرا حدث خطأ ما"
                    });
                }
            ).finally(() => {
                setLoading(false);
            }
            )
    }


    return (
        <div
            onClick={handleContainerClick}
            className="login-page" style={{ backgroundColor: "rgb(0 , 0 , 0 , 50%)" }}
        >
            <div className="form" ref={myForm}>
                <h2 className='auth-title'> تسجيل الدخول </h2>
                <i
                    onClick={() => setShowLoginPage(false)}
                    className='close-login-page fa fa-times' >
                </i>

                <div className='error-container'>

                    {
                        error.hasError && <Error msg={error.message} />
                    }

                </div>

                <form className="login-form" onSubmit={(e) => handleLogin(e)} >
                    <input
                        onChange={(e) => setEmail(e.target.value.trim())}
                        type="email" placeholder="email" />
                    <input
                        onChange={(e) => setPassword(e.target.value.trim())}
                        type="password" placeholder="password" />
                    <div>
                        {
                            loading ? <button
                                className='btn-on-loading btn-submit'
                                type='button' >
                                <i className='fas fa-spinner fa-pulse'></i>
                                <span>
                                    تسجيل الدخول
                                </span>
                            </button>
                                :
                                <button className='btn-submit' type='submit' >تسجيل الدخول</button>
                        }
                    </div>


                    {/* <button className="'btn-submit login-with-google">sign in with Google</button> */}

                    {/* 
                    <GoogleLogin
                        clientId="AIzaSyBkG8j5JvU6x9t4f1Ph6ZSjBh9cezTx-K8"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}

                    <p className="message">Not registered?
                        <Link
                            onClick={showRegPageFunc}
                        > Create an account </Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Login