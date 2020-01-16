import {Div, Panel, Button} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import React from "react";
import "./styles/choose_student.css"
import {InfoResponse, PanelProps} from "../utils/Props";
import {connect} from "react-redux";
import {getProfileInfo} from "../utils/Requests";
import {Dispatch} from "redux";
import {openPopout, switchPanelAction, switchViewAction} from "../redux/actions/AppPresentation";
import {setInfo} from "../redux/actions/AccountInfo";
import {setStudent} from "../redux/actions/Profile";

interface Props extends PanelProps {
    students: Array<{ id: number, name: string, class: string }>
    profile_id: number
    secret: string

    setInfo: (info: InfoResponse) => void
    setStudent: (student: {}) => void
    switchView: (view: string, panel: string) => void
}

class ChooseStudent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.drawStudents();
    }

    choose = (student: { id: number }) => {
        let requestData = {
            id: this.props.profile_id,
            secret: this.props.secret,
            student_id: student.id
        };
        getProfileInfo(requestData)
            .then(data => {
                this.props.setInfo(data);
            });
        this.props.setStudent(student);
        this.props.switchView("main", "schedule");
    };

    drawStudents = () => {
        let students: Array<React.ReactChild> = [];
        this.props.students.forEach(student => {
            students.push(
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
        return students;
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <Div className="chooseStudentScreen">
                    <div className="chooseStudentTitle">
                        Выберите ученика
                    </div>
                    <div className="chooseStudentScreenStudents">
                        {this.drawStudents()}
                    </div>
                </Div>
            </Panel>
        )
    }

}

const mapStateToProps = (store: any) => {
    return {
        students: store.profile.students,
        profile_id: store.profile.id,
        secret: store.profile.secret,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setInfo: (info: InfoResponse) => dispatch(setInfo(info)),
        setStudent: (student: {}) => dispatch(setStudent(student)),
        switchView: (view: string, panel: string) => dispatch(switchViewAction(view, panel)),
        switchPanel: (panel: string) => dispatch(switchPanelAction(panel)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseStudent);