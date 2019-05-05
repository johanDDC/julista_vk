import {Avatar, Div, Group, Input, ListItem, Panel, PanelHeader} from '@vkontakte/vkui';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user_outline';
import Icon24MarketOutline from '@vkontakte/icons/dist/24/market_outline';
import PropTypes from "prop-types";
import React from "react";

const Account = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader className='header_color'>Аккаунт</PanelHeader>
        {fetchedUser &&
        <Group title="User Data Fetched with VK Connect">
            <ListItem
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
            >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </ListItem>
        </Group>}
    </Panel>
);

Account.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
    }),
};

export default Account;