import {Div, Button, Panel, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/plus.css"

import InviteUserContainer from "../custom_components/inviteUserContainer"


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
                <div className="plusOfferContainer">
                    <Div className="plusOfferInfo">
                        <span className="plusOfferTitle">
                            Бесплатный доступ к уведомлениям
                        </span>
                        <span className="plusOfferText">
                            Пригласите пятерых друзей и получите звездюлей
                        </span>
                        <div className="plusOfferAdditional">
                            <InviteUserContainer inputColor={["rgb(21 237 237)", "rgb(2 156 245)"]} shadowColor="rgb(17 221 239)"/>
                            <InviteUserContainer inputColor={["rgb(32 217 110)", "rgb(39 174 96)"]} shadowColor="rgb(32 217 110)"/>
                            <InviteUserContainer inputColor={["rgb(255 223 64)", "rgb(255 131 89)"]} shadowColor="rgb(255 203 70)"/>
                            <InviteUserContainer inputColor={["rgb(255 124 110)", "rgb(245 49 127)"]} shadowColor="rgb(250 89 118)"/>
                            <InviteUserContainer inputColor={["rgb(255 99 222)", "rgb(177 34 229)"]} shadowColor="rgb(232 80 225)"/>
                        </div>
                    </Div>
                    <Button level="tertiary" className="plusButton" style={{background: "linear-gradient(rgb(77 229 101), rgb(74 195 122))"}}>
                        Пригласить содомитов
                    </Button>
                </div>
                <div style={{padding: "0 17px 0 17px", marginBottom: "10px"}}>
                    <Button level="tertiary" className="plusAliceContainer">
                        Навык для Алисы
                    </Button>
                </div>
                <div style={{padding: "0 17px 0 17px", marginBottom: "10px"}}>
                    <Button level="tertiary" className="plusVkContainer">
                        Бот ВКонтакте
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