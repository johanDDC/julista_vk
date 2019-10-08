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

function setCirclesColor(num) {
    if (num === "1") {
        fill_color = "rgb(255 214 0)";
        outline_color = "rgba(255, 214, 0, 0.5)"
    } else if (num === "2") {
        fill_color = "rgb(180 180 180)";
        outline_color = "rgba(180, 180, 180, 0.5)"
    } else if (num === "3") {
        fill_color = "rgb(255 186 86)";
        outline_color = "rgba(255, 186, 86, 0.5)"
    }
}

class AccountUserContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            avatar: <DefaultAvatarIcon/>,
            medal: null,
        };
    }

    componentDidMount() {
        this.getAvatar()
    }

    getAvatar = () => {
        connect.send("VKWebAppCallAPIMethod", {
            method: "users.get",
            request_id: "request_avatar",
            params: {
                user_ids: [this.props.vk_id],
                fields: ["photo_50"],
                v: "5.101",
                access_token: "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402",
            }
        })
            .then(resp => {
                console.log("GOT AVATAR", resp);
                this.setState({
                    avatar: <Avatar size={40} src={resp.data.response[0].photo_50}/>
                })
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div className="accountUserContainer">
                <div className="accountUserContainerAvatar">
                    {this.state.avatar}
                </div>
                <div className="accountUserContainerName">
                    {this.props.name}
                </div>
                {
                    this.props.is_birthday &&
                    <div className="accountUserContainerBirthday"><BirthdayIcon/></div>
                }
                <div className="accountUserContainerPercent">
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
    level: PropTypes.string,
};

export default AccountUserContainer;