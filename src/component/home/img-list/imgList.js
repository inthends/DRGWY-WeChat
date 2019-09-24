import React from 'react';
import BasePage from '../../../utils/base-page';
import {
    loggedUserReducer,
} from '../../../store/actions';

class ImgList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {};
    }

    pay = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/pay')
        } else {
            this.props.history.push('/binding')
        }
    };

    repairs = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/repairs')
        } else {
            this.props.history.push('/binding')
        }
    };


    steward = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/steward')
        } else {
            this.props.history.push('/binding')
        }
    };

    stall = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/stall')
        } else {
            this.props.history.push('/binding')
        }
    };

    about = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/about')
        } else {
            this.props.history.push('/binding')
        }
    };

    render() {
        return (
            <div className="img-list">
                <div className="img-list-flex" onClick={this.pay}>
                    <img src={require('../../../static/images/home/jiaofei.png')} alt=""/>
                    <p>查询缴费</p>
                </div>

                <div className="img-list-flex" onClick={this.repairs}>
                    <img src={require('../../../static/images/home/xiu.png')} alt=""/>
                    <p>报事报修</p>
                </div>

                <div className="img-list-flex" onClick={this.steward}>
                    <img src={require('../../../static/images/home/guanjia.png')} alt=""/>
                    <p>在线管家</p>
                </div>

                <div className="img-list-flex" onClick={this.stall}>
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>车位续租</p>
                </div>

                <div className="img-list-flex" onClick={this.about}>
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>关于我们</p>
                </div>
            </div>
        );
    }
}

export default ImgList;
