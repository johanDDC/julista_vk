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
import {turnIntoDate, reverseRuslanString} from "../utils/utils"

import Mark from "../custom_components/support/mark"
import CustomSpinner from "../custom_components/support/customSpinner";
import AdvisesRow from "../custom_components/layouts/marks/advisesRow";
import UpdateButton from "../custom_components/support/UpdateButton";
import {getAllMarks, getLastMarks} from "../utils/requests";
import {setAllMarks, setLastMarks} from "../redux/actions/AppLogicAction";
import {connect} from "react-redux";
import {actualMarksPart} from "../redux/actions/AppPresentationAction";

class Marks extends React.Component {
    constructor(props) {
        super(props);

        this.marksData = this.props.appData.marks;
        this.lastMarksData = this.props.appData.lastMarks;
        this.tabs = [];
        this.tabsItems = [];
        console.log("ap", this.props.actualPart);

        this.state = {
            activeTab: this.props.actualPart,
            ready: Number(this.marksData.length !== 0),
            error: false,
            lastMarksBlock: null,
        };
        if (this.marksData.length !== 0)
            this.startRenderMain();
        // if (this.lastMarksData.length !== 0)
        //     this.startRenderLastMarks();
        if (this.marksData.length === 0 && this.lastMarksData.length === 0)
            this.loadData();
    }

    loadData = () => {
        getAllMarks(this.props.profile.id,
            this.props.profile.secret,
            this.props.profile.student.id)
            .then(data => {
                console.log(data.actual);
                this.marksData = data.data;
                this.props.setAllMarks(data.data);
                this.startRenderMain(data.actual);
            })
            .catch(() => {
                console.log("here i am");
                this.setState({error: true});
            });
        // getLastMarks(this.props.profile.id,
        //     this.props.profile.secret,
        //     this.props.profile.student.id)
        //     .then(data => {
        //         this.lastMarksData = data;
        //         this.props.setLastMarks(data);
        //         // this.startRenderMain();
        //     });
    };

    startRenderMain = (actual) => {
        let periods = this.marksData[0].periods.length;

        for (let i = 0; i < periods; i++) {
            this.tabs.push(this.drawTab(i));

        }
        if (actual){
            this.props.setActualPart(`${actual + 1}`);
            this.setState({
                ready: 1,
                activeTab: `${actual + 1}`
            });
        } else {
            this.setState({
                ready: 1,
            });
        }
    };

    startRenderLastMarks = () => {
        let lastMarks = [];
        console.log("here", this.lastMarksData);
        if (this.lastMarksData.length !== 0 || this.lastMarksData.lessons) {
            console.log("here", this.lastMarksData);
            Object.keys(this.lastMarksData.dates).forEach(date => {
                this.lastMarksData.dates[date].forEach(mark => {
                    if (typeof (mark.value) === "number") { // Excluding "Не был" and "Болел", but including "Нзч"
                        let label;

                        let day = turnIntoDate(mark.date);
                        let today = new Date();
                        let shift = Math.floor((today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24));

                        if (shift === 0) label = "Сегодня";
                        else if (shift === 1) label = "Вчера";
                        else label = false;

                        lastMarks.push(
                            <Div className="lastMarkContainer">
                                <div className="lastMarkVal">
                                    <Mark size="32" val={mark.value.toString()} is_routine={false} fontSize="20"/>
                                </div>
                                <div className="lastMarkSubject">{mark.subject}</div>
                                {label && <div className="lastMarkDate"
                                               style={{
                                                   backgroundColor: label === "Сегодня"
                                                       ? "var(--inversed-text-color)"
                                                       : "var(--background-block)"
                                                   , color: label === "Вчера" && "var(--third-text-color)"
                                               }}>{label}</div>}
                            </Div>
                        );
                    }
                });
            });
            // this.setState({ready: 4});
            lastMarks =
                <div>
                    <Div className="marksBlocksTitle">
                        ПОСЛЕДНИЕ ОЦЕНКИ
                    </Div>
                    <HorizontalScroll className="lastMarksContainer">
                        {lastMarks}
                    </HorizontalScroll>
                </div>
        }
        return lastMarks
    };

    drawTabsItem = () => {
        if (this.marksData[0]) {
            let periods = this.marksData[0].periods.length;
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
            if (subject.periods.length >= currentPeriod + 1) {
                let period = subject.periods[currentPeriod];
                let marks = [];
                let marksModal = [];
                let avg = 0;
                let marksLength = 0;
                let marksDataframe = [];
                period.marks.forEach(mark => {
                    marksDataframe.push(mark.value - 0);
                    avg += (!isNaN(mark.value)
                        ? mark.value * (mark.weight ? mark.weight : 1)
                        : 0);
                    marksLength += (!isNaN(mark.value) ? (mark.weight ? mark.weight : 1) : 0);
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
                                        {reverseRuslanString(mark.date)}
                                    </div>
                                    : null}
                            </div>
                        </div>
                    );
                });
                avg /= marksLength;
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
                                    <Mark size="22" val={period.final_mark.toString()} is_routine={false}
                                          fontSize="14"/>
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
                                    <Mark size="16" val={period.final_mark.toString()} is_routine={false}
                                          fontSize="12"/>
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
                        <div className="marksAdviceRowContainer">
                            <AdvisesRow
                                expectedMark={this.props.expectedMark}
                                allMarks={marksDataframe}
                                avg={(avg - 0)}
                            />
                        </div>
                    </div>
                );
            }
        };

        let generateSubjectsFields = (currentPeriod) => {
            this.marksData.forEach(subject => {
                if (subject.periods.length !== 0)
                    subjectsFields.push(generateSubject(subject, currentPeriod));
            })
        };
        generateSubjectsFields(currentTab);
        // let lastMarksBlock = this.startRenderLastMarks();
        // console.log("block", lastMarksBlock);

        if (currentTab !== 0)
            console.log("check");

        return (
            <div id={currentTab}>
                {/*{lastMarksBlock}*/}
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

        this.marksData.forEach(subject => {
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
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p className="marksScreenError">Непредвиденная ошибка. Пожалуйста, попробуйте позже.</p>
                        <UpdateButton activationFunction={this.loadData}/>
                    </div>
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
                        {this.state.ready > 0 ? this.tabs[this.state.activeTab - 1] : this.drawSpinner()}
                        {this.state.activeTab === 'result' ? this.drawResultTab() : null}
                    </div>
                }
            </Panel>
        )
    }

}

Marks.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
    appData: PropTypes.any.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    expectedMark: PropTypes.string.isRequired,
};


const mapStateToProps = store => {
    return {
        actualPart: store.presentation.actualPart,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAllMarks: data => dispatch(setAllMarks(data)),
        setActualPart: part => dispatch(actualMarksPart(part)),
        setLastMarks: data => dispatch(setLastMarks(data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marks);