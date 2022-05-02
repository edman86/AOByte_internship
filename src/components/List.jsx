import React, { Component } from 'react';
import { findMaxRatePost, sortList } from '../utils';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sort: false
        }
    }

    addToList = (e) => {
        e.stopPropagation();

        const { posts } = this.props;
        const updatedList = [...this.state.list];

        const max = findMaxRatePost(posts);

        if (!max) return;

        updatedList.push({
            id: (Date.now()).toString(16),
            title: max.title,
            rate: max.averageRate,
            mainId: max.id
        });

        this.setState({ list: updatedList });

        // disabing post
        this.props.disablePost(max.id);
    }

    removeFromList = (id) => {
        const { list } = this.state;

        // finding removed item for getting post id
        const removed = list.find(item => item.id === id);

        // excluding removed item from list
        const updatedList = list.filter(item => item.id !== id);
        this.setState({ list: updatedList });

        // enabling post
        this.props.disablePost(removed.mainId);
    }

    sort = (e) => {
        e.stopPropagation();
        this.setState({ sort: !this.state.sort });
    }
    
    render() {
        
        // sorting list by state.sort (asc or desc)
        const sortedList = sortList(this.state);
        
        return (
            <div className='list'>
                <button
                    type="button"
                    className='btn'
                    onClick={this.addToList}
                >
                    +
                </button>

                <button
                    type="button"
                    className='btn'
                    onClick={this.sort}
                >
                    {this.state.sort ? <span>&#8593;</span> : <span>&#8595;</span>}
                </button>

                <ul>
                    {sortedList.map(item => {
                        return (
                            <li key={item.id} className="list__item">
                                <span>{item.title}</span>
                                <span>&#9734;{item.rate}</span>
                                <button
                                    type='button'
                                    className='list__remove-btn'
                                    onClick={() => this.removeFromList(item.id)}
                                >
                                    &minus;
                                </button>
                            </li>
                        );
                    })}
                </ul>

            </div>
        );
    }
};

export default List;