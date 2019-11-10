import React from 'react';
import './getNewsPageList.css';
import UDToat from "../../../utils/ud-toast";
import api from "../../../utils/api";
import store from '../../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin
} from '../../../store/actions';
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';

class GetNewsPageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: false,
            data: [],
            pageIndex: 1
        };
    }

    componentDidMount() {
        api.postData('/api/WeChat/GetNewsPageList', {
            pageIndex: this.state.pageIndex,
            pageSize: 10,
            desc: 'CreateDate',
            type: this.props.location.state.type,
        }, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    getMore = () => {
        this.setState({
            pageIndex: this.state.pageIndex + 1
        });
        api.postData('/api/WeChat/GetNewsPageList', {
            pageIndex: this.state.pageIndex,
            pageSize: 10,
            desc: 'CreateDate'
        }, false).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data.data
                })
            } else {
                UDToat.showError(res.msg);
            }
        });
    };

    news = (id, type) => {
        this.props.history.push({
            pathname: '/newDetail',
            state: {
                id: id,
                type: type
            },
        })
    };

    render() {

        return (
            <div className='news'>
                <InfiniteScroll
                    className="list-contents"
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => this.getMore()}
                    hasMore={this.state.hasMore}
                >
                    {this.state.data.map(i => (
                        <div className='new-listcont' onClick={() => this.news(i.id, i.type)}>
                            <img src={i.mainPic} alt=""/>
                            <div className={`new-listcont-p ${i.IsRead ? "active" : ''}`}>
                                <p>{i.title}</p>
                                <p>{i.createDate}</p>
                            </div>
                        </div>
                    ))}

                </InfiniteScroll>
            </div>
        );
    }
}

export default GetNewsPageList;
