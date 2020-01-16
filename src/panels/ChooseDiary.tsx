import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_diary.css"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import NetschoolIcon from "../custom_components/icon-pack/NetschoolIcon"
import HalloweenPumpkin from "../custom_components/eventual/halloween/HalloweenPumpkin"
import EdutatarIcon from "../custom_components/icon-pack/EdutatarIcon"
import {getVkParams} from "../utils/Utils";
import NewYearSanta from "../custom_components/eventual/new_year/santa";
import {PanelProps} from "../utils/Props";
import {openModal, switchPanelAction} from "../redux/actions/AppPresentation";
import {Dispatch} from "redux";
import {completeAuth, setDiary} from "../redux/actions/Profile";
import {vkAuth} from "../utils/Requests";
import {connect} from "react-redux";

interface Props extends PanelProps {
    setDiary: (diary: string) => void
    auth: (auth_data: {}) => void
    openModal: () => void
}


class ChooseDiary extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    startVkAuth = () => {
        vkAuth().then((data: {}) => {
            this.props.auth(data);
            this.props.openModal();
        });
    };

    choose = (diary: string) => {
        this.props.setDiary(diary);
        this.props.switchPanel("auth");
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseDiaryScreen">
                    <div className="chooseDiaryScreenTitle">
                        Выберите ваш дневник
                    </div>
                    <div className="chooseDiaryScreenDiaryDiaries">
                        <div>
                            <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                    onClick={() => {
                                        this.choose("mosru");
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
                                        this.choose("netschool");
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
                                        this.choose("edutatar");
                                    }}>
                                <div className="chooseDiaryScreenDiaryContainerIcon">
                                    <EdutatarIcon/>
                                </div>
                                <div className="chooseDiaryScreenDiaryContainerTitle">EDU Tatar</div>
                                <div className="chooseDiaryScreenDiaryContainerChecker">
                                </div>
                            </Button>
                        </div>
                        <div className="halloweenPumpkinHolder">
                            <NewYearSanta/>
                        </div>
                    </div>
                </Div>
            </Panel>
        )
    }

}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        switchPanel: (panel: string) => dispatch(switchPanelAction(panel)),
        setDiary: (diary: string) => dispatch(setDiary(diary)),
        auth: (authData: {}) => dispatch(completeAuth(authData)),
        openModal: () => dispatch(openModal("vkAuth")),
    }
};

export default connect(null, mapDispatchToProps)(ChooseDiary);
