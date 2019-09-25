import React from 'react';
import './login.css';
import UDToat from '../../utils/ud-toast';
import api from '../../utils/api';
import common from "../../utils/common";
import {
    getImgurl,
    getOpenid, saveLogin, saveLogin2
} from '../../store/actions';
import {connect} from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: null,
            code: null,
            codeActive: false,
            second: 60,
            tid: 0,
            codeMsg: '获取验证码',
            headimgurl: '',
            paramsCode: '',
            openid: ''
        };
    }

    //获取code
    componentDidMount() {
        let params = common.urlSearch(decodeURI(window.location.href));
        const code = params.code;
        if (code === undefined) {
            const redirectUri = 'http://wechat.jslesoft.com/login';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                'wxa3cbf60affa3a702' +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        } else {
            this.setState({
                paramsCode: code,
                headimgurl: getImgurl(),
                openid: getOpenid()
            })
        }
    }

    login = () => {
        if (!this.state.mobile) {
            UDToat.showError('请输入手机号！');
            return false;
        }
        if (!this.state.code) {
            UDToat.showError('验证码！');
            return false;
        }
        api.getData('/api/WeChat/CheckCaptcha', {
            mobile: this.state.mobile,
            captcha: this.state.code,
            code: this.state.paramsCode,
            openid: this.state.openid
        }, true).then(res => {
            if(res.success){
                this.props.saveLoginInfo2(res.data);
                if(sessionStorage.getItem('redirect')){
                    this.props.history.replace(sessionStorage.getItem('redirect'))
                }else {
                    this.props.history.replace('/home')
                }
            }else {
                UDToat.showError(res.msg);
            }
        });
    };

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    sms = () => {
        if (this.state.codeActive) {
            return false;
        }
        if (!this.state.mobile) {
            UDToat.showError('请输入手机号！');
            return false;
        }
        this.state.codeActive = true;
        api.getData('/api/WeChat/SendSMS', {
            mobile: this.state.mobile
        }, true).then(res => {
            this.state.tid = setInterval(() => {
                if (this.state.second !== 0) {
                    this.setState({
                        second: this.state.second - 1,
                        codeMsg: '已发送(' + this.state.second + 's)'
                    })
                } else {
                    clearInterval(this.state.tid);
                    this.setState({
                        tid: 0,
                        second: 60,
                        codeMsg: '获取验证码',
                        codeActive: false
                    })
                }
            }, 1000);
        });
    };

    render() {
        const {mobile, code, codeActive, second, tid, codeMsg, headimgurl} = this.state;
        return (
            <div className="login">
                <div className="login-content">
                    <div className="img">
                        <img src={headimgurl} alt=""/>
                        <p>您好</p>
                        <p>欢迎来到</p>
                    </div>
                    <div className="login-title">
                        <input type="tel" value={mobile} name='mobile' placeholder="请输入您的手机号"
                               onChange={this.changeValue}
                               maxlength="11"/>
                        <div className="code">
                            <input type="tel" maxlength="6" name='code' onChange={this.changeValue} value={code}
                                   placeholder="验证码"/>
                            <button className="codeBtn" onClick={this.sms}>
                                {codeMsg}
                            </button>
                        </div>
                        <p>如果您还没有用这个手机号登录过，我们将为您帐号</p>
                        <button className="btn" onClick={this.login}>登录</button>
                    </div>
                </div>
            </div>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};
export default connect(null, kk)(Login);