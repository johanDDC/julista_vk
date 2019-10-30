import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class DefaultAvatarIcon extends React.Component {
    constructor() {
        super();
        this.state = {
            icon:
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="url(#paint0_linear)"/>
                    <path
                        d="M20 12C21.0609 12 22.0783 12.4214 22.8284 13.1716C23.5786 13.9217 24 14.9391 24 16C24 17.0609 23.5786 18.0783 22.8284 18.8284C22.0783 19.5786 21.0609 20 20 20C18.9391 20 17.9217 19.5786 17.1716 18.8284C16.4214 18.0783 16 17.0609 16 16C16 14.9391 16.4214 13.9217 17.1716 13.1716C17.9217 12.4214 18.9391 12 20 12Z"
                        fill="var(--background-block)"/>
                    <rect x="12" y="23" width="16" height="6" rx="3" fill="var(--background-block)"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="0" y1="0" x2="15.1446" y2="47.8644"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9CD4FF"/>
                            <stop offset="1" stopColor="#8465FF"/>
                            <stop offset="1" stopColor="#8465FF"/>
                        </linearGradient>
                    </defs>
                </svg>
        }
    }

    componentDidMount() {
        if (this.props.theme === "dark") {
            this.setState({
                icon:
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         xlink="http://www.w3.org/1999/xlink"
                         x="0px" y="0px"
                         viewBox="0 0 346.497 346.497" enableBackground="new 0 0 346.497 346.497;" space="preserve">
                        <path fill="#68AA00" d="M167.249,70.97c0,0,4.4-35.6,21.6-49.6s29.2-15.2,29.2-15.2l19.2,20.4c0,0-49.6,15.2-52.8,61.2
	C181.649,134.17,167.249,70.97,167.249,70.97z"/>
                        <path fill="#F27503" d="M339.249,144.97c14.8,45.2,5.6,99.2-24.8,140.8c-11.6,16.4-25.6,29.2-40.4,37.6
	c-14.8,8.8-30.4,13.2-46,13.2c-8,0-16.4-1.2-24.4-4l-2.8-0.8l-2.4,1.6c-14.4,9.6-34,9.2-48.4-0.8l-2.4-1.6l-2.8,0.8
	c-8.8,3.2-17.6,4.8-26.8,4.8c-31.2,0-62.8-18.8-86.4-51.2c-30-41.6-39.6-95.6-24.8-140.8c18.8-55.2,60.8-67.2,92.8-67.2
	c25.2,0,45.2,7.2,45.6,7.2l2.8,0.8l2.4-1.6c14.4-10,34-10.4,48.4-0.8l2.4,1.6l2.4-0.8c6.4-2,22.8-6.4,42.8-6.4
	C278.849,77.37,320.849,89.37,339.249,144.97z"/>
                        <path fill="#231F20;"
                              d="M79.249,136.97l73.2,30.8C152.049,168.17,104.049,216.17,79.249,136.97z"/>
                        <g>
                            <path fill="#D35C02"
                                  d="M198.849,333.77l2.4-1.6c-1.2,0.8-2,1.2-3.2,2C198.449,334.17,198.849,333.77,198.849,333.77z"/>
                            <path fill="#D35C02" d="M201.249,332.17l2.8,0.8c8,2.4,16,4,24.4,4c15.6,0,31.6-4.8,46-13.2c14.8-8.8,28.4-21.6,40.4-37.6
		c30-41.6,39.6-95.6,24.8-140.8c-18.8-56-60.8-68-92.8-68c-20,0-36.8,4.4-42.8,6.4l-2.8,0.8c0,0,47.2,16.8,70.4,52.4
		C298.849,178.57,314.449,285.77,201.249,332.17z"/>
                        </g>
                        <g>
                            <polygon fill="#231F20" points="257.249,264.97 243.649,250.57 199.249,279.77 173.249,258.17 147.249,279.77
		102.849,250.57 88.849,264.97 44.449,196.57 88.849,224.97 102.849,210.57 147.249,239.77 173.249,218.17 199.249,239.77
		243.649,210.57 257.249,224.97 302.049,196.57 	"/>
                            <path fill="#231F20"
                                  d="M271.649,136.97l-73.2,30.8C198.449,168.17,246.849,216.17,271.649,136.97z"/>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                    </svg>
            });
        }
    }

    render() {
        return this.state.icon;
    }
}

const mapStateToProps = store => {
    return {
        theme: store.theme,
    }
};

export default connect(mapStateToProps)(DefaultAvatarIcon);