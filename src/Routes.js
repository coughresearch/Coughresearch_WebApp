import React from 'react';
import {BrowserRouter ,Switch, Route} from 'react-router-dom';
import MainForm from './MainForm/MainForm';
const Routes = () => {
    return (<BrowserRouter>
    <Switch>
        <Route path="/" exact component={MainForm}/>
    </Switch>
    </BrowserRouter>  );
}

export default Routes;