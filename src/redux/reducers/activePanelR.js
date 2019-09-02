let initialState = (localStorage.getItem("userData") ? "schedule" : "choose_diary");

const activePanel = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PANEL":
            return action.value;

        default:
            return state;
    }
};

export default activePanel