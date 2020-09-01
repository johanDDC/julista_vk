import React from "react"
import {Panel, Root, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import "./panels/styles/countdown.css"
// import {connect} from "react-redux";

import CountdownView from "./views/CountdownView";
import Countdown from "./panels/Countdoun";
// import AuthorizationView from "./views/AuthorizationView"
// import BottomBar from "./views/BottomBar"
// import {setUser} from "./redux/actions/FetchedUserAction";
// import {getVkParams, recursiveTheming} from "./utils/Utils";
// import {setTheme} from "./redux/actions/ThemeAction";

interface Props {
}

interface State {
    days: number,
    hours: number,
    mins: number,
    secs: number,
}

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        let end = new Date(2020, 8, 7, 13, 0, 0, 0);
        let now = Date.now();
        let time = Math.floor((end.getTime() - now) / 1000);
        let mins = Math.floor(time / 60);
        let hours = Math.floor(mins / 60);
        let days = Math.floor(hours / 24);
        time -= mins * 60;
        mins -= hours * 60;
        hours -= days * 24;

        this.state = {
            days: days,
            hours: hours,
            mins: mins,
            secs: time,
        }
        this.setTimer(days, hours, mins, time);
    }

    setTimer = (days: number, hours: number, mins: number, secs: number) => {
        let interval = setInterval(() => {
            if (secs == 0) {
                if (mins == 0) {
                    if (hours == 0) {
                        if (days == 0) {
                            clearInterval(interval);
                        } else {
                            this.setState({
                                days: --days,
                                hours: 23,
                            })
                            hours = 23;
                        }
                    } else {
                        this.setState({
                            hours: --hours,
                            mins: 59
                        })
                        mins = 59;
                    }
                } else {
                    this.setState({
                        mins: --mins,
                        secs: 59,
                    })
                    secs = 59;
                }
            } else {
                this.setState({
                    secs: --secs,
                })
            }
        }, 1000)
    }


    render() {
        return (
            <Root activeView="countdown">
                <View id="countdown" activePanel="countdown" className="countdownView">
                    <Panel id="countdown">
                        <section className="countdownScreen">
                            <p className="countdownTitle">
                                Скоро всё будет!
                            </p>
                            <p className="countdownDescription">
                                Идёт настройка на учебный год.
                            </p>
                            <p className="countdownTimer">
                                <div className="countdownTimerCol">
                                    <div className="countdownTimerDigit">
                                        {this.state.days < 10 ? `0${this.state.days}` : this.state.days}
                                    </div>
                                    <div className="countdownTimerDesc">
                                        дней
                                    </div>
                                </div>
                                <span className="countdownTimerDelimeter">:</span>
                                <div className="countdownTimerCol">
                                    <div className="countdownTimerDigit">
                                        {this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours}
                                    </div>
                                    <div className="countdownTimerDesc">
                                        час
                                    </div>
                                </div>
                                <span className="countdownTimerDelimeter">:</span>
                                <div className="countdownTimerCol">
                                    <div className="countdownTimerDigit">
                                        {this.state.mins < 10 ? `0${this.state.mins}` : this.state.mins}
                                    </div>
                                    <div className="countdownTimerDesc">
                                        мин
                                    </div>
                                </div>
                                <span className="countdownTimerDelimeter">:</span>
                                <div className="countdownTimerCol">
                                    <div className="countdownTimerDigit">
                                        {this.state.secs < 10 ? `0${this.state.secs}` : this.state.secs}
                                    </div>
                                    <div className="countdownTimerDesc">
                                        сек
                                    </div>
                                </div>
                            </p>
                        </section>
                    </Panel>
                </View>
            </Root>
        );
    }
}

export default App;
