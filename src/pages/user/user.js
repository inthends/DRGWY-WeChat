import React from 'react';
import './user.css';
import Footer from '../../component/footer/footer';

class User extends React.Component {
    render() {
        const footer = <Footer {...this.props}/>;
        return (
            <div>
                1
                {footer}
            </div>

        );
    }
}

export default User;
