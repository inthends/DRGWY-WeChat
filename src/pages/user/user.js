import React from 'react';
import './user.css';
import Footer from '../../component/footer/footer';
import {Icon, Grid} from 'antd-mobile';
import Carou from '../../component/home/carousel/carousel';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin
} from '../../store/actions';
import api from "../../utils/api";
import UDToat from "../../utils/ud-toast";
import store from "../../store/store";
import {connect} from "react-redux";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workSheet: '',
            billNumber: '',
            invoiceNumber: '',
        };
    }

    house = () => {
        this.props.history.push('/house')
    };

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerRooms', {
            mobile: loggedUserReducer().mobile,
        }, false).then(res => {
            if (res.success) {
                if (res.data.length > 0) {
                    this.props.rooms('1')
                } else {
                    this.props.rooms('0')
                }
            } else {
                UDToat.showError(res.msg);
            }
        });
        api.getData('/api/WeChat/GetUserInfo', {
            openid: loggedUserReducer().openid,
        }, true).then(res => {
            if (res.data == 'false') {
                store.dispatch(loseLogin());
            }else {
                this.setState({
                    billNumber: res.data.billNumber,
                    invoiceNumber: res.data.invoiceNumber,
                    workSheet: res.data.workSheet
                })
            }
        });
    }

    work = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/work');
        } else {
            this.props.history.push('/binding')
        }
    };

    bill = () => {
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            this.props.history.push('/pay');
        } else {
            this.props.history.push('/binding')
        }
    };

    userDetail = () => {
        this.props.history.push('/userDetail');
    };

    render() {
        let fang = '';
        // 判断是否绑定房屋信息
        if (loggedUserReducer().rooms === '1') {
            fang = <div className="shequ">
                <div className="shequ-title shequ-title-c11">
                    <div className="shequ-title-1">
                        <span></span>
                        <p>我的房产</p>
                    </div>
                </div>

                <div className="img-list" onClick={this.house}>
                    <div className="img-list-flex img-list-flex1">
                        <p>设置默认房产</p>
                    </div>
                </div>
            </div>;
        } else {
            fang = '';
        }

        const footer = <Footer {...this.props}/>;
        const carou = <Carou {...this.props}/>;
        return (
            <div>
                <div className="user">
                    <div className="header1" onClick={this.userDetail}>
                        <div className="header-left">
                            <img src={loggedUserReducer().imgurl} alt=""/>
                            <div className="header-left-cont">
                                <p className="header-left-cont-p">{loggedUserReducer().mobile}</p>
                                <div className="header-left-cont-p-cont">
                                    <img src={require('../../static/images/user/zuanshi.png')} alt=""/>
                                    <p>{loggedUserReducer().scores}</p>
                                </div>
                            </div>
                        </div>
                        <Icon type='right' color='#666'/>
                    </div>
                    <div className="swipe">
                        {carou}
                    </div>

                    <div className="shequ">
                        <div className="shequ-title shequ-title-c11">
                            <div className="shequ-title-1">
                                <span></span>
                                <p>我的权益</p>
                            </div>
                        </div>

                        <div className="img-list">
                            {/*<div className="img-list-flex">*/}
                            {/*<p>积分</p>*/}
                            {/*<p>10</p>*/}
                            {/*</div>*/}

                            <div className="img-list-flex" onClick={this.work}>
                                <p>工单</p>
                                <p>{this.state.workSheet}</p>
                            </div>

                            <div className="img-list-flex" onClick={this.bill}>
                                <p>账单</p>
                                <p>{this.state.billNumber}</p>
                            </div>

                            {/*<div className="img-list-flex">*/}
                            {/*<p>发票</p>*/}
                            {/*<p>131231</p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {fang}

                </div>
                {footer}
            </div>

        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        rooms: (info) => {
            dispatch(rooms(info));
        },
    };
};

export default connect(null, kk)(User);
