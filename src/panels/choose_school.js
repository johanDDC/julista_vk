import {Div, Panel, PanelHeader, Search, List, CellButton} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_school.css"

class ChooseSchool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };

    }

    btnBack = () => {
        this.props.setPanel("auth")
    };

    get school() {
        const search = this.state.search.toLowerCase();
        return this.props.schools.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader
                    left={
                        <PanelHeaderBack onClick={this.btnBack}/>
                    }
                    noShadow={true}
                >
                    Найдите школу
                </PanelHeader>
                <Search
                    className="chooseSchoolSearchContainer"
                    value={this.state.search}
                    onChange={val => this.setState({search: val})}
                />
                <List>
                    {
                        this.school.map(school =>
                            <CellButton className="chooseSchoolButton"
                                        key={school.id}
                                        onClick={() => {
                                            let find = [school.id, school.name];
                                            console.log([school.id, school.name]);
                                            this.props.chooser(find);
                                            this.props.setPanel("auth");
                                        }}
                            >
                                {school.name}
                            </CellButton>)
                    }
                </List>
            </Panel>
        )
    }

}

ChooseSchool.propTypes = {
    id: PropTypes.string.isRequired,
    setPanel: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired,
    chooser: PropTypes.func.isRequired,
};

export default ChooseSchool;