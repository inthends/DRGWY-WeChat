import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import api from "../../../utils/api";
import {
    loggedUserReducer,
} from '../../../store/actions';

class Header extends BasePage {
    state = {
        view: '',
        qr: false
    };

    componentDidMount() {
        this.viewFn();
    }

    viewFn = ()=>{
        if (this.state.qr) {
            this.setState({
                view: <div className='qr-flex' onClick={this.qrcode}>
                        <div>
                            <img src={require('../../../static/images/qr.png')} alt=""/>
                        </div>
                      </div>
            })
        } else {
            this.setState({
                view: ''
            })
        }
    };

    qrcode = () => {

        if(this.state.qr){
            this.setState({
                qr: false
            },()=>{
                this.viewFn();
            })
        }else {
            this.setState({
                qr: true
            },()=>{
                this.viewFn();
            })
        }
    };

    render() {

        return (
            <div>
                <div className="header">
                    <div className="header-img">
                        <img src={loggedUserReducer().imgurl} alt=""/>
                    </div>
                    <div className="name">
                        <p>{(loggedUserReducer().name ? loggedUserReducer().name : loggedUserReducer().nickName)}</p>
                    </div>
                    <div className="balance">
                        <img src={require('../../../static/images/home/jifen2.png')} alt=""/>
                        <span>{(loggedUserReducer().scores)}</span>
                    </div>
                    <div className="qr" onClick={this.qrcode}>
                        <img src={require('../../../static/images/home/qr.png')} alt=""/>
                        <p>兑换码</p>
                        <Icon type={'down'} color={'#fff'}/>
                    </div>
                </div>
                {this.state.view}
            </div>
        );
    }
}

export default Header;
