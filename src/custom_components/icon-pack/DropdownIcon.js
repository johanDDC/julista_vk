import React from 'react';
import PropTypes from "prop-types";

const DropdownIcon = props => (
    <svg width={props.size} height={props.size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="white"/>
        <path d="M15.736 7.26778C15.384 6.91074 14.8133 6.91074 14.4613 7.26778L9.99997 11.7929L5.53867 7.26782C5.18667 6.91078 4.61598 6.91078 4.26398 7.26782C3.91198 7.62485 3.91202 8.20366 4.26402 8.56069L9.36266 13.7322C9.71467 14.0893 10.2853 14.0893 10.6374 13.7322L15.736 8.56069C16.088 8.20366 16.088 7.62482 15.736 7.26778Z" fill="#5690FF"/>
    </svg>
);

DropdownIcon.propTypes = {
    size: PropTypes.string.isRequired,
};

export default DropdownIcon;