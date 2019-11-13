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
            modalSubject: "",
            modalContent: {},
            activeModal: null,
        };
        this.closeModal = () => {
            this.setState({activeModal: null})
        };
    }

    setModalSchedule = (modal, name) => {
        this.setState({
            modalSubject: name,
            modalContent: modal,
            activeModal: "modalSchedule",
        })
    };

    render() {
        let modal =
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id="modalSchedule"
                    onClose={this.closeModal}
                    settlingHeight={50}
                    header={
                        <ModalPageHeader
                            left={
                                <HeaderButton onClick={this.closeModal}><Icon24Cancel/></HeaderButton>}
                        >
                            {this.state.modalSubject}
                        </ModalPageHeader>
                    }>
                    {this.state.modalContent}
                </ModalPage>
            </ModalRoot>
        ;
        return (
            <View activePanel="schedule"
                  modal={modal}>
                <Schedule id="schedule"
                          profile={this.props.profile}
                          appData={this.props.appLogic}
                          openModal={this.setModalSchedule}
                />
            </View>
        )
    }
}

withPlatform(ScheduleView);

const mapStateToProps = store => {
    return {
        activePanel: store.presentation.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

export default connect(
    mapStateToProps,
    null
)(ScheduleView);