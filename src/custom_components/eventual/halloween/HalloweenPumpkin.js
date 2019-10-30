import React from 'react';
import "./HalloweenPumpkin.css"
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class HalloweenPumpkin extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        if (this.props.theme !== "dark") {
            document.getElementsByClassName("halloweenPumpkinContainer")[0].style.display = "none";
        }
        if (this.props.is_faceless) {
            for (let eye of document.getElementsByClassName("halloweenPumpkinEye")) {
                eye.style.display = "none";
            }
            for (let mouth of document.getElementsByClassName("halloweenPumpkinMouth")) {
                mouth.style.display = "none";
            }
            document.getElementsByClassName("halloweenPumpkinTeeth")[0].style.display = "none";
            document.getElementsByClassName("halloweenPumpkinShadow")[0].style.display = "none";
            document.getElementsByClassName("halloweenPumpkin")[0].style.animation = "none";
        }
    }

    render() {
        return (
            <div className="halloweenPumpkinContainer">
                <div className="halloweenPumpkin">
                    <div className="halloweenPumpkinTexture"></div>
                    <div className="halloweenPumpkinRoot"></div>
                    <div className="halloweenPumpkinEye Left"></div>
                    <div className="halloweenPumpkinEye Right"></div>
                    <div className="halloweenPumpkinMouth Left"></div>
                    <div className="halloweenPumpkinMouth Right"></div>
                    <div className="halloweenPumpkinTeeth"></div>
                </div>
                <div className="halloweenPumpkinShadow"></div>
            </div>
        )
    }
}

HalloweenPumpkin.propTypes = {
    is_faceless: PropTypes.bool.isRequired,
};

const mapStateToProps = store => {
    return {
        theme: store.theme,
    }
};

export default connect(mapStateToProps)(HalloweenPumpkin);