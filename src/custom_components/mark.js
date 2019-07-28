import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

function defineColor(val) {
    let colors = [];

    if (val === "5" || val === "Зачёт" || val === "Зч") {
        colors[1] = "rgb(114 222 32)";
        colors[0] = "rgb(28 179 54)";
    } else if (val === "4") {
        colors[0] = "rgb(0 225 157)";
        colors[1] = "rgb(2 205 132)";
    } else if (val === "3") {
        colors[0] = "rgb(255 81 47)";
        colors[1] = "rgb(240 152 25)";
    } else if (val === "2" || val === "Незачёт" || val === "Нзч") {
        colors[0] = "rgb(255 75 43)";
        colors[1] = "rgb(255 65 108)";
    }
    return colors;
} //TODO add 10 system support

const Mark = props => (
    <div className="markContainer" style={{
        width: (props.val === "Незачёт" || props.val === "Зачёт" ? "68px" : `${props.size}px `),
        height: (props.val === "Незачёт" || props.val === "Зачёт" ? "22px" : `${props.size}px `),
        background: (props.is_routine ? "rgb(86 144 255)"
            : `linear-gradient(90deg, ${defineColor(props.val)[0]}, ${defineColor(props.val)[1]})`),
        fontSize: (props.fontSize ? `${props.fontSize}px` : "14px"),
        borderRadius: (props.val === "Незачёт" || props.val === "Зачёт" ? "11px" : "50%")
    }}>
        <span>{props.val}</span>
        {(props.weight && props.weight > 1 ?
            <div className="markWeight">
                {props.weight}
            </div>
            : null)}
    </div>
);

Mark.propTypes = {
    size: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    is_routine: PropTypes.bool.isRequired,
    weight: PropTypes.string,
    fontSize: PropTypes.string
};

export default Mark;