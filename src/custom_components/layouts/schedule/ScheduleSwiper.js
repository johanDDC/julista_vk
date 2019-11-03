import React from 'react';
import PropTypes from "prop-types";
import "./ScheduleSwiper.css"
import {Button, Div} from "@vkontakte/vkui";

class ScheduleSwiper extends React.Component {
    constructor() {
        super();

        this.touchStarted = false;
        this.touchDetecting = false;
        this.touch = null;
        this.shift = 0;
        this.swipeSide = null;
    }

    componentDidMount() {
        var swiperContainer = document.getElementsByClassName("scheduleSwiperContainer")[0];

        swiperContainer.addEventListener("touchstart", this.touchStartHandle, false);
        swiperContainer.addEventListener("touchmove", this.touchMoveHandle, false);
        swiperContainer.addEventListener("touchcancel", this.touchCancelHandle, false);
        swiperContainer.addEventListener("touchend", this.touchEndHandle, false);
    }

    touchStartHandle = (e) => {
        if (e.touches.length !== 1 || this.touchStarted)
            return;

        this.touchDetecting = true;

        this.touch = e.changedTouches[0];
    };

    touchMoveHandle = (e) => {
        if (!this.touchStarted && !this.touchDetecting)
            return;

        if (this.touchDetecting)
            this.touchDetect(e);
        if (this.touchStarted)
            this.touchDraw(e);

        this.touchDetecting = false;
    };

    touchCancelHandle = (e) => {
        let localTouches = [...e.changedTouches];
        // if (localTouches.indexOf(this.touch) === -1 || !this.touchStarted)
        //     return;
        e.preventDefault();

        this.swipeSide = this.shift < 0 ? "left" : "right";
    };

    touchEndHandle = (e) => {
        let localTouches = [...e.changedTouches];
        // if (localTouches.indexOf(this.touch) === -1 || !this.touchStarted)
        //     return;
        e.preventDefault();

        this.swipeSide = this.shift < 0 ? "left" : "right";
    };

    touchDetect = (event) => {
        let localTouches = [...event.changedTouches];
        // if (localTouches.indexOf(this.touch) === -1)
        //     return;

        if (Math.abs(this.touch.pageX - event.changedTouches[0].pageX) >=
            Math.abs(this.touch.pageY - event.changedTouches[0].pageY)) { // Swipe by X;
            event.preventDefault();
            this.touchStarted = true;
        }

    };

    touchDraw = (event) => {
        event.preventDefault();
        if (event.changedTouches.valueOf(this.touch) === -1)
            return;

        this.shift = event.changedTouches[0].pageX - this.touch.pageX;

        let pages = [...document.getElementsByClassName("scheduleSwiper_Page")];
        let centralId = pages.indexOf(document.querySelector(".scheduleSwiper_Page.center"));
        pages[centralId - 1].classList.add("animating");
        pages[centralId].classList.add("animating");
        pages[centralId + 1].classList.add("animating");

        pages.forEach(page => {
            page.style.transform = `translate(${this.shift}px, 0)`
        })
    };

    render() {
        return (
            <div className="scheduleSwiperContainer">
                <div className="scheduleSwiper_Page left">
                    <p>KAROVA</p>
                </div>
                <div className="scheduleSwiper_Page center">
                    <p>SVINIA</p>
                </div>
                <div className="scheduleSwiper_Page right">
                    <p>JIVOTNOE</p>
                </div>
            </div>
        );
    }
}

ScheduleSwiper.propTypes = {};

export default ScheduleSwiper;