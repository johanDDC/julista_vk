import {FixedLayout , Div, Group, Button, Panel, PanelHeader, InfoRow, Progress} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/schedule.css"
import {View} from "../views/ScheduleView";
import Account from "../views/ScheduleView";
import {Tabs, TabsItem} from "./marks";

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay : 1),
        };
    }

    drawTopBar = () => {
        return(
          <div>
              <Div className="scheduleWeekTopBar">
                  <div className="scheduleWeekDay">
                      <span>ПН</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 1})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 1 ? 'scheduleWeekDaySelected' : null}`}>6</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ВТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 2})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 2 ? 'scheduleWeekDaySelected' : null}`}>7</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>СР</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 3})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 3 ? 'scheduleWeekDaySelected' : null}`}>8</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ЧТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 4})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 4 ? 'scheduleWeekDaySelected' : null}`}>9</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>ПТ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 5})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 5 ? 'scheduleWeekDaySelected' : null}`}>10</div>
                      </Button>
                  </div>
                  <div className="scheduleWeekDay">
                      <span>СБ</span>
                      <Button level="tertiary" style={{margin: 0, padding: 0, color: "#fff"}} onClick={() => this.setState({currentDay : 6})}>
                          <div className={`scheduleWeekDayDate ${this.state.currentDay === 6 ? 'scheduleWeekDaySelected' : null}`}>11</div>
                      </Button>
                  </div>
              </Div>
          </div>
        );
    };


    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    noShadow>
                    <span className="scheduleHeaderMonth">Май</span>
                </PanelHeader>
                {this.drawTopBar(this.state.currentDay)}
            </Panel>
        )
    }
}

Schedule.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    currentDay: PropTypes.number
};

export default Schedule;