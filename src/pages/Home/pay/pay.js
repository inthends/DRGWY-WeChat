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
import PayDetail from "./pay-detail/pay-detail";

class Pay extends React.Component {
    state = {
        data: '',
        order: null,
        canSubmit: true,
    };
    detail = (i) => {
        this.props.history.push({
            pathname: '/payDetail',
            state: {
                billId: i.billId,
            },
        })
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
        let view = '';
        if (data === '') {
            view = '';
        } else if (data.length > 0) {
            view = <div>
                {data.map(i => (
                    <div className="cont-list">
                        <div className="cont-list-cont" onClick={() => this.detail(i)}>
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
            </div>
        } else {
            view = <div className='kong'>
                <img src={require('../../../static/images/kong.png')} alt=""/>
                <p>暂无数据！</p>
            </div>
        }

        return (
            <div className='img-list1'>
                {view}
            </div>
        );
    }
}

export default Pay;
