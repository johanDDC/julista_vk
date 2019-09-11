import {getStartDateForLastMarks, setCorrectYear} from "../../utils/utils"

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function getJournal(id, secret, start, end, student_id) {
    // axios.post("http://bklet.ml/api/auth/bind_account/vk/",
    //     {
    //         id: 6379190441891350,
    //         secret: "40ad7525e75e8c8d8e236b79d4dc3cb8002c7d66e639c181f9d2b932ec712e6cddf551cfd81632efb4735bea23f46c81d1c490a51a9d6dcd25193ac61186099d",
    //         sign: "eUnIJk8jewVG--4iXpTA2wAa7aAvI_HhHTqNL1S0-9Q",
    //         vk_access_token_settings: "",
    //         vk_app_id: "6967676",
    //         vk_are_notifications_enabled: "1",
    //         vk_is_app_user: "1",
    //         vk_language: "ru",
    //         vk_platform: "desktop_web",
    //         vk_ref: "other",
    //         vk_user_id: "143305590",
    //     })
    //     .then(res => {
    //         console.log("BIND BIND", res)
    //     })
    //     .catch(err => {
    //         console.log("BIND BIND", err)
    //     });
        return dispatch => {
        dispatch({
            type: "GET_JOURNAL_REQUEST",
            data: {
                data: []
            },
        });

        getSchedule(id, secret, start, end, student_id, dispatch);
    }
}

function getSchedule(id, secret, start, end, student_id, dispatcher) {
    let methodUrl = "api/diary/journal/dates/";

    let queries = `?student_id=${student_id}&id=${id}&secret=${secret}&start=${setCorrectYear(start.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(end.toLocaleDateString("ru-RU"))}`;
    // let queries = `?id=0&secret=${secret}&start=${setCorrectYear(start.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(end.toLocaleDateString("ru-RU"))}`;

    console.log("schedule request", baseUrl + methodUrl + queries);

    let intervalId;

    var timeoutID = setTimeout(() => {
        console.log("schedule error");
        clearInterval(intervalId);
        dispatcher({
            type: "GET_JOURNAL_FAIL",
            data: Error("end timeout"),
        })
    }, 10000);
    intervalId = setInterval(() => {
        axios.get(baseUrl + methodUrl + queries)
            .then((response) => {
                console.log("resp", response.data);
                if (!response.data.data === null || !response.data.error) {
                    clearTimeout(timeoutID);
                    clearInterval(intervalId);
                    dispatcher({
                        type: "GET_JOURNAL_SUCCESS",
                        data: response.data
                    })
                }
            })
    }, 1000)
}

export function getMarks(id, secret, student_id,) {
    console.log("STUDENT ID", student_id);
    return dispatch => {
        dispatch({
            type: "GET_MARKS_REQUEST",
            data: {
                data: []
            },
        });

        getAndAggregateMarks(id, secret, student_id, dispatch)
    }
}

function getAndAggregateMarks(id, secret, student_id, dispatcher) {
    let methodUrl = "api/diary/marks/all/";

    let queries = `?student_id=${student_id}&id=${id}&secret=${secret}`;
    // let queries = `?id=0&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(endDate.toLocaleDateString("ru-RU"))}`;

    console.log(baseUrl + methodUrl + queries);

    let intervalId;

    var timeoutID = setTimeout(() => {
        console.log("marks error");
        clearInterval(intervalId);
        dispatcher({
            type: "GET_MARKS_FAIL",
            data: Error("end timeout")
        })
    }, 10000);
    intervalId = setInterval(() => {
        axios.get(baseUrl + methodUrl + queries)
            .then((response) => {
                console.log("marks resp", response.data);
                if (!response.data.data === null || !response.data.error) {
                    clearTimeout(timeoutID);
                    clearInterval(intervalId);
                    dispatcher({
                        type: "GET_MARKS_SUCCESS",
                        data: response.data
                    })
                }
            })
    }, 1000);
}

export function getLastMarks(id, secret, student_id) {

    return dispatch => {
        dispatch({
            type: "GET_LAST_MARKS_REQUEST",
            data: {
                data: []
            },
        });

        getLMarks(id, secret, student_id, dispatch);
    }
}

function getLMarks(id, secret, student_id, dispatcher) {
    let methodUrl = "api/diary/marks/dates/";
    let endDate = new Date();
    let startDate = getStartDateForLastMarks(endDate);

    let queries = `?student_id=${student_id}&id=${id}&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(endDate.toLocaleDateString("ru-RU"))}`;
    // let queries = `?id=0&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(endDate.toLocaleDateString("ru-RU"))}`;

    console.log("start", startDate, startDate.toLocaleDateString("ru-RU"));
    console.log("end", endDate, endDate.toLocaleDateString("ru-RU"));
    console.log("error here", baseUrl + methodUrl + queries);

    let intervalId;

    var timeoutID = setTimeout(() => {
        console.log("marks error");
        clearInterval(intervalId);
        dispatcher({
            type: "GET_LAST_MARKS_FAIL",
            data: Error("end timeout")
        })
    }, 10000);
    intervalId = setInterval(() => {
        axios.get(baseUrl + methodUrl + queries)
            .then((response) => {
                console.log("last marks resp", response.data);
                if (response.data.error) {
                    dispatcher({
                        type: "GET_LAST_MARKS_FAIL",
                        data: response.data.error
                    })
                } else {
                    clearTimeout(timeoutID);
                    clearInterval(intervalId);
                    dispatcher({
                        type: "GET_LAST_MARKS_SUCCESS",
                        data: response.data
                    })
                }
            })
    }, 1000);
}