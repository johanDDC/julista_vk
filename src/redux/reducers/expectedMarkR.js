let initialState = (localStorage.getItem("appSettings")
        ? (JSON.parse(localStorage.getItem("appSettings")).expectedMark
            ? JSON.parse(localStorage.getItem("appSettings")).expectedMark
            : 5)
        : 5
);

const expectedMark = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MARK":
            let settings = (localStorage.getItem("appSettings")
                ? JSON.parse(localStorage.getItem("appSettings"))
                : {});
            settings.expectedMark = action.value;
            localStorage.setItem("appSettings", JSON.stringify(settings));
            return action.value;
        default:
            return state;
    }
};

export default expectedMark;