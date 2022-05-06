import Comment from "../Comment/Comment";

const Comments = ({ postId, comments, addLike, addReply }) => {
    return (
        <ul className="comments">
            {comments.map((comment) => {
                return (
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        postId={postId} 
                        addLike={addLike}
                        addReply={addReply} 
                    />
                );
            })}
        </ul>
    );
};

export default Comments;