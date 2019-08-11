const initialState = {
    activeView: "AuthorizationView",
    activePanel: "choose_student",
};

function appPresentation(state = initialState, action) {
    switch (action.type) {
        case "SET_PRESENTATION":
            return {
                ...state,
                activeView: action.data.view,
                activePanel: action.data.panel,
            };

        case "SET_PANEL":
            return {
                ...state,
                activePanel: action.data
            };

        default:
            return state
    }
}

export default appPresentation;