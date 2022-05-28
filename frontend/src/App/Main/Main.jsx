import React, {useState} from 'react';
import Header from "components/header";
import Select from "react-select";
import axio from "axios";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import target_image from '../../static_files/assets/images/cel.png'
import site_type_image from '../../static_files/assets/images/site_type_image.png'
import implementation_way_image from '../../static_files/assets/images/development.png'

const Main = () => {
    const navigate = useNavigate()

    const [targetSelectOptions, setTargetSelectOptions] = useState([])
    const [targetSelectValue, setTargetSelectValue] = useState([])

    const [siteTypeSelectValue, setSiteTypeSelectValue] = useState(null)
    const [siteTypeOptions, setSiteTypeOptions] = useState([])

    const [siteTypesArray, setSiteTypesArray] = useState([])

    const [inplementationWaySelectValue, setInplementationWaySelectValue] = useState(null)
    const [inplementationWayOptions, setInplementationWayOptions] = useState([])

    const [inplementationWayArray, setInplementationWayArray] = useState([])

    const getTargets = async (targetType) => {
        const url = targetType ? `/api/target/?target_type=${targetType}` : `/api/target/`

        try {
            const elements = await axio.get(url, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const getSiteTypes = async (targetIds) => {
        try {
            const elements = await axio.get(`/api/site-types/?for_targets__in=${targetIds}`, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const getInplementationWay = async (inplementationType) => {
        const url = inplementationType ? `/api/implementation-way/?implementation_type=${inplementationType}` : `/api/implementation-way/`

        try {
            const elements = await axio.get(url, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    React.useEffect(() => {
        let p0 = getTargets('commerce')
        let p1 = getTargets('non_commerce')
        let p2 = getInplementationWay('Самостоятельно')
        let p3 = getInplementationWay('На заказ')
        let p4 = getInplementationWay()
        Promise.all([p0, p1, p2, p3, p4]).then(data => {
            setTargetSelectOptions([{
                label: 'Коммерческие',
                options: data[0].map(target => ({value: target.id, label: target.target}))
            }, {
                label: 'Некоммерческие',
                options: data[1].map(target => ({value: target.id, label: target.target}))
            }])

            setInplementationWayOptions([{
                label: 'Самостоятельно',
                options: data[2].map(el => ({value: el.id, label: el.name}))
            }, {
                label: 'На заказ',
                options: data[3].map(el => ({value: el.id, label: el.name}))
            }])

            setInplementationWayArray(data[4])
        })
    }, [])


    const handleOnTargetSelect = (targets) => {

        if(targets.length === 0){
            setSiteTypeOptions([])
            return
        }

        getSiteTypes(targets.map(trgt => trgt.value).join(',')).then( data => {
            setSiteTypesArray(data)
            setSiteTypeOptions(data.map(el => ({value: el.id, label: el.type})))
        })
    }

    const handleOnImlementationSelect = (impWay) => {
        // const tmp = inplementationWayArray.find(el => el.id === impWay.value)
        // if(impWay.label === 'На конструкторе'){
        //
        // }
        console.log(impWay.label)
        switch (impWay.label) {
            case "Веб-студии и фриланс":
                navigate(siteTypeSelectValue ? `/contractors/?projects=${siteTypeSelectValue.value}` : `/contractors/`);
                break;
            case "На конструкторе":
                navigate(siteTypeSelectValue ? `/constructors/?site_types=${siteTypeSelectValue.value}` : '/constructors');
                break;
            case "Написать исходный код":
                navigate('/site-creating');
                break;
            default:
                console.log(impWay.value);
        }
        // tmp && tmp.implementation_type === 'На заказ' ?
        //     navigate(siteTypeSelectValue ? `/contractors/?projects=${siteTypeSelectValue.value}` : `/contractors/`) : navigate('/site-creating')
    }

    return (
        <>
            <div className={'body-background'}/>
            <Header activeTab={'home'}/>
            <div className="container-fluid pb-4">
                <div className={'container'}>
                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h4 className="page-title">
                                    Рекомендация по созданию сайтов
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12 shadow-sm rounded">
                        <div className="card">
                            <form className="card-body">
                                <h5 className="text-center mb-4">Укажите критерии</h5>
                                <div className="row justify-content-center">
                                    {/*<div style={{width: '90%'}} className={'row'}>*/}
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Цель:</p>
                                            <Select options={targetSelectOptions}
                                                    value={targetSelectValue}
                                                    onChange={(targets) => {
                                                        console.log(targets)
                                                        setTargetSelectValue(targets)
                                                        setSiteTypeSelectValue(null)
                                                        handleOnTargetSelect(targets)
                                                    }}
                                                    placeholder={''}
                                                    isMulti
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Вид сайта:</p>
                                            <Select options={siteTypeOptions}
                                                    value={siteTypeSelectValue}
                                                    onChange={setSiteTypeSelectValue}
                                                    placeholder={''}
                                                    noOptionsMessage={() => targetSelectValue.length === 0 ? 'Сначала выберите цель' : 'Результат не найден'}
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Способ реализации:</p>
                                            <Select options={inplementationWayOptions}
                                                    value={inplementationWaySelectValue}
                                                    onChange={impWay => {
                                                        setInplementationWaySelectValue(impWay)
                                                        handleOnImlementationSelect(impWay)
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

                    {targetSelectValue.length === 0 && !siteTypeSelectValue && <div>
                        <div className="row mb-2 mt-4">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <h4 className="page-title">
                                        Как это работает
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div className={'row mt-3 shadow rounded align-items-center p-3 d-flex'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={target_image} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-9'}>
                                        <h4>1. Выбор целей</h4>
                                        <div>
                                            <div>Цели выбирается из выпадающего списка "Цель" в блоке "Укажите критерии"</div>
                                            <div>Цели бывают коммерческие и некоммерческие. В выпадающем списке вы увидете это разделение</div>
                                        </div>
                                    </div>
                        </div>

                        <div className={'row mt-3 shadow rounded align-items-center p-3 d-flex'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={site_type_image} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-9'}>
                                        <h4>2. Выбор вида сайта</h4>
                                        <div>
                                            <div>После выбора целей выпадающий список "Вид сайта" заполняется рекомендуемыми видами сайтов, которые подходят для выбранных целей</div>
                                            <div>Также появляется информация о каждом из них под блоком "Укажите критерии"</div>
                                        </div>
                                    </div>
                        </div>

                        <div className={'row mt-3 shadow rounded align-items-center p-3 d-flex'} style={{backgroundColor: 'white'}}>
                                    <div className={'col-3'}><img src={implementation_way_image} alt="logo" width={'250px'} height={'250px'}/></div>
                                    <div className={'col-9'}>
                                        <h4>3. Выбор способа реализации</h4>
                                        <div>
                                            <div>После выбора вида сайта показывается информация о способах реализации и факторах, которые влияют на выбор</div>
                                            <div>Ознакомтесь с данной информацией и выберите подходящий для вас способ реализации из выпадающего списка "Способ реализации"</div>
                                            <div>После выбора способа реализации вы перейдете на соответствующую страницу с дальнейшими рекомендациями</div>
                                        </div>
                                    </div>
                        </div>

                        {/*<div className={'d-flex align-items-center justify-content-between'}>*/}
                        {/*    <div className={'col-3 shadow rounded'}>*/}
                        {/*        <div className="card">*/}
                        {/*            <div className="card-body">*/}
                        {/*                <h5 className="text-center mb-4" style={{color: 'darkgoldenrod'}}>{'1. Выбор цели'}</h5>*/}
                        {/*                <div>*/}

                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={'col-3 shadow rounded'}>*/}
                        {/*        <div className="card">*/}
                        {/*            <div className="card-body">*/}
                        {/*                <h5 className="text-center mb-4" style={{color: 'darkgoldenrod'}}>{'2. Выбор вида сайта'}</h5>*/}
                        {/*                <div>*/}
                        {/*                    */}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={'col-3 shadow rounded'}>*/}
                        {/*        <div className="card">*/}
                        {/*            <div className="card-body">*/}
                        {/*                <h5 className="text-center mb-4" style={{color: 'darkgoldenrod'}}>{'3. Выбор способа реализации'}</h5>*/}
                        {/*                <div>*/}

                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>}

                    {targetSelectValue.length !== 0 && !siteTypeSelectValue && <div>
                        <div className="row mb-2 mt-4">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <h4 className="page-title">
                                        Для данной цели рекомендуются следующие виды сайтов
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {siteTypesArray.map(el => {
                            return <div key={uuidv4()} className="row shadow rounded mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4" style={{color: 'darkgoldenrod'}}>{el.type}</h5>
                                        <div>
                                            {el.description.split("\n").map(str => {
                                                return str === "\r" ? <p key={uuidv4()}/> : <div key={uuidv4()}>{str}</div>})}
                                        </div>
                                    </div>
                                </div>
                            </div>})}
                     </div>}

                    {targetSelectValue.length !== 0 && siteTypeSelectValue && !inplementationWaySelectValue && <div>
                        <div className="row mb-2 mt-4">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <h4 className="page-title">
                                        Хорошо, теперь выберите способ реализации
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {inplementationWayArray.map(el => {
                            return <div key={uuidv4()} className="row shadow rounded mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4">
                                            <span style={{color: 'darkgoldenrod'}}>{el.implementation_type}: </span>
                                            <span>{el.name}</span>
                                        </h5>
                                        <div>
                                            {el.description.split("\n").map(str => {
                                                return str === "\r" ? <p key={uuidv4()}/> : <div key={uuidv4()}>{str}</div>})}
                                        </div>
                                    </div>
                                </div>
                            </div>})}

                        <div className="row mb-2 mt-4">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <h4 className="page-title">
                                        Таблица сравнений способов реализации
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 shadow rounded">

                            <table className={"table table-bordered align-middle mb-0 mt-3 bg-white"}>
                                <thead className="bg-light">
                                <tr>
                                    <th>Факторы</th>
                                    <th>1. Самостоятельно: На конструкторе</th>
                                    <th>2. Самостоятельно: Написать исходный код</th>
                                    <th>3. Веб-студии и фриланс</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>количество необходимых денежных средств</td>
                                    <td>Мало</td>
                                    <td>Мало</td>
                                    <td>Много</td>
                                </tr>
                                <tr>
                                    <td>время, которое тратиться на разработку</td>
                                    <td>Немного</td>
                                    <td>Больше всех</td>
                                    <td>Много, но меньше чем  при самостоятельном написании исходного кода</td>
                                </tr>
                                <tr>
                                    <td>необходимость в освоении навыков программирования</td>
                                    <td>Нет необходимости</td>
                                    <td>Высокий уровень необходимости </td>
                                    <td>Нет необходимости</td>
                                </tr>
                                <tr>
                                    <td>возможность реализации любой функциональности</td>
                                    <td>Не все функции можно реализовать</td>
                                    <td>Есть, все зависит от навыков</td>
                                    <td>Есть</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                     </div>}
                </div>
            </div>
        </>
    );
};

export default Main;