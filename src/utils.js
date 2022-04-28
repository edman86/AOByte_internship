export function addAverageRate(data) {

	// Maps all posts in the data,
	// calculates the average of comments rate 
	// and returns new array of posts with the average rating added.
	return data.map(post => {
		let total = 0;
		post.comments.forEach(comment => total += comment.rate);

		let averageRate = (total / post.comments.length).toFixed(1);
		return { ...post, averageRate };
	});

}

export function findMaxRatePost(posts) {
	const enabledPosts = posts.filter(post => !post.disabled);

	if (!enabledPosts.length) {
		return;
	}
	// finding post with max rate
	return enabledPosts.reduce((prev, current) => {
		return (+prev.averageRate > +current.averageRate) ? prev : current;
	})
}

export function sortList(list, state) {
	const sortedList = [...list];

	if (state.sort === 'asc') {
		sortedList.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
	} else {
		sortedList.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
	}

	return sortedList;
}