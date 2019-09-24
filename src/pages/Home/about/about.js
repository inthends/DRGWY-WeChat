import React from 'react';
import './about.css';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";

class About extends React.Component {
    state = {

    };
    componentDidMount() {

    }

    render() {
        return (
            <div className='about'>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
                <div className='about-list'>
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                    <div>
                        <h3>企业简介</h3>
                        <p>企业简介</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
