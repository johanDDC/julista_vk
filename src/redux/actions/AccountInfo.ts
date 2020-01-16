import {SET_INFO} from "../../utils/ReduxConst";
import {InfoResponse} from "../../utils/Props";

export function setInfo(info: InfoResponse) {
    let correct_info = {
        name: {
            first_name: info.name.first_name,
            last_name: info.name.last_name,
            middle_name: info.name.middle_name,
        },
        is_parent: (info.status === "P"),
        exp: info.exp,
        phone: info.personal.phone,
        email: info.personal.email,
        birth_date: info.personal.birth_date,
        sex: info.personal.sex,
        class_name: info.class_name,
    };
    return {
        type: SET_INFO,
        data: correct_info,
    }
}