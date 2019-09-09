import React from 'react';
import BasePage from '../../../utils/base-page';
import { Icon, Grid } from 'antd-mobile';

class Shequ extends BasePage {

    render() {
        return (
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

        );
    }
}

export default Shequ;
