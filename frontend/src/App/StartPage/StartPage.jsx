import React from 'react';
import Header from "components/header";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {fetchContractors} from "store/reducers/contractor";
import Select from "react-select";
import axio from "axios";
import './style.css'

const StartPage = () => {

    let contractorTypesObj = {
        'web_studio': 'Веб-студия',
        'freelance': 'Фриланс'
    }

    const dispatch = useDispatch()
    const {contractorList} = useSelector(state => state.contractor)
    const [query, setQuery] = React.useState('')

    const [filterSiteType, setFilterSiteType] = React.useState(null)
    const [siteTypes, setSiteTypes] = React.useState([])

    const [filterContractorType, setFilterContractorType] = React.useState(null)
    const [contractorTypes, setContractorTypes] = React.useState([])

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

    React.useEffect(() => {
        let p0 = dispatch(fetchContractors({query_str: query, page: 1}))
        let p1 = getSiteTypes()
        Promise.all([p0, p1]).then(data => {
            data[1] && setSiteTypes([{value: '', label: '-------'}, ...data[1].map(el => ({value: el.id, label: el.type}))])
            setContractorTypes([{value: '', label: '-------'}, ...Object.keys(contractorTypesObj).map(key => ({value: key, label: contractorTypesObj[key]}))])
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let siteType = filterSiteType.value ? 'projects=' + filterSiteType.value : ''
        let contractorType = 'obj__obj_type=' + filterContractorType.value
        let str = contractorType + '&' + siteType
        setQuery(str)
        dispatch(fetchContractors({query_str: str, page: 1}))
    }

    return (
        <>
            <div className={'body-background'}/>
        <Header/>
        <div className={'container'}>

            <div className="col-xl-12 shadow" >
                <div className="card">
                    <form onSubmit={handleFormSubmit} className="card-body">
                        <h5 className="text-center mb-4">Введите поиск и укажите фильтры</h5>
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <p className="mb-0">Выберите тип сайта:</p>
                                <Select options={siteTypes}
                                        value={filterSiteType}
                                        onChange={setFilterSiteType}
                                        placeholder={''}
                                        // styles={colourStyles}
                                />
                            </div>
                            <div className="col-lg-4 mb-3">
                                <p className="mb-0">Выбеите тип подрядчика:</p>
                                <Select options={contractorTypes}
                                        value={filterContractorType}
                                        onChange={setFilterContractorType}
                                        placeholder={''}
                                        // styles={colourStyles}
                                />
                            </div>
                            <div
                                className="col-lg-4 mb-3 d-flex justify-content-between align-self-end">
                                <button type="submit"
                                        className="btn btn-custom">Применить
                                </button>
                            </div>
                        </div>
                    </form>
                    {/*// <!-- end card-body-->*/}
                </div>
                {/*// <!-- end card-->*/}
            </div>

        <table className="table align-middle mb-0 bg-white mt-3 shadow">
            <thead className="bg-light">
            <tr>
                <th/>
                <th>Название</th>
                <th>Цена</th>
                <th>Тип подрядчика</th>
            </tr>
            </thead>
            <tbody>
            {contractorList && contractorList.results && contractorList.results.map(contractor => {
                return <tr key={uuidv4()}>
                    <td width={'30px'}>
                        <img src={contractor.logo} width={'24px'} height={'24px'} alt={contractor.obj.name + '_logo'}/>
                    </td>
                    <td>
                        <a href={contractor.obj.link} style={{textDecoration: 'none'}}>{contractor.obj.name}</a>
                    </td>
                    <td>
                        ----
                    </td>
                    <td>{contractorTypesObj[contractor.obj.obj_type]}</td>
                </tr>
            })
            }
            </tbody>
        </table>
        </div>
</>
);
};

export default StartPage;