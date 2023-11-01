import React, { useRef } from 'react'

function GoUp() {
    const btnToUp = useRef();
    // =====================
     window.onscroll = function () {
       if (window.pageYOffset >= 400) {
         btnToUp.current.style.display = "block";
       } else {
         btnToUp.current.style.display = "none";
       };
     };
     // =====================
     let goUpfunc = () => {
       window.scrollTo(0, 0);
     }
    return (
        <>
            {/* <!-- go up button --> */}
            <p id="goup" ref={btnToUp} onClick={goUpfunc}>
                <i className="fa fa-arrow-up"></i>
            </p>
            {/* <!-- go up button --> */}
        </>
    )
}

export default GoUp