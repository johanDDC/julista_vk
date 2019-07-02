import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

function defineColor(val) {
    let colors = [];

    if (val === "5"){
        console.log("it`s five!");
        colors[1] = "rgb(114 222 32)";
        colors[0] = "rgb(28 179 54)";
    } else if (val === "4"){
        colors[0] = "rgb(0 225 157)";
        colors[1] = "rgb(2 205 132)";
    } else if (val === "3"){
        colors[0] = "rgb(255 81 47)";
        colors[1] = "rgb(240 152 25)";
    } else {
        colors[0] = "rgb(255 75 43)";
        colors[1] = "rgb(255 65 108)";
    }
    return colors;
} //TODO add 10 system support

const Mark = props => (
    <div className="markContainer" style={{width: (props.size ? `${props.size}px `:`20px`),
                                            height: (props.size ? `${props.size}px `:`20px`),
                                            background: (props.is_routine ? "rgb(86 144 255)"
                                                : `linear-gradient(90deg, ${defineColor(props.val)[0]}, ${defineColor(props.val)[1]})`),
                                            fontSize: (props.fs ? `${props.fs}px` : "14px")}}>
        <span>{props.val}</span>
    </div>
);

Mark.propTypes = {
    size: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    is_routine: PropTypes.bool.isRequired,
    fs: PropTypes.string
};

export default Mark;