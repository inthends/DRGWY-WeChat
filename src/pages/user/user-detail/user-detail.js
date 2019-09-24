import React from 'react';
import './user-detail.css';
import {Icon, Grid} from 'antd-mobile';
import UDAlert from "../../../utils/ud-alert";

class UserDetail extends React.Component {
    clear = () => {
        UDAlert.showOneButton('清除缓存成功！', '', '确定', () => {

        });
    };

    about = () => {
        this.props.history.push('/about');
    };

    render() {
        return (
            <div className='UserDetail'>
                <div onClick={this.clear}>
                    <p>清除缓存</p>
                    <Icon type='right' color='#999'/>
                </div>

                <div onClick={this.about}>
                    <p>关于我们</p>
                    <Icon type='right' color='#999'/>
                </div>

                <div>
                    <p>版本：V1.0</p>
                    <Icon type='right' color='#999'/>
                </div>
            </div>

        );
    }
}

export default UserDetail;
