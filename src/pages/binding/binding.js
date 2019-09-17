import React from 'react';
import './binding.css';
import {Icon, Grid} from 'antd-mobile';
import UDToat from "../../utils/ud-toast";

class Binding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: null,
        };
    }

    personnel = () => {
        if (!this.state.mobile) {
            UDToat.showError('请输入手机号！');
            return false;
        }
        this.props.history.replace({
            pathname: '/personnel',
            state: {
                mobile: this.state.mobile,
            },
        })
    };
    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    render() {
        const {mobile} = this.state;
        return (
            <div>
                <div className='bind'>
                    <input type="tel" value={mobile} name='mobile' placeholder="输入预留手机号码验证"
                           onChange={this.changeValue}
                           maxLength="11"/>
                    <div>
                        <button className='bind-btn' onClick={this.personnel.bind(this)}>确定</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Binding;
