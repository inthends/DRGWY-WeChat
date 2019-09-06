import React from 'react';
import './footer.css';
import BasePage from '../../utils/base-page';

class Footer extends BasePage {

    render() {
        const data = [
            {
                img1: require('../../static/images/footer/wuye1.png'),
                img2: require('../../static/images/footer/wuye.png'),
                text: '物业',
                path: '/home'
            },
            {
                img1: require('../../static/images/footer/wode1.png'),
                img2: require('../../static/images/footer/wode.png'),
                text: '我的',
                path: '/user'
            },
        ];
        const router = this.props.match.path;
        return (
            <div className="footer">
                {
                    data.map(value => (
                        <p className={`p1 ${router === value.path ? 'color' : ''}`}
                           onClick={() => this.props.history.push(value.path)}>
                            <img
                                src={router === value.path ? value.img1 : value.img2}
                                alt=""/>
                            <span>{value.text}</span>
                        </p>
                    ))
                }

            </div>
        );
    }
}

export default Footer;
