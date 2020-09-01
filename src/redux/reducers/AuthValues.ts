import {AnyAction} from "redux";
import {
    GET_CITIES,
    GET_PROVINCES,
    GET_REGIONS, GET_SCHOOLS,
    INPUT_CITY,
    INPUT_LOGIN,
    INPUT_PASSWORD,
    INPUT_PROVINCE,
    INPUT_REGION,
    INPUT_SCHOOL
} from "../../utils/ReduxConst";

let initialState = {
    login: "",
    password: "",
    region: null,
    province: null,
    city: null,
    school: null,

    regions_data: [],
    provinces_data: [],
    cities_data: [],
    schools_data: [],
};

const authValues = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case INPUT_LOGIN:
            return {
                // login: action.data,
                ...state
            };
        case INPUT_PASSWORD:
            return {
                // password: action.data,
                ...state
            };
        case INPUT_REGION:
            return {
                region: action.data,
                ...state
            };
        case INPUT_PROVINCE:
            return {
                province: action.data,
                ...state
            };
        case INPUT_CITY:
            return {
                city: action.data,
                ...state
            };
        case INPUT_SCHOOL:
            return {
                school: action.data,
                ...state
            };
        case GET_REGIONS:
            return {
                ...state,
                regions_data: action.data,
            };
        case GET_PROVINCES:
            return {
                ...state,
                provinces_data: action.data,
            };
        case GET_CITIES:
            return {
                ...state,
                cities_data: action.data,
            };
        case GET_SCHOOLS:
            return {
                ...state,
                schools_data: action.data,
            };
        default:
            break;
    }
    return state;
};

export default authValues;