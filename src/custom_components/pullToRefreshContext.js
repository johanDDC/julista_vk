import React from 'react';
import PropTypes from "prop-types";
import "./pullToRefreshContext.css"
import Icon24Replay from '@vkontakte/icons/dist/24/replay';

const PullToRefreshContext = props => (
    <div className="pullToRefreshContextContainer">
        <div className="pullToRefreshContextIconContainer">
            <Icon24Replay/>
        </div>
    </div>
);

PullToRefreshContext.propTypes = {};

export default PullToRefreshContext;