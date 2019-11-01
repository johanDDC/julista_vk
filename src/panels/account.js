import {Div, Group, Button, Panel, PanelHeader, InfoRow, Progress, Spinner, Avatar} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import AccountUserContainer from "../custom_components/layouts/account/accountUserContainer"
import ProgressBar from "../custom_components/layouts/account/ProgressBar"
import SwitchStudentIcon from "../custom_components/icon-pack/SwitchStudentIcon"
import VK_important from "../custom_components/icon-pack/VK_important"
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import DefaultAvatarIcon from "../custom_components/icon-pack/DefaultAvatarIcon"
import QuestionIcon from "../custom_components/icon-pack/QuestionIcon"
import PerformanceIcon from "../custom_components/icon-pack/PerformanceIcon"
import {isBirthday, recursiveTheming} from "../utils/utils"
import {getClassmatesAvatars} from "../utils/requests"
import connect from "@vkontakte/vk-connect-promise";

const axios = require('axios');

class Account extends React.Component {
    constructor() {
        super();

        this.state = {
            classmates: [],
            ready: false,
        };

        this.is_opened = false;
        this.myPlace = 1;
    }

    componentDidMount() {
        this.getClassMates();
    }

    getClassMates = () => {
        let nodes = [];
        console.log("meta data", this.props.profile.classmates, this.props.profile, this.props.profile.student, this.props.fetchedUser.photo_100);
        getClassmatesAvatars(this.props.profile.classmates, this.props.profile, this.props.fetchedUser.photo_100)
            .then(mates => {
                console.log("clsmts after adding", mates);
                mates.forEach((mate, num) => {
                    nodes.push(
                        <div className="accountClassmateContainer"
                             onClick={() => {
                                 if (mate.link)
                                     window.location.href = `vk://vk.com/id${mate.link}`
                             }}
                        >
                            <AccountUserContainer
                                name={mate.name}
                                number={num + 1}
                                is_birthday={mate.bdate}
                                percent={mate.exp}
                                avatarLink={mate.avatar_link}
                            />
                        </div>
                    )
                });
                this.setState({
                    classmates: nodes,
                    ready: true,
                });
            });
    };

    switchStudent = () => {
        this.props.clearJournalData();
        this.props.setPanel("choose_student");
    };

