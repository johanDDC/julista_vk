import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Schedule from '../panels/schedule'

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'schedule'
        };

        this.currentDay = new Date().getDay();
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Schedule id={this.state.activePanel}
                          go={this.props.go}
                          currentDay={this.currentDay}
                          userSecret={this.props.userSecret}
                          userId={this.props.userId}/>
            </View>
        )
    }
}

ScheduleView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
    userSecret: PropTypes.any,
    userId: PropTypes.any
};

export default ScheduleView;