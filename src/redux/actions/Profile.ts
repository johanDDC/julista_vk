import {AUTH, SET_DIARY, SET_STUDENT} from "../../utils/ReduxConst";

export function setDiary(diary: string) {
    return {
        type: SET_DIARY,
        data: diary,
    }
}

export function completeAuth(auth_data: {}) {
    return {
        type: AUTH,
        data: auth_data,
    }
}

export function setStudent(student: {}) {
    return {
        type: SET_STUDENT,
        data: student
    }
}