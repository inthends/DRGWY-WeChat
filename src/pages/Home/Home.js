import React from 'react';
import './Home.css';
import Footer from '../../component/footer/footer';
import Header from './header/header';
import ImgList from './img-list/imgList';
import Carou from './carousel/carousel';


class Home extends React.Component {
    render() {
        const footer = <Footer {...this.props}/>;
        const header = <Header {...this.props}/>;
        const imgList = <ImgList {...this.props}/>;
        const carou = <Carou {...this.props}/>;
        return (
            <div>
                <div className="home">
                    {header}
                    {imgList}
                    {carou}
                    <div className="swipe">
                    </div>

                    <div className="shequ">
                        <div className="shequ-title">
                            <span></span>
                            <p>社区动态</p>
                        </div>
                        <div className="list-shequ">
                            <div className="list-shequ-cont">
                                <div className="list-shequ-cont1">
                                    <p>通知</p>
                                    <p>7条</p>
                                </div>
                                <div className="list-shequ-cont2">
                                    <p>紧急事项</p>
                                </div>
                            </div>

                            <div className="list-shequ-cont">
                                <div className="list-shequ-cont1">
                                    <p>通知</p>
                                    <p>7条</p>
                                </div>
                                <div className="list-shequ-cont2">
                                    <p>紧急事项</p>
                                </div>
                            </div>
                        </div>

                        <div className="list-shequ">
                            <div className="list-shequ-cont">
                                <div className="list-shequ-cont1">
                                    <p>通知</p>
                                    <p>7条</p>
                                </div>
                                <div className="list-shequ-cont2">
                                    <p>紧急事项</p>
                                </div>
                            </div>

                            <div className="list-shequ-cont">
                                <div className="list-shequ-cont1">
                                    <p>通知</p>
                                    <p>7条</p>
                                </div>
                                <div className="list-shequ-cont2">
                                    <p>紧急事项</p>
                                </div>
                            </div>
                        </div>
                    </div>

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
                    {footer}
                </div>

            </div>

        );
    }
}

export default Home;
