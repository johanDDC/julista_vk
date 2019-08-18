import React from 'react';
import PropTypes from "prop-types";

const PlusInvitation = props => {
    if (props.is_invited) {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.48 24C27.3972 24 29.76 21.6372 29.76 18.72C29.76 15.8028 27.3972 13.44 24.48 13.44C21.5628 13.44 19.2 15.8028 19.2 18.72C19.2 21.6372 21.5628 24 24.48 24ZM24.4799 26.88C21.1157 26.88 14.3999 28.3808 14.3999 31.36V33.6H34.5599V31.36C34.5599 28.3808 27.8441 26.88 24.4799 26.88Z"
                      fill="white"/>
            </svg>
        );
    } else {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M20.7709 28.4704L15.2727 23.6561L13.4399 25.2609L20.7709 31.68L36.4799 17.9248L34.6472 16.32L20.7709 28.4704Z"
                      fill="white"/>
            </svg>
        );
    }
};

PlusInvitation.propTypes = {
    is_invited: PropTypes.bool.isRequired,
};

export default PlusInvitation;