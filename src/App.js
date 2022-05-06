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

    toggleDisableProperty = (id) => {
        const updatedPosts = toggleDisable(this.state.posts, id);
        this.setState({ posts: updatedPosts });
    }

    changePage = (pageNumber) => {
        // Changes page number of posts pagination
        this.setState({ currentPage: pageNumber });
    }

    searchPost = (e) => {
        this.setState({ keyword: e.target.value });
    }

    addComment = (id, comment) => {
        const updatedPosts = addComment(this.state.posts, id, comment);
        this.setState({ posts: updatedPosts });
    }

    addLike = (postId, commentId) => {
        const updatedPosts = addLike(this.state.posts, postId, commentId);
        this.setState({ posts: updatedPosts });
    }

    addReply = (postId, commentId, reply) => {
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
                    changePage={this.changePage}
                    keyword={this.state.keyword}
                    searchPost={this.searchPost}
                    addComment={this.addComment}
                    addLike={this.addLike}
                    addReply={this.addReply}
                />
                <div className='list-container'>
                    <List 
                        posts={currentPosts} 
                        toggleDisableProperty={this.toggleDisableProperty} 
                    />
                    <List 
                        posts={currentPosts} 
                        toggleDisableProperty={this.toggleDisableProperty} 
                    />
                </div>
            </div>
        );
    }
}

export default App;