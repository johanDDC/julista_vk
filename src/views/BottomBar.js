import React from "react";
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import "./styles/BottomBar.css"

import AccountIcon from "../custom_components/icon-pack/AccountIcon"
import MarksIcon from "../custom_components/icon-pack/MarksIcon"
import ScheduleIcon from "../custom_components/icon-pack/ScheduleIcon"
import PlusIcon from "../custom_components/icon-pack/PlusIcon"
import SettingsIcon from "../custom_components/icon-pack/SettingsIcon"


import AccountView from "./AccountView";
import MarksView from "./MarksView";
import ScheduleView from "./ScheduleView";
import PlusView from "./PlusView";
import SettingsView from "./SettingsView";
import PropTypes from "prop-types";


class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'Account'
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        console.log('lal', e);
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {
        return (
            <Epic className="bottomBarItself" activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Account'}
                        data-story="Account">
                        <AccountIcon id="gradient-horizontal" size="28" selected={this.state.activeStory === 'Account'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Marks'}
                        data-story="Marks">
                        <MarksIcon size="28" selected={this.state.activeStory === 'Marks'}/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Schedule'}
                        data-story="Schedule"
                    ><ScheduleIcon size="28" selected={this.state.activeStory === 'Schedule'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Plus'}
                        data-story="Plus"
                    ><PlusIcon size="28" selected={this.state.activeStory === 'Plus'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Settings'}
                        data-story="Settings"
                    ><SettingsIcon size="28" selected={this.state.activeStory === 'Settings'}/></TabbarItem>
                </Tabbar>
            }>
                <svg style={{width:0,height:0,position: "absolute"}} aria-hidden="true" focusable="false">
                    <linearGradient id="my-cool-gradient" x2="1" y2="1">
                        <stop offset="0%" stop-color="#0000ff" />
                        <stop offset="100%" stop-color="#ff0000" />
                    </linearGradient>
                </svg>
                <AccountView id="Account" activePanel="account" >
                </AccountView>
                <MarksView id="Marks" activePanel="marks">
                </MarksView>
                <ScheduleView id="Schedule" activePanel="schedule">
                </ScheduleView>
                <PlusView id="Plus" activePanel="plus">
                </PlusView>
                <SettingsView id="Settings" activePanel="settings">
                </SettingsView>
            </Epic>
        )
    }
}

BottomBar.propTypes = {
    id: PropTypes.string.isRequired
};

export default BottomBar;