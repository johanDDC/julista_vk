const initialState = {
    id: null,
    secret: null,
    isFetching: false,
};

function profile(state = initialState, action) {
    switch (action.type) {
        case "DO_AUTHORIZATION_REQUEST":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                isFetching: true
            };

        case "DO_AUTHORIZATION_SUCCESS":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                isFetching: false
            };
        case "DO_AUTHORIZATION_FAIL":
        //TODO append fail case

        default:
            return state
    }
}

export default profile;