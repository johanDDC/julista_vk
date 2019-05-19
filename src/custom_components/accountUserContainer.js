import React from 'react';
import PropTypes from "prop-types";
import {Div} from '@vkontakte/vkui';
import "./accountUserContainer.css"

import LevelCircle from "./levelCircle"

var fill_color;
var outline_color;

function setCirclesColor(num) {
    if (num === "1") {
        fill_color = "rgb(255 214 0)";
        outline_color = "rgba(255, 214, 0, 0.5)"
    } else if (num === "2") {
        fill_color = "rgb(180 180 180)";
        outline_color = "rgba(180, 180, 180, 0.5)"
    } else if (num ==="3") {
        fill_color = "rgb(255 186 86)";
        outline_color = "rgba(255, 186, 86, 0.5)"
    }
}

const AccountUserContainer = props => (
    <div className="accountUserContainer">
        {setCirclesColor(props.number)}
        <div className="accountUserNumeration">{props.number}</div>
        <Div className="accountUserInfo">
            <span className="accountUserName">{props.name}</span>
            <LevelCircle color={fill_color} outline_color={outline_color} val={props.level}/>
        </Div>
    </div>
);

AccountUserContainer.propTypes = {
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired
};

export default AccountUserContainer;