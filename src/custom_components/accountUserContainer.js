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
            avatarSrc: null,
            medal: null,
        };
    }

    componentDidMount() {
        this.getAvatar()
    }

    getAvatar = () => {
        console.log("GETTING AVATAR", this.props.vk_id);
        connect.send("VKWebAppCallAPIMethod", {
            method: "users.get",
            request_id: `request_avatar_${this.props.vk_id}`,
            params: {
                user_ids: this.props.vk_id,
                fields: "photo_100",
                v: "5.102",
                access_token: "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402",
            }
        })
            .then(resp => {
                this.setState({
                    avatarSrc: resp.data.response[0]["photo_100"],
                })
            })
    };

    render() {
        let medal = setMedal(this.props.number);
        return (
            <div className="accountUserContainer">
                <div className="accountUserContainerAvatar">
                    {this.state.avatarSrc
                        ? <Avatar size={40} src={this.state.avatarSrc}/>
                        : <Avatar size={40}><DefaultAvatarIcon/></Avatar>}
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
    vk_id: PropTypes.number.isRequired,
    is_birthday: PropTypes.bool,
    percent: PropTypes.string,
};

export default AccountUserContainer;