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

    console.log("tot", today);
    console.log("mom", monday);

    dates.push(monday);
    dates.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6));

    return dates;
}

export function schedulePrevWeek(currentStart) {
    let newStart = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 7);
    let newEnd = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 1);
    let resArr = [];

    for(let i = 0; i < 7; i++){
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

    for(let i = 0; i < 7; i++){
        let date = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + i);
        resArr.push(date.getDate())
    }
    resArr.push(newStart);
    resArr.push(newEnd);

    return resArr;
}

export function setCorrectYear(str){
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