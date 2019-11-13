const initialState = {
    journal: [],
    marks: [],
    lastMarks: [],
};

function appLogic(state = initialState, action) {
    switch (action.type) {
        case "SET_JOURNAL":
            return {
                ...state,
                journal: action.data,
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
                journal: [],
                marks: [],
                lastMarks: [],
            };
        default:
            return state
    }
}

export default appLogic;