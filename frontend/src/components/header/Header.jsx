// import logo from '../../images/logo.png'
import React from "react";
import {Link} from "react-router-dom"
import logo from '../../static_files/assets/images/WebStart.png'


const Header = () => {

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: '15px'}}>
            <div className="container-xxl">
                <Link to={'/'} className="navbar-brand">
                    <img
                            src={logo}
                            height="16"
                            alt="MDB Logo"
                            loading="lazy"
                            style={{marginTop: '-1px'}}
                        />
                </Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav">
                        <Link to={'/site-creating'} className="nav-item nav-link link">Как создать сайт</Link>
                        <Link to={'/'} className="nav-item nav-link link">Конструкторы</Link>
                        <Link to={'/'} className="nav-item nav-link link">Хостинги</Link>
                        <Link to={'/'} className="nav-item nav-link link">Курсы</Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <a href="https://github.com/MrMatin-Aka-Me" target={'_blank'} className="btn btn-dark px-3"><i className="bi-github"/></a>
                    </div>
                </div>
            </div>
        </nav>
     </>
    )
}
export default Header