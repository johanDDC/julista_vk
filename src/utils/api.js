let request = new XMLHttpRequest();
let baseUrl = "https://bklet.ml/";

function auth(login, password, diary) {
    let methodUrl = "api/auth/";
    request.open('POST', baseUrl + methodUrl, false);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let json ={
        diary : diary,
        login : login,
        password : password
    };

    console.log(json);

    request.send(JSON.stringify(json));

    console.log(request.responseText);
}

export default auth