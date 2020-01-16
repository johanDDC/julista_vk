import {AnyAction} from "redux";
import {SET_INFO} from "../../utils/ReduxConst";

let initialState = {
    name: {
        first_name: "",
        last_name: "",
        middle_name: "",
    },
    is_parent: null,
    exp: 0,
    phone: "",
    email: "",
    birth_date: "",
    sex: "",
    class_name: "",
};

const accountInfo = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_INFO:
            return {
                ...action.data,
                ...state,
            }
    }
    return state;
};

export default accountInfo;