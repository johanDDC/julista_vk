import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Marks from '../panels/marks'

import {getAndAggregateMarks} from "../utils/api"
import {connect} from "react-redux";

class MarksView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'marks',

            userId: this.props.userId,
            userSecret: this.props.userSecret,

            marksData: null
        };

        this.getMarks()
    }

    getMarks = () => {
        let marksData = getAndAggregateMarks(this.state.userId, this.state.userSecret);
        this.setState({marksData : marksData})
    };

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Marks id="marks" marksData={this.state.marksData}/>
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Marks View", store);
    return {
        activePanel: store.activePanel,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

export default connect(mapStateToProps)(MarksView)