import React from 'react';
import {View, ModalRoot, ModalPageHeader, withPlatform, ANDROID, IOS, HeaderButton, ModalPage} from '@vkontakte/vkui';
import Marks from '../panels/marks'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import "./styles/Marks.css"

import {connect} from "react-redux";

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
                       openModal={this.setModalMark}
                       closeModal={this.closeModal}
                       expectedMark={this.props.expectedMark}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log(store);
    return {
        activePanel: store.presentation.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
        expectedMark: store.presentation.expectedMark,
    }
};

withPlatform(MarksView);

export default connect(
    mapStateToProps,
    null
)(MarksView);