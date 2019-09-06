import React from 'react';
import PropTypes from "prop-types";
import "./scheduleWeekBar.css"
import {Button, Div, FixedLayout} from "@vkontakte/vkui";
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

class ScheduleWeekBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Div className="scheduleWeekTopBar">
                <div className="scheduleWeekDay">
                    <span>ПН</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(0)}>
                        <div
                            className={`scheduleWeekDayDate ${this.props.selectedDay === 0 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[0]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ВТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(1)}>
                        <div
                            className={`scheduleWeekDayDate ${this.props.selectedDay === 1 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[1]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>СР</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(2)}>
                        <div
                            className={`scheduleWeekDayDate ${this.props.selectedDay === 2 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[2]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ЧТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(3)}>
                        <div
                            className={`scheduleWeekDayDate ${this.props.selectedDay === 3 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[3]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ПТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(4)}>
                        <div
                            className={`scheduleWeekDayDate ${this.props.selectedDay === 4 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[4]}
                        </div>
                    </Button>
                </div>
                {(
                    this.props.weekDuration === 6 ?
                        <div className="scheduleWeekDay">
                            <span>СБ</span>
                            <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                    onClick={() => this.props.clickFunc(5)}>
                                <div
                                    className={`scheduleWeekDayDate ${this.props.selectedDay === 5 ? 'scheduleWeekDaySelected' : null}`}>
                                    {this.props.dates[5]}
                                </div>
                            </Button>
                        </div>
                        :
                        null
                )}
            </Div>

        );
    }
}

ScheduleWeekBar.propTypes = {
    selectedDay: PropTypes.number.isRequired,
    weekDuration: PropTypes.number.isRequired,
    dates: PropTypes.array.isRequired,
    clickFunc: PropTypes.func.isRequired,
};

export default ScheduleWeekBar;