import {Avatar, Div, Group, Input, ListItem, Panel, PanelHeader, PanelHeaderContent} from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user_outline';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import PropTypes from "prop-types";
import React from "react";
import "./styles/account.css"

const Account = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader id="accountHeader" className='header_color'>
            <PanelHeaderContent
                before={<Avatar size={40} src="https://sun9-5.userapi.com/c834100/v834100961/4f8f1/hjsBzq433co.jpg?ava=1" />}
                onClick={() => {}}
                className='header'
            >
                Аккаунт
            </PanelHeaderContent>
        </PanelHeader>
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