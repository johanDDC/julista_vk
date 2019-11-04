import connect from '@vkontakte/vk-connect-promise';
import {getVkParams} from "../../utils/utils"
import {bindUser} from "../../utils/requests";

let baseUrl = "https://bklet.ml/api/";

export function vkAuth(vk_params) {
    let methodUrl = "auth/bind_account/vk/";
    let url = baseUrl + methodUrl + "?";
    for (let key in vk_params) {
        url += `${key}=${vk_params[key]}&`
    }

    return dispatch => {
        fetch(url, {
            method: "GET"
        }).then(response => {
            response.json().then(data => {
                if (data.status) {
                    let localData = {
                        id: data.id,
                        secret: data.secret,
                        students: data.students.list,
                        student: (data.students.list.length === 1 ? data.students.list[0] : null),
                    };
                    dispatch({
                        type: "DO_VK_AUTHORIZATION_SUCCESS",
                        data: localData,
                    });

                    setProfile(localData, null, dispatch)
                }
            })
        })
            .catch(err => {
                dispatch({
                    type: "DO_VK_AUTHORIZATION_FAIL",
                });
            });
    }
}

export function doAuthorize() {
    return {
        type: "DO_AUTHORIZATION_REQUEST",
        data: {
            id: null,
            secret: null,
            students: [],
            student: null,
        }
    }
}

export function authSuccess(data) {
    return {
        type: "DO_AUTHORIZATION_SUCCESS",
        data: data,
    }
}

export function authFail(message) {
    return {
        type: "DO_AUTHORIZATION_FAIL",
        data: message,
    }
}

export function setDiary(diary) {
    return {
        type: "SET_DIARY",
        data: diary,
    }
}

export function setStudent(student) {
    return {
        type: "SET_STUDENT",
        data: student,
    }
}

export function setProfile(data) {
    return {
        type: "SET_USER_DATA",
        data: data,
    };
}

export function clearProfile() {
    return {
        type: "CLEAR_PROFILE",
    }
}