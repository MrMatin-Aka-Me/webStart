import React from "react";
import {Link} from "react-router-dom"
import logo from '../../static_files/assets/images/WebStart.png'


const Header = ({activeTab}) => {

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: '15px'}}>
            <div className="container-xxl">
                <Link to={'/'}
                      className="navbar-brand">
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
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                        style={{scrollHeight: '100px'}}>
                        <li className="nav-item">
                            <Link to={'/'} id={'home'}
                                  className={'nav-link ' + (activeTab === 'home' ? 'active' : '')}>Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/contractors'} id={'orderSite'}
                                  className={'nav-link ' + (activeTab === 'orderSite' ? 'active' : '')}>Заказать сайт</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className={'nav-link dropdown-toggle ' + (activeTab === 'siteCreatingTools' ? 'active' : '')}
                               href="#" id="siteCreatingTools" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Инструменты
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="siteCreatingTools">
                                <li><Link className="dropdown-item" to='/constructors'>Конструкторы</Link></li>
                                <li><Link className="dropdown-item" to="#">Web Design</Link></li>
                                <li><Link className="dropdown-item" to="#">Программирование</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="navbar-nav ms-auto">
                        <a href="https://github.com/MrMatin-Aka-Me" target={'_blank'} className="btn btn-dark px-3"><i className="bi-github"/></a>
                    </div>
                </div>

                {/*<div className="collapse navbar-collapse" id="navbarCollapse">*/}
                {/*    <div className="navbar-nav">*/}
                {/*        <Link to={'/contractors'} className="nav-item nav-link link">Заказать сайт</Link>*/}
                {/*        /!*<Link to={'/site-creating'} className="nav-item nav-link link">Как создать сайт</Link>*!/*/}
                {/*        <a href={'#'} className="nav-item nav-link link">Инструменты</a>*/}
                {/*        <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button"*/}
                {/*           data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*            Link*/}
                {/*        </a>*/}
                {/*        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">*/}
                {/*            <li><a className="dropdown-item" href="#">Action</a></li>*/}
                {/*            <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                {/*            <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                {/*        </ul>*/}
                {/*        /!*<Link to={'/'} className="nav-item nav-link link">Сравнение</Link>*!/*/}
                {/*    </div>*/}
                {/*    <div className="navbar-nav ms-auto">*/}
                {/*        <a href="https://github.com/MrMatin-Aka-Me" target={'_blank'} className="btn btn-dark px-3"><i className="bi-github"/></a>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </nav>
     </>
    )
}
export default Header