import {combineReducers} from "redux"

import activeView from "./activeViewR"
import activePanel from "./activePanelR"
import fetchedUser from "./fetchedUserR"
import expectedMark from "./expectedMarkR"
import appLogic from "./appLogicR"
import profile from "./profileR"

const initialState = {
    activeView: 'AuthorizationView',
    diary: null,
    fetchedUser: null,
    expectedMark: 5
};

export const rootReducer = combineReducers({
    activeView: activeView,
    activePanel: activePanel,
    fetchedUser: fetchedUser,
    expectedMark: expectedMark,
    appLogic: appLogic,
    profile: profile,
});