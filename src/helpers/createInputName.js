export const createInputName = (name) => {
    return name.split(/(?=[A-Z])/).join(' ').toLowerCase();
}