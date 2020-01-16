import React from 'react';
import {View, ScreenSpinner, Alert, ModalRoot, ModalCard} from '@vkontakte/vkui';
import Auth from '../panels/Auth'
import ChooseDiary from '../panels/ChooseDiary'
import ChooseStudent from '../panels/ChooseStudent'
import ChooseSchool from '../panels/choose_school'
import "./styles/Authorization.css"
import {connect} from 'react-redux'
import {ViewProps} from "../utils/Props";
import {Dispatch} from "redux";
import {openModal, openPopout, switchViewAction} from "../redux/actions/AppPresentation";

interface Props extends ViewProps {
    setPopout: (popout: React.ReactChild | null) => void
    closeModal: () => void
    switchView: (view: string, panel: string) => void
}

class AuthorizationView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    viewScreenSpinner = (switcher: boolean) => {
        if (switcher)
            this.props.setPopout(<ScreenSpinner size="medium"/>);
        else
            this.props.setPopout(null);
    };

    callError = (message: string) => {
        this.props.setPopout(
            <Alert
                actionsLayout="vertical"
                actions={[{
                    title: 'ОК',
                    autoclose: true,
                    style: 'default'
                }]}
                onClose={() => this.props.setPopout(null)}
            >
                <h2>Ошибка авторизации</h2>
                <p>{message}</p>
            </Alert>
        );
    };

    completeSignIn = () => {
        this.props.closeModal();
        this.props.switchView("main", "schedule");
    };

    render() {
        const modal =
            <ModalRoot activeModal={this.props.modal}>
                <ModalCard
                    id="vkAuth"
                    onClose={this.completeSignIn}
                    title="Мы уже знакомы!"
                    caption="Вы можете войти в дневник не вводя данные."
                    actions={[{
                        title: 'Хорошо',
                        type: 'primary',
                        action: () => {
                            this.completeSignIn();
                        }
                    }]}
                >
                </ModalCard>
            </ModalRoot>;
        return (
            <View popout={this.props.popout}
                  modal={modal}
                  activePanel={this.props.activePanel === "settings" ? "choose_diary" : this.props.activePanel}>
                <ChooseDiary id="choose_diary"/>
                <Auth id="auth"
                      showSpinner={this.viewScreenSpinner}
                      alertError={this.callError}
                />
                {/*
                <ChooseSchool id="choose_school"
                              setPanel={this.props.setPanelAction}
                              schools={choose_schools_data[0]}
                              chooser={choose_school}
                />
                */}
                <ChooseStudent id="choose_student"
                />
            </View>
        )
    }
}

const mapStateToProps = (store: any) => {
    // console.log("Auth View", store);
    return {
        activePanel: store.appPresentation.activePanel,
        modal: store.appPresentation.activeModal,
        popout: store.appPresentation.popout,
        diary: store.diary,
        fetchedUser: store.fetchedUser,
        profile: store.profile,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPopout: (popout: React.ReactChild | null) => dispatch(openPopout(popout)),
        closeModal: () => dispatch(openModal(null)),
        switchView: (view: string, panel: string) => dispatch(switchViewAction(view, panel)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);