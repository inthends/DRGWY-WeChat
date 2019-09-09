import React from 'react';
import './pay.css';

class Login extends React.Component {
    render() {
        return (
            <div className='img-list1'>
                <div className="cont-list">
                    <div className="cont-list-cont" onClick="detail()">
                        <div className="cont-list-cont-felx">
                            <p>2019年08月</p>
                            <p><span>合计：</span>5000.00</p>
                        </div>
                        <div className="cont-list-cont-felx">
                            <p>物业费</p>
                            <p>3000.00</p>
                        </div>
                        <div className="cont-list-cont-felx">
                            <p>车位服务费</p>
                            <p>3000.00</p>
                        </div>
                        <div className="cont-list-cont-felx">
                            <p>2019-07-30 08:30 送达</p>
                            <p>立即缴费</p>
                        </div>
                    </div>
                </div>

                <div className="btn1">
                    <button>全部交清</button>
                </div>
            </div>
        );
    }
}

export default Login;
