import React from 'react';
import Header from "components/header";
import './style.css'
import SideBarNav from "./SideBarNav/SideBarNav";
import {v4 as uuidv4} from 'uuid';
import {useSelector} from "react-redux";

const SiteCreating = () => {

    const {showedComponentId, componentsToShow} = useSelector(state => state.siteCreatingInfo)

    const sideBarItems = [
        {showComponent: 1, heading: 'Этапы создания сайта', targetId: uuidv4(), children: [{url: '', linkText: 'Этап 1. Определение цели'},
                {url: '', linkText: 'Этап 2.'}, {url: '', linkText: 'Этап 3.'}, {url: '', linkText: 'Этап 4.'}]},
        {showComponent: 2, heading: 'Создание сайта на конструкторе', targetId: uuidv4(), children: [{url: '', linkText: 'Что такое конструктор сайтов'},
                {url: '', linkText: 'Шаг 1.'}, {url: '', linkText: 'Шаг 2.'}, {url: '', linkText: 'Шаг 3.'}]},
        {showComponent: 3, heading: 'Создание сайта на CMS', targetId: uuidv4(), children: [{url: '', linkText: 'Что такое CMS'},
                {url: '', linkText: 'Шаг 1.'}, {url: '', linkText: 'Шаг 2.'}, {url: '', linkText: 'Шаг 3.'}]},
    ]

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
                                    Создание сайта
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <SideBarNav items={sideBarItems}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h3 className="border-bot-green mt-0">Информация</h3>
                                    {componentsToShow[showedComponentId]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SiteCreating;