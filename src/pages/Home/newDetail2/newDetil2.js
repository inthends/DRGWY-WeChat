import React from 'react';
import './newDetail2.css';
import UDToat from "../../../utils/ud-toast";
import api from "../../../utils/api";
import store from '../../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveUserInfo, loseLogin
} from '../../../store/actions';
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';

class NewDetil2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        this.info('/api/WeChat/GetProjectEntity')
    }

    info(url) {
        api.getData(url, {
            keyValue: this.props.location.state.id
        }, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });

        console.log(this.state.data)
    }

    render() {


        return (
            <div className='newDetail'>
                <p className='titleNew titleNew2'>{this.state.data.name}</p>
                <div className='html' dangerouslySetInnerHTML={{__html: this.state.data.description}}>

                </div>
            </div>
        );
    }
}

export default NewDetil2;
