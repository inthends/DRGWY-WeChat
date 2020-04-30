import React from 'react';

import {Icon, Grid, Button, WingBlank} from 'antd-mobile';
import api from '../../../utils/api';
import UDToat from '../../../utils/ud-toast';
import {
    loggedUserReducer, saveLogin2,
} from '../../../store/actions';
import {List, Radio, Flex, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';

const RadioItem = Radio.RadioItem;

class SelectBinding extends React.Component {


    render() {


        return (
            <WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>

                <Button size={'small'} type={'primary'} onClick={()=>{this.props.history.push('/homebinding')}}>
                    <span style={{color:'white'}}>输入手机号码验证</span>
                </Button>
                <WhiteSpace/>
                <WhiteSpace/>

                <Button size={'small'} style={{background:'#bbb'}} onClick={()=>{this.props.history.push('/project')}}>
                    <span style={{color:'white'}}>选择房屋验证</span>
                </Button>
                <WhiteSpace/>
                <WhiteSpace/>
            </WingBlank>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        saveLoginInfo2: (info) => {
            dispatch(saveLogin2(info));
        },
    };
};
export default connect(null, kk)(SelectBinding);
