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