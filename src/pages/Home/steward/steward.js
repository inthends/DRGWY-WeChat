import React from 'react';
import './steward.css';
import {TextareaItem} from 'antd-mobile';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";
import {Picker, List, WhiteSpace} from 'antd-mobile';
import {Icon, Grid} from 'antd-mobile';

const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

class Steward extends React.Component {
    state = {
        textarea: '',
        guid: null,
        district: [],
        label: loggedUserReducer().defaultUnitName,
        value: loggedUserReducer().defaultUnitId,

    };

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerRooms', {
            mobile: loggedUserReducer().mobile,
        }, true).then(res => {
            if (res.success) {
                res.data.forEach((item, index) => {
                    res.data[index].value = item.id;
                    res.data[index].label = item.allName;
                });
                this.setState({
                    guid: guid(),
                    district: res.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    onChange3 = (val) => {
        this.setState({
            textarea: val
        })
    };

    onChange4 = (val) => {
    };

    ok = (val) => {
        this.state.district.forEach((item, index) => {
            console.log(item.value)
            console.log(val[0])
            if (item.value === val[0]) {
                this.setState({
                    label: item.label,
                    value: val[0]
                })
            }
        });
    };

    go = () => {
        if (!this.state.textarea) {
            UDToat.showError('请输入留言！');
            return false;
        }
        if (!this.state.value) {
            UDToat.showError('请选择！');
            return false;
        }
        api.postData('/api/WeChat/SaveServiceDeskForm', {
            keyValue: this.state.guid,
            RoomId: this.state.value,
            Content: this.state.textarea,
        }, true).then(res => {
            if (res.success) {
                this.props.history.push('/home');
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    render() {
        return (
            <div className='repairs'>
                <Picker data={this.state.district} cols={1} onChange={this.onChange4} onOk={this.ok}>
                    <div className='title'>
                        {this.state.label}
                        <Icon type='right'/>
                    </div>
                </Picker>
                <div className='mobile'>
                    <a href="">
                        <div className='mobile-list'>
                            <p>服务热线：400-888-6666</p>
                            <img src={require('../../../static/images/home/mobile.png')} alt=""/>
                        </div>
                    </a>
                    <a href="">
                        <div className='mobile-list'>
                            <p>管家电话：400-888-6666</p>
                            <img src={require('../../../static/images/home/mobile.png')} alt=""/>
                        </div>
                    </a>
                </div>
                <div className='TextareaItem'>
                    <TextareaItem
                        placeholder='请输入'
                        rows={5}
                        count={100}
                        onChange={this.onChange3}
                    />
                </div>
                <div className='btn-repa-cint'>
                    <button className='btn-repa' onClick={this.go}>提交</button>
                </div>
            </div>
        );
    }
}

export default Steward;
