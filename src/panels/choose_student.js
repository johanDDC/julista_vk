import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"

const axios = require('axios');

class ChooseStudent extends React.Component {
    constructor(props) {
        super(props);
        this.d = "";

        this.students = [];
        this.drawStudents();
    }

    choose = (student) => {
        axios.get(`https://bklet.ml/api/profile/info/?id=${this.props.profile.id}&secret=${this.props.profile.secret}&student_id=${student.id}`)
            .then(resp => {
                console.log("exp", resp.data.data.exp);
                this.props.setExp(resp.data.data.exp)
            })
            .catch(err => console.log("exp", err));
        this.props.setStudent(student);
        try {
            this.props.setView("MainView");
            this.props.setPanel("schedule");
        } catch (e) {
            this.props.setPanel("account");
        }
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
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseStudentScreen">
                    <div className="chooseStudentTitle">
                        Выберите ученика
                    </div>
                    <div className="chooseStudentScreenStudents">
                        {this.students}
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
    setExp: PropTypes.func.isRequired,
};

export default ChooseStudent;