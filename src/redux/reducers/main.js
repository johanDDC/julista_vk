import {combineReducers} from "redux"

import activeView from "./activeViewR"
import activePanel from "./activePanelR"
import diary from "./diaryR"
import fetchedUser from "./fetchedUserR"
import userId from "./userIdR"
import userSecret from "./userSecretR"
import expectedMark from "./expectedMarkR"
import appLogic from "./appLogicR"
import profile from "./profileR"

const initialState = {
    activeView: 'AuthorizationView',
    diary: null,
    fetchedUser: null,
    userId: null,
    userSecret: null,
    expectedMark: 5
};

export const rootReducer = combineReducers({
    activeView: activeView,
    activePanel: activePanel,
    diary: diary,
    fetchedUser: fetchedUser,
    userId: userId,
    userSecret: userSecret,
    expectedMark: expectedMark,
    appLogic: appLogic,
    profile: profile,
});