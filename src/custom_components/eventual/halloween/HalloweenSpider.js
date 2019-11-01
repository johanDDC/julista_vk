import React from 'react';
import "./HalloweenSpider.css"
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class HalloweenSpider extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // if (this.props.theme !== "dark") {
        //     document.getElementsByClassName("halloweenPumpkinContainer")[0].style.display = "none";
        // }
        // if (this.props.is_faceless) {
        //     for (let eye of document.getElementsByClassName("halloweenPumpkinEye")) {
        //         eye.style.display = "none";
        //     }
        //     for (let mouth of document.getElementsByClassName("halloweenPumpkinMouth")) {
        //         mouth.style.display = "none";
        //     }
        //     document.getElementsByClassName("halloweenPumpkinTeeth")[0].style.display = "none";
        //     document.getElementsByClassName("halloweenPumpkinShadow")[0].style.display = "none";
        //     document.getElementsByClassName("halloweenPumpkin")[0].style.animation = "none";
        // }
    }

    hide = () => {
        document.getElementsByClassName("halloweenSpiderContainer")[0].style.animation = "hide 1s";
        document.getElementsByClassName("halloweenSpiderContainer")[0].style.transform = "translateY(-300px)";

        setTimeout(() => {
            document.getElementsByClassName("halloweenSpiderContainer")[0].style.animation = "appear 1s";
            document.getElementsByClassName("halloweenSpiderContainer")[0].style.transform = "translateY(0)";
        }, Math.random() * 2000 + 12000)
    };

    render() {
        return (
            <div className="halloweenSpider" onClick={this.hide}>
                <div className="halloweenSpiderWeb"></div>
                <div className="halloweenSpiderBody">
                    <div className="halloweenSpiderEye Left"></div>
                    <div className="halloweenSpiderEye Right"></div>
                </div>
                <div className="halloweenSpiderLegs Left">
                    <div className="halloweenSpiderLeg"></div>
                    <div className="halloweenSpiderLeg"></div>
                    <div className="halloweenSpiderLeg"></div>
                </div>
                <div className="halloweenSpiderLegs Right">
                    <div className="halloweenSpiderLeg"></div>
                    <div className="halloweenSpiderLeg"></div>
                    <div className="halloweenSpiderLeg"></div>
                </div>
            </div>
        )
    }
}

HalloweenSpider.propTypes = {};

const mapStateToProps = store => {
    return {
        theme: store.theme,
    }
};

export default connect(mapStateToProps)(HalloweenSpider);