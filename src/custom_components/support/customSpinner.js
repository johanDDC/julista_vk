import React from 'react';
import PropTypes from "prop-types";
import "./customSpinner.css"
import Icon44Spinner from '@vkontakte/icons/dist/44/spinner';
import HalloweenPumpkin from "../eventual/halloween/HalloweenPumpkin"
import {connect} from "react-redux";

class CustomSpinner extends React.Component {
    constructor() {
        super()
    }

    render() {
        {/*<div className="customSpinnerRotator"*/
        }
        {/*     style={{color: (this.props.isInverse ? "var(--background)" : "var(--the-color)")}}>*/
        }
        {/*    <Icon44Spinner/>*/
        }
        {/*</div>*/
        }
        return (
            <div className="customSpinnerContainer"
                 // style={{backgroundColor: (this.props.isInverse ? "var(--the-color)" : "var(--background)")}}>
                 style={{backgroundColor: "transparent"}}>
                <div id="warningGradientOuterBarG">
                    <div id="warningGradientFrontBarG" className="warningGradientAnimationG">
                        <div className="warningGradientBarLineG"></div>
                        <div className="warningGradientBarLineG"></div>
                        <div className="warningGradientBarLineG"></div>
                        <div className="warningGradientBarLineG"></div>
                        <div className="warningGradientBarLineG"></div>
                        <div className="warningGradientBarLineG"></div>
                    </div>
                </div>
            </div>
        )
    }

}

CustomSpinner.propTypes = {
    isInverse: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        theme: store.theme,
    }
};

export default connect(mapStateToProps)(CustomSpinner);
