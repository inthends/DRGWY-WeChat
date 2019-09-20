import React from 'react';
import './pay.css';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";
import {Modal} from 'antd-mobile';
import common from '../../../utils/common';
import UDToast from '../../../utils/ud-toast';
import wxSign from '../../../utils/wxSign';
import UDAlert from '../../../utils/ud-alert';

class Login extends React.Component {
    state = {
        data: [],
        order: null,
        canSubmit: true,
    };

    showModal =  () => {
        UDAlert.showAlert('确认支付？', '', [{
            text: '确定',
            onPress: () => {
                this.callWXPay()
            },
        }]);
    };

    callWXPay = (orderNo) => {
        UDToast.showLoading();
        wxSign.getWXSign().then(jssdk => {
            api.postData('/api/order/createPay', {orderNo: orderNo}).then(res => {
                const configData = res.body;
                jssdk.chooseWXPay({
                    appId: configData.appId,
                    timestamp: configData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: configData.nonceStr, // 支付签名随机串，不长于 32 位
                    package: configData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: configData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: configData.paySign, // 支付签名
                    success: function (res) {
                        UDToast.hiddenLoading();
                    },
                    cancel: function (res) {
                        UDToast.hiddenLoading();
                        UDToast.showError('支付取消');
                    },
                });
            }).catch(e => {
                UDToast.hiddenLoading();
            });
        });
    };

    componentDidMount() {
        api.postData('/api/WeChat/GetBillList', {}, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    render() {
        const data = this.state.data;
        return (
            <div className='img-list1'>
                {data.map(i => (
                    <div className="cont-list">
                        <div className="cont-list-cont" onClick="detail()">
                            <div className="cont-list-cont-felx">
                                <p>{i.belongDate}</p>
                                <p><span>合计：</span>{i.allAmount}</p>
                            </div>
                            {i.detail.map(i2 => (
                                <div className="cont-list-cont-felx">
                                    <p>{i2.feeName}</p>
                                    <p>{i2.feeAmount}</p>
                                </div>
                            ))}

                            <div className="cont-list-cont-felx">
                                <p>{i.sendTime} 送达</p>
                                <p>立即缴费</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="btn1">
                    <button onClick={this.showModal}>全部交清</button>
                </div>
            </div>
        );
    }
}

export default Login;
