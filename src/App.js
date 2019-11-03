import React from 'react';
import VKconnect from '@vkontakte/vk-connect-promise';
import {Root} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux'

import AuthorizationView from "./views/AuthorizationView"
import BottomBar from "./views/BottomBar"
import {setUser} from "./redux/actions/FetchedUserAction";
import {getVkParams, recursiveTheming} from "./utils/utils";
import {setTheme} from "./redux/actions/ThemeAction";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let vk_params = getVkParams();

        VKconnect.send("VKWebAppGetUserInfo", {})
            .then(resp => {
                let user = resp.data;
                user.vk_user_id = vk_params.vk_user_id;
                user.notifications = vk_params.vk_are_notifications_enabled;
                user.group = vk_params.vk_viewer_group_role;
                this.props.setUserAction(user);
            })
            .catch(err => console.log(err));

        VKconnect.subscribe(e => {
            try {
                if (e.detail.type === "VKWebAppUpdateConfig") {
                    console.log("subscribed", e.detail.data);
                    if (e.detail.data.scheme !== "client_light") {
                        document.querySelector("body")
                            .setAttribute("scheme", e.detail.data.scheme);
                        this.props.setThemeAction("dark")
                    } else {
                        this.props.setThemeAction("default")
                    }
                }
            } catch (e) {

            }
        });

        VKconnect.send("VKWebAppUpdateConfig", {})
            .then(e => {
                console.log("config", e.detail.data);
                if (e.detail.data.scheme !== "client_light") {
                    document.querySelector("body")
                        .setAttribute("scheme", e.detail.data.scheme);
                    this.props.setThemeAction("dark")
                } else {
                    this.props.setThemeAction("default")
                }
            });
        VKconnect.send("VKWebAppAddToFavorites", {});

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
        theme: store.theme,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserAction: user => dispatch(setUser(user)),
        setThemeAction: theme => dispatch(setTheme(theme)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
