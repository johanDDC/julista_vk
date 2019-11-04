let initialState = {
    activeView: localStorage.getItem("userData")
        ? "MainView"
        : "AuthorizationView",
    activePanel: localStorage.getItem("userData")
        ? "schedule" :
        "choose_diary",
    theme: "default",
    notifications: false,
    expectedMark: 5,
    ...restoreData(),
};

function presentation(state = initialState, action) {
    switch (action.type) {
        case "SET_PANEL":
            storeData({activePanel: action.data});
            console.log(action.data);
            return {
                ...state,
                activePanel: action.data,
            };
        case "SWITCH_VIEW":
            storeData(action.data);
            return {
                ...state,
                ...action.data,
            };
        case "SWITCH_NOTIFICATIONS":
            storeData({notifications: !state.notifications});
            return {
                ...state,
                notifications: !state.notifications,
            };
        case "SWITCH_THEME":
            storeData({theme: action.data});
            return {
                ...state,
                theme: action.data,
            };
        case "SET_EXPECTED_MARK":
            storeData({expectedMark: action.data});
            return {
                ...state,
                expectedMark: action.data,
            };
        default:
            return state;
    }
}

function restoreData() {
    let locData = localStorage.getItem("appSettings")
        ? JSON.parse(localStorage.getItem("appSettings"))
        : {};
    console.log(locData);
    return locData;
}

function storeData(data) {
    let locData = localStorage.getItem("appSettings")
        ? JSON.parse(localStorage.getItem("appSettings"))
        : {};

    locData = {
        ...locData,
        ...data,
    };

    localStorage.setItem("appSettings", JSON.stringify(locData));
}

export default presentation;