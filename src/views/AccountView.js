import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Account from '../panels/account'
import getAccount from "../utils/api"

let token = "4eb19a73d08ec2ed08e02551746be828";
let pid = "5801878";

class AccountView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel : this.props.activePanel
        }
    }

    // data = getAccount(token, pid);

    render() {
        console.log(this.state.activePanel);
        // console.log('json', this.data);
        return (
            <View activePanel={this.props.activePanel}>
                <Account id={this.state.activePanel} go={this.props.go} fetchedUser={this.props.fetchedUser}/>
            </View>
        )
    }
}

AccountView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
};

export default AccountView;