import Post from "../Post/Post";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import './pool.css';

const Pool = ({ posts, currentPage, postsPerPage, totalPosts, changePage, keyword, search, addComment }) => {
    return (
        <section className="posts">
            
            <SearchBar keyword={keyword} search={search} />

            <ul className="posts__list">
                {posts.map(post => <Post key={post.id} post={post} addComment={addComment} />)}
            </ul>
            
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                currentPage={currentPage}
                changePage={changePage}
            />
        </section>
    );
};

export default Pool;