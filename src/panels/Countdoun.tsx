import {Panel} from '@vkontakte/vkui';
import React from "react";
import "./styles/countdown.css"

interface Props {

}


class Countdown extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            timer: "",
        }
        this.getTimer();
    }

    getTimer = () => {
        let end = new Date(2020, 9, 7, 13, 0, 0, 0);
        let now = Date.now();
        let time = (end.getTime() - now) / 1000;
        let mins = time / 60;
        let hours = mins / 60;
        let days = hours / 24;
        hours -= days * 24;
        mins -= hours * 60;
        time -= mins * 60;
        console.log(days, hours, mins, time);
    }

    render() {
        return (
            <Panel id="countdown">
                <section className="countdownScreen">
                    <p className="countdownTimer">

                    </p>
                </section>
            </Panel>
        );
    }
}

export default Countdown;