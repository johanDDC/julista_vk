import {Div, Group, Button, Panel, PanelHeader, InfoRow, Progress, Spinner, Avatar} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import AccountUserContainer from "../custom_components/accountUserContainer"
import ProgressBar from "../custom_components/ProgressBar"
import SwitchStudentIcon from "../custom_components/icon-pack/SwitchStudentIcon"
import VK_important from "../custom_components/icon-pack/VK_important"
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import DefaultAvatarIcon from "../custom_components/icon-pack/DefaultAvatarIcon"
import QuestionIcon from "../custom_components/icon-pack/QuestionIcon"
import PerformanceIcon from "../custom_components/icon-pack/PerformanceIcon"
import {isBirthday, recursiveTheming} from "../utils/utils"
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
        console.log("classmates resp", `https://bklet.ml/api/diary/classmates/?id=${this.props.profile.id}&secret=${this.props.profile.secret}&student_id=${this.props.profile.student.id}`);
        axios.get(`https://bklet.ml/api/diary/classmates/?id=${this.props.profile.id}&secret=${this.props.profile.secret}&student_id=${this.props.profile.student.id}`)
            .then(resp => {
                let clsmts = [];
                let clsmts_ids = [];
                let sorted = [...resp.data.data, this.props.profile.student];
                sorted.sort(function (a, b) {
                    if (a.exp < b.exp) return 1;
                    if (a.exp > b.exp) return -1;
                    return 0;
                });
                this.myPlace = sorted.indexOf(this.props.profile.student);
                console.log("sorting", sorted);
                sorted.forEach((classmate, i) => {
                    let is_link;
                    try {
                        is_link = classmate.vk_account;
                        clsmts_ids.push(classmate.vk_account);
                    } catch {
                        clsmts_ids.push(1);
                        is_link = false;
                    }
                    // let inside =
                    //     <AccountUserContainer
                    //         name={classmate.name}
                    //         number={(i + 1).toString()}
                    //         is_birthday={classmate.b_date && isBirthday(classmate.b_date)}
                    //         vk_id={classmate.vk_account}
                    //         percent={classmate.exp}
                    //     />;
                    clsmts.push({
                        name: classmate.name,
                        number: (i + 1).toString(),
                        link: is_link,
                        bdate: classmate.b_date && isBirthday(classmate.b_date),
                        exp: classmate.exp,
                    });
                    // if (is_link) {
                    //
                    //     clsmts.push(
                    //         <div className="accountClassmateContainer"
                    //              onClick={() => window.location.href = `vk://vk.com/id${classmate.vk_account}`}
                    //         >
                    //             {inside}
                    //         </div>
                    //     );
                    // } else {
                    //     clsmts.push(
                    //         <div className="accountClassmateContainer"
                    //         >
                    //             {inside}
                    //         </div>
                    //     );
                    // }
                });
                console.log("ids", clsmts_ids, clsmts);
                connect.send("VKWebAppCallAPIMethod", {
                    method: "users.get",
                    request_id: "request_avatars",
                    params: {
                        user_ids: clsmts_ids,
                        fields: "photo_100",
                        v: "5.102",
                        access_token: "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402",
                    }
                })
                    .then(resp => {
                        console.log("avatars response", resp.data.response);
                        resp.data.response.forEach((user, num) => {
                            clsmts[num].avatar_link = user.photo_100;
                        });
                        let nodes = [];
                        console.log("clsmts after adding", clsmts);
                        clsmts.forEach(mate => {
                            nodes.push(
                                <div className="accountClassmateContainer"
                                     onClick={() => {
                                         if (mate.link)
                                             window.location.href = `vk://vk.com/id${mate.link}`
                                     }}
                                >
                                    <AccountUserContainer
                                        name={mate.name}
                                        number={mate.number}
                                        is_birthday={mate.bdate}
                                        percent={mate.exp}
                                        avatarLink={mate.avatar_link}
                                    />
                                </div>
                            )
                        });
                        console.log("nodes", nodes);
                        this.setState({
                            classmates: nodes,
                            ready: true,
                        })
                    })
                    .catch(err => console.log("avatar", err));
            })
            .catch(err => console.log("classmates", err))
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
                    <div style={{fontSize: "14px", color: "#999999"}}>
                        Топ класса:
                    </div>
                    {
                        this.state.ready
                            ?
                            (this.state.classmates.length === 1
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