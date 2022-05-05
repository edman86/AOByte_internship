import React, { Component } from 'react';
import Pool from './components/Pool/Pool';
import List from './components/List/List';
import { addAverageRate, getCurrentPosts, getSearchedPosts } from './utils';
import { v4 as uuidv4 } from 'uuid';
import data from './data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 1,
            postsPerPage: 3,
            keyword: ''
        };
    }

    disablePost = (id) => {
        const updatedPosts = this.state.posts.map(post => {
            return (post.id === id) ? { ...post, disabled: !post.disabled } : post
        });

        this.setState({ posts: updatedPosts });
    }

    changePage = (pageNumber) => {
        // Changes page number of posts pagination
        this.setState({ currentPage: pageNumber });
    }

    search = (e) => {
        this.setState({ keyword: e.target.value });
    }

    addComment = (id, comment) => {
        const updatedPosts = this.state.posts.map(post => {
            if (post.id === id) {
                const comments = [
                    ...post.comments,
                    {
                        id: uuidv4(),
                        text: comment,
                        rate: 0
                    }
                ];
                return { ...post, comments };
            } else {
                return post;
            }
        });

        this.setState({ posts: updatedPosts });
    }

    addLike = (postId, commentId) => {
        const updatedPosts = this.state.posts.map(post => {
            if (post.id === postId) {
                const updatedComments = post.comments.map(comment => {
                    if (comment.id === commentId) {
                        // checking if current user already make like
                        if (comment.userId) {
                            return { ...comment, rate: --comment.rate, userId: null };
                        } else {
                            return { ...comment, rate: ++comment.rate, userId: 'someId' };
                        }
                    } else {
                        return comment;
                    }
                });
                console.log('works');
                return { ...post, comments: updatedComments };
            } else {
                return post;
            }
        });

        this.setState({ posts: updatedPosts });
    }

    componentDidMount() {
        // data fetching imitation
        this.setState({ posts: data });
    }

    render() {
        // calculating average rate
        const postsWithAvarageRate = addAverageRate(this.state.posts);

        // searching posts by keyword
        const searchedPosts = getSearchedPosts(postsWithAvarageRate, this.state.keyword);

        // getting current posts by particular page of pagination
        const currentPosts = getCurrentPosts(
            this.state.currentPage,
            this.state.postsPerPage,
            searchedPosts
        );

        return (
            <div className="App">
                <Pool
                    posts={currentPosts}
                    currentPage={this.state.currentPage}
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={searchedPosts.length}
                    changePage={this.changePage}
                    keyword={this.state.keyword}
                    search={this.search}
                    addComment={this.addComment}
                    addLike={this.addLike}
                />
                <div className='list-container'>
                    <List posts={currentPosts} disablePost={this.disablePost} />
                    <List posts={currentPosts} disablePost={this.disablePost} />
                </div>
            </div>
        );
    }
}

export default App;