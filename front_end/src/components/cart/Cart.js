import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { removeFromCart } from '../../redux/reducers/cartSlice';
import "./../../assets/css/cart.css"
import CartItem from './CartItem'

function Cart() {

    const dispatch = useDispatch();

    const handleDeleteItem = (itemParam) => {
        dispatch(removeFromCart(itemParam));
    };

    let cartItems = useSelector(state => state.cart);
    let totalProductsPrice = 0;
    let tax = 0;
    let shipping = 50;
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        totalProductsPrice += item.quantity * item.price;

    }

    return (
        <div className="cart-container">

            <section className='cart-header'>
                <h1 className="cart-title">Shopping Cart</h1>

                <hr />
                <div className="heading">
                    <h1>My Cart</h1>
                    <NavLink to="/books" className="continue-shopping">
                        Continue Shopping
                        <i className="fa fa-chevron-right"></i>
                    </NavLink>
                </div>
                <hr />

            </section>

            <div className="cart">

                {
                    cartItems.length === 0 ?
                        <div className='nothing-to-show-container'>
                            <p>لا يوجد اي منتجات في سلة المشتريات لعرضها</p>
                            <NavLink to="/books" className="continue-shopping">
                                الدهاب الى قائمة الكتب
                            </NavLink>
                        </div>
                        :
                        <ul className="cartWrap">

                            {
                                cartItems.map(item => <CartItem key={item.id} item={item} onDelete={handleDeleteItem} />)
                            }

                        </ul>

                }
            </div>


            <br />
            <hr />
            <br />

            {
                totalProductsPrice !== 0 &&
                <div className="check-out-container">
                    <div>
                        <section>
                            <span className="label">sub total : </span>
                            <span className="value"> {totalProductsPrice}
                                <span className="curency">DH</span>
                            </span>
                        </section>

                        <section>
                            <span className="label">
                                Shipping :
                            </span>
                            <span className="value">
                                {shipping}
                                <span className="curency">DH</span>
                            </span>
                        </section>

                        <section>
                            <span className="label">
                                Tax : </span>
                            <span className="value">
                                {tax}
                                <span className="curency">DH</span>
                            </span>
                        </section>
                        <section>
                            <span className="label">
                                Total :
                            </span>
                            <span className="total)value">
                                {totalProductsPrice + tax + shipping}
                                <span className="curency">DH</span>
                            </span>

                        </section>
                        <section>
                            <NavLink to="checkout" className="btn-check-out">
                                تاكيد الطلب
                            </NavLink>
                        </section>
                    </div>
                </div>
            }



        </div>
    )
}

export default Cart