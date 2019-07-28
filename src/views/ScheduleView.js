import React from 'react';
import {HeaderButton, IS_PLATFORM_ANDROID, ModalPage, ModalPageHeader, ModalRoot, View} from '@vkontakte/vkui';
import Schedule from '../panels/schedule'
import {connect} from "react-redux";
import {getJournal} from "../redux/actions/AppLogicAction";
import "./styles/Schedule.css"
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class ScheduleView extends React.Component {
    constructor(props) {
        super(props);
        this.currentDay = new Date().getDay();

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
                                <HeaderButton onClick={this.closeModal}><Icon24Cancel style={{color:"#999999"}}/></HeaderButton>}
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
            <View activePanel={this.props.activePanel} modal={this.state.modalSchedule}>
                <Schedule id="schedule"
                          currentDay={this.currentDay}
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
        getJournalAction: (journal, userId, secret, start, end) => {
            dispatch(getJournal(journal, userId, secret, start, end))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleView);