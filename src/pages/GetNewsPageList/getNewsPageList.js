import React from 'react';
import './getNewsPageList.css';
import UDToat from "../../utils/ud-toast";
import api from "../../utils/api";
import store from '../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin
} from '../../store/actions';
import {connect} from "react-redux";


class GetNewsPageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        api.postData('/api/WeChat/GetNewsPageList', {
            pageIndex: 1,
            pageSize: 10,
            desc: 'CreateDate'
        }, false).then(res => {
            if (res.success) {

            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}

export default GetNewsPageList;
