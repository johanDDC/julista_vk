const initialState = {
    journal: {
        data: {
            days: []
        }
    },
    marks: [],
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

        default:
            return state
    }
}

export default appLogic;