import React from 'react';
import './house.css';
import {Icon, Grid} from 'antd-mobile';
import api from "../../../utils/api";
import UDToat from "../../../utils/ud-toast";
import {
    loggedUserReducer, saveLogin2,
} from '../../../store/actions';
import {List, Radio, Flex, WhiteSpace} from 'antd-mobile';
import {connect} from "react-redux";

const RadioItem = Radio.RadioItem;

class House extends React.Component {
    state = {
        value: 0,
        data: []
    };
    onChange = (value) => {
        this.setState({
            value,
        });
    };

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerRooms', {
            keyword: loggedUserReducer().mobile,
        }, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    value: res.data[0].id
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    go = () => {
        api.getData('/api/WeChat/GetCustomerRooms', {
            unitId: this.state.value,
        }, true).then(res => {
            if (res.success) {
                this.openId();
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    openId = () =>{
        api.getData('/api/WeChat/GetUserInfo', {
            openid: loggedUserReducer().openid,
        }, true).then(res => {
            if (res.success) {
                this.props.saveLoginInfo2(res.data);
                window.history.back(-1)
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    render() {
        const {value} = this.state;
        const data = this.state.data;

        return (
            <div className='house'>
                <List>
                    {data.map(i => (
                        <RadioItem key={i.id} checked={value === i.id} onChange={() => this.onChange(i.id)}>
                            {i.allName}
                        </RadioItem>
                    ))}
                </List>

                <button className='bind-btn' onClick={this.go}>设为默认</button>
            </div>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};
export default connect(null, kk)(House);
