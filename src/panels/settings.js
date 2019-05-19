import {Panel, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/settings.css"


class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay : 1),
        };
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Настройки
                </PanelHeader>
                <div className="settingsTitleContainer">
                    <span className="settingsTitle">
                        Ссылки
                    </span>
                </div>
                <div className="settingsSettingContainer">

                </div>
            </Panel>
        )
    }
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    currentDay: PropTypes.number
};

export default Settings;