/**
* Gets posts for particular page of pagination
*
* @param {number} currentPage - current page selected by the user
* @param {number} postsPerPage - Number of posts shown per page
* @param {Array} posts - posts Array    
* @return {Array} Part of the array of posts that will be shown on the current page
*/

export function getCurrentPosts(currentPage, postsPerPage, posts) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    return posts.slice(indexOfFirstPost, indexOfLastPost);
}