import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_diary.css"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import NetschoolIcon from "../custom_components/icon-pack/NetschoolIcon"
import HalloweenPumpkin from "../custom_components/eventual/halloween/HalloweenPumpkin"
import EdutatarIcon from "../custom_components/icon-pack/EdutatarIcon"
import {getVkParams} from "../utils/utils";

class ChooseDiary extends React.Component {
    constructor(props) {
        super(props);
        this.d = "";

        this.startVkAuth();
    }

    startVkAuth = () => {
        let vk_info = getVkParams();
        this.props.vkAuth(vk_info)
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
                        <div>
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
                            {/*<Button level="tertiary" className="chooseDiaryScreenDiaryContainer"*/}
                            {/*        onClick={() => {*/}
                            {/*            this.d = "mosregru";*/}
                            {/*            this.choose(this.d);*/}
                            {/*        }}>*/}
                            {/*    <div className="chooseDiaryScreenDiaryContainerIcon"*/}
                            {/*    >*/}
                            {/*        <MosregIcon/>*/}
                            {/*    </div>*/}
                            {/*    <div className="chooseDiaryScreenDiaryContainerTitle">Школьный портал МО</div>*/}
                            {/*    <div className="chooseDiaryScreenDiaryContainerChecker">*/}
                            {/*    </div>*/}
                            {/*</Button>*/}
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
                        <div className="halloweenPumpkinHolder">
                            <HalloweenPumpkin is_faceless={false}/>
                        </div>
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
    vkAuth: PropTypes.func.isRequired,
};

export default ChooseDiary;