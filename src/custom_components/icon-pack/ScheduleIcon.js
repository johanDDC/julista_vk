import React from 'react';
import PropTypes from "prop-types";

var default_stroke_color = "#A8ADAF";
var active_stroke_color = "#5690FF";

const ScheduleIcon = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 6C4.75 4.20507 6.20507 2.75 8 2.75H16C17.7949 2.75 19.25 4.20507 19.25 6V21.25H4.75V6Z" stroke={props.selected ? active_stroke_color : default_stroke_color} stroke-width="1.5"/>
        <rect x="7" y="6" width="10" height="1.5" fill={props.selected ? active_stroke_color : default_stroke_color}/>
        <rect x="7" y="11" width="10" height="1.5" fill={props.selected ? active_stroke_color : default_stroke_color}/>
        <rect x="7" y="16" width="10" height="1.5" fill={props.selected ? active_stroke_color : default_stroke_color}/>
    </svg>


);

ScheduleIcon.propTypes = {
    size: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    stroke_color: PropTypes.string,
};

export default ScheduleIcon;