let initialState = (localStorage.getItem("appSettings")
        ? (JSON.parse(localStorage.getItem("appSettings")).theme
            ? JSON.parse(localStorage.getItem("appSettings")).theme
            : "default")
        : "default"
);

const theme = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THEME":
            let settings = (localStorage.getItem("appSettings")
                ? JSON.parse(localStorage.getItem("appSettings"))
                : {});
            settings.theme = action.value;
            localStorage.setItem("appSettings", JSON.stringify(settings));
            return action.value;
        default:
            return state;
    }
};

export default theme;