import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'antd/dist/antd.css'
import React from 'react';
import {Provider} from "react-redux";
import {Routes, Route, HashRouter} from "react-router-dom";
import store from "store/store";
import Constructors from "./Constructors/Constructors";
import Contractors from "./Contractors/Contractors";
import Main from "./Main/Main";
import './App.css'

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route exact path={"/"} element={<Main/>}/>
                    <Route path={"/contractors"} element={<Contractors/>}/>
                    <Route path={"/constructors"} element={<Constructors/>}/>
                </Routes>
            </HashRouter>
        </Provider>
    );
};

export default App;