import AccountView from "./AccountView";
import MarksView from "./MarksView";
import ScheduleView from "./ScheduleView";
import PlusView from "./PlusView";
import SettingsView from "./SettingsView";
import PropTypes from "prop-types";

import React from "react";
import { View, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';

import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';

class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'account'
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'account'}
                        data-story="account"
                    ><Icon28User/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'marks'}
                        data-story="marks"
                    ><Icon28SmileOutline/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'schedule'}
                        data-story="schedule"
                        label="12"
                    ><Icon28Newsfeed/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'plus'}
                        data-story="plus"

                    ><Icon28Notification/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'settings'}
                        data-story="settings"
                    ><Icon28Settings/></TabbarItem>
                </Tabbar>
            }>
                <AccountView id="account" activePanel="account" >
                </AccountView>
                <MarksView id="marks" activePanel="account">
                </MarksView>
                <ScheduleView id="schedule" activePanel="account">
                </ScheduleView>
                <PlusView id="plus" activePanel="account">
                </PlusView>
                <SettingsView id="settings" activePanel="account">
                </SettingsView>
            </Epic>
        )
    }
}

BottomBar.propTypes = {
    id: PropTypes.string.isRequired
};

export default BottomBar;