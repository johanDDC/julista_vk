import React from 'react';
import "./santa.css"
import PropTypes from "prop-types";

class NewYearSanta extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {
        return (
            <div class="wrapper">
                <div class="santa">
                    <div class="hat"></div>
                    <div class="ear left"></div>
                    <div class="ear right"></div>
                    <div class="face">
                        <i></i>
                        <i></i>
                        <div class="eye left"></div>
                        <div class="eye right"></div>
                        <div class="nose"></div>
                    </div>
                    <div class="beard"></div>
                </div>
                <h1>Happy holidays!</h1>
            </div>
        )
    }
}


export default NewYearSanta;
