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
        };
        this.closeModal = () => {
            this.setState({modalMarks: null})
        };
    }

    setModalMark = (modal, name) => {
        console.log("platform", this.props.platform);
        this.setState({
            modalMarks:
                <ModalRoot activeModal="modalMark">
                    <ModalPage
                        id="modalMark"
                        onClose={this.closeModal}
                        settlingHeight={50}
                        dynamicContentHeight={true}
                        header={
                            <ModalPageHeader
                                left={this.props.platform === ANDROID &&
                                <HeaderButton onClick={this.closeModal}><Icon24Cancel
                                    style={{color: "#999999"}}/></HeaderButton>}
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
    // console.log("Marks View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
        appLogic: store.appLogic,
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