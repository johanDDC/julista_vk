import React from 'react';
import {View, ModalRoot, ModalPageHeader, withPlatform, ANDROID, IOS, HeaderButton, ModalPage} from '@vkontakte/vkui';
import Marks from '../panels/marks'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import "./styles/Marks.css"

import {connect} from "react-redux";
import {getLastMarks, getMarks} from "../redux/actions/AppLogicAction";

class MarksView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalMarks: null,
            modalSubject: "",
            modalContent: {},
            activeModal: null,
        };
        this.closeModal = () => {
            this.setState({activeModal: null})
        };
    }

    setModalMark = (modal, name) => {
        this.setState({
            modalSubject: name,
            modalContent: modal,
            activeModal: "modalMark",
        })
    };

    render() {
        let modal =
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id="modalMark"
                    onClose={this.closeModal}
                    settlingHeight={50}
                    dynamicContentHeight={true}
                    header={
                        <ModalPageHeader
                            left={
                                <HeaderButton onClick={this.closeModal}><Icon24Cancel
                                    style={{color: "#999999"}}/></HeaderButton>}
                        >
                            {this.state.modalSubject}
                        </ModalPageHeader>
                    }>
                    {this.state.modalContent}
                </ModalPage>
            </ModalRoot>
        ;
        return (
            <View activePanel={this.props.activePanel}
                  modal={modal}>
                <Marks id="marks"
                       profile={this.props.profile}
                       appData={this.props.appLogic}
                       getMarks={this.props.getMarksAction}
                       getLastMarks={this.props.getLastMarksAction}
                       openModal={this.setModalMark}
                       closeModal={this.closeModal}
                       expectedMark={this.props.expectedMark.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    // console.log("Marks View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
        expectedMark: store.expectedMark,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMarksAction: (userId, secret, student_id) => {
            dispatch(getMarks(userId, secret, student_id))
        },
        getLastMarksAction: (userId, secret, student_id) => {
            dispatch(getLastMarks(userId, secret, student_id))
        }
    }
};

withPlatform(MarksView);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarksView);