import {Tabs, Div, Panel, PanelHeader, TabsItem, HorizontalScroll} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/marks.css"

import Mark from "../custom_components/mark"
import CustomSpinner from "../custom_components/customSpinner";

class Marks extends React.Component {
    constructor(props) {
        super(props);

        this.marksData = this.props.appData.marks;
        this.tabs = [];
        this.tabsItems = [];
        let flag = this.props.appData.marks.data.length === 0;

        this.state = {
            activeTab: "1",
            ready: !flag,
        };

        if (flag)
            this.loadData();
        else
            this.startRender();
    }

    loadData = async () => {
        this.props.getMarks(this.props.profile.id, this.props.profile.secret);

        let id = setInterval(() => {
            if (this.props.appData.marks.data.length !== 0) {
                this.marksData = this.props.appData.marks;
                clearInterval(id);
                this.startRender();
            }
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

        let generateSubjectsFields = (currentPeriod) => {
            this.marksData.data.forEach(subject => {
                if (subject.periods.length !== 0)
                    subjectsFields.push(generateSubject(subject, currentPeriod));
            })
        };

        generateSubjectsFields(currentTab);

        function drawLastMarks() {
            return (
                <Div className="lastMarkContainer">
                    <div className="lastMarkVal">
                        <Mark size="36" val="5" is_routine={false} fontSize="20"/>
                    </div>
                    <div className="lastMarkSubject">Математика</div>
                    <div className="lastMarkDate">Сегодня</div>
                </Div>
            );
        }

        function generateSubject(subject, currentPeriod) {
            let period = subject.periods[currentPeriod];
            let marks = [];
            let avg = 0;
            period.marks.forEach(mark => {
                avg += mark.value * mark.weight;
                marks.push(
                    <div>
                        <Mark size="16" val={mark.value} is_routine={true} fontSize="12"/>
                    </div>
                );
            });
            avg /= marks.length;
            avg = avg.toFixed(2);
            return (
                <Div className="allMarksContainer">
                    <div className="subjectRow">
                        <span className="subject">
                            {subject.name}
                        </span>
                        <span className="avg">
                            {isNaN(avg) ? null : avg}
                        </span>
                    </div>
                    <div className="marksRow">
                        {marks}
                    </div>
                    <div className="advicesRow">
                        <div className="adviceContainer">
                            Получите 1 пятерку
                        </div>
                    </div>
                </Div>
            );
        }

        return (
            <div id={currentTab}>
                <Div className="marksBlocksTitle" style={{paddingTop: "0"}}>
                    ПОСЛЕДНИЕ ОЦЕНКИ
                </Div>
                <HorizontalScroll className="lastMarksContainer">
                    {drawLastMarks()}
                </HorizontalScroll>
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
                            <Mark size="24" val={mark} is_routine={true} fontSize="12"/>
                        </div>
                    )
            });
            console.log("marksArr", marks);

            return (
                <Div className="resultMarksContainer">
                    <span className="resultMarksContainerSubject">{subject.name}</span>
                    <div className="resultMarksContainerMarks">
                        {renderedMarks}
                        <div className="resultMarksContainerResultedMark">
                            <Mark size="24" val={subject.year_mark} is_routine={false} fontSize="12"/>
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
                <PanelHeader
                    noShadow={true}
                >
                    Оценки
                </PanelHeader>
                <div className="marksScreen">
                <Div style={{paddingTop: "0", paddingBottom: "0",}}>
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
            </Panel>
        )
    }

}

Marks.propTypes = {
    id: PropTypes.string.isRequired,
    getMarks: PropTypes.func.isRequired,
    profile: PropTypes.any.isRequired,
    appData: PropTypes.any.isRequired,
};

export default Marks;