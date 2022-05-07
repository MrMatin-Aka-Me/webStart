// import logo from '../../images/logo.png'
import React from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";


const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/*<!-- Container wrapper -->*/}
            <div className="container">
                {/*<!-- Navbar brand -->*/}
                <a className="navbar-brand me-2" href="https://mdbgo.com/">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                        height="16"
                        alt="MDB Logo"
                        loading="lazy"
                        style={{marginTop: '-1px'}}
                    />
                </a>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="nav-link" href="#">Dashboard</a>
                        </li>
                </ul>

                {/*!-- Collapsible wrapper -->*/}
                <div>

                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-link px-3 me-2">
                            Login
                        </button>
                        <button type="button" className="btn btn-primary me-3">
                            Sign up for free
                        </button>
                        <a
                            className="btn btn-dark px-3"
                            href="https://github.com/mdbootstrap/mdb-ui-kit"
                            role="button"
                        ><i className="bi-github"/></a>
                    </div>
                </div>
            </div>
             {/*<!-- Container wrapper -->*/}
        </nav>
    )
}
export default Header