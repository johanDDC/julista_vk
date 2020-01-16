/*
* Everything about app presentation, include current view, panel, modal activity and etc.
*/
import {AnyAction} from "redux";
import {SET_PANEL, SHOW_MODAL, SHOW_POPOUT, SWITCH_VIEW} from "../../utils/ReduxConst";

let initialState = {
    activePanel: "choose_diary",
    activeView: "auth",
    activeModal: null,
    popout: null,
};

const appPresentation = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_PANEL:
            return {
                ...state,
                activePanel: action.data,
            };
        case SWITCH_VIEW:
            return {
                ...state,
                activeView: action.data.view,
                activePanel: action.data.panel,
            };
        case SHOW_MODAL:
            return {
                ...state,
                activeModal: action.data,
            };
        case SHOW_POPOUT:
            return {
              ...state,
              popout: action.data,
            };
        default:
            break;
    }

    return state;
};

export default appPresentation;