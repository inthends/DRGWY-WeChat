import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import api from "../../../utils/api";
import {
    loggedUserReducer,
} from '../../../store/actions';

class Header extends BasePage {
    componentDidMount() {

    }

    render() {
        return (
            <div className="header">
                <div className="header-img">
                    <img src={loggedUserReducer().imgurl} alt=""/>
                </div>
                <div className="name">
                    <p>{(loggedUserReducer().name?loggedUserReducer().name:loggedUserReducer().nickName)}</p>
                </div>
                <div className="balance">
                    <img src={require('../../../static/images/home/jifen2.png')} alt=""/>
                    <span>{(loggedUserReducer().scores)}</span>
                </div>
                <div className="qr">
                    <img src={require('../../../static/images/home/qr.png')} alt=""/>
                    <p>兑换码</p>
                    <Icon type={'down'} color={'#fff'}/>
                </div>
            </div>

        );
    }
}

export default Header;
