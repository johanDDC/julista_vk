import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

const InviteUserContainer = props => (
    <div className="inviteUserContainer">
        <span>{props.val}</span>
    </div>
);

InviteUserContainer.propTypes = {
    is_invited: PropTypes.bool.isRequired,
    inputColor: PropTypes.string.isRequired,
    shadowColor: PropTypes.string.isRequired,
};

export default InviteUserContainer;