import React from 'react';
import PropTypes from "prop-types";
import "./customSpinner.css"
import Icon44Spinner from '@vkontakte/icons/dist/44/spinner';

const CustomSpinner = props => (
    <div className="customSpinnerContainer"
         style={{backgroundColor: (props.isInverse ? "#5690ff" : "var(--background)")}}>
        <div className="customSpinnerRotator" style={{color: (props.isInverse ? "var(--background77)" : "#5690ff")}}>
            <Icon44Spinner/>
        </div>
    </div>
);

CustomSpinner.propTypes = {
    isInverse: PropTypes.bool.isRequired
};

export default CustomSpinner;