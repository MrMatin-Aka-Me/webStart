import React, {useState} from 'react';
import Header from "components/header";
import {Link, useLocation} from "react-router-dom";
import axio from "axios";
import {v4 as uuidv4} from 'uuid';
import Select from "react-select";


const Constructors = () => {

    const templateNumberRanges = [
        {value: 0, label: '-----'},
        {value: 1, label: 'Меньше - 100'},
        {value: 2, label: '100 - 500'},
        {value: 3, label: '500 - 1 000'},
        {value: 4, label: '1 000 - Больше'}
    ]

    const templateNumberRangeValue = {
        0: [0, 1000000000],
        1: [0, 100],
        2: [100, 500],
        3: [500, 1000],
        4: [1000, 1000000000]
    }


    const booleanOptions = [{
        value: '',
        label: 'Все'
    }, {
        value: true,
        label: 'Да'
    }, {
        value: false,
        label: 'Нет'
    }]

    const [constructors, setConstructors] = React.useState([])
    const location = useLocation()
    const siteTypesFromQueryParams = new URLSearchParams(location.search).get('site_types')
    const [queryParams, setQueryParams] = React.useState(  {site_types: siteTypesFromQueryParams ? siteTypesFromQueryParams : 1})

    const [siteTypeSelectValue, setSiteTypeSelectValue] = useState({value: 1, label: 'Лендинг'})
    const [siteTypeOptions, setSiteTypeOptions] = useState([])

    const [hasFreeSelectValue, setHasFreeSelectValue] = useState({value: '', label: 'Все'})

    const [templateNumberRangeSelect, setTemplateNumberRangeSelect] = useState({value: 0, label: '-----'})

    const getConstructors = async (query) => {

        try {
            const elements = await axio.get(`/api/constructor/`, {
                headers: {withCredentials: true},
                params: query
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const getSiteTypes = async () => {
        try {
            const elements = await axio.get(`/api/site-types/`, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }


    React.useEffect(() => {
        let p0 = getConstructors(queryParams)
        let p1 = getSiteTypes()
        Promise.all([p0, p1]).then(data => {
            console.log(data[0])
            setConstructors(data[0].results)

            const list = []
            data[1] && data[1].forEach(el => {
                list.push({value: el.id, label: el.type})
                siteTypesFromQueryParams && +siteTypesFromQueryParams === el.id && setSiteTypeSelectValue({value: el.id, label: el.type})
            })
            setSiteTypeOptions(list)
        })
    }, [])

    const handleFilterChange = (filterName, filterObj) => {

        let obj = {}

        switch (filterName){
            case 'templateNumberMinMax':
                obj = {template_number_min: filterObj.template_number_min, template_number_max: filterObj.template_number_max}
                break;
            default:
                obj[filterName] = filterObj.value
        }

        setQueryParams(prevState => ({...prevState, ...obj}))

        getConstructors({...queryParams, ...obj}).then(data => {
            setConstructors(data.results)
        })
    }



    return (
        <>
            <div className={'body-background'}/>
            <Header activeTab={'siteCreatingTools'}/>
            <div className="container-fluid pb-4">
                <div className={'container-xxl'}>
                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">
                                    Конструкторы
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12 shadow-sm rounded">
                        <div className="card">
                            <form className="card-body">
                                <h5 className="text-center mb-4">Укажите фильтры</h5>
                                <div className="row justify-content-center">
                                    {/*<div style={{width: '90%'}} className={'row'}>*/}
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Вид сайта:</p>
                                            <Select options={siteTypeOptions}
                                                    value={siteTypeSelectValue}
                                                    onChange={(filterObj) => {
                                                        setSiteTypeSelectValue(filterObj)
                                                        handleFilterChange('site_types', filterObj)
                                                    }}
                                                    placeholder={''}
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Есть бесплатный период?</p>
                                            <Select options={booleanOptions}
                                                    value={hasFreeSelectValue}
                                                    onChange={(filterObj) => {
                                                        setHasFreeSelectValue(filterObj)
                                                        handleFilterChange('has_free', filterObj)
                                                    }}
                                                    placeholder={''}
                                                    // noOptionsMessage={() => !targetSelectValue ? 'Сначала выберите цель' : 'Результат не найден'}
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Количество шаблонов:</p>
                                            <Select options={templateNumberRanges}
                                                    value={templateNumberRangeSelect}
                                                    onChange={filterObj => {
                                                        setTemplateNumberRangeSelect(filterObj)
                                                        handleFilterChange('templateNumberMinMax',{
                                                            template_number_min: templateNumberRangeValue[filterObj.value][0],
                                                            template_number_max: templateNumberRangeValue[filterObj.value][1]
                                                        })
                                                    }}
                                                    placeholder={''}
                                                // styles={colourStyles}
                                            />
                                        </div>

                                    {/*</div>*/}
                                </div>
                            </form>
                            {/*// <!-- end card-body-->*/}
                        </div>
                        {/*// <!-- end card-->*/}
                    </div>

                    {constructors && constructors.map(item => {
                        return (<div key={uuidv4()} className={'row mt-3 shadow-sm p-3 d-flex align-items-center'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={item.tool.logo} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-9'}>
                                        <h3>{item.tool.name}</h3>
                                        <p>Официальный сайт: <span style={{color: 'darkblue'}}>{item.tool.tool_link}</span></p>
                                        <p>Страна: <span style={{color: 'darkgoldenrod'}}>{item.tool.country}</span></p>
                                        <p>Год основания: <span style={{color: 'darkgoldenrod'}}>{item.tool.foundation_year}</span></p>
                                        <p>Бесплатный период: <span style={{color: 'darkgoldenrod'}}>{item.free_period}</span></p>
                                        <p>Платные тарифы: <span style={{color: 'darkgoldenrod'}}>{item.min_price_for_month + ' - ' + item.max_price_for_month} руб./месяц</span></p>
                                        <p>Подходит для: {item.site_types.map(el => (
                                            <span key={uuidv4()} style={{color: el.id === siteTypeSelectValue.value ? 'darkblue' : 'darkgoldenrod'}}>{el.type + ' '}</span>
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