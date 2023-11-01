import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./../../assets/css/checkoutthanks.css"


function CheckoutThanks() {

    const navigate = useNavigate();
    const loderContent = useRef();
    const seconds = useRef();

    let myTimer = 11;
    let p = 100;

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (myTimer < 10) {
                seconds.textContent = "0" + myTimer;
            } else {
                seconds.textContent = myTimer;
            }
            loderContent.current.style.width = p + "%";
            if (myTimer === 0) {
                clearInterval(myInterval);
                navigate('/');
            }
            if (p % 10 === 0) {
                myTimer--;
            }
            p--;
        }, 100);
    }, []);


    return (
        <>
            <div className="check-thnks-container">
                <div className="">
                    <h1 className="main-title">
                        thank you شكرا على تقتكم
                    </h1>

                    <i className="fa fa-check"></i>

                    <p className="">
                        تم تاكيد طلبكم سيتم
                        ارسالها لكم في اقرب وقت
                    </p>
                </div>

                <Link to="/" className="btn-go-home">
                    عودة الى الصفحة الرئيسية
                </Link>

                <div className="auto-go-back">
                    <div id="loader-container" >
                        <div id="loder-content" ref={loderContent}></div>
                    </div>
                    <div className="go-back-content">
                        سيتم العودة الى الى الصفحة الرئيسية بعد
                        <span id="seconds" ref={seconds}>10</span>
                        ثواني
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutThanks