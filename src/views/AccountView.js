import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@vkontakte/vkui';
import Account from '../panels/account'
import {connect} from "react-redux";
// import getAccount from "../utils/api"


class AccountView extends React.Component {
    constructor(props) {
        super(props);
    }

    // data = getAccount(token, pid);

    render() {
        console.log("AP", this.props.activePanel);
        // console.log('json', this.data);
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "account" : this.props.activePanel)}>
                <Account id="account"/>
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Account View", store);
    return {
        activePanel: store.activePanel,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

export default connect(mapStateToProps)(AccountView)