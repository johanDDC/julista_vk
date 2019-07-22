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

            marksData: null
        };

        this.getMarks()
    }

    getMarks = () => {
        let marksData = getAndAggregateMarks(this.props.profile.id, this.props.profile.secret);
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
        profile: store.profile
    }
};

export default connect(mapStateToProps)(MarksView)