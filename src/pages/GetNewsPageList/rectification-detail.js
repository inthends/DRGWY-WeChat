import React from 'react';
import './../user/work/work-detail/work-detail.css';
import UDToat from '../../utils/ud-toast';
import api from '../../utils/api';
import common from '../../utils/common';

class RectificationDetail extends React.Component {
    constructor(props) {
        super(props);
        let urlParams = common.getCurrentUrlParams() || {};//获取url里面的id
        this.state = {
            ...urlParams,
            data: {}
        };
    }

    componentDidMount() {
        const { id } = this.state;
        api.getData('/api/WeChat/GetRectificationEntity', {
            keyvalue: id
        }, true)
            .then(res => {
                if (res.success) {
                    this.setState({
                        data: res.data,
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            });
    }

    go = () => {
        api.postData('/api/WeChat/FinishRectification', {
            keyvalue: this.state.id
        }, true)
            .then(res => {
                if (res.success) {
                    this.props.history.replace({
                        pathname: '/home',
                    })
                } else {
                    UDToat.showError(res.msg);
                }
            });
    };

    render() {

        const { data } = this.state;

        return (
            <div className='work'>
                <div className='work-title'>装修整改</div>
                <div className='work-p'>
                    <p>整改单号: {data.billCode}</p>
                    <p>单据日期: {data.billDate}</p>
                    <p>违规地址: {data.address}</p>
                    <p>违规人: {data.violationName}</p>
                    <p>联系电话: {data.violationPhone}</p>
                    {data.violations}
                </div>
                <div className='btn-repa-cint'>
                    <button className='btn-repa' onClick={this.go}>完成</button>
                </div>
            </div>
        );
    }
}

export default RectificationDetail;
