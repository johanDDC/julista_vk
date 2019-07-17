import {combineReducers} from "redux"

import activeView from "./activeViewR"
import diary from "./diaryR"
import fetchedUser from "./fetchedUserR"
import userId from "./userIdR"
import userLogin from "./userLoginR"
import userPassword from "./userPasswordR"
import userSecret from "./userSecretR"

export default combineReducers({
    activeView,
    diary,
    fetchedUser,
    userId,
    userSecret,
    userLogin,
    userPassword
})