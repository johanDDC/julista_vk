import React from 'react';
import PropTypes from 'prop-types';
import {ScreenSpinner, View} from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popout : null,
        };
        this.currentDay = new Date().getDay();
    }

    viewScreenSpinner = (switcher) => {
        this.setState({popout: (switcher ? <ScreenSpinner style={{color: "black"}}/> : null)});
        console.log("start spinner", switcher);
        // this.setState({popout: <ScreenSpinner/>})
    };

    render() {
        return (
            <View activePanel={this.props.activePanel} popout={this.state.popout}>
                <Schedule id="schedule"
                          currentDay={this.currentDay}
                          userSecret={this.props.userSecret}
                          userId={this.props.userId}
                          setSpinner={this.viewScreenSpinner}/>
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