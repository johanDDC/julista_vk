import React from 'react';
import {
    HeaderButton,
    withPlatform,
    ANDROID,
    IOS,
    ModalPage,
    ModalPageHeader,
    ModalRoot,
    View,
} from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";
import {getJournal} from "../redux/actions/AppLogicAction";
import "./styles/Schedule.css"
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

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
        this.setState({
            modalSchedule:
                <ModalRoot activeModal="modalSchedule">
                    <ModalPage
                        id="modalSchedule"
                        onClose={this.closeModal}
                        settlingHeight={50}
                        header={
                            <ModalPageHeader
                                left={this.props.platform === ANDROID &&
                                <HeaderButton onClick={this.closeModal}><Icon24Cancel/></HeaderButton>}
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

withPlatform(ScheduleView);

const mapStateToProps = store => {
    // console.log("Schedule View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getJournalAction: (userId, secret, start, end, student_id) => {
            dispatch(getJournal(userId, secret, start, end, student_id))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleView);