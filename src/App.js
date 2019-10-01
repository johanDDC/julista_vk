import React from 'react';
import VKconnect from '@vkontakte/vkui-connect';
import {Root} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux'

import AuthorizationView from "./views/AuthorizationView"
import BottomBar from "./views/BottomBar"
import {setUser} from "./redux/actions/FetchedUserAction";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let vk_params = window.location.search.slice(1).split('&')
            .map((queryParam) => {
                let kvp = queryParam.split('=');
                return {key: kvp[0], value: kvp[1]}
            })
            .reduce((query, kvp) => {
                query[kvp.key] = decodeURIComponent(kvp.value);
                return query
            }, {});

        VKconnect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    let user = e.detail.data;
                    user.vk_user_id = vk_params.vk_user_id;
                    user.notifications = vk_params.vk_are_notifications_enabled;
                    user.group = vk_params.vk_viewer_group_role;
                    this.props.setUserAction(user);
                    break;
                default:
                    // console.log(e);
                    break;
            }
        });
        VKconnect.send('VKWebAppGetUserInfo', {});
    }

    render() {
        return (
            <Root activeView={this.props.activeView}>
                <AuthorizationView
                    id="AuthorizationView"
                >
                </AuthorizationView>
                <BottomBar id="MainView"/>
            </Root>
        );
    }
}

const mapStateToProps = store => {
    // console.log("App", store);
    return {
        activeView: store.activeView,
        activePanel: store.activePanel,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserAction: user => dispatch(setUser(user)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
