import connect from '@vkontakte/vk-connect-promise';

let initialState = (localStorage.getItem("userData") ? "MainView" : "AuthorizationView");

connect.send("VKWebAppStorageGet", {
    "keys": ["userData"],
})
    .then(res => {
        console.log("VK Storage Get Success", res);
        initialState = "MainView";
    })
    .catch(err => {
        console.log("VK Storage Get Fail", err);
        initialState = (localStorage.getItem("userData") ? "MainView" : "AuthorizationView");
    });

const activeView = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VIEW":
            return action.value;

        default:
            return state;
    }
};

export default activeView;