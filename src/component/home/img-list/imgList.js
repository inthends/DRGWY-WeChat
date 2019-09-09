import React from 'react';
import BasePage from '../../../utils/base-page';

class ImgList extends BasePage {

    render() {
        return (
            <div className="img-list">
                <div className="img-list-flex" onClick="payFees()">
                    <img src={require('../../../static/images/home/jiaofei.png')} alt=""/>
                    <p>查询缴费</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/xiu.png')} alt=""/>
                    <p>报事报修</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/guanjia.png')} alt=""/>
                    <p>在线管家</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>关于我们</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>关于我们</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>关于我们</p>
                </div>

                <div className="img-list-flex">
                    <img src={require('../../../static/images/home/guan.png')} alt=""/>
                    <p>关于我们</p>
                </div>
            </div>
        );
    }
}

export default ImgList;
