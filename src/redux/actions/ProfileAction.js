import connect from '@vkontakte/vk-connect-promise';
import {getVkParams} from "../../utils/utils"
import {async} from "q";

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function vkAuth(vk_params) {
    let methodUrl = "api/auth/bind_account/vk/";
    let url = baseUrl + methodUrl + "?";
    for (let key in vk_params) {
        url += `${key}=${vk_params[key]}&`
    }

    return dispatch => {
        axios.get(url)
            .then(resp => {
                if (resp.data.status) {
                    let students = [];
                    resp.data.students.list.forEach(e => {
                        students.push(e);
                    });
                    dispatch({
                        type: "DO_VK_AUTHORIZATION_SUCCESS",
                        data: {
                            id: resp.data.id,
                            secret: resp.data.secret,
                            students: students,
                            student: (students.length === 1 ? students[0] : null),
                        },
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: "DO_VK_AUTHORIZATION_FAIL",
                });
            });
    }
}

export function doAuthorize(login, password, diary, region, province, city, school) {
    return dispatch => {
        dispatch({
            type: "DO_AUTHORIZATION_REQUEST",
            data: {
                id: null,
                secret: null,
                students: [],
                student: null,
            },
        });

        auth(login, password, diary, dispatch, region, province, city, school)
    }
}

function auth(login, password, diary, dispatcher, region, province, city, school) {
    let methodUrl = "api/auth/";
    let ua = navigator.userAgent.toLowerCase();
    let json = {
        diary: diary,
        login: login,
        password: password,
        region: region,
        province: province,
        city: city,
        school: school,

        device_type: (ua.search('ios') > 0
            ? 'ios'
            : (ua.search('android') > 0
                ? 'android'
                : 'pc')),
    };

    axios.post(baseUrl + methodUrl, json)
        .then((response) => {
            let students = [];
            if (response.data.status) {
                bind_user(response.data.id, response.data.secret);
                response.data.students.list.forEach(e => {
                    students.push(e);
                });
                let localData = {
                    id: response.data.id,
                    secret: response.data.secret,
                    students: students,
                    diary: diary,
                    student: (students.length === 1 ? students[0] : null),
                    // student: null,
                };
                localStorage.setItem("userData", JSON.stringify(localData));
                connect.send("VKWebAppStorageSet", {
                    "key": "userData",
                    "value": JSON.stringify(localData),
                })
                    .then(res => console.log("VK Storage Set Success", res))
                    .catch(err => {
                        console.log("VK Storage Set Fail", err);
                        localStorage.setItem("userData", JSON.stringify(localData));
                    });
                window.ga('diaryTracker.set', {
                    diary: diary
                });
                window.ga('diaryTracker.send', {
                    hitType: 'event',
                    eventCategory: 'Sign in',
                    eventAction: 'click',
                    eventLabel: diary
                });
                dispatcher({
                    type: "DO_AUTHORIZATION_SUCCESS",
                    data: {
                        id: response.data.id,
                        secret: response.data.secret,
                        students: students,
                        student: (students.length === 1 ? students[0] : null),
                        // student: null,
                    },
                })
            } else {
                dispatcher({
                    type: "DO_AUTHORIZATION_FAIL",
                    data: response.data.message,
                })
            }
        })
        .catch(error => {
            dispatcher({
                type: "DO_AUTHORIZATION_FAIL",
                data: error
            })
        });
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

async function bind_user(id, secret) {
    let methodUrl = "api/auth/bind_account/vk/";
    let json = getVkParams();
    json.id = id;
    json.secret = secret;
    console.log("bind data", json);

    let intervalId;

    var timeoutID = setTimeout(() => {
        clearInterval(intervalId);
    }, 10000);
    intervalId = setInterval(() => {
        axios.post(baseUrl + methodUrl, json)
            .then(response => {
                clearTimeout(timeoutID);
                clearInterval(intervalId);
                console.log("bind result", response)
            })
            .catch(err => {
                console.log("bind fail", err)
            });
    }, 1000);
}

export async function unbind_user(id, secret) {
    let vk_id = getVkParams().vk_user_id;
    let methodUrl = `api/auth/bind_account/vk/logout/`;
    let json = {
        id: id,
        secret: secret,
        vk_user_id: vk_id - 0,
    };

    axios.post(baseUrl + methodUrl, json)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}

export function clearProfile() {
    return {
        type: "CLEAR_PROFILE",
    }
}