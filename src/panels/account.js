import {Div, Group, Button, Panel, PanelHeader, InfoRow, Progress, Spinner, Avatar} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import AccountUserContainer from "../custom_components/accountUserContainer"
import SwitchStudentIcon from "../custom_components/icon-pack/SwitchStudentIcon"
import VK_important from "../custom_components/icon-pack/VK_important"
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import DefaultAvatarIcon from "../custom_components/icon-pack/DefaultAvatarIcon"
import {isBirthday} from "../utils/utils"
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
    }

    componentDidMount() {
        this.getClassMates();
    }

    getClassMates = () => {
        axios.get(`https://bklet.ml/api/diary/classmates/?id=${this.props.profile.id}&secret=${this.props.profile.secret}`)
            .then(resp => {
                let clsmts = [];
                let clsmts_ids = [];
                resp.data.data.forEach((classmate, i) => {
                    let is_link;
                    try {
                        is_link = classmate.vk_account;
                        clsmts_ids.push(classmate.vk_account.toString());
                    } catch (e) {
                        is_link = false;
                    }
                    let inside =
                        <AccountUserContainer
                            name={classmate.name}
                            number={(i + 1).toString()}
                            is_birthday={classmate.b_date && isBirthday(classmate.b_date)}
                            vk_id={classmate.vk_account}
                        />;
                    if (is_link) {
                        clsmts.push(
                            <div className="accountClassmateContainer"
                                 onClick={() => window.location.href = `vk://vk.com/id${classmate.vk_account}`}
                            >
                                {inside}
                            </div>
                        );
                    } else {
                        clsmts.push(
                            <div className="accountClassmateContainer"
                            >
                                {inside}
                            </div>
                        );
                    }
                });
                console.log("ids", clsmts_ids);
                connect.send("VKWebAppCallAPIMethod", {
                    method: "users.get",
                    request_id: "request_avatars",
                    params: {
                        user_id: clsmts_ids,
                        fields: ["photo_50"],
                        v: "5.101",
                        access_token: "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402",
                    }
                })
                    .then(resp => console.log("avatar data", resp.data.response));
                this.setState({
                    classmates: clsmts,
                    ready: true,
                })
            })
            .catch(err => console.log(err))
    };

    switchStudent = () => {
        this.props.clearJournalData();
        this.props.setPanel("choose_student");
    };

    openList = () => {
        if (!this.is_opened) {
            document.getElementById("classmatesList").style.maxHeight = `${64 * this.state.classmates.length + 29}px`;
            document.getElementById("classmatesList").style.paddingBottom = "24px";
            document.querySelector(".accountClassmateContainer:nth-child(5)").style.marginTop = "8px";
            document.querySelector(".accountShowMoreClassmatesText").innerHTML = "Скрыть весь список";
            document.getElementById("openClassmatesList").style.transform = "rotate(180deg)";
            this.is_opened = true;
        } else {
            document.getElementById("classmatesList").style.maxHeight = "222px";
            document.getElementById("classmatesList").style.paddingBottom = "12px";
            document.querySelector(".accountClassmateContainer:nth-child(5)").style.marginTop = "28px";
            document.querySelector(".accountShowMoreClassmatesText").innerHTML = "Показать весь список";
            document.getElementById("openClassmatesList").style.transform = "rotate(360deg)";
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
                                    ? <Avatar src={this.props.fetchedUser.photo_100}/>
                                    : <DefaultAvatarIcon/>
                            }
                        </div>
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
                    <div style={{fontSize: "14px", color: "#666666"}}>
                        Одноклассники:
                    </div>
                    {
                        this.state.ready
                            ?
                            (this.state.classmates.length === 0
                                ? <div className="noClassmates">Ваши одноклассники ещё не авторизовались, вы можете
                                    рассказать им о приложении!</div>
                                : this.state.classmates)
                            : <Spinner size="medium"/>
                    }
                    {this.state.classmates.length > 3 &&
                    <div className="accountShowMoreClassmates" onClick={this.openList}>
                        <div className="accountShowMoreClassmatesText">
                            Показать весь список
                        </div>
                        <div id="openClassmatesList">
                            <Icon16Dropdown/>
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
                             window.open('vk://vk.com/im?sel=-171343913');
                         }}>
                        <div className="accountImportantNotificationIconBlock">
                            <VK_important/>
                        </div>
                        <div className="accountImportantNotificationTextBlock">
                            Попробуй нашего бота ВК, он очень умный, и сильно тебе поможет, если нет времени заходить в
                            приложение
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
};

export default Account;