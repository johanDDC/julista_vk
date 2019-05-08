import {Avatar, Div, Group, Input, ListItem, Panel, PanelHeader, PanelHeaderContent, InfoRow, Progress} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

import DropdownIcon from "../custom_components/icon-pack/DropdownIcon"
import LevelCircle from "../custom_components/levelCircle"

const Account = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader id="accountHeader"
                     noShadow={true}
                     left={<Div id="studentInfo"><span id="studentName">Иван Пешехонов <DropdownIcon size="13"/></span><span id="studentGrade">11 класс</span></Div>}>
        </PanelHeader>
        <div className="blueBack">
        </div>
        <Div className="accountProgress">
            <LevelCircle color="rgb(86 144 255)" outline_color="rgba(86, 144, 255, 0.5)" val="11"/>
            <InfoRow title="Уровень" style={{alignSelf: "flex-end"}}>
                <Progress value={90} />
            </InfoRow>
        </Div>
        <Group>

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