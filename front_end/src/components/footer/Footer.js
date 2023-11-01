import React from 'react'
import { NavLink , Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPhone, faInstagram, faFacebook, faWhatsapp , faYoutube } from '@fortawesome/free-regular-svg-icons'
// import { faPhone, faInstagram, faFacebook, faWhatsapp , faYoutube } from '@fortawesome/free-solid-svg-icons'
// import { faPingPongPaddleBall } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <>
            <div className="info">
                <div id="contact">
                    <h3>Contact</h3>
                    <div>
                        <p className="contact-title txt-center">Questions? Go ahead.</p>
                        {/* <input type="text" name="name" id="ct-name" placeholder="Name" />
                <input type="email" name="email" id="ct-email" placeholder="Email" />
                <input type="text" name="city" id="ct-city" placeholder="ville" />
                <input type="text" name="subject" id="ct-subject" placeholder="Subject" />
                <textarea name="ct-message" id="ct-message" cols="30" rows="10" placeholder="Message"></textarea> */}

                        <NavLink to='/contact'>
                            <input type="submit" id="ct-send" value="Contact us" />
                        </NavLink>
                    </div>
                </div>

                <div id="about">
                    <h3>About</h3>
                    <section className="txt-center">
                        <p><Link to="/about">About us</Link></p>
                        <p><Link to="/find">Find store</Link></p>
                        <p><Link to="/shipment">Shipment</Link></p>
                        <p><Link to="/payment">Payment</Link></p>
                        <p><Link to="/return">Return</Link></p>
                        <p><Link to="/help">Help</Link></p>
                    </section>


                </div>
                <div id="store">
                    <h3>Store</h3>
                    <section className="txt-center">
                        <p>Agjjou store</p>
                        <p>0044123123</p>
                        <p>ex@mail.com</p>
                    </section>
                    <h3>We accept</h3>
                    <section className="txt-center">
                        <p>Amana</p>
                        <p>COD</p>
                    </section>

                </div>
            </div>
            {/* <!-- ------------------------------sub-footer---------------- --> */}

            <footer className="main-footer">
                <div className="sub-footer">
                    <div className="footer-container">


                        <aside className="aside-main right-aside">

                            <div className="social-media-footer">

                                <Link to="#" className="social-media-link">
                                    <i className="fa fa-facebook"></i>
                                    {/* <FontAwesomeIcon icon={faFacebook} /> */}
                                </Link>

                                <Link to="#" className="social-media-link">
                                    <i className="fa fa-whatsapp"></i>
                                    {/* <FontAwesomeIcon icon={faWhatsapp} /> */}
                                </Link>

                                <Link to="#" className="social-media-link">
                                    <i className="fa fa-phone"></i>
                                    {/* <FontAwesomeIcon icon={faPhone} /> */}
                                </Link>

                                <Link to="#" className="social-media-link">
                                    <i className="fa fa-instagram"></i>
                                    {/* <FontAwesomeIcon icon={faInstagram} /> */}
                                </Link>

                                <Link to="#" className="social-media-link">
                                    <i className="fa fa-youtube"></i>
                                    {/* <FontAwesomeIcon icon={faYoutube} /> */}
                                </Link>
                            </div>

                        </aside>
                        <aside className="aside-main left-aside">

                            <div className="copyright">
                                <p id="copyright">Copyright © 2021 | agjjou</p>
                            </div>

                        </aside>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer