const activePanel = (state = "netschool_map", action) => {
    switch (action.type) {
        case "SET_PANEL":
            return action.value;

        default:
            return state;
    }
};

export default activePanel