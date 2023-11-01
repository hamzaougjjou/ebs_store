import React, { useRef, useState } from 'react'
import logo from "./../../assets/img/logo.png"
import "./../../assets/css/header.css"
import { Link, NavLink } from 'react-router-dom'
import GoUp from '../GoUp';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/reducers/authSlice';

function Header() {

    let myActivClass = ({ isActive }) => isActive ? 'active-menu-item' : '';
    const [showLoginPage, setShowLoginPage] = useState(false);
    const [showRegisterPage, setShowRegisterPage] = useState(false);

    const navBar = useRef();
    const mainMenu = useRef();
    const searchSection = useRef();
    const btnOpenMenu = useRef();

    const cartItems = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const isLogedIn = auth.logedIn;
    const dispatch = useDispatch();
    const { loading, error, categories } = useSelector(state => state.categories);
    // console.log(auth);

    const openSearchSection = () => searchSection.current.style.display = "block";
    const closeSearchSection = () => searchSection.current.style.display = "none";
    // menu setting 
    const openMainMenu = () => navBar.current.style.display = "block";
    const closeMainMenu = () => navBar.current.style.display = "none";

    const closeMainMenuByNavBar = (e) => {
        if (window.innerWidth < 821) //apply this code only for smalland medium screens
            (e.target !== mainMenu.current || navBar.current === e.target) ? navBar.current.style.display = "none" :
                navBar.current.style.display = "block";
    }

    let handleLogOut = () => {
        // alert("log out");
        sessionStorage.removeItem("isLogedIn");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        dispatch(logOut());
    }


    window.onresize = () => {
        if (window.innerWidth > 819) //apply this code only for smalland medium screens
            navBar.current.style.display = "block";
        else navBar.current.style.display = "none";
    }


    return (
        <>
            {
                showLoginPage ? <Login
                    setShowLoginPage={setShowLoginPage}
                    setShowRegisterPage={setShowRegisterPage}
                />
                    :
                    null
            }
            {
                showRegisterPage ? <Register
                    setShowLoginPage={setShowLoginPage}
                    setShowRegisterPage={setShowRegisterPage}
                />
                    :
                    null
            }
            {/* <marquee className="message-container">
                <section id="message">
                    Lorem ipsum dolor sit amet.
                </section>
            </marquee> */}

            {/* <!-- main header  --> */}
            <header>

                <i id="btn-open-main-menu" ref={btnOpenMenu} onClick={openMainMenu} className="fa fa-bars"></i>

                <section className="logo-container">
                    <NavLink to="/">
                        <img src={logo} alt="logo" />
                    </NavLink>
                </section>

                <nav className="nav-bar" ref={navBar} onClick={closeMainMenuByNavBar} >
                    <ul className="main-menu" ref={mainMenu}>
                        <i id="btn-close-main-menu" onClick={closeMainMenu} className="fa fa-close"></i>

                        <li>
                            <NavLink to='' className={myActivClass}>
                                الرئيسية
                            </NavLink>
                        </li>

                        <li>

                            <NavLink to='collections' id='collections-link' className={myActivClass}>
                                التصنيفات
                            </NavLink>

                            <ul className="sub-menu">

                                <NavLink to='collections'>
                                    <li>التصنيفات</li>
                                </NavLink>

                                {
                                    categories.map((collectionItem) => (
                                        <NavLink key={collectionItem.id}
                                            to={'collections/' + collectionItem.id}
                                            className={myActivClass}>

                                            <li>{collectionItem.name}</li>
                                        </NavLink>
                                    ))
                                }

                            </ul>
                        </li>

                        <li>
                            <NavLink to="contact" className={myActivClass}>
                                تواصل معنا
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="books" className={myActivClass}>
                                الكتب المتوفرة
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="new/books" className={myActivClass}>
                                العناوين الجديدة
                            </NavLink>
                        </li>

                    </ul>
                </nav>

                <section className="search-container">
                    <i id="open-search-section" className="fa fa-search" onClick={openSearchSection}></i>
                    <div id="search-section" ref={searchSection}>
                        <i id="close-search-section"
                            className="fa fa-times"
                            onClick={closeSearchSection}>
                        </i>

                        <form id="search-from" action="">
                            <input type="text" placeholder="Search.." name="search" />
                            <i className='fa fa-search'></i>
                        </form>
                    </div>

                </section>

                <section className='login-container'>

                    {
                        !isLogedIn ?
                            <>
                                <section onClick={() => setShowLoginPage(true)} className="cart-container">
                                    <div style={{
                                        width: "95px",
                                        cursor: "pointer",
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "10px"

                                    }}>
                                        <i
                                            style={{
                                                color: 'black',
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                padding: "0",
                                                margin: "0",
                                            }
                                            }
                                            className="fa fa-sign-in"></i>
                                        <p style={{
                                            fontWeight: "bold",
                                            padding: "0",
                                            margin: "0",

                                        }
                                        }>Login</p>
                                    </div>
                                </section>
                            </>

                            :
                            <div className='profile-icon-container'>
                                <Link to="/profile">
                                    <i className='fa fa-user icon'></i>
                                </Link>

                                <section className='auth-menu'>
                                    <Link className='link' to="/profile">
                                        {
                                            auth.user?.name
                                        }
                                    </Link>
                                    <p className='link btn-logout'
                                        onClick={handleLogOut}
                                    >Log out</p>
                                </section>
                            </div>
                    }

                </section>

                <NavLink to="/cart" className="cart-container">
                    <i className="fa fa-shopping-cart">
                        <span id="cart-number">
                            {
                                cartItems.length === null ? "00"
                                    :
                                    cartItems.length < 10 ?
                                        "0" + cartItems.length
                                        :
                                        cartItems.length
                            }

                        </span>
                    </i>
                </NavLink>


            </header>
            {/* <!-- main header --> */}
            <GoUp />
        </>
    )
}

export default Header