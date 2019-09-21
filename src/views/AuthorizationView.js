import React from 'react';
import {View, ScreenSpinner, Alert, ModalRoot, ModalCard} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import ChooseStudent from '../panels/choose_student'
import "./styles/Authorization.css"
import {connect} from 'react-redux'
import {doAuthorize, setDiary, setStudent, vkAuth} from "../redux/actions/profileAction";
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";


class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
            activeModal: null,
            modalHistory: [],
        };

    }

    setActiveModal(activeModal) {
        activeModal = activeModal || null;
        let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

        if (activeModal === null) {
            modalHistory = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
        } else {
            modalHistory.push(activeModal);
        }

        this.setState({
            activeModal,
            modalHistory
        });
    };

    openModal = () => {
        this.setActiveModal("authThroughVk");
    };

    viewScreenSpinner = async (switcher) => {
        this.setState({popout: (switcher ? <ScreenSpinner/> : null)});
    };

    callIncorrect = () => {
        this.setState({
            popout:
                <Alert
                    actionsLayout="vertical"
                    actions={[{
                        title: 'ОК',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={() => this.setState({popout: null})}
                >
                    <h2>Ошибка авторизации</h2>
                    <p>Неправильный логин или пароль</p>
                </Alert>
        })
    };
    callError = () => {
        this.setState({
            popout:
                <Alert
                    actionsLayout="vertical"
                    actions={[{
                        title: 'ОК',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={() => this.setState({popout: null})}
                >
                    <h2>Ошибка авторизации</h2>
                    <p>Проблемы с подключением. Пожалуйста, перепроверьте правильность введённых данных и попробуйте ещё
                        раз.</p>
                </Alert>
        })
    };
    callUnsupported = () => {
        this.setState({
            popout:
                <Alert
                    actionsLayout="vertical"
                    actions={[{
                        title: 'ОК',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={() => this.setState({popout: null})}
                >
                    <h2>Ошибка авторизации</h2>
                    <p>Опс, войти не получилось. Вполне возможно, что ваша школа ещё не поддерживается нашим дневником.
                        К сожалению вам приёдтся подождать, пока мы не добавим вашу школу. Об обновлениях поддержки
                        мы обязательно напишем в нашей группе в ВК.</p>
                </Alert>
        })
    };

    render() {
        const modal =
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalCard
                    id="authThroughVk"
                    onClose={() => this.setActiveModal(null)}
                    // icon={<Icon56MoneyTransferOutline/>}
                    title="Мы уже знакомы!"
                    caption="Вы ранее уже авторизовывались в приложении, теперь вам не нужно заново вводить данные."
                    actions={[{
                        title: 'Войти',
                        type: 'primary',
                        action: () => {
                            console.log("students", this.props.profile.student);
                            if (this.props.profile.student === null) {
                                this.props.setPanelAction("choose_student");
                            } else {
                                this.props.setViewAction("MainView", "schedule");
                            }
                            this.setActiveModal(null)
                        }
                    }]}
                >
                </ModalCard>
            </ModalRoot>;

        return (
            <View popout={this.state.popout}
                  modal={modal}
                  activePanel={this.props.activePanel === "settings" ? "choose_diary" : this.props.activePanel}>
                <ChooseDiary id="choose_diary"
                             setDiary={this.props.setDiaryAction}
                             setPanel={this.props.setPanelAction}
                             vkAuth={this.props.doVkAuth}
                />
                <Auth id="auth"
                      fetchedUser={this.props.fetchedUser}
                      setSpinner={this.viewScreenSpinner}
                      setPanel={this.props.setPanelAction}
                      setView={this.props.setViewAction}
                      profile={this.props.profile}
                      getProfile={this.props.getProfileAction}
                      openError={this.callError}
                      openIncorrect={this.callIncorrect}
                      openUnsupported={this.callUnsupported}
                      openModal={this.openModal}
                />
                <ChooseStudent id="choose_student"
                               profile={this.props.profile}
                               setStudent={this.props.setStudentAction}
                               setView={this.props.setViewAction}
                               setPanel={this.props.setPanelAction}
                />
            </View>
        )
    }
}


const mapStateToProps = store => {
    // console.log("Auth View", store);
    return {
        activePanel: store.activePanel,
        diary: store.diary,
        fetchedUser: store.fetchedUser,
        profile: store.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDiaryAction: diary => dispatch(setDiary(diary)),
        getProfileAction: (login, password, diary, region, province, city, school) => {
            dispatch(doAuthorize(login, password, diary, region, province, city, school));
        },
        setPanelAction: panel => dispatch(setPanel(panel)),
        setViewAction: view => dispatch(setView(view)),
        setStudentAction: student => dispatch(setStudent(student)),
        doVkAuth: params => dispatch(vkAuth(params)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);