const initialState = {
    journal: {
        data: {
            days: []
        }
    },
    marks: {
        data : []
    },
    lastMarks: {
        data : []
    },
    isFetching: false,
};

function appLogic(state = initialState, action) {
    switch (action.type) {
        case "GET_JOURNAL_REQUEST":
            return {
                ...state,
                journal: action.data,
                isFetching: true
            };
        case "GET_JOURNAL_SUCCESS":
            return {
                ...state,
                journal: action.data,
                isFetching: false
            };
        case "GET_JOURNAL_FAIL":
            //TODO append fail case

        case "GET_MARKS_REQUEST":
            return {
                ...state,
                marks: action.data,
                isFetching: true
            };
        case "GET_MARKS_SUCCESS":
            return {
                ...state,
                marks: action.data,
                isFetching: false
            };
        case "GET_MARKS_FAIL":
        //TODO append fail case

        case "GET_LAST_MARKS_REQUEST":
            return {
                ...state,
                lastMarks: action.data,
                isFetching: true
            };
        case "GET_LAST_MARKS_SUCCESS":
            return {
                ...state,
                lastMarks: action.data,
                isFetching: false
            };
        case "GET_LAST_MARKS_FAIL":
        //TODO append fail case
        default:
            return state
    }
}

export default appLogic;