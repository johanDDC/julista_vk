import React from 'react';
import {View} from '@vkontakte/vkui';
import Plus from "../panels/plus";
import {connect} from "react-redux";

class PlusView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View activePanel={this.props.activePanel}>
                <Plus  id="plus"/>
            </View>
        )
    }
}

const mapStateToProps = store => {
    console.log("Plus View", store);
    return {
        activePanel: store.activePanel,
        profile: store.profile,
    }
};

export default connect(mapStateToProps)(PlusView)