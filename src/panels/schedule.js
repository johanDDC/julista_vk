import {Div, Button, Panel, PanelHeader, FixedLayout, Gallery} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/schedule.css"
import Mark from "../custom_components/mark"
import {scheduleGetDates} from "../utils/utils"
import {getSchedule} from "../utils/api";

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay === 0 ? 6 : this.props.currentDay : 1),
            weekDuration: 6
        };

        this.dayDates = scheduleGetDates();
        this.scheduleData = getSchedule(
            this.props.userId,
            this.props.userSecret,
            this.dayDates[7],
            this.dayDates[8],
        );
    }

    drawTopBar = () => { //FIXME
        return (
            <FixedLayout className="scheduleWeekTopBarContainer">
                <Div className="scheduleWeekTopBar">
                    <div className="scheduleWeekDay">
                        <span>ПН</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 1})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 1 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[0]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ВТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 2})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 2 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[1]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>СР</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 3})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 3 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[2]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ЧТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 4})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 4 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[3]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>ПТ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 5})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 5 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[4]}
                            </div>
                        </Button>
                    </div>
                    <div className="scheduleWeekDay">
                        <span>СБ</span>
                        <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}}
                                onClick={() => this.setState({currentDay: 6})}>
                            <div
                                className={`scheduleWeekDayDate ${this.state.currentDay === 6 ? 'scheduleWeekDaySelected' : null}`}>
                                {this.dayDates[5]}
                            </div>
                        </Button>
                    </div>
                </Div>
            </FixedLayout>
        );
    };

    generateScheduleTale = (day) => {
        let generateSubjectTale = (num, subjectName, subjectHomework, subjectTime) => {
            return (
                <div className="scheduleSubjectTale">
                    <div className="scheduleSubjectTaleNumber">
                        {num}
                    </div>
                    <div className="scheduleSubjectTaleInfo">
                        <span className="scheduleSubjectTaleSubjectName">
                            {subjectName}
                        </span>
                        <span className="scheduleSubjectTaleHomework">
                            {subjectHomework}
                        </span>
                        <span className="scheduleSubjectTaleTimetable">
                            {subjectTime[0]} - {subjectTime[1]}
                        </span>
                    </div>
                    <div className="scheduleSubjectTaleMarks">
                        <Mark size="25" val="4" is_routine={false} fs="15"/>
                    </div>
                </div>
            )
        };

        let subjectTales = [];

        let subjects = day.subjects;
        subjects.forEach((subject, num) => {
            subjectTales.push(generateSubjectTale(subject.number, subject.name, "", subject.time))
        });

        return (
            <div className="scheduleTale">
                {subjectTales}
            </div>
        );
    };

    generateSchedule = () => {
        let days = this.scheduleData.data.days;
        let tales = [];

        days.forEach((day) => {
            tales.push(this.generateScheduleTale(day));
        });

        return(
            [tales]
        )
    };

    drawShedule = () => {
        return (
            <div>
                <Gallery
                    slideWidth="100%"
                    // align="center"
                    className="scheduleSliderContainer"
                    slideIndex={this.state.currentDay > 0 ? this.state.currentDay - 1 : this.state.currentDay}
                    onChange={slideIndex => {
                        this.setState({currentDay: (slideIndex + 1)});
                    }}
                    onEnd={(this.state.currentDay > this.state.weekDuration ? this.setState({currentDay: this.state.weekDuration}) : null)}
                >
                    {this.generateSchedule()}
                    <div></div>
                </Gallery>
            </div>
        );
    };

    render() {
        return (
            <Panel id={this.props.id} style={{backgroundColor: "rgb(86, 144, 255)"}}>
                <PanelHeader
                    noShadow>
                    <span className="scheduleHeaderMonth">Май</span>
                </PanelHeader>
                {this.drawTopBar()}
                {this.drawShedule()}
            </Panel>
        )
    }
}

Schedule.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    currentDay: PropTypes.number,
    userSecret: PropTypes.any,
    userId: PropTypes.any
};

export default Schedule;