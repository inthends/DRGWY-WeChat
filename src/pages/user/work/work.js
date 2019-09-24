import React from 'react';
import './work.css';
import {SegmentedControl, WingBlank} from 'antd-mobile';
import {Button, WhiteSpace} from 'antd-mobile';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";
import InfiniteScroll from 'react-infinite-scroller';

class Work extends React.Component {
    state = {
        param: {
            pageIndex: 1,
            pageSize: 10,
            status: 2,
            customerId: loggedUserReducer().customerId,
        },
        data: '',
        selectedIndex: 0,
        hasMore: false
    };

    componentDidMount() {
        this.info(this.state.param.status);
    }

    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            selectedIndex: e.nativeEvent.selectedSegmentIndex,
            data: ''
        })
    };

    info = (index) => {
        this.setState({
            param: {
                pageIndex: 1,
                pageSize: 10,
                status: index,
                customerId: loggedUserReducer().customerId,
            }
        }, () => {
            api.postData('/api/WeChat/GetServiceDeskPageList', this.state.param, true)
                .then(res => {
                    if (res.success) {
                        this.setState({
                            data: res.data.data,
                        });

                        if (res.data.data.length === 0) {
                            this.setState({
                                hasMore: false,
                            });
                        }
                    } else {
                        UDToat.showError(res.msg);
                    }
                });
        });
    };

    onValueChange = (value) => {
        if (value === '未完成') {
            this.info(2)
        } else if (value === '未评价') {
            this.info(3)
        } else if (value === '已评价') {
            this.info(4)
        }
    };

    getMore = () => {
        this.setState({
            param: {
                pageIndex: this.state.param.pageIndex + 1,
                pageSize: 10,
                status: this.state.param.status,
                customerId: loggedUserReducer().customerId,
            }
        }, () => {
            api.postData('/api/WeChat/GetServiceDeskPageList', this.state.param, true)
                .then(res => {
                    if (res.success) {
                        this.setState({
                            data: this.state.data.concat(res.data.data),
                        });

                        if (res.data.data.length === 0) {
                            this.setState({
                                hasMore: false,
                            });
                        }
                    } else {
                        UDToat.showError(res.msg);
                    }
                });
        });
    };
    work1 = (i) => {
        this.props.history.push({
            pathname: '/workDetail',
            state: {
                start: this.state.param.status,
                mobile: i.billCode,
                id: i.id,
            },
        })
    };

    render() {
        let view = '';
        if (this.state.data === '') {
            view = '';
        } else if (this.state.data.length > 0) {
            view = <InfiniteScroll
                className="list-contents"
                initialLoad={false}
                pageStart={0}
                loadMore={() => this.getMore()}
                hasMore={this.state.hasMore}
            >
                <div className='work-cont'>
                    {this.state.data.map(i => (
                        <div className='work-cont-list' onClick={() => this.work1(i)}>
                            <div className='work-cont-list-1'>
                                <p>{i.billCode}</p>
                                <button>{i.billType}</button>
                            </div>
                            <div className='work-cont-list-2'>
                                <p>{i.contents}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        } else {
            view = <div className='kong'>
                <img src={require('../../../static/images/kong.png')} alt=""/>
                <p>暂无数据！</p>
            </div>
        }
        return (
            <div className='work'>
                <div className='work-work'>
                    <SegmentedControl
                        values={['未完成', '未评价', '已评价']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={this.onChange}
                        onValueChange={this.onValueChange}
                    />
                </div>
                {view}
            </div>
        );
    }
}

export default Work;

