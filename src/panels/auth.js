import {Div, Group, HeaderButton, Panel, PanelHeader, Link, Button, osname, IOS, Input} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import "./styles/auth.css"

import {auth} from "../utils/api"
import CustomInput from "../custom_components/customInput"

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            inviteCode: "",
        };
    }

    btnBack = () => {
        this.props.setPanel("choose_diary")
    };

    buttonClick = async () => {
        await this.props.setSpinner(true); //FIXME spinner doesn`t work
        await this.setState({
            login: document.getElementById("loginInput-i").value,
            password: document.getElementById("passInput-i").value,
            inviteCode: document.getElementById("inviteCodeInput-i").value,
        });
        if (this.state.login.trim() !== "" && this.state.password.trim() !== "") {
            let userSecret;
            let userId;

            let req = auth(this.state.login, this.state.password, this.props.diary);
            console.log("req", req);
            if (req) {
                if (req.status) {
                    userSecret = req.secret;
                    userId = req.id;

                    this.props.setId(userId);
                    this.props.setSecret(userSecret);
                    this.props.setSpinner(false);
                    this.props.setView("MainView", "account");
                } else {
                    this.props.setSpinner(false);
                    // Неверный логин или пароль
                }
            } else {
                this.props.setSpinner(false);
                // Вообще левая ошибка
            }
        }
        this.props.setSpinner(false);
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                             left={<HeaderButton onClick={this.btnBack}>{osname === IOS ?
                                 <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
                    Авторизация
                </PanelHeader>
                <Group className="authGroup">
                    <Div className="welcome">
                        Добро пожаловать,
                    </Div>
                    <Div className="large_tip">
                        Войдите с помощью данных аккаунта mos.ru
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon"></div>
                        <div className="inputInput">
                            <CustomInput id="loginInput"
                                         type="text"
                                         placeholder="Номер телефона или email"
                            />
                        </div>
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon"></div>
                        <div className="inputInput">
                            <CustomInput id="passInput"
                                         type="password"
                                         placeholder="Пароль"
                            />
                        </div>
                    </Div>
                    <Div>
                        <span
                            className="medium_tip">Введите код приглашения, при его наличии, или оставьте поле пустым</span>
                    </Div>
                    <Div className="inviteInput">
                        <CustomInput id="inviteCodeInput"
                                     type="text"
                        />
                    </Div>
                    <Div>
            <span className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших персональных данных.
                <br/>
                <Link href="https://google.com" target="_blank">Регламент</Link> и <Link href="https://google.com"
                                                                                         target="_blank">политика конфиденциальности</Link></span>
                    </Div>
                    <Div className="restorePassword">
                        <span>Забыли данные учетной записи?</span>
                        <Link
                            href="https://google.com"
                            target="_blank"
                            className="restoreLink">Восстановить</Link>
                    </Div>
                    <Div>
                        <Button level="tertiary" className="getInButton"
                                onClick={this.buttonClick}>
                            Войти
                        </Button>
                    </Div>
                </Group>
            </Panel>
        )
    }

}

Auth.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
    diary: PropTypes.string.isRequired,
    setSecret: PropTypes.func.isRequired,
    setId: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
    setSpinner: PropTypes.func
};

export default Auth;