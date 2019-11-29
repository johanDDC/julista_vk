import React from 'react';
import {View, ActionSheet, ActionSheetItem, withPlatform, ANDROID, IOS,} from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";
import {setExpectedMark, setModuleSystem, switchView} from "../redux/actions/AppPresentationAction";
import PurposeMarkFive from "../custom_components/icon-pack/PurposeMarkFive"
import PurposeMarkFour from "../custom_components/icon-pack/PurposeMarkFour"
import PurposeMarkThree from "../custom_components/icon-pack/PurposeMarkThree"
import "./styles/Settings.css"
import {setPanel} from "../redux/actions/AppPresentationAction";
import {clearProfile} from "../redux/actions/ProfileAction";
import {clearData} from "../redux/actions/AppLogicAction";
import {switchTheme} from "../redux/actions/AppPresentationAction";

class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
        };
    }

    chooseMark = () => {
        this.setState({
            popout:
                <ActionSheet
                    onClose={() => this.setState({popout: null})}
                    title="Выбери желаемую оценку"
                >
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(5);
                                     }}
                                     before={<PurposeMarkFive/>}>
                        Всегда стремись к лучшему =)
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(4);
                                     }}
                                     before={<PurposeMarkFour/>}>
                        Не переоценивай себя ;)
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setMarkAction(3);
                                     }}
                                     before={<PurposeMarkThree/>}>
                        Никогда не отчаивайся!
                    </ActionSheetItem>
                    {this.props.platform === IOS && <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>}
                </ActionSheet>
        });
    };

    chooseSystem = () => {
        this.setState({
            popout:
                <ActionSheet
                    onClose={() => this.setState({popout: null})}
                    title="Выбери свою систему обучения:"
                >
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setModuleSystem("четверти");
                                     }}
                                     // before={<PurposeMarkFive/>}
                    >
                        Четверти
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setModuleSystem("триместры");
                                     }}
                                     // before={<PurposeMarkFour/>}
                    >
                        Триместры
                    </ActionSheetItem>
                    <ActionSheetItem autoclose
                                     onClick={() => {
                                         this.props.setModuleSystem("полугодия");
                                     }}
                                     // before={<PurposeMarkThree/>}
                    >
                        Полугодия
                    </ActionSheetItem>
                    {this.props.platform === IOS && <ActionSheetItem autoclose theme="cancel">Cancel</ActionSheetItem>}
                </ActionSheet>
        });
    };

    render() {
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "settings" : this.props.activePanel)}
                  popout={this.state.popout}>
                <Settings id="settings"
                          expectedMark={this.props.expectedMark}
                          chooseMark={this.chooseMark}
                          chooseSystem={this.chooseSystem}
                          switchView={this.props.switchViewAction}
                          setPanel={this.props.setPanelAction}
                          profile={this.props.profile}
                          signOutClear={this.props.signOutClear}
                          theme={this.props.theme}
                          setTheme={this.props.setThemeAction}
                />
            </View>
        )
    }
}

withPlatform(SettingsView);

const mapStateToProps = store => {
    // console.log("Settings View", store);
    return {
        activePanel: store.presentation.activePanel,
        profile: store.profile,
        expectedMark: store.presentation.expectedMark,
        theme: store.presentation.theme,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOutClear: () => {
            dispatch(clearProfile());
            dispatch(clearData());
        },
        setMarkAction: mark => dispatch(setExpectedMark(mark)),
        setModuleSystem: type => dispatch(setModuleSystem(type)),
        setPanelAction: panel => dispatch(setPanel(panel)),
        switchViewAction: (view, panel) => dispatch(switchView(view, panel)),
        setThemeAction: theme => dispatch(switchTheme(theme)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);