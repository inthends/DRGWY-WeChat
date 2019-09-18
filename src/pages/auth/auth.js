import React from 'react';
import common from '../../utils/common';
import api from "../../utils/api";

import {connect} from 'react-redux';
import {
    saveLogin,
    saveLogin2
} from '../../store/actions';

class Auth extends React.Component {
    componentDidMount() {
        let params = common.urlSearch(decodeURI(window.location.href));
        const code = params.code;
        if (code === undefined) {
            const redirectUri = 'http://wechat.jslesoft.com/auth';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                'wxa3cbf60affa3a702' +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        } else {
            api.getData('/api/WeChat/GetWeChatInfo', {
                code: code
            }, false).then(res => {
                this.props.saveLoginInfo(res.data);
                api.getData('/api/WeChat/GetUserInfo', {
                    openid: res.data.openid
                }, false).then(res2 => {
                    if (res2.success) {
                        this.props.saveLoginInfo2(res2.data);
                        this.props.history.push('/home')
                    } else {
                        this.props.history.push('/login')
                    }
                });
            });
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo: (info) => {
            dispatch(saveLogin(info));
        },

        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};
export default connect(null, kk)(Auth);
