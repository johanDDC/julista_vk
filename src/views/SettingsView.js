import React from 'react';
import {View, ActionSheet, ActionSheetItem, platform, IOS} from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";
import {setMark} from "../redux/actions/expectedMarkAction";
import Mark from "../custom_components/mark"
import "./styles/Settings.css"

class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
        };

        const osname = platform();

        this.choise =
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
                        <span className="markChooseLabel">Всегда стремись к лучшему :)</span>
                    </div>
                </ActionSheetItem>
                <ActionSheetItem autoclose onClick={() => {
                    this.props.setMarkAction(4)
                }}>
                    <div className="markChooseLabelContainer">
                        <div className="markChooseMarkContainer">
                            <Mark size="28" val="4" is_routine={false}/>
                        </div>
                        <span className="markChooseLabel">Адекватно оценивай свои возможности ;)</span>
                    </div>
                </ActionSheetItem>
                <ActionSheetItem autoclose onClick={() => {
                    this.props.setMarkAction(3)
                }}>
                    <div className="markChooseLabelContainer">
                        <div className="markChooseMarkContainer">
                            <Mark size="28" val="3" is_routine={false}/>
                        </div>
                        <span className="markChooseLabel">Ёбаный инвалид, ты безнадёжен :(</span> /*Никогда не отчаивайся*/
                    </div>
                </ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>}
            </ActionSheet>
        ;
    }

    chooseMark = () => {
        this.setState({popout: this.choise})
    };

    render() {
        return (
            <View activePanel={this.props.activePanel} popout={this.state.popout}>
                <Settings id="settings"
                          expectedMark={this.props.expectedMark}
                          chooseMark={this.chooseMark}/>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);