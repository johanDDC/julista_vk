const initialState = {
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
        case "GET_MARKS_REQUEST":
            return {
                ...state,
                marks: action.data,
                isFetching: true,
                error: false,
            };
        case "GET_MARKS_SUCCESS":
            return {
                ...state,
                marks: action.data,
                isFetching: false,
                error: false,
            };
        case "GET_MARKS_FAIL":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case "GET_LAST_MARKS_REQUEST":
            return {
                ...state,
                lastMarks: action.data,
                isFetching: true,
                errorLastMarks: false,
            };
        case "GET_LAST_MARKS_SUCCESS":
            return {
                ...state,
                lastMarks: action.data,
                isFetching: false,
                errorLastMarks: false,
            };
        case "GET_LAST_MARKS_FAIL":
            return {
                ...state,
                isFetching: false,
                errorLastMarks: true,
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