import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import AuthorizationView from "./views/AuthorizationView"
import BottomBar from "./views/BottomBar"

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeVeiw: 'MainView',
			activePanel: 'auth',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		console.log(e);
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<Root activeView={this.state.activeVeiw}>
				<AuthorizationView id="AuthorizationView" activePanel="auth" fetchedUser={this.state.fetchedUser} go={this.go}>
					{/*<Auth id="auth" fetchedUser={this.state.fetchedUser} go={this.go} />*/}
					{/*<Persik id="persik" go={this.go} />*/}
				</AuthorizationView>
				<BottomBar id="MainView" />
			</Root>
		);
	}
}

export default App;
