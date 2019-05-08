import React from 'react';
import PropTypes from "prop-types";
import "./levelCircle.css"

var default_stroke_color = "#A8ADAF";
var active_stroke_color = "#5690FF";

const LevelCircle = props => (
    <div className="levelCircleContainer" style={{backgroundColor: props.color, boxShadow: `0 0 0 4px ${props.outline_color}`}}>
        <span>{props.val}</span>
    </div>
);

LevelCircle.propTypes = {
    color: PropTypes.string.isRequired,
    outline_color: PropTypes.bool.isRequired,
    val: PropTypes.any.isRequired
};

export default LevelCircle;