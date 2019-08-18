import React from 'react';
import PropTypes from "prop-types";
import "./inviteUserContainer.css"
import PlusInvitaion from "./icon-pack/PlusInvitaion"

const InviteUserContainer = props => (
    <div className="inviteUserContainer" style={{
        background: `linear-gradient(90deg, ${props.inputColor[0]}, ${props.inputColor[1]})`,
        boxShadow: `0 0 8px 0 ${props.shadowColor}`
    }}>
        <div style={{marginLeft: "-2px"}}>
            <PlusInvitaion is_invited={props.is_invited}/>
        </div>
    </div>
);

InviteUserContainer.propTypes = {
    is_invited: PropTypes.bool,
    inputColor: PropTypes.array.isRequired,
    shadowColor: PropTypes.string.isRequired,
};

export default InviteUserContainer;