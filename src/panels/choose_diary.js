import {Div, Group, Input, Panel, PanelHeader, Link} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/auth.css"

const ChooseDiary = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader className='header_color'>Booklet</PanelHeader>

    </Panel>
);

Auth.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Auth;