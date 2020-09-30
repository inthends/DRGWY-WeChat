import React from 'react';
import { TextareaItem } from 'antd-mobile';
import './work-detail.css';
import api from "../../../../utils/api";
import UDToat from "../../../../utils/ud-toast"; 
import StarRatingComponent from 'react-star-rating-component';

class WorkDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            Content: '',
            Content1: '',
            rating: 3,
            GetCommunicates: []
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

        api.getData('/api/WeChat/GetCommunicates', {
            keyValue: this.props.location.state.id
        }, false)
            .then(res => {
                if (res.success) {
                    this.setState({
                        GetCommunicates: res.data,
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            });
    }

    onChange3 = (val) => {
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
        //console.log(this.state.Content)
        if (this.props.location.state.start == 2) {
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
        this.setState({ rating: nextValue });
        console.log(nextValue)
    }

    render() {
        const { Content1, rating, GetCommunicates } = this.state;
        let status3 = '';
        let status4 = '';
        let status2 = '';
        let data1 = '';
        let data2 = '';
        let textStatus = '';
        if (this.props.location.state.start == 2) {
            textStatus = '未完成'
        } else if (this.props.location.state.start == 3) {
            textStatus = '未评价'
        } else if (this.props.location.state.start == 4) {
            textStatus = '已评价'
        }
        let ping = '';
        if (rating == 1) {
            ping = '非常不满意';
        } else if (rating == 2) {
            ping = '不满意';
        } else if (rating == 3) {
            ping = '一般';
        } else if (rating == 4) {
            ping = '满意';
        } else if (rating == 5) {
            ping = '非常满意';
        }
        if (this.props.location.state.start == 3) {
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
                    <input type="text" value={Content1} onChange={this.changeValue} placeholder="请输入" />
                </p>
            </div>
        }
        if (this.props.location.state.start == 2) {
            status4 = <div className='TextareaItem2'>
                <TextareaItem
                    placeholder='请输入'
                    rows={3}
                    count={100}
                    onChange={this.onChange3}
                />
            </div>
        }

        if (this.props.location.state.start == 2 || this.props.location.state.start == 3) {
            status2 = <div className='btn-repa-cint'>
                <button className='btn-repa' onClick={this.go}>提交</button>
            </div>
        }

        if (this.props.location.state.start == 3) {
            data1 = <p>完成时间: {this.state.data.finishDate}</p>
        }
        let gradeText = '';
        if (this.state.data.grade == 1) {
            gradeText = '非常不满意';
        } else if (this.state.data.grade == 2) {
            gradeText = '不满意';
        } else if (this.state.data.grade == 3) {
            gradeText = '一般';
        } else if (this.state.data.grade == 4) {
            gradeText = '满意';
        } else if (this.state.data.grade == 5) {
            gradeText = '非常满意';
        }
        if (this.props.location.state.start == 4) {
            data2 = <p className='gradeText'>
                <span>评价时间: {this.state.data.appraiseDate}</span>
                <span>{gradeText}</span>
            </p>
        }

        return (
            <div className='work'>
                <div className='work-title'>{textStatus}</div>
                <div className='work-p'>
                    <p>单号: {this.state.data.billCode}</p>
                    <p>报修地址: {this.state.data.address}</p>
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
                <div className='work-title1'>
                    <div className='work-jilu-title'>
                        <p>沟通记录</p>
                    </div>
                    {GetCommunicates.map(i => (
                        <div className='work-jilu'>
                            <img src={i.avatar} alt="" />
                            <div className='work-right'>
                                <div className='work-right-1'>
                                    <p>{i.author}</p>
                                    <p>{i.datetime}</p>
                                </div>
                                <div className='work-right-2'>
                                    <p>{i.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default WorkDetail;
