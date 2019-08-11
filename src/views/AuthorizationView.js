import React from 'react';
import {View, ScreenSpinner, Alert} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import ChooseStudent from '../panels/choose_student'
import "./styles/Authorization.css"
import {setPanel, setPresentation} from "../redux/actions/appPresentationAction";
import {connect} from 'react-redux'
import {doAuthorize, setDiary, setStudent} from "../redux/actions/profileAction";


class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: null
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
                    <p>Проблемы с подключением. Пожалуйста, перепроверьте правильность введённых данных и попробуйте ещё раз.</p>
                </Alert>
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
                      setPresentation={this.props.setPresentationAction}
                      profile={this.props.profile}
                      getProfile={this.props.getProfileAction}
                      openError={this.callError}
                      openIncorrect={this.callIncorrect}
                />
                <ChooseStudent id="choose_student"
                               profile={this.props.profile}
                               setStudent={this.props.setStudentAction}
                               setPresentation={this.props.setPresentationAction}
                />
            </View>
        )
    }
}


const mapStateToProps = store => {
    console.log("Auth View", store);
    return {
        activePanel: store.appPresentation.activePanel,
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
        setPresentationAction: presentation => dispatch(setPresentation(presentation)),
        setStudentAction: student => dispatch(setStudent(student)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);