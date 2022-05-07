import React, { Component } from 'react';
import Pool from './components/Pool/Pool';
import List from './components/List/List';
import { 
    addAverageRate, 
    getCurrentPosts, 
    getSearchedPosts, 
    toggleDisable, 
    addComment, 
    addLike,
    addReply 
} from './utils';
import data from './data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 1,
            keyword: ''
        };
    }

    onToggleDisableProperty = (id) => {
        const updatedPosts = toggleDisable(this.state.posts, id);
        this.setState({ posts: updatedPosts });
    }

    onChangePage = (pageNumber) => {
        // Changes page number of posts pagination
        this.setState({ currentPage: pageNumber });
    }

    onSearchPost = (e) => {
        this.setState({ keyword: e.target.value });
    }

    onAddComment = (id, comment) => {
        const updatedPosts = addComment(this.state.posts, id, comment);
        this.setState({ posts: updatedPosts });
    }

    onAddLike = (postId, commentId) => {
        const updatedPosts = addLike(this.state.posts, postId, commentId);
        this.setState({ posts: updatedPosts });
    }

    onAddReply = (postId, commentId, reply) => {
        const updatedPosts = addReply(this.state.posts, postId, commentId, reply);
        this.setState({ posts: updatedPosts });
    }

    componentDidMount() {
        // data fetching imitation
        this.setState({ posts: data });
    }

    render() {
        const postsPerPage = 3;
        
        // calculating average rate
        const postsWithAvarageRate = addAverageRate(this.state.posts);

        // searching posts by keyword
        const searchedPosts = getSearchedPosts(postsWithAvarageRate, this.state.keyword);

        // getting current posts by particular page of pagination
        const currentPosts = getCurrentPosts(
            this.state.currentPage,
            postsPerPage,
            searchedPosts
        );

        return (
            <div className="App">
                <Pool
                    posts={currentPosts}
                    currentPage={this.state.currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={searchedPosts.length}
                    changePage={this.onChangePage}
                    keyword={this.state.keyword}
                    searchPost={this.onSearchPost}
                    addComment={this.onAddComment}
                    addLike={this.onAddLike}
                    addReply={this.onAddReply}
                />
                <div className='list-container'>
                    <List 
                        posts={currentPosts} 
                        toggleDisableProperty={this.onToggleDisableProperty} 
                    />
                    <List 
                        posts={currentPosts} 
                        toggleDisableProperty={this.onToggleDisableProperty} 
                    />
                </div>
            </div>
        );
    }
}

export default App;