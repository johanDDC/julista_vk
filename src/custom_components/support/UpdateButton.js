import React from 'react';
import PropTypes from "prop-types";
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import "./UpdateButton.css"

class UpdateButton extends React.Component {
    constructor() {
        super();
        this.state = {
            refreshContent: "Обновить",
        };
    }

    refreshClick = () => {
        this.setState({
            refreshContent:
                <div className="updateButtonAnimated">
                    <Icon24Replay/>
                </div>
        });
        document.getElementsByClassName("updateButtonContainer")[0]
            .style.width = "24px";
        document.getElementsByClassName("updateButtonContainer")[0]
            .style.borderRadius = "50%";

        this.props.activationFunction();

        setTimeout(() => {
            this.setState({
                refreshContent: "Обновить"
            })
            document.getElementsByClassName("updateButtonContainer")[0]
                .style.width = "auto";
            document.getElementsByClassName("updateButtonContainer")[0]
                .style.borderRadius = "7px";
        }, 6000);
    };

    render() {
        return (
            <button className="updateButtonContainer"
                    onClick={this.refreshClick}>
                {this.state.refreshContent}
            </button>
        );
    }
}

UpdateButton.propTypes = {
    activationFunction: PropTypes.func.isRequired
};

export default UpdateButton;