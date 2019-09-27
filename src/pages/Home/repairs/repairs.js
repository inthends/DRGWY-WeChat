import React from 'react';
import './repairs.css';
import {ImagePicker, WingBlank, SegmentedControl, List, Checkbox, Flex, TextareaItem, Radio} from 'antd-mobile';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";
import {getToken, saveLogin2, loseLogin} from '../../../store/actions';
import axios from 'axios';
import {Picker, WhiteSpace} from 'antd-mobile';
import {Icon, Grid} from 'antd-mobile';

const data = [];
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const RadioItem = Radio.RadioItem;
const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

class Repairs extends React.Component {
    state = {
        files: data,
        multiple: false,
        guid: null,
        district: [],
        label: '请选择',
        value: '',
        value1: '报修',
        textarea: ''
    };

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerRooms', {
            mobile: loggedUserReducer().mobile,
        }, true).then(res => {
            if (res.success) {
                let label = '';
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

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
        console.log(files[files.length - 1]);
        if(type === 'add'){
            let fd = new FormData();
            fd.append('keyValue', this.state.guid);
            fd.append('file', files[files.length - 1].file);
            axios.defaults.headers['Content-Type'] = 'multipart/form-data';
            axios.defaults.headers['Authorization'] = 'Bearer ' + getToken();
            axios.post('http://hf.jslesoft.com:8018/api/WeChat/UploadServiceDesk', fd).then(res => {
                if (res.success) {
                }
            });
        }
    };

    onChange2 = (value) => {
        console.log('checkbox');
        this.setState({
            value1: value,
        });
    };

    onChange3 = (val) => {
        console.log(val);
        this.setState({
            textarea: val,
        });
    };
    ok = (val) => {
        this.state.district.forEach((item, index) => {
            if (item.value === val[0]) {
                this.setState({
                    label: item.label,
                    value: val[0]
                })
            }
        });
    };

    go = () => {
        if (!this.state.value) {
            UDToat.showError('请选择！');
            return false;
        }
        if (!this.state.textarea) {
            UDToat.showError('请输入留言！');
            return false;
        }
        api.postData('/api/WeChat/SaveServiceDeskForm', {
            keyValue: this.state.guid,
            RoomId: this.state.value,
            Content: this.state.textarea,
            BillType: this.state.value1,
        }, true).then(res => {
            if (res.success) {
                this.props.history.push('/home');
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    render() {
        const {value1 } = this.state;
        const {files} = this.state;
        const data = [
            { value: '报修', label: '报修' },
            { value: '投诉', label: '投诉' },
            { value: '咨询', label: '咨询' },
            { value: '建议', label: '建议' },
        ];

        return (
            <div className='repairs'>
                <Picker data={this.state.district} cols={1} onOk={this.ok}>
                    <div className='title'>
                        {this.state.label}
                        <Icon type='right'/>
                    </div>
                </Picker>
                <List className='list'>
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value1 === i.value} onChange={() => this.onChange2(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <div className='TextareaItem'>
                    <TextareaItem
                        placeholder='请输入'
                        rows={5}
                        count={100}
                        onChange={this.onChange3}
                    />
                </div>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 4}
                        multiple={this.state.multiple}
                    />
                </WingBlank>

                <div className='btn-repa-cint'>
                    <button className='btn-repa' onClick={this.go}>提交</button>
                </div>
            </div>
        );
    }
}

export default Repairs;
