import {FixedLayout , Div, Group, Button, Panel, PanelHeader, InfoRow, Progress} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import DropdownIcon from "../custom_components/icon-pack/DropdownIcon"
import LevelCircle from "../custom_components/levelCircle"
import AccountUserContainer from "../custom_components/accountUserContainer"

const Account = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader id="accountHeader"
                     noShadow={true}
                     left={<Div id="studentInfo"><span id="studentName">Иван Пешехонов
                         <Button level="tertiary" style={{margin: 0, padding: 0}}><DropdownIcon size="13"/></Button>
                     </span><span id="studentGrade">11 класс</span></Div>}>
        </PanelHeader>
        <FixedLayout vertical="top">
            <div className="blueBack">
            </div>
            <Div className="accountProgress">
                <LevelCircle color="rgb(86 144 255)" outline_color="rgba(86, 144, 255, 0.5)" val="11"/>
                <InfoRow title="Уровень" id="progressBar">
                    <Progress value={90} />
                </InfoRow>
            </Div>
        </FixedLayout>
        <Div className="successContainer">
                <span id="successTitleContainer">Текущая успеваемость</span>
                <span id="successVal">Высокая</span>
        </Div>
        <Div className="title">
            ЗАДАЧИ
        </Div>
        <Div className="title">
            ТОП КЛАССА
        </Div>
        <Div className="userTopElement">
            <AccountUserContainer number="1" name="Иван Пешехонов" level="20"/>
        </Div>
        <Div className="userTopElement">
            <AccountUserContainer number="2" name="Наташа Мазнова" level="20"/>
        </Div>
        <Div className="userTopElement">
            <AccountUserContainer number="3" name="Рита-везде-побрита" level="20"/>
        </Div>
        <Div className="userTopElement">
            <span id="overPlace">Ты находишься на 6 месте</span>
        </Div>
        <Div className="title">
            ВАЖНЫЕ УВЕДОМЛЕНИЯ
        </Div>
        <Group className="lastNotificationsContainer">
            <span className="inversedTitle">
                ПОСЛЕДНИЕ СОБЫТИЯ
            </span>
            <div className="notification notificationTop">
                Володя Ржавый получил 5 за контрольную по уроку алгебра. Единственный в классе!
            </div>
            <div className="notification">
                Володя Ржавый получил 5 за контрольную по уроку алгебра. Единственный в классе!
            </div>
            <div className="notification">
                Володя Ржавый получил 5 за контрольную по уроку алгебра. Единственный в классе!
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
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
};

export default Account;