import React, {useState} from 'react';
import Header from "components/header";
import {Link, useLocation} from "react-router-dom";
import axio from "axios";
import {v4 as uuidv4} from 'uuid';
import Select from "react-select";
import nothing_found from '../../static_files/assets/images/nothing-found.png'
import TrueFalseInputGroup from "./TrueFalseInputGroup/TrueFalseInputGroup";


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

    const [loading, setLoading] = useState(true)

    const [hasSeoSettingMaster, setHasSeoSettingMaster] = useState('')
    const [isAllTemplatesResponsive, setIsAllTemplatesResponsive] = useState('')
    const [autoSitemapAndRobots, setAutoSitemapAndRobots] = useState('')
    const [hasMobileVersionEditor, setHasMobileVersionEditor] = useState('')
    const [hasFreeSslCertificate, setHasFreeSslCertificate] = useState('')
    const [isElementCollapsedObj, setIsElementCollapsedObj] = useState({})


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

            const tmpObj = {}
            data[0].results.forEach(item => {
                tmpObj[item.tool.id] = false
            })
            setIsElementCollapsedObj(tmpObj)
            setConstructors(data[0].results)

            const list = []
            data[1] && data[1].forEach(el => {
                list.push({value: el.id, label: el.type})
                siteTypesFromQueryParams && +siteTypesFromQueryParams === el.id && setSiteTypeSelectValue({value: el.id, label: el.type})
            })
            setSiteTypeOptions(list)
            setLoading(false)
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
            const tmpObj = {}
            data.results.forEach(item => {
                tmpObj[item.tool.id] = false
            })
            setIsElementCollapsedObj(tmpObj)
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
                                <div className="row">
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
                                                    styles={{
                                                      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                                                      menu: (provided) => ({ ...provided, zIndex: 9999 })
                                                    }}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Есть бесплатный период:</p>
                                            <Select options={booleanOptions}
                                                    value={hasFreeSelectValue}
                                                    onChange={(filterObj) => {
                                                        setHasFreeSelectValue(filterObj)
                                                        handleFilterChange('has_free', filterObj)
                                                    }}
                                                    placeholder={''}
                                                    styles={{
                                                      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                                                      menu: (provided) => ({ ...provided, zIndex: 9999 })
                                                    }}
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
                                                    styles={{
                                                      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                                                      menu: (provided) => ({ ...provided, zIndex: 9999 })
                                                    }}
                                            />
                                        </div>
                                    {/*</div>*/}
                                </div>
                                <div className="row">
                                    <TrueFalseInputGroup
                                            state={hasSeoSettingMaster}
                                            stateSetter={setHasSeoSettingMaster}
                                            handleOnChange={handleFilterChange}
                                            name={'has_seo_setting_master'}
                                            idAll={'hasSeoSettingMaster'}
                                            idTrue={'hasSeoSettingMasterTrue'}
                                            idFalse={'hasSeoSettingMasterFalse'}
                                            heading={'Есть мастер для настройки SEO:'}/>
                                    <TrueFalseInputGroup
                                            state={isAllTemplatesResponsive}
                                            stateSetter={setIsAllTemplatesResponsive}
                                            handleOnChange={handleFilterChange}
                                            name={'is_all_templates_responsive'}
                                            idAll={'isAllTemplatesResponsive'}
                                            idTrue={'isAllTemplatesResponsiveTrue'}
                                            idFalse={'isAllTemplatesResponsiveFalse'}
                                            heading={'Все шаблоны адаптивны:'}/>
                                    <TrueFalseInputGroup
                                            state={autoSitemapAndRobots}
                                            stateSetter={setAutoSitemapAndRobots}
                                            handleOnChange={handleFilterChange}
                                            name={'auto_sitemap_and_robots'}
                                            idAll={'autoSitemapAndRobots'}
                                            idTrue={'autoSitemapAndRobotsTrue'}
                                            idFalse={'autoSitemapAndRobotsFalse'}
                                            heading={'Автоматически формируются Sitemap и Robots:'}/>
                                    <TrueFalseInputGroup
                                            state={hasMobileVersionEditor}
                                            stateSetter={setHasMobileVersionEditor}
                                            handleOnChange={handleFilterChange}
                                            name={'has_mobile_version_editor'}
                                            idAll={'hasMobileVersionEditor'}
                                            idTrue={'hasMobileVersionEditorTrue'}
                                            idFalse={'hasMobileVersionEditorFalse'}
                                            heading={'Есть редактор мобильной версии сайта:'}/>
                                    <TrueFalseInputGroup
                                            state={hasFreeSslCertificate}
                                            stateSetter={setHasFreeSslCertificate}
                                            handleOnChange={handleFilterChange}
                                            name={'has_free_ssl_certificate'}
                                            idAll={'hasFreeSslCertificate'}
                                            idTrue={'hasFreeSslCertificateTrue'}
                                            idFalse={'hasFreeSslCertificateFalse'}
                                            heading={'Бесплатный SSL сертификат:'}/>
                                </div>
                            </form>
                            {/*// <!-- end card-body-->*/}
                        </div>
                        {/*// <!-- end card-->*/}
                    </div>

                    {!loading && constructors.map(item => {
                        return (<div key={uuidv4()} className={'row mt-3 shadow-sm p-3 d-flex align-items-center'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={item.tool.logo} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-5'}>
                                        <h3>{item.tool.name}</h3>
                                        <div className={'mb-1'}>Официальный сайт: <span style={{color: 'darkblue'}}>{item.tool.tool_link}</span></div>
                                        <div className={'mb-1'}>Страна: <span style={{color: 'darkgoldenrod'}}>{item.tool.country}</span></div>
                                        <div className={'mb-1'}>Год основания: <span style={{color: 'darkgoldenrod'}}>{item.tool.foundation_year}</span></div>
                                        <div className={'mb-1'}>Бесплатный период: <span style={{color: 'darkgoldenrod'}}>{item.free_period}</span></div>
                                        <div className={'mb-1'}>Платные тарифы: <span style={{color: 'darkgoldenrod'}}>{item.min_price_for_month + ' - ' + item.max_price_for_month} руб./месяц</span></div>
                                        <div className={'mb-1'}>Количество шаблонов: <span style={{color: 'darkgoldenrod'}}>{item.template_numbe}</span></div>
                                        <div className={'mb-1'}>Подходит для: {item.site_types.map(el => (
                                            <span key={uuidv4()} style={{color: el.id === siteTypeSelectValue.value ? 'darkblue' : 'darkgoldenrod'}}>{el.type + ' '}</span>
                                        ))}</div>
                                    </div>
                                    <div className={'col-4'}>
                                        <div className={'mb-1'}>Есть бесплатный период: <span>{item.has_free ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                        <div className={'mb-1'}>Есть мастер для настройки SEO: <span>{item.has_seo_setting_master ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                        <div className={'mb-1'}>Все шаблоны адаптивны: <span>{item.is_all_templates_responsive ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                        <div className={'mb-1'}>Автоматически формируются Sitemap и Robots: <span>{item.auto_sitemap_and_robots ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                        <div className={'mb-1'}>Есть редактор мобильной версии сайта: <span>{item.has_mobile_version_editor ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                        <div className={'mb-1'}>Бесплатный SSL сертификат: <span>{item.has_free_ssl_certificate ?
                                            <i className="bi bi-check-circle text-success"/> : <i className="bi bi-x-circle text-danger"/>}</span></div>
                                    </div>
                                    <div className={'col-12 d-flex justify-content-end'}>
                                        <div>
                                            <button className={'btn btn-outline-primary ' + (isElementCollapsedObj[item.tool.id] ? '' : 'collapsed')}
                                                    onClick={() => {
                                                        setIsElementCollapsedObj(prevState => ({...prevState, [item.tool.id]: !prevState[item.tool.id]}))
                                                    }}
                                                    // data-bs-toggle="collapse"
                                                    // data-bs-target={'#collapse-' + item.tool.id}
                                                    aria-expanded={isElementCollapsedObj[item.tool.id]}>
                                                {isElementCollapsedObj[item.tool.id] ?  <span>Скрыть <i className="bi bi-chevron-up"/></span>
                                                    :
                                                    <span>Подробнее <i className="bi bi-chevron-down"/></span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className={'col-12 mt-4 '}
                                         id={'collapse-' + item.tool.id}
                                         style={{
                                             display: !isElementCollapsedObj[item.tool.id] && 'none'
                                        }}>
                                            {item.constructor_description.split("\n").map(str => {
                                                return str === "\r" ? <p key={uuidv4()}/> : <div key={uuidv4()}>{str}</div>})}
                                    </div>
                        </div>)
                    })}
                    {!loading && constructors.length ===0 && <div className={'mt-3 d-flex flex-column align-items-center'}>
                        <div><img src={nothing_found} alt="nothing_found"/></div>
                        <h3>По данному запросу ничего не найдено</h3>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default Constructors;