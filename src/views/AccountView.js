import React from 'react';
import {View} from '@vkontakte/vkui';
import Account from '../panels/account'
import {connect} from "react-redux";
import ChooseStudent from "../panels/choose_student";
import {setProfile, setStudent} from "../redux/actions/ProfileAction";
import {setPanel} from "../redux/actions/PanelAction";
import {clearData} from "../redux/actions/AppLogicAction";


class AccountView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "account" : this.props.activePanel)}>
                <Account id="account"
                         fetchedUser={this.props.fetchedUser}
                         profile={this.props.profile}
                         setPanel={this.props.setPanelAction}
                         clearJournalData={this.props.clearJournalData}
                         theme={this.props.theme}
                />
                <ChooseStudent id="choose_student"
                               profile={this.props.profile}
                               setStudent={this.props.setStudentAction}
                               setPanel={this.props.setPanelAction}
                               setProfile={this.props.setProfileAction}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Account View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        fetchedUser: store.fetchedUser,
        theme: store.theme,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        clearJournalData: () => dispatch(clearData()),
        setPanelAction: panel => {
            dispatch(setPanel(panel))
        },
        setStudentAction: student => dispatch(setStudent(student)),
        setProfileAction: profile => dispatch(setProfile(null, profile, null)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountView);