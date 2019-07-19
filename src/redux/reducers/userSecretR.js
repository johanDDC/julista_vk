const userSecret = (state = null, action) => {
    switch (action.type) {
        case "SET_SECRET":
            return action.value;
        default:
            return state;
    }
};

export default userSecret