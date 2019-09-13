import {Div, Panel, PanelHeader, Link, Button, Select, Spinner} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

import AuthAccount from "../custom_components/icon-pack/AuthAccount"
import AuthPassword from "../custom_components/icon-pack/AuthPassword"
import AuthGift from "../custom_components/icon-pack/AuthGift"
import AuthRestore from "../custom_components/icon-pack/AuthRestore"

import CustomInput from "../custom_components/customInput"

const axios = require('axios');

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            schools: null,
            provinces: null,
            cities: null,
            ready: false,
            netschoolSelector: (this.props.profile.diary === "netschool" ? <Spinner size="medium"/> : null),
            regions: <Spinner size="medium"/>
        };

        this.region = null;
        this.province = null;
        this.city = null;
        this.school = "";

        // this.netschoolChoose();
        this.drawRegionsSelector()
    }

    btnBack = () => {
        this.props.setPanel("choose_diary")
    };

    buttonClick = () => {
        let login = document.getElementById("loginInput-i").value;
        let password = document.getElementById("passInput-i").value;
        try {
            let inviteCode = document.getElementById("inviteCodeInput-i").value;
        } catch (e) {
            let inviteCode = "";
        }
        try {
            this.school = document.getElementById("schoolSelect").value;
        } catch (e) {
            this.school = ""
        }

        if (login.trim().length !== 0 && password.trim().length !== 0) {
            this.props.setSpinner(true);
            console.log("per data", login, password, this.props.profile.diary,
                this.region, this.province, this.city, this.school);
            this.props.getProfile(login, password, this.props.profile.diary,
                this.region, this.province, this.city, this.school);

            let id = setInterval(() => {
                if (this.props.profile.error) {
                    clearInterval(id);
                    this.props.setSpinner(false);
                    if (this.props.profile.id instanceof Error) {
                        this.props.openError();
                    } else {
                        if (this.props.profile.diary !== "netschool")
                            this.props.openUnsupported();
                        else
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
                            this.props.setView("MainView", "schedule");
                        }
                    }
                }
            }, 200);
        }
    };

    drawRegionsSelector = () => {
        let options = [];
        axios.get("https://bklet.ml/api/auth/get_data")
            .then(reg_resp => {
                reg_resp.data.data.forEach(reg => {
                    options.push(
                        <option value={reg.id}>{reg.name}</option>
                    )
                });
                this.setState({
                    regions:
                        <Select
                            id="regionSelect"
                            placeholder="Выберите ваш регион"
                            onChange={() => {
                                this.region = document.getElementById("regionSelect").value;
                                this.setState({
                                    provinces:
                                        <Spinner size="medium"/>
                                });
                                this.drawProvincesSelector();
                            }}
                        >
                            {options}
                        </Select>
                })
            })
    };
    drawProvincesSelector = () => {
        let options = [];
        axios.get("https://bklet.ml/api/auth/get_data/?region=" + this.region)
            .then(province_resp => {
                province_resp.data.data.forEach(province => {
                    options.push(
                        <option value={province.id}>{province.name}</option>
                    )
                });
                this.setState({
                    provinces:
                        <Select
                            id="provinceSelect"
                            placeholder="Выберите ваш район"
                            onChange={() => {
                                this.province = document.getElementById("provinceSelect").value;
                                this.setState({
                                    cities:
                                        <Spinner size="medium"/>
                                });
                                this.drawCitiesSelector();
                            }}
                        >
                            {options}
                        </Select>
                });
            })
    };
    drawCitiesSelector = () => {
        let options = [];
        axios.get(`https://bklet.ml/api/auth/get_data/?region=${this.region}&province=${this.province}`)
            .then(city_resp => {
                city_resp.data.data.forEach(city => {
                    options.push(
                        <option value={city.id}>{city.name}</option>
                    )
                });
                console.log("lalalala", options);
                this.setState({
                    cities:
                        <Select
                            id="citySelect"
                            placeholder="Выберите ваш город"
                            onChange={() => {
                                this.city = document.getElementById("citySelect").value;
                                this.setState({
                                    schools:
                                        <Spinner size="medium"/>
                                });
                                this.drawSchoolsSelector();
                            }}
                        >
                            {options}
                        </Select>
                });
            })
    };
    drawSchoolsSelector = () => {
        let options = [];
        axios.get(`https://bklet.ml/api/auth/get_data/?region=${this.region}&province=${this.province}&city=${this.city}`)
            .then(school_resp => {
                school_resp.data.data.forEach(school => {
                    let name = school.name.replace("МБОУ ", "");
                    name = name.replace("НОУ ", "");
                    name = name.replace("ЧОУ ", "");
                    name = name.replace("ГКОУКО ", "");
                    name = name.replace("ГКУ ", "");
                    name = name.replace("ГБУКО ", "");
                    name = name.replace("ГКУКО ", "");
                    name = name.replace("АНО ", "");
                    name = name.replace("СОШ", "Школа");
                    name = name.replace("\"Средняя общеобразовательная школа",
                        "Школа").replace("\"", "");
                    options.push(
                        <option value={school.id}>{name}</option>
                    )
                });
                console.log("lalalala", options);
                this.setState({
                    schools:
                        <Select
                            id="schoolSelect"
                            placeholder="Выберите вашу школу"
                            onChange={() => {
                                this.school = document.getElementById("schoolSelect").value;
                            }}
                        >
                            {options}
                        </Select>
                });
            })
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
                        Войдите с помощью данных аккаунта вашего дневника
                    </Div>
                    <Div className="inputContainer">
                        <div className="inputIcon">
                            <AuthAccount/>
                        </div>
                        <div className="inputInput">
                            <CustomInput id="loginInput"
                                         type="text"
                                         placeholder="Логин"
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
                    {(this.props.profile.diary === "netschool" ?
                        <Div>
                            {this.state.regions}
                        </Div>
                        : null)}
                    {(this.state.provinces ?
                        <Div>
                            {this.state.provinces}
                        </Div>
                        : null)}
                    {(this.state.cities ?
                        <Div>
                            {this.state.cities}
                        </Div>
                        : null)}
                    {(this.state.schools ?
                        <Div>
                            {this.state.schools}
                        </Div>
                        : null)}
                    {/*<Div>*/}
                    {/*    <span*/}
                    {/*        className="medium_tip">Введите код приглашения, при его наличии, или оставьте поле пустым</span>*/}
                    {/*</Div>*/}
                    {/*<Div className="inviteInput">*/}
                    {/*    <div className="inputIcon">*/}
                    {/*        <AuthGift/>*/}
                    {/*    </div>*/}
                    {/*    <CustomInput id="inviteCodeInput"*/}
                    {/*                 type="text"*/}
                    {/*    />*/}
                    {/*</Div>*/}
                    <Div>
            <span className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших персональных данных.
                <br/>
                <Link href="https://docs.google.com/document/d/1BjSTb_bgwHermREHdZlcwTDf6WowADiHIrjcDSC24OI"
                      target="_blank">Регламент</Link> и <Link
                    href="https://docs.google.com/document/d/1Pt5dvKHB8404oGnpd8rVi7yVmsjM5P0hIPBV9FnrQuQ"
                    target="_blank">политика конфиденциальности</Link></span>
                    </Div>
                    {/*<Div className="restorePassword">*/}
                    {/*    <div className="inputIcon" style={{margin: 0}}>*/}
                    {/*        <AuthRestore/>*/}
                    {/*    </div>*/}
                    {/*    <div>Забыли данные учетной записи?*/}
                    {/*            <Link*/}
                    {/*                href="https://google.com"*/}
                    {/*                target="_blank"*/}
                    {/*                className="restoreLink">Восстановить</Link>*/}
                    {/*        </div>*/}
                    {/*</Div>*/}
                    <Div>
                        <Button level="tertiary" className="getInButton"
                                onClick={this.buttonClick}>
                            Войти
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
    openUnsupported: PropTypes.func,
};

export default Auth;