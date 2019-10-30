import React from 'react';
import './about2.css';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";
import {SegmentedControl, WingBlank} from 'antd-mobile';

class About2 extends React.Component {
    state = {
        data: [],
        selectedIndex: 0
    };

    componentDidMount() {
        api.postData('/api/WeChat/GetProjectPageList', {
            propertyType: '全部',
            pageIndex: 1,
            pageSize: 100,
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

    info(value) {
        api.postData('/api/WeChat/GetProjectPageList', {
            propertyType: value,
            pageIndex: 1,
            pageSize: 100,
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

    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            selectedIndex: e.nativeEvent.selectedSegmentIndex,
            data: []
        })
    };

    onValueChange = (value) => {
        this.info(value)
    };

    news = (id) => {
        this.props.history.push({
            pathname: '/newDetail2',
            state: {
                id: id,
            },
        })
    };

    render() {
        return (
            <div className='about about2'>
                <div className='work-work'>
                    <SegmentedControl
                        values={['全部', '住宅', '商业', '写字楼', '其他']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={this.onChange}
                        onValueChange={this.onValueChange}
                    />
                </div>
                {this.state.data.map(i => (
                    <div className='about-list' onClick={() => this.news(i.id)}>
                        <img src={i.mainPic} alt=""/>
                        <div>
                            <h3>{i.name}</h3>
                            <p dangerouslySetInnerHTML={{__html: i.memo}}>{}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default About2;
