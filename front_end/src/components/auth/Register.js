import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

import { apiUrl } from '../../config';
import "./../../assets/css/auth.css";
import Error from './Error';
import { addAuth } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function Register({ setShowLoginPage, setShowRegisterPage }) {

    let [registerState, setRegisterState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
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
        setShowRegisterPage(false);
    };

    let showRegPageFunc = () => {
        setShowLoginPage(true);
        setShowRegisterPage(false);
    }

    let handleInputs = (e) => {
        setError({
            hasError: false,
            message: ""
        });

        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value.trim()
        }
        )
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    let handleRegister = (e) => {

        e.preventDefault();
        setError({
            hasError: !true,
            message: ""
        });
        // validat data in form
        if (registerState.name.length < 2) {
            setError({
                hasError: true,
                message: "اسم المستخدم غير صحيح"
            });
            return false;
        }
        else if (!validateEmail(registerState.email)) {
            setError({
                hasError: true,
                message: "البريد الالكتروني غير صالح"
            });
            return false;
        }
        else if (registerState.password.length < 6) {
            setError({
                hasError: true,
                message: "كلمة المرور غير صحيحة"
            });
            return false;
        }
        else if (registerState.confirmPassword.length < 6) {
            setError({
                hasError: true,
                message: "تأكيد كلمة المرور غير صحيحة"
            });
            return false;
        }
        else if (registerState.confirmPassword !== registerState.password) {
            setError({
                hasError: true,
                message: "تأكيد كلمة المرور و كلمة المرور غير متطبقتان"
            });
            return false;
        }

        setLoading(true);
        axios.post(apiUrl + "/api/register", registerState).then(res => {

            if (res.data.success) {
                // console.log("user loged in ");
                // console.log(res.data);

                dispatch(addAuth({
                    user: res.data.user,
                    token: res.data.token,
                    logedIn: true
                }));

                setShowLoginPage(false);
                setShowRegisterPage(false);

                sessionStorage.setItem('isLogedIn', true);
                sessionStorage.setItem('email', registerState.email);
                sessionStorage.setItem('password', registerState.password);

                // Set the token as an HttpOnly cookie
                document.cookie = `token=${res.data.token}; path=/; HttpOnly; Secure`;

                return false;
            }

            if (res.data.error.toLowerCase() === "the email has already been taken") {
                setError({
                    hasError: true,
                    message: "البريد الالكتروني مستعمل مسبقا"
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
            className="login-page" style={{ backgroundColor: "rgb(0 , 0 , 0 , 45%)" }}>

            <div className="form" ref={myForm}>
                <h2 className='auth-title'>انشاء حساب</h2>
                <i
                    onClick={() => setShowRegisterPage(false)}
                    className='close-login-page fa fa-times' >
                </i>
                <div className='error-container'>

                    {
                        error.hasError && <Error msg={error.message} />
                    }

                </div>

                <form className="login-form" onSubmit={(e) => handleRegister(e)} >

                    <input
                        onChange={(e) => handleInputs(e)}
                        name="name"
                        type="text" placeholder="full name" />
                    <input
                        onChange={(e) => handleInputs(e)}
                        name="email"
                        type="text" placeholder="email address" />
                    <input
                        onChange={(e) => handleInputs(e)}
                        name="password"
                        type="password" placeholder="password" />
                    <input
                        onChange={(e) => handleInputs(e)}
                        name="confirmPassword"
                        type="password" placeholder="confirm password" />

                    {
                        loading ? <button
                            className='btn-on-loading'
                            type='button' >
                            <i className='fas fa-spinner fa-pulse'></i>
                            <span>
                                انشاء الحساب
                            </span>
                        </button>
                            :
                            <button className='btn-submit' type='submit' >انشاء الحساب</button>
                    }

                    <p className="message">Already registered?
                        <Link
                            onClick={showRegPageFunc}
                        >Sign In</Link>
                    </p>
                </form>
            </div>

        </div>
    )

}

export default Register