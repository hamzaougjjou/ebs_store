import React, { useEffect, useRef } from 'react'
import "./../assets/css/connection.css";

function PopUpMessages({ title, message, hide }) {
    const popup = useRef();

    const hidePopUp = () => {
        popup.current.style.animationName = 'hidPopUp';
        setTimeout(() => {
            popup.current.style.display = 'none';
            hide(null);
        }, 500);
    }


    useEffect(() => {
        setTimeout(() => {
            popup.current.style.animationName = 'hidPopUp';
            setTimeout(() => {
                popup.current.style.display = 'none';
                hide(null);
            }, 500);
        }, 5000);
    }, []);

    return (
        <div className="popup" ref={popup}>
            <h2>{title} </h2>
            <span className="close" onClick={hidePopUp}>&times;</span>
            <div className="content">
                {message}
            </div>
        </div>
    )
}

export { PopUpMessages }