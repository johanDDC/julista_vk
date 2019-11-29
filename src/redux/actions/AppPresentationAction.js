import {recursiveTheming} from "../../utils/utils";
import VKconnect from '@vkontakte/vk-connect-promise';

export function setPanel(panel) {
    return {
        type: "SET_PANEL",
        data: panel
    }
}

export function switchView(view, panel) {
    return {
        type: "SWITCH_VIEW",
        data: {
            activeView: view,
            activePanel: panel,
        }
    }
}

export function switchNotification() {
    return {
        type: "SWITCH_NOTIFICATIONS"
    }
}

export function switchTheme(theme) {
    VKconnect.send("VKWebAppSetViewSettings", {
        "status_bar_style": "light",
        "action_bar_color": theme === "dark"
            ? "#132029"
            : "#5690ff"
    });

    recursiveTheming(document.querySelector("#root"), theme);

    return {
        type: "SWITCH_THEME",
        data: theme,
    }
}

export function setExpectedMark(mark) {
    return {
        type: "SET_EXPECTED_MARK",
        data: mark
    }
}

export function setModuleSystem(type) {
    return {
        type: "SET_MODULE_SYSTEM",
        data: type
    }
}

export function actualMarksPart(part) {
    return {
        type: "SET_ACTUAL_PART",
        data: part
    }
}