export const stringToDate = (dateString) => {
    let newDate = dateString;
    if (dateString && dateString.includes(".")) {
        newDate = dateString.split(".")[0]
        if (newDate.includes("T")) {
            newDate = newDate.replaceAll("T", " ");
        }
        if (newDate.includes("-")) {
            newDate = newDate.replaceAll("-", "/");
        }
    }
    return newDate;
}