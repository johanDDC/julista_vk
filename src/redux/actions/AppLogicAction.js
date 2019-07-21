import {setCorrectYear} from "../../utils/utils"

const axios = require('axios');
let baseUrl = "https://bklet.ml/";

export function getJournal(journal, id, secret, start, end) {
    return dispatch => {
        dispatch({
            type: "GET_JOURNAL_REQUEST",
            data: journal,
        });

        // а экшен внутри setTimeout
        // диспатчится через секунду
        // как будто-бы в это время
        // наши данные загружались из сети

        getSchedule(id, secret, start, end, dispatch);

        // setTimeout(() => {
        //     dispatch({
        //         type: GET_PHOTOS_SUCCESS,
        //         payload: [1, 2, 3, 4, 5],
        //     })
        // }, 1000)
    }
}

function getSchedule(id, secret, start, end, dispatcher) {
    let methodUrl = "api/diary/journal/dates/";

    let queries = `?id=${id}&secret=${secret}&start=${setCorrectYear(start.toLocaleDateString())}&end=${setCorrectYear(end.toLocaleDateString())}`;

    console.log("q", queries);

    axios.get(baseUrl + methodUrl + queries)
        .then((response) => {
            console.log("resp", response.data);
            dispatcher({
                type:"GET_JOURNAL_SUCCESS",
                data: response.data
            })
        });
}