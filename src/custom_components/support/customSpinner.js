import React from 'react';
import PropTypes from "prop-types";
import "./customSpinner.css"
import Icon44Spinner from '@vkontakte/icons/dist/44/spinner';
import HalloweenPumpkin from "../eventual/halloween/HalloweenPumpkin"

// const CustomSpinner = props => (
//     <div className="customSpinnerContainer"
//          style={{backgroundColor: (props.isInverse ? "var(--the-color)" : "var(--background)")}}>
//         <div className="customSpinnerRotator"
//              style={{color: (props.isInverse ? "var(--background)" : "var(--the-color)")}}>
//             <Icon44Spinner/>
//         </div>
//     </div>
// );

const CustomSpinner = props => (
    <div className="customSpinnerContainer"
         style={{backgroundColor: (props.isInverse ? "var(--the-color)" : "var(--background)")}}>
        <HalloweenPumpkin
            scale={0.4}
            shadow={false}
            lighting={true}
            floating={false}
        />
    </div>
);

CustomSpinner.propTypes = {
    isInverse: PropTypes.bool.isRequired
};

export default CustomSpinner;