import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Auth from '../panels/auth'

class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Auth id="auth" go={this.props.go} fetchedUser={this.props.fetchedUser}/>
            </View>
        )
    }
}

AuthorizationView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default AuthorizationView;