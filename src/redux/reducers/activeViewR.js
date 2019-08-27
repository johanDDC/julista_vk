let initialState = (localStorage.getItem("userData") ? "MainView" : "AuthorizationView");

const activeView = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VIEW":
            return action.value;

        default:
            return state;
    }
};

export default activeView;