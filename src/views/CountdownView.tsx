import React from 'react';
import {View} from '@vkontakte/vkui';

import Countdown from "../panels/Countdoun";

interface Props {

}

class CountdownView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View id="countdownV" activePanel="countdown">
                <Countdown/>
            </View>
        );
    }
}

export default CountdownView;