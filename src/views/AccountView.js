import React from 'react';
import {View} from '@vkontakte/vkui';
import Account from '../panels/account'
import {connect} from "react-redux";
import ChooseStudent from "../panels/choose_student";
import {setStudent} from "../redux/actions/ProfileAction";
import {setPanel} from "../redux/actions/AppPresentationAction";
import {clearData} from "../redux/actions/AppLogicAction";
import {getProfileInfo} from "../utils/requests";


class AccountView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Account id="account"
                         fetchedUser={this.props.fetchedUser}
                         profile={this.props.profile}
                         setPanel={this.props.setPanelAction}
                         clearJournalData={this.props.clearJournalData}
                />
                <ChooseStudent id="choose_student"
                               profile={this.props.profile}
                               setStudent={this.props.setStudentAction}
                               setPanel={this.props.setPanelAction}
                               getProfileInfo={this.props.getProfileInfoAction}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Account View", store);
    return {
        activePanel: store.presentation.activePanel,
        profile: store.profile,
        fetchedUser: store.fetchedUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        clearJournalData: () => dispatch(clearData()),
        setPanelAction: panel => {
            dispatch(setPanel(panel))
        },
        setStudentAction: student => dispatch(setStudent(student)),
        getProfileInfoAction: profile => getProfileInfo(dispatch, profile),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountView);