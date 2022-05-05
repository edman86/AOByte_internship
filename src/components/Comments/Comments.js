import Comment from "../Comment/Comment";
import './comments.css';

const Comments = ({ postId, comments, addLike }) => {
    return (
        <ul className="comments">
            {comments.map((comment) => {
                return (
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        postId={postId} 
                        addLike={addLike} 
                    />
                );
            })}
        </ul>
    );
};

export default Comments;