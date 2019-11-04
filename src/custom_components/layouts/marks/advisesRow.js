import React from 'react';
import PropTypes from "prop-types";
import "./advisesRow.css"

class AdvisesRow extends React.Component {
    constructor() {
        super();
    }

    giveAdvice = () => {
        let expectedAvg = this.props.expectedMark - 0.5;
        if (this.props.avg > expectedAvg || this.props.allMarks.length === 0)
            return false;

        let marksSum = this.props.avg * this.props.allMarks.length;
        let length = this.props.allMarks.length;
        let currentAvg = this.props.avg;
        let steps = 0;
        let fives = 0;
        let fours = 0;
        let threes = 0;
        while (currentAvg <= expectedAvg && steps <= 11) {
            if (this.props.expectedMark === 5) {
                marksSum += 5;
                steps++;
                length++;
                fives++;
                currentAvg = marksSum / length;
            }
            if (this.props.expectedMark === 4) {
                if (currentAvg >= 3.5) {
                    marksSum += 5;
                    steps++;
                    length++;
                    fives++;
                    currentAvg = marksSum / length;
                } else {
                    if (fives < 5) {
                        marksSum += 5;
                        steps++;
                        length++;
                        fives++;
                        currentAvg = marksSum / length;
                    } else {
                        marksSum += 4;
                        steps++;
                        length++;
                        fours++;
                        currentAvg = marksSum / length;
                    }
                }
            }
            if (this.props.expectedMark === 3) {
                if (fours < 3) {
                    marksSum += 4;
                    steps++;
                    length++;
                    fours++;
                    currentAvg = marksSum / length;
                } else if (fives < 3) {
                    marksSum += 5;
                    steps++;
                    length++;
                    fives++;
                    currentAvg = marksSum / length;
                } else {
                    marksSum += 3;
                    steps++;
                    length++;
                    threes++;
                    currentAvg = marksSum / length;
                }
            }
        }
        if (steps >= 11) return false;

        return [fives, fours, threes];
    };

    declinate = (amount, digit) => {
        if (digit === 5) {
            if (amount === 1) return "пятёрку";
            else if (amount >= 2 && amount < 5) return "пятёрки";
            else return "пятёрок"
        } else if (digit === 4) {
            if (amount === 1) return "четвёрку";
            else if (amount >= 2 && amount < 5) return "четвёрки";
            else return "четвёрок"
        } else {
            if (amount === 1) return "тройку";
            else if (amount >= 2 && amount < 5) return "тройки";
            else return "троек"
        }
    };

    render() {
        let predictions = this.giveAdvice();
        let str = "Получите ";
        if (predictions && predictions[0] !== 0) str += `${predictions[0]} ${this.declinate(predictions[0], 5)}`;
        if (predictions && predictions[0] !== 0 && predictions[1] !== 0) str += ', ';
        if (predictions && predictions[1] !== 0) str += `${predictions[1]} ${this.declinate(predictions[1], 4)}`;
        if (predictions && predictions[1] !== 0 && predictions[2] !== 0) str += ' и ';
        if (predictions && predictions[2] !== 0) str += `${predictions[2]} ${this.declinate(predictions[2], 3)}`;
        return (
            <div style={{display: Boolean(predictions) === false && "none"}} className="advisesRowContainer">
                <div className="advisesRowText">
                    {str}
                </div>
            </div>
        );
    }
}

AdvisesRow.propTypes = {
    expectedMark: PropTypes.number.isRequired,
    allMarks: PropTypes.array.isRequired,
    avg: PropTypes.number,
};

export default AdvisesRow;