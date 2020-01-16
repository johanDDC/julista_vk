import {recursiveTheming} from "../../utils/Utils";
import VKconnect from '@vkontakte/vk-connect-promise';

export function setTheme(theme) {
    console.log(theme);
    VKconnect.send("VKWebAppSetViewSettings", {
        "status_bar_style": "light",
        "action_bar_color": theme === "dark"
            ? "#132029"
            : "#5690ff"
    });
    recursiveTheming(document.querySelector("#root"), theme);
    return {
        type: "SET_THEME",
        value: theme
    }
}