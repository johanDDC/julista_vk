import BookletCache from "../../utils/cashe";

export function setJournal(data) {
    return {
        type: "SET_JOURNAL",
        data: data
    }
}

export function setAllMarks(data) {
    return {
        type: "SET_MARKS",
        data: data
    }
}

export function setLastMarks(data) {
    return {
        type: "SET_LAST_MARKS",
        data: data
    }
}

export function clearData() {
    BookletCache.getInstance().forceClear();
    return {
        type: "CLEAR_DATA",
    }
}