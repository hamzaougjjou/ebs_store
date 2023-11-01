import React from 'react'
import "./../../assets/css/contact.css"
import contact from "./../../assets/img/contact.png"
function Contact() {
    return (
        <>
            <div className="contact-slider" style={{ backgroundImage: `url("${contact}")` }}>
                <div className="slider-content">
                    <h2>
                        سنكون سعداء بتواصلك معنا
                    </h2>
                    <a href="#contact-section">
                        ارسل رسالة
                    </a>
                </div>

            </div>

            <div className="contactContainer">

                <div className="contact-info-section">
                    <div className="work-time">
                        <i className="fa fa-clock"></i>
                        <h2>اوقات العمل</h2>
                        <p id="work-time">
                            من الاثنين الى الجمعة . من 8:00 صباحا الى 22:00 مساءا
                        </p>
                    </div>
                    <div className="location">
                        <i className="fa fa-map-marker"></i>
                        <h2>الموقع</h2>
                        <p>
                            الموقع الجغرافي غير متوفر حاليا
                        </p>
                    </div>
                    <div className="phone">
                        <i className="fa fa-phone"></i>
                        <h2>الهاتف</h2>
                        <p>06 37 82 08 34</p>
                    </div>
                </div>

                <div className='contactFormHeading' style={{ textAlign: 'center' }}>
                    <h2> تواصل معنا</h2>
                    <p>
                        اترك لنا رسالة عبر البريد الالكتروني . سنحاول الرد عليك في اقرب وقت
                    </p>

                    <span id="send-message-error">
                        حدث خطأ اتناء ارسال الرسالة . حاول مجددا
                    </span>
                </div>

                <div className="row" id="contact-section">

                    <div className="column">
                        <form action="#">
                            <label htmlFor="name">الاسم :</label>
                            <input type="text" id="name" name="name" placeholder="الاسم ..." />
                            <label htmlFor="country">المدينة : </label>
                            <input type="text" id="city" name="city" placeholder="المدينة ..." />
                            <label htmlFor="phone"> رقم الهاتف :</label>
                            <input type="number" id="phone" name="phone" placeholder="رقم الهاتف ..." />

                            <label htmlFor="email"> البريد الالكتروني :</label>
                            <input type="email" id="email" name="email" placeholder="البريد الالكتروني ..." />

                            <label htmlFor="subject">الرسالة : </label>
                            <textarea id="subject" name="subject" placeholder="اكتب رسالتك هنا ..." style={{ height: '170px' }}></textarea>
                            <input type="submit" value="ارسل الرسالة" />
                        </form>
                    </div>
                    {/* <!-- ======================================================================================= --> */}

                    <div className="column">
                        {/* <!-- <div id="map" style="width:100%;height:500px"></div> --> */}
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe style={{ width: '100%', height: '500px' }} className="gmap_iframe" width="100%" frameBorder="0" scrolling="no"
                                    marginHeight="0" marginWidth="0"
                                    src="https://maps.google.com/maps?width=600&amp;height=500&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                            </div>
                        </div>
                    </div>
                    {/* <!-- ======================================================================================= --> */}


                </div>



            </div>

        </>
    )
}

export default Contact