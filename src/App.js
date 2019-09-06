import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Routers from './router';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        const {jwt} = this.props;
        const routers = Routers.map((item, index) => {
            return <Route key={index} path={item.path} exact render={props => {
                document.title = item.title;
                return ((!item.auth || jwt) ? <item.component {...props} /> : <Redirect to={{
                    pathname: '/auth',
                }}/>);
            }
            }/>;
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
    const jwt = loggedUserReducer.jwt;
    return {jwt};
};

export default connect(stateToProps)(App);
