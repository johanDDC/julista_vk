import React from 'react';
import "./custom_input.css"

interface Props {
    id: string
    placeholder: string
    type: string
    value: string
    onChange: (val: string) => void
}

const CustomInput = (props: Props) => {
    function clickCapture() {
        // @ts-ignore
        document.getElementById(`${props.id}-i`).focus();
        // @ts-ignore
        document.getElementById(props.id).style.marginTop = "-28px";
        // @ts-ignore
        document.getElementById(props.id).style.color = "#5690ff";
    }

    function clickLost() {
        // @ts-ignore
        document.getElementById(props.id).style.color = "#757575";
        // @ts-ignore
        if (document.getElementById(`${props.id}-i`).value === "") {
            // @ts-ignore
            document.getElementById(props.id).style.marginTop = "0";
        }

    }

    function onChange() {
        // @ts-ignore
        props.onChange(document.getElementById(props.id).value);
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
                   defaultValue={props.value}
                   onChange={onChange}
            />
        </div>
    )
};


export default CustomInput
