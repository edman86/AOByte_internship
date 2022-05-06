/**
* Gets posts by searched keyword
*
* @param {Array} posts - Array of the posts
* @param {string} keyword - keyword for searching of particular post or comment   
* @return {Array} Array with found posts by keyword
*/

export function getSearchedPosts(posts, keyword) {
    return posts.filter(post => {
        return post.title.toLowerCase().includes(keyword.toLowerCase()) ||
            post.comments.find(comment => {
                return comment.text.toLowerCase().includes(keyword.toLowerCase());
            });
    });
}