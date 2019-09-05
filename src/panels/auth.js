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
            ready: false,
            netschoolSelector: (this.props.profile.diary === "netschool" ? <Spinner size="medium"/> : null),
        };

        this.region = "";
        this.province = "";
        this.city = "";
        this.school = "";

        this.netschoolChoose();
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

    netschoolChoose = () => {
        let regionId;
        let provinceId;
        let cityId;
        let getMetaData = (data) => {
            const members = data.data.response.GeoObjectCollection.featureMember;
            if (members) {
                let components = members[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                console.log("com", components);
                for (let component of components) {
                    if (component.kind === 'province') {
                        this.region = component.name;
                    } else if (component.kind === 'area') {
                        this.province = component.name;
                    } else if (component.kind === 'locality') {
                        this.city = component.name;
                    }
                }
                console.log("metaData", this.region, this.province, this.city)
            }
        };
        let parseData = () => {
            axios.get("https://bklet.ml/api/auth/get_data")
                .then(reg_resp => {
                    reg_resp.data.data.forEach(reg => {
                        if (reg.name === this.region)
                            regionId = reg.id;
                        if (reg.name === this.province)
                            regionId = reg.id;
                        if (reg.name === this.city)
                            regionId = reg.id;

                        if (this.region === "Санкт-Петербург" && reg.name === "Санкт-Петербург (Лицей ФТШ)")
                            regionId = reg.id
                    });
                    console.log("regionId", regionId);
                    axios.get("https://bklet.ml/api/auth/get_data/?region=" + regionId)
                        .then(province_resp => {
                            province_resp.data.data.forEach(province => {
                                if (province.name.toLowerCase() === this.province.toLowerCase() || province.name.toLowerCase() === "все")
                                    provinceId = province.id;
                            });
                            console.log("provinceId", provinceId);
                            axios.get(`https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}`)
                                .then(city_resp => {
                                    console.log("this city", this.city);
                                    city_resp.data.data.forEach(city => {
                                        console.log(city.name);
                                        if (city.name.toLowerCase().substring(0, city.name.length - 4) === this.city.toLowerCase() ||
                                            city.name.toLowerCase() === this.city.toLowerCase())
                                            cityId = city.id;
                                    });
                                    console.log("cityId", cityId);
                                    axios.get(`https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}&city=${cityId}`)
                                        .then(school_resp => {
                                            console.log("schools", `https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}&city=${cityId}`);
                                            this.region = regionId;
                                            this.province = provinceId;
                                            this.city = cityId;
                                            this.setState({
                                                schools: school_resp.data.data,
                                                ready: true,
                                            });
                                        })
                                })
                        })
                        .catch(err => {
                            this.setState({
                                netschoolSelector:
                                    (<span style={{color: "#ef464d", fontSize: "16px"}}>
                                            К сожалению в вашем регионе пока нет подключеных к дневнику школ.
                                        </span>)
                            });
                            console.log("school determination error", err);
                        });
                })
                .catch(err => {
                    this.setState({
                        netschoolSelector:
                            (<span style={{color: "#ef464d", fontSize: "16px"}}>
                                            К сожалению в вашем регионе пока нет подключеных к дневнику школ.
                                        </span>)
                    });
                    console.log("school determination error", err);
                });
        };
        if (this.props.profile.diary !== "netschool") {
            return null;
        } else {
            window.ymaps.ready(() => {
                let geolocation = window.ymaps.geolocation;
                let position;
                geolocation.get({
                    provider: 'yandex',
                    mapStateAutoApply: true
                }).then((result) => {
                    position = result.geoObjects.position;
                    axios.get("https://geocode-maps.yandex.ru/1.x/?format=json&apikey=fbc15a57-6801-4993-9d23-9b313b0f3ad1&geocode=" +
                        position[1].toPrecision(6) + "," + position[0].toPrecision(6))
                        .then(resp => {
                            console.log("geolocation resp", resp);
                            getMetaData(resp);
                            parseData();
                            let id = setInterval(() => {
                                if (this.state.ready) {
                                    console.log(this.region, "\n", this.province, "\n", this.city);
                                    console.log(this.state.schools);
                                    clearInterval(id);

                                    if (this.state.schools.length === 0) {
                                        console.log("empty schools");
                                        this.setState({
                                            netschoolSelector:
                                                (<span style={{color: "#ef464d", fontSize: "16px"}}>
                                            К сожалению в вашем регионе пока нет подключеных к дневнику школ.
                                        </span>)
                                        });
                                    } else {
                                        let options = [];
                                        this.state.schools.forEach(school => {
                                            options.push(
                                                <option value={school.id}>{school.name}</option>
                                            )
                                        });
                                        this.setState({
                                            netschoolSelector:
                                                (<Select
                                                    id="schoolSelect"
                                                    placeholder="выберите вашу школу"
                                                    >
                                                    {options}
                                                </Select>)
                                        });
                                    }
                                }
                            }, 200);
                        })
                })
                    .catch(err => {
                        console.log("geo getting error");
                        this.setState({
                            netschoolSelector:
                                (<span style={{color: "#ef464d", fontSize: "16px"}}>
                                    К сожалению в вашем регионе пока нет подключеных к дневнику школ.
                                </span>)
                        });
                    });
            });
            console.log("result", this.state.netschoolSelector);
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
                        Войдите с помощью данных аккаунта вашего дневника
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
                        {this.state.netschoolSelector}
                    </Div>
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
                            {this.props.profile.diary === "netschool" ? "Указать город" : "Войти"}
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