import React from 'react';
import PropTypes from "prop-types";

var default_stroke_color = "#A8ADAF";
var active_stroke_color = "#5690FF";

const PlusIcon = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {(active_stroke_color = (props.stroke_color ? props.stroke_color : "#5690FF"))}
        <path d="M4 7.5L12 3L20 7.5V16.5L12 21L4 16.5V7.5Z" stroke={props.selected ? active_stroke_color : default_stroke_color} stroke-width="1.5"/>
        <path d="M12 7V12M12 17V12M12 12H7H17" stroke={props.selected ? active_stroke_color : default_stroke_color} stroke-width="1.5"/>
    </svg>
);

PlusIcon.propTypes = {
    size: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    stroke_color: PropTypes.string,
};

export default PlusIcon;