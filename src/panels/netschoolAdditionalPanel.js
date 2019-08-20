import {Div, Panel, Button, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/netschoolAdditional.css"
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

const axios = require('axios');

class NetschoolMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isButtonSpawned: false,
        };

        this.map = null;
    }

    btnBack = () => {
        this.props.setPanel("auth")
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
                        zoom: 15,
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
                                if (!this.isButtonSpawned)
                                    this.spawnButton()
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

    spawnButton = () => {
        this.setState({isButtonSpawned: true});
        console.log("spawning button");
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.btnBack}/>}>
                    Найдите вашу школу
                </PanelHeader>
                <div className="netschoolMapScreen" id="netschoolMap">
                </div>
                {this.state.isButtonSpawned ?
                    <Button level="tertiary" className="chooseSchool">
                        Выбрать школу
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
};

export default NetschoolMap;