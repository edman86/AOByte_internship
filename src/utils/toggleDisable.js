/**
* Toggles posts disable property for visual disabling 
*
* @param {Array} posts - Array of posts
* @param {number|string} id - post id   
* @return {Array} returns posts with toggled disable property
*/

export function toggleDisable(posts, id) {
    return posts.map(post => {
        return (post.id === id) ? { ...post, disabled: !post.disabled } : post
    });
}

