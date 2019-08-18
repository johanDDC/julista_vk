import React from 'react';
import PropTypes from "prop-types";

const PlusInvitationIcon = props => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="url(#paint0_linear)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
              fill="white"/>
        <defs>
            <linearGradient id="paint0_linear" x1="30" y1="10" x2="10" y2="-10" gradientUnits="userSpaceOnUse">
                <stop stop-color="#54D169"/>
                <stop offset="1" stop-color="#AFF57A"/>
            </linearGradient>
        </defs>
    </svg>
);

export default PlusInvitationIcon;