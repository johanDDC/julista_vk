import React from 'react';
import PropTypes from "prop-types";
import "./ProgressBar.css"
import {Button, Div} from "@vkontakte/vkui";

class ProgressBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="customProgressBarContainer">
                <div className="customProgressBarContainer__in" style={{width: `${this.props.value}%`}}>
                </div>
            </div>
        )
    }
}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default ProgressBar;