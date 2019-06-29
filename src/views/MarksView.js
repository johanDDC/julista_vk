import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Marks from '../panels/marks'

import {getAndAggregateMarks} from "../utils/api"

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
                <Marks id={this.state.activePanel} go={this.props.go} marksData={this.state.marksData}/>
            </View>
        )
    }
}

MarksView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
    userSecret: PropTypes.any,
    userId: PropTypes.any
};

export default MarksView;