    openList = () => {
        if (!this.is_opened) {
            document.getElementById("classmatesList").style.maxHeight = `${64 * this.state.classmates.length + 47}px`;
            document.getElementById("classmatesList").style.paddingBottom = "24px";
            document.querySelector(".accountClassmateContainer:nth-child(5)").style.marginTop = "8px";
            document.querySelector(".accountShowMoreClassmatesText").innerHTML = "Скрыть весь список";
            document.getElementById("openClassmatesList").style.transform = "rotate(180deg)";
            try {
                document.getElementById("accountMyPlace").style.display = "none";
            } catch (e) {

            }
            this.is_opened = true;
        } else {
            document.getElementById("classmatesList").style.maxHeight = "240px";
            document.getElementById("classmatesList").style.paddingBottom = "12px";
            document.querySelector(".accountClassmateContainer:nth-child(5)").style.marginTop = "46px";
            document.querySelector(".accountShowMoreClassmatesText").innerHTML = "Показать весь список";
            document.getElementById("openClassmatesList").style.transform = "rotate(360deg)";
            try {
                document.getElementById("accountMyPlace").style.display = "flex";
            } catch (e) {

            }
            this.is_opened = false;
        }
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    noShadow={true}>
                    Аккаунт
                </PanelHeader>
                <div className="accountStudentInfo">
                    <Div className="studentInfoContainer">
                        <div className="accountProfileAvatar">
                            {
                                this.props.fetchedUser
                                    ? <Avatar size={40} src={this.props.fetchedUser.photo_100}/>
                                    : <Avatar size={40}><DefaultAvatarIcon/></Avatar>
                            }
                        </div>
                        <div className="studentInfoRow">
                            <div id="studentInfo">
                                <div id="studentName">
                                    {this.props.profile.student.name}
                                </div>
                                <div id="studentGrade">
                                    {this.props.profile.student.class} класс
                                </div>
                            </div>
                            {
                                this.props.profile.students.length > 1 &&
                                <Button id="switchStudentButton"
                                        onClick={this.switchStudent}>
                                    <SwitchStudentIcon/>
                                </Button>
                            }
                        </div>
                    </Div>
                    <Div>
                        <Div className="accountProgressContainer">
                            <div className="accountProgressContainerTitleRow">
                                <div className="accountProgressContainerTitle">
                                    Успеваемость
                                </div>
                                {/*<QuestionIcon/>*/}
                            </div>
                            <div className="accountProgressContainerContent">
                                <div className="accountProgressContainerContentPerformanceIcon">
                                    <PerformanceIcon/>
                                </div>
                                <div className="accountProgressContainerContentPercent">
                                    {
                                        isNaN(parseInt(this.props.profile.student.exp))
                                            ? 0
                                            : parseInt(this.props.profile.student.exp)
                                    }%
                                </div>
                                <div className="accountProgressContainerContentSeparator"></div>
                                <div className="accountProgressContainerContentProgress">
                                    <ProgressBar value={this.props.profile.student.exp}/>
                                </div>
                            </div>
                        </Div>
                    </Div>
                    {/*<Div className="accountProgress">*/}
                    {/*    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>*/}
                    {/*        <div>Успеваемость</div>*/}
                    {/*    </div>*/}
                    {/*    <InfoRow title="Уровень" id="progressBar">*/}
                    {/*        <Progress value={90}/>*/}
                    {/*    </InfoRow>*/}
                    {/*</Div>*/}
                </div>
                {/*<div className="accountTasks">*/}
                {/*    <Div className="accountBlockTitle">*/}
                {/*        ЗАДАЧИ*/}
                {/*    </Div>*/}
                {/*</div>*/}
                <Div className="accountGradeTop" id="classmatesList">
                    <div style={{fontSize: "14px", color: "var(--third-text-color)"}}>
                        Топ класса:
                    </div>
                    {
                        this.state.ready
                            ?
                            (this.state.classmates.length < 2
                                ? <div className="noClassmates">Ваши одноклассники ещё не авторизовались, вы можете
                                    рассказать им о приложении!</div>
                                : this.state.classmates)
                            : <Spinner size="medium"/>
                    }
                    {this.state.classmates.length > 3 &&
                    <div className="accountClassmatesAdditionalContent">
                        {
                            (this.myPlace > 3) &&
                            <div id="accountMyPlace">
                                Вы на {this.myPlace} месте
                            </div>
                        }
                        <div className="accountShowMoreClassmates" onClick={this.openList}>
                            <div className="accountShowMoreClassmatesText">
                                Показать весь список
                            </div>
                            <div id="openClassmatesList">
                                <Icon16Dropdown/>
                            </div>
                        </div>
                    </div>
                    }
                </Div>
                <Div className="accountImportantNotifications">
                    <div className="accountBlockTitle">
                        ВАЖНЫЕ УВЕДОМЛЕНИЯ
                    </div>
                    <Div className="accountImportantNotification Tappable--ios Tappable--android"
                         onClick={() => {
                             window.open('vk://vk.com/app6441755_-171343913');
                         }}>
                        <div className="accountImportantNotificationIconBlock">
                            <VK_important/>
                        </div>
                        <div className="accountImportantNotificationTextBlock">
                            Кстати нашего бота можно давить в беседу вашего класса, чтобы он
                            мог скидывать домашку сразу всем.
                        </div>
                    </Div>
                </Div>
                {/*<Group className="lastNotificationsContainer">*/}
                {/*    <div className="inversedTitle">*/}
                {/*        ПОСЛЕДНИЕ СОБЫТИЯ*/}
                {/*    </div>*/}
                {/*    <div className="notification notificationTop">*/}
                {/*        Володя Ржавый получил 5 за контрольную по уроку алгебра. Единственный в классе!*/}
                {/*    </div>*/}
                {/*    <div className="notification">*/}
                {/*        Ирина Шикина достигла 10 уровня*/}
                {/*    </div>*/}
                {/*    <div className="notification">*/}
                {/*        Твой класс получил рекордные 26 оценок за неделю. Из них 15 пятёрок!*/}
                {/*    </div>*/}
                {/*    <div className="notification notificationBottom">*/}
                {/*        <Button level="tertiary" style={{margin: 0, padding: 0}}>*/}
                {/*            <div style={{fontSize: "15px", fontWeight: "700", color: "#fff"}}>*/}
                {/*                Подробнее*/}
                {/*            </div>*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Group>*/}
                {/*{this.props.theme === "dark" && recursiveTheming(document.querySelector("#account"))}*/}
            </Panel>
        );
    }
}

Account.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
    setPanel: PropTypes.func.isRequired,
    clearJournalData: PropTypes.func.isRequired,
    fetchedUser: PropTypes.any,

    theme: PropTypes.string.isRequired,
};

export default Account;