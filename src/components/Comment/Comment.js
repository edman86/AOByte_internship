import React, { Component } from 'react';
import { getCommentRateColor } from '../../utils';
import './comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: '',
            isOpen: false
        }
    }

    render() {
        const { comment, addLike, postId, addReply } = this.props;
        const { id, text, rate } = comment;

        return (
            <li className="comment">

                <section className="comment__container">
                    <h4 className="comment__text">{text}</h4>

                    <div>
                        <button
                            type="button"
                            className="comment__rate liked"
                            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                        >
                            &#9993;
                        </button>

                        <button
                            type="button"
                            className={comment.userId ? 'comment__rate liked' : 'comment__rate'}
                            style={{color: getCommentRateColor(rate)}}
                            onClick={() => addLike(postId, id)}
                        >
                            &hearts; {rate}
                        </button>
                    </div>
                </section>

                <div className="comment__reply">
                    {comment.reply && comment.reply}
                </div>

                <div className={`reply-input ${this.state.isOpen && 'is-open'}`}>
                    <input
                        type="text"
                        value={this.state.reply}
                        placeholder="Tap here to reply"
                        onChange={(e) => this.setState({ reply: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            addReply(postId, id, this.state.reply);
                            this.setState({reply: '', isOpen: false});
                        }}
                    >
                        Reply
                    </button>
                </div>
            </li>
        );
    }

};

export default Comment;