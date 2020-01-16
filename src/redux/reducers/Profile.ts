import {AnyAction} from "redux";
import {AUTH, SET_DIARY, SET_STUDENT} from "../../utils/ReduxConst";

let initialState = {
    id: null,
    secret: null,
    diary: null,
    students: null,
    student: null,
};

const profile = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_DIARY:
            return {
                diary: action.data,
                ...state,
            };
        case AUTH:
            return {
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
                student: action.data.student,
                ...state,
            };
        case SET_STUDENT:
            return {
                student: action.data,
                ...state
            }
    }
    return state;
};

export default profile;