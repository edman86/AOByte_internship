import React, { Component } from 'react';
import Pool from './components/Pool';
import List from './components/List';
import { addAverageRate } from './utils';
import data from './data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    disablePost = (id) => {
        const updatedPosts = this.state.posts.map(post => {
            return (post.id === id) ? { ...post, disabled: !post.disabled } : post
        });
        this.setState({ posts: updatedPosts });
    }

    componentDidMount() {
        
        // data fetching imitation
        this.setState({ posts: data });
    }

    render() {
        
        // rendering posts with calculated average rate
        const postsWithAvarageRate = addAverageRate(this.state.posts);
        
        return (
            <div className="App">
                <Pool posts={postsWithAvarageRate} />
                <div className='list-container'>
                    <List posts={postsWithAvarageRate} disablePost={this.disablePost} />
                    <List posts={postsWithAvarageRate} disablePost={this.disablePost} />
                </div>
            </div>
        );
    }
}

export default App;