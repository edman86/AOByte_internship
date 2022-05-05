import './comment.css';

const Comment = ({ comment, addLike, postId }) => {
    const { id, text, rate } = comment;

    return (
        <li className="comment">
            <h4 className="comment__text">{text}</h4>
            <button 
                type="button"
                className={comment.userId ? 'comment__rate liked' : 'comment__rate'}
                onClick={ () => addLike(postId, id) }
            >
                &hearts; {rate}
            </button>
        </li>
    );
};

export default Comment;