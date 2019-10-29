import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import UDToat from "../../../utils/ud-toast";
import {loggedUserReducer} from "../../../store/actions";
import api from "../../../utils/api";

class Shequ extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        api.postData('/api/WeChat/GetNewsStatics', {}, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    news = () => {
        this.props.history.push('/getNewsPageList')
    };

    render() {
        return (
            <div className="shequ">
                <div className="shequ-title">
                    <span></span>
                    <p>社区动态</p>
                </div>
                <div className="list-shequ">
                    {this.state.data.map(i => (
                        <div className="list-shequ-cont" onClick={this.news}>
                            <div className="list-shequ-cont1">
                                <p>{i.type}</p>
                                <p>{i.counts}条</p>
                            </div>
                            <div className="list-shequ-cont2">
                                <p>{i.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Shequ;
