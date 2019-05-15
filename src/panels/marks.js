import {Tabs , Div, Group, Button, Panel, PanelHeader, TabsItem, HorizontalScroll} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/marks.css"

class Marks extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            activeTab: "1",
        };
    }

    render() {
        return(
            <Panel id={this.props.id}>
                <PanelHeader
                    noShadow>
                    <Tabs theme="header" type="default" className="marksTabs">
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
                </PanelHeader>
                <Div className="title">
                    ПОСЛЕДНИЕ ОЦЕНКИ
                </Div>
                <HorizontalScroll className="lastMarksContainer">
                    <Div className="lastMarkContainer">

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
                </Div>
            </Panel>
        )
    }

}
Marks.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default Marks;