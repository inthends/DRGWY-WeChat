import React from 'react';
import './pay-detail.css';
import api from "../../../../utils/api";
import {loggedUserReducer} from "../../../../store/actions";
import UDToat from "../../../../utils/ud-toast";
import {Modal} from 'antd-mobile';
import common from '../../../../utils/common';
import UDToast from '../../../../utils/ud-toast';
import wxSign from '../../../../utils/wxSign';
import UDAlert from '../../../../utils/ud-alert';

class PayDetail extends React.Component {
    state = {
        data: {
            detail: []
        },
        order: null,
        canSubmit: true,
    };

    showModal = () => {
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
                    appId: 'wxa3cbf60affa3a702',
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
        api.getData('/api/WeChat/GetBillById', {
            billId: this.props.location.state.billId
        }, true).then(res => {
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
        const {data} =  this.state;
        const list = data.detail;
        return (
            <div className='img-list2'>
                <div className='img-list1'>
                    <div className='img-list1-border'>
                        <div className='img-list1-detail'>
                            <div>
                                <p>{data.belongDate}</p>
                                <p className='img-list1red'>合计：{data.allAmount}</p>
                            </div>
                            <div>
                                <p className='img-list1font'>送达日：{data.sendTime}</p>
                            </div>
                            {/*<div>*/}
                                {/*<p className='img-list1font'>查阅日：2019-07-30 09:30</p>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                    <div className='img-list1-border'>
                        {list.map(i => (
                            <div className='img-list1-detail'>
                                <div>
                                    <p className='img-list1fang'>万达茂\C座\903室</p>
                                </div>
                                <div>
                                    <p>{i.feeName}</p>
                                    <p className='img-list1red'>{i.feeAmount}</p>
                                </div>
                                <div>
                                    <p className='img-list1font'>2018-01-01至2018-12-31</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="btn1">
                        <button onClick={this.showModal}>立即缴费</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PayDetail;
