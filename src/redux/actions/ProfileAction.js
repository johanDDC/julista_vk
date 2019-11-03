import connect from '@vkontakte/vk-connect-promise';
import {getVkParams} from "../../utils/utils"

const axios = require('axios');
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
    let methodUrl = "auth/";
    let ua = navigator.userAgent.toLowerCase();
    let json = {
        diary: diary,
        login: login,
        password: password,
        region: region,
        province: province,
        city: city,
        school: school,
        vk_user_id: getVkParams().vk_user_id,

        device_type: (ua.search('ios') > 0
            ? 'ios'
            : (ua.search('android') > 0
                ? 'android'
                : 'pc')),
    };

    console.log("auth data", json);

    fetch(baseUrl + methodUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(json),
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("fetch try", data);
                    if (data.status) {
                        bind_user(data.id, data.secret);
                        let localData = {
                            id: data.id,
                            secret: data.secret,
                            students: data.students.list,
                            diary: diary,
                            student: (data.students.list.length === 1 ? data.students.list[0] : null),
                        };
                        localStorage.setItem("userData", JSON.stringify(localData));

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
                            data: localData,
                        });
                        console.log("student", localData.student);
                        setProfile(localData, null, dispatcher);
                    } else {
                        dispatcher({
                            type: "DO_AUTHORIZATION_FAIL",
                            data: data.message,
                        })
                    }
                });
            } else {
                dispatcher({
                    type: "DO_AUTHORIZATION_FAIL",
                    data: "Неудачная попытка входа. Пожалуйста, проверьте свои данные и попробуйте ещё раз.",
                })
            }
        })
        .catch(err => console.log("fetch loose", err));
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

export function setProfile(profileData, profileInfo, dispatcher) {
    if (profileData) {
        if (profileData.student) {
            fetch(baseUrl + `profile/info/?id=${profileData.id}&secret=${profileData.secret}&student_id=${profileData.student.id}`,
                {
                    method: "GET"
                })
                .then(response => {
                    console.log("done", response, response.ok);
                    if (response.ok) {
                        response.json().then(profile => {
                            console.log("exp", profile);
                            dispatcher({
                                type: "SET_USER_DATA",
                                data: profile.data,
                            });
                        })
                    }
                });
        }
    } else if (profileInfo) {
        return {
            type: "SET_USER_DATA",
            data: profileInfo,
        }
    }
}

async function bind_user(id, secret) {
    let methodUrl = "auth/bind_account/vk/";
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

export function unbind_user(id, secret) {
    let vk_id = getVkParams().vk_user_id;
    let methodUrl = `auth/bind_account/vk/logout/`;
    let json = {
        id: id,
        secret: secret,
        vk_user_id: vk_id - 0,
    };

    axios.post(baseUrl + methodUrl, json)
        .then(resp => console.log(resp))
        .catch(err => console.log("logout err"))
}

export function clearProfile() {
    return {
        type: "CLEAR_PROFILE",
    }
}