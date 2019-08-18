import React from 'react';

const AliceBot = props => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
            <path d="M19 4.375H9V14.375H19V4.375Z" fill="url(#paint0_linear)"/>
            <path
                d="M14 20C8.47715 20 4 15.5228 4 10C4 4.47715 8.47715 0 14 0C19.5228 0 24 4.47715 24 10C24 15.5228 19.5228 20 14 20ZM9.42097 13.2275C10.1389 13.9418 12.0511 14.3708 14 14.3783C15.9488 14.3708 17.8611 13.9418 18.579 13.2275C20.3626 11.4526 16.027 4.65298 14.0022 4.64309C11.973 4.65298 7.63737 11.4526 9.42097 13.2275Z"
                fill="white"/>
        </g>
        <defs>
            <filter id="filter0_d" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear" x1="9" y1="14.375" x2="19" y2="4.375" gradientUnits="userSpaceOnUse">
                <stop stop-color="#C926FF"/>
                <stop offset="1" stop-color="#4A26FF"/>
            </linearGradient>
        </defs>
    </svg>
);

export default AliceBot;