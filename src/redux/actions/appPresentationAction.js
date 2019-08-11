export function setPresentation(presentation) {
    return {
        type: "SET_PRESENTATION",
        data: presentation,
    }
}

export function setPanel(panel) {
    return {
        type: "SET_PANEL",
        data: panel,
    }
}