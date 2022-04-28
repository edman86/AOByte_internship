import Comment from "./Comment";

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