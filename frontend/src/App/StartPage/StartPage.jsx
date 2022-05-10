import React from 'react';
import Header from "components/header";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {fetchWebStudios} from "store/reducers/webStudios";

const StartPage = () => {
    const dispatch = useDispatch()
    const { webStudioList} = useSelector(state => state.webStudio)
    const [query, setQuery] = React.useState('projects__in=Лендинг')

    React.useEffect(() => {
        let p1 = dispatch(fetchWebStudios({query_str: query, page: 1}))
        Promise.all([p1]).then(data => {
            console.log(data)
        })
    }, [])

    return (
        <>
            <Header/>
            <div className={'container'}>

                <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                        <tr>
                            <th/>
                            <th>Название</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                    {webStudioList && webStudioList.results && webStudioList.results.map(webStudio => {
                            return <tr key={uuidv4()}>
                                <td>
                                    <img src={webStudio.logo} width={'18px'} height={'18px'} alt={webStudio.obj.name + '_logo'}/>
                                </td>
                                <td>
                                    {webStudio.obj.name}
                                </td>
                                <td>
                                    ----
                                </td>
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