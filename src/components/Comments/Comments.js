import Comment from "../Comment/Comment";
import './comments.css';

const Comments = ({ comments }) => {
    return (
        <ul className="comments">
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </ul>
    );
};

export default Comments;