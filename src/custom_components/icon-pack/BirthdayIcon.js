import React from 'react';

const BirthdayIcon = props => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect width="20" height="20" fill="url(#a)" rx="10"/>
        <path fill="#fff"
              d="M10 7.083a.972.972 0 0 0 .831-1.473L10 4.167 9.169 5.61A.972.972 0 0 0 10 7.083zm2.236 4.861l-.52-.525-.525.525c-.632.627-1.74.632-2.377 0l-.515-.525-.535.525a1.685 1.685 0 0 1-2.139.19v2.241a.486.486 0 0 0 .486.486h7.778a.486.486 0 0 0 .486-.486v-2.241a1.69 1.69 0 0 1-2.139-.19zm.68-3.402h-2.43v-.973h-.972v.973h-2.43A1.458 1.458 0 0 0 5.624 10v.749c0 .525.428.952.953.952a.901.901 0 0 0 .67-.277l1.05-1.035 1.026 1.035c.36.36.987.36 1.347 0l1.03-1.035 1.045 1.035c.17.18.414.277.671.277a.958.958 0 0 0 .958-.952V10a1.458 1.458 0 0 0-1.458-1.458z"/>
        <defs>
            <linearGradient id="a" x1="20" x2="0" y1="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3F6B"/>
                <stop offset="1" stopColor="#FFF7F9"/>
            </linearGradient>
        </defs>
    </svg>
);

export default BirthdayIcon;