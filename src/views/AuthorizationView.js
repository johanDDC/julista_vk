import React from 'react';
import {View, ScreenSpinner, Alert, ModalRoot, ModalCard} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import ChooseStudent from '../panels/choose_student'
import ChooseSchool from '../panels/choose_school'
import "./styles/Authorization.css"
import {connect} from 'react-redux'
import {doAuthorize, setDiary, setProfile, setStudent, vkAuth} from "../redux/actions/ProfileAction";
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";

let choose_schools_data = [];

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
    callError = (message) => {
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
                    <p>{message}</p>
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
                    caption="Вы можете войти в дневник не вводя данные."
                    actions={[{
                        title: 'Войти',
                        type: 'primary',
                        action: () => {
                            if (this.props.profile.student === null) {
                                this.props.setPanelAction("choose_student");
                            } else {
                                this.props.setViewAction("MainView", "schedule");
                            }
                            let locData = localStorage.getItem("userData")
                                ? JSON.parse(localStorage.getItem("userData"))
                                : {};
                            locData = {
                                ...locData,
                                id: this.props.profile.id,
                                secret: this.props.profile.secret,
                                diary: this.props.profile.diary,
                                students: this.props.profile.students,
                                student: this.props.profile.student,
                            };
                            localStorage.setItem("userData", JSON.stringify(locData));
                            this.setActiveModal(null);
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
                      stateData={choose_schools_data}
                />
                <ChooseSchool id="choose_school"
                              setPanel={this.props.setPanelAction}
                              schools={choose_schools_data[0]}
                              chooser={choose_school}
                />
                <ChooseStudent id="choose_student"
                               profile={this.props.profile}
                               setStudent={this.props.setStudentAction}
                               setView={this.props.setViewAction}
                               setPanel={this.props.setPanelAction}
                               setProfile={this.props.setProfileAction}
                />
            </View>
        )
    }
}

let choose_school = (school) => {
    choose_schools_data.push(school)
};


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
        setPanelAction: (panel, kwarg) => {
            if (kwarg)
                choose_schools_data = kwarg;
            dispatch(setPanel(panel))
        },
        setViewAction: view => dispatch(setView(view)),
        setStudentAction: student => dispatch(setStudent(student)),
        setProfileAction: profile => dispatch(setProfile(null, profile, null)),
        doVkAuth: params => dispatch(vkAuth(params)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);