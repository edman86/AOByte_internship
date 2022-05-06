/**
* Maps all posts in the data,
* calculates the average of comments rate 
* and returns new array of posts with the average rating added.
*
* @param {Array} data - Array representation of posts
* @return {Array} maped Array with updated posts
*/

export function addAverageRate(data) {
    return data.map(post => {
        let total = 0;
        post.comments.forEach(comment => total += comment.rate);

        let averageRate = (total / post.comments.length).toFixed(1);
        return { ...post, averageRate };
    });
}