const initialState = {
    id: null,
    secret: null,
    diary: null,
    students: [],
    student: null,
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
                students: action.data.students,
                student: action.data.studentId,
                isFetching: true,
                error: false,
            };

        case "DO_AUTHORIZATION_SUCCESS":
            return {
                ...state,
                id: action.data.id,
                secret: action.data.secret,
                students: action.data.students,
                student: action.data.student,
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

        case "SET_STUDENT":
            return {
              ...state,
              student: action.data
            };

        default:
            return state
    }
}

export default profile;