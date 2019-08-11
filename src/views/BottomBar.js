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
import {setPanel} from "../redux/actions/appPresentationAction";
import {connect} from "react-redux";


class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'Account',
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        switch (e.currentTarget.dataset.story) {
            case "Account":
                this.props.setPanelAction("account");
                break;
            case "Marks":
                this.props.setPanelAction("marks");
                break;
            case "Schedule":
                this.props.setPanelAction("schedule");
                break;
            case "Plus":
                this.props.setPanelAction("plus");
                break;
            case "Settings":
                this.props.setPanelAction("settings");
                break;
        }
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
                        <AccountIcon size="24" selected={this.state.activeStory === 'Account'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Marks'}
                        data-story="Marks">
                        <MarksIcon size="24" selected={this.state.activeStory === 'Marks'}/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Schedule'}
                        data-story="Schedule"
                    ><ScheduleIcon size="24" selected={this.state.activeStory === 'Schedule'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Plus'}
                        data-story="Plus"
                    ><PlusIcon size="24" selected={this.state.activeStory === 'Plus'}/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Settings'}
                        data-story="Settings"
                    ><SettingsIcon size="24" selected={this.state.activeStory === 'Settings'}/></TabbarItem>
                </Tabbar>
            }>
                <AccountView id="Account" >
                </AccountView>
                <MarksView id="Marks" activePanel={this.props.activePanel}
                           userId={this.props.userId}
                           userSecret={this.props.userSecret}>
                </MarksView>
                <ScheduleView id="Schedule" activePanel={this.props.activePanel}
                              userId={this.props.userId}
                              userSecret={this.props.userSecret}>
                </ScheduleView>
                <PlusView id="Plus">
                </PlusView>
                <SettingsView id="Settings">
                </SettingsView>
            </Epic>
        )
    }
}

const mapStateToProps = store => {
    console.log("BottomBar", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setPanelAction: panel => dispatch(setPanel(panel)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomBar);