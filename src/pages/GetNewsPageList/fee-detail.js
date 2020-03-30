import React from 'react';
import '../Home/pay/pay-detail/pay-detail.css';
import api from '../../utils/api';
import {loggedUserReducer} from '../../store/actions';
import UDToat from '../../utils/ud-toast';
import {Modal} from 'antd-mobile';
import common from '../../utils/common';
import UDToast from '../../utils/ud-toast';
import wxSign from '../../utils/wxSign';
import UDAlert from '../../utils/ud-alert';

class FeeDetail extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = common.getCurrentUrlParams() || {};
        this.state = {
            data: {
                detail: [],
            },
            order: null,
            canSubmit: false,
            ...urlParams,
        };
    }


    showModal = () => {
        UDAlert.showAlert('确认支付？', '', [{
            text: '确定',
            onPress: () => {
                this.callWXPay();
            },
        }]);
    };

    callWXPay = () => {
        UDToast.showLoading();
        this.setState({
            canSubmit: true,
        });
        wxSign.getWXSign().then(jssdk => {
            api.postData('/api/WeChat/GetWeChatPaySign', {
                billId: this.state.id,
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
                            UDToast.showError('支付成功');
                            this.setState({
                                type: '1',
                            });
                        },
                        cancel: (res) => {
                            UDToast.hiddenLoading();
                            UDToast.showError('支付取消');
                            this.setState({
                                canSubmit: false,
                            });
                        },
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            }).catch(e => {
                UDToast.hiddenLoading();
                this.setState({
                    canSubmit: false,
                });
            });
        });
    };

    componentDidMount() {

        const {id, type} = this.state;
        let url;
        if (type === '0') {
            document.title = '电子账单';
            url = '/api/WeChat/GetBillById';
        } else {
            document.title = '缴费成功';
            url = '/api/WeChat/GetClearBillById';
        }
        api.getData(url, {
            billId: id,
            type,
        }, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    type: this.state.type,
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    render() {
        const {data, type} = this.state;
        const list = data.detail;
        let btn = '';
        let top;
        if (type === '0') {
            btn = <div className="btn1">
                <button disabled={this.state.canSubmit} onClick={this.showModal}>立即缴费</button>
            </div>;

            top = (
                <div className='img-list1-border'>
                    <div className='img-list1-detail'>
                        <div>
                            <p>{data.belongDate}</p>
                            <p className='img-list1red'>合计：{data.allAmount}</p>
                        </div>
                        <div>
                            <p className='img-list1font'>送达日：{data.sendTime}</p>
                        </div>

                    </div>

                </div>
            );

        } else {
            btn = (
                <div className='orgName111'>{data.orgName}</div>
            );
            top = (
                <div className='aavv123'>
                    <div className={'payDate111'}>支付日期：{data.payDate}</div>
                    <div className='payType111'>{data.payType}</div>
                </div>
            );
        }
        return (
            <div className='img-list2'>
                <div className='img-list1'>
                    {top}
                    <div className='img-list1-border'>
                        {list.map(i => (
                            <div className='img-list1-detail'>
                                <div>
                                    <p className='img-list1fang'>{i.allName}</p>
                                </div>
                                <div>
                                    <p>{i.feeName}</p>
                                    <p className='img-list1red'>{i.payAmount}</p>
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

export default FeeDetail;
