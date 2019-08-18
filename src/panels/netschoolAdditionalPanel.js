import {Div, Panel, Button, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/netschoolAdditional.css"
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

class NetschoolMap extends React.Component {
    constructor(props) {
        super(props);
        this.map = null;
    }

    btnBack = () => {
        this.props.setPanel("auth")
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.btnBack}/>}>
                    Найдите вашу школу
                </PanelHeader>
                <div className="netschoolMapScreen" id="netschoolMap">
                </div>
            </Panel>
        )
    }

}

NetschoolMap.propTypes = {
    id: PropTypes.string.isRequired,
    setPanel: PropTypes.func.isRequired,
};

export default NetschoolMap;