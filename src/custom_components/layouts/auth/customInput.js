import React from 'react';
import PropTypes from "prop-types";
import "./customInput.css"

const CustomInput = props => {
    function clickCapture() {
        document.getElementById(`${props.id}-i`).focus();
        document.getElementById(props.id).style.marginTop = "-28px";
        document.getElementById(props.id).style.color = "#5690ff";
    }

    function clickLost() {
        document.getElementById(props.id).style.color = "#757575";
        if (document.getElementById(`${props.id}-i`).value === "") {
            document.getElementById(props.id).style.marginTop = "0";
        }

    }

    if (props.value && props.value.trim() !== "")
        setTimeout(() => {
            clickCapture();
        }, 50);

    return (
        <div className="customInputContainer">
        <span id={props.id}
              className="customInputTip"
              onClick={clickCapture}
        >
            {props.placeholder}
        </span>
            <input id={`${props.id}-i`}
                   type={props.type}
                   className="customInput"
                   onFocus={clickCapture}
                   onBlur={clickLost}
                   autoComplete="off"
                   defaultValue={props.value && props.value}
            />
        </div>
    )
};

CustomInput.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

export default CustomInput;