import {Panel, PanelHeader, Button, Switch, Group} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/settings.css"
import VKSettingsIcon from "../custom_components/icon-pack/VKSettingsIcon"
import PurposeIcon from "../custom_components/icon-pack/PurposeIcon"
import AdvancesIcon from "../custom_components/icon-pack/AdvancesIcon"
import NewMarksIcon from "../custom_components/icon-pack/NewMarksIcon"
import Mark from "../custom_components/mark"
import GetOutIcon from "../custom_components/icon-pack/GetOutIcon"


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
                <PanelHeader noShadow>
                    Настройки
                </PanelHeader>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <span className="settingsTitle">
                            Ссылки
                        </span>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer">
                        <VKSettingsIcon/>
                        <div className="settingsSettingInfo">
                            <span className="settingsSettingTitle" style={{color: "#5181b8", fontWeight: "bold"}}>
                                Группа ВК
                            </span>
                            <span className="settingsSettingSwitch">
                        </span>
                        </div>
                    </Button>
                </div>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <span className="settingsTitle">
                            Дневник
                        </span>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer">
                        <div style={{width: "24px"}}>
                            <Mark size="28" val={this.props.expectedMark.toString()} is_routine={false}/>
                        </div>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Желаемая оценка
                        </span>
                        </div>
                    </Button>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                        <AdvancesIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Уведомления
                        </span>
                            <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                        </div>
                    </div>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                        <NewMarksIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Тёмная тема
                        </span>
                            <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                        </div>
                    </div>
                </div>
                <div className="groupSettingsContainer">
                    <Button level="tertiary" className="settingsSettingContainer" style={{marginTop: "35px"}}>
                        <GetOutIcon/>
                        <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle" style={{color: "#ff4939", fontWeight: "bold"}}>
                            Выйти
                        </span>
                        </div>
                    </Button>
                </div>
            </Panel>
        )
    }
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    expectedMark: PropTypes.number.isRequired,
    changeMark: PropTypes.func.isRequired,
};

export default Settings;