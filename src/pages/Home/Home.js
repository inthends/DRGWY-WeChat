import React from 'react';
import './Home.css';
import Footer from '../../component/footer/footer';
import Header from '../../component/home/header/header';
import ImgList from '../../component/home/img-list/imgList';
import Carou from '../../component/home/carousel/carousel';
import Shequ from '../../component/home/shequ/shequ';
import Xiangmu from '../../component/home/xiangmu/xiangmu';

class Home extends React.Component {
    render() {
        const footer = <Footer {...this.props}/>;
        const header = <Header {...this.props}/>;
        const imgList = <ImgList {...this.props}/>;
        const carou = <Carou {...this.props}/>;
        const shequ = <Shequ {...this.props}/>;
        const xiangmu = <Xiangmu {...this.props}/>;
        return (
            <div>
                <div className="home">
                    {header}
                    {imgList}
                    {carou}
                    {shequ}
                    {xiangmu}
                    {footer}
                </div>
            </div>
        );
    }
}

export default Home;
