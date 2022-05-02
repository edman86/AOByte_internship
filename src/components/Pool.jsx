import Post from "./Post";

const Pool = ({ posts }) => {
    return (
        <ul className="posts">
            <h2>Awasome Nonsense Blog</h2>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </ul>
    );
};

export default Pool;