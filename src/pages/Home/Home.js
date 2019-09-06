import React from 'react';
import './Home.css';
import Footer from '../../component/footer/footer';
import Header from './header/header';
import ImgList from './img-list/imgList';
import Carou from './carousel/carousel';
import Shequ from './shequ/shequ';
import Xiangmu from './xiangmu/xiangmu';


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
