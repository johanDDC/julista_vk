export function setView(view) {
    console.log(view);
    return {
        type: "SET_VIEW",
        value: view
    }
}