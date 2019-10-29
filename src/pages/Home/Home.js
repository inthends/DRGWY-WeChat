import React from 'react';
import './Home.css';
import Footer from '../../component/footer/footer';
import Header from '../../component/home/header/header';
import ImgList from '../../component/home/img-list/imgList';
import Carou from '../../component/home/carousel/carousel';
import Shequ from '../../component/home/shequ/shequ';
import Xiangmu from '../../component/home/xiangmu/xiangmu';
import UDToat from "../../utils/ud-toast";
import api from "../../utils/api";
import store from '../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin
} from '../../store/actions';
import {connect} from "react-redux";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        api.getData('/api/WeChat/GetCustomerRooms', {
            mobile: loggedUserReducer().mobile,
        }, false).then(res => {
            if (res.success) {
                if (res.data.length > 0) {
                    this.props.rooms('1')
                } else {
                    this.props.rooms('0')
                }
            } else {
                UDToat.showError(res.msg);
            }
        });

        api.getData('/api/WeChat/GetUserInfo', {
            openid: loggedUserReducer().openid,
        }, true).then(res => {
            if (res.data == 'false') {
                store.dispatch(loseLogin());
            }
        });
    }

    render() {
        const footer = <Footer {...this.props}/>;
        const header = <Header {...this.props}/>;
        const imgList = <ImgList {...this.props}/>;
        const carou = <Carou {...this.props}/>;

        let shequ;
        let xiangmu;

        if (loggedUserReducer().rooms === '1') {
            shequ = <Shequ {...this.props}/>;
            xiangmu = <Xiangmu {...this.props}/>;
        } else {
            shequ = '';
            xiangmu = '';
        }
        return (
            <div>
                <div className="home">
                    {header}
                    {imgList}
                    {carou}
                    {shequ}
                    {xiangmu}
                    {footer}
                </div>
            </div>
        );
    }
}

const kk = (dispatch, ownProps) => {
    return {
        rooms: (info) => {
            dispatch(rooms(info));
        },
    };
};

export default connect(null, kk)(Home);
