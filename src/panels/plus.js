import {Div, Button, Panel, PanelHeader, Gallery} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/plus.css"


class Plus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay : 1),
        };
    }

    render() {
        return(
            <Panel  id={this.props.id}>
                <PanelHeader>
                    Booklet Plus
                </PanelHeader>
                <div className="plusOfferContainer">
                    <Div className="plusOfferInfo">
                        <span className="plusOfferTitle">
                            Уведомления
                        </span>
                        <span className="plusOfferText">
                            — Новые оценки
                        </span>
                        <span className="plusOfferText">
                            — Крепостное право
                        </span>
                        <span className="plusOfferText">
                            — Острые ощущения
                        </span>
                        <span className="plusOfferText">
                            — Пошёл в жопу
                        </span>
                        <div className="plusOfferAdditional">
                            <span className="plusOfferText">
                                149 рублей за год — как бордель на окраине Мухосранска
                            </span>
                        </div>
                    </Div>
                    <Button level="tertiary" className="plusButton">
                        Купить — 149 руб.
                    </Button>
                </div>
                <div style={{padding: "0 17px 0 17px"}}>
                <Button level="tertiary" className="plusAliceContainer">
                    Навык для Алисы
                </Button>
                </div>
            </Panel>
        );
    }
}


Plus.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    currentDay: PropTypes.number
};

export default Plus;