import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"
import {setAllMarks, setLastMarks} from "../redux/actions/AppLogicAction";
import {actualMarksPart, switchView} from "../redux/actions/AppPresentationAction";
import {connect} from "react-redux";
import {setStudent} from "../redux/actions/ProfileAction";
import {getProfileInfo} from "../utils/requests";

class ChooseStudent extends React.Component {
    constructor(props) {
        super(props);

        this.students = [];
        this.drawStudents();
    }

    choose = (student) => {
        this.props.getProfileInfoAction({
            ...this.props.profile,
            student: student
        });
        this.props.setStudentAction(student);
        this.props.switchViewAction("MainView", "schedule");
    };

    drawStudents = () => {
        this.props.profile.students.forEach(student => {
            this.students.push(
                <Button level="tertiary" className="chooseStudentScreenStudentContainer"
                        onClick={() => {
                            this.choose(student)
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
    setPanel: PropTypes.func.isRequired,
};

// const mapStateToProps = store => {
//     return {
//         // actualPart: store.presentation.actualPart,
//     }
// };

const mapDispatchToProps = dispatch => {
    return {
        switchViewAction: (view, panel) => dispatch(switchView(view, panel)),
        setStudentAction: student => dispatch(setStudent(student)),
        getProfileInfoAction: profile => getProfileInfo(dispatch, profile),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(ChooseStudent);