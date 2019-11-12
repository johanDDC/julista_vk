const initialState = {
    journal: {
        data: []
    },
    marks: [],
    lastMarks: [],
};

function appLogic(state = initialState, action) {
    switch (action.type) {
        case "GET_JOURNAL_REQUEST":
            return {
                ...state,
                journal: action.data,
                isFetching: true,
                error: false,
            };
        case "GET_JOURNAL_SUCCESS":
            return {
                ...state,
                journal: action.data,
                isFetching: false,
                error: false,
            };
        case "GET_JOURNAL_FAIL":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case "SET_MARKS":
            return {
                ...state,
                marks: action.data,
            };
        case "SET_LAST_MARKS":
            return {
                ...state,
                lastMarks: action.data,
            };
        case "CLEAR_DATA":
            return {
                journal: {
                    data: []
                },
                marks: {
                    data: []
                },
                lastMarks: {
                    data: []
                },
                isFetching: false,
                error: false,
                errorLastMarks: false,
            };
        default:
            return state
    }
}

export default appLogic;