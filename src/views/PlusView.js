import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Plus from "../panels/plus";
import Schedule from "./ScheduleView";

class PlusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'plus'
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Plus  id={this.state.activePanel} go={this.props.go}/>
            </View>
        )
    }
}

PlusView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
};

export default PlusView;