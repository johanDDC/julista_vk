import React from 'react';
import {View, ScreenSpinner, Alert} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import ChooseStudent from '../panels/choose_student'
import NetschoolMap from "../panels/netschoolAdditionalPanel"
import "./styles/Authorization.css"
import {connect} from 'react-redux'
import {doAuthorize, setDiary, setStudent} from "../redux/actions/profileAction";
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";


class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null,
            netschoolData: {
                login: null,
                password: null,
            }
        }
    }

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

    netschoolSaving = (login, password) => {
        this.setState({
            netschoolData: {
                login: login,
                password: password,
            }
        })
    };

    render() {
        return (
            <View popout={this.state.popout} activePanel={this.props.activePanel}>
                <ChooseDiary id="choose_diary"
                             setDiary={this.props.setDiaryAction}
                             setPanel={this.props.setPanelAction}
                />
                <Auth id="auth"
                      diary={this.props.diary}
                      fetchedUser={this.props.fetchedUser}
                      setSpinner={this.viewScreenSpinner}
                      setPanel={this.props.setPanelAction}
                      setView={this.props.setViewAction}
                      profile={this.props.profile}
                      getProfile={this.props.getProfileAction}
                      openError={this.callError}
                      openIncorrect={this.callIncorrect}
                      netschoolSave={this.netschoolSaving}
                />
                <NetschoolMap id="netschool_map"
                              setPanel={this.props.setPanelAction}
                              netschoolData={this.state.netschoolData}
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
    console.log("Auth View", store);
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
        getProfileAction: (login, password, diary) => {
            dispatch(doAuthorize(login, password, diary));
        },
        setPanelAction: panel => dispatch(setPanel(panel)),
        setViewAction: view => dispatch(setView(view)),
        setStudentAction: student => dispatch(setStudent(student)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);