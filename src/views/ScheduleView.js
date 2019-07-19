import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);

        this.currentDay = new Date().getDay();
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Schedule id="schedule"
                          currentDay={this.currentDay}
                          userSecret={this.props.userSecret}
                          userId={this.props.userId}/>
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Schedule View", store);
    return {
        activePanel: store.activePanel,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

export default connect(mapStateToProps)(ScheduleView)