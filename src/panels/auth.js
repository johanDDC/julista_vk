import {Avatar, Div, Group, Input, ListItem, Panel, PanelHeader} from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user_outline';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

const Auth = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader className='header_color'>Авторизация</PanelHeader>
        {fetchedUser &&
        <Group title="User Data Fetched with VK Connect">
            <ListItem
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
            >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </ListItem>
        </Group>}

        <Group>
            <Div className="welcome">
                Добро пожаловать!
            </Div>
            <Div className="large_tip">
                Войдите с помощью данных аккаунта mos.ru
            </Div>
            <Div className="medium_tip">
                Номер телефона или email
            </Div>
            <Div className="field">
                <Icon24UserOutline />
                <Input top="Мобильный телефон" type="text"/>
            </Div>
            <Div className="medium_tip">
                Пароль
            </Div>
            <Div className="field">
                <Icon24MarketOutline />
                <Input type="text"/>
            </Div>
            <Div className="small_tip"></Div>
        </Group>
    </Panel>
);

Auth.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Auth;