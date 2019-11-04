export function scheduleGetDates() {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let monday = null;

    if (dayOfWeek > 0) {
        let shift = dayOfWeek - 1;
        monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - shift)
    } else
        monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    let dates = [];

    for (let i = 0; i < 7; i++) {
        let date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);

        dates.push(date.getDate());
    }

    dates.push(monday);
    dates.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6));

    return dates;
}

export function schedulePrevWeek(currentStart) {
    let newStart = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 7);
    let newEnd = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 1);
    let resArr = [];

    for (let i = 0; i < 7; i++) {
        let date = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + i);
        resArr.push(date.getDate())
    }
    resArr.push(newStart);
    resArr.push(newEnd);

    return resArr;
}

export function scheduleNextWeek(currentStart) {
    let newStart = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() + 7);
    let newEnd = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + 6);
    let resArr = [];

    for (let i = 0; i < 7; i++) {
        let date = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + i);
        resArr.push(date.getDate())
    }
    resArr.push(newStart);
    resArr.push(newEnd);

    return resArr;
}

export function setCorrectYear(str) {
    let correctYear = str.slice(8);
    str = str.slice(0, 6);
    str = str + correctYear;
    return str;
}

export function getRusMonthName(monthNum) {
    switch (monthNum) {
        case 0:
            return "Январь";
        case 1:
            return "Февраль";
        case 2:
            return "Март";
        case 3:
            return "Апрель";
        case 4:
            return "Май";
        case 5:
            return "Июнь";
        case 6:
            return "Июль";
        case 7:
            return "Август";
        case 8:
            return "Сентябрь";
        case 9:
            return "Октябрь";
        case 10:
            return "Ноябрь";
        case 11:
            return "Декабрь";

    }
}

export function getStartDateForLastMarks(dueDate) {
    let startDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate() - 7);
    return startDate;
}


export function turnIntoDate(string) {
    let dateParams = string.split('.');
    let date = new Date(dateParams[0] - 0, dateParams[1] - 1, dateParams[2] - 0);

    return date;
}

export function reverseRuslanString(string) {
    let str = string.substr(5);
    str = str.substr(3) + '.' + str.substr(0, 2);

    return str;
}

export function getVkParams() {
    let params = window.location.search.slice(1).split('&')
        .map((queryParam) => {
            let kvp = queryParam.split('=');
            return {key: kvp[0], value: kvp[1]}
        })
        .reduce((query, kvp) => {
            query[kvp.key] = decodeURIComponent(kvp.value);
            return query
        }, {});

    params = {
        sign: "06DakpJLGnTxBx3vhdVYuahPhTcnKeZEgMuAtAOqVms",
        vk_access_token_settings: "",
        vk_app_id: "6967676",
        vk_are_notifications_enabled: "0",
        vk_group_id: "171343913",
        vk_is_app_user: "1",
        vk_language: "ru",
        vk_platform: "desktop_web",
        vk_ref: "other",
        vk_user_id: "143305590",
        vk_viewer_group_role: "admin",
    };

    return params;
}

export function isBirthday(strDate) {
    let tokens = strDate.split("-");
    let birthDate = new Date(tokens[0], tokens[1] - 1, tokens[2]);
    let today = new Date();
    return (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate());
}

export function recursiveTheming(startElem, theme) {
    if (startElem) {
        startElem.setAttribute("data-theme", theme);
        for (let child of startElem.children) {
            recursiveTheming(child);
        }
    }
};

// json = {
//     sign: "06DakpJLGnTxBx3vhdVYuahPhTcnKeZEgMuAtAOqVms",
//     vk_access_token_settings: "",
//     vk_app_id: "6967676",
//     vk_are_notifications_enabled: "0",
//     vk_group_id: "171343913",
//     vk_is_app_user: "1",
//     vk_language: "ru",
//     vk_platform: "desktop_web",
//     vk_ref: "other",
//     vk_user_id: "143305590",
//     vk_viewer_group_role: "admin",
// };