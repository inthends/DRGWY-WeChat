import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import UDToat from "../../../utils/ud-toast";
import api from "../../../utils/api";

class Xiangmu extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        api.postData('/api/WeChat/GetProjectPageList', {
            propertyType: '全部',
            pageIndex: 1,
            pageSize: 2,
        }, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    about2 = () => {
        this.props.history.push('/about2')
    };

    news = (id) => {
        this.props.history.push({
            pathname: '/newDetail2',
            state: {
                id: id,
            },
        })
    };

    render() {
        return (
            <div className="shequ">
                <div className="shequ-title shequ-title-c11">
                    <div className="shequ-title-1">
                        <span></span>
                        <p>项目风采</p>
                    </div>
                    <p className="gengduo" onClick={this.about2}>更多...</p>
                </div>
                <div className="list-xiangmu">
                    {this.state.data.map(i => (
                        <div className="list-xiangmu-cont" onClick={() => this.news(i.id)}>
                            <div className="list-xiangmu-cont1">
                                <img src={i.mainPic} alt=""/>
                            </div>
                            <div className="list-xiangmu-cont2">
                                <p>
                                    {i.name}
                                </p>
                                <p style={{ marginBottom: '0.1rem'}}>
                                    {i.memo}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
}

export default Xiangmu;
