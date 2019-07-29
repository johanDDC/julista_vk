const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function doAuthorize(login, password, diary) {
    return dispatch => {
        dispatch({
            type: "DO_AUTHORIZATION_REQUEST",
            data: {
                id: null,
                secret: null,
            },
        });

        auth(login, password, diary, dispatch)
    }
}

function auth(login, password, diary, dispatcher) {
    let methodUrl = "api/auth/";
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

    axios.post(baseUrl + methodUrl, json)
        .then((response) => {
            console.log("resp", response.data);
            if (response.data.status) {
                dispatcher({
                    type: "DO_AUTHORIZATION_SUCCESS",
                    data: {
                        id: response.data.id,
                        secret: response.data.secret,
                    },
                })
            } else {
                dispatcher({
                    type: "DO_AUTHORIZATION_FAIL",
                    data: response.data
                })
            }
        })
        .catch(error => {
            console.log("auth error", error);
            dispatcher({
                type: "DO_AUTHORIZATION_FAIL",
                data: error
            })
        });
}

export function setDiary(diary) {
    return {
        type: "SET_DIARY",
        data: diary
    }
}