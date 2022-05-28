import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'antd/dist/antd.css'
import React from 'react';
import {Provider} from "react-redux";
import {Routes, Route, HashRouter} from "react-router-dom";
import store from "store/store";
import SiteCreating from "./SiteCreating/SiteCreating";
import Constructors from "./Constructors/Constructors";
import Contractors from "./Contractors/Contractors";
import Main from "./Main/Main";
import CMS from "./CMS/CMS";
import WebDesignTools from "./WebDesignTools/WebDesignTools";
import ProgrammingTools from "./ProgrammingTools/ProgrammingTools";
import './App.css'

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route exact path={"/"} element={<Main/>}/>
                    <Route path={"/contractors"} element={<Contractors/>}/>
                    {/*<Route path={"/site-creating"} element={<SiteCreating/>}/>*/}
                    <Route path={"/constructors"} element={<Constructors/>}/>
                    <Route path={"/cms"} element={<CMS/>}/>
                    <Route path={"/web-design-tools"} element={<WebDesignTools/>}/>
                    <Route path={"/programming-tools"} element={<ProgrammingTools/>}/>
                </Routes>
            </HashRouter>
        </Provider>
    );
};

export default App;