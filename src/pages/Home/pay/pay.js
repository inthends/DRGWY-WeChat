import React from 'react';
import './pay.css';
import api from "../../../utils/api"; 
import UDToat from "../../../utils/ud-toast";  
import { SegmentedControl } from 'antd-mobile';

class Pay extends React.Component {
    state = {
        data: '',
        order: null,
        canSubmit: true,
        selectedIndex: 0,
    };
    detail = (i) => {
        this.props.history.push({
            pathname: '/payDetail',
            state: {
                billId: i.billId,
                type: this.state.selectedIndex
            },
        })
    };

    componentDidMount() {
        this.info()
    }

    info() {
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

    info2() {
        api.postData('/api/WeChat/GetBillClearList', {}, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    onValueChange = (value) => {
        if (value == '待支付') {
            this.info()
        } else if (value == '已完成') {
            this.info2()
        }
    };

    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            selectedIndex: e.nativeEvent.selectedSegmentIndex,
            data: ''
        })
    };

    render() {
        const data = this.state.data;
        let view = '';
        let p = '';
        if (this.state.selectedIndex == 0) {
            p = <p>立即缴费</p>
        } else {
            p = '';
        }
        if (data == '') {
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
                                {i.allAmount > 0 ? p : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        } else {
            view = <div className='kong'>
                <img src={require('../../../static/images/kong.png')} alt="" />
                <p>暂无数据！</p>
            </div>
        }

        return (
            <div className='img-list1'>
                <div className='work-work'>
                    <SegmentedControl
                        values={['待支付', '已完成']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={this.onChange}
                        onValueChange={this.onValueChange}
                    />
                </div>
                {view}
            </div>
        );
    }
}

export default Pay;
