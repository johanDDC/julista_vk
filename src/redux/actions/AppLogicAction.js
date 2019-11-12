import {getStartDateForLastMarks, setCorrectYear} from "../../utils/utils"

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

let normalTimeout = 10000;
let normalInterval = 3000;

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

    // console.log("schedule request", baseUrl + methodUrl + queries);

    let intervalId;

    var timeoutID = setTimeout(() => {
        clearInterval(intervalId);
        dispatcher({
            type: "GET_JOURNAL_FAIL",
            data: Error("end timeout"),
        })
    }, normalTimeout);
    intervalId = setInterval(() => {
        fetch(baseUrl + methodUrl + queries, {
            method: "GET"
        })
            .then(response => {
                response.json().then(data => {
                    if (data.data !== null || data.error_msg) {
                        console.log("get schedule", data);
                        clearTimeout(timeoutID);
                        clearInterval(intervalId);
                        dispatcher({
                            type: "GET_JOURNAL_SUCCESS",
                            data: data
                        })
                    }
                })
            });
    }, normalInterval)
}

export function setAllMarks(data) {
    return{
        type: "SET_MARKS",
        data: data
    }
}

export function setLastMarks(data) {
    return{
        type: "SET_LAST_MARKS",
        data: data
    }
}

export function clearData() {
    return {
        type: "CLEAR_DATA",
    }
}