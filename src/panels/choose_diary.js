import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_diary.css"

import {vkAuth} from "../redux/actions/profileAction"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import MosregIcon from "../custom_components/icon-pack/MosregIcon"
import NetschoolIcon from "../custom_components/icon-pack/NetschoolIcon"
import EdutatarIcon from "../custom_components/icon-pack/EdutatarIcon"

class ChooseDiary extends React.Component {
    constructor(props) {
        super(props);
        this.d = "";

        this.startVkAuth();
    }

    startVkAuth = () => {
        let vk_info = window.location.search.slice(1).split('&')
            .map((queryParam) => {
                let kvp = queryParam.split('=');
                return {key: kvp[0], value: kvp[1]}
            })
            .reduce((query, kvp) => {
                query[kvp.key] = decodeURIComponent(kvp.value);
                return query
            }, {});
        vk_info = {
            sign: "06DakpJLGnTxBx3vhdVYuahPhTcnKeZEgMuAtAOqVms",
            vk_access_token_settings: "",
            vk_app_id: "6967676",
            vk_are_notifications_enabled: "0",
            vk_group_id: "171343913",
            vk_is_app_user: "1",
            vk_language: "ru",
            vk_platform: "desktop_web",
            vk_ref: "other",
            vk_user_id: "143305590",
            vk_viewer_group_role: "admin",
        };

        vkAuth(vk_info);
    };

    choose = (diary) => {
        this.props.setPanel("auth");
        this.props.setDiary(diary)
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseDiaryScreen">
                    <div className="chooseDiaryScreenTitle">
                        Выберите ваш дневник
                    </div>
                    <div className="chooseDiaryScreenDiaryDiaries">
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "mosru";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                            >
                                <MosRuIcon/>
                            </div>
                            <div className="chooseDiaryScreenDiaryContainerTitle">Дневник МЭШ (mos.ru)</div>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "mosregru";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                            >
                                <MosregIcon/>
                            </div>
                            <div className="chooseDiaryScreenDiaryContainerTitle">Школьный портал МО</div>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "netschool";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon">
                                <NetschoolIcon/>
                            </div>
                            <div className="chooseDiaryScreenDiaryContainerTitle">Сетевой Город</div>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "edutatar";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon">
                                <EdutatarIcon/>
                            </div>
                            <div className="chooseDiaryScreenDiaryContainerTitle">EDU Tatar</div>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                    </div>
                </Div>
            </Panel>
        )
    }

}

ChooseDiary.propTypes = {
    id: PropTypes.string.isRequired,
    setPanel: PropTypes.func.isRequired,
    setDiary: PropTypes.func.isRequired,
};

export default ChooseDiary;