import React from 'react';
import './house.css';
import {Button} from 'antd-mobile';
import api from '../../../utils/api';
import UDToat from '../../../utils/ud-toast';

class House extends React.Component {
    constructor(props) {
        super(props);
        const {item} = this.props.location.state;
        this.state = {
            item,
            items: [],
        };
    }

    /*

    DetailBuildingService.getPStructs(id, 4).then(res => {
            const floors = res || [];
            const promises = floors.map(item => {
                return DetailBuildingService.getPStructs(item.id, 5).then(res => {
                    const allRooms = res || [];
                    const rooms = common.convertArrayToSmallArray(allRooms);
                    return {
                        ...item,
                        rooms,
                    };
                });
            });
            Promise.all(promises).then(res => {
                console.log(333, res);
                this.setState({data: res});
            });
        });
        DetailBuildingService.getBuildingDetail(id).then(detail=>{
            this.setState({detail});
        })
     */
    componentDidMount() {
        api.getData('/api/WeChat/GetWeChatPStructs', {
            keyValue: this.state.item.id,
            type: 4,
        }).then(res => {
            if (res.success) {
                const floors = res.data || [];
                const promises = floors.map(item => {
                    return api.getData('/api/WeChat/GetWeChatPStructs', {
                        keyValue: item.id,
                        type: 5,
                    }).then(res => {
                        if (res.success) {
                            const rooms = res.data || [];
                            return {
                                ...item,
                                rooms,
                            };
                        } else {
                            UDToat.showError(res.msg);
                        }
                    });
                });
                Promise.all(promises).then(res => {
                    console.log(333, res);
                    this.setState({items: res});
                });

            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    housePro = (room) => {
        this.props.history.push({
            pathname: '/bound',
            state:{
                room,
            }
        });
    };

    render() {
        const {item, items} = this.state;

        return (
            <div className='House'>
                <div className='Building_cont'>
                    <p>{item.name}</p>
                    {items.map(item => (
                        <div>
                            <div className='list_cont_House'>
                                <span></span>
                                <p className='list_House_text'>{item.name}</p>
                            </div>
                            <div className='btn_cont'>
                                {item.rooms.map(room => (
                                    <Button className='btn' onClick={() => this.housePro(room)}>{room.name}</Button>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default House;

