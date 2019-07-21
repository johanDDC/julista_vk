import {setCorrectYear} from "../../utils/utils"

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
            dispatcher({
                type: "DO_AUTHORIZATION_SUCCESS",
                data: {
                    id: response.data.id,
                    secret: response.data.secret,
                },
            })
        });
}
