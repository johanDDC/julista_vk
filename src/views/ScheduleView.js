import React from 'react';
import {HeaderButton, IS_PLATFORM_ANDROID, ModalPage, ModalPageHeader, ModalRoot, View} from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";
import {getJournal} from "../redux/actions/AppLogicAction";
import "./styles/Schedule.css"
import SubjectCloseIcon from "../custom_components/icon-pack/SubjectCloseIcon"

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalSchedule: "modalSchedule",
        };
        this.closeModal = () => {
            this.setState({modalSchedule: null})
        };
    }

    setModalSchedule = (modal, name) => {
        console.log("here");
        this.setState({
            modalSchedule:
                <ModalRoot activeModal="modalSchedule">
                    <ModalPage
                        id="modalSchedule"
                        onClose={this.closeModal}
                        settlingHeight={50}
                        header={
                            <ModalPageHeader
                                left={IS_PLATFORM_ANDROID &&
                                <HeaderButton onClick={this.closeModal}><SubjectCloseIcon   /></HeaderButton>}
                            >
                                {name}
                            </ModalPageHeader>
                        }>
                        {modal}
                    </ModalPage>
                </ModalRoot>
        })
    };

    render() {
        return (
            <View activePanel={(this.props.activePanel === "auth" ? "schedule" : this.props.activePanel)} modal={this.state.modalSchedule}>
                <Schedule id="schedule"
                          profile={this.props.profile}
                          getJournal={this.props.getJournalAction}
                          appData={this.props.appLogic}
                          openModal={this.setModalSchedule}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Schedule View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getJournalAction: (journal, userId, secret, start, end, student_id) => {
            dispatch(getJournal(journal, userId, secret, start, end, student_id))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleView);