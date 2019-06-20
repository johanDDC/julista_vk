import React from 'react';
import PropTypes from 'prop-types';
import {Div, PanelHeader, View, Group, Panel} from '@vkontakte/vkui';
import Auth from '../panels/auth'
import "./styles/Authorization.css"

class AuthorizationView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Panel id="choose_diary">
                    <PanelHeader noShadow={true}></PanelHeader>
                    <Div className="chooseDiaryScreen">
                        <span className="chooseDiaryScreenTitle">
                            Выберите ваш дневник
                        </span>
                        <div className="chooseDiaryScreenDiaryDiaries">
                            <div className="chooseDiaryScreenDiaryContainer">
                                <div className="chooseDiaryScreenDiaryContainerIcon" style={{backgroundColor: "#0080ff"}}></div>
                                <span className="chooseDiaryScreenDiaryContainerTitle">МЭШ (mos.ru)</span>
                                <div className="chooseDiaryScreenDiaryContainerChecker">
                                    <div>rar</div>
                                </div>
                            </div>
                            <div className="chooseDiaryScreenDiaryContainer">
                                <div className="chooseDiaryScreenDiaryContainerIcon" style={{backgroundColor: "#ff3000"}}></div>
                                <span className="chooseDiaryScreenDiaryContainerTitle">mosreg.ru</span>
                                <div className="chooseDiaryScreenDiaryContainerChecker">
                                    <div>rar</div>
                                </div>
                            </div>
                        </div>
                        <Div id="buttonContainer">
                            <button id="getIn">Войти</button>
                        </Div>
                    </Div>
                </Panel>
                <Auth id="auth" go={this.props.go} fetchedUser={this.props.fetchedUser}/>
            </View>
        )
    }
}

AuthorizationView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    go: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default AuthorizationView;