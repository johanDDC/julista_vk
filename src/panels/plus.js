import {Div, Button, Panel, PanelHeader, FixedLayout} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';
import PropTypes from "prop-types";
import React from "react";
import "./styles/plus.css"

import InviteUserContainer from "../custom_components/inviteUserContainer"
import BigPlusIcon from "../custom_components/icon-pack/bigPlusIcon"
import TGbot from "../custom_components/icon-pack/TGbot"


class Plus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: (this.props.currentDay ? this.props.currentDay : 1),
        };

        this.appId = 0;
        this.action = "pay-to-group";
        this.groupId = 0;
    }

    doPay = () => {
        let json = {
            app_id: this.appId,
            action: this.action,
            params: {
                action: this.action,
                amount: 1,
                description: "Buying subscription",
                data: {},
                group_id: this.groupId
            }
        };

        let response = connect.send("VKWebAppOpenPayForm",
            JSON.stringify(json))
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    noShadow={true}
                    left={<Div style={{fontWeight: 'bold', fontSize: '20px'}}><span>Booklet Plus</span></Div>}>
                </PanelHeader>
                <FixedLayout style={{width: "100%"}}>
                    <Div className="plusBlueBack">
                        <span>Расширь возможности своего дневника</span>
                        <BigPlusIcon/>
                    </Div>
                </FixedLayout>
                <div style={{padding: "0 16px 0 16px", marginBottom: "8px"}}>
                    <Button level="tertiary" className="plusVkContainer">
                        Бот для ВКонтакте
                    </Button>
                </div>
                <div style={{padding: "0 16px 0 16px", marginBottom: "8px"}}>
                    <Button level="tertiary" className="plusTelegramContainer">
                        Бот для Телеграм
                        <TGbot/>
                    </Button>
                </div>
                <div style={{padding: "0 16px 0 16px", marginBottom: "8px"}}>
                    <Button level="tertiary" className="plusAliceContainer">
                        Навык для Алисы
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
                            <InviteUserContainer inputColor={["rgb(21 237 237)", "rgb(2 156 245)"]}
                                                 shadowColor="rgb(17 221 239)"/>
                            <InviteUserContainer inputColor={["rgb(32 217 110)", "rgb(39 174 96)"]}
                                                 shadowColor="rgb(32 217 110)"/>
                            <InviteUserContainer inputColor={["rgb(255 223 64)", "rgb(255 131 89)"]}
                                                 shadowColor="rgb(255 203 70)"/>
                            <InviteUserContainer inputColor={["rgb(255 124 110)", "rgb(245 49 127)"]}
                                                 shadowColor="rgb(250 89 118)"/>
                            <InviteUserContainer inputColor={["rgb(255 99 222)", "rgb(177 34 229)"]}
                                                 shadowColor="rgb(232 80 225)"/>
                        </div>
                    </Div>
                    <Button level="tertiary" className="plusButton"
                            style={{background: "linear-gradient(rgb(77 229 101), rgb(74 195 122))"}}>
                        Пригласить друзей
                    </Button>
                </div>
                <div className="plusOfferContainer">
                    <Div className="plusOfferInfo">
                        <span className="plusOfferTitle">
                            Уведомления
                        </span>
                        <span className="plusOfferText">
                            — Новые оценки
                        </span>
                        <span className="plusOfferText">
                            — Текущий/следующий урок
                        </span>
                        <span className="plusOfferText">
                            — События в классе
                        </span>
                        <span className="plusOfferText">
                            — Отчётность за день
                        </span>
                        <div className="plusOfferAdditional">
                            <span className="plusOfferText">
                                149 рублей за год — как шаверма в центре Москвы
                            </span>
                        </div>
                    </Div>
                    <Button level="tertiary" className="plusButton">
                        Купить — 149 руб.
                    </Button>
                </div>
            </Panel>
        );
    }
}


Plus.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Plus;