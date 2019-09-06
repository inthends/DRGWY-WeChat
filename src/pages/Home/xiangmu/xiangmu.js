import React from 'react';
import BasePage from '../../../utils/base-page';
import { Icon, Grid } from 'antd-mobile';

class Xiangmu extends BasePage {

    render() {
        return (
            <div className="shequ">
                <div className="shequ-title shequ-title-c11">
                    <div className="shequ-title-1">
                        <span></span>
                        <p>项目风采</p>
                    </div>
                    <p className="gengduo">更多...</p>
                </div>
                <div className="list-xiangmu">
                    <div className="list-xiangmu-cont">
                        <div className="list-xiangmu-cont1">
                            <img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt=""/>
                        </div>
                        <div className="list-xiangmu-cont2">
                            <p>
                                万达茂商业广场
                            </p>
                            <p>
                                建筑面积40万方，商业综合体，荣获南京市...
                            </p>
                        </div>
                    </div>

                    <div className="list-xiangmu-cont">
                        <div className="list-xiangmu-cont1">
                            <img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt=""/>
                        </div>
                        <div className="list-xiangmu-cont2">
                            <p>
                                万达茂商业广场
                            </p>
                            <p>
                                建筑面积40万方，商业综合体，荣获南京市...建筑面积40万方建筑面积40万方建筑面积40万方
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Xiangmu;
