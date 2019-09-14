import React from 'react';
import {View, ActionSheet, ActionSheetItem, platform, IOS} from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";
import {setMark} from "../redux/actions/expectedMarkAction";
import Mark from "../custom_components/mark"
import "./styles/Settings.css"
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";

class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
        };

        this.osname = platform();
    }

    chooseMark = () => {
        this.setState({popout:
                <ActionSheet
                    onClose={() => this.setState({popout: null})}
                    title="Выбери желаемую оценку"
                >
                    <ActionSheetItem autoclose onClick={() => {
                        this.props.setMarkAction(5)
                    }}>
                        <div className="markChooseLabelContainer">
                            <div className="markChooseMarkContainer">
                                <Mark size="28" val="5" is_routine={false}/>
                            </div>
                            <div className="markChooseLabel">Всегда стремись к лучшему =)</div>
                        </div>
                    </ActionSheetItem>
                    <ActionSheetItem autoclose onClick={() => {
                        this.props.setMarkAction(4)
                    }}>
                        <div className="markChooseLabelContainer">
                            <div className="markChooseMarkContainer">
                                <Mark size="28" val="4" is_routine={false}/>
                            </div>
                            <div className="markChooseLabel">Правильно оценивай свои силы ;)</div>
                        </div>
                    </ActionSheetItem>
                    <ActionSheetItem autoclose onClick={() => {
                        this.props.setMarkAction(3)
                    }}>
                        <div className="markChooseLabelContainer">
                            <div className="markChooseMarkContainer">
                                <Mark size="28" val="3" is_routine={false}/>
                            </div>
                            <div className="markChooseLabel">Никогда не отчаивайся!</div>
                        </div>
                    </ActionSheetItem>
                    {this.osname === IOS && <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>}
                </ActionSheet>
        })
    };

    render() {
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "settings" : this.props.activePanel)}
                  popout={this.state.popout}>
                <Settings id="settings"
                          expectedMark={this.props.expectedMark}
                          chooseMark={this.chooseMark}
                          setView={this.props.setViewAction}
                          setPanel={this.props.setPanelAction}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Settings View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        expectedMark: store.expectedMark
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMarkAction: mark => dispatch(setMark(mark)),
        setPanelAction: panel => dispatch(setPanel(panel)),
        setViewAction: view => dispatch(setView(view)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);