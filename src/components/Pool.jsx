import Post from "./Post";

const Pool = ({ posts }) => {
    return (
        <ul className="posts">
            {posts.map(post => <Post key={post.id} post={post} />)}
        </ul>
    );
};

export default Pool;