import {Button, Div, Link, Panel, PanelHeader, Select, SelectMimicry, Spinner} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

import AuthAccount from "../custom_components/icon-pack/AuthAccount"
import AuthPassword from "../custom_components/icon-pack/AuthPassword"

import CustomInput from "../custom_components/layouts/auth/CustomInput"
import {PanelProps} from "../utils/Props";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {switchPanelAction, switchViewAction} from "../redux/actions/AppPresentation";
import {getCities, getProvinces, getRegions, getSchools, inputLogin, inputPassword} from "../redux/actions/AuthValues";
import {auth, getAuthData} from "../utils/Requests";
import {completeAuth} from "../redux/actions/Profile";

interface Props extends PanelProps {
    login: string,
    password: string,
    inputLogin: (login: string) => void,
    inputPassword: (password: string) => void,
    diary: string,

    region: null | number,
    province: null | number,
    city: null | number,
    school: null | number,

    getRegions: (regions: Array<React.ReactChild>) => void,
    getProvinces: (provinces: Array<React.ReactChild>) => void,
    getCities: (cities: Array<React.ReactChild>) => void,
    getSchools: (schools: Array<React.ReactChild>) => void,

    showSpinner: (switcher: boolean) => void
    completeAuth: (auth_data: {}) => void
    alertError: (message: string) => void
    switchView: (view: string, panel: string) => void
}


class Auth extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        // this.drawRegionsSelector()
    }

    btnBack = () => {
        this.props.switchPanel("choose_diary");
    };

    buttonClick = () => {
        // @ts-ignore
        let login = document.getElementById("loginInput-i").value;
        // @ts-ignore
        let password = document.getElementById("passInput-i").value;
        // try {
        //     // @ts-ignore
        //     let inviteCode = document.getElementById("inviteCodeInput-i").value;
        // } catch (e) {
        //     let inviteCode = "";
        // }

        if (login.trim().length !== 0 && password.trim().length !== 0) {
            this.props.showSpinner(true);
            auth(
                this.props.login,
                this.props.password,
                this.props.diary,
                this.props.region,
                this.props.province,
                this.props.city,
                this.props.school
            ).then((data: {}) => {
                    this.props.completeAuth(data);
                    this.props.switchView("main", "schedule");
                }
            ).catch((message: string) =>
                this.props.alertError(message)
            );
        }
    };

    drawSelectorComponent = (
        type: string,
        description: string,
        stateData: string,
        options: [],
        changeFunc: (args?: any) => void
    ) => {
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

    /*
    drawRegionsSelector = () => {
        let options: Array<React.ReactChild> = [];
        getAuthData()
            .then(data => {
                console.log(data);
                data.forEach(reg => {
                    options.push(
                        <option value={reg.id}>{reg.name}</option>
                    )
                });
        this.props.getRegions(options);

                // this.setState({
                //     regions:
                //         this.drawSelectorComponent(
                //             "region",
                //             "регион",
                //             this.props.stateData[3],
                //             options,
                //             () => {
                //                 this.region = document.getElementById("regionSelect").value;
                //                 this.setState({
                //                     cities: null,
                //                     schools: null,
                //                     choosenSchool: null,
                //                     provinces:
                //                         <Spinner size="medium"/>
                //                 });
                //                 this.drawProvincesSelector(this.props.stateData[4]);
                //             }
                //         )
                // });

                if (this.props.stateData[3]) {
                    this.region = document.getElementById("regionSelect").value;
                    this.drawProvincesSelector(this.props.stateData[4]);
                }
            });
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
                this.setState({
                    schools:
                        <SelectMimicry
                            top="Выберите вашу школу"
                            placeholder="Не выбрана"
                            onClick={() => {
                                // @ts-ignore
                                // @ts-ignore
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
    */

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
                                         value={this.props.login}
                                         onChange={this.props.inputLogin}
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
                                         value={this.props.password}
                                         onChange={this.props.inputPassword}
                            />
                        </div>
                    </Div>
                    {/*
                    {(this.props.profile.diary === "netschool" ?
                        <Div>
                            {
                                this.drawSelectorComponent()
                            }
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
                        */}
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

const mapStateToProps = (state: any) => {
    return {
        login: state.authValues.login,
        password: state.authValues.password,
        region: state.authValues.region,
        province: state.authValues.province,
        city: state.authValues.city,
        school: state.authValues.school,

        diary: state.profile.diary,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        inputLogin: (login: string) => dispatch(inputLogin(login)),
        inputPassword: (password: string) => dispatch(inputPassword(password)),

        getRegions: (regions: Array<React.ReactChild>) => dispatch(getRegions(regions)),
        getProvinces: (provinces: Array<React.ReactChild>) => dispatch(getProvinces(provinces)),
        getCities: (cities: Array<React.ReactChild>) => dispatch(getCities(cities)),
        getSchools: (schools: Array<React.ReactChild>) => dispatch(getSchools(schools)),

        switchPanel: (panel: string) => dispatch(switchPanelAction(panel)),
        switchView: (view: string, panel: string) => dispatch(switchViewAction(view, panel)),

        completeAuth: (authData: {}) => dispatch(completeAuth(authData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
