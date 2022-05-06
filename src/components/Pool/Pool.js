import Post from "../Post/Post";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import './Pool.css';

const Pool = ({
    posts,
    currentPage,
    postsPerPage,
    totalPosts,
    changePage,
    keyword,
    searchPost,
    addComment,
    addLike,
    addReply
}) => {
    return (
        <section className="posts">

            <SearchBar keyword={keyword} searchPost={searchPost} />

            <ul className="posts__list">
                {posts.map(post => {
                    return (
                        <Post 
                            key={post.id} 
                            post={post} 
                            addComment={addComment}
                            addLike={addLike}
                            addReply={addReply} 
                        />
                    );
                })}
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