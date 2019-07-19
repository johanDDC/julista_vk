import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Settings from '../panels/settings'
import {connect} from "react-redux";

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Settings id="settings"/>
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Settings View", store);
    return {
        activePanel: store.activePanel,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

export default connect(mapStateToProps)(SettingsView)