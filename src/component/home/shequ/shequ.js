import React from 'react';
import BasePage from '../../../utils/base-page'; 
import UDToat from "../../../utils/ud-toast"; 
import api from "../../../utils/api";

class Shequ extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                ggcounts: 0,
                hdcounts: 0,
                tzcounts: 0,
                zxcounts: 0,
            }
        };
    }

    componentDidMount() {
        api.postData('/api/WeChat/GetNewsStatics', {}, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data[0]
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    news = (type) => {
        this.props.history.push({
            pathname: '/getNewsPageList',
            state: {
                type: type
            },
        })
    };

    render() {
        return (
            <div className="shequ">
                <div className="shequ-title">
                    <span></span>
                    <p>社区动态</p>
                </div>
                <div className="list-shequ">
                    <div className="list-shequ-cont" onClick={() => this.news('通知')}>
                        <div className="list-shequ-cont1">
                            <p>通知</p>
                            <p>{this.state.data.tzcounts}条</p>
                        </div>
                        <div className="list-shequ-cont2">
                            <p>紧急事项</p>
                        </div>
                    </div>

                    <div className="list-shequ-cont" onClick={() => this.news('公告')}>
                        <div className="list-shequ-cont1">
                            <p>公告</p>
                            <p>{this.state.data.ggcounts}条</p>
                        </div>
                        <div className="list-shequ-cont2">
                            <p>事项公布</p>
                        </div>
                    </div>

                    <div className="list-shequ-cont" onClick={() => this.news('资讯')}>
                        <div className="list-shequ-cont1">
                            <p>资讯</p>
                            <p>{this.state.data.zxcounts}条</p>
                        </div>
                        <div className="list-shequ-cont2">
                            <p>社区最新动态</p>
                        </div>
                    </div>

                    <div className="list-shequ-cont" onClick={() => this.news('活动')}>
                        <div className="list-shequ-cont1">
                            <p>活动</p>
                            <p>{this.state.data.hdcounts}条</p>
                        </div>
                        <div className="list-shequ-cont2">
                            <p>报名有礼</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shequ;
