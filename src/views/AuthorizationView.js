import React from 'react';
import {View, ScreenSpinner, Alert, ModalRoot, ModalCard} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import ChooseStudent from '../panels/choose_student'
import ChooseSchool from '../panels/choose_school'
import "./styles/Authorization.css"
import {connect} from 'react-redux'
import {authVk, clearProfile, setDiary, setStudent} from "../redux/actions/ProfileAction";
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";

import {auth, getProfileInfo, vkAuth} from "../utils/requests"

let choose_schools_data = [];

class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
            activeModal: null,
            modalHistory: [],
        };

        this.authData = null;
    }

    componentDidMount() {
        vkAuth()
            .then(data => {
                console.log("vk", data);
                this.authData = data;
                this.openModal();
            });
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

    render() {
        const modal =
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalCard
                    id="authThroughVk"
                    onClose={() => {
                        this.setActiveModal(null);
                        this.props.signOutClear();
                    }}
                    title="Мы уже знакомы!"
                    caption="Вы можете войти в дневник не вводя данные."
                    actions={[{
                        title: 'Войти',
                        type: 'primary',
                        action: () => {
                            this.props.setProfileAction(this.authData);
                            this.props.doVkAuth(this.authData).then(e => {
                                this.setActiveModal(null);
                                if (this.authData.student === null) {
                                    this.props.setPanelAction("choose_student");
                                } else {
                                    this.props.setViewAction("MainView", "schedule");
                                }
                            });
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
                />
                <Auth id="auth"
                      setSpinner={this.viewScreenSpinner}
                      setPanel={this.props.setPanelAction}
                      setView={this.props.setViewAction}
                      profile={this.props.profile}
                      getProfile={this.props.getProfileAction}
                      openError={this.callError}
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
            return new Promise((resolve, reject) => {
                auth(dispatch, login, password, diary, region, province, city, school)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });
        },
        setPanelAction: (panel, kwarg) => {
            if (kwarg)
                choose_schools_data = kwarg;
            dispatch(setPanel(panel))
        },
        setViewAction: view => dispatch(setView(view)),
        setStudentAction: student => dispatch(setStudent(student)),
        setProfileAction: profile => getProfileInfo(dispatch, profile),
        doVkAuth: authData => {
            return new Promise(resolve => {
                dispatch(authVk(authData, true));
                resolve();
            })
        },

        signOutClear: () => {
            dispatch(clearProfile());
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);