import React from 'react';
import Header from "components/header";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {fetchContractors} from "store/reducers/contractor";
import Select from "react-select";
import axio from "axios";
import './style.css'
import {showSmallInfo} from 'utils/utils';
import Loader from "components/loader/Loader";

const StartPage = () => {

    let contractorTypesObj = {
        'web_studio': 'Веб-студия',
        'freelance': 'Фриланс'
    }

    const dispatch = useDispatch()
    const {contractorList} = useSelector(state => state.contractor)
    const [query, setQuery] = React.useState('projects=1')

    const [filterSiteType, setFilterSiteType] = React.useState({value: 1, label: 'Лендинг'})
    const [siteTypes, setSiteTypes] = React.useState([])

    const [filterContractorType, setFilterContractorType] = React.useState({value: '', label: 'Все'})
    const [contractorTypes, setContractorTypes] = React.useState([])

    const [pricesObj, setPricesObj] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const getSiteTypes = async () => {
        try {
            const elements = await axio.get(`/api/site-types/`, {
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const getPrices = async () => {

        try {
            const elements = await axio.get(`/api/prices/?site_type=${filterSiteType.value}`, {
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    React.useEffect(() => {
        let p0 = dispatch(fetchContractors({query_str: query, page: 1}))
        let p1 = getSiteTypes()
        let p2 = getPrices()
        Promise.all([p0, p1, p2]).then(data => {
            data[1] && setSiteTypes(data[1].map(el => ({
                value: el.id,
                label: el.type
            })))
            setContractorTypes([{
                value: '',
                label: 'Все'
            }, ...Object.keys(contractorTypesObj).map(key => ({value: key, label: contractorTypesObj[key]}))])
            return data[2]
        }).then(prices => {
            setPricesObj(createPriceObj(prices))
            setLoading(false)
        })
    }, [])

    const handleFilterChange = (filterName, filterObj) => {
        setLoading(true)
        let siteType = filterName === 'siteType' ? 'projects=' + filterObj.value : 'projects=' + filterSiteType.value
        let contractorType = filterName === 'contractorType' ? 'obj__obj_type=' + filterObj.value : 'obj__obj_type=' + filterContractorType.value
        let str = contractorType + '&' + siteType
        setQuery(str)
        let p0 = dispatch(fetchContractors({query_str: str, page: 1}))
        let p1 = getPrices()
        Promise.all([p0, p1]).then(data => {
            setPricesObj(createPriceObj(data[1]))
            setLoading(false)
        })
    }


    console.log(pricesObj)

    function createPriceObj(prices) {
        const tmpObj = {}
        prices && prices.forEach(el => {
            tmpObj[el.obj] = [el.min_price, el.max_price]
        })
        return tmpObj
    }

    return (
        <>
            <div className={'body-background'}/>
            <Header/>
            <div className={'container'}>
                <div className="row mb-2">
                    <div className="col-12">
                        <div className="page-title-box">
                            <h4 className="page-title">
                                Поиск вариантов для заказа сайта
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-xl-12 shadow-sm rounded">
                    <div className="card">
                        <form className="card-body">
                            <h5 className="text-center mb-4">Укажите фильтры для поиска</h5>
                            <div className="row justify-content-center">
                                <div style={{width: '75%'}} className={'row justify-content-between'}>
                                    <div className="col-lg-6 mb-3">
                                        <p className="mb-0">Выберите тип сайта:</p>
                                        <Select options={siteTypes}
                                                value={filterSiteType}
                                                onChange={(filterObj) => {
                                                    setFilterSiteType(filterObj)
                                                    handleFilterChange('siteType', filterObj)
                                                }}
                                                placeholder={''}
                                            // styles={colourStyles}
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <p className="mb-0">Выбеите тип подрядчика:</p>
                                        <Select options={contractorTypes}
                                                value={filterContractorType}
                                                onChange={(filterObj) => {
                                                    setFilterContractorType(filterObj)
                                                    handleFilterChange('contractorType', filterObj)
                                                }}
                                                placeholder={''}
                                            // styles={colourStyles}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/*// <!-- end card-body-->*/}
                    </div>
                    {/*// <!-- end card-->*/}
                </div>
                <div className="col-xl-12 shadow rounded">
                    <table className={"table align-middle mb-0 mt-3 " + (loading ? 'loading' : 'bg-white')}>
                        <thead className="bg-light">
                        <tr>
                            <th/>
                            <th>Название</th>
                            <th>Мин. цена - Макс. цена (руб.)</th>
                            <th>Тип подрядчика</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contractorList && contractorList.results && contractorList.results.map(contractor => {
                            return <tr key={uuidv4()} className={'custom-table-row'}
                                       onClick={(e) => {
                                           if (e.target.name === 'link') return;
                                           showSmallInfo(contractor)
                                       }}
                            >
                                <td width={'30px'}>
                                    {contractor.logo && <img src={contractor.logo} width={'24px'} height={'24px'}
                                         alt={contractor.obj.name + '_logo'}/>}
                                </td>
                                <td>
                                    <a target="_blank" href={contractor.obj.link}
                                       name={'link'}
                                       className={'link'}
                                    >{contractor.obj.name}</a>
                                </td>
                                <td>
                                    {pricesObj && pricesObj[contractor.obj.id] ? pricesObj[contractor.obj.id][0] + ' - ' + pricesObj[contractor.obj.id][1]: 'нет сведений'}
                                </td>
                                <td>{contractorTypesObj[contractor.obj.obj_type]}</td>
                            </tr>
                        })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default StartPage;