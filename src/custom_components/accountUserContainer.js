import React from 'react';
import PropTypes from "prop-types";
import {Div, Avatar} from '@vkontakte/vkui';
import "./accountUserContainer.css"
import connect from '@vkontakte/vk-connect-promise';

import LevelCircle from "./levelCircle"
import DefaultAvatarIcon from "./icon-pack/DefaultAvatarIcon"
import BirthdayIcon from "./icon-pack/BirthdayIcon"
import {getVkParams} from "../utils/utils";

var fill_color;
var outline_color;

function setMedal(num) {
    let styles = {};
    if (num.toString() === "1") {
        styles = {
            background: "linear-gradient(#ff8359, #ffdf40)",
        };
    } else if (num.toString() === "2") {
        styles = {
            background: "linear-gradient(#f4f4f4, #707070)",
        };
    } else if (num.toString() === "3") {
        styles = {
            background: "linear-gradient(#f09819, #c76118)",
        };
    } else {
        styles = {
            display: "none"
        }
    }

    return (
        <div className="accountUserContainerMedal" style={styles}>
            {num}
        </div>
    );
}

class AccountUserContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            medal: null,
        };
    }

    render() {
        let medal = setMedal(this.props.number);
        return (
            <div className="accountUserContainer">
                <div className="accountUserContainerAvatar">
                    {
                        this.props.avatarLink
                            ? <Avatar size={40} src={this.props.avatarLink}/>
                            : <Avatar size={40}><DefaultAvatarIcon/></Avatar>
                    }
                    {medal}
                </div>
                <div className="accountUserContainerRow">
                    <div className="accountUserContainerName">
                        {this.props.name}
                        {
                            this.props.is_birthday &&
                            <div className="accountUserContainerBirthday"><BirthdayIcon/></div>
                        }
                    </div>
                    <div className="accountUserContainerPercent">
                        {isNaN(parseInt(this.props.percent))
                            ? 0
                            : parseInt(this.props.percent)}%
                    </div>
                </div>
            </div>
        )
    }
}

AccountUserContainer.propTypes = {
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarLink: PropTypes.string.isRequired,
    is_birthday: PropTypes.bool,
    percent: PropTypes.string,
};

export default AccountUserContainer;