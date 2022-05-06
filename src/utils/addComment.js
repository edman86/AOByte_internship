import { v4 as uuidv4 } from 'uuid';

/**
* Adds new comment to particular post
*
* @param {Array} posts - Array of posts
* @param {number|string} id - post id
* @param {string} comment - new comment   
* @return {Array} returns posts with new comment
*/

export function addComment(posts, id, comment) {
    return posts.map(post => {
        if (post.id === id) {
            const comments = [
                ...post.comments,
                {
                    id: uuidv4(),
                    text: comment,
                    rate: 0
                }
            ];
            return { ...post, comments };
        } else {
            return post;
        }
    });
}