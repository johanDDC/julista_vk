import React from 'react';
import PropTypes from "prop-types";
import "./mark.css"

class Mark extends React.Component {
    constructor() {
        super();

        this.gradientColorOne = "";
        this.gradientColorTwo = "";
        this.containerSize = [0, 0, 0];
        this.routineColor = "#5690ff";
        this.markValue = 0;

        String.prototype.capitalize = function () {
            return this.replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        };
    }


    defineColors = () => {
        let val = this.props.val.toLowerCase();
        let gradeSystem = this.props.gradeSystem ? this.props.gradeSystem : 'five';

        if (val === "зачёт" || val === "зч" || val === "зачет") {
            this.gradientColorOne = "#1cb336";
            this.gradientColorTwo = "#72de20";
            if (this.props.short) {
                this.containerSize = [`${this.props.size}px`, `${this.props.size}px`, "50%"];
                val = "Зч";
            } else {
                this.containerSize = ["68px", "22px", "11px"];
                val = "Зачёт";
            }
        } else if (val === "незачёт" || val === "нз" || val === "нзч" || val === "незачет") {
            this.gradientColorOne = "#ff4b2b";
            this.gradientColorTwo = "#ff416c";
            if (this.props.short) {
                this.containerSize = [`${this.props.size}px`, `${this.props.size}px`, "50%"];
                val = "Нз";
            } else {
                this.containerSize = ["68px", "22px", "11px"];
                val = "Незачёт";
            }
        } else if (!isNaN(parseInt(val))) {
            this.containerSize = [`${this.props.size}px`, `${this.props.size}px`, "50%"];
            if (gradeSystem === 'five')
                val = 2 * val - 2;
            if (gradeSystem === 'percent')
                val /= 10;
            // else {
            //
            // }
            if (val >= 8) {
                this.gradientColorOne = "#1cb336";
                this.gradientColorTwo = "#72de20";
            } else if (val >= 6) {
                this.gradientColorOne = "#02cd84";
                this.gradientColorTwo = "#00e19d";
            } else if (val >= 3) {
                this.gradientColorOne = "#ff512f";
                this.gradientColorTwo = "#f09819";
            } else {
                this.gradientColorOne = "#ff4b2b";
                this.gradientColorTwo = "#ff416c";
            }
            if (gradeSystem === 'five')
                val = (val + 2) / 2;
            if (gradeSystem === 'percent')
                val *= 10
        } else {
            this.containerSize = [`${this.props.size}px`, `${this.props.size}px`, "50%"];
            if (val === "не был") {
                val = "Н";
                this.gradientColorOne = "#86a8e7";
                this.gradientColorTwo = "#5070e1";
            } else if (val === "болел") {
                val = "Б";
                this.gradientColorOne = "#86a8e7";
                this.gradientColorTwo = "#5070e1";
            }
        }

        this.markValue = val;
    };

    render() {
        this.defineColors();
        return (
            <div className="markContainer" style={{
                width: this.containerSize[0],
                height: this.containerSize[1],
                background: (this.props.is_routine
                    ? this.routineColor
                    : `linear-gradient(90deg, ${this.gradientColorOne}, ${this.gradientColorTwo})`),
                fontSize: (this.props.fontSize ? `${this.props.fontSize}px` : "14px"),
                borderRadius: this.containerSize[2],
                border: (this.props.is_border ? "2px solid var(--background-block)" : "0px")
            }}>
                <div>{this.markValue}</div>
                {
                    (this.props.weight && this.props.weight > 1
                        ?
                        <div className="markWeight">
                            {this.props.weight}
                        </div>
                        : null)
                }
            </div>
        )
    }
}

Mark.propTypes = {
    size: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    is_routine: PropTypes.bool.isRequired,
    weight: PropTypes.string,
    fontSize: PropTypes.string,
    gradeSystem: PropTypes.string,
    is_border: PropTypes.bool,
    short: PropTypes.bool,
};

export default Mark;