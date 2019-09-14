import React from 'react';
import PropTypes from "prop-types";
import "./scheduleWeekBar.css"
import {Button, Div} from "@vkontakte/vkui";

class ScheduleWeekBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log("selected day", this.props.selectedDay, this.props.weekDuration);
        this.day = (this.props.selectedDay <= this.props.weekDuration - 1 ?
            this.props.selectedDay
            :   this.props.weekDuration - 1);
        return (
            <Div className="scheduleWeekTopBar">
                <div className="scheduleWeekDay">
                    <span>ПН</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(0)}>
                        <div
                            className={`scheduleWeekDayDate ${this.day === 0 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[0]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ВТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(1)}>
                        <div
                            className={`scheduleWeekDayDate ${this.day === 1 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[1]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>СР</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(2)}>
                        <div
                            className={`scheduleWeekDayDate ${this.day === 2 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[2]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ЧТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(3)}>
                        <div
                            className={`scheduleWeekDayDate ${this.day === 3 ? 'scheduleWeekDaySelected' : null}`}>
                            {this.props.dates[3]}
                        </div>
                    </Button>
                </div>
                <div className="scheduleWeekDay">
                    <span>ПТ</span>
                    <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                            onClick={() => this.props.clickFunc(4)}>
                        <div
                            className={`scheduleWeekDayDate ${this.day === 4 ? 'scheduleWeekDaySelected' : null}`}>
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
                                    className={`scheduleWeekDayDate ${this.day === 5 ? 'scheduleWeekDaySelected' : null}`}>
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