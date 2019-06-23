let request = new XMLHttpRequest();
let baseUrl = "https://bklet.ml/";

function queryConstructor(url, queries) {
    let resultUrl = url + "?";
    queries.forEach((e) => {
        resultUrl += e
    });
}

export function auth(login, password, diary) {
    let methodUrl = "api/auth/";
    request.open('POST', baseUrl + methodUrl, false);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let json ={
        diary : diary,
        login : login,
        password : password
    };

    request.send(JSON.stringify(json));

    return JSON.parse(request.responseText)
}

export function getAndAggregateMarks(id, secret) {
    let methodUrl = "/api/diary/marks/dates/";
    let startDate = new Date(2018, 9, 3);
    let endDate = new Date();

    let queries = `?id=${id}&secret=${secret}&start=${startDate}&end=${endDate}`;

    request.open('GET', baseUrl + methodUrl + queries, false)
    request.send(null);

    console.log(request.responseText);

    return JSON.parse(request.responseText)
}
