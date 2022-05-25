import React from 'react';
import Header from "components/header";
import {Link} from "react-router-dom";
import axio from "axios";
import {v4 as uuidv4} from 'uuid';


const Constructors = () => {

    const [constructors, setConstructors] = React.useState([])

    const getConstructors = async () => {

        try {
            const elements = await axio.get(`/api/constructor/`, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }


    React.useEffect(() => {
        getConstructors().then(data => {
            console.log(data)
            setConstructors(data.results)
        })
    }, [])



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
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <Link
                                        to={'/constructors'}
                                        className="nav-link active"
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

                    {constructors && constructors.map(item => {
                        return (<div key={uuidv4()} className={'row mt-3 shadow-sm p-3'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={item.tool.logo} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-9'}>
                                        <h3>{item.tool.name}</h3>
                                        <p>Официальный сайт: <span style={{color: 'darkblue'}}>{item.tool.tool_link}</span></p>
                                        <p>Страна: <span style={{color: 'darkgoldenrod'}}>{item.tool.country}</span></p>
                                        <p>Год основания: <span style={{color: 'darkgoldenrod'}}>{item.tool.foundation_year}</span></p>
                                        <p>Бесплатный период: <span style={{color: 'darkgoldenrod'}}>{item.free_period}</span></p>
                                        <p>Платные тарифы: <span style={{color: 'darkgoldenrod'}}>{item.min_price_for_month + ' - ' + item.max_price_for_month} руб./месяц</span></p>
                                        <p>Подходит для: {item.site_types.map(el => (
                                            <span key={uuidv4()} style={{color: 'darkgoldenrod'}}>{el.type + ' '}</span>
                                        ))}</p>
                                    </div>
                        </div>)
                    })}
                </div>
            </div>
        </>
    );
};

export default Constructors;