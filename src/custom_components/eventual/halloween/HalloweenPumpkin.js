import React from 'react';
import "./HalloweenPumpkin.css"
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class HalloweenPumpkin extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // if (this.props.theme !== "dark") {
        //     document.getElementsByClassName("halloweenPumpkinContainer")[0].style.display = "none";
        // }
        if (!this.props.floating) {
            document.getElementsByClassName("halloweenPumpkin")[0]
                .style.animation = "none";
        }
        if (this.props.lighting) {
            document.querySelector(".halloweenPumpkinEye.Left")
                .style.animation = "light 3s infinite";
            document.querySelector(".halloweenPumpkinEye.Right")
                .style.animation = "light 3s infinite";
            document.querySelector(".halloweenPumpkinMouth")
                .style.animation = "light-mouth 3s infinite";
            document.querySelector(".halloweenPumpkinMouth.Right")
                .style.animation = "light-mouth 3s infinite";
            document.querySelector(".halloweenPumpkinTeeth")
                .style.animation = "light 3s infinite";
        }
        if (this.props.scale) {
            document.getElementsByClassName("halloweenPumpkinContainer")[0]
                .style.transform = `scale(${this.props.scale})`;
        }
    }

    render() {
        return (
            <div className="halloweenPumpkinContainer"
                 style={{
                     display: this.props.theme !== "dark"
                         ? "none"
                         : "flex"
                 }}>
                <div className="halloweenPumpkin">
                    <div className="halloweenPumpkinTexture"></div>
                    <div className="halloweenPumpkinRoot"></div>
                    <div className="halloweenPumpkinEye Left"></div>
                    <div className="halloweenPumpkinEye Right"></div>
                    <div className="halloweenPumpkinMouth Left"></div>
                    <div className="halloweenPumpkinMouth Right"></div>
                    <div className="halloweenPumpkinTeeth"></div>
                </div>
                <div className="halloweenPumpkinShadow"
                     style={{display: this.props.shadow ? "flex" : "none"}}></div>
            </div>
        )
    }
}

HalloweenPumpkin.propTypes = {
    scale: PropTypes.number.isRequired,
    floating: PropTypes.bool.isRequired,
    shadow: PropTypes.bool.isRequired,
    lighting: PropTypes.bool,
};

const mapStateToProps = store => {
    return {
        theme: store.theme,
    }
};

export default connect(mapStateToProps)(HalloweenPumpkin);