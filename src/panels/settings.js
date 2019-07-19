import {Panel, PanelHeader, Button, Switch} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/settings.css"
import VKSettingsIcon from "../custom_components/icon-pack/VKSettingsIcon"
import PurposeIcon from "../custom_components/icon-pack/PurposeIcon"
import AdvancesIcon from "../custom_components/icon-pack/AdvancesIcon"
import NewMarksIcon from "../custom_components/icon-pack/NewMarksIcon"
import ReportsIcon from "../custom_components/icon-pack/ReportsIcon"
import EventsIcon from "../custom_components/icon-pack/EventsIcon"
import GetOutIcon from "../custom_components/icon-pack/GetOutIcon"
import RightArrowIcon from "../custom_components/icon-pack/RightArrowIcon"


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
                <Button level="tertiary" className="settingsSettingContainer">
                    <VKSettingsIcon/>
                    <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Группа ВК
                        </span>
                        <span className="settingsSettingSwitch">
                            <RightArrowIcon/>
                        </span>
                    </div>
                </Button>
                <div className="settingsTitleContainer">
                    <span className="settingsTitle">
                        Обучение
                    </span>
                </div>
                <Button level="tertiary" className="settingsSettingContainer">
                    <PurposeIcon/>
                    <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Желаемая оценка
                        </span>
                        <span className="settingsSettingSwitch">
                            <span style={{color: "rgb(143 142 148)", marginRight: "15px"}}>5</span>
                            <RightArrowIcon/>
                        </span>
                    </div>
                </Button>
                <div className="settingsTitleContainer">
                    <span className="settingsTitle">
                        Уведомления
                    </span>
                </div>
                <div  className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                    <AdvancesIcon/>
                    <div className="settingsSettingInfo settingsSettingSeparated">
                        <span className="settingsSettingTitle">
                            Советы
                        </span>
                        <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                    </div>
                </div>
                <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                    <NewMarksIcon/>
                    <div className="settingsSettingInfo settingsSettingSeparated">
                        <span className="settingsSettingTitle">
                            Новые оценки
                        </span>
                        <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                    </div>
                </div>
                <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                    <ReportsIcon/>
                    <div className="settingsSettingInfo settingsSettingSeparated">
                        <span className="settingsSettingTitle">
                            Сводки за день
                        </span>
                        <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                    </div>
                </div>
                <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                    <EventsIcon/>
                    <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Собьытия из ленты
                        </span>
                        <span>
                            <Switch className="settingsSettingSwitcher"/>
                        </span>
                    </div>
                </div>
                <Button level="tertiary" className="settingsSettingContainer" style={{marginTop: "35px"}}>
                    <GetOutIcon/>
                    <div className="settingsSettingInfo">
                        <span className="settingsSettingTitle">
                            Выйти
                        </span>
                        <div className="settingsSettingSwitch">
                            <RightArrowIcon/>
                        </div>
                    </div>
                </Button>
            </Panel>
        )
    }
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Settings;