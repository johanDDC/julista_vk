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
        let inside;
        if (this.props.theme === "dark") {
            inside =
                <HalloweenPumpkin
                    scale={0.4}
                    shadow={false}
                    lighting={true}
                    floating={false}
                />
        } else {
            inside =
                <div className="customSpinnerRotator"
                     style={{color: (this.props.isInverse ? "var(--background)" : "var(--the-color)")}}>
                    <Icon44Spinner/>
                </div>
        }
        return (
            <div className="customSpinnerContainer"
                 style={{backgroundColor: (this.props.isInverse ? "var(--the-color)" : "var(--background)")}}>
                {inside}
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