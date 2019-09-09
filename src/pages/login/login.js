import React from 'react';
import './login.css';
import UDToat from '../../utils/ud-toast';
import api from '../../utils/api';

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
            headimgurl: ''
        };
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
            captcha: this.state.code
        }, false).then(res => {
            console.log(res)
        });
    };

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    mobileBlur = () => {
        window.scroll(0, 0);
    };

    codeBlur = () => {
        window.scroll(0, 0);
    };

    sms = () => {
        if (this.state.codeActive) {
            return false;
        }
        if (!this.state.mobile) {
            UDToat.showError('请输入手机号！');
            return false;
        }
        // this.state.codeActive = true;
        api.getData('/api/WeChat/SendSMS', {
            mobile: this.state.mobile
        }, false).then(res => {
            console.log(res)
        });
    };

    render() {
        const {mobile, code, codeActive, second, tid, codeMsg, headimgurl} = this.state;
        return (
            <div className="login">
                <div className="login-content">
                    <div className="img">
                        <img src={require('../../static/images/home/1.jpg')} alt=""/>
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

export default Login;
