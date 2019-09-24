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
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2
} from '../../store/actions';
import {connect} from "react-redux";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (loggedUserReducer().rooms === '1') {
            return false;
        }
        api.getData('/api/WeChat/GetCustomerRooms', {
            mobile: loggedUserReducer().mobile,
        }, true).then(res => {
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
    }

    render() {
        const footer = <Footer {...this.props}/>;
        const header = <Header {...this.props}/>;
        const imgList = <ImgList {...this.props}/>;
        const carou = <Carou {...this.props}/>;
        const shequ = <Shequ {...this.props}/>;
        const xiangmu = <Xiangmu {...this.props}/>;
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
