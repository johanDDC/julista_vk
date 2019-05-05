import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Account from '../panels/account'

class PlusView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : 'account'
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Account id="auth" go={this.props.go} fetchedUser={this.props.fetchedUser}/>
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