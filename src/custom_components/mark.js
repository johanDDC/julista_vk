import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

function defineColor(val) {
    let colors = [];

    if (val === "5" || val.toLowerCase() === "зачёт" || val === "Зч") {
        colors[1] = "rgb(114 222 32)";
        colors[0] = "rgb(28 179 54)";
    } else if (val === "4") {
        colors[0] = "rgb(0 225 157)";
        colors[1] = "rgb(2 205 132)";
    } else if (val === "3") {
        colors[0] = "rgb(255 81 47)";
        colors[1] = "rgb(240 152 25)";
    } else if (val === "2" || val.toLowerCase() === "незачёт" || val === "Нзч") {
        colors[0] = "rgb(255 75 43)";
        colors[1] = "rgb(255 65 108)";
    }
    return colors;
} //TODO add 10 system support

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const Mark = props => {
    let container = false;
    let mark_value = props.val.toLowerCase();
    if (props.short){
        if (mark_value === "зачёт") mark_value = "Зч";
        if (mark_value === "незачёт") mark_value = "Нзч";
    } else {
        mark_value = mark_value.capitalize()
    }
    if (mark_value === "Зачёт" || mark_value === "Незачёт")
        container = true;

    return (
        <div className="markContainer" style={{
            width: (container ? "68px" : `${props.size}px `),
            height: (container ? "22px" : `${props.size}px `),
            background: (props.is_routine ? "rgb(86 144 255)"
                : `linear-gradient(90deg, ${defineColor(props.val)[0]}, ${defineColor(props.val)[1]})`),
            fontSize: (props.fontSize ? `${props.fontSize}px` : "14px"),
            borderRadius: (container ? "11px" : "50%")
        }}>
            <span>{mark_value}</span>
            {(props.weight && props.weight > 1 ?
                <div className="markWeight">
                    {props.weight}
                </div>
                : null)}
        </div>
    )
};

Mark.propTypes = {
    size: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    is_routine: PropTypes.bool.isRequired,
    weight: PropTypes.string,
    fontSize: PropTypes.string,
    short: PropTypes.bool,
};

export default Mark;