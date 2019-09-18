import React from 'react';
import './pay.css';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";

class Login extends React.Component {
    state = {
        data: []
    };

    componentDidMount() {
        api.postData('/api/WeChat/GetBillList', {
        }, true).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    render() {
        const data = this.state.data;
        console.log(data)
        return (
            <div className='img-list1'>
                {data.map(i => (
                    <div className="cont-list">
                        <div className="cont-list-cont" onClick="detail()">
                            <div className="cont-list-cont-felx">
                                <p>{i.belongDate}</p>
                                <p><span>合计：</span>{i.allAmount}</p>
                            </div>
                            {i.detail.map(i2=> (
                                <div className="cont-list-cont-felx">
                                    <p>{i2.feeName}</p>
                                    <p>{i2.feeAmount}</p>
                                </div>
                            ))}


                            <div className="cont-list-cont-felx">
                                <p>{i.sendTime} 送达</p>
                                <p>立即缴费</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="btn1">
                    <button>全部交清</button>
                </div>
            </div>
        );
    }
}

export default Login;
