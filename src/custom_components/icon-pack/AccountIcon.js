import React from 'react';
import PropTypes from "prop-types";

var default_stroke_color = "var(--bottom-buttons-inactive)";
var active_stroke_color = "#5690FF";

const AccountIcon = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21H4C4 21 4 15 11.7419 15C19.4839 15 20 21 20 21Z" stroke={props.selected ? active_stroke_color : default_stroke_color} stroke-width="1.5"/>
        <circle cx="12" cy="8" r="4.25" stroke={props.selected ? active_stroke_color : default_stroke_color} stroke-width="1.5"/>
    </svg>

);

AccountIcon.propTypes = {
    size: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    stroke_color: PropTypes.string,
};

export default AccountIcon;