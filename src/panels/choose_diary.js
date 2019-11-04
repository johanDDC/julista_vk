import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_diary.css"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import NetschoolIcon from "../custom_components/icon-pack/NetschoolIcon"
import HalloweenPumpkin from "../custom_components/eventual/halloween/HalloweenPumpkin"
import EdutatarIcon from "../custom_components/icon-pack/EdutatarIcon"

class ChooseDiary extends React.Component {
    constructor(props) {
        super(props);
    }

    choose = (diary) => {
        this.props.setPanel("auth");
        this.props.setDiary(diary)
    };

    diaryEntity = (name, description, icon) => {
        return (
            <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                    onClick={() => {
                        this.choose(name);
                    }}>
                <div className="chooseDiaryScreenDiaryContainerIcon"
                >
                    {icon}
                </div>
                <div className="chooseDiaryScreenDiaryContainerTitle">{description}</div>
                <div className="chooseDiaryScreenDiaryContainerChecker">
                </div>
            </Button>
        )
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
                            {this.diaryEntity("mosru", "Дневник МЭШ (mos.ru)", <MosRuIcon/>)}
                            {this.diaryEntity("netschool", "Сетевой Город", <NetschoolIcon/>)}
                            {this.diaryEntity("edutatar", "EDU Tatar", <EdutatarIcon/>)}
                        </div>
                        <div className="halloweenPumpkinHolder">
                            <HalloweenPumpkin
                                is_faceless={false}
                                shadow={true}
                                floating={true}
                                lighting={false}
                            />
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
};

export default ChooseDiary;