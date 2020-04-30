import React from 'react';
import './project.css';
import api from '../../../utils/api';
import UDToat from '../../../utils/ud-toast';

class Project extends React.Component {
    state = {
        items: [],
    };

    componentDidMount() {
        api.getData('/api/WeChat/GetWeChatPStructs', {
            keyValue: 0,
            type: 1,
        }).then(res => {
            if (res.success) {
                this.setState({
                    items: res.data,
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    building = (item) => {
        this.props.history.push({
            pathname: '/building',
            state: {
                item,
            },
        });
    };

    render() {
        const {items} = this.state;
        return (
            <div className='Project'>
                {items.map(item => (
                    <div className='Project_list' onClick={() => this.building(item)}>
                        <img src={item.mainPic} alt=""/>
                        <div className='Project_list_text'>
                            <p>{item.name}</p>
                            <p>{item.address}</p>
                        </div>
                    </div>
                ))}

            </div>
        );
    }
}

export default Project;

