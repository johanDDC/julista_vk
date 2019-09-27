import {Div, Panel, PanelHeader, Link, Button, Select, Spinner, SelectMimicry} from '@vkontakte/vkui';
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
            regions: <Spinner size="medium"/>,

            choosenSchool: this.props.stateData ? this.props.stateData : null,
        };

        this.region = null;
        this.province = null;
        this.city = null;

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

        if (login.trim().length !== 0 && password.trim().length !== 0) {
            this.props.setSpinner(true);
            console.log("per data", login, password, this.props.profile.diary,
                this.region, this.province, this.city, this.state.choosenSchool[0]);
            this.props.getProfile(login, password, this.props.profile.diary,
                this.region, this.province, this.city, this.state.choosenSchool[0]);

            let id = setInterval(() => {
                if (this.props.profile.error) {
                    clearInterval(id);
                    this.props.setSpinner(false);
                    if (this.props.profile.errMessage instanceof Error) {
                        this.props.openIncorrect();
                    } else {
                        this.props.openError(this.props.profile.errMessage);
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
                            value={this.props.stateData[3]}
                            onChange={() => {
                                this.region = document.getElementById("regionSelect").value;
                                this.setState({
                                    cities: null,
                                    schools: null,
                                    choosenSchool: null,
                                    provinces:
                                        <Spinner size="medium"/>
                                });
                                this.drawProvincesSelector(this.props.stateData[4]);
                            }}
                        >
                            {options}
                        </Select>
                });
                if (this.props.stateData[3]) {
                    this.region = document.getElementById("regionSelect").value;
                    this.drawProvincesSelector(this.props.stateData[4]);
                }
            })
    };
    drawProvincesSelector = (defaultVal) => {
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
                            value={defaultVal && defaultVal}
                            onChange={() => {
                                this.province = document.getElementById("provinceSelect").value;
                                this.setState({
                                    schools: null,
                                    choosenSchool: null,
                                    cities:
                                        <Spinner size="medium"/>
                                });
                                this.drawCitiesSelector(this.props.stateData[5]);
                            }}
                        >
                            {options}
                        </Select>
                });
                if (defaultVal) {
                    this.province = document.getElementById("provinceSelect").value;
                    this.drawCitiesSelector(this.props.stateData[5]);
                }
            })
    };
    drawCitiesSelector = (defaultVal) => {
        let options = [];
        axios.get(`https://bklet.ml/api/auth/get_data/?region=${this.region}&province=${this.province}`)
            .then(city_resp => {
                city_resp.data.data.forEach(city => {
                    options.push(
                        <option value={city.id}>{city.name}</option>
                    )
                });
                this.setState({
                    cities:
                        <Select
                            id="citySelect"
                            placeholder="Выберите ваш город"
                            value={defaultVal && defaultVal}
                            onChange={() => {
                                this.city = document.getElementById("citySelect").value;
                                this.setState({
                                    schools:
                                        <Spinner size="medium"/>,
                                    choosenSchool: null,
                                });
                                this.drawSchoolsSelector();
                            }}
                        >
                            {options}
                        </Select>
                });
                if (defaultVal) {
                    this.city = document.getElementById("citySelect").value;
                    this.drawSchoolsSelector();
                }
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
                        {id: school.id, name: name}
                    )
                });
                console.log("state", this.props.stateData);
                this.setState({
                    schools:
                        <SelectMimicry
                            top="Выберите вашу школу"
                            placeholder="Не выбрана"
                            onClick={() => {
                                let data = [
                                    options,
                                    document.getElementById("loginInput-i").value,
                                    document.getElementById("passInput-i").value,
                                    this.region,
                                    this.province,
                                    this.city,
                                ];
                                this.props.setPanel("choose_school", data);
                            }}
                        >
                            {this.state.choosenSchool ? this.state.choosenSchool[1] : "Выберите вашу школу"}
                        </SelectMimicry>
                });
            })
    };

    componentDidMount() {
        console.log("id", this.props.profile);
        if (this.props.profile.id) {
            this.props.openModal();
        }
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    left={
                        <PanelHeaderBack onClick={this.btnBack}/>
                    }
                    noShadow={true}>
                    Авторизация
                </PanelHeader>
                <Div className="authGroup">
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
                                         value={this.props.stateData[1] && this.props.stateData[1]}
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
                                         value={this.props.stateData[2] && this.props.stateData[2]}
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
                    {/*    <div*/}
                    {/*        className="medium_tip">Введите код приглашения, при его наличии, или оставьте поле пустым</div>*/}
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
                        <div className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших
                            персональных данных.
                            <br/>
                            <Link
                                href="https://vk.com/dev/uprivacy"
                                target="_blank">Политика конфиденциальности</Link>
                        </div>
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
                        <Button level="tertiary" className="authSignInButton"
                                onClick={this.buttonClick}>
                            Войти
                        </Button>
                    </Div>
                </Div>
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
    openModal: PropTypes.func,
    stateData: PropTypes.array,
};

export default Auth;