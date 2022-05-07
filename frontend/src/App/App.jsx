import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';
import {Provider} from "react-redux";
import {Routes, Route, HashRouter} from "react-router-dom";
import StartPage from "./StartPage/StartPage";
import store from "store/store";

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route exact path={"/"} element={<StartPage/>}/>
                </Routes>
            </HashRouter>
        </Provider>
    );
};

export default App;