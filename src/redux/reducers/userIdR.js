const userId = (state = null, action) => {
    switch (action.type) {
        case "SET_ID":
            return action.value;
        default:
            return state;
    }
};

export default userId