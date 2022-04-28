const Comment = ({ comment }) => {
    const { text, rate } = comment;

    return (
        <li className="comment">
            <h4 className="comment__text">{text}</h4>
            <div className="comment__rate">&hearts; {rate}</div>
        </li>
    );
};

export default Comment;