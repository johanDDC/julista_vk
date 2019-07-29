const initialState = {
    id: null,
    secret: null,
    diary: null,
    isFetching: false,
    error: false,
};

function profile(state = initialState, action) {
    switch (action.type) {
        case "DO_AUTHORIZATION_REQUEST":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                isFetching: true,
                error: false,
            };

        case "DO_AUTHORIZATION_SUCCESS":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                isFetching: false,
                error: false,
            };
        case "DO_AUTHORIZATION_FAIL":
            return {
                ...state,
                id: action.data,
                isFetching: false,
                error: true,
            };
        case "SET_DIARY":
            return {
                ...state,
                diary: action.data,
                isFetching: false
            };

        default:
            return state
    }
}

export default profile;