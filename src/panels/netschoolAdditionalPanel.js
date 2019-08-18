import {Div, Panel, Button, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/netschoolAdditional.css"
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

const axios = require('axios');

class NetschoolMap extends React.Component {
    constructor(props) {
        super(props);
        this.map = null;
    }

    btnBack = () => {
        this.props.setPanel("auth")
    };

    setMap = () => {
        // console.log(window.ymaps);
        window.ymaps.ready(function () {
            let geolocation = window.ymaps.geolocation;
            let position;
            let map;
            geolocation.get({
                provider: 'yandex',
                mapStateAutoApply: true
            }).then(function (result) {
                position = result.geoObjects.position;
                map = new window.ymaps.Map("netschoolMap", {
                    center: [position[0], position[1]],
                    zoom: 15,
                    controls: ['zoomControl']
                });
                map.behaviors.enable(['drag']);

                map.events.add('click', function (e) {
                    var coords = e.get('coords');
                    console.log(coords);
                    axios.get("https://geocode-maps.yandex.ru/1.x/?format=json&apikey=fbc15a57-6801-4993-9d23-9b313b0f3ad1&geocode=" +
                        coords[1].toPrecision(6) + "," + coords[0].toPrecision(6))
                        .then(resp => {
                            console.log("click", resp);
                        })
                });
            });
        });
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.btnBack}/>}>
                    Найдите вашу школу
                </PanelHeader>
                <div className="netschoolMapScreen" id="netschoolMap">
                </div>
                {this.setMap()}
            </Panel>
        )
    }

}

NetschoolMap.propTypes = {
    id: PropTypes.string.isRequired,
    setPanel: PropTypes.func.isRequired,
};

export default NetschoolMap;