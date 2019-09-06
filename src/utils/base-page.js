import React from 'react';

export default class BasePage extends React.Component{

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}
