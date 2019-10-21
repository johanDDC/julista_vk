import {recursiveTheming} from "../../utils/utils";

export function setTheme(theme) {
    console.log(theme);
    recursiveTheming(document.querySelector("#root"), theme);
    return {
        type: "SET_THEME",
        value: theme
    }
}