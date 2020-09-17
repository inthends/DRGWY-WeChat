import React from 'react';
import common from '../../utils/common';
import api from '../../utils/api';
import { connect } from 'react-redux';
import {
    saveLogin,
    saveUserInfo,
    saveAppid,
    loggedUserReducer,
} from '../../store/actions';

class Auth extends React.Component {
    componentDidMount() {
        //let params = common.urlSearch(decodeURI(window.location.href));


        if (loggedUserReducer().appid == null
            || loggedUserReducer().appid == ''
            || loggedUserReducer().appid == undefined
            || loggedUserReducer().appid == 'false') {
            api.getData('/api/WeChat/GetAppId', {
                url: common.getHost(),
            }, true).then(res => {
                this.props.saveAppid(res.data);
                setTimeout(() => {
                    this.auth(res.data);//必须传值，state有延迟 neo.li
                }, 100);

            });
        } else {

            this.auth(loggedUserReducer().appid);
        }
    }

    auth(appid) {

        if (window.location.href.includes('localhost')) {
            let res = {
                data: {
                    openid: 'oYSv9v3HR0pR6BwI8MmHRh3DFMYE',
                    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTM2MDUxNDMzNTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiMUIzMEIxQkU1QTExMTA5QkE0OUE4Rjg1QzM2NTM1OUMxNUNBNTdDM0QwRThDODlDNjNGMzc4REFCM0Y0MTI5QzhBRUU1MzUyMjI3MEYwNzYwMzlDRTY2MjQ2MjYzOTNCMzUzQkMwQkI4QkFDOUZBNTZCRTUzMzNEOUM1Q0Y0NTRGRkNGQzYzNTIwOUNDQTkwNzVFQkUwQkRCNjI0ODI0NzI5QUY4RUYxQjFDMjM1RUMyMzU4QTcwOUI0MDVCQzBDNEU2Mjk2OUIzNkIzMkFEMDAwMDIxMTY1ODExM0JEQjY1MzA0OTgzQTI5ODdGRDZDQTAyRkEzMDg5OTcwOEVGRUY3Rjc0MjBCMEZFNDNDMUYzOTk2Q0FGN0ZDNjBGMkYzN0I0N0EyMDEyRTgxMEFFMTNGRjFGRjY1M0MwMDcwQjFFNzlEREU3QTEyNkFBMTNDMjcxODIyRkYwRkJCRTA4RjY5Nzc5MjAwMjVBRDc0MTUzRTJFNkY5Q0JGQkRENzZCMzlFMzc5N0FGRkM5QkY5NkMyRkZDNkYzM0JEMzMxQTEzNDMwNDc0QTJFMTBGNzA1NjIzQkFEOUIwQTQ2RDQ4N0ZERTEzMkI4MkJEQ0MwNTQzOTUxRUFCOThCRUMzMjFGRDc2NDYwQzYyNDQ0MURDMUI4M0I0MkNFOTM4RUI3MUQ5MTg3Q0U5OTBDNEIwQjBDQTg3OUE4OTdCMkRFNjZDN0FEMDIyQ0QyNDM0MTVBMkQ3MTI5Qjk2Rjc1NzJFQUFBRjdBQjE5RUQ1MzQyQzE2NzVBOTQ2QThGNTAxMjJBMjg2NDdGM0FCNkQxRDQxQkEyNUUxOTI3MjMxNDA0QjE2REM2QjkwRTY1QjY4RDY2NjA2QUE4MjZDRkQyQkM2NjVCNDQ0NjRFQzMzN0NFRTAxQUVFRjQ0Q0E5OUUyQkJGNzg5RDY2RUJCOERGM0RCRjZCNzRDNDU3Qjc2RkQ1NUE3QzZBMUE5NDBEQTQzMDg3NjRFMUQ3RDZERUVDRDE1Mzk1QzAzODE4MDQ5NDUxMzU1MSIsImV4cCI6MTU4OTA3ODc1MiwiaXNzIjoiRFJHV1kuU2VydmVyIiwiYXVkIjoiRFJHV1kuTW9iaWxlIn0.FNE7k1yIy3vrNpk0h_1GJTA-8M4un6YgDHJADsDdnZo'
                },
            };
            this.props.saveLoginInfo(res.data);
            api.getData('/api/WeChat/GetUserInfo', {
                openid: res.data.openid,
            }, true).then(res2 => {
                if (res2.data != 'false') {
                    this.props.saveLoginInfo2(res2.data);
                    if (sessionStorage.getItem('redirect') && sessionStorage.getItem('redirect') != null && sessionStorage.getItem('redirect') !== undefined && sessionStorage.getItem('redirect') != 'undefined') {
                        this.props.history.replace(sessionStorage.getItem('redirect'));
                    } else {
                        this.props.history.replace('/home');
                    }
                } else {
                    this.props.history.replace('/login');
                }
            });
        } else {

        let params = common.urlSearch(decodeURI(window.location.href));

        const code = params.code;
        if (code == undefined) {
            const redirectUri = common.getHost() + '/auth';
            const weiXinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                //loggedUserReducer().appid +
                appid +
                '&redirect_uri=' +
                redirectUri +
                '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            window.location.href = weiXinUrl;
        } else {

            api.postData('/api/WeChat/GetWeChatInfo', {
                code: code,
            }, true).then(res => {
                this.props.saveLoginInfo(res.data);
                api.getData('/api/WeChat/GetUserInfo', {
                    openid: res.data.openid,
                }, true).then(res2 => {
                    if (res2.data != 'false') {
                        this.props.saveLoginInfo2(res2.data);
                        if (sessionStorage.getItem('redirect') || sessionStorage.getItem('redirect') != null || sessionStorage.getItem('redirect') != undefined) {
                            this.props.history.replace(sessionStorage.getItem('redirect'));
                        } else {
                            this.props.history.replace('/home');
                        }
                    } else {
                        this.props.history.replace('/login');
                    }
                });
            });
        }
        }
    }

    render() {
        return (
            <div />

        );
    }
}

const save = (dispatch, ownProps) => {
    return {
        saveLoginInfo: (info) => {
            dispatch(saveLogin(info));
        }, 
        saveLoginInfo2: (info) => {
            dispatch(saveUserInfo(info));
        },

        saveAppid: (info) => {
            dispatch(saveAppid(info));
        },
    };
};
export default connect(null, save)(Auth);
