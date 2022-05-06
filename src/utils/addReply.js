/**
* Adds reply for particular comment
*
* @param {Array} posts - Array of posts
* @param {number|string} postId - post id
* @param {number|string} commentId - comment id
* @param {string} reply - reply for the particular comment   
* @return {Array} returns posts with added reply for comment
*/

export function addReply(posts, postId, commentId, reply) {
    return posts.map(post => {
        if (post.id === postId) {
            const updatedComments = post.comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, reply: reply };
                } else {
                    return comment;
                }
            });

            return { ...post, comments: updatedComments };
        } else {
            return post;
        }
    });
}