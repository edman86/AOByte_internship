import Comments from "../Comments/Comments";
import './post.css';

const Post = ({ post }) => {
    const { title, comments, disabled } = post;

    return (
        <li className={disabled ? 'post disabled' : 'post'}>
            <h2 className="post__title">{title}</h2>
            <Comments comments={comments} />
        </li>
    );
};

export default Post;