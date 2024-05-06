import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../src/app/pages/dashboard/dashboard';

export default function GenyaRoutes () {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/home"/>
                    )}/>
                    <Route path="/home" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}
