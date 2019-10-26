import React from 'react';
import PropTypes from "prop-types";

var default_stroke_color = "var(--bottom-buttons-inactive)";
var active_stroke_color = "#5690FF";

const MarksIcon = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill={props.selected ? active_stroke_color : default_stroke_color}/>
        <path d="M9 16.5C9 16.5 14.5 18 14.5 14.5C14.5 11 10 12 10 12V8H14.5"
              stroke={props.selected ? active_stroke_color : default_stroke_color} strokeWidth="1.5"/>
    </svg>

);

MarksIcon.propTypes = {
    size: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    stroke_color: PropTypes.string,
};

export default MarksIcon;