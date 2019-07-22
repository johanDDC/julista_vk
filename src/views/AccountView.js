import React from 'react';
import { View } from '@vkontakte/vkui';
import Account from '../panels/account'
import {connect} from "react-redux";


class AccountView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
        profile: store.profile
    }
};

export default connect(mapStateToProps)(AccountView)