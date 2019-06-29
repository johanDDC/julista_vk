export function scheduleGetDates() {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let monday = null;

    if (dayOfWeek > 0){
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

export function setCorrectYear(str){
    let correctYear = str.slice(8);
    str = str.slice(0, 6);
    str = str + correctYear;
    return str;
}