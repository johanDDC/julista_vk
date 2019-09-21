import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

function defineColor(val) {
    let colors = [];

    if (val === "5" || val.toLowerCase() === "зачёт" || val.toLowerCase() === "зч") {
        colors[1] = "#1cb336";
        colors[0] = "#72de20";
    } else if (val === "4") {
        colors[0] = "#02cd84";
        colors[1] = "#00e19d";
    } else if (val === "3") {
        colors[0] = "#ff512f";
        colors[1] = "#f09819";
    } else if (val === "2" || val.toLowerCase() === "незачёт" || val.toLowerCase() === "нз") {
        colors[0] = "#ff4b2b";
        colors[1] = "#ff416c";
    }
    return colors;
} //TODO add 10 system support

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

const Mark = props => {
    let container = false;
    let mark_value = props.val.toLowerCase();
    if (props.short) {
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
            background: (props.is_routine ? "#5690ff"
                : `linear-gradient(90deg, ${defineColor(props.val)[0]}, ${defineColor(props.val)[1]})`),
            fontSize: (props.fontSize ? `${props.fontSize}px` : "14px"),
            borderRadius: (container ? "11px" : "50%"),
            border: (props.is_border ? "2px solid #f6f6f6" : "0px")
        }}>
            <div>{mark_value}</div>
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
    is_border: PropTypes.bool
};

export default Mark;