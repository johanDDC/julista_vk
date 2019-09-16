import {Panel, PanelHeader, Button, Switch, Tooltip, Link, Snackbar} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/settings.css"
import VKSettingsIcon from "../custom_components/icon-pack/VKSettingsIcon"
import SettingsNotificationsIcon from "../custom_components/icon-pack/SettingsNotificationsIcon"
import DarkThemeIcon from "../custom_components/icon-pack/DarkThemeIcon"
import BookletCheck from "../custom_components/icon-pack/BookletCheck"
import Mark from "../custom_components/mark"
import GetOutIcon from "../custom_components/icon-pack/GetOutIcon"
import connect from '@vkontakte/vk-connect-promise';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltip: false,
            snackbar: null,
            ready: false,
        };

        this.settings = (localStorage.getItem("appSettings") ? JSON.parse(localStorage.getItem("appSettings")) : null);

        // setTimeout(() => {
        //     if (this.settings.notifications) {
        //         document.getElementById("settingsNotificationsSwitcher")
        //             .setAttribute("defaultChecked");
        //         this.setState({ready: true});
        //         this.setState({ready: false});
        //     }
        // }, 800)
    }

    signOut = () => {
        localStorage.removeItem("userData");
        this.props.setView("AuthorizationView");
        this.props.setPanel("choose_diary");
    };

    askForNotifications = () => {
        if (!this.settings) {
            this.settings = {};
        }
        let vk_info = window.location.search.slice(1).split('&')
            .map((queryParam) => {
                let kvp = queryParam.split('=');
                return {key: kvp[0], value: kvp[1]}
            })
            .reduce((query, kvp) => {
                query[kvp.key] = decodeURIComponent(kvp.value);
                return query
            }, {});
        if (this.settings.notifications) {
            this.settings.notifications = false;
            this.setState({
                snackbar:
                    <Snackbar
                        layout="vertical"
                        onClose={() => this.setState({snackbar: null})}
                        before={<SettingsNotificationsIcon/>}
                        duration={1500}
                    >
                        Уведомления выключены
                    </Snackbar>
            });
        } else {
            console.log("vk info", vk_info, vk_info.vk_are_notifications_enabled);
            if (vk_info.vk_are_notifications_enabled === 0) {
                connect.send("VKWebAppAllowNotifications", {})
                    .then(answer => {

                    })
            }
            this.settings.notifications = true;
            this.setState({
                snackbar:
                    <Snackbar
                        layout="vertical"
                        onClose={() => this.setState({snackbar: null})}
                        before={<SettingsNotificationsIcon/>}
                        duration={1500}
                    >
                        Уведомления включены
                    </Snackbar>
            });
        }
        localStorage.setItem("appSettings", JSON.stringify(this.settings));
    };

    subscribeGroup = () => {
        let vk_info = window.location.search.slice(1).split('&')
            .map((queryParam) => {
                let kvp = queryParam.split('=');
                return {key: kvp[0], value: kvp[1]}
            })
            .reduce((query, kvp) => {
                query[kvp.key] = decodeURIComponent(kvp.value);
                return query
            }, {});
        try {
            if (vk_info.vk_viewer_group_role === 'none' && !this.settings.isSubscribed) {
                connect.send("VKWebAppJoinGroup", {"group_id": 171343913});
                this.settings.isSubscribed = true;
            } else
                this.setState({
                    snackbar:
                        <Snackbar
                            layout="vertical"
                            onClose={() => this.setState({snackbar: null})}
                            before={<BookletCheck/>}
                            duration={1500}
                        >
                            Вы уже подписались =)
                        </Snackbar>
                });
        } catch (e) {

        }
        localStorage.setItem("appSettings", JSON.stringify(this.settings));
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader noShadow>
                    Настройки
                </PanelHeader>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <div className="settingsTitle">
                            Ссылки
                        </div>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer">
                        <VKSettingsIcon/>
                        <div className="settingsSettingInfo">
                            <div className="settingsSettingTitle" style={{color: "#5181b8"}}>
                                <Link
                                    href="app://vk.com/bklet/"
                                    target="_blank"
                                >
                                    Группа ВК
                                </Link>
                            </div>
                            <div className="settingsSettingSwitch">
                                <Button level="secondary" onClick={this.subscribeGroup}>Подписаться</Button>
                            </div>
                        </div>
                    </Button>
                </div>
                <div className="groupSettingsContainer">
                    <div className="settingsTitleContainer">
                        <div className="settingsTitle">
                            Дневник
                        </div>
                    </div>
                    <Button level="tertiary" className="settingsSettingContainer" onClick={this.props.chooseMark}>
                        <div style={{width: "24px"}}>
                            <Mark size="24" val={this.props.expectedMark.toString()} is_routine={false}/>
                        </div>
                        <div className="settingsSettingInfo">
                            <div className="settingsSettingTitle">
                                Желаемая оценка
                            </div>
                        </div>
                    </Button>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}>
                        <SettingsNotificationsIcon/>
                        <div className="settingsSettingInfo">
                            <div className="settingsSettingTitle">
                                Уведомления
                            </div>
                            <div>
                                <Switch className="settingsSettingSwitcher"
                                        id="settingsNotificationsSwitcher"
                                        onChange={this.askForNotifications}
                                        defaultChecked={this.settings
                                            ? (this.settings.notifications
                                                ? this.settings.notifications
                                                : false)
                                            : false
                                        }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="settingsSettingContainer" style={{paddingRight: "-16px"}}
                         onClick={() => this.setState({tooltip: true})}>
                        <DarkThemeIcon/>
                        <div className="settingsSettingInfo">
                            <div className="settingsSettingTitle">
                                Тёмная тема
                            </div>
                            <div>
                                <Tooltip
                                    text="Обязательно появится в релизе :)"
                                    isShown={this.state.tooltip}
                                    onClose={() => this.setState({tooltip: false})}
                                    offsetX={-50}
                                    offsetY={5}
                                    cornerOffset={55}
                                >
                                    <Switch className="settingsSettingSwitcher" disabled/>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="groupSettingsContainer">
                    <Button level="tertiary" className="settingsSettingContainer" style={{marginTop: "35px"}}
                            onClick={this.signOut}>
                        <GetOutIcon/>
                        <div className="settingsSettingInfo">
                            <div className="settingsSettingTitle" style={{color: "#ff4939"}}>
                                Выйти
                            </div>
                        </div>
                    </Button>
                </div>
                {this.state.snackbar}
            </Panel>
        )
    }
}

Settings.propTypes = {
    id: PropTypes.string.isRequired,
    expectedMark: PropTypes.number.isRequired,
    chooseMark: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
};

export default Settings;