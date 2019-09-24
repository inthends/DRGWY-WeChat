import React from 'react';
import {ImagePicker, WingBlank, SegmentedControl, List, Checkbox, Flex, TextareaItem, Radio} from 'antd-mobile';
import './work-detail.css';
import api from "../../../../utils/api";
import UDToat from "../../../../utils/ud-toast";
import {loggedUserReducer} from "../../../../store/actions";
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

class WorkDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            Content: '',
            Content1: '',
            rating: 3
        };
    }


    componentDidMount() {
        api.getData('/api/WeChat/GetServicedeskEntity', {
            keyValue: this.props.location.state.id
        }, true)
            .then(res => {
                if (res.success) {
                    this.setState({
                        data: res.data.data,
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            });
    }

    onChange3 = (val) => {
        console.log(val)
        this.setState({
            Content: val
        })
    };

    changeValue = (e) => {
        this.setState({
            Content1: e.target.value,
        });
    };

    go = () => {
        console.log(this.state.Content)
        if (this.props.location.state.start === 2) {
            this.SendCommunicate();
        } else {
            this.ServiceDeskAppraise();
        }
    };

    SendCommunicate = () => {
        if (!this.state.Content) {
            UDToat.showError('请输入！');
            return false;
        }
        api.postData('/api/WeChat/SendCommunicate', {
            keyValue: this.props.location.state.id,
            Content: this.state.Content
        }, true)
            .then(res => {
                if (res.success) {
                    this.props.history.replace({
                        pathname: '/work',
                    })
                } else {
                    UDToat.showError(res.msg);
                }
            });
    };

    ServiceDeskAppraise = () => {
        if (!this.state.Content1) {
            UDToat.showError('请输入评价！');
            return false;
        }
        api.postData('/api/WeChat/ServiceDeskAppraise', {
            keyValue: this.props.location.state.id,
            Grade: this.state.rating,
            Content: this.state.Content1
        }, true)
            .then(res => {
                if (res.success) {
                    this.props.history.replace({
                        pathname: '/work',
                    })
                } else {
                    UDToat.showError(res.msg);
                }
            });
    };

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        console.log(nextValue)
    }

    render() {
        const {Content1, rating} = this.state;
        let status3 = '';
        let status4 = '';
        let status2 = '';
        let data1 = '';
        let data2 = '';
        let textStatus = '';
        if (this.props.location.state.start === 2) {
            textStatus = '未完成'
        } else if (this.props.location.state.start === 3) {
            textStatus = '未评价'
        } else if (this.props.location.state.start === 4) {
            textStatus = '已评价'
        }
        let ping = '';
        if (rating === 1) {
            ping = '非常不满意';
        } else if (rating === 2) {
            ping = '不满意';
        } else if (rating === 3) {
            ping = '一般';
        } else if (rating === 4) {
            ping = '满意';
        } else if (rating === 5) {
            ping = '非常满意';
        }
        console.log(rating)
        if (this.props.location.state.start === 3) {
            status3 = <div className='pingjia'>
                <p>评价本次服务</p>
                <p>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={rating}
                        emptyStarColor={'#999'}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                    <span className='ping'>{ping}</span>
                </p>
                <p>
                    <span>评语：</span>
                    <input type="text" value={Content1} onChange={this.changeValue} placeholder="请输入"/>
                </p>
            </div>
        }
        if (this.props.location.state.start === 2) {
            status4 = <div className='TextareaItem2'>
                <TextareaItem
                    placeholder='请输入'
                    rows={3}
                    count={100}
                    onChange={this.onChange3}
                />
            </div>
        }

        if (this.props.location.state.start === 2 || this.props.location.state.start === 3) {
            status2 = <div className='btn-repa-cint'>
                <button className='btn-repa' onClick={this.go}>提交</button>
            </div>
        }

        if (this.props.location.state.start === 3) {
            data1 = <p>完成时间: {this.state.data.finishDate}</p>
        }
        if (this.props.location.state.start === 4) {
            data2 = <p>评价时间: {this.state.data.appraiseDate}</p>
        }

        return (
            <div className='work'>
                <div className='work-title'>{textStatus}</div>
                <div className='work-p'>
                    <p>单号: {this.state.data.billCode}</p>
                    <p>报单时间: {this.state.data.billDate}</p>
                    <p>派单时间: {this.state.data.dispatchDate}</p>
                    {data1}
                    {data2}
                </div>
                <div className='TextareaItem2'>
                    <TextareaItem
                        placeholder='请输入'
                        rows={3}
                        count={100}
                        disabled
                        value={this.state.data.contents}
                    />
                </div>
                {status3}
                {status4}
                {status2}
            </div>
        );
    }
}

export default WorkDetail;
