import React from 'react';
import {View} from '@vkontakte/vkui';
import Marks from '../panels/marks'

import {connect} from "react-redux";
import {getLastMarks, getMarks} from "../redux/actions/AppLogicAction";

class MarksView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Marks id="marks"
                       profile={this.props.profile}
                       appData={this.props.appLogic}
                       getMarks={this.props.getMarksAction}
                       getLastMarks={this.props.getLastMarksAction}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Marks View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMarksAction: (userId, secret) => {
            dispatch(getMarks(userId, secret))
        },
        getLastMarksAction: (userId, secret) => {
          dispatch(getLastMarks(userId, secret))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarksView);