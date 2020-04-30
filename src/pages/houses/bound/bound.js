import React from 'react';
import './bound.css';
import {Button} from 'antd-mobile';
import api from '../../../utils/api';
import UDToat from '../../../utils/ud-toast';
import {loggedUserReducer, rooms, saveLogin2} from '../../../store/actions';
import {connect} from 'react-redux';

class Bound extends React.Component {


    constructor(props) {
        super(props);
        const {room} = this.props.location.state;


        this.state = {
            room,
            items: [],

            value: '',
            phone: '',
        };
    }

    componentDidMount() {
        api.getData('/api/WeChat/GetProjectEntity', {
            keyValue: this.state.room.id,

        }).then(res => {
            if (res.success) {
                this.setState({
                    room: res.data,
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
        api.getData('/api/WeChat/GetRoomCellphone', {
            // keyValue: this.state.room.id,

        }, false).then(res => {
            if (res.success) {
                this.setState({
                    phone: res.data,
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
    }


    change = (e) => {
        this.setState({
            value: e.target.value,
        });
    };
    bindHouse = () => {
        const {value, phone} = this.state;
        api.postData('/api/WeChat/BindCustomer', { 
            unitId: this.state.room.id
            // cellphone: (phone || '') + value,
        }).then(res => {
            if (res.success) {
                api.getData('/api/WeChat/GetUserInfo', {
                    openid: loggedUserReducer().openid,
                }, true).then(res => {
                    if (res.success) {
                        this.props.saveLoginInfo2(res.data);
                        this.props.history.replace('/house');
                    } else {
                        UDToat.showError(res.msg);
                    }
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
    };
    submit = () => {

        const {value, phone} = this.state;
        api.postData('/api/WeChat/BindUserApply', {  
            unitId: this.state.room.id, 
            cellphone: (phone || '') + value,
        }).then(res => {
            if (res.success) {
                UDToat.showError('申请成功');
            } else {
                UDToat.showError(res.msg);
            }
        });
    };


    render() {
        const {room, phone, value} = this.state;
        return (
            <div className='Bound'>
                <p className='Bound1'>您选择的房屋是：</p>
                <h3 className='Bound2'>{room.allName}</h3>
                <p className='Bound1'>请补全留在物业的手机号码：</p>
                <div className='input'>
                    <span>{phone}</span>
                    <input onChange={this.change} value={value} maxLength={4} type={'tel'}/>
                </div>
                <div className='Bound_btn'>
                    <Button type="primary" className='primary' onClick={this.bindHouse}>绑定房屋</Button>
                    <Button className='primary' onClick={this.submit}>提交申请</Button>
                </div>
            </div>
        );
    }
}


const kk = (dispatch, ownProps) => {
    return {
        rooms: (info) => {
            dispatch(rooms(info));
        },
        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};

export default connect(null, kk)(Bound);

