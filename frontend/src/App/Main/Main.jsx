import React, {useState} from 'react';
import Header from "components/header";
import Select from "react-select";
import axio from "axios";

const Main = () => {


    const [targetSelectOptions, setTargetSelectOptions] = useState([])
    const [targetSelectValue, setTargetSelectValue] = useState(null)

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

    React.useEffect(() => {
        let p0 = getTargets('commerce')
        let p1 = getTargets('non_commerce')
        Promise.all([p0, p1]).then(data => {
            setTargetSelectOptions([{
                label: 'Коммерческие',
                options: data[0].map(target => ({value: target.id, label: target.target}))
            }, {
                label: 'Некоммерческие',
                options: data[1].map(target => ({value: target.id, label: target.target}))
            }])
        })
    }, [])


    return (
        <>
            <div className={'body-background'}/>
            <Header/>
            <div className="container-fluid">
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
                                                    onChange={setTargetSelectValue}
                                                    placeholder={''}
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Способ реализации:</p>
                                            <Select options={[{value:1, label:'Самостоятельно'}, {value:2, label:'На заказ'}]}
                                                    value={''}
                                                    // onChange={(filterObj) => {
                                                    //     setFilterContractorType(filterObj)
                                                    //     handleFilterChange('contractorType', filterObj)
                                                    // }}
                                                    placeholder={''}
                                                // styles={colourStyles}
                                            />
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            <p className="mb-0">Ценовой диапозон:</p>
                                            <Select options={[{value:1, label:'меньше - 200 000'}, {value:2, label:'200 000 - 500 000'},
                                                {value:3, label:'500 000 - 1000 000'}, {value:4, label:'1000 000 - больше'}]}
                                                    value={''}
                                                    // onChange={(filterObj) => {
                                                    //     setFilterPriceRange(filterObj)
                                                    //     handleFilterChange('priceRange', filterObj)
                                                    // }}
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
                </div>
            </div>
        </>
    );
};

export default Main;