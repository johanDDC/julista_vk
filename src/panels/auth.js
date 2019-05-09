import {Div, Group, Input, Panel, PanelHeader, Link} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

const Auth = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader className='header_color'>Авторизация</PanelHeader>
        <Group className="authGroup">
            <Div className="welcome">
                Добро пожаловать!
            </Div>
            <Div className="large_tip">
                Войдите с помощью данных аккаунта mos.ru
            </Div>
            <Div className="inputContainer">
                <div className="inputIcon"></div>
                <div className="inputInput">
                    <p className="medium_tip">Номер телефона или email</p>
                    <Input type="text"/>
                </div>
            </Div>
            <Div className="inputContainer">
                <div className="inputIcon"></div>
                <div className="inputInput">
                    <p className="medium_tip">Пароль</p>
                    <Input type="text"/>
                </div>
            </Div>
            <Div>
                <span className="medium_tip">Введите код приглашения, при его наличии, или оставьте поле пустым</span>
            </Div>
            <Div className="inviteInput">
                <div></div>
                <div>
                    <Input type="text"/>
                </div>
            </Div>
            <Div>
            <span className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших персональных данных.
                <br/>
                <Link href="https://google.com" target="_blank">Регламент</Link> и <Link href="https://google.com" target="_blank">политика конфиденциальности</Link></span>
            </Div>
            <Div id="buttonContainer">
                <button id="getIn">Войти</button>
            </Div>
            <Div className="restorePassword">
                <span>Забыли данные учетной записи?</span>
                <Link href="https://google.com" target="_blank" className="restoreLink">Восстановить</Link>
            </Div>
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