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
        canSubmit: false,
        type: ''
    };

    showModal = () => {
        UDAlert.showAlert('确认支付？', '', [{
            text: '确定',
            onPress: () => {
                this.callWXPay()
            },
        }]);
    };

    callWXPay = () => {
        UDToast.showLoading();
        this.setState({
            canSubmit: true
        });
        wxSign.getWXSign(this.props.location.state.billId).then(jssdk => {
            api.postData('/api/WeChat/GetWeChatPaySign', {
                billId: this.props.location.state.billId
            }).then(res => {
                if (res.success) {
                    const configData = res.data;
                    // console.log('GetWeChatPaySign:', configData);
                    jssdk.chooseWXPay({
                        appId: configData.appId,
                        timestamp: configData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: configData.nonceStr, // 支付签名随机串，不长于 32 位
                        package: configData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: configData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: configData.paySign, // 支付签名
                        success: (res) => {
                            UDToast.hiddenLoading();
                            this.props.history.replace({
                                pathname: '/pay',
                            })
                        },
                        cancel: (res) => {
                            UDToast.hiddenLoading();
                            UDToast.showError('支付取消');
                            this.setState({
                                canSubmit: false
                            });
                        },
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            }).catch(e => {
                UDToast.hiddenLoading();
                this.setState({
                    canSubmit: false
                });
            });
        });
    };

    componentDidMount() {
        console.log(this.props.location.state.type)
        api.getData('/api/WeChat/GetBillById', {
            billId: this.props.location.state.billId
        }, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    type: this.props.location.state.type
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    render() {
        const {data} = this.state;
        const list = data.detail;
        let btn = '';
        if (this.state.type == 0) {
            btn = <div className="btn1">
                <button disabled={this.state.canSubmit} onClick={this.showModal}>立即缴费</button>
            </div>
        } else {
            btn = '';
        }
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
                                    <p className='img-list1fang'>{i.allName}</p>
                                </div>
                                <div>
                                    <p>{i.feeName}</p>
                                    <p className='img-list1red'>{i.feeAmount}</p>
                                </div>
                                <div>
                                    <p className='img-list1font'>{i.billPeriod}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    {btn}
                </div>
            </div>
        );
    }
}

export default PayDetail;
