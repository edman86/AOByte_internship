import React, { Component } from 'react';
import Comments from "../Comments/Comments";
import './post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            displayTextArea: false
        }
    }
    
    openCommentInput = () => {
        // shows textarea for new comment
        this.setState({ displayTextArea: !this.state.displayTextArea });
    }

    addNewComment = (id, comment) => {
        // checks if comment is empty string
        if (!comment.trim()) {
            return;
        }
        
        this.props.addComment(id, comment);
        
        this.setState({ 
            comment: '',
            displayTextArea: false,  
        });
    }
    
    render() {
        const { id, title, comments, disabled } = this.props.post;
        
        return (
            <li className={disabled ? 'post disabled' : 'post'}>
                <h2 className="post__title">{title}</h2>
                <button 
                    type="button"
                    className="comment-btn" 
                    onClick={this.openCommentInput}
                >
                    {this.state.displayTextArea ? 'Close' : 'Add new comment'}
                </button>
                
                <section 
                    style={{display: this.state.displayTextArea ? 'flex' : 'none'}}
                    className="post__new-comment-section"
                >
                    <textarea 
                        className="post__new-comment" 
                        name="newComment"
                        placeholder="Tap to add new comment..."
                        value={this.state.comment}
                        onChange={ (e) => this.setState({ comment: e.target.value }) }
                    >
                    </textarea>
                    
                    <button 
                        type="button" 
                        className="comment-btn"
                        disabled={ !this.state.comment }
                        onClick={ () => this.addNewComment(id, this.state.comment) }
                    >
                        Add
                    </button>
                </section>
                
                <Comments comments={comments} />
            </li>
        );

    }
};

export default Post;