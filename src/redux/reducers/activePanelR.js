import connect from "@vkontakte/vk-connect-promise";

let initialState = (localStorage.getItem("userData") ? "schedule" : "choose_diary");

connect.send("VKWebAppStorageGet", {
    "keys": ["userData"],
})
    .then(res => {
        console.log("VK Storage Get Success", res);
        initialState = "schedule";
    })
    .catch(err => {
        console.log("VK Storage Get Fail", err);
        initialState = (localStorage.getItem("userData") ? "schedule" : "choose_diary");
    });

const activePanel = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PANEL":
            return action.value;

        default:
            return state;
    }
};

export default activePanel