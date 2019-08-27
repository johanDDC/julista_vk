import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import MosregIcon from "../custom_components/icon-pack/MosregIcon"

class ChooseStudent extends React.Component {
    constructor(props) {
        super(props);
        this.d = ""
    }

    choose = (student) => {
        // this.props.setStudent(student)
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseStudentScreen">
                    <span className="chooseStudentTitle">
                        Выберите ученика
                    </span>
                    <div className="chooseStudentScreenStudents">
                        <Button level="tertiary" className="chooseStudentScreenStudentContainer"
                                onClick={() => {
                                    // this.d = "mosru";
                                    // this.choose(this.d);
                                }}>
                            <div className="chooseStudentScreenStudentName">
                                Ваня Пупкин
                            </div>
                            <div className="chooseStudentScreenStudentGrade">
                                9 класс
                            </div>
                        </Button>
                    </div>
                </Div>
            </Panel>
        )
    }

}

ChooseStudent.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
    setStudent: PropTypes.func.isRequired,
    setView: PropTypes.func,
    setPanel: PropTypes.func.isRequired,
};

export default ChooseStudent;