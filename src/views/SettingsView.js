import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Settings from '../panels/settings'

class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'settings'
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Settings id={this.state.activePanel} go={this.props.go} fetchedUser={this.props.fetchedUser}/>
            </View>
        )
    }
}

SettingsView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
};

export default SettingsView;