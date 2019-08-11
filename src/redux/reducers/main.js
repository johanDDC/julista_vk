import {combineReducers} from "redux"

import fetchedUser from "./fetchedUserR"
import expectedMark from "./expectedMarkR"
import appLogic from "./appLogicR"
import profile from "./profileR"
import appPresentation from "./appPresentationR"

export const rootReducer = combineReducers({
    appPresentation: appPresentation,
    fetchedUser: fetchedUser,
    expectedMark: expectedMark,
    appLogic: appLogic,
    profile: profile,
});