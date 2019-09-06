import {getStartDateForLastMarks, setCorrectYear} from "../../utils/utils"

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function getJournal(id, secret, start, end, student_id) {
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
                if (response.data.data === null || response.data.error) {
                    dispatcher({
                        type: "GET_JOURNAL_FAIL",
                        data: []
                    })
                } else {
                    clearTimeout(timeoutID);
                    clearInterval(intervalId);
                    dispatcher({
                        type: "GET_JOURNAL_SUCCESS",
                        data: response.data
                    })
                }
            })
    }, 200)
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
    let startDate = new Date(2019, 8, 2);
    let endDate = new Date(2019, 8, 8);

    let queries = `?student_id=${student_id}&id=${id}&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString("ru-RU"))}&end=${setCorrectYear(endDate.toLocaleDateString("ru-RU"))}`;
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
                if (response.data.data === null || response.data.error) {
                    dispatcher({
                        type: "GET_MARKS_FAIL",
                        data: []
                    })
                } else {
                    clearTimeout(timeoutID);
                    clearInterval(intervalId);
                    dispatcher({
                        type: "GET_MARKS_SUCCESS",
                        data: response.data
                    })
                }
            })
    }, 200);
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
    }, 200);
}