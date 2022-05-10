// import logo from '../../images/logo.png'
import React from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";


const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: '15px'}}>
            {/*<!-- Container wrapper -->*/}
            <div className="container">
                {/*<!-- Navbar brand -->*/}
                <Link className="navbar-brand me-2" to="/">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                        height="16"
                        alt="MDB Logo"
                        loading="lazy"
                        style={{marginTop: '-1px'}}
                    />
                </Link>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {/*  left links should be here  */}
                        </li>
                </ul>

                {/*!-- Collapsible wrapper -->*/}
                <div>

                    <div className="d-flex align-items-center">
                        <a
                            className="btn btn-dark px-3"
                            href="https://github.com/MrMatin-Aka-Me"
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