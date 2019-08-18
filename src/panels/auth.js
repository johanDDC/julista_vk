import {Div, Panel, PanelHeader, Link, Button} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

import AuthAccount from "../custom_components/icon-pack/AuthAccount"
import AuthPassword from "../custom_components/icon-pack/AuthPassword"
import AuthGift from "../custom_components/icon-pack/AuthGift"
import AuthRestore from "../custom_components/icon-pack/AuthRestore"

import CustomInput from "../custom_components/customInput"

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        }
    }

    btnBack = () => {
        this.props.setPanel("choose_diary")
    };

    buttonClick = () => {
        let login = document.getElementById("loginInput-i").value;
        let password = document.getElementById("passInput-i").value;
        let inviteCode = document.getElementById("inviteCodeInput-i").value;

        if (login.trim().length !== 0 && password.trim().length !== 0) {
            this.props.setSpinner(true);
            this.props.getProfile(login, password, this.props.profile.diary);

            let id = setInterval(() => {
                if (this.props.profile.error) {
                    clearInterval(id);
                    this.props.setSpinner(false);
                    if (this.props.profile.id instanceof Error) {
                        this.props.openError();
                    } else {
                        this.props.openIncorrect();
                    }
                    this.setState({error: true});
                } else {
                    if (this.props.profile.secret) {
                        clearInterval(id);
                        this.props.setSpinner(false);
                        if (this.props.profile.student === null) {
                            this.props.setPanel("choose_student");
                        } else {
                            this.props.setView("MainView", "account");
                        }
                    }
                }
            }, 200);
        }
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.btnBack}/>}>
                    Авторизация
                </PanelHeader>
                <div className="authGroup">
                    <Div className="welcome">
                        Добро пожаловать,
                    </Div>
                    <Div className="large_tip">
                        Войдите с помощью данных аккаунта mos.ru
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon">
                            <AuthAccount/>
                        </div>
                        <div className="inputInput">
                            <CustomInput id="loginInput"
                                         type="text"
                                         placeholder="Номер телефона или email"
                            />
                        </div>
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon">
                            <AuthPassword/>
                        </div>
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
                        <div className="inputIcon">
                            <AuthGift/>
                        </div>
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
                        <div className="inputIcon">
                            <AuthRestore/>
                        </div>
                        <span>Забыли данные учетной записи?
                                <Link
                                    href="https://google.com"
                                    target="_blank"
                                    className="restoreLink">Восстановить</Link>
                            </span>
                    </Div>
                    <Div>
                        <Button level="tertiary" className="getInButton"
                                onClick={this.buttonClick}>
                            {this.props.profile.diary === "netschool" ? "Указать школу" : "Войти"}
                        </Button>
                    </Div>
                </div>
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
    profile: PropTypes.any.isRequired,
    setView: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    setSpinner: PropTypes.func,
    openError: PropTypes.func.isRequired,
    openIncorrect: PropTypes.func.isRequired,
};

export default Auth;