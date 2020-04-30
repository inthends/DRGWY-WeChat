import React from 'react';
import './building.css';
import {Button} from 'antd-mobile';
import api from '../../../utils/api';
import UDToat from '../../../utils/ud-toast';

class Building extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        const {item} = this.props.location.state;

        this.state = {
            item,
            items: [],
        };
    }

    componentDidMount() {
        api.getData('/api/WeChat/GetWeChatPStructs', {
            keyValue: this.state.item.id,
            type: 2,
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

    housePro = (item) => {

        this.props.history.push({
            pathname: '/housePro',
            state: {
                item,
            },
        });
    };

    render() {
        const {item, items} = this.state;
        return (
            <div className='Building'>
                <div className='Building_cont'>
                    <p>{item.name}</p>
                    <div className='btn_cont'>
                        {items.map(item => (
                            <Button className='btn123' onClick={() => this.housePro(item)}>{item.name}</Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Building;

