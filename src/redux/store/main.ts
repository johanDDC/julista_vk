import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import fetchedUser from "../reducers/fetchedUserR";
import expectedMark from "../reducers/expectedMarkR";
import theme from "../reducers/themeR";
import appLogic from "../reducers/appLogicR";
import profile from "../reducers/Profile";
import appPresentation from "../reducers/AppPresentation";
import authValues from "../reducers/AuthValues";
import accountInfo from "../reducers/AccountInfo";

const rootReducer = combineReducers({
    appPresentation: appPresentation,
    authValues: authValues,
    profile: profile,
    accountInfo: accountInfo,
    fetchedUser: fetchedUser,
    expectedMark: expectedMark,
    theme: theme,
    appLogic: appLogic,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;