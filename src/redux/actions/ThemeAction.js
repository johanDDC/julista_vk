export function setTheme(theme) {
    console.log(theme);
    return {
        type: "SET_THEME",
        value: theme
    }
}