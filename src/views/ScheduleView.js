import React from 'react';
import PropTypes from 'prop-types';
import {ScreenSpinner, View} from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";
import {setDiary} from "../redux/actions/DiaryAction";
import {setId} from "../redux/actions/IdAction";
import {setSecret} from "../redux/actions/SecretAction";
import {setView} from "../redux/actions/ViewAction";
import {setPanel} from "../redux/actions/PanelAction";
import {getJournal} from "../redux/actions/AppLogicAction";

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popout: null,
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
                          setSpinner={this.viewScreenSpinner}
                          getJournal={this.props.getJournalAction}
                          appData={this.props.appLogic}
                />
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
        appLogic: store.appLogic
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getJournalAction: (journal, userId, secret, start, end) => {
            dispatch(getJournal(journal, userId, secret, start, end))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleView);