import React from 'react';
import './stall.css';
import {TextareaItem} from 'antd-mobile';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { DatePicker } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Stall extends React.Component {
    state = {
        data: [],
        cols: 1,
        asyncValue: [],
        date: now,
    };
    onChange3 = (val) => {
        console.log(val);
    };

    onChange4 = (val) => {
        console.log(new Date(val));
        var d = new Date(val);
        var  resDate = d.getFullYear() +
            '-' + (d.getMonth() + 1) +
            '-' + d.getDate()
        console.log(resDate)
    };

    onPickerChange = (val) => {

    };

    render() {
        return (
            <div className='stall'>
                <Picker
                    data={this.state.data}
                    cols={this.state.cols}
                    value={this.state.asyncValue}
                    onPickerChange={this.onPickerChange}
                    onOk={v => console.log(v)}
                >
                    <List.Item arrow="horizontal" onClick={this.onClick}>
                        选择车牌号
                    </List.Item>
                </Picker>

                <div className='p-stall'>
                    <p>到期日：2018-10-31</p>
                    <p className='date-p'>
                        <span>续租至</span>
                        <DatePicker
                            mode="date"
                            extra="Optional"
                            value={this.state.date}
                            onChange={this.onChange4}
                        >
                            <div className='input-stall'>请选择</div>
                        </DatePicker>
                        <span>共 3 个月</span>
                    </p>
                    <p>单价：12321 元</p>
                    <p>金额：131 元</p>
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

export default Stall;
