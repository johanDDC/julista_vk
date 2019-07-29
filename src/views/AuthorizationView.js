import React from 'react';
import {View, ScreenSpinner, Alert} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import ChooseDiary from '../panels/choose_diary'
import "./styles/Authorization.css"
import {setPanel} from "../redux/actions/PanelAction";
import {setView} from "../redux/actions/ViewAction";
import {connect} from 'react-redux'
import {doAuthorize, setDiary} from "../redux/actions/profileAction";


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
                      setView={this.props.setViewAction}
                      setPanel={this.props.setPanelAction}
                      profile={this.props.profile}
                      getProfile={this.props.getProfileAction}
                      openError={this.callError}
                      openIncorrect={this.callIncorrect}
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
        setViewAction: view => dispatch(setView(view)),
        setPanelAction: panel => dispatch(setPanel(panel)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationView);