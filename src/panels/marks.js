import {Tabs , Div, Panel, PanelHeader, TabsItem, HorizontalScroll} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/marks.css"

import Mark from "../custom_components/mark"

class Marks extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            activeTab: "1",
        };
    }

    drawFirstTab = () => {
        return(
            <div>
                <Div className="title"  style={{paddingTop: "0"}}>
                    ПОСЛЕДНИЕ ОЦЕНКИ
                </Div>
                <HorizontalScroll className="lastMarksContainer">
                    <Div className="lastMarkContainer">
                        <div className="lastMarkVal">
                            <Mark size="36" val="5" is_routine={false} fs="20"/>
                        </div>
                        <div className="lastMarkSubject">Математика</div>
                        <div className="lastMarkDate">Сегодня</div>
                    </Div>
                </HorizontalScroll>
                <Div className="title">
                    ВСЕ ОЦЕНКИ
                </Div>
                <Div className="allMarksContainer">
                    <div className="subjectRow">
                        <span className="subject">
                            Математика
                        </span>
                        <span className="avg">
                            4.55
                        </span>
                    </div>
                    <div className="marksRow">
                        <div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div><div>
                            <Mark size="20" val="5" is_routine={true}/>
                        </div>
                    </div>
                    <div className="advicesRow">
                        <div className="adviceContainer">
                            Получите 1 пятерку
                        </div>
                    </div>
                </Div>
            </div>
        );
    };

    drawResultTab = () => {
        return(
            <div>
                <Div className="resultMarksContainer">
                    <span className="resultMarksContainerSubject">Математика</span>
                    <div className="resultMarksContainerMarks">
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="3" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="3" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="3" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerResultedMark">
                            <Mark size="32" val="3" is_routine={false} fs="20"/>
                        </div>
                    </div>
                </Div>
                <Div className="resultMarksContainer">
                    <span className="resultMarksContainerSubject">Математика</span>
                    <div className="resultMarksContainerMarks">
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="3" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="4" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerMark">
                            <Mark size="32" val="5" is_routine={true} fs="20"/>
                        </div>
                        <div className="resultMarksContainerResultedMark">
                            <Mark size="32" val="5" is_routine={false} fs="20"/>
                        </div>
                    </div>
                </Div>
            </div>
        )
    };

    render() {
        return(
            <Panel id={this.props.id}>
                <PanelHeader
                    noShadow={true}
                    left={<Div style={{fontWeight: 'bold', fontSize: '20px'}}><span>Аккаунт</span></Div>}>
                    Оценки
                </PanelHeader>
                <Div style={{paddingTop: "0", paddingBottom: "0",}}>
                    <Tabs theme="header" type="buttons" className="marksTabs">
                        <TabsItem
                            onClick={() => this.setState({ activeTab: '1' })}
                            selected={this.state.activeTab === '1'}
                        >
                            1
                        </TabsItem>
                        <TabsItem
                            onClick={() => this.setState({ activeTab: '2' })}
                            selected={this.state.activeTab === '2'}
                        >
                            2
                        </TabsItem>
                        <TabsItem
                            onClick={() => this.setState({ activeTab: 'result' })}
                            selected={this.state.activeTab === 'result'}
                        >
                            Итоговые
                        </TabsItem>
                    </Tabs>
                </Div>
                {this.state.activeTab === '1' ? this.drawFirstTab() : null}
                {this.state.activeTab === 'result' ? this.drawResultTab() : null}
            </Panel>
        )
    }

}
Marks.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default Marks;