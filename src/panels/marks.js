import {
    Tabs,
    Div,
    Panel,
    PanelHeader,
    TabsItem,
    HorizontalScroll,
} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/marks.css"

import Mark from "../custom_components/mark"
import CustomSpinner from "../custom_components/customSpinner";

class Marks extends React.Component {
    constructor(props) {
        super(props);

        this.marksData = this.props.appData.marks;
        this.lastMarksData = this.props.appData.lastMarks;
        this.tabs = [];
        this.tabsItems = [];
        let flag = this.props.appData.marks.data.length === 0;

        this.state = {
            activeTab: "1",
            ready: !flag,
            error: false,
            errorLastMarks: false,
        };

        if (flag)
            this.loadData();
        else
            this.startRender();
    }

    loadData = async () => {
        this.props.getMarks(this.props.profile.id, this.props.profile.secret, this.props.profile.student.id);
        this.props.getLastMarks(this.props.profile.id, this.props.profile.secret, this.props.profile.student.id);

        let id = setInterval(() => {
            if (this.props.appData.error) {
                clearInterval(id);
                this.setState({error: true, ready: true});
            }
            if (!this.state.error && this.props.appData.marks.data.length !== 0) {
                this.marksData = this.props.appData.marks;
                clearInterval(id);
                this.startRender();
            }
        }, 200);
        let id2 = setInterval(() => {
            if (this.props.appData.errorLastMarks) {
                clearInterval(id2);
                this.setState({errorLastMarks: true, ready: true});
            }
            // if (this.props.appData.lastMarks.data.length !== 0 && !this.state.errorLastMarks) {
            //     this.lastMarksData = this.props.appData.lastMarks;
            //     clearInterval(id2);
            //     this.startRender();
            // }
        }, 200);
    };

    startRender = () => {
        let periods = this.marksData.data[0].periods.length;
        for (let i = 0; i < periods; i++) {
            this.tabs.push(this.drawTab(i));
        }

        this.setState({
            ready: true,
        });
    };

    drawTabsItem = () => {
        if (this.marksData.data[0]) {
            let periods = this.marksData.data[0].periods.length;
            this.tabsItems = [];
            for (let i = 0; i < periods; i++) {
                this.tabsItems.push(
                    <TabsItem
                        onClick={() => this.setState({activeTab: `${i + 1}`})}
                        selected={this.state.activeTab === `${i + 1}`}
                    >
                        {i + 1}
                    </TabsItem>
                );
            }
            return this.tabsItems;
        }
    };

    drawSpinner = () => {
        return (
            <CustomSpinner isInverse={true}/>
        );
    };

    drawTab = (currentTab) => {
        let subjectsFields = [];

        let generateSubject = (subject, currentPeriod) => {
            let period = subject.periods[currentPeriod];
            let marks = [];
            let marksModal = [];
            let avg = 0;
            period.marks.forEach(mark => {
                avg += (!isNaN(mark.value)
                    ? mark.value * (mark.weight ? mark.weight : 1)
                    : 0);
                marks.push(
                    <div>
                        <Mark size="16" val={mark.value.toString()} is_routine={true} fontSize="12"/>
                    </div>
                );
                marksModal.push(
                    <div className="modalMarkMarksInfo">
                        <div className="modalMarkMarksInfoLeft">
                            <Mark size="22" is_routine={false} val={mark.value.toString()} fontSize="14"
                                  weight={(mark.weight ? mark.weight.toString() : "1")}/>
                        </div>
                        <div className="modalMarkMarksInfoContainer">
                            {mark.form
                                ?
                                <div className="modalMarkMarksInfoForm">
                                    {mark.form}
                                </div>
                                : null}
                            {mark.name
                                ?
                                <div className="modalMarkMarksInfoName">
                                    {mark.name}
                                </div>
                                : null}
                            {mark.date
                                ?
                                <div className="modalMarkMarksInfoDate">
                                    {mark.date}
                                </div>
                                : null}
                        </div>
                    </div>
                );
            });
            avg /= marks.length;
            avg = avg.toFixed(2);
            let modal = (
                <div>
                    <div className="modalMarkTitle">
                        Сведения о предмете
                    </div>
                    <div className="modalMarkSubjectInfo">
                        <div className="modalMarkSubjectInfoLeft">
                            {(isNaN(avg) ? "0.00" : avg)}
                        </div>
                        <div className="modalMarkSubjectInfoText">
                            Средний балл
                        </div>
                    </div>
                    <div className="modalMarkSubjectInfo">
                        <div className="modalMarkSubjectInfoLeft">
                            {period.final_mark ?
                                <Mark size="22" val={period.final_mark.toString()} is_routine={false} fontSize="14"/>
                                : "-"}
                        </div>
                        <div className="modalMarkSubjectInfoText">
                            Итоговая оценка
                        </div>
                    </div>
                    <div className="modalMarkTitle">
                        Оценки
                    </div>
                    {marksModal}
                    <div className="modalEmptyElement">
                    </div>
                </div>
            );
            return (
                <div className="allMarksContainer" onClick={() => this.props.openModal(modal, subject.name)}>
                    <div className="subjectRow">
                        <div className="subject">
                            {subject.name}
                        </div>
                        <div className="subjectRowMarks">
                            {period.final_mark &&
                            <div className="subjectRowMarksFinalMark">
                                <Mark size="16" val={period.final_mark.toString()} is_routine={false} fontSize="12"/>
                            </div>
                            }
                            <div className="avg">
                                {isNaN(avg) ? null : avg}
                            </div>
                        </div>
                    </div>
                    <div className="marksRow">
                        {marks}
                    </div>
                    {/*<div className="advicesRow">*/}
                    {/*    <div className="adviceContainer">*/}
                    {/*        Получите 1 пятерку*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            );
        };

        let generateSubjectsFields = (currentPeriod) => {
            this.marksData.data.forEach(subject => {
                if (subject.periods.length !== 0)
                    subjectsFields.push(generateSubject(subject, currentPeriod));
            })
        };

        generateSubjectsFields(currentTab);

        let drawLastMarks = () => {
            console.log("lastmarks", this.lastMarksData.data);
            if (this.state.errorLastMarks) {
                return (
                    <p className="errorLastMarks">Не удалось загрузить последние оценки из-за непредвиденной ошибки.</p>
                )
            } else {
                if (this.lastMarksData.data.length !== 0 && this.lastMarksData.data.lessons.length !== 0) {
                    return (
                        <div>
                            <Div className="marksBlocksTitle">
                                ПОСЛЕДНИЕ ОЦЕНКИ
                            </Div>
                            <HorizontalScroll className="lastMarksContainer">
                                <Div className="lastMarkContainer">
                                    <div className="lastMarkVal">
                                        <Mark size="36" val="5" is_routine={false} fontSize="20"/>
                                    </div>
                                    <div className="lastMarkSubject">Математика</div>
                                    <div className="lastMarkDate">Сегодня</div>
                                </Div>
                            </HorizontalScroll>
                        </div>
                    );
                } else {
                    return null;
                }
            }
        };

        return (
            <div id={currentTab}>
                {/*{drawLastMarks()}*/}
                <Div className="marksBlocksTitle">
                    ВСЕ ОЦЕНКИ
                </Div>
                {subjectsFields}
            </div>
        );
    };

    drawResultTab = () => {
        let subjectFields = [];

        let drawSubjectField = (subject) => {
            let periods = subject.periods.length;
            let marks = [];
            for (let i = 0; i < periods; i++) {
                marks.push(subject.periods[i].final_mark);
            }
            let renderedMarks = [];
            marks.forEach(mark => {
                if (mark)
                    renderedMarks.push(
                        <div className="resultMarksContainerMark">
                            <Mark size="24" val={mark.toString()} is_routine={true} fontSize="12" short={true}/>
                        </div>
                    )
            });

            return (
                <Div className="resultMarksContainer">
                    <div className="resultMarksContainerSubject">{subject.name}</div>
                    <div className="resultMarksContainerMarks">
                        {renderedMarks}
                        <div className="resultMarksContainerResultedMark">
                            <div className="resultMarksContainerResultedTitle">
                                Итог
                            </div>
                            {subject.year_mark ?
                                <Mark size="24" val={subject.year_mark.toString()} is_routine={false} fontSize="12"
                                      short={true}/>
                                : null}
                        </div>
                    </div>
                </Div>
            );
        };

        this.marksData.data.forEach(subject => {
            if (subject.periods.length !== 0)
                subjectFields.push(drawSubjectField(subject));
        });

        return (
            <div>
                {subjectFields}
            </div>
        )
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader noShadow={true}>
                    Оценки
                </PanelHeader>
                {this.state.error ?
                    <p className="marksScreenError">Непредвиденная ошибка. Пожалуйста, попробуйте позже.</p>
                    :
                    <div className="marksScreen">
                        <Div>
                            <Tabs theme="header" type="buttons" className="marksTabs">
                                {this.drawTabsItem()}
                                <TabsItem
                                    onClick={() => this.setState({activeTab: 'result'})}
                                    selected={this.state.activeTab === 'result'}
                                >
                                    Итоговые
                                </TabsItem>
                            </Tabs>
                        </Div>
                        {this.state.ready ? this.tabs[this.state.activeTab - 1] : this.drawSpinner()}
                        {this.state.activeTab === 'result' ? this.drawResultTab() : null}
                    </div>
                }
            </Panel>
        )
    }

}

Marks.propTypes = {
    id: PropTypes.string.isRequired,
    getMarks: PropTypes.func.isRequired,
    getLastMarks: PropTypes.func.isRequired,
    profile: PropTypes.any.isRequired,
    appData: PropTypes.any.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Marks;