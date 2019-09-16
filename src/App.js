import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Routers from './router';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        const {openid} = this.props;
        const routers = Routers.map((item, index) => {
            return <Route key={index} path={item.path} exact render={props => {
                if (item.path !== '/auth') {
                    sessionStorage.setItem('redirect', item.path)
                }
                document.title = item.title;
                return ((openid || item.path === '/auth') ? <item.component {...props} /> : <Redirect to='/auth'/>);
            }}/>;
        });
        return (
            <Router>
                <div>
                    <Switch>
                        {routers}
                    </Switch>
                </div>
            </Router>
        );
    }
}

const stateToProps = state => {
    const {loggedUserReducer} = state;
    const openid = loggedUserReducer.openid;
    return {openid};
};

export default connect(stateToProps)(App);
