import React from 'react';
import './newDetail.css';
import UDToat from "../../../../utils/ud-toast";
import api from "../../../../utils/api";
import store from '../../../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin
} from '../../../../store/actions';
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';

class NewDetil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            allparticipants: ''
        };
    }

    componentDidMount() {
        document.title = this.props.location.state.type;
        if (this.props.location.state.type === '活动') {
            this.info('/api/WeChat/GetActivityEntity')
        } else {
            this.info('/api/WeChat/GetNewsEntity')
        }
    }

    info(url) {
        api.getData(url, {
            keyValue: this.props.location.state.id
        }, false).then(res => {
            if (res.success) {

                if (this.props.location.state.type === '活动') {
                    this.setState({
                        data: res.data.data
                    })
                } else {
                    this.setState({
                        data: res.data
                    })
                }
            } else {
                UDToat.showError(res.msg);
            }
        });

        console.log(this.state.data)
    }

    Activity = () => {
        api.postData('/api/WeChat/Activity', {
            keyValue: this.props.location.state.id
        }, false).then(res => {
            if (res.success) {
                UDToat.showError('报名成功！！');
                window.history.go(-1);
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    render() {
        let GetActivityEntity = '';

        let btn = '';

        let date = '';

        if (this.state.allparticipants != this.state.data.participants) {
            btn = <p className='p2new' onClick={this.Activity}>我要报名</p>
        }

        if (this.props.location.state.type === '活动') {
            GetActivityEntity = <div className='newDetail-btn'>
                <p className='p1new'>已报名：{this.state.data.participants}人</p>
                {btn}
            </div>;

            date = <p className='pNew'>截止日期: {this.state.data.deadline}</p>
        }
        return (
            <div className='newDetail'>
                <p className='titleNew'>{this.state.data.title}</p>
                <p className='pNew pNew1x'>{this.state.data.createDate}</p>
                {date}
                <div className='html' dangerouslySetInnerHTML={{__html: this.state.data.description}}>

                </div>
                {GetActivityEntity}

            </div>
        );
    }
}

export default NewDetil;
