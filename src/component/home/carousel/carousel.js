import React from 'react';
import BasePage from '../../../utils/base-page';
import {Icon, Grid} from 'antd-mobile';
import {Carousel, WingBlank} from 'antd-mobile';
import UDToat from "../../../utils/ud-toast";
import api from "../../../utils/api";

class Carou extends BasePage {
    state = {
        data: [],
        imgHeight: 176,
    };

    componentDidMount() {
        // simulate img loading
        api.postData('/api/WeChat/GetNewsPageList', {
            type: '广告',
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

    render() {
        return (
            <div className='swipe'>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href={val.linkUrl}
                                style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
                            >
                                <img
                                    src={val.mainPic}
                                    alt={val.title}
                                    style={{width: '100%', verticalAlign: 'top'}}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({imgHeight: 'auto'});
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        );
    }
}

export default Carou;
