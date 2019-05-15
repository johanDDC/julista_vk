import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Marks from '../panels/marks'

class MarksView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'marks'
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Marks id={this.state.activePanel} go={this.props.go}/>
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
};

export default MarksView;