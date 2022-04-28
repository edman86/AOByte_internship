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
		const postsWithAvarageRate = addAverageRate(data);
		this.setState({ posts: postsWithAvarageRate });
	}

	render() {
		return (
			<div className="App">
				<Pool posts={this.state.posts} />
				<div className='list-container'>
					<List posts={this.state.posts} disablePost={this.disablePost} />
					<List posts={this.state.posts} disablePost={this.disablePost} />
				</div>
			</div>
		);
	}
}

export default App;