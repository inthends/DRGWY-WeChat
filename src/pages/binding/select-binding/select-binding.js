import React from 'react';
import {  WhiteSpace, Button, WingBlank } from 'antd-mobile'; 
import {
   saveUserInfo,
} from '../../../store/actions';
import { connect } from 'react-redux';
 

class SelectBinding extends React.Component {  
    render() {
        return (
            <WingBlank>
                <WhiteSpace />
                <WhiteSpace />
                <Button size={'large'} type={'primary'} onClick={() => { this.props.history.push('/homebinding') }}>
                    <span style={{ color: 'white' }}>输入手机号码验证</span>
                </Button>
                <WhiteSpace />
                <WhiteSpace />

                <Button size={'large'} type={'primary'} onClick={() => { this.props.history.push('/project') }}>
                    <span style={{ color: 'white' }}>选择房屋验证</span>
                </Button>
                <WhiteSpace />
                <WhiteSpace />
            </WingBlank>
        );
    }
}

const save = (dispatch, ownProps) => {
    return {
        saveLoginInfo2: (info) => {
            dispatch(saveUserInfo(info));
        },
    };
};
export default connect(null, save)(SelectBinding);
