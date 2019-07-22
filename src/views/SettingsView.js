import React from 'react';
import { View } from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";
import {setMark} from "../redux/actions/expectedMarkAction";

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Settings id="settings"
                expectedMark={this.props.expectedMark}
                changeMark={this.props.setMarkAction}/>
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