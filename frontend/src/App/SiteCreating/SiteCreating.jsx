import React from 'react';
import Header from "components/header";
import './style.css'
import SideBarNav from "./SideBarNav/SideBarNav";
import {v4 as uuidv4} from 'uuid';
import {useSelector} from "react-redux";

const SiteCreating = () => {

    const {showedComponentId, componentsToShow} = useSelector(state => state.siteCreatingInfo)

    const sideBarItems = [
        {showComponent: 1, heading: 'Этапы создания сайта', targetId: uuidv4(), children: [{ elementToScroll: '#stage1', linkText: 'Этап 1. Определение цели'},
                { elementToScroll: '#stage2', linkText: 'Этап 2.'}, { elementToScroll: '#stage3', linkText: 'Этап 3.'},
                { elementToScroll: '#stage4', linkText: 'Этап 4.'}, { elementToScroll: '#stage5', linkText: 'Этап 5.'}]},
        {showComponent: 2, heading: 'Создание сайта на конструкторе', targetId: uuidv4(), children: [{ elementToScroll: '#aboutConstructor', linkText: 'Что такое конструктор сайтов'},
                { elementToScroll: '#constructorStep1', linkText: 'Шаг 1.'}, { elementToScroll: '#constructorStep2', linkText: 'Шаг 2.'},
                { elementToScroll: '#constructorStep3', linkText: 'Шаг 3.'}]},
        {showComponent: 3, heading: 'Создание сайта на CMS', targetId: uuidv4(), children: [{ elementToScroll: '#aboutCMS', linkText: 'Что такое CMS'},
                { elementToScroll: '#CMSStep1', linkText: 'Шаг 1.'}, { elementToScroll: '#CMSStep2', linkText: 'Шаг 2.'},
                { elementToScroll: '#CMSStep3', linkText: 'Шаг 3.'}]},
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
                        <div className="col-sm-3">
                            <div className="card shadow sticky-top">
                                <div className="card-body">
                                    <SideBarNav items={sideBarItems}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9">
                            <div className="card shadow">
                                <div className="card-body">
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