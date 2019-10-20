import {combineReducers} from "redux"

import activeView from "./activeViewR"
import activePanel from "./activePanelR"
import fetchedUser from "./fetchedUserR"
import expectedMark from "./expectedMarkR"
import theme from "./themeR"
import appLogic from "./appLogicR"
import profile from "./profileR"

export const rootReducer = combineReducers({
    activeView: activeView,
    activePanel: activePanel,
    fetchedUser: fetchedUser,
    expectedMark: expectedMark,
    theme: theme,
    appLogic: appLogic,
    profile: profile,
});