import React from 'react';
import BasePage from '../../../utils/base-page';
import { Icon, Grid } from 'antd-mobile';

class Header extends BasePage {

    render() {
        return (
            <div className="header">
                <div className="header-img">
                    <img src={require('../../../static/images/home/1.jpg')} alt=""/>
                </div>
                <div className="name">
                    <p>郭斌</p>
                </div>
                <div className="balance">
                    <img src={require('../../../static/images/home/jifen2.png')} alt=""/>
                    <span>0.00</span>
                </div>
                <div className="qr">
                    <img src={require('../../../static/images/home/qr.png')} alt=""/>
                    <p>兑换码</p>
                    <Icon type={'down'} color={'#fff'} />
                </div>
            </div>

        );
    }
}

export default Header;
