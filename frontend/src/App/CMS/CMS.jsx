import React from 'react';
import Header from "components/header";
import {Link} from "react-router-dom";

const Cms = () => {
    return (
        <>
            <div className={'body-background'}/>
            <Header/>
            <div className="container-fluid">
                <div className={'container-xxl'}>
                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">
                                    Инструменты для создания сайта
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <Link
                                        to={'/constructors'}
                                        className="nav-link"
                                        id="ex1-tab-1"
                                        data-mdb-toggle="tab"
                                        role="tab"
                                        aria-controls="ex1-tabs-1"
                                        aria-selected="true"
                                        style={{color: '#495057'}}
                                    >Конструкторы</Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <Link
                                        to={'/cms'}
                                        className="nav-link active"
                                        id="ex1-tab-2"
                                        data-mdb-toggle="tab"
                                        role="tab"
                                        aria-controls="ex1-tabs-2"
                                        aria-selected="false"
                                        style={{color: '#495057'}}
                                    >CMS</Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <Link
                                        to={'/web-design-tools'}
                                        className="nav-link"
                                        id="ex1-tab-3"
                                        data-mdb-toggle="tab"
                                        role="tab"
                                        aria-controls="ex1-tabs-3"
                                        aria-selected="false"
                                        style={{color: '#495057'}}
                                    >Web design</Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <Link
                                        to={'/programming-tools'}
                                        className="nav-link"
                                        id="ex1-tab-3"
                                        data-mdb-toggle="tab"
                                        role="tab"
                                        aria-controls="ex1-tabs-3"
                                        aria-selected="false"
                                        style={{color: '#495057'}}
                                    >Программирование</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Cms;