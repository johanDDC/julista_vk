import {SET_PANEL, SHOW_MODAL, SHOW_POPOUT, SWITCH_VIEW} from "../../utils/ReduxConst";

export function switchPanelAction(panel: string) {
    return {
        type: SET_PANEL,
        data: panel,
    }
}

export function switchViewAction(view: string, panel: string) {
    return {
        type: SWITCH_VIEW,
        data: {
            view: view,
            panel: panel
        },
    }
}

export function openModal(modal: string | null) {
    return {
        type: SHOW_MODAL,
        data: modal,
    }
}

export function openPopout(popout: React.ReactChild | null) {
    return {
        type: SHOW_POPOUT,
        data: popout,
    }
}