import React from 'react';
import './personnel.css';
import api from "../../../utils/api";
import UDToat from "../../../utils/ud-toast";
import {
    loggedUserReducer,
    //getImgurl, getOpenid, saveLogin,
    saveUserInfo
} from '../../../store/actions';
import { List, Radio } from 'antd-mobile';
import { connect } from "react-redux";

const RadioItem = Radio.RadioItem;

class Personnel extends React.Component {
    state = {
        value: '',
        data: []
    };
    onChange = (value) => {
        this.setState({
            value,
        });
        // console.log(value)
    };

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerList', {
            keyword: this.props.location.state.mobile,
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
        api.postData('/api/WeChat/BindCustomer', {
            customerId: this.state.value,
        }, true).then(res => {
            if (res.success) {
                this.openId();
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    openId = () => {
        api.getData('/api/WeChat/GetUserInfo', {
            openid: loggedUserReducer().openid,
        }, true).then(res => {
            if (res.success) {
                this.props.saveLoginInfo2(res.data);
                this.props.history.replace('/house')
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    render() {
        const { value } = this.state;
        const data = this.state.data;

        return (
            <div className='house'>
                <List>
                    {data.map(i => (
                        <RadioItem key={i.id} checked={value === i.id} onChange={() => this.onChange(i.id)}>
                            {i.name}
                        </RadioItem>
                    ))}
                </List>
                <button className='bind-btn' onClick={this.go}>绑定</button>
            </div>
        );
    }
}


const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo2: (info) => {
            dispatch(saveUserInfo(info));
        },
    };
};
export default connect(null, kk)(Personnel);
