import React from 'react';
import './user.css';
import Footer from '../../component/footer/footer';
import { Icon, Grid } from 'antd-mobile';
import Carou from '../../component/home/carousel/carousel';

class User extends React.Component {
    house = ()=>{
        this.props.history.push('/house')
    };
    render() {
        const footer = <Footer {...this.props}/>;
        const carou = <Carou {...this.props}/>;
        return (
            <div>
                <div className="user">
                    <div className="header1">
                        <div className="header-left">
                            <img src={require('../../static/images/home/1.jpg')} alt=""/>
                            <div className="header-left-cont">
                                <p className="header-left-cont-p">1123213131312</p>
                                <div className="header-left-cont-p-cont">
                                    <img src={require('../../static/images/user/zuanshi.png')} alt=""/>
                                    <p>0.11</p>
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
                            <div className="img-list-flex">
                                <p>积分</p>
                                <p>10</p>
                            </div>

                            <div className="img-list-flex">
                                <p>工单</p>
                                <p>12312</p>
                            </div>

                            <div className="img-list-flex">
                                <p>账单</p>
                                <p>1</p>
                            </div>

                            <div className="img-list-flex">
                                <p>发票</p>
                                <p>131231</p>
                            </div>
                        </div>
                    </div>

                    <div className="shequ">
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
                    </div>
                </div>
                {footer}
            </div>

        );
    }
}

export default User;
