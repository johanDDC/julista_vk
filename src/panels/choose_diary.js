import {Div, Group, Input, Panel, PanelHeader, Link, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_diary.css"

import {setPanel} from "../redux/actions/PanelAction";

class ChooseDiary extends React.Component {
    constructor(props) {
        super(props);
        this.d = ""
    }

    choose = (diary) => {
        console.log("choose", diary);
        this.props.setPanel("auth");
        this.props.setDiary(diary)
    };

    render() {
        return (
            <Panel id={this.props.id}>
                {/*<PanelHeader noShadow={true}></PanelHeader>*/}
                <Div className="chooseDiaryScreen">
                        <span className="chooseDiaryScreenTitle">
                            Выберите ваш дневник
                        </span>
                    <div className="chooseDiaryScreenDiaryDiaries">
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "mosru";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                                 style={{backgroundColor: "#ff3000"}}></div>
                            <span className="chooseDiaryScreenDiaryContainerTitle">МЭШ (mos.ru)</span>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "mosregru";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                                 style={{backgroundColor: "#ffa000"}}></div>
                            <span className="chooseDiaryScreenDiaryContainerTitle">mosreg.ru</span>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "netschool";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                                 style={{backgroundColor: "#ffff00"}}></div>
                            <span className="chooseDiaryScreenDiaryContainerTitle">netschool</span>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "dnevnikru";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                                 style={{backgroundColor: "#30ff00"}}></div>
                            <span className="chooseDiaryScreenDiaryContainerTitle">dnevnick.ru</span>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                        <Button level="tertiary" className="chooseDiaryScreenDiaryContainer"
                                onClick={() => {
                                    this.d = "edutatar";
                                    this.choose(this.d);
                                }}>
                            <div className="chooseDiaryScreenDiaryContainerIcon"
                                 style={{backgroundColor: "#0080ff"}}></div>
                            <span className="chooseDiaryScreenDiaryContainerTitle">edutatar</span>
                            <div className="chooseDiaryScreenDiaryContainerChecker">
                            </div>
                        </Button>
                    </div>
                    <Button level="tertiary" className="getInButton" style={{visibility: "hidden"}}>
                        Войти
                    </Button>
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