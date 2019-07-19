import {setCorrectYear} from "./utils"
import {async} from "q";

let request = new XMLHttpRequest();
let baseUrl = "https://bklet.ml/";

export function auth(login, password, diary) {
    let methodUrl = "api/auth/";
    request.open('POST', baseUrl + methodUrl, false);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // let json ={
    //     diary : diary,
    //     login : login,
    //     password : password
    // };
    let json = {
        diary: "mosru",
        login: "zzoorm@gmail.com",
        password: "YaLol123"
    };

    request.send(JSON.stringify(json));

    return JSON.parse(request.responseText)
}

export function getAndAggregateMarks(id, secret) {
    let methodUrl = "api/diary/marks/dates/";
    let startDate = new Date(2018, 9, 3);
    let endDate = new Date();

    let queries = `?id=${id}&secret=${secret}&start=${setCorrectYear(startDate.toLocaleDateString())}&end=${setCorrectYear(endDate.toLocaleDateString())}`;

    console.log(baseUrl + methodUrl + queries);

    request.open('GET', baseUrl + methodUrl + queries, false);
    request.send(null);

    console.log(request.responseText);

    return JSON.parse(request.responseText)
}

export function getSchedule(id, secret, start, end) {
    let methodUrl = "api/diary/journal/dates/";

    let queries = `?id=${id}&secret=${secret}&start=${setCorrectYear(start.toLocaleDateString())}&end=${setCorrectYear(end.toLocaleDateString())}`;

    console.log("q", queries);

    request.open('GET', baseUrl + methodUrl + queries, false);
    request.send(null);

    console.log(request.responseText);

    if (request.readyState === 4)
        return JSON.parse(request.responseText)
}