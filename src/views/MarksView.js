import React from 'react';
import {View, ModalRoot, ModalPageHeader, IS_PLATFORM_ANDROID, HeaderButton, ModalPage} from '@vkontakte/vkui';
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
            activeModal: "modalMark"
        };
        this.closeModal = () => {
            console.log("write this if u`r ignored");
            this.setState({modalMarks: null})
        };
    }

    setModalMark = (modal, name) => {
        this.setState({
            activeModal: "modalMark",
            modalMarks:
                <ModalRoot activeModal={this.state.activeModal}>
                    <ModalPage
                        id="modalMark"
                        onClose={this.closeModal}
                        settlingHeight={50}
                        style={{
                            backgroundColor: "#ff0000"
                        }}
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
            <View activePanel={this.props.activePanel} modal={this.state.modalMarks}>
                <Marks id="marks"
                       profile={this.props.profile}
                       appData={this.props.appLogic}
                       getMarks={this.props.getMarksAction}
                       getLastMarks={this.props.getLastMarksAction}
                       openModal={this.setModalMark}
                       closeModal={this.closeModal}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Marks View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMarksAction: (userId, secret) => {
            dispatch(getMarks(userId, secret))
        },
        getLastMarksAction: (userId, secret) => {
            dispatch(getLastMarks(userId, secret))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarksView);