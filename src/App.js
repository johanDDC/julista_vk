import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Root} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import store from "./redux/store/main"
import {Provider} from "react-redux"

import AuthorizationView from "./views/AuthorizationView"
import BottomBar from "./views/BottomBar"

const initialState = {
    activeView: 'AuthorizationView',
    diary: null,
    fetchedUser: null,
    userLogin: null,
    userPassword: null,
    userId: null,
    userSecret: null
};
const reducer = () => {

};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeVeiw: 'AuthorizationView',
            activePanel: 'auth',
            fetchedUser: null,

            userId: null,
            userSecret: null
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    go = (e) => {
        console.log(e);
        this.setState({activePanel: e.currentTarget.dataset.to})
    };

    updateData = (view, id, secret) => {
        this.setState({
            activeVeiw: view,
            userId: id,
            userSecret: secret
        })
    };

    render() {
        return (
            <Provider store={store}>
                <Root activeView={this.state.activeVeiw}>
                    <AuthorizationView
                        id="AuthorizationView"
                        activePanel="choose_diary"
                        fetchedUser={this.state.fetchedUser}
                        go={this.go}
                        updateFunc={this.updateData}>
                    </AuthorizationView>
                    <BottomBar id="MainView" userId={this.state.userId} userSecret={this.state.userSecret}/>
                </Root>
            </Provider>
        );
    }
}

export default App;
