import {combineReducers} from "redux"

import activeView from "./activeViewR"
import activePanel from "./activePanelR"
import diary from "./diaryR"
import fetchedUser from "./fetchedUserR"
import userId from "./userIdR"
import userLogin from "./userLoginR"
import userPassword from "./userPasswordR"
import userSecret from "./userSecretR"

export const initialState = {
    activeView: 'AuthorizationView',
    diary: null,
    fetchedUser: null,
    userLogin: null,
    userPassword: null,
    userId: null,
    userSecret: null,
};

export const rootReducer = combineReducers({
    activeView: activeView,
    activePanel: activePanel,
    diary: diary,
    fetchedUser: fetchedUser,
    userId: userId,
    userSecret: userSecret,
    userLogin: userLogin,
    userPassword: userPassword,
});