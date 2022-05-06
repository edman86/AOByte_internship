/**
* Increase or decrease comment's rate count
*
* @param {Array} posts - Array of posts
* @param {number|string} postId - post id
* @param {number|string} commentId - comment id   
* @return {Array} returns posts with updated rate count
*/

export function addLike(posts, postId, commentId) {
    return posts.map(post => {
        if (post.id === postId) {
            const updatedComments = post.comments.map(comment => {
                if (comment.id === commentId) {
                    // checking if current user already make like
                    if (comment.userId) {
                        // if like already added, decrease it by 1
                        return { ...comment, rate: --comment.rate, userId: null };
                    } else {
                        // if current user not added like - increasing comment rate by 1
                        return { ...comment, rate: ++comment.rate, userId: 'someId' };
                    }
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