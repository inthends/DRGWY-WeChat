import React, {Fragment} from 'react';
import './getNewsPageList.css';
import UDToat from '../../utils/ud-toast';
import api from '../../utils/api';
import store from '../../store/store';
import {
    loggedUserReducer,
    rooms, saveLogin, saveLogin2, loseLogin,
} from '../../store/actions';
import {connect} from 'react-redux';
import {ImagePicker, Text, WingBlank, Flex, TextareaItem} from 'antd-mobile';
import WhiteSpace from 'antd-mobile/es/white-space';
import common from '../../utils/common';
import StarRatingComponent from 'react-star-rating-component';


class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(112, this.props);
        let urlParams = common.getCurrentUrlParams() || {};
        console.log('urlParams', urlParams);
        this.state = {
            contents: '',
            ...urlParams,
            data: {},
            files: [],
            communicates: [],
            rating: 3,
            ratingText: '一般',
            repairfiles: [],
        };

    }

    detail(id) {
        api.getData('/api/WeChat/GetServiceDeskDetail', {keyValue: id}).then(res => {
            if (res.success) {
                this.setState({
                    data: res.data,
                });
            } else {
                UDToat.showError(res.msg);
            }

        });
    }

    files(id) {
        api.getData('/api/WeChat/GetServiceDeskFiles', {keyValue: id}, false).then(res => {
            if (res.success) {
                let files = res.data || [];
                this.setState({
                    files: files.map(item => ({
                        ...item,
                        id: item.uid,
                    })),
                });
            } else {
                UDToat.showError(res.msg);
            }

        });
    }

    repairfiles(id) {
        api.getData('/api/WeChat/GetRepairFiles', {keyValue: id}, false).then(res => {
            if (res.success) {
                let files = res.data || [];
                this.setState({
                    repairfiles: files.map(item => ({
                        ...item,
                        id: item.uid,
                    })),
                });
            } else {
                UDToat.showError(res.msg);
            }

        });

    }

    communicates(id) {
        api.getData('/api/WeChat/GetCommunicates', {keyValue: id}, false).then(res => {
            if (res.success) {
                this.setState({
                    communicates: res.data,
                });
            } else {
                UDToat.showError(res.msg);
            }
        });
    }

    a(id) {
        // GetServiceDeskFiles
    }

    componentDidMount() {
        const {id, type} = this.state;
        switch (type) {
            case '1': {
                document.title = '服务详情';
                this.detail(id);
                this.files(id);

                break;
            }
            case '2': {
                document.title = '客服回复';
                this.detail(id);
                this.files(id);
                this.communicates(id);

                break;
            }
            case '3': {
                document.title = '客服回复';

                this.detail(id);
                this.files(id);
                this.communicates(id);
                break;
            }
            case '4': {
                document.title = '服务评价';

                this.detail(id);
                this.files(id);
                this.repairfiles(id);
                break;
            }
            default:
                break;
        }
    }

    communicate = () => {
        if (!this.state.contents) {
            UDToat.showError('请输入！');
            return false;
        }
        api.postData('/api/WeChat/SendCommunicate', {
            keyValue: this.state.id,
            Content: this.state.contents,
        }, true)
            .then(res => {
                if (res.success) {
                    // this.props.history.replace({
                    //     pathname: '/work',
                    // })
                    // this.props.history.goBack();
                    this.props.history.replace('/home');
                } else {
                    UDToat.showError(res.msg);
                }
            });
    };

    onStarClick = (nextValue, prevValue, name) => {
        let ratingText = '';
        switch (nextValue) {
            case 1: {
                ratingText = '非常不满意';
                break;
            }
            case 2: {
                ratingText = '不满意';
                break;
            }
            case 3: {
                ratingText = '一般';
                break;
            }
            case 4: {
                ratingText = '满意';
                break;
            }
            case 5: {
                ratingText = '非常满意';
                break;
            }
            default:
                break;
        }
        this.setState({rating: nextValue, ratingText});
        console.log(nextValue);
    };


    serviceDeskAppraise = () => {
        if (!this.state.contents) {
            UDToat.showError('请输入评价！');
            return false;
        }
        api.postData('/api/WeChat/ServiceDeskAppraise', {
            keyValue: this.state.id,
            Grade: this.state.rating,
            Content: this.state.contents,
        }, true)
            .then(res => {
                if (res.success) {
                    this.props.history.replace({
                        pathname: '/home',
                    });
                } else {
                    UDToat.showError(res.msg);
                }
            });
    };
    lookImages = (index, images) => {

    };

    render() {

        const {data, type, files, communicates, rating, ratingText, repairfiles} = this.state;


        return (
            <div style={{paddingLeft: '0.3rem', paddingRight: '0.3rem', paddingBottom: '0.3rem'}}>
                <div style={styles.div1}>{data.billType}</div>
                <div style={styles.div2}>{data.contents}</div>
                {
                    files && files.length > 0 && (
                        <Fragment>
                            {type === '4' && <div style={{paddingTop: '0.3rem'}}>上报情况</div>}
                            <ImagePicker
                                files={files}
                                selectable={false}
                                disableDelete
                                onImageClick={this.lookImages}
                                style={{marginTop: '0.2rem'}}
                            />

                        </Fragment>
                    )
                }

                {
                    type === '4' && repairfiles && repairfiles.length > 0 && (
                        <Fragment>
                            <div>修复情况</div>
                            <ImagePicker
                                files={repairfiles}
                                selectable={false}
                                disableDelete
                                style={{marginTop: '0.2rem'}}
                            />
                        </Fragment>
                    )
                }


                <div style={styles.div3}>提交时间：{data.billDate}</div>
                <div style={{paddingBottom: '0.4rem'}}>
                    {communicates.map(item => (
                        <div style={styles.div4}>{`${item.author}:${item.content}`}<br/>{item.datetime}</div>
                    ))}
                </div>
                {(type === '1' || type === '2') && (
                    <div>
                        <TextareaItem
                            placeholder='请输入'
                            rows={3}
                            // count={100}
                            value={this.state.contents}
                            onChange={contents => this.setState({contents})}
                        />
                    </div>
                )}
                {type === '1' && <button style={styles.button} onClick={this.communicate}>留言管家</button>}
                {type === '2' && <button style={styles.button} onClick={this.communicate}>继续留言</button>}
                {type === '3' && <div style={styles.div2}>最新进展：转维修工单</div>}
                {type === '4' && (
                    <Fragment>
                        <div className='pingjia' style={{padding: 0}}>
                            <p>为更好的服务业主，请您评价本次服务！</p>
                            <p style={{marginTop: '0.1rem'}}>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={rating}
                                    emptyStarColor={'#999'}
                                    onStarClick={this.onStarClick}
                                />
                                <span className='ping'
                                      style={{float: 'right', right: '0.6rem', top: 0}}>{ratingText}</span>
                            </p>

                            <TextareaItem
                                placeholder='输入业主建议'
                                rows={3}
                                // count={100}
                                value={this.state.contents}
                                onChange={contents => this.setState({contents})}
                            />
                            <button style={styles.button} onClick={this.serviceDeskAppraise}>提交</button>
                        </div>
                    </Fragment>
                )}

            </div>
        );
    }
}

const styles = {
    div1: {
        paddingTop: '0.3rem',
        fontSize: '0.36rem',
        color: '#333',
        paddingBottom: '0.3rem',
        borderBottomColor: '#eee',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
    },
    div2: {
        paddingTop: '0.3rem',
        paddingBottom: '0.3rem',
        fontSize: '0.32rem',
        color: '#666',
        borderBottomColor: '#eee',
        borderBottomWidth: '1px',
        borderBottomStyle: 'dashed',
    },
    div3: {
        paddingTop: '0.3rem',
        fontSize: '0.32rem',
        color: '#333',
        paddingBottom: '0.3rem',
    },
    div4: {
        paddingTop: '0.15rem',
        fontSize: '0.32rem',
        color: '#333',
        paddingBottom: '0.15rem',
        lineHeight: '0.45rem',

    },
    button: {
        background: 'orange',
        color: '#fff',
        width: ' 100%',
        height: '0.8rem',
        border: 0,
        borderRadius: '0.1rem',
        marginTop: '0.5rem',
    },
};

export default NewsDetail;
