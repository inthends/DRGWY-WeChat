import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import Routers from './router';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        const {token} = this.props;
        const routers = Routers.map((item, index) => {
            return <Route key={index} path={item.path} exact render={props => {
                if (item.path !== '/auth' && item.path !== '/login') {
                    // alert(JSON.stringify(item))
                    console.log(12, item);
                    console.log(333, window.location);
                    sessionStorage.setItem('redirect', item.path);
                }
                document.title = item.title;
                return ((token || item.path === '/auth' || item.path === '/login') ?
                    <item.component {...props} /> :
                    <Redirect to='/auth'/>);
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
    const token = loggedUserReducer.token;
    return {token};
};

export default connect(stateToProps)(App);
