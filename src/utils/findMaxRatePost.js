/**
* Finds the post with the highest average rating
*
* @param {Array} posts - Array representation of posts
* @return {Object} post with max rate
*/

export function findMaxRatePost(posts) {
    const enabledPosts = posts.filter(post => !post.disabled);

    if (!enabledPosts.length) return;

    // finding post with max rate
    return enabledPosts.reduce((prev, current) => {
        return (+prev.averageRate > +current.averageRate) ? prev : current;
    });
}