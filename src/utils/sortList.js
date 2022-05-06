/**
* Sorts an array in ascending or descending order
*
* @param {Object} state - reference of application state
* @return {Object} post with max rate
*/

export function sortList(state) {
    const sortedList = [...state.list];

    if (state.sort) {
        sortedList.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
    } else {
        sortedList.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
    }

    return sortedList;
}