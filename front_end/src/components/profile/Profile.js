import React from 'react'
import "./profile.css";

function Profile() {
    return (
        <>
            <div className="navbar-top">
               

                
                    <li>
                        <a href="#notification">
                            <span className="icon-count">59</span>
                            <i className="fa fa-bell fa-2x"></i>
                        </a>
                    </li>
            </div>

            <div className="sidenav">
                <div className="profile">
                    <img src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png" alt="" width="100" height="100" />

                    <div className="name">
                        ImDezCode
                    </div>
                    <div className="job">
                        Web Developer
                    </div>
                </div>

                <div className="sidenav-url">
                    <div className="url">
                        <a href="#profile" className="active">Profile</a>
                        <hr align="center" />
                    </div>
                    <div className="url">
                        <a href="#settings">Settings</a>
                        <hr align="center" />
                    </div>
                </div>
            </div>



            <div className="main">
                <h2>IDENTITY</h2>
                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>ImDezCode</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>imdezcode@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>Bali, Indonesia</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2>ALL ORDERS</h2>
                <div className="card">
                    <div className="card-body">
                        <i className="fa fa-pen fa-xs edit"></i>
                        <div className="social-media">
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile