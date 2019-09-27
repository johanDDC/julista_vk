import connect from '@vkontakte/vk-connect-promise';

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
                bind_user(response.data.id, response.data.secret);
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

function bind_user(id, secret) {
    let methodUrl = "api/auth/bind_account/vk/";
    let json = window.location.search.slice(1).split('&')
        .map((queryParam) => {
            let kvp = queryParam.split('=');
            return {key: kvp[0], value: kvp[1]}
        })
        .reduce((query, kvp) => {
            query[kvp.key] = decodeURIComponent(kvp.value);
            return query
        }, {});
    // json = {
    //     sign: "06DakpJLGnTxBx3vhdVYuahPhTcnKeZEgMuAtAOqVms",
    //     vk_access_token_settings: "",
    //     vk_app_id: "6967676",
    //     vk_are_notifications_enabled: "0",
    //     vk_group_id: "171343913",
    //     vk_is_app_user: "1",
    //     vk_language: "ru",
    //     vk_platform: "desktop_web",
    //     vk_ref: "other",
    //     vk_user_id: "143305590",
    //     vk_viewer_group_role: "admin",
    // };
    json.id = id;
    json.secret = secret;
    console.log("bind data", json);

    axios.post(baseUrl + methodUrl, json)
        .then(res => {
            console.log("bind result", res)
        })
        .catch(err => {
            console.log("bind fail", err)
        });
}

export function clearProfile() {
    return {
        type: "CLEAR",
    }
}