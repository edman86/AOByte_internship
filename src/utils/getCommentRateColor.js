/**
* Returns the color that corresponds to a certain rating 
*
* @param {number} rate - number of comment rate    
* @return {string} color for visual representation of rate
*/

export function getCommentRateColor(rate) {
    if (rate > 4) {
        return 'green';
    } else if (rate >= 3) {
        return 'orange';
    } else if (rate < 3) {
        return 'red';
    } else {
        return 'black';
    }
}