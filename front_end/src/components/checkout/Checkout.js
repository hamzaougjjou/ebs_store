import React from 'react'
import { NavLink , Link } from 'react-router-dom'
import './../../assets/css/checkOut.css'

function Checkout() {
  return (
    <div className="container">
    <h1 className="check-out-title">تاكيد الطلب</h1>
    <div className="row">
        <div className="col-75">
            <div className="content">
                <form action="#" method="post">

                    <div className="row">
                        <div className="col-50">
                            <label htmlFor="fname">
                                <i className="fa fa-user"></i>
                                الاسم الكامل
                            </label>
                            <input type="text" id="fname" name="firstname" placeholder="Nom & prenom" />

                            <label htmlFor="adr"><i className="fa fa-address-card-o">
                                </i> العنوان
                            </label>
                            <textarea id="adr" name="address" placeholder="542 W. 15th Street"></textarea>

                            <label htmlFor="city"><i className="fa fa-institution">

                                </i> المدينة
                            </label>
                            <input type="text" id="city" name="city" placeholder="ville .." />


                        </div>

                        <div className="col-50">

                            <label htmlFor="email"><i className="fa fa-envelope">
                                </i> البريد الالكتروني
                            </label>
                            <input type="text" id="email" name="email" placeholder="john@example.com" />

                            <label htmlFor="email"><i className="fa fa-phone">
                                </i> رقم الهاتف
                            </label>
                            <input type="text" id="email" name="email" placeholder="john@example.com" />

                        </div>

                    </div>
                    <label>
                        <input type="checkbox" name="sameadr" />
                        ارسال الطلبية الى العنوان المدكور اعلى
                    </label>

                    <NavLink to="./../checkoutthanks">
                        <input type="button" value="Continue to checkout" className="btn" />
                    </NavLink>
                </form>
            </div>
        </div>
        <div className="col-25">
            <div className="content">

                <section className="edit-cart-container">
                    <Link to="cart">
                        تعديل السلة
                    </Link>
                </section>

                <h4>Cart <span className="price" style={{color:'black'}}><i className="fa fa-shopping-cart"></i> <b>4</b></span>
                </h4>
                <p><Link to='/products/90909909'>Product 1</Link> <span className="price">100 <span className="curency">dh</span></span></p>
                <p><Link to='/products/90909909'>Product 2</Link> <span className="price">500 <span className="curency">dh</span></span></p>
                <p><Link to='/products/90909909'>Product 3</Link> <span className="price">800 <span className="curency">dh</span></span></p>
                <p><Link to='/products/90909909'>Product 4</Link> <span className="price">200 <span className="curency">dh</span></span></p>
                <hr />
                <p className="total-price-container">
                    Total
                    <span className="price" style={{color:'black'}}>
                        <b>
                            30
                        </b>
                        <span className="curency">dh</span>
                    </span>
                </p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Checkout