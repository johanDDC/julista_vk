import {Gallery, Panel, PanelHeader, Div, PullToRefresh} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/schedule.css"
import Mark from "../custom_components/mark"
import CustomSpinner from "../custom_components/customSpinner"
import {getRusMonthName, scheduleGetDates, scheduleNextWeek, schedulePrevWeek} from "../utils/utils"
import ScheduleWeekBar from "../custom_components/scheduleTopBar"
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import SubjectHWIcon from "../custom_components/icon-pack/SubjectHWIcon"
import SubjectRoomIcon from "../custom_components/icon-pack/SubjectRoomIcon"
import connect from '@vkontakte/vk-connect-promise';


class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.dayDates = scheduleGetDates();
        this.scheduleData = this.props.appData.journal;
        let flag = this.props.appData.journal.data.length === 0;

        this.state = {
            currentDay: (new Date().getDay() <= 6 && new Date().getDay() > 0 ? new Date().getDay() - 1 : 0),
            month: getRusMonthName(this.dayDates[7].getMonth()),
            weekDuration: (!flag ? this.scheduleData.data.days.length : 5),
            ready: !flag,
            error: false,
            fetching: false,
        };

        if (flag)
            this.loadData();
    }

    loadData = async () => {
        this.props.getJournal(this.props.profile.id, this.props.profile.secret, this.dayDates[7], this.dayDates[8], this.props.profile.student.id);

        let id = setInterval(() => {
            if (this.props.appData.error) {
                clearInterval(id);
                this.setState({
                    error: true,
                    ready: true,
                    fetching: false,
                });
            } else {
                if (this.props.appData.journal.data.length !== 0) {
                    this.scheduleData = this.props.appData.journal;
                    clearInterval(id);
                    this.setState({
                        ready: true,
                        weekDuration: (this.props.appData.journal.data.days.length < 5 ? 5 : this.props.appData.journal.data.days.length), // if holidays, length is equal to 0
                        fetching: false,
                    });
                }
            }
        }, 200);
    };

    drawSpinner = () => {
        return (
            <CustomSpinner isInverse={false}/>
        );
    };

    drawTopBar = () => { //FIXME
        let clickFunc = day => {
            this.setState({currentDay: day});
        };
        return (
            <ScheduleWeekBar selectedDay={this.state.currentDay}
                             weekDuration={(this.state.weekDuration === 0 ? 5 : this.state.weekDuration)}
                             dates={this.dayDates}
                             clickFunc={clickFunc}/>
        );
    };

    generateScheduleTale = (day) => {
        let generateSubjectTale = (subject) => {
            let marks = [];
            let homework = null;
            let modalMarksPresentation = [];
            if (subject) {
                if (subject.marks) {
                    subject.marks.forEach(mark => {
                        marks.push( //Append weight here
                            <div style={{marginRight: "4px"}}>
                                <Mark size="24" val={(mark.score ? mark.score.toString() : mark.value.toString())}
                                      is_routine={false} fontSize="14"
                                      weight={(mark.weight ? mark.weight.toString() : "1")}
                                      is_border={true}/>
                            </div>
                        );
                        modalMarksPresentation.push(
                            <div className="modalScheduleInfoRow">
                                <div className="modalScheduleInfoRowLeft">
                                    <Mark size="22" val={(mark.score ? mark.score.toString() : mark.value.toString())}
                                          is_routine={false} fontSize="14"
                                          weight={(mark.weight ? mark.weight.toString() : "1")}/>
                                </div>
                                <div className="modalScheduleInfoRowText">
                                </div>
                            </div>
                        );
                    });
                }
                if (subject.assignments) {
                    subject.assignments.forEach(assignment => {
                        try {
                            homework = assignment.text
                        } catch (e) {

                        }
                    });
                }
            }
            let modal = (
                subject.time ?
                    <div>
                        {subject.marks ?
                            <div>
                                <div className="modalScheduleTitle">
                                    Сведения о предмете
                                </div>
                                {modalMarksPresentation}
                            </div>
                            : null}
                        {homework ?
                            <div>
                                <div className="modalScheduleTitle">
                                    Домашнее задание
                                </div>
                                <div className="modalScheduleInfoRow">
                                    <div className="modalScheduleInfoRowLeft">
                                        <SubjectHWIcon/>
                                    </div>
                                    <div className="modalScheduleInfoRowText">
                                        {homework}
                                    </div>
                                </div>
                            </div>
                            : null}
                        {subject.room ?
                            <div>
                                <div className="modalScheduleTitle">
                                    Кабинет
                                </div>
                                <div className="modalScheduleInfoRow">
                                    <div className="modalScheduleInfoRowLeft">
                                        <SubjectRoomIcon/>
                                    </div>
                                    <div className="modalScheduleInfoRowText">
                                        {subject.room}
                                    </div>
                                </div>
                            </div>
                            : null}
                        {subject.label ?
                            <div>
                                <div className="modalScheduleTitle">
                                    Тема урока
                                </div>
                                <div className="modalScheduleInfoRow">
                                    <div className="modalScheduleInfoRowLeft">
                                        -
                                    </div>
                                    {subject.label.title}
                                    <div className="modalScheduleInfoRowText">
                                    </div>
                                </div>
                            </div>
                            : null}
                        {subject.label ?
                            (subject.label.module ?
                                <div>
                                    <div className="modalScheduleTitle">
                                        Модуль
                                    </div>
                                    <div className="modalScheduleInfoRow">
                                        <div className="modalScheduleInfoRowLeft">
                                            -
                                        </div>
                                        <div className="modalScheduleInfoRowText">
                                            {subject.label.module}
                                        </div>
                                    </div>
                                </div>
                                : null)
                            : null}
                        <div className="modalEmptyElement">
                        </div>
                    </div>
                    : null
            );

            return (
                <Div className="scheduleSubjectTaleContainer" style={{paddingBottom: 0}}>
                    <div className="scheduleSubjectTale" onClick={() => this.props.openModal(modal, subject.name)}>
                        <div className="scheduleSubjectTaleNumber">
                            {subject.number}
                        </div>
                        <div className="scheduleSubjectTaleInfo">
                            <div className="scheduleSubjectTaleSubjectName">
                                {subject.name}
                            </div>
                            {homework ?
                                <div className="scheduleSubjectTaleHomework">
                                    {homework}
                                </div>
                                : null}
                            {
                                subject.time ?
                                    <div className="scheduleSubjectTaleTimetable">
                                        {subject.time[0]} - {subject.time[1]}
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="scheduleSubjectTaleMarks">
                            {
                                marks.length > 2
                                    ? marks.forEach((markDiv, iter) => {
                                        markDiv.props.style.position = "absolute";
                                        markDiv.props.style.left = 9 * iter;
                                    })
                                    : null
                            }
                            {marks}
                        </div>
                    </div>
                </Div>
            )
        };

        let subjectTales = [];

        let subjects = day.subjects;
        subjects.forEach((subject) => {
            let sbj = generateSubjectTale(subject);
            subjectTales.push(sbj)
        });

        subjectTales.push(
            <div className="scheduleSubjectLastChild">
            </div>
        );

        return (
            <div className="scheduleTale">
                {subjectTales}
            </div>
        );
    };
    generateEmptyTale = () => {
        return (
            <div className="scheduleTale">
                <p style={{textAlign: "center"}}>Сегодня нет занятий</p>
            </div>
        )
    };
    generateErrorSchedule = () => {
        return (
            <div className="scheduleTale">
                <p className="scheduleTaleError">Непредвиденная ошибка. Пожалуйста, попробуйте позже.</p>
            </div>
        )
    };

    generateSchedule = () => {
        let days = this.scheduleData.data.days;
        let tales = [];

        if (this.state.error) {
            for (let i = 0; i < 5; i++) {
                tales.push(this.generateErrorSchedule());
            }
        } else {
            days.forEach((day) => {
                tales.push(this.generateScheduleTale(day));
            });
        }

        if (tales.length === 0) {
            for (let i = 0; i < 5; i++) {
                tales.push(this.generateEmptyTale());
            }
        }

        tales.push(<div></div>);
        return tales
    };

    drawShedule = () => {
        try {
            if (this.state.currentDay === 0)
                document.getElementById("scheduleWeekSwiperLeft")
                    .style.display = "flex";
            else
                document.getElementById("scheduleWeekSwiperLeft")
                    .style.display = "none";
            if (this.state.currentDay >= (this.state.weekDuration < 5 ? 4 : this.state.weekDuration - 1))
                document.getElementById("scheduleWeekSwiperRight")
                    .style.display = "flex";
            else
                document.getElementById("scheduleWeekSwiperRight")
                    .style.display = "none";

            if (this.state.weekDuration === 6)
                document.querySelector(".Gallery__slide:last-child").style.width = "50px";
        } catch (e) {

        }
        return (
            <Gallery
                slideWidth="100%"
                className="scheduleSliderContainer"
                slideIndex={this.state.currentDay}
                onChange={slideIndex => {
                    // this.setState({
                    //     currentDay: (slideIndex >= (this.state.weekDuration < 5 ?
                    //         5 :
                    //         this.state.weekDuration) ? slideIndex - 1 : slideIndex)
                    // });
                    this.setState({
                        currentDay: (slideIndex >= (this.state.weekDuration < 5 ? 5 : this.state.weekDuration)
                            ? slideIndex - 1
                            : slideIndex)
                    });
                }}
            >
                {this.generateSchedule()}
            </Gallery>
        );
    };


    prevWeek = () => {
        let newDatesArr = schedulePrevWeek(this.dayDates[7]);
        this.props.getJournal(this.props.profile.id,
            this.props.profile.secret,
            newDatesArr[7],
            newDatesArr[8],
            this.props.profile.student.id);
        this.dayDates = newDatesArr;
        this.setState({
            ready: false,
            month: getRusMonthName(this.dayDates[7].getMonth()),
            currentDay: (this.state.weekDuration < 5 ? this.state.weekDuration - 1 : 4),
        });
        document.getElementById("scheduleWeekSwiperLeft")
            .style.display = "none";

        let id = setInterval(() => {
                if (this.props.appData.error) {
                    clearInterval(id);
                    this.setState({error: true});
                    this.setState({ready: true});
                } else {
                    if (this.props.appData.journal.data.length !== 0) {
                        this.scheduleData = this.props.appData.journal;
                        clearInterval(id);
                        this.setState({
                            ready: true,
                            weekDuration: (this.props.appData.journal.data.days.length < 5 ? 5 : this.props.appData.journal.data.days.length),
                        });

                    }
                }
            },
            200
        );

    };
    nextWeek = () => {
        let newDatesArr = scheduleNextWeek(this.dayDates[7]);
        this.props.getJournal(this.props.profile.id,
            this.props.profile.secret,
            newDatesArr[7],
            newDatesArr[8],
            this.props.profile.student.id);
        this.dayDates = newDatesArr;
        this.setState({
            ready: false,
            month: getRusMonthName(this.dayDates[7].getMonth()),
            currentDay: 0,
        });
        document.getElementById("scheduleWeekSwiperRight")
            .style.display = "none";

        let id = setInterval(() => {
            if (this.props.appData.error) {
                clearInterval(id);
                this.setState({error: true});
                this.setState({ready: true});
            } else {
                if (this.props.appData.journal.data.length !== 0) {
                    this.scheduleData = this.props.appData.journal;
                    clearInterval(id);
                    this.setState({
                        ready: true,
                        weekDuration: (this.props.appData.journal.data.days.length < 5 ? 5 : this.props.appData.journal.data.days.length),
                    });
                }
            }
        }, 200);
    };

    refresh = () => {
        this.loadData();
        this.setState({fetching: true});
    };

    render() {
        return (
            <Panel id={this.props.id} style={{backgroundColor: "#5690ff"}}>
                <PanelHeader
                    noShadow>
                    <div className="scheduleHeaderMonth">{this.state.month}</div>
                </PanelHeader>
                {this.drawTopBar()}
                <Div id="scheduleWeekSwiperLeft" onClick={this.prevWeek}>
                    <div className="up"></div>
                    <div className="down"></div>
                    <div style={{transform: "scaleX(-1)"}}>
                        <Icon24Chevron/>
                    </div>
                </Div>
                <Div id="scheduleWeekSwiperRight" onClick={this.nextWeek}>
                    <div className="up"></div>
                    <div className="down"></div>
                    <Icon24Chevron/>
                </Div>
                {
                    (this.state.ready
                        ?
                        <PullToRefresh onRefresh={this.refresh}
                                       isFetching={this.state.fetching}
                                       style={{color: "#ffffff"}}>
                            {this.drawShedule()}
                        </PullToRefresh>
                        : this.drawSpinner())
                }
            </Panel>
        )
    }
}

Schedule.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
    getJournal: PropTypes.func.isRequired,
    appData: PropTypes.any.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default Schedule;