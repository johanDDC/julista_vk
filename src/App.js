import React from 'react';
import VKconnect from '@vkontakte/vkui-connect';
import {Root} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux'

import AuthorizationView from "./views/AuthorizationView"
import BottomBar from "./views/BottomBar"

const reducer = () => {

};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        VKconnect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
                    console.log(e.detail.type);
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
                <BottomBar id="MainView" userId={this.props.userId} userSecret={this.props.userSecret}/>
            </Root>
        );
    }
}

const mapStateToProps = store => {
    console.log("App", store);
    return {
        activeView: store.activeView,
        activePanel: store.activePanel,
        userId: store.userId,
        userSecret: store.userSecret,
    }
};

export default connect(mapStateToProps)(App)
