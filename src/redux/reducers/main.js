import {combineReducers} from "redux"

import fetchedUser from "./fetchedUserR"
import appLogic from "./appLogicR"
import profile from "./profileR"
import presentation from "./appPresentationR"

export const rootReducer = combineReducers({
    fetchedUser: fetchedUser,
    appLogic: appLogic,
    profile: profile,
    presentation: presentation,
});