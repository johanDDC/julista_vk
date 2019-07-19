const expectedMark = (state = 5, action) => {
    switch (action.type) {
        case "SET_MARK":
            return action.value;
        default:
            return state;
    }
};

export default expectedMark;