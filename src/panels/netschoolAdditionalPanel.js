import {Select, Panel, Button, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/netschoolAdditional.css"
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

const axios = require('axios');

class NetschoolMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            schools: null,
            isButtonSpawned: false
        };

        this.map = null;
        this.region = null;
        this.province = null;
        this.city = null;
        this.school = null;
    }

    btnBack = () => {
        this.props.setPanel("auth")
    };

    getMetaData = (data) => {
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
        }
    };

    parseData = () => {
        let regionId;
        let provinceId;
        let cityId;
        axios.get("https://bklet.ml/api/auth/get_data")
            .then(reg_resp => {
                reg_resp.data.data.forEach(reg => {
                    if (reg.name === this.region)
                        regionId = reg.id;
                });
                axios.get("https://bklet.ml/api/auth/get_data/?region=" + regionId)
                    .then(province_resp => {
                        province_resp.data.data.forEach(province => {
                            if (province.name.toLowerCase() === this.province.toLowerCase())
                                provinceId = province.id;
                        });
                        axios.get(`https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}`)
                            .then(city_resp => {
                                city_resp.data.data.forEach(city => {
                                    if (city.name.toLowerCase().substring(0, city.name.length - 4) === this.city.toLowerCase())
                                        cityId = city.id;
                                });
                                console.log("regions", `https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}&city=${cityId}`);
                                axios.get(`https://bklet.ml/api/auth/get_data/?region=${regionId}&province=${provinceId}&city=${cityId}`)
                                    .then(school_resp => {
                                        this.region = regionId;
                                        this.province = provinceId;
                                        this.city = cityId;
                                        this.setState({
                                            "schools": school_resp.data.data,
                                            "ready": true,
                                        });
                                    })
                            })
                    })
            })
            .catch(err => console.log(err));
    };

    setMap = () => {
        window.ymaps.ready(() => {
            let geolocation = window.ymaps.geolocation;
            let position;
            geolocation.get({
                provider: 'yandex',
                mapStateAutoApply: true
            }).then((result) => {
                position = result.geoObjects.position;
                if (this.map === null) {
                    this.map = new window.ymaps.Map("netschoolMap", {
                        center: [position[0], position[1]],
                        zoom: 7,
                        controls: ['zoomControl']
                    });
                    this.map.behaviors.enable(['drag']);

                    this.map.events.add('click', (e) => {
                        var coords = e.get('coords');
                        console.log("click-click", coords);
                        axios.get("https://geocode-maps.yandex.ru/1.x/?format=json&apikey=fbc15a57-6801-4993-9d23-9b313b0f3ad1&geocode=" +
                            coords[1].toPrecision(6) + "," + coords[0].toPrecision(6))
                            .then(resp => {
                                console.log("click", resp);
                                this.getMetaData(resp);
                                this.parseData();
                                console.log(this.region, this.province, this.city);
                                if (!this.isButtonSpawned)
                                    this.drawSelector()
                            })
                            .catch(err => {
                                console.log("click error");
                            })
                    });
                }
            })
                .catch(err => {
                    console.log("geo getting error")
                });
        });
    };

    drawSelector = () => {
        let options = [];
        this.state.schools.forEach(school => {
            options.push(
                <option value={school.id}>{school.name}</option>
            )
        });
        return (
            <Select className="schoolSelect"
                    id="schoolSelect"
                    placeholder="выберите вашу школу"
                    onChange={this.drawButton}>
                {options}
            </Select>
        )
    };

    drawButton = () => {
        this.school = document.getElementById("schoolSelect").value;
        this.setState({isButtonSpawned: true});
        console.log("netshcoolData",
            this.region,
            this.province,
            this.city,
            this.school)
    };

    signIn = () => {
        this.props.setSpinner(true);
        this.props.getProfile(this.props.netschoolData.login, this.props.netschoolData.password, this.props.profile.diary,
            this.region, this.province, this.city, this.school);

        let id = setInterval(() => {
            if (this.props.profile.error) {
                clearInterval(id);
                this.props.setSpinner(false);
                if (this.props.profile.id instanceof Error) {
                    this.props.openError();
                } else {
                    this.props.openUnsupported();
                }
            } else {
                if (this.props.profile.secret) {
                    let geoData = [this.region, this.province, this.city, this.school];
                    localStorage.setItem("userGeoData", JSON.stringify(geoData));

                    clearInterval(id);
                    this.props.setSpinner(false);
                    if (this.props.profile.student === null) {
                        this.props.setPanel("choose_student");
                    } else {
                        this.props.setView("MainView");
                    }
                }
            }
        }, 200);
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.btnBack}/>}>
                    Найдите ваш город
                </PanelHeader>
                <div className="netschoolMapScreen" id="netschoolMap">
                </div>
                {this.state.ready ? this.drawSelector() : null}
                {this.setMap()}
                {this.state.isButtonSpawned ?
                    <Button level="tertiary" className="chooseSchool" onClick={this.signIn}>
                        Войти
                    </Button>
                    : null}
                {this.setMap()}
            </Panel>
        )
    }

}

NetschoolMap.propTypes = {
    id: PropTypes.string.isRequired,
    setPanel: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    netschoolData: PropTypes.object.isRequired,
    openError: PropTypes.func.isRequired,
    openUnsupported: PropTypes.func.isRequired,
};

export default NetschoolMap;