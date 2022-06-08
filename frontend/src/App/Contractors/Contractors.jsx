import React from 'react';
import Header from "components/header";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {editContractorList, fetchContractors} from "store/reducers/contractor";
import Select from "react-select";
import axio from "axios";
import './style.css'
import {showSmallInfo} from 'utils/utils';
import {useLocation} from "react-router-dom";

const Contractors = () => {

    const location = useLocation()
    const projectsFromQueryParams = new URLSearchParams(location.search).get('projects')

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
    const [query, setQuery] = React.useState(projectsFromQueryParams ? `projects=${projectsFromQueryParams}` : 'projects=1')

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
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const getPrices = async (site_type) => {

        try {
            const elements = await axio.get(`/api/prices/?site_type=${site_type}`, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            console.log(err.response.data);
        }
    }

    React.useEffect(() => {
        let p0 = dispatch(fetchContractors({query_str: query, page: 1}))
        let p1 = getSiteTypes()
        let p2 = getPrices(projectsFromQueryParams ? projectsFromQueryParams : filterSiteType.value)
        Promise.all([p0, p1, p2]).then(data => {

            const list = []
            data[1] && data[1].forEach(el => {
                list.push({value: el.id, label: el.type})
                projectsFromQueryParams && +projectsFromQueryParams === el.id && setFilterSiteType({value: el.id, label: el.type})
            })

            setSiteTypes(list)


            setContractorTypes([{
                value: '',
                label: 'Все'
            }, ...Object.keys(contractorTypesObj).map(key => ({value: key, label: contractorTypesObj[key]}))])

            const obj = createPriceObj(data[2])
            filterByPriceRange(data[0].payload, obj, priceRangeValue[filterPriceRange.value][0], priceRangeValue[filterPriceRange.value][1])
            setPricesObj(obj)

        }).finally(() => {
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

        let priceRangeMin = filterName === 'priceRange' ? priceRangeValue[filterObj.value][0] : priceRangeValue[filterPriceRange.value][0]
        let priceRangeMax = filterName === 'priceRange' ? priceRangeValue[filterObj.value][1] : priceRangeValue[filterPriceRange.value][1]

        let p0 = dispatch(fetchContractors({query_str: str, page: 1}))
        let p1 = filterName === 'siteType' ? getPrices(filterObj.value) : getPrices(filterSiteType.value)
        Promise.all([p0, p1]).then(data => {
            console.log('data[1]', data[1])
            console.log('data[0]', data[0])

            const obj = createPriceObj(data[1])
            filterByPriceRange(data[0].payload, obj, priceRangeMin, priceRangeMax)
            setPricesObj(obj)

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
          // maximumSignificantDigits: 1
        });
    }

    const filterByPriceRange = (contList, pricesObj, minPrice, maxPrice) => {

        const filteredList = []

        const contractorTmpObj = {}
        contList.results.forEach(item => {
            contractorTmpObj[item.obj.id] = item
            if (!pricesObj[item.obj.id]){
                filteredList.push(item)
            }
        })

        Object.keys(pricesObj).forEach(key => {
            if ((pricesObj[key][0] >= minPrice && pricesObj[key][0] <= maxPrice) || (pricesObj[key][1] <= maxPrice && pricesObj[key][1] >= minPrice)) {
                filteredList.push(contractorTmpObj[key])
            }
        })

        dispatch(editContractorList({...contList, results: filteredList, count: filteredList.length}))
    }

    console.log('contractorList ', contractorList)

    return (
        <>
            <div className={'body-background'}/>
            <Header activeTab={'orderSite'}/>
            <div className="container-fluid">
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
                                                        handleFilterChange('priceRange', filterObj)
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
                            {contractorList && contractorList.results && contractorList.results.map(contractor => {
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
                                        ><strong>{contractor.obj.name}</strong></a>
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
            </div>
        </>
    );
};

export default Contractors;