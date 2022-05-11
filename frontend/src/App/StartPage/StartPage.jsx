import React from 'react';
import Header from "components/header";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {editContractorList, fetchContractors} from "store/reducers/contractor";
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

    const priceRanges = [
        {value: 0, label: '-----'},
        {value: 1, label: 'Меньше - 200 000 руб.'},
        {value: 2, label: '200 000 - 500 000 руб.'},
        {value: 3, label: '500 000 - 1 000 000 руб.'},
        {value: 4, label: '1 000 000 руб. - Больше'}
    ]

    const priceRangeValue = {
        0: [0, 1000000000],
        1: [0, 200000],
        2: [200000, 500000],
        3: [500000, 1000000],
        4: [1000000, 1000000000]
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

    const [filterPriceRange, setFilterPriceRange] = React.useState({value: 0, label: '-----'})

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

    const getPrices = async (site_type, min_price = 0, max_price = 1000000000) => {

        console.log(min_price, max_price)

        try {
            const elements = await axio.get(`/api/prices/?site_type=${site_type}&min_price=${min_price}&max_price=${max_price}`, {
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
        let p2 = getPrices(filterSiteType.value)
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
        console.log(str)
        setQuery(str)
        let p0 = dispatch(fetchContractors({query_str: str, page: 1}))
        let p1 = filterName === 'siteType' ? getPrices(filterObj.value) : getPrices(filterSiteType.value)
        Promise.all([p0, p1]).then(data => {
            console.log('data[1]', data[1])
            setPricesObj(createPriceObj(data[1]))
            setLoading(false)
        })
    }


    // console.log(pricesObj)

    function createPriceObj(prices) {
        const tmpObj = {}
        prices && prices.forEach(el => {
            tmpObj[el.obj] = [el.min_price, el.max_price]
        })
        return tmpObj
    }

    function reformatPrice(priceInt) {
        return (priceInt).toLocaleString('ru-RU', {
          // style: 'currency',
          // currency: 'RUB',
          maximumSignificantDigits: 1
        });
    }

    const handlePriceRangeFilterChange = (filterObj) => {

        getPrices(filterSiteType.value, priceRangeValue[filterObj.value][0], priceRangeValue[filterObj.value][1]).then(prices => {
            console.log(prices)
        })

        // const contractorTmpObj = {}
        // contractorList.forEach(item => {
        //     contractorTmpObj[item.obj.id] = item
        // })
        //
        // const filteredList = []
        // Object.keys(pricesObj).forEach(key => {
        //     if (pricesObj[key][0] >= priceRangeValue[filterObj.value][0] && pricesObj[key][1] <= priceRangeValue[filterObj.value][1]) {
        //         filteredList.push(contractorTmpObj[key])
        //     }
        // })
        //
        // dispatch(editContractorList(filteredList))
    }

    // console.log('contractorList ', contractorList)

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
                                <div style={{width: '90%'}} className={'row justify-content-between'}>
                                    <div className="col-lg-4 mb-3">
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
                                    <div className="col-lg-4 mb-3">
                                        <p className="mb-0">Выберите тип подрядчика:</p>
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
                                    <div className="col-lg-4 mb-3">
                                        <p className="mb-0">Выберите ценовой диапазон:</p>
                                        <Select options={priceRanges}
                                                value={filterPriceRange}
                                                onChange={(filterObj) => {
                                                    setFilterPriceRange(filterObj)
                                                    handlePriceRangeFilterChange(filterObj)
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
                            <th>Мин. цена (руб.)</th>
                            <th>Макс. цена (руб.)</th>
                            <th>Тип подрядчика</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contractorList && contractorList.map(contractor => {
                            return contractor ? <tr key={uuidv4()} className={'custom-table-row'}
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
                                    {pricesObj && pricesObj[contractor.obj.id] ? reformatPrice(pricesObj[contractor.obj.id][0]): '-'}
                                </td>
                                <td>
                                    {pricesObj && pricesObj[contractor.obj.id] ? reformatPrice(pricesObj[contractor.obj.id][1]) : '-'}
                                </td>
                                <td>{contractorTypesObj[contractor.obj.obj_type]}</td>
                            </tr> : null
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