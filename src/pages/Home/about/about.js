import React from 'react';
import './about.css';
import api from "../../../utils/api";
import {loggedUserReducer} from "../../../store/actions";
import UDToat from "../../../utils/ud-toast";

class About extends React.Component {
    state = {
        data: []
    };
    componentDidMount() {
        api.postData('/api/WeChat/GetNewsPageList', {
            type:'关于我们',
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
            <div className='about'>
                {this.state.data.map(i => (
                    <div className='about-list' onClick={()=>this.news(i.id, i.type)}>
                        <img src={i.mainpic} alt=""/>
                        <div>
                            <h3>{i.title}</h3>
                            <p>{i.memo}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default About;
