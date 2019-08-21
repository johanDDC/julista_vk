import {Div, Group, Button, Panel, PanelHeader, InfoRow, Progress} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import AccountUserContainer from "../custom_components/accountUserContainer"

const Account = ({id}) => (
    <Panel id={id}>
        <PanelHeader
            noShadow={true}
            left={<Div style={{fontWeight: 'bold', fontSize: '20px'}}><span>Аккаунт</span></Div>}>
        </PanelHeader>
        <div className="accountStudentInfo">
            <Div className="studentInfoContainer">
                <div id="studentInfo">
                <span id="studentName">
                    Иван Пешехонов
                </span>
                    <span id="studentGrade">
                    11 класс
                </span>
                </div>
                <div/>
            </Div>
            <Div className="accountProgress">
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <span>Успеваемость</span>
                </div>
                <InfoRow title="Уровень" id="progressBar">
                    <Progress value={90}/>
                </InfoRow>
            </Div>
        </div>
        <div className="accountTasks">
            <Div className="accountBlockTitle">
                ЗАДАЧИ
            </Div>
        </div>
        <div className="accountGradeTop">
            <Div style={{fontSize: "14px"}}>
                Топ класса
            </Div>
            <Div className="userTopElement">
                <AccountUserContainer number="1" name="Наташа Мазнова" level="20"/>
            </Div>
            <Div className="userTopElement">
                <AccountUserContainer number="2" name="Катя Стрёмная" level="20"/>
            </Div>
            <Div className="userTopElement">
                <AccountUserContainer number="3" name="Иван Пешехонов" level="20"/>
            </Div>
            <Div className="userTopElement">
                <span id="overPlace">Ты находишься на 6 месте</span>
            </Div>
        </div>
        <div className="accountImportantantNotifications">
            <Div className="accountBlockTitle">
                ВАЖНЫЕ УВЕДОМЛЕНИЯ
            </Div>
        </div>
        <Group className="lastNotificationsContainer">
            <span className="inversedTitle">
                ПОСЛЕДНИЕ СОБЫТИЯ
            </span>
            <div className="notification notificationTop">
                Володя Ржавый получил 5 за контрольную по уроку алгебра. Единственный в классе!
            </div>
            <div className="notification">
                Ирина Шикина достигла 10 уровня
            </div>
            <div className="notification">
                Твой класс получил рекордные 26 оценок за неделю. Из них 15 пятёрок!
            </div>
            <div className="notification notificationBottom">
                <Button level="tertiary" style={{margin: 0, padding: 0}}>
                    <span style={{fontSize: "15px", fontWeight: "700", color: "#fff"}}>
                        Подробнее
                    </span>
                </Button>
            </div>
        </Group>
    </Panel>
);

Account.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Account;