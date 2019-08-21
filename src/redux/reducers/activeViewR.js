const activeView = (state = "MainView", action) => {
    switch (action.type) {
        case "SET_VIEW":
            return action.value;

        default:
            return state;
    }
};

export default activeView;