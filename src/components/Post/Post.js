import React, { Component } from 'react';
import Comments from "../Comments/Comments";
import Picker from 'emoji-picker-react';
import './post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            displayTextArea: false,
            showPicker: false,
            chosenEmoji: null
        }
    }

    toggleCommentInput = () => {
        // shows textarea for the new comment
        this.setState({ displayTextArea: !this.state.displayTextArea });
    }

    addNewComment = (id, comment) => {
        // checks if comment is empty string
        if (!comment.trim()) return;

        this.props.addComment(id, comment);

        this.setState({
            comment: '',
            displayTextArea: false,
            showPicker: false
        });
    }

    togglePicker = () => {
        this.setState({ showPicker: !this.state.showPicker });
    }

    onEmojiClick = (event, emojiObject) => {
        this.setState((prevState => ({
            comment: prevState.comment + emojiObject.emoji,
            showPicker: false
        })));
    };

    render() {
        const { id, title, comments, disabled } = this.props.post;
        const { addLike, addReply } = this.props;

        return (
            <li className={disabled ? 'post disabled' : 'post'}>
                <h2 className="post__title">{title}</h2>
                <Comments 
                    postId={id} 
                    comments={comments} 
                    addLike={addLike} 
                    addReply={addReply}    
                />

                <button
                    type="button"
                    className="comment-btn"
                    onClick={this.toggleCommentInput}
                >
                    Add new comment
                </button>

                <section
                    style={{ display: this.state.displayTextArea ? 'flex' : 'none' }}
                    className="post__new-comment-section"
                >
                    <textarea
                        className="post__new-comment"
                        name="newComment"
                        placeholder="Tap to add new comment..."
                        value={this.state.comment}
                        onChange={(e) => this.setState({ comment: e.target.value })}
                    >
                    </textarea>

                    <section className="post__controls">
                        <button
                            type="button"
                            className="comment-btn"
                            onClick={this.toggleCommentInput}
                        >
                            Close
                        </button>
                        
                        <div className="picker-btn-container">
                            <button
                                type="button"
                                className="picker-btn"
                                onClick={this.togglePicker}
                            >
                                &#9786;
                            </button>

                            {this.state.showPicker &&
                                <Picker
                                    pickerStyle={{
                                        position: 'absolute',
                                        top: '40px',
                                        right: '0px',
                                        zIndex: 2
                                    }}
                                    disableSearchBar
                                    disableSkinTonePicker
                                    onEmojiClick={this.onEmojiClick}
                                />
                            }
                        </div>

                        <button
                            type="button"
                            className="comment-btn"
                            disabled={!this.state.comment}
                            onClick={() => this.addNewComment(id, this.state.comment)}
                        >
                            Add
                        </button>
                    </section>
                </section>
            </li>
        );

    }
};

export default Post;