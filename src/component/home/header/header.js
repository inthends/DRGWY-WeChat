import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import api from "../../../utils/api";
import UDToast from '../../../utils/ud-toast';
import QRCode  from 'qrcode.react';
import {
    loggedUserReducer,
} from '../../../store/actions';

class Header extends BasePage {
    state = {
        view: '',
        qr: false,
        qrCode: '',
    };



    componentDidMount() {
        this.viewFn();
        if (this.state.qrCode.length === 0) {
            api.getData('/api/WeChat/CreateQrCodeFrom').then(res=>{
                if (res.success) {
                    this.setState({
                        qrCode: res.data,
                    })
                } else {
                    UDToast.showError(res.msg);
                }
            })
        }


    }

    viewFn = ()=>{
        if (this.state.qr) {
            this.setState({
                view: <div className='qr-flex' onClick={this.qrcode}>
                        <div>
                            <QRCode value={this.state.qrCode} size={200} fgColor="#000000" />
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
                        <QRCode value={this.state.qrCode} size={18} fgColor="#05ba8b" />
                        <p>二维码</p>
                        <Icon type={'down'} color={'#fff'}/>
                    </div>
                </div>
                {this.state.view}
            </div>
        );
    }
}

export default Header;
