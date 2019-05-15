function updateToken() {
    return 0;
}

function getAccount(token, pid ){
    let url = `https://julista.annenkov.me/profile_screen/?token=${token}&pid=${pid}`;
    console.log(url);

    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status !== 200) {
        token = updateToken();
        getAccount(token, pid);
    } else {
        return JSON.parse(request.responseText)
    }
}

export default getAccount