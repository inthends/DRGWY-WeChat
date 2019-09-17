import React from 'react';
import './house.css';
import {Icon, Grid} from 'antd-mobile';
import api from "../../../utils/api";
import UDToat from "../../../utils/ud-toast";
import {
    loggedUserReducer,
} from '../../../store/actions';
import {List, Radio, Flex, WhiteSpace} from 'antd-mobile';

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
                    data: res.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    go = () => {
        window.history.back(-1)
    };

    render() {
        const {value} = this.state;
        const data = this.state.data;

        return (
            <div className='house'>
                <List>
                    {data.map(i => (
                        <RadioItem key={i.telPhoneNum} checked={value === i.telPhoneNum} onChange={() => this.onChange(i.telPhoneNum)}>
                            {i.telPhoneNum}
                        </RadioItem>
                    ))}
                </List>

                <button className='bind-btn' onClick={this.go}>设为默认</button>
            </div>
        );
    }
}

export default House;
