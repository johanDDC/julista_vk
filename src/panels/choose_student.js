import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"

import MosRuIcon from "../custom_components/icon-pack/MosRuIcon"
import MosregIcon from "../custom_components/icon-pack/MosregIcon"

class ChooseStudent extends React.Component {
    constructor(props) {
        super(props);
        this.d = "";

        this.students = [];
    }

    choose = (student) => {
        this.props.setStudent(student);
        this.props.setView("MainView");
        this.props.setPanel("account");
    };

    drawStudents = () => {
        this.props.profile.students.forEach(student => {
           this.students.push(
               <Button level="tertiary" className="chooseStudentScreenStudentContainer"
                       onClick={() => {
                           this.d = student;
                           this.choose(this.d)
                       }}>
                   <div className="chooseStudentScreenStudentName">
                       {student.name}
                   </div>
                   <div className="chooseStudentScreenStudentGrade">
                       {student.class} класс
                   </div>
               </Button>
           )
        });

        return this.students;
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseStudentScreen">
                    <span className="chooseStudentTitle">
                        Выберите ученика
                    </span>
                    <div className="chooseStudentScreenStudents">
                        {this.drawStudents()}
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