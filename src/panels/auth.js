import {Div, Panel, PanelHeader, Link, Button, Select, Spinner, SelectMimicry} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

import AuthAccount from "../custom_components/icon-pack/AuthAccount"
import AuthPassword from "../custom_components/icon-pack/AuthPassword"

import CustomInput from "../custom_components/layouts/auth/customInput"
import {getAuthData} from "../utils/requests";

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

            choosenSchool: this.props.stateData.length !== 0 ? this.props.stateData[6] : "",
        };

        this.region = null;
        this.province = null;
        this.city = null;

        this.drawRegionsSelector()
    }

    componentDidMount() {
        if (this.props.profile.id) {
            this.props.openModal();
        }
    }

    btnBack = () => {
        this.props.setPanel("choose_diary");
    };

    buttonClick = () => {
        let login = document.getElementById("loginInput-i").value;
        let password = document.getElementById("passInput-i").value;

        if (login.trim().length !== 0 && password.trim().length !== 0) {
            this.props.setSpinner(true);
            this.props.getProfile(login, password, this.props.profile.diary,
                this.region, this.province, this.city, this.state.choosenSchool[0])
                .then(result => {
                    this.props.setSpinner(false);
                    console.log("long promise chain result", result);
                    if (result.student === null) {
                        this.props.setPanel("choose_student");
                    } else {
                        this.props.setView("MainView", "schedule");
                    }
                })
                .catch(err => {
                    if (err instanceof Error)
                        this.props.openError("Непредвиденная ошибка. Пожалуйста, попробуйте позже.");
                    else
                        this.props.openError(err);
                });
        }
    };

    drawSelectorComponent = (type, description, stateData, options, changeFunc) => {
        return (
            <Select
                id={type + "Select"}
                placeholder={`Выберите ваш ${description}`}
                value={stateData}
                onChange={changeFunc}
            >
                {options}
            </Select>
        );
    };

    drawRegionsSelector = () => {
        let options = [];
        getAuthData()
            .then(data => {
                console.log(data);
                data.forEach(reg => {
                    options.push(
                        <option value={reg.id}>{reg.name}</option>
                    )
                });

                this.setState({
                    regions:
                        this.drawSelectorComponent(
                            "region",
                            "регион",
                            this.props.stateData[3],
                            options,
                            () => {
                                this.region = document.getElementById("regionSelect").value;
                                this.setState({
                                    cities: null,
                                    schools: null,
                                    choosenSchool: null,
                                    provinces:
                                        <Spinner size="medium"/>
                                });
                                this.drawProvincesSelector(this.props.stateData[4]);
                            }
                        )
                });

                if (this.props.stateData[3]) {
                    this.region = document.getElementById("regionSelect").value;
                    this.drawProvincesSelector(this.props.stateData[4]);
                }
            });
    };
    drawProvincesSelector = (defaultVal) => {
        let options = [];
        getAuthData(this.region)
            .then(data => {
                data.forEach(reg => {
                    options.push(
                        <option value={reg.id}>{reg.name}</option>
                    )
                });
                this.setState({
                    provinces:
                        this.drawSelectorComponent(
                            "province",
                            "район",
                            defaultVal,
                            options,
                            () => {
                                this.province = document.getElementById("provinceSelect").value;
                                this.setState({
                                    schools: null,
                                    choosenSchool: null,
                                    cities:
                                        <Spinner size="medium"/>
                                });
                                this.drawCitiesSelector(this.props.stateData[5]);
                            }
                        )
                });

                if (defaultVal) {
                    this.province = document.getElementById("provinceSelect").value;
                    this.drawCitiesSelector(this.props.stateData[5]);
                }
            });
    };
    drawCitiesSelector = (defaultVal) => {
        let options = [];
        getAuthData(this.region, this.province)
            .then(data => {
                data.forEach(reg => {
                    options.push(
                        <option value={reg.id}>{reg.name}</option>
                    )
                });
                this.setState({
                    cities:
                        this.drawSelectorComponent(
                            "city",
                            "город",
                            defaultVal,
                            options,
                            () => {
                                this.city = document.getElementById("citySelect").value;
                                this.setState({
                                    schools:
                                        <Spinner size="medium"/>,
                                    choosenSchool: null,
                                });
                                this.drawSchoolsSelector();
                            }
                        )
                });

                if (defaultVal) {
                    this.city = document.getElementById("citySelect").value;
                    this.drawSchoolsSelector();
                }
            });
    };
    drawSchoolsSelector = () => {
        let options = [];
        getAuthData(this.region, this.province, this.city)
            .then(data => {
                data.forEach(school => {
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
                    <Div>
                        <div className="annotate">Нажимая войти, вы соглашаетесь на обработку, хранение, передачу ваших
                            персональных данных.
                            <br/>
                            <Link
                                href="https://vk.com/dev/uprivacy"
                                target="_blank">Политика конфиденциальности</Link>
                        </div>
                    </Div>
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
    profile: PropTypes.any.isRequired,
    setView: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    setSpinner: PropTypes.func,
    openError: PropTypes.func.isRequired,
    openModal: PropTypes.func,
    stateData: PropTypes.array,
};

export default Auth